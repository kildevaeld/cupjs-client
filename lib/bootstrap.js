/// <reference path="typings" />
import { domReady, deferred, Promise } from 'utilities/lib/index';
import { ModuleFactory } from './module.factory';
export function bootstrap(app) {
    let defer = deferred();
    domReady(function () {
        let elements = document.querySelectorAll('[moby-app]'), elm, name, mod;
        let queue = [];
        for (let i = 0, ii = elements.length; i < ii; i++) {
            elm = elements[i];
            name = elm.getAttribute('moby-app');
            if (!app.container.hasHandler(name))
                continue;
            mod = app.container.get(name);
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
