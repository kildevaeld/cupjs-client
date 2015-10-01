
import {HistoryApi, Handler} from './history'
import {BaseObject} from '../../object'
import {callFunc} from 'utilities'
// Cached regular expressions for matching named param parts and splatted
// parts of route strings.
const optionalParam = /\((.*?)\)/g;
const namedParam    = /(\(\?)?:\w+/g;
const splatParam    = /\*\w+/g;
const escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

var isRegExp = function(value) {
	return value ? (typeof value === 'object' && toString.call(value) === '[object RegExp]') : false;
};




export interface RouteHandler {
	(...args:any[]): void
}

export interface RouterOptions {
	execute?: (callback:RouteHandler, args:any[]) => void
}

export class Router extends BaseObject {
	options: RouterOptions
	history: HistoryApi
	constructor (options:RouterOptions = {}) {
    super()
		this.history = new HistoryApi()
    this.options = options
	}
	
	
	route (route:RegExp|string, name:RouteHandler|string, handler: RouteHandler = null): Router {
		if (!isRegExp(route)) route = this._routeToRegExp(<string>route);
      if (typeof name === 'function') {
        handler = <RouteHandler>name;
        name = '';
      }
			
			if (!handler) {
				throw new Error('router: no handler');
			}
      
      this.history.route(route, (fragment) => {
        var args = this._extractParameters(<RegExp>route, fragment);
        this.execute(handler, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
        this.trigger('route', name, args);
        //this.history.trigger('route', this, name, args);
      });
      return this;
		
		return this
	}
  
  // Execute a route handler with the provided parameters.  This is an
  // excellent place to do pre-route setup or post-route cleanup.
  execute (callback:RouteHandler, args:any[]) {
    if (callback) {
      if (this.options.execute) {
        this.options.execute(callback, args)
      } else {
        callFunc(callback, this, args)
      }
    }
  }

  // Simple proxy to `Backbone.history` to save a fragment into the history.
  navigate (fragment, options) {
    this.history.navigate(fragment, options);
    return this;
  }
	
	
	// Convert a route string into a regular expression, suitable for matching
  // against the current location hash.
  private _routeToRegExp (route:string): RegExp {
  	route = route.replace(escapeRegExp, '\\$&')
    	.replace(optionalParam, '(?:$1)?')
      .replace(namedParam, function(match, optional) {
      	return optional ? match : '([^/?]+)';
      })
      .replace(splatParam, '([^?]*?)');
    return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
  }

  // Given a route, and a URL fragment that it matches, return the array of
  // extracted decoded parameters. Empty or unmatched parameters will be
  // treated as `null` to normalize cross-browser behavior.
  private _extractParameters (route:RegExp, fragment:string): string[] {
  	var params = route.exec(fragment).slice(1);
    return params.map(function(param, i) {
    	// Don't decode the search params.
      if (i === params.length - 1) return param || null;
      return param ? decodeURIComponent(param) : null;
    });
  }
}