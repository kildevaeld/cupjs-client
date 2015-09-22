import { ModuleConstructor } from './typings';
import { ModuleFactory } from './module.factory';
import { BaseObject } from './object';
import { DIContainer } from 'di';
export declare class Application extends BaseObject {
    private _container;
    private _activator;
    private _bootstraped;
    container: DIContainer;
    constructor();
    module(name: string, definition?: ModuleConstructor | Object, config?: any): ModuleFactory;
    service(name: string, definition?: any, config?: any): Application;
    factory(name: string, factory: Function): Application;
    createContainer(): DIContainer;
}
