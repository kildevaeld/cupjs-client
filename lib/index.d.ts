import { Application } from './application';
import * as utils from 'utilities';
import { Collection, NestedModel } from 'collection';
import { BaseObject } from './object';
import { Module } from './module';
import { ModuleConstructor } from './typings';
import { ModuleFactory } from './module.factory';
import * as annotations from './annotations';
export interface ITemplateDeclaration {
    update?: () => void;
    initialize?: () => void;
}
export declare const moby: {
    EventEmitter: typeof BaseObject;
    utils: typeof utils;
    Module: typeof Module;
    Collection: typeof Collection;
    Model: typeof NestedModel;
    annotations: typeof annotations;
    component(name: string, cmp: ITemplateDeclaration | templ.vnode.ComponentConstructor): Application;
    attribute(name: string, attr: ITemplateDeclaration | templ.vnode.AttributeConstructor): Application;
    modifier(name: string, converter: (any: any) => any): Application;
    module(name: string, definition?: ModuleConstructor | Object, config?: any): ModuleFactory;
    service(name: string, definition?: any, config?: any): Application;
    factory(name: string, facory: any): Application;
};
