import './template/index';
import * as utils from 'utilities';
import { DIContainer } from 'di';
import { Collection, NestedModel } from 'collection';
import { BaseObject } from './object';
import { Module } from './module';
import { TemplateResolver, HttpService } from './services/index';
import { getDependencies, ClassType } from './internal';
import { ModuleFactory } from './module.factory';
import { bootstrap } from './bootstrap';
import { Repository } from './repository';
import * as annotations from './annotations';
const container = new DIContainer();
container.registerSingleton("templateResolver", TemplateResolver);
export const moby = {
    EventEmitter: BaseObject,
    utils: utils,
    Module: Module,
    Collection: Collection,
    Model: NestedModel,
    annotations: annotations,
    component(name, cmp) {
        if (typeof cmp !== 'function') {
            cmp = utils.inherits(templ.components.BaseComponent, cmp);
        }
        templ.component(name, cmp);
        return moby;
    },
    attribute(name, attr) {
        if (typeof attr !== 'function') {
            attr = utils.inherits(templ.attributes.BaseAttribute, attr);
        }
        templ.attribute(name, attr);
        return moby;
    },
    modifier(name, converter) {
        templ.modifier(name, converter);
        return moby;
    },
    module(name, definition) {
        if (definition == null) {
            return Repository.get(ClassType.ModuleFactory, name);
        }
        let [fn, _] = getDependencies(definition);
        if (fn == null) {
            throw new Error('module');
        }
        let mod;
        if (utils.isObject(fn) && typeof fn !== 'function') {
            if (fn.constructor != null) {
                fn.initialize = fn.constructor;
                delete definition.constructor;
            }
            mod = Module.extend(definition);
        }
        else if (typeof fn == 'function') {
            mod = fn;
        }
        else {
            throw new Error('module type');
        }
        let factory = new ModuleFactory(name, mod, container.createChild());
        Repository.add(ClassType.ModuleFactory, name, factory);
        return factory;
    },
    service(name, definition) {
        if (definition == null) {
            throw new Error('no def');
        }
        let [fn] = getDependencies(definition);
        if (typeof fn !== 'function')
            throw new Error('fn');
        Repository.add(ClassType.Service, name, fn);
        return moby;
    },
    factory(name, factory) {
        if (factory == null) {
            throw new Error('no factory');
        }
        let [fn] = getDependencies(factory);
        if (fn == null)
            throw new Error('no factory');
        Repository.add(ClassType.Service, name, fn);
        return moby;
    }
};
// Add default services
moby.service('http', HttpService);
// bootstrap
bootstrap(moby);
