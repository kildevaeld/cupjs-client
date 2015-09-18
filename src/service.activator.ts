import {Metadata, DIContainer, getFunctionParameters} from 'di'

export class ServiceActivator {
    container: DIContainer
    constructor(container: DIContainer) {
        this.container = container
    }

    resolveDependencies(fn: Function): any[] {
      let params = getFunctionParameters(fn),
        args = new Array(params.length)
      let p
      for (let i=0,ii=args.length; i < ii; i++) {
         p = params[i];
         
         if (p === 'config') {
           args[i] = this.container.get(fn)
         } else {
           args[i] = this.container.get(p)
         }
      }
      return args
     
    }


    invoke(fn: any, deps: any[], keys?: any[]): any {
      console.log('service activator')
      var instance = Reflect.construct(fn, deps)

      if (instance.$instance) {
        instance = instance.$instance
      }

      return instance;
      
    }
}