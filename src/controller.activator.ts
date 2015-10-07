import {DIContainer, Metadata, getFunctionParameters} from 'di'
import {isPromise} from 'utilities'

export class ControllerActivator {
  private container: DIContainer
  constructor(container: DIContainer) {
    this.container = container
  }

  resolveDependencies(fn: Function, deps?: any[]): any[] {

    if ((<any>fn).__metadata__.undefined['design:paramtypes']) {
      delete (<any>fn).__metadata__.undefined['design:paramtypes']
    }

    let params = deps || getFunctionParameters(fn),
      args = new Array(params.length)
    let p
    let ctx = this.container.get('context')
    let childCtx = ctx.createChild()
    for (let i = 0, ii = args.length; i < ii; i++) {
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
      return instance.then(function(i) {
        i.ctx = args[1];
        ctx.unobserve();
        return i
      })
    }

    instance.ctx = args[1]
    ctx.unobserve();
    
    
    return instance;
  }
}
