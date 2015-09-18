import { BaseObject } from '../object';
import { IProxy } from './index';
import { NestedModel } from 'collection';
export declare class ObjectObserveProxy extends BaseObject implements IProxy {
    model: NestedModel;
    __queue: number;
    [x: string]: any;
    parent: ObjectObserveProxy;
    constructor(model: NestedModel, parent?: ObjectObserveProxy);
    $run(fn: Function, ctx: any, args: any[]): any;
    private _observe();
    private _unobserve();
    private _onchange(events);
    createChild(): ObjectObserveProxy;
}
