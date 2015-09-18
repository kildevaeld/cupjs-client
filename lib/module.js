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
import { createProxy } from './proxy';
import { NestedModel } from 'collection';
export let Module = class extends BaseObject {
    constructor(container, options) {
        this._name = options.name;
        this._el = options.el;
        this._container = container;
        this._ctx = createProxy(new NestedModel());
        super();
    }
    get name() {
        return this._name;
    }
    get el() {
        return this._el;
    }
    get ctx() {
        return this._ctx;
    }
    module(name) {
        if (!this._container.hasHandler(name)) {
            return null;
        }
        return this._container.get(name);
    }
    initialize() {
    }
};
Module = __decorate([
    classtype(ClassType.Module), 
    __metadata('design:paramtypes', [DIContainer, Object])
], Module);
