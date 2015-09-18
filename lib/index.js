import { Application } from './application';
import * as templ from 'templ';
import { ControllerComponent } from './template/controller.component';
templ.component("controller", ControllerComponent);
export const cupsjs = new Application();
