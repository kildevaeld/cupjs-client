

import {Application} from './application'

import * as templ from 'templ'
import {ControllerComponent, RepeatComponent} from './template/index'
import {ClickAttribute} from './attributes/index'

import {TemplateResolver, HttpService} from './services/index'
import {DINamespace} from './internal'

import {bootstrap} from './bootstrap'

export const moby = new Application();

templ.component("controller", ControllerComponent);
templ.component('repeat', RepeatComponent)

templ.attribute("click", ClickAttribute)

moby.container.registerSingleton("templateResolver",TemplateResolver,DINamespace)
moby.service('http', HttpService)

bootstrap(moby)