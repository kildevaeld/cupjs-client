import {AbstractProxy} from './proxy'
import {IProxy, get_atributes, ProxyEvent} from './index'
import {BaseObject} from '../object'
import {IModel, NestedModel} from 'collection'
import {toPromise, callFunc, nextTick, equal} from 'utilities/lib/index'
let reserved = ['model','parent','__queue', '_onchange', '__timer', '_listeners']


export class DirtyObjectObserver extends AbstractProxy implements IProxy {
	private __timer: number

	observe () {
		this.unobserve()
    nextTick(() => {
      this._check(this.model)
    })
    this.__timer = setInterval(() => {
      this._check(this.model);
    }, 300);
	}
	
	unobserve () {
		if (this.__timer) {
      clearTimeout(this.__timer)
      this.__timer = null
    }
	}
  
  _check (model:IModel) {
		
		let attributes = this.model.toJSON()
		
		let events: ProxyEvent[] = [],
      v, ev: ProxyEvent
		
		for (let k of Object.keys(this)) {
      v = this[k];
      if (~reserved.indexOf(k)) continue
      ev = {
        name: k,
        object: this,
        type: v == null ? "delete" : "" 
      }
      
      if (v && !attributes[k]) {
        ev.type = "add"
      } else if (v && !equal(v,attributes[k])) {
        ev.type = "update"
      }
      ev.oldValue = attributes[k];
      
      events.push(ev)
      delete attributes[k]
    } 
    
    for (let k in attributes) {
      events.push({
        name: k,
        object:this,
        type: 'delete',
        oldValue: attributes[k]
      })
    }
		
    if (events.length)
      this._onchange(events)
  }
	
	
	createChild(): IProxy {
		let model = new NestedModel();
		return new DirtyObjectObserver(model, this);
	}
}