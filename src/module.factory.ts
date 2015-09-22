
import {ModuleConstructor, ControllerConstructor, ModuleOptions} from './typings'
import {Module} from './module'
import {Controller} from './controller'
import {BaseObject} from './object'
import {Application} from './application'
import {DIContainer, Metadata, getFunctionParameters, instanceActivator, FactoryActivator} from 'di'
import {callFunc, nextTick, isObject, extend, IPromise, Promise, toPromise, isPromise, mapAsync} from 'utilities/lib/index'
import {DINamespace, setActivator, setDependencyResolver, classtype, ClassType, getDependencies} from './internal'
import {ServiceActivator} from './service.activator'
import {IProxy} from './proxy/index'

class ControllerActivator {
  private container: DIContainer
  constructor(container: DIContainer) {
    this.container = container
  }
  
  resolveDependencies(fn: Function, deps?:any[]): any[] {
    
      if ((<any>fn).__metadata__.undefined['design:paramtypes']) {
        delete (<any>fn).__metadata__.undefined['design:paramtypes']
      }
    
      let params = deps||getFunctionParameters(fn),
        args = new Array(params.length)
      let p
       let ctx = this.container.get('context')
       let childCtx = ctx.createChild()
      for (let i=0,ii=args.length; i < ii; i++) {
         p = params[i];
        
         if (p === 'config') {
           args[i] = this.container.get(fn)
         } else if (p === 'ctx' || p === 'context') {
          
           args[i] = childCtx
         } else {
           args[i] = this.container.get(p)
         }
      }
      return [args, childCtx]
      
     
    }
  
  invoke(target: FunctionConstructor, args: any[], keys: string[]): any {
      let deps = args[0]
      let ctx: any = args[1]
      
      ctx.observe()
      
      let instance
      if (typeof Reflect.construct === 'function') {
        instance = Reflect.construct(target, deps)
      } else {
        instance = new target(...deps)
      }
      
      if (instance.$instance) {
        instance = instance.$instance
      }
        
      if (isPromise(instance)) {
        return instance.then(function (i) {
          i.ctx = args[1];
          ctx.unobserve();
          return i
        })
      }
      
      instance.ctx = args[1]
      
      return instance;  
  }
}

type DependencyMap = [Function, any[]];

classtype(ClassType.ModuleFactory)
export class ModuleFactory extends BaseObject {
  private _name: string
  private _app: Application
  private _module: ModuleConstructor
  private _container: DIContainer
  private _activator: ControllerActivator
  private _serviceActivator: ServiceActivator
  private _initializers: DependencyMap[]
  
  get name(): string {
    return this._name
  }

  constructor(app: Application, name: string, ctor: ModuleConstructor, config: any) {
    super()

    this._name = name
    this._module = ctor
    this._app = app
    this._container = app.createContainer();
    this._activator = new ControllerActivator(this._container);
    this._serviceActivator = new ServiceActivator(this._container)
    this._initializers = [];
  }

  controller(name: string, controller: ControllerConstructor|Object): ModuleFactory {

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
  
  factory (name: string, factory: Function): ModuleFactory {
    
    if (typeof factory === 'function') {
      setActivator(factory, FactoryActivator.instance)
      setDependencyResolver(factory, this._serviceActivator);
      this._container.registerSingleton(name, factory);
    }  else {
      this._container.registerInstance(name, factory);
    }   
    
    return this;
  }
  
  
   
  initialize(fn:Function|Array<any>): ModuleFactory {
    let result = getDependencies(fn);
    this._initializers.push(result); 
    return this;
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
        
        mapAsync(this._initializers, init => {
          let [deps, ctx] = this._activator.resolveDependencies(init[0], init[1]);
          return callFunc(init[0], mod, deps) 
        }).then(() => {
          return toPromise(args);
        })
        .then((result) => {
          
          try {
            mod.ctx.$run(mod.initialize, mod, result)
            resolve(mod)
          } catch (e) {
            reject(e)
          }
        }).catch(reject);
      }
         
    })
  }
}