import { EventEmitter } from 'eventsjs';
export declare class BaseObject extends EventEmitter {
    static extend: <T>(obj: any, p?: any) => T;
}
