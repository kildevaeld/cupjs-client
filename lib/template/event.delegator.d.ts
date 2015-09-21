import { IDelegator } from 'templ';
import { IProxy } from '../proxy/index';
import { DIContainer } from 'di';
export declare class EventDelegator implements IDelegator {
    target: any;
    proxy: IProxy;
    container: DIContainer;
    constructor(target: any, proxy: IProxy, container: DIContainer);
    addListener(elm: Element, eventName: string, callback: string | EventListener, capture?: boolean): Function;
    removeListener(elm: Element, eventName: string, callback: string | EventListener, capture?: boolean): void;
    addDelegate(elm: Element, selector: string, eventName: string, callback: string | EventListener, capture?: boolean): Function;
    removeDelegate(elm: Element, selector: string, eventName: string, callback: EventListener): void;
    private _getCallback(callback);
    private _wrapFunc(func, ctx);
}
