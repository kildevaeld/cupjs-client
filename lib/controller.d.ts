import { BaseObject } from './object';
import { View } from 'templ';
import { IProxy } from './proxy/index';
export declare class Controller extends BaseObject {
    private _template;
    ctx: IProxy;
    template: View;
    constructor();
    initialize(): void;
}
