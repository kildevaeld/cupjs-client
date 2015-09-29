var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseObject } from './object';
import { classtype, ClassType } from './internal';
import { DIContainer } from 'di';
import * as templ from 'templ';
import { TemplateView } from './template/template-view';
import { EventDelegator } from './template/event.delegator';
export let Module = class extends BaseObject {
    /**
     * Module
     * @param {DIContainer} container
     * @param {Object} options
     */
    constructor(container, options) {
        super();
        this._name = options.name;
        this._el = options.el;
        this._container = container;
        let ctx = container.get('context');
        if (this.el) {
            let template = templ.compile(this.el.outerHTML, {
                viewClass: TemplateView
            });
            this._templ = template.view(ctx.model, {
                container: this._container,
                delegator: new EventDelegator(this, ctx, this._container)
            });
            let el = this._templ.render();
            this.el.parentNode.replaceChild(el, this.el);
        }
    }
    get name() {
        return this._name;
    }
    get el() {
        return this._el;
    }
    get ctx() {
        return this._container.get('context');
    }
    get container() {
        return this._container;
    }
    module(name) {
        //console.log('finding', name)
        if (!this._container.hasHandler(name, true)) {
            return null;
        }
        return this._container.get(name);
    }
    initialize() {
    }
    destroy() {
        this._container.unregister('context');
        this._ctx.destroy();
        super.destroy();
    }
};
Module = __decorate([
    classtype(ClassType.Module), 
    __metadata('design:paramtypes', [DIContainer, Object])
], Module);
