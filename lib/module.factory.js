import { Controller } from './controller';
import { BaseObject } from './object';
import { getFunctionParameters } from 'di';
import { isObject, extend, Promise, toPromise, isPromise } from 'utilities/lib/index';
import { DINamespace, setActivator, setDependencyResolver, classtype, ClassType } from './internal';
import { ServiceActivator } from './service.activator';
class ControllerActivator {
    constructor(container) {
        this.container = container;
    }
    resolveDependencies(fn) {
        if (fn.__metadata__.undefined['design:paramtypes']) {
            delete fn.__metadata__.undefined['design:paramtypes'];
        }
        let params = getFunctionParameters(fn), args = new Array(params.length);
        let p;
        let ctx = this.container.get('context');
        let childCtx = ctx.createChild();
        for (let i = 0, ii = args.length; i < ii; i++) {
            p = params[i];
            if (p === 'config') {
                args[i] = this.container.get(fn);
            }
            else if (p === 'ctx' || p === 'context') {
                args[i] = childCtx;
            }
            else {
                args[i] = this.container.get(p);
            }
        }
        return [args, childCtx];
    }
    invoke(target, args, keys) {
        let deps = args[0];
        let ctx = args[1];
        ctx.observe();
        let instance;
        if (typeof Reflect.construct === 'function') {
            instance = Reflect.construct(target, deps);
        }
        else {
            instance = new target(...deps);
        }
        if (instance.$instance) {
            instance = instance.$instance;
        }
        if (isPromise(instance)) {
            return instance.then(function (i) {
                i.ctx = args[1];
                ctx.unobserve();
                return i;
            });
        }
        instance.ctx = args[1];
        return instance;
    }
}
classtype(ClassType.ModuleFactory);
export class ModuleFactory extends BaseObject {
    constructor(app, name, ctor, config) {
        super();
        this._name = name;
        this._module = ctor;
        this._app = app;
        this._container = app.createContainer();
        this._activator = new ControllerActivator(this._container);
        this._serviceActivator = new ServiceActivator(this._container);
    }
    get name() {
        return this._name;
    }
    controller(name, controller) {
        if (this._container.hasHandler(name)) {
            throw new Error('controller already defined');
        }
        let Klass;
        if (typeof controller === 'function') {
            Klass = controller;
        }
        else if (isObject(controller)) {
            if (controller.initialize && controller.constructor === Object) {
                controller.constructor = controller.initialize;
                delete controller.initialize;
            }
            Klass = Controller.extend(controller);
        }
        else {
            throw new Error('wrong controller definition type');
        }
        setActivator(Klass, this._activator);
        setDependencyResolver(Klass, this._activator);
        this._container.registerTransient(name, Klass);
        return this;
    }
    service(name, service, config) {
        if (typeof service === 'function') {
            setActivator(service, this._activator);
            setDependencyResolver(service, this._activator);
            classtype(ClassType.Service)(service);
            if (config != null) {
                if (typeof config === 'function') {
                    this._container.registerSingleton(service, config);
                }
                else {
                    this._container.registerInstance(service, config);
                }
            }
            this._container.registerSingleton(name, service, DINamespace);
        }
        else {
            this._container.registerInstance(name, service);
        }
        return this;
    }
    create(options) {
        options = extend({}, options, { name: this.name });
        return new Promise((resolve, reject) => {
            let mod = new this._module(this._container, options);
            if (typeof mod.initialize === 'function') {
                let args = getFunctionParameters(mod.initialize);
                args = args.map(a => {
                    let k;
                    if (a == 'ctx' || a == 'context') {
                        k = mod.ctx;
                    }
                    else {
                        k = this._container.get(a);
                    }
                    if (!isPromise(k)) {
                        k = Promise.resolve(k);
                    }
                    return k;
                });
                toPromise(args).then((result) => {
                    try {
                        mod.ctx.$run(mod.initialize, mod, result);
                        resolve(mod);
                    }
                    catch (e) {
                        reject(e);
                    }
                }).catch(reject);
            }
        });
    }
}
