

import {IModel} from 'collection'
import {ObjectObserveProxy} from './object-observe'
import {DirtyObjectObserver} from './dirty-observe'
import {has, isPromise, toPromise, bind, callFunc, nextTick} from 'utilities/lib/index'
import {IEventEmitter} from 'eventsjs'
/*export enum ProxyEventType {
	Add, Update, Delete
}*/

export interface ProxyEvent {
	name: string
	object:any
	type:string
	oldValue?:any
}

export interface IProxy extends IEventEmitter {
	model: IModel
	parent?: IProxy
	$run (fn:Function, ctx:any, args:any[]): any
	[x: string]: any 
	destroy()
	createChild(): IProxy
	observe()
	unobserve()
}




export function createProxy(model:IModel): IProxy {
	if (typeof (<any>Object).observe === 'function') {
		return new ObjectObserveProxy(<any>model);
	} /*else if (typeof (global||window).Proxy  === 'function') {
		
	}*/ else {
		return new DirtyObjectObserver(model);
	}
}

export const get_atributes = function(attributes:any) {

  let keys = Object.keys(attributes),
    deferred = {},
    attr = {};

  keys.map(key => {
    return { key: key, value: attributes[key] };
  }).filter(pair => {
    if (!has(attributes, pair.key)) return false
    if (pair.value && isPromise(pair.value)) {
      deferred[pair.key] = pair.value;
      delete attributes[pair.key];
      return false;
    }
	
		return true;
  
	}).forEach((a) => {
    attr[a.key] = a.value;
  });

  return { attr, deferred };
};


