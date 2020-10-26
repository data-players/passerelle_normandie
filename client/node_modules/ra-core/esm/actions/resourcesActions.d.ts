export declare const REGISTER_RESOURCE = "RA/REGISTER_RESOURCE";
export interface ResourceDefinition {
    readonly name: string;
    readonly options?: any;
    readonly hasList?: boolean;
    readonly hasEdit?: boolean;
    readonly hasShow?: boolean;
    readonly hasCreate?: boolean;
    readonly icon?: any;
}
export interface RegisterResourceAction {
    readonly type: typeof REGISTER_RESOURCE;
    readonly payload: ResourceDefinition;
}
export declare const registerResource: (resource: ResourceDefinition) => RegisterResourceAction;
export declare const UNREGISTER_RESOURCE = "RA/UNREGISTER_RESOURCE";
export interface UnregisterResourceAction {
    readonly type: typeof UNREGISTER_RESOURCE;
    readonly payload: string;
}
export declare const unregisterResource: (resourceName: string) => UnregisterResourceAction;
