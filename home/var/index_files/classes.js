// Simple Class Creation and Inheritance
// Inspired by base2 and Prototype
(function(){
	var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

	// The base Class implementation (does nothing)
	this.Class = function(){};
 
	// Create a new Class that inherits from this class
	Class.extend = function(prop) {
		var _super = this.prototype;
   
		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;
   
		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn){
					return function() {
						var tmp = this._super;
           
						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = _super[name];
           
						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						var ret = fn.apply(this, arguments);       
						this._super = tmp;
           
						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}
   
		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if ( !initializing && this.init )
				this.init.apply(this, arguments);
		}
   
		// Populate our constructed prototype object
		Class.prototype = prototype;
   
		// Enforce the constructor to be what we expect
		Class.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;
   
		return Class;
	};
})();

// Utilities from Prototype
var $A = Array.from = function(iterable) {
	if (!iterable) return [];
	if (iterable.toArray) {
		return iterable.toArray();
	} else {
		var results = [];
			for (var i = 0, length = iterable.length; i < length; i++)
				results.push(iterable[i]);
		return results;
	}
}

Function.prototype.proto_bind = function() {
	var __method = this, args = $A(arguments), object = args.shift();
	return function() {
		return __method.apply(object, args.concat($A(arguments)));
	}
}

Function.prototype.bindAsEventListener = function() {
	var __method = this, args = $A(arguments), object = args.shift();
	return function(event) {
		return __method.apply(object, [event || window.event].concat(args));
	}
}

Object.p_extend = function(destination, source) {
	for (var property in source)
		destination[property] = source[property];
	return destination;
};

function isArray(object) {
	return object != null && typeof object == "object" && 'splice' in object && 'join' in object;
}

Object.p_extend(String.prototype, {
	gsub: function(pattern, replacement) {
		var result = '', source = this, match;
		replacement = arguments.callee.prepareReplacement(replacement);

		while (source.length > 0) {
			if (match = source.match(pattern)) {
				result += source.slice(0, match.index);
				result += String.interpret(replacement(match));
				source  = source.slice(match.index + match[0].length);
			} else {
				result += source, source = '';
			}
		}
		return result;
	},
	
	startsWith: function(pattern) {
		return this.indexOf(pattern) === 0;
	},

	endsWith: function(pattern) {
		var d = this.length - pattern.length;
		return d >= 0 && this.lastIndexOf(pattern) === d;
	},
	
	strip: function() {
		return this.replace(/^\s+/, '').replace(/\s+$/, '');
	},

	stripTags: function() {
		return this.replace(/<\/?[^>]+>/gi, '');
	},
	
	toQueryParams: function(separator) {
		var match = this.strip().match(/([^?#]*)(#.*)?$/);
		if (!match) return {};

		var retval = {};
		var temp = match[1].split(separator || '&');
		for (var i = 0; i < temp.length; i++) {
			var pair = temp[i];
			if ((pair = pair.split('='))[0]) {
				var key = decodeURIComponent(pair.shift());
				var value = pair.length > 1 ? pair.join('=') : pair[0];
				if (value != undefined) value = decodeURIComponent(value);

				if (key in retval) {
					if (!isArray(retval[key])) retval[key] = [retval[key]];
					retval[key].push(value);
				}
				else retval[key] = value;
			}
			
		};
		return retval;
	},

	truncate: function(length, truncation) {
		length = length || 30;
		truncation = typeof truncation == "undefined" ? '...' : truncation;
		return this.length > length ?
			this.slice(0, length - truncation.length) + truncation : String(this);
	}	
});

String.prototype.gsub.prepareReplacement = function(replacement) {
	if (typeof replacement == "function") return replacement;
	var template = new Template(replacement);
	return function(match) { return template.evaluate(match) };
};

Object.p_extend(String, {
	interpret: function(value) {
		return value == null ? '' : String(value);
	},
	specialChar: {
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		'\\': '\\\\'
	}
});

var Template = Class.extend({
	init: function (template, pattern) {
		this.template = template.toString();
		this.pattern = pattern || Template.Pattern;
	},

	evaluate: function(object) {
		if (typeof object.toTemplateReplacements == "function")
			object = object.toTemplateReplacements();

		return this.template.gsub(this.pattern, function(match) {
			if (object == null) return '';

			var before = match[1] || '';
			if (before == '\\') return match[2];

			var ctx = object, expr = match[3];
			var pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
			match = pattern.exec(expr);
			if (match == null) return before;

			while (match != null) {
				var comp = match[1].startsWith('[') ? match[2].gsub('\\\\]', ']') : match[1];
				ctx = ctx[comp];
				if (null == ctx || '' == match[3]) break;
				expr = expr.substring('[' == match[3] ? match[1].length : match[0].length);
				match = pattern.exec(expr);
			}

			return before + String.interpret(ctx);
		});
	}
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;

var PeriodicalExecuter = Class.extend({
	init: function(callback, frequency) {
		this.callback = callback;
		this.frequency = frequency;
		this.currentlyExecuting = false;

		this.registerCallback();
	},

	registerCallback: function() {
		this.timer = setInterval(this.onTimerEvent.proto_bind(this), this.frequency * 1000);
	},

	execute: function() {
		this.callback(this);
	},

	stop: function() {
		if (!this.timer) return;
		clearInterval(this.timer);
		this.timer = null;
	},

	onTimerEvent: function() {
		if (!this.currentlyExecuting) {
			try {
				this.currentlyExecuting = true;
				this.execute();
			} finally {
				this.currentlyExecuting = false;
			}
		}
	}
});

function scrollToElement(element) {
	var pos = $(element).offset();
	window.scrollTo(pos.left, pos.top);
}

function pointerPosition(event) {
	var docElement = document.documentElement,
	body = document.body || { scrollLeft: 0, scrollTop: 0 };
	return {
		x: event.pageX || (event.clientX +
			(docElement.scrollLeft || body.scrollLeft) -
			(docElement.clientLeft || 0)),
		y: event.pageY || (event.clientY +
			(docElement.scrollTop || body.scrollTop) -
			(docElement.clientTop || 0))
	};
}