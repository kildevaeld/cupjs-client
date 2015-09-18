import { Module } from './module';
import { Controller } from './controller';
import { ModuleFactory } from './module.factory';
import { BaseObject } from './object';
import * as utils from 'utilities/lib/index';
import { isClassType, ClassType, setActivator, setDependencyResolver, classtype } from './internal';
import { DIContainer } from 'di';
import { ServiceActivator } from './service.activator';
import * as templ from 'templ';
import { isObject } from 'utilities/lib/objects';
export class Application extends BaseObject {
    constructor() {
        super();
        this._bootstraped = false;
        this._container = new DIContainer();
        this._activator = new ServiceActivator(this._container);
    }
    get container() {
        return this._container;
    }
    module(name, definition, config) {
        if (definition == null) {
            if (!this._container.hasHandler(name)) {
                throw new Error("module does not exits");
            }
            return this._container.get(name);
        }
        let mod;
        if (typeof definition === 'function' && isClassType(definition, ClassType.Module)) {
            mod = definition;
        }
        else if (isObject(definition)) {
            mod = Module.extend(definition);
        }
        else {
            throw new Error('wrong module type');
        }
        let factory = new ModuleFactory(this, name, mod, config);
        this._container.registerInstance(name, factory);
        return factory;
    }
    service(name, definition, config) {
        if (typeof definition === 'function') {
            setActivator(definition, this._activator);
            setDependencyResolver(definition, this._activator);
            classtype(ClassType.Service)(definition);
            if (config != null) {
                if (typeof config === 'function') {
                    this._container.registerSingleton(definition, config);
                }
                else {
                    this._container.registerInstance(definition, config);
                }
            }
            this._container.registerSingleton(name, definition);
        }
        else {
            this._container.registerInstance(name, definition);
        }
        return this;
    }
    createContainer() {
        return this._container.createChild();
    }
    component(name) {
        templ.component(name, null);
    }
}
Application.Module = Module;
Application.Controller = Controller;
Application.utils = utils;
