
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
		
		let name = moduleName||camelcase(target.name);
		
		let map: MetaMap = {
			name: name,
			handler: target
		}
		
		if (!metadata.has(name)) {
			metadata.set(name, []);
		}
		
		let types = metadata.get(moduleName)
		
		let exists = find(types, i => i.name == name);
		
		if (exists) {
			throw new Error(`module '${name}' already exists!`);
		} 
		
		classtype(ClassType.Module)(target);
		
		types.push(map)
			
	}
}

export function service (serviceName?:string, moduleName?:string): ClassDecorator {
	return function (target:Function) {
		
		let name = serviceName||camelcase(target.name);
		
		let map: MetaMap = {
			name: name,
			handler: target
		}
		
		if (!metadata.has(name)) {
			metadata.set(name, []);
		}
		
		let types = metadata.get(moduleName)
		
		let exists = find(types, i => i.name == name);
		
		if (exists) {
			throw new Error(`service '${name}' already exists!`);
		} 
		
		classtype(ClassType.Service)(target);
		
		types.push(map)
			
	}
}