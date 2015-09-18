/// <reference path="typings" />

import * as templ from 'templ'
import {Model,NestedModel} from 'collection'

export class TemplateView extends templ.View {
	_context: any
	set context(context: any) {
		
		if (this._context && this._context instanceof Model) {
			//this._context.off('change');
		}
		if (context != null) {
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
			
	}
	
	set(key: string|string[], val: any, silent: boolean = false) {

		if (!silent) {
			if (!(this.context instanceof Model)) {
				return super.set(key, val)
			}

			if (!Array.isArray(key)) key = (<string>key).split(/[,.]/);

			if (key[0] === '$') {
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

		let value

		if (key[0] === '$') {
			(<any>key).shift();
			if (key.length === 0) {
				value = this.context
			}
		}
		key = (<any>key).join('.')
		if (!value) {
			if (!(this.context instanceof Model)) {
				value = super.get(key)
			} else {
				value = this.context.get(key)
			}
		}

		return value;
	}
}
