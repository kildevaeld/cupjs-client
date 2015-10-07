import { Router, RouteHandler } from './router';
import { IProxy } from '../../proxy/index';
import { DIContainer } from 'di';
export interface RouteOptions {
    controller: string;
    template?: string;
    target?: string | HTMLElement;
}
export declare class RouterService {
    router: Router;
    context: IProxy;
    container: DIContainer;
    constructor(context: IProxy, container: DIContainer);
    route(route: string | RegExp, handler: RouteHandler | RouteOptions): RouterService;
    private __execute(callback, args);
    private __handleController(options);
}
