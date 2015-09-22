import { ModuleConstructor, ControllerConstructor, ModuleOptions } from './typings';
import { Module } from './module';
import { BaseObject } from './object';
import { Application } from './application';
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
    constructor(app: Application, name: string, ctor: ModuleConstructor, config: any);
    controller(name: string, controller: ControllerConstructor | Object): ModuleFactory;
    service(name: string, service: any, config?: any): ModuleFactory;
    factory(name: string, factory: Function): ModuleFactory;
    initialize(fn: Function | Array<any>): ModuleFactory;
    create(options?: ModuleOptions): IPromise<Module>;
}
