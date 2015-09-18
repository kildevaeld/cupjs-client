import { components, compile } from 'templ';
import { isPromise, Promise } from 'utilities/lib/index';
import { TemplateView } from '../template-view';
export class ControllerComponent extends components.BaseComponent {
    initialize() {
        this.container = this.view._container;
        if (this.attributes['name']) {
            this.name = this.attributes['name'];
        }
        let ret = this.container.get(this.name);
        if (isPromise(ret)) {
            ret.then((controller) => {
                this.controller = controller;
                this.__initView.call(this, controller);
            });
        }
        else {
            this.controller = ret;
            this.__initView(ret);
        }
    }
    __initView(controller) {
        this.__resolveTemplate(this.attributes['template'])
            .then(template => {
            if (this.subview) {
                this.subview.remove();
            }
            this.subview = this.childTemplate.view(controller.ctx.model, {
                container: this.container
            });
            let node = this.subview.render();
            this.section.appendChild(node);
        });
    }
    __resolveTemplate(template) {
        if (template != null) {
            let resolver = this.container.get('templateResolver');
            return resolver.resolve(this.attributes["template"])
                .then(template => {
                let templ = compile(template, {
                    viewClass: TemplateView
                });
                if (this.childTemplate) {
                    delete this.childTemplate;
                }
                this.childTemplate = templ;
                return templ;
            });
        }
        else {
            return Promise.resolve(this.childTemplate);
        }
    }
    update() {
        //console.log('update', arguments)
    }
    destroy() {
        super.destroy();
        this.controller.destroy();
    }
}
