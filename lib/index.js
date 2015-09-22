import './template/index';
import { Application } from './application';
import * as utils from 'utilities';
import { Collection, NestedModel } from 'collection';
import { BaseObject } from './object';
import { Module } from './module';
import { TemplateResolver, HttpService } from './services/index';
import { DINamespace } from './internal';
import { bootstrap } from './bootstrap';
import * as annotations from './annotations';
const instance = new Application();
instance.container.registerSingleton("templateResolver", TemplateResolver, DINamespace);
instance.service('http', HttpService);
bootstrap(instance);
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
        return instance;
    },
    attribute(name, attr) {
        if (typeof attr !== 'function') {
            attr = utils.inherits(templ.attributes.BaseAttribute, attr);
        }
        templ.attribute(name, attr);
        return instance;
    },
    modifier(name, converter) {
        templ.modifier(name, converter);
        return instance;
    },
    module(name, definition, config) {
        return instance.module(name, definition);
    },
    service(name, definition, config) {
        instance.service(name, definition, config);
        return instance;
    },
    factory(name, facory) {
        return instance.factory(name, facory);
    }
};
