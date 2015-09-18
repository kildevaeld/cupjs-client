/// <reference path="../typings" />
import {IPromise, Promise} from 'utilities/lib/index'
import {classtype, ClassType} from '../internal'

@classtype(ClassType.Service)
export class TemplateResolver {
	resolve (templateID:string): IPromise<string> {
		let template = document.getElementById(templateID);
		
		if (template == null) 
			return Promise.reject(new Error(`template with id: '${templateID}' not found`));
			
		return Promise.resolve(template.innerHTML);
	}
}
