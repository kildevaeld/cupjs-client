import './template/index';


import * as utils from 'utilities'
import {DIContainer, getFunctionParameters} from 'di'
import {Collection, NestedModel, ICollection, IModel} from 'collection'
import {BaseObject} from './object'
import {Module} from './module'
import {ModuleConstructor, Moby, ITemplateDeclaration} from './typings'
import {TemplateResolver, HttpService, RouterService} from './services/index'
import {DINamespace, getDependencies, ClassType} from './internal'
import {ModuleFactory} from './module.factory'
import {bootstrap} from './bootstrap'

import {Repository} from './repository'

import * as annotations from './annotations'

const container = new DIContainer();

container.registerSingleton("templateResolver",TemplateResolver)


export const moby: Moby = {
	EventEmitter: BaseObject,
	utils: utils,
	Module: Module,
	Collection: Collection,
	Model: NestedModel, 
	annotations: annotations,
	component (name:string, cmp:ITemplateDeclaration|templ.vnode.ComponentConstructor): Moby {
		
		if (typeof cmp !== 'function') {
			cmp = utils.inherits(<any>templ.components.BaseComponent, cmp);
		}
		templ.component(name, <any>cmp);
		
		return moby
	},
	
	attribute (name: string, attr:ITemplateDeclaration|templ.vnode.AttributeConstructor): Moby {
		
		if (typeof attr !== 'function') {
			attr = utils.inherits(<any>templ.attributes.BaseAttribute, attr);
		}	
		templ.attribute(name, <any>attr)
		
		return moby
	},
	
	modifier (name:string, converter: (any) => any): Moby {
		templ.modifier(name, converter);
		return moby;
	},
	
	module (name:string, definition?:any): ModuleFactory {
		
		if (definition == null) {
			let handler = Repository.get(ClassType.ModuleFactory, name)
			return handler ? handler.handler : null;
		}
		
		let def = definition,
			deps = null,
			mod = null
		
		if (Array.isArray(definition)) {
			def = definition.pop()
			deps = definition
		}
		
		if (utils.isObject(def) && typeof def !== 'function') {
			if (def.constructor != null) {
				(<any>def).initialize = def.constructor
				delete def.constructor
			}
			mod = Module.extend<ModuleConstructor>(def) 
		} else if (typeof def === 'function') {
			mod = def;
		} else {
			throw new Error('module type');
		}
		
		if (deps) {
			mod.inject = deps;
		}
		
		let factory = new ModuleFactory(name, mod, container.createChild());
		
		if (!mod.inject) {
			if (typeof mod.prototype.initialize === 'function') {
				mod.inject = getFunctionParameters(mod.prototype.initialize);	
			} else {
				mod.inject = [];
			}
		}
		
		Repository.add(ClassType.ModuleFactory, name, factory)
		
		return factory
	
  },


  service (name:string, definition?:any): Moby {
		if (definition == null) {
			throw new Error('no def');
		}
		
		let [fn] = getDependencies(definition);
		
		if (typeof fn !== 'function') throw new Error('fn');
		
		Repository.add(ClassType.Service, name, fn); 
		
		return moby
  },
	
	factory (name:string, factory:any): Moby {
		if (factory == null) {
			throw new Error('no factory');
		}
		
		let [fn] = getDependencies(factory);
		
		if (fn == null) throw new Error('no factory');
		
		Repository.add(ClassType.Service, name, fn)
		
		
		return moby;
	}
}

// Add default services
moby.service('http', HttpService);
moby.service('router', ['context', RouterService])
// bootstrap
bootstrap(moby);