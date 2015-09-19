

import {Application} from './application'
import * as u from 'utilities'
import * as templ from 'templ'
import {ControllerComponent, RepeatComponent, ViewComponent, ClickComponent} from './template/index'
import {ClickAttribute} from './attributes/index'
import {Module} from './module'

import {TemplateResolver, HttpService} from './services/index'
import {DINamespace} from './internal'

import {bootstrap} from './bootstrap'

export * from './module'

const instance = new Application();

export const moby = instance

templ.component("controller", ControllerComponent);
templ.component('view', ViewComponent);
templ.component('repeat', RepeatComponent);
templ.component('click', ClickComponent);
templ.attribute("click", ClickAttribute);
//templ.attribute('model', ModelAttribute);

instance.container.registerSingleton("templateResolver",TemplateResolver,DINamespace)
moby.service('http', HttpService)

bootstrap(instance)
