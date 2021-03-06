/// <reference path="../../typings" />
import { components, compile } from 'templ';
import { Promise } from 'utilities/lib/index';
import { TemplateView } from '../template-view';
export class ViewComponent extends components.BaseComponent {
    initialize() {
        this.container = this.view._container;
        if (this.attributes['name']) {
            this.name = this.attributes['name'];
        }
        this.__initView();
    }
    __initView() {
        this.__resolveTemplate(this.attributes['template'])
            .then(template => {
            if (this.subview) {
                this.subview.remove();
            }
            this.subview = this.childTemplate.view(this.view.context, {
                container: this.container,
                parent: this.view,
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
        if (this.subview) {
            this.subview.update();
        }
    }
    destroy() {
        super.destroy();
        this.subview.remove();
    }
}
