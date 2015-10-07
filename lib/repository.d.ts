import { ClassType } from './internal';
export interface ItemMap {
    name: string;
    handler: any;
    type: ClassType;
    config?: any;
}
export declare module Repository {
    const items: any[];
    function add(type: ClassType, name: string, target: any): void;
    function has(type: ClassType, name: string): boolean;
    function get(type: ClassType, name: string): ItemMap;
    function any(name: string): ItemMap;
}
