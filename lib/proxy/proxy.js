import { extend, toPromise, bind, callFunc, nextTick, deferred, isObject } from 'utilities/lib/index';
import { NestedModel, Collection } from 'collection';
import { get_atributes } from './index';
import { BaseObject } from '../object';
export class AbstractProxy extends BaseObject {
    constructor(model, parent) {
        super();
        this.model = model || new NestedModel();
        this.listenTo(this.model, 'change', this.__onModelChange);
        this.parent = parent;
        if (parent) {
            this.listenTo(parent, 'destroy', this.destroy);
            this.listenTo(parent, 'proxy$observe', this.observe);
            this.listenTo(parent, 'proxy$unobserve', this.unobserve);
        }
        this.__queue = 0;
        this._onchange = bind(this._onchange, this);
    }
    get root() {
        if (!this.parent)
            return this;
        let root = this.parent;
        while (root) {
            if (root.parent)
                root = root.parent;
            else
                return root;
        }
        return root;
    }
    $run(fn, ctx, args) {
        this.observe();
        let results = callFunc(fn, ctx, args);
        if (results) {
            this.__queue++;
            return toPromise(results)
                .then(() => {
                if (--this.__queue === 0)
                    this.unobserve();
                return results;
            });
        }
        else {
            let defer = deferred();
            nextTick(() => {
                if (this.__queue == 0)
                    this.unobserve();
                defer.resolve(null);
            });
            return defer.promise;
        }
    }
    __executeListener(fn, ctx, args) {
        this.$run(fn, ctx, args);
    }
    __onModelChange() {
        /*let changed = this.model.changed;
        this.observe();
        for (let key in changed) {
            this.trigger(key, changed[key]);
        }
        this.unobserve();*/
    }
    _onchange(events) {
        let props = {};
        for (let i = 0, ii = events.length; i < ii; i++) {
            let e = events[i];
            let names = e.name.split('.');
            if (e.name === '__observing' || e.name === '__queue' || names[0] == '_listeners')
                continue;
            if (e.type === 'delete') {
                this.model.set(e.name, { unset: true });
            }
            else {
                props[e.name] = this[e.name];
            }
        }
        let { attr, deferred } = get_atributes(props);
        if (Object.keys(attr).length) {
            let props = this.__normalizeAttr(attr);
            this.unobserve();
            this.model.set(props);
            extend(this, props);
            this.observe();
        }
        if (Object.keys(deferred).length) {
            this.__queue++;
            toPromise(deferred)
                .then((props) => {
                if (--this.__queue === 0) {
                    this.unobserve();
                }
                props = this.__normalizeAttr(props);
                extend(this, props);
                this.model.set(props);
            }).catch((e) => {
                this.model.trigger('error', e);
                this.unobserve();
            });
        }
    }
    __normalizeAttr(attr) {
        for (let key in attr) {
            let val = attr[key];
            if (Array.isArray(val) && val.length > 0 && isObject(val[0])) {
                val = new Collection(val);
                attr[key] = val;
            }
        }
        return attr;
    }
    observe() {
        if (this.__observing)
            return;
        if (this.parent) {
            this.parent.observe();
        }
        this.__observing = true;
        this.trigger('proxy$observe');
    }
    unobserve() {
        if (!this.__observing)
            return;
        if (this.parent) {
            this.parent.unobserve();
        }
        this.__observing = false;
        this.trigger('proxy$unobserve');
    }
    $on() {
        if (this == this.root) {
        }
        return this;
    }
    destroy() {
        this.unobserve();
        this.trigger('before:destroy');
        this.model.destroy();
        super.destroy();
        this.trigger('destroy');
        if (typeof Object.freeze === 'function') {
            Object.freeze(this);
        }
    }
    createChild() { throw new Error('not implemented'); }
}
