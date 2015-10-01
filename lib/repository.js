import { DIServiceConfig } from './internal';
import { find } from 'utilities';
import { Metadata } from 'di';
export var Repository;
(function (Repository) {
    const items = [];
    function add(type, name, target) {
        let item;
        if ((item = find(items, (i) => i.name == name))) {
            throw new Error(`${type} named ${name} already imported as ${item.type}`);
        }
        let config = Metadata.get(DIServiceConfig, target);
        items.push({
            name: name,
            handler: target,
            type: type,
            config: config
        });
    }
    Repository.add = add;
    function has(type, name) {
        return !!get(type, name);
    }
    Repository.has = has;
    function get(type, name) {
        return find(items, (i) => i.name == name && i.type == type);
    }
    Repository.get = get;
    function any(name) {
        return find(items, (i) => i.name == name);
    }
    Repository.any = any;
})(Repository || (Repository = {}));
