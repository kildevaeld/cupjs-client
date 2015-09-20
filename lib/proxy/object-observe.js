import { NestedModel } from 'collection';
import { AbstractProxy } from './proxy';
export class ObjectObserveProxy extends AbstractProxy {
    observe() {
        Object.observe(this, this._onchange);
        if (this.parent)
            this.parent.observe();
    }
    unobserve() {
        Object.unobserve(this, this._onchange);
        if (this.parent)
            this.parent.unobserve();
    }
    createChild() {
        return new ObjectObserveProxy(new NestedModel(), this);
    }
}
