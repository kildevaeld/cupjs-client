import { ModuleOptions } from './typings';
import { BaseObject } from './object';
import { DIContainer } from 'di';
import { IProxy } from './proxy/index';
export declare class Module extends BaseObject {
    private _container;
    private _name;
    private _el;
    private _ctx;
    private _templ;
    name: string;
    el: HTMLElement;
    ctx: IProxy;
    container: DIContainer;
    module<T>(name: any): T;
    /**
     * Module
     * @param {DIContainer} container
     * @param {Object} options
     */
    constructor(container: DIContainer, options: ModuleOptions);
    initialize(): void;
    destroy(): void;
}
