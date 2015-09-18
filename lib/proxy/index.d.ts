import { IModel } from 'collection';
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
    model: IModel;
    parent?: IProxy;
    $run(fn: Function, ctx: any, args: any[]): any;
    [x: string]: any;
    destroy(): any;
    createChild(): IProxy;
}
export declare function createProxy(model: IModel): IProxy;
export declare const get_atributes: (attributes: any) => {
    attr: {};
    deferred: {};
};
