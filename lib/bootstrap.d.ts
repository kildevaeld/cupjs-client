import { IPromise } from 'utilities/lib/index';
import { Application } from './application';
import { Module } from './module';
export declare function bootstrap(app: Application): IPromise<Module[]>;
