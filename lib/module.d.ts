import { ModuleOptions } from './typings';
import { BaseObject } from './object';
import { DIContainer } from 'di';
import { IProxy } from './proxy';
export declare class Module extends BaseObject {
    private _container;
    private _name;
    private _el;
    private _ctx;
    name: string;
    el: HTMLElement;
    ctx: IProxy;
    module<T>(name: any): T;
    constructor(container: DIContainer, options: ModuleOptions);
    initialize(): void;
}
