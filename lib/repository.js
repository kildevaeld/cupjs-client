import { ClassType } from './internal';
import { find } from 'utilities';
export var Repository;
(function (Repository) {
    Repository.factories = [];
    Repository.services = [];
    Repository.modules = [];
    function add(type, name, target) {
        let array;
        switch (type) {
            case ClassType.Service:
                array = Repository.services;
                break;
            case ClassType.Factory:
                array = Repository.factories;
                break;
            case ClassType.ModuleFactory:
                array = Repository.modules;
                break;
            default:
                throw new Error('service, factory');
        }
        let found = find(array, (i) => i.name == name);
        if (found) {
            throw new Error(`${type} named ${name} already imported`);
        }
        array.push({
            name: name,
            handler: target
        });
    }
    Repository.add = add;
    function has(type, name) {
        return !!get(type, name);
    }
    Repository.has = has;
    function get(type, name) {
        let array;
        switch (type) {
            case ClassType.Service:
                array = Repository.services;
                break;
            case ClassType.Factory:
                array = Repository.factories;
                break;
            case ClassType.ModuleFactory:
                array = Repository.modules;
                break;
            default:
                throw new Error('service, factory');
        }
        let found = find(array, (i) => i.name == name);
        return found ? found.handler : null;
    }
    Repository.get = get;
})(Repository || (Repository = {}));
