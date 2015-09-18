import { isPromise, has } from 'utilities/lib/index';
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
