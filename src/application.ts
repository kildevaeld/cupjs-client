/// <reference path="typings" />
import {ModuleConstructor, ControllerConstructor} from './typings'
import {Module} from './module'
import {Controller} from './controller'
import {ModuleFactory} from './module.factory'
import {BaseObject} from './object'
import * as utils from 'utilities'
import {isClassType, ClassType, DINamespace, setActivator, 
  setDependencyResolver, classtype, getDependencies} from './internal'
import {DIContainer, FactoryActivator} from 'di'
import {ServiceActivator} from './service.activator'
import * as templ from 'templ'
import {has, isObject} from 'utilities'

import {Debug} from 'utilities';
const debug = Debug.create("moby:application");

export class Application extends BaseObject {
  
  private _container: DIContainer
  private _activator: ServiceActivator
  private _bootstraped: boolean
  get container (): DIContainer {
    return this._container;
  }

  constructor () {
    super();
    this._bootstraped = false
    this._container = new DIContainer();
    this._activator = new ServiceActivator(this._container)

  }

  module (name:string, definition?:ModuleConstructor|Object): ModuleFactory {

    if (definition == null) {
        if (!this._container.hasHandler(name)) {
          throw new Error("module does not exits");
        }
        return this._container.get(name)
    }

    let mod: ModuleConstructor;
    if (typeof definition === 'function' && isClassType(<Function>definition, ClassType.Module)) {
      mod = <ModuleConstructor>definition
    } else if (isObject(definition)) {
      if (definition.constructor) {
        (<any>definition).initialize = definition.constructor
        delete definition.constructor
      }
      mod = Module.extend<ModuleConstructor>(definition)
    } else {
      throw new Error('wrong module type')
    }
    
    debug("define module: %s", name);
    
    let factory = new ModuleFactory(this, name, mod);

    this._container.registerInstance(name, factory);



    return factory
  }

  service (name:string, definition?:Function|Function[]): Application {

    let [fn, deps] = getDependencies(definition);

    debug('defining service %s',name, fn, deps)
    if (fn) {
      (<any>fn).inject = deps;
      setActivator(fn, this._activator);
      setDependencyResolver(fn, this._activator);
      classtype(ClassType.Service)(fn);
      this._container.registerSingleton(name, fn);
      
    } else {
      this._container.registerInstance(name, definition);
    }

    return this
  }
  
  factory (name: string, factory: Function|Array<any>): Application {
    let [fn, deps] = getDependencies(factory)
    if (fn != null) {
      (<any>fn).inject = deps
      setActivator(fn, FactoryActivator.instance)
      setDependencyResolver(fn, this._activator);
      this._container.registerSingleton(name, fn);
    }  else {
      this._container.registerInstance(name, factory);
    }   
    
    return this;
  }

  createContainer () : DIContainer {
    return this._container.createChild()
  }

}