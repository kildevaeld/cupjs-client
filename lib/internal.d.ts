export declare enum ClassType {
    Module = 0,
    Controller = 1,
    Service = 2,
    ModuleFactory = 3,
}
export declare const DINamespace: string;
export declare function classtype(type: ClassType): ClassDecorator;
export declare function getClassType(target: Function): ClassType;
export declare function isClassType(target: Function, type: ClassType): boolean;
export declare function setActivator(target: Function, activator: Object): void;
export declare function setDependencyResolver(target: Function, activator: any): void;
