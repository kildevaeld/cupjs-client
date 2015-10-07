import {Router, RouteHandler} from './router'
import {classtype, ClassType} from '../../internal'
import {bind} from 'utilities'
import {IProxy} from '../../proxy/index'
import * as utils from 'utilities'
import {DIContainer} from 'di'
import {TemplateResolver} from '../template.resolver'
import {TemplateView, EventDelegator} from '../../template/index'
import * as templ from 'templ'

export interface RouteOptions {
	controller:string
	template?:string
	target?:string|HTMLElement
}

@classtype(ClassType.Service)
export class RouterService {
	router: Router
	context: IProxy
	container:DIContainer
	constructor (context:IProxy, container: DIContainer) {
		this.router = new Router({
			execute: utils.bind(this.__execute, this)
		})
		this.context = context;
		this.container = container;
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
		
		if (!this.container.hasHandler(options.controller)) {
			throw new Error('[router] controller');
		}
		
		
		return (...args:any[]) => {
			let target: HTMLElement;
			if (typeof options.target === 'string') {
				target = <HTMLElement>document.querySelector(<string>options.target)	
			} else {
				target = <HTMLElement>options.target;
			}
			
			
			let templateResolver = <TemplateResolver>this.container.get('templateResolver');
			
			let controller = this.container.get(options.controller);
			templateResolver.resolve(options.template)
			.then( (str) => {
				if (!str) {
					throw new Error('template');
				}
				
				let ctx = controller.ctx;
			
				let template = templ.compile(str, {
					viewClass: <any>TemplateView
				})
			
				let view = <any>template.view(ctx.model, {
					container: this.container,
					delegator: new EventDelegator(controller, ctx, this.container)
				});
				
				controller.template = view
				
				target.appendChild(view.render())
				
			})	
			
			
		}
	}
}