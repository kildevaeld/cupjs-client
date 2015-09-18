import {toPromise, bind, callFunc, nextTick, deferred, Deferred, isObject} from 'utilities/lib/index'
import {IModel, NestedModel, Collection} from 'collection'
import {IProxy, ProxyEvent, get_atributes} from './index'

export abstract class AbstractProxy {
	public model:IModel
	__queue:number
	[x: string]: any
	parent: IProxy
	
	constructor (model?:IModel, parent?:IProxy) {
		this.model = model||new NestedModel()
		this.parent = parent
		this.__queue = 0
		this._onchange = bind(this._onchange, this);
	}
	
	$run (fn:Function, ctx:any, args:any[]): any {
		this.observe();
		
		
		let results = callFunc(fn, ctx, args);
		
		if (results) {
			this.__queue++
			return toPromise(results)
			.then(() => {
				if (--this.__queue === 0)
					this.unobserve();	
				return results
			});	
		} else {
			let defer = <Deferred<any>>deferred()
			nextTick(() => { 
				if (this.__queue == 0)
					this.unobserve() 
				defer.resolve(null)
			});
			return defer.promise
		}
	}
	
	protected _onchange (events:ProxyEvent[]) {
		
		let props = {}
		
		for (let i=0,ii=events.length;i<ii;i++) {
			let e = events[i]
			if (e.name === '__queue') continue;
			if (e.type === 'delete') {
				this.model.set(e.name, {unset:true});
			} else {
				props[e.name] = this[e.name]
			}
		}
		
		let {attr, deferred} = get_atributes(props);
		
		if (Object.keys(attr).length)
			this.model.set(this.__normalizeAttr(attr));
		
		if (Object.keys(deferred).length) {
			this.__queue++
			toPromise(deferred)
			.then((props) => {
				
				if (--this.__queue === 0) {
					this.unobserve();
				}
				this.model.set(this.__normalizeAttr(props));
				
			}).catch( (e) => {
				this.model.trigger('error', e);
				this.unobserve();
			})
			
		}
	}
	
	private __normalizeAttr (attr): any {
		for (let key in attr) {
			let val = attr[key];
	
			if (Array.isArray(val) && val.length > 0 && isObject(val[0])) {
				val = new Collection(val);
	
				attr[key] = val;
    	}
  	}
		return attr
	}
	
	observe () {}
	
	unobserve () {}
	
	destroy () {
		(<any>this.model).destroy()
	}
}
