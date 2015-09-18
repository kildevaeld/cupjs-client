import * as templ from 'templ';
import { DIContainer } from 'di';
export declare class TemplateView extends templ.View {
    _context: any;
    _container: DIContainer;
    context: any;
    _onModelChange(): void;
    constructor(section: any, template: any, context: any, options?: any);
    set(key: string | string[], val: any, silent?: boolean): any;
    get(key: string | string[]): any;
}
