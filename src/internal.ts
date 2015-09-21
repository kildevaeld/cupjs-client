import {Metakey} from './typings'
import {Metadata, DIContainer} from 'di'

export enum ClassType {
  Module,
  Controller,
  Service,
  ModuleFactory
}

export const DINamespace = "cupsjs"

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