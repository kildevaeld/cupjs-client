/// <reference path="typings" />
import { EventEmitter } from 'eventsjs';
import { inherits } from 'utilities/lib/index';
export class BaseObject extends EventEmitter {
}
BaseObject.extend = function (obj, p) {
    return inherits(this, obj, p);
};
