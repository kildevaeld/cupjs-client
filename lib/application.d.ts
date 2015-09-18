import { ModuleConstructor, ControllerConstructor } from './typings';
import { ModuleFactory } from './module.factory';
import { BaseObject } from './object';
import * as utils from 'utilities/lib/index';
import { DIContainer } from 'di';
export declare class Application extends BaseObject {
    static Module: ModuleConstructor;
    static Controller: ControllerConstructor;
    static utils: typeof utils;
    private _container;
    private _activator;
    container: DIContainer;
    constructor();
    module(name: string, definition?: ModuleConstructor | Object, config?: any): ModuleFactory;
    service(name: string, definition?: any, config?: any): Application;
    createContainer(): DIContainer;
    component(name: string): void;
}
