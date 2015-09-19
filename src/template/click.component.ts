/// <reference path="../typings" />

import {components, View, compile, vnode, Assignment} from 'templ'
import {DIContainer} from 'di'
import {isPromise, IPromise, Promise, extend, equal} from 'utilities'
import {TemplateView} from '../template-view'
import {EventDelegator} from '../event.delegator'

// TODO: Optimize
export class ClickComponent extends components.BaseComponent {
	container: DIContainer
	subview: View
  private _bound: [HTMLElement, Function, string, string]
	private _oldAction:any
	update () {
		
		let rootElm
		if (this.vnode.childNodes.length === 1) {
      rootElm = <any>this.vnode.childNodes[0];
    }
		
    let attr: any = this.attributes,
			delegator: EventDelegator = (<any>this.view)._delegator
		
		if (rootElm) {
			attr = extend({},attr,rootElm.attributes)
		}
		
		if (!attr.action) {
			throw new Error('click.component: no action')
		}
		
		let action = attr.action
		
		if (action instanceof Assignment) {
			action = action.assign
		}
		
		let isAssignment = (attr.action instanceof Assignment) && 
			(this._oldAction instanceof Assignment)
		
		if ( (isAssignment && attr.action.path == this._oldAction.path) || 
			action == this._oldAction) {
			return
		}
		
		this._oldAction = attr.action
		
		if (this.subview) {
			this.subview.remove()
			delete this.subview
		}
		
		this._undelegateEvent();
		
		this.subview = <TemplateView>this.childTemplate.view(this.view.context, {
			parent: this.view,
			delegator: delegator,
			container: (<any>this.view)._container
		});
		
		
		let node = <HTMLElement>this.subview.render();
		let elm: HTMLElement
		if (attr.delegate && !rootElm) {
			elm = document.createElement('div');
			elm.appendChild(node)
			node = elm		
		} else  {
			elm = <HTMLElement>node.children[0]
		} 
		
   	let fn: Function
		if (attr.delegate) {
			fn = delegator.addDelegate(elm, attr.delegate, 'click', action)
		} else {
			fn = delegator.addListener(elm, 'click', action)
		}

		this._bound = [elm, fn, 'click', <string>attr.delegate]

		this.section.appendChild(node)
	}

	_undelegateEvent () {
		let delegator: EventDelegator = (<any>this.view)._delegator
		if (this._bound) {
			let [elm, fn, eventName, selector] = this._bound;
			
			(selector != null)  ? delegator.removeDelegate(elm, selector, eventName, <EventListener>fn) : 
				delegator.removeListener(elm, eventName, <EventListener>fn)
			delete this._bound
		}
	}

	destroy () {
		this._undelegateEvent()
		this.subview.remove();
		super.destroy();
		
	}


}
