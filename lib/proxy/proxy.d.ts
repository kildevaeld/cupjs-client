import { IModel } from 'collection';
import { IProxy, ProxyEvent } from './index';
import { BaseObject } from '../object';
export declare abstract class AbstractProxy extends BaseObject implements IProxy {
    model: IModel;
    __queue: number;
    [x: string]: any;
    parent: IProxy;
    __observing: any;
    root: IProxy;
    constructor(model?: IModel, parent?: IProxy);
    $run(fn: Function, ctx: any, args: any[]): any;
    __executeListener(fn: Function, ctx: any, args: any[]): void;
    private __onModelChange();
    protected _onchange(events: ProxyEvent[]): void;
    private __normalizeAttr(attr);
    observe(): void;
    unobserve(): void;
    $on(): IProxy;
    destroy(): void;
    createChild(): IProxy;
}
