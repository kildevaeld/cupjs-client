/// <reference path="../../typings" />
import { components, Assignment } from 'templ';
import { extend } from 'utilities';
// TODO: Optimize
export class ClickComponent extends components.BaseComponent {
    update() {
        let rootElm;
        if (this.vnode.childNodes.length === 1) {
            rootElm = this.vnode.childNodes[0];
        }
        let attr = this.attributes, delegator = this.view._getDelegator() || this.view;
        if (rootElm) {
            attr = extend({}, attr, rootElm.attributes);
        }
        if (!attr.action) {
            throw new Error('click.component: no action');
        }
        let action = attr.action;
        if (action instanceof Assignment) {
            action = action.assign;
        }
        let isAssignment = (attr.action instanceof Assignment) &&
            (this._oldAction instanceof Assignment);
        if ((isAssignment && attr.action.path == this._oldAction.path) ||
            action == this._oldAction) {
            return;
        }
        this._oldAction = attr.action;
        if (this.subview) {
            this.subview.remove();
            delete this.subview;
        }
        this._undelegateEvent();
        this.subview = this.childTemplate.view(this.view.context, {
            parent: this.view,
            delegator: delegator,
            container: this.view._container
        });
        let node = this.subview.render();
        let elm;
        if (attr.delegate && !rootElm) {
            elm = document.createElement('div');
            elm.appendChild(node);
            node = elm;
        }
        else {
            elm = node.children[0];
        }
        let fn;
        if (attr.delegate) {
            fn = delegator.addDelegate(elm, attr.delegate, 'click', action);
        }
        else {
            fn = delegator.addListener(elm, 'click', action);
        }
        this._bound = [elm, fn, 'click', attr.delegate];
        this.section.appendChild(node);
    }
    _undelegateEvent() {
        let delegator = this.view._delegator;
        if (this._bound) {
            let [elm, fn, eventName, selector] = this._bound;
            (selector != null) ? delegator.removeDelegate(elm, selector, eventName, fn) :
                delegator.removeListener(elm, eventName, fn);
            delete this._bound;
        }
    }
    destroy() {
        this._undelegateEvent();
        this.subview.remove();
        super.destroy();
    }
}
