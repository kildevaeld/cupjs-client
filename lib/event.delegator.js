import * as utils from 'utilities';
import { getFunctionParameters } from 'di';
export class EventDelegator {
    constructor(target, proxy, container) {
        this.target = target;
        this.proxy = proxy;
        this.container = container;
    }
    addListener(elm, eventName, callback, capture) {
        let fn = this._getCallback(callback);
        utils.addEventListener(elm, eventName, fn, capture);
        return fn;
    }
    removeListener(elm, eventName, callback, capture) {
        utils.removeEventListener(elm, eventName, callback);
    }
    addDelegate(elm, selector, eventName, callback, capture) {
        let fn = this._getCallback(callback);
        utils.delegate(elm, selector, eventName, fn, capture);
        return fn;
    }
    removeDelegate(elm, selector, eventName, callback) {
        utils.undelegate(elm, selector, eventName, callback);
    }
    _getCallback(callback) {
        if (typeof callback === 'function') {
            return this._wrapFunc(callback, this.proxy);
        }
        if (typeof this.target[callback] === 'function') {
            return this._wrapFunc(this.target[callback], this.target);
        }
        else if (typeof this.proxy[callback] === 'function') {
            return this._wrapFunc(this.target[callback], this.proxy);
        }
        throw new Error(`function named: '${callback}' not found on target or proxy`);
    }
    _wrapFunc(func, ctx) {
        return (e) => {
            let keys = getFunctionParameters(func);
            let args = keys.map(a => {
                if (a === 'e' || a === 'event' || a === 'ev') {
                    return utils.Promise.resolve(e);
                }
                else if (a === 'ctx' || a === 'context') {
                    return utils.Promise.resolve(this.proxy);
                }
                return this.container.get(a);
            });
            utils.toPromise(args)
                .then((ret) => {
                return this.proxy.$run(func, ctx, ret);
            }).catch(e => {
                throw e;
            });
        };
    }
}
