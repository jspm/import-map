import { rebase, isPlain, isURL } from "./common/url.js";
import { alphabetize } from "./common/alphabetize.js";

export interface ConditionalTarget {
  [env: string]: ConditionalTarget | string | null;
}

export interface IImportMap {
  imports?: Record<string, string | null>;
  scopes?: {
    [scope: string]: Record<string, string | null>;
  };
}

export interface IConditionalImportMap {
  imports?: Record<string, string | ConditionalTarget | null>;
  scopes?: {
    [scope: string]: Record<string, string | ConditionalTarget | null>;
  };
}

function replaceTarget (record: Record<string, string | ConditionalTarget | null>, key: string, replaceFn: (target: string | null) => string | null | undefined) {
  const target = record[key];
  if (typeof target === 'string' || target === null) {
    const replacement = replaceFn(target as string | null);
    if (replacement !== undefined)
      record[key] = replacement;
  }
  else {
    for (const cnd of Object.keys(target))
      replaceTarget(target, cnd, replaceFn);
  }
}

function mapTarget (target: string | null | ConditionalTarget, mapFn: (target: string | null) => string | null) {
  if (typeof target === 'string' || target === null)
    return mapFn(target as string | null);
  const mapped = {};
  for (const cnd of Object.keys(target))
    mapped[cnd] = mapTarget(target[cnd], mapFn);
  return mapped;
}

function targetEquals (target: string | ConditionalTarget | null, comparison: string | ConditionalTarget | null, baseUrl: URL) {
  if (target === null || comparison === null)
    return target === comparison;

  if (typeof target === 'string' || typeof comparison === 'string') {
    if (typeof target !== 'string' || typeof comparison !== 'string')
      return false;
    return new URL(target, baseUrl).href === new URL(comparison, baseUrl).href;
  }

  const targetKeys = Object.keys(target);
  const comparisonKeys = Object.keys(comparison);
  if (targetKeys.length !== comparisonKeys.length)
    return false;
  for (let i = 0; i < targetKeys.length; i++) {
    const targetKey = targetKeys[i];
    const comparisonKey = comparisonKeys[i];
    if (targetKey !== comparisonKey)
      return false;
    if (!targetEquals(target[targetKey], comparison[comparisonKey], baseUrl))
      return false;
  }
  return true;
}

export class ImportMap {
  imports: Record<string, string | ConditionalTarget | null> = Object.create(null);
  scopes: Record<string, Record<string, string | ConditionalTarget | null>> = Object.create(null);

  baseUrl: URL;

  constructor (mapBaseUrl: string | URL, initialMap?: IConditionalImportMap) {
    if (typeof mapBaseUrl === 'string')
      mapBaseUrl = new URL(mapBaseUrl);
    this.baseUrl = mapBaseUrl;
    if (initialMap)
      this.extend(initialMap, true);
  }

  clone () {
    return new ImportMap(this.baseUrl, this.toJSON());
  }

  extend (map: IImportMap | IConditionalImportMap, overrideScopes = false) {
    Object.assign(this.imports, map.imports);
    if (overrideScopes) {
      Object.assign(this.scopes, map.scopes);
    }
    else if (map.scopes) {
      for (const scope of Object.keys(map.scopes))
        Object.assign(this.scopes[scope] = this.scopes[scope] || Object.create(null), map.scopes[scope]);
    }
    this.rebase(this.baseUrl.href);
    return this;
  }

  sort () {
    this.imports = alphabetize(this.imports);
    this.scopes = alphabetize(this.scopes);
    for (const scope of Object.keys(this.scopes))
      this.scopes[scope] = alphabetize(this.scopes[scope]);
  }

  set (name: string, target: string | null | ConditionalTarget, parent?: string) {
    if (!parent) {
      this.imports[name] = target;
    }
    else {
      this.scopes[parent] = this.scopes[parent] || {};
      this.scopes[parent][name] = target;
    }
  }

  replace (url: string, newUrl: string) {
    const replaceSubpaths = url.endsWith('/');
    if (!isURL(url))
      throw new Error('URL remapping only supports URLs');
    const newRelPkgUrl = rebase(new URL(newUrl), this.baseUrl);
    for (const impt of Object.keys(this.imports)) {
      replaceTarget(this.imports, impt, target => {
        if (target === null) return;
        if (replaceSubpaths && target.startsWith(url) || target === url)
          return newRelPkgUrl + target.slice(url.length);
      });
    }
    for (const scope of Object.keys(this.scopes)) {
      const scopeImports = this.scopes[scope];
      const scopeUrl = new URL(scope, this.baseUrl).href;
      if (replaceSubpaths && scopeUrl.startsWith(url) || scopeUrl === url) {
        const newScope = newRelPkgUrl + scopeUrl.slice(url.length);
        delete this.scopes[scope];
        this.scopes[newScope] = scopeImports;
      }
      for (const name of Object.keys(scopeImports)) {
        replaceTarget(scopeImports, name, target => {
          if (target === null) return;
          if (replaceSubpaths && target.startsWith(url) || target === url)
            return newRelPkgUrl + target.slice(url.length);
        });
      }
    }
    return this;
  }

  // TODO: flattening operation that combines subpaths where possible into folder maps
  combineSubpaths () {

  }

  /**
   * Groups the import map scopes to shared URLs to reduce duplicate mappings.
   * 
   * @param baseScope {String | URL}
   * 
   * For two given scopes, "https://site.com/x/" and "https://site.com/y/",
   * a single scope will be constructed for "https://site.com/" including
   * their shared mappings.
   * 
   * In the case where the scope is on the same origin as the baseUrl, the grouped
   * root will never backtrack below the baseUrl, unless specifying the baseScope
   * option to permit a custom backtracking base.
   * 
   */
  flatten (baseScope: URL | string = this.baseUrl) {
    if (typeof baseScope === 'string')
      baseScope = new URL(baseScope.endsWith('/') ? baseScope : baseScope + '/');
    if (!baseScope.pathname.endsWith('/')) {
      baseScope = new URL(baseScope.href);
      baseScope.pathname += '/';
    }
    // for each scope, update its mappings to be in the shared base where possible
    for (const scope of Object.keys(this.scopes)) {
      const scopeImports = this.scopes[scope];

      const scopeUrl = new URL(scope, this.baseUrl);

      let scopeBaseUrl: string;
      if (scopeUrl.protocol === this.baseUrl.protocol && scopeUrl.hostname === this.baseUrl.hostname && scopeUrl.port === this.baseUrl.port) {
        scopeBaseUrl = rebase(scopeUrl.href.startsWith(baseScope.href) ? this.baseUrl : scopeUrl, this.baseUrl);
      }
      else
        scopeBaseUrl = scopeUrl.protocol + '//' + scopeUrl.hostname + (scopeUrl.port ? ':' + scopeUrl.port : '') + '/';

      let scopeBase = this.scopes[scopeBaseUrl] || {};
      if (scopeBase === scopeImports) scopeBase = null;

      let flattenedAll = true;
      for (const name of Object.keys(scopeImports)) {
        const target = scopeImports[name];
        if (targetEquals(this.imports[name], target, this.baseUrl)) {
          delete scopeImports[name];
        }
        else if (scopeBase && (!scopeBase[name] || targetEquals(scopeBase[name], target, this.baseUrl))) {
          scopeBase[name] = target;
          replaceTarget(scopeBase, name, target => {
            return rebase(new URL(target, this.baseUrl), this.baseUrl);
          });
          delete scopeImports[name];
          this.scopes[<string>scopeBaseUrl] = alphabetize(scopeBase);
        }
        else {
          flattenedAll = false;
        }
      }
      if (flattenedAll)
        delete this.scopes[scope];
    }
    return this;
  }

  rebase (newBaseUrl: string = this.baseUrl.href, absRoot: string | boolean = false) {
    const oldBaseUrl = this.baseUrl;
    this.baseUrl = new URL(newBaseUrl, this.baseUrl);
    if (!this.baseUrl.pathname.endsWith('/')) this.baseUrl.pathname += '/';
    let changedImportProps = false;
    for (const impt of Object.keys(this.imports)) {
      replaceTarget(this.imports, impt, target => {
        if (target !== null)
          return rebase(new URL(target, oldBaseUrl), this.baseUrl, absRoot);
      });
      if (!isPlain(impt)) {
        const newImpt = rebase(new URL(impt, oldBaseUrl), this.baseUrl, absRoot);
        if (newImpt !== impt) {
          changedImportProps = true;
          this.imports[newImpt] = this.imports[impt];
          delete this.imports[impt];
        }
      }
    }
    if (changedImportProps)
      this.imports = alphabetize(this.imports);
    let changedScopeProps = false;
    for (const scope of Object.keys(this.scopes)) {
      const scopeImports = this.scopes[scope];
      let changedScopeImportProps = false;
      for (let name of Object.keys(scopeImports)) {
        replaceTarget(scopeImports, name, target => {
          if (target !== null)
            return rebase(new URL(target, oldBaseUrl), this.baseUrl, absRoot);
        });
        if (!isPlain(name)) {
          const newName = rebase(new URL(name, oldBaseUrl), this.baseUrl, absRoot);
          if (newName !== name) {
            changedScopeImportProps = true;
            scopeImports[newName] = scopeImports[name];
            delete scopeImports[name];
          }
        }
      }
      if (changedScopeImportProps)
        this.scopes[scope] = alphabetize(scopeImports);
      const newScope = rebase(new URL(scope, oldBaseUrl), this.baseUrl, absRoot);
      if (scope !== newScope) {
        changedScopeProps = true;
        delete this.scopes[scope];
        this.scopes[newScope] = scopeImports;
      }
    }
    if (changedScopeProps)
      this.scopes = alphabetize(this.scopes);
    return this;
  }

  /**
   * Narrow all mappings to the given conditional environment constraints
   */
  setEnv (env: string[] | EnvConstraints) {
    for (const impt of Object.keys(this.imports)) {
      const target = this.imports[impt];
      if (typeof target === 'string' || target === null)
        continue;
      this.imports[impt] = resolveConditional(target, env);
    }
    for (const scope of Object.keys(this.scopes)) {
      const scopeImports = this.scopes[scope];
      for (const impt of Object.keys(scopeImports)) {
        const target = scopeImports[impt];
        if (typeof target === 'string' || target === null)
          continue;
        scopeImports[impt] = resolveConditional(target, env);
      }
    }
    return this;
  }

  resolve (specifier: string, parentUrl: URL | string = this.baseUrl, env?: string[] | EnvConstraints): string | ConditionalTarget | null {
    if (typeof parentUrl === 'string')
      parentUrl = new URL(parentUrl);
    let specifierUrl: URL | undefined;
    if (!isPlain(specifier)) {
      specifierUrl = new URL(specifier, parentUrl);
      specifier = specifierUrl.href;
    }
    const scopeMatches = getScopeMatches(parentUrl, this.scopes, this.baseUrl);
    for (const [scope] of scopeMatches) {
      let mapMatch = getMapMatch(specifier, this.scopes[scope]);
      if (!mapMatch && specifierUrl) {
        mapMatch = getMapMatch(specifier = rebase(specifierUrl, this.baseUrl, true), this.scopes[scope]) ||
          getMapMatch(specifier = rebase(specifierUrl, this.baseUrl, false), this.scopes[scope]);
      }
      if (mapMatch) {
        const target = env ? resolveConditional(this.scopes[scope][mapMatch], env) : this.scopes[scope][mapMatch];
        return mapTarget(target, target => {
          if (target === null) return null;
          return new URL(target + specifier.slice(mapMatch.length), this.baseUrl).href;
        });
      }
    }
    let mapMatch = getMapMatch(specifier, this.imports);
    if (!mapMatch && specifierUrl) {
      mapMatch = getMapMatch(specifier = rebase(specifierUrl, this.baseUrl, true), this.imports) ||
          getMapMatch(specifier = rebase(specifierUrl, this.baseUrl, false), this.imports);
    }
    if (mapMatch) {
      const target = env ? resolveConditional(this.imports[mapMatch], env) : this.imports[mapMatch];
      return mapTarget(target, target => {
        if (target === null) return null;
        return new URL(target + specifier.slice(mapMatch.length), this.baseUrl).href;
      });
    }
    if (specifierUrl)
      return specifierUrl.href;
    return null;
  }

  toJSON () {
    const obj: any = {};
    if (Object.keys(this.imports).length) obj.imports = this.imports;
    if (Object.keys(this.scopes).length) obj.scopes = this.scopes;
    // todo: actual deep object clone
    return JSON.parse(JSON.stringify(obj));
  }
}

export function getScopeMatches (parentUrl: URL, scopes: Record<string, Record<string, string | ConditionalTarget | null>>, baseUrl: URL): [string, string][] {
  const parentUrlHref = parentUrl.href;

  let scopeCandidates = Object.keys(scopes).map(scope => [scope, new URL(scope, baseUrl).href]);
  scopeCandidates = scopeCandidates.sort(([, matchA], [, matchB]) => matchA.length < matchB.length ? 1 : -1);

  return scopeCandidates.filter(([, scopeUrl]) => {
    return scopeUrl === parentUrlHref || scopeUrl.endsWith('/') && parentUrlHref.startsWith(scopeUrl);
  }) as [string, string][];
}

export function getMapMatch<T = any> (specifier: string, map: Record<string, T>): string | undefined {
  if (specifier in map) return specifier;
  let curMatch;
  for (const match of Object.keys(map)) {
    const wildcard = match.endsWith('*');
    if (!match.endsWith('/') && !wildcard) continue;
    if (specifier.startsWith(wildcard ? match.slice(0, -1) : match)) {
      if (!curMatch || match.length > curMatch.length)
        curMatch = match;
    }
  }
  return curMatch;
}

export type EnvConstraints = { include?: string[], exclude?: string[], covers?: string[][] };

export function resolveConditional (target: string | ConditionalTarget | null, env: string[] | EnvConstraints = {}) {
  if (typeof target === 'string' || target === null)
    return target;

  if (Array.isArray(env))
    env = { include: env };

  const { include = [], exclude = [], covers = [] } = env;
  const { resolved } = internalResolveConditional(target, { include, exclude, covers }, [], []);
  if (resolved === undefined)
    return null;
  return resolved;
}

function internalResolveConditional (target: string | ConditionalTarget, env: EnvConstraints, pathConditions: string[], closedConditions: string[]): { exhaustive: boolean, resolved: string | ConditionalTarget } {
  if (typeof target === 'string')
    return { exhaustive: true, resolved: target };
  if (target === null)
    return { exhaustive: true, resolved: target };

  let { include, exclude, covers } = env;
  let outConditions = {};
  let outConditionCnt = 0;
  const curClosedConditions: string[] = [];
  for (const cnd of Object.keys(target)) {
    if (closedConditions.includes(cnd))
      continue;
    if (curClosedConditions.includes(cnd))
      continue;
    
    const curPathConditions = [cnd, ...pathConditions];
    const { exhaustive, resolved } = internalResolveConditional(target[cnd], { include, exclude, covers }, curPathConditions, [...closedConditions, ...curClosedConditions]);
    if (exhaustive)
      curClosedConditions.push(cnd);

    if (resolved !== undefined && !exclude.includes(cnd)) {
      outConditions[cnd] = resolved;
      outConditionCnt++;
    }

    // if we have a definite include, return and inline if the only one
    if (cnd === 'default' || include.includes(cnd) || pathConditions.includes(cnd))
      return { exhaustive: true, resolved: outConditionCnt === 1 ? outConditions[cnd] : outConditions };
    
    // if we have completed a cover, then we have no further fallbacks
    if (covers.some(cover => cover.every(cnd => include.includes(cnd) || pathConditions.includes(cnd) || closedConditions.includes(cnd) || curClosedConditions.includes(cnd))))
      return { exhaustive: true, resolved: outConditions };
  }
  if (outConditionCnt === 0)
    return { exhaustive: false, resolved: undefined };
  return { exhaustive: false, resolved: outConditions };
}
