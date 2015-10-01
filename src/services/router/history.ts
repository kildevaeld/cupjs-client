
import {BaseObject} from '../../object'
import * as utils from 'utilities'

// Cached regex for stripping a leading hash/slash and trailing space.
const routeStripper = /^[#\/]|\s+$/g;
// Cached regex for stripping leading and trailing slashes.
const rootStripper = /^\/+|\/+$/g;
// Cached regex for removing a trailing slash.
const trailingSlash = /\/$/;
// Cached regex for stripping urls of hash and query.
const pathStripper = /[#].*$/;

export class Handler {
	route: RegExp
	callback: Function
}

export class HistoryApi extends BaseObject {
	handlers:Handler[] = []
	location: Location
	history: History
	private _started: boolean = false
	private _wantsPushState: boolean
	private _wantsHashChange: boolean
	root: string
	options: any
	fragment: string
	get started (): boolean {
		return this._started
	}
	constructor () {
		super()
		if (typeof window !== 'undefined') {
			this.location = window.location;
			this.history = window.history;
		}
		this.checkUrl = utils.bind(this.checkUrl, this);
	}

	// Are we at the app root?
	atRoot () {
		return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
	}

	// Gets the true hash value. Cannot use location.hash directly due to bug
	// in Firefox where location.hash will always be decoded.
	getHash (window?: Window) {
		var match = (window || this).location.href.match(/#(.*)$/);
		return match ? match[1] : '';
	}

	// Get the cross-browser normalized URL fragment, either from the URL,
	// the hash, or the override.
	getFragment (fragment?: string, forcePushState: boolean = false) {
		if (fragment == null) {
			if (this._wantsPushState || !this._wantsHashChange) {
				fragment = decodeURI(this.location.pathname + this.location.search);
				var root = this.root.replace(trailingSlash, '');
				if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
			} else {
				fragment = this.getHash();
			}
		}
		return fragment.replace(routeStripper, '');
	}

	// Start the hash change handling, returning `true` if the current URL matches
	// an existing route, and `false` otherwise.
	start (options:any={}) {
		if (this.started) throw new Error("Backbone.history has already been started");
		this._started = true;

		// Figure out the initial configuration.
		// Is pushState desired or should we use hashchange only?
			this.options          = utils.extend({root: '/'}, this.options, options);
			this.root             = this.options.root;
			this._wantsHashChange = this.options.hashChange !== false;
			this._wantsPushState  = !!this.options.pushState;
			var fragment          = this.getFragment();

			// Normalize root to always include a leading and trailing slash.
			this.root = ('/' + this.root + '/').replace(rootStripper, '/');

			// Depending on whether we're using pushState or hashes, determine how we
			// check the URL state.
			if (this._wantsPushState) {
				window.addEventListener('popstate', this.checkUrl, false);
			} else if (this._wantsHashChange) {
				window.addEventListener('hashchange', this.checkUrl, false);
			}

			// Determine if we need to change the base url, for a pushState link
			// opened by a non-pushState browser.
			this.fragment = fragment;
			var loc = this.location;

			// Transition from hashChange to pushState or vice versa if both are
			// requested.
			if (this._wantsHashChange && this._wantsPushState) {

				// If we've started out with a hash-based route, but we're currently
				// in a browser where it could be `pushState`-based instead...
				if (this.atRoot() && loc.hash) {
					this.fragment = this.getHash().replace(routeStripper, '');
					this.history.replaceState({}, document.title, this.root + this.fragment);
				}

			}

			if (!this.options.silent) return this.loadUrl();
		}

		// Disable Backbone.history, perhaps temporarily. Not useful in a real app,
		// but possibly useful for unit testing Routers.
		stop () {
			window.removeEventListener('popstate', this.checkUrl);
			window.removeEventListener('hashchange', this.checkUrl);
			this._started = false;
		}

		// Add a route to be tested when the fragment changes. Routes added later
		// may override previous routes.
		route (route, callback) {

			this.handlers.unshift({route: route, callback: callback});
		}

		// Checks the current URL to see if it has changed, and if it has,
		// calls `loadUrl`.
		checkUrl () {
			var current = this.getFragment();

			if (current === this.fragment) return false;
			this.loadUrl();
		}

		// Attempt to load the current URL fragment. If a route succeeds with a
		// match, returns `true`. If no defined routes matches the fragment,
		// returns `false`.
		loadUrl (fragment?:string) {
			fragment = this.fragment = this.getFragment(fragment);

			return this.handlers.some(function(handler) {

				if (handler.route.test(fragment)) {
					handler.callback(fragment);
					return true;
				}
			});
		}

		// Save a fragment into the hash history, or replace the URL state if the
		// 'replace' option is passed. You are responsible for properly URL-encoding
		// the fragment in advance.
		//
		// The options object can contain `trigger: true` if you wish to have the
		// route callback be fired (not usually desirable), or `replace: true`, if
		// you wish to modify the current URL without adding an entry to the history.
		navigate (fragment:string, options?:any): any {
			if (!this.started) return false;
			if (!options || options === true) options = {trigger: !!options};

			var url = this.root + (fragment = this.getFragment(fragment || ''));

			// Strip the hash for matching.
			fragment = fragment.replace(pathStripper, '');

			if (this.fragment === fragment) return;
			this.fragment = fragment;

			// Don't include a trailing slash on the root.
			if (fragment === '' && url !== '/') url = url.slice(0, -1);

			// If we're using pushState we use it to set the fragment as a real URL.
			if (this._wantsPushState) {
				this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

			// If hash changes haven't been explicitly disabled, update the hash
			// fragment to store history.
			} else if (this._wantsHashChange) {
				this._updateHash(this.location, fragment, options.replace);
			// If you've told us that you explicitly don't want fallback hashchange-
			// based history, then `navigate` becomes a page refresh.
			} else {
				return this.location.assign(url);
			}
			if (options.trigger) return this.loadUrl(fragment);
		}

		// Update the hash location, either replacing the current entry, or adding
		// a new one to the browser history.
		_updateHash (location:Location, fragment:string, replace:boolean) {
			if (replace) {
				var href = location.href.replace(/(javascript:|#).*$/, '');
				location.replace(href + '#' + fragment);
			} else {
				// Some browsers require that `hash` contains a leading #.
				location.hash = '#' + fragment;
			}
		}
}
