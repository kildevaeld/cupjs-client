import { DIContainer } from 'di';
export declare class ControllerActivator {
    private container;
    constructor(container: DIContainer);
    resolveDependencies(fn: Function, deps?: any[]): any[];
    invoke(target: FunctionConstructor, args: any[], keys: string[]): any;
}
