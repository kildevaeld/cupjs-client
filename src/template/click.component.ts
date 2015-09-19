/// <reference path="../typings" />
//import {Controller} from '../controller'
import {components, View, compile, vnode, attributes} from 'templ'
import {DIContainer} from 'di'
import {isPromise, IPromise, Promise, extend} from 'utilities'
import {TemplateResolver} from '../services/template.resolver'
import {TemplateView} from '../template-view'
import {EventDelegator} from '../event.delegator'

export class ActionAttribute extends attributes.BaseAttribute {
	update () {
		console.log(this)
		
		//this.ref.setAttribute('test', 'mig')
	}
}

export class ClickComponent extends components.BaseComponent {
	container: DIContainer
	name: string
	//controller: Controller
	subview: View
  rootElm: HTMLElement
  boundFunction: Function
	boundElement: HTMLElement
	initialize () {
    
    let len = this.vnode.childNodes.length;

    if (len === 1) {
      this.rootElm = <any>this.vnode.childNodes[0];
    } else {
      //this.rootElm = document.createElement('div');
    }

	}

	update () {

    let attr: any = this.attributes

		if (this.subview) {
			this.subview.remove()
		}
		

		if (this.rootElm) {
			attr = extend({},attr,this.rootElm.attributes)
		}
		
		
		if (!attr.action) {
			throw new Error('click.component: no action')
		}
		
		let delegator: EventDelegator = (<any>this.view)._delegator
		
		this.subview = <TemplateView>this.childTemplate.view(this.view.context, {
			parent: this.view,
			delegator: delegator,
			container: (<any>this.view)._container
		});
		
		
		let node = <HTMLElement>this.subview.render();
		let elm
		if (attr.delegate && !this.rootElm) {
			let root = document.createElement('div');
			root.appendChild(node)
			node = root
			elm = root
		} else  {
			elm = node.children[0]
		} 
		
   
		if (attr.delegate) {
			delegator.addDelegate(elm, attr.delegate, 'click', attr.action)
		} else {
			delegator.addListener(elm, 'click', attr.action)
		}


		this.section.appendChild(node)
	}

	destroy () {
		super.destroy();
		this.subview.remove();
	}


}
