/// <reference path="../typings" />
import {Controller} from '../controller'
import {components, View} from 'templ'
import {DIContainer} from 'di'
import {isPromise} from 'utilities/lib/index'

export class ControllerComponent extends components.BaseComponent {
	container: DIContainer
	name: string
	controller: Controller
	subview: View 
	initialize () {
		this.container = (<any>this.view)._container
		if (this.attributes['name']) {
			this.name = this.attributes['name']
		}
		
		let ret = this.container.get(this.name)
			
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
		
		this.subview = <View>this.childTemplate.view(controller.ctx.model, {
			container: this.container
		});
		
		let node = this.subview.render()
		this.section.appendChild(node)
		
	}
	
	update () {
		//console.log('update', arguments)
	}
	
	destroy () {
		super.destroy();
		this.controller.destroy();
	}
	

}