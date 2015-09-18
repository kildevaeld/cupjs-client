import { IProxy } from './index';
import { AbstractProxy } from './proxy';
export declare class ObjectObserveProxy extends AbstractProxy implements IProxy {
    observe(): void;
    unobserve(): void;
    createChild(): ObjectObserveProxy;
}
