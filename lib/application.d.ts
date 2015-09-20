import { ModuleConstructor, ControllerConstructor } from './typings';
import { Module } from './module';
import { ModuleFactory } from './module.factory';
import { BaseObject } from './object';
import * as utils from 'utilities';
import { DIContainer } from 'di';
import * as templ from 'templ';
export declare class Application extends BaseObject {
    Module: typeof Module;
    Controller: ControllerConstructor;
    utils: typeof utils;
    templ: typeof templ;
    private _container;
    private _activator;
    private _bootstraped;
    container: DIContainer;
    constructor();
    module(name: string, definition?: ModuleConstructor | Object, config?: any): ModuleFactory;
    service(name: string, definition?: any, config?: any): Application;
    createContainer(): DIContainer;
    component(name: string): void;
}
