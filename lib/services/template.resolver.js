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
import { Promise } from 'utilities/lib/index';
import { classtype, ClassType } from '../internal';
export let TemplateResolver = class {
    resolve(templateID) {
        let template = document.getElementById(templateID);
        if (template == null)
            return Promise.reject(new Error(`template with id: '${templateID}' not found`));
        return Promise.resolve(template.innerHTML);
    }
};
TemplateResolver = __decorate([
    classtype(ClassType.Service), 
    __metadata('design:paramtypes', [])
], TemplateResolver);
