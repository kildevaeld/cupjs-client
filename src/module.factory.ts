
import {ModuleConstructor, ControllerConstructor, ModuleOptions} from './typings'
import {Module} from './module'
import {Controller} from './controller'

import {BaseObject} from './object'
import {Application} from './application'
import {DIContainer, Metadata, getFunctionParameters} from 'di'
import {isObject, extend} from 'utilities/lib/objects'
import {callFunc} from 'utilities/lib/utils'
import {IPromise, Promise, toPromise, isPromise} from 'utilities/lib/promises'
import {DINamespace, setActivator, setDependencyResolver, classtype, ClassType} from './internal'
import {ServiceActivator} from './service.activator'


class ControllerActivator {
  private _factory: ModuleFactory
  constructor(app: Application, factory: ModuleFactory) {

  }
  invoke(target: Function, deps: any[], keys: string[]): any {

  }
}

classtype(ClassType.ModuleFactory)
export class ModuleFactory extends BaseObject {
  private _name: string
  private _app: Application
  private _module: ModuleConstructor
  private _container: DIContainer
  private _activator: ControllerActivator
  private _serviceActivator: ServiceActivator
  get name(): string {
    return this._name
  }

  constructor(app: Application, name: string, ctor: ModuleConstructor, config: any) {
    super()

    this._name = name
    this._module = ctor
    this._app = app
    this._container = app.createContainer();
    this._activator = new ControllerActivator(app, this);
    this._serviceActivator = new ServiceActivator(this._container)
  }

  controller(name: string, controller: ControllerConstructor|Object): ModuleFactory {

    if (this._container.hasHandler(name)) {
      throw new Error('controller already defined');
    }

    let Klass
    if (typeof controller === 'function') {
      Klass = <ControllerConstructor>controller
    } else if (isObject(controller)) {
      Klass = Controller.extend<ControllerConstructor>(controller)
    } else {
      throw new Error('wrong controller definition type');
    }

    setActivator(Klass, this._activator)
    setDependencyResolver(Klass, this._activator)


    this._container.registerTransient(name, Klass)
    return this
  }

  service(name: string, service: any, config?:any) {


    if (typeof service === 'function') {
      setActivator(service, this._activator);
      setDependencyResolver(service, this._activator);
      classtype(ClassType.Service)(service)

      if (config != null) {
        if (typeof config === 'function') {
          this._container.registerSingleton(service, config);
        } else {
          this._container.registerInstance(service, config);
        }
      }
      this._container.registerSingleton(name, service, DINamespace)
    } else {
      this._container.registerInstance(name, service)
    }

    return this

  }
  
  create (options?: ModuleOptions): IPromise<Module> {
    options = extend({}, options, {name:this.name})
    
    return new Promise((resolve, reject) => {
      let mod = new this._module(this._container, options);
      
      if (typeof mod.initialize === 'function') {
        
        let args = getFunctionParameters(mod.initialize)
         
        args = args.map( a => {
          let k
          if (a == 'ctx' || a == 'context') {
            k = mod.ctx
          } else {
            k = this._container.get(a) 
          }
          
          if (!isPromise(k)) {
            k = Promise.resolve(k);
          }
          return k
        });
       
        toPromise(args).then((result) => {
          
          try {
            callFunc(mod.initialize, mod, result);  
            resolve(mod)
          } catch (e) {
            reject(e)
          }
        }).catch(reject);
      }
         
    })
  }
}