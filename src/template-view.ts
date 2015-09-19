/// <reference path="typings" />

import * as templ from 'templ'
import {Model,NestedModel} from 'collection'
import {DIContainer} from 'di'

export class TemplateView extends templ.View {
	_context: any
	_container: DIContainer
	set context(context: any) {
		
		if (this._context && this._context instanceof Model) {
			//this._context.off('change');
		}
		if (context != null && context instanceof Model) {
			context.on('change', function () {
				let changed = context.changed
				for (let k in changed) {
					this.set(k, changed[k])
				}
			}, this)
		}
		
		this._context = context
	}

	get context(): any {
		return this._context
	}
	
	_onModelChange () {
		
	}
	
	constructor(section:any, template:any, context:any,options?:any) {
			super(section, template, context, options)
			
			if (options.delegator) {
				this._delegator = options.delegator
			}
			if (options.container) {
				this._container = options.container
			}
		
			
	}
	
	set(key: string|string[], val: any, silent: boolean = false) {

		if (!silent) {
			if (!(this.context instanceof Model)) {
				return super.set(key, val)
			}

			if (!Array.isArray(key)) key = (<string>key).split(/[,.]/);

			if (key[0] === 'this') {
				(<string[]>key).shift();


				if (key.length === 0) {
					this.root.context = val
					this.root.update()
				} else {
					this.root.set(key, val)
					this.root.update();
				}
				return
			} else {

				this.context.set((<string[]>key).join('.'), val)
			}

		}

		this.update()
	}

	get(key: string|string[]): any {

		if (!Array.isArray(key)) key = (<string>key).split(/[,.]/);

		let value, context = this.context;

		if (key[0].substr(0,1) === "@") {
			key[0] = key[0].substr(1);
			(<string[]>key).unshift('this');
		}

		if (key[0] === 'this') {
			(<any>key).shift();
			if (key.length === 0) {
				value = this.context
			}
		} else if (key[0] === 'root') {
			(<any>key).shift();
			context = this.context.root
		}
		
		key = (<any>key).join('.')
		if (!value) {
			if (!(this.context instanceof Model)) {
				value = super.get(key)
			} else {
				value = context.get(key)
			}
		}

		return value;
	}
}
