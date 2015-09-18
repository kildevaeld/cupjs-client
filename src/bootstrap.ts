/// <reference path="typings" />

import {domReady, deferred, Deferred, IPromise, Promise} from 'utilities/lib/index'
import {Application} from './application'
import {Module} from './module'
import {ModuleFactory} from './module.factory'
import {isClassType, ClassType} from './internal'

export function bootstrap (app:Application): IPromise<Module[]>  {
	
	let defer = <Deferred<Module[]>>deferred()
	
	domReady(function () {
		
		let elements = document.querySelectorAll('[moby-app]'),
			elm, name, mod: ModuleFactory;
		
		let queue = []
		
		for (let i=0,ii=elements.length;i<ii;i++) {
			elm = elements[i]
			name = elm.getAttribute('moby-app')
			if (!app.container.hasHandler(name)) continue
				
			mod = <ModuleFactory>app.container.get(name);
			
			if (!(mod instanceof ModuleFactory)) {
				throw new Error(`Module ${name} is not of type: module`);
			}
			
			queue.push(mod.create({
				el: <HTMLElement>elm,
				name: name
			}));
			
		}
	
		Promise.all(queue).then(defer.resolve, defer.reject);
		
	});
	
	return defer.promise
}