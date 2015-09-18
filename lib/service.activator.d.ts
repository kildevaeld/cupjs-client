import { DIContainer } from 'di';
export declare class ServiceActivator {
    container: DIContainer;
    constructor(container: DIContainer);
    resolveDependencies(fn: Function): any[];
    invoke(fn: any, deps: any[], keys?: any[]): any;
}
