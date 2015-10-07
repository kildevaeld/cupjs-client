import {Metadata, DIContainer, getFunctionParameters} from 'di'
import {getDependencies} from './internal'

export class ServiceActivator {
    container: DIContainer
    constructor(container: DIContainer) {
        this.container = container
    }

    resolveDependencies(fn: Function): any[] {
     
      
       if ((<any>fn).__metadata__.undefined['design:paramtypes']) {
          delete (<any>fn).__metadata__.undefined['design:paramtypes']
       }
        
      let [_, params] = getDependencies(fn);
      
      
      
      let args = new Array(params.length), p;
      
      let i, ii;
      
      try {
        for (i=0,ii=args.length; i < ii; i++) {
          p = params[i];
          if (p == 'ctx') p = 'context';
          
          args[i] = this.container.get(p)
          
        }  
      } catch (e) {
        var message = "Error"
     
        if (i < ii) {
          message += ` The argument at index ${i} (key:${params[i]}) could not be satisfied for service ${fn.name}.`;
        }
        throw new Error(message + e.message)
      }
      
      return args
      
    }

    invoke(fn: any, deps: any[], keys?: any[]): any {
      let instance
      if (typeof Reflect.construct === 'function') {
        instance = Reflect.construct(fn, deps);
      } else {
        instance = new fn(...deps);
      }

      if (instance.$instance) {
        instance = instance.$instance
      }

      return instance;
      
    }
}