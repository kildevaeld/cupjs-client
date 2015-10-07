
import {ModuleConstructor, ControllerConstructor, ModuleOptions} from './typings'
import {Module} from './module'
import {Controller} from './controller'
import {BaseObject} from './object'

import {DIContainer, Metadata, getFunctionParameters, instanceActivator, FactoryActivator} from 'di'
import {callFunc, nextTick, isObject, extend, IPromise, Promise, toPromise, isPromise, mapAsync, Debug} from 'utilities'
import {DINamespace, setActivator, setDependencyResolver, classtype, ClassType, getDependencies, DIServiceConfig} from './internal'
import {ServiceActivator} from './service.activator'
import {IProxy, getProxy} from './proxy/index'
import {Repository} from './repository'

import {ControllerActivator} from './controller.activator'

const debug = Debug.create("moby:factory");



type DependencyMap = [Function, any[]];

classtype(ClassType.ModuleFactory)
export class ModuleFactory extends BaseObject {
  private _name: string
  
  private _module: ModuleConstructor
  private _container: DIContainer
  private _activator: ControllerActivator
  private _serviceActivator: ServiceActivator
  //private _moduleActivator: ModuleActivator
  private _initializers: DependencyMap[]

  get name(): string {
    return this._name
  }

  constructor(name: string, ctor: ModuleConstructor, container: DIContainer) {
    super()

    this._name = name
    this._module = ctor
    this._container = container
    this._activator = new ControllerActivator(this._container);
    this._serviceActivator = new ServiceActivator(this._container)
   
    this._initializers = [];
    let Context = getProxy();
    
    container.registerSingleton('context', Context);
    container.registerInstance('container', container);
  }

  controller(name: string, controller: ControllerConstructor | Object): ModuleFactory {

    if (this._container.hasHandler(name)) {
      throw new Error('controller already defined');
    }

    let Klass
    if (typeof controller === 'function') {
      Klass = <ControllerConstructor>controller
    } else if (isObject(controller)) {
      if ((<any>controller).initialize && controller.constructor === Object) {

        controller.constructor = (<any>controller).initialize
        delete (<any>controller).initialize
      }

      Klass = BaseObject.extend<ControllerConstructor>(controller)
    } else {
      throw new Error('wrong controller definition type');
    }

    setActivator(Klass, this._activator)
    setDependencyResolver(Klass, this._activator)

    debug('defining controller: %s in module %s', name, this.name)
    this._container.registerTransient(name, Klass)
    return this
  }

  service(name: string, service: any) {

    if (service == null) {
      throw new Error('on service');
    }

    let [fn, deps] = getDependencies(service)

    if (typeof fn == 'function') {
     
      this._resolveDependencies(deps)
      setActivator(fn, this._serviceActivator);
      setDependencyResolver(fn, this._serviceActivator);
      classtype(ClassType.Service)(fn);
    
      this._container.registerSingleton(name, fn);
     
    } else {
      throw new Error('service not a function')

    }
    debug('defining service "%s" in "%s"', name, this.name)
    return this

  }
  __addFromClassType (classType:ClassType, name: string, target:any) {
    switch (classType) {
      case ClassType.Service:
        return this.service(name , target);
      case ClassType.Factory:
        return this.factory(name, target)
    }
  }

  factory(name: string, factory: Function | Function[]): ModuleFactory {

    let [fn, deps] = getDependencies(factory);

    if (typeof fn == 'function') {
      
      this._resolveDependencies(deps)
      
      
      setActivator(fn, FactoryActivator.instance);
      setDependencyResolver(fn, this._serviceActivator);
      this._container.registerSingleton(name, fn);
    } else {
      this._container.registerInstance(name, factory);
    }
    debug('defining factory "%s" in "%s"', name, this.name)
    return this;
  }
  
  _resolveDependencies (deps:string[]): any {
    for (let i=0,ii = deps.length; i<ii;i++) {
       if (!this._container.hasHandler(deps[i])) {
        let item = Repository.any(deps[i]);
        if (item) {
          this.__addFromClassType(item.type,item.name,item.handler)
        }
      }
    }
  }


  initialize(fn: Function | Array<any>): ModuleFactory {
    let result = getDependencies(fn);
    this._initializers.push(result);
    return this;
  }


  __resolveModuleDependencies(module: Function) {
    let params = getFunctionParameters(module), p;
    let i, ii
    try {
      for (i = 0, ii = params.length; i < ii; i++) {
        p = params[i]
        if (p === 'ctx') p = 'context';

        if (!this._container.hasHandler(p)) {
          let i = Repository.any(p)

          if (i) {
            switch (i.type) {
              case ClassType.Factory:
                this.factory(p, i.handler)
                break;
              case ClassType.Service:
                this.service(p, i.handler);
                break;
            }
          }
        }
        params[i] = this._container.get(p);
      }
    } catch (e) {
      var message = "Error"

      if (i < ii) {
        message += ` The argument at index ${i} (key:${params[i]}) could not be satisfied.`;
      }

      throw new Error(message)
    }


    return <any>Promise.all(params);
  }

  create(options?: ModuleOptions): IPromise<Module> {
    options = extend({}, options, { name: this.name })

    return new Promise((resolve, reject) => {
      let mod = new this._module(this._container, options);

      if (typeof mod.initialize === 'function') {
        
        let args = this.__resolveModuleDependencies(mod.initialize)
        //let args = Promise.resolve()
        mapAsync(this._initializers, init => {
          let [deps, ctx] = this._activator.resolveDependencies(init[0], init[1]);
          return callFunc(init[0], mod, deps)
        }).then(() => {
          
          return args
        })
          .then((result) => {
            
            try {
            
              mod.ctx.$run(mod.initialize, mod, result)
              resolve(mod)
            } catch (e) {
              console.log('her ?', e);
              reject(e)
            }
          }).catch(reject);
      }

    })
  }
}