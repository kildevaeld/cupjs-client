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

	var _application = __webpack_require__(1);

	var cupsjs = new _application.Application();
	exports.cupsjs = cupsjs;

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

	var _module2 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./module\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _controller = __webpack_require__(3);

	var _moduleFactory = __webpack_require__(22);

	var _object = __webpack_require__(4);

	var _utilitiesLibIndex = __webpack_require__(26);

	var utils = _interopRequireWildcard(_utilitiesLibIndex);

	var _internal = __webpack_require__(10);

	var _di = __webpack_require__(12);

	var _serviceActivator = __webpack_require__(25);

	var _utilitiesLibObjects = __webpack_require__(23);

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
	    }]);

	    return Application;
	})(_object.BaseObject);

	exports.Application = Application;

	Application.Module = _module2.Module;
	Application.Controller = _controller.Controller;
	Application.utils = utils;

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _object = __webpack_require__(4);

	var _internal = __webpack_require__(10);

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
	    }]);

	    return Controller;
	})(_object.BaseObject);
	exports.Controller = Controller;
	exports.Controller = Controller = __decorate([(0, _internal.classtype)(_internal.ClassType.Controller), __metadata('design:paramtypes', [])], Controller);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="typings" />
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _eventsjs = __webpack_require__(5);

	var _utilitiesLibUtils = __webpack_require__(6);

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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var objects_1 = __webpack_require__(7);
	var arrays_1 = __webpack_require__(9);
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils_1 = __webpack_require__(8);
	var arrays_1 = __webpack_require__(9);
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var objects_1 = __webpack_require__(7);
	var arrays_1 = __webpack_require__(9);
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils_1 = __webpack_require__(8);
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
/* 10 */
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

	var _typings = __webpack_require__(11);

	var _di = __webpack_require__(12);

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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(13);

/***/ },
/* 13 */
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

	var _container = __webpack_require__(14);

	_defaults(exports, _interopExportWildcard(_container, _defaults));

	var _metaIndex = __webpack_require__(18);

	_defaults(exports, _interopExportWildcard(_metaIndex, _defaults));

	var _decorators = __webpack_require__(21);

	_defaults(exports, _interopExportWildcard(_decorators, _defaults));

/***/ },
/* 14 */
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

	var _metadata = __webpack_require__(15);

	var _metaMetadata = __webpack_require__(16);

	var _errors = __webpack_require__(17);

	var paramRegEx = /function[^(]*\(([^)]*)\)/i;

	function getFunctionParameters(fn) {
	    var cache = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	    var params = _metaMetadata.Metadata.getOwn(_metaMetadata.Metadata.paramTypes, fn);
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
	        value: function get(key) {
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
	                return this.parent.get(key);
	            }
	            // No point in registrering a string
	            if (typeof key === 'string') {
	                throw (0, _errors.createError)('DIResolveError', 'no component registered for key: ' + key);
	            }
	            this.autoRegister(key);
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
	            //childContainer.root = this.root;
	            return childContainer;
	        }
	    }, {
	        key: 'resolveDependencies',
	        value: function resolveDependencies(fn, targetKey) {
	            var info = this._getOrCreateConstructionSet(fn, targetKey);
	            var keys = info.keys,
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
	            return null;
	        }
	    }]);

	    return DIContainer;
	})();

	exports.DIContainer = DIContainer;

/***/ },
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
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

	var _metadata = __webpack_require__(16);

	_defaults(exports, _interopExportWildcard(_metadata, _defaults));

	var _decorators = __webpack_require__(19);

	_defaults(exports, _interopExportWildcard(_decorators, _defaults));

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _decoratorApplicator = __webpack_require__(20);

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
/* 20 */
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
/* 21 */
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

	var _metaIndex = __webpack_require__(18);

	var _metadata = __webpack_require__(15);

	var _container = __webpack_require__(14);

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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _controller2 = __webpack_require__(3);

	var _object = __webpack_require__(4);

	var _di = __webpack_require__(12);

	var _utilitiesLibObjects = __webpack_require__(23);

	var _utilitiesLibUtils = __webpack_require__(6);

	var _utilitiesLibPromises = __webpack_require__(24);

	var _internal = __webpack_require__(10);

	var _serviceActivator = __webpack_require__(25);

	var ControllerActivator = (function () {
	    function ControllerActivator(app, factory) {
	        _classCallCheck(this, ControllerActivator);
	    }

	    _createClass(ControllerActivator, [{
	        key: 'invoke',
	        value: function invoke(target, deps, keys) {}
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
	        this._activator = new ControllerActivator(app, this);
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
	                            (0, _utilitiesLibUtils.callFunc)(mod.initialize, mod, result);
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils_1 = __webpack_require__(8);
	var arrays_1 = __webpack_require__(9);
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var objects_1 = __webpack_require__(7);
	var arrays_1 = __webpack_require__(9);
	var utils_1 = __webpack_require__(8);
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _di = __webpack_require__(12);

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
	            console.log('service activator');
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(9));
	__export(__webpack_require__(7));
	__export(__webpack_require__(27));
	__export(__webpack_require__(8));

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var objects_1 = __webpack_require__(7);
	var arrays_1 = __webpack_require__(9);
	var utils_1 = __webpack_require__(8);
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

/***/ }
/******/ ])
});
;