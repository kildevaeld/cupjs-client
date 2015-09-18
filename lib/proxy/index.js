import { ObjectObserveProxy } from './object-observe';
import { DirtyObjectObserver } from './dirty-observe';
import { has, isPromise } from 'utilities/lib/index';
export function createProxy(model) {
    if (typeof Object.observe === 'function') {
        return new ObjectObserveProxy(model);
    } /*else if (typeof (global||window).Proxy  === 'function') {
        
    }*/
    else {
        return new DirtyObjectObserver(model);
    }
}
export const get_atributes = function (attributes) {
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
