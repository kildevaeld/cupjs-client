import { BaseObject } from './object';
import { getFunctionParameters, FactoryActivator } from 'di';
import { callFunc, isObject, extend, Promise, isPromise, mapAsync, Debug } from 'utilities';
import { setActivator, setDependencyResolver, classtype, ClassType, getDependencies } from './internal';
import { ServiceActivator } from './service.activator';
import { getProxy } from './proxy/index';
import { Repository } from './repository';
const debug = Debug.create("moby:factory");
class ControllerActivator {
    constructor(container) {
        this.container = container;
    }
    resolveDependencies(fn, deps) {
        if (fn.__metadata__.undefined['design:paramtypes']) {
            delete fn.__metadata__.undefined['design:paramtypes'];
        }
        let params = deps || getFunctionParameters(fn), args = new Array(params.length);
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
    constructor(name, ctor, container) {
        super();
        this._name = name;
        this._module = ctor;
        this._container = container;
        this._activator = new ControllerActivator(this._container);
        this._serviceActivator = new ServiceActivator(this._container);
        this._initializers = [];
        container.registerSingleton('context', getProxy());
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
            Klass = BaseObject.extend(controller);
        }
        else {
            throw new Error('wrong controller definition type');
        }
        setActivator(Klass, this._activator);
        setDependencyResolver(Klass, this._activator);
        debug('defining controller: %s in module %s', name, this.name);
        this._container.registerTransient(name, Klass);
        return this;
    }
    service(name, service) {
        if (service == null) {
            throw new Error('on service');
        }
        let [fn, deps] = getDependencies(service);
        if (typeof fn == 'function') {
            this._resolveDependencies(deps);
            setActivator(fn, this._serviceActivator);
            setDependencyResolver(fn, this._serviceActivator);
            classtype(ClassType.Service)(fn);
            this._container.registerSingleton(name, fn);
        }
        else {
            throw new Error('service not a function');
        }
        debug('defining service "%s" in "%s"', name, this.name);
        return this;
    }
    __addFromClassType(classType, name, target) {
        switch (classType) {
            case ClassType.Service:
                return this.service(name, target);
            case ClassType.Factory:
                return this.factory(name, target);
        }
    }
    factory(name, factory) {
        let [fn, deps] = getDependencies(factory);
        if (typeof fn == 'function') {
            this._resolveDependencies(deps);
            setActivator(fn, FactoryActivator.instance);
            setDependencyResolver(fn, this._serviceActivator);
            this._container.registerSingleton(name, fn);
        }
        else {
            this._container.registerInstance(name, factory);
        }
        debug('defining factory "%s" in "%s"', name, this.name);
        return this;
    }
    _resolveDependencies(deps) {
        for (let i = 0, ii = deps.length; i < ii; i++) {
            if (!this._container.hasHandler(deps[i])) {
                let item = Repository.any(deps[i]);
                if (item) {
                    this.__addFromClassType(item.type, item.name, item.handler);
                }
            }
        }
    }
    initialize(fn) {
        let result = getDependencies(fn);
        this._initializers.push(result);
        return this;
    }
    __resolveModuleDependencies(module) {
        let params = getFunctionParameters(module), p;
        let i, ii;
        try {
            for (i = 0, ii = params.length; i < ii; i++) {
                p = params[i];
                if (p === 'ctx')
                    p = 'context';
                if (!this._container.hasHandler(p)) {
                    let i = Repository.any(p);
                    if (i) {
                        switch (i.type) {
                            case ClassType.Factory:
                                this.factory(p, i.handler);
                                break;
                            case ClassType.Service:
                                this.service(p, i.handler);
                                break;
                        }
                    }
                }
                params[i] = this._container.get(p);
            }
        }
        catch (e) {
            var message = "Error";
            if (i < ii) {
                message += ` The argument at index ${i} (key:${params[i]}) could not be satisfied.`;
            }
            throw new Error(message);
        }
        return Promise.all(params);
    }
    create(options) {
        options = extend({}, options, { name: this.name });
        return new Promise((resolve, reject) => {
            let mod = new this._module(this._container, options);
            if (typeof mod.initialize === 'function') {
                let args = this.__resolveModuleDependencies(mod.initialize);
                //let args = Promise.resolve()
                mapAsync(this._initializers, init => {
                    let [deps, ctx] = this._activator.resolveDependencies(init[0], init[1]);
                    return callFunc(init[0], mod, deps);
                }).then(() => {
                    return args;
                })
                    .then((result) => {
                    try {
                        mod.ctx.$run(mod.initialize, mod, result);
                        resolve(mod);
                    }
                    catch (e) {
                        console.log('her ?', e);
                        reject(e);
                    }
                }).catch(reject);
            }
        });
    }
}
