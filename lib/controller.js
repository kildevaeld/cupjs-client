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
import { ClassType, classtype } from './internal';
export let Controller = class extends BaseObject {
    set template(template) {
        if (this._template) {
            this._template.remove();
            this._template = void 0;
        }
        this._template = template;
    }
    get template() {
        return this._template;
    }
    initialize() {
    }
};
Controller = __decorate([
    classtype(ClassType.Controller), 
    __metadata('design:paramtypes', [])
], Controller);
