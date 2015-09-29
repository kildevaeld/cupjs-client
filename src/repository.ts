import {ClassType, getDependencies} from './internal'
import {find} from 'utilities';

export interface ItemMap {
	name: string
	handler: any
} 

export module Repository {
	export var factories: ItemMap[] = [];
	export var services: ItemMap[] = [];
	export var modules: ItemMap[] = [];
	
	export function add (type:ClassType, name:string, target:any) {
		
		let array: ItemMap[]
		switch (type) {
			case	ClassType.Service:
				array = services;
				break;
			case ClassType.Factory:
				array = factories;
				break;
			case ClassType.ModuleFactory:
				array = modules;
				break;
			default:
			throw new Error('service, factory')
		}
		
		let found = find(array, (i) => i.name == name)
		
		if (found) {
			throw new Error(`${type} named ${name} already imported`);
		}
		
		array.push({
			name: name,
			handler: target
		})
		
	}
	
	export function has (type: ClassType, name: string): boolean {
		return !!get(type,name);
	}
	
	export function get<T>(type: ClassType, name: string): T {
		let array: ItemMap[]
		switch (type) {
			case	ClassType.Service:
				array = services;
				break;
			case ClassType.Factory:
				array = factories;
				break;
			case ClassType.ModuleFactory:
				array = modules;
				break;
			default:
			throw new Error('service, factory')
		}
		
		let found = find(array, (i) => i.name == name)
		return found ? found.handler : null;
	}
} 