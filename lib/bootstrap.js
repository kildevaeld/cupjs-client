/// <reference path="typings" />
import { domReady, deferred, Promise, find } from 'utilities';
import { ModuleFactory } from './module.factory';
import { isClassType, ClassType, metadata, getClassType } from './internal';
function resolveControllers(moduleName) {
    if (metadata.has(moduleName)) {
        let meta = metadata.get(moduleName);
        let items = meta.filter(x => isClassType(x.handler, ClassType.Controller));
        return items;
    }
    return [];
}
function resolveServices(moduleName) {
    if (metadata.has(moduleName)) {
        let meta = metadata.get(moduleName);
        let items = meta.filter(x => isClassType(x.handler, ClassType.Service));
        return items;
    }
    return [];
}
function resolveModule(app, moduleName) {
    let factory;
    if (metadata.has(moduleName)) {
        let meta = metadata.get(moduleName);
        let item = find(meta, x => x.name === name);
        if (item && !isClassType(item.handler, ClassType.Module)) {
            let cType = getClassType(item.handler);
            throw new Error(`Item '${name}' found, but it is defined as a '${ClassType[cType]}'`);
        }
        if (item) {
            factory = app.module(moduleName, item.handler);
        }
    }
    if (!factory && app.container.hasHandler(moduleName)) {
        factory = app.container.get(moduleName);
    }
    if (factory) {
        let controllers = resolveControllers(moduleName);
        controllers.forEach(x => {
            factory.controller(x.name, x.handler);
        });
        let services = resolveServices(moduleName);
        services.forEach(x => factory.service(x.name, x.hander));
    }
    return factory;
}
export function bootstrap(app) {
    let defer = deferred();
    domReady(function () {
        let elements = document.querySelectorAll('[moby-app]'), elm, name, mod;
        let queue = [];
        for (let i = 0, ii = elements.length; i < ii; i++) {
            elm = elements[i];
            name = elm.getAttribute('moby-app');
            mod = resolveModule(app, name);
            if (mod == null) {
                console.warn('could not find module for ', name);
                continue;
            }
            if (!(mod instanceof ModuleFactory)) {
                throw new Error(`Module ${name} is not of type: module`);
            }
            queue.push(mod.create({
                el: elm,
                name: name
            }));
        }
        Promise.all(queue).then(defer.resolve, defer.reject);
    });
    return defer.promise;
}
