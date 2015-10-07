import {Metakey} from './typings'
import {Metadata, DIContainer, getFunctionParameters} from 'di'
import {result} from 'utilities'

export enum ClassType {
  Module,
  Controller,
  Service,
  ModuleFactory,
  Factory
}

export const DINamespace = "mobyjs"
export const DIServiceConfig = "mobyjs:service:config"
export interface MetaMap {
  name: string
  handler: any
  //type: ClassType
}

export const metadata = new Map<string,MetaMap[]>();

export function classtype(type: ClassType): ClassDecorator {

    return function(target: Function) {
      let str = Metakey[Metakey.ClassType]

      Metadata.define(str, type, target, DINamespace);
    }
}

export function getClassType (target:Function): ClassType {
  let key = Metakey[Metakey.ClassType],
    type = <ClassType>Metadata.getOwn(key, target, DINamespace);
  return type
}

export function isClassType (target:Function, type:ClassType) {
  return getClassType(target) === type;
}

export function setActivator (target:Function, activator:Object) {
  let instanceActivatorKey: string = (<any>Metadata).instanceActivator
  Metadata.define(instanceActivatorKey, activator, target, undefined);
}

export function setDependencyResolver(target:Function, activator:any) {
  let dependencyResolverKey: string = (<any>Metadata).dependencyResolver
  Metadata.define(dependencyResolverKey, activator, target, undefined);
}

export function getDependencies (fn:Function|any[]): [Function, any[]] {
  let dependencies: any[];
 
  if (fn.constructor === Array) {
    let tmp = (<any[]>fn).pop()
    dependencies = <any>fn;
    fn = tmp;
  } else if (typeof fn === 'function') {
    dependencies = result(fn, "inject");
    if (!dependencies || dependencies.length == 0) {
      
      // FIXME: Find a way not to delete type scripts type descriptions
      // But as it is now, context will be inferred as an Object
      if ((<any>fn).__metadata__.undefined['design:paramtypes']) {
          delete (<any>fn).__metadata__.undefined['design:paramtypes']
       }
      
      dependencies = getFunctionParameters(<Function>fn);
      (<any>fn).inject = dependencies;
    }    
    
  } else {
    return [<any>fn,null]
  }
  
  return [<Function>fn, dependencies];
}