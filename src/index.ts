

import {Application} from './application'

import * as templ from 'templ'
import {ControllerComponent, RepeatComponent} from './template/index'
import {ClickAttribute} from './attributes/index'
import {Module} from './module'

import {TemplateResolver, HttpService} from './services/index'
import {DINamespace} from './internal'

import {bootstrap} from './bootstrap'

export * from './module'

const instance = new Application();

export const moby = instance

templ.component("controller", ControllerComponent);
templ.component('repeat', RepeatComponent)

templ.attribute("click", ClickAttribute)

instance.container.registerSingleton("templateResolver",TemplateResolver,DINamespace)
moby.service('http', HttpService)

bootstrap(instance)
