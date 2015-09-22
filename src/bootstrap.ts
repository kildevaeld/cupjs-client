/// <reference path="typings" />

import {domReady, deferred, Deferred, IPromise, Promise, find} from 'utilities'
import {Application} from './application'
import {Module} from './module'
import {ModuleFactory} from './module.factory'
import {isClassType, ClassType, metadata, getClassType} from './internal'
import {DIContainer} from 'di'


function _resolve (moduleName: string, type: ClassType): any {
	if (metadata.has(moduleName)) {
		let meta = metadata.get(moduleName);
		let items = meta.filter(x => isClassType(x.handler, type))
		return items	
	}
	return [];
}
function resolveControllers (moduleName: string): any {
	return _resolve(moduleName, ClassType.Controller);
}

function resolveServices (moduleName: string): any {
	return _resolve(moduleName, ClassType.Service);
}

function resolveModule(app:Application, moduleName: string): ModuleFactory {
	let factory
	
	if (metadata.has(moduleName)) {
		
		let meta = metadata.get(moduleName);
		let item = find(meta, x => x.name === name)
		if (item && !isClassType(item.handler, ClassType.Module)) {
			let cType = getClassType(item.handler);
			throw new Error(`Item '${name}' found, but it is defined as a '${ClassType[cType]}'`);
		}
		if (item) {
			factory = app.module(moduleName, item.handler);
		}
		
	}
	
	if (!factory && app.container.hasHandler(moduleName)) {
		factory = <ModuleFactory>app.container.get(moduleName);
	}
	
	if (factory) {
		let controllers = resolveControllers(moduleName)
		controllers.forEach( x => {
			factory.controller(x.name, x.handler)
		});
		
		let services = resolveServices(moduleName)
		services.forEach( x => factory.service(x.name, x.handler));
		
	}
	
	return factory;
	
}

export function bootstrap (app:Application): IPromise<Module[]>  {
	
	let defer = <Deferred<Module[]>>deferred()
	
	domReady(function () {
		
		let elements = document.querySelectorAll('[moby-app]'),
			elm, name, mod: ModuleFactory;
		
		let queue = []
		
		for (let i=0,ii=elements.length;i<ii;i++) {
			elm = elements[i]
			name = elm.getAttribute('moby-app')
			
			mod = resolveModule(app, name);
			
			if (mod == null) {
				console.warn('could not find module for ', name)	
				continue;	
			}
			
			if (!(mod instanceof ModuleFactory)) {
				throw new Error(`Module ${name} is not of type: module`);
			}
			
			queue.push(mod.create({
				el: <HTMLElement>elm,
				name: name
			}));
			
		}
		
		Promise.all(queue).then(defer.resolve, defer.reject)
		
	});
	
	return defer.promise
}