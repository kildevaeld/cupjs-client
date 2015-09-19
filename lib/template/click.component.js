import { components, attributes } from 'templ';
import { extend } from 'utilities';
export class ActionAttribute extends attributes.BaseAttribute {
    update() {
        console.log(this);
        //this.ref.setAttribute('test', 'mig')
    }
}
export class ClickComponent extends components.BaseComponent {
    initialize() {
        let len = this.vnode.childNodes.length;
        if (len === 1) {
            this.rootElm = this.vnode.childNodes[0];
        }
        else {
        }
    }
    update() {
        let attr = this.attributes;
        if (this.subview) {
            this.subview.remove();
        }
        if (this.rootElm) {
            attr = extend({}, attr, this.rootElm.attributes);
        }
        if (!attr.action) {
            throw new Error('click.component: no action');
        }
        let delegator = this.view._delegator;
        this.subview = this.childTemplate.view(this.view.context, {
            parent: this.view,
            delegator: delegator,
            container: this.view._container
        });
        let node = this.subview.render();
        let elm;
        if (attr.delegate && !this.rootElm) {
            let root = document.createElement('div');
            root.appendChild(node);
            node = root;
            elm = root;
        }
        else {
            elm = node.children[0];
        }
        if (attr.delegate) {
            delegator.addDelegate(elm, attr.delegate, 'click', attr.action);
        }
        else {
            delegator.addListener(elm, 'click', attr.action);
        }
        this.section.appendChild(node);
    }
    destroy() {
        super.destroy();
        this.subview.remove();
    }
}
