import { components, View } from 'templ';
import { DIContainer } from 'di';
export declare class ClickComponent extends components.BaseComponent {
    container: DIContainer;
    subview: View;
    private _bound;
    private _oldAction;
    update(): void;
    _undelegateEvent(): void;
    destroy(): void;
}
