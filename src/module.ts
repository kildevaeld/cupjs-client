import {ModuleOptions} from './typings'
import {BaseObject} from './object'
import {classtype,ClassType} from './internal'
import {DIContainer} from 'di'
import {IProxy, createProxy} from './proxy'
import {NestedModel} from 'collection'

@classtype(ClassType.Module)
export class Module extends BaseObject {
	private _container: DIContainer
	private _name: string
	private _el: HTMLElement
	private _ctx: IProxy
	
	get name (): string {
		return this._name
	}
	
	get el (): HTMLElement {
		return this._el;
	}
	
	get ctx (): IProxy {
		return this._ctx
	}
	
	module<T> (name): T {
		if (!this._container.hasHandler(name)) {
			return null
		}
		return this._container.get(name)
	} 
	
	constructor (container:DIContainer, options:ModuleOptions) {
		this._name = options.name
		this._el = options.el
		this._container = container
		this._ctx = createProxy(new NestedModel())
		super()
	}
	
	initialize () {
		
	}
}
