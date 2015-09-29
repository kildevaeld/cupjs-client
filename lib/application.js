import { Module } from './module';
import { ModuleFactory } from './module.factory';
import { BaseObject } from './object';
import { isClassType, ClassType, setActivator, setDependencyResolver, classtype, getDependencies } from './internal';
import { DIContainer, FactoryActivator } from 'di';
import { ServiceActivator } from './service.activator';
import { isObject } from 'utilities';
import { Debug } from 'utilities';
const debug = Debug.create("moby:application");
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
    module(name, definition) {
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
            if (definition.constructor) {
                definition.initialize = definition.constructor;
                delete definition.constructor;
            }
            mod = Module.extend(definition);
        }
        else {
            throw new Error('wrong module type');
        }
        debug("define module: %s", name);
        let factory = new ModuleFactory(this, name, mod);
        this._container.registerInstance(name, factory);
        return factory;
    }
    service(name, definition) {
        let [fn, deps] = getDependencies(definition);
        debug('defining service %s', name, fn, deps);
        if (fn) {
            fn.inject = deps;
            setActivator(fn, this._activator);
            setDependencyResolver(fn, this._activator);
            classtype(ClassType.Service)(fn);
            this._container.registerSingleton(name, fn);
        }
        else {
            this._container.registerInstance(name, definition);
        }
        return this;
    }
    factory(name, factory) {
        let [fn, deps] = getDependencies(factory);
        if (fn != null) {
            fn.inject = deps;
            setActivator(fn, FactoryActivator.instance);
            setDependencyResolver(fn, this._activator);
            this._container.registerSingleton(name, fn);
        }
        else {
            this._container.registerInstance(name, factory);
        }
        return this;
    }
    createContainer() {
        return this._container.createChild();
    }
}
