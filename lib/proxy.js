import { BaseObject } from './object';
import { toPromise, isPromise, has, callFunc } from 'utilities/lib/index';
import { nextTick } from 'utilities/lib/utils';
export var ProxyEventType;
(function (ProxyEventType) {
    ProxyEventType[ProxyEventType["Add"] = 0] = "Add";
    ProxyEventType[ProxyEventType["Update"] = 1] = "Update";
    ProxyEventType[ProxyEventType["Delete"] = 2] = "Delete";
})(ProxyEventType || (ProxyEventType = {}));
export function createProxy(model) {
    if (typeof Object.observe === 'function') {
        return new ObjectObserveProxy(model);
    }
    else if (typeof (global || window).Proxy === 'function') {
    }
    else {
    }
}
const get_atributes = function (attributes) {
    let keys = Object.keys(attributes), deferred = {}, attr = {};
    keys.map(key => {
        return { key: key, value: attributes[key] };
    }).filter(pair => {
        if (!has(attributes, pair.key))
            return false;
        if (pair.value && isPromise(pair.value)) {
            deferred[pair.key] = pair.value;
            delete attributes[pair.key];
            return false;
        }
        return true;
    }).forEach((a) => {
        attr[a.key] = a.value;
    });
    return { attr, deferred };
};
export class ObjectObserveProxy extends BaseObject {
    constructor(model) {
        super();
        this.model = model;
        this._onchange = utils.bind(this._onchange, this);
        this.__queue = 0;
    }
    $run(fn, ctx, args) {
        this._observe();
        let results = callFunc(fn, ctx, args);
        if (results) {
            this.__queue++;
            toPromise(results)
                .then(() => {
                if (--this.__queue === 0)
                    this._unobserve();
            });
        }
        else {
            nextTick(() => {
                if (this.__queue == 0)
                    this._unobserve;
            });
        }
    }
    _observe() {
        Object.observe(this, this._onchange);
    }
    _unobserve() {
        Object.unobserve(this, this._onchange);
    }
    _onchange(events) {
        let props = {};
        for (let i = 0, ii = events.length; i < ii; i++) {
            let e = events[i];
            if (e.name === '__queue')
                continue;
            if (e.type === 'delete') {
                this.model.unset(e.name, {});
            }
            else {
                props[e.name] = this[e.name];
            }
        }
        let { attr, deferred } = get_atributes(props);
        if (Object.keys(attr).length)
            this.model.set(attr);
        if (Object.keys(deferred).length) {
            this.__queue++;
            toPromise(props)
                .then((props) => {
                if (--this.__queue === 0) {
                    this._unobserve();
                }
                this.model.set(props);
            }).catch((e) => {
                this.trigger('error', e);
                this._unobserve();
            });
        }
    }
}
