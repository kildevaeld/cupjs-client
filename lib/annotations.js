import { metadata, ClassType, classtype } from './internal';
import { camelcase, find } from 'utilities';
export function controller(moduleName, controllerName) {
    return function (target) {
        let name = controllerName || camelcase(target.name);
        let map = {
            name: name,
            handler: target
        };
        classtype(ClassType.Controller)(target);
        if (!metadata.has(moduleName)) {
            metadata.set(moduleName, []);
        }
        let types = metadata.get(moduleName);
        let exists = find(types, i => i.name === name);
        if (exists) {
            throw new Error('controller already exists in module');
        }
        metadata.get(moduleName).push(map);
    };
}
export function module(moduleName) {
    return function (target) {
    };
}
