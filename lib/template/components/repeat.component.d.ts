import { components, View } from 'templ';
import { Collection, IModel } from 'collection';
export declare class RepeatComponent extends components.BaseComponent {
    _children: View[];
    _collection: Collection<IModel>;
    update(): void;
    _update(): void;
    __addEventListeners<T extends IModel>(collection: Collection<T>): void;
    __removeEventListeners<T extends IModel>(collection: Collection<T>): void;
    setAttribute(key: string, value: any): void;
    setProperty(): void;
    destroy(): void;
}
