import { Controller } from './controller';
import { BaseObject } from './object';
import { getFunctionParameters } from 'di';
import { isObject, extend } from 'utilities/lib/objects';
import { Promise, toPromise, isPromise } from 'utilities/lib/promises';
import { DINamespace, setActivator, setDependencyResolver, classtype, ClassType } from './internal';
import { ServiceActivator } from './service.activator';
class ControllerActivator {
    constructor(app, factory) {
    }
    invoke(target, deps, keys) {
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
        this._activator = new ControllerActivator(app, this);
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
