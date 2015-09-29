import { NestedModel } from 'collection';
import { AbstractProxy } from './proxy';
export class ObjectObserveProxy extends AbstractProxy {
    observe() {
        if (this.__observing)
            return;
        Object.observe(this, this._onchange);
        super.observe();
    }
    unobserve() {
        if (!this.__observing)
            return;
        Object.unobserve(this, this._onchange);
        super.unobserve();
    }
    createChild() {
        return new ObjectObserveProxy(new NestedModel(), this);
    }
}
