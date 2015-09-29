import {BaseObject} from '../object'
import {IProxy, ProxyEvent, get_atributes} from './index'
import {NestedModel} from 'collection'
import {callFunc, toPromise, nextTick, bind} from 'utilities/lib/index'
import {AbstractProxy} from './proxy'

export class ObjectObserveProxy extends AbstractProxy implements IProxy {
	
	observe () {
		if (this.__observing) return
		(<any>Object).observe(this, this._onchange);
		super.observe();
	}
	
	unobserve () {
		if (!this.__observing) return
		(<any>Object).unobserve(this, this._onchange);
		super.unobserve();
		
	}
	
	createChild (): ObjectObserveProxy {
		return new ObjectObserveProxy(new NestedModel(), this)
	}
}
