import './template/index';

import {Application} from './application'
import * as utils from 'utilities'


import {Module} from './module'
import {ModuleConstructor} from './typings'
import {TemplateResolver, HttpService} from './services/index'
import {DINamespace} from './internal'
import {ModuleFactory} from './module.factory'
import {bootstrap} from './bootstrap'
import * as annotations from './annotations'

export interface ITemplateDeclaration {
	update?: () => void
	initialize?: () => void		
}

const instance = new Application();

instance.container.registerSingleton("templateResolver",TemplateResolver,DINamespace)
instance.service('http', HttpService)

bootstrap(instance)


export const moby = {
	
	utils: utils,
	Module: Module,
	annotations: annotations,
	component (name:string, cmp:ITemplateDeclaration|templ.vnode.ComponentConstructor): Application {
		
		if (typeof cmp !== 'function') {
			cmp = utils.inherits(<any>templ.components.BaseComponent, cmp);
		}
		
		templ.component(name, <any>cmp);
		
		return instance
	},
	
	attribute (name: string, attr:ITemplateDeclaration|templ.vnode.AttributeConstructor): Application {
		
		if (typeof attr !== 'function') {
			attr = utils.inherits(<any>templ.attributes.BaseAttribute, attr);
		}
		
		templ.attribute(name, <any>attr)
		
		return instance
	},
	
	modifier (name:string, converter: (any) => any): Application {
		templ.modifier(name, converter);
		return instance;
	},
	
	module (name:string, definition?:ModuleConstructor|Object, config?:any): ModuleFactory {
		return instance.module(name, definition);
  },

  service (name:string, definition?:any, config?:any): Application {
		instance.service(name, definition, config);
		return instance;
  }
}



