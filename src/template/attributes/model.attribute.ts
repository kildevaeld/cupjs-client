/// <reference path="../../typings" />

import {attributes} from 'templ'
import {equal} from 'utilities'

/*export class ModelAttribute extends attributes.BaseAttribute {
	_boundFunction:Function
	_oldValue:any
	update() {
		
		let val = this.value
		if (equal(val, this._oldValue)) {
			console.log('equal')
			return
		}
		
		if (typeof val !== 'string') return 
		val = val.trim()	
		if (!val.substr(0) != '{') {
			val = "{"
		}
	}
}*/
