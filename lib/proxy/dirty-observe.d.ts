import { AbstractProxy } from './proxy';
import { IProxy } from './index';
import { IModel } from 'collection';
export declare class DirtyObjectObserver extends AbstractProxy implements IProxy {
    private __timer;
    observe(): void;
    unobserve(): void;
    _check(model: IModel): void;
    createChild(): IProxy;
}
