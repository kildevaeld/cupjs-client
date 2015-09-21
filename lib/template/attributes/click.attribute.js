/// <reference path="../../typings" />
import { attributes } from 'templ';
export class ClickAttribute extends attributes.BaseAttribute {
    update() {
        if (this._boundFunction) {
            this.view.removeListener(this.ref, 'click', this._boundFunction);
        }
        this._boundFunction = this.view.addListener(this.ref, 'click', this.value);
    }
    destroy() {
        if (this._boundFunction) {
            this.view.removeListener(this.ref, 'click', this._boundFunction);
        }
        super.destroy();
    }
}
