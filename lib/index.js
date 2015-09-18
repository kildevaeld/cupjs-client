import { Application } from './application';
import * as templ from 'templ';
import { ControllerComponent } from './template/controller.component';
import { TemplateResolver } from './services/template.resolver';
import { DINamespace } from './internal';
export const cupjs = new Application();
templ.component("controller", ControllerComponent);
cupjs.container.registerSingleton("templateResolver", TemplateResolver, DINamespace);
