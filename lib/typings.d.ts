import { Module } from './module';
import { Controller } from './controller';
import { DIContainer } from 'di';
import { View } from 'templ';
import { BaseObject } from './object';
import { Collection, NestedModel } from 'collection';
import { ModuleFactory } from './module.factory';
export interface ModuleOptions {
    el?: HTMLElement;
    name?: string;
}
export interface ModuleConstructor {
    new (container: DIContainer, options: ModuleOptions): Module;
}
export interface ControllerOptions {
    template?: View;
}
export interface ControllerConstructor {
    new (options: ControllerOptions): Controller;
}
export declare enum Metakey {
    ClassType = 0,
}
export interface ITemplateDeclaration {
    update?: () => void;
    initialize?: () => void;
}
export interface Moby {
    EventEmitter: typeof BaseObject;
    Module: typeof Module;
    Collection: typeof Collection;
    Model: typeof NestedModel;
    utils: any;
    annotations: any;
    component(name: string, cmp: ITemplateDeclaration | templ.vnode.ComponentConstructor): Moby;
    attribute(name: string, attr: ITemplateDeclaration | templ.vnode.AttributeConstructor): Moby;
    modifier(name: string, converter: (any) => any): Moby;
    module(name: string, definition?: any): ModuleFactory;
    service(name: string, definition?: any): Moby;
    factory(name: string, factory: any): Moby;
}
