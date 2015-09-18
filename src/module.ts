import {ModuleOptions} from './typings'
import {BaseObject} from './object'
import {classtype,ClassType} from './internal'
import {DIContainer} from 'di'
import {IProxy, createProxy} from './proxy/index'
import {NestedModel} from 'collection'
import * as templ from 'templ'
import {TemplateView} from './template-view'

@classtype(ClassType.Module)
export class Module extends BaseObject {
	private _container: DIContainer
	private _name: string
	private _el: HTMLElement
	private _ctx: IProxy
	private _templ: templ.View
	
	get name (): string {
		return this._name
	}
	
	get el (): HTMLElement {
		return this._el;
	}
	
	get ctx (): IProxy {
		return this._ctx
	}
	
	module<T> (name): T {
		
		//console.log('finding', name)
		if (!this._container.hasHandler(name, true)) {
			return null
		}
		
		return this._container.get(name)
	} 
	
	constructor (container:DIContainer, options:ModuleOptions) {
		super()
		this._name = options.name
		this._el = options.el
		this._container = container
		this._ctx = createProxy(new NestedModel())
		
		this._container.registerInstance('context', this._ctx);
		
		if (this.el) {
			
			let template = templ.compile(this.el.outerHTML, {
				viewClass: <any>TemplateView
			})
			this._templ = <any>template.view(this._ctx.model,{
				container: this._container
			});
			
			let el = this._templ.render()
			
			this.el.parentNode.replaceChild(el,this.el)
		}
		
		
	}
	
	initialize () {
		
	}
	
	destroy () {
		this._container.unregister('context');
		this._ctx.destroy();
		super.destroy()
	}
}
