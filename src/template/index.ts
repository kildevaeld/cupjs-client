/// <reference path="../typings" />

import {component, attribute, modifier} from 'templ';

import * as cmps from './components/index';
import * as attrs from './attributes/index';

component("controller", cmps.ControllerComponent);
component('view', cmps.ViewComponent);
component('repeat', cmps.RepeatComponent);
component('click', cmps.ClickComponent);
attribute("click", attrs.ClickAttribute);

export * from './template-view'