import {Router, RouteHandler} from './router'
import {classtype, ClassType} from '../../internal'
import {bind} from 'utilities'
import {IProxy} from '../../proxy/index'
import * as utils from 'utilities'
export interface RouteOptions {
	controller:string
	template?:string
	target?:string|HTMLElement
}

@classtype(ClassType.Service)
export class RouterService {
	router: Router
	context: IProxy
	constructor (context) {
		this.router = new Router({
			execute: utils.bind(this.__execute, this)
		})
		this.context = context;
		this.router.history.start()
	}
	
	route (route:string|RegExp, handler:RouteHandler|RouteOptions): RouterService {
		
		if (typeof handler === 'function') {
			this.router.route(route, <RouteHandler>handler)
		} else if (utils.isObject(handler)) {
			this.router.route(route, this.__handleController(<RouteOptions>handler));
		}
		
		return this
	}
	
	private __execute (callback:RouteHandler, args:any[]) {
		this.context.$run(callback,this.context,args)
	}
	
	private __handleController(options:RouteOptions): RouteHandler {
		return (...args:any[]) => {
			
		}
	}
}