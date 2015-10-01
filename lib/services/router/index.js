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
import { Router } from './router';
import { classtype, ClassType } from '../../internal';
import * as utils from 'utilities';
export let RouterService = class {
    constructor(context) {
        this.router = new Router({
            execute: utils.bind(this.__execute, this)
        });
        this.context = context;
        this.router.history.start();
    }
    route(route, handler) {
        if (typeof handler === 'function') {
            this.router.route(route, handler);
        }
        else if (utils.isObject(handler)) {
            this.router.route(route, this.__handleController(handler));
        }
        return this;
    }
    __execute(callback, args) {
        this.context.$run(callback, this.context, args);
    }
    __handleController(options) {
        let ctrl = ;
        return (...args) => {
        };
    }
};
RouterService = __decorate([
    classtype(ClassType.Service), 
    __metadata('design:paramtypes', [Object])
], RouterService);
