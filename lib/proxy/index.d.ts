import { IModel } from 'collection';
import { IEventEmitter } from 'eventsjs';
export interface ProxyEvent {
    name: string;
    object: any;
    type: string;
    oldValue?: any;
}
export interface IProxy extends IEventEmitter {
    model: IModel;
    parent?: IProxy;
    $run(fn: Function, ctx: any, args: any[]): any;
    [x: string]: any;
    destroy(): any;
    createChild(): IProxy;
    observe(): any;
    unobserve(): any;
}
export declare function createProxy(model: IModel): IProxy;
export declare const get_atributes: (attributes: any) => {
    attr: {};
    deferred: {};
};
