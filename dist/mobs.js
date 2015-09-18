(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _application = __webpack_require__(1);

	var _templ = __webpack_require__(36);

	var templ = _interopRequireWildcard(_templ);

	var _templateIndex = __webpack_require__(43);

	var _servicesTemplateResolver = __webpack_require__(46);

	var _internal = __webpack_require__(9);

	var cupjs = new _application.Application();
	exports.cupjs = cupjs;
	templ.component("controller", _templateIndex.ControllerComponent);
	templ.component('repeat', _templateIndex.RepeatComponent);
	cupjs.container.registerSingleton("templateResolver", _servicesTemplateResolver.TemplateResolver, _internal.DINamespace);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _module2 = __webpack_require__(2);

	var _controller = __webpack_require__(38);

	var _moduleFactory = __webpack_require__(39);

	var _object = __webpack_require__(3);

	var _utilitiesLibIndex = __webpack_require__(33);

	var utils = _interopRequireWildcard(_utilitiesLibIndex);

	var _internal = __webpack_require__(9);

	var _di = __webpack_require__(11);

	var _serviceActivator = __webpack_require__(42);

	var _templ = __webpack_require__(36);

	var templ = _interopRequireWildcard(_templ);

	var _utilitiesLibObjects = __webpack_require__(40);

	var Application = (function (_BaseObject) {
	    _inherits(Application, _BaseObject);

	    function Application() {
	        _classCallCheck(this, Application);

	        _get(Object.getPrototypeOf(Application.prototype), 'constructor', this).call(this);
	        this._container = new _di.DIContainer();
	        this._activator = new _serviceActivator.ServiceActivator(this._container);
	    }

	    _createClass(Application, [{
	        key: 'module',
	        value: function module(name, definition, config) {
	            if (definition == null) {
	                if (!this._container.hasHandler(name)) {
	                    throw new Error("module does not exits");
	                }
	                return this._container.get(name);
	            }
	            var mod = undefined;
	            if (typeof definition === 'function' && (0, _internal.isClassType)(definition, _internal.ClassType.Module)) {
	                mod = definition;
	            } else if ((0, _utilitiesLibObjects.isObject)(definition)) {
	                mod = _module2.Module.extend(definition);
	            } else {
	                throw new Error('wrong module type');
	            }
	            var factory = new _moduleFactory.ModuleFactory(this, name, mod, config);
	            this._container.registerInstance(name, factory);
	            return factory;
	        }
	    }, {
	        key: 'service',
	        value: function service(name, definition, config) {
	            if (typeof definition === 'function') {
	                (0, _internal.setActivator)(definition, this._activator);
	                (0, _internal.setDependencyResolver)(definition, this._activator);
	                (0, _internal.classtype)(_internal.ClassType.Service)(definition);
	                if (config != null) {
	                    if (typeof config === 'function') {
	                        this._container.registerSingleton(definition, config);
	                    } else {
	                        this._container.registerInstance(definition, config);
	                    }
	                }
	                this._container.registerSingleton(name, definition);
	            } else {
	                this._container.registerInstance(name, definition);
	            }
	            return this;
	        }
	    }, {
	        key: 'createContainer',
	        value: function createContainer() {
	            return this._container.createChild();
	        }
	    }, {
	        key: 'component',
	        value: function component(name) {
	            templ.component(name, null);
	        }
	    }, {
	        key: 'container',
	        get: function get() {
	            return this._container;
	        }
	    }]);

	    return Application;
	})(_object.BaseObject);

	exports.Application = Application;

	Application.Module = _module2.Module;
	Application.Controller = _controller.Controller;
	Application.utils = utils;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _object = __webpack_require__(3);

	var _internal = __webpack_require__(9);

	var _di = __webpack_require__(11);

	var _proxyIndex = __webpack_require__(21);

	var _collection = __webpack_require__(23);

	var _templ = __webpack_require__(36);

	var templ = _interopRequireWildcard(_templ);

	var _templateView = __webpack_require__(37);

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2:
	            return decorators.reduceRight(function (o, d) {
	                return d && d(o) || o;
	            }, target);
	        case 3:
	            return decorators.reduceRight(function (o, d) {
	                return (d && d(target, key), void 0);
	            }, void 0);
	        case 4:
	            return decorators.reduceRight(function (o, d) {
	                return d && d(target, key, o) || o;
	            }, desc);
	    }
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var Module = (function (_BaseObject) {
	    _inherits(Module, _BaseObject);

	    function Module(container, options) {
	        _classCallCheck(this, Module);

	        _get(Object.getPrototypeOf(Module.prototype), "constructor", this).call(this);
	        this._name = options.name;
	        this._el = options.el;
	        this._container = container;
	        this._ctx = (0, _proxyIndex.createProxy)(new _collection.NestedModel());
	        this._container.registerInstance('context', this._ctx);
	        if (this.el) {
	            var template = templ.compile(this.el.outerHTML, {
	                viewClass: _templateView.TemplateView
	            });
	            this._templ = template.view(this._ctx.model, {
	                container: this._container
	            });
	            var el = this._templ.render();
	            this.el.parentNode.replaceChild(el, this.el);
	        }
	    }

	    _createClass(Module, [{
	        key: "module",
	        value: function module(name) {
	            //console.log('finding', name)
	            if (!this._container.hasHandler(name, true)) {
	                return null;
	            }
	            return this._container.get(name);
	        }
	    }, {
	        key: "initialize",
	        value: function initialize() {}
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this._container.unregister('context');
	            this._ctx.destroy();
	            _get(Object.getPrototypeOf(Module.prototype), "destroy", this).call(this);
	        }
	    }, {
	        key: "name",
	        get: function get() {
	            return this._name;
	        }
	    }, {
	        key: "el",
	        get: function get() {
	            return this._el;
	        }
	    }, {
	        key: "ctx",
	        get: function get() {
	            return this._ctx;
	        }
	    }]);

	    return Module;
	})(_object.BaseObject);
	exports.Module = Module;
	exports.Module = Module = __decorate([(0, _internal.classtype)(_internal.ClassType.Module), __metadata('design:paramtypes', [_di.DIContainer, Object])], Module);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="typings" />
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _eventsjs = __webpack_require__(4);

	var _utilitiesLibUtils = __webpack_require__(5);

	var BaseObject = (function (_EventEmitter) {
	    _inherits(BaseObject, _EventEmitter);

	    function BaseObject() {
	        _classCallCheck(this, BaseObject);

	        _get(Object.getPrototypeOf(BaseObject.prototype), 'constructor', this).apply(this, arguments);
	    }

	    return BaseObject;
	})(_eventsjs.EventEmitter);

	exports.BaseObject = BaseObject;

	BaseObject.extend = function (obj, p) {
	    return (0, _utilitiesLibUtils.inherits)(this, obj, p);
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var idCounter = 0;
	function getID() {
	    return "" + ++idCounter;
	}
	function callFunc(fn, ctx, args) {
	    if (args === void 0) {
	        args = [];
	    }
	    var l = fn.length,
	        i = -1,
	        a1 = args[0],
	        a2 = args[1],
	        a3 = args[2],
	        a4 = args[3];
	    switch (args.length) {
	        case 0:
	            while (++i < l) fn[i].call(ctx);
	            return;
	        case 1:
	            while (++i < l) fn[i].call(ctx, a1);
	            return;
	        case 2:
	            while (++i < l) fn[i].call(ctx, a1, a2);
	            return;
	        case 3:
	            while (++i < l) fn[i].call(ctx, a1, a2, a3);
	            return;
	        case 4:
	            while (++i < l) fn[i].call(ctx, a1, a2, a3, a4);
	            return;
	        default:
	            while (++i < l) fn[i].apply(ctx, args);
	            return;
	    }
	}
	exports.callFunc = callFunc;
	var EventEmitter = (function () {
	    function EventEmitter() {}
	    Object.defineProperty(EventEmitter.prototype, "listeners", {
	        get: function get() {
	            return this._listeners;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    EventEmitter.prototype.on = function (event, fn, ctx, once) {
	        if (once === void 0) {
	            once = false;
	        }
	        var events = (this._listeners || (this._listeners = {}))[event] || (this._listeners[event] = []);
	        events.push({
	            name: event,
	            once: once,
	            handler: fn.bind(ctx || this) /*,
	                                          ctx: ctx||this*/
	        });
	        return this;
	    };
	    EventEmitter.prototype.once = function (event, fn, ctx) {
	        return this.on(event, fn, ctx, true);
	    };
	    EventEmitter.prototype.off = function (eventName, fn) {
	        if (eventName == null) {
	            this._listeners = {};
	        } else if (this._listeners[eventName]) {
	            var events = this._listeners[eventName];
	            if (fn == null) {
	                this._listeners[eventName] = [];
	            } else {
	                for (var i = 0; i < events.length; i++) {
	                    var event_1 = events[i];
	                    if (events[i].handler == fn) {
	                        this._listeners[eventName].splice(i, 1);
	                    }
	                }
	            }
	        }
	    };
	    EventEmitter.prototype.trigger = function (eventName) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        var events = (this._listeners || (this._listeners = {}))[eventName] || (this._listeners[eventName] = []).concat(this._listeners['all'] || []);
	        if (EventEmitter.debugCallback) EventEmitter.debugCallback(this.constructor.name, this.name, eventName, args);
	        var event,
	            a,
	            len = events.length,
	            index,
	            i;
	        var calls = [];
	        for (i = 0; i < events.length; i++) {
	            event = events[i];
	            a = args;
	            if (event.name == 'all') {
	                a = [eventName].concat(args);
	                callFunc([event.handler], event.ctx, a);
	            }
	            calls.push(event.handler);
	            if (event.once === true) {
	                index = this._listeners[event.name].indexOf(event);
	                this._listeners[event.name].splice(index, 1);
	            }
	        }
	        callFunc(calls, undefined, args);
	        return this;
	    };
	    EventEmitter.prototype.listenTo = function (obj, event, fn, ctx, once) {
	        if (once === void 0) {
	            once = false;
	        }
	        var listeningTo, id, meth;
	        listeningTo = this._listeningTo || (this._listeningTo = {});
	        id = obj.listenId || (obj.listenId = getID());
	        listeningTo[id] = obj;
	        meth = once ? 'once' : 'on';
	        obj[meth](event, fn, this);
	        return this;
	    };
	    EventEmitter.prototype.listenToOnce = function (obj, event, fn, ctx) {
	        return this.listenTo(obj, event, fn, ctx, true);
	    };
	    EventEmitter.prototype.stopListening = function (obj, event, callback) {
	        var listeningTo = this._listeningTo || {};
	        var remove = !event && !callback;
	        if (obj) listeningTo[obj.listenId] = obj;
	        for (var id in listeningTo) {
	            obj = listeningTo[id];
	            obj.off(event, callback, this);
	            if (remove || !Object.keys(obj.listeners).length) delete this._listeningTo[id];
	        }
	        return this;
	    };
	    EventEmitter.prototype.destroy = function () {
	        this.stopListening();
	        this.off();
	    };
	    return EventEmitter;
	})();
	exports.EventEmitter = EventEmitter;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var objects_1 = __webpack_require__(6);
	var arrays_1 = __webpack_require__(8);
	var idCounter = 0;
	var nativeBind = Function.prototype.bind;
	function camelcase(input) {
	    return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
	        return group1.toUpperCase();
	    });
	}
	exports.camelcase = camelcase;
	;
	function uniqueId(prefix) {
	    if (prefix === void 0) {
	        prefix = '';
	    }
	    return prefix + ++idCounter;
	}
	exports.uniqueId = uniqueId;
	function proxy(from, to, fns) {
	    if (!Array.isArray(fns)) fns = [fns];
	    fns.forEach(function (fn) {
	        if (typeof to[fn] === 'function') {
	            from[fn] = bind(to[fn], to);
	        }
	    });
	}
	exports.proxy = proxy;
	function bind(method, context) {
	    var args = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        args[_i - 2] = arguments[_i];
	    }
	    if (typeof method !== 'function') throw new Error('method not at function');
	    if (nativeBind != null) return nativeBind.call.apply(nativeBind, [method, context].concat(args));
	    args = args || [];
	    var fnoop = function fnoop() {};
	    var fBound = function fBound() {
	        var ctx = this instanceof fnoop ? this : context;
	        return callFunc(method, ctx, args.concat(arrays_1.slice(arguments)));
	    };
	    fnoop.prototype = this.prototype;
	    fBound.prototype = new fnoop();
	    return fBound;
	}
	exports.bind = bind;
	function callFunc(fn, ctx, args) {
	    if (args === void 0) {
	        args = [];
	    }
	    switch (args.length) {
	        case 0:
	            return fn.call(ctx);
	        case 1:
	            return fn.call(ctx, args[0]);
	        case 2:
	            return fn.call(ctx, args[0], args[1]);
	        case 3:
	            return fn.call(ctx, args[0], args[1], args[2]);
	        case 4:
	            return fn.call(ctx, args[0], args[1], args[2], args[3]);
	        case 5:
	            return fn.call(ctx, args[0], args[1], args[2], args[3], args[4]);
	        default:
	            return fn.apply(ctx, args);
	    }
	}
	exports.callFunc = callFunc;
	function equal(a, b) {
	    return eq(a, b, [], []);
	}
	exports.equal = equal;
	function triggerMethodOn(obj, eventName, args) {
	    var ev = camelcase("on-" + eventName.replace(':', '-'));
	    if (obj[ev] && typeof obj[ev] === 'function') {
	        callFunc(obj[ev], obj, args);
	    }
	    if (typeof obj.trigger === 'function') {
	        args = [eventName].concat(args);
	        callFunc(obj.trigger, obj, args);
	    }
	}
	exports.triggerMethodOn = triggerMethodOn;
	function getOption(option, objs) {
	    for (var _i = 0; _i < objs.length; _i++) {
	        var o = objs[_i];
	        if (objects_1.isObject(o) && o[option]) return o[option];
	    }
	    return null;
	}
	exports.getOption = getOption;
	function inherits(parent, protoProps, staticProps) {
	    var child;
	    if (protoProps && objects_1.has(protoProps, 'constructor')) {
	        child = protoProps.constructor;
	    } else {
	        child = function () {
	            return parent.apply(this, arguments);
	        };
	    }
	    objects_1.extend(child, parent, staticProps);
	    var Surrogate = function Surrogate() {
	        this.constructor = child;
	    };
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate();
	    if (protoProps) objects_1.extend(child.prototype, protoProps);
	    child.__super__ = parent.prototype;
	    return child;
	}
	exports.inherits = inherits;
	exports.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
	    var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;
	    if (canSetImmediate) {
	        return function (f) {
	            return window.setImmediate(f);
	        };
	    }
	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);
	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }
	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();
	function eq(a, b, aStack, bStack) {
	    if (a === b) return a !== 0 || 1 / a == 1 / b;
	    if (a == null || b == null) return a === b;
	    var className = toString.call(a);
	    if (className != toString.call(b)) return false;
	    switch (className) {
	        case '[object String]':
	            return a == String(b);
	        case '[object Number]':
	            return a !== +a ? b !== +b : a === 0 ? 1 / a === 1 / b : a === +b;
	        case '[object Date]':
	        case '[object Boolean]':
	            return +a == +b;
	        case '[object RegExp]':
	            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
	    }
	    if (typeof a != 'object' || typeof b != 'object') return false;
	    var length = aStack.length;
	    while (length--) {
	        if (aStack[length] == a) return bStack[length] == b;
	    }
	    var aCtor = a.constructor,
	        bCtor = b.constructor;
	    if (aCtor !== bCtor && !(typeof aCtor === 'function' && aCtor instanceof aCtor && typeof bCtor === 'function' && bCtor instanceof bCtor)) {
	        return false;
	    }
	    aStack.push(a);
	    bStack.push(b);
	    var size = 0,
	        result = true;
	    if (className === '[object Array]') {
	        size = a.length;
	        result = size === b.length;
	        if (result) {
	            while (size--) {
	                if (!(result = eq(a[size], b[size], aStack, bStack))) break;
	            }
	        }
	    } else {
	        for (var key in a) {
	            if (objects_1.has(a, key)) {
	                size++;
	                if (!(result = objects_1.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
	            }
	        }
	        if (result) {
	            for (key in b) {
	                if (objects_1.has(b, key) && ! size--) break;
	            }
	            result = !size;
	        }
	    }
	    aStack.pop();
	    bStack.pop();
	    return result;
	}
	;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils_1 = __webpack_require__(7);
	var arrays_1 = __webpack_require__(8);
	function isObject(obj) {
	    return obj === Object(obj);
	}
	exports.isObject = isObject;
	function isEmpty(obj) {
	    return Object.keys(obj).length === 0;
	}
	exports.isEmpty = isEmpty;
	function extend(obj) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    if (!isObject(obj)) return obj;
	    var o, k;
	    for (var _a = 0; _a < args.length; _a++) {
	        o = args[_a];
	        if (!isObject(o)) continue;
	        for (k in o) {
	            if (has(o, k)) obj[k] = o[k];
	        }
	    }
	    return obj;
	}
	exports.extend = extend;
	function assign(target) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert first argument to object');
	    }
	    var to = Object(target);
	    for (var i = 0, ii = args.length; i < ii; i++) {
	        var nextSource = args[i];
	        if (nextSource === undefined || nextSource === null) {
	            continue;
	        }
	        nextSource = Object(nextSource);
	        var keysArray = Object.keys(Object(nextSource));
	        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	            var nextKey = keysArray[nextIndex];
	            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	            if (desc !== undefined && desc.enumerable) {
	                to[nextKey] = nextSource[nextKey];
	            }
	        }
	    }
	    return to;
	}
	exports.assign = assign;
	function has(obj, prop) {
	    return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	exports.has = has;
	function pick(obj, props) {
	    var out = {},
	        prop;
	    for (var _i = 0; _i < props.length; _i++) {
	        prop = props[_i];
	        if (has(obj, prop)) out[prop] = obj[prop];
	    }
	    return out;
	}
	exports.pick = pick;
	function result(obj, prop, ctx, args) {
	    var ret = obj[prop];
	    return typeof ret === 'function' ? utils_1.callFunc(ret, ctx, args || []) : ret;
	}
	exports.result = result;
	function values(obj) {
	    var output = [];
	    for (var k in obj) if (has(obj, k)) {
	        output.push(obj[k]);
	    }
	    return output;
	}
	exports.values = values;
	function intersectionObjects(a, b, predicate) {
	    var results = [],
	        aElement,
	        existsInB;
	    for (var i = 0, ii = a.length; i < ii; i++) {
	        aElement = a[i];
	        existsInB = arrays_1.any(b, function (bElement) {
	            return predicate(bElement, aElement);
	        });
	        if (existsInB) {
	            results.push(aElement);
	        }
	    }
	    return results;
	}
	function intersection(results) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    var lastArgument = args[args.length - 1];
	    var arrayCount = args.length;
	    var areEqualFunction = utils_1.equal;
	    if (typeof lastArgument === "function") {
	        areEqualFunction = lastArgument;
	        arrayCount--;
	    }
	    for (var i = 0; i < arrayCount; i++) {
	        var array = args[i];
	        results = intersectionObjects(results, array, areEqualFunction);
	        if (results.length === 0) break;
	    }
	    return results;
	}
	exports.intersection = intersection;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var objects_1 = __webpack_require__(6);
	var arrays_1 = __webpack_require__(8);
	var idCounter = 0;
	var nativeBind = Function.prototype.bind;
	function camelcase(input) {
	    return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
	        return group1.toUpperCase();
	    });
	}
	exports.camelcase = camelcase;
	;
	function uniqueId(prefix) {
	    if (prefix === void 0) {
	        prefix = '';
	    }
	    return prefix + ++idCounter;
	}
	exports.uniqueId = uniqueId;
	function proxy(from, to, fns) {
	    if (!Array.isArray(fns)) fns = [fns];
	    fns.forEach(function (fn) {
	        if (typeof to[fn] === 'function') {
	            from[fn] = bind(to[fn], to);
	        }
	    });
	}
	exports.proxy = proxy;
	function bind(method, context) {
	    var args = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        args[_i - 2] = arguments[_i];
	    }
	    if (typeof method !== 'function') throw new Error('method not at function');
	    if (nativeBind != null) return nativeBind.call.apply(nativeBind, [method, context].concat(args));
	    args = args || [];
	    var fnoop = function fnoop() {};
	    var fBound = function fBound() {
	        var ctx = this instanceof fnoop ? this : context;
	        return callFunc(method, ctx, args.concat(arrays_1.slice(arguments)));
	    };
	    fnoop.prototype = this.prototype;
	    fBound.prototype = new fnoop();
	    return fBound;
	}
	exports.bind = bind;
	function callFunc(fn, ctx, args) {
	    if (args === void 0) {
	        args = [];
	    }
	    switch (args.length) {
	        case 0:
	            return fn.call(ctx);
	        case 1:
	            return fn.call(ctx, args[0]);
	        case 2:
	            return fn.call(ctx, args[0], args[1]);
	        case 3:
	            return fn.call(ctx, args[0], args[1], args[2]);
	        case 4:
	            return fn.call(ctx, args[0], args[1], args[2], args[3]);
	        case 5:
	            return fn.call(ctx, args[0], args[1], args[2], args[3], args[4]);
	        default:
	            return fn.apply(ctx, args);
	    }
	}
	exports.callFunc = callFunc;
	function equal(a, b) {
	    return eq(a, b, [], []);
	}
	exports.equal = equal;
	function triggerMethodOn(obj, eventName, args) {
	    var ev = camelcase("on-" + eventName.replace(':', '-'));
	    if (obj[ev] && typeof obj[ev] === 'function') {
	        callFunc(obj[ev], obj, args);
	    }
	    if (typeof obj.trigger === 'function') {
	        args = [eventName].concat(args);
	        callFunc(obj.trigger, obj, args);
	    }
	}
	exports.triggerMethodOn = triggerMethodOn;
	function getOption(option, objs) {
	    for (var _i = 0; _i < objs.length; _i++) {
	        var o = objs[_i];
	        if (objects_1.isObject(o) && o[option]) return o[option];
	    }
	    return null;
	}
	exports.getOption = getOption;
	function inherits(parent, protoProps, staticProps) {
	    var child;
	    if (protoProps && objects_1.has(protoProps, 'constructor')) {
	        child = protoProps.constructor;
	    } else {
	        child = function () {
	            return parent.apply(this, arguments);
	        };
	    }
	    objects_1.extend(child, parent, staticProps);
	    var Surrogate = function Surrogate() {
	        this.constructor = child;
	    };
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate();
	    if (protoProps) objects_1.extend(child.prototype, protoProps);
	    child.__super__ = parent.prototype;
	    return child;
	}
	exports.inherits = inherits;
	exports.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
	    var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;
	    if (canSetImmediate) {
	        return function (f) {
	            return window.setImmediate(f);
	        };
	    }
	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);
	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }
	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();
	function eq(a, b, aStack, bStack) {
	    if (a === b) return a !== 0 || 1 / a == 1 / b;
	    if (a == null || b == null) return a === b;
	    var className = toString.call(a);
	    if (className != toString.call(b)) return false;
	    switch (className) {
	        case '[object String]':
	            return a == String(b);
	        case '[object Number]':
	            return a !== +a ? b !== +b : a === 0 ? 1 / a === 1 / b : a === +b;
	        case '[object Date]':
	        case '[object Boolean]':
	            return +a == +b;
	        case '[object RegExp]':
	            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
	    }
	    if (typeof a != 'object' || typeof b != 'object') return false;
	    var length = aStack.length;
	    while (length--) {
	        if (aStack[length] == a) return bStack[length] == b;
	    }
	    var aCtor = a.constructor,
	        bCtor = b.constructor;
	    if (aCtor !== bCtor && !(typeof aCtor === 'function' && aCtor instanceof aCtor && typeof bCtor === 'function' && bCtor instanceof bCtor)) {
	        return false;
	    }
	    aStack.push(a);
	    bStack.push(b);
	    var size = 0,
	        result = true;
	    if (className === '[object Array]') {
	        size = a.length;
	        result = size === b.length;
	        if (result) {
	            while (size--) {
	                if (!(result = eq(a[size], b[size], aStack, bStack))) break;
	            }
	        }
	    } else {
	        for (var key in a) {
	            if (objects_1.has(a, key)) {
	                size++;
	                if (!(result = objects_1.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
	            }
	        }
	        if (result) {
	            for (key in b) {
	                if (objects_1.has(b, key) && ! size--) break;
	            }
	            result = !size;
	        }
	    }
	    aStack.pop();
	    bStack.pop();
	    return result;
	}
	;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils_1 = __webpack_require__(7);
	function unique(array) {
	    return array.filter(function (e, i) {
	        for (i += 1; i < array.length; i += 1) {
	            if (utils_1.equal(e, array[i])) {
	                return false;
	            }
	        }
	        return true;
	    });
	}
	exports.unique = unique;
	function any(array, predicate) {
	    for (var i = 0, ii = array.length; i < ii; i++) {
	        if (predicate(array[i])) return true;
	    }
	    return false;
	}
	exports.any = any;
	function indexOf(array, item) {
	    for (var i = 0, len = array.length; i < len; i++) if (array[i] === item) return i;
	    return -1;
	}
	exports.indexOf = indexOf;
	function find(array, callback, ctx) {
	    var i, v;
	    for (i = 0; i < array.length; i++) {
	        v = array[i];
	        if (callback.call(ctx, v)) return v;
	    }
	    return null;
	}
	exports.find = find;
	function slice(array, begin, end) {
	    return Array.prototype.slice.call(array, begin, end);
	}
	exports.slice = slice;
	function flatten(arr) {
	    return arr.reduce(function (flat, toFlatten) {
	        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
	    }, []);
	}
	exports.flatten = flatten;
	function sortBy(obj, value, context) {
	    var iterator = typeof value === 'function' ? value : function (obj) {
	        return obj[value];
	    };
	    return obj.map(function (value, index, list) {
	        return {
	            value: value,
	            index: index,
	            criteria: iterator.call(context, value, index, list)
	        };
	    }).sort(function (left, right) {
	        var a = left.criteria;
	        var b = right.criteria;
	        if (a !== b) {
	            if (a > b || a === void 0) return 1;
	            if (a < b || b === void 0) return -1;
	        }
	        return left.index - right.index;
	    }).map(function (item) {
	        return item.value;
	    });
	}
	exports.sortBy = sortBy;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.classtype = classtype;
	exports.getClassType = getClassType;
	exports.isClassType = isClassType;
	exports.setActivator = setActivator;
	exports.setDependencyResolver = setDependencyResolver;

	var _typings = __webpack_require__(10);

	var _di = __webpack_require__(11);

	var ClassType;
	exports.ClassType = ClassType;
	(function (ClassType) {
	    ClassType[ClassType["Module"] = 0] = "Module";
	    ClassType[ClassType["Controller"] = 1] = "Controller";
	    ClassType[ClassType["Service"] = 2] = "Service";
	    ClassType[ClassType["ModuleFactory"] = 3] = "ModuleFactory";
	})(ClassType || (exports.ClassType = ClassType = {}));
	var DINamespace = "cupsjs";
	exports.DINamespace = DINamespace;

	function classtype(type) {
	    return function (target) {
	        var str = _typings.Metakey[_typings.Metakey.ClassType];
	        _di.Metadata.define(str, type, target, DINamespace);
	    };
	}

	function getClassType(target) {
	    var key = _typings.Metakey[_typings.Metakey.ClassType],
	        type = _di.Metadata.getOwn(key, target, DINamespace);
	    return type;
	}

	function isClassType(target, type) {
	    return getClassType(target) === type;
	}

	function setActivator(target, activator) {
	    var instanceActivatorKey = _di.Metadata.instanceActivator;
	    _di.Metadata.define(instanceActivatorKey, activator, target, undefined);
	}

	function setDependencyResolver(target, activator) {
	    var dependencyResolverKey = _di.Metadata.dependencyResolver;
	    _di.Metadata.define(dependencyResolverKey, activator, target, undefined);
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	/// <reference path="../node_modules/di/di" />
	/// <reference path="../node_modules/templ/templ" />
	/// <reference path="../node_modules/utilities/utils" />
	/// <reference path="../node_modules/eventsjs/events" />
	/// <reference path="../node_modules/collection/collection" />
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Metakey;
	exports.Metakey = Metakey;
	(function (Metakey) {
	    Metakey[Metakey["ClassType"] = 0] = "ClassType";
	})(Metakey || (exports.Metakey = Metakey = {}));

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(12);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopExportWildcard(obj, defaults) {
	    var newObj = defaults({}, obj);delete newObj['default'];return newObj;
	}

	function _defaults(obj, defaults) {
	    var keys = Object.getOwnPropertyNames(defaults);for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];var value = Object.getOwnPropertyDescriptor(defaults, key);if (value && value.configurable && obj[key] === undefined) {
	            Object.defineProperty(obj, key, value);
	        }
	    }return obj;
	}

	function test() {}
	if (!test.name) {
	    Object.defineProperty(Function.prototype, 'name', {
	        get: function get() {
	            var name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
	            // For better performance only parse once, and then cache the
	            // result through a new accessor for repeated access.
	            Object.defineProperty(this, 'name', { value: name });
	            return name;
	        }
	    });
	}
	var Version = '0.0.2';
	exports.Version = Version;

	var _container = __webpack_require__(13);

	_defaults(exports, _interopExportWildcard(_container, _defaults));

	var _metaIndex = __webpack_require__(17);

	_defaults(exports, _interopExportWildcard(_metaIndex, _defaults));

	var _decorators = __webpack_require__(20);

	_defaults(exports, _interopExportWildcard(_decorators, _defaults));

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.getFunctionParameters = getFunctionParameters;

	var _metadata = __webpack_require__(14);

	var _metaMetadata = __webpack_require__(15);

	var _errors = __webpack_require__(16);

	var paramRegEx = /function[^(]*\(([^)]*)\)/i;

	function getFunctionParameters(fn) {
	    var cache = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	    var params = _metaMetadata.Metadata.get(_metaMetadata.Metadata.paramTypes, fn);
	    if (!params) {
	        var match = fn.toString().match(paramRegEx);
	        if (match) {
	            params = match[1].replace(/\W+/, ' ').split(' ').map(function (x) {
	                return x.replace(',', '').trim();
	            }).filter(function (m) {
	                return m !== '';
	            });
	            if (cache) _metaMetadata.Metadata.define(_metaMetadata.Metadata.paramTypes, params, fn, undefined);
	        }
	    }
	    return params || [];
	}

	var DIBadKeyError = (function (_errors$DIError) {
	    _inherits(DIBadKeyError, _errors$DIError);

	    function DIBadKeyError(message) {
	        _classCallCheck(this, DIBadKeyError);

	        _get(Object.getPrototypeOf(DIBadKeyError.prototype), 'constructor', this).call(this, message);
	        this.name = 'BadKeyError';
	        this.message = "key not registered with container";
	    }

	    return DIBadKeyError;
	})(_errors.DIError);

	exports.DIBadKeyError = DIBadKeyError;
	var emptyParameters = Object.freeze([]);
	exports.emptyParameters = emptyParameters;
	var instanceActivatorKey = "moby:instance-activator";
	var registrationKey = "moby:registration";
	var dependencyResolverKey = "moby:dependency-resolver";
	_metaMetadata.Metadata.instanceActivator = instanceActivatorKey;
	_metaMetadata.Metadata.registration = registrationKey;
	_metaMetadata.Metadata.dependencyResolver = dependencyResolverKey;

	var DIContainer = (function () {
	    function DIContainer(info) {
	        _classCallCheck(this, DIContainer);

	        this.entries = new Map();
	        this.constructionInfo = info || new Map();
	    }

	    _createClass(DIContainer, [{
	        key: 'makeGlobal',
	        value: function makeGlobal() {
	            DIContainer.instance = this;
	            return this;
	        }

	        /**
	        * Registers a type (constructor function) by inspecting its registration annotations. If none are found, then the default singleton registration is used.
	        *
	        * @method autoRegister
	        * @param {Function} fn The constructor function to use when the dependency needs to be instantiated.
	        * @param {Object} [key] The key that identifies the dependency at resolution time; usually a constructor function.
	        */
	    }, {
	        key: 'autoRegister',
	        value: function autoRegister(fn, key, targetKey) {
	            var registration;
	            if (fn === null || fn === undefined) {
	                throw new DIBadKeyError();
	            }
	            if (typeof fn === 'function') {
	                registration = _metaMetadata.Metadata.get(registrationKey, fn, targetKey);
	                if (registration !== undefined) {
	                    registration.register(this, key || fn, fn);
	                } else {
	                    this.registerSingleton(key || fn, fn, targetKey);
	                }
	            } else {
	                this.registerInstance(fn, fn);
	            }
	        }

	        /**
	        * Unregisters based on key.
	        *
	        * @method unregister
	        * @param {Object} key The key that identifies the dependency at resolution time; usually a constructor function.
	        */
	    }, {
	        key: 'unregister',
	        value: function unregister(key) {
	            this.entries['delete'](key);
	        }

	        /**
	        * Inspects the container to determine if a particular key has been registred.
	        *
	        * @method hasHandler
	        * @param {Object} key The key that identifies the dependency at resolution time; usually a constructor function.
	        * @param {Boolean} [checkParent=false] Indicates whether or not to check the parent container hierarchy.
	        * @return {Boolean} Returns true if the key has been registred; false otherwise.
	        */
	    }, {
	        key: 'hasHandler',
	        value: function hasHandler(key) {
	            var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	            if (key === null || key === undefined) {
	                throw new DIBadKeyError();
	            }
	            return this.entries.has(key) || checkParent && this.parent && this.parent.hasHandler(key, checkParent);
	        }

	        /**
	        * Resolves a single instance based on the provided key.
	        *
	        * @method get
	        * @param {Object} key The key that identifies the object to resolve.
	        * @return {Object} Returns the resolved instance.
	        */
	    }, {
	        key: 'get',
	        value: function get(key, targetKey) {
	            var entry;
	            if (key === null || key === undefined) {
	                throw new DIBadKeyError();
	            }
	            if (key === DIContainer) {
	                return this;
	            }
	            if (key instanceof _metadata.Resolver) {
	                return key.get(this);
	            }
	            entry = this.entries.get(key);
	            if (entry !== undefined) {
	                return entry[0](this);
	            }
	            if (this.parent && this.parent.hasHandler(key)) {
	                return this.parent.get(key, targetKey);
	            }
	            // No point in registrering a string
	            if (typeof key === 'string') {
	                throw (0, _errors.createError)('DIResolveError', 'no component registered for key: ' + key);
	            }
	            this.autoRegister(key, targetKey);
	            entry = this.entries.get(key);
	            return entry[0](this);
	        }

	        /**
	        * Resolves all instance registered under the provided key.
	        *
	        * @method getAll
	        * @param {Object} key The key that identifies the objects to resolve.
	        * @return {Object[]} Returns an array of the resolved instances.
	        */
	    }, {
	        key: 'getAll',
	        value: function getAll(key) {
	            var _this = this;

	            var entry;
	            if (key === null || key === undefined) {
	                throw new DIBadKeyError();
	            }
	            entry = this.entries.get(key);
	            if (entry !== undefined) {
	                return entry.map(function (x) {
	                    return x(_this);
	                });
	            }
	            if (this.parent) {
	                return this.parent.getAll(key);
	            }
	            return [];
	        }

	        /**
	        * Creates a new dependency injection container whose parent is the current container.
	        *
	        * @method createChild
	        * @return {Container} Returns a new container instance parented to this.
	        */
	    }, {
	        key: 'createChild',
	        value: function createChild() {
	            var childContainer = new DIContainer(this.constructionInfo);
	            childContainer.parent = this;
	            return childContainer;
	        }
	    }, {
	        key: 'resolveDependencies',
	        value: function resolveDependencies(fn, targetKey) {
	            var info = this._getOrCreateConstructionSet(fn, targetKey),
	                keys = info.keys,
	                args = new Array(keys.length);
	            var i, ii;
	            try {
	                for (i = 0, ii = keys.length; i < ii; ++i) {
	                    args[i] = this.get(keys[i]);
	                }
	            } catch (e) {
	                var message = "Error";
	                if (i < ii) {
	                    message += ' The argument at index ' + i + ' (key:' + keys[i] + ') could not be satisfied.';
	                }
	                throw (0, _errors.createError)("DependencyError", message);
	            }
	            return args;
	        }

	        /**
	        * Invokes a function, recursively resolving its dependencies.
	        *
	        * @method invoke
	        * @param {Function} fn The function to invoke with the auto-resolved dependencies.
	        * @param {any[]} [deps] Additional function dependencies to use during invocation.
	        * @return {Object} Returns the instance resulting from calling the function.
	        */
	    }, {
	        key: 'invoke',
	        value: function invoke(fn, deps, targetKey) {
	            var info = this._getOrCreateConstructionSet(fn, targetKey);
	            try {
	                var keys, args;
	                if (info.dependencyResolver) {
	                    args = info.dependencyResolver.resolveDependencies(fn);
	                } else {
	                    args = this.resolveDependencies(fn, targetKey);
	                }
	                if (deps !== undefined && Array.isArray(deps)) {
	                    args = args.concat(deps);
	                }
	                return info.activator.invoke(fn, args, targetKey, keys);
	            } catch (e) {
	                var activatingText = info.activator instanceof _metadata.ClassActivator ? 'instantiating' : 'invoking';
	                var message = 'Error ' + activatingText + ' ' + fn.name + '.';
	                message += ' Check the inner error for details.';
	                throw (0, _errors.createError)("DIInvokeError", message, [e]);
	            }
	        }
	    }, {
	        key: 'registerInstance',
	        value: function registerInstance(key, instance) {
	            this.registerHandler(key, function (x) {
	                return instance;
	            });
	        }
	    }, {
	        key: 'registerTransient',
	        value: function registerTransient(key, fn, targetKey) {
	            this.registerHandler(key, function (x) {
	                return x.invoke(fn, null, targetKey);
	            });
	        }
	    }, {
	        key: 'registerSingleton',
	        value: function registerSingleton(key, fn, targetKey) {
	            var singleton;
	            this.registerHandler(key, function (x) {
	                return singleton || (singleton = x.invoke(fn, null, targetKey));
	            });
	        }
	    }, {
	        key: 'registerHandler',
	        value: function registerHandler(key, handler) {
	            this._getOrCreateEntry(key).push(handler);
	        }
	    }, {
	        key: '_getOrCreateEntry',
	        value: function _getOrCreateEntry(key) {
	            var entry;
	            if (key === null || key === undefined) {
	                throw new _errors.DIError('key cannot be null or undefined.  (Are you trying to inject something that doesn\'t exist with DI?)');
	            }
	            entry = this.entries.get(key);
	            if (entry === undefined) {
	                entry = [];
	                this.entries.set(key, entry);
	            }
	            return entry;
	        }
	    }, {
	        key: '_getOrCreateConstructionSet',
	        value: function _getOrCreateConstructionSet(fn, targetKey) {
	            var info = this.constructionInfo.get(fn);
	            if (info === undefined) {
	                info = this._createConstructionSet(fn, targetKey);
	                this.constructionInfo.set(fn, info);
	            }
	            return info;
	        }
	    }, {
	        key: '_createConstructionSet',
	        value: function _createConstructionSet(fn, targetKey) {
	            var info = {
	                activator: _metaMetadata.Metadata.getOwn(_metaMetadata.Metadata.instanceActivator, fn, targetKey) || _metadata.ClassActivator.instance,
	                dependencyResolver: _metaMetadata.Metadata.getOwn(dependencyResolverKey, fn, targetKey) || this };
	            if (fn.inject !== undefined) {
	                if (typeof fn.inject === 'function') {
	                    info.keys = fn.inject();
	                } else {
	                    info.keys = fn.inject;
	                }
	                return info;
	            }
	            info.keys = _metaMetadata.Metadata.getOwn(_metaMetadata.Metadata.paramTypes, fn, targetKey) || getFunctionParameters(fn) || emptyParameters;
	            return info;
	        }
	    }, {
	        key: 'root',
	        get: function get() {
	            var root = this,
	                tmp = root;
	            while (tmp) {
	                tmp = root.parent;
	                if (tmp) root = tmp;
	            }
	            return root;
	        }
	    }]);

	    return DIContainer;
	})();

	exports.DIContainer = DIContainer;

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	* Used to allow functions/classes to indicate that they should be registered as transients with the container.
	*
	* @class TransientRegistration
	* @constructor
	* @param {Object} [key] The key to register as.
	*/
	'use strict';

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var TransientRegistration = (function () {
	    function TransientRegistration(key) {
	        _classCallCheck(this, TransientRegistration);

	        this.key = key;
	    }

	    /**
	    * Used to allow functions/classes to indicate that they should be registered as singletons with the container.
	    *
	    * @class SingletonRegistration
	    * @constructor
	    * @param {Object} [key] The key to register as.
	    */

	    /**
	    * Called by the container to register the annotated function/class as transient.
	    *
	    * @method register
	    * @param {Container} container The container to register with.
	    * @param {Object} key The key to register as.
	    * @param {Object} fn The function to register (target of the annotation).
	    */

	    _createClass(TransientRegistration, [{
	        key: 'register',
	        value: function register(container, key, fn) {
	            container.registerTransient(this.key || key, fn);
	        }
	    }]);

	    return TransientRegistration;
	})();

	exports.TransientRegistration = TransientRegistration;

	var SingletonRegistration = (function () {
	    function SingletonRegistration(keyOrRegisterInChild) {
	        _classCallCheck(this, SingletonRegistration);

	        var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	        if (typeof keyOrRegisterInChild === 'boolean') {
	            this.registerInChild = keyOrRegisterInChild;
	        } else {
	            this.key = keyOrRegisterInChild;
	            this.registerInChild = registerInChild;
	        }
	    }

	    /**
	    * An abstract resolver used to allow functions/classes to specify custom dependency resolution logic.
	    *
	    * @class Resolver
	    * @constructor
	    */

	    /**
	    * Called by the container to register the annotated function/class as a singleton.
	    *
	    * @method register
	    * @param {Container} container The container to register with.
	    * @param {Object} key The key to register as.
	    * @param {Object} fn The function to register (target of the annotation).
	    */

	    _createClass(SingletonRegistration, [{
	        key: 'register',
	        value: function register(container, key, fn) {
	            var destination = this.registerInChild ? container : container.root;
	            destination.registerSingleton(this.key || key, fn);
	        }
	    }]);

	    return SingletonRegistration;
	})();

	exports.SingletonRegistration = SingletonRegistration;

	var Resolver = (function () {
	    function Resolver() {
	        _classCallCheck(this, Resolver);
	    }

	    /**
	    * Used to allow functions/classes to specify lazy resolution logic.
	    *
	    * @class Lazy
	    * @constructor
	    * @extends Resolver
	    * @param {Object} key The key to lazily resolve.
	    */

	    _createClass(Resolver, [{
	        key: 'get',

	        /**
	        * Called by the container to allow custom resolution of dependencies for a function/class.
	        *
	        * @method get
	        * @param {Container} container The container to resolve from.
	        * @return {Object} Returns the resolved object.
	        */
	        value: function get(container) {
	            throw new Error('A custom Resolver must implement get(container) and return the resolved instance(s).');
	        }
	    }]);

	    return Resolver;
	})();

	exports.Resolver = Resolver;

	var Lazy = (function (_Resolver) {
	    _inherits(Lazy, _Resolver);

	    function Lazy(key) {
	        _classCallCheck(this, Lazy);

	        _get(Object.getPrototypeOf(Lazy.prototype), 'constructor', this).call(this);
	        this.key = key;
	    }

	    /**
	    * Used to allow functions/classes to specify resolution of all matches to a key.
	    *
	    * @class All
	    * @constructor
	    * @extends Resolver
	    * @param {Object} key The key to lazily resolve all matches for.
	    */

	    /**
	    * Called by the container to lazily resolve the dependency into a lazy locator function.
	    *
	    * @method get
	    * @param {Container} container The container to resolve from.
	    * @return {Function} Returns a function which can be invoked at a later time to obtain the actual dependency.
	    */

	    _createClass(Lazy, [{
	        key: 'get',
	        value: function get(container) {
	            var _this = this;

	            return function () {
	                return container.get(_this.key);
	            };
	        }

	        /**
	        * Creates a Lazy Resolver for the supplied key.
	        *
	        * @method of
	        * @static
	        * @param {Object} key The key to lazily resolve.
	        * @return {Lazy} Returns an insance of Lazy for the key.
	        */
	    }], [{
	        key: 'of',
	        value: function of(key) {
	            return new Lazy(key);
	        }
	    }]);

	    return Lazy;
	})(Resolver);

	exports.Lazy = Lazy;

	var All = (function (_Resolver2) {
	    _inherits(All, _Resolver2);

	    function All(key) {
	        _classCallCheck(this, All);

	        _get(Object.getPrototypeOf(All.prototype), 'constructor', this).call(this);
	        this.key = key;
	    }

	    /**
	    * Used to allow functions/classes to specify an optional dependency, which will be resolved only if already registred with the container.
	    *
	    * @class Optional
	    * @constructor
	    * @extends Resolver
	    * @param {Object} key The key to optionally resolve for.
	    * @param {Boolean} [checkParent=false] Indicates whether or not the parent container hierarchy should be checked.
	    */

	    /**
	    * Called by the container to resolve all matching dependencies as an array of instances.
	    *
	    * @method get
	    * @param {Container} container The container to resolve from.
	    * @return {Object[]} Returns an array of all matching instances.
	    */

	    _createClass(All, [{
	        key: 'get',
	        value: function get(container) {
	            return container.getAll(this.key);
	        }

	        /**
	        * Creates an All Resolver for the supplied key.
	        *
	        * @method of
	        * @static
	        * @param {Object} key The key to resolve all instances for.
	        * @return {All} Returns an insance of All for the key.
	        */
	    }], [{
	        key: 'of',
	        value: function of(key) {
	            return new All(key);
	        }
	    }]);

	    return All;
	})(Resolver);

	exports.All = All;

	var Optional = (function (_Resolver3) {
	    _inherits(Optional, _Resolver3);

	    function Optional(key) {
	        _classCallCheck(this, Optional);

	        var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	        _get(Object.getPrototypeOf(Optional.prototype), 'constructor', this).call(this);
	        this.key = key;
	        this.checkParent = checkParent;
	    }

	    /**
	    * Used to inject the dependency from the parent container instead of the current one.
	    *
	    * @class Parent
	    * @constructor
	    * @extends Resolver
	    * @param {Object} key The key to resolve from the parent container.
	    */

	    /**
	    * Called by the container to provide optional resolution of the key.
	    *
	    * @method get
	    * @param {Container} container The container to resolve from.
	    * @return {Object} Returns the instance if found; otherwise null.
	    */

	    _createClass(Optional, [{
	        key: 'get',
	        value: function get(container) {
	            if (container.hasHandler(this.key, this.checkParent)) {
	                return container.get(this.key);
	            }
	            return null;
	        }

	        /**
	        * Creates an Optional Resolver for the supplied key.
	        *
	        * @method of
	        * @static
	        * @param {Object} key The key to optionally resolve for.
	        * @param {Boolean} [checkParent=false] Indicates whether or not the parent container hierarchy should be checked.
	        * @return {Optional} Returns an insance of Optional for the key.
	        */
	    }], [{
	        key: 'of',
	        value: function of(key) {
	            var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	            return new Optional(key, checkParent);
	        }
	    }]);

	    return Optional;
	})(Resolver);

	exports.Optional = Optional;

	var Parent = (function (_Resolver4) {
	    _inherits(Parent, _Resolver4);

	    function Parent(key) {
	        _classCallCheck(this, Parent);

	        _get(Object.getPrototypeOf(Parent.prototype), 'constructor', this).call(this);
	        this.key = key;
	    }

	    /**
	    * Used to instantiate a class.
	    *
	    * @class ClassActivator
	    * @constructor
	    */

	    /**
	    * Called by the container to load the dependency from the parent container
	    *
	    * @method get
	    * @param {Container} container The container to resolve the parent from.
	    * @return {Function} Returns the matching instance from the parent container
	    */

	    _createClass(Parent, [{
	        key: 'get',
	        value: function get(container) {
	            return container.parent ? container.parent.get(this.key) : null;
	        }

	        /**
	        * Creates a Parent Resolver for the supplied key.
	        *
	        * @method of
	        * @static
	        * @param {Object} key The key to resolve.
	        * @return {Parent} Returns an insance of Parent for the key.
	        */
	    }], [{
	        key: 'of',
	        value: function of(key) {
	            return new Parent(key);
	        }
	    }]);

	    return Parent;
	})(Resolver);

	exports.Parent = Parent;

	var ClassActivator = (function () {
	    function ClassActivator() {
	        _classCallCheck(this, ClassActivator);
	    }

	    _createClass(ClassActivator, [{
	        key: 'invoke',
	        value: function invoke(fn, args) {
	            return Reflect.construct(fn, args);
	        }
	    }]);

	    return ClassActivator;
	})();

	exports.ClassActivator = ClassActivator;

	ClassActivator.instance = new ClassActivator();
	/**
	* Used to invoke a factory method.
	*
	* @class FactoryActivator
	* @constructor
	*/

	var FactoryActivator = (function () {
	    function FactoryActivator() {
	        _classCallCheck(this, FactoryActivator);
	    }

	    _createClass(FactoryActivator, [{
	        key: 'invoke',
	        value: function invoke(fn, args) {
	            return fn.apply(undefined, args);
	        }
	    }]);

	    return FactoryActivator;
	})();

	exports.FactoryActivator = FactoryActivator;

	FactoryActivator.instance = new FactoryActivator();

/***/ },
/* 15 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var _bind = Function.prototype.bind;

	function _toConsumableArray(arr) {
	    if (Array.isArray(arr)) {
	        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];return arr2;
	    } else {
	        return Array.from(arr);
	    }
	}

	var theGlobal = (function () {
	    // Workers don’t have `window`, only `self`
	    if (typeof self !== 'undefined') {
	        return self;
	    }
	    if (typeof global !== 'undefined') {
	        return global;
	    }
	    // Not all environments allow eval and Function
	    // Use only as a last resort:
	    return new Function('return this')();
	})();
	var emptyMetadata = Object.freeze({});
	var metadataContainerKey = '__metadata__';
	if (typeof theGlobal.System === 'undefined') {
	    theGlobal.System = { isFake: true };
	}
	if (typeof theGlobal.System.forEachModule === 'undefined') {
	    theGlobal.System.forEachModule = function () {};
	}
	if (typeof theGlobal.Reflect === 'undefined') {
	    theGlobal.Reflect = {};
	}
	if (typeof theGlobal.Reflect.getOwnMetadata === 'undefined') {
	    Reflect.getOwnMetadata = function (metadataKey, target, targetKey) {
	        return ((target[metadataContainerKey] || emptyMetadata)[targetKey] || emptyMetadata)[metadataKey];
	    };
	}
	if (typeof theGlobal.Reflect.defineMetadata === 'undefined') {
	    Reflect.defineMetadata = function (metadataKey, metadataValue, target, targetKey) {
	        var metadataContainer = target.hasOwnProperty(metadataContainerKey) ? target[metadataContainerKey] : target[metadataContainerKey] = {};
	        var targetContainer = metadataContainer[targetKey] || (metadataContainer[targetKey] = {});
	        targetContainer[metadataKey] = metadataValue;
	    };
	}
	if (typeof theGlobal.Reflect.metadata === 'undefined') {
	    Reflect.metadata = function (metadataKey, metadataValue) {
	        return function (target, targetKey) {
	            Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
	        };
	    };
	}
	if (typeof theGlobal.Reflect.construct) {
	    Reflect.construct = function (fn, args) {
	        return new (_bind.apply(fn, [null].concat(_toConsumableArray(args))))();
	    };
	}
	function ensureDecorators(target) {
	    var applicator;
	    if (typeof target.decorators === 'function') {
	        applicator = target.decorators();
	    } else {
	        applicator = target.decorators;
	    }
	    if (typeof applicator._decorate === 'function') {
	        delete target.decorators;
	        applicator._decorate(target);
	    } else {
	        throw new Error('The return value of your decorator\'s method was not valid.');
	    }
	}
	/**
	* Provides helpers for working with metadata.
	*
	* @class Metadata
	* @static
	*/
	var Metadata = {
	    global: theGlobal,
	    noop: function noop() {},
	    resource: 'aurelia:resource',
	    paramTypes: 'design:paramtypes',
	    properties: 'design:properties',
	    get: function get(metadataKey, target, targetKey) {
	        if (!target) {
	            return undefined;
	        }
	        var result = Metadata.getOwn(metadataKey, target, targetKey);
	        return result === undefined ? Metadata.get(metadataKey, Object.getPrototypeOf(target), targetKey) : result;
	    },
	    getOwn: function getOwn(metadataKey, target, targetKey) {
	        if (!target) {
	            return undefined;
	        }
	        if (target.hasOwnProperty('decorators')) {
	            ensureDecorators(target);
	        }
	        return Reflect.getOwnMetadata(metadataKey, target, targetKey);
	    },
	    define: function define(metadataKey, metadataValue, target, targetKey) {
	        Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
	    },
	    getOrCreateOwn: function getOrCreateOwn(metadataKey, Type, target, targetKey) {
	        var result = Metadata.getOwn(metadataKey, target, targetKey);
	        if (result === undefined) {
	            result = new Type();
	            Reflect.defineMetadata(metadataKey, result, target, targetKey);
	        }
	        return result;
	    }
	};
	exports.Metadata = Metadata;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createError = createError;

	var DIError = (function (_Error) {
	    _inherits(DIError, _Error);

	    function DIError(message) {
	        _classCallCheck(this, DIError);

	        _get(Object.getPrototypeOf(DIError.prototype), "constructor", this).call(this, message);
	        this.message = message;
	    }

	    _createClass(DIError, [{
	        key: "toString",
	        value: function toString() {
	            return "[" + this.name + ": " + this.message + "]";
	        }
	    }]);

	    return DIError;
	})(Error);

	exports.DIError = DIError;

	var DIAggregateError = (function (_DIError) {
	    _inherits(DIAggregateError, _DIError);

	    function DIAggregateError(message, errors) {
	        _classCallCheck(this, DIAggregateError);

	        _get(Object.getPrototypeOf(DIAggregateError.prototype), "constructor", this).call(this, message);
	        this.errors = errors;
	    }

	    _createClass(DIAggregateError, [{
	        key: "toString",
	        value: function toString() {
	            return "[" + this.name + ": " + this.message + "], errors:" + this.errors;
	        }
	    }]);

	    return DIAggregateError;
	})(DIError);

	exports.DIAggregateError = DIAggregateError;

	function createError(name, message, errors) {
	    var e = undefined;
	    if (errors) {
	        e = new DIAggregateError(message, errors);
	    } else {
	        e = new DIError(message);
	    }
	    e.name = name;
	    return e;
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopExportWildcard(obj, defaults) {
	  var newObj = defaults({}, obj);delete newObj['default'];return newObj;
	}

	function _defaults(obj, defaults) {
	  var keys = Object.getOwnPropertyNames(defaults);for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];var value = Object.getOwnPropertyDescriptor(defaults, key);if (value && value.configurable && obj[key] === undefined) {
	      Object.defineProperty(obj, key, value);
	    }
	  }return obj;
	}

	var _metadata = __webpack_require__(15);

	_defaults(exports, _interopExportWildcard(_metadata, _defaults));

	var _decorators = __webpack_require__(18);

	_defaults(exports, _interopExportWildcard(_decorators, _defaults));

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _decoratorApplicator = __webpack_require__(19);

	var Decorators = {
	    configure: {
	        parameterizedDecorator: function parameterizedDecorator(name, decorator) {
	            Decorators[name] = function () {
	                var applicator = new _decoratorApplicator.DecoratorApplicator();
	                return applicator[name].apply(applicator, arguments);
	            };
	            _decoratorApplicator.DecoratorApplicator.prototype[name] = function () {
	                var result = decorator.apply(null, arguments);
	                return this.decorator(result);
	            };
	        },
	        simpleDecorator: function simpleDecorator(name, decorator) {
	            Decorators[name] = function () {
	                return new _decoratorApplicator.DecoratorApplicator().decorator(decorator);
	            };
	            _decoratorApplicator.DecoratorApplicator.prototype[name] = function () {
	                return this.decorator(decorator);
	            };
	        }
	    }
	};
	exports.Decorators = Decorators;

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var DecoratorApplicator = (function () {
	    function DecoratorApplicator() {
	        _classCallCheck(this, DecoratorApplicator);

	        this._first = null;
	        this._second = null;
	        this._third = null;
	        this._rest = null;
	    }

	    _createClass(DecoratorApplicator, [{
	        key: "decorator",
	        value: function decorator(_decorator) {
	            if (this._first === null) {
	                this._first = _decorator;
	                return this;
	            }
	            if (this._second === null) {
	                this._second = _decorator;
	                return this;
	            }
	            if (this._third === null) {
	                this._third = _decorator;
	                return this;
	            }
	            if (this._rest === null) {
	                this._rest = [];
	            }
	            this._rest.push(_decorator);
	            return this;
	        }
	    }, {
	        key: "_decorate",
	        value: function _decorate(target) {
	            var i, ii, rest;
	            if (this._first !== null) {
	                this._first(target);
	            }
	            if (this._second !== null) {
	                this._second(target);
	            }
	            if (this._third !== null) {
	                this._third(target);
	            }
	            rest = this._rest;
	            if (rest !== null) {
	                for (i = 0, ii = rest.length; i < ii; ++i) {
	                    rest[i](target);
	                }
	            }
	        }
	    }]);

	    return DecoratorApplicator;
	})();

	exports.DecoratorApplicator = DecoratorApplicator;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.autoinject = autoinject;
	exports.inject = inject;
	exports.registration = registration;
	exports.transient = transient;
	exports.singleton = singleton;
	exports.instanceActivator = instanceActivator;
	exports.factory = factory;

	var _metaIndex = __webpack_require__(17);

	var _metadata = __webpack_require__(14);

	var _container = __webpack_require__(13);

	function autoinject(target) {
	    var deco = function deco(target) {
	        target.inject = _metaIndex.Metadata.getOwn(_metaIndex.Metadata.paramTypes, target) || _container.emptyParameters;
	    };
	    return target ? deco(target) : deco;
	}

	function inject() {
	    for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
	        rest[_key] = arguments[_key];
	    }

	    return function (target) {
	        target.inject = rest;
	    };
	}

	function registration(value, targetKey) {
	    return function (target) {
	        _metaIndex.Metadata.define(_metaIndex.Metadata.registration, value, target, targetKey);
	    };
	}

	function transient(key, targetKey) {
	    return registration(new _metadata.TransientRegistration(key), targetKey);
	}

	function singleton(keyOrRegisterInChild, registerInChild, targetKey) {
	    if (registerInChild === undefined) registerInChild = false;

	    return registration(new _metadata.SingletonRegistration(keyOrRegisterInChild, registerInChild), targetKey);
	}

	function instanceActivator(value, targetKey) {
	    return function (target) {
	        _metaIndex.Metadata.define(_metaIndex.Metadata.instanceActivator, value, target, targetKey);
	    };
	}

	function factory() {
	    return instanceActivator(_metadata.FactoryActivator.instance);
	}

	_metaIndex.Decorators.configure.simpleDecorator('autoinject', autoinject);
	_metaIndex.Decorators.configure.parameterizedDecorator('inject', inject);
	_metaIndex.Decorators.configure.parameterizedDecorator('registration', registration);
	_metaIndex.Decorators.configure.parameterizedDecorator('transient', transient);
	_metaIndex.Decorators.configure.parameterizedDecorator('singleton', singleton);
	_metaIndex.Decorators.configure.parameterizedDecorator('instanceActivator', instanceActivator);
	_metaIndex.Decorators.configure.parameterizedDecorator('factory', factory);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.createProxy = createProxy;

	var _objectObserve = __webpack_require__(22);

	var _dirtyObserve = __webpack_require__(35);

	var _utilitiesLibIndex = __webpack_require__(33);

	function createProxy(model) {
	    if (typeof Object.observe === 'function') {
	        return new _objectObserve.ObjectObserveProxy(model);
	    } /*else if (typeof (global||window).Proxy  === 'function') {
	        
	      }*/
	    else {
	            return new _dirtyObserve.DirtyObjectObserver(model);
	        }
	}

	var get_atributes = function get_atributes(attributes) {
	    var keys = Object.keys(attributes),
	        deferred = {},
	        attr = {};
	    keys.map(function (key) {
	        return { key: key, value: attributes[key] };
	    }).filter(function (pair) {
	        if (!(0, _utilitiesLibIndex.has)(attributes, pair.key)) return false;
	        if (pair.value && (0, _utilitiesLibIndex.isPromise)(pair.value)) {
	            deferred[pair.key] = pair.value;
	            delete attributes[pair.key];
	            return false;
	        }
	        return true;
	    }).forEach(function (a) {
	        attr[a.key] = a.value;
	    });
	    return { attr: attr, deferred: deferred };
	};
	exports.get_atributes = get_atributes;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _collection = __webpack_require__(23);

	var _proxy = __webpack_require__(32);

	var ObjectObserveProxy = (function (_AbstractProxy) {
	    _inherits(ObjectObserveProxy, _AbstractProxy);

	    function ObjectObserveProxy() {
	        _classCallCheck(this, ObjectObserveProxy);

	        _get(Object.getPrototypeOf(ObjectObserveProxy.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(ObjectObserveProxy, [{
	        key: 'observe',
	        value: function observe() {
	            Object.observe(this, this._onchange);
	        }
	    }, {
	        key: 'unobserve',
	        value: function unobserve() {
	            Object.unobserve(this, this._onchange);
	        }
	    }, {
	        key: 'createChild',
	        value: function createChild() {
	            return new ObjectObserveProxy(new _collection.NestedModel(), this);
	        }
	    }]);

	    return ObjectObserveProxy;
	})(_proxy.AbstractProxy);

	exports.ObjectObserveProxy = ObjectObserveProxy;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(24));
	__export(__webpack_require__(26));
	__export(__webpack_require__(30));
	__export(__webpack_require__(31));

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() {
	        this.constructor = d;
	    }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	/// <reference path="interfaces" />
	var eventsjs_1 = __webpack_require__(25);
	var model_1 = __webpack_require__(26);
	var objects_1 = __webpack_require__(28);
	var arrays_1 = __webpack_require__(29);
	var utils_1 = __webpack_require__(27);
	var setOptions = { add: true, remove: true, merge: true };
	var addOptions = { add: true, remove: false };
	var Collection = (function (_super) {
	    __extends(Collection, _super);
	    function Collection(models, options) {
	        if (options === void 0) {
	            options = {};
	        }
	        this.options = options;
	        if (this.options.model) {
	            this.Model = this.options.model;
	        }
	        if (models) {
	            this.add(models);
	        }
	        _super.call(this);
	    }
	    Object.defineProperty(Collection.prototype, "length", {
	        get: function get() {
	            return this.models.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Collection.prototype, "Model", {
	        get: function get() {
	            if (!this._model) {
	                this._model = model_1.Model;
	            }
	            return this._model;
	        },
	        set: function set(con) {
	            this._model = con;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Collection.prototype, "models", {
	        get: function get() {
	            return this._models || (this._models = []);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Collection.prototype.add = function (models, options) {
	        var _this = this;
	        if (options === void 0) {
	            options = {};
	        }
	        if (!Array.isArray(models)) {
	            if (!(models instanceof this.Model)) {
	                models = this.create(models, { add: false });
	            }
	        } else {
	            models = models.map(function (item) {
	                return item instanceof _this.Model ? item : _this.create(item, { add: false });
	            });
	        }
	        this.set(models, objects_1.extend({ merge: false }, options, addOptions));
	    };
	    Collection.prototype.set = function (items, options) {
	        if (options === void 0) {
	            options = {};
	        }
	        options = objects_1.extend({}, setOptions, options);
	        if (options.parse) items = this.parse(items, options);
	        var singular = !Array.isArray(items);
	        var models = singular ? items ? [items] : [] : items.slice();
	        var i, l, id, model, attrs, existing, sort;
	        var at = options.at;
	        var sortable = this.comparator && at == null && options.sort !== false;
	        var sortAttr = typeof this.comparator === 'string' ? this.comparator : null;
	        var toAdd = [],
	            toRemove = [],
	            modelMap = {};
	        var add = options.add,
	            merge = options.merge,
	            remove = options.remove;
	        var order = !sortable && add && remove ? [] : null;
	        for (i = 0, l = models.length; i < l; i++) {
	            model = models[i];
	            id = model.get(model.idAttribute) || model.uid;
	            if (existing = this.get(id)) {
	                if (remove) modelMap[existing.uid] = true;
	                if (merge) {
	                    attrs = model.toJSON();
	                    existing.set(attrs, options);
	                    if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
	                }
	                models[i] = existing;
	            } else if (add) {
	                models[i] = model;
	                if (!model) continue;
	                toAdd.push(model);
	                this._addReference(model, options);
	            }
	            model = existing || model;
	            if (order && !modelMap[model.id]) order.push(model);
	            modelMap[model.uid] = true;
	        }
	        if (remove) {
	            for (i = 0, l = this.length; i < l; ++i) {
	                if (!modelMap[(model = this.models[i]).uid]) toRemove.push(model);
	            }
	            if (toRemove.length) this.remove(toRemove, options);
	        }
	        if (toAdd.length || order && order.length) {
	            if (sortable) sort = true;
	            if (at != null) {
	                for (i = 0, l = toAdd.length; i < l; i++) {
	                    this.models.splice(at + i, 0, toAdd[i]);
	                }
	            } else {
	                if (order) this.models.length = 0;
	                var orderedModels = order || toAdd;
	                for (i = 0, l = orderedModels.length; i < l; i++) {
	                    this.models.push(orderedModels[i]);
	                }
	            }
	        }
	        if (sort) this.sort({ silent: true });
	        if (!options.silent) {
	            for (i = 0, l = toAdd.length; i < l; i++) {
	                (model = toAdd[i]).trigger('add', model, this, options);
	            }
	            if (sort || order && order.length) this.trigger('sort', this, options);
	            if (toAdd.length || toRemove.length) this.trigger('update', this, options);
	        }
	        return singular ? models[0] : models;
	    };
	    Collection.prototype.remove = function (models, options) {
	        if (options === void 0) {
	            options = {};
	        }
	        var singular = !Array.isArray(models);
	        models = singular ? [models] : models.slice();
	        var i, l, index, model;
	        for (i = 0, l = models.length; i < l; i++) {
	            model = models[i] = this.get(models[i]);
	            if (!model) continue;
	            index = this.indexOf(model);
	            this.models.splice(index, 1);
	            if (!options.silent) {
	                options.index = index;
	                model.trigger('remove', model, this, options);
	            }
	            this._removeReference(model, options);
	        }
	        return singular ? models[0] : models;
	    };
	    Collection.prototype.get = function (id) {
	        return this.find(id);
	    };
	    Collection.prototype.at = function (index) {
	        return this.models[index];
	    };
	    Collection.prototype.clone = function (options) {
	        options = options || this.options;
	        return new this.constructor(this.models, options);
	    };
	    Collection.prototype.sort = function (options) {
	        if (options === void 0) {
	            options = {};
	        }
	        if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
	        if (typeof this.comparator === 'string' || this.comparator.length === 1) {
	            this._models = this.sortBy(this.comparator, this);
	        } else {
	            this.models.sort(this.comparator.bind(this));
	        }
	        if (!options.silent) this.trigger('sort', this, options);
	        return this;
	    };
	    Collection.prototype.sortBy = function (key, context) {
	        return arrays_1.sortBy(this._models, key, context);
	    };
	    Collection.prototype.push = function (model, options) {
	        if (options === void 0) {
	            options = {};
	        }
	        return this.add(model, objects_1.extend({ at: this.length }, options));
	    };
	    Collection.prototype.reset = function (models, options) {
	        var _this = this;
	        if (options === void 0) {
	            options = {};
	        }
	        this.forEach(function (model) {
	            _this._removeReference(model, options);
	        });
	        options.previousModels = this.models;
	        this._reset();
	        models = this.add(models, options);
	        if (!options.silent) this.trigger('reset', this, options);
	        return models;
	    };
	    Collection.prototype.create = function (values, options) {
	        if (options === void 0) {
	            options = { add: true };
	        }
	        var model = new this.Model(values, options);
	        if (options.add) this.add(model);
	        return model;
	    };
	    Collection.prototype.parse = function (models, options) {
	        if (options === void 0) {
	            options = {};
	        }
	        return models;
	    };
	    Collection.prototype.find = function (nidOrFn) {
	        var model;
	        if (typeof nidOrFn === 'function') {
	            model = arrays_1.find(this.models, nidOrFn);
	        } else {
	            model = arrays_1.find(this.models, function (model) {
	                return model.id == nidOrFn || model.uid == nidOrFn || nidOrFn === model;
	            });
	        }
	        return model;
	    };
	    Collection.prototype.forEach = function (iterator, ctx) {
	        for (var i = 0, l = this.models.length; i < l; i++) {
	            iterator.call(ctx || this, this.models[i], i);
	        }
	        return this;
	    };
	    Collection.prototype.indexOf = function (model) {
	        return this.models.indexOf(model);
	    };
	    Collection.prototype.toJSON = function () {
	        return this.models.map(function (m) {
	            return m.toJSON();
	        });
	    };
	    Collection.prototype._removeReference = function (model, options) {
	        if (this === model.collection) delete model.collection;
	        this.stopListening(model);
	    };
	    Collection.prototype._addReference = function (model, options) {
	        if (!model.collection) model.collection = this;
	        this.listenTo(model, 'all', this._onModelEvent);
	    };
	    Collection.prototype._reset = function () {
	        this._models = [];
	    };
	    Collection.prototype._onModelEvent = function (event, model, collection, options) {
	        if ((event === 'add' || event === 'remove') && collection !== this) return;
	        if (event === 'destroy') this.remove(model, options);
	        utils_1.callFunc(this.trigger, this, arrays_1.slice(arguments));
	    };
	    Collection.prototype.destroy = function () {
	        var _this = this;
	        this.models.forEach(function (m) {
	            if (typeof m.destroy === 'function' && m.collection == _this) m.destroy();
	        });
	        _super.prototype.destroy.call(this);
	    };
	    return Collection;
	})(eventsjs_1.EventEmitter);
	exports.Collection = Collection;

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	var idCounter = 0;
	function getID() {
	    return "" + ++idCounter;
	}
	function callFunc(fn, ctx, args) {
	    if (args === void 0) {
	        args = [];
	    }
	    var l = fn.length,
	        i = -1,
	        a1 = args[0],
	        a2 = args[1],
	        a3 = args[2],
	        a4 = args[3];
	    switch (args.length) {
	        case 0:
	            while (++i < l) fn[i].call(ctx);
	            return;
	        case 1:
	            while (++i < l) fn[i].call(ctx, a1);
	            return;
	        case 2:
	            while (++i < l) fn[i].call(ctx, a1, a2);
	            return;
	        case 3:
	            while (++i < l) fn[i].call(ctx, a1, a2, a3);
	            return;
	        case 4:
	            while (++i < l) fn[i].call(ctx, a1, a2, a3, a4);
	            return;
	        default:
	            while (++i < l) fn[i].apply(ctx, args);
	            return;
	    }
	}
	exports.callFunc = callFunc;
	var EventEmitter = (function () {
	    function EventEmitter() {}
	    Object.defineProperty(EventEmitter.prototype, "listeners", {
	        get: function get() {
	            return this._listeners;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    EventEmitter.prototype.on = function (event, fn, ctx, once) {
	        if (once === void 0) {
	            once = false;
	        }
	        var events = (this._listeners || (this._listeners = {}))[event] || (this._listeners[event] = []);
	        events.push({
	            name: event,
	            once: once,
	            handler: fn.bind(ctx || this) /*,
	                                          ctx: ctx||this*/
	        });
	        return this;
	    };
	    EventEmitter.prototype.once = function (event, fn, ctx) {
	        return this.on(event, fn, ctx, true);
	    };
	    EventEmitter.prototype.off = function (eventName, fn) {
	        if (eventName == null) {
	            this._listeners = {};
	        } else if (this._listeners[eventName]) {
	            var events = this._listeners[eventName];
	            if (fn == null) {
	                this._listeners[eventName] = [];
	            } else {
	                for (var i = 0; i < events.length; i++) {
	                    var event_1 = events[i];
	                    if (events[i].handler == fn) {
	                        this._listeners[eventName].splice(i, 1);
	                    }
	                }
	            }
	        }
	    };
	    EventEmitter.prototype.trigger = function (eventName) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        var events = (this._listeners || (this._listeners = {}))[eventName] || (this._listeners[eventName] = []).concat(this._listeners['all'] || []);
	        if (EventEmitter.debugCallback) EventEmitter.debugCallback(this.constructor.name, this.name, eventName, args);
	        var event,
	            a,
	            len = events.length,
	            index,
	            i;
	        var calls = [];
	        for (i = 0; i < events.length; i++) {
	            event = events[i];
	            a = args;
	            if (event.name == 'all') {
	                a = [eventName].concat(args);
	                callFunc([event.handler], event.ctx, a);
	            }
	            calls.push(event.handler);
	            if (event.once === true) {
	                index = this._listeners[event.name].indexOf(event);
	                this._listeners[event.name].splice(index, 1);
	            }
	        }
	        callFunc(calls, undefined, args);
	        return this;
	    };
	    EventEmitter.prototype.listenTo = function (obj, event, fn, ctx, once) {
	        if (once === void 0) {
	            once = false;
	        }
	        var listeningTo, id, meth;
	        listeningTo = this._listeningTo || (this._listeningTo = {});
	        id = obj.listenId || (obj.listenId = getID());
	        listeningTo[id] = obj;
	        meth = once ? 'once' : 'on';
	        obj[meth](event, fn, this);
	        return this;
	    };
	    EventEmitter.prototype.listenToOnce = function (obj, event, fn, ctx) {
	        return this.listenTo(obj, event, fn, ctx, true);
	    };
	    EventEmitter.prototype.stopListening = function (obj, event, callback) {
	        var listeningTo = this._listeningTo || {};
	        var remove = !event && !callback;
	        if (obj) listeningTo[obj.listenId] = obj;
	        for (var id in listeningTo) {
	            obj = listeningTo[id];
	            obj.off(event, callback, this);
	            if (remove || !Object.keys(obj.listeners).length) delete this._listeningTo[id];
	        }
	        return this;
	    };
	    EventEmitter.prototype.destroy = function () {
	        this.stopListening();
	        this.off();
	    };
	    return EventEmitter;
	})();
	exports.EventEmitter = EventEmitter;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() {
	        this.constructor = d;
	    }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	/// <reference path="interfaces" />
	var eventsjs_1 = __webpack_require__(25);
	var utils_1 = __webpack_require__(27);
	var objects_1 = __webpack_require__(28);
	var Model = (function (_super) {
	    __extends(Model, _super);
	    function Model(attributes, options) {
	        if (attributes === void 0) {
	            attributes = {};
	        }
	        options = options || {};
	        this._attributes = attributes;
	        this.uid = utils_1.uniqueId('uid');
	        this._changed = {};
	        this.collection = options.collection;
	        _super.call(this);
	    }
	    Object.defineProperty(Model.prototype, "id", {
	        get: function get() {
	            if (this.idAttribute in this._attributes) return this._attributes[this.idAttribute];
	            return this.uid;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Model.prototype.set = function (key, val, options) {
	        if (options === void 0) {
	            options = {};
	        }
	        var attr,
	            attrs = {},
	            unset,
	            changes,
	            silent,
	            changing,
	            prev,
	            current;
	        if (key == null) return this;
	        if (typeof key === 'object') {
	            attrs = key;
	            options = val;
	        } else {
	            attrs[key] = val;
	        }
	        options || (options = {});
	        unset = options.unset;
	        silent = options.silent;
	        changes = [];
	        changing = this._changing;
	        this._changing = true;
	        if (!changing) {
	            this._previousAttributes = objects_1.extend(Object.create(null), this._attributes);
	            this._changed = {};
	        }
	        current = this._attributes, prev = this._previousAttributes;
	        for (attr in attrs) {
	            val = attrs[attr];
	            if (!utils_1.equal(current[attr], val)) changes.push(attr);
	            if (!utils_1.equal(prev[attr], val)) {
	                this._changed[attr] = val;
	            } else {
	                delete this._changed[attr];
	            }
	            unset ? delete current[attr] : current[attr] = val;
	        }
	        if (!silent) {
	            if (changes.length) this._pending = !!options;
	            for (var i = 0, l = changes.length; i < l; i++) {
	                this.trigger('change:' + changes[i], this, current[changes[i]], options);
	            }
	        }
	        if (changing) return this;
	        if (!silent) {
	            while (this._pending) {
	                options = this._pending;
	                this._pending = false;
	                this.trigger('change', this, options);
	            }
	        }
	        this._pending = false;
	        this._changing = false;
	        return this;
	    };
	    Model.prototype.get = function (key) {
	        return this._attributes[key];
	    };
	    Model.prototype.unset = function (key, options) {
	        this.set(key, void 0, objects_1.extend({}, options, { unset: true }));
	    };
	    Model.prototype.has = function (attr) {
	        return this.get(attr) != null;
	    };
	    Model.prototype.hasChanged = function (attr) {
	        if (attr == null) return !!Object.keys(this.changed).length;
	        return objects_1.has(this.changed, attr);
	    };
	    Model.prototype.clear = function (options) {
	        var attrs = {};
	        for (var key in this._attributes) attrs[key] = void 0;
	        return this.set(attrs, objects_1.extend({}, options, { unset: true }));
	    };
	    Object.defineProperty(Model.prototype, "changed", {
	        get: function get() {
	            return objects_1.extend({}, this._changed);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Model.prototype.changedAttributes = function (diff) {
	        if (!diff) return this.hasChanged() ? objects_1.extend(Object.create(null), this.changed) : false;
	        var val,
	            changed = {};
	        var old = this._changing ? this._previousAttributes : this._attributes;
	        for (var attr in diff) {
	            if (utils_1.equal(old[attr], val = diff[attr])) continue;
	            (changed || (changed = {}))[attr] = val;
	        }
	        return changed;
	    };
	    Model.prototype.previous = function (attr) {
	        if (attr == null || !this._previousAttributes) return null;
	        return this._previousAttributes[attr];
	    };
	    Model.prototype.previousAttributes = function () {
	        return objects_1.extend(Object.create(null), this._previousAttributes);
	    };
	    Model.prototype.toJSON = function () {
	        return JSON.parse(JSON.stringify(this._attributes));
	    };
	    Model.prototype.clone = function () {
	        return new this.constructor(this._attributes);
	    };
	    return Model;
	})(eventsjs_1.EventEmitter);
	exports.Model = Model;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var objects_1 = __webpack_require__(6);
	var arrays_1 = __webpack_require__(8);
	var idCounter = 0;
	var nativeBind = Function.prototype.bind;
	function camelcase(input) {
	    return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
	        return group1.toUpperCase();
	    });
	}
	exports.camelcase = camelcase;
	;
	function uniqueId(prefix) {
	    if (prefix === void 0) {
	        prefix = '';
	    }
	    return prefix + ++idCounter;
	}
	exports.uniqueId = uniqueId;
	function proxy(from, to, fns) {
	    if (!Array.isArray(fns)) fns = [fns];
	    fns.forEach(function (fn) {
	        if (typeof to[fn] === 'function') {
	            from[fn] = bind(to[fn], to);
	        }
	    });
	}
	exports.proxy = proxy;
	function bind(method, context) {
	    var args = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        args[_i - 2] = arguments[_i];
	    }
	    if (typeof method !== 'function') throw new Error('method not at function');
	    if (nativeBind != null) return nativeBind.call.apply(nativeBind, [method, context].concat(args));
	    args = args || [];
	    var fnoop = function fnoop() {};
	    var fBound = function fBound() {
	        var ctx = this instanceof fnoop ? this : context;
	        return callFunc(method, ctx, args.concat(arrays_1.slice(arguments)));
	    };
	    fnoop.prototype = this.prototype;
	    fBound.prototype = new fnoop();
	    return fBound;
	}
	exports.bind = bind;
	function callFunc(fn, ctx, args) {
	    if (args === void 0) {
	        args = [];
	    }
	    switch (args.length) {
	        case 0:
	            return fn.call(ctx);
	        case 1:
	            return fn.call(ctx, args[0]);
	        case 2:
	            return fn.call(ctx, args[0], args[1]);
	        case 3:
	            return fn.call(ctx, args[0], args[1], args[2]);
	        case 4:
	            return fn.call(ctx, args[0], args[1], args[2], args[3]);
	        case 5:
	            return fn.call(ctx, args[0], args[1], args[2], args[3], args[4]);
	        default:
	            return fn.apply(ctx, args);
	    }
	}
	exports.callFunc = callFunc;
	function equal(a, b) {
	    return eq(a, b, [], []);
	}
	exports.equal = equal;
	function triggerMethodOn(obj, eventName, args) {
	    var ev = camelcase("on-" + eventName.replace(':', '-'));
	    if (obj[ev] && typeof obj[ev] === 'function') {
	        callFunc(obj[ev], obj, args);
	    }
	    if (typeof obj.trigger === 'function') {
	        args = [eventName].concat(args);
	        callFunc(obj.trigger, obj, args);
	    }
	}
	exports.triggerMethodOn = triggerMethodOn;
	function getOption(option, objs) {
	    for (var _i = 0; _i < objs.length; _i++) {
	        var o = objs[_i];
	        if (objects_1.isObject(o) && o[option]) return o[option];
	    }
	    return null;
	}
	exports.getOption = getOption;
	function inherits(parent, protoProps, staticProps) {
	    var child;
	    if (protoProps && objects_1.has(protoProps, 'constructor')) {
	        child = protoProps.constructor;
	    } else {
	        child = function () {
	            return parent.apply(this, arguments);
	        };
	    }
	    objects_1.extend(child, parent, staticProps);
	    var Surrogate = function Surrogate() {
	        this.constructor = child;
	    };
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate();
	    if (protoProps) objects_1.extend(child.prototype, protoProps);
	    child.__super__ = parent.prototype;
	    return child;
	}
	exports.inherits = inherits;
	exports.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
	    var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;
	    if (canSetImmediate) {
	        return function (f) {
	            return window.setImmediate(f);
	        };
	    }
	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);
	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }
	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();
	function eq(a, b, aStack, bStack) {
	    if (a === b) return a !== 0 || 1 / a == 1 / b;
	    if (a == null || b == null) return a === b;
	    var className = toString.call(a);
	    if (className != toString.call(b)) return false;
	    switch (className) {
	        case '[object String]':
	            return a == String(b);
	        case '[object Number]':
	            return a !== +a ? b !== +b : a === 0 ? 1 / a === 1 / b : a === +b;
	        case '[object Date]':
	        case '[object Boolean]':
	            return +a == +b;
	        case '[object RegExp]':
	            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
	    }
	    if (typeof a != 'object' || typeof b != 'object') return false;
	    var length = aStack.length;
	    while (length--) {
	        if (aStack[length] == a) return bStack[length] == b;
	    }
	    var aCtor = a.constructor,
	        bCtor = b.constructor;
	    if (aCtor !== bCtor && !(typeof aCtor === 'function' && aCtor instanceof aCtor && typeof bCtor === 'function' && bCtor instanceof bCtor)) {
	        return false;
	    }
	    aStack.push(a);
	    bStack.push(b);
	    var size = 0,
	        result = true;
	    if (className === '[object Array]') {
	        size = a.length;
	        result = size === b.length;
	        if (result) {
	            while (size--) {
	                if (!(result = eq(a[size], b[size], aStack, bStack))) break;
	            }
	        }
	    } else {
	        for (var key in a) {
	            if (objects_1.has(a, key)) {
	                size++;
	                if (!(result = objects_1.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
	            }
	        }
	        if (result) {
	            for (key in b) {
	                if (objects_1.has(b, key) && ! size--) break;
	            }
	            result = !size;
	        }
	    }
	    aStack.pop();
	    bStack.pop();
	    return result;
	}
	;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils_1 = __webpack_require__(7);
	var arrays_1 = __webpack_require__(8);
	function isObject(obj) {
	    return obj === Object(obj);
	}
	exports.isObject = isObject;
	function isEmpty(obj) {
	    return Object.keys(obj).length === 0;
	}
	exports.isEmpty = isEmpty;
	function extend(obj) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    if (!isObject(obj)) return obj;
	    var o, k;
	    for (var _a = 0; _a < args.length; _a++) {
	        o = args[_a];
	        if (!isObject(o)) continue;
	        for (k in o) {
	            if (has(o, k)) obj[k] = o[k];
	        }
	    }
	    return obj;
	}
	exports.extend = extend;
	function assign(target) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert first argument to object');
	    }
	    var to = Object(target);
	    for (var i = 0, ii = args.length; i < ii; i++) {
	        var nextSource = args[i];
	        if (nextSource === undefined || nextSource === null) {
	            continue;
	        }
	        nextSource = Object(nextSource);
	        var keysArray = Object.keys(Object(nextSource));
	        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	            var nextKey = keysArray[nextIndex];
	            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	            if (desc !== undefined && desc.enumerable) {
	                to[nextKey] = nextSource[nextKey];
	            }
	        }
	    }
	    return to;
	}
	exports.assign = assign;
	function has(obj, prop) {
	    return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	exports.has = has;
	function pick(obj, props) {
	    var out = {},
	        prop;
	    for (var _i = 0; _i < props.length; _i++) {
	        prop = props[_i];
	        if (has(obj, prop)) out[prop] = obj[prop];
	    }
	    return out;
	}
	exports.pick = pick;
	function result(obj, prop, ctx, args) {
	    var ret = obj[prop];
	    return typeof ret === 'function' ? utils_1.callFunc(ret, ctx, args || []) : ret;
	}
	exports.result = result;
	function values(obj) {
	    var output = [];
	    for (var k in obj) if (has(obj, k)) {
	        output.push(obj[k]);
	    }
	    return output;
	}
	exports.values = values;
	function intersectionObjects(a, b, predicate) {
	    var results = [],
	        aElement,
	        existsInB;
	    for (var i = 0, ii = a.length; i < ii; i++) {
	        aElement = a[i];
	        existsInB = arrays_1.any(b, function (bElement) {
	            return predicate(bElement, aElement);
	        });
	        if (existsInB) {
	            results.push(aElement);
	        }
	    }
	    return results;
	}
	function intersection(results) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    var lastArgument = args[args.length - 1];
	    var arrayCount = args.length;
	    var areEqualFunction = utils_1.equal;
	    if (typeof lastArgument === "function") {
	        areEqualFunction = lastArgument;
	        arrayCount--;
	    }
	    for (var i = 0; i < arrayCount; i++) {
	        var array = args[i];
	        results = intersectionObjects(results, array, areEqualFunction);
	        if (results.length === 0) break;
	    }
	    return results;
	}
	exports.intersection = intersection;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils_1 = __webpack_require__(7);
	function unique(array) {
	    return array.filter(function (e, i) {
	        for (i += 1; i < array.length; i += 1) {
	            if (utils_1.equal(e, array[i])) {
	                return false;
	            }
	        }
	        return true;
	    });
	}
	exports.unique = unique;
	function any(array, predicate) {
	    for (var i = 0, ii = array.length; i < ii; i++) {
	        if (predicate(array[i])) return true;
	    }
	    return false;
	}
	exports.any = any;
	function indexOf(array, item) {
	    for (var i = 0, len = array.length; i < len; i++) if (array[i] === item) return i;
	    return -1;
	}
	exports.indexOf = indexOf;
	function find(array, callback, ctx) {
	    var i, v;
	    for (i = 0; i < array.length; i++) {
	        v = array[i];
	        if (callback.call(ctx, v)) return v;
	    }
	    return null;
	}
	exports.find = find;
	function slice(array, begin, end) {
	    return Array.prototype.slice.call(array, begin, end);
	}
	exports.slice = slice;
	function flatten(arr) {
	    return arr.reduce(function (flat, toFlatten) {
	        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
	    }, []);
	}
	exports.flatten = flatten;
	function sortBy(obj, value, context) {
	    var iterator = typeof value === 'function' ? value : function (obj) {
	        return obj[value];
	    };
	    return obj.map(function (value, index, list) {
	        return {
	            value: value,
	            index: index,
	            criteria: iterator.call(context, value, index, list)
	        };
	    }).sort(function (left, right) {
	        var a = left.criteria;
	        var b = right.criteria;
	        if (a !== b) {
	            if (a > b || a === void 0) return 1;
	            if (a < b || b === void 0) return -1;
	        }
	        return left.index - right.index;
	    }).map(function (item) {
	        return item.value;
	    });
	}
	exports.sortBy = sortBy;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() {
	        this.constructor = d;
	    }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var utils_1 = __webpack_require__(27);
	var objects_1 = __webpack_require__(28);
	var model_1 = __webpack_require__(26);
	function objToPaths(obj, separator) {
	    if (separator === void 0) {
	        separator = ".";
	    }
	    var ret = {};
	    for (var key in obj) {
	        var val = obj[key];
	        if (val && (val.constructor === Object || val.constructor === Array) && !objects_1.isEmpty(val)) {
	            var obj2 = objToPaths(val);
	            for (var key2 in obj2) {
	                var val2 = obj2[key2];
	                ret[key + separator + key2] = val2;
	            }
	        } else {
	            ret[key] = val;
	        }
	    }
	    return ret;
	}
	function getNested(obj, path, return_exists, separator) {
	    if (separator === void 0) {
	        separator = ".";
	    }
	    var fields = path ? path.split(separator) : [];
	    var result = obj;
	    return_exists || return_exists === false;
	    for (var i = 0, n = fields.length; i < n; i++) {
	        if (return_exists && !objects_1.has(result, fields[i])) {
	            return false;
	        }
	        result = result instanceof model_1.Model ? result.get(fields[i]) : result[fields[i]];
	        if (result == null && i < n - 1) {
	            result = {};
	        }
	        if (typeof result === 'undefined') {
	            if (return_exists) {
	                return true;
	            }
	            return result;
	        }
	    }
	    if (return_exists) {
	        return true;
	    }
	    return result;
	}
	function setNested(obj, path, val, options) {
	    options = options || {};
	    var separator = options.separator || ".";
	    var fields = path ? path.split(separator) : [];
	    var result = obj;
	    for (var i = 0, n = fields.length; i < n && result !== undefined; i++) {
	        var field = fields[i];
	        if (i === n - 1) {
	            options.unset ? delete result[field] : result[field] = val;
	        } else {
	            if (typeof result[field] === 'undefined' || !objects_1.isObject(result[field])) {
	                if (options.unset) {
	                    delete result[field];
	                    return;
	                }
	                var nextField = fields[i + 1];
	                result[field] = /^\d+$/.test(nextField) ? [] : {};
	            }
	            result = result[field];
	        }
	    }
	}
	function deleteNested(obj, path) {
	    setNested(obj, path, null, {
	        unset: true
	    });
	}
	var NestedModel = (function (_super) {
	    __extends(NestedModel, _super);
	    function NestedModel() {
	        _super.apply(this, arguments);
	    }
	    NestedModel.prototype.get = function (attr) {
	        return getNested(this._attributes, attr);
	    };
	    NestedModel.prototype.set = function (key, val, options) {
	        var attr, attrs, unset, changes, silent, changing, prev, current;
	        if (key == null) return this;
	        if (typeof key === 'object') {
	            attrs = key;
	            options = val || {};
	        } else {
	            (attrs = {})[key] = val;
	        }
	        options || (options = {});
	        unset = options.unset;
	        silent = options.silent;
	        changes = [];
	        changing = this._changing;
	        this._changing = true;
	        if (!changing) {
	            this._previousAttributes = objects_1.extend({}, this._attributes);
	            this._changed = {};
	        }
	        current = this._attributes, prev = this._previousAttributes;
	        if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];
	        attrs = objToPaths(attrs);
	        for (attr in attrs) {
	            val = attrs[attr];
	            if (!utils_1.equal(getNested(current, attr), val)) {
	                changes.push(attr);
	                this._changed[attr] = val;
	            }
	            if (!utils_1.equal(getNested(prev, attr), val)) {
	                setNested(this.changed, attr, val);
	            } else {
	                deleteNested(this.changed, attr);
	            }
	            unset ? deleteNested(current, attr) : setNested(current, attr, val);
	        }
	        if (!silent) {
	            if (changes.length) this._pending = true;
	            var separator = NestedModel.keyPathSeparator;
	            var alreadyTriggered = {};
	            for (var i = 0, l = changes.length; i < l; i++) {
	                var key_1 = changes[i];
	                if (!alreadyTriggered.hasOwnProperty(key_1) || !alreadyTriggered[key_1]) {
	                    alreadyTriggered[key_1] = true;
	                    this.trigger('change:' + key_1, this, getNested(current, key_1), options);
	                }
	                var fields = key_1.split(separator);
	                for (var n = fields.length - 1; n > 0; n--) {
	                    var parentKey = fields.slice(0, n).join(separator),
	                        wildcardKey = parentKey + separator + '*';
	                    if (!alreadyTriggered.hasOwnProperty(wildcardKey) || !alreadyTriggered[wildcardKey]) {
	                        alreadyTriggered[wildcardKey] = true;
	                        this.trigger('change:' + wildcardKey, this, getNested(current, parentKey), options);
	                    }
	                    if (!alreadyTriggered.hasOwnProperty(parentKey) || !alreadyTriggered[parentKey]) {
	                        alreadyTriggered[parentKey] = true;
	                        this.trigger('change:' + parentKey, this, getNested(current, parentKey), options);
	                    }
	                }
	            }
	        }
	        if (changing) return this;
	        if (!silent) {
	            while (this._pending) {
	                this._pending = false;
	                this.trigger('change', this, options);
	            }
	        }
	        this._pending = false;
	        this._changing = false;
	        return this;
	    };
	    NestedModel.prototype.clear = function (options) {
	        var attrs = {};
	        var shallowAttributes = objToPaths(this._attributes);
	        for (var key in shallowAttributes) attrs[key] = void 0;
	        return this.set(attrs, objects_1.extend({}, options, {
	            unset: true
	        }));
	    };
	    NestedModel.prototype.hasChanged = function (attr) {
	        if (attr == null) {
	            return !Object.keys(this.changed).length;
	        }
	        return getNested(this.changed, attr) !== undefined;
	    };
	    NestedModel.prototype.changedAttributes = function (diff) {
	        if (!diff) return this.hasChanged() ? objToPaths(this.changed) : false;
	        var old = this._changing ? this._previousAttributes : this._attributes;
	        diff = objToPaths(diff);
	        old = objToPaths(old);
	        var val,
	            changed = false;
	        for (var attr in diff) {
	            if (utils_1.equal(old[attr], val = diff[attr])) continue;
	            (changed || (changed = {}))[attr] = val;
	        }
	        return changed;
	    };
	    NestedModel.prototype.previous = function (attr) {
	        if (attr == null || !this._previousAttributes) {
	            return null;
	        }
	        return getNested(this._previousAttributes, attr);
	    };
	    NestedModel.prototype.previousAttributes = function () {
	        return objects_1.extend({}, this._previousAttributes);
	    };
	    NestedModel.keyPathSeparator = '.';
	    return NestedModel;
	})(model_1.Model);
	exports.NestedModel = NestedModel;

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";

	/// <reference path="../node_modules/eventsjs/events" />
	/// <reference path="../node_modules/utilities/utils" />

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilitiesLibIndex = __webpack_require__(33);

	var _collection = __webpack_require__(23);

	var _index = __webpack_require__(21);

	var AbstractProxy = (function () {
	    function AbstractProxy(model, parent) {
	        _classCallCheck(this, AbstractProxy);

	        this.model = model || new _collection.NestedModel();
	        this.parent = parent;
	        this.__queue = 0;
	        this._onchange = (0, _utilitiesLibIndex.bind)(this._onchange, this);
	    }

	    _createClass(AbstractProxy, [{
	        key: '$run',
	        value: function $run(fn, ctx, args) {
	            var _this = this;

	            this.observe();
	            var results = (0, _utilitiesLibIndex.callFunc)(fn, ctx, args);
	            if (results) {
	                this.__queue++;
	                return (0, _utilitiesLibIndex.toPromise)(results).then(function () {
	                    if (--_this.__queue === 0) _this.unobserve();
	                    return results;
	                });
	            } else {
	                var _ret = (function () {
	                    var defer = (0, _utilitiesLibIndex.deferred)();
	                    (0, _utilitiesLibIndex.nextTick)(function () {
	                        if (_this.__queue == 0) _this.unobserve();
	                        defer.resolve(null);
	                    });
	                    return {
	                        v: defer.promise
	                    };
	                })();

	                if (typeof _ret === 'object') return _ret.v;
	            }
	        }
	    }, {
	        key: '_onchange',
	        value: function _onchange(events) {
	            var _this2 = this;

	            var props = {};
	            for (var i = 0, ii = events.length; i < ii; i++) {
	                var e = events[i];
	                if (e.name === '__queue') continue;
	                if (e.type === 'delete') {
	                    this.model.set(e.name, { unset: true });
	                } else {
	                    props[e.name] = this[e.name];
	                }
	            }

	            var _get_atributes = (0, _index.get_atributes)(props);

	            var attr = _get_atributes.attr;
	            var deferred = _get_atributes.deferred;

	            if (Object.keys(attr).length) this.model.set(this.__normalizeAttr(attr));
	            if (Object.keys(deferred).length) {
	                this.__queue++;
	                (0, _utilitiesLibIndex.toPromise)(deferred).then(function (props) {
	                    if (--_this2.__queue === 0) {
	                        _this2.unobserve();
	                    }
	                    _this2.model.set(_this2.__normalizeAttr(props));
	                })['catch'](function (e) {
	                    _this2.model.trigger('error', e);
	                    _this2.unobserve();
	                });
	            }
	        }
	    }, {
	        key: '__normalizeAttr',
	        value: function __normalizeAttr(attr) {
	            for (var key in attr) {
	                var val = attr[key];
	                if (Array.isArray(val) && val.length > 0 && (0, _utilitiesLibIndex.isObject)(val[0])) {
	                    val = new _collection.Collection(val);
	                    attr[key] = val;
	                }
	            }
	            return attr;
	        }
	    }, {
	        key: 'observe',
	        value: function observe() {}
	    }, {
	        key: 'unobserve',
	        value: function unobserve() {}
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.model.destroy();
	        }
	    }]);

	    return AbstractProxy;
	})();

	exports.AbstractProxy = AbstractProxy;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(8));
	__export(__webpack_require__(6));
	__export(__webpack_require__(34));
	__export(__webpack_require__(7));

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var objects_1 = __webpack_require__(6);
	var arrays_1 = __webpack_require__(8);
	var utils_1 = __webpack_require__(7);
	exports.Promise = window.Promise;
	function isPromise(obj) {
	    return obj && typeof obj.then === 'function';
	}
	exports.isPromise = isPromise;
	function toPromise(obj) {
	    if (!obj) {
	        return obj;
	    }
	    if (isPromise(obj)) {
	        return obj;
	    }
	    if ("function" == typeof obj) {
	        return thunkToPromise.call(this, obj);
	    }
	    if (Array.isArray(obj)) {
	        return arrayToPromise.call(this, obj);
	    }
	    if (objects_1.isObject(obj)) {
	        return objectToPromise.call(this, obj);
	    }
	    return exports.Promise.resolve(obj);
	}
	exports.toPromise = toPromise;
	function thunkToPromise(fn) {
	    var ctx = this;
	    return new exports.Promise(function (resolve, reject) {
	        fn.call(ctx, function (err, res) {
	            if (err) return reject(err);
	            if (arguments.length > 2) res = arrays_1.slice(arguments, 1);
	            resolve(res);
	        });
	    });
	}
	exports.thunkToPromise = thunkToPromise;
	function arrayToPromise(obj) {
	    return exports.Promise.all(obj.map(toPromise, this));
	}
	exports.arrayToPromise = arrayToPromise;
	function objectToPromise(obj) {
	    var results = new obj.constructor();
	    var keys = Object.keys(obj);
	    var promises = [];
	    for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var promise = toPromise.call(this, obj[key]);
	        if (promise && isPromise(promise)) defer(promise, key);else results[key] = obj[key];
	    }
	    return exports.Promise.all(promises).then(function () {
	        return results;
	    });
	    function defer(promise, key) {
	        results[key] = undefined;
	        promises.push(promise.then(function (res) {
	            results[key] = res;
	        }));
	    }
	}
	exports.objectToPromise = objectToPromise;
	function deferred(fn, ctx) {
	    var args = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        args[_i - 2] = arguments[_i];
	    }
	    var ret = {};
	    ret.promise = new exports.Promise(function (resolve, reject) {
	        ret.resolve = resolve;
	        ret.reject = reject;
	        ret.done = function (err, result) {
	            if (err) return reject(err);else resolve(result);
	        };
	    });
	    if (typeof fn === 'function') {
	        utils_1.callFunc(fn, ctx, args.concat([ret.done]));
	        return ret.promise;
	    }
	    return ret;
	}
	exports.deferred = deferred;
	;
	function callback(promise, callback, ctx) {
	    promise.then(function (result) {
	        callback.call(ctx, null, result);
	    })['catch'](function (err) {
	        callback.call(ctx, err);
	    });
	}
	exports.callback = callback;
	function delay(timeout) {
	    var defer = deferred();
	    timeout == null ? utils_1.nextTick(defer.resolve) : setTimeout(defer.resolve, timeout);
	    return defer.promise;
	}
	exports.delay = delay;
	;
	function eachAsync(array, iterator, context, accumulate) {
	    if (accumulate === void 0) {
	        accumulate = false;
	    }
	    return mapAsync(array, iterator, context, accumulate).then(function () {
	        return void 0;
	    });
	}
	exports.eachAsync = eachAsync;
	function mapAsync(array, iterator, context, accumulate) {
	    if (accumulate === void 0) {
	        accumulate = false;
	    }
	    return new exports.Promise(function (resolve, reject) {
	        var i = 0,
	            len = array.length,
	            errors = [],
	            results = [];
	        function next(err, result) {
	            if (err && !accumulate) return reject(err);
	            if (err) errors.push(err);
	            if (i === len) return errors.length ? reject(arrays_1.flatten(errors)) : resolve(results);
	            var ret = iterator.call(context, array[i++]);
	            if (isPromise(ret)) {
	                ret.then(function (r) {
	                    results.push(r);next(null, r);
	                }, next);
	            } else if (ret instanceof Error) {
	                next(ret);
	            } else {
	                next(null);
	            }
	        }
	        next(null);
	    });
	}
	exports.mapAsync = mapAsync;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _proxy = __webpack_require__(32);

	var _collection = __webpack_require__(23);

	var _utilitiesLibIndex = __webpack_require__(33);

	var reserved = ['model', 'parent', '__queue', '_onchange', '__timer'];

	var DirtyObjectObserver = (function (_AbstractProxy) {
	    _inherits(DirtyObjectObserver, _AbstractProxy);

	    function DirtyObjectObserver() {
	        _classCallCheck(this, DirtyObjectObserver);

	        _get(Object.getPrototypeOf(DirtyObjectObserver.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(DirtyObjectObserver, [{
	        key: 'observe',
	        value: function observe() {
	            var _this = this;

	            this.unobserve();
	            (0, _utilitiesLibIndex.nextTick)(function () {
	                _this._check(_this.model);
	            });
	            this.__timer = setInterval(function () {
	                _this._check(_this.model);
	            }, 300);
	        }
	    }, {
	        key: 'unobserve',
	        value: function unobserve() {
	            if (this.__timer) {
	                clearTimeout(this.__timer);
	                this.__timer = null;
	            }
	        }
	    }, {
	        key: '_check',
	        value: function _check(model) {
	            var attributes = this.model.toJSON();
	            var events = [],
	                v = undefined,
	                ev = undefined;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = Object.keys(this)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var k = _step.value;

	                    v = this[k];
	                    if (~reserved.indexOf(k)) continue;
	                    ev = {
	                        name: k,
	                        object: this,
	                        type: v == null ? "delete" : ""
	                    };
	                    if (v && !attributes[k]) {
	                        ev.type = "add";
	                    } else if (v && !(0, _utilitiesLibIndex.equal)(v, attributes[k])) {
	                        ev.type = "update";
	                    }
	                    ev.oldValue = attributes[k];
	                    events.push(ev);
	                    delete attributes[k];
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator['return']) {
	                        _iterator['return']();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            for (var k in attributes) {
	                events.push({
	                    name: k,
	                    object: this,
	                    type: 'delete',
	                    oldValue: attributes[k]
	                });
	            }
	            if (events.length) this._onchange(events);
	        }
	    }, {
	        key: 'createChild',
	        value: function createChild() {
	            var model = new _collection.NestedModel();
	            return new DirtyObjectObserver(model, this);
	        }
	    }]);

	    return DirtyObjectObserver;
	})(_proxy.AbstractProxy);

	exports.DirtyObjectObserver = DirtyObjectObserver;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(require, exports, module);
	  } else {
	    root.templ = factory();
	  }
	}(this, function (require, exports, module) {
	  var templ;
	  (function (templ) {
	    templ.version = "0.0.9";

	    function attribute(name, attr) {
	      if (typeof attr !== 'function') {
	        attr = utils.extendClass(templ.attributes.BaseAttribute, attr);
	      }
	      templ.attributes[name] = attr;
	    }
	    templ.attribute = attribute;

	    function component(name, cmp) {
	      if (typeof cmp !== 'function') {
	        cmp = utils.extendClass(templ.components.BaseComponent, cmp);
	      }
	      templ.components[name] = cmp;
	    }
	    templ.component = component;

	    function modifier(name, func) {
	      modifiers[name] = func;
	    }
	    templ.modifier = modifier;

	    function debugging(enabled) {
	      utils.Debug.enable(enabled);
	    }
	    templ.debugging = debugging;

	    function compile(str, options) {
	      var vn = templ.vnode,
	          fn = templ.compiler.compile(str);
	      var vnode = fn(vn.fragment, vn.element, vn.text, vn.comment, vn.dynamic, templ.binding);
	      return vn.template(vnode, utils.extend({
	        document: document,
	        viewClass: templ.View,
	        attributes: templ.attributes,
	        components: templ.components,
	        modifiers: modifiers
	      }, options || {}));
	    }
	    templ.compile = compile;
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var compiler;
	    (function (compiler) {
	      compiler.parser = (function () {
	/*
	             * Generated by PEG.js 0.8.0.
	             *
	             * http://pegjs.majda.cz/
	             */

	        function peg$subclass(child, parent) {
	          function ctor() {
	            this.constructor = child;
	          }
	          ctor.prototype = parent.prototype;
	          child.prototype = new ctor();
	        }

	        function SyntaxError(message, expected, found, offset, line, column) {
	          this.message = message;
	          this.expected = expected;
	          this.found = found;
	          this.offset = offset;
	          this.line = line;
	          this.column = column;
	          this.name = "SyntaxError";
	        }
	        peg$subclass(SyntaxError, Error);

	        function parse(input) {
	          var options = arguments.length > 1 ? arguments[1] : {},
	              peg$FAILED = {},
	              peg$startRuleIndices = {
	              Start: 0
	              },
	              peg$startRuleIndex = 0,
	              peg$consts = [

	            function (children) {
	              return children;
	            },
	            peg$FAILED, "<!DOCTYPE",
	            {
	              type: "literal",
	              value: "<!DOCTYPE",
	              description: "\"<!DOCTYPE\""
	            }, [], /^[^>]/,
	            {
	              type: "class",
	              value: "[^>]",
	              description: "[^>]"
	            }, ">",
	            {
	              type: "literal",
	              value: ">",
	              description: "\">\""
	            }, function (info) {
	              return ["doctype", info.join("")];
	            }, function (children) {
	              return trimTextExpressions(children);
	            }, "<!--",
	            {
	              type: "literal",
	              value: "<!--",
	              description: "\"<!--\""
	            },
	            void 0, "-->",
	            {
	              type: "literal",
	              value: "-->",
	              description: "\"-->\""
	            }, function (v) {
	              return v;
	            }, function (value) {
	              return ["comment", escapeString(trimEnds(value.join("")))];
	            }, "<script",
	            {
	              type: "literal",
	              value: "<script",
	              description: "\"<script\""
	            }, "</script>",
	            {
	              type: "literal",
	              value: "</script>",
	              description: "\"</script>\""
	            }, function (attributes, content) {
	              return ["element", "script", attributes, [
	                ["text", escapeString(content.join(""))]
	              ]];
	            }, function () {
	              return text();
	            }, "<",
	            {
	              type: "literal",
	              value: "<",
	              description: "\"<\""
	            }, "area",
	            {
	              type: "literal",
	              value: "area",
	              description: "\"area\""
	            }, "base",
	            {
	              type: "literal",
	              value: "base",
	              description: "\"base\""
	            }, "br",
	            {
	              type: "literal",
	              value: "br",
	              description: "\"br\""
	            }, "col",
	            {
	              type: "literal",
	              value: "col",
	              description: "\"col\""
	            }, "command",
	            {
	              type: "literal",
	              value: "command",
	              description: "\"command\""
	            }, "embed",
	            {
	              type: "literal",
	              value: "embed",
	              description: "\"embed\""
	            }, "hr",
	            {
	              type: "literal",
	              value: "hr",
	              description: "\"hr\""
	            }, "img",
	            {
	              type: "literal",
	              value: "img",
	              description: "\"img\""
	            }, "input",
	            {
	              type: "literal",
	              value: "input",
	              description: "\"input\""
	            }, "keygen",
	            {
	              type: "literal",
	              value: "keygen",
	              description: "\"keygen\""
	            }, "link",
	            {
	              type: "literal",
	              value: "link",
	              description: "\"link\""
	            }, "meta",
	            {
	              type: "literal",
	              value: "meta",
	              description: "\"meta\""
	            }, "param",
	            {
	              type: "literal",
	              value: "param",
	              description: "\"param\""
	            }, "source",
	            {
	              type: "literal",
	              value: "source",
	              description: "\"source\""
	            }, "track",
	            {
	              type: "literal",
	              value: "track",
	              description: "\"track\""
	            }, "wbr",
	            {
	              type: "literal",
	              value: "wbr",
	              description: "\"wbr\""
	            },
	            null, "/>",
	            {
	              type: "literal",
	              value: "/>",
	              description: "\"/>\""
	            }, function (nodeName, attributes, endTag) {
	              if (endTag && nodeName != endTag.name) {
	                expected("</" + nodeName + ">");
	              }
	              return ["element", nodeName, attributes, []];
	            }, "</",
	            {
	              type: "literal",
	              value: "</",
	              description: "\"</\""
	            }, function (name) {
	              return {
	                name: name
	              };
	            }, function (startTag, children, endTag) {
	              if (startTag.name != endTag.name) {
	                expected("</" + startTag.name + ">");
	              }
	              return ["element", startTag.name, startTag.attributes, children];
	            }, function (value) {
	              return ["text", escapeString(trimNewLineChars(value.join("")))];
	            }, "{{",
	            {
	              type: "literal",
	              value: "{{",
	              description: "\"{{\""
	            }, function (info) {
	              return info;
	            }, function (info) {
	              return ["element", info.name, info.attributes, []];
	            }, function (name, attrs) {
	              return {
	                name: name,
	                attributes: attrs
	              };
	            }, function (attributes) {
	              return attributes;
	            }, /^[a-zA-Z0-9:_.\-]/,
	            {
	              type: "class",
	              value: "[a-zA-Z0-9:_.\\-]",
	              description: "[a-zA-Z0-9:_.\\-]"
	            }, function (word) {
	              return word.join("");
	            }, "=",
	            {
	              type: "literal",
	              value: "=",
	              description: "\"=\""
	            }, function (name, values) {
	              return ["attribute", name, values];
	            }, function (name, property) {
	              return ["property", name, property];
	            }, function (name) {
	              return ['attribute', name, []];
	            }, "\"",
	            {
	              type: "literal",
	              value: "\"",
	              description: "\"\\\"\""
	            }, /^[^"]/,
	            {
	              type: "class",
	              value: "[^\"]",
	              description: "[^\"]"
	            }, function () {
	              return ["string", text()];
	            }, function (values) {
	              return attrValues(values);
	            }, "'",
	            {
	              type: "literal",
	              value: "'",
	              description: "\"'\""
	            }, /^[^']/,
	            {
	              type: "class",
	              value: "[^']",
	              description: "[^']"
	            }, "}}",
	            {
	              type: "literal",
	              value: "}}",
	              description: "\"}}\""
	            }, function (value) {
	              return ["script", value];
	            }, function (script) {
	              return ["block", script[1]];
	            }, "?",
	            {
	              type: "literal",
	              value: "?",
	              description: "\"?\""
	            }, ":",
	            {
	              type: "literal",
	              value: ":",
	              description: "\":\""
	            }, function (condition, left, right) {
	              return ["condition", condition, left, right];
	            }, "(",
	            {
	              type: "literal",
	              value: "(",
	              description: "\"(\""
	            }, ")",
	            {
	              type: "literal",
	              value: ")",
	              description: "\")\""
	            }, function (params) {
	              return params;
	            }, "()",
	            {
	              type: "literal",
	              value: "()",
	              description: "\"()\""
	            }, function () {
	              return [];
	            }, ",",
	            {
	              type: "literal",
	              value: ",",
	              description: "\",\""
	            }, function (param1, rest) {
	              return [param1].concat(rest.map(function (v) {
	                return v[1];
	              }));
	            }, function (left, right) {
	              return ["assign", left, right];
	            }, "&&",
	            {
	              type: "literal",
	              value: "&&",
	              description: "\"&&\""
	            }, "||",
	            {
	              type: "literal",
	              value: "||",
	              description: "\"||\""
	            }, "===",
	            {
	              type: "literal",
	              value: "===",
	              description: "\"===\""
	            }, "==",
	            {
	              type: "literal",
	              value: "==",
	              description: "\"==\""
	            }, "!==",
	            {
	              type: "literal",
	              value: "!==",
	              description: "\"!==\""
	            }, "!=",
	            {
	              type: "literal",
	              value: "!=",
	              description: "\"!=\""
	            }, ">==",
	            {
	              type: "literal",
	              value: ">==",
	              description: "\">==\""
	            }, ">=",
	            {
	              type: "literal",
	              value: ">=",
	              description: "\">=\""
	            }, "<==",
	            {
	              type: "literal",
	              value: "<==",
	              description: "\"<==\""
	            }, "<=",
	            {
	              type: "literal",
	              value: "<=",
	              description: "\"<=\""
	            }, "+",
	            {
	              type: "literal",
	              value: "+",
	              description: "\"+\""
	            }, "-",
	            {
	              type: "literal",
	              value: "-",
	              description: "\"-\""
	            }, "%",
	            {
	              type: "literal",
	              value: "%",
	              description: "\"%\""
	            }, "*",
	            {
	              type: "literal",
	              value: "*",
	              description: "\"*\""
	            }, "/",
	            {
	              type: "literal",
	              value: "/",
	              description: "\"/\""
	            }, function (left, operator, right) {
	              return ["operator", operator, left, right];
	            }, function (value) {
	              return value;
	            }, function (expression, modifiers) {
	              for (var i = 0, n = modifiers.length; i < n; i++) {
	                expression = ["modifier", modifiers[i].name, [expression].concat(modifiers[i].parameters)];
	              }
	              return expression;
	            }, "|",
	            {
	              type: "literal",
	              value: "|",
	              description: "\"|\""
	            }, function (name, parameters) {
	              return {
	                name: name,
	                parameters: parameters || []
	              };
	            }, function (context) {
	              return context;
	            }, "!",
	            {
	              type: "literal",
	              value: "!",
	              description: "\"!\""
	            }, function (not, value) {
	              return ["not", value];
	            }, function (not, value) {
	              return ["negative", value];
	            }, /^[0-9]/,
	            {
	              type: "class",
	              value: "[0-9]",
	              description: "[0-9]"
	            }, function (value) {
	              return ["literal", parseFloat(text())];
	            }, ".",
	            {
	              type: "literal",
	              value: ".",
	              description: "\".\""
	            }, function (group) {
	              return ["group", group];
	            }, function (expression) {
	              return expression;
	            }, "true",
	            {
	              type: "literal",
	              value: "true",
	              description: "\"true\""
	            }, "false",
	            {
	              type: "literal",
	              value: "false",
	              description: "\"false\""
	            }, function (value) {
	              return ["literal", value === "true"];
	            }, "undefined",
	            {
	              type: "literal",
	              value: "undefined",
	              description: "\"undefined\""
	            }, function () {
	              return ["literal", void 0];
	            }, "NaN",
	            {
	              type: "literal",
	              value: "NaN",
	              description: "\"NaN\""
	            }, function () {
	              return ["literal", NaN];
	            }, "Infinity",
	            {
	              type: "literal",
	              value: "Infinity",
	              description: "\"Infinity\""
	            }, function () {
	              return ["literal", Infinity];
	            }, "null",
	            {
	              type: "literal",
	              value: "null",
	              description: "\"null\""
	            }, "NULL",
	            {
	              type: "literal",
	              value: "NULL",
	              description: "\"NULL\""
	            }, function () {
	              return ["literal", null];
	            }, function (reference, parameters) {
	              return ["call", reference, parameters];
	            }, "^",
	            {
	              type: "literal",
	              value: "^",
	              description: "\"^\""
	            }, "~>",
	            {
	              type: "literal",
	              value: "~>",
	              description: "\"~>\""
	            }, "<~>",
	            {
	              type: "literal",
	              value: "<~>",
	              description: "\"<~>\""
	            }, "~",
	            {
	              type: "literal",
	              value: "~",
	              description: "\"~\""
	            }, "<~",
	            {
	              type: "literal",
	              value: "<~",
	              description: "\"<~\""
	            }, function (bindingType, reference, path) {
	              return ["reference", [reference].concat(path), bindingType];
	            }, function (name) {
	              return name;
	            }, "[",
	            {
	              type: "literal",
	              value: "[",
	              description: "\"[\""
	            }, "]",
	            {
	              type: "literal",
	              value: "]",
	              description: "\"]\""
	            }, function (key) {
	              return key;
	            }, /^[a-zA-Z_$0-9]/,
	            {
	              type: "class",
	              value: "[a-zA-Z_$0-9]",
	              description: "[a-zA-Z_$0-9]"
	            }, function (name) {
	              return text();
	            }, "{",
	            {
	              type: "literal",
	              value: "{",
	              description: "\"{\""
	            }, "}",
	            {
	              type: "literal",
	              value: "}",
	              description: "\"}\""
	            }, function (values) {
	              return ["hash", values];
	            }, function (values) {
	              var s = {};
	              for (var i = 0, n = values.length; i < n; i++) {
	                s[values[i].key] = values[i].value;
	              }
	              return s;
	            }, function (firstValue, additionalValues) {
	              return [
	              firstValue].concat(additionalValues.length ? additionalValues[0][1] : []);
	            }, function (key, value) {
	              return {
	                key: key,
	                value: value
	              };
	            }, function (key) {
	              return key[1];
	            }, function (key) {
	              return key;
	            },
	            {
	              type: "other",
	              description: "string"
	            }, function (chars) {
	              return ["string", chars.join("")];
	            }, "\\",
	            {
	              type: "literal",
	              value: "\\",
	              description: "\"\\\\\""
	            }, function () {
	              return text();
	            }, "\\\"",
	            {
	              type: "literal",
	              value: "\\\"",
	              description: "\"\\\\\\\"\""
	            }, "\\'",
	            {
	              type: "literal",
	              value: "\\'",
	              description: "\"\\\\'\""
	            },
	            {
	              type: "any",
	              description: "any character"
	            }, /^[a-zA-Z]/,
	            {
	              type: "class",
	              value: "[a-zA-Z]",
	              description: "[a-zA-Z]"
	            }, function (chars) {
	              return chars.join("");
	            }, /^[ \n\r\t]/,
	            {
	              type: "class",
	              value: "[ \\n\\r\\t]",
	              description: "[ \\n\\r\\t]"
	            }],
	              peg$bytecode = [
	            peg$decode("7!"), peg$decode("!7#+' 4!6 !! %"), peg$decode("!.\"\"\"2\"3#+q$7Z+g% $0%\"\"1!3&+,$,)&0%\"\"1!3&\"\"\" !+B%7Z+8%.'\"\"2'3(+(%4%6)%!\"%$%# !$$# !$## !$\"# !\"# !"), peg$decode("! $7'*; \"7%*5 \"7)*/ \"7$*) \"7**# \"75,A&7'*; \"7%*5 \"7)*/ \"7$*) \"7**# \"75\"+' 4!6*!! %"), peg$decode("!7Z+\xC7$.+\"\"2+3,+\xB7% $!!8..\"\"2.3/9*$$\"\" -\"# !+2$7X+(%4\"60\"! %$\"# !\"# !+T$,Q&!!8..\"\"2.3/9*$$\"\" -\"# !+2$7X+(%4\"60\"! %$\"# !\"# !\"\"\" !+B%..\"\"2.3/+2%7Z+(%4%61%!\"%$%# !$$# !$## !$\"# !\"# !*# \"7\""), peg$decode("!7Z+\x86$.2\"\"2233+v%7/+l%.'\"\"2'3(+\\% $7&+&$,#&7&\"\"\" !+C%.4\"\"2435+3%7Z+)%4'66'\"$\"%$'# !$&# !$%# !$$# !$## !$\"# !\"# !"), peg$decode("!!8.4\"\"24359*$$\"\" -\"# !+1$7X+'%4\"67\" %$\"# !\"# !"), peg$decode("!.8\"\"2839+\u012A$.:\"\"2:3;*\xD1 \".<\"\"2<3=*\xC5 \".>\"\"2>3?*\xB9 \".@\"\"2@3A*\xAD \".B\"\"2B3C*\xA1 \".D\"\"2D3E*\x95 \".F\"\"2F3G*\x89 \".H\"\"2H3I*} \".J\"\"2J3K*q \".L\"\"2L3M*e \".N\"\"2N3O*Y \".P\"\"2P3Q*M \".R\"\"2R3S*A \".T\"\"2T3U*5 \".V\"\"2V3W*) \".X\"\"2X3Y+f%7/+\\%.'\"\"2'3(*) \".[\"\"2[3\\*# \" Z+:%7(*# \" Z+*%4%6]%##\" %$%# !$$# !$## !$\"# !\"# !"), peg$decode("!7Z+\u010C$.^\"\"2^3_+\xFC%.:\"\"2:3;*\xD1 \".<\"\"2<3=*\xC5 \".>\"\"2>3?*\xB9 \".@\"\"2@3A*\xAD \".B\"\"2B3C*\xA1 \".D\"\"2D3E*\x95 \".F\"\"2F3G*\x89 \".H\"\"2H3I*} \".J\"\"2J3K*q \".L\"\"2L3M*e \".N\"\"2N3O*Y \".P\"\"2P3Q*M \".R\"\"2R3S*A \".T\"\"2T3U*5 \".V\"\"2V3W*) \".X\"\"2X3Y+8%.'\"\"2'3(+(%4$6`$!!%$$# !$## !$\"# !\"# !"), peg$decode("!7,+>$7#+4%70+*%4#6a##\"! %$## !$\"# !\"# !*# \"7-"), peg$decode("! $7++&$,#&7+\"\"\" !+' 4!6b!! %"), peg$decode("!!8.8\"\"2839*) \".c\"\"2c3d9*$$\"\" -\"# !+1$7X+'%4\"67\" %$\"# !\"# !"), peg$decode("!7Z+\\$.8\"\"2839+L%7.+B%.'\"\"2'3(+2%7Z+(%4%6e%!\"%$%# !$$# !$## !$\"# !\"# !"), peg$decode("!7Z+\\$.8\"\"2839+L%7.+B%.[\"\"2[3\\+2%7Z+(%4%6f%!\"%$%# !$$# !$## !$\"# !\"# !"), peg$decode("!71+3$7/+)%4\"6g\"\"! %$\"# !\"# !"), peg$decode("!7Z+D$ $72,#&72\"+2%7Z+(%4#6h#!!%$## !$\"# !\"# !"), peg$decode("!.^\"\"2^3_+B$71+8%.'\"\"2'3(+(%4#6`#!!%$## !$\"# !\"# !"), peg$decode("!7Z+M$ $0i\"\"1!3j+,$,)&0i\"\"1!3j\"\"\" !+(%4\"6k\"! %$\"# !\"# !"), peg$decode("!71+W$7Z+M%.l\"\"2l3m+=%7Z+3%73+)%4%6n%\"$ %$%# !$$# !$## !$\"# !\"# !*t \"!71+W$7Z+M%.l\"\"2l3m+=%7Z+3%74+)%4%6o%\"$ %$%# !$$# !$## !$\"# !\"# !*/ \"!71+' 4!6p!! %"), peg$decode("!.q\"\"2q3r+\u0146$ $74*\x9B \"! $!!8.c\"\"2c3d9*$$\"\" -\"# !+3$0s\"\"1!3t+#%'\"%$\"# !\"# !+U$,R&!!8.c\"\"2c3d9*$$\"\" -\"# !+3$0s\"\"1!3t+#%'\"%$\"# !\"# !\"\"\" !+& 4!6u! %,\xA1&74*\x9B \"! $!!8.c\"\"2c3d9*$$\"\" -\"# !+3$0s\"\"1!3t+#%'\"%$\"# !\"# !+U$,R&!!8.c\"\"2c3d9*$$\"\" -\"# !+3$0s\"\"1!3t+#%'\"%$\"# !\"# !\"\"\" !+& 4!6u! %\"+8%.q\"\"2q3r+(%4#6v#!!%$## !$\"# !\"# !*\u0157 \"!.w\"\"2w3x+\u0146$ $74*\x9B \"! $!!8.c\"\"2c3d9*$$\"\" -\"# !+3$0y\"\"1!3z+#%'\"%$\"# !\"# !+U$,R&!!8.c\"\"2c3d9*$$\"\" -\"# !+3$0y\"\"1!3z+#%'\"%$\"# !\"# !\"\"\" !+& 4!6u! %,\xA1&74*\x9B \"! $!!8.c\"\"2c3d9*$$\"\" -\"# !+3$0y\"\"1!3z+#%'\"%$\"# !\"# !+U$,R&!!8.c\"\"2c3d9*$$\"\" -\"# !+3$0y\"\"1!3z+#%'\"%$\"# !\"# !\"\"\" !+& 4!6u! %\"+8%.w\"\"2w3x+(%4#6v#!!%$## !$\"# !\"# !"), peg$decode("!.c\"\"2c3d+V$7Z+L%76+B%7Z+8%.{\"\"2{3|+(%4%6}%!\"%$%# !$$# !$## !$\"# !\"# !"), peg$decode("!74+' 4!6~!! %"), peg$decode("!79+^$.\"\"23\x80+N%76+D%.\x81\"\"2\x813\x82+4%76+*%4%6\x83%#$\" %$%# !$$# !$## !$\"# !\"# !*# \"79"), peg$decode("!.\x84\"\"2\x843\x85+B$78+8%.\x86\"\"2\x863\x87+(%4#6\x88#!!%$## !$\"# !\"# !*4 \"!.\x89\"\"2\x893\x8A+& 4!6\x8B! %"), peg$decode("!76+q$ $!.\x8C\"\"2\x8C3\x8D+-$76+#%'\"%$\"# !\"# !,>&!.\x8C\"\"2\x8C3\x8D+-$76+#%'\"%$\"# !\"# !\"+)%4\"6\x8E\"\"! %$\"# !\"# !"), peg$decode("!7>+C$.l\"\"2l3m+3%79+)%4#6\x8F#\"\" %$## !$\"# !\"# !*# \"7:"), peg$decode("!7;+\u0104$.\x90\"\"2\x903\x91*\xDD \".\x92\"\"2\x923\x93*\xD1 \".\x94\"\"2\x943\x95*\xC5 \".\x96\"\"2\x963\x97*\xB9 \".\x98\"\"2\x983\x99*\xAD \".\x9A\"\"2\x9A3\x9B*\xA1 \".\x9C\"\"2\x9C3\x9D*\x95 \".\x9E\"\"2\x9E3\x9F*\x89 \".'\"\"2'3(*} \".\xA0\"\"2\xA03\xA1*q \".\xA2\"\"2\xA23\xA3*e \".8\"\"2839*Y \".\xA4\"\"2\xA43\xA5*M \".\xA6\"\"2\xA63\xA7*A \".\xA8\"\"2\xA83\xA9*5 \".\xAA\"\"2\xAA3\xAB*) \".\xAC\"\"2\xAC3\xAD+4%7:+*%4#6\xAE##\"! %$## !$\"# !\"# !*# \"7;"), peg$decode("!7Z+<$7<+2%7Z+(%4#6\xAF#!!%$## !$\"# !\"# !"), peg$decode("!7?+;$ $7=,#&7=\"+)%4\"6\xB0\"\"! %$\"# !\"# !*) \"7J*# \"7>"), peg$decode("!.\xB1\"\"2\xB13\xB2+W$7Z+M%7O+C%77*# \" Z+3%7Z+)%4%6\xB3%\"\"!%$%# !$$# !$## !$\"# !\"# !"), peg$decode("!7Z+<$7@+2%7Z+(%4#6\xB4#!!%$## !$\"# !\"# !"), peg$decode("!.\xB5\"\"2\xB53\xB6+3$7?+)%4\"6\xB7\"\"! %$\"# !\"# !*b \"!.\xB5\"\"2\xB53\xB6*) \".\xA6\"\"2\xA63\xA7+3$7?+)%4\"6\xB8\"\"! %$\"# !\"# !*/ \"7D*) \"7J*# \"7>"), peg$decode("7C*5 \"7P*/ \"7A*) \"7U*# \"7K"), peg$decode("!!.\xA6\"\"2\xA63\xA7*# \" Z+i$! $0\xB9\"\"1!3\xBA+,$,)&0\xB9\"\"1!3\xBA\"\"\" !+3$7B*# \" Z+#%'\"%$\"# !\"# !*# \"7B+#%'\"%$\"# !\"# !+' 4!6\xBB!! %"), peg$decode("!.\xBC\"\"2\xBC3\xBD+H$ $0\xB9\"\"1!3\xBA+,$,)&0\xB9\"\"1!3\xBA\"\"\" !+#%'\"%$\"# !\"# !"), peg$decode("!.\x84\"\"2\x843\x85+B$76+8%.\x86\"\"2\x863\x87+(%4#6\xBE#!!%$## !$\"# !\"# !"), peg$decode("!7E*5 \"7F*/ \"7I*) \"7G*# \"7H+' 4!6\xBF!! %"), peg$decode("!.\xC0\"\"2\xC03\xC1*) \".\xC2\"\"2\xC23\xC3+' 4!6\xC4!! %"), peg$decode("!.\xC5\"\"2\xC53\xC6+& 4!6\xC7! %"), peg$decode("!.\xC8\"\"2\xC83\xC9+& 4!6\xCA! %"), peg$decode("!.\xCB\"\"2\xCB3\xCC+& 4!6\xCD! %"), peg$decode("!.\xCE\"\"2\xCE3\xCF*) \".\xD0\"\"2\xD03\xD1+& 4!6\xD2! %"), peg$decode("!7>+3$77+)%4\"6\xD3\"\"! %$\"# !\"# !"), peg$decode("!.\xD4\"\"2\xD43\xD5*M \".\xD6\"\"2\xD63\xD7*A \".\xD8\"\"2\xD83\xD9*5 \".\xDA\"\"2\xDA3\xDB*) \".\xDC\"\"2\xDC3\xDD*# \" Z+Z$7Z+P%7O+F% $7L,#&7L\"+4%7Z+*%4%6\xDE%#$\"!%$%# !$$# !$## !$\"# !\"# !"), peg$decode("7M*# \"7N"), peg$decode("!.\xBC\"\"2\xBC3\xBD+2$7O+(%4\"6\xDF\"! %$\"# !\"# !"), peg$decode("!.\xE0\"\"2\xE03\xE1+B$76+8%.\xE2\"\"2\xE23\xE3+(%4#6\xE4#!!%$## !$\"# !\"# !"), peg$decode("! $0\xE5\"\"1!3\xE6+,$,)&0\xE5\"\"1!3\xE6\"\"\" !+' 4!6\xE7!! %"), peg$decode("!.\xE8\"\"2\xE83\xE9+\\$7Z+R%7Q*# \" Z+B%7Z+8%.\xEA\"\"2\xEA3\xEB+(%4%6\xEC%!\"%$%# !$$# !$## !$\"# !\"# !"), peg$decode("!7R+' 4!6\xED!! %"), peg$decode("!7S+q$ $!.\x8C\"\"2\x8C3\x8D+-$7R+#%'\"%$\"# !\"# !,>&!.\x8C\"\"2\x8C3\x8D+-$7R+#%'\"%$\"# !\"# !\"+)%4\"6\xEE\"\"! %$\"# !\"# !"), peg$decode("!7Z+]$7T+S%7Z+I%.\x81\"\"2\x813\x82+9%76*# \" Z+)%4%6\xEF%\"# %$%# !$$# !$## !$\"# !\"# !"), peg$decode("!7U+' 4!6\xF0!! %*/ \"!7O+' 4!6\xF1!! %"), peg$decode("8!.q\"\"2q3r+J$ $7V,#&7V\"+8%.q\"\"2q3r+(%4#6\xF3#!!%$## !$\"# !\"# !*[ \"!.w\"\"2w3x+J$ $7W,#&7W\"+8%.w\"\"2w3x+(%4#6\xF3#!!%$## !$\"# !\"# !9*\" 3\xF2"), peg$decode("!!8.q\"\"2q3r*) \".\xF4\"\"2\xF43\xF59*$$\"\" -\"# !+1$7X+'%4\"6\xF6\" %$\"# !\"# !*) \".\xF7\"\"2\xF73\xF8"), peg$decode("!!8.w\"\"2w3x*) \".\xF4\"\"2\xF43\xF59*$$\"\" -\"# !+1$7X+'%4\"6\xF6\" %$\"# !\"# !*) \".\xF9\"\"2\xF93\xFA"), peg$decode("-\"\"1!3\xFB"), peg$decode("! $0\xFC\"\"1!3\xFD+,$,)&0\xFC\"\"1!3\xFD\"\"\" !+' 4!6\xFE!! %"), peg$decode(" $0\xFF\"\"1!3\u0100,)&0\xFF\"\"1!3\u0100\"")],
	              peg$currPos = 0,
	              peg$reportedPos = 0,
	              peg$cachedPos = 0,
	              peg$cachedPosDetails = {
	              line: 1,
	              column: 1,
	              seenCR: false
	              },
	              peg$maxFailPos = 0,
	              peg$maxFailExpected = [],
	              peg$silentFails = 0,
	              peg$result;
	          if ("startRule" in options) {
	            if (!(options.startRule in peg$startRuleIndices)) {
	              throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
	            }
	            peg$startRuleIndex = peg$startRuleIndices[options.startRule];
	          }

	          function text() {
	            return input.substring(peg$reportedPos, peg$currPos);
	          }

	          function offset() {
	            return peg$reportedPos;
	          }

	          function line() {
	            return peg$computePosDetails(peg$reportedPos).line;
	          }

	          function column() {
	            return peg$computePosDetails(peg$reportedPos).column;
	          }

	          function expected(description) {
	            throw peg$buildException(null, [{
	              type: "other",
	              description: description
	            }], peg$reportedPos);
	          }

	          function error(message) {
	            throw peg$buildException(message, null, peg$reportedPos);
	          }

	          function peg$computePosDetails(pos) {
	            function advance(details, startPos, endPos) {
	              var p, ch;
	              for (p = startPos; p < endPos; p++) {
	                ch = input.charAt(p);
	                if (ch === "\n") {
	                  if (!details.seenCR) {
	                    details.line++;
	                  }
	                  details.column = 1;
	                  details.seenCR = false;
	                }
	                else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
	                  details.line++;
	                  details.column = 1;
	                  details.seenCR = true;
	                }
	                else {
	                  details.column++;
	                  details.seenCR = false;
	                }
	              }
	            }
	            if (peg$cachedPos !== pos) {
	              if (peg$cachedPos > pos) {
	                peg$cachedPos = 0;
	                peg$cachedPosDetails = {
	                  line: 1,
	                  column: 1,
	                  seenCR: false
	                };
	              }
	              advance(peg$cachedPosDetails, peg$cachedPos, pos);
	              peg$cachedPos = pos;
	            }
	            return peg$cachedPosDetails;
	          }

	          function peg$fail(expected) {
	            if (peg$currPos < peg$maxFailPos) {
	              return;
	            }
	            if (peg$currPos > peg$maxFailPos) {
	              peg$maxFailPos = peg$currPos;
	              peg$maxFailExpected = [];
	            }
	            peg$maxFailExpected.push(expected);
	          }

	          function peg$buildException(message, expected, pos) {
	            function cleanupExpected(expected) {
	              var i = 1;
	              expected.sort(function (a, b) {
	                if (a.description < b.description) {
	                  return -1;
	                }
	                else if (a.description > b.description) {
	                  return 1;
	                }
	                else {
	                  return 0;
	                }
	              });
	              while (i < expected.length) {
	                if (expected[i - 1] === expected[i]) {
	                  expected.splice(i, 1);
	                }
	                else {
	                  i++;
	                }
	              }
	            }

	            function buildMessage(expected, found) {
	              function stringEscape(s) {
	                function hex(ch) {
	                  return ch.charCodeAt(0).toString(16).toUpperCase();
	                }
	                return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
	                  return '\\x0' + hex(ch);
	                }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
	                  return '\\x' + hex(ch);
	                }).replace(/[\u0180-\u0FFF]/g, function (ch) {
	                  return '\\u0' + hex(ch);
	                }).replace(/[\u1080-\uFFFF]/g, function (ch) {
	                  return '\\u' + hex(ch);
	                });
	              }
	              var expectedDescs = new Array(expected.length),
	                  expectedDesc, foundDesc, i;
	              for (i = 0; i < expected.length; i++) {
	                expectedDescs[i] = expected[i].description;
	              }
	              expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];
	              foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";
	              return "Expected " + expectedDesc + " but " + foundDesc + " found.";
	            }
	            var posDetails = peg$computePosDetails(pos),
	                found = pos < input.length ? input.charAt(pos) : null;
	            if (expected !== null) {
	              cleanupExpected(expected);
	            }
	            return new SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, pos, posDetails.line, posDetails.column);
	          }

	          function peg$decode(s) {
	            var bc = new Array(s.length),
	                i;
	            for (i = 0; i < s.length; i++) {
	              bc[i] = s.charCodeAt(i) - 32;
	            }
	            return bc;
	          }

	          function peg$parseRule(index) {
	            var bc = peg$bytecode[index],
	                ip = 0,
	                ips = [],
	                end = bc.length,
	                ends = [],
	                stack = [],
	                params, i;

	            function protect(object) {
	              return Object.prototype.toString.apply(object) === "[object Array]" ? [] : object;
	            }
	            while (true) {
	              while (ip < end) {
	                switch (bc[ip]) {
	                case 0:
	                  stack.push(protect(peg$consts[bc[ip + 1]]));
	                  ip += 2;
	                  break;
	                case 1:
	                  stack.push(peg$currPos);
	                  ip++;
	                  break;
	                case 2:
	                  stack.pop();
	                  ip++;
	                  break;
	                case 3:
	                  peg$currPos = stack.pop();
	                  ip++;
	                  break;
	                case 4:
	                  stack.length -= bc[ip + 1];
	                  ip += 2;
	                  break;
	                case 5:
	                  stack.splice(-2, 1);
	                  ip++;
	                  break;
	                case 6:
	                  stack[stack.length - 2].push(stack.pop());
	                  ip++;
	                  break;
	                case 7:
	                  stack.push(stack.splice(stack.length - bc[ip + 1], bc[ip + 1]));
	                  ip += 2;
	                  break;
	                case 8:
	                  stack.pop();
	                  stack.push(input.substring(stack[stack.length - 1], peg$currPos));
	                  ip++;
	                  break;
	                case 9:
	                  ends.push(end);
	                  ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);
	                  if (stack[stack.length - 1]) {
	                    end = ip + 3 + bc[ip + 1];
	                    ip += 3;
	                  }
	                  else {
	                    end = ip + 3 + bc[ip + 1] + bc[ip + 2];
	                    ip += 3 + bc[ip + 1];
	                  }
	                  break;
	                case 10:
	                  ends.push(end);
	                  ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);
	                  if (stack[stack.length - 1] === peg$FAILED) {
	                    end = ip + 3 + bc[ip + 1];
	                    ip += 3;
	                  }
	                  else {
	                    end = ip + 3 + bc[ip + 1] + bc[ip + 2];
	                    ip += 3 + bc[ip + 1];
	                  }
	                  break;
	                case 11:
	                  ends.push(end);
	                  ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);
	                  if (stack[stack.length - 1] !== peg$FAILED) {
	                    end = ip + 3 + bc[ip + 1];
	                    ip += 3;
	                  }
	                  else {
	                    end = ip + 3 + bc[ip + 1] + bc[ip + 2];
	                    ip += 3 + bc[ip + 1];
	                  }
	                  break;
	                case 12:
	                  if (stack[stack.length - 1] !== peg$FAILED) {
	                    ends.push(end);
	                    ips.push(ip);
	                    end = ip + 2 + bc[ip + 1];
	                    ip += 2;
	                  }
	                  else {
	                    ip += 2 + bc[ip + 1];
	                  }
	                  break;
	                case 13:
	                  ends.push(end);
	                  ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);
	                  if (input.length > peg$currPos) {
	                    end = ip + 3 + bc[ip + 1];
	                    ip += 3;
	                  }
	                  else {
	                    end = ip + 3 + bc[ip + 1] + bc[ip + 2];
	                    ip += 3 + bc[ip + 1];
	                  }
	                  break;
	                case 14:
	                  ends.push(end);
	                  ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);
	                  if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length) === peg$consts[bc[ip + 1]]) {
	                    end = ip + 4 + bc[ip + 2];
	                    ip += 4;
	                  }
	                  else {
	                    end = ip + 4 + bc[ip + 2] + bc[ip + 3];
	                    ip += 4 + bc[ip + 2];
	                  }
	                  break;
	                case 15:
	                  ends.push(end);
	                  ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);
	                  if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length).toLowerCase() === peg$consts[bc[ip + 1]]) {
	                    end = ip + 4 + bc[ip + 2];
	                    ip += 4;
	                  }
	                  else {
	                    end = ip + 4 + bc[ip + 2] + bc[ip + 3];
	                    ip += 4 + bc[ip + 2];
	                  }
	                  break;
	                case 16:
	                  ends.push(end);
	                  ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);
	                  if (peg$consts[bc[ip + 1]].test(input.charAt(peg$currPos))) {
	                    end = ip + 4 + bc[ip + 2];
	                    ip += 4;
	                  }
	                  else {
	                    end = ip + 4 + bc[ip + 2] + bc[ip + 3];
	                    ip += 4 + bc[ip + 2];
	                  }
	                  break;
	                case 17:
	                  stack.push(input.substr(peg$currPos, bc[ip + 1]));
	                  peg$currPos += bc[ip + 1];
	                  ip += 2;
	                  break;
	                case 18:
	                  stack.push(peg$consts[bc[ip + 1]]);
	                  peg$currPos += peg$consts[bc[ip + 1]].length;
	                  ip += 2;
	                  break;
	                case 19:
	                  stack.push(peg$FAILED);
	                  if (peg$silentFails === 0) {
	                    peg$fail(peg$consts[bc[ip + 1]]);
	                  }
	                  ip += 2;
	                  break;
	                case 20:
	                  peg$reportedPos = stack[stack.length - 1 - bc[ip + 1]];
	                  ip += 2;
	                  break;
	                case 21:
	                  peg$reportedPos = peg$currPos;
	                  ip++;
	                  break;
	                case 22:
	                  params = bc.slice(ip + 4, ip + 4 + bc[ip + 3]);
	                  for (i = 0; i < bc[ip + 3]; i++) {
	                    params[i] = stack[stack.length - 1 - params[i]];
	                  }
	                  stack.splice(stack.length - bc[ip + 2], bc[ip + 2], peg$consts[bc[ip + 1]].apply(null, params));
	                  ip += 4 + bc[ip + 3];
	                  break;
	                case 23:
	                  stack.push(peg$parseRule(bc[ip + 1]));
	                  ip += 2;
	                  break;
	                case 24:
	                  peg$silentFails++;
	                  ip++;
	                  break;
	                case 25:
	                  peg$silentFails--;
	                  ip++;
	                  break;
	                default:
	                  throw new Error("Invalid opcode: " + bc[ip] + ".");
	                }
	              }
	              if (ends.length > 0) {
	                end = ends.pop();
	                ip = ips.pop();
	              }
	              else {
	                break;
	              }
	            }
	            return stack[0];
	          } /*jshint laxcomma:false */

	          function trimWhitespace(ws) {
	            return trimNewLineChars(ws).replace(/(^[\r\n]+)|([\r\n]+$)/, " ");
	          }

	          function trimEnds(ws) {
	            return ws.replace(/(^\s+)|(\s+$)/, "").replace(/[\r\n]/g, "\\n");
	          }

	          function trimNewLineChars(ws) {
	            return ws.replace(/[ \r\n\t]+/g, " ");
	          }

	          function trimmedText() {
	            return trimWhitespace(text());
	          }

	          function attrValues(values) {
	            values = values.filter(function (v) {
	              return !/^[\n\t\r]+$/.test(v.value);
	            });
	            if (values.length === 1 && values[0].type === "string") {
	              return values[0];
	            }
	            else {
	              return values;
	            }
	          }

	          function trimTextExpressions(expressions) {
	            function _trim(exprs) {
	              var expr;
	              for (var i = exprs.length; i--;) {
	                expr = exprs[i];
	                if (expr.type == "textNode" && !/\S/.test(expr.value) && !expr.decoded) {
	                  exprs.splice(i, 1);
	                }
	                else {
	                  break;
	                }
	              }
	              return exprs;
	            }
	            return _trim(_trim(expressions.reverse()).reverse());
	          }

	          function expression(name) {
	            return Array.prototype.slice.call(arguments);
	          }

	          function escapeString(string) {
	            return string.replace(/[\n\r]+/g, "\\n").replace(/'/g, "\\'");
	          }
	          peg$result = peg$parseRule(peg$startRuleIndex);
	          if (peg$result !== peg$FAILED && peg$currPos === input.length) {
	            return peg$result;
	          }
	          else {
	            if (peg$result !== peg$FAILED && peg$currPos < input.length) {
	              peg$fail({
	                type: "end",
	                description: "end of input"
	              });
	            }
	            throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
	          }
	        }
	        return {
	          SyntaxError: SyntaxError,
	          parse: parse
	        };
	      })();
	    })(compiler = templ.compiler || (templ.compiler = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var vnode;
	    (function (vnode) {
	      var NodeSection = (function () {
	        function NodeSection(document, node) {
	          this.document = document;
	          this.node = node;
	        }
	        NodeSection.prototype.createMarker = function () {
	          return new NodeSectionMarker(this.document, vnode.getNodePath(this.node));
	        };
	        NodeSection.prototype.appendChild = function (node) {
	          this.node.appendChild(node);
	        };
	        NodeSection.prototype.render = function () {
	          return this.node;
	        };
	        NodeSection.prototype.remove = function () {
	          if (this.node.parentNode) this.node.parentNode.removeChild(this.node);
	        };
	        NodeSection.prototype.removeChildren = function () {
	          while (this.node.childNodes.length)
	          this.node.removeChild(this.node.childNodes[0]);
	        };
	        NodeSection.prototype.clone = function () {
	          return new NodeSection(this.document, this.node.cloneNode(true));
	        };
	        return NodeSection;
	      })();
	      vnode.NodeSection = NodeSection;
	      var NodeSectionMarker = (function () {
	        function NodeSectionMarker(document, path) {
	          this.document = document;
	          this.path = path;
	        }
	        NodeSectionMarker.prototype.createSection = function (root) {
	          return new NodeSection(this.document, this.findNode(root));
	        };
	        NodeSectionMarker.prototype.findNode = function (root) {
	          return vnode.getNodeByPath(root, this.path);
	        };
	        return NodeSectionMarker;
	      })();
	      vnode.NodeSectionMarker = NodeSectionMarker;
	    })(vnode = templ.vnode || (templ.vnode = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var vnode;
	    (function (vnode) {
	      var FragmentSection = (function () {
	        function FragmentSection(document, start, end) {
	          this.document = document;
	          this.start = start || document.createTextNode('');
	          this.end = end || document.createTextNode('');
	          if (!this.start.parentNode) {
	            var parent_1 = document.createDocumentFragment();
	            parent_1.appendChild(this.start);
	            parent_1.appendChild(this.end);
	          }
	        }
	        FragmentSection.prototype.appendChild = function (node) {
	          //console.log(document.body.appendChild(node))
	          this.end.parentNode.insertBefore(node, this.end);
	        };
	        FragmentSection.prototype.render = function () {
	          return this.start.parentNode;
	        };
	        FragmentSection.prototype.remove = function () {
	          var node = this.removeChildNodes();
	          node.insertBefore(this.start, node.childNodes[0]);
	          node.appendChild(this.end);
	          return this;
	        };
	        FragmentSection.prototype.removeChildNodes = function () {
	          var node = this.document.createDocumentFragment(),
	              start = this.start;
	          var current = start.nextSibling;
	          var end = this.end;
	          while (current !== end) {
	            node.appendChild(current);
	            current = start.nextSibling;
	          }
	          return node;
	        };
	        FragmentSection.prototype.createMarker = function () {
	          return new FragmentSectionMarker(this.document, vnode.getNodePath(this.start), vnode.getNodePath(this.end));
	        };
	        FragmentSection.prototype.clone = function () {
	          var parentClone;
	          // fragment?
	          if (this.start.parentNode.nodeType === 11) {
	            parentClone = this.start.parentNode.cloneNode(true);
	          }
	          else {
	            parentClone = this.document.createDocumentFragment();
	            var children = this._getChildNodes();
	            var n = children.length;
	            for (var i = 0; i < n; i++) {
	              parentClone.appendChild(children[i].cloneNode(true));
	            }
	          }
	          var first = parentClone.childNodes[0];
	          var last = parentClone.childNodes[parentClone.childNodes.length - 1];
	          return new FragmentSection(this.document, first, last);
	        };
	        FragmentSection.prototype._getChildNodes = function () {
	          var current = this.start;
	          var end = this.end.nextSibling;
	          var children = [];
	          while (current !== end) {
	            children.push(current);
	            current = current.nextSibling;
	          }
	          return children;
	        };
	        return FragmentSection;
	      })();
	      vnode.FragmentSection = FragmentSection;
	      var FragmentSectionMarker = (function () {
	        function FragmentSectionMarker(document, startPath, endPath) {
	          this.document = document;
	          this.startPath = startPath;
	          this.endPath = endPath;
	        }
	        FragmentSectionMarker.prototype.createSection = function (root) {
	          return new vnode.FragmentSection(this.document, vnode.getNodeByPath(root, this.startPath), vnode.getNodeByPath(root, this.endPath));
	        };
	        return FragmentSectionMarker;
	      })();
	      vnode.FragmentSectionMarker = FragmentSectionMarker;
	    })(vnode = templ.vnode || (templ.vnode = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var vnode;
	    (function (vnode) {
	      function section(document, node) {
	        var section;
	        if (node.nodeType == vnode.NodeType.Fragment) {
	          var frag = new vnode.FragmentSection(document);
	          frag.appendChild(node);
	          section = frag;
	        }
	        else {
	          section = new vnode.NodeSection(document, node);
	        }
	        return section;
	      }
	      vnode.section = section;
	    })(vnode = templ.vnode || (templ.vnode = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var vnode;
	    (function (vnode) {
	      var View = (function () {
	        function View(section, template, context, options) {
	          this.section = section;
	          this.template = template;
	          this.context = context;
	          this.bindings = [];
	        }
	        View.prototype.update = function () {
	          for (var _i = 0, _a = this.bindings; _i < _a.length; _i++) {
	            var binding_1 = _a[_i];
	            binding_1.update();
	          }
	        };
	        View.prototype.addListener = function (elm, eventName, callback, capture) {
	          if (capture === void 0) {
	            capture = false;
	          }
	          elm.addEventListener(eventName, callback, capture);
	        };
	        View.prototype.removeListener = function (elm, eventName, callback, capture) {
	          if (capture === void 0) {
	            capture = false;
	          }
	          elm.removeEventListener(eventName, callback, capture);
	        };
	        View.prototype.render = function () {
	          return this.section.render();
	        };
	        View.prototype.remove = function () {
	          for (var _i = 0, _a = this.bindings; _i < _a.length; _i++) {
	            var binding_2 = _a[_i];
	            binding_2.destroy();
	          }
	          return this.section.remove();
	        };
	        return View;
	      })();
	      vnode.View = View;
	    })(vnode = templ.vnode || (templ.vnode = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var vnode;
	    (function (vnode_1) {
	      var Template = (function () {
	        function Template(vnode, options) {
	          this._renderers = [];
	          this.vnode = vnode;
	          var node = vnode.render(options, this._renderers);
	          this.section = vnode_1.section(options.document, node);
	          this.options = options;
	        }
	        Template.prototype.view = function (context, options) {
	          var section = this.section.clone();
	          var DestView = this.options.viewClass || vnode_1.View;
	          var view = new DestView(section, this, context, options);
	          for (var _i = 0, _a = this._renderers; _i < _a.length; _i++) {
	            var renderer = _a[_i];
	            renderer.generate(section.node || section.start.parentNode, view);
	          }
	          return view;
	        };
	        return Template;
	      })();
	      vnode_1.Template = Template;

	      function template(vnode, options) {
	        return new Template(vnode, options);
	      }
	      vnode_1.template = template;
	    })(vnode = templ.vnode || (templ.vnode = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var vnode;
	    (function (vnode_2) {
	      (function (NodeType) {
	        NodeType[NodeType["Element"] = 1] = "Element";
	        NodeType[NodeType["Fragment"] = 11] = "Fragment";
	        NodeType[NodeType["Comment"] = 8] = "Comment";
	        NodeType[NodeType["Dynamic"] = -200] = "Dynamic";
	        NodeType[NodeType["Text"] = -201] = "Text";
	      })(vnode_2.NodeType || (vnode_2.NodeType = {}));
	      var NodeType = vnode_2.NodeType;

	      function getNodeByPath(root, path) {
	        var c = root;
	        for (var i = 0, n = path.length; i < n; i++) {
	          c = c.childNodes[path[i]];
	        }
	        return c;
	      }
	      vnode_2.getNodeByPath = getNodeByPath;

	      function getNodePath(node) {
	        var path = [];
	        var p = node.parentNode;
	        var c = node;
	        while (p) {
	          path.unshift(Array.prototype.indexOf.call(p.childNodes, c));
	          c = p;
	          p = p.parentNode;
	          // virtual nodes - must be skipped
	          while (p && p.nodeType > 12)
	          p = p.parentNode;
	        }
	        return path;
	      }
	      vnode_2.getNodePath = getNodePath;
	    })(vnode = templ.vnode || (templ.vnode = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var compiler;
	    (function (compiler) {
	      function transpile(source) {
	        var transpiler = new Transpiler();
	        return transpiler.transpile(source);
	      }
	      compiler.transpile = transpile;
	      /**
	       * Transpile AST to Function
	       */
	      var Transpiler = (function () {
	        function Transpiler() {
	          for (var k in this) {
	            if (k.charAt(0) === "_") {
	              this[k] = this[k].bind(this);
	            }
	          }
	          this.transpile = this.transpile.bind(this);
	        }
	        /**
	         */
	        Transpiler.prototype.transpile = function (source) {
	          return this._root(compiler.parser.parse(source));
	        };
	        /**
	         */
	        Transpiler.prototype._root = function (elements) {
	          var buffer = "(function(fragment, element, text, comment, dynamic, createBindingClass) {";
	          var fragment = "fragment([" + this._children(elements) + "])";
	          buffer += "'use strict';return " + fragment;
	          buffer += "})";
	          return buffer;
	        };
	        /**
	         */
	        Transpiler.prototype._expression = function (expression) {
	          return this["_" + expression[0]](expression);
	        };
	        /**
	         * check for stuff like <li repeat.each={{items}}></li>
	         */
	        Transpiler.prototype._element = function (expression) {
	          var exprs = {};
	          var prev = expression;
	          var attrs = [];
	          expression[2].forEach(function (attr, i) {
	            var key = attr[1];
	            var value = attr[2];
	            var keyParts = key.split(".");
	            // check for things like <li repeat.each={{items}}></li>
	            if (keyParts.length > 1) {
	              if (!exprs[keyParts[0]]) {
	                expression = exprs[keyParts[0]] = ["element", keyParts[0],
	                  [],
	                  [
	                    ["element", expression[1], attrs, expression[3]]
	                  ]
	                ];
	              }
	              exprs[keyParts[0]][2].push([attr[0], keyParts[1], value]);
	            }
	            else {
	              attrs.push(attr);
	            }
	          });
	          return this._element2(expression);
	        };
	        /**
	         */
	        Transpiler.prototype._doctype = function (expression) {
	          return "text('<!DOCTYPE " + expression[1] + ">')";
	        };
	        /**
	         */
	        Transpiler.prototype._children = function (children) {
	          var items = [];
	          children = children.concat();
	          while (children.length) {
	            var child = children[children.length - 1];
	            if (child[0] !== "text") break;
	            child[1] = child[1].replace(/[\s\r\n\t]+$/, "");
	            if (/^[\s\r\n\t]*$/.test(child[1])) {
	              children.pop();
	            }
	            else {
	              break;
	            }
	          }
	          return children.map(this._expression).join(", ");
	        };
	        /**
	         */
	        Transpiler.prototype._element2 = function (expression) {
	          var buffer = "element('" + expression[1] + "'";
	          var dynamicAttributes = [];
	          buffer += ", {";
	          var attrs = [];
	          buffer += expression[2].map(function (attr) {
	            var key = attr[1];
	            var value = attr[2];
	            if (!value.length || (value.length === 1 && value[0][0] === "string")) {
	              return "'" + key + "':" + (value.length ? this._expression(value[0]) : "true");
	            }
	            else {
	              dynamicAttributes.push(attr);
	            }
	          }.bind(this)).filter(function (str) {
	            return !!str;
	          }).join(",");
	          buffer += "}";
	          var childBuffer = this._children(expression[3]);
	          if (childBuffer.length) {
	            buffer += ", " + childBuffer;
	          }
	          buffer += ")";
	          if (dynamicAttributes.length) {
	            var dynamicAttrBuffer = "";
	            var staticAttrBuffer = "";
	            dynamicAttributes.forEach(function (expression) {
	              var type = expression[0];
	              // var key  = _dashToCamelCase(expression[1]);
	              dynamicAttrBuffer += "this";
	              if (type === "block") {
	                dynamicAttrBuffer += ".ref.nodeValue = " + this._expression(expression[1]);
	              }
	              else if (type === "attribute") {
	                var value = expression[2].map(function (expr) {
	                  return "(" + this._expression(expr) + ")";
	                }.bind(this)).join("+");
	                dynamicAttrBuffer += ".setAttribute('" + expression[1] + "', " + value + ");";
	              }
	              else if (type === "property") {
	                // dynamicAttrBuffer += ".ref." + expression[1] + "=" + this._expression(expression[2]);
	                dynamicAttrBuffer += ".setProperty('" + expression[1] + "', " + this._expression(expression[2]) + ");";
	              }
	            }.bind(this));
	            if (dynamicAttrBuffer.length) {
	              dynamicAttrBuffer = "function(context) {" + dynamicAttrBuffer + "}";
	            }
	            if (staticAttrBuffer.length) {
	              staticAttrBuffer = "function() { var self = this; " + staticAttrBuffer + "}";
	            }
	            if (dynamicAttrBuffer.length || staticAttrBuffer.length) {
	              buffer = "dynamic(" + buffer + ",";
	              buffer += "createBindingClass(" + (staticAttrBuffer.length ? staticAttrBuffer : "void 0") + ", " + (dynamicAttrBuffer ? dynamicAttrBuffer : "void 0") + ")";
	              buffer += ")";
	            }
	          }
	          return buffer;
	        };
	        /**
	         */
	        Transpiler.prototype.__addReference = function (expression) {
	          var name = "_" + (++this._refCounter);
	          this._refs[name] = expression;
	          return name;
	        };
	        /**
	         */
	        Transpiler.prototype._block = function (expression) {
	          // TODO - check for unbound expressions here
	          var buffer = "dynamic(text(), createBindingClass(void 0, function(context) {";
	          buffer += "this.ref.nodeValue = " + this._expression(expression[1]) + ";";
	          return buffer + "}))";
	        };
	        /**
	         */
	        Transpiler.prototype._text = function (expression) {
	          return "text('" + expression[1] + "')";
	        };
	        /**
	         */
	        Transpiler.prototype._comment = function (expression) {
	          return "comment('" + expression[1] + "')";
	        };
	        /**
	         */
	        Transpiler.prototype._hash = function (expression) {
	          var items = expression[1];
	          var buffer = [];
	          for (var key in items) {
	            buffer.push("'" + key + "':" + this._expression(items[key]));
	          }
	          return "{" + buffer.join(",") + "}";
	        };
	        /**
	         */
	        Transpiler.prototype._script = function (expression) {
	          return this._expression(expression[1]);
	        };
	        /**
	         */
	        Transpiler.prototype._referenceKeyPath = function (expression) {
	          var keypath = [];
	          var isDynamic = false;
	          expression.forEach(function (part) {
	            if (typeof part !== "string") {
	              isDynamic = true;
	              // console.log(expression);
	              keypath.push(this._expression(part));
	            }
	            else {
	              keypath.push(part);
	            }
	          }.bind(this));
	          keypath = (isDynamic ? "[" + keypath.map(function (part, i) {
	            return typeof expression[i] === "string" ? "'" + part + "'" : part;
	          }).join(",") + "]" : "'" + keypath.join(".") + "'");
	          return keypath;
	        };
	        /**
	         */
	        Transpiler.prototype._reference = function (expression) {
	          var keypath = this._referenceKeyPath(expression[1]);
	          if (expression[2]) {
	            var gettable = !! ~expression[2].indexOf("<~");
	            var settable = !! ~expression[2].indexOf("~>");
	            return "this.view.ref(" + keypath + ", " + gettable + ", " + settable + ")";
	          }
	          return "this.view.get(" + keypath + ")";
	        };
	        /**
	         */
	        Transpiler.prototype._string = function (expression) {
	          return "'" + expression[1] + "'";
	        };
	        /**
	         */
	        Transpiler.prototype._operator = function (expression) {
	          return this._expression(expression[2]) + expression[1] + this._expression(expression[3]);
	        };
	        /**
	         */
	        Transpiler.prototype._condition = function (expression) {
	          return this._expression(expression[1]) + "?" + this._expression(expression[2]) + ":" + this._expression(expression[3]);
	        };
	        /**
	         */
	        Transpiler.prototype._literal = function (expression) {
	          return expression[1];
	        };
	        /**
	         */
	        Transpiler.prototype._not = function (expression) {
	          return "!" + this._expression(expression[1]);
	        };
	        /**
	         */
	        Transpiler.prototype._negative = function (expression) {
	          return "-" + this._expression(expression[1]);
	        };
	        /**
	         */
	        Transpiler.prototype._call = function (expression) {
	          var buffer = "this.view.call(" + this._referenceKeyPath(expression[1][1]) + ", [";
	          buffer += expression[2].map(this._expression).join(",");
	          return buffer + "])";
	        };
	        /**
	         */
	        Transpiler.prototype._modifier = function (expression) {
	          return "this.options.modifiers." + expression[1] + "(" + expression[2].map(this._expression).join(",") + ")";
	        };
	        Transpiler.prototype._assign = function (expression) {
	          return 'this.view.assign("' + expression[1][1] + '", ' + 'function () { return ' + this._expression(expression[2]) + ';})';
	        };
	        /**
	         */
	        Transpiler.prototype._group = function (expression) {
	          return "(" + this._expression(expression[1]) + ")";
	        };
	        /**
	         */
	        Transpiler.prototype.__findExpressions = function (type, expr) {
	          var exprs = [];
	          this.__traverse(expr, function (expr) {
	            if (expr[0] === type) exprs.push(expr);
	          });
	          return exprs;
	        };
	        /**
	         */
	        Transpiler.prototype.__traverse = function (expr, iterator) {
	          iterator(expr);
	          expr.forEach(function (v) {
	            if (v && typeof v === "object") {
	              this.__traverse(v, iterator);
	            }
	          }.bind(this));
	        };
	        return Transpiler;
	      })();
	    })(compiler = templ.compiler || (templ.compiler = {}));
	  })(templ || (templ = {}));
	  /**
	   */

	  function _dashToCamelCase(string) {
	    return string.split("-").map(function (part, i) {
	      var p = part.toLowerCase();
	      return i > 0 ? p.charAt(0).toUpperCase() + p.substr(1) : p;
	    }).join("");
	  }
	  /**
	   */
	  var templ;
	  (function (templ) {
	    var compiler;
	    (function (compiler) {
	      function compile(src, options) {
	        var str = compiler.transpile(src);
	        return new Function("return " + str)();
	      }
	      compiler.compile = compile;
	    })(compiler = templ.compiler || (templ.compiler = {}));
	  })(templ || (templ = {}));
	  var utils;
	  (function (utils) {
	    function extend(obj) {
	      var args = [];
	      for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	      }
	      var a, k;
	      for (var _a = 0; _a < args.length; _a++) {
	        a = args[_a];
	        if (a !== Object(a)) continue;
	        for (k in a)
	        obj[k] = a[k];
	      }
	      return obj;
	    }
	    utils.extend = extend;

	    function slice(obj) {
	      var args = [];
	      for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	      }
	      return Array.prototype.slice.apply(obj, args);
	    }
	    utils.slice = slice;

	    function extendClass(parent, protoProps, staticProps) {
	      var child;
	      // The constructor function for the new subclass is either defined by you
	      // (the "constructor" property in your `extend` definition), or defaulted
	      // by us to simply call the parent constructor.
	      if (protoProps && Object.prototype.hasOwnProperty.call(protoProps, 'constructor')) {
	        child = protoProps.constructor;
	      }
	      else {
	        child = function () {
	          return parent.apply(this, arguments);
	        };
	      }
	      // Add static properties to the constructor function, if supplied.
	      extend(child, parent, staticProps);
	      // Set the prototype chain to inherit from `parent`, without calling
	      // `parent` constructor function.
	      var Surrogate = function () {
	        this.constructor = child;
	      };
	      Surrogate.prototype = parent.prototype;
	      child.prototype = new Surrogate;
	      // Add prototype properties (instance properties) to the subclass,
	      // if supplied.
	      if (protoProps) extend(child.prototype, protoProps);
	      // Set a convenience property in case the parent's prototype is needed
	      // later.
	      child.__super__ = parent.prototype;
	      return child;
	    }
	    utils.extendClass = extendClass;;
	    var nativeBind = Function.prototype.bind;

	    function bind(method, context) {
	      var args = [];
	      for (var _i = 2; _i < arguments.length; _i++) {
	        args[_i - 2] = arguments[_i];
	      }
	      if (typeof method !== 'function') throw new Error('method not at function');
	      if (nativeBind != null) return nativeBind.call.apply(nativeBind, [method, context].concat(args));
	      args = args || [];
	      var fnoop = function () {};
	      var fBound = function () {
	        var ctx = this instanceof fnoop ? this : context;
	        return method.apply(ctx, args.concat(utils.slice(arguments)));
	      };
	      fnoop.prototype = this.prototype;
	      fBound.prototype = new fnoop();
	      return fBound;
	    }
	    utils.bind = bind;
	    var Debug = (function () {
	      function Debug(namespace) {
	        this.enabled = false;
	        this.namespace = namespace;
	      }
	      Debug.enable = function (enabled, namespace) {
	        for (var k in this.loggers) {
	          if (namespace && k === namespace) {
	            this.loggers[k].enabled = enabled;
	          }
	          else if (!namespace) {
	            this.loggers[k].enabled = enabled;
	          }
	        }
	      };
	      Debug.create = function (namespace) {
	        var logger;
	        if (this.loggers[namespace]) {
	          logger = this.loggers[namespace].debug;
	        }
	        else {
	          logger = new Debug(namespace);
	          this.loggers[namespace] = logger;
	        }
	        return bind(logger.debug, logger);
	      };
	      Debug.prototype.debug = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	          args[_i - 0] = arguments[_i];
	        }
	        if (!this.enabled) return;
	        args[0] = this._coerce(args[0]);
	        if ('string' !== typeof args[0]) {
	          // anything else let's inspect with %o
	          args = ['%o'].concat(args);
	        }
	        // apply any `formatters` transformations
	        var index = 0;
	        args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
	          // if we encounter an escaped % then don't increase the array index
	          if (match === '%%') return match;
	          index++;
	          var formatter = Debug.formatters[format];
	          if ('function' === typeof formatter) {
	            var val = args[index];
	            match = formatter.call(self, val);
	            // now we need to remove `args[index]` since it's inlined in the `format`
	            args.splice(index, 1);
	            index--;
	          }
	          return match;
	        });
	        args = this._formatArgs(args);
	        this._log.apply(this, args);
	      };
	      Debug.prototype._log = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	          args[_i - 0] = arguments[_i];
	        }
	        return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
	      };
	      Debug.prototype._coerce = function (val) {
	        if (val instanceof Error) return val.stack || val.message;
	        return val;
	      };
	      Debug.prototype._formatArgs = function (args) {
	        args[0] = '[templ:' + this.namespace + '] ' + args[0];
	        return args;
	      };
	      Debug.loggers = {};
	      Debug.formatters = {
	        j: function (args) {
	          return JSON.stringify(args);
	        }
	      };
	      return Debug;
	    })();
	    utils.Debug = Debug;

	    function debug(namespace) {
	      return Debug.create(namespace);
	    }
	    utils.debug = debug;
	  })(utils || (utils = {}));
	  var templ;
	  (function (templ) {
	    var Binding = (function () {
	      function Binding(ref, view) {
	        this._attributeClasses = {};
	        this._attrBindings = {};
	        this.ref = ref;
	        this.view = view;
	        this.options = view.template.options;
	        this._attributeClasses = this.options.attributes;
	      }
	      Binding.prototype.setAttribute = function (key, value) {
	        if (!this.setAsRegisteredAttribute(key, value)) {
	          if (value != void 0) {
	            this.ref.setAttribute(key, value);
	          }
	          else {}
	        }
	      };
	/*setProperty (key:string, value:string) {
	          if (!this.setAsRegisteredAttribute(key, value)) {
	    
	            // no node type? It's a registered component.
	            if (!this.ref.nodeType) {
	              this.ref.setAttribute(key, value);
	            } else {
	              this.ref[key] = value;
	            }
	          }
	        }*/
	      Binding.prototype.setAsRegisteredAttribute = function (key, value) {
	        if (this._attrBindings[key]) {
	          this._attrBindings[key].value = value;
	        }
	        else {
	          var attrClass = this._attributeClasses[key];
	          if (attrClass) {
	            this._attrBindings[key] = new attrClass(this.ref, key, value, this.view);
	          }
	          else {
	            return false;
	          }
	        }
	        return true;
	      };
	      Binding.prototype.update = function (context) {
	        this._update();
	        for (var key in this._attrBindings) {
	          this._attrBindings[key].update();
	        }
	      };
	      Binding.prototype.destroy = function () {
	        for (var key in this._attrBindings) {
	          this._attrBindings[key].destroy();
	        }
	      };
	      return Binding;
	    })();
	    templ.Binding = Binding;

	    function binding(initialize, update) {
	      return utils.extendClass(Binding, {
	        initialize: initialize ||
	        function () {},
	        _update: update ||
	        function () {}
	      });
	    }
	    templ.binding = binding;
	  })(templ || (templ = {}));
	  var __extends = (this && this.__extends) ||
	  function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];

	    function __() {
	      this.constructor = d;
	    }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	  };
	  var debug = utils.debug('view');

	  function _set(target, keypath, value) {
	    var keys = typeof keypath === "string" ? keypath.split(".") : keypath;
	    var ct = target;
	    var key;
	    for (var i = 0, n = keys.length - 1; i < n; i++) {
	      key = keys[i];
	      if (!ct[key]) {
	        ct[key] = {};
	      }
	      ct = ct[key];
	    }
	    ct[keys[keys.length - 1]] = value;
	    return value;
	  }
	  var templ;
	  (function (templ) {
	    var Reference = (function () {
	      function Reference(view, path, gettable, settable) {
	        this.gettable = gettable;
	        this.settable = settable;
	        this.view = view;
	        this.path = path;
	      }
	      Reference.prototype.value = function (value) {
	        if (arguments.length === 0) {
	          return this.gettable ? this.view.get(this.path) : void 0;
	        }
	        if (this.settable) this.view.set(this.path, value);
	      };
	      Reference.prototype.toString = function () {
	        return this.view.get(this.path) || '';
	      };
	      return Reference;
	    })();
	    templ.Reference = Reference;
	    var Assignment = (function () {
	      function Assignment(view, path, value) {
	        this.view = view;
	        this.path = path;
	        this.value = value;
	        this.assign = utils.bind(this.assign, this);
	        this.toString = utils.bind(this.toString, this);
	      }
	      Assignment.prototype.assign = function (value) {
	        this.view.set(this.path, this.value.call(this));
	      };
	      Assignment.prototype.toString = function () {
	        var val = this.value.call(this);
	        return val ? String(val) : '';
	      };
	      return Assignment;
	    })();
	    templ.Assignment = Assignment;
	    var View = (function (_super) {
	      __extends(View, _super);

	      function View(section, template, context, options) {
	        if (options === void 0) {
	          options = {};
	        }
	        _super.call(this, section, template, context, options);
	        this.context = context;
	        this._callers = {};
	        this._getters = {};
	        if (options.parent) {
	          this.parent = options.parent;
	        }
	        if (options.delegator) {
	          this._delegator = options._delegator;
	        }
	      }
	      Object.defineProperty(View.prototype, "root", {
	        get: function () {
	          if (this.parent == null) return this;
	          var root = this,
	              tmp = root;
	          while (tmp) {
	            tmp = tmp.parent;
	            if (tmp) root = tmp;
	          }
	          return root;
	        },
	        enumerable: true,
	        configurable: true
	      });
	      View.prototype._getDelegator = function () {
	        if (this._delegator) return this._delegator;
	        var parent = this.parent;
	        while (parent) {
	          console.log('paernt');
	          if (parent._delegator) return parent._delegator;
	          parent = parent.parent;
	        }
	        return null;
	      };
	      View.prototype.addListener = function (elm, eventName, callback, capture) {
	        if (capture === void 0) {
	          capture = false;
	        }
	        var delegator = this._getDelegator();
	        if (delegator) {
	          delegator.addListener(elm, eventName, callback, capture);
	        }
	        else {
	          _super.prototype.addListener.call(this, elm, eventName, callback, capture);
	        }
	      };
	      View.prototype.removeListener = function (elm, eventName, callback, capture) {
	        if (capture === void 0) {
	          capture = false;
	        }
	        var delegator = this._getDelegator();
	        if (delegator) {
	          this._delegator.removeListener(elm, eventName, callback, capture);
	        }
	        else {
	          _super.prototype.removeListener.call(this, elm, eventName, callback, capture);
	        }
	      };
	      View.prototype.get = function (keypath) {
	        if (!this.context) return void 0;
	        var pt = typeof keypath !== "string" ? keypath.join(".") : keypath;
	        var v;
	        try {
	          var getter;
	          if (!(getter = this._getters[pt])) {
	            getter = this._getters[pt] = new Function("return this." + pt);
	          }
	          v = getter.call(this.context);
	        }
	        catch (e) {
	          v = void 0;
	        }
	        v = v != void 0 ? v : this.parent ? this.parent.get(keypath) : void 0;
	        debug('get value "%s": %s', keypath, v);
	        return v;
	      };
	      View.prototype.set = function (path, value) {
	        debug('set value %s on context %j', value, this.context);
	        if (!this.context) return void 0;
	        if (typeof path === "string") path = path.split(".");
	        var ret = _set(this.context, path, value);
	        this.update();
	      };
	      View.prototype.render = function () {
	        this.update();
	        var section = _super.prototype.render.call(this);
	        //this.transitions.enter();
	        return section;
	      };
	      View.prototype.ref = function (path, gettable, settable) {
	        debug('reference %s, gettable: %o, settabble: %o', path, gettable, settable);
	        return new Reference(this, path, gettable, settable);
	      };
	      View.prototype.assign = function (path, value) {
	        debug('assignment %s %s', path, value);
	        return new Assignment(this, path, value);
	      };
	      View.prototype.call = function (keypath, params) {
	        var caller;
	        var v;
	        debug('call keypath "%s", args: "%o"', keypath, params);
	        if (typeof keypath !== "string") keypath = keypath.join(".");
	        if (!(caller = this._callers[keypath])) {
	          var ctxPath = ["this"].concat(keypath.split("."));
	          ctxPath.pop();
	          caller = this._callers[keypath] = new Function("params", "return this." + keypath + ".apply(" + ctxPath.join(".") + ", params);");
	        }
	        try {
	          v = caller.call(this.context, params);
	        }
	        catch (e) {
	          console.error('could not call', e);
	        }
	        return v != void 0 ? v : this.parent ? this.parent.call(keypath, params) : void 0;
	      };
	      return View;
	    })(templ.vnode.View);
	    templ.View = View;
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var vnode;
	    (function (vnode) {
	      var Comment = (function () {
	        function Comment(nodeValue) {
	          this.nodeType = vnode.NodeType.Comment;
	          this.nodeValue = nodeValue;
	        }
	        Comment.prototype.render = function (options) {
	          return options.document.createComment(this.nodeValue);
	        };
	        return Comment;
	      })();
	      vnode.Comment = Comment;
	      vnode.comment = function (nodeValue) {
	        return new Comment(nodeValue);
	      };
	    })(vnode = templ.vnode || (templ.vnode = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var vnode;
	    (function (vnode_3) {
	      var Dynamic = (function () {
	        function Dynamic(vnode, bindingClass) {
	          this.nodeType = vnode_3.NodeType.Dynamic;
	          this.vnode = vnode;
	          this.bindingClass = bindingClass;
	          this.vnode.parentNode = this;
	        }
	        Dynamic.prototype.render = function (options, renderers) {
	          if (options.components[this.vnode['tagName']]) {
	            return this._renderComponent(options, renderers);
	          }
	          else {
	            return this._renderElement(options, renderers);
	          }
	        };
	        Dynamic.prototype._renderElement = function (options, renderers) {
	          var node = this.vnode.render(options, renderers);
	          renderers.push(new DynamicRenderer(node, this.bindingClass, options));
	          return node;
	        };
	        Dynamic.prototype._renderComponent = function (options, renderers) {
	          var _r = [];
	          var element = this.vnode.render(options, _r);
	          renderers.push(new DynamicComponentRenderer(_r[0], this.bindingClass, options));
	          return element;
	        };
	        return Dynamic;
	      })();
	      vnode_3.Dynamic = Dynamic;
	      vnode_3.dynamic = function (vnode, bindClass) {
	        return new Dynamic(vnode, bindClass);
	      };
	      var DynamicComponentRenderer = (function () {
	        function DynamicComponentRenderer(renderer, bindingClass, options) {
	          this.renderer = renderer;
	          this.bindingClass = bindingClass;
	          this.options = options;
	        }
	        DynamicComponentRenderer.prototype.generate = function (root, view) {
	          this.renderer.generate(root, view);
	          var component = view.bindings[view.bindings.length - 1];
	          view.bindings.splice(view.bindings.indexOf(component), 0, new this.bindingClass(component, view));
	        };
	        return DynamicComponentRenderer;
	      })();
	      var DynamicRenderer = (function () {
	        function DynamicRenderer(node, bindingClass, options) {
	          this.ref = node;
	          this.bindingClass = bindingClass;
	          this.options = options;
	        }
	        DynamicRenderer.prototype.generate = function (root, view) {
	          if (!this._refPath) this._refPath = vnode.getNodePath(this.ref);
	          view.bindings.push(new this.bindingClass(vnode.getNodeByPath(root, this._refPath), view));
	        };
	        return DynamicRenderer;
	      })();
	    })(vnode = templ.vnode || (templ.vnode = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var vnode;
	    (function (vnode) {
	      var Element = (function () {
	        function Element(tagName, attributes, children) {
	          this.nodeType = vnode.NodeType.Element;
	          this.tagName = String(tagName).toLocaleLowerCase();
	          this.childNodes = children;
	          this.attributes = attributes || {};
	          for (var i = 0; i < children.length; i++)
	          children[i].parentNode = this;
	        }
	        Element.prototype.render = function (options, renderers) {
	          var components = options.components || {};
	          if (components[this.tagName]) {
	            return this._renderComponent(components[this.tagName], options, renderers);
	          }
	          return this._renderElement(options, renderers);
	        };
	        Element.prototype.setAttributes = function (key, value) {
	          if (typeof key === 'string') {
	            this.attributes[key] = value;
	          }
	          else {
	            utils.extend(this.attributes, key);
	          }
	        };
	        Element.prototype._renderComponent = function (component, options, renderers) {
	          var section = new vnode.FragmentSection(options.document);
	          renderers.push(new ComponentAttributeRenderer(component, section, this, this._splitAttributes(options), options));
	          return section.render();
	        };
	        Element.prototype._renderElement = function (options, renderers) {
	          var element = options.document.createElement(this.tagName);
	          var _attr = this._splitAttributes(options);
	          // Set static attributes
	          for (var attrKey in _attr.staticAttributes) {
	            element.setAttribute(attrKey, _attr.staticAttributes[attrKey]);
	          }
	          for (var _i = 0, _a = this.childNodes; _i < _a.length; _i++) {
	            var child = _a[_i];
	            element.appendChild(child.render(options, renderers));
	          }
	          // Set dynamic attributes
	          if (Object.keys(_attr.dynamicAttributes).length) {
	            renderers.push(new ElementAttributeRenderer(new vnode.NodeSection(options.document, element), options, _attr.dynamicAttributes));
	          }
	          return element;
	        };
	        Element.prototype._splitAttributes = function (options) {
	          var dynamicAttributes = {};
	          var staticAttributes = {};
	          if (options.attributes) {
	            for (var key in this.attributes) {
	              var attrClass = options.attributes[key];
	              if (attrClass && (!attrClass.test || attrClass.test(this, key, this.attributes[key]))) {
	                dynamicAttributes[key] = this.attributes[key];
	              }
	              else {
	                staticAttributes[key] = this.attributes[key];
	              }
	            }
	          }
	          else {
	            staticAttributes = this.attributes;
	          }
	          return {
	            dynamicAttributes: dynamicAttributes,
	            staticAttributes: staticAttributes
	          };
	        };
	        return Element;
	      })();
	      vnode.Element = Element;
	      vnode.element = function (tagName, attributes) {
	        var children = [];
	        for (var _i = 2; _i < arguments.length; _i++) {
	          children[_i - 2] = arguments[_i];
	        }
	        return new Element(tagName, attributes, children);
	      };
	      var ComponentAttributeRenderer = (function () {
	        function ComponentAttributeRenderer(component, section, element, attr, options) {
	          this.section = section;
	          this.componentClass = component;
	          this.element = element;
	          this.options = options;
	          this.attributes = attr.staticAttributes;
	          this.dynamicAttributes = attr.dynamicAttributes;
	        }
	        ComponentAttributeRenderer.prototype.generate = function (root, view) {
	          if (!this._marker) this._marker = this.section.createMarker();
	          var ref = new this.componentClass(this._marker.createSection(root), this.element, this.attributes, view);
	          if (Object.keys(this.dynamicAttributes).length) {
	            _hydrateDynamicAttributes(ref, this.options, this.dynamicAttributes, view);
	          }
	          if (ref.update) view.bindings.push(ref);
	        };
	        return ComponentAttributeRenderer;
	      })();
	      var ElementAttributeRenderer = (function () {
	        function ElementAttributeRenderer(section, options, attributes) {
	          this.section = section;
	          this.options = options;
	          this.attributes = attributes;
	        }
	        ElementAttributeRenderer.prototype.generate = function (root, view) {
	          if (!this._marker) this._marker = this.section.createMarker();
	          _hydrateDynamicAttributes(this._marker.findNode(root), this.options, this.attributes, view);
	        };
	        return ElementAttributeRenderer;
	      })();

	      function _hydrateDynamicAttributes(ref, options, dynamicAttributes, view) {
	        for (var key in dynamicAttributes) {
	          var clazz = options.attributes[key];
	          var attr = new clazz(ref, key, dynamicAttributes[key], view);
	          if (attr.update) view.bindings.push(attr);
	        }
	      }
	    })(vnode = templ.vnode || (templ.vnode = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var vnode;
	    (function (vnode) {
	      var Fragment = (function () {
	        function Fragment(children) {
	          this.nodeType = vnode.NodeType.Fragment;
	          this.childNodes = children;
	          for (var i = 0; i < children.length; i++)
	          children[i].parentNode = this;
	        }
	        Fragment.prototype.render = function (options, renderers) {
	          var fragment = options.document.createDocumentFragment();
	          for (var i = 0, n = this.childNodes.length; i < n; i++) {
	            fragment.appendChild(this.childNodes[i].render(options, renderers));
	          }
	          return fragment;
	        };
	        return Fragment;
	      })();
	      vnode.Fragment = Fragment;
	      vnode.fragment = function (children) {
	        return new Fragment(children);
	      };
	    })(vnode = templ.vnode || (templ.vnode = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var vnode;
	    (function (vnode) {
	      var Text = (function () {
	        function Text(nodeValue) {
	          this.nodeType = vnode.NodeType.Text;
	          this.nodeValue = nodeValue;
	        }
	        Text.prototype.render = function (options) {
	          return options.document.createTextNode(this.nodeValue);
	        };
	        return Text;
	      })();
	      vnode.Text = Text;
	      vnode.text = function text(nodeValue) {
	        return new Text(nodeValue);
	      };
	    })(vnode = templ.vnode || (templ.vnode = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var attributes;
	    (function (attributes) {
	      var BaseAttribute = (function () {
	        function BaseAttribute(ref, key, value, view) {
	          this.ref = ref;
	          this.key = key;
	          this.value = value;
	          this.view = view;
	          this.initialize();
	        }
	        BaseAttribute.prototype.initialize = function () {};
	        BaseAttribute.prototype.update = function () {};
	        BaseAttribute.prototype.destroy = function () {};
	        return BaseAttribute;
	      })();
	      attributes.BaseAttribute = BaseAttribute;
	    })(attributes = templ.attributes || (templ.attributes = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var attributes;
	    (function (attributes) {
	      var _events = ['change', 'keyup', 'input'];
	      var ValueAttribute = (function (_super) {
	        __extends(ValueAttribute, _super);

	        function ValueAttribute() {
	          _super.apply(this, arguments);
	        }
	        ValueAttribute.prototype.initialize = function () {
	          this._onInput = utils.bind(this._onInput, this, null);
	          for (var _i = 0; _i < _events.length; _i++) {
	            var e = _events[_i];
	            this.ref.addEventListener(e, this._onInput);
	          }
	        };
	        ValueAttribute.prototype.update = function () {
	          var model = this.model = this.value;
	          if (!model) return;
	          if (!model || !(model instanceof templ.Reference)) {
	            throw new Error("input value must be a reference. Make sure you have <~> defined");
	          }
	          if (model.gettable) {
	            this._elementValue(this._parseValue(model.value()));
	          }
	        };
	        ValueAttribute.prototype._parseValue = function (value) {
	          if (value == null || value === "") return void 0;
	          return value;
	        };
	        ValueAttribute.prototype._onInput = function (event) {
	          clearInterval(this._autocompleteCheckInterval);
	          // ignore some keys
	          if (event && (!event.keyCode || !~ [27].indexOf(event.keyCode))) {
	            event.stopPropagation();
	          }
	          var value = this._parseValue(this._elementValue());
	          if (!this.model) return;
	          if (String(this.model.value()) == String(value)) return;
	          this.model.value(value);
	        };
	        ValueAttribute.prototype._elementValue = function (value) {
	          var node = this.ref;
	          var isCheckbox = /checkbox/.test(node.type);
	          var isRadio = /radio/.test(node.type);
	          var isRadioOrCheckbox = isCheckbox || isRadio;
	          var hasValue = Object.prototype.hasOwnProperty.call(node, "value");
	          var isInput = hasValue || /input|textarea|checkbox/.test(node.nodeName.toLowerCase());
	          if (!arguments.length) {
	            if (isCheckbox) {
	              return Boolean(node.checked);
	            }
	            else if (isInput) {
	              return node.value || "";
	            }
	            else {
	              return node.innerHTML || "";
	            }
	          }
	          if (value == null) {
	            value = "";
	          }
	          else {
	            clearInterval(this._autocompleteCheckInterval);
	          }
	          if (isRadioOrCheckbox) {
	            if (isRadio) {
	              if (String(value) === String(node.value)) {
	                node.checked = true;
	              }
	            }
	            else {
	              node.checked = value;
	            }
	          }
	          else if (String(value) !== this._elementValue()) {
	            if (isInput) {
	              node.value = value;
	            }
	            else {
	              node.innerHTML = value;
	            }
	          }
	        };
	        return ValueAttribute;
	      })(attributes.BaseAttribute);
	      attributes.ValueAttribute = ValueAttribute;
	    })(attributes = templ.attributes || (templ.attributes = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var attributes;
	    (function (attributes) {
	      var debug = utils.debug('attributes:event');
	      var EventAttribute = (function (_super) {
	        __extends(EventAttribute, _super);

	        function EventAttribute() {
	          _super.apply(this, arguments);
	        }
	        EventAttribute.prototype.initialize = function () {
	          this._onEvent = utils.bind(this._onEvent, this);
	          if (!this.event) this.event = this.key.match(/on(.+)/)[1].toLowerCase();
	          debug('added event listener %s: %o', this.event, this.value);
	          this.view.addListener(this.ref, this.event, this._onEvent);
	        };
	        EventAttribute.prototype._onEvent = function (e) {
	          var self = this;
	          var fn;
	          if (this.value instanceof templ.Assignment) {
	            fn = this.value.assign;
	          }
	          else {
	            fn = this.value;
	          }
	          if (typeof fn !== 'function') {
	            throw new Error('[event] value is not a function');
	          }
	          debug('fired event: %s', this.event);
	          fn(e);
	        };
	        EventAttribute.prototype.destroy = function () {
	          debug('removed event listener %s: %o', this.event, this.value);
	          this.view.removeListener(this.ref, this.event, this._onEvent);
	        };
	        return EventAttribute;
	      })(attributes.BaseAttribute);
	      attributes.EventAttribute = EventAttribute;
	      var KeyCodeAttribute = (function (_super) {
	        __extends(KeyCodeAttribute, _super);

	        function KeyCodeAttribute(ref, key, value, view) {
	          this.event = "keydown";
	          this.keyCodes = [];
	          _super.call(this, ref, key, value, view);
	        }
	        KeyCodeAttribute.prototype._onEvent = function (event) {
	          if (!~this.keyCodes.indexOf(event.keyCode)) {
	            return;
	          }
	          _super.prototype._onEvent.call(this, event);
	        };
	        return KeyCodeAttribute;
	      })(EventAttribute);
	      attributes.KeyCodeAttribute = KeyCodeAttribute;
	      var ClickAttribute = (function (_super) {
	        __extends(ClickAttribute, _super);

	        function ClickAttribute() {
	          _super.apply(this, arguments);
	        }
	        return ClickAttribute;
	      })(EventAttribute);
	      attributes.ClickAttribute = ClickAttribute;
	      var OnEnterAttribute = (function (_super) {
	        __extends(OnEnterAttribute, _super);

	        function OnEnterAttribute() {
	          _super.apply(this, arguments);
	          this.keyCodes = [13];
	        }
	        return OnEnterAttribute;
	      })(KeyCodeAttribute);
	      attributes.OnEnterAttribute = OnEnterAttribute;
	      var OnEscapeAttribute = (function (_super) {
	        __extends(OnEscapeAttribute, _super);

	        function OnEscapeAttribute() {
	          _super.apply(this, arguments);
	          this.KeyCodes = [27];
	        }
	        return OnEscapeAttribute;
	      })(KeyCodeAttribute);
	      attributes.OnEscapeAttribute = OnEscapeAttribute;
	    })(attributes = templ.attributes || (templ.attributes = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var attributes;
	    (function (attributes) {
	      attributes.value = attributes.ValueAttribute;
	      attributes.onclick = attributes.ClickAttribute;
	      attributes.onenter = attributes.OnEnterAttribute;
	      attributes.onescape = attributes.OnEscapeAttribute;
	      attributes.checked = attributes.ValueAttribute;
	      attributes.style = attributes.StyleAttribute;
	    })(attributes = templ.attributes || (templ.attributes = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var attributes;
	    (function (attributes) {
	      var StyleAttribute = (function (_super) {
	        __extends(StyleAttribute, _super);

	        function StyleAttribute() {
	          _super.apply(this, arguments);
	        }
	        StyleAttribute.prototype.initialize = function () {
	          this._currentStyles = {};
	        };
	        StyleAttribute.prototype.update = function () {
	          var styles = this.value;
	          if (typeof styles === "string") {
	            this.ref.setAttribute("style", styles);
	            return;
	          }
	          var newStyles = {};
	          for (var name in styles) {
	            var style = styles[name];
	            if (style !== this._currentStyles[name]) {
	              newStyles[name] = this._currentStyles[name] = style || "";
	            }
	          }
	          for (var key in newStyles) {
	            this.ref.style[key] = newStyles[key];
	          }
	        };
	        return StyleAttribute;
	      })(attributes.BaseAttribute);
	      attributes.StyleAttribute = StyleAttribute;
	    })(attributes = templ.attributes || (templ.attributes = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var components;
	    (function (components) {
	      var BaseComponent = (function () {
	        function BaseComponent(section, vvnode, attributes, view) {
	          this.section = section;
	          this.vnode = vvnode;
	          this.attributes = attributes;
	          this.view = view;
	          this.document = view.template.options.document;
	          if (vvnode.childNodes) this.childTemplate = templ.vnode.template(templ.vnode.fragment(vvnode.childNodes), view.template.options);
	          for (var key in attributes)
	          this.setAttribute(key, attributes[key]);
	          this.initialize();
	        }
	        BaseComponent.prototype.initialize = function () {};
	        BaseComponent.prototype.setAttribute = function (key, value) {
	          this.attributes[key] = value;
	        };
	        BaseComponent.prototype.removeAttribute = function (key) {
	          this.attributes[key] = void 0;
	        };
	        BaseComponent.prototype.destroy = function () {};
	        return BaseComponent;
	      })();
	      components.BaseComponent = BaseComponent;
	    })(components = templ.components || (templ.components = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var components;
	    (function (components) {
	      function _each(target, iterate) {
	        if (!target) return;
	        if (target.forEach) {
	          // use API here since target could be an object
	          target.forEach(iterate);
	        }
	        else {
	          for (var key in target) {
	            if (target.hasOwnProperty(key)) iterate(target[key], key);
	          }
	        }
	      }
	      var Repeat = (function (_super) {
	        __extends(Repeat, _super);

	        function Repeat() {
	          _super.apply(this, arguments);
	          this._children = [];
	        }
	        Repeat.prototype.update = function () {
	          var as = this['as'];
	          var each = this['each'];
	          var key = this['key'] || "key";
	          var n = 0;
	          var self = this;
	          var parent = this.view;
	          var properties;
	          _each(each, function (model, k) {
	            var child;
	            if (as) {
	              properties = {};
	              properties[key] = k;
	              properties[as] = model;
	            }
	            else {
	              properties = model;
	            }
	            // TODO - provide SAME context here for speed and stability
	            if (n >= self._children.length) {
	              child = self.childTemplate.view(properties, {
	                parent: parent
	              });
	              self._children.push(child);
	              self.section.appendChild(child.render(properties));
	            }
	            else {
	              child = self._children[n];
	              child.context = properties;
	              child.update();
	            }
	            n++;
	          });
	          this._children.splice(n).forEach(function (child) {
	            child.remove();
	          });
	        };
	        Repeat.prototype.setAttribute = function (key, value) {
	          this[key] = value;
	        };
	        return Repeat;
	      })(components.BaseComponent);
	      components.Repeat = Repeat;
	    })(components = templ.components || (templ.components = {}));
	  })(templ || (templ = {}));
	  var templ;
	  (function (templ) {
	    var components;
	    (function (components) {
	      components.repeat = components.Repeat;
	    })(components = templ.components || (templ.components = {}));
	  })(templ || (templ = {}));
	  var modifiers;
	  (function (modifiers) {
	    function uppercase(value) {
	      return String(value).toUpperCase();
	    }
	    modifiers.uppercase = uppercase;

	    function lowercase(value) {
	      return String(value).toLowerCase();
	    }
	    modifiers.lowercase = lowercase;

	    function titlecase(value) {
	      var str;
	      str = String(value);
	      return str.substr(0, 1).toUpperCase() + str.substr(1);
	    }
	    modifiers.titlecase = titlecase;

	    function json(value, count, delimiter) {
	      return JSON.stringify.apply(JSON, arguments);
	    }
	    modifiers.json = json;

	    function isNaN(value) {
	      return isNaN(value);
	    }
	    modifiers.isNaN = isNaN;
	    modifiers.round = Math.round;
	  })(modifiers || (modifiers = {}));
	  return templ;
	}));

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="typings" />
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _templ = __webpack_require__(36);

	var templ = _interopRequireWildcard(_templ);

	var _collection = __webpack_require__(23);

	var TemplateView = (function (_templ$View) {
	    _inherits(TemplateView, _templ$View);

	    function TemplateView(section, template, context, options) {
	        _classCallCheck(this, TemplateView);

	        _get(Object.getPrototypeOf(TemplateView.prototype), 'constructor', this).call(this, section, template, context, options);
	        if (options.delegator) {
	            this._delegator = options.delegator;
	        }
	        if (options.container) {
	            this._container = options.container;
	        }
	    }

	    _createClass(TemplateView, [{
	        key: '_onModelChange',
	        value: function _onModelChange() {}
	    }, {
	        key: 'set',
	        value: function set(key, val) {
	            var silent = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	            if (!silent) {
	                if (!(this.context instanceof _collection.Model)) {
	                    return _get(Object.getPrototypeOf(TemplateView.prototype), 'set', this).call(this, key, val);
	                }
	                if (!Array.isArray(key)) key = key.split(/[,.]/);
	                if (key[0] === '$') {
	                    key.shift();
	                    if (key.length === 0) {
	                        this.root.context = val;
	                        this.root.update();
	                    } else {
	                        this.root.set(key, val);
	                        this.root.update();
	                    }
	                    return;
	                } else {
	                    this.context.set(key.join('.'), val);
	                }
	            }
	            this.update();
	        }
	    }, {
	        key: 'get',
	        value: function get(key) {
	            if (!Array.isArray(key)) key = key.split(/[,.]/);
	            var value = undefined;
	            if (key[0].substr(0, 1) === "@") {
	                key[0] = key[0].substr(1);
	                key.unshift('this');
	            }
	            if (key[0] === 'this') {
	                key.shift();
	                if (key.length === 0) {
	                    value = this.context;
	                }
	            } else if (key[0] === 'root') {
	                key.shift();
	            }
	            key = key.join('.');
	            if (!value) {
	                if (!(this.context instanceof _collection.Model)) {
	                    value = _get(Object.getPrototypeOf(TemplateView.prototype), 'get', this).call(this, key);
	                } else {
	                    value = this.context.get(key);
	                }
	            }
	            return value;
	        }
	    }, {
	        key: 'context',
	        set: function set(context) {
	            if (this._context && this._context instanceof _collection.Model) {}
	            if (context != null && context instanceof _collection.Model) {
	                context.on('change', function () {
	                    var changed = context.changed;
	                    for (var k in changed) {
	                        this.set(k, changed[k]);
	                    }
	                }, this);
	            }
	            this._context = context;
	        },
	        get: function get() {
	            return this._context;
	        }
	    }]);

	    return TemplateView;
	})(templ.View);

	exports.TemplateView = TemplateView;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _object = __webpack_require__(3);

	var _internal = __webpack_require__(9);

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2:
	            return decorators.reduceRight(function (o, d) {
	                return d && d(o) || o;
	            }, target);
	        case 3:
	            return decorators.reduceRight(function (o, d) {
	                return (d && d(target, key), void 0);
	            }, void 0);
	        case 4:
	            return decorators.reduceRight(function (o, d) {
	                return d && d(target, key, o) || o;
	            }, desc);
	    }
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var Controller = (function (_BaseObject) {
	    _inherits(Controller, _BaseObject);

	    function Controller() {
	        _classCallCheck(this, Controller);

	        _get(Object.getPrototypeOf(Controller.prototype), "constructor", this).call(this);
	    }

	    _createClass(Controller, [{
	        key: "initialize",
	        value: function initialize() {}
	    }, {
	        key: "template",
	        set: function set(template) {
	            if (this._template) {
	                this._template.remove();
	                this._template = void 0;
	            }
	            this._template = template;
	        },
	        get: function get() {
	            return this._template;
	        }
	    }]);

	    return Controller;
	})(_object.BaseObject);
	exports.Controller = Controller;
	exports.Controller = Controller = __decorate([(0, _internal.classtype)(_internal.ClassType.Controller), __metadata('design:paramtypes', [])], Controller);

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var _bind = Function.prototype.bind;

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _controller2 = __webpack_require__(38);

	var _object = __webpack_require__(3);

	var _di = __webpack_require__(11);

	var _utilitiesLibObjects = __webpack_require__(40);

	var _utilitiesLibPromises = __webpack_require__(41);

	var _internal = __webpack_require__(9);

	var _serviceActivator = __webpack_require__(42);

	var ControllerActivator = (function () {
	    function ControllerActivator(container) {
	        _classCallCheck(this, ControllerActivator);

	        this.container = container;
	    }

	    _createClass(ControllerActivator, [{
	        key: 'resolveDependencies',
	        value: function resolveDependencies(fn) {
	            if (fn.__metadata__.undefined['design:paramtypes']) {
	                delete fn.__metadata__.undefined['design:paramtypes'];
	            }
	            var params = (0, _di.getFunctionParameters)(fn),
	                args = new Array(params.length);
	            var p = undefined;
	            var ctx = this.container.get('context');
	            var childCtx = ctx.createChild();
	            for (var i = 0, ii = args.length; i < ii; i++) {
	                p = params[i];
	                if (p === 'config') {
	                    args[i] = this.container.get(fn);
	                } else if (p === 'ctx' || p === 'context') {
	                    args[i] = childCtx;
	                } else {
	                    args[i] = this.container.get(p);
	                }
	            }
	            return [args, childCtx];
	        }
	    }, {
	        key: 'invoke',
	        value: function invoke(target, args, keys) {
	            var deps = args[0];
	            var ctx = args[1];
	            ctx.observe();
	            var instance = undefined;
	            if (typeof Reflect.construct === 'function') {
	                instance = Reflect.construct(target, deps);
	            } else {
	                instance = new (_bind.apply(target, [null].concat(_toConsumableArray(deps))))();
	            }
	            if (instance.$instance) {
	                instance = instance.$instance;
	            }
	            if ((0, _utilitiesLibPromises.isPromise)(instance)) {
	                return instance.then(function (i) {
	                    i.ctx = args[1];
	                    ctx.unobserve();
	                    return i;
	                });
	            }
	            instance.ctx = args[1];
	            return instance;
	        }
	    }]);

	    return ControllerActivator;
	})();

	(0, _internal.classtype)(_internal.ClassType.ModuleFactory);

	var ModuleFactory = (function (_BaseObject) {
	    _inherits(ModuleFactory, _BaseObject);

	    function ModuleFactory(app, name, ctor, config) {
	        _classCallCheck(this, ModuleFactory);

	        _get(Object.getPrototypeOf(ModuleFactory.prototype), 'constructor', this).call(this);
	        this._name = name;
	        this._module = ctor;
	        this._app = app;
	        this._container = app.createContainer();
	        this._activator = new ControllerActivator(this._container);
	        this._serviceActivator = new _serviceActivator.ServiceActivator(this._container);
	    }

	    _createClass(ModuleFactory, [{
	        key: 'controller',
	        value: function controller(name, _controller) {
	            if (this._container.hasHandler(name)) {
	                throw new Error('controller already defined');
	            }
	            var Klass = undefined;
	            if (typeof _controller === 'function') {
	                Klass = _controller;
	            } else if ((0, _utilitiesLibObjects.isObject)(_controller)) {
	                Klass = _controller2.Controller.extend(_controller);
	            } else {
	                throw new Error('wrong controller definition type');
	            }
	            (0, _internal.setActivator)(Klass, this._activator);
	            (0, _internal.setDependencyResolver)(Klass, this._activator);
	            this._container.registerTransient(name, Klass);
	            return this;
	        }
	    }, {
	        key: 'service',
	        value: function service(name, _service, config) {
	            if (typeof _service === 'function') {
	                (0, _internal.setActivator)(_service, this._activator);
	                (0, _internal.setDependencyResolver)(_service, this._activator);
	                (0, _internal.classtype)(_internal.ClassType.Service)(_service);
	                if (config != null) {
	                    if (typeof config === 'function') {
	                        this._container.registerSingleton(_service, config);
	                    } else {
	                        this._container.registerInstance(_service, config);
	                    }
	                }
	                this._container.registerSingleton(name, _service, _internal.DINamespace);
	            } else {
	                this._container.registerInstance(name, _service);
	            }
	            return this;
	        }
	    }, {
	        key: 'create',
	        value: function create(options) {
	            var _this = this;

	            options = (0, _utilitiesLibObjects.extend)({}, options, { name: this.name });
	            return new _utilitiesLibPromises.Promise(function (resolve, reject) {
	                var mod = new _this._module(_this._container, options);
	                if (typeof mod.initialize === 'function') {
	                    var args = (0, _di.getFunctionParameters)(mod.initialize);
	                    args = args.map(function (a) {
	                        var k = undefined;
	                        if (a == 'ctx' || a == 'context') {
	                            k = mod.ctx;
	                        } else {
	                            k = _this._container.get(a);
	                        }
	                        if (!(0, _utilitiesLibPromises.isPromise)(k)) {
	                            k = _utilitiesLibPromises.Promise.resolve(k);
	                        }
	                        return k;
	                    });
	                    (0, _utilitiesLibPromises.toPromise)(args).then(function (result) {
	                        try {
	                            mod.ctx.$run(mod.initialize, mod, result);
	                            resolve(mod);
	                        } catch (e) {
	                            reject(e);
	                        }
	                    })['catch'](reject);
	                }
	            });
	        }
	    }, {
	        key: 'name',
	        get: function get() {
	            return this._name;
	        }
	    }]);

	    return ModuleFactory;
	})(_object.BaseObject);

	exports.ModuleFactory = ModuleFactory;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils_1 = __webpack_require__(7);
	var arrays_1 = __webpack_require__(8);
	function isObject(obj) {
	    return obj === Object(obj);
	}
	exports.isObject = isObject;
	function isEmpty(obj) {
	    return Object.keys(obj).length === 0;
	}
	exports.isEmpty = isEmpty;
	function extend(obj) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    if (!isObject(obj)) return obj;
	    var o, k;
	    for (var _a = 0; _a < args.length; _a++) {
	        o = args[_a];
	        if (!isObject(o)) continue;
	        for (k in o) {
	            if (has(o, k)) obj[k] = o[k];
	        }
	    }
	    return obj;
	}
	exports.extend = extend;
	function assign(target) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert first argument to object');
	    }
	    var to = Object(target);
	    for (var i = 0, ii = args.length; i < ii; i++) {
	        var nextSource = args[i];
	        if (nextSource === undefined || nextSource === null) {
	            continue;
	        }
	        nextSource = Object(nextSource);
	        var keysArray = Object.keys(Object(nextSource));
	        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	            var nextKey = keysArray[nextIndex];
	            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	            if (desc !== undefined && desc.enumerable) {
	                to[nextKey] = nextSource[nextKey];
	            }
	        }
	    }
	    return to;
	}
	exports.assign = assign;
	function has(obj, prop) {
	    return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	exports.has = has;
	function pick(obj, props) {
	    var out = {},
	        prop;
	    for (var _i = 0; _i < props.length; _i++) {
	        prop = props[_i];
	        if (has(obj, prop)) out[prop] = obj[prop];
	    }
	    return out;
	}
	exports.pick = pick;
	function result(obj, prop, ctx, args) {
	    var ret = obj[prop];
	    return typeof ret === 'function' ? utils_1.callFunc(ret, ctx, args || []) : ret;
	}
	exports.result = result;
	function values(obj) {
	    var output = [];
	    for (var k in obj) if (has(obj, k)) {
	        output.push(obj[k]);
	    }
	    return output;
	}
	exports.values = values;
	function intersectionObjects(a, b, predicate) {
	    var results = [],
	        aElement,
	        existsInB;
	    for (var i = 0, ii = a.length; i < ii; i++) {
	        aElement = a[i];
	        existsInB = arrays_1.any(b, function (bElement) {
	            return predicate(bElement, aElement);
	        });
	        if (existsInB) {
	            results.push(aElement);
	        }
	    }
	    return results;
	}
	function intersection(results) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    var lastArgument = args[args.length - 1];
	    var arrayCount = args.length;
	    var areEqualFunction = utils_1.equal;
	    if (typeof lastArgument === "function") {
	        areEqualFunction = lastArgument;
	        arrayCount--;
	    }
	    for (var i = 0; i < arrayCount; i++) {
	        var array = args[i];
	        results = intersectionObjects(results, array, areEqualFunction);
	        if (results.length === 0) break;
	    }
	    return results;
	}
	exports.intersection = intersection;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var objects_1 = __webpack_require__(6);
	var arrays_1 = __webpack_require__(8);
	var utils_1 = __webpack_require__(7);
	exports.Promise = window.Promise;
	function isPromise(obj) {
	    return obj && typeof obj.then === 'function';
	}
	exports.isPromise = isPromise;
	function toPromise(obj) {
	    if (!obj) {
	        return obj;
	    }
	    if (isPromise(obj)) {
	        return obj;
	    }
	    if ("function" == typeof obj) {
	        return thunkToPromise.call(this, obj);
	    }
	    if (Array.isArray(obj)) {
	        return arrayToPromise.call(this, obj);
	    }
	    if (objects_1.isObject(obj)) {
	        return objectToPromise.call(this, obj);
	    }
	    return exports.Promise.resolve(obj);
	}
	exports.toPromise = toPromise;
	function thunkToPromise(fn) {
	    var ctx = this;
	    return new exports.Promise(function (resolve, reject) {
	        fn.call(ctx, function (err, res) {
	            if (err) return reject(err);
	            if (arguments.length > 2) res = arrays_1.slice(arguments, 1);
	            resolve(res);
	        });
	    });
	}
	exports.thunkToPromise = thunkToPromise;
	function arrayToPromise(obj) {
	    return exports.Promise.all(obj.map(toPromise, this));
	}
	exports.arrayToPromise = arrayToPromise;
	function objectToPromise(obj) {
	    var results = new obj.constructor();
	    var keys = Object.keys(obj);
	    var promises = [];
	    for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var promise = toPromise.call(this, obj[key]);
	        if (promise && isPromise(promise)) defer(promise, key);else results[key] = obj[key];
	    }
	    return exports.Promise.all(promises).then(function () {
	        return results;
	    });
	    function defer(promise, key) {
	        results[key] = undefined;
	        promises.push(promise.then(function (res) {
	            results[key] = res;
	        }));
	    }
	}
	exports.objectToPromise = objectToPromise;
	function deferred(fn, ctx) {
	    var args = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        args[_i - 2] = arguments[_i];
	    }
	    var ret = {};
	    ret.promise = new exports.Promise(function (resolve, reject) {
	        ret.resolve = resolve;
	        ret.reject = reject;
	        ret.done = function (err, result) {
	            if (err) return reject(err);else resolve(result);
	        };
	    });
	    if (typeof fn === 'function') {
	        utils_1.callFunc(fn, ctx, args.concat([ret.done]));
	        return ret.promise;
	    }
	    return ret;
	}
	exports.deferred = deferred;
	;
	function callback(promise, callback, ctx) {
	    promise.then(function (result) {
	        callback.call(ctx, null, result);
	    })['catch'](function (err) {
	        callback.call(ctx, err);
	    });
	}
	exports.callback = callback;
	function delay(timeout) {
	    var defer = deferred();
	    timeout == null ? utils_1.nextTick(defer.resolve) : setTimeout(defer.resolve, timeout);
	    return defer.promise;
	}
	exports.delay = delay;
	;
	function eachAsync(array, iterator, context, accumulate) {
	    if (accumulate === void 0) {
	        accumulate = false;
	    }
	    return mapAsync(array, iterator, context, accumulate).then(function () {
	        return void 0;
	    });
	}
	exports.eachAsync = eachAsync;
	function mapAsync(array, iterator, context, accumulate) {
	    if (accumulate === void 0) {
	        accumulate = false;
	    }
	    return new exports.Promise(function (resolve, reject) {
	        var i = 0,
	            len = array.length,
	            errors = [],
	            results = [];
	        function next(err, result) {
	            if (err && !accumulate) return reject(err);
	            if (err) errors.push(err);
	            if (i === len) return errors.length ? reject(arrays_1.flatten(errors)) : resolve(results);
	            var ret = iterator.call(context, array[i++]);
	            if (isPromise(ret)) {
	                ret.then(function (r) {
	                    results.push(r);next(null, r);
	                }, next);
	            } else if (ret instanceof Error) {
	                next(ret);
	            } else {
	                next(null);
	            }
	        }
	        next(null);
	    });
	}
	exports.mapAsync = mapAsync;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _di = __webpack_require__(11);

	var ServiceActivator = (function () {
	    function ServiceActivator(container) {
	        _classCallCheck(this, ServiceActivator);

	        this.container = container;
	    }

	    _createClass(ServiceActivator, [{
	        key: 'resolveDependencies',
	        value: function resolveDependencies(fn) {
	            var params = (0, _di.getFunctionParameters)(fn),
	                args = new Array(params.length);
	            var p = undefined;
	            for (var i = 0, ii = args.length; i < ii; i++) {
	                p = params[i];
	                if (p === 'config') {
	                    args[i] = this.container.get(fn);
	                } else {
	                    args[i] = this.container.get(p);
	                }
	            }
	            return args;
	        }
	    }, {
	        key: 'invoke',
	        value: function invoke(fn, deps, keys) {
	            var instance = Reflect.construct(fn, deps);
	            if (instance.$instance) {
	                instance = instance.$instance;
	            }
	            return instance;
	        }
	    }]);

	    return ServiceActivator;
	})();

	exports.ServiceActivator = ServiceActivator;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	var _controllerComponent = __webpack_require__(44);

	_defaults(exports, _interopExportWildcard(_controllerComponent, _defaults));

	var _repeatComponent = __webpack_require__(45);

	_defaults(exports, _interopExportWildcard(_repeatComponent, _defaults));

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _templ = __webpack_require__(36);

	var _utilitiesLibIndex = __webpack_require__(33);

	var _templateView = __webpack_require__(37);

	var ControllerComponent = (function (_components$BaseComponent) {
	    _inherits(ControllerComponent, _components$BaseComponent);

	    function ControllerComponent() {
	        _classCallCheck(this, ControllerComponent);

	        _get(Object.getPrototypeOf(ControllerComponent.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(ControllerComponent, [{
	        key: 'initialize',
	        value: function initialize() {
	            this.container = this.view._container;
	            if (this.attributes['name']) {
	                this.name = this.attributes['name'];
	            }
	            this.__initController(this.name);
	        }
	    }, {
	        key: '__initController',
	        value: function __initController(name) {
	            var _this = this;

	            var ret = this.container.get(name);
	            if ((0, _utilitiesLibIndex.isPromise)(ret)) {
	                ret.then(function (controller) {
	                    _this.controller = controller;
	                    _this.__initView.call(_this, controller);
	                });
	            } else {
	                this.controller = ret;
	                this.__initView(ret);
	            }
	        }
	    }, {
	        key: '__initView',
	        value: function __initView(controller) {
	            var _this2 = this;

	            this.__resolveTemplate(this.attributes['template']).then(function (template) {
	                if (_this2.subview) {
	                    _this2.subview.remove();
	                }
	                _this2.subview = _this2.childTemplate.view(controller.ctx.model, {
	                    container: _this2.container
	                });
	                var node = _this2.subview.render();
	                _this2.section.appendChild(node);
	            });
	        }
	    }, {
	        key: '__resolveTemplate',
	        value: function __resolveTemplate(template) {
	            var _this3 = this;

	            if (template != null) {
	                var resolver = this.container.get('templateResolver');
	                return resolver.resolve(this.attributes["template"]).then(function (template) {
	                    var templ = (0, _templ.compile)(template, {
	                        viewClass: _templateView.TemplateView
	                    });
	                    if (_this3.childTemplate) {
	                        delete _this3.childTemplate;
	                    }
	                    _this3.childTemplate = templ;
	                    return templ;
	                });
	            } else {
	                return _utilitiesLibIndex.Promise.resolve(this.childTemplate);
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            //console.log('update', arguments)
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            _get(Object.getPrototypeOf(ControllerComponent.prototype), 'destroy', this).call(this);
	            this.controller.destroy();
	        }
	    }]);

	    return ControllerComponent;
	})(_templ.components.BaseComponent);

	exports.ControllerComponent = ControllerComponent;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings" />
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _templ = __webpack_require__(36);

	var _collection = __webpack_require__(23);

	var _utilitiesLibIndex = __webpack_require__(33);

	var RepeatComponent = (function (_components$BaseComponent) {
	    _inherits(RepeatComponent, _components$BaseComponent);

	    function RepeatComponent() {
	        _classCallCheck(this, RepeatComponent);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        _get(Object.getPrototypeOf(RepeatComponent.prototype), 'constructor', this).apply(this, args);
	        this._children = [];
	    }

	    _createClass(RepeatComponent, [{
	        key: 'update',
	        value: function update() {
	            var as = this['as'];
	            var each = this['each'];
	            var key = this['key'] || "key";
	            var n = 0;
	            var self = this;
	            var parent = this.view;
	            if (each === this._collection || !each) {
	                return;
	            }
	            if (this._collection && this._collection instanceof _collection.Collection) {
	                //this._collection.off('remove',this._update)
	                //this._collection.off('add', this._update)
	                this.__removeEventListeners(this._collection);
	            }
	            this._collection = each;
	            this._update();
	            if (each instanceof _collection.Collection) {
	                this.__addEventListeners(each);
	            }
	        }
	    }, {
	        key: '_update',
	        value: function _update() {
	            var _this = this;

	            var properties;
	            var as = this['as'];
	            var parent = this.view;
	            var n = 0;
	            var delegateID = (0, _utilitiesLibIndex.uniqueId)('.repeat');
	            this._collection.forEach(function (m) {
	                var child;
	                if (as) {
	                    properties = new _collection.NestedModel(_defineProperty({}, as, m));
	                } else {
	                    properties = m;
	                }
	                // TODO - provide SAME context here for speed and stability
	                if (n >= _this._children.length) {
	                    child = _this.childTemplate.view(properties, {
	                        parent: parent
	                    });
	                    _this._children.push(child);
	                    _this.section.appendChild(child.render(properties));
	                } else {
	                    child = _this._children[n];
	                    child.context = properties;
	                    child.update();
	                }
	                n++;
	            });
	            this._children.splice(n).forEach(function (child) {
	                child.remove();
	            });
	        }
	    }, {
	        key: '__addEventListeners',
	        value: function __addEventListeners(collection) {
	            collection.on('add', this._update, this);
	            collection.on('remove', this._update, this);
	            collection.on('reset', this._update, this);
	        }
	    }, {
	        key: '__removeEventListeners',
	        value: function __removeEventListeners(collection) {
	            collection.off('remove', this._update);
	            collection.off('add', this._update);
	            collection.reset('reset', this._update);
	        }
	    }, {
	        key: 'setAttribute',
	        value: function setAttribute(key, value) {
	            this[key] = value;
	        }
	    }, {
	        key: 'setProperty',
	        value: function setProperty() {
	            console.log(arguments);
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this._collection.destroy();
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this._children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var child = _step.value;

	                    child.remove();
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator['return']) {
	                        _iterator['return']();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            _get(Object.getPrototypeOf(RepeatComponent.prototype), 'destroy', this).call(this);
	        }
	    }]);

	    return RepeatComponent;
	})(_templ.components.BaseComponent);

	exports.RepeatComponent = RepeatComponent;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _utilitiesLibIndex = __webpack_require__(33);

	var _internal = __webpack_require__(9);

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2:
	            return decorators.reduceRight(function (o, d) {
	                return d && d(o) || o;
	            }, target);
	        case 3:
	            return decorators.reduceRight(function (o, d) {
	                return (d && d(target, key), void 0);
	            }, void 0);
	        case 4:
	            return decorators.reduceRight(function (o, d) {
	                return d && d(target, key, o) || o;
	            }, desc);
	    }
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var TemplateResolver = (function () {
	    function TemplateResolver() {
	        _classCallCheck(this, TemplateResolver);
	    }

	    _createClass(TemplateResolver, [{
	        key: "resolve",
	        value: function resolve(templateID) {
	            var template = document.getElementById(templateID);
	            if (template == null) return _utilitiesLibIndex.Promise.reject(new Error("template with id: '" + templateID + "' not found"));
	            return _utilitiesLibIndex.Promise.resolve(template.innerHTML);
	        }
	    }]);

	    return TemplateResolver;
	})();
	exports.TemplateResolver = TemplateResolver;
	exports.TemplateResolver = TemplateResolver = __decorate([(0, _internal.classtype)(_internal.ClassType.Service), __metadata('design:paramtypes', [])], TemplateResolver);

/***/ }
/******/ ])
});
;