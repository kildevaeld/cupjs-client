
import {metadata, MetaMap, ClassType, classtype} from './internal'
import {camelcase, find} from 'utilities'



export function controller (moduleName:string, controllerName?:string): ClassDecorator {
	return function (target:Function) {
		
		let name = controllerName||camelcase(target.name);
		
		let map: MetaMap = {
			name: name,
			handler: target
		}
		
		classtype(ClassType.Controller)(target);
		
		if (!metadata.has(moduleName)) {
			metadata.set(moduleName, []);
		}
		
		let types = metadata.get(moduleName);
		
		let exists = find(types, i => i.name === name);
		
		if (exists) {
			throw new Error('controller already exists in module');
		}
		
		metadata.get(moduleName).push(map);
		
	}	
}



export function module (moduleName?:string): ClassDecorator {
	return function (target:Function) {
		
	}
}