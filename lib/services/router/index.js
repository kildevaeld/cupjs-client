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
import { DIContainer } from 'di';
import { TemplateView, EventDelegator } from '../../template/index';
import * as templ from 'templ';
export let RouterService = class {
    constructor(context, container) {
        this.router = new Router({
            execute: utils.bind(this.__execute, this)
        });
        this.context = context;
        this.container = container;
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
        if (!this.container.hasHandler(options.controller)) {
            throw new Error('[router] controller');
        }
        return (...args) => {
            let target;
            if (typeof options.target === 'string') {
                target = document.querySelector(options.target);
            }
            else {
                target = options.target;
            }
            let templateResolver = this.container.get('templateResolver');
            let controller = this.container.get(options.controller);
            templateResolver.resolve(options.template)
                .then((str) => {
                if (!str) {
                    throw new Error('template');
                }
                let ctx = controller.ctx;
                let template = templ.compile(str, {
                    viewClass: TemplateView
                });
                let view = template.view(ctx.model, {
                    container: this.container,
                    delegator: new EventDelegator(controller, ctx, this.container)
                });
                controller.template = view;
                target.appendChild(view.render());
            });
        };
    }
};
RouterService = __decorate([
    classtype(ClassType.Service), 
    __metadata('design:paramtypes', [Object, DIContainer])
], RouterService);
