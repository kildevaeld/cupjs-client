import { Controller } from '../controller';
import { components, View, vnode } from 'templ';
import { DIContainer } from 'di';
import { IPromise } from 'utilities/lib/index';
export declare class ControllerComponent extends components.BaseComponent {
    container: DIContainer;
    as: string;
    name: string;
    controller: Controller;
    subview: View;
    initialize(): void;
    __initController(name: string): void;
    __initView(controller: any): void;
    __resolveTemplate(template?: string): IPromise<vnode.Template>;
    destroy(): void;
}
