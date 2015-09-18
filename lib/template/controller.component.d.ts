import { Controller } from '../controller';
import { components, View } from 'templ';
import { DIContainer } from 'di';
export declare class ControllerComponent extends components.BaseComponent {
    container: DIContainer;
    name: string;
    controller: Controller;
    subview: View;
    initialize(): void;
    __initView(controller: any): void;
    update(): void;
    destroy(): void;
}
