import {BaseObject} from '../object'
import {IProxy, ProxyEvent, get_atributes} from './index'
import {NestedModel} from 'collection'
import {callFunc, toPromise, nextTick, bind} from 'utilities/lib/index'

export class ObjectObserveProxy extends BaseObject implements IProxy {
	public model:NestedModel
	__queue:number
	[x: string]: any
	parent: ObjectObserveProxy
	constructor(model:NestedModel, parent?: ObjectObserveProxy) {
		super()
		this.model = model
		this._onchange = bind(this._onchange, this);
		this.__queue = 0
		this.parent = parent
	}
	
	$run (fn:Function, ctx:any, args:any[]): any {
		this._observe();
		let results = callFunc(fn, ctx, args);
		if (results) {
			this.__queue++
			toPromise(results)
			.then(() => {
				if (--this.__queue === 0)
					this._unobserve();	
			});	
		} else {
			nextTick(() => { 
				if (this.__queue == 0)
					this._unobserve 
			});
			
		}
	} 
	
	private _observe () {
		(<any>Object).observe(this, this._onchange);
	}
	
	private _unobserve () {
		(<any>Object).unobserve(this, this._onchange);
	}
	
	private _onchange (events:ProxyEvent[]) {
		
		let props = {}
		
		for (let i=0,ii=events.length;i<ii;i++) {
			let e = events[i]
			if (e.name === '__queue') continue;
			if (e.type === 'delete') {
				this.model.unset(e.name, {});
			} else {
				props[e.name] = this[e.name]
			}
		}
		
		let {attr, deferred} = get_atributes(props);
		
		if (Object.keys(attr).length)
			this.model.set(attr);
		
		if (Object.keys(deferred).length) {
			this.__queue++
			toPromise(props)
			.then((props) => {
				
				if (--this.__queue === 0) {
					this._unobserve();
				}
				this.model.set(props);
			}).catch( (e) => {
				this.trigger('error', e);
				this._unobserve();
			})
			
		}
	}
	
	createChild (): ObjectObserveProxy {
		return new ObjectObserveProxy(new NestedModel(), this)
	}
}
