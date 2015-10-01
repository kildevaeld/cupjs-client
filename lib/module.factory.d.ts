import { ModuleConstructor, ControllerConstructor, ModuleOptions } from './typings';
import { Module } from './module';
import { BaseObject } from './object';
import { DIContainer } from 'di';
import { IPromise } from 'utilities';
import { ClassType } from './internal';
export declare class ModuleFactory extends BaseObject {
    private _name;
    private _module;
    private _container;
    private _activator;
    private _serviceActivator;
    private _initializers;
    name: string;
    constructor(name: string, ctor: ModuleConstructor, container: DIContainer);
    controller(name: string, controller: ControllerConstructor | Object): ModuleFactory;
    service(name: string, service: any): ModuleFactory;
    __addFromClassType(classType: ClassType, name: string, target: any): ModuleFactory;
    factory(name: string, factory: Function | Function[]): ModuleFactory;
    _resolveDependencies(deps: string[]): any;
    initialize(fn: Function | Array<any>): ModuleFactory;
    __resolveModuleDependencies(module: Function): any;
    create(options?: ModuleOptions): IPromise<Module>;
}
