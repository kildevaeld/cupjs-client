import { components, View, attributes } from 'templ';
import { DIContainer } from 'di';
export declare class ActionAttribute extends attributes.BaseAttribute {
    update(): void;
}
export declare class ClickComponent extends components.BaseComponent {
    container: DIContainer;
    name: string;
    subview: View;
    rootElm: HTMLElement;
    boundFunction: Function;
    boundElement: HTMLElement;
    initialize(): void;
    update(): void;
    destroy(): void;
}
