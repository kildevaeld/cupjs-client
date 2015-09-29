import { ClassType } from './internal';
export interface ItemMap {
    name: string;
    handler: any;
}
export declare module Repository {
    var factories: ItemMap[];
    var services: ItemMap[];
    var modules: ItemMap[];
    function add(type: ClassType, name: string, target: any): void;
    function has(type: ClassType, name: string): boolean;
    function get<T>(type: ClassType, name: string): T;
}
