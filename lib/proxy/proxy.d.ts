import { IModel } from 'collection';
import { IProxy, ProxyEvent } from './index';
export declare abstract class AbstractProxy {
    model: IModel;
    __queue: number;
    [x: string]: any;
    parent: IProxy;
    constructor(model?: IModel, parent?: IProxy);
    $run(fn: Function, ctx: any, args: any[]): any;
    protected _onchange(events: ProxyEvent[]): void;
    observe(): void;
    unobserve(): void;
    destroy(): void;
}
