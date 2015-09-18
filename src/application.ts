/// <reference path="typings" />
import {ModuleConstructor, ControllerConstructor} from './typings'
import {Module} from './module'
import {Controller} from './controller'
import {ModuleFactory} from './module.factory'
import {BaseObject} from './object'
import * as utils from 'utilities'
import {isClassType, ClassType, DINamespace, setActivator, setDependencyResolver, classtype} from './internal'
import {DIContainer} from 'di'
import {ServiceActivator} from './service.activator'
import * as templ from 'templ'
import {has, isObject} from 'utilities'

export class Application extends BaseObject {
  
  Module: typeof Module = Module
  Controller: ControllerConstructor = Controller
  

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

  module (name:string, definition?:ModuleConstructor|Object, config?:any): ModuleFactory {

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
      mod = Module.extend<ModuleConstructor>(definition)
    } else {
      throw new Error('wrong module type')
    }

    let factory = new ModuleFactory(this, name, mod, config);

    this._container.registerInstance(name, factory);



    return factory
  }

  service (name:string, definition?:any, config?:any): Application {

    if (typeof definition === 'function') {
      setActivator(definition, this._activator);
      setDependencyResolver(definition, this._activator);
      classtype(ClassType.Service)(definition)
      
      if (config != null) {
        if (typeof config === 'function') {
          this._container.registerSingleton(definition, config);
        } else {
          this._container.registerInstance(definition, config);
        }
      }
      
      this._container.registerSingleton(name, definition)
    } else {
      this._container.registerInstance(name, definition)
    }

    return this
  }

  createContainer () : DIContainer {
    return this._container.createChild()
  }
  
  component (name:string) {
     templ.component(name, null)
  }

}