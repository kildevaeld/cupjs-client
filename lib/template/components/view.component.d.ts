import { components, View, vnode } from 'templ';
import { DIContainer } from 'di';
import { IPromise } from 'utilities/lib/index';
export declare class ViewComponent extends components.BaseComponent {
    container: DIContainer;
    name: string;
    subview: View;
    initialize(): void;
    __initView(): void;
    __resolveTemplate(template?: string): IPromise<vnode.Template>;
    update(): void;
    destroy(): void;
}
