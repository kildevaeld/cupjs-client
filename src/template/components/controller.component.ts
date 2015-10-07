/// <reference path="../../typings" />
import {Controller} from '../controller'
import {components, View, compile, vnode} from 'templ'
import {DIContainer} from 'di'
import {isPromise, IPromise, Promise} from 'utilities/lib/index'
import {TemplateResolver} from '../../services/template.resolver'
import {TemplateView} from '../template-view'
import {EventDelegator} from '../event.delegator'
import {IProxy} from '../proxy/index'
export class ControllerComponent extends components.BaseComponent {
	container: DIContainer
	as: string
	name: string
	controller: Controller
	subview: View 
	initialize () {
		this.container = (<any>this.view)._container
		if (this.attributes['name']) {
			this.name = this.attributes['name']
			this.as = this.attributes['as'] || this.name
		}
		
		this.__initController(this.name)
		
	}
	
	__initController (name:string) {
		let ret = this.container.get(name)
			
		if (isPromise(ret)) {
			ret.then((controller) => {
				
				this.controller = controller
				this.__initView.call(this,controller);
			})
		} else {
			this.controller = ret
			this.__initView(ret)
		}
	}
	
	__initView (controller) {
		
		
		this.__resolveTemplate(this.attributes['template'])
		.then( template => {
			if (this.subview) {
				this.subview.remove()
				delete this.subview
			}
			this.subview = <View>this.childTemplate.view(controller.ctx.model, {
				container: this.container,
				parent: this.view,
				delegator: new EventDelegator(controller, controller.ctx, this.container)
			});
		
			let node = this.subview.render()
			this.section.appendChild(node)	
			
		})
		
			
	}
	
	__resolveTemplate (template?:string): IPromise<vnode.Template> {
		
		if (template != null) {
			let resolver = <TemplateResolver>this.container.get('templateResolver');
			return resolver.resolve(this.attributes["template"])
			.then( template => {
				
				let templ = compile(template,{
					viewClass: TemplateView
				});
				
				if (this.childTemplate) {
					delete this.childTemplate
				}
				
				this.childTemplate = templ
				
				return templ
			})
	
		} else {
			return Promise.resolve(this.childTemplate)
		}
	}
	
	destroy () {
		
		super.destroy();
		if (this.subview) {
			this.subview.remove()
			delete this.subview
		}
		this.controller.destroy();
	}
	

}