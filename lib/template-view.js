/// <reference path="typings" />
import * as templ from 'templ';
import { Model } from 'collection';
export class TemplateView extends templ.View {
    constructor(section, template, context, options) {
        super(section, template, context, options);
        if (options.delegator) {
            this._delegator = options.delegator;
        }
    }
    set context(context) {
        if (this._context && this._context instanceof Model) {
        }
        if (context != null) {
            context.on('change', function () {
                let changed = context.changed;
                for (let k in changed) {
                    this.set(k, changed[k]);
                }
            }, this);
        }
        this._context = context;
    }
    get context() {
        return this._context;
    }
    _onModelChange() {
    }
    set(key, val, silent = false) {
        if (!silent) {
            if (!(this.context instanceof Model)) {
                return super.set(key, val);
            }
            if (!Array.isArray(key))
                key = key.split(/[,.]/);
            if (key[0] === '$') {
                key.shift();
                if (key.length === 0) {
                    this.root.context = val;
                    this.root.update();
                }
                else {
                    this.root.set(key, val);
                    this.root.update();
                }
                return;
            }
            else {
                this.context.set(key.join('.'), val);
            }
        }
        this.update();
    }
    get(key) {
        if (!Array.isArray(key))
            key = key.split(/[,.]/);
        let value;
        if (key[0] === '$') {
            key.shift();
            if (key.length === 0) {
                value = this.context;
            }
        }
        key = key.join('.');
        if (!value) {
            if (!(this.context instanceof Model)) {
                value = super.get(key);
            }
            else {
                value = this.context.get(key);
            }
        }
        return value;
    }
}
