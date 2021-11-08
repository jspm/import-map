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
export declare class ImportMap {
    imports: Record<string, string | ConditionalTarget | null>;
    scopes: Record<string, Record<string, string | ConditionalTarget | null>>;
    baseUrl: URL;
    constructor(mapBaseUrl: string | URL, initialMap?: IConditionalImportMap);
    clone(): ImportMap;
    extend(map: IImportMap | IConditionalImportMap, overrideScopes?: boolean): this;
    sort(): void;
    set(name: string, target: string | null | ConditionalTarget, parent?: string): void;
    replace(url: string, newUrl: string): this;
    combineSubpaths(): void;
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
    flatten(baseScope?: URL | string): this;
    rebase(newBaseUrl?: string, absRoot?: string | boolean): this;
    /**
     * Narrow all mappings to the given conditional environment constraints
     */
    setEnv(env: string[] | EnvConstraints): this;
    resolve(specifier: string, parentUrl?: URL | string, env?: string[] | EnvConstraints): string | ConditionalTarget | null;
    toJSON(): any;
}
export declare function getScopeMatches(parentUrl: URL, scopes: Record<string, Record<string, string | ConditionalTarget | null>>, baseUrl: URL): [string, string][];
export declare function getMapMatch<T = any>(specifier: string, map: Record<string, T>): string | undefined;
export declare type EnvConstraints = {
    include?: string[];
    exclude?: string[];
    covers?: string[][];
};
export declare function resolveConditional(target: string | ConditionalTarget | null, env?: string[] | EnvConstraints): string | ConditionalTarget;
