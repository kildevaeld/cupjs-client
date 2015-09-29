import { ClassType } from './internal';
export interface ItemMap {
    name: string;
    handler: any;
    type: ClassType;
}
export declare module Repository {
    function add(type: ClassType, name: string, target: any): void;
    function has(type: ClassType, name: string): boolean;
    function get(type: ClassType, name: string): ItemMap;
    function any(name: string): ItemMap;
}
