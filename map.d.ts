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
    #private;
    constructor(mapBaseUrl: string | URL, initialMap?: IConditionalImportMap);
    clone(): ImportMap;
    extend(map: IImportMap | IConditionalImportMap, overrideScopes?: boolean): this;
    sort(): void;
    set(name: string, target: string | null | ConditionalTarget, parent?: string): void;
    replace(url: string, newUrl: string): this;
    combineSubpaths(): void;
    flatten(): this;
    rebase(newBaseUrl?: string, abs?: boolean): this;
    /**
     * Narrow all mappings to the given conditional environment constraints
     */
    setEnv(env: string[] | EnvConstraints): this;
    resolve(specifier: string, parentUrl?: URL | string, env?: string[] | EnvConstraints): string | ConditionalTarget | null;
    toJSON(): any;
}
export declare type EnvConstraints = {
    include?: string[];
    exclude?: string[];
    covers?: string[][];
};
export declare function resolveConditional(target: string | ConditionalTarget | null, env?: string[] | EnvConstraints): string | ConditionalTarget;
