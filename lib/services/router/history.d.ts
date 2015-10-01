import { BaseObject } from '../../object';
export declare class Handler {
    route: RegExp;
    callback: Function;
}
export declare class HistoryApi extends BaseObject {
    handlers: Handler[];
    location: Location;
    history: History;
    private _started;
    private _wantsPushState;
    private _wantsHashChange;
    root: string;
    options: any;
    fragment: string;
    started: boolean;
    constructor();
    atRoot(): boolean;
    getHash(window?: Window): string;
    getFragment(fragment?: string, forcePushState?: boolean): string;
    start(options?: any): boolean;
    stop(): void;
    route(route: any, callback: any): void;
    checkUrl(): boolean;
    loadUrl(fragment?: string): boolean;
    navigate(fragment: string, options?: any): any;
    _updateHash(location: Location, fragment: string, replace: boolean): void;
}
