import { NestedModel } from 'collection';
import { AbstractProxy } from './proxy';
export class ObjectObserveProxy extends AbstractProxy {
    observe() {
        Object.observe(this, this._onchange);
    }
    unobserve() {
        Object.unobserve(this, this._onchange);
    }
    createChild() {
        return new ObjectObserveProxy(new NestedModel(), this);
    }
}
