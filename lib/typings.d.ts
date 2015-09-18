import { Module } from './module';
import { Controller } from './controller';
import { DIContainer } from 'di';
import { View } from 'templ';
export interface ModuleOptions {
    el?: HTMLElement;
    name?: string;
}
export interface ModuleConstructor {
    new (container: DIContainer, options: ModuleOptions): Module;
}
export interface ControllerOptions {
    template?: View;
}
export interface ControllerConstructor {
    new (options: ControllerOptions): Controller;
}
export declare enum Metakey {
    ClassType = 0,
}
