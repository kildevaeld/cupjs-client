import { getFunctionParameters } from 'di';
export class ServiceActivator {
    constructor(container) {
        this.container = container;
    }
    resolveDependencies(fn) {
        let params = getFunctionParameters(fn), args = new Array(params.length);
        let p;
        for (let i = 0, ii = args.length; i < ii; i++) {
            p = params[i];
            if (p === 'config') {
                args[i] = this.container.get(fn);
            }
            else {
                args[i] = this.container.get(p);
            }
        }
        return args;
    }
    invoke(fn, deps, keys) {
        console.log('service activator');
        var instance = Reflect.construct(fn, deps);
        if (instance.$instance) {
            instance = instance.$instance;
        }
        return instance;
    }
}
