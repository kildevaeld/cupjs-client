import { Metakey } from './typings';
import { Metadata, getFunctionParameters } from 'di';
import { result } from 'utilities';
export var ClassType;
(function (ClassType) {
    ClassType[ClassType["Module"] = 0] = "Module";
    ClassType[ClassType["Controller"] = 1] = "Controller";
    ClassType[ClassType["Service"] = 2] = "Service";
    ClassType[ClassType["ModuleFactory"] = 3] = "ModuleFactory";
    ClassType[ClassType["Factory"] = 4] = "Factory";
})(ClassType || (ClassType = {}));
export const DINamespace = "mobyjs";
export const DIServiceConfig = "mobyjs:service:config";
export const metadata = new Map();
export function classtype(type) {
    return function (target) {
        let str = Metakey[Metakey.ClassType];
        Metadata.define(str, type, target, DINamespace);
    };
}
export function getClassType(target) {
    let key = Metakey[Metakey.ClassType], type = Metadata.getOwn(key, target, DINamespace);
    return type;
}
export function isClassType(target, type) {
    return getClassType(target) === type;
}
export function setActivator(target, activator) {
    let instanceActivatorKey = Metadata.instanceActivator;
    Metadata.define(instanceActivatorKey, activator, target, undefined);
}
export function setDependencyResolver(target, activator) {
    let dependencyResolverKey = Metadata.dependencyResolver;
    Metadata.define(dependencyResolverKey, activator, target, undefined);
}
export function getDependencies(fn) {
    let dependencies;
    if (fn.constructor === Array) {
        let tmp = fn.pop();
        dependencies = fn;
        fn = tmp;
    }
    else if (typeof fn === 'function') {
        dependencies = result(fn, "inject");
        if (!dependencies || dependencies.length == 0) {
            dependencies = getFunctionParameters(fn);
            fn.inject = dependencies;
        }
    }
    else {
        return [fn, null];
    }
    return [fn, dependencies];
}
