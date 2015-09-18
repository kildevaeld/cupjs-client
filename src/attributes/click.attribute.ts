/// <reference path="../typings" />

import {attributes} from 'templ'


export class ClickAttribute extends attributes.BaseAttribute {
	_boundFunction:Function
	update() {
		
		if (this._boundFunction) {
			this.view.removeListener(<Element>this.ref, 'click', <any>this._boundFunction)
		}
		
		this._boundFunction = this.view.addListener(<Element>this.ref, 'click', this.value)
		
	}
	
	destroy () {
		if (this._boundFunction) {
			this.view.removeListener(<Element>this.ref, 'click', <any>this._boundFunction)
		}
		super.destroy();
	}
}