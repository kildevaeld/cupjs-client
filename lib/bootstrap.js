/// <reference path="typings" />
import { domReady, deferred, Promise, find } from 'utilities';
import { ModuleFactory } from './module.factory';
import { isClassType, ClassType, metadata } from './internal';
function resolveControllers(moduleName) {
    if (metadata.has(moduleName)) {
        let meta = metadata.get(moduleName);
        let items = meta.filter(x => isClassType(x.handler, ClassType.Controller));
        return items;
    }
}
function resolveModule(app, moduleName) {
    let factory;
    if (metadata.has(moduleName)) {
        let meta = metadata.get(moduleName);
        let item = find(meta, x => x.name === name);
        if (item && !isClassType(item.handler, ClassType.Module))
            throw new Error('same same by different');
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
