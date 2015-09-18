import { Model } from 'collection';
export declare enum ProxyEventType {
    Add = 0,
    Update = 1,
    Delete = 2,
}
export interface ProxyEvent {
    name: string;
    object: any;
    type: string;
    oldValue?: any;
}
export interface IProxy {
    $run(fn: Function, ctx: any, args: any[]): any;
    [x: string]: any;
    destroy(): any;
}
export declare function createProxy(model: Model): IProxy;
