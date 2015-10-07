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
import { classtype, ClassType } from '../internal';
import { TemplateView } from './template-view';
import { templ } from 'templ';
let TemplateInstatiator = class {
    create(model, template) {
        let template = templ.compile(this.el.outerHTML, {
            viewClass: TemplateView
        });
        let view = template.view(ctx.model, {
            container: this._container,
            delegator: new EventDelegator(this, ctx, this._container)
        });
    }
};
TemplateInstatiator = __decorate([
    classtype(ClassType.Service), 
    __metadata('design:paramtypes', [])
], TemplateInstatiator);
