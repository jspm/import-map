export interface IImportMap {
    imports?: Record<string, string>;
    scopes?: {
        [scope: string]: Record<string, string>;
    };
}
export declare class ImportMap {
    imports: Record<string, string>;
    scopes: Record<string, Record<string, string>>;
    mapUrl: URL;
    rootUrl: URL | null;
    constructor(mapUrl: string | URL, rootUrl?: string | URL | null);
    clone(): ImportMap;
    extend(map: IImportMap | IImportMap, overrideScopes?: boolean): this;
    sort(): void;
    set(name: string, target: string, parent?: string): void;
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
     * In the case where the scope is on the same origin as the mapUrl, the grouped
     * root will never backtrack below the mapUrl, unless specifying the baseScope
     * option to permit a custom backtracking base.
     *
     */
    flatten(baseScope?: URL | string): this;
    rebase(newmapUrl?: string, absRoot?: string | boolean): this;
    resolve(specifier: string, parentUrl?: URL | string): string;
    toJSON(): any;
}
export declare function getScopeMatches(parentUrl: URL, scopes: Record<string, Record<string, string>>, mapUrl: URL): [string, string][];
export declare function getMapMatch<T = any>(specifier: string, map: Record<string, T>): string | undefined;
