import {BaseObject} from '../object'
import {IProxy, ProxyEvent, get_atributes} from './index'
import {NestedModel} from 'collection'
import {callFunc, toPromise, nextTick, bind} from 'utilities/lib/index'
import {AbstractProxy} from './proxy'

export class ObjectObserveProxy extends AbstractProxy implements IProxy {
	
	observe () {
		(<any>Object).observe(this, this._onchange);
		if (this.parent) this.parent.observe();
	}
	
	unobserve () {
		(<any>Object).unobserve(this, this._onchange);
		if (this.parent) this.parent.unobserve();
		
	}
	
	createChild (): ObjectObserveProxy {
		return new ObjectObserveProxy(new NestedModel(), this)
	}
}
