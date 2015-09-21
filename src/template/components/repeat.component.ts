/// <reference path="../../typings" />

import {components, View, compile, vnode} from 'templ'
import {TemplateResolver} from '../../services/template.resolver'
import {TemplateView} from '../template-view'
import {Collection, IModel, NestedModel} from 'collection'
import {uniqueId} from 'utilities/lib/index'

export class RepeatComponent extends components.BaseComponent {
	_children: View[] = []
	_collection: Collection<IModel>
	
	update() {
		
		var as = this['as'];
   	var each = this['each'];
    var key = this['key'] || "key";

    var n = 0;
    var self = this;
    var parent = this.view;

		if (each === this._collection || !each) {
			return
		}
	
		if (this._collection && this._collection instanceof Collection) {
			this.__removeEventListeners(this._collection)
			//this._collection.off('remove',this._update)
			//this._collection.off('add', this._update)
			//this.__removeEventListeners(this._collection)
		}
		
		this._collection = each

		this._update()

		if (each instanceof Collection) {
			this.__addEventListeners(each)
		}

	}

	_update() {
		var properties;
		var as = this['as'];
		var parent = this.view
		var n = 0
		
		var delegateID = uniqueId('.repeat')
		
    this._collection.forEach((m: IModel) => {

			var child;

			if (as) {
				properties = new NestedModel({[as]:m});
			} else {
				properties = m;
			}
			
			
			// TODO - provide SAME context here for speed and stability
			if (n >= this._children.length) {

				child = this.childTemplate.view(properties, {
					parent: parent
				});
				

				this._children.push(child);
				
				this.section.appendChild(child.render(properties));

			} else {
				child = this._children[n];
				child.context = properties;
				child.update();
			}

			n++;

		});

		this._children.splice(n).forEach(function(child) {
			(<any>child).remove();
		});
		
		
	}
	
	__addEventListeners<T extends IModel>(collection:Collection<T>) {
		collection.on('add', this._update, this);
		collection.on('remove', this._update, this);
		collection.on('reset', this._update, this);
	}
	
	__removeEventListeners<T extends IModel>(collection:Collection<T>) {
		collection.off('remove',this._update)
		collection.off('add', this._update)
		collection.reset('reset', this._update)
	}

	setAttribute(key: string, value: any) {
		this[key] = value

	}
	
	setProperty() {
		console.log(arguments)
	}
	
	destroy () {
		this._collection.destroy();
		for (let child of this._children) {
			child.remove();
		}
		super.destroy()
	}
}