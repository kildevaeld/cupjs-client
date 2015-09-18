import {toPromise, bind, callFunc, nextTick} from 'utilities/lib/index'
import {IModel} from 'collection'
import {IProxy, ProxyEvent, get_atributes} from './index'

export class AbstractProxy {
	public model:IModel
	__queue:number
	[x: string]: any
	parent: IProxy
	
	constructor (model:IModel, parent?:IProxy) {
		this.model = model
		this.parent = parent
		this.__queue = 0
		this._onchange = bind(this._onchange, this);
	}
	
	$run (fn:Function, ctx:any, args:any[]): any {
		this.observe();
		let results = callFunc(fn, ctx, args);
		if (results) {
			this.__queue++
			toPromise(results)
			.then(() => {
				if (--this.__queue === 0)
					this.unobserve();	
			});	
		} else {
		
			nextTick(() => { 
				
				if (this.__queue == 0)
					this.unobserve() 
			});
			
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
			this.model.set(attr);
		
		if (Object.keys(deferred).length) {
			this.__queue++
			toPromise(props)
			.then((props) => {
				
				if (--this.__queue === 0) {
					this.unobserve();
				}
				this.model.set(props);
			}).catch( (e) => {
				this.model.trigger('error', e);
				this.unobserve();
			})
			
		}
	}
	
	observe () {
		
	}
	
	unobserve () {
		
	}
	
	destroy () {
		(<any>this.model).destroy()
	}
}
