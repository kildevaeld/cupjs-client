/// <reference path="../typings" />
import {IPromise, Promise} from 'utilities/lib/index'
import {classtype, ClassType} from '../internal'
import {IModel} from 'collection'
import {TemplateView} from './template-view'
import {templ} from 'templ'

@classtype(ClassType.Service)
class TemplateInstatiator {
	create (model:IModel, template:string): TemplateView {
			let template = templ.compile(this.el.outerHTML, {
				viewClass: <any>TemplateView
			})
			let view = <any>template.view(ctx.model, {
				container: this._container,
				delegator: new EventDelegator(this, ctx, this._container)
			});
			
			
	} 
}