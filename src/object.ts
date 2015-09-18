/// <reference path="typings" />

import {EventEmitter} from 'eventsjs'
import {inherits} from 'utilities/lib/index'

export class BaseObject extends EventEmitter {
  static extend = function <T>(obj,p?): T {
    return inherits(this, obj, p)
  }
}