/// <reference path="typings"/>
import {IDelegator} from 'templ'
import * as utils from 'utilities'
import {IProxy} from './proxy/index'
import {getFunctionParameters, DIContainer} from 'di'

export class EventDelegator implements IDelegator {
	target: any
	proxy: IProxy
	container: DIContainer
	constructor(target:any, proxy: IProxy, container: DIContainer) {
		this.target = target
		this.proxy = proxy
		this.container = container
	}
	
	addListener(elm: Element, eventName: string, callback: string|EventListener, capture?: boolean): Function {
		
		let fn = this._getCallback(callback)

		utils.addEventListener(elm, eventName, fn, capture)
		
		return fn
	}
  
	removeListener(elm: Element, eventName: string, callback: string|EventListener, capture?: boolean) {
		utils.removeEventListener(elm, eventName, callback)			
	}
	
	addDelegate(elm: Element, selector: string, eventName:string, callback: string|EventListener, capture?:boolean): Function {
	
		let fn = this._getCallback(callback)
		utils.delegate(<HTMLElement>elm, selector, eventName, fn, capture)
		
		return fn
	}
	
	removeDelegate(elm: Element, selector: string, eventName: string, callback: EventListener) {
		utils.undelegate(<HTMLElement>elm, selector, eventName, callback)
	}
	
	
	private _getCallback (callback: string|Function) : Function {
		
		if (typeof callback === 'function') {
			return this._wrapFunc(callback, this.proxy)
		}
		
		if (typeof this.target[<string>callback] === 'function') {
			return this._wrapFunc(this.target[<string>callback], this.target)
		} else if (typeof this.proxy[<string>callback] === 'function') {
			return this._wrapFunc(this.target[<string>callback], this.proxy)
		}
		throw new Error(`function named: '${callback}' not found on target or proxy`);
	}
	
	private _wrapFunc (func:Function, ctx:any): Function {
		return (e) => {
			
			let keys = getFunctionParameters(func)
			let args = keys.map( a => {
				if (a === 'e' || a === 'event' || a === 'ev') {
					return utils.Promise.resolve(e)
				} else if (a === 'ctx' || a === 'context') {
					return utils.Promise.resolve(this.proxy)
				}
				return this.container.get(a)
			})
			
			utils.toPromise(args)
			.then( (ret) => {
				return this.proxy.$run(func, ctx, ret)	
			}).catch( e => {
				throw e
			})
			
		}
	}
}
