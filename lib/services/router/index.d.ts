import { Router, RouteHandler } from './router';
import { IProxy } from '../../proxy/index';
export interface RouteOptions {
    controller: string;
    template?: string;
    target?: string | HTMLElement;
}
export declare class RouterService {
    router: Router;
    context: IProxy;
    constructor(context: IProxy);
    route(route: string | RegExp, handler: RouteHandler | RouteOptions): RouterService;
    private __execute(callback, args);
    private __handleController(options);
}
