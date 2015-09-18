
import {BaseObject} from './object'
import {ClassType, classtype} from './internal'
import {ControllerOptions} from './typings'
import {View} from 'templ'
import {IProxy} from './proxy/index'
@classtype(ClassType.Controller)
export class Controller extends BaseObject {
  private _template: View
  ctx: IProxy
  set template (template:View) {
    if (this._template) {
      this._template.remove()
      this._template = void 0
    }
    this._template = template
  }
  
  get template (): View {
    return this._template
  }
  
  constructor () {
    super();
  }
  

  initialize () {

  }

}