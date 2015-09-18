

import {Application} from './application'

import * as templ from 'templ'
import {ControllerComponent, RepeatComponent} from './template/index'
import {TemplateResolver} from './services/template.resolver'
import {DINamespace} from './internal'

export const cupjs = new Application();

templ.component("controller", ControllerComponent);
templ.component('repeat', RepeatComponent)
cupjs.container.registerSingleton("templateResolver",TemplateResolver,DINamespace)
