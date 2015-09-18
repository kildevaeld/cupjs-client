import { Module } from './module';
import { Controller } from './controller';
import { DIContainer } from 'di';
export interface ModuleOptions {
    el?: HTMLElement;
    name: string;
}
export interface ModuleConstructor {
    new (container: DIContainer, options: ModuleOptions): Module;
}
export interface ControllerOptions {
}
export interface ControllerConstructor {
    new (options: ControllerOptions): Controller;
}
export declare enum Metakey {
    ClassType = 0,
}
