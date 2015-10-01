import {ClassType, getDependencies, DIServiceConfig} from './internal'
import {find} from 'utilities';
import {Metadata} from 'di'
export interface ItemMap {
	name: string
	handler: any
	type: ClassType
	config?:any
} 

export module Repository {
	const items = [];
	
	export function add (type:ClassType, name:string, target:any) {
		
		let item;
		if ((item = find(items, (i) => i.name == name))) {
			throw new Error(`${type} named ${name} already imported as ${item.type}`);
		}
		
		let config = Metadata.get(DIServiceConfig, target)
		
		items.push({
			name: name,
			handler: target,
			type: type,
			config: config
		});
		
	}
	
	export function has (type: ClassType, name: string): boolean {
		return !!get(type,name);
	}
	
	export function get(type: ClassType, name: string): ItemMap {
		return find(items, (i) => i.name == name && i.type == type)
	}
	
	export function any(name: string): ItemMap {
		return find(items, (i) => i.name == name);
	}
} 