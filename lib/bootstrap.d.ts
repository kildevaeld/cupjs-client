import { IPromise } from 'utilities';
import { Module } from './module';
import { Moby } from './typings';
export declare function bootstrap(app: Moby): IPromise<Module[]>;
