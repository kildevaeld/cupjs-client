/// <reference path="../node_modules/di/di" />
/// <reference path="../node_modules/templ/templ" />
/// <reference path="../node_modules/utilities/utils" />
/// <reference path="../node_modules/eventsjs/events" />
/// <reference path="../node_modules/collection/collection" />

import {Module} from './module'
import {Controller} from './controller'
import {DIContainer} from 'di'
export interface ModuleOptions {
  el?: HTMLElement
  name: string
}

export interface ModuleConstructor {
  new (container:DIContainer, options:ModuleOptions): Module
}


export interface ControllerOptions {
  
}

export interface ControllerConstructor {
    new (options: ControllerOptions): Controller
}


export enum Metakey {
  ClassType
}