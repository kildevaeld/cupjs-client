import { getDependencies } from './internal';
export class ServiceActivator {
    constructor(container) {
        this.container = container;
    }
    resolveDependencies(fn) {
        let [_, params] = getDependencies(fn);
        let args = new Array(params.length), p;
        for (let i = 0, ii = args.length; i < ii; i++) {
            p = params[i];
            if (p === 'config') {
            }
            else {
                args[i] = this.container.get(p);
            }
        }
        return args;
    }
    invoke(fn, deps, keys) {
        var instance = Reflect.construct(fn, deps);
        if (instance.$instance) {
            instance = instance.$instance;
        }
        return instance;
    }
}
