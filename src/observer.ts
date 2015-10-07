
import {EventEmitter} from 'eventsjs'
import * as utils from 'utilities'

class Observer extends EventEmitter {
	private observer: MutationObserver
	constructor (el:HTMLElement) {
		super()
		this.observer = new MutationObserver(utils.bind(this._observe, this))
		this.observer.observe(el, {
			attributes: true, 
			childList: true, 
			characterData: true 
		});
	}
	
	
	
	_observe (records:MutationRecord[], observer:MutationObserver) {
		
	} 
	
}