import { ModuleConstructor, ControllerConstructor, ModuleOptions } from './typings';
import { Module } from './module';
import { BaseObject } from './object';
import { DIContainer } from 'di';
import { IPromise } from 'utilities/lib/index';
export declare class ModuleFactory extends BaseObject {
    private _name;
    private _app;
    private _module;
    private _container;
    private _activator;
    private _serviceActivator;
    private _initializers;
    name: string;
    constructor(name: string, ctor: ModuleConstructor, container: DIContainer);
    controller(name: string, controller: ControllerConstructor | Object): ModuleFactory;
    service(name: string, service: any): ModuleFactory;
    factory(name: string, factory: Function | Function[]): ModuleFactory;
    resolveDepdencies: any;
    initialize(fn: Function | Array<any>): ModuleFactory;
    create(options?: ModuleOptions): IPromise<Module>;
    resolveDependencies(fn: Function): any[];
    invoke(fn: any, deps: any[], keys?: any[]): any;
}
