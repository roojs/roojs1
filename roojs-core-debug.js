/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 




// for old browsers
window["undefined"] = window["undefined"];

/**
 * @class Roo
 * Roo core utilities and functions.
 * @static
 */
var Roo = {}; 
/**
 * Copies all the properties of config to obj.
 * @param {Object} obj The receiver of the properties
 * @param {Object} config The source of the properties
 * @param {Object} defaults A different object that will also be applied for default values
 * @return {Object} returns obj
 * @member Roo apply
 */

 
Roo.apply = function(o, c, defaults){
    if(defaults){
        // no "this" reference for friendly out of scope calls
        Roo.apply(o, defaults);
    }
    if(o && c && typeof c == 'object'){
        for(var p in c){
            o[p] = c[p];
        }
    }
    return o;
};


(function(){
    var idSeed = 0;
    var ua = navigator.userAgent.toLowerCase();

    var isStrict = document.compatMode == "CSS1Compat",
        isOpera = ua.indexOf("opera") > -1,
        isSafari = (/webkit|khtml/).test(ua),
        isFirefox = ua.indexOf("firefox") > -1,
        isIE = ua.indexOf("msie") > -1,
        isIE7 = ua.indexOf("msie 7") > -1,
        isIE11 = /trident.*rv\:11\./.test(ua),
        isEdge = ua.indexOf("edge") > -1,
        isGecko = !isSafari && ua.indexOf("gecko") > -1,
        isBorderBox = isIE && !isStrict,
        isWindows = (ua.indexOf("windows") != -1 || ua.indexOf("win32") != -1),
        isMac = (ua.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1),
        isLinux = (ua.indexOf("linux") != -1),
        isSecure = window.location.href.toLowerCase().indexOf("https") === 0,
        isIOS = /iphone|ipad/.test(ua),
        isAndroid = /android/.test(ua),
        isTouch =  (function() {
            try {
                if (ua.indexOf('chrome') != -1 && ua.indexOf('android') == -1) {
                    window.addEventListener('touchstart', function __set_has_touch__ () {
                        Roo.isTouch = true;
                        window.removeEventListener('touchstart', __set_has_touch__);
                    });
                    return false; // no touch on chrome!?
                }
                document.createEvent("TouchEvent");  
                return true;  
            } catch (e) {  
                return false;  
            } 
            
        })();
    // remove css image flicker
	if(isIE && !isIE7){
        try{
            document.execCommand("BackgroundImageCache", false, true);
        }catch(e){}
    }
    
    Roo.apply(Roo, {
        /**
         * True if the browser is in strict mode
         * @type Boolean
         */
        isStrict : isStrict,
        /**
         * True if the page is running over SSL
         * @type Boolean
         */
        isSecure : isSecure,
        /**
         * True when the document is fully initialized and ready for action
         * @type Boolean
         */
        isReady : false,
        /**
         * Turn on debugging output (currently only the factory uses this)
         * @type Boolean
         */
        
        debug: false,

        /**
         * True to automatically uncache orphaned Roo.Elements periodically (defaults to true)
         * @type Boolean
         */
        enableGarbageCollector : true,

        /**
         * True to automatically purge event listeners after uncaching an element (defaults to false).
         * Note: this only happens if enableGarbageCollector is true.
         * @type Boolean
         */
        enableListenerCollection:false,

        /**
         * URL to a blank file used by Roo when in secure mode for iframe src and onReady src to prevent
         * the IE insecure content warning (defaults to javascript:false).
         * @type String
         */
        SSL_SECURE_URL : "javascript:false",

        /**
         * URL to a 1x1 transparent gif image used by Roo to create inline icons with CSS background images. (Defaults to
         * "http://Roojs.com/s.gif" and you should change this to a URL on your server).
         * @type String
         */
        BLANK_IMAGE_URL : "http:/"+"/localhost/s.gif",

        emptyFn : function(){},
        
        /**
         * Copies all the properties of config to obj if they don't already exist.
         * @param {Object} obj The receiver of the properties
         * @param {Object} config The source of the properties
         * @return {Object} returns obj
         */
        applyIf : function(o, c){
            if(o && c){
                for(var p in c){
                    if(typeof o[p] == "undefined"){ o[p] = c[p]; }
                }
            }
            return o;
        },

        /**
         * Applies event listeners to elements by selectors when the document is ready.
         * The event name is specified with an @ suffix.
<pre><code>
Roo.addBehaviors({
   // add a listener for click on all anchors in element with id foo
   '#foo a@click' : function(e, t){
       // do something
   },

   // add the same listener to multiple selectors (separated by comma BEFORE the @)
   '#foo a, #bar span.some-class@mouseover' : function(){
       // do something
   }
});
</code></pre>
         * @param {Object} obj The list of behaviors to apply
         */
        addBehaviors : function(o){
            if(!Roo.isReady){
                Roo.onReady(function(){
                    Roo.addBehaviors(o);
                });
                return;
            }
            var cache = {}; // simple cache for applying multiple behaviors to same selector does query multiple times
            for(var b in o){
                var parts = b.split('@');
                if(parts[1]){ // for Object prototype breakers
                    var s = parts[0];
                    if(!cache[s]){
                        cache[s] = Roo.select(s);
                    }
                    cache[s].on(parts[1], o[b]);
                }
            }
            cache = null;
        },

        /**
         * Generates unique ids. If the element already has an id, it is unchanged
         * @param {String/HTMLElement/Element} el (optional) The element to generate an id for
         * @param {String} prefix (optional) Id prefix (defaults "Roo-gen")
         * @return {String} The generated Id.
         */
        id : function(el, prefix){
            prefix = prefix || "roo-gen";
            el = Roo.getDom(el);
            var id = prefix + (++idSeed);
            return el ? (el.id ? el.id : (el.id = id)) : id;
        },
         
       
        /**
         * Extends one class with another class and optionally overrides members with the passed literal. This class
         * also adds the function "override()" to the class that can be used to override
         * members on an instance.
         * @param {Object} subclass The class inheriting the functionality
         * @param {Object} superclass The class being extended
         * @param {Object} overrides (optional) A literal with members
         * @method extend
         */
        extend : function(){
            // inline overrides
            var io = function(o){
                for(var m in o){
                    this[m] = o[m];
                }
            };
            return function(sb, sp, overrides){
                if(typeof sp == 'object'){ // eg. prototype, rather than function constructor..
                    overrides = sp;
                    sp = sb;
                    sb = function(){sp.apply(this, arguments);};
                }
                var F = function(){}, sbp, spp = sp.prototype;
                F.prototype = spp;
                sbp = sb.prototype = new F();
                sbp.constructor=sb;
                sb.superclass=spp;
                
                if(spp.constructor == Object.prototype.constructor){
                    spp.constructor=sp;
                   
                }
                
                sb.override = function(o){
                    Roo.override(sb, o);
                };
                sbp.override = io;
                Roo.override(sb, overrides);
                return sb;
            };
        }(),

        /**
         * Adds a list of functions to the prototype of an existing class, overwriting any existing methods with the same name.
         * Usage:<pre><code>
Roo.override(MyClass, {
    newMethod1: function(){
        // etc.
    },
    newMethod2: function(foo){
        // etc.
    }
});
 </code></pre>
         * @param {Object} origclass The class to override
         * @param {Object} overrides The list of functions to add to origClass.  This should be specified as an object literal
         * containing one or more methods.
         * @method override
         */
        override : function(origclass, overrides){
            if(overrides){
                var p = origclass.prototype;
                for(var method in overrides){
                    p[method] = overrides[method];
                }
            }
        },
        /**
         * Creates namespaces to be used for scoping variables and classes so that they are not global.  Usage:
         * <pre><code>
Roo.namespace('Company', 'Company.data');
Company.Widget = function() { ... }
Company.data.CustomStore = function(config) { ... }
</code></pre>
         * @param {String} namespace1
         * @param {String} namespace2
         * @param {String} etc
         * @method namespace
         */
        namespace : function(){
            var a=arguments, o=null, i, j, d, rt;
            for (i=0; i<a.length; ++i) {
                d=a[i].split(".");
                rt = d[0];
                /** eval:var:o */
                eval('if (typeof ' + rt + ' == "undefined"){' + rt + ' = {};} o = ' + rt + ';');
                for (j=1; j<d.length; ++j) {
                    o[d[j]]=o[d[j]] || {};
                    o=o[d[j]];
                }
            }
        },
        /**
         * Creates namespaces to be used for scoping variables and classes so that they are not global.  Usage:
         * <pre><code>
Roo.factory({ xns: Roo.data, xtype : 'Store', .....});
Roo.factory(conf, Roo.data);
</code></pre>
         * @param {String} classname
         * @param {String} namespace (optional)
         * @method factory
         */
         
        factory : function(c, ns)
        {
            // no xtype, no ns or c.xns - or forced off by c.xns
            if (!c.xtype   || (!ns && !c.xns) ||  (c.xns === false)) { // not enough info...
                return c;
            }
            ns = c.xns ? c.xns : ns; // if c.xns is set, then use that..
            if (c.constructor == ns[c.xtype]) {// already created...
                return c;
            }
            if (ns[c.xtype]) {
                if (Roo.debug) { Roo.log("Roo.Factory(" + c.xtype + ")"); }
                var ret = new ns[c.xtype](c);
                ret.xns = false;
                return ret;
            }
            c.xns = false; // prevent recursion..
            return c;
        },
         /**
         * Logs to console if it can.
         *
         * @param {String|Object} string
         * @method log
         */
        log : function(s)
        {
            if ((typeof(console) == 'undefined') || (typeof(console.log) == 'undefined')) {
                return; // alerT?
            }
            
            console.log(s);
        },
        /**
         * Takes an object and converts it to an encoded URL. e.g. Roo.urlEncode({foo: 1, bar: 2}); would return "foo=1&bar=2".  Optionally, property values can be arrays, instead of keys and the resulting string that's returned will contain a name/value pair for each array value.
         * @param {Object} o
         * @return {String}
         */
        urlEncode : function(o){
            if(!o){
                return "";
            }
            var buf = [];
            for(var key in o){
                var ov = o[key], k = Roo.encodeURIComponent(key);
                var type = typeof ov;
                if(type == 'undefined'){
                    buf.push(k, "=&");
                }else if(type != "function" && type != "object"){
                    buf.push(k, "=", Roo.encodeURIComponent(ov), "&");
                }else if(ov instanceof Array){
                    if (ov.length) {
	                    for(var i = 0, len = ov.length; i < len; i++) {
	                        buf.push(k, "=", Roo.encodeURIComponent(ov[i] === undefined ? '' : ov[i]), "&");
	                    }
	                } else {
	                    buf.push(k, "=&");
	                }
                }
            }
            buf.pop();
            return buf.join("");
        },
         /**
         * Safe version of encodeURIComponent
         * @param {String} data 
         * @return {String} 
         */
        
        encodeURIComponent : function (data)
        {
            try {
                return encodeURIComponent(data);
            } catch(e) {} // should be an uri encode error.
            
            if (data == '' || data == null){
               return '';
            }
            // http://stackoverflow.com/questions/2596483/unicode-and-uri-encoding-decoding-and-escaping-in-javascript
            function nibble_to_hex(nibble){
                var chars = '0123456789ABCDEF';
                return chars.charAt(nibble);
            }
            data = data.toString();
            var buffer = '';
            for(var i=0; i<data.length; i++){
                var c = data.charCodeAt(i);
                var bs = new Array();
                if (c > 0x10000){
                        // 4 bytes
                    bs[0] = 0xF0 | ((c & 0x1C0000) >>> 18);
                    bs[1] = 0x80 | ((c & 0x3F000) >>> 12);
                    bs[2] = 0x80 | ((c & 0xFC0) >>> 6);
                    bs[3] = 0x80 | (c & 0x3F);
                }else if (c > 0x800){
                         // 3 bytes
                    bs[0] = 0xE0 | ((c & 0xF000) >>> 12);
                    bs[1] = 0x80 | ((c & 0xFC0) >>> 6);
                    bs[2] = 0x80 | (c & 0x3F);
                }else if (c > 0x80){
                       // 2 bytes
                    bs[0] = 0xC0 | ((c & 0x7C0) >>> 6);
                    bs[1] = 0x80 | (c & 0x3F);
                }else{
                        // 1 byte
                    bs[0] = c;
                }
                for(var j=0; j<bs.length; j++){
                    var b = bs[j];
                    var hex = nibble_to_hex((b & 0xF0) >>> 4) 
                            + nibble_to_hex(b &0x0F);
                    buffer += '%'+hex;
               }
            }
            return buffer;    
             
        },

        /**
         * Takes an encoded URL and and converts it to an object. e.g. Roo.urlDecode("foo=1&bar=2"); would return {foo: 1, bar: 2} or Roo.urlDecode("foo=1&bar=2&bar=3&bar=4", true); would return {foo: 1, bar: [2, 3, 4]}.
         * @param {String} string
         * @param {Boolean} overwrite (optional) Items of the same name will overwrite previous values instead of creating an an array (Defaults to false).
         * @return {Object} A literal with members
         */
        urlDecode : function(string, overwrite){
            if(!string || !string.length){
                return {};
            }
            var obj = {};
            var pairs = string.split('&');
            var pair, name, value;
            for(var i = 0, len = pairs.length; i < len; i++){
                pair = pairs[i].split('=');
                name = decodeURIComponent(pair[0]);
                value = decodeURIComponent(pair[1]);
                if(overwrite !== true){
                    if(typeof obj[name] == "undefined"){
                        obj[name] = value;
                    }else if(typeof obj[name] == "string"){
                        obj[name] = [obj[name]];
                        obj[name].push(value);
                    }else{
                        obj[name].push(value);
                    }
                }else{
                    obj[name] = value;
                }
            }
            return obj;
        },

        /**
         * Iterates an array calling the passed function with each item, stopping if your function returns false. If the
         * passed array is not really an array, your function is called once with it.
         * The supplied function is called with (Object item, Number index, Array allItems).
         * @param {Array/NodeList/Mixed} array
         * @param {Function} fn
         * @param {Object} scope
         */
        each : function(array, fn, scope){
            if(typeof array.length == "undefined" || typeof array == "string"){
                array = [array];
            }
            for(var i = 0, len = array.length; i < len; i++){
                if(fn.call(scope || array[i], array[i], i, array) === false){ return i; };
            }
        },

        // deprecated
        combine : function(){
            var as = arguments, l = as.length, r = [];
            for(var i = 0; i < l; i++){
                var a = as[i];
                if(a instanceof Array){
                    r = r.concat(a);
                }else if(a.length !== undefined && !a.substr){
                    r = r.concat(Array.prototype.slice.call(a, 0));
                }else{
                    r.push(a);
                }
            }
            return r;
        },

        /**
         * Escapes the passed string for use in a regular expression
         * @param {String} str
         * @return {String}
         */
        escapeRe : function(s) {
            return s.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
        },

        // internal (non-delayed, will get a return value..)
        callback : function(cb, scope, args, delay)
		{
            if(typeof cb != "function"){
				return false;
			}
			if(delay){
				cb.defer(delay, scope, args || []);
				return false
            }
			return cb.apply(scope, args || []);

        },

        /**
         * Return the dom node for the passed string (id), dom node, or Roo.Element
         * @param {String/HTMLElement/Roo.Element} el
         * @return HTMLElement
         */
        getDom : function(el){
            if(!el){
                return null;
            }
            return el.dom ? el.dom : (typeof el == 'string' ? document.getElementById(el) : el);
        },

        /**
        * Shorthand for {@link Roo.ComponentMgr#get}
        * @param {String} id
        * @return Roo.Component
        */
        getCmp : function(id){
            return Roo.ComponentMgr.get(id);
        },
         
        num : function(v, defaultValue){
            if(typeof v != 'number'){
                return defaultValue;
            }
            return v;
        },

        destroy : function(){
            for(var i = 0, a = arguments, len = a.length; i < len; i++) {
                var as = a[i];
                if(as){
                    if(as.dom){
                        as.removeAllListeners();
                        as.remove();
                        continue;
                    }
                    if(typeof as.purgeListeners == 'function'){
                        as.purgeListeners();
                    }
                    if(typeof as.destroy == 'function'){
                        as.destroy();
                    }
                }
            }
        },

        // inpired by a similar function in mootools library
        /**
         * Returns the type of object that is passed in. If the object passed in is null or undefined it
         * return false otherwise it returns one of the following values:<ul>
         * <li><b>string</b>: If the object passed is a string</li>
         * <li><b>number</b>: If the object passed is a number</li>
         * <li><b>boolean</b>: If the object passed is a boolean value</li>
         * <li><b>function</b>: If the object passed is a function reference</li>
         * <li><b>object</b>: If the object passed is an object</li>
         * <li><b>array</b>: If the object passed is an array</li>
         * <li><b>regexp</b>: If the object passed is a regular expression</li>
         * <li><b>element</b>: If the object passed is a DOM Element</li>
         * <li><b>nodelist</b>: If the object passed is a DOM NodeList</li>
         * <li><b>textnode</b>: If the object passed is a DOM text node and contains something other than whitespace</li>
         * <li><b>whitespace</b>: If the object passed is a DOM text node and contains only whitespace</li>
         * @param {Mixed} object
         * @return {String}
         */
        type : function(o){
            if(o === undefined || o === null){
                return false;
            }
            if(o.htmlElement){
                return 'element';
            }
            var t = typeof o;
            if(t == 'object' && o.nodeName) {
                switch(o.nodeType) {
                    case 1: return 'element';
                    case 3: return (/\S/).test(o.nodeValue) ? 'textnode' : 'whitespace';
                }
            }
            if(t == 'object' || t == 'function') {
                switch(o.constructor) {
                    case Array: return 'array';
                    case RegExp: return 'regexp';
                }
                if(typeof o.length == 'number' && typeof o.item == 'function') {
                    return 'nodelist';
                }
            }
            return t;
        },

        /**
         * Returns true if the passed value is null, undefined or an empty string (optional).
         * @param {Mixed} value The value to test
         * @param {Boolean} allowBlank (optional) Pass true if an empty string is not considered empty
         * @return {Boolean}
         */
        isEmpty : function(v, allowBlank){
            return v === null || v === undefined || (!allowBlank ? v === '' : false);
        },
        
        /** @type Boolean */
        isOpera : isOpera,
        /** @type Boolean */
        isSafari : isSafari,
        /** @type Boolean */
        isFirefox : isFirefox,
        /** @type Boolean */
        isIE : isIE,
        /** @type Boolean */
        isIE7 : isIE7,
        /** @type Boolean */
        isIE11 : isIE11,
        /** @type Boolean */
        isEdge : isEdge,
        /** @type Boolean */
        isGecko : isGecko,
        /** @type Boolean */
        isBorderBox : isBorderBox,
        /** @type Boolean */
        isWindows : isWindows,
        /** @type Boolean */
        isLinux : isLinux,
        /** @type Boolean */
        isMac : isMac,
        /** @type Boolean */
        isIOS : isIOS,
        /** @type Boolean */
        isAndroid : isAndroid,
        /** @type Boolean */
        isTouch : isTouch,

        /**
         * By default, Ext intelligently decides whether floating elements should be shimmed. If you are using flash,
         * you may want to set this to true.
         * @type Boolean
         */
        useShims : ((isIE && !isIE7) || (isGecko && isMac)),
        
        
                
        /**
         * Selects a single element as a Roo Element
         * This is about as close as you can get to jQuery's $('do crazy stuff')
         * @param {String} selector The selector/xpath query
         * @param {Node} root (optional) The start of the query (defaults to document).
         * @return {Roo.Element}
         */
        selectNode : function(selector, root) 
        {
            var node = Roo.DomQuery.selectNode(selector,root);
            return node ? Roo.get(node) : new Roo.Element(false);
        },
		/**
		 * Find the current bootstrap width Grid size
		 * Note xs is the default for smaller.. - this is currently used by grids to render correct columns
		 * @returns {String} (xs|sm|md|lg|xl)
		 */
		
		getGridSize : function()
		{
			var w = Roo.lib.Dom.getViewWidth();
			switch(true) {
				case w > 1200:
					return 'xl';
				case w > 992:
					return 'lg';
				case w > 768:
					return 'md';
				case w > 576:
					return 'sm';
				default:
					return 'xs'
			}
			
		} 
        
    });


})();

Roo.namespace("Roo", "Roo.util", "Roo.grid", "Roo.dd", "Roo.tree", "Roo.data",
                "Roo.form", "Roo.menu", "Roo.state", "Roo.lib", "Roo.layout",
                "Roo.app", "Roo.ux" 
               );
/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

(function() {    
    // wrappedn so fnCleanup is not in global scope...
    if(Roo.isIE) {
        function fnCleanUp() {
            var p = Function.prototype;
            delete p.createSequence;
            delete p.defer;
            delete p.createDelegate;
            delete p.createCallback;
            delete p.createInterceptor;

            window.detachEvent("onunload", fnCleanUp);
        }
        window.attachEvent("onunload", fnCleanUp);
    }
})();


/**
 * @class Function
 * These functions are available on every Function object (any JavaScript function).
 */
Roo.apply(Function.prototype, {
     /**
     * Creates a callback that passes arguments[0], arguments[1], arguments[2], ...
     * Call directly on any function. Example: <code>myFunction.createCallback(myarg, myarg2)</code>
     * Will create a function that is bound to those 2 args.
     * @return {Function} The new function
    */
    createCallback : function(/*args...*/){
        // make args available, in function below
        var args = arguments;
        var method = this;
        return function() {
            return method.apply(window, args);
        };
    },

    /**
     * Creates a delegate (callback) that sets the scope to obj.
     * Call directly on any function. Example: <code>this.myFunction.createDelegate(this)</code>
     * Will create a function that is automatically scoped to this.
     * @param {Object} obj (optional) The object for which the scope is set
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     *                                             if a number the args are inserted at the specified position
     * @return {Function} The new function
     */
    createDelegate : function(obj, args, appendArgs){
        var method = this;
        return function() {
            var callArgs = args || arguments;
            if(appendArgs === true){
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }else if(typeof appendArgs == "number"){
                callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
                var applyArgs = [appendArgs, 0].concat(args); // create method call params
                Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
            }
            return method.apply(obj || window, callArgs);
        };
    },

    /**
     * Calls this function after the number of millseconds specified.
     * @param {Number} millis The number of milliseconds for the setTimeout call (if 0 the function is executed immediately)
     * @param {Object} obj (optional) The object for which the scope is set
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     *                                             if a number the args are inserted at the specified position
     * @return {Number} The timeout id that can be used with clearTimeout
     */
    defer : function(millis, obj, args, appendArgs){
        var fn = this.createDelegate(obj, args, appendArgs);
        if(millis){
            return setTimeout(fn, millis);
        }
        fn();
        return 0;
    },
    /**
     * Create a combined function call sequence of the original function + the passed function.
     * The resulting function returns the results of the original function.
     * The passed fcn is called with the parameters of the original function
     * @param {Function} fcn The function to sequence
     * @param {Object} scope (optional) The scope of the passed fcn (Defaults to scope of original function or window)
     * @return {Function} The new function
     */
    createSequence : function(fcn, scope){
        if(typeof fcn != "function"){
            return this;
        }
        var method = this;
        return function() {
            var retval = method.apply(this || window, arguments);
            fcn.apply(scope || this || window, arguments);
            return retval;
        };
    },

    /**
     * Creates an interceptor function. The passed fcn is called before the original one. If it returns false, the original one is not called.
     * The resulting function returns the results of the original function.
     * The passed fcn is called with the parameters of the original function.
     * @addon
     * @param {Function} fcn The function to call before the original
     * @param {Object} scope (optional) The scope of the passed fcn (Defaults to scope of original function or window)
     * @return {Function} The new function
     */
    createInterceptor : function(fcn, scope){
        if(typeof fcn != "function"){
            return this;
        }
        var method = this;
        return function() {
            fcn.target = this;
            fcn.method = method;
            if(fcn.apply(scope || this || window, arguments) === false){
                return;
            }
            return method.apply(this || window, arguments);
        };
    }
});
/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

Roo.applyIf(String, {
    
    /** @scope String */
    
    /**
     * Escapes the passed string for ' and \
     * @param {String} string The string to escape
     * @return {String} The escaped string
     * @static
     */
    escape : function(string) {
        return string.replace(/('|\\)/g, "\\$1");
    },

    /**
     * Pads the left side of a string with a specified character.  This is especially useful
     * for normalizing number and date strings.  Example usage:
     * <pre><code>
var s = String.leftPad('123', 5, '0');
// s now contains the string: '00123'
</code></pre>
     * @param {String} string The original string
     * @param {Number} size The total length of the output string
     * @param {String} char (optional) The character with which to pad the original string (defaults to empty string " ")
     * @return {String} The padded string
     * @static
     */
    leftPad : function (val, size, ch) {
        var result = new String(val);
        if(ch === null || ch === undefined || ch === '') {
            ch = " ";
        }
        while (result.length < size) {
            result = ch + result;
        }
        return result;
    },

    /**
     * Allows you to define a tokenized string and pass an arbitrary number of arguments to replace the tokens.  Each
     * token must be unique, and must increment in the format {0}, {1}, etc.  Example usage:
     * <pre><code>
var cls = 'my-class', text = 'Some text';
var s = String.format('<div class="{0}">{1}</div>', cls, text);
// s now contains the string: '<div class="my-class">Some text</div>'
</code></pre>
     * @param {String} string The tokenized string to be formatted
     * @param {String} value1 The value to replace token {0}
     * @param {String} value2 Etc...
     * @return {String} The formatted string
     * @static
     */
    format : function(format){
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function(m, i){
            return Roo.util.Format.htmlEncode(args[i]);
        });
    }
  
    
});

/**
 * Utility function that allows you to easily switch a string between two alternating values.  The passed value
 * is compared to the current string, and if they are equal, the other value that was passed in is returned.  If
 * they are already different, the first value passed in is returned.  Note that this method returns the new value
 * but does not change the current string.
 * <pre><code>
// alternate sort directions
sort = sort.toggle('ASC', 'DESC');

// instead of conditional logic:
sort = (sort == 'ASC' ? 'DESC' : 'ASC');
</code></pre>
 * @param {String} value The value to compare to the current string
 * @param {String} other The new value to use if the string already equals the first value passed in
 * @return {String} The new value
 */
 
String.prototype.toggle = function(value, other){
    return this == value ? other : value;
};


/**
  * Remove invalid unicode characters from a string 
  *
  * @return {String} The clean string
  */
String.prototype.unicodeClean = function () {
    return this.replace(/[\s\S]/g,
        function(character) {
            if (character.charCodeAt()< 256) {
              return character;
           }
           try {
                encodeURIComponent(character);
           } catch(e) { 
              return '';
           }
           return character;
        }
    );
};
  

/**
  * Make the first letter of a string uppercase
  *
  * @return {String} The new string.
  */
String.prototype.toUpperCaseFirst = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};  
  
/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

 /**
 * @class Number
 */
Roo.applyIf(Number.prototype, {
    /**
     * Checks whether or not the current number is within a desired range.  If the number is already within the
     * range it is returned, otherwise the min or max value is returned depending on which side of the range is
     * exceeded.  Note that this method returns the constrained value but does not change the current number.
     * @param {Number} min The minimum number in the range
     * @param {Number} max The maximum number in the range
     * @return {Number} The constrained value if outside the range, otherwise the current value
     */
    constrain : function(min, max){
        return Math.min(Math.max(this, min), max);
    }
});/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 /**
 * @class Array
 */
Roo.applyIf(Array.prototype, {
    /**
     * 
     * Checks whether or not the specified object exists in the array.
     * @param {Object} o The object to check for
     * @return {Number} The index of o in the array (or -1 if it is not found)
     */
    indexOf : function(o){
       for (var i = 0, len = this.length; i < len; i++){
 	      if(this[i] == o) { return i; }
       }
 	   return -1;
    },

    /**
     * Removes the specified object from the array.  If the object is not found nothing happens.
     * @param {Object} o The object to remove
     */
    remove : function(o){
       var index = this.indexOf(o);
       if(index != -1){
           this.splice(index, 1);
       }
    },
    /**
     * Map (JS 1.6 compatibility)
     * @param {Function} function  to call
     */
    map : function(fun )
    {
        var len = this.length >>> 0;
        if (typeof fun != "function") {
            throw new TypeError();
        }
        var res = new Array(len);
        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
        {
            if (i in this) {
                res[i] = fun.call(thisp, this[i], i, this);
            }
        }

        return res;
    },
    /**
     * equals
     * @param {Array} o The array to compare to
     * @returns {Boolean} true if the same
     */
    equals : function(b)
    {
            // https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
        if (this === b) {
            return true;
        }
        if (b == null) {
            return false;
        }
        if (this.length !== b.length) {
            return false;
        }
          
        // sort?? a.sort().equals(b.sort());
          
        for (var i = 0; i < this.length; ++i) {
            if (this[i] !== b[i]) {
            return false;
            }
        }
        return true;
    } 
    
    
    
    
});

Roo.applyIf(Array, {
 /**
     * from
     * @static
     * @param {Array} o Or Array like object (eg. nodelist)
     * @returns {Array} 
     */
    from : function(o)
    {
        var ret= [];
    
        for (var i =0; i < o.length; i++) { 
            ret[i] = o[i];
        }
        return ret;
      
    }
});
/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

/**
 * @class Date
 *
 * The date parsing and format syntax is a subset of
 * <a href="http://www.php.net/date">PHP's date() function</a>, and the formats that are
 * supported will provide results equivalent to their PHP versions.
 *
 * Following is the list of all currently supported formats:
 *<pre>
Sample date:
'Wed Jan 10 2007 15:05:01 GMT-0600 (Central Standard Time)'

Format  Output      Description
------  ----------  --------------------------------------------------------------
  d      10         Day of the month, 2 digits with leading zeros
  D      Wed        A textual representation of a day, three letters
  j      10         Day of the month without leading zeros
  l      Wednesday  A full textual representation of the day of the week
  S      th         English ordinal day of month suffix, 2 chars (use with j)
  w      3          Numeric representation of the day of the week
  z      9          The julian date, or day of the year (0-365)
  W      01         ISO-8601 2-digit week number of year, weeks starting on Monday (00-52)
  F      January    A full textual representation of the month
  m      01         Numeric representation of a month, with leading zeros
  M      Jan        Month name abbreviation, three letters
  n      1          Numeric representation of a month, without leading zeros
  t      31         Number of days in the given month
  L      0          Whether it's a leap year (1 if it is a leap year, else 0)
  Y      2007       A full numeric representation of a year, 4 digits
  y      07         A two digit representation of a year
  a      pm         Lowercase Ante meridiem and Post meridiem
  A      PM         Uppercase Ante meridiem and Post meridiem
  g      3          12-hour format of an hour without leading zeros
  G      15         24-hour format of an hour without leading zeros
  h      03         12-hour format of an hour with leading zeros
  H      15         24-hour format of an hour with leading zeros
  i      05         Minutes with leading zeros
  s      01         Seconds, with leading zeros
  O      -0600      Difference to Greenwich time (GMT) in hours (Allows +08, without minutes)
  P      -06:00     Difference to Greenwich time (GMT) with colon between hours and minutes
  T      CST        Timezone setting of the machine running the code
  Z      -21600     Timezone offset in seconds (negative if west of UTC, positive if east)
</pre>
 *
 * Example usage (note that you must escape format specifiers with '\\' to render them as character literals):
 * <pre><code>
var dt = new Date('1/10/2007 03:05:01 PM GMT-0600');
document.write(dt.format('Y-m-d'));                         //2007-01-10
document.write(dt.format('F j, Y, g:i a'));                 //January 10, 2007, 3:05 pm
document.write(dt.format('l, \\t\\he dS of F Y h:i:s A'));  //Wednesday, the 10th of January 2007 03:05:01 PM
 </code></pre>
 *
 * Here are some standard date/time patterns that you might find helpful.  They
 * are not part of the source of Date.js, but to use them you can simply copy this
 * block of code into any script that is included after Date.js and they will also become
 * globally available on the Date object.  Feel free to add or remove patterns as needed in your code.
 * <pre><code>
Date.patterns = {
    ISO8601Long:"Y-m-d H:i:s",
    ISO8601Short:"Y-m-d",
    ShortDate: "n/j/Y",
    LongDate: "l, F d, Y",
    FullDateTime: "l, F d, Y g:i:s A",
    MonthDay: "F d",
    ShortTime: "g:i A",
    LongTime: "g:i:s A",
    SortableDateTime: "Y-m-d\\TH:i:s",
    UniversalSortableDateTime: "Y-m-d H:i:sO",
    YearMonth: "F, Y"
};
</code></pre>
 *
 * Example usage:
 * <pre><code>
var dt = new Date();
document.write(dt.format(Date.patterns.ShortDate));
 </code></pre>
 */

/*
 * Most of the date-formatting functions below are the excellent work of Baron Schwartz.
 * They generate precompiled functions from date formats instead of parsing and
 * processing the pattern every time you format a date.  These functions are available
 * on every Date object (any javascript function).
 *
 * The original article and download are here:
 * http://www.xaprb.com/blog/2005/12/12/javascript-closures-for-runtime-efficiency/
 *
 */
 
 
 // was in core
/**
 Returns the number of milliseconds between this date and date
 @param {Date} date (optional) Defaults to now
 @param {String} interval (optional) Default Date.MILLI, A valid date interval enum value (eg. Date.DAY) 
 @return {Number} The diff in milliseconds or units of interval
 @member Date getElapsed
 */
Date.prototype.getElapsed = function(date, interval)
{
    date = date ||  new Date();
    var ret = Math.abs(date.getTime()-this.getTime());
    switch (interval) {
       
        case  Date.SECOND:
            return Math.floor(ret / (1000));
        case  Date.MINUTE:
            return Math.floor(ret / (1000*60));
        case  Date.HOUR:
            return Math.floor(ret / (1000*60*60));
        case  Date.DAY:
            return Math.floor(ret / (1000*60*60*24));
        case  Date.MONTH: // this does not give exact number...??
            return ((date.format("Y") - this.format("Y")) * 12) + (date.format("m") - this.format("m"));
        case  Date.YEAR: // this does not give exact number...??
            return (date.format("Y") - this.format("Y"));
       
        case  Date.MILLI:
        default:
            return ret;
    }
};
 
// was in date file..


// private
Date.parseFunctions = {count:0};
// private
Date.parseRegexes = [];
// private
Date.formatFunctions = {count:0};

// private
Date.prototype.dateFormat = function(format) {
    if (Date.formatFunctions[format] == null) {
        Date.createNewFormat(format);
    }
    var func = Date.formatFunctions[format];
    return this[func]();
};


/**
 * Formats a date given the supplied format string
 * @param {String} format The format string
 * @return {String} The formatted date
 * @method
 */
Date.prototype.format = Date.prototype.dateFormat;

// private
Date.createNewFormat = function(format) {
    var funcName = "format" + Date.formatFunctions.count++;
    Date.formatFunctions[format] = funcName;
    var code = "Date.prototype." + funcName + " = function(){return ";
    var special = false;
    var ch = '';
    for (var i = 0; i < format.length; ++i) {
        ch = format.charAt(i);
        if (!special && ch == "\\") {
            special = true;
        }
        else if (special) {
            special = false;
            code += "'" + String.escape(ch) + "' + ";
        }
        else {
            code += Date.getFormatCode(ch);
        }
    }
    /** eval:var:zzzzzzzzzzzzz */
    eval(code.substring(0, code.length - 3) + ";}");
};

// private
Date.getFormatCode = function(character) {
    switch (character) {
    case "d":
        return "String.leftPad(this.getDate(), 2, '0') + ";
    case "D":
        return "Date.dayNames[this.getDay()].substring(0, 3) + ";
    case "j":
        return "this.getDate() + ";
    case "l":
        return "Date.dayNames[this.getDay()] + ";
    case "S":
        return "this.getSuffix() + ";
    case "w":
        return "this.getDay() + ";
    case "z":
        return "this.getDayOfYear() + ";
    case "W":
        return "this.getWeekOfYear() + ";
    case "F":
        return "Date.monthNames[this.getMonth()] + ";
    case "m":
        return "String.leftPad(this.getMonth() + 1, 2, '0') + ";
    case "M":
        return "Date.monthNames[this.getMonth()].substring(0, 3) + ";
    case "n":
        return "(this.getMonth() + 1) + ";
    case "t":
        return "this.getDaysInMonth() + ";
    case "L":
        return "(this.isLeapYear() ? 1 : 0) + ";
    case "Y":
        return "this.getFullYear() + ";
    case "y":
        return "('' + this.getFullYear()).substring(2, 4) + ";
    case "a":
        return "(this.getHours() < 12 ? 'am' : 'pm') + ";
    case "A":
        return "(this.getHours() < 12 ? 'AM' : 'PM') + ";
    case "g":
        return "((this.getHours() % 12) ? this.getHours() % 12 : 12) + ";
    case "G":
        return "this.getHours() + ";
    case "h":
        return "String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0') + ";
    case "H":
        return "String.leftPad(this.getHours(), 2, '0') + ";
    case "i":
        return "String.leftPad(this.getMinutes(), 2, '0') + ";
    case "s":
        return "String.leftPad(this.getSeconds(), 2, '0') + ";
    case "O":
        return "this.getGMTOffset() + ";
    case "P":
    	return "this.getGMTColonOffset() + ";
    case "T":
        return "this.getTimezone() + ";
    case "Z":
        return "(this.getTimezoneOffset() * -60) + ";
    default:
        return "'" + String.escape(character) + "' + ";
    }
};

/**
 * Parses the passed string using the specified format. Note that this function expects dates in normal calendar
 * format, meaning that months are 1-based (1 = January) and not zero-based like in JavaScript dates.  Any part of
 * the date format that is not specified will default to the current date value for that part.  Time parts can also
 * be specified, but default to 0.  Keep in mind that the input date string must precisely match the specified format
 * string or the parse operation will fail.
 * Example Usage:
<pre><code>
//dt = Fri May 25 2007 (current date)
var dt = new Date();

//dt = Thu May 25 2006 (today's month/day in 2006)
dt = Date.parseDate("2006", "Y");

//dt = Sun Jan 15 2006 (all date parts specified)
dt = Date.parseDate("2006-1-15", "Y-m-d");

//dt = Sun Jan 15 2006 15:20:01 GMT-0600 (CST)
dt = Date.parseDate("2006-1-15 3:20:01 PM", "Y-m-d h:i:s A" );
</code></pre>
 * @param {String} input The unparsed date as a string
 * @param {String} format The format the date is in
 * @return {Date} The parsed date
 * @static
 */
Date.parseDate = function(input, format) {
    if (Date.parseFunctions[format] == null) {
        Date.createParser(format);
    }
    var func = Date.parseFunctions[format];
    return Date[func](input);
};
/**
 * @private
 */

Date.createParser = function(format) {
    var funcName = "parse" + Date.parseFunctions.count++;
    var regexNum = Date.parseRegexes.length;
    var currentGroup = 1;
    Date.parseFunctions[format] = funcName;

    var code = "Date." + funcName + " = function(input){\n"
        + "var y = -1, m = -1, d = -1, h = -1, i = -1, s = -1, o, z, v;\n"
        + "var d = new Date();\n"
        + "y = d.getFullYear();\n"
        + "m = d.getMonth();\n"
        + "d = d.getDate();\n"
        + "if (typeof(input) !== 'string') { input = input.toString(); }\n"
        + "var results = input.match(Date.parseRegexes[" + regexNum + "]);\n"
        + "if (results && results.length > 0) {";
    var regex = "";

    var special = false;
    var ch = '';
    for (var i = 0; i < format.length; ++i) {
        ch = format.charAt(i);
        if (!special && ch == "\\") {
            special = true;
        }
        else if (special) {
            special = false;
            regex += String.escape(ch);
        }
        else {
            var obj = Date.formatCodeToRegex(ch, currentGroup);
            currentGroup += obj.g;
            regex += obj.s;
            if (obj.g && obj.c) {
                code += obj.c;
            }
        }
    }

    code += "if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0)\n"
        + "{v = new Date(y, m, d, h, i, s); v.setFullYear(y);}\n"
        + "else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0)\n"
        + "{v = new Date(y, m, d, h, i); v.setFullYear(y);}\n"
        + "else if (y >= 0 && m >= 0 && d > 0 && h >= 0)\n"
        + "{v = new Date(y, m, d, h); v.setFullYear(y);}\n"
        + "else if (y >= 0 && m >= 0 && d > 0)\n"
        + "{v = new Date(y, m, d); v.setFullYear(y);}\n"
        + "else if (y >= 0 && m >= 0)\n"
        + "{v = new Date(y, m); v.setFullYear(y);}\n"
        + "else if (y >= 0)\n"
        + "{v = new Date(y); v.setFullYear(y);}\n"
        + "}return (v && (z || o))?\n" // favour UTC offset over GMT offset
        + "    ((z)? v.add(Date.SECOND, (v.getTimezoneOffset() * 60) + (z*1)) :\n" // reset to UTC, then add offset
        + "        v.add(Date.HOUR, (v.getGMTOffset() / 100) + (o / -100))) : v\n" // reset to GMT, then add offset
        + ";}";

    Date.parseRegexes[regexNum] = new RegExp("^" + regex + "$");
    /** eval:var:zzzzzzzzzzzzz */
    eval(code);
};

// private
Date.formatCodeToRegex = function(character, currentGroup) {
    switch (character) {
    case "D":
        return {g:0,
        c:null,
        s:"(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)"};
    case "j":
        return {g:1,
            c:"d = parseInt(results[" + currentGroup + "], 10);\n",
            s:"(\\d{1,2})"}; // day of month without leading zeroes
    case "d":
        return {g:1,
            c:"d = parseInt(results[" + currentGroup + "], 10);\n",
            s:"(\\d{2})"}; // day of month with leading zeroes
    case "l":
        return {g:0,
            c:null,
            s:"(?:" + Date.dayNames.join("|") + ")"};
    case "S":
        return {g:0,
            c:null,
            s:"(?:st|nd|rd|th)"};
    case "w":
        return {g:0,
            c:null,
            s:"\\d"};
    case "z":
        return {g:0,
            c:null,
            s:"(?:\\d{1,3})"};
    case "W":
        return {g:0,
            c:null,
            s:"(?:\\d{2})"};
    case "F":
        return {g:1,
            c:"m = parseInt(Date.monthNumbers[results[" + currentGroup + "].substring(0, 3)], 10);\n",
            s:"(" + Date.monthNames.join("|") + ")"};
    case "M":
        return {g:1,
            c:"m = parseInt(Date.monthNumbers[results[" + currentGroup + "]], 10);\n",
            s:"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"};
    case "n":
        return {g:1,
            c:"m = parseInt(results[" + currentGroup + "], 10) - 1;\n",
            s:"(\\d{1,2})"}; // Numeric representation of a month, without leading zeros
    case "m":
        return {g:1,
            c:"m = Math.max(0,parseInt(results[" + currentGroup + "], 10) - 1);\n",
            s:"(\\d{2})"}; // Numeric representation of a month, with leading zeros
    case "t":
        return {g:0,
            c:null,
            s:"\\d{1,2}"};
    case "L":
        return {g:0,
            c:null,
            s:"(?:1|0)"};
    case "Y":
        return {g:1,
            c:"y = parseInt(results[" + currentGroup + "], 10);\n",
            s:"(\\d{4})"};
    case "y":
        return {g:1,
            c:"var ty = parseInt(results[" + currentGroup + "], 10);\n"
                + "y = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",
            s:"(\\d{1,2})"};
    case "a":
        return {g:1,
            c:"if (results[" + currentGroup + "] == 'am') {\n"
                + "if (h == 12) { h = 0; }\n"
                + "} else { if (h < 12) { h += 12; }}",
            s:"(am|pm)"};
    case "A":
        return {g:1,
            c:"if (results[" + currentGroup + "] == 'AM') {\n"
                + "if (h == 12) { h = 0; }\n"
                + "} else { if (h < 12) { h += 12; }}",
            s:"(AM|PM)"};
    case "g":
    case "G":
        return {g:1,
            c:"h = parseInt(results[" + currentGroup + "], 10);\n",
            s:"(\\d{1,2})"}; // 12/24-hr format  format of an hour without leading zeroes
    case "h":
    case "H":
        return {g:1,
            c:"h = parseInt(results[" + currentGroup + "], 10);\n",
            s:"(\\d{2})"}; //  12/24-hr format  format of an hour with leading zeroes
    case "i":
        return {g:1,
            c:"i = parseInt(results[" + currentGroup + "], 10);\n",
            s:"(\\d{2})"};
    case "s":
        return {g:1,
            c:"s = parseInt(results[" + currentGroup + "], 10);\n",
            s:"(\\d{2})"};
    case "O":
        return {g:1,
            c:[
                "o = results[", currentGroup, "];\n",
                "var sn = o.substring(0,1);\n", // get + / - sign
                "var hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60);\n", // get hours (performs minutes-to-hour conversion also)
                "var mn = o.substring(3,5) % 60;\n", // get minutes
                "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))?\n", // -12hrs <= GMT offset <= 14hrs
                "    (sn + String.leftPad(hr, 2, 0) + String.leftPad(mn, 2, 0)) : null;\n"
            ].join(""),
            s:"([+\-]\\d{2,4})"};
    
    
    case "P":
    	return {g:1,
    		c:[
    		   "o = results[", currentGroup, "];\n",
    		   "var sn = o.substring(0,1);\n",
    		   "var hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60);\n",
    		   "var mn = o.substring(4,6) % 60;\n",
    		   "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))?\n",
    	                "    (sn + String.leftPad(hr, 2, 0) + String.leftPad(mn, 2, 0)) : null;\n"
            ].join(""),
            s:"([+\-]\\d{4})"};
    case "T":
        return {g:0,
            c:null,
            s:"[A-Z]{1,4}"}; // timezone abbrev. may be between 1 - 4 chars
    case "Z":
        return {g:1,
            c:"z = results[" + currentGroup + "];\n" // -43200 <= UTC offset <= 50400
                  + "z = (-43200 <= z*1 && z*1 <= 50400)? z : null;\n",
            s:"([+\-]?\\d{1,5})"}; // leading '+' sign is optional for UTC offset
    default:
        return {g:0,
            c:null,
            s:String.escape(character)};
    }
};

/**
 * Get the timezone abbreviation of the current date (equivalent to the format specifier 'T').
 * @return {String} The abbreviated timezone name (e.g. 'CST')
 */
Date.prototype.getTimezone = function() {
    return this.toString().replace(/^.*? ([A-Z]{1,4})[\-+][0-9]{4} .*$/, "$1");
};

/**
 * Get the offset from GMT of the current date (equivalent to the format specifier 'O').
 * @return {String} The 4-character offset string prefixed with + or - (e.g. '-0600')
 */
Date.prototype.getGMTOffset = function() {
    return (this.getTimezoneOffset() > 0 ? "-" : "+")
        + String.leftPad(Math.abs(Math.floor(this.getTimezoneOffset() / 60)), 2, "0")
        + String.leftPad(this.getTimezoneOffset() % 60, 2, "0");
};

/**
 * Get the offset from GMT of the current date (equivalent to the format specifier 'P').
 * @return {String} 2-characters representing hours and 2-characters representing minutes
 * seperated by a colon and prefixed with + or - (e.g. '-06:00')
 */
Date.prototype.getGMTColonOffset = function() {
	return (this.getTimezoneOffset() > 0 ? "-" : "+")
		+ String.leftPad(Math.abs(Math.floor(this.getTimezoneOffset() / 60)), 2, "0")
		+ ":"
		+ String.leftPad(this.getTimezoneOffset() %60, 2, "0");
}

/**
 * Get the numeric day number of the year, adjusted for leap year.
 * @return {Number} 0 through 364 (365 in leap years)
 */
Date.prototype.getDayOfYear = function() {
    var num = 0;
    Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
    for (var i = 0; i < this.getMonth(); ++i) {
        num += Date.daysInMonth[i];
    }
    return num + this.getDate() - 1;
};

/**
 * Get the string representation of the numeric week number of the year
 * (equivalent to the format specifier 'W').
 * @return {String} '00' through '52'
 */
Date.prototype.getWeekOfYear = function() {
    // Skip to Thursday of this week
    var now = this.getDayOfYear() + (4 - this.getDay());
    // Find the first Thursday of the year
    var jan1 = new Date(this.getFullYear(), 0, 1);
    var then = (7 - jan1.getDay() + 4);
    return String.leftPad(((now - then) / 7) + 1, 2, "0");
};

/**
 * Whether or not the current date is in a leap year.
 * @return {Boolean} True if the current date is in a leap year, else false
 */
Date.prototype.isLeapYear = function() {
    var year = this.getFullYear();
    return ((year & 3) == 0 && (year % 100 || (year % 400 == 0 && year)));
};

/**
 * Get the first day of the current month, adjusted for leap year.  The returned value
 * is the numeric day index within the week (0-6) which can be used in conjunction with
 * the {@link #monthNames} array to retrieve the textual day name.
 * Example:
 *<pre><code>
var dt = new Date('1/10/2007');
document.write(Date.dayNames[dt.getFirstDayOfMonth()]); //output: 'Monday'
</code></pre>
 * @return {Number} The day number (0-6)
 */
Date.prototype.getFirstDayOfMonth = function() {
    var day = (this.getDay() - (this.getDate() - 1)) % 7;
    return (day < 0) ? (day + 7) : day;
};

/**
 * Get the last day of the current month, adjusted for leap year.  The returned value
 * is the numeric day index within the week (0-6) which can be used in conjunction with
 * the {@link #monthNames} array to retrieve the textual day name.
 * Example:
 *<pre><code>
var dt = new Date('1/10/2007');
document.write(Date.dayNames[dt.getLastDayOfMonth()]); //output: 'Wednesday'
</code></pre>
 * @return {Number} The day number (0-6)
 */
Date.prototype.getLastDayOfMonth = function() {
    var day = (this.getDay() + (Date.daysInMonth[this.getMonth()] - this.getDate())) % 7;
    return (day < 0) ? (day + 7) : day;
};


/**
 * Get the first date of this date's month
 * @return {Date}
 */
Date.prototype.getFirstDateOfMonth = function() {
    return new Date(this.getFullYear(), this.getMonth(), 1);
};

/**
 * Get the last date of this date's month
 * @return {Date}
 */
Date.prototype.getLastDateOfMonth = function() {
    return new Date(this.getFullYear(), this.getMonth(), this.getDaysInMonth());
};
/**
 * Get the number of days in the current month, adjusted for leap year.
 * @return {Number} The number of days in the month
 */
Date.prototype.getDaysInMonth = function() {
    Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
    return Date.daysInMonth[this.getMonth()];
};

/**
 * Get the English ordinal suffix of the current day (equivalent to the format specifier 'S').
 * @return {String} 'st, 'nd', 'rd' or 'th'
 */
Date.prototype.getSuffix = function() {
    switch (this.getDate()) {
        case 1:
        case 21:
        case 31:
            return "st";
        case 2:
        case 22:
            return "nd";
        case 3:
        case 23:
            return "rd";
        default:
            return "th";
    }
};

// private
Date.daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

/**
 * An array of textual month names.
 * Override these values for international dates, for example...
 * Date.monthNames = ['JanInYourLang', 'FebInYourLang', ...];
 * @type Array
 * @static
 */
Date.monthNames =
   ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"];

/**
 * An array of textual day names.
 * Override these values for international dates, for example...
 * Date.dayNames = ['SundayInYourLang', 'MondayInYourLang', ...];
 * @type Array
 * @static
 */
Date.dayNames =
   ["Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"];

// private
Date.y2kYear = 50;
// private
Date.monthNumbers = {
    Jan:0,
    Feb:1,
    Mar:2,
    Apr:3,
    May:4,
    Jun:5,
    Jul:6,
    Aug:7,
    Sep:8,
    Oct:9,
    Nov:10,
    Dec:11};

/**
 * Creates and returns a new Date instance with the exact same date value as the called instance.
 * Dates are copied and passed by reference, so if a copied date variable is modified later, the original
 * variable will also be changed.  When the intention is to create a new variable that will not
 * modify the original instance, you should create a clone.
 *
 * Example of correctly cloning a date:
 * <pre><code>
//wrong way:
var orig = new Date('10/1/2006');
var copy = orig;
copy.setDate(5);
document.write(orig);  //returns 'Thu Oct 05 2006'!

//correct way:
var orig = new Date('10/1/2006');
var copy = orig.clone();
copy.setDate(5);
document.write(orig);  //returns 'Thu Oct 01 2006'
</code></pre>
 * @return {Date} The new Date instance
 */
Date.prototype.clone = function() {
	return new Date(this.getTime());
};

/**
 * Clears any time information from this date
 @param {Boolean} clone true to create a clone of this date, clear the time and return it
 @return {Date} this or the clone
 */
Date.prototype.clearTime = function(clone){
    if(clone){
        return this.clone().clearTime();
    }
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
    return this;
};

// private
// safari setMonth is broken -- check that this is only donw once...
if(Roo.isSafari && typeof(Date.brokenSetMonth) == 'undefined'){
    Date.brokenSetMonth = Date.prototype.setMonth;
	Date.prototype.setMonth = function(num){
		if(num <= -1){
			var n = Math.ceil(-num);
			var back_year = Math.ceil(n/12);
			var month = (n % 12) ? 12 - n % 12 : 0 ;
			this.setFullYear(this.getFullYear() - back_year);
			return Date.brokenSetMonth.call(this, month);
		} else {
			return Date.brokenSetMonth.apply(this, arguments);
		}
	};
}

/** Date interval constant 
* @static 
* @type String */
Date.MILLI = "ms";
/** Date interval constant 
* @static 
* @type String */
Date.SECOND = "s";
/** Date interval constant 
* @static 
* @type String */
Date.MINUTE = "mi";
/** Date interval constant 
* @static 
* @type String */
Date.HOUR = "h";
/** Date interval constant 
* @static 
* @type String */
Date.DAY = "d";
/** Date interval constant 
* @static 
* @type String */
Date.MONTH = "mo";
/** Date interval constant 
* @static 
* @type String */
Date.YEAR = "y";

/**
 * Provides a convenient method of performing basic date arithmetic.  This method
 * does not modify the Date instance being called - it creates and returns
 * a new Date instance containing the resulting date value.
 *
 * Examples:
 * <pre><code>
//Basic usage:
var dt = new Date('10/29/2006').add(Date.DAY, 5);
document.write(dt); //returns 'Fri Oct 06 2006 00:00:00'

//Negative values will subtract correctly:
var dt2 = new Date('10/1/2006').add(Date.DAY, -5);
document.write(dt2); //returns 'Tue Sep 26 2006 00:00:00'

//You can even chain several calls together in one line!
var dt3 = new Date('10/1/2006').add(Date.DAY, 5).add(Date.HOUR, 8).add(Date.MINUTE, -30);
document.write(dt3); //returns 'Fri Oct 06 2006 07:30:00'
 </code></pre>
 *
 * @param {String} interval   A valid date interval enum value
 * @param {Number} value      The amount to add to the current date
 * @return {Date} The new Date instance
 */
Date.prototype.add = function(interval, value){
  var d = this.clone();
  if (!interval || value === 0) { return d; }
  switch(interval.toLowerCase()){
    case Date.MILLI:
      d.setMilliseconds(this.getMilliseconds() + value);
      break;
    case Date.SECOND:
      d.setSeconds(this.getSeconds() + value);
      break;
    case Date.MINUTE:
      d.setMinutes(this.getMinutes() + value);
      break;
    case Date.HOUR:
      d.setHours(this.getHours() + value);
      break;
    case Date.DAY:
      d.setDate(this.getDate() + value);
      break;
    case Date.MONTH:
      var day = this.getDate();
      if(day > 28){
          day = Math.min(day, this.getFirstDateOfMonth().add('mo', value).getLastDateOfMonth().getDate());
      }
      d.setDate(day);
      d.setMonth(this.getMonth() + value);
      break;
    case Date.YEAR:
      d.setFullYear(this.getFullYear() + value);
      break;
  }
  return d;
};
/**
 * @class Roo.lib.Dom
 * @licence LGPL
 * @static
 * 
 * Dom utils (from YIU afaik)
 *
 * 
 **/
Roo.lib.Dom = {
    /**
     * Get the view width
     * @param {Boolean} full True will get the full document, otherwise it's the view width
     * @return {Number} The width
     */
     
    getViewWidth : function(full) {
        return full ? this.getDocumentWidth() : this.getViewportWidth();
    },
    /**
     * Get the view height
     * @param {Boolean} full True will get the full document, otherwise it's the view height
     * @return {Number} The height
     */
    getViewHeight : function(full) {
        return full ? this.getDocumentHeight() : this.getViewportHeight();
    },
    /**
     * Get the Full Document height 
     * @return {Number} The height
     */
    getDocumentHeight: function() {
        var scrollHeight = (document.compatMode != "CSS1Compat") ? document.body.scrollHeight : document.documentElement.scrollHeight;
        return Math.max(scrollHeight, this.getViewportHeight());
    },
    /**
     * Get the Full Document width
     * @return {Number} The width
     */
    getDocumentWidth: function() {
        var scrollWidth = (document.compatMode != "CSS1Compat") ? document.body.scrollWidth : document.documentElement.scrollWidth;
        return Math.max(scrollWidth, this.getViewportWidth());
    },
    /**
     * Get the Window Viewport height
     * @return {Number} The height
     */
    getViewportHeight: function() {
        var height = self.innerHeight;
        var mode = document.compatMode;

        if ((mode || Roo.isIE) && !Roo.isOpera) {
            height = (mode == "CSS1Compat") ?
                     document.documentElement.clientHeight :
                     document.body.clientHeight;
        }

        return height;
    },
    /**
     * Get the Window Viewport width
     * @return {Number} The width
     */
    getViewportWidth: function() {
        var width = self.innerWidth;
        var mode = document.compatMode;

        if (mode || Roo.isIE) {
            width = (mode == "CSS1Compat") ?
                    document.documentElement.clientWidth :
                    document.body.clientWidth;
        }
        return width;
    },

    isAncestor : function(p, c) {
        p = Roo.getDom(p);
        c = Roo.getDom(c);
        if (!p || !c) {
            return false;
        }

        if (p.contains && !Roo.isSafari) {
            return p.contains(c);
        } else if (p.compareDocumentPosition) {
            return !!(p.compareDocumentPosition(c) & 16);
        } else {
            var parent = c.parentNode;
            while (parent) {
                if (parent == p) {
                    return true;
                }
                else if (!parent.tagName || parent.tagName.toUpperCase() == "HTML") {
                    return false;
                }
                parent = parent.parentNode;
            }
            return false;
        }
    },

    getRegion : function(el) {
        return Roo.lib.Region.getRegion(el);
    },

    getY : function(el) {
        return this.getXY(el)[1];
    },

    getX : function(el) {
        return this.getXY(el)[0];
    },

    getXY : function(el) {
        var p, pe, b, scroll, bd = document.body;
        el = Roo.getDom(el);
        var fly = Roo.lib.AnimBase.fly;
        if (el.getBoundingClientRect) {
            b = el.getBoundingClientRect();
            scroll = fly(document).getScroll();
            return [b.left + scroll.left, b.top + scroll.top];
        }
        var x = 0, y = 0;

        p = el;

        var hasAbsolute = fly(el).getStyle("position") == "absolute";

        while (p) {

            x += p.offsetLeft;
            y += p.offsetTop;

            if (!hasAbsolute && fly(p).getStyle("position") == "absolute") {
                hasAbsolute = true;
            }

            if (Roo.isGecko) {
                pe = fly(p);

                var bt = parseInt(pe.getStyle("borderTopWidth"), 10) || 0;
                var bl = parseInt(pe.getStyle("borderLeftWidth"), 10) || 0;


                x += bl;
                y += bt;


                if (p != el && pe.getStyle('overflow') != 'visible') {
                    x += bl;
                    y += bt;
                }
            }
            p = p.offsetParent;
        }

        if (Roo.isSafari && hasAbsolute) {
            x -= bd.offsetLeft;
            y -= bd.offsetTop;
        }

        if (Roo.isGecko && !hasAbsolute) {
            var dbd = fly(bd);
            x += parseInt(dbd.getStyle("borderLeftWidth"), 10) || 0;
            y += parseInt(dbd.getStyle("borderTopWidth"), 10) || 0;
        }

        p = el.parentNode;
        while (p && p != bd) {
            if (!Roo.isOpera || (p.tagName != 'TR' && fly(p).getStyle("display") != "inline")) {
                x -= p.scrollLeft;
                y -= p.scrollTop;
            }
            p = p.parentNode;
        }
        return [x, y];
    },
 
  


    setXY : function(el, xy) {
        el = Roo.fly(el, '_setXY');
        el.position();
        var pts = el.translatePoints(xy);
        if (xy[0] !== false) {
            el.dom.style.left = pts.left + "px";
        }
        if (xy[1] !== false) {
            el.dom.style.top = pts.top + "px";
        }
    },

    setX : function(el, x) {
        this.setXY(el, [x, false]);
    },

    setY : function(el, y) {
        this.setXY(el, [false, y]);
    }
};
/*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */

Roo.lib.Event = function() {
    var loadComplete = false;
    var listeners = [];
    var unloadListeners = [];
    var retryCount = 0;
    var onAvailStack = [];
    var counter = 0;
    var lastError = null;

    return {
        POLL_RETRYS: 200,
        POLL_INTERVAL: 20,
        EL: 0,
        TYPE: 1,
        FN: 2,
        WFN: 3,
        OBJ: 3,
        ADJ_SCOPE: 4,
        _interval: null,

        startInterval: function() {
            if (!this._interval) {
                var self = this;
                var callback = function() {
                    self._tryPreloadAttach();
                };
                this._interval = setInterval(callback, this.POLL_INTERVAL);

            }
        },

        onAvailable: function(p_id, p_fn, p_obj, p_override) {
            onAvailStack.push({ id:         p_id,
                fn:         p_fn,
                obj:        p_obj,
                override:   p_override,
                checkReady: false    });

            retryCount = this.POLL_RETRYS;
            this.startInterval();
        },


        addListener: function(el, eventName, fn) {
            el = Roo.getDom(el);
            if (!el || !fn) {
                return false;
            }

            if ("unload" == eventName) {
                unloadListeners[unloadListeners.length] =
                [el, eventName, fn];
                return true;
            }

            var wrappedFn = function(e) {
                return fn(Roo.lib.Event.getEvent(e));
            };

            var li = [el, eventName, fn, wrappedFn];

            var index = listeners.length;
            listeners[index] = li;

            this.doAdd(el, eventName, wrappedFn, false);
            return true;

        },


        removeListener: function(el, eventName, fn) {
            var i, len;

            el = Roo.getDom(el);

            if(!fn) {
                return this.purgeElement(el, false, eventName);
            }


            if ("unload" == eventName) {

                for (i = 0,len = unloadListeners.length; i < len; i++) {
                    var li = unloadListeners[i];
                    if (li &&
                        li[0] == el &&
                        li[1] == eventName &&
                        li[2] == fn) {
                        unloadListeners.splice(i, 1);
                        return true;
                    }
                }

                return false;
            }

            var cacheItem = null;


            var index = arguments[3];

            if ("undefined" == typeof index) {
                index = this._getCacheIndex(el, eventName, fn);
            }

            if (index >= 0) {
                cacheItem = listeners[index];
            }

            if (!el || !cacheItem) {
                return false;
            }

            this.doRemove(el, eventName, cacheItem[this.WFN], false);

            delete listeners[index][this.WFN];
            delete listeners[index][this.FN];
            listeners.splice(index, 1);

            return true;

        },


        getTarget: function(ev, resolveTextNode) {
            ev = ev.browserEvent || ev;
            ev = ev.touches ? (ev.touches[0] || ev.changedTouches[0] || ev )  : ev;
            var t = ev.target || ev.srcElement;
            return this.resolveTextNode(t);
        },


        resolveTextNode: function(node) {
            if (Roo.isSafari && node && 3 == node.nodeType) {
                return node.parentNode;
            } else {
                return node;
            }
        },


        getPageX: function(ev) {
            ev = ev.browserEvent || ev;
            ev = ev.touches ? (ev.touches[0] || ev.changedTouches[0] || ev )  : ev;
            var x = ev.pageX;
            if (!x && 0 !== x) {
                x = ev.clientX || 0;

                if (Roo.isIE) {
                    x += this.getScroll()[1];
                }
            }

            return x;
        },


        getPageY: function(ev) {
            ev = ev.browserEvent || ev;
            ev = ev.touches ? (ev.touches[0] || ev.changedTouches[0] || ev )  : ev;
            var y = ev.pageY;
            if (!y && 0 !== y) {
                y = ev.clientY || 0;

                if (Roo.isIE) {
                    y += this.getScroll()[0];
                }
            }


            return y;
        },


        getXY: function(ev) {
            ev = ev.browserEvent || ev;
            ev = ev.touches ? (ev.touches[0] || ev.changedTouches[0] || ev )  : ev;
            return [this.getPageX(ev), this.getPageY(ev)];
        },


        getRelatedTarget: function(ev) {
            ev = ev.browserEvent || ev;
            ev = ev.touches ? (ev.touches[0] || ev.changedTouches[0] || ev )  : ev;
            var t = ev.relatedTarget;
            if (!t) {
                if (ev.type == "mouseout") {
                    t = ev.toElement;
                } else if (ev.type == "mouseover") {
                    t = ev.fromElement;
                }
            }

            return this.resolveTextNode(t);
        },


        getTime: function(ev) {
            ev = ev.browserEvent || ev;
            ev = ev.touches ? (ev.touches[0] || ev.changedTouches[0] || ev )  : ev;
            if (!ev.time) {
                var t = new Date().getTime();
                try {
                    ev.time = t;
                } catch(ex) {
                    this.lastError = ex;
                    return t;
                }
            }

            return ev.time;
        },


        stopEvent: function(ev) {
            this.stopPropagation(ev);
            this.preventDefault(ev);
        },


        stopPropagation: function(ev) {
            ev = ev.browserEvent || ev;
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.cancelBubble = true;
            }
        },


        preventDefault: function(ev) {
            ev = ev.browserEvent || ev;
            if(ev.preventDefault) {
                ev.preventDefault();
            } else {
                ev.returnValue = false;
            }
        },


        getEvent: function(e) {
            var ev = e || window.event;
            if (!ev) {
                var c = this.getEvent.caller;
                while (c) {
                    ev = c.arguments[0];
                    if (ev && Event == ev.constructor) {
                        break;
                    }
                    c = c.caller;
                }
            }
            return ev;
        },


        getCharCode: function(ev) {
            ev = ev.browserEvent || ev;
            return ev.charCode || ev.keyCode || 0;
        },


        _getCacheIndex: function(el, eventName, fn) {
            for (var i = 0,len = listeners.length; i < len; ++i) {
                var li = listeners[i];
                if (li &&
                    li[this.FN] == fn &&
                    li[this.EL] == el &&
                    li[this.TYPE] == eventName) {
                    return i;
                }
            }

            return -1;
        },


        elCache: {},


        getEl: function(id) {
            return document.getElementById(id);
        },


        clearCache: function() {
        },


        _load: function(e) {
            loadComplete = true;
            var EU = Roo.lib.Event;


            if (Roo.isIE) {
                EU.doRemove(window, "load", EU._load);
            }
        },


        _tryPreloadAttach: function() {

            if (this.locked) {
                return false;
            }

            this.locked = true;


            var tryAgain = !loadComplete;
            if (!tryAgain) {
                tryAgain = (retryCount > 0);
            }


            var notAvail = [];
            for (var i = 0,len = onAvailStack.length; i < len; ++i) {
                var item = onAvailStack[i];
                if (item) {
                    var el = this.getEl(item.id);

                    if (el) {
                        if (!item.checkReady ||
                            loadComplete ||
                            el.nextSibling ||
                            (document && document.body)) {

                            var scope = el;
                            if (item.override) {
                                if (item.override === true) {
                                    scope = item.obj;
                                } else {
                                    scope = item.override;
                                }
                            }
                            item.fn.call(scope, item.obj);
                            onAvailStack[i] = null;
                        }
                    } else {
                        notAvail.push(item);
                    }
                }
            }

            retryCount = (notAvail.length === 0) ? 0 : retryCount - 1;

            if (tryAgain) {

                this.startInterval();
            } else {
                clearInterval(this._interval);
                this._interval = null;
            }

            this.locked = false;

            return true;

        },


        purgeElement: function(el, recurse, eventName) {
            var elListeners = this.getListeners(el, eventName);
            if (elListeners) {
                for (var i = 0,len = elListeners.length; i < len; ++i) {
                    var l = elListeners[i];
                    this.removeListener(el, l.type, l.fn);
                }
            }

            if (recurse && el && el.childNodes) {
                for (i = 0,len = el.childNodes.length; i < len; ++i) {
                    this.purgeElement(el.childNodes[i], recurse, eventName);
                }
            }
        },


        getListeners: function(el, eventName) {
            var results = [], searchLists;
            if (!eventName) {
                searchLists = [listeners, unloadListeners];
            } else if (eventName == "unload") {
                searchLists = [unloadListeners];
            } else {
                searchLists = [listeners];
            }

            for (var j = 0; j < searchLists.length; ++j) {
                var searchList = searchLists[j];
                if (searchList && searchList.length > 0) {
                    for (var i = 0,len = searchList.length; i < len; ++i) {
                        var l = searchList[i];
                        if (l && l[this.EL] === el &&
                            (!eventName || eventName === l[this.TYPE])) {
                            results.push({
                                type:   l[this.TYPE],
                                fn:     l[this.FN],
                                obj:    l[this.OBJ],
                                adjust: l[this.ADJ_SCOPE],
                                index:  i
                            });
                        }
                    }
                }
            }

            return (results.length) ? results : null;
        },


        _unload: function(e) {

            var EU = Roo.lib.Event, i, j, l, len, index;

            for (i = 0,len = unloadListeners.length; i < len; ++i) {
                l = unloadListeners[i];
                if (l) {
                    var scope = window;
                    if (l[EU.ADJ_SCOPE]) {
                        if (l[EU.ADJ_SCOPE] === true) {
                            scope = l[EU.OBJ];
                        } else {
                            scope = l[EU.ADJ_SCOPE];
                        }
                    }
                    l[EU.FN].call(scope, EU.getEvent(e), l[EU.OBJ]);
                    unloadListeners[i] = null;
                    l = null;
                    scope = null;
                }
            }

            unloadListeners = null;

            if (listeners && listeners.length > 0) {
                j = listeners.length;
                while (j) {
                    index = j - 1;
                    l = listeners[index];
                    if (l) {
                        EU.removeListener(l[EU.EL], l[EU.TYPE],
                                l[EU.FN], index);
                    }
                    j = j - 1;
                }
                l = null;

                EU.clearCache();
            }

            EU.doRemove(window, "unload", EU._unload);

        },


        getScroll: function() {
            var dd = document.documentElement, db = document.body;
            if (dd && (dd.scrollTop || dd.scrollLeft)) {
                return [dd.scrollTop, dd.scrollLeft];
            } else if (db) {
                return [db.scrollTop, db.scrollLeft];
            } else {
                return [0, 0];
            }
        },


        doAdd: function () {
            if (window.addEventListener) {
                return function(el, eventName, fn, capture) {
                    el.addEventListener(eventName, fn, (capture));
                };
            } else if (window.attachEvent) {
                return function(el, eventName, fn, capture) {
                    el.attachEvent("on" + eventName, fn);
                };
            } else {
                return function() {
                };
            }
        }(),


        doRemove: function() {
            if (window.removeEventListener) {
                return function (el, eventName, fn, capture) {
                    el.removeEventListener(eventName, fn, (capture));
                };
            } else if (window.detachEvent) {
                return function (el, eventName, fn) {
                    el.detachEvent("on" + eventName, fn);
                };
            } else {
                return function() {
                };
            }
        }()
    };
    
}();
(function() {     
   
    var E = Roo.lib.Event;
    E.on = E.addListener;
    E.un = E.removeListener;

    if (document && document.body) {
        E._load();
    } else {
        E.doAdd(window, "load", E._load);
    }
    E.doAdd(window, "unload", E._unload);
    E._tryPreloadAttach();
})();

 

(function() {
    /**
     * @class Roo.lib.Ajax
     *
     * provide a simple Ajax request utility functions
     * 
     * Portions of this file are based on pieces of Yahoo User Interface Library
    * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
    * YUI licensed under the BSD License:
    * http://developer.yahoo.net/yui/license.txt
    * <script type="text/javascript">
    *
     *
     */
    Roo.lib.Ajax = {
        /**
         * @static 
         */
        request : function(method, uri, cb, data, options) {
            if(options){
                var hs = options.headers;
                if(hs){
                    for(var h in hs){
                        if(hs.hasOwnProperty(h)){
                            this.initHeader(h, hs[h], false);
                        }
                    }
                }
                if(options.xmlData){
                    this.initHeader('Content-Type', 'text/xml', false);
                    method = 'POST';
                    data = options.xmlData;
                }
            }

            return this.asyncRequest(method, uri, cb, data);
        },
        /**
         * serialize a form
         *
         * @static
         * @param {DomForm} form element
         * @return {String} urlencode form output.
         */
        serializeForm : function(form, include_disabled) {
            
            include_disabled = typeof(include_disabled) == 'undefined' ? false : include_disabled;

            if(typeof form == 'string') {
                form = (document.getElementById(form) || document.forms[form]);
            }

            var el, name, val, disabled, data = '', hasSubmit = false;
            for (var i = 0; i < form.elements.length; i++) {
                el = form.elements[i];
                disabled = include_disabled ? false : form.elements[i].disabled;
                name = form.elements[i].name;
                val = form.elements[i].value;

                if (!disabled && name){
                    switch (el.type)
                            {
                        case 'select-one':
                        case 'select-multiple':
                            for (var j = 0; j < el.options.length; j++) {
                                if (el.options[j].selected) {
                                    if (Roo.isIE) {
                                        data += Roo.encodeURIComponent(name) + '=' + Roo.encodeURIComponent(el.options[j].attributes['value'].specified ? el.options[j].value : el.options[j].text) + '&';
                                    }
                                    else {
                                        data += Roo.encodeURIComponent(name) + '=' + Roo.encodeURIComponent(el.options[j].hasAttribute('value') ? el.options[j].value : el.options[j].text) + '&';
                                    }
                                }
                            }
                            break;
                        case 'radio':
                        case 'checkbox':
                            if (el.checked) {
                                data += Roo.encodeURIComponent(name) + '=' + Roo.encodeURIComponent(val) + '&';
                            }
                            break;
                        case 'file':

                        case undefined:

                        case 'reset':

                        case 'button':

                            break;
                        case 'submit':
                            if(hasSubmit == false) {
                                data += Roo.encodeURIComponent(name) + '=' + Roo.encodeURIComponent(val) + '&';
                                hasSubmit = true;
                            }
                            break;
                        default:
                            data += Roo.encodeURIComponent(name) + '=' + Roo.encodeURIComponent(val) + '&';
                            break;
                    }
                }
            }
            data = data.substr(0, data.length - 1);
            return data;
        },

        headers:{},

        hasHeaders:false,

        useDefaultHeader:true,

        defaultPostHeader:'application/x-www-form-urlencoded',

        useDefaultXhrHeader:true,

        defaultXhrHeader:'XMLHttpRequest',

        hasDefaultHeaders:true,

        defaultHeaders:{},

        poll:{},

        timeout:{},

        pollInterval:50,

        transactionId:0,

        setProgId:function(id)
        {
            this.activeX.unshift(id);
        },

        setDefaultPostHeader:function(b)
        {
            this.useDefaultHeader = b;
        },

        setDefaultXhrHeader:function(b)
        {
            this.useDefaultXhrHeader = b;
        },

        setPollingInterval:function(i)
        {
            if (typeof i == 'number' && isFinite(i)) {
                this.pollInterval = i;
            }
        },

        createXhrObject:function(transactionId)
        {
            var obj,http;
            try
            {

                http = new XMLHttpRequest();

                obj = { conn:http, tId:transactionId };
            }
            catch(e)
            {
                for (var i = 0; i < this.activeX.length; ++i) {
                    try
                    {

                        http = new ActiveXObject(this.activeX[i]);

                        obj = { conn:http, tId:transactionId };
                        break;
                    }
                    catch(e) {
                    }
                }
            }
            finally
            {
                return obj;
            }
        },

        getConnectionObject:function()
        {
            var o;
            var tId = this.transactionId;

            try
            {
                o = this.createXhrObject(tId);
                if (o) {
                    this.transactionId++;
                }
            }
            catch(e) {
            }
            finally
            {
                return o;
            }
        },

        asyncRequest:function(method, uri, callback, postData)
        {
            var o = this.getConnectionObject();

            if (!o) {
                return null;
            }
            else {
                o.conn.open(method, uri, true);

                if (this.useDefaultXhrHeader) {
                    if (!this.defaultHeaders['X-Requested-With']) {
                        this.initHeader('X-Requested-With', this.defaultXhrHeader, true);
                    }
                }

                if(postData && this.useDefaultHeader){
                    this.initHeader('Content-Type', this.defaultPostHeader);
                }

                 if (this.hasDefaultHeaders || this.hasHeaders) {
                    this.setHeader(o);
                }

                this.handleReadyState(o, callback);
                o.conn.send(postData || null);

                return o;
            }
        },

        handleReadyState:function(o, callback)
        {
            var oConn = this;

            if (callback && callback.timeout) {
                
                this.timeout[o.tId] = window.setTimeout(function() {
                    oConn.abort(o, callback, true);
                }, callback.timeout);
            }

            this.poll[o.tId] = window.setInterval(
                    function() {
                        if (o.conn && o.conn.readyState == 4) {
                            window.clearInterval(oConn.poll[o.tId]);
                            delete oConn.poll[o.tId];

                            if(callback && callback.timeout) {
                                window.clearTimeout(oConn.timeout[o.tId]);
                                delete oConn.timeout[o.tId];
                            }

                            oConn.handleTransactionResponse(o, callback);
                        }
                    }
                    , this.pollInterval);
        },

        handleTransactionResponse:function(o, callback, isAbort)
        {

            if (!callback) {
                this.releaseObject(o);
                return;
            }

            var httpStatus, responseObject;

            try
            {
                if (o.conn.status !== undefined && o.conn.status != 0) {
                    httpStatus = o.conn.status;
                }
                else {
                    httpStatus = 13030;
                }
            }
            catch(e) {


                httpStatus = 13030;
            }

            if (httpStatus >= 200 && httpStatus < 300) {
                responseObject = this.createResponseObject(o, callback.argument);
                if (callback.success) {
                    if (!callback.scope) {
                        callback.success(responseObject);
                    }
                    else {


                        callback.success.apply(callback.scope, [responseObject]);
                    }
                }
            }
            else {
                switch (httpStatus) {

                    case 12002:
                    case 12029:
                    case 12030:
                    case 12031:
                    case 12152:
                    case 13030:
                        responseObject = this.createExceptionObject(o.tId, callback.argument, (isAbort ? isAbort : false));
                        if (callback.failure) {
                            if (!callback.scope) {
                                callback.failure(responseObject);
                            }
                            else {
                                callback.failure.apply(callback.scope, [responseObject]);
                            }
                        }
                        break;
                    default:
                        responseObject = this.createResponseObject(o, callback.argument);
                        if (callback.failure) {
                            if (!callback.scope) {
                                callback.failure(responseObject);
                            }
                            else {
                                callback.failure.apply(callback.scope, [responseObject]);
                            }
                        }
                }
            }

            this.releaseObject(o);
            responseObject = null;
        },

        createResponseObject:function(o, callbackArg)
        {
            var obj = {};
            var headerObj = {};

            try
            {
                var headerStr = o.conn.getAllResponseHeaders();
                var header = headerStr.split('\n');
                for (var i = 0; i < header.length; i++) {
                    var delimitPos = header[i].indexOf(':');
                    if (delimitPos != -1) {
                        headerObj[header[i].substring(0, delimitPos)] = header[i].substring(delimitPos + 2);
                    }
                }
            }
            catch(e) {
            }

            obj.tId = o.tId;
            obj.status = o.conn.status;
            obj.statusText = o.conn.statusText;
            obj.getResponseHeader = headerObj;
            obj.getAllResponseHeaders = headerStr;
            obj.responseText = o.conn.responseText;
            obj.responseXML = o.conn.responseXML;

            if (typeof callbackArg !== undefined) {
                obj.argument = callbackArg;
            }

            return obj;
        },

        createExceptionObject:function(tId, callbackArg, isAbort)
        {
            var COMM_CODE = 0;
            var COMM_ERROR = 'communication failure';
            var ABORT_CODE = -1;
            var ABORT_ERROR = 'transaction aborted';

            var obj = {};

            obj.tId = tId;
            if (isAbort) {
                obj.status = ABORT_CODE;
                obj.statusText = ABORT_ERROR;
            }
            else {
                obj.status = COMM_CODE;
                obj.statusText = COMM_ERROR;
            }

            if (callbackArg) {
                obj.argument = callbackArg;
            }

            return obj;
        },

        initHeader:function(label, value, isDefault)
        {
            var headerObj = (isDefault) ? this.defaultHeaders : this.headers;

            if (headerObj[label] === undefined) {
                headerObj[label] = value;
            }
            else {


                headerObj[label] = value + "," + headerObj[label];
            }

            if (isDefault) {
                this.hasDefaultHeaders = true;
            }
            else {
                this.hasHeaders = true;
            }
        },


        setHeader:function(o)
        {
            if (this.hasDefaultHeaders) {
                for (var prop in this.defaultHeaders) {
                    if (this.defaultHeaders.hasOwnProperty(prop)) {
                        o.conn.setRequestHeader(prop, this.defaultHeaders[prop]);
                    }
                }
            }

            if (this.hasHeaders) {
                for (var prop in this.headers) {
                    if (this.headers.hasOwnProperty(prop)) {
                        o.conn.setRequestHeader(prop, this.headers[prop]);
                    }
                }
                this.headers = {};
                this.hasHeaders = false;
            }
        },

        resetDefaultHeaders:function() {
            delete this.defaultHeaders;
            this.defaultHeaders = {};
            this.hasDefaultHeaders = false;
        },

        abort:function(o, callback, isTimeout)
        {
            if(this.isCallInProgress(o)) {
                o.conn.abort();
                window.clearInterval(this.poll[o.tId]);
                delete this.poll[o.tId];
                if (isTimeout) {
                    delete this.timeout[o.tId];
                }

                this.handleTransactionResponse(o, callback, true);

                return true;
            }
            else {
                return false;
            }
        },


        isCallInProgress:function(o)
        {
            if (o && o.conn) {
                return o.conn.readyState != 4 && o.conn.readyState != 0;
            }
            else {

                return false;
            }
        },


        releaseObject:function(o)
        {

            o.conn = null;

            o = null;
        },

        activeX:[
        'MSXML2.XMLHTTP.3.0',
        'MSXML2.XMLHTTP',
        'Microsoft.XMLHTTP'
        ]


    };
})();/*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */

Roo.lib.Region = function(t, r, b, l) {
    this.top = t;
    this[1] = t;
    this.right = r;
    this.bottom = b;
    this.left = l;
    this[0] = l;
};


Roo.lib.Region.prototype = {
    contains : function(region) {
        return ( region.left >= this.left &&
                 region.right <= this.right &&
                 region.top >= this.top &&
                 region.bottom <= this.bottom    );

    },

    getArea : function() {
        return ( (this.bottom - this.top) * (this.right - this.left) );
    },

    intersect : function(region) {
        var t = Math.max(this.top, region.top);
        var r = Math.min(this.right, region.right);
        var b = Math.min(this.bottom, region.bottom);
        var l = Math.max(this.left, region.left);

        if (b >= t && r >= l) {
            return new Roo.lib.Region(t, r, b, l);
        } else {
            return null;
        }
    },
    union : function(region) {
        var t = Math.min(this.top, region.top);
        var r = Math.max(this.right, region.right);
        var b = Math.max(this.bottom, region.bottom);
        var l = Math.min(this.left, region.left);

        return new Roo.lib.Region(t, r, b, l);
    },

    adjust : function(t, l, b, r) {
        this.top += t;
        this.left += l;
        this.right += r;
        this.bottom += b;
        return this;
    }
};

Roo.lib.Region.getRegion = function(el) {
    var p = Roo.lib.Dom.getXY(el);

    var t = p[1];
    var r = p[0] + el.offsetWidth;
    var b = p[1] + el.offsetHeight;
    var l = p[0];

    return new Roo.lib.Region(t, r, b, l);
};
/*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */
//@@dep Roo.lib.Region


Roo.lib.Point = function(x, y) {
    if (x instanceof Array) {
        y = x[1];
        x = x[0];
    }
    this.x = this.right = this.left = this[0] = x;
    this.y = this.top = this.bottom = this[1] = y;
};

Roo.lib.Point.prototype = new Roo.lib.Region();
/*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */
 
(function() {   

    Roo.lib.Anim = {
        scroll : function(el, args, duration, easing, cb, scope) {
            this.run(el, args, duration, easing, cb, scope, Roo.lib.Scroll);
        },

        motion : function(el, args, duration, easing, cb, scope) {
            this.run(el, args, duration, easing, cb, scope, Roo.lib.Motion);
        },

        color : function(el, args, duration, easing, cb, scope) {
            this.run(el, args, duration, easing, cb, scope, Roo.lib.ColorAnim);
        },

        run : function(el, args, duration, easing, cb, scope, type) {
            type = type || Roo.lib.AnimBase;
            if (typeof easing == "string") {
                easing = Roo.lib.Easing[easing];
            }
            var anim = new type(el, args, duration, easing);
            anim.animateX(function() {
                Roo.callback(cb, scope);
            });
            return anim;
        }
    };
})();/*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */

(function() {    
    var libFlyweight;
    
    function fly(el) {
        if (!libFlyweight) {
            libFlyweight = new Roo.Element.Flyweight();
        }
        libFlyweight.dom = el;
        return libFlyweight;
    }

    // since this uses fly! - it cant be in DOM (which does not have fly yet..)
    
   
    
    Roo.lib.AnimBase = function(el, attributes, duration, method) {
        if (el) {
            this.init(el, attributes, duration, method);
        }
    };

    Roo.lib.AnimBase.fly = fly;
    
    
    
    Roo.lib.AnimBase.prototype = {

        toString: function() {
            var el = this.getEl();
            var id = el.id || el.tagName;
            return ("Anim " + id);
        },

        patterns: {
            noNegatives:        /width|height|opacity|padding/i,
            offsetAttribute:  /^((width|height)|(top|left))$/,
            defaultUnit:        /width|height|top$|bottom$|left$|right$/i,
            offsetUnit:         /\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i
        },


        doMethod: function(attr, start, end) {
            return this.method(this.currentFrame, start, end - start, this.totalFrames);
        },


        setAttribute: function(attr, val, unit) {
            if (this.patterns.noNegatives.test(attr)) {
                val = (val > 0) ? val : 0;
            }

            Roo.fly(this.getEl(), '_anim').setStyle(attr, val + unit);
        },


        getAttribute: function(attr) {
            var el = this.getEl();
            var val = fly(el).getStyle(attr);

            if (val !== 'auto' && !this.patterns.offsetUnit.test(val)) {
                return parseFloat(val);
            }

            var a = this.patterns.offsetAttribute.exec(attr) || [];
            var pos = !!( a[3] );
            var box = !!( a[2] );


            if (box || (fly(el).getStyle('position') == 'absolute' && pos)) {
                val = el['offset' + a[0].charAt(0).toUpperCase() + a[0].substr(1)];
            } else {
                val = 0;
            }

            return val;
        },


        getDefaultUnit: function(attr) {
            if (this.patterns.defaultUnit.test(attr)) {
                return 'px';
            }

            return '';
        },

        animateX : function(callback, scope) {
            var f = function() {
                this.onComplete.removeListener(f);
                if (typeof callback == "function") {
                    callback.call(scope || this, this);
                }
            };
            this.onComplete.addListener(f, this);
            this.animate();
        },


        setRuntimeAttribute: function(attr) {
            var start;
            var end;
            var attributes = this.attributes;

            this.runtimeAttributes[attr] = {};

            var isset = function(prop) {
                return (typeof prop !== 'undefined');
            };

            if (!isset(attributes[attr]['to']) && !isset(attributes[attr]['by'])) {
                return false;
            }

            start = ( isset(attributes[attr]['from']) ) ? attributes[attr]['from'] : this.getAttribute(attr);


            if (isset(attributes[attr]['to'])) {
                end = attributes[attr]['to'];
            } else if (isset(attributes[attr]['by'])) {
                if (start.constructor == Array) {
                    end = [];
                    for (var i = 0, len = start.length; i < len; ++i) {
                        end[i] = start[i] + attributes[attr]['by'][i];
                    }
                } else {
                    end = start + attributes[attr]['by'];
                }
            }

            this.runtimeAttributes[attr].start = start;
            this.runtimeAttributes[attr].end = end;


            this.runtimeAttributes[attr].unit = ( isset(attributes[attr].unit) ) ? attributes[attr]['unit'] : this.getDefaultUnit(attr);
        },


        init: function(el, attributes, duration, method) {

            var isAnimated = false;


            var startTime = null;


            var actualFrames = 0;


            el = Roo.getDom(el);


            this.attributes = attributes || {};


            this.duration = duration || 1;


            this.method = method || Roo.lib.Easing.easeNone;


            this.useSeconds = true;


            this.currentFrame = 0;


            this.totalFrames = Roo.lib.AnimMgr.fps;


            this.getEl = function() {
                return el;
            };


            this.isAnimated = function() {
                return isAnimated;
            };


            this.getStartTime = function() {
                return startTime;
            };

            this.runtimeAttributes = {};


            this.animate = function() {
                if (this.isAnimated()) {
                    return false;
                }

                this.currentFrame = 0;

                this.totalFrames = ( this.useSeconds ) ? Math.ceil(Roo.lib.AnimMgr.fps * this.duration) : this.duration;

                Roo.lib.AnimMgr.registerElement(this);
            };


            this.stop = function(finish) {
                if (finish) {
                    this.currentFrame = this.totalFrames;
                    this._onTween.fire();
                }
                Roo.lib.AnimMgr.stop(this);
            };

            var onStart = function() {
                this.onStart.fire();

                this.runtimeAttributes = {};
                for (var attr in this.attributes) {
                    this.setRuntimeAttribute(attr);
                }

                isAnimated = true;
                actualFrames = 0;
                startTime = new Date();
            };


            var onTween = function() {
                var data = {
                    duration: new Date() - this.getStartTime(),
                    currentFrame: this.currentFrame
                };

                data.toString = function() {
                    return (
                            'duration: ' + data.duration +
                            ', currentFrame: ' + data.currentFrame
                            );
                };

                this.onTween.fire(data);

                var runtimeAttributes = this.runtimeAttributes;

                for (var attr in runtimeAttributes) {
                    this.setAttribute(attr, this.doMethod(attr, runtimeAttributes[attr].start, runtimeAttributes[attr].end), runtimeAttributes[attr].unit);
                }

                actualFrames += 1;
            };

            var onComplete = function() {
                var actual_duration = (new Date() - startTime) / 1000 ;

                var data = {
                    duration: actual_duration,
                    frames: actualFrames,
                    fps: actualFrames / actual_duration
                };

                data.toString = function() {
                    return (
                            'duration: ' + data.duration +
                            ', frames: ' + data.frames +
                            ', fps: ' + data.fps
                            );
                };

                isAnimated = false;
                actualFrames = 0;
                this.onComplete.fire(data);
            };


            this._onStart = new Roo.util.Event(this);
            this.onStart = new Roo.util.Event(this);
            this.onTween = new Roo.util.Event(this);
            this._onTween = new Roo.util.Event(this);
            this.onComplete = new Roo.util.Event(this);
            this._onComplete = new Roo.util.Event(this);
            this._onStart.addListener(onStart);
            this._onTween.addListener(onTween);
            this._onComplete.addListener(onComplete);
        }
    };
})();
/*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */

Roo.lib.AnimMgr = new function() {

    var thread = null;


    var queue = [];


    var tweenCount = 0;


    this.fps = 1000;


    this.delay = 1;


    this.registerElement = function(tween) {
        queue[queue.length] = tween;
        tweenCount += 1;
        tween._onStart.fire();
        this.start();
    };


    this.unRegister = function(tween, index) {
        tween._onComplete.fire();
        index = index || getIndex(tween);
        if (index != -1) {
            queue.splice(index, 1);
        }

        tweenCount -= 1;
        if (tweenCount <= 0) {
            this.stop();
        }
    };


    this.start = function() {
        if (thread === null) {
            thread = setInterval(this.run, this.delay);
        }
    };


    this.stop = function(tween) {
        if (!tween) {
            clearInterval(thread);

            for (var i = 0, len = queue.length; i < len; ++i) {
                if (queue[0].isAnimated()) {
                    this.unRegister(queue[0], 0);
                }
            }

            queue = [];
            thread = null;
            tweenCount = 0;
        }
        else {
            this.unRegister(tween);
        }
    };


    this.run = function() {
        for (var i = 0, len = queue.length; i < len; ++i) {
            var tween = queue[i];
            if (!tween || !tween.isAnimated()) {
                continue;
            }

            if (tween.currentFrame < tween.totalFrames || tween.totalFrames === null)
            {
                tween.currentFrame += 1;

                if (tween.useSeconds) {
                    correctFrame(tween);
                }
                tween._onTween.fire();
            }
            else {
                Roo.lib.AnimMgr.stop(tween, i);
            }
        }
    };

    var getIndex = function(anim) {
        for (var i = 0, len = queue.length; i < len; ++i) {
            if (queue[i] == anim) {
                return i;
            }
        }
        return -1;
    };


    var correctFrame = function(tween) {
        var frames = tween.totalFrames;
        var frame = tween.currentFrame;
        var expected = (tween.currentFrame * tween.duration * 1000 / tween.totalFrames);
        var elapsed = (new Date() - tween.getStartTime());
        var tweak = 0;

        if (elapsed < tween.duration * 1000) {
            tweak = Math.round((elapsed / expected - 1) * tween.currentFrame);
        } else {
            tweak = frames - (frame + 1);
        }
        if (tweak > 0 && isFinite(tweak)) {
            if (tween.currentFrame + tweak >= frames) {
                tweak = frames - (frame + 1);
            }

            tween.currentFrame += tweak;
        }
    };
};

    /*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */
Roo.lib.Bezier = new function() {

        this.getPosition = function(points, t) {
            var n = points.length;
            var tmp = [];

            for (var i = 0; i < n; ++i) {
                tmp[i] = [points[i][0], points[i][1]];
            }

            for (var j = 1; j < n; ++j) {
                for (i = 0; i < n - j; ++i) {
                    tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];
                    tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1];
                }
            }

            return [ tmp[0][0], tmp[0][1] ];

        };
    }; 

/**
 * @class Roo.lib.Color
 * @constructor
 * An abstract Color implementation. Concrete Color implementations should use
 * an instance of this function as their prototype, and implement the getRGB and
 * getHSL functions. getRGB should return an object representing the RGB
 * components of this Color, with the red, green, and blue components in the
 * range [0,255] and the alpha component in the range [0,100]. getHSL should
 * return an object representing the HSL components of this Color, with the hue
 * component in the range [0,360), the saturation and lightness components in
 * the range [0,100], and the alpha component in the range [0,1].
 *
 *
 * Color.js
 *
 * Functions for Color handling and processing.
 *
 * http://www.safalra.com/web-design/javascript/Color-handling-and-processing/
 *
 * The author of this program, Safalra (Stephen Morley), irrevocably releases all
 * rights to this program, with the intention of it becoming part of the public
 * domain. Because this program is released into the public domain, it comes with
 * no warranty either expressed or implied, to the extent permitted by law.
 * 
 * For more free and public domain JavaScript code by the same author, visit:
 * http://www.safalra.com/web-design/javascript/
 * 
 */
Roo.lib.Color = function() { }


Roo.apply(Roo.lib.Color.prototype, {
  
  rgb : null,
  hsv : null,
  hsl : null,
  
  /**
   * getIntegerRGB
   * @return {Object} an object representing the RGBA components of this Color. The red,
   * green, and blue components are converted to integers in the range [0,255].
   * The alpha is a value in the range [0,1].
   */
  getIntegerRGB : function(){

    // get the RGB components of this Color
    var rgb = this.getRGB();

    // return the integer components
    return {
      'r' : Math.round(rgb.r),
      'g' : Math.round(rgb.g),
      'b' : Math.round(rgb.b),
      'a' : rgb.a
    };

  },

  /**
   * getPercentageRGB
   * @return {Object} an object representing the RGBA components of this Color. The red,
   * green, and blue components are converted to numbers in the range [0,100].
   * The alpha is a value in the range [0,1].
   */
  getPercentageRGB : function(){

    // get the RGB components of this Color
    var rgb = this.getRGB();

    // return the percentage components
    return {
      'r' : 100 * rgb.r / 255,
      'g' : 100 * rgb.g / 255,
      'b' : 100 * rgb.b / 255,
      'a' : rgb.a
    };

  },

  /**
   * getCSSHexadecimalRGB
   * @return {String} a string representing this Color as a CSS hexadecimal RGB Color
   * value - that is, a string of the form #RRGGBB where each of RR, GG, and BB
   * are two-digit hexadecimal numbers.
   */
  getCSSHexadecimalRGB : function()
  {

    // get the integer RGB components
    var rgb = this.getIntegerRGB();

    // determine the hexadecimal equivalents
    var r16 = rgb.r.toString(16);
    var g16 = rgb.g.toString(16);
    var b16 = rgb.b.toString(16);

    // return the CSS RGB Color value
    return '#'
        + (r16.length == 2 ? r16 : '0' + r16)
        + (g16.length == 2 ? g16 : '0' + g16)
        + (b16.length == 2 ? b16 : '0' + b16);

  },

  /**
   * getCSSIntegerRGB
   * @return {String} a string representing this Color as a CSS integer RGB Color
   * value - that is, a string of the form rgb(r,g,b) where each of r, g, and b
   * are integers in the range [0,255].
   */
  getCSSIntegerRGB : function(){

    // get the integer RGB components
    var rgb = this.getIntegerRGB();

    // return the CSS RGB Color value
    return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';

  },

  /**
   * getCSSIntegerRGBA
   * @return {String} Returns a string representing this Color as a CSS integer RGBA Color
   * value - that is, a string of the form rgba(r,g,b,a) where each of r, g, and
   * b are integers in the range [0,255] and a is in the range [0,1].
   */
  getCSSIntegerRGBA : function(){

    // get the integer RGB components
    var rgb = this.getIntegerRGB();

    // return the CSS integer RGBA Color value
    return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + rgb.a + ')';

  },

  /**
   * getCSSPercentageRGB
   * @return {String} a string representing this Color as a CSS percentage RGB Color
   * value - that is, a string of the form rgb(r%,g%,b%) where each of r, g, and
   * b are in the range [0,100].
   */
  getCSSPercentageRGB : function(){

    // get the percentage RGB components
    var rgb = this.getPercentageRGB();

    // return the CSS RGB Color value
    return 'rgb(' + rgb.r + '%,' + rgb.g + '%,' + rgb.b + '%)';

  },

  /**
   * getCSSPercentageRGBA
   * @return {String} a string representing this Color as a CSS percentage RGBA Color
   * value - that is, a string of the form rgba(r%,g%,b%,a) where each of r, g,
   * and b are in the range [0,100] and a is in the range [0,1].
   */
  getCSSPercentageRGBA : function(){

    // get the percentage RGB components
    var rgb = this.getPercentageRGB();

    // return the CSS percentage RGBA Color value
    return 'rgb(' + rgb.r + '%,' + rgb.g + '%,' + rgb.b + '%,' + rgb.a + ')';

  },

  /**
   * getCSSHSL
   * @return {String} a string representing this Color as a CSS HSL Color value - that
   * is, a string of the form hsl(h,s%,l%) where h is in the range [0,100] and
   * s and l are in the range [0,100].
   */
  getCSSHSL : function(){

    // get the HSL components
    var hsl = this.getHSL();

    // return the CSS HSL Color value
    return 'hsl(' + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%)';

  },

  /**
   * getCSSHSLA
   * @return {String} a string representing this Color as a CSS HSLA Color value - that
   * is, a string of the form hsla(h,s%,l%,a) where h is in the range [0,100],
   * s and l are in the range [0,100], and a is in the range [0,1].
   */
  getCSSHSLA : function(){

    // get the HSL components
    var hsl = this.getHSL();

    // return the CSS HSL Color value
    return 'hsl(' + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%,' + hsl.a + ')';

  },

  /**
   * Sets the Color of the specified node to this Color. This functions sets
   * the CSS 'color' property for the node. The parameter is:
   * 
   * @param {DomElement} node - the node whose Color should be set
   */
  setNodeColor : function(node){

    // set the Color of the node
    node.style.color = this.getCSSHexadecimalRGB();

  },

  /**
   * Sets the background Color of the specified node to this Color. This
   * functions sets the CSS 'background-color' property for the node. The
   * parameter is:
   *
   * @param {DomElement} node - the node whose background Color should be set
   */
  setNodeBackgroundColor : function(node){

    // set the background Color of the node
    node.style.backgroundColor = this.getCSSHexadecimalRGB();

  },
  // convert between formats..
  toRGB: function()
  {
    var r = this.getIntegerRGB();
    return new Roo.lib.RGBColor(r.r,r.g,r.b,r.a);
    
  },
  toHSL : function()
  {
     var hsl = this.getHSL();
  // return the CSS HSL Color value
    return new Roo.lib.HSLColor(hsl.h,  hsl.s, hsl.l ,  hsl.a );
    
  },
  
  toHSV : function()
  {
    var rgb = this.toRGB();
    var hsv = rgb.getHSV();
   // return the CSS HSL Color value
    return new Roo.lib.HSVColor(hsv.h,  hsv.s, hsv.v ,  hsv.a );
    
  },
  
  // modify  v = 0 ... 1 (eg. 0.5)
  saturate : function(v)
  {
      var rgb = this.toRGB();
      var hsv = rgb.getHSV();
      return new Roo.lib.HSVColor(hsv.h,  hsv.s * v, hsv.v ,  hsv.a );
      
  
  },
  
   
  /**
   * getRGB
   * @return {Object} the RGB and alpha components of this Color as an object with r,
   * g, b, and a properties. r, g, and b are in the range [0,255] and a is in
   * the range [0,1].
   */
  getRGB: function(){
   
    // return the RGB components
    return {
      'r' : this.rgb.r,
      'g' : this.rgb.g,
      'b' : this.rgb.b,
      'a' : this.alpha
    };

  },

  /**
   * getHSV
   * @return {Object} the HSV and alpha components of this Color as an object with h,
   * s, v, and a properties. h is in the range [0,360), s and v are in the range
   * [0,100], and a is in the range [0,1].
   */
  getHSV : function()
  {
    
    // calculate the HSV components if necessary
    if (this.hsv == null) {
      this.calculateHSV();
    }

    // return the HSV components
    return {
      'h' : this.hsv.h,
      's' : this.hsv.s,
      'v' : this.hsv.v,
      'a' : this.alpha
    };

  },

  /**
   * getHSL
   * @return {Object} the HSL and alpha components of this Color as an object with h,
   * s, l, and a properties. h is in the range [0,360), s and l are in the range
   * [0,100], and a is in the range [0,1].
   */
  getHSL : function(){
    
     
    // calculate the HSV components if necessary
    if (this.hsl == null) { this.calculateHSL(); }

    // return the HSL components
    return {
      'h' : this.hsl.h,
      's' : this.hsl.s,
      'l' : this.hsl.l,
      'a' : this.alpha
    };

  }
  

});


/**
 * @class Roo.lib.RGBColor
 * @extends Roo.lib.Color
 * Creates a Color specified in the RGB Color space, with an optional alpha
 * component. The parameters are:
 * @constructor
 * 

 * @param {Number} r - the red component, clipped to the range [0,255]
 * @param {Number} g - the green component, clipped to the range [0,255]
 * @param {Number} b - the blue component, clipped to the range [0,255]
 * @param {Number} a - the alpha component, clipped to the range [0,1] - this parameter is
 *     optional and defaults to 1
 */
Roo.lib.RGBColor = function (r, g, b, a){

  // store the alpha component after clipping it if necessary
  this.alpha = (a === undefined ? 1 : Math.max(0, Math.min(1, a)));

  // store the RGB components after clipping them if necessary
  this.rgb =
      {
        'r' : Math.max(0, Math.min(255, r)),
        'g' : Math.max(0, Math.min(255, g)),
        'b' : Math.max(0, Math.min(255, b))
      };

  // initialise the HSV and HSL components to null
  

  /* 
   * //private returns the HSV or HSL hue component of this RGBColor. The hue is in the
   * range [0,360). The parameters are:
   *
   * maximum - the maximum of the RGB component values
   * range   - the range of the RGB component values
   */
   

}
// this does an 'exteds'
Roo.extend(Roo.lib.RGBColor, Roo.lib.Color, {

  
    getHue  : function(maximum, range)
    {
      var rgb = this.rgb;
       
      // check whether the range is zero
      if (range == 0){
  
        // set the hue to zero (any hue is acceptable as the Color is grey)
        var hue = 0;
  
      }else{
  
        // determine which of the components has the highest value and set the hue
        switch (maximum){
  
          // red has the highest value
          case rgb.r:
            var hue = (rgb.g - rgb.b) / range * 60;
            if (hue < 0) { hue += 360; }
            break;
  
          // green has the highest value
          case rgb.g:
            var hue = (rgb.b - rgb.r) / range * 60 + 120;
            break;
  
          // blue has the highest value
          case rgb.b:
            var hue = (rgb.r - rgb.g) / range * 60 + 240;
            break;
  
        }
  
      }
  
      // return the hue
      return hue;
  
    },

  /* //private Calculates and stores the HSV components of this RGBColor so that they can
   * be returned be the getHSV function.
   */
   calculateHSV : function(){
    var rgb = this.rgb;
    // get the maximum and range of the RGB component values
    var maximum = Math.max(rgb.r, rgb.g, rgb.b);
    var range   = maximum - Math.min(rgb.r, rgb.g, rgb.b);

    // store the HSV components
    this.hsv =
        {
          'h' : this.getHue(maximum, range),
          's' : (maximum == 0 ? 0 : 100 * range / maximum),
          'v' : maximum / 2.55
        };

  },

  /* //private Calculates and stores the HSL components of this RGBColor so that they can
   * be returned be the getHSL function.
   */
   calculateHSL : function(){
    var rgb = this.rgb;
    // get the maximum and range of the RGB component values
    var maximum = Math.max(rgb.r, rgb.g, rgb.b);
    var range   = maximum - Math.min(rgb.r, rgb.g, rgb.b);

    // determine the lightness in the range [0,1]
    var l = maximum / 255 - range / 510;

    // store the HSL components
    this.hsl =
        {
          'h' : this.getHue(maximum, range),
          's' : (range == 0 ? 0 : range / 2.55 / (l < 0.5 ? l * 2 : 2 - l * 2)),
          'l' : 100 * l
        };

  }

});

/**
 * @class Roo.lib.HSVColor
 * @extends Roo.lib.Color
 * Creates a Color specified in the HSV Color space, with an optional alpha
 * component. The parameters are:
 * @constructor
 *
 * @param {Number} h - the hue component, wrapped to the range [0,360)
 * @param {Number} s - the saturation component, clipped to the range [0,100]
 * @param {Number} v - the value component, clipped to the range [0,100]
 * @param {Number} a - the alpha component, clipped to the range [0,1] - this parameter is
 *     optional and defaults to 1
 */
Roo.lib.HSVColor = function (h, s, v, a){

  // store the alpha component after clipping it if necessary
  this.alpha = (a === undefined ? 1 : Math.max(0, Math.min(1, a)));

  // store the HSV components after clipping or wrapping them if necessary
  this.hsv =
      {
        'h' : (h % 360 + 360) % 360,
        's' : Math.max(0, Math.min(100, s)),
        'v' : Math.max(0, Math.min(100, v))
      };

  // initialise the RGB and HSL components to null
  this.rgb = null;
  this.hsl = null;
}

Roo.extend(Roo.lib.HSVColor, Roo.lib.Color, {
  /* Calculates and stores the RGB components of this HSVColor so that they can
   * be returned be the getRGB function.
   */
  calculateRGB: function ()
  {
    var hsv = this.hsv;
    // check whether the saturation is zero
    if (hsv.s == 0){

      // set the Color to the appropriate shade of grey
      var r = hsv.v;
      var g = hsv.v;
      var b = hsv.v;

    }else{

      // set some temporary values
      var f  = hsv.h / 60 - Math.floor(hsv.h / 60);
      var p  = hsv.v * (1 - hsv.s / 100);
      var q  = hsv.v * (1 - hsv.s / 100 * f);
      var t  = hsv.v * (1 - hsv.s / 100 * (1 - f));

      // set the RGB Color components to their temporary values
      switch (Math.floor(hsv.h / 60)){
        case 0: var r = hsv.v; var g = t; var b = p; break;
        case 1: var r = q; var g = hsv.v; var b = p; break;
        case 2: var r = p; var g = hsv.v; var b = t; break;
        case 3: var r = p; var g = q; var b = hsv.v; break;
        case 4: var r = t; var g = p; var b = hsv.v; break;
        case 5: var r = hsv.v; var g = p; var b = q; break;
      }

    }

    // store the RGB components
    this.rgb =
        {
          'r' : r * 2.55,
          'g' : g * 2.55,
          'b' : b * 2.55
        };

  },

  /* Calculates and stores the HSL components of this HSVColor so that they can
   * be returned be the getHSL function.
   */
  calculateHSL : function (){

    var hsv = this.hsv;
    // determine the lightness in the range [0,100]
    var l = (2 - hsv.s / 100) * hsv.v / 2;

    // store the HSL components
    this.hsl =
        {
          'h' : hsv.h,
          's' : hsv.s * hsv.v / (l < 50 ? l * 2 : 200 - l * 2),
          'l' : l
        };

    // correct a division-by-zero error
    if (isNaN(hsl.s)) { hsl.s = 0; }

  } 
 

});
 

/**
 * @class Roo.lib.HSLColor
 * @extends Roo.lib.Color
 *
 * @constructor
 * Creates a Color specified in the HSL Color space, with an optional alpha
 * component. The parameters are:
 *
 * @param {Number} h - the hue component, wrapped to the range [0,360)
 * @param {Number} s - the saturation component, clipped to the range [0,100]
 * @param {Number} l - the lightness component, clipped to the range [0,100]
 * @param {Number} a - the alpha component, clipped to the range [0,1] - this parameter is
 *     optional and defaults to 1
 */

Roo.lib.HSLColor = function(h, s, l, a){

  // store the alpha component after clipping it if necessary
  this.alpha = (a === undefined ? 1 : Math.max(0, Math.min(1, a)));

  // store the HSL components after clipping or wrapping them if necessary
  this.hsl =
      {
        'h' : (h % 360 + 360) % 360,
        's' : Math.max(0, Math.min(100, s)),
        'l' : Math.max(0, Math.min(100, l))
      };

  // initialise the RGB and HSV components to null
}

Roo.extend(Roo.lib.HSLColor, Roo.lib.Color, {

  /* Calculates and stores the RGB components of this HSLColor so that they can
   * be returned be the getRGB function.
   */
  calculateRGB: function (){

    // check whether the saturation is zero
    if (this.hsl.s == 0){

      // store the RGB components representing the appropriate shade of grey
      this.rgb =
          {
            'r' : this.hsl.l * 2.55,
            'g' : this.hsl.l * 2.55,
            'b' : this.hsl.l * 2.55
          };

    }else{

      // set some temporary values
      var p = this.hsl.l < 50
            ? this.hsl.l * (1 + hsl.s / 100)
            : this.hsl.l + hsl.s - hsl.l * hsl.s / 100;
      var q = 2 * hsl.l - p;

      // initialise the RGB components
      this.rgb =
          {
            'r' : (h + 120) / 60 % 6,
            'g' : h / 60,
            'b' : (h + 240) / 60 % 6
          };

      // loop over the RGB components
      for (var key in this.rgb){

        // ensure that the property is not inherited from the root object
        if (this.rgb.hasOwnProperty(key)){

          // set the component to its value in the range [0,100]
          if (this.rgb[key] < 1){
            this.rgb[key] = q + (p - q) * this.rgb[key];
          }else if (this.rgb[key] < 3){
            this.rgb[key] = p;
          }else if (this.rgb[key] < 4){
            this.rgb[key] = q + (p - q) * (4 - this.rgb[key]);
          }else{
            this.rgb[key] = q;
          }

          // set the component to its value in the range [0,255]
          this.rgb[key] *= 2.55;

        }

      }

    }

  },

  /* Calculates and stores the HSV components of this HSLColor so that they can
   * be returned be the getHSL function.
   */
   calculateHSV : function(){

    // set a temporary value
    var t = this.hsl.s * (this.hsl.l < 50 ? this.hsl.l : 100 - this.hsl.l) / 100;

    // store the HSV components
    this.hsv =
        {
          'h' : this.hsl.h,
          's' : 200 * t / (this.hsl.l + t),
          'v' : t + this.hsl.l
        };

    // correct a division-by-zero error
    if (isNaN(this.hsv.s)) { this.hsv.s = 0; }

  }
 

});
/*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */
(function() {

    Roo.lib.ColorAnim = function(el, attributes, duration, method) {
        Roo.lib.ColorAnim.superclass.constructor.call(this, el, attributes, duration, method);
    };

    Roo.extend(Roo.lib.ColorAnim, Roo.lib.AnimBase);

    var fly = Roo.lib.AnimBase.fly;
    var Y = Roo.lib;
    var superclass = Y.ColorAnim.superclass;
    var proto = Y.ColorAnim.prototype;

    proto.toString = function() {
        var el = this.getEl();
        var id = el.id || el.tagName;
        return ("ColorAnim " + id);
    };

    proto.patterns.color = /color$/i;
    proto.patterns.rgb = /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;
    proto.patterns.hex = /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
    proto.patterns.hex3 = /^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;
    proto.patterns.transparent = /^transparent|rgba\(0, 0, 0, 0\)$/;


    proto.parseColor = function(s) {
        if (s.length == 3) {
            return s;
        }

        var c = this.patterns.hex.exec(s);
        if (c && c.length == 4) {
            return [ parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16) ];
        }

        c = this.patterns.rgb.exec(s);
        if (c && c.length == 4) {
            return [ parseInt(c[1], 10), parseInt(c[2], 10), parseInt(c[3], 10) ];
        }

        c = this.patterns.hex3.exec(s);
        if (c && c.length == 4) {
            return [ parseInt(c[1] + c[1], 16), parseInt(c[2] + c[2], 16), parseInt(c[3] + c[3], 16) ];
        }

        return null;
    };
    // since this uses fly! - it cant be in ColorAnim (which does not have fly yet..)
    proto.getAttribute = function(attr) {
        var el = this.getEl();
        if (this.patterns.color.test(attr)) {
            var val = fly(el).getStyle(attr);

            if (this.patterns.transparent.test(val)) {
                var parent = el.parentNode;
                val = fly(parent).getStyle(attr);

                while (parent && this.patterns.transparent.test(val)) {
                    parent = parent.parentNode;
                    val = fly(parent).getStyle(attr);
                    if (parent.tagName.toUpperCase() == 'HTML') {
                        val = '#fff';
                    }
                }
            }
        } else {
            val = superclass.getAttribute.call(this, attr);
        }

        return val;
    };
    proto.getAttribute = function(attr) {
        var el = this.getEl();
        if (this.patterns.color.test(attr)) {
            var val = fly(el).getStyle(attr);

            if (this.patterns.transparent.test(val)) {
                var parent = el.parentNode;
                val = fly(parent).getStyle(attr);

                while (parent && this.patterns.transparent.test(val)) {
                    parent = parent.parentNode;
                    val = fly(parent).getStyle(attr);
                    if (parent.tagName.toUpperCase() == 'HTML') {
                        val = '#fff';
                    }
                }
            }
        } else {
            val = superclass.getAttribute.call(this, attr);
        }

        return val;
    };

    proto.doMethod = function(attr, start, end) {
        var val;

        if (this.patterns.color.test(attr)) {
            val = [];
            for (var i = 0, len = start.length; i < len; ++i) {
                val[i] = superclass.doMethod.call(this, attr, start[i], end[i]);
            }

            val = 'rgb(' + Math.floor(val[0]) + ',' + Math.floor(val[1]) + ',' + Math.floor(val[2]) + ')';
        }
        else {
            val = superclass.doMethod.call(this, attr, start, end);
        }

        return val;
    };

    proto.setRuntimeAttribute = function(attr) {
        superclass.setRuntimeAttribute.call(this, attr);

        if (this.patterns.color.test(attr)) {
            var attributes = this.attributes;
            var start = this.parseColor(this.runtimeAttributes[attr].start);
            var end = this.parseColor(this.runtimeAttributes[attr].end);

            if (typeof attributes[attr]['to'] === 'undefined' && typeof attributes[attr]['by'] !== 'undefined') {
                end = this.parseColor(attributes[attr].by);

                for (var i = 0, len = start.length; i < len; ++i) {
                    end[i] = start[i] + end[i];
                }
            }

            this.runtimeAttributes[attr].start = start;
            this.runtimeAttributes[attr].end = end;
        }
    };
})();

/*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */
Roo.lib.Easing = {


    easeNone: function (t, b, c, d) {
        return c * t / d + b;
    },


    easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },


    easeOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },


    easeBoth: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }

        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },


    easeInStrong: function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },


    easeOutStrong: function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },


    easeBothStrong: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        }

        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },



    elasticIn: function (t, b, c, d, a, p) {
        if (t == 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * .3;
        }

        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }

        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },


    elasticOut: function (t, b, c, d, a, p) {
        if (t == 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * .3;
        }

        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }

        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },


    elasticBoth: function (t, b, c, d, a, p) {
        if (t == 0) {
            return b;
        }

        if ((t /= d / 2) == 2) {
            return b + c;
        }

        if (!p) {
            p = d * (.3 * 1.5);
        }

        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }

        if (t < 1) {
            return -.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                          Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) *
               Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },



    backIn: function (t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },


    backOut: function (t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },


    backBoth: function (t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 1.70158;
        }

        if ((t /= d / 2 ) < 1) {
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },


    bounceIn: function (t, b, c, d) {
        return c - Roo.lib.Easing.bounceOut(d - t, 0, c, d) + b;
    },


    bounceOut: function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        }
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
    },


    bounceBoth: function (t, b, c, d) {
        if (t < d / 2) {
            return Roo.lib.Easing.bounceIn(t * 2, 0, c, d) * .5 + b;
        }
        return Roo.lib.Easing.bounceOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
};/*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */
    (function() {
        Roo.lib.Motion = function(el, attributes, duration, method) {
            if (el) {
                Roo.lib.Motion.superclass.constructor.call(this, el, attributes, duration, method);
            }
        };

        Roo.extend(Roo.lib.Motion, Roo.lib.ColorAnim);


        var Y = Roo.lib;
        var superclass = Y.Motion.superclass;
        var proto = Y.Motion.prototype;

        proto.toString = function() {
            var el = this.getEl();
            var id = el.id || el.tagName;
            return ("Motion " + id);
        };

        proto.patterns.points = /^points$/i;

        proto.setAttribute = function(attr, val, unit) {
            if (this.patterns.points.test(attr)) {
                unit = unit || 'px';
                superclass.setAttribute.call(this, 'left', val[0], unit);
                superclass.setAttribute.call(this, 'top', val[1], unit);
            } else {
                superclass.setAttribute.call(this, attr, val, unit);
            }
        };

        proto.getAttribute = function(attr) {
            if (this.patterns.points.test(attr)) {
                var val = [
                        superclass.getAttribute.call(this, 'left'),
                        superclass.getAttribute.call(this, 'top')
                        ];
            } else {
                val = superclass.getAttribute.call(this, attr);
            }

            return val;
        };

        proto.doMethod = function(attr, start, end) {
            var val = null;

            if (this.patterns.points.test(attr)) {
                var t = this.method(this.currentFrame, 0, 100, this.totalFrames) / 100;
                val = Y.Bezier.getPosition(this.runtimeAttributes[attr], t);
            } else {
                val = superclass.doMethod.call(this, attr, start, end);
            }
            return val;
        };

        proto.setRuntimeAttribute = function(attr) {
            if (this.patterns.points.test(attr)) {
                var el = this.getEl();
                var attributes = this.attributes;
                var start;
                var control = attributes['points']['control'] || [];
                var end;
                var i, len;

                if (control.length > 0 && !(control[0] instanceof Array)) {
                    control = [control];
                } else {
                    var tmp = [];
                    for (i = 0,len = control.length; i < len; ++i) {
                        tmp[i] = control[i];
                    }
                    control = tmp;
                }

                Roo.fly(el).position();

                if (isset(attributes['points']['from'])) {
                    Roo.lib.Dom.setXY(el, attributes['points']['from']);
                }
                else {
                    Roo.lib.Dom.setXY(el, Roo.lib.Dom.getXY(el));
                }

                start = this.getAttribute('points');


                if (isset(attributes['points']['to'])) {
                    end = translateValues.call(this, attributes['points']['to'], start);

                    var pageXY = Roo.lib.Dom.getXY(this.getEl());
                    for (i = 0,len = control.length; i < len; ++i) {
                        control[i] = translateValues.call(this, control[i], start);
                    }


                } else if (isset(attributes['points']['by'])) {
                    end = [ start[0] + attributes['points']['by'][0], start[1] + attributes['points']['by'][1] ];

                    for (i = 0,len = control.length; i < len; ++i) {
                        control[i] = [ start[0] + control[i][0], start[1] + control[i][1] ];
                    }
                }

                this.runtimeAttributes[attr] = [start];

                if (control.length > 0) {
                    this.runtimeAttributes[attr] = this.runtimeAttributes[attr].concat(control);
                }

                this.runtimeAttributes[attr][this.runtimeAttributes[attr].length] = end;
            }
            else {
                superclass.setRuntimeAttribute.call(this, attr);
            }
        };

        var translateValues = function(val, start) {
            var pageXY = Roo.lib.Dom.getXY(this.getEl());
            val = [ val[0] - pageXY[0] + start[0], val[1] - pageXY[1] + start[1] ];

            return val;
        };

        var isset = function(prop) {
            return (typeof prop !== 'undefined');
        };
    })();
/*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */
    (function() {
        Roo.lib.Scroll = function(el, attributes, duration, method) {
            if (el) {
                Roo.lib.Scroll.superclass.constructor.call(this, el, attributes, duration, method);
            }
        };

        Roo.extend(Roo.lib.Scroll, Roo.lib.ColorAnim);


        var Y = Roo.lib;
        var superclass = Y.Scroll.superclass;
        var proto = Y.Scroll.prototype;

        proto.toString = function() {
            var el = this.getEl();
            var id = el.id || el.tagName;
            return ("Scroll " + id);
        };

        proto.doMethod = function(attr, start, end) {
            var val = null;

            if (attr == 'scroll') {
                val = [
                        this.method(this.currentFrame, start[0], end[0] - start[0], this.totalFrames),
                        this.method(this.currentFrame, start[1], end[1] - start[1], this.totalFrames)
                        ];

            } else {
                val = superclass.doMethod.call(this, attr, start, end);
            }
            return val;
        };

        proto.getAttribute = function(attr) {
            var val = null;
            var el = this.getEl();

            if (attr == 'scroll') {
                val = [ el.scrollLeft, el.scrollTop ];
            } else {
                val = superclass.getAttribute.call(this, attr);
            }

            return val;
        };

        proto.setAttribute = function(attr, val, unit) {
            var el = this.getEl();

            if (attr == 'scroll') {
                el.scrollLeft = val[0];
                el.scrollTop = val[1];
            } else {
                superclass.setAttribute.call(this, attr, val, unit);
            }
        };
    })();
/**
 * Originally based of this code... - refactored for Roo...
 * https://github.com/aaalsaleh/undo-manager
 
 * undo-manager.js
 * @author  Abdulrahman Alsaleh 
 * @copyright 2015 Abdulrahman Alsaleh 
 * @license  MIT License (c) 
 *
 * Hackily modifyed by alan@roojs.com
 *
 *
 *  
 *
 *  TOTALLY UNTESTED...
 *
 *  Documentation to be done....
 */
 

/**
* @class Roo.lib.UndoManager
* An undo manager implementation in JavaScript. It follows the W3C UndoManager and DOM Transaction
* Draft and the undocumented and disabled Mozilla Firefox's UndoManager implementation.

 * Usage:
 * <pre><code>


editor.undoManager = new Roo.lib.UndoManager(1000, editor);
 
</code></pre>

* For more information see this blog post with examples:
*  <a href="http://www.cnitblog.com/seeyeah/archive/2011/12/30/38728.html/">DomHelper
     - Create Elements using DOM, HTML fragments and Templates</a>. 
* @constructor
* @param {Number} limit how far back to go ... use 1000?
* @param {Object} scope usually use document..
*/

Roo.lib.UndoManager = function (limit, undoScopeHost)
{
    this.stack = [];
    this.limit = limit;
    this.scope = undoScopeHost;
    this.fireEvent = typeof CustomEvent != 'undefined' && undoScopeHost && undoScopeHost.dispatchEvent;
    if (this.fireEvent) {
        this.bindEvents();
    }
    this.reset();
    
};
        
Roo.lib.UndoManager.prototype = {
    
    limit : false,
    stack : false,
    scope :  false,
    fireEvent : false,
    position : 0,
    length : 0,
    
    
     /**
     * To push and execute a transaction, the method undoManager.transact
     * must be called by passing a transaction object as the first argument, and a merge
     * flag as the second argument. A transaction object has the following properties:
     *
     * Usage:
<pre><code>
undoManager.transact({
    label: 'Typing',
    execute: function() { ... },
    undo: function() { ... },
    // redo same as execute
    redo: function() { this.execute(); }
}, false);

// merge transaction
undoManager.transact({
    label: 'Typing',
    execute: function() { ... },  // this will be run...
    undo: function() { ... }, // what to do when undo is run.
    // redo same as execute
    redo: function() { this.execute(); }
}, true); 
</code></pre> 
     *
     * 
     * @param {Object} transaction The transaction to add to the stack.
     * @return {String} The HTML fragment
     */
    
    
    transact : function (transaction, merge)
    {
        if (arguments.length < 2) {
            throw new TypeError('Not enough arguments to UndoManager.transact.');
        }

        transaction.execute();

        this.stack.splice(0, this.position);
        if (merge && this.length) {
            this.stack[0].push(transaction);
        } else {
            this.stack.unshift([transaction]);
        }
    
        this.position = 0;

        if (this.limit && this.stack.length > this.limit) {
            this.length = this.stack.length = this.limit;
        } else {
            this.length = this.stack.length;
        }

        if (this.fireEvent) {
            this.scope.dispatchEvent(
                new CustomEvent('DOMTransaction', {
                    detail: {
                        transactions: this.stack[0].slice()
                    },
                    bubbles: true,
                    cancelable: false
                })
            );
        }
        
        //Roo.log("transaction: pos:" + this.position + " len: " + this.length + " slen:" + this.stack.length);
      
        
    },

    undo : function ()
    {
        //Roo.log("undo: pos:" + this.position + " len: " + this.length + " slen:" + this.stack.length);
        
        if (this.position < this.length) {
            for (var i = this.stack[this.position].length - 1; i >= 0; i--) {
                this.stack[this.position][i].undo();
            }
            this.position++;

            if (this.fireEvent) {
                this.scope.dispatchEvent(
                    new CustomEvent('undo', {
                        detail: {
                            transactions: this.stack[this.position - 1].slice()
                        },
                        bubbles: true,
                        cancelable: false
                    })
                );
            }
        }
    },

    redo : function ()
    {
        if (this.position > 0) {
            for (var i = 0, n = this.stack[this.position - 1].length; i < n; i++) {
                this.stack[this.position - 1][i].redo();
            }
            this.position--;

            if (this.fireEvent) {
                this.scope.dispatchEvent(
                    new CustomEvent('redo', {
                        detail: {
                            transactions: this.stack[this.position].slice()
                        },
                        bubbles: true,
                        cancelable: false
                    })
                );
            }
        }
    },

    item : function (index)
    {
        if (index >= 0 && index < this.length) {
            return this.stack[index].slice();
        }
        return null;
    },

    clearUndo : function () {
        this.stack.length = this.length = this.position;
    },

    clearRedo : function () {
        this.stack.splice(0, this.position);
        this.position = 0;
        this.length = this.stack.length;
    },
    /**
     * Reset the undo - probaly done on load to clear all history.
     */
    reset : function()
    {
        this.stack = [];
        this.position = 0;
        this.length = 0;
        this.current_html = this.scope.innerHTML;
        if (this.timer !== false) {
            clearTimeout(this.timer);
        }
        this.timer = false;
        this.merge = false;
        this.addEvent();
        
    },
    current_html : '',
    timer : false,
    merge : false,
    
    
    // this will handle the undo/redo on the element.?
    bindEvents : function()
    {
        var el  = this.scope;
        el.undoManager = this;
        
        
        this.scope.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.keyCode === 90) {
                if (e.shiftKey) {
                    el.undoManager.redo(); // Ctrl/Command + Shift + Z
                } else {
                    el.undoManager.undo(); // Ctrl/Command + Z
                }
        
                e.preventDefault();
            }
        });
        /// ignore keyup..
        this.scope.addEventListener('keyup', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.keyCode === 90) {
                e.preventDefault();
            }
        });
        
        
        
        var t = this;
        
        el.addEventListener('input', function(e) {
            if(el.innerHTML == t.current_html) {
                return;
            }
            // only record events every second.
            if (t.timer !== false) {
               clearTimeout(t.timer);
               t.timer = false;
            }
            t.timer = setTimeout(function() { t.merge = false; }, 1000);
            
            t.addEvent(t.merge);
            t.merge = true; // ignore changes happening every second..
        });
	},
    /**
     * Manually add an event.
     * Normall called without arguements - and it will just get added to the stack.
     * 
     */
    
    addEvent : function(merge)
    {
        //Roo.log("undomanager +" + (merge ? 'Y':'n'));
        // not sure if this should clear the timer 
        merge = typeof(merge) == 'undefined' ? false : merge; 
        
        this.scope.undoManager.transact({
            scope : this.scope,
            oldHTML: this.current_html,
            newHTML: this.scope.innerHTML,
            // nothing to execute (content already changed when input is fired)
            execute: function() { },
            undo: function() {
                this.scope.innerHTML = this.current_html = this.oldHTML;
            },
            redo: function() {
                this.scope.innerHTML = this.current_html = this.newHTML;
            }
        }, false); //merge);
        
        this.merge = merge;
        
        this.current_html = this.scope.innerHTML;
    }
    
    
     
    
    
    
};
/**
 * @class Roo.lib.Range
 * @constructor
 * This is a toolkit, normally used to copy features into a Dom Range element
 * Roo.lib.Range.wrap(x);
 *
 *
 *
 */
Roo.lib.Range = function() { };

/**
 * Wrap a Dom Range object, to give it new features...
 * @static
 * @param {Range} the range to wrap
 */
Roo.lib.Range.wrap = function(r) {
    return Roo.apply(r, Roo.lib.Range.prototype);
};
/**
 * find a parent node eg. LI / OL
 * @param {string|Array} node name or array of nodenames
 * @return {DomElement|false}
 */
Roo.apply(Roo.lib.Range.prototype,
{
    
    closest : function(str)
    {
        if (typeof(str) != 'string') {
            // assume it's a array.
            for(var i = 0;i < str.length;i++) {
                var r = this.closest(str[i]);
                if (r !== false) {
                    return r;
                }
                
            }
            return false;
        }
        str = str.toLowerCase();
        var n = this.commonAncestorContainer; // might not be a node
        while (n.nodeType != 1) {
            n = n.parentNode;
        }
        
        if (n.nodeName.toLowerCase() == str ) {
            return n;
        }
        if (n.nodeName.toLowerCase() == 'body') {
            return false;
        }
            
        return n.closest(str) || false;
        
    },
    cloneRange : function()
    {
        return Roo.lib.Range.wrap(Range.prototype.cloneRange.call(this));
    }
});/**
 * @class Roo.lib.Selection
 * @constructor
 * This is a toolkit, normally used to copy features into a Dom Selection element
 * Roo.lib.Selection.wrap(x);
 *
 *
 *
 */
Roo.lib.Selection = function() { };

/**
 * Wrap a Dom Range object, to give it new features...
 * @static
 * @param {Range} the range to wrap
 */
Roo.lib.Selection.wrap = function(r, doc) {
    Roo.apply(r, Roo.lib.Selection.prototype);
    r.ownerDocument = doc; // usefull so we dont have to keep referening to it.
    return r;
};
/**
 * find a parent node eg. LI / OL
 * @param {string|Array} node name or array of nodenames
 * @return {DomElement|false}
 */
Roo.apply(Roo.lib.Selection.prototype,
{
    /**
     * the owner document
     */
    ownerDocument : false,
    
    getRangeAt : function(n)
    {
        return Roo.lib.Range.wrap(Selection.prototype.getRangeAt.call(this,n));
    },
    
    /**
     * insert node at selection 
     * @param {DomElement|string} node
     * @param {string} cursor (after|in|none) where to place the cursor after inserting.
     */
    insertNode: function(node, cursor)
    {
        if (typeof(node) == 'string') {
            node = this.ownerDocument.createElement(node);
            if (cursor == 'in') {
                node.innerHTML = '&nbsp;';
            }
        }
        
        var range = this.getRangeAt(0);
        
        if (this.type != 'Caret') {
            range.deleteContents();
        }
        var sn = node.childNodes[0]; // select the contents.

        
        
        range.insertNode(node);
        if (cursor == 'after') {
            node.insertAdjacentHTML('afterend', '&nbsp;');
            sn = node.nextSibling;
        }
        
        if (cursor == 'none') {
            return;
        }
        
        this.cursorText(sn);
    },
    
    cursorText : function(n)
    {
       
        //var range = this.getRangeAt(0);
        range = Roo.lib.Range.wrap(new Range());
        //range.selectNode(n);
        
        var ix = Array.from(n.parentNode.childNodes).indexOf(n);
        range.setStart(n.parentNode,ix);
        range.setEnd(n.parentNode,ix+1);
        //range.collapse(false);
         
        this.removeAllRanges();
        this.addRange(range);
        
        Roo.log([n, range, this,this.baseOffset,this.extentOffset, this.type]);
    },
    cursorAfter : function(n)
    {
        if (!n.nextSibling || n.nextSibling.nodeValue != '&nbsp;') {
            n.insertAdjacentHTML('afterend', '&nbsp;');
        }
        this.cursorText (n.nextSibling);
    }
        
    
});/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */


// nasty IE9 hack - what a pile of crap that is..

 if (typeof Range != "undefined" && typeof Range.prototype.createContextualFragment == "undefined") {
    Range.prototype.createContextualFragment = function (html) {
        var doc = window.document;
        var container = doc.createElement("div");
        container.innerHTML = html;
        var frag = doc.createDocumentFragment(), n;
        while ((n = container.firstChild)) {
            frag.appendChild(n);
        }
        return frag;
    };
}

/**
 * @class Roo.DomHelper
 * Utility class for working with DOM and/or Templates. It transparently supports using HTML fragments or DOM.
 * For more information see <a href="http://web.archive.org/web/20071221063734/http://www.jackslocum.com/blog/2006/10/06/domhelper-create-elements-using-dom-html-fragments-or-templates/">this blog post with examples</a>.
 * @static
 */
Roo.DomHelper = function(){
    var tempTableEl = null;
    var emptyTags = /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i;
    var tableRe = /^table|tbody|tr|td$/i;
    var xmlns = {};
    // build as innerHTML where available
    /** @ignore */
    var createHtml = function(o){
        if(typeof o == 'string'){
            return o;
        }
        var b = "";
        if(!o.tag){
            o.tag = "div";
        }
        b += "<" + o.tag;
        for(var attr in o){
            if(attr == "tag" || attr == "children" || attr == "cn" || attr == "html" || typeof o[attr] == "function") { continue; }
            if(attr == "style"){
                var s = o["style"];
                if(typeof s == "function"){
                    s = s.call();
                }
                if(typeof s == "string"){
                    b += ' style="' + s + '"';
                }else if(typeof s == "object"){
                    b += ' style="';
                    for(var key in s){
                        if(typeof s[key] != "function"){
                            b += key + ":" + s[key] + ";";
                        }
                    }
                    b += '"';
                }
            }else{
                if(attr == "cls"){
                    b += ' class="' + o["cls"] + '"';
                }else if(attr == "htmlFor"){
                    b += ' for="' + o["htmlFor"] + '"';
                }else{
                    b += " " + attr + '="' + o[attr] + '"';
                }
            }
        }
        if(emptyTags.test(o.tag)){
            b += "/>";
        }else{
            b += ">";
            var cn = o.children || o.cn;
            if(cn){
                //http://bugs.kde.org/show_bug.cgi?id=71506
                if((cn instanceof Array) || (Roo.isSafari && typeof(cn.join) == "function")){
                    for(var i = 0, len = cn.length; i < len; i++) {
                        b += createHtml(cn[i], b);
                    }
                }else{
                    b += createHtml(cn, b);
                }
            }
            if(o.html){
                b += o.html;
            }
            b += "</" + o.tag + ">";
        }
        return b;
    };

    // build as dom
    /** @ignore */
    var createDom = function(o, parentNode){
         
        // defininition craeted..
        var ns = false;
        if (o.ns && o.ns != 'html') {
               
            if (o.xmlns && typeof(xmlns[o.ns]) == 'undefined') {
                xmlns[o.ns] = o.xmlns;
                ns = o.xmlns;
            }
            if (typeof(xmlns[o.ns]) == 'undefined') {
                console.log("Trying to create namespace element " + o.ns + ", however no xmlns was sent to builder previously");
            }
            ns = xmlns[o.ns];
        }
        
        
        if (typeof(o) == 'string') {
            return parentNode.appendChild(document.createTextNode(o));
        }
        o.tag = o.tag || 'div';
        if (o.ns && Roo.isIE) {
            ns = false;
            o.tag = o.ns + ':' + o.tag;
            
        }
        var el = ns ? document.createElementNS( ns, o.tag||'div') :  document.createElement(o.tag||'div');
        var useSet = el.setAttribute ? true : false; // In IE some elements don't have setAttribute
        for(var attr in o){
            
            if(attr == "tag" || attr == "ns" ||attr == "xmlns" ||attr == "children" || attr == "cn" || attr == "html" || 
                    attr == "style" || typeof o[attr] == "function") { continue; }
                    
            if(attr=="cls" && Roo.isIE){
                el.className = o["cls"];
            }else{
                if(useSet) { el.setAttribute(attr=="cls" ? 'class' : attr, o[attr]);}
                else { 
                    el[attr] = o[attr];
                }
            }
        }
        Roo.DomHelper.applyStyles(el, o.style);
        var cn = o.children || o.cn;
        if(cn){
            //http://bugs.kde.org/show_bug.cgi?id=71506
             if((cn instanceof Array) || (Roo.isSafari && typeof(cn.join) == "function")){
                for(var i = 0, len = cn.length; i < len; i++) {
                    createDom(cn[i], el);
                }
            }else{
                createDom(cn, el);
            }
        }
        if(o.html){
            el.innerHTML = o.html;
        }
        if(parentNode){
           parentNode.appendChild(el);
        }
        return el;
    };

    var ieTable = function(depth, s, h, e){
        tempTableEl.innerHTML = [s, h, e].join('');
        var i = -1, el = tempTableEl;
        while(++i < depth && el.firstChild){
            el = el.firstChild;
        }
        return el;
    };

    // kill repeat to save bytes
    var ts = '<table>',
        te = '</table>',
        tbs = ts+'<tbody>',
        tbe = '</tbody>'+te,
        trs = tbs + '<tr>',
        tre = '</tr>'+tbe;

    /**
     * @ignore
     * Nasty code for IE's broken table implementation
     */
    var insertIntoTable = function(tag, where, el, html){
        if(!tempTableEl){
            tempTableEl = document.createElement('div');
        }
        var node;
        var before = null;
        if(tag == 'td'){
            if(where == 'afterbegin' || where == 'beforeend'){ // INTO a TD
                return;
            }
            if(where == 'beforebegin'){
                before = el;
                el = el.parentNode;
            } else{
                before = el.nextSibling;
                el = el.parentNode;
            }
            node = ieTable(4, trs, html, tre);
        }
        else if(tag == 'tr'){
            if(where == 'beforebegin'){
                before = el;
                el = el.parentNode;
                node = ieTable(3, tbs, html, tbe);
            } else if(where == 'afterend'){
                before = el.nextSibling;
                el = el.parentNode;
                node = ieTable(3, tbs, html, tbe);
            } else{ // INTO a TR
                if(where == 'afterbegin'){
                    before = el.firstChild;
                }
                node = ieTable(4, trs, html, tre);
            }
        } else if(tag == 'tbody'){
            if(where == 'beforebegin'){
                before = el;
                el = el.parentNode;
                node = ieTable(2, ts, html, te);
            } else if(where == 'afterend'){
                before = el.nextSibling;
                el = el.parentNode;
                node = ieTable(2, ts, html, te);
            } else{
                if(where == 'afterbegin'){
                    before = el.firstChild;
                }
                node = ieTable(3, tbs, html, tbe);
            }
        } else{ // TABLE
            if(where == 'beforebegin' || where == 'afterend'){ // OUTSIDE the table
                return;
            }
            if(where == 'afterbegin'){
                before = el.firstChild;
            }
            node = ieTable(2, ts, html, te);
        }
        el.insertBefore(node, before);
        return node;
    };
    
    // this is a bit like the react update code...
    // 
    
    var updateNode = function(from, to)
    {
        // should we handle non-standard elements?
        Roo.log(["UpdateNode" , from, to]);
        if (from.nodeType != to.nodeType) {
            Roo.log(["ReplaceChild - mismatch notType" , to, from ]);
            from.parentNode.replaceChild(to, from);
        }
        
        if (from.nodeType == 3) {
            // assume it's text?!
            if (from.data == to.data) {
                return;
            }
            from.data = to.data;
            return;
        }
        if (!from.parentNode) {
            // not sure why this is happening?
            return;
        }
        // assume 'to' doesnt have '1/3 nodetypes!
        // not sure why, by from, parent node might not exist?
        if (from.nodeType !=1 || from.tagName != to.tagName) {
            Roo.log(["ReplaceChild" , from, to ]);
            
            from.parentNode.replaceChild(to, from);
            return;
        }
        // compare attributes
        var ar = Array.from(from.attributes);
        for(var i = 0; i< ar.length;i++) {
            if (to.hasAttribute(ar[i].name)) {
                continue;
            }
            if (ar[i].name == 'id') { // always keep ids?
               continue;
            }
            //if (ar[i].name == 'style') {
            //   throw "style removed?";
            //}
            Roo.log("removeAttribute" + ar[i].name);
            from.removeAttribute(ar[i].name);
        }
        ar = to.attributes;
        for(var i = 0; i< ar.length;i++) {
            if (from.getAttribute(ar[i].name) == to.getAttribute(ar[i].name)) {
                Roo.log("skipAttribute " + ar[i].name  + '=' + to.getAttribute(ar[i].name));
                continue;
            }
            Roo.log("updateAttribute " + ar[i].name + '=>' + to.getAttribute(ar[i].name));
            from.setAttribute(ar[i].name, to.getAttribute(ar[i].name));
        }
        // children
        var far = Array.from(from.childNodes);
        var tar = Array.from(to.childNodes);
        // if the lengths are different.. then it's probably a editable content change, rather than
        // a change of the block definition..
        
        // this did notwork , as our rebuilt nodes did not include ID's so did not match at all.
         /*if (from.innerHTML == to.innerHTML) {
            return;
        }
        if (far.length != tar.length) {
            from.innerHTML = to.innerHTML;
            return;
        }
        */
        
        for(var i = 0; i < Math.max(tar.length, far.length); i++) {
            if (i >= far.length) {
                from.appendChild(tar[i]);
                Roo.log(["add", tar[i]]);
                
            } else if ( i  >= tar.length) {
                from.removeChild(far[i]);
                Roo.log(["remove", far[i]]);
            } else {
                
                updateNode(far[i], tar[i]);
            }    
        }
        
        
        
        
    };
    
    

    return {
        /** True to force the use of DOM instead of html fragments @type Boolean */
        useDom : false,
    
        /**
         * Returns the markup for the passed Element(s) config
         * @param {Object} o The Dom object spec (and children)
         * @return {String}
         */
        markup : function(o){
            return createHtml(o);
        },
    
        /**
         * Applies a style specification to an element
         * @param {String/HTMLElement} el The element to apply styles to
         * @param {String/Object/Function} styles A style specification string eg "width:100px", or object in the form {width:"100px"}, or
         * a function which returns such a specification.
         */
        applyStyles : function(el, styles){
            if(styles){
               el = Roo.fly(el);
               if(typeof styles == "string"){
                   var re = /\s?([a-z\-]*)\:\s?([^;]*);?/gi;
                   var matches;
                   while ((matches = re.exec(styles)) != null){
                       el.setStyle(matches[1], matches[2]);
                   }
               }else if (typeof styles == "object"){
                   for (var style in styles){
                      el.setStyle(style, styles[style]);
                   }
               }else if (typeof styles == "function"){
                    Roo.DomHelper.applyStyles(el, styles.call());
               }
            }
        },
    
        /**
         * Inserts an HTML fragment into the Dom
         * @param {String} where Where to insert the html in relation to el - beforeBegin, afterBegin, beforeEnd, afterEnd.
         * @param {HTMLElement} el The context element
         * @param {String} html The HTML fragmenet
         * @return {HTMLElement} The new node
         */
        insertHtml : function(where, el, html){
            where = where.toLowerCase();
            if(el.insertAdjacentHTML){
                if(tableRe.test(el.tagName)){
                    var rs;
                    if(rs = insertIntoTable(el.tagName.toLowerCase(), where, el, html)){
                        return rs;
                    }
                }
                switch(where){
                    case "beforebegin":
                        el.insertAdjacentHTML('BeforeBegin', html);
                        return el.previousSibling;
                    case "afterbegin":
                        el.insertAdjacentHTML('AfterBegin', html);
                        return el.firstChild;
                    case "beforeend":
                        el.insertAdjacentHTML('BeforeEnd', html);
                        return el.lastChild;
                    case "afterend":
                        el.insertAdjacentHTML('AfterEnd', html);
                        return el.nextSibling;
                }
                throw 'Illegal insertion point -> "' + where + '"';
            }
            var range = el.ownerDocument.createRange();
            var frag;
            switch(where){
                 case "beforebegin":
                    range.setStartBefore(el);
                    frag = range.createContextualFragment(html);
                    el.parentNode.insertBefore(frag, el);
                    return el.previousSibling;
                 case "afterbegin":
                    if(el.firstChild){
                        range.setStartBefore(el.firstChild);
                        frag = range.createContextualFragment(html);
                        el.insertBefore(frag, el.firstChild);
                        return el.firstChild;
                    }else{
                        el.innerHTML = html;
                        return el.firstChild;
                    }
                case "beforeend":
                    if(el.lastChild){
                        range.setStartAfter(el.lastChild);
                        frag = range.createContextualFragment(html);
                        el.appendChild(frag);
                        return el.lastChild;
                    }else{
                        el.innerHTML = html;
                        return el.lastChild;
                    }
                case "afterend":
                    range.setStartAfter(el);
                    frag = range.createContextualFragment(html);
                    el.parentNode.insertBefore(frag, el.nextSibling);
                    return el.nextSibling;
                }
                throw 'Illegal insertion point -> "' + where + '"';
        },
    
        /**
         * Creates new Dom element(s) and inserts them before el
         * @param {String/HTMLElement/Element} el The context element
         * @param {Object/String} o The Dom object spec (and children) or raw HTML blob
         * @param {Boolean} returnElement (optional) true to return a Roo.Element
         * @return {HTMLElement/Roo.Element} The new node
         */
        insertBefore : function(el, o, returnElement){
            return this.doInsert(el, o, returnElement, "beforeBegin");
        },
    
        /**
         * Creates new Dom element(s) and inserts them after el
         * @param {String/HTMLElement/Element} el The context element
         * @param {Object} o The Dom object spec (and children)
         * @param {Boolean} returnElement (optional) true to return a Roo.Element
         * @return {HTMLElement/Roo.Element} The new node
         */
        insertAfter : function(el, o, returnElement){
            return this.doInsert(el, o, returnElement, "afterEnd", "nextSibling");
        },
    
        /**
         * Creates new Dom element(s) and inserts them as the first child of el
         * @param {String/HTMLElement/Element} el The context element
         * @param {Object/String} o The Dom object spec (and children) or raw HTML blob
         * @param {Boolean} returnElement (optional) true to return a Roo.Element
         * @return {HTMLElement/Roo.Element} The new node
         */
        insertFirst : function(el, o, returnElement){
            return this.doInsert(el, o, returnElement, "afterBegin");
        },
    
        // private
        doInsert : function(el, o, returnElement, pos, sibling){
            el = Roo.getDom(el);
            var newNode;
            if(this.useDom || o.ns){
                newNode = createDom(o, null);
                el.parentNode.insertBefore(newNode, sibling ? el[sibling] : el);
            }else{
                var html = createHtml(o);
                newNode = this.insertHtml(pos, el, html);
            }
            return returnElement ? Roo.get(newNode, true) : newNode;
        },
    
        /**
         * Creates new Dom element(s) and appends them to el
         * @param {String/HTMLElement/Element} el The context element
         * @param {Object/String} o The Dom object spec (and children) or raw HTML blob
         * @param {Boolean} returnElement (optional) true to return a Roo.Element
         * @return {HTMLElement/Roo.Element} The new node
         */
        append : function(el, o, returnElement){
            el = Roo.getDom(el);
            var newNode;
            if(this.useDom || o.ns){
                newNode = createDom(o, null);
                el.appendChild(newNode);
            }else{
                var html = createHtml(o);
                newNode = this.insertHtml("beforeEnd", el, html);
            }
            return returnElement ? Roo.get(newNode, true) : newNode;
        },
    
        /**
         * Creates new Dom element(s) and overwrites the contents of el with them
         * @param {String/HTMLElement/Element} el The context element
         * @param {Object/String} o The Dom object spec (and children) or raw HTML blob
         * @param {Boolean} returnElement (optional) true to return a Roo.Element
         * @return {HTMLElement/Roo.Element} The new node
         */
        overwrite : function(el, o, returnElement)
        {
            el = Roo.getDom(el);
            if (o.ns) {
              
                while (el.childNodes.length) {
                    el.removeChild(el.firstChild);
                }
                createDom(o, el);
            } else {
                el.innerHTML = createHtml(o);   
            }
            
            return returnElement ? Roo.get(el.firstChild, true) : el.firstChild;
        },
    
        /**
         * Creates a new Roo.DomHelper.Template from the Dom object spec
         * @param {Object} o The Dom object spec (and children)
         * @return {Roo.DomHelper.Template} The new template
         */
        createTemplate : function(o){
            var html = createHtml(o);
            return new Roo.Template(html);
        },
         /**
         * Updates the first element with the spec from the o (replacing if necessary)
         * This iterates through the children, and updates attributes / children etc..
         * @param {String/HTMLElement/Element} el The context element
         * @param {Object/String} o The Dom object spec (and children) or raw HTML blob
         */
        
        update : function(el, o)
        {
            updateNode(Roo.getDom(el), createDom(o));
            
        }
        
        
    };
}();
/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 
/**
* @class Roo.Template
* Represents an HTML fragment template. Templates can be precompiled for greater performance.
* For a list of available format functions, see {@link Roo.util.Format}.<br />
* Usage:
<pre><code>
var t = new Roo.Template({
    html :  '&lt;div name="{id}"&gt;' + 
        '&lt;span class="{cls}"&gt;{name:trim} {someval:this.myformat}{value:ellipsis(10)}&lt;/span&gt;' +
        '&lt;/div&gt;',
    myformat: function (value, allValues) {
        return 'XX' + value;
    }
});
t.append('some-element', {id: 'myid', cls: 'myclass', name: 'foo', value: 'bar'});
</code></pre>
* For more information see this blog post with examples:
*  <a href="http://www.cnitblog.com/seeyeah/archive/2011/12/30/38728.html/">DomHelper
     - Create Elements using DOM, HTML fragments and Templates</a>. 
* @constructor
* @param {Object} cfg - Configuration object.
*/
Roo.Template = function(cfg){
    // BC!
    if(cfg instanceof Array){
        cfg = cfg.join("");
    }else if(arguments.length > 1){
        cfg = Array.prototype.join.call(arguments, "");
    }
    
    
    if (typeof(cfg) == 'object') {
        Roo.apply(this,cfg)
    } else {
        // bc
        this.html = cfg;
    }
    if (this.url) {
        this.load();
    }
    
};
Roo.Template.prototype = {
    
    /**
     * @cfg {Function} onLoad Called after the template has been loaded and complied (usually from a remove source)
     */
    onLoad : false,
    
    
    /**
     * @cfg {String} url  The Url to load the template from. beware if you are loading from a url, the data may not be ready if you use it instantly..
     *                    it should be fixed so that template is observable...
     */
    url : false,
    /**
     * @cfg {String} html  The HTML fragment or an array of fragments to join("") or multiple arguments to join("")
     */
    html : '',
    
    
    compiled : false,
    loaded : false,
    /**
     * Returns an HTML fragment of this template with the specified values applied.
     * @param {Object} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @return {String} The HTML fragment
     */
    
   
    
    applyTemplate : function(values){
        //Roo.log(["applyTemplate", values]);
        try {
           
            if(this.compiled){
                return this.compiled(values);
            }
            var useF = this.disableFormats !== true;
            var fm = Roo.util.Format, tpl = this;
            var fn = function(m, name, format, args){
                if(format && useF){
                    if(format.substr(0, 5) == "this."){
                        return tpl.call(format.substr(5), values[name], values);
                    }else{
                        if(args){
                            // quoted values are required for strings in compiled templates, 
                            // but for non compiled we need to strip them
                            // quoted reversed for jsmin
                            var re = /^\s*['"](.*)["']\s*$/;
                            args = args.split(',');
                            for(var i = 0, len = args.length; i < len; i++){
                                args[i] = args[i].replace(re, "$1");
                            }
                            args = [values[name]].concat(args);
                        }else{
                            args = [values[name]];
                        }
                        return fm[format].apply(fm, args);
                    }
                }else{
                    return values[name] !== undefined ? values[name] : "";
                }
            };
            return this.html.replace(this.re, fn);
        } catch (e) {
            Roo.log(e);
            throw e;
        }
         
    },
    
    loading : false,
      
    load : function ()
    {
         
        if (this.loading) {
            return;
        }
        var _t = this;
        
        this.loading = true;
        this.compiled = false;
        
        var cx = new Roo.data.Connection();
        cx.request({
            url : this.url,
            method : 'GET',
            success : function (response) {
                _t.loading = false;
                _t.url = false;
                
                _t.set(response.responseText,true);
                _t.loaded = true;
                if (_t.onLoad) {
                    _t.onLoad();
                }
             },
            failure : function(response) {
                Roo.log("Template failed to load from " + _t.url);
                _t.loading = false;
            }
        });
    },

    /**
     * Sets the HTML used as the template and optionally compiles it.
     * @param {String} html
     * @param {Boolean} compile (optional) True to compile the template (defaults to undefined)
     * @return {Roo.Template} this
     */
    set : function(html, compile){
        this.html = html;
        this.compiled = false;
        if(compile){
            this.compile();
        }
        return this;
    },
    
    /**
     * True to disable format functions (defaults to false)
     * @type Boolean
     */
    disableFormats : false,
    
    /**
    * The regular expression used to match template variables 
    * @type RegExp
    * @property 
    */
    re : /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
    
    /**
     * Compiles the template into an internal function, eliminating the RegEx overhead.
     * @return {Roo.Template} this
     */
    compile : function(){
        var fm = Roo.util.Format;
        var useF = this.disableFormats !== true;
        var sep = Roo.isGecko ? "+" : ",";
        var fn = function(m, name, format, args){
            if(format && useF){
                args = args ? ',' + args : "";
                if(format.substr(0, 5) != "this."){
                    format = "fm." + format + '(';
                }else{
                    format = 'this.call("'+ format.substr(5) + '", ';
                    args = ", values";
                }
            }else{
                args= ''; format = "(values['" + name + "'] == undefined ? '' : ";
            }
            return "'"+ sep + format + "values['" + name + "']" + args + ")"+sep+"'";
        };
        var body;
        // branched to use + in gecko and [].join() in others
        if(Roo.isGecko){
            body = "this.compiled = function(values){ return '" +
                   this.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn) +
                    "';};";
        }else{
            body = ["this.compiled = function(values){ return ['"];
            body.push(this.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn));
            body.push("'].join('');};");
            body = body.join('');
        }
        /**
         * eval:var:values
         * eval:var:fm
         */
        eval(body);
        return this;
    },
    
    // private function used to call members
    call : function(fnName, value, allValues){
        return this[fnName](value, allValues);
    },
    
    /**
     * Applies the supplied values to the template and inserts the new node(s) as the first child of el.
     * @param {String/HTMLElement/Roo.Element} el The context element
     * @param {Object} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Roo.Element (defaults to undefined)
     * @return {HTMLElement/Roo.Element} The new node or Element
     */
    insertFirst: function(el, values, returnElement){
        return this.doInsert('afterBegin', el, values, returnElement);
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) before el.
     * @param {String/HTMLElement/Roo.Element} el The context element
     * @param {Object} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Roo.Element (defaults to undefined)
     * @return {HTMLElement/Roo.Element} The new node or Element
     */
    insertBefore: function(el, values, returnElement){
        return this.doInsert('beforeBegin', el, values, returnElement);
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) after el.
     * @param {String/HTMLElement/Roo.Element} el The context element
     * @param {Object} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Roo.Element (defaults to undefined)
     * @return {HTMLElement/Roo.Element} The new node or Element
     */
    insertAfter : function(el, values, returnElement){
        return this.doInsert('afterEnd', el, values, returnElement);
    },
    
    /**
     * Applies the supplied values to the template and appends the new node(s) to el.
     * @param {String/HTMLElement/Roo.Element} el The context element
     * @param {Object} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Roo.Element (defaults to undefined)
     * @return {HTMLElement/Roo.Element} The new node or Element
     */
    append : function(el, values, returnElement){
        return this.doInsert('beforeEnd', el, values, returnElement);
    },

    doInsert : function(where, el, values, returnEl){
        el = Roo.getDom(el);
        var newNode = Roo.DomHelper.insertHtml(where, el, this.applyTemplate(values));
        return returnEl ? Roo.get(newNode, true) : newNode;
    },

    /**
     * Applies the supplied values to the template and overwrites the content of el with the new node(s).
     * @param {String/HTMLElement/Roo.Element} el The context element
     * @param {Object} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Roo.Element (defaults to undefined)
     * @return {HTMLElement/Roo.Element} The new node or Element
     */
    overwrite : function(el, values, returnElement){
        el = Roo.getDom(el);
        el.innerHTML = this.applyTemplate(values);
        return returnElement ? Roo.get(el.firstChild, true) : el.firstChild;
    }
};
/**
 * Alias for {@link #applyTemplate}
 * @method
 */
Roo.Template.prototype.apply = Roo.Template.prototype.applyTemplate;

// backwards compat
Roo.DomHelper.Template = Roo.Template;

/**
 * Creates a template from the passed element's value (<i>display:none</i> textarea, preferred) or innerHTML.
 * @param {String/HTMLElement} el A DOM element or its id
 * @returns {Roo.Template} The created template
 * @static
 */
Roo.Template.from = function(el){
    el = Roo.getDom(el);
    return new Roo.Template(el.value || el.innerHTML);
};/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 

/*
 * This is code is also distributed under MIT license for use
 * with jQuery and prototype JavaScript libraries.
 */
/**
 * @class Roo.DomQuery
Provides high performance selector/xpath processing by compiling queries into reusable functions. New pseudo classes and matchers can be plugged. It works on HTML and XML documents (if a content node is passed in).
<p>
DomQuery supports most of the <a href="http://www.w3.org/TR/2005/WD-css3-selectors-20051215/">CSS3 selectors spec</a>, along with some custom selectors and basic XPath.</p>

<p>
All selectors, attribute filters and pseudos below can be combined infinitely in any order. For example "div.foo:nth-child(odd)[@foo=bar].bar:first" would be a perfectly valid selector. Node filters are processed in the order in which they appear, which allows you to optimize your queries for your document structure.
</p>
<h4>Element Selectors:</h4>
<ul class="list">
    <li> <b>*</b> any element</li>
    <li> <b>E</b> an element with the tag E</li>
    <li> <b>E F</b> All descendent elements of E that have the tag F</li>
    <li> <b>E > F</b> or <b>E/F</b> all direct children elements of E that have the tag F</li>
    <li> <b>E + F</b> all elements with the tag F that are immediately preceded by an element with the tag E</li>
    <li> <b>E ~ F</b> all elements with the tag F that are preceded by a sibling element with the tag E</li>
</ul>
<h4>Attribute Selectors:</h4>
<p>The use of @ and quotes are optional. For example, div[@foo='bar'] is also a valid attribute selector.</p>
<ul class="list">
    <li> <b>E[foo]</b> has an attribute "foo"</li>
    <li> <b>E[foo=bar]</b> has an attribute "foo" that equals "bar"</li>
    <li> <b>E[foo^=bar]</b> has an attribute "foo" that starts with "bar"</li>
    <li> <b>E[foo$=bar]</b> has an attribute "foo" that ends with "bar"</li>
    <li> <b>E[foo*=bar]</b> has an attribute "foo" that contains the substring "bar"</li>
    <li> <b>E[foo%=2]</b> has an attribute "foo" that is evenly divisible by 2</li>
    <li> <b>E[foo!=bar]</b> has an attribute "foo" that does not equal "bar"</li>
</ul>
<h4>Pseudo Classes:</h4>
<ul class="list">
    <li> <b>E:first-child</b> E is the first child of its parent</li>
    <li> <b>E:last-child</b> E is the last child of its parent</li>
    <li> <b>E:nth-child(<i>n</i>)</b> E is the <i>n</i>th child of its parent (1 based as per the spec)</li>
    <li> <b>E:nth-child(odd)</b> E is an odd child of its parent</li>
    <li> <b>E:nth-child(even)</b> E is an even child of its parent</li>
    <li> <b>E:only-child</b> E is the only child of its parent</li>
    <li> <b>E:checked</b> E is an element that is has a checked attribute that is true (e.g. a radio or checkbox) </li>
    <li> <b>E:first</b> the first E in the resultset</li>
    <li> <b>E:last</b> the last E in the resultset</li>
    <li> <b>E:nth(<i>n</i>)</b> the <i>n</i>th E in the resultset (1 based)</li>
    <li> <b>E:odd</b> shortcut for :nth-child(odd)</li>
    <li> <b>E:even</b> shortcut for :nth-child(even)</li>
    <li> <b>E:contains(foo)</b> E's innerHTML contains the substring "foo"</li>
    <li> <b>E:nodeValue(foo)</b> E contains a textNode with a nodeValue that equals "foo"</li>
    <li> <b>E:not(S)</b> an E element that does not match simple selector S</li>
    <li> <b>E:has(S)</b> an E element that has a descendent that matches simple selector S</li>
    <li> <b>E:next(S)</b> an E element whose next sibling matches simple selector S</li>
    <li> <b>E:prev(S)</b> an E element whose previous sibling matches simple selector S</li>
</ul>
<h4>CSS Value Selectors:</h4>
<ul class="list">
    <li> <b>E{display=none}</b> css value "display" that equals "none"</li>
    <li> <b>E{display^=none}</b> css value "display" that starts with "none"</li>
    <li> <b>E{display$=none}</b> css value "display" that ends with "none"</li>
    <li> <b>E{display*=none}</b> css value "display" that contains the substring "none"</li>
    <li> <b>E{display%=2}</b> css value "display" that is evenly divisible by 2</li>
    <li> <b>E{display!=none}</b> css value "display" that does not equal "none"</li>
</ul>
 * @static
 */
Roo.DomQuery = function(){
    var cache = {}, simpleCache = {}, valueCache = {};
    var nonSpace = /\S/;
    var trimRe = /^\s+|\s+$/g;
    var tplRe = /\{(\d+)\}/g;
    var modeRe = /^(\s?[\/>+~]\s?|\s|$)/;
    var tagTokenRe = /^(#)?([\w-\*]+)/;
    var nthRe = /(\d*)n\+?(\d*)/, nthRe2 = /\D/;

    function child(p, index){
        var i = 0;
        var n = p.firstChild;
        while(n){
            if(n.nodeType == 1){
               if(++i == index){
                   return n;
               }
            }
            n = n.nextSibling;
        }
        return null;
    };

    function next(n){
        while((n = n.nextSibling) && n.nodeType != 1);
        return n;
    };

    function prev(n){
        while((n = n.previousSibling) && n.nodeType != 1);
        return n;
    };

    function children(d){
        var n = d.firstChild, ni = -1;
 	    while(n){
 	        var nx = n.nextSibling;
 	        if(n.nodeType == 3 && !nonSpace.test(n.nodeValue)){
 	            d.removeChild(n);
 	        }else{
 	            n.nodeIndex = ++ni;
 	        }
 	        n = nx;
 	    }
 	    return this;
 	};

    function byClassName(c, a, v){
        if(!v){
            return c;
        }
        var r = [], ri = -1, cn;
        for(var i = 0, ci; ci = c[i]; i++){
	    
	    
            if((' '+
		( (ci instanceof SVGElement) ? ci.className.baseVal : ci.className)
		 +' ').indexOf(v) != -1){
                r[++ri] = ci;
            }
        }
        return r;
    };

    function attrValue(n, attr){
        if(!n.tagName && typeof n.length != "undefined"){
            n = n[0];
        }
        if(!n){
            return null;
        }
        if(attr == "for"){
            return n.htmlFor;
        }
        if(attr == "class" || attr == "className"){
	    return (n instanceof SVGElement) ? n.className.baseVal : n.className;
        }
        return n.getAttribute(attr) || n[attr];

    };

    function getNodes(ns, mode, tagName){
        var result = [], ri = -1, cs;
        if(!ns){
            return result;
        }
        tagName = tagName || "*";
        if(typeof ns.getElementsByTagName != "undefined"){
            ns = [ns];
        }
        if(!mode){
            for(var i = 0, ni; ni = ns[i]; i++){
                cs = ni.getElementsByTagName(tagName);
                for(var j = 0, ci; ci = cs[j]; j++){
                    result[++ri] = ci;
                }
            }
        }else if(mode == "/" || mode == ">"){
            var utag = tagName.toUpperCase();
            for(var i = 0, ni, cn; ni = ns[i]; i++){
                cn = ni.children || ni.childNodes;
                for(var j = 0, cj; cj = cn[j]; j++){
                    if(cj.nodeName == utag || cj.nodeName == tagName  || tagName == '*'){
                        result[++ri] = cj;
                    }
                }
            }
        }else if(mode == "+"){
            var utag = tagName.toUpperCase();
            for(var i = 0, n; n = ns[i]; i++){
                while((n = n.nextSibling) && n.nodeType != 1);
                if(n && (n.nodeName == utag || n.nodeName == tagName || tagName == '*')){
                    result[++ri] = n;
                }
            }
        }else if(mode == "~"){
            for(var i = 0, n; n = ns[i]; i++){
                while((n = n.nextSibling) && (n.nodeType != 1 || (tagName == '*' || n.tagName.toLowerCase()!=tagName)));
                if(n){
                    result[++ri] = n;
                }
            }
        }
        return result;
    };

    function concat(a, b){
        if(b.slice){
            return a.concat(b);
        }
        for(var i = 0, l = b.length; i < l; i++){
            a[a.length] = b[i];
        }
        return a;
    }

    function byTag(cs, tagName){
        if(cs.tagName || cs == document){
            cs = [cs];
        }
        if(!tagName){
            return cs;
        }
        var r = [], ri = -1;
        tagName = tagName.toLowerCase();
        for(var i = 0, ci; ci = cs[i]; i++){
            if(ci.nodeType == 1 && ci.tagName.toLowerCase()==tagName){
                r[++ri] = ci;
            }
        }
        return r;
    };

    function byId(cs, attr, id){
        if(cs.tagName || cs == document){
            cs = [cs];
        }
        if(!id){
            return cs;
        }
        var r = [], ri = -1;
        for(var i = 0,ci; ci = cs[i]; i++){
            if(ci && ci.id == id){
                r[++ri] = ci;
                return r;
            }
        }
        return r;
    };

    function byAttribute(cs, attr, value, op, custom){
        var r = [], ri = -1, st = custom=="{";
        var f = Roo.DomQuery.operators[op];
        for(var i = 0, ci; ci = cs[i]; i++){
            var a;
            if(st){
                a = Roo.DomQuery.getStyle(ci, attr);
            }
            else if(attr == "class" || attr == "className"){
                a = (ci instanceof SVGElement) ? ci.className.baseVal : ci.className;
            }else if(attr == "for"){
                a = ci.htmlFor;
            }else if(attr == "href"){
                a = ci.getAttribute("href", 2);
            }else{
                a = ci.getAttribute(attr);
            }
            if((f && f(a, value)) || (!f && a)){
                r[++ri] = ci;
            }
        }
        return r;
    };

    function byPseudo(cs, name, value){
        return Roo.DomQuery.pseudos[name](cs, value);
    };

    // This is for IE MSXML which does not support expandos.
    // IE runs the same speed using setAttribute, however FF slows way down
    // and Safari completely fails so they need to continue to use expandos.
    var isIE = window.ActiveXObject ? true : false;

    // this eval is stop the compressor from
    // renaming the variable to something shorter
    
    /** eval:var:batch */
    var batch = 30803; 

    var key = 30803;

    function nodupIEXml(cs){
        var d = ++key;
        cs[0].setAttribute("_nodup", d);
        var r = [cs[0]];
        for(var i = 1, len = cs.length; i < len; i++){
            var c = cs[i];
            if(!c.getAttribute("_nodup") != d){
                c.setAttribute("_nodup", d);
                r[r.length] = c;
            }
        }
        for(var i = 0, len = cs.length; i < len; i++){
            cs[i].removeAttribute("_nodup");
        }
        return r;
    }

    function nodup(cs){
        if(!cs){
            return [];
        }
        var len = cs.length, c, i, r = cs, cj, ri = -1;
        if(!len || typeof cs.nodeType != "undefined" || len == 1){
            return cs;
        }
        if(isIE && typeof cs[0].selectSingleNode != "undefined"){
            return nodupIEXml(cs);
        }
        var d = ++key;
        cs[0]._nodup = d;
        for(i = 1; c = cs[i]; i++){
            if(c._nodup != d){
                c._nodup = d;
            }else{
                r = [];
                for(var j = 0; j < i; j++){
                    r[++ri] = cs[j];
                }
                for(j = i+1; cj = cs[j]; j++){
                    if(cj._nodup != d){
                        cj._nodup = d;
                        r[++ri] = cj;
                    }
                }
                return r;
            }
        }
        return r;
    }

    function quickDiffIEXml(c1, c2){
        var d = ++key;
        for(var i = 0, len = c1.length; i < len; i++){
            c1[i].setAttribute("_qdiff", d);
        }
        var r = [];
        for(var i = 0, len = c2.length; i < len; i++){
            if(c2[i].getAttribute("_qdiff") != d){
                r[r.length] = c2[i];
            }
        }
        for(var i = 0, len = c1.length; i < len; i++){
           c1[i].removeAttribute("_qdiff");
        }
        return r;
    }

    function quickDiff(c1, c2){
        var len1 = c1.length;
        if(!len1){
            return c2;
        }
        if(isIE && c1[0].selectSingleNode){
            return quickDiffIEXml(c1, c2);
        }
        var d = ++key;
        for(var i = 0; i < len1; i++){
            c1[i]._qdiff = d;
        }
        var r = [];
        for(var i = 0, len = c2.length; i < len; i++){
            if(c2[i]._qdiff != d){
                r[r.length] = c2[i];
            }
        }
        return r;
    }

    function quickId(ns, mode, root, id){
        if(ns == root){
           var d = root.ownerDocument || root;
           return d.getElementById(id);
        }
        ns = getNodes(ns, mode, "*");
        return byId(ns, null, id);
    }

    return {
        getStyle : function(el, name){
            return Roo.fly(el).getStyle(name);
        },
        /**
         * Compiles a selector/xpath query into a reusable function. The returned function
         * takes one parameter "root" (optional), which is the context node from where the query should start.
         * @param {String} selector The selector/xpath query
         * @param {String} type (optional) Either "select" (the default) or "simple" for a simple selector match
         * @return {Function}
         */
        compile : function(path, type){
            type = type || "select";
            
            var fn = ["var f = function(root){\n var mode; ++batch; var n = root || document;\n"];
            var q = path, mode, lq;
            var tk = Roo.DomQuery.matchers;
            var tklen = tk.length;
            var mm;

            // accept leading mode switch
            var lmode = q.match(modeRe);
            if(lmode && lmode[1]){
                fn[fn.length] = 'mode="'+lmode[1].replace(trimRe, "")+'";';
                q = q.replace(lmode[1], "");
            }
            // strip leading slashes
            while(path.substr(0, 1)=="/"){
                path = path.substr(1);
            }

            while(q && lq != q){
                lq = q;
                var tm = q.match(tagTokenRe);
                if(type == "select"){
                    if(tm){
                        if(tm[1] == "#"){
                            fn[fn.length] = 'n = quickId(n, mode, root, "'+tm[2]+'");';
                        }else{
                            fn[fn.length] = 'n = getNodes(n, mode, "'+tm[2]+'");';
                        }
                        q = q.replace(tm[0], "");
                    }else if(q.substr(0, 1) != '@'){
                        fn[fn.length] = 'n = getNodes(n, mode, "*");';
                    }
                }else{
                    if(tm){
                        if(tm[1] == "#"){
                            fn[fn.length] = 'n = byId(n, null, "'+tm[2]+'");';
                        }else{
                            fn[fn.length] = 'n = byTag(n, "'+tm[2]+'");';
                        }
                        q = q.replace(tm[0], "");
                    }
                }
                while(!(mm = q.match(modeRe))){
                    var matched = false;
                    for(var j = 0; j < tklen; j++){
                        var t = tk[j];
                        var m = q.match(t.re);
                        if(m){
                            fn[fn.length] = t.select.replace(tplRe, function(x, i){
                                                    return m[i];
                                                });
                            q = q.replace(m[0], "");
                            matched = true;
                            break;
                        }
                    }
                    // prevent infinite loop on bad selector
                    if(!matched){
                        throw 'Error parsing selector, parsing failed at "' + q + '"';
                    }
                }
                if(mm[1]){
                    fn[fn.length] = 'mode="'+mm[1].replace(trimRe, "")+'";';
                    q = q.replace(mm[1], "");
                }
            }
            fn[fn.length] = "return nodup(n);\n}";
            
             /** 
              * list of variables that need from compression as they are used by eval.
             *  eval:var:batch 
             *  eval:var:nodup
             *  eval:var:byTag
             *  eval:var:ById
             *  eval:var:getNodes
             *  eval:var:quickId
             *  eval:var:mode
             *  eval:var:root
             *  eval:var:n
             *  eval:var:byClassName
             *  eval:var:byPseudo
             *  eval:var:byAttribute
             *  eval:var:attrValue
             * 
             **/ 
            eval(fn.join(""));
            return f;
        },

        /**
         * Selects a group of elements.
         * @param {String} selector The selector/xpath query (can be a comma separated list of selectors)
         * @param {Node} root (optional) The start of the query (defaults to document).
         * @return {Array}
         */
        select : function(path, root, type){
            if(!root || root == document){
                root = document;
            }
            if(typeof root == "string"){
                root = document.getElementById(root);
            }
            var paths = path.split(",");
            var results = [];
            for(var i = 0, len = paths.length; i < len; i++){
                var p = paths[i].replace(trimRe, "");
                if(!cache[p]){
                    cache[p] = Roo.DomQuery.compile(p);
                    if(!cache[p]){
                        throw p + " is not a valid selector";
                    }
                }
                var result = cache[p](root);
                if(result && result != document){
                    results = results.concat(result);
                }
            }
            if(paths.length > 1){
                return nodup(results);
            }
            return results;
        },

        /**
         * Selects a single element.
         * @param {String} selector The selector/xpath query
         * @param {Node} root (optional) The start of the query (defaults to document).
         * @return {Element}
         */
        selectNode : function(path, root){
            return Roo.DomQuery.select(path, root)[0];
        },

        /**
         * Selects the value of a node, optionally replacing null with the defaultValue.
         * @param {String} selector The selector/xpath query
         * @param {Node} root (optional) The start of the query (defaults to document).
         * @param {String} defaultValue
         */
        selectValue : function(path, root, defaultValue){
            path = path.replace(trimRe, "");
            if(!valueCache[path]){
                valueCache[path] = Roo.DomQuery.compile(path, "select");
            }
            var n = valueCache[path](root);
            n = n[0] ? n[0] : n;
            var v = (n && n.firstChild ? n.firstChild.nodeValue : null);
            return ((v === null||v === undefined||v==='') ? defaultValue : v);
        },

        /**
         * Selects the value of a node, parsing integers and floats.
         * @param {String} selector The selector/xpath query
         * @param {Node} root (optional) The start of the query (defaults to document).
         * @param {Number} defaultValue
         * @return {Number}
         */
        selectNumber : function(path, root, defaultValue){
            var v = Roo.DomQuery.selectValue(path, root, defaultValue || 0);
            return parseFloat(v);
        },

        /**
         * Returns true if the passed element(s) match the passed simple selector (e.g. div.some-class or span:first-child)
         * @param {String/HTMLElement/Array} el An element id, element or array of elements
         * @param {String} selector The simple selector to test
         * @return {Boolean}
         */
        is : function(el, ss){
            if(typeof el == "string"){
                el = document.getElementById(el);
            }
            var isArray = (el instanceof Array);
            var result = Roo.DomQuery.filter(isArray ? el : [el], ss);
            return isArray ? (result.length == el.length) : (result.length > 0);
        },

        /**
         * Filters an array of elements to only include matches of a simple selector (e.g. div.some-class or span:first-child)
         * @param {Array} el An array of elements to filter
         * @param {String} selector The simple selector to test
         * @param {Boolean} nonMatches If true, it returns the elements that DON'T match
         * the selector instead of the ones that match
         * @return {Array}
         */
        filter : function(els, ss, nonMatches){
            ss = ss.replace(trimRe, "");
            if(!simpleCache[ss]){
                simpleCache[ss] = Roo.DomQuery.compile(ss, "simple");
            }
            var result = simpleCache[ss](els);
            return nonMatches ? quickDiff(result, els) : result;
        },

        /**
         * Collection of matching regular expressions and code snippets.
         */
        matchers : [{
                re: /^\.([\w-]+)/,
                select: 'n = byClassName(n, null, " {1} ");'
            }, {
                re: /^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
                select: 'n = byPseudo(n, "{1}", "{2}");'
            },{
                re: /^(?:([\[\{])(?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
                select: 'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'
            }, {
                re: /^#([\w-]+)/,
                select: 'n = byId(n, null, "{1}");'
            },{
                re: /^@([\w-]+)/,
                select: 'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'
            }
        ],

        /**
         * Collection of operator comparison functions. The default operators are =, !=, ^=, $=, *=, %=, |= and ~=.
         * New operators can be added as long as the match the format <i>c</i>= where <i>c</i> is any character other than space, &gt; &lt;.
         */
        operators : {
            "=" : function(a, v){
                return a == v;
            },
            "!=" : function(a, v){
                return a != v;
            },
            "^=" : function(a, v){
                return a && a.substr(0, v.length) == v;
            },
            "$=" : function(a, v){
                return a && a.substr(a.length-v.length) == v;
            },
            "*=" : function(a, v){
                return a && a.indexOf(v) !== -1;
            },
            "%=" : function(a, v){
                return (a % v) == 0;
            },
            "|=" : function(a, v){
                return a && (a == v || a.substr(0, v.length+1) == v+'-');
            },
            "~=" : function(a, v){
                return a && (' '+a+' ').indexOf(' '+v+' ') != -1;
            }
        },

        /**
         * Collection of "pseudo class" processors. Each processor is passed the current nodeset (array)
         * and the argument (if any) supplied in the selector.
         */
        pseudos : {
            "first-child" : function(c){
                var r = [], ri = -1, n;
                for(var i = 0, ci; ci = n = c[i]; i++){
                    while((n = n.previousSibling) && n.nodeType != 1);
                    if(!n){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "last-child" : function(c){
                var r = [], ri = -1, n;
                for(var i = 0, ci; ci = n = c[i]; i++){
                    while((n = n.nextSibling) && n.nodeType != 1);
                    if(!n){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "nth-child" : function(c, a) {
                var r = [], ri = -1;
                var m = nthRe.exec(a == "even" && "2n" || a == "odd" && "2n+1" || !nthRe2.test(a) && "n+" + a || a);
                var f = (m[1] || 1) - 0, l = m[2] - 0;
                for(var i = 0, n; n = c[i]; i++){
                    var pn = n.parentNode;
                    if (batch != pn._batch) {
                        var j = 0;
                        for(var cn = pn.firstChild; cn; cn = cn.nextSibling){
                            if(cn.nodeType == 1){
                               cn.nodeIndex = ++j;
                            }
                        }
                        pn._batch = batch;
                    }
                    if (f == 1) {
                        if (l == 0 || n.nodeIndex == l){
                            r[++ri] = n;
                        }
                    } else if ((n.nodeIndex + l) % f == 0){
                        r[++ri] = n;
                    }
                }

                return r;
            },

            "only-child" : function(c){
                var r = [], ri = -1;;
                for(var i = 0, ci; ci = c[i]; i++){
                    if(!prev(ci) && !next(ci)){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "empty" : function(c){
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    var cns = ci.childNodes, j = 0, cn, empty = true;
                    while(cn = cns[j]){
                        ++j;
                        if(cn.nodeType == 1 || cn.nodeType == 3){
                            empty = false;
                            break;
                        }
                    }
                    if(empty){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "contains" : function(c, v){
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    if((ci.textContent||ci.innerText||'').indexOf(v) != -1){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "nodeValue" : function(c, v){
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    if(ci.firstChild && ci.firstChild.nodeValue == v){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "checked" : function(c){
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    if(ci.checked == true){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "not" : function(c, ss){
                return Roo.DomQuery.filter(c, ss, true);
            },

            "odd" : function(c){
                return this["nth-child"](c, "odd");
            },

            "even" : function(c){
                return this["nth-child"](c, "even");
            },

            "nth" : function(c, a){
                return c[a-1] || [];
            },

            "first" : function(c){
                return c[0] || [];
            },

            "last" : function(c){
                return c[c.length-1] || [];
            },

            "has" : function(c, ss){
                var s = Roo.DomQuery.select;
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    if(s(ss, ci).length > 0){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "next" : function(c, ss){
                var is = Roo.DomQuery.is;
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    var n = next(ci);
                    if(n && is(n, ss)){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "prev" : function(c, ss){
                var is = Roo.DomQuery.is;
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    var n = prev(ci);
                    if(n && is(n, ss)){
                        r[++ri] = ci;
                    }
                }
                return r;
            }
        }
    };
}();

/**
 * Selects an array of DOM nodes by CSS/XPath selector. Shorthand of {@link Roo.DomQuery#select}
 * @param {String} path The selector/xpath query
 * @param {Node} root (optional) The start of the query (defaults to document).
 * @return {Array}
 * @member Roo
 * @method query
 */
Roo.query = Roo.DomQuery.select;
/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

/**
 * @class Roo.util.Observable
 * Base class that provides a common interface for publishing events. Subclasses are expected to
 * to have a property "events" with all the events defined.<br>
 * For example:
 * <pre><code>
 Employee = function(name){
    this.name = name;
    this.addEvents({
        "fired" : true,
        "quit" : true
    });
 }
 Roo.extend(Employee, Roo.util.Observable);
</code></pre>
 * @param {Object} config properties to use (incuding events / listeners)
 */

Roo.util.Observable = function(cfg){
    
    cfg = cfg|| {};
    this.addEvents(cfg.events || {});
    if (cfg.events) {
        delete cfg.events; // make sure
    }
     
    Roo.apply(this, cfg);
    
    if(this.listeners){
        this.on(this.listeners);
        delete this.listeners;
    }
};
Roo.util.Observable.prototype = {
    /** 
 * @cfg {Object} listeners  list of events and functions to call for this object, 
 * For example :
 * <pre><code>
    listeners :  { 
       'click' : function(e) {
           ..... 
        } ,
        .... 
    } 
  </code></pre>
 */
    
    
    /**
     * Fires the specified event with the passed parameters (minus the event name).
     * @param {String} eventName
     * @param {Object...} args Variable number of parameters are passed to handlers
     * @return {Boolean} returns false if any of the handlers return false otherwise it returns true
     */
    fireEvent : function(){
        var ce = this.events[arguments[0].toLowerCase()];
        if(typeof ce == "object"){
            return ce.fire.apply(ce, Array.prototype.slice.call(arguments, 1));
        }else{
            return true;
        }
    },

    // private
    filterOptRe : /^(?:scope|delay|buffer|single)$/,

    /**
     * Appends an event handler to this component
     * @param {String}   eventName The type of event to listen for
     * @param {Function} handler The method the event invokes
     * @param {Object}   scope (optional) The scope in which to execute the handler
     * function. The handler function's "this" context.
     * @param {Object}   options (optional) An object containing handler configuration
     * properties. This may contain any of the following properties:<ul>
     * <li>scope {Object} The scope in which to execute the handler function. The handler function's "this" context.</li>
     * <li>delay {Number} The number of milliseconds to delay the invocation of the handler after te event fires.</li>
     * <li>single {Boolean} True to add a handler to handle just the next firing of the event, and then remove itself.</li>
     * <li>buffer {Number} Causes the handler to be scheduled to run in an {@link Roo.util.DelayedTask} delayed
     * by the specified number of milliseconds. If the event fires again within that time, the original
     * handler is <em>not</em> invoked, but the new handler is scheduled in its place.</li>
     * </ul><br>
     * <p>
     * <b>Combining Options</b><br>
     * Using the options argument, it is possible to combine different types of listeners:<br>
     * <br>
     * A normalized, delayed, one-time listener that auto stops the event and passes a custom argument (forumId)
		<pre><code>
		el.on('click', this.onClick, this, {
 			single: true,
    		delay: 100,
    		forumId: 4
		});
		</code></pre>
     * <p>
     * <b>Attaching multiple handlers in 1 call</b><br>
     * The method also allows for a single argument to be passed which is a config object containing properties
     * which specify multiple handlers.
     * <pre><code>
		el.on({
			'click': {
        		fn: this.onClick,
        		scope: this,
        		delay: 100
    		}, 
    		'mouseover': {
        		fn: this.onMouseOver,
        		scope: this
    		},
    		'mouseout': {
        		fn: this.onMouseOut,
        		scope: this
    		}
		});
		</code></pre>
     * <p>
     * Or a shorthand syntax which passes the same scope object to all handlers:
     	<pre><code>
		el.on({
			'click': this.onClick,
    		'mouseover': this.onMouseOver,
    		'mouseout': this.onMouseOut,
    		scope: this
		});
		</code></pre>
     */
    addListener : function(eventName, fn, scope, o){
        if(typeof eventName == "object"){
            o = eventName;
            for(var e in o){
                if(this.filterOptRe.test(e)){
                    continue;
                }
                if(typeof o[e] == "function"){
                    // shared options
                    this.addListener(e, o[e], o.scope,  o);
                }else{
                    // individual options
                    this.addListener(e, o[e].fn, o[e].scope, o[e]);
                }
            }
            return;
        }
        o = (!o || typeof o == "boolean") ? {} : o;
        eventName = eventName.toLowerCase();
        var ce = this.events[eventName] || true;
        if(typeof ce == "boolean"){
            ce = new Roo.util.Event(this, eventName);
            this.events[eventName] = ce;
        }
        ce.addListener(fn, scope, o);
    },

    /**
     * Removes a listener
     * @param {String}   eventName     The type of event to listen for
     * @param {Function} handler        The handler to remove
     * @param {Object}   scope  (optional) The scope (this object) for the handler
     */
    removeListener : function(eventName, fn, scope){
        var ce = this.events[eventName.toLowerCase()];
        if(typeof ce == "object"){
            ce.removeListener(fn, scope);
        }
    },

    /**
     * Removes all listeners for this object
     */
    purgeListeners : function(){
        for(var evt in this.events){
            if(typeof this.events[evt] == "object"){
                 this.events[evt].clearListeners();
            }
        }
    },

    relayEvents : function(o, events){
        var createHandler = function(ename){
            return function(){
		 
                return this.fireEvent.apply(this, Roo.combine(ename, Array.prototype.slice.call(arguments, 0)));
            };
        };
        for(var i = 0, len = events.length; i < len; i++){
            var ename = events[i];
            if(!this.events[ename]){
		this.events[ename] = true;
	    };
            o.on(ename, createHandler(ename), this);
        }
    },

    /**
     * Used to define events on this Observable
     * @param {Object} object The object with the events defined
     */
    addEvents : function(o){
        if(!this.events){
            this.events = {};
        }
        Roo.applyIf(this.events, o);
    },

    /**
     * Checks to see if this object has any listeners for a specified event
     * @param {String} eventName The name of the event to check for
     * @return {Boolean} True if the event is being listened for, else false
     */
    hasListener : function(eventName){
        var e = this.events[eventName];
        return typeof e == "object" && e.listeners.length > 0;
    }
};
/**
 * Appends an event handler to this element (shorthand for addListener)
 * @param {String}   eventName     The type of event to listen for
 * @param {Function} handler        The method the event invokes
 * @param {Object}   scope (optional) The scope in which to execute the handler
 * function. The handler function's "this" context.
 * @param {Object}   options  (optional)
 * @method
 */
Roo.util.Observable.prototype.on = Roo.util.Observable.prototype.addListener;
/**
 * Removes a listener (shorthand for removeListener)
 * @param {String}   eventName     The type of event to listen for
 * @param {Function} handler        The handler to remove
 * @param {Object}   scope  (optional) The scope (this object) for the handler
 * @method
 */
Roo.util.Observable.prototype.un = Roo.util.Observable.prototype.removeListener;

/**
 * Starts capture on the specified Observable. All events will be passed
 * to the supplied function with the event name + standard signature of the event
 * <b>before</b> the event is fired. If the supplied function returns false,
 * the event will not fire.
 * @param {Observable} o The Observable to capture
 * @param {Function} fn The function to call
 * @param {Object} scope (optional) The scope (this object) for the fn
 * @static
 */
Roo.util.Observable.capture = function(o, fn, scope){
    o.fireEvent = o.fireEvent.createInterceptor(fn, scope);
};

/**
 * Removes <b>all</b> added captures from the Observable.
 * @param {Observable} o The Observable to release
 * @static
 */
Roo.util.Observable.releaseCapture = function(o){
    o.fireEvent = Roo.util.Observable.prototype.fireEvent;
};

(function(){

    var createBuffered = function(h, o, scope){
        var task = new Roo.util.DelayedTask();
        return function(){
            task.delay(o.buffer, h, scope, Array.prototype.slice.call(arguments, 0));
        };
    };

    var createSingle = function(h, e, fn, scope){
        return function(){
            e.removeListener(fn, scope);
            return h.apply(scope, arguments);
        };
    };

    var createDelayed = function(h, o, scope){
        return function(){
            var args = Array.prototype.slice.call(arguments, 0);
            setTimeout(function(){
                h.apply(scope, args);
            }, o.delay || 10);
        };
    };

    Roo.util.Event = function(obj, name){
        this.name = name;
        this.obj = obj;
        this.listeners = [];
    };

    Roo.util.Event.prototype = {
        addListener : function(fn, scope, options){
            var o = options || {};
            scope = scope || this.obj;
            if(!this.isListening(fn, scope)){
                var l = {fn: fn, scope: scope, options: o};
                var h = fn;
                if(o.delay){
                    h = createDelayed(h, o, scope);
                }
                if(o.single){
                    h = createSingle(h, this, fn, scope);
                }
                if(o.buffer){
                    h = createBuffered(h, o, scope);
                }
                l.fireFn = h;
                if(!this.firing){ // if we are currently firing this event, don't disturb the listener loop
                    this.listeners.push(l);
                }else{
                    this.listeners = this.listeners.slice(0);
                    this.listeners.push(l);
                }
            }
        },

        findListener : function(fn, scope){
            scope = scope || this.obj;
            var ls = this.listeners;
            for(var i = 0, len = ls.length; i < len; i++){
                var l = ls[i];
                if(l.fn == fn && l.scope == scope){
                    return i;
                }
            }
            return -1;
        },

        isListening : function(fn, scope){
            return this.findListener(fn, scope) != -1;
        },

        removeListener : function(fn, scope){
            var index;
            if((index = this.findListener(fn, scope)) != -1){
                if(!this.firing){
                    this.listeners.splice(index, 1);
                }else{
                    this.listeners = this.listeners.slice(0);
                    this.listeners.splice(index, 1);
                }
                return true;
            }
            return false;
        },

        clearListeners : function(){
            this.listeners = [];
        },

        fire : function(){
            var ls = this.listeners, scope, len = ls.length;
            if(len > 0){
                this.firing = true;
		var args = Array.prototype.slice.call(arguments, 0);                
                for(var i = 0; i < len; i++){
		    var l = ls[i];
                    if(l.fireFn.apply(l.scope||this.obj||window, args) === false){
                        this.firing = false;
                        return false;
                    }
                }
                this.firing = false;
            }
            return true;
        }
    };
})();/*
 * RooJS Library 
 * Copyright(c) 2007-2017, Roo J Solutions Ltd
 *
 * Licence LGPL 
 *
 */
 
/**
 * @class Roo.Document
 * @extends Roo.util.Observable
 * This is a convience class to wrap up the main document loading code.. , rather than adding Roo.onReady(......)
 * 
 * @param {Object} config the methods and properties of the 'base' class for the application.
 * 
 *  Generic Page handler - implement this to start your app..
 * 
 * eg.
 *  MyProject = new Roo.Document({
        events : {
            'load' : true // your events..
        },
        listeners : {
            'ready' : function() {
                // fired on Roo.onReady()
            }
        }
 * 
 */
Roo.Document = function(cfg) {
     
    this.addEvents({ 
        'ready' : true
    });
    Roo.util.Observable.call(this,cfg);
    
    var _this = this;
    
    Roo.onReady(function() {
        _this.fireEvent('ready');
    },null,false);
    
    
}

Roo.extend(Roo.Document, Roo.util.Observable, {});/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

/**
 * @class Roo.EventManager
 * Registers event handlers that want to receive a normalized EventObject instead of the standard browser event and provides 
 * several useful events directly.
 * See {@link Roo.EventObject} for more details on normalized event objects.
 * @static
 */
Roo.EventManager = function(){
    var docReadyEvent, docReadyProcId, docReadyState = false;
    var resizeEvent, resizeTask, textEvent, textSize;
    var E = Roo.lib.Event;
    var D = Roo.lib.Dom;

    
    

    var fireDocReady = function(){
        if(!docReadyState){
            docReadyState = true;
            Roo.isReady = true;
            if(docReadyProcId){
                clearInterval(docReadyProcId);
            }
            if(Roo.isGecko || Roo.isOpera) {
                document.removeEventListener("DOMContentLoaded", fireDocReady, false);
            }
            if(Roo.isIE){
                var defer = document.getElementById("ie-deferred-loader");
                if(defer){
                    defer.onreadystatechange = null;
                    defer.parentNode.removeChild(defer);
                }
            }
            if(docReadyEvent){
                docReadyEvent.fire();
                docReadyEvent.clearListeners();
            }
        }
    };
    
    var initDocReady = function(){
        docReadyEvent = new Roo.util.Event();
        if(Roo.isGecko || Roo.isOpera) {
            document.addEventListener("DOMContentLoaded", fireDocReady, false);
        }else if(Roo.isIE){
            document.write("<s"+'cript id="ie-deferred-loader" defer="defer" src="/'+'/:"></s'+"cript>");
            var defer = document.getElementById("ie-deferred-loader");
            defer.onreadystatechange = function(){
                if(this.readyState == "complete"){
                    fireDocReady();
                }
            };
        }else if(Roo.isSafari){ 
            docReadyProcId = setInterval(function(){
                var rs = document.readyState;
                if(rs == "complete") {
                    fireDocReady();     
                 }
            }, 10);
        }
        // no matter what, make sure it fires on load
        E.on(window, "load", fireDocReady);
    };

    var createBuffered = function(h, o){
        var task = new Roo.util.DelayedTask(h);
        return function(e){
            // create new event object impl so new events don't wipe out properties
            e = new Roo.EventObjectImpl(e);
            task.delay(o.buffer, h, null, [e]);
        };
    };

    var createSingle = function(h, el, ename, fn){
        return function(e){
            Roo.EventManager.removeListener(el, ename, fn);
            h(e);
        };
    };

    var createDelayed = function(h, o){
        return function(e){
            // create new event object impl so new events don't wipe out properties
            e = new Roo.EventObjectImpl(e);
            setTimeout(function(){
                h(e);
            }, o.delay || 10);
        };
    };
    var transitionEndVal = false;
    
    var transitionEnd = function()
    {
        if (transitionEndVal) {
            return transitionEndVal;
        }
        var el = document.createElement('div');

        var transEndEventNames = {
            WebkitTransition : 'webkitTransitionEnd',
            MozTransition    : 'transitionend',
            OTransition      : 'oTransitionEnd otransitionend',
            transition       : 'transitionend'
        };
    
        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                transitionEndVal = transEndEventNames[name];
                return  transitionEndVal ;
            }
        }
    }
    
  

    var listen = function(element, ename, opt, fn, scope)
    {
        var o = (!opt || typeof opt == "boolean") ? {} : opt;
        fn = fn || o.fn; scope = scope || o.scope;
        var el = Roo.getDom(element);
        
        
        if(!el){
            throw "Error listening for \"" + ename + '\". Element "' + element + '" doesn\'t exist.';
        }
        
        if (ename == 'transitionend') {
            ename = transitionEnd();
        }
        var h = function(e){
            e = Roo.EventObject.setEvent(e);
            var t;
            if(o.delegate){
                t = e.getTarget(o.delegate, el);
                if(!t){
                    return;
                }
            }else{
                t = e.target;
            }
            if(o.stopEvent === true){
                e.stopEvent();
            }
            if(o.preventDefault === true){
               e.preventDefault();
            }
            if(o.stopPropagation === true){
                e.stopPropagation();
            }

            if(o.normalized === false){
                e = e.browserEvent;
            }

            fn.call(scope || el, e, t, o);
        };
        if(o.delay){
            h = createDelayed(h, o);
        }
        if(o.single){
            h = createSingle(h, el, ename, fn);
        }
        if(o.buffer){
            h = createBuffered(h, o);
        }
        
        fn._handlers = fn._handlers || [];
        
        
        fn._handlers.push([Roo.id(el), ename, h]);
        
        
         
        E.on(el, ename, h); // this adds the actuall listener to the object..
        
        
        if(ename == "mousewheel" && el.addEventListener){ // workaround for jQuery
            el.addEventListener("DOMMouseScroll", h, false);
            E.on(window, 'unload', function(){
                el.removeEventListener("DOMMouseScroll", h, false);
            });
        }
        if(ename == "mousedown" && el == document){ // fix stopped mousedowns on the document
            Roo.EventManager.stoppedMouseDownEvent.addListener(h);
        }
        return h;
    };

    var stopListening = function(el, ename, fn){
        var id = Roo.id(el), hds = fn._handlers, hd = fn;
        if(hds){
            for(var i = 0, len = hds.length; i < len; i++){
                var h = hds[i];
                if(h[0] == id && h[1] == ename){
                    hd = h[2];
                    hds.splice(i, 1);
                    break;
                }
            }
        }
        E.un(el, ename, hd);
        el = Roo.getDom(el);
        if(ename == "mousewheel" && el.addEventListener){
            el.removeEventListener("DOMMouseScroll", hd, false);
        }
        if(ename == "mousedown" && el == document){ // fix stopped mousedowns on the document
            Roo.EventManager.stoppedMouseDownEvent.removeListener(hd);
        }
    };

    var propRe = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;
    
    var pub = {
        
        
        /** 
         * Fix for doc tools
         * @scope Roo.EventManager
         */
        
        
        /** 
         * This is no longer needed and is deprecated. Places a simple wrapper around an event handler to override the browser event
         * object with a Roo.EventObject
         * @param {Function} fn        The method the event invokes
         * @param {Object}   scope    An object that becomes the scope of the handler
         * @param {boolean}  override If true, the obj passed in becomes
         *                             the execution scope of the listener
         * @return {Function} The wrapped function
         * @deprecated
         */
        wrap : function(fn, scope, override){
            return function(e){
                Roo.EventObject.setEvent(e);
                fn.call(override ? scope || window : window, Roo.EventObject, scope);
            };
        },
        
        /**
     * Appends an event handler to an element (shorthand for addListener)
     * @param {String/HTMLElement}   element        The html element or id to assign the
     * @param {String}   eventName The type of event to listen for
     * @param {Function} handler The method the event invokes
     * @param {Object}   scope (optional) The scope in which to execute the handler
     * function. The handler function's "this" context.
     * @param {Object}   options (optional) An object containing handler configuration
     * properties. This may contain any of the following properties:<ul>
     * <li>scope {Object} The scope in which to execute the handler function. The handler function's "this" context.</li>
     * <li>delegate {String} A simple selector to filter the target or look for a descendant of the target</li>
     * <li>stopEvent {Boolean} True to stop the event. That is stop propagation, and prevent the default action.</li>
     * <li>preventDefault {Boolean} True to prevent the default action</li>
     * <li>stopPropagation {Boolean} True to prevent event propagation</li>
     * <li>normalized {Boolean} False to pass a browser event to the handler function instead of an Roo.EventObject</li>
     * <li>delay {Number} The number of milliseconds to delay the invocation of the handler after te event fires.</li>
     * <li>single {Boolean} True to add a handler to handle just the next firing of the event, and then remove itself.</li>
     * <li>buffer {Number} Causes the handler to be scheduled to run in an {@link Roo.util.DelayedTask} delayed
     * by the specified number of milliseconds. If the event fires again within that time, the original
     * handler is <em>not</em> invoked, but the new handler is scheduled in its place.</li>
     * </ul><br>
     * <p>
     * <b>Combining Options</b><br>
     * Using the options argument, it is possible to combine different types of listeners:<br>
     * <br>
     * A normalized, delayed, one-time listener that auto stops the event and passes a custom argument (forumId)<div style="margin: 5px 20px 20px;">
     * Code:<pre><code>
el.on('click', this.onClick, this, {
    single: true,
    delay: 100,
    stopEvent : true,
    forumId: 4
});</code></pre>
     * <p>
     * <b>Attaching multiple handlers in 1 call</b><br>
      * The method also allows for a single argument to be passed which is a config object containing properties
     * which specify multiple handlers.
     * <p>
     * Code:<pre><code>
el.on({
    'click' : {
        fn: this.onClick
        scope: this,
        delay: 100
    },
    'mouseover' : {
        fn: this.onMouseOver
        scope: this
    },
    'mouseout' : {
        fn: this.onMouseOut
        scope: this
    }
});</code></pre>
     * <p>
     * Or a shorthand syntax:<br>
     * Code:<pre><code>
el.on({
    'click' : this.onClick,
    'mouseover' : this.onMouseOver,
    'mouseout' : this.onMouseOut
    scope: this
});</code></pre>
     */
        addListener : function(element, eventName, fn, scope, options){
            if(typeof eventName == "object"){
                var o = eventName;
                for(var e in o){
                    if(propRe.test(e)){
                        continue;
                    }
                    if(typeof o[e] == "function"){
                        // shared options
                        listen(element, e, o, o[e], o.scope);
                    }else{
                        // individual options
                        listen(element, e, o[e]);
                    }
                }
                return;
            }
            return listen(element, eventName, options, fn, scope);
        },
        
        /**
         * Removes an event handler
         *
         * @param {String/HTMLElement}   element        The id or html element to remove the 
         *                             event from
         * @param {String}   eventName     The type of event
         * @param {Function} fn
         * @return {Boolean} True if a listener was actually removed
         */
        removeListener : function(element, eventName, fn){
            return stopListening(element, eventName, fn);
        },
        
        /**
         * Fires when the document is ready (before onload and before images are loaded). Can be 
         * accessed shorthanded Roo.onReady().
         * @param {Function} fn        The method the event invokes
         * @param {Object}   scope    An  object that becomes the scope of the handler
         * @param {boolean}  options
         */
        onDocumentReady : function(fn, scope, options){
            if(docReadyState){ // if it already fired
                docReadyEvent.addListener(fn, scope, options);
                docReadyEvent.fire();
                docReadyEvent.clearListeners();
                return;
            }
            if(!docReadyEvent){
                initDocReady();
            }
            docReadyEvent.addListener(fn, scope, options);
        },
        
        /**
         * Fires when the window is resized and provides resize event buffering (50 milliseconds), passes new viewport width and height to handlers.
         * @param {Function} fn        The method the event invokes
         * @param {Object}   scope    An object that becomes the scope of the handler
         * @param {boolean}  options
         */
        onWindowResize : function(fn, scope, options)
        {
            if(!resizeEvent){
                resizeEvent = new Roo.util.Event();
                resizeTask = new Roo.util.DelayedTask(function(){
                    resizeEvent.fire(D.getViewWidth(), D.getViewHeight());
                });
                E.on(window, "resize", function()
                {
                    if (Roo.isIE) {
                        resizeTask.delay(50);
                    } else {
                        resizeEvent.fire(D.getViewWidth(), D.getViewHeight());
                    }
                });
            }
            resizeEvent.addListener(fn, scope, options);
        },

        /**
         * Fires when the user changes the active text size. Handler gets called with 2 params, the old size and the new size.
         * @param {Function} fn        The method the event invokes
         * @param {Object}   scope    An object that becomes the scope of the handler
         * @param {boolean}  options
         */
        onTextResize : function(fn, scope, options){
            if(!textEvent){
                textEvent = new Roo.util.Event();
                var textEl = new Roo.Element(document.createElement('div'));
                textEl.dom.className = 'x-text-resize';
                textEl.dom.innerHTML = 'X';
                textEl.appendTo(document.body);
                textSize = textEl.dom.offsetHeight;
                setInterval(function(){
                    if(textEl.dom.offsetHeight != textSize){
                        textEvent.fire(textSize, textSize = textEl.dom.offsetHeight);
                    }
                }, this.textResizeInterval);
            }
            textEvent.addListener(fn, scope, options);
        },

        /**
         * Removes the passed window resize listener.
         * @param {Function} fn        The method the event invokes
         * @param {Object}   scope    The scope of handler
         */
        removeResizeListener : function(fn, scope){
            if(resizeEvent){
                resizeEvent.removeListener(fn, scope);
            }
        },

        // private
        fireResize : function(){
            if(resizeEvent){
                resizeEvent.fire(D.getViewWidth(), D.getViewHeight());
            }   
        },
        /**
         * Url used for onDocumentReady with using SSL (defaults to Roo.SSL_SECURE_URL)
         */
        ieDeferSrc : false,
        /**
         * The frequency, in milliseconds, to check for text resize events (defaults to 50)
         */
        textResizeInterval : 50
    };
    
    /**
     * Fix for doc tools
     * @scopeAlias pub=Roo.EventManager
     */
    
     /**
     * Appends an event handler to an element (shorthand for addListener)
     * @param {String/HTMLElement}   element        The html element or id to assign the
     * @param {String}   eventName The type of event to listen for
     * @param {Function} handler The method the event invokes
     * @param {Object}   scope (optional) The scope in which to execute the handler
     * function. The handler function's "this" context.
     * @param {Object}   options (optional) An object containing handler configuration
     * properties. This may contain any of the following properties:<ul>
     * <li>scope {Object} The scope in which to execute the handler function. The handler function's "this" context.</li>
     * <li>delegate {String} A simple selector to filter the target or look for a descendant of the target</li>
     * <li>stopEvent {Boolean} True to stop the event. That is stop propagation, and prevent the default action.</li>
     * <li>preventDefault {Boolean} True to prevent the default action</li>
     * <li>stopPropagation {Boolean} True to prevent event propagation</li>
     * <li>normalized {Boolean} False to pass a browser event to the handler function instead of an Roo.EventObject</li>
     * <li>delay {Number} The number of milliseconds to delay the invocation of the handler after te event fires.</li>
     * <li>single {Boolean} True to add a handler to handle just the next firing of the event, and then remove itself.</li>
     * <li>buffer {Number} Causes the handler to be scheduled to run in an {@link Roo.util.DelayedTask} delayed
     * by the specified number of milliseconds. If the event fires again within that time, the original
     * handler is <em>not</em> invoked, but the new handler is scheduled in its place.</li>
     * </ul><br>
     * <p>
     * <b>Combining Options</b><br>
     * Using the options argument, it is possible to combine different types of listeners:<br>
     * <br>
     * A normalized, delayed, one-time listener that auto stops the event and passes a custom argument (forumId)<div style="margin: 5px 20px 20px;">
     * Code:<pre><code>
el.on('click', this.onClick, this, {
    single: true,
    delay: 100,
    stopEvent : true,
    forumId: 4
});</code></pre>
     * <p>
     * <b>Attaching multiple handlers in 1 call</b><br>
      * The method also allows for a single argument to be passed which is a config object containing properties
     * which specify multiple handlers.
     * <p>
     * Code:<pre><code>
el.on({
    'click' : {
        fn: this.onClick
        scope: this,
        delay: 100
    },
    'mouseover' : {
        fn: this.onMouseOver
        scope: this
    },
    'mouseout' : {
        fn: this.onMouseOut
        scope: this
    }
});</code></pre>
     * <p>
     * Or a shorthand syntax:<br>
     * Code:<pre><code>
el.on({
    'click' : this.onClick,
    'mouseover' : this.onMouseOver,
    'mouseout' : this.onMouseOut
    scope: this
});</code></pre>
     */
    pub.on = pub.addListener;
    pub.un = pub.removeListener;

    pub.stoppedMouseDownEvent = new Roo.util.Event();
    return pub;
}();
/**
  * Fires when the document is ready (before onload and before images are loaded).  Shorthand of {@link Roo.EventManager#onDocumentReady}.
  * @param {Function} fn        The method the event invokes
  * @param {Object}   scope    An  object that becomes the scope of the handler
  * @param {boolean}  override If true, the obj passed in becomes
  *                             the execution scope of the listener
  * @member Roo
  * @method onReady
 */
Roo.onReady = Roo.EventManager.onDocumentReady;

Roo.onReady(function(){
    var bd = Roo.get(document.body);
    if(!bd){ return; }

    var cls = [
            Roo.isIE ? "roo-ie"
            : Roo.isIE11 ? "roo-ie11"
            : Roo.isEdge ? "roo-edge"
            : Roo.isGecko ? "roo-gecko"
            : Roo.isOpera ? "roo-opera"
            : Roo.isSafari ? "roo-safari" : ""];

    if(Roo.isMac){
        cls.push("roo-mac");
    }
    if(Roo.isLinux){
        cls.push("roo-linux");
    }
    if(Roo.isIOS){
        cls.push("roo-ios");
    }
    if(Roo.isTouch){
        cls.push("roo-touch");
    }
    if(Roo.isBorderBox){
        cls.push('roo-border-box');
    }
    if(Roo.isStrict){ // add to the parent to allow for selectors like ".ext-strict .ext-ie"
        var p = bd.dom.parentNode;
        if(p){
            p.className += ' roo-strict';
        }
    }
    bd.addClass(cls.join(' '));
});

/**
 * @class Roo.EventObject
 * EventObject exposes the Yahoo! UI Event functionality directly on the object
 * passed to your event handler. It exists mostly for convenience. It also fixes the annoying null checks automatically to cleanup your code 
 * Example:
 * <pre><code>
 function handleClick(e){ // e is not a standard event object, it is a Roo.EventObject
    e.preventDefault();
    var target = e.getTarget();
    ...
 }
 var myDiv = Roo.get("myDiv");
 myDiv.on("click", handleClick);
 //or
 Roo.EventManager.on("myDiv", 'click', handleClick);
 Roo.EventManager.addListener("myDiv", 'click', handleClick);
 </code></pre>
 * @static
 */
Roo.EventObject = function(){
    
    var E = Roo.lib.Event;
    
    // safari keypress events for special keys return bad keycodes
    var safariKeys = {
        63234 : 37, // left
        63235 : 39, // right
        63232 : 38, // up
        63233 : 40, // down
        63276 : 33, // page up
        63277 : 34, // page down
        63272 : 46, // delete
        63273 : 36, // home
        63275 : 35  // end
    };

    // normalize button clicks
    var btnMap = Roo.isIE ? {1:0,4:1,2:2} :
                (Roo.isSafari ? {1:0,2:1,3:2} : {0:0,1:1,2:2});

    Roo.EventObjectImpl = function(e){
        if(e){
            this.setEvent(e.browserEvent || e);
        }
    };
    Roo.EventObjectImpl.prototype = {
        /**
         * Used to fix doc tools.
         * @scope Roo.EventObject.prototype
         */
            

        
        
        /** The normal browser event */
        browserEvent : null,
        /** The button pressed in a mouse event */
        button : -1,
        /** True if the shift key was down during the event */
        shiftKey : false,
        /** True if the control key was down during the event */
        ctrlKey : false,
        /** True if the alt key was down during the event */
        altKey : false,

        /** Key constant 
        * @type Number */
        BACKSPACE : 8,
        /** Key constant 
        * @type Number */
        TAB : 9,
        /** Key constant 
        * @type Number */
        RETURN : 13,
        /** Key constant 
        * @type Number */
        ENTER : 13,
        /** Key constant 
        * @type Number */
        SHIFT : 16,
        /** Key constant 
        * @type Number */
        CONTROL : 17,
        /** Key constant 
        * @type Number */
        ESC : 27,
        /** Key constant 
        * @type Number */
        SPACE : 32,
        /** Key constant 
        * @type Number */
        PAGEUP : 33,
        /** Key constant 
        * @type Number */
        PAGEDOWN : 34,
        /** Key constant 
        * @type Number */
        END : 35,
        /** Key constant 
        * @type Number */
        HOME : 36,
        /** Key constant 
        * @type Number */
        LEFT : 37,
        /** Key constant 
        * @type Number */
        UP : 38,
        /** Key constant 
        * @type Number */
        RIGHT : 39,
        /** Key constant 
        * @type Number */
        DOWN : 40,
        /** Key constant 
        * @type Number */
        DELETE : 46,
        /** Key constant 
        * @type Number */
        F5 : 116,

           /** @private */
        setEvent : function(e){
            if(e == this || (e && e.browserEvent)){ // already wrapped
                return e;
            }
            this.browserEvent = e;
            if(e){
                // normalize buttons
                this.button = e.button ? btnMap[e.button] : (e.which ? e.which-1 : -1);
                if(e.type == 'click' && this.button == -1){
                    this.button = 0;
                }
                this.type = e.type;
                this.shiftKey = e.shiftKey;
                // mac metaKey behaves like ctrlKey
                this.ctrlKey = e.ctrlKey || e.metaKey;
                this.altKey = e.altKey;
                // in getKey these will be normalized for the mac
                this.keyCode = e.keyCode;
                // keyup warnings on firefox.
                this.charCode = (e.type == 'keyup' || e.type == 'keydown') ? 0 : e.charCode;
                // cache the target for the delayed and or buffered events
                this.target = E.getTarget(e);
                // same for XY
                this.xy = E.getXY(e);
            }else{
                this.button = -1;
                this.shiftKey = false;
                this.ctrlKey = false;
                this.altKey = false;
                this.keyCode = 0;
                this.charCode =0;
                this.target = null;
                this.xy = [0, 0];
            }
            return this;
        },

        /**
         * Stop the event (preventDefault and stopPropagation)
         */
        stopEvent : function(){
            if(this.browserEvent){
                if(this.browserEvent.type == 'mousedown'){
                    Roo.EventManager.stoppedMouseDownEvent.fire(this);
                }
                E.stopEvent(this.browserEvent);
            }
        },

        /**
         * Prevents the browsers default handling of the event.
         */
        preventDefault : function(){
            if(this.browserEvent){
                E.preventDefault(this.browserEvent);
            }
        },

        /** @private */
        isNavKeyPress : function(){
            var k = this.keyCode;
            k = Roo.isSafari ? (safariKeys[k] || k) : k;
            return (k >= 33 && k <= 40) || k == this.RETURN || k == this.TAB || k == this.ESC;
        },

        isSpecialKey : function(){
            var k = this.keyCode;
            return (this.type == 'keypress' && this.ctrlKey) || k == 9 || k == 13  || k == 40 || k == 27 ||
            (k == 16) || (k == 17) ||
            (k >= 18 && k <= 20) ||
            (k >= 33 && k <= 35) ||
            (k >= 36 && k <= 39) ||
            (k >= 44 && k <= 45);
        },
        /**
         * Cancels bubbling of the event.
         */
        stopPropagation : function(){
            if(this.browserEvent){
                if(this.type == 'mousedown'){
                    Roo.EventManager.stoppedMouseDownEvent.fire(this);
                }
                E.stopPropagation(this.browserEvent);
            }
        },

        /**
         * Gets the key code for the event.
         * @return {Number}
         */
        getCharCode : function(){
            return this.charCode || this.keyCode;
        },

        /**
         * Returns a normalized keyCode for the event.
         * @return {Number} The key code
         */
        getKey : function(){
            var k = this.keyCode || this.charCode;
            return Roo.isSafari ? (safariKeys[k] || k) : k;
        },

        /**
         * Gets the x coordinate of the event.
         * @return {Number}
         */
        getPageX : function(){
            return this.xy[0];
        },

        /**
         * Gets the y coordinate of the event.
         * @return {Number}
         */
        getPageY : function(){
            return this.xy[1];
        },

        /**
         * Gets the time of the event.
         * @return {Number}
         */
        getTime : function(){
            if(this.browserEvent){
                return E.getTime(this.browserEvent);
            }
            return null;
        },

        /**
         * Gets the page coordinates of the event.
         * @return {Array} The xy values like [x, y]
         */
        getXY : function(){
            return this.xy;
        },

        /**
         * Gets the target for the event.
         * @param {String} selector (optional) A simple selector to filter the target or look for an ancestor of the target
         * @param {Number/String/HTMLElement/Element} maxDepth (optional) The max depth to
                search as a number or element (defaults to 10 || document.body)
         * @param {Boolean} returnEl (optional) True to return a Roo.Element object instead of DOM node
         * @return {HTMLelement}
         */
        getTarget : function(selector, maxDepth, returnEl){
            return selector ? Roo.fly(this.target).findParent(selector, maxDepth, returnEl) : this.target;
        },
        /**
         * Gets the related target.
         * @return {HTMLElement}
         */
        getRelatedTarget : function(){
            if(this.browserEvent){
                return E.getRelatedTarget(this.browserEvent);
            }
            return null;
        },

        /**
         * Normalizes mouse wheel delta across browsers
         * @return {Number} The delta
         */
        getWheelDelta : function(){
            var e = this.browserEvent;
            var delta = 0;
            if(e.wheelDelta){ /* IE/Opera. */
                delta = e.wheelDelta/120;
            }else if(e.detail){ /* Mozilla case. */
                delta = -e.detail/3;
            }
            return delta;
        },

        /**
         * Returns true if the control, meta, shift or alt key was pressed during this event.
         * @return {Boolean}
         */
        hasModifier : function(){
            return !!((this.ctrlKey || this.altKey) || this.shiftKey);
        },

        /**
         * Returns true if the target of this event equals el or is a child of el
         * @param {String/HTMLElement/Element} el
         * @param {Boolean} related (optional) true to test if the related target is within el instead of the target
         * @return {Boolean}
         */
        within : function(el, related){
            var t = this[related ? "getRelatedTarget" : "getTarget"]();
            return t && Roo.fly(el).contains(t);
        },

        getPoint : function(){
            return new Roo.lib.Point(this.xy[0], this.xy[1]);
        }
    };

    return new Roo.EventObjectImpl();
}();
            
    /*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

 
// was in Composite Element!??!?!
 
(function(){
    var D = Roo.lib.Dom;
    var E = Roo.lib.Event;
    var A = Roo.lib.Anim;

    // local style camelizing for speed
    var propCache = {};
    var camelRe = /(-[a-z])/gi;
    var camelFn = function(m, a){ return a.charAt(1).toUpperCase(); };
    var view = document.defaultView;

/**
 * @class Roo.Element
 * Represents an Element in the DOM.<br><br>
 * Usage:<br>
<pre><code>
var el = Roo.get("my-div");

// or with getEl
var el = getEl("my-div");

// or with a DOM element
var el = Roo.get(myDivElement);
</code></pre>
 * Using Roo.get() or getEl() instead of calling the constructor directly ensures you get the same object
 * each call instead of constructing a new one.<br><br>
 * <b>Animations</b><br />
 * Many of the functions for manipulating an element have an optional "animate" parameter. The animate parameter
 * should either be a boolean (true) or an object literal with animation options. The animation options are:
<pre>
Option    Default   Description
--------- --------  ---------------------------------------------
duration  .35       The duration of the animation in seconds
easing    easeOut   The YUI easing method
callback  none      A function to execute when the anim completes
scope     this      The scope (this) of the callback function
</pre>
* Also, the Anim object being used for the animation will be set on your options object as "anim", which allows you to stop or
* manipulate the animation. Here's an example:
<pre><code>
var el = Roo.get("my-div");

// no animation
el.setWidth(100);

// default animation
el.setWidth(100, true);

// animation with some options set
el.setWidth(100, {
    duration: 1,
    callback: this.foo,
    scope: this
});

// using the "anim" property to get the Anim object
var opt = {
    duration: 1,
    callback: this.foo,
    scope: this
};
el.setWidth(100, opt);
...
if(opt.anim.isAnimated()){
    opt.anim.stop();
}
</code></pre>
* <b> Composite (Collections of) Elements</b><br />
 * For working with collections of Elements, see <a href="Roo.CompositeElement.html">Roo.CompositeElement</a>
 * @constructor Create a new Element directly.
 * @param {String/HTMLElement} element
 * @param {Boolean} forceNew (optional) By default the constructor checks to see if there is already an instance of this element in the cache and if there is it returns the same instance. This will skip that check (useful for extending this class).
 */
    Roo.Element = function(element, forceNew)
    {
        var dom = typeof element == "string" ?
                document.getElementById(element) : element;
        
        this.listeners = {};
        
        if(!dom){ // invalid id/element
            return null;
        }
        var id = dom.id;
        if(forceNew !== true && id && Roo.Element.cache[id]){ // element object already exists
            return Roo.Element.cache[id];
        }

        /**
         * The DOM element
         * @type HTMLElement
         */
        this.dom = dom;

        /**
         * The DOM element ID
         * @type String
         */
        this.id = id || Roo.id(dom);
        
        return this; // assumed for cctor?
    };

    var El = Roo.Element;

    El.prototype = {
        /**
         * The element's default display mode  (defaults to "") 
         * @type String
         */
        originalDisplay : "",

        
        // note this is overridden in BS version..
        visibilityMode : 1, 
        /**
         * The default unit to append to CSS values where a unit isn't provided (defaults to px).
         * @type String
         */
        defaultUnit : "px",
        
        /**
         * Sets the element's visibility mode. When setVisible() is called it
         * will use this to determine whether to set the visibility or the display property.
         * @param visMode Element.VISIBILITY or Element.DISPLAY
         * @return {Roo.Element} this
         */
        setVisibilityMode : function(visMode){
            this.visibilityMode = visMode;
            return this;
        },
        /**
         * Convenience method for setVisibilityMode(Element.DISPLAY)
         * @param {String} display (optional) What to set display to when visible
         * @return {Roo.Element} this
         */
        enableDisplayMode : function(display){
            this.setVisibilityMode(El.DISPLAY);
            if(typeof display != "undefined") { this.originalDisplay = display; }
            return this;
        },

        /**
         * Looks at this node and then at parent nodes for a match of the passed simple selector (e.g. div.some-class or span:first-child)
         * @param {String} selector The simple selector to test
         * @param {Number/String/HTMLElement/Element} maxDepth (optional) The max depth to
                search as a number or element (defaults to 10 || document.body)
         * @param {Boolean} returnEl (optional) True to return a Roo.Element object instead of DOM node
         * @return {HTMLElement} The matching DOM node (or null if no match was found)
         */
        findParent : function(simpleSelector, maxDepth, returnEl){
            var p = this.dom, b = document.body, depth = 0, dq = Roo.DomQuery, stopEl;
            maxDepth = maxDepth || 50;
            if(typeof maxDepth != "number"){
                stopEl = Roo.getDom(maxDepth);
                maxDepth = 10;
            }
            while(p && p.nodeType == 1 && depth < maxDepth && p != b && p != stopEl){
                if(dq.is(p, simpleSelector)){
                    return returnEl ? Roo.get(p) : p;
                }
                depth++;
                p = p.parentNode;
            }
            return null;
        },


        /**
         * Looks at parent nodes for a match of the passed simple selector (e.g. div.some-class or span:first-child)
         * @param {String} selector The simple selector to test
         * @param {Number/String/HTMLElement/Element} maxDepth (optional) The max depth to
                search as a number or element (defaults to 10 || document.body)
         * @param {Boolean} returnEl (optional) True to return a Roo.Element object instead of DOM node
         * @return {HTMLElement} The matching DOM node (or null if no match was found)
         */
        findParentNode : function(simpleSelector, maxDepth, returnEl){
            var p = Roo.fly(this.dom.parentNode, '_internal');
            return p ? p.findParent(simpleSelector, maxDepth, returnEl) : null;
        },
        
        /**
         * Looks at  the scrollable parent element
         */
        findScrollableParent : function()
        {
            var overflowRegex = /(auto|scroll)/;
            
            if(this.getStyle('position') === 'fixed'){
                return Roo.isAndroid ? Roo.get(document.documentElement) : Roo.get(document.body);
            }
            
            var excludeStaticParent = this.getStyle('position') === "absolute";
            
            for (var parent = this; (parent = Roo.get(parent.dom.parentNode));){
                
                if (excludeStaticParent && parent.getStyle('position') === "static") {
                    continue;
                }
                
                if (overflowRegex.test(parent.getStyle('overflow') + parent.getStyle('overflow-x') + parent.getStyle('overflow-y'))){
                    return parent;
                }
                
                if(parent.dom.nodeName.toLowerCase() == 'body'){
                    return Roo.isAndroid ? Roo.get(document.documentElement) : Roo.get(document.body);
                }
            }
            
            return Roo.isAndroid ? Roo.get(document.documentElement) : Roo.get(document.body);
        },

        /**
         * Walks up the dom looking for a parent node that matches the passed simple selector (e.g. div.some-class or span:first-child).
         * This is a shortcut for findParentNode() that always returns an Roo.Element.
         * @param {String} selector The simple selector to test
         * @param {Number/String/HTMLElement/Element} maxDepth (optional) The max depth to
                search as a number or element (defaults to 10 || document.body)
         * @return {Roo.Element} The matching DOM node (or null if no match was found)
         */
        up : function(simpleSelector, maxDepth){
            return this.findParentNode(simpleSelector, maxDepth, true);
        },



        /**
         * Returns true if this element matches the passed simple selector (e.g. div.some-class or span:first-child)
         * @param {String} selector The simple selector to test
         * @return {Boolean} True if this element matches the selector, else false
         */
        is : function(simpleSelector){
            return Roo.DomQuery.is(this.dom, simpleSelector);
        },

        /**
         * Perform animation on this element.
         * @param {Object} args The YUI animation control args
         * @param {Float} duration (optional) How long the animation lasts in seconds (defaults to .35)
         * @param {Function} onComplete (optional) Function to call when animation completes
         * @param {String} easing (optional) Easing method to use (defaults to 'easeOut')
         * @param {String} animType (optional) 'run' is the default. Can also be 'color', 'motion', or 'scroll'
         * @return {Roo.Element} this
         */
        animate : function(args, duration, onComplete, easing, animType){
            this.anim(args, {duration: duration, callback: onComplete, easing: easing}, animType);
            return this;
        },

        /*
         * @private Internal animation call
         */
        anim : function(args, opt, animType, defaultDur, defaultEase, cb){
            animType = animType || 'run';
            opt = opt || {};
            var anim = Roo.lib.Anim[animType](
                this.dom, args,
                (opt.duration || defaultDur) || .35,
                (opt.easing || defaultEase) || 'easeOut',
                function(){
                    Roo.callback(cb, this);
                    Roo.callback(opt.callback, opt.scope || this, [this, opt]);
                },
                this
            );
            opt.anim = anim;
            return anim;
        },

        // private legacy anim prep
        preanim : function(a, i){
            return !a[i] ? false : (typeof a[i] == "object" ? a[i]: {duration: a[i+1], callback: a[i+2], easing: a[i+3]});
        },

        /**
         * Removes worthless text nodes
         * @param {Boolean} forceReclean (optional) By default the element
         * keeps track if it has been cleaned already so
         * you can call this over and over. However, if you update the element and
         * need to force a reclean, you can pass true.
         */
        clean : function(forceReclean){
            if(this.isCleaned && forceReclean !== true){
                return this;
            }
            var ns = /\S/;
            var d = this.dom, n = d.firstChild, ni = -1;
            while(n){
                var nx = n.nextSibling;
                if(n.nodeType == 3 && !ns.test(n.nodeValue)){
                    d.removeChild(n);
                }else{
                    n.nodeIndex = ++ni;
                }
                n = nx;
            }
            this.isCleaned = true;
            return this;
        },

        // private
        calcOffsetsTo : function(el){
            el = Roo.get(el);
            var d = el.dom;
            var restorePos = false;
            if(el.getStyle('position') == 'static'){
                el.position('relative');
                restorePos = true;
            }
            var x = 0, y =0;
            var op = this.dom;
            while(op && op != d && op.tagName != 'HTML'){
                x+= op.offsetLeft;
                y+= op.offsetTop;
                op = op.offsetParent;
            }
            if(restorePos){
                el.position('static');
            }
            return [x, y];
        },

        /**
         * Scrolls this element into view within the passed container.
         * @param {String/HTMLElement/Element} container (optional) The container element to scroll (defaults to document.body)
         * @param {Boolean} hscroll (optional) False to disable horizontal scroll (defaults to true)
         * @return {Roo.Element} this
         */
        scrollIntoView : function(container, hscroll){
            var c = Roo.getDom(container) || document.body;
            var el = this.dom;

            var o = this.calcOffsetsTo(c),
                l = o[0],
                t = o[1],
                b = t+el.offsetHeight,
                r = l+el.offsetWidth;

            var ch = c.clientHeight;
            var ct = parseInt(c.scrollTop, 10);
            var cl = parseInt(c.scrollLeft, 10);
            var cb = ct + ch;
            var cr = cl + c.clientWidth;

            if(t < ct){
                c.scrollTop = t;
            }else if(b > cb){
                c.scrollTop = b-ch;
            }

            if(hscroll !== false){
                if(l < cl){
                    c.scrollLeft = l;
                }else if(r > cr){
                    c.scrollLeft = r-c.clientWidth;
                }
            }
            return this;
        },

        // private
        scrollChildIntoView : function(child, hscroll){
            Roo.fly(child, '_scrollChildIntoView').scrollIntoView(this, hscroll);
        },

        /**
         * Measures the element's content height and updates height to match. Note: this function uses setTimeout so
         * the new height may not be available immediately.
         * @param {Boolean} animate (optional) Animate the transition (defaults to false)
         * @param {Float} duration (optional) Length of the animation in seconds (defaults to .35)
         * @param {Function} onComplete (optional) Function to call when animation completes
         * @param {String} easing (optional) Easing method to use (defaults to easeOut)
         * @return {Roo.Element} this
         */
        autoHeight : function(animate, duration, onComplete, easing){
            var oldHeight = this.getHeight();
            this.clip();
            this.setHeight(1); // force clipping
            setTimeout(function(){
                var height = parseInt(this.dom.scrollHeight, 10); // parseInt for Safari
                if(!animate){
                    this.setHeight(height);
                    this.unclip();
                    if(typeof onComplete == "function"){
                        onComplete();
                    }
                }else{
                    this.setHeight(oldHeight); // restore original height
                    this.setHeight(height, animate, duration, function(){
                        this.unclip();
                        if(typeof onComplete == "function") { onComplete(); }
                    }.createDelegate(this), easing);
                }
            }.createDelegate(this), 0);
            return this;
        },

        /**
         * Returns true if this element is an ancestor of the passed element
         * @param {HTMLElement/String} el The element to check
         * @return {Boolean} True if this element is an ancestor of el, else false
         */
        contains : function(el){
            if(!el){return false;}
            return D.isAncestor(this.dom, el.dom ? el.dom : el);
        },

        /**
         * Checks whether the element is currently visible using both visibility and display properties.
         * @param {Boolean} deep (optional) True to walk the dom and see if parent elements are hidden (defaults to false)
         * @return {Boolean} True if the element is currently visible, else false
         */
        isVisible : function(deep) {
            var vis = !(this.getStyle("visibility") == "hidden" || this.getStyle("display") == "none");
            if(deep !== true || !vis){
                return vis;
            }
            var p = this.dom.parentNode;
            while(p && p.tagName.toLowerCase() != "body"){
                if(!Roo.fly(p, '_isVisible').isVisible()){
                    return false;
                }
                p = p.parentNode;
            }
            return true;
        },

        /**
         * Creates a {@link Roo.CompositeElement} for child nodes based on the passed CSS selector (the selector should not contain an id).
         * @param {String} selector The CSS selector
         * @param {Boolean} unique (optional) True to create a unique Roo.Element for each child (defaults to false, which creates a single shared flyweight object)
         * @return {CompositeElement/CompositeElementLite} The composite element
         */
        select : function(selector, unique){
            return El.select(selector, unique, this.dom);
        },

        /**
         * Selects child nodes based on the passed CSS selector (the selector should not contain an id).
         * @param {String} selector The CSS selector
         * @return {Array} An array of the matched nodes
         */
        query : function(selector, unique){
            return Roo.DomQuery.select(selector, this.dom);
        },

        /**
         * Selects a single child at any depth below this element based on the passed CSS selector (the selector should not contain an id).
         * @param {String} selector The CSS selector
         * @param {Boolean} returnDom (optional) True to return the DOM node instead of Roo.Element (defaults to false)
         * @return {HTMLElement/Roo.Element} The child Roo.Element (or DOM node if returnDom = true)
         */
        child : function(selector, returnDom){
            var n = Roo.DomQuery.selectNode(selector, this.dom);
            return returnDom ? n : Roo.get(n);
        },

        /**
         * Selects a single *direct* child based on the passed CSS selector (the selector should not contain an id).
         * @param {String} selector The CSS selector
         * @param {Boolean} returnDom (optional) True to return the DOM node instead of Roo.Element (defaults to false)
         * @return {HTMLElement/Roo.Element} The child Roo.Element (or DOM node if returnDom = true)
         */
        down : function(selector, returnDom){
            var n = Roo.DomQuery.selectNode(" > " + selector, this.dom);
            return returnDom ? n : Roo.get(n);
        },

        /**
         * Initializes a {@link Roo.dd.DD} drag drop object for this element.
         * @param {String} group The group the DD object is member of
         * @param {Object} config The DD config object
         * @param {Object} overrides An object containing methods to override/implement on the DD object
         * @return {Roo.dd.DD} The DD object
         */
        initDD : function(group, config, overrides){
            var dd = new Roo.dd.DD(Roo.id(this.dom), group, config);
            return Roo.apply(dd, overrides);
        },

        /**
         * Initializes a {@link Roo.dd.DDProxy} object for this element.
         * @param {String} group The group the DDProxy object is member of
         * @param {Object} config The DDProxy config object
         * @param {Object} overrides An object containing methods to override/implement on the DDProxy object
         * @return {Roo.dd.DDProxy} The DDProxy object
         */
        initDDProxy : function(group, config, overrides){
            var dd = new Roo.dd.DDProxy(Roo.id(this.dom), group, config);
            return Roo.apply(dd, overrides);
        },

        /**
         * Initializes a {@link Roo.dd.DDTarget} object for this element.
         * @param {String} group The group the DDTarget object is member of
         * @param {Object} config The DDTarget config object
         * @param {Object} overrides An object containing methods to override/implement on the DDTarget object
         * @return {Roo.dd.DDTarget} The DDTarget object
         */
        initDDTarget : function(group, config, overrides){
            var dd = new Roo.dd.DDTarget(Roo.id(this.dom), group, config);
            return Roo.apply(dd, overrides);
        },

        /**
         * Sets the visibility of the element (see details). If the visibilityMode is set to Element.DISPLAY, it will use
         * the display property to hide the element, otherwise it uses visibility. The default is to hide and show using the visibility property.
         * @param {Boolean} visible Whether the element is visible
         * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
         * @return {Roo.Element} this
         */
         setVisible : function(visible, animate){
            if(!animate || !A){
                if(this.visibilityMode == El.DISPLAY){
                    this.setDisplayed(visible);
                }else{
                    this.fixDisplay();
                    this.dom.style.visibility = visible ? "visible" : "hidden";
                }
            }else{
                // closure for composites
                var dom = this.dom;
                var visMode = this.visibilityMode;
                if(visible){
                    this.setOpacity(.01);
                    this.setVisible(true);
                }
                this.anim({opacity: { to: (visible?1:0) }},
                      this.preanim(arguments, 1),
                      null, .35, 'easeIn', function(){
                         if(!visible){
                             if(visMode == El.DISPLAY){
                                 dom.style.display = "none";
                             }else{
                                 dom.style.visibility = "hidden";
                             }
                             Roo.get(dom).setOpacity(1);
                         }
                     });
            }
            return this;
        },

        /**
         * Returns true if display is not "none"
         * @return {Boolean}
         */
        isDisplayed : function() {
            return this.getStyle("display") != "none";
        },

        /**
         * Toggles the element's visibility or display, depending on visibility mode.
         * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
         * @return {Roo.Element} this
         */
        toggle : function(animate){
            this.setVisible(!this.isVisible(), this.preanim(arguments, 0));
            return this;
        },

        /**
         * Sets the CSS display property. Uses originalDisplay if the specified value is a boolean true.
         * @param {Boolean} value Boolean value to display the element using its default display, or a string to set the display directly
         * @return {Roo.Element} this
         */
        setDisplayed : function(value) {
            if(typeof value == "boolean"){
               value = value ? this.originalDisplay : "none";
            }
            this.setStyle("display", value);
            return this;
        },

        /**
         * Tries to focus the element. Any exceptions are caught and ignored.
         * @return {Roo.Element} this
         */
        focus : function() {
            try{
                this.dom.focus();
            }catch(e){}
            return this;
        },

        /**
         * Tries to blur the element. Any exceptions are caught and ignored.
         * @return {Roo.Element} this
         */
        blur : function() {
            try{
                this.dom.blur();
            }catch(e){}
            return this;
        },

        /**
         * Adds one or more CSS classes to the element. Duplicate classes are automatically filtered out.
         * @param {String/Array} className The CSS class to add, or an array of classes
         * @return {Roo.Element} this
         */
        addClass : function(className){
            if(className instanceof Array){
                for(var i = 0, len = className.length; i < len; i++) {
                    this.addClass(className[i]);
                }
            }else{
                if(className && !this.hasClass(className)){
                    if (this.dom instanceof SVGElement) {
                        this.dom.className.baseVal =this.dom.className.baseVal  + " " + className;
                    } else {
                        this.dom.className = this.dom.className + " " + className;
                    }
                }
            }
            return this;
        },

        /**
         * Adds one or more CSS classes to this element and removes the same class(es) from all siblings.
         * @param {String/Array} className The CSS class to add, or an array of classes
         * @return {Roo.Element} this
         */
        radioClass : function(className){
            var siblings = this.dom.parentNode.childNodes;
            for(var i = 0; i < siblings.length; i++) {
                var s = siblings[i];
                if(s.nodeType == 1){
                    Roo.get(s).removeClass(className);
                }
            }
            this.addClass(className);
            return this;
        },

        /**
         * Removes one or more CSS classes from the element.
         * @param {String/Array} className The CSS class to remove, or an array of classes
         * @return {Roo.Element} this
         */
        removeClass : function(className){
            
            var cn = this.dom instanceof SVGElement ? this.dom.className.baseVal : this.dom.className;
            if(!className || !cn){
                return this;
            }
            if(className instanceof Array){
                for(var i = 0, len = className.length; i < len; i++) {
                    this.removeClass(className[i]);
                }
            }else{
                if(this.hasClass(className)){
                    var re = this.classReCache[className];
                    if (!re) {
                       re = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)', "g");
                       this.classReCache[className] = re;
                    }
                    if (this.dom instanceof SVGElement) {
                        this.dom.className.baseVal = cn.replace(re, " ");
                    } else {
                        this.dom.className = cn.replace(re, " ");
                    }
                }
            }
            return this;
        },

        // private
        classReCache: {},

        /**
         * Toggles the specified CSS class on this element (removes it if it already exists, otherwise adds it).
         * @param {String} className The CSS class to toggle
         * @return {Roo.Element} this
         */
        toggleClass : function(className){
            if(this.hasClass(className)){
                this.removeClass(className);
            }else{
                this.addClass(className);
            }
            return this;
        },

        /**
         * Checks if the specified CSS class exists on this element's DOM node.
         * @param {String} className The CSS class to check for
         * @return {Boolean} True if the class exists, else false
         */
        hasClass : function(className){
            if (this.dom instanceof SVGElement) {
                return className && (' '+this.dom.className.baseVal +' ').indexOf(' '+className+' ') != -1; 
            } 
            return className && (' '+this.dom.className+' ').indexOf(' '+className+' ') != -1;
        },

        /**
         * Replaces a CSS class on the element with another.  If the old name does not exist, the new name will simply be added.
         * @param {String} oldClassName The CSS class to replace
         * @param {String} newClassName The replacement CSS class
         * @return {Roo.Element} this
         */
        replaceClass : function(oldClassName, newClassName){
            this.removeClass(oldClassName);
            this.addClass(newClassName);
            return this;
        },

        /**
         * Returns an object with properties matching the styles requested.
         * For example, el.getStyles('color', 'font-size', 'width') might return
         * {'color': '#FFFFFF', 'font-size': '13px', 'width': '100px'}.
         * @param {String} style1 A style name
         * @param {String} style2 A style name
         * @param {String} etc.
         * @return {Object} The style object
         */
        getStyles : function(){
            var a = arguments, len = a.length, r = {};
            for(var i = 0; i < len; i++){
                r[a[i]] = this.getStyle(a[i]);
            }
            return r;
        },

        /**
         * Normalizes currentStyle and computedStyle. This is not YUI getStyle, it is an optimised version.
         * @param {String} property The style property whose value is returned.
         * @return {String} The current value of the style property for this element.
         */
        getStyle : function(){
            return view && view.getComputedStyle ?
                function(prop){
                    var el = this.dom, v, cs, camel;
                    if(prop == 'float'){
                        prop = "cssFloat";
                    }
                    if(el.style && (v = el.style[prop])){
                        return v;
                    }
                    if(cs = view.getComputedStyle(el, "")){
                        if(!(camel = propCache[prop])){
                            camel = propCache[prop] = prop.replace(camelRe, camelFn);
                        }
                        return cs[camel];
                    }
                    return null;
                } :
                function(prop){
                    var el = this.dom, v, cs, camel;
                    if(prop == 'opacity'){
                        if(typeof el.style.filter == 'string'){
                            var m = el.style.filter.match(/alpha\(opacity=(.*)\)/i);
                            if(m){
                                var fv = parseFloat(m[1]);
                                if(!isNaN(fv)){
                                    return fv ? fv / 100 : 0;
                                }
                            }
                        }
                        return 1;
                    }else if(prop == 'float'){
                        prop = "styleFloat";
                    }
                    if(!(camel = propCache[prop])){
                        camel = propCache[prop] = prop.replace(camelRe, camelFn);
                    }
                    if(v = el.style[camel]){
                        return v;
                    }
                    if(cs = el.currentStyle){
                        return cs[camel];
                    }
                    return null;
                };
        }(),

        /**
         * Wrapper for setting style properties, also takes single object parameter of multiple styles.
         * @param {String/Object} property The style property to be set, or an object of multiple styles.
         * @param {String} value (optional) The value to apply to the given property, or null if an object was passed.
         * @return {Roo.Element} this
         */
        setStyle : function(prop, value){
            if(typeof prop == "string"){
                
                if (prop == 'float') {
                    this.setStyle(Roo.isIE ? 'styleFloat'  : 'cssFloat', value);
                    return this;
                }
                
                var camel;
                if(!(camel = propCache[prop])){
                    camel = propCache[prop] = prop.replace(camelRe, camelFn);
                }
                
                if(camel == 'opacity') {
                    this.setOpacity(value);
                }else{
                    this.dom.style[camel] = value;
                }
            }else{
                for(var style in prop){
                    if(typeof prop[style] != "function"){
                       this.setStyle(style, prop[style]);
                    }
                }
            }
            return this;
        },

        /**
         * More flexible version of {@link #setStyle} for setting style properties.
         * @param {String/Object/Function} styles A style specification string, e.g. "width:100px", or object in the form {width:"100px"}, or
         * a function which returns such a specification.
         * @return {Roo.Element} this
         */
        applyStyles : function(style){
            Roo.DomHelper.applyStyles(this.dom, style);
            return this;
        },

        /**
          * Gets the current X position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
          * @return {Number} The X position of the element
          */
        getX : function(){
            return D.getX(this.dom);
        },

        /**
          * Gets the current Y position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
          * @return {Number} The Y position of the element
          */
        getY : function(){
            return D.getY(this.dom);
        },

        /**
          * Gets the current position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
          * @return {Array} The XY position of the element
          */
        getXY : function(){
            return D.getXY(this.dom);
        },

        /**
         * Sets the X position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
         * @param {Number} The X position of the element
         * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
         * @return {Roo.Element} this
         */
        setX : function(x, animate){
            if(!animate || !A){
                D.setX(this.dom, x);
            }else{
                this.setXY([x, this.getY()], this.preanim(arguments, 1));
            }
            return this;
        },

        /**
         * Sets the Y position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
         * @param {Number} The Y position of the element
         * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
         * @return {Roo.Element} this
         */
        setY : function(y, animate){
            if(!animate || !A){
                D.setY(this.dom, y);
            }else{
                this.setXY([this.getX(), y], this.preanim(arguments, 1));
            }
            return this;
        },

        /**
         * Sets the element's left position directly using CSS style (instead of {@link #setX}).
         * @param {String} left The left CSS property value
         * @return {Roo.Element} this
         */
        setLeft : function(left){
            this.setStyle("left", this.addUnits(left));
            return this;
        },

        /**
         * Sets the element's top position directly using CSS style (instead of {@link #setY}).
         * @param {String} top The top CSS property value
         * @return {Roo.Element} this
         */
        setTop : function(top){
            this.setStyle("top", this.addUnits(top));
            return this;
        },

        /**
         * Sets the element's CSS right style.
         * @param {String} right The right CSS property value
         * @return {Roo.Element} this
         */
        setRight : function(right){
            this.setStyle("right", this.addUnits(right));
            return this;
        },

        /**
         * Sets the element's CSS bottom style.
         * @param {String} bottom The bottom CSS property value
         * @return {Roo.Element} this
         */
        setBottom : function(bottom){
            this.setStyle("bottom", this.addUnits(bottom));
            return this;
        },

        /**
         * Sets the position of the element in page coordinates, regardless of how the element is positioned.
         * The element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
         * @param {Array} pos Contains X & Y [x, y] values for new position (coordinates are page-based)
         * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
         * @return {Roo.Element} this
         */
        setXY : function(pos, animate){
            if(!animate || !A){
                D.setXY(this.dom, pos);
            }else{
                this.anim({points: {to: pos}}, this.preanim(arguments, 1), 'motion');
            }
            return this;
        },

        /**
         * Sets the position of the element in page coordinates, regardless of how the element is positioned.
         * The element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
         * @param {Number} x X value for new position (coordinates are page-based)
         * @param {Number} y Y value for new position (coordinates are page-based)
         * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
         * @return {Roo.Element} this
         */
        setLocation : function(x, y, animate){
            this.setXY([x, y], this.preanim(arguments, 2));
            return this;
        },

        /**
         * Sets the position of the element in page coordinates, regardless of how the element is positioned.
         * The element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
         * @param {Number} x X value for new position (coordinates are page-based)
         * @param {Number} y Y value for new position (coordinates are page-based)
         * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
         * @return {Roo.Element} this
         */
        moveTo : function(x, y, animate){
            this.setXY([x, y], this.preanim(arguments, 2));
            return this;
        },

        /**
         * Returns the region of the given element.
         * The element must be part of the DOM tree to have a region (display:none or elements not appended return false).
         * @return {Region} A Roo.lib.Region containing "top, left, bottom, right" member data.
         */
        getRegion : function(){
            return D.getRegion(this.dom);
        },

        /**
         * Returns the offset height of the element
         * @param {Boolean} contentHeight (optional) true to get the height minus borders and padding
         * @return {Number} The element's height
         */
        getHeight : function(contentHeight){
            var h = this.dom.offsetHeight || 0;
            return contentHeight !== true ? h : h-this.getBorderWidth("tb")-this.getPadding("tb");
        },

        /**
         * Returns the offset width of the element
         * @param {Boolean} contentWidth (optional) true to get the width minus borders and padding
         * @return {Number} The element's width
         */
        getWidth : function(contentWidth){
            var w = this.dom.offsetWidth || 0;
            return contentWidth !== true ? w : w-this.getBorderWidth("lr")-this.getPadding("lr");
        },

        /**
         * Returns either the offsetHeight or the height of this element based on CSS height adjusted by padding or borders
         * when needed to simulate offsetHeight when offsets aren't available. This may not work on display:none elements
         * if a height has not been set using CSS.
         * @return {Number}
         */
        getComputedHeight : function(){
            var h = Math.max(this.dom.offsetHeight, this.dom.clientHeight);
            if(!h){
                h = parseInt(this.getStyle('height'), 10) || 0;
                if(!this.isBorderBox()){
                    h += this.getFrameWidth('tb');
                }
            }
            return h;
        },

        /**
         * Returns either the offsetWidth or the width of this element based on CSS width adjusted by padding or borders
         * when needed to simulate offsetWidth when offsets aren't available. This may not work on display:none elements
         * if a width has not been set using CSS.
         * @return {Number}
         */
        getComputedWidth : function(){
            var w = Math.max(this.dom.offsetWidth, this.dom.clientWidth);
            if(!w){
                w = parseInt(this.getStyle('width'), 10) || 0;
                if(!this.isBorderBox()){
                    w += this.getFrameWidth('lr');
                }
            }
            return w;
        },

        /**
         * Returns the size of the element.
         * @param {Boolean} contentSize (optional) true to get the width/size minus borders and padding
         * @return {Object} An object containing the element's size {width: (element width), height: (element height)}
         */
        getSize : function(contentSize){
            return {width: this.getWidth(contentSize), height: this.getHeight(contentSize)};
        },

        /**
         * Returns the width and height of the viewport.
         * @return {Object} An object containing the viewport's size {width: (viewport width), height: (viewport height)}
         */
        getViewSize : function(){
            var d = this.dom, doc = document, aw = 0, ah = 0;
            if(d == doc || d == doc.body){
                return {width : D.getViewWidth(), height: D.getViewHeight()};
            }else{
                return {
                    width : d.clientWidth,
                    height: d.clientHeight
                };
            }
        },

        /**
         * Returns the value of the "value" attribute
         * @param {Boolean} asNumber true to parse the value as a number
         * @return {String/Number}
         */
        getValue : function(asNumber){
            return asNumber ? parseInt(this.dom.value, 10) : this.dom.value;
        },

        // private
        adjustWidth : function(width){
            if(typeof width == "number"){
                if(this.autoBoxAdjust && !this.isBorderBox()){
                   width -= (this.getBorderWidth("lr") + this.getPadding("lr"));
                }
                if(width < 0){
                    width = 0;
                }
            }
            return width;
        },

        // private
        adjustHeight : function(height){
            if(typeof height == "number"){
               if(this.autoBoxAdjust && !this.isBorderBox()){
                   height -= (this.getBorderWidth("tb") + this.getPadding("tb"));
               }
               if(height < 0){
                   height = 0;
               }
            }
            return height;
        },

        /**
         * Set the width of the element
         * @param {Number} width The new width
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Roo.Element} this
         */
        setWidth : function(width, animate){
            width = this.adjustWidth(width);
            if(!animate || !A){
                this.dom.style.width = this.addUnits(width);
            }else{
                this.anim({width: {to: width}}, this.preanim(arguments, 1));
            }
            return this;
        },

        /**
         * Set the height of the element
         * @param {Number} height The new height
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Roo.Element} this
         */
         setHeight : function(height, animate){
            height = this.adjustHeight(height);
            if(!animate || !A){
                this.dom.style.height = this.addUnits(height);
            }else{
                this.anim({height: {to: height}}, this.preanim(arguments, 1));
            }
            return this;
        },

        /**
         * Set the size of the element. If animation is true, both width an height will be animated concurrently.
         * @param {Number} width The new width
         * @param {Number} height The new height
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Roo.Element} this
         */
         setSize : function(width, height, animate){
            if(typeof width == "object"){ // in case of object from getSize()
                height = width.height; width = width.width;
            }
            width = this.adjustWidth(width); height = this.adjustHeight(height);
            if(!animate || !A){
                this.dom.style.width = this.addUnits(width);
                this.dom.style.height = this.addUnits(height);
            }else{
                this.anim({width: {to: width}, height: {to: height}}, this.preanim(arguments, 2));
            }
            return this;
        },

        /**
         * Sets the element's position and size in one shot. If animation is true then width, height, x and y will be animated concurrently.
         * @param {Number} x X value for new position (coordinates are page-based)
         * @param {Number} y Y value for new position (coordinates are page-based)
         * @param {Number} width The new width
         * @param {Number} height The new height
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Roo.Element} this
         */
        setBounds : function(x, y, width, height, animate){
            if(!animate || !A){
                this.setSize(width, height);
                this.setLocation(x, y);
            }else{
                width = this.adjustWidth(width); height = this.adjustHeight(height);
                this.anim({points: {to: [x, y]}, width: {to: width}, height: {to: height}},
                              this.preanim(arguments, 4), 'motion');
            }
            return this;
        },

        /**
         * Sets the element's position and size the the specified region. If animation is true then width, height, x and y will be animated concurrently.
         * @param {Roo.lib.Region} region The region to fill
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Roo.Element} this
         */
        setRegion : function(region, animate){
            this.setBounds(region.left, region.top, region.right-region.left, region.bottom-region.top, this.preanim(arguments, 1));
            return this;
        },

        /**
         * Appends an event handler
         *
         * @param {String}   eventName     The type of event to append
         * @param {Function} fn        The method the event invokes
         * @param {Object} scope       (optional) The scope (this object) of the fn
         * @param {Object}   options   (optional)An object with standard {@link Roo.EventManager#addListener} options
         */
        addListener : function(eventName, fn, scope, options)
        {
            if (eventName == 'dblclick') { // doublclick (touchstart) - faked on touch.
                this.addListener('touchstart', this.onTapHandler, this);
            }
            
            // we need to handle a special case where dom element is a svg element.
            // in this case we do not actua
            if (!this.dom) {
                return;
            }
            
            if (this.dom instanceof SVGElement && !(this.dom instanceof SVGSVGElement)) {
                if (typeof(this.listeners[eventName]) == 'undefined') {
                    this.listeners[eventName] =  new Roo.util.Event(this, eventName);
                }
                this.listeners[eventName].addListener(fn, scope, options);
                return;
            }
            
                
            Roo.EventManager.on(this.dom,  eventName, fn, scope || this, options);
            
            
        },
        tapedTwice : false,
        onTapHandler : function(event)
        {
            if(!this.tapedTwice) {
                this.tapedTwice = true;
                var s = this;
                setTimeout( function() {
                    s.tapedTwice = false;
                }, 300 );
                return;
            }
            event.preventDefault();
            var revent = new MouseEvent('dblclick',  {
                view: window,
                bubbles: true,
                cancelable: true
            });
             
            this.dom.dispatchEvent(revent);
            //action on double tap goes below
             
        }, 
 
        /**
         * Removes an event handler from this element
         * @param {String} eventName the type of event to remove
         * @param {Function} fn the method the event invokes
         * @param {Function} scope (needed for svg fake listeners)
         * @return {Roo.Element} this
         */
        removeListener : function(eventName, fn, scope){
            Roo.EventManager.removeListener(this.dom,  eventName, fn);
            if (typeof(this.listeners) == 'undefined'  || typeof(this.listeners[eventName]) == 'undefined') {
                return this;
            }
            this.listeners[eventName].removeListener(fn, scope);
            return this;
        },

        /**
         * Removes all previous added listeners from this element
         * @return {Roo.Element} this
         */
        removeAllListeners : function(){
            E.purgeElement(this.dom);
            this.listeners = {};
            return this;
        },

        relayEvent : function(eventName, observable){
            this.on(eventName, function(e){
                observable.fireEvent(eventName, e);
            });
        },

        
        /**
         * Set the opacity of the element
         * @param {Float} opacity The new opacity. 0 = transparent, .5 = 50% visibile, 1 = fully visible, etc
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Roo.Element} this
         */
         setOpacity : function(opacity, animate){
            if(!animate || !A){
                var s = this.dom.style;
                if(Roo.isIE){
                    s.zoom = 1;
                    s.filter = (s.filter || '').replace(/alpha\([^\)]*\)/gi,"") +
                               (opacity == 1 ? "" : "alpha(opacity=" + opacity * 100 + ")");
                }else{
                    s.opacity = opacity;
                }
            }else{
                this.anim({opacity: {to: opacity}}, this.preanim(arguments, 1), null, .35, 'easeIn');
            }
            return this;
        },

        /**
         * Gets the left X coordinate
         * @param {Boolean} local True to get the local css position instead of page coordinate
         * @return {Number}
         */
        getLeft : function(local){
            if(!local){
                return this.getX();
            }else{
                return parseInt(this.getStyle("left"), 10) || 0;
            }
        },

        /**
         * Gets the right X coordinate of the element (element X position + element width)
         * @param {Boolean} local True to get the local css position instead of page coordinate
         * @return {Number}
         */
        getRight : function(local){
            if(!local){
                return this.getX() + this.getWidth();
            }else{
                return (this.getLeft(true) + this.getWidth()) || 0;
            }
        },

        /**
         * Gets the top Y coordinate
         * @param {Boolean} local True to get the local css position instead of page coordinate
         * @return {Number}
         */
        getTop : function(local) {
            if(!local){
                return this.getY();
            }else{
                return parseInt(this.getStyle("top"), 10) || 0;
            }
        },

        /**
         * Gets the bottom Y coordinate of the element (element Y position + element height)
         * @param {Boolean} local True to get the local css position instead of page coordinate
         * @return {Number}
         */
        getBottom : function(local){
            if(!local){
                return this.getY() + this.getHeight();
            }else{
                return (this.getTop(true) + this.getHeight()) || 0;
            }
        },

        /**
        * Initializes positioning on this element. If a desired position is not passed, it will make the
        * the element positioned relative IF it is not already positioned.
        * @param {String} pos (optional) Positioning to use "relative", "absolute" or "fixed"
        * @param {Number} zIndex (optional) The zIndex to apply
        * @param {Number} x (optional) Set the page X position
        * @param {Number} y (optional) Set the page Y position
        */
        position : function(pos, zIndex, x, y){
            if(!pos){
               if(this.getStyle('position') == 'static'){
                   this.setStyle('position', 'relative');
               }
            }else{
                this.setStyle("position", pos);
            }
            if(zIndex){
                this.setStyle("z-index", zIndex);
            }
            if(x !== undefined && y !== undefined){
                this.setXY([x, y]);
            }else if(x !== undefined){
                this.setX(x);
            }else if(y !== undefined){
                this.setY(y);
            }
        },

        /**
        * Clear positioning back to the default when the document was loaded
        * @param {String} value (optional) The value to use for the left,right,top,bottom, defaults to '' (empty string). You could use 'auto'.
        * @return {Roo.Element} this
         */
        clearPositioning : function(value){
            value = value ||'';
            this.setStyle({
                "left": value,
                "right": value,
                "top": value,
                "bottom": value,
                "z-index": "",
                "position" : "static"
            });
            return this;
        },

        /**
        * Gets an object with all CSS positioning properties. Useful along with setPostioning to get
        * snapshot before performing an update and then restoring the element.
        * @return {Object}
        */
        getPositioning : function(){
            var l = this.getStyle("left");
            var t = this.getStyle("top");
            return {
                "position" : this.getStyle("position"),
                "left" : l,
                "right" : l ? "" : this.getStyle("right"),
                "top" : t,
                "bottom" : t ? "" : this.getStyle("bottom"),
                "z-index" : this.getStyle("z-index")
            };
        },

        /**
         * Gets the width of the border(s) for the specified side(s)
         * @param {String} side Can be t, l, r, b or any combination of those to add multiple values. For example,
         * passing lr would get the border (l)eft width + the border (r)ight width.
         * @return {Number} The width of the sides passed added together
         */
        getBorderWidth : function(side){
            return this.addStyles(side, El.borders);
        },

        /**
         * Gets the width of the padding(s) for the specified side(s)
         * @param {String} side Can be t, l, r, b or any combination of those to add multiple values. For example,
         * passing lr would get the padding (l)eft + the padding (r)ight.
         * @return {Number} The padding of the sides passed added together
         */
        getPadding : function(side){
            return this.addStyles(side, El.paddings);
        },

        /**
        * Set positioning with an object returned by getPositioning().
        * @param {Object} posCfg
        * @return {Roo.Element} this
         */
        setPositioning : function(pc){
            this.applyStyles(pc);
            if(pc.right == "auto"){
                this.dom.style.right = "";
            }
            if(pc.bottom == "auto"){
                this.dom.style.bottom = "";
            }
            return this;
        },

        // private
        fixDisplay : function(){
            if(this.getStyle("display") == "none"){
                this.setStyle("visibility", "hidden");
                this.setStyle("display", this.originalDisplay); // first try reverting to default
                if(this.getStyle("display") == "none"){ // if that fails, default to block
                    this.setStyle("display", "block");
                }
            }
        },

        /**
         * Quick set left and top adding default units
         * @param {String} left The left CSS property value
         * @param {String} top The top CSS property value
         * @return {Roo.Element} this
         */
         setLeftTop : function(left, top){
            this.dom.style.left = this.addUnits(left);
            this.dom.style.top = this.addUnits(top);
            return this;
        },

        /**
         * Move this element relative to its current position.
         * @param {String} direction Possible values are: "l","left" - "r","right" - "t","top","up" - "b","bottom","down".
         * @param {Number} distance How far to move the element in pixels
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Roo.Element} this
         */
         move : function(direction, distance, animate){
            var xy = this.getXY();
            direction = direction.toLowerCase();
            switch(direction){
                case "l":
                case "left":
                    this.moveTo(xy[0]-distance, xy[1], this.preanim(arguments, 2));
                    break;
               case "r":
               case "right":
                    this.moveTo(xy[0]+distance, xy[1], this.preanim(arguments, 2));
                    break;
               case "t":
               case "top":
               case "up":
                    this.moveTo(xy[0], xy[1]-distance, this.preanim(arguments, 2));
                    break;
               case "b":
               case "bottom":
               case "down":
                    this.moveTo(xy[0], xy[1]+distance, this.preanim(arguments, 2));
                    break;
            }
            return this;
        },

        /**
         *  Store the current overflow setting and clip overflow on the element - use {@link #unclip} to remove
         * @return {Roo.Element} this
         */
        clip : function(){
            if(!this.isClipped){
               this.isClipped = true;
               this.originalClip = {
                   "o": this.getStyle("overflow"),
                   "x": this.getStyle("overflow-x"),
                   "y": this.getStyle("overflow-y")
               };
               this.setStyle("overflow", "hidden");
               this.setStyle("overflow-x", "hidden");
               this.setStyle("overflow-y", "hidden");
            }
            return this;
        },

        /**
         *  Return clipping (overflow) to original clipping before clip() was called
         * @return {Roo.Element} this
         */
        unclip : function(){
            if(this.isClipped){
                this.isClipped = false;
                var o = this.originalClip;
                if(o.o){this.setStyle("overflow", o.o);}
                if(o.x){this.setStyle("overflow-x", o.x);}
                if(o.y){this.setStyle("overflow-y", o.y);}
            }
            return this;
        },


        /**
         * Gets the x,y coordinates specified by the anchor position on the element.
         * @param {String} anchor (optional) The specified anchor position (defaults to "c").  See {@link #alignTo} for details on supported anchor positions.
         * @param {Object} size (optional) An object containing the size to use for calculating anchor position
         *                       {width: (target width), height: (target height)} (defaults to the element's current size)
         * @param {Boolean} local (optional) True to get the local (element top/left-relative) anchor position instead of page coordinates
         * @return {Array} [x, y] An array containing the element's x and y coordinates
         */
        getAnchorXY : function(anchor, local, s){
            //Passing a different size is useful for pre-calculating anchors,
            //especially for anchored animations that change the el size.

            var w, h, vp = false;
            if(!s){
                var d = this.dom;
                if(d == document.body || d == document){
                    vp = true;
                    w = D.getViewWidth(); h = D.getViewHeight();
                }else{
                    w = this.getWidth(); h = this.getHeight();
                }
            }else{
                w = s.width;  h = s.height;
            }
            var x = 0, y = 0, r = Math.round;
            switch((anchor || "tl").toLowerCase()){
                case "c":
                    x = r(w*.5);
                    y = r(h*.5);
                break;
                case "t":
                    x = r(w*.5);
                    y = 0;
                break;
                case "l":
                    x = 0;
                    y = r(h*.5);
                break;
                case "r":
                    x = w;
                    y = r(h*.5);
                break;
                case "b":
                    x = r(w*.5);
                    y = h;
                break;
                case "tl":
                    x = 0;
                    y = 0;
                break;
                case "bl":
                    x = 0;
                    y = h;
                break;
                case "br":
                    x = w;
                    y = h;
                break;
                case "tr":
                    x = w;
                    y = 0;
                break;
            }
            if(local === true){
                return [x, y];
            }
            if(vp){
                var sc = this.getScroll();
                return [x + sc.left, y + sc.top];
            }
            //Add the element's offset xy
            var o = this.getXY();
            return [x+o[0], y+o[1]];
        },

        /**
         * Gets the x,y coordinates to align this element with another element. See {@link #alignTo} for more info on the
         * supported position values.
         * @param {String/HTMLElement/Roo.Element} element The element to align to.
         * @param {String} position The position to align to.
         * @param {Array} offsets (optional) Offset the positioning by [x, y]
         * @return {Array} [x, y]
         */
        getAlignToXY : function(el, p, o)
        {
            el = Roo.get(el);
            var d = this.dom;
            if(!el.dom){
                throw "Element.alignTo with an element that doesn't exist";
            }
            var c = false; //constrain to viewport
            var p1 = "", p2 = "";
            o = o || [0,0];

            if(!p){
                p = "tl-bl";
            }else if(p == "?"){
                p = "tl-bl?";
            }else if(p.indexOf("-") == -1){
                p = "tl-" + p;
            }
            p = p.toLowerCase();
            var m = p.match(/^([a-z]+)-([a-z]+)(\?)?$/);
            if(!m){
               throw "Element.alignTo with an invalid alignment " + p;
            }
            p1 = m[1]; p2 = m[2]; c = !!m[3];

            //Subtract the aligned el's internal xy from the target's offset xy
            //plus custom offset to get the aligned el's new offset xy
            var a1 = this.getAnchorXY(p1, true);
            var a2 = el.getAnchorXY(p2, false);
            var x = a2[0] - a1[0] + o[0];
            var y = a2[1] - a1[1] + o[1];
            if(c){
                //constrain the aligned el to viewport if necessary
                var w = this.getWidth(), h = this.getHeight(), r = el.getRegion();
                // 5px of margin for ie
                var dw = D.getViewWidth()-5, dh = D.getViewHeight()-5;

                //If we are at a viewport boundary and the aligned el is anchored on a target border that is
                //perpendicular to the vp border, allow the aligned el to slide on that border,
                //otherwise swap the aligned el to the opposite border of the target.
                var p1y = p1.charAt(0), p1x = p1.charAt(p1.length-1);
               var p2y = p2.charAt(0), p2x = p2.charAt(p2.length-1);
               var swapY = ((p1y=="t" && p2y=="b") || (p1y=="b" && p2y=="t")  );
               var swapX = ((p1x=="r" && p2x=="l") || (p1x=="l" && p2x=="r"));

               var doc = document;
               var scrollX = (doc.documentElement.scrollLeft || doc.body.scrollLeft || 0)+5;
               var scrollY = (doc.documentElement.scrollTop || doc.body.scrollTop || 0)+5;

               if((x+w) > dw + scrollX){
                    x = swapX ? r.left-w : dw+scrollX-w;
                }
               if(x < scrollX){
                   x = swapX ? r.right : scrollX;
               }
               if((y+h) > dh + scrollY){
                    y = swapY ? r.top-h : dh+scrollY-h;
                }
               if (y < scrollY){
                   y = swapY ? r.bottom : scrollY;
               }
            }
            return [x,y];
        },

        // private
        getConstrainToXY : function(){
            var os = {top:0, left:0, bottom:0, right: 0};

            return function(el, local, offsets, proposedXY){
                el = Roo.get(el);
                offsets = offsets ? Roo.applyIf(offsets, os) : os;

                var vw, vh, vx = 0, vy = 0;
                if(el.dom == document.body || el.dom == document){
                    vw = Roo.lib.Dom.getViewWidth();
                    vh = Roo.lib.Dom.getViewHeight();
                }else{
                    vw = el.dom.clientWidth;
                    vh = el.dom.clientHeight;
                    if(!local){
                        var vxy = el.getXY();
                        vx = vxy[0];
                        vy = vxy[1];
                    }
                }

                var s = el.getScroll();

                vx += offsets.left + s.left;
                vy += offsets.top + s.top;

                vw -= offsets.right;
                vh -= offsets.bottom;

                var vr = vx+vw;
                var vb = vy+vh;

                var xy = proposedXY || (!local ? this.getXY() : [this.getLeft(true), this.getTop(true)]);
                var x = xy[0], y = xy[1];
                var w = this.dom.offsetWidth, h = this.dom.offsetHeight;

                // only move it if it needs it
                var moved = false;

                // first validate right/bottom
                if((x + w) > vr){
                    x = vr - w;
                    moved = true;
                }
                if((y + h) > vb){
                    y = vb - h;
                    moved = true;
                }
                // then make sure top/left isn't negative
                if(x < vx){
                    x = vx;
                    moved = true;
                }
                if(y < vy){
                    y = vy;
                    moved = true;
                }
                return moved ? [x, y] : false;
            };
        }(),

        // private
        adjustForConstraints : function(xy, parent, offsets){
            return this.getConstrainToXY(parent || document, false, offsets, xy) ||  xy;
        },

        /**
         * Aligns this element with another element relative to the specified anchor points. If the other element is the
         * document it aligns it to the viewport.
         * The position parameter is optional, and can be specified in any one of the following formats:
         * <ul>
         *   <li><b>Blank</b>: Defaults to aligning the element's top-left corner to the target's bottom-left corner ("tl-bl").</li>
         *   <li><b>One anchor (deprecated)</b>: The passed anchor position is used as the target element's anchor point.
         *       The element being aligned will position its top-left corner (tl) to that point.  <i>This method has been
         *       deprecated in favor of the newer two anchor syntax below</i>.</li>
         *   <li><b>Two anchors</b>: If two values from the table below are passed separated by a dash, the first value is used as the
         *       element's anchor point, and the second value is used as the target's anchor point.</li>
         * </ul>
         * In addition to the anchor points, the position parameter also supports the "?" character.  If "?" is passed at the end of
         * the position string, the element will attempt to align as specified, but the position will be adjusted to constrain to
         * the viewport if necessary.  Note that the element being aligned might be swapped to align to a different position than
         * that specified in order to enforce the viewport constraints.
         * Following are all of the supported anchor positions:
    <pre>
    Value  Description
    -----  -----------------------------
    tl     The top left corner (default)
    t      The center of the top edge
    tr     The top right corner
    l      The center of the left edge
    c      In the center of the element
    r      The center of the right edge
    bl     The bottom left corner
    b      The center of the bottom edge
    br     The bottom right corner
    </pre>
    Example Usage:
    <pre><code>
    // align el to other-el using the default positioning ("tl-bl", non-constrained)
    el.alignTo("other-el");

    // align the top left corner of el with the top right corner of other-el (constrained to viewport)
    el.alignTo("other-el", "tr?");

    // align the bottom right corner of el with the center left edge of other-el
    el.alignTo("other-el", "br-l?");

    // align the center of el with the bottom left corner of other-el and
    // adjust the x position by -6 pixels (and the y position by 0)
    el.alignTo("other-el", "c-bl", [-6, 0]);
    </code></pre>
         * @param {String/HTMLElement/Roo.Element} element The element to align to.
         * @param {String} position The position to align to.
         * @param {Array} offsets (optional) Offset the positioning by [x, y]
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Roo.Element} this
         */
        alignTo : function(element, position, offsets, animate){
            var xy = this.getAlignToXY(element, position, offsets);
            this.setXY(xy, this.preanim(arguments, 3));
            return this;
        },

        /**
         * Anchors an element to another element and realigns it when the window is resized.
         * @param {String/HTMLElement/Roo.Element} element The element to align to.
         * @param {String} position The position to align to.
         * @param {Array} offsets (optional) Offset the positioning by [x, y]
         * @param {Boolean/Object} animate (optional) True for the default animation or a standard Element animation config object
         * @param {Boolean/Number} monitorScroll (optional) True to monitor body scroll and reposition. If this parameter
         * is a number, it is used as the buffer delay (defaults to 50ms).
         * @param {Function} callback The function to call after the animation finishes
         * @return {Roo.Element} this
         */
        anchorTo : function(el, alignment, offsets, animate, monitorScroll, callback){
            var action = function(){
                this.alignTo(el, alignment, offsets, animate);
                Roo.callback(callback, this);
            };
            Roo.EventManager.onWindowResize(action, this);
            var tm = typeof monitorScroll;
            if(tm != 'undefined'){
                Roo.EventManager.on(window, 'scroll', action, this,
                    {buffer: tm == 'number' ? monitorScroll : 50});
            }
            action.call(this); // align immediately
            return this;
        },
        /**
         * Clears any opacity settings from this element. Required in some cases for IE.
         * @return {Roo.Element} this
         */
        clearOpacity : function(){
            if (window.ActiveXObject) {
                if(typeof this.dom.style.filter == 'string' && (/alpha/i).test(this.dom.style.filter)){
                    this.dom.style.filter = "";
                }
            } else {
                this.dom.style.opacity = "";
                this.dom.style["-moz-opacity"] = "";
                this.dom.style["-khtml-opacity"] = "";
            }
            return this;
        },

        /**
         * Hide this element - Uses display mode to determine whether to use "display" or "visibility". See {@link #setVisible}.
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Roo.Element} this
         */
        hide : function(animate){
            this.setVisible(false, this.preanim(arguments, 0));
            return this;
        },

        /**
        * Show this element - Uses display mode to determine whether to use "display" or "visibility". See {@link #setVisible}.
        * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Roo.Element} this
         */
        show : function(animate){
            this.setVisible(true, this.preanim(arguments, 0));
            return this;
        },

        /**
         * @private Test if size has a unit, otherwise appends the default
         */
        addUnits : function(size){
            return Roo.Element.addUnits(size, this.defaultUnit);
        },

        /**
         * Temporarily enables offsets (width,height,x,y) for an element with display:none, use endMeasure() when done.
         * @return {Roo.Element} this
         */
        beginMeasure : function(){
            var el = this.dom;
            if(el.offsetWidth || el.offsetHeight){
                return this; // offsets work already
            }
            var changed = [];
            var p = this.dom, b = document.body; // start with this element
            while((!el.offsetWidth && !el.offsetHeight) && p && p.tagName && p != b){
                var pe = Roo.get(p);
                if(pe.getStyle('display') == 'none'){
                    changed.push({el: p, visibility: pe.getStyle("visibility")});
                    p.style.visibility = "hidden";
                    p.style.display = "block";
                }
                p = p.parentNode;
            }
            this._measureChanged = changed;
            return this;

        },

        /**
         * Restores displays to before beginMeasure was called
         * @return {Roo.Element} this
         */
        endMeasure : function(){
            var changed = this._measureChanged;
            if(changed){
                for(var i = 0, len = changed.length; i < len; i++) {
                    var r = changed[i];
                    r.el.style.visibility = r.visibility;
                    r.el.style.display = "none";
                }
                this._measureChanged = null;
            }
            return this;
        },

        /**
        * Update the innerHTML of this element, optionally searching for and processing scripts
        * @param {String} html The new HTML
        * @param {Boolean} loadScripts (optional) true to look for and process scripts
        * @param {Function} callback For async script loading you can be noticed when the update completes
        * @return {Roo.Element} this
         */
        update : function(html, loadScripts, callback){
            if(typeof html == "undefined"){
                html = "";
            }
            if(loadScripts !== true){
                this.dom.innerHTML = html;
                if(typeof callback == "function"){
                    callback();
                }
                return this;
            }
            var id = Roo.id();
            var dom = this.dom;

            html += '<span id="' + id + '"></span>';

            E.onAvailable(id, function(){
                var hd = document.getElementsByTagName("head")[0];
                var re = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig;
                var srcRe = /\ssrc=([\'\"])(.*?)\1/i;
                var typeRe = /\stype=([\'\"])(.*?)\1/i;

                var match;
                while(match = re.exec(html)){
                    var attrs = match[1];
                    var srcMatch = attrs ? attrs.match(srcRe) : false;
                    if(srcMatch && srcMatch[2]){
                       var s = document.createElement("script");
                       s.src = srcMatch[2];
                       var typeMatch = attrs.match(typeRe);
                       if(typeMatch && typeMatch[2]){
                           s.type = typeMatch[2];
                       }
                       hd.appendChild(s);
                    }else if(match[2] && match[2].length > 0){
                        if(window.execScript) {
                           window.execScript(match[2]);
                        } else {
                            /**
                             * eval:var:id
                             * eval:var:dom
                             * eval:var:html
                             * 
                             */
                           window.eval(match[2]);
                        }
                    }
                }
                var el = document.getElementById(id);
                if(el){el.parentNode.removeChild(el);}
                if(typeof callback == "function"){
                    callback();
                }
            });
            dom.innerHTML = html.replace(/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig, "");
            return this;
        },

        /**
         * Direct access to the UpdateManager update() method (takes the same parameters).
         * @param {String/Function} url The url for this request or a function to call to get the url
         * @param {String/Object} params (optional) The parameters to pass as either a url encoded string "param1=1&amp;param2=2" or an object {param1: 1, param2: 2}
         * @param {Function} callback (optional) Callback when transaction is complete - called with signature (oElement, bSuccess)
         * @param {Boolean} discardUrl (optional) By default when you execute an update the defaultUrl is changed to the last used url. If true, it will not store the url.
         * @return {Roo.Element} this
         */
        load : function(){
            var um = this.getUpdateManager();
            um.update.apply(um, arguments);
            return this;
        },

        /**
        * Gets this element's UpdateManager
        * @return {Roo.UpdateManager} The UpdateManager
        */
        getUpdateManager : function(){
            if(!this.updateManager){
                this.updateManager = new Roo.UpdateManager(this);
            }
            return this.updateManager;
        },

        /**
         * Disables text selection for this element (normalized across browsers)
         * @return {Roo.Element} this
         */
        unselectable : function(){
            this.dom.unselectable = "on";
            this.swallowEvent("selectstart", true);
            this.applyStyles("-moz-user-select:none;-khtml-user-select:none;");
            this.addClass("x-unselectable");
            return this;
        },

        /**
        * Calculates the x, y to center this element on the screen
        * @return {Array} The x, y values [x, y]
        */
        getCenterXY : function(){
            return this.getAlignToXY(document, 'c-c');
        },

        /**
        * Centers the Element in either the viewport, or another Element.
        * @param {String/HTMLElement/Roo.Element} centerIn (optional) The element in which to center the element.
        */
        center : function(centerIn){
            this.alignTo(centerIn || document, 'c-c');
            return this;
        },

        /**
         * Tests various css rules/browsers to determine if this element uses a border box
         * @return {Boolean}
         */
        isBorderBox : function(){
            return noBoxAdjust[this.dom.tagName.toLowerCase()] || Roo.isBorderBox;
        },

        /**
         * Return a box {x, y, width, height} that can be used to set another elements
         * size/location to match this element.
         * @param {Boolean} contentBox (optional) If true a box for the content of the element is returned.
         * @param {Boolean} local (optional) If true the element's left and top are returned instead of page x/y.
         * @return {Object} box An object in the format {x, y, width, height}
         */
        getBox : function(contentBox, local){
            var xy;
            if(!local){
                xy = this.getXY();
            }else{
                var left = parseInt(this.getStyle("left"), 10) || 0;
                var top = parseInt(this.getStyle("top"), 10) || 0;
                xy = [left, top];
            }
            var el = this.dom, w = el.offsetWidth, h = el.offsetHeight, bx;
            if(!contentBox){
                bx = {x: xy[0], y: xy[1], 0: xy[0], 1: xy[1], width: w, height: h};
            }else{
                var l = this.getBorderWidth("l")+this.getPadding("l");
                var r = this.getBorderWidth("r")+this.getPadding("r");
                var t = this.getBorderWidth("t")+this.getPadding("t");
                var b = this.getBorderWidth("b")+this.getPadding("b");
                bx = {x: xy[0]+l, y: xy[1]+t, 0: xy[0]+l, 1: xy[1]+t, width: w-(l+r), height: h-(t+b)};
            }
            bx.right = bx.x + bx.width;
            bx.bottom = bx.y + bx.height;
            return bx;
        },

        /**
         * Returns the sum width of the padding and borders for the passed "sides". See getBorderWidth()
         for more information about the sides.
         * @param {String} sides
         * @return {Number}
         */
        getFrameWidth : function(sides, onlyContentBox){
            return onlyContentBox && Roo.isBorderBox ? 0 : (this.getPadding(sides) + this.getBorderWidth(sides));
        },

        /**
         * Sets the element's box. Use getBox() on another element to get a box obj. If animate is true then width, height, x and y will be animated concurrently.
         * @param {Object} box The box to fill {x, y, width, height}
         * @param {Boolean} adjust (optional) Whether to adjust for box-model issues automatically
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Roo.Element} this
         */
        setBox : function(box, adjust, animate){
            var w = box.width, h = box.height;
            if((adjust && !this.autoBoxAdjust) && !this.isBorderBox()){
               w -= (this.getBorderWidth("lr") + this.getPadding("lr"));
               h -= (this.getBorderWidth("tb") + this.getPadding("tb"));
            }
            this.setBounds(box.x, box.y, w, h, this.preanim(arguments, 2));
            return this;
        },

        /**
         * Forces the browser to repaint this element
         * @return {Roo.Element} this
         */
         repaint : function(){
            var dom = this.dom;
            this.addClass("x-repaint");
            setTimeout(function(){
                Roo.get(dom).removeClass("x-repaint");
            }, 1);
            return this;
        },

        /**
         * Returns an object with properties top, left, right and bottom representing the margins of this element unless sides is passed,
         * then it returns the calculated width of the sides (see getPadding)
         * @param {String} sides (optional) Any combination of l, r, t, b to get the sum of those sides
         * @return {Object/Number}
         */
        getMargins : function(side){
            if(!side){
                return {
                    top: parseInt(this.getStyle("margin-top"), 10) || 0,
                    left: parseInt(this.getStyle("margin-left"), 10) || 0,
                    bottom: parseInt(this.getStyle("margin-bottom"), 10) || 0,
                    right: parseInt(this.getStyle("margin-right"), 10) || 0
                };
            }else{
                return this.addStyles(side, El.margins);
             }
        },

        // private
        addStyles : function(sides, styles){
            var val = 0, v, w;
            for(var i = 0, len = sides.length; i < len; i++){
                v = this.getStyle(styles[sides.charAt(i)]);
                if(v){
                     w = parseInt(v, 10);
                     if(w){ val += w; }
                }
            }
            return val;
        },

        /**
         * Creates a proxy element of this element
         * @param {String/Object} config The class name of the proxy element or a DomHelper config object
         * @param {String/HTMLElement} renderTo (optional) The element or element id to render the proxy to (defaults to document.body)
         * @param {Boolean} matchBox (optional) True to align and size the proxy to this element now (defaults to false)
         * @return {Roo.Element} The new proxy element
         */
        createProxy : function(config, renderTo, matchBox){
            if(renderTo){
                renderTo = Roo.getDom(renderTo);
            }else{
                renderTo = document.body;
            }
            config = typeof config == "object" ?
                config : {tag : "div", cls: config};
            var proxy = Roo.DomHelper.append(renderTo, config, true);
            if(matchBox){
               proxy.setBox(this.getBox());
            }
            return proxy;
        },

        /**
         * Puts a mask over this element to disable user interaction. Requires core.css.
         * This method can only be applied to elements which accept child nodes.
         * @param {String} msg (optional) A message to display in the mask
         * @param {String} msgCls (optional) A css class to apply to the msg element - use no-spinner to hide the spinner on bootstrap
         * @return {Element} The mask  element
         */
        mask : function(msg, msgCls)
        {
            if(this.getStyle("position") == "static" && this.dom.tagName !== 'BODY'){
                this.setStyle("position", "relative");
            }
            if(!this._mask){
                this._mask = Roo.DomHelper.append(this.dom, {cls:"roo-el-mask"}, true);
            }
            
            this.addClass("x-masked");
            this._mask.setDisplayed(true);
            
            // we wander
            var z = 0;
            var dom = this.dom;
            while (dom && dom.style) {
                if (!isNaN(parseInt(dom.style.zIndex))) {
                    z = Math.max(z, parseInt(dom.style.zIndex));
                }
                dom = dom.parentNode;
            }
            // if we are masking the body - then it hides everything..
            if (this.dom == document.body) {
                z = 1000000;
                this._mask.setWidth(Roo.lib.Dom.getDocumentWidth());
                this._mask.setHeight(Roo.lib.Dom.getDocumentHeight());
            }
           
            if(typeof msg == 'string'){
                if(!this._maskMsg){
                    this._maskMsg = Roo.DomHelper.append(this.dom, {
                        cls: "roo-el-mask-msg", 
                        cn: [
                            {
                                tag: 'i',
                                cls: 'fa fa-spinner fa-spin'
                            },
                            {
                                tag: 'div'
                            }   
                        ]
                    }, true);
                }
                var mm = this._maskMsg;
                mm.dom.className = msgCls ? "roo-el-mask-msg " + msgCls : "roo-el-mask-msg";
                if (mm.dom.lastChild) { // weird IE issue?
                    mm.dom.lastChild.innerHTML = msg;
                }
                mm.setDisplayed(true);
                mm.center(this);
                mm.setStyle('z-index', z + 102);
            }
            if(Roo.isIE && !(Roo.isIE7 && Roo.isStrict) && this.getStyle('height') == 'auto'){ // ie will not expand full height automatically
                this._mask.setHeight(this.getHeight());
            }
            this._mask.setStyle('z-index', z + 100);
            
            return this._mask;
        },

        /**
         * Removes a previously applied mask. If removeEl is true the mask overlay is destroyed, otherwise
         * it is cached for reuse.
         */
        unmask : function(removeEl){
            if(this._mask){
                if(removeEl === true){
                    this._mask.remove();
                    delete this._mask;
                    if(this._maskMsg){
                        this._maskMsg.remove();
                        delete this._maskMsg;
                    }
                }else{
                    this._mask.setDisplayed(false);
                    if(this._maskMsg){
                        this._maskMsg.setDisplayed(false);
                    }
                }
            }
            this.removeClass("x-masked");
        },

        /**
         * Returns true if this element is masked
         * @return {Boolean}
         */
        isMasked : function(){
            return this._mask && this._mask.isVisible();
        },

        /**
         * Creates an iframe shim for this element to keep selects and other windowed objects from
         * showing through.
         * @return {Roo.Element} The new shim element
         */
        createShim : function(){
            var el = document.createElement('iframe');
            el.frameBorder = 'no';
            el.className = 'roo-shim';
            if(Roo.isIE && Roo.isSecure){
                el.src = Roo.SSL_SECURE_URL;
            }
            var shim = Roo.get(this.dom.parentNode.insertBefore(el, this.dom));
            shim.autoBoxAdjust = false;
            return shim;
        },

        /**
         * Removes this element from the DOM and deletes it from the cache
         */
        remove : function(){
            if(this.dom.parentNode){
                this.dom.parentNode.removeChild(this.dom);
            }
            delete El.cache[this.dom.id];
        },

        /**
         * Sets up event handlers to add and remove a css class when the mouse is over this element
         * @param {String} className
         * @param {Boolean} preventFlicker (optional) If set to true, it prevents flickering by filtering
         * mouseout events for children elements
         * @return {Roo.Element} this
         */
        addClassOnOver : function(className, preventFlicker){
            this.on("mouseover", function(){
                Roo.fly(this, '_internal').addClass(className);
            }, this.dom);
            var removeFn = function(e){
                if(preventFlicker !== true || !e.within(this, true)){
                    Roo.fly(this, '_internal').removeClass(className);
                }
            };
            this.on("mouseout", removeFn, this.dom);
            return this;
        },

        /**
         * Sets up event handlers to add and remove a css class when this element has the focus
         * @param {String} className
         * @return {Roo.Element} this
         */
        addClassOnFocus : function(className){
            this.on("focus", function(){
                Roo.fly(this, '_internal').addClass(className);
            }, this.dom);
            this.on("blur", function(){
                Roo.fly(this, '_internal').removeClass(className);
            }, this.dom);
            return this;
        },
        /**
         * Sets up event handlers to add and remove a css class when the mouse is down and then up on this element (a click effect)
         * @param {String} className
         * @return {Roo.Element} this
         */
        addClassOnClick : function(className){
            var dom = this.dom;
            this.on("mousedown", function(){
                Roo.fly(dom, '_internal').addClass(className);
                var d = Roo.get(document);
                var fn = function(){
                    Roo.fly(dom, '_internal').removeClass(className);
                    d.removeListener("mouseup", fn);
                };
                d.on("mouseup", fn);
            });
            return this;
        },

        /**
         * Stops the specified event from bubbling and optionally prevents the default action
         * @param {String} eventName
         * @param {Boolean} preventDefault (optional) true to prevent the default action too
         * @return {Roo.Element} this
         */
        swallowEvent : function(eventName, preventDefault){
            var fn = function(e){
                e.stopPropagation();
                if(preventDefault){
                    e.preventDefault();
                }
            };
            if(eventName instanceof Array){
                for(var i = 0, len = eventName.length; i < len; i++){
                     this.on(eventName[i], fn);
                }
                return this;
            }
            this.on(eventName, fn);
            return this;
        },

        /**
         * @private
         */
        fitToParentDelegate : Roo.emptyFn, // keep a reference to the fitToParent delegate

        /**
         * Sizes this element to its parent element's dimensions performing
         * neccessary box adjustments.
         * @param {Boolean} monitorResize (optional) If true maintains the fit when the browser window is resized.
         * @param {String/HTMLElment/Element} targetParent (optional) The target parent, default to the parentNode.
         * @return {Roo.Element} this
         */
        fitToParent : function(monitorResize, targetParent) {
          Roo.EventManager.removeResizeListener(this.fitToParentDelegate); // always remove previous fitToParent delegate from onWindowResize
          this.fitToParentDelegate = Roo.emptyFn; // remove reference to previous delegate
          if (monitorResize === true && !this.dom.parentNode) { // check if this Element still exists
            return this;
          }
          var p = Roo.get(targetParent || this.dom.parentNode);
          this.setSize(p.getComputedWidth() - p.getFrameWidth('lr'), p.getComputedHeight() - p.getFrameWidth('tb'));
          if (monitorResize === true) {
            this.fitToParentDelegate = this.fitToParent.createDelegate(this, [true, targetParent]);
            Roo.EventManager.onWindowResize(this.fitToParentDelegate);
          }
          return this;
        },

        /**
         * Gets the next sibling, skipping text nodes
         * @return {HTMLElement} The next sibling or null
         */
        getNextSibling : function(){
            var n = this.dom.nextSibling;
            while(n && n.nodeType != 1){
                n = n.nextSibling;
            }
            return n;
        },

        /**
         * Gets the previous sibling, skipping text nodes
         * @return {HTMLElement} The previous sibling or null
         */
        getPrevSibling : function(){
            var n = this.dom.previousSibling;
            while(n && n.nodeType != 1){
                n = n.previousSibling;
            }
            return n;
        },


        /**
         * Appends the passed element(s) to this element
         * @param {String/HTMLElement/Array/Element/CompositeElement} el
         * @return {Roo.Element} this
         */
        appendChild: function(el){
            el = Roo.get(el);
            el.appendTo(this);
            return this;
        },

        /**
         * Creates the passed DomHelper config and appends it to this element or optionally inserts it before the passed child element.
         * @param {Object} config DomHelper element config object.  If no tag is specified (e.g., {tag:'input'}) then a div will be
         * automatically generated with the specified attributes.
         * @param {HTMLElement} insertBefore (optional) a child element of this element
         * @param {Boolean} returnDom (optional) true to return the dom node instead of creating an Element
         * @return {Roo.Element} The new child element
         */
        createChild: function(config, insertBefore, returnDom){
            config = config || {tag:'div'};
            if(insertBefore){
                return Roo.DomHelper.insertBefore(insertBefore, config, returnDom !== true);
            }
            return Roo.DomHelper[!this.dom.firstChild ? 'overwrite' : 'append'](this.dom, config,  returnDom !== true);
        },

        /**
         * Appends this element to the passed element
         * @param {String/HTMLElement/Element} el The new parent element
         * @return {Roo.Element} this
         */
        appendTo: function(el){
            el = Roo.getDom(el);
            el.appendChild(this.dom);
            return this;
        },

        /**
         * Inserts this element before the passed element in the DOM
         * @param {String/HTMLElement/Element} el The element to insert before
         * @return {Roo.Element} this
         */
        insertBefore: function(el){
            el = Roo.getDom(el);
            el.parentNode.insertBefore(this.dom, el);
            return this;
        },

        /**
         * Inserts this element after the passed element in the DOM
         * @param {String/HTMLElement/Element} el The element to insert after
         * @return {Roo.Element} this
         */
        insertAfter: function(el){
            el = Roo.getDom(el);
            el.parentNode.insertBefore(this.dom, el.nextSibling);
            return this;
        },

        /**
         * Inserts (or creates) an element (or DomHelper config) as the first child of the this element
         * @param {String/HTMLElement/Element/Object} el The id or element to insert or a DomHelper config to create and insert
         * @return {Roo.Element} The new child
         */
        insertFirst: function(el, returnDom){
            el = el || {};
            if(typeof el == 'object' && !el.nodeType){ // dh config
                return this.createChild(el, this.dom.firstChild, returnDom);
            }else{
                el = Roo.getDom(el);
                this.dom.insertBefore(el, this.dom.firstChild);
                return !returnDom ? Roo.get(el) : el;
            }
        },

        /**
         * Inserts (or creates) the passed element (or DomHelper config) as a sibling of this element
         * @param {String/HTMLElement/Element/Object} el The id or element to insert or a DomHelper config to create and insert
         * @param {String} where (optional) 'before' or 'after' defaults to before
         * @param {Boolean} returnDom (optional) True to return the raw DOM element instead of Roo.Element
         * @return {Roo.Element} the inserted Element
         */
        insertSibling: function(el, where, returnDom){
            where = where ? where.toLowerCase() : 'before';
            el = el || {};
            var rt, refNode = where == 'before' ? this.dom : this.dom.nextSibling;

            if(typeof el == 'object' && !el.nodeType){ // dh config
                if(where == 'after' && !this.dom.nextSibling){
                    rt = Roo.DomHelper.append(this.dom.parentNode, el, !returnDom);
                }else{
                    rt = Roo.DomHelper[where == 'after' ? 'insertAfter' : 'insertBefore'](this.dom, el, !returnDom);
                }

            }else{
                rt = this.dom.parentNode.insertBefore(Roo.getDom(el),
                            where == 'before' ? this.dom : this.dom.nextSibling);
                if(!returnDom){
                    rt = Roo.get(rt);
                }
            }
            return rt;
        },

        /**
         * Creates and wraps this element with another element
         * @param {Object} config (optional) DomHelper element config object for the wrapper element or null for an empty div
         * @param {Boolean} returnDom (optional) True to return the raw DOM element instead of Roo.Element
         * @return {HTMLElement/Element} The newly created wrapper element
         */
        wrap: function(config, returnDom){
            if(!config){
                config = {tag: "div"};
            }
            var newEl = Roo.DomHelper.insertBefore(this.dom, config, !returnDom);
            newEl.dom ? newEl.dom.appendChild(this.dom) : newEl.appendChild(this.dom);
            return newEl;
        },

        /**
         * Replaces the passed element with this element
         * @param {String/HTMLElement/Element} el The element to replace
         * @return {Roo.Element} this
         */
        replace: function(el){
            el = Roo.get(el);
            this.insertBefore(el);
            el.remove();
            return this;
        },

        /**
         * Inserts an html fragment into this element
         * @param {String} where Where to insert the html in relation to the this element - beforeBegin, afterBegin, beforeEnd, afterEnd.
         * @param {String} html The HTML fragment
         * @param {Boolean} returnEl True to return an Roo.Element
         * @return {HTMLElement/Roo.Element} The inserted node (or nearest related if more than 1 inserted)
         */
        insertHtml : function(where, html, returnEl){
            var el = Roo.DomHelper.insertHtml(where, this.dom, html);
            return returnEl ? Roo.get(el) : el;
        },

        /**
         * Sets the passed attributes as attributes of this element (a style attribute can be a string, object or function)
         * @param {Object} o The object with the attributes
         * @param {Boolean} useSet (optional) false to override the default setAttribute to use expandos.
         * @return {Roo.Element} this
         */
        set : function(o, useSet){
            var el = this.dom;
            useSet = typeof useSet == 'undefined' ? (el.setAttribute ? true : false) : useSet;
            for(var attr in o){
                if(attr == "style" || typeof o[attr] == "function")  { continue; }
                if(attr=="cls"){
                    el.className = o["cls"];
                }else{
                    if(useSet) {
                        el.setAttribute(attr, o[attr]);
                    } else {
                        el[attr] = o[attr];
                    }
                }
            }
            if(o.style){
                Roo.DomHelper.applyStyles(el, o.style);
            }
            return this;
        },

        /**
         * Convenience method for constructing a KeyMap
         * @param {Number/Array/Object/String} key Either a string with the keys to listen for, the numeric key code, array of key codes or an object with the following options:
         *                                  {key: (number or array), shift: (true/false), ctrl: (true/false), alt: (true/false)}
         * @param {Function} fn The function to call
         * @param {Object} scope (optional) The scope of the function
         * @return {Roo.KeyMap} The KeyMap created
         */
        addKeyListener : function(key, fn, scope){
            var config;
            if(typeof key != "object" || key instanceof Array){
                config = {
                    key: key,
                    fn: fn,
                    scope: scope
                };
            }else{
                config = {
                    key : key.key,
                    shift : key.shift,
                    ctrl : key.ctrl,
                    alt : key.alt,
                    fn: fn,
                    scope: scope
                };
            }
            return new Roo.KeyMap(this, config);
        },

        /**
         * Creates a KeyMap for this element
         * @param {Object} config The KeyMap config. See {@link Roo.KeyMap} for more details
         * @return {Roo.KeyMap} The KeyMap created
         */
        addKeyMap : function(config){
            return new Roo.KeyMap(this, config);
        },

        /**
         * Returns true if this element is scrollable.
         * @return {Boolean}
         */
         isScrollable : function(){
            var dom = this.dom;
            return dom.scrollHeight > dom.clientHeight || dom.scrollWidth > dom.clientWidth;
        },

        /**
         * Scrolls this element the specified scroll point. It does NOT do bounds checking so if you scroll to a weird value it will try to do it. For auto bounds checking, use scroll().
         * @param {String} side Either "left" for scrollLeft values or "top" for scrollTop values.
         * @param {Number} value The new scroll value
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Element} this
         */

        scrollTo : function(side, value, animate){
            var prop = side.toLowerCase() == "left" ? "scrollLeft" : "scrollTop";
            if(!animate || !A){
                this.dom[prop] = value;
            }else{
                var to = prop == "scrollLeft" ? [value, this.dom.scrollTop] : [this.dom.scrollLeft, value];
                this.anim({scroll: {"to": to}}, this.preanim(arguments, 2), 'scroll');
            }
            return this;
        },

        /**
         * Scrolls this element the specified direction. Does bounds checking to make sure the scroll is
         * within this element's scrollable range.
         * @param {String} direction Possible values are: "l","left" - "r","right" - "t","top","up" - "b","bottom","down".
         * @param {Number} distance How far to scroll the element in pixels
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Boolean} Returns true if a scroll was triggered or false if the element
         * was scrolled as far as it could go.
         */
         scroll : function(direction, distance, animate){
             if(!this.isScrollable()){
                 return;
             }
             var el = this.dom;
             var l = el.scrollLeft, t = el.scrollTop;
             var w = el.scrollWidth, h = el.scrollHeight;
             var cw = el.clientWidth, ch = el.clientHeight;
             direction = direction.toLowerCase();
             var scrolled = false;
             var a = this.preanim(arguments, 2);
             switch(direction){
                 case "l":
                 case "left":
                     if(w - l > cw){
                         var v = Math.min(l + distance, w-cw);
                         this.scrollTo("left", v, a);
                         scrolled = true;
                     }
                     break;
                case "r":
                case "right":
                     if(l > 0){
                         var v = Math.max(l - distance, 0);
                         this.scrollTo("left", v, a);
                         scrolled = true;
                     }
                     break;
                case "t":
                case "top":
                case "up":
                     if(t > 0){
                         var v = Math.max(t - distance, 0);
                         this.scrollTo("top", v, a);
                         scrolled = true;
                     }
                     break;
                case "b":
                case "bottom":
                case "down":
                     if(h - t > ch){
                         var v = Math.min(t + distance, h-ch);
                         this.scrollTo("top", v, a);
                         scrolled = true;
                     }
                     break;
             }
             return scrolled;
        },

        /**
         * Translates the passed page coordinates into left/top css values for this element
         * @param {Number/Array} x The page x or an array containing [x, y]
         * @param {Number} y The page y
         * @return {Object} An object with left and top properties. e.g. {left: (value), top: (value)}
         */
        translatePoints : function(x, y){
            if(typeof x == 'object' || x instanceof Array){
                y = x[1]; x = x[0];
            }
            var p = this.getStyle('position');
            var o = this.getXY();

            var l = parseInt(this.getStyle('left'), 10);
            var t = parseInt(this.getStyle('top'), 10);

            if(isNaN(l)){
                l = (p == "relative") ? 0 : this.dom.offsetLeft;
            }
            if(isNaN(t)){
                t = (p == "relative") ? 0 : this.dom.offsetTop;
            }

            return {left: (x - o[0] + l), top: (y - o[1] + t)};
        },

        /**
         * Returns the current scroll position of the element.
         * @return {Object} An object containing the scroll position in the format {left: (scrollLeft), top: (scrollTop)}
         */
        getScroll : function(){
            var d = this.dom, doc = document;
            if(d == doc || d == doc.body){
                var l = window.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft || 0;
                var t = window.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop || 0;
                return {left: l, top: t};
            }else{
                return {left: d.scrollLeft, top: d.scrollTop};
            }
        },

        /**
         * Return the CSS color for the specified CSS attribute. rgb, 3 digit (like #fff) and valid values
         * are convert to standard 6 digit hex color.
         * @param {String} attr The css attribute
         * @param {String} defaultValue The default value to use when a valid color isn't found
         * @param {String} prefix (optional) defaults to #. Use an empty string when working with
         * YUI color anims.
         */
        getColor : function(attr, defaultValue, prefix){
            var v = this.getStyle(attr);
            if(!v || v == "transparent" || v == "inherit") {
                return defaultValue;
            }
            var color = typeof prefix == "undefined" ? "#" : prefix;
            if(v.substr(0, 4) == "rgb("){
                var rvs = v.slice(4, v.length -1).split(",");
                for(var i = 0; i < 3; i++){
                    var h = parseInt(rvs[i]).toString(16);
                    if(h < 16){
                        h = "0" + h;
                    }
                    color += h;
                }
            } else {
                if(v.substr(0, 1) == "#"){
                    if(v.length == 4) {
                        for(var i = 1; i < 4; i++){
                            var c = v.charAt(i);
                            color +=  c + c;
                        }
                    }else if(v.length == 7){
                        color += v.substr(1);
                    }
                }
            }
            return(color.length > 5 ? color.toLowerCase() : defaultValue);
        },

        /**
         * Wraps the specified element with a special markup/CSS block that renders by default as a gray container with a
         * gradient background, rounded corners and a 4-way shadow.
         * @param {String} class (optional) A base CSS class to apply to the containing wrapper element (defaults to 'x-box').
         * Note that there are a number of CSS rules that are dependent on this name to make the overall effect work,
         * so if you supply an alternate base class, make sure you also supply all of the necessary rules.
         * @return {Roo.Element} this
         */
        boxWrap : function(cls){
            cls = cls || 'x-box';
            var el = Roo.get(this.insertHtml('beforeBegin', String.format('<div class="{0}">'+El.boxMarkup+'</div>', cls)));
            el.child('.'+cls+'-mc').dom.appendChild(this.dom);
            return el;
        },

        /**
         * Returns the value of a namespaced attribute from the element's underlying DOM node.
         * @param {String} namespace The namespace in which to look for the attribute
         * @param {String} name The attribute name
         * @return {String} The attribute value
         */
        getAttributeNS : Roo.isIE ? function(ns, name){
            var d = this.dom;
            var type = typeof d[ns+":"+name];
            if(type != 'undefined' && type != 'unknown'){
                return d[ns+":"+name];
            }
            return d[name];
        } : function(ns, name){
            var d = this.dom;
            return d.getAttributeNS(ns, name) || d.getAttribute(ns+":"+name) || d.getAttribute(name) || d[name];
        },
        
        
        /**
         * Sets or Returns the value the dom attribute value
         * @param {String|Object} name The attribute name (or object to set multiple attributes)
         * @param {String} value (optional) The value to set the attribute to
         * @return {String} The attribute value
         */
        attr : function(name){
            if (arguments.length > 1) {
                this.dom.setAttribute(name, arguments[1]);
                return arguments[1];
            }
            if (typeof(name) == 'object') {
                for(var i in name) {
                    this.attr(i, name[i]);
                }
                return name;
            }
            
            
            if (!this.dom.hasAttribute(name)) {
                return undefined;
            }
            return this.dom.getAttribute(name);
        }
        
        
        
    };

    var ep = El.prototype;

    /**
     * Appends an event handler (Shorthand for addListener)
     * @param {String}   eventName     The type of event to append
     * @param {Function} fn        The method the event invokes
     * @param {Object} scope       (optional) The scope (this object) of the fn
     * @param {Object}   options   (optional)An object with standard {@link Roo.EventManager#addListener} options
     * @method
     */
    ep.on = ep.addListener;
        // backwards compat
    ep.mon = ep.addListener;

    /**
     * Removes an event handler from this element (shorthand for removeListener)
     * @param {String} eventName the type of event to remove
     * @param {Function} fn the method the event invokes
     * @return {Roo.Element} this
     * @method
     */
    ep.un = ep.removeListener;

    /**
     * true to automatically adjust width and height settings for box-model issues (default to true)
     */
    ep.autoBoxAdjust = true;

    // private
    El.unitPattern = /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i;

    // private
    El.addUnits = function(v, defaultUnit){
        if(v === "" || v == "auto"){
            return v;
        }
        if(v === undefined){
            return '';
        }
        if(typeof v == "number" || !El.unitPattern.test(v)){
            return v + (defaultUnit || 'px');
        }
        return v;
    };

    // special markup used throughout Roo when box wrapping elements
    El.boxMarkup = '<div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div><div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div><div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>';
    /**
     * Visibility mode constant - Use visibility to hide element
     * @static
     * @type Number
     */
    El.VISIBILITY = 1;
    /**
     * Visibility mode constant - Use display to hide element
     * @static
     * @type Number
     */
    El.DISPLAY = 2;

    El.borders = {l: "border-left-width", r: "border-right-width", t: "border-top-width", b: "border-bottom-width"};
    El.paddings = {l: "padding-left", r: "padding-right", t: "padding-top", b: "padding-bottom"};
    El.margins = {l: "margin-left", r: "margin-right", t: "margin-top", b: "margin-bottom"};



    /**
     * @private
     */
    El.cache = {};

    var docEl;

    /**
     * Static method to retrieve Element objects. Uses simple caching to consistently return the same object.
     * Automatically fixes if an object was recreated with the same id via AJAX or DOM.
     * @param {String/HTMLElement/Element} el The id of the node, a DOM Node or an existing Element.
     * @return {Element} The Element object
     * @static
     */
    El.get = function(el){
        var ex, elm, id;
        if(!el){ return null; }
        if(typeof el == "string"){ // element id
            if(!(elm = document.getElementById(el))){
                return null;
            }
            if(ex = El.cache[el]){
                ex.dom = elm;
            }else{
                ex = El.cache[el] = new El(elm);
            }
            return ex;
        }else if(el.tagName){ // dom element
            if(!(id = el.id)){
                id = Roo.id(el);
            }
            if(ex = El.cache[id]){
                ex.dom = el;
            }else{
                ex = El.cache[id] = new El(el);
            }
            return ex;
        }else if(el instanceof El){
            if(el != docEl){
                el.dom = document.getElementById(el.id) || el.dom; // refresh dom element in case no longer valid,
                                                              // catch case where it hasn't been appended
                El.cache[el.id] = el; // in case it was created directly with Element(), let's cache it
            }
            return el;
        }else if(el.isComposite){
            return el;
        }else if(el instanceof Array){
            return El.select(el);
        }else if(el == document){
            // create a bogus element object representing the document object
            if(!docEl){
                var f = function(){};
                f.prototype = El.prototype;
                docEl = new f();
                docEl.dom = document;
            }
            return docEl;
        }
        return null;
    };

    // private
    El.uncache = function(el){
        for(var i = 0, a = arguments, len = a.length; i < len; i++) {
            if(a[i]){
                delete El.cache[a[i].id || a[i]];
            }
        }
    };

    // private
    // Garbage collection - uncache elements/purge listeners on orphaned elements
    // so we don't hold a reference and cause the browser to retain them
    El.garbageCollect = function(){
        if(!Roo.enableGarbageCollector){
            clearInterval(El.collectorThread);
            return;
        }
        for(var eid in El.cache){
            var el = El.cache[eid], d = el.dom;
            // -------------------------------------------------------
            // Determining what is garbage:
            // -------------------------------------------------------
            // !d
            // dom node is null, definitely garbage
            // -------------------------------------------------------
            // !d.parentNode
            // no parentNode == direct orphan, definitely garbage
            // -------------------------------------------------------
            // !d.offsetParent && !document.getElementById(eid)
            // display none elements have no offsetParent so we will
            // also try to look it up by it's id. However, check
            // offsetParent first so we don't do unneeded lookups.
            // This enables collection of elements that are not orphans
            // directly, but somewhere up the line they have an orphan
            // parent.
            // -------------------------------------------------------
            if(!d || !d.parentNode || (!d.offsetParent && !document.getElementById(eid))){
                delete El.cache[eid];
                if(d && Roo.enableListenerCollection){
                    E.purgeElement(d);
                }
            }
        }
    }
    El.collectorThreadId = setInterval(El.garbageCollect, 30000);


    // dom is optional
    El.Flyweight = function(dom){
        this.dom = dom;
    };
    El.Flyweight.prototype = El.prototype;

    El._flyweights = {};
    /**
     * Gets the globally shared flyweight Element, with the passed node as the active element. Do not store a reference to this element -
     * the dom node can be overwritten by other code.
     * @param {String/HTMLElement} el The dom node or id
     * @param {String} named (optional) Allows for creation of named reusable flyweights to
     *                                  prevent conflicts (e.g. internally Roo uses "_internal")
     * @static
     * @return {Element} The shared Element object
     */
    El.fly = function(el, named){
        named = named || '_global';
        el = Roo.getDom(el);
        if(!el){
            return null;
        }
        if(!El._flyweights[named]){
            El._flyweights[named] = new El.Flyweight();
        }
        El._flyweights[named].dom = el;
        return El._flyweights[named];
    };

    /**
     * Static method to retrieve Element objects. Uses simple caching to consistently return the same object.
     * Automatically fixes if an object was recreated with the same id via AJAX or DOM.
     * Shorthand of {@link Roo.Element#get}
     * @param {String/HTMLElement/Element} el The id of the node, a DOM Node or an existing Element.
     * @return {Element} The Element object
     * @member Roo
     * @method get
     */
    Roo.get = El.get;
    /**
     * Gets the globally shared flyweight Element, with the passed node as the active element. Do not store a reference to this element -
     * the dom node can be overwritten by other code.
     * Shorthand of {@link Roo.Element#fly}
     * @param {String/HTMLElement} el The dom node or id
     * @param {String} named (optional) Allows for creation of named reusable flyweights to
     *                                  prevent conflicts (e.g. internally Roo uses "_internal")
     * @static
     * @return {Element} The shared Element object
     * @member Roo
     * @method fly
     */
    Roo.fly = El.fly;

    // speedy lookup for elements never to box adjust
    var noBoxAdjust = Roo.isStrict ? {
        select:1
    } : {
        input:1, select:1, textarea:1
    };
    if(Roo.isIE || Roo.isGecko){
        noBoxAdjust['button'] = 1;
    }


    Roo.EventManager.on(window, 'unload', function(){
        delete El.cache;
        delete El._flyweights;
    });
})();




if(Roo.DomQuery){
    Roo.Element.selectorFunction = Roo.DomQuery.select;
}

Roo.Element.select = function(selector, unique, root){
    var els;
    if(typeof selector == "string"){
        els = Roo.Element.selectorFunction(selector, root);
    }else if(selector.length !== undefined){
        els = selector;
    }else{
        throw "Invalid selector";
    }
    if(unique === true){
        return new Roo.CompositeElement(els);
    }else{
        return new Roo.CompositeElementLite(els);
    }
};
/**
 * Selects elements based on the passed CSS selector to enable working on them as 1.
 * @param {String/Array} selector The CSS selector or an array of elements
 * @param {Boolean} unique (optional) true to create a unique Roo.Element for each element (defaults to a shared flyweight object)
 * @param {HTMLElement/String} root (optional) The root element of the query or id of the root
 * @return {CompositeElementLite/CompositeElement}
 * @member Roo
 * @method select
 */
Roo.select = Roo.Element.select;














/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */



//Notifies Element that fx methods are available
Roo.enableFx = true;

/**
 * @class Roo.Fx
 * <p>A class to provide basic animation and visual effects support.  <b>Note:</b> This class is automatically applied
 * to the {@link Roo.Element} interface when included, so all effects calls should be performed via Element.
 * Conversely, since the effects are not actually defined in Element, Roo.Fx <b>must</b> be included in order for the 
 * Element effects to work.</p><br/>
 *
 * <p>It is important to note that although the Fx methods and many non-Fx Element methods support "method chaining" in that
 * they return the Element object itself as the method return value, it is not always possible to mix the two in a single
 * method chain.  The Fx methods use an internal effects queue so that each effect can be properly timed and sequenced.
 * Non-Fx methods, on the other hand, have no such internal queueing and will always execute immediately.  For this reason,
 * while it may be possible to mix certain Fx and non-Fx method calls in a single chain, it may not always provide the
 * expected results and should be done with care.</p><br/>
 *
 * <p>Motion effects support 8-way anchoring, meaning that you can choose one of 8 different anchor points on the Element
 * that will serve as either the start or end point of the animation.  Following are all of the supported anchor positions:</p>
<pre>
Value  Description
-----  -----------------------------
tl     The top left corner
t      The center of the top edge
tr     The top right corner
l      The center of the left edge
r      The center of the right edge
bl     The bottom left corner
b      The center of the bottom edge
br     The bottom right corner
</pre>
 * <b>Although some Fx methods accept specific custom config parameters, the ones shown in the Config Options section
 * below are common options that can be passed to any Fx method.</b>
 * @cfg {Function} callback A function called when the effect is finished
 * @cfg {Object} scope The scope of the effect function
 * @cfg {String} easing A valid Easing value for the effect
 * @cfg {String} afterCls A css class to apply after the effect
 * @cfg {Number} duration The length of time (in seconds) that the effect should last
 * @cfg {Boolean} remove Whether the Element should be removed from the DOM and destroyed after the effect finishes
 * @cfg {Boolean} useDisplay Whether to use the <i>display</i> CSS property instead of <i>visibility</i> when hiding Elements (only applies to 
 * effects that end with the element being visually hidden, ignored otherwise)
 * @cfg {String/Object/Function} afterStyle A style specification string, e.g. "width:100px", or an object in the form {width:"100px"}, or
 * a function which returns such a specification that will be applied to the Element after the effect finishes
 * @cfg {Boolean} block Whether the effect should block other effects from queueing while it runs
 * @cfg {Boolean} concurrent Whether to allow subsequently-queued effects to run at the same time as the current effect, or to ensure that they run in sequence
 * @cfg {Boolean} stopFx Whether subsequent effects should be stopped and removed after the current effect finishes
 */
Roo.Fx = {
	/**
	 * Slides the element into view.  An anchor point can be optionally passed to set the point of
	 * origin for the slide effect.  This function automatically handles wrapping the element with
	 * a fixed-size container if needed.  See the Fx class overview for valid anchor point options.
	 * Usage:
	 *<pre><code>
// default: slide the element in from the top
el.slideIn();

// custom: slide the element in from the right with a 2-second duration
el.slideIn('r', { duration: 2 });

// common config options shown with default values
el.slideIn('t', {
    easing: 'easeOut',
    duration: .5
});
</code></pre>
	 * @param {String} anchor (optional) One of the valid Fx anchor positions (defaults to top: 't')
	 * @param {Object} options (optional) Object literal with any of the Fx config options
	 * @return {Roo.Element} The Element
	 */
    slideIn : function(anchor, o){
        var el = this.getFxEl();
        o = o || {};

        el.queueFx(o, function(){

            anchor = anchor || "t";

            // fix display to visibility
            this.fixDisplay();

            // restore values after effect
            var r = this.getFxRestore();
            var b = this.getBox();
            // fixed size for slide
            this.setSize(b);

            // wrap if needed
            var wrap = this.fxWrap(r.pos, o, "hidden");

            var st = this.dom.style;
            st.visibility = "visible";
            st.position = "absolute";

            // clear out temp styles after slide and unwrap
            var after = function(){
                el.fxUnwrap(wrap, r.pos, o);
                st.width = r.width;
                st.height = r.height;
                el.afterFx(o);
            };
            // time to calc the positions
            var a, pt = {to: [b.x, b.y]}, bw = {to: b.width}, bh = {to: b.height};

            switch(anchor.toLowerCase()){
                case "t":
                    wrap.setSize(b.width, 0);
                    st.left = st.bottom = "0";
                    a = {height: bh};
                break;
                case "l":
                    wrap.setSize(0, b.height);
                    st.right = st.top = "0";
                    a = {width: bw};
                break;
                case "r":
                    wrap.setSize(0, b.height);
                    wrap.setX(b.right);
                    st.left = st.top = "0";
                    a = {width: bw, points: pt};
                break;
                case "b":
                    wrap.setSize(b.width, 0);
                    wrap.setY(b.bottom);
                    st.left = st.top = "0";
                    a = {height: bh, points: pt};
                break;
                case "tl":
                    wrap.setSize(0, 0);
                    st.right = st.bottom = "0";
                    a = {width: bw, height: bh};
                break;
                case "bl":
                    wrap.setSize(0, 0);
                    wrap.setY(b.y+b.height);
                    st.right = st.top = "0";
                    a = {width: bw, height: bh, points: pt};
                break;
                case "br":
                    wrap.setSize(0, 0);
                    wrap.setXY([b.right, b.bottom]);
                    st.left = st.top = "0";
                    a = {width: bw, height: bh, points: pt};
                break;
                case "tr":
                    wrap.setSize(0, 0);
                    wrap.setX(b.x+b.width);
                    st.left = st.bottom = "0";
                    a = {width: bw, height: bh, points: pt};
                break;
            }
            this.dom.style.visibility = "visible";
            wrap.show();

            arguments.callee.anim = wrap.fxanim(a,
                o,
                'motion',
                .5,
                'easeOut', after);
        });
        return this;
    },
    
	/**
	 * Slides the element out of view.  An anchor point can be optionally passed to set the end point
	 * for the slide effect.  When the effect is completed, the element will be hidden (visibility = 
	 * 'hidden') but block elements will still take up space in the document.  The element must be removed
	 * from the DOM using the 'remove' config option if desired.  This function automatically handles 
	 * wrapping the element with a fixed-size container if needed.  See the Fx class overview for valid anchor point options.
	 * Usage:
	 *<pre><code>
// default: slide the element out to the top
el.slideOut();

// custom: slide the element out to the right with a 2-second duration
el.slideOut('r', { duration: 2 });

// common config options shown with default values
el.slideOut('t', {
    easing: 'easeOut',
    duration: .5,
    remove: false,
    useDisplay: false
});
</code></pre>
	 * @param {String} anchor (optional) One of the valid Fx anchor positions (defaults to top: 't')
	 * @param {Object} options (optional) Object literal with any of the Fx config options
	 * @return {Roo.Element} The Element
	 */
    slideOut : function(anchor, o){
        var el = this.getFxEl();
        o = o || {};

        el.queueFx(o, function(){

            anchor = anchor || "t";

            // restore values after effect
            var r = this.getFxRestore();
            
            var b = this.getBox();
            // fixed size for slide
            this.setSize(b);

            // wrap if needed
            var wrap = this.fxWrap(r.pos, o, "visible");

            var st = this.dom.style;
            st.visibility = "visible";
            st.position = "absolute";

            wrap.setSize(b);

            var after = function(){
                if(o.useDisplay){
                    el.setDisplayed(false);
                }else{
                    el.hide();
                }

                el.fxUnwrap(wrap, r.pos, o);

                st.width = r.width;
                st.height = r.height;

                el.afterFx(o);
            };

            var a, zero = {to: 0};
            switch(anchor.toLowerCase()){
                case "t":
                    st.left = st.bottom = "0";
                    a = {height: zero};
                break;
                case "l":
                    st.right = st.top = "0";
                    a = {width: zero};
                break;
                case "r":
                    st.left = st.top = "0";
                    a = {width: zero, points: {to:[b.right, b.y]}};
                break;
                case "b":
                    st.left = st.top = "0";
                    a = {height: zero, points: {to:[b.x, b.bottom]}};
                break;
                case "tl":
                    st.right = st.bottom = "0";
                    a = {width: zero, height: zero};
                break;
                case "bl":
                    st.right = st.top = "0";
                    a = {width: zero, height: zero, points: {to:[b.x, b.bottom]}};
                break;
                case "br":
                    st.left = st.top = "0";
                    a = {width: zero, height: zero, points: {to:[b.x+b.width, b.bottom]}};
                break;
                case "tr":
                    st.left = st.bottom = "0";
                    a = {width: zero, height: zero, points: {to:[b.right, b.y]}};
                break;
            }

            arguments.callee.anim = wrap.fxanim(a,
                o,
                'motion',
                .5,
                "easeOut", after);
        });
        return this;
    },

	/**
	 * Fades the element out while slowly expanding it in all directions.  When the effect is completed, the 
	 * element will be hidden (visibility = 'hidden') but block elements will still take up space in the document. 
	 * The element must be removed from the DOM using the 'remove' config option if desired.
	 * Usage:
	 *<pre><code>
// default
el.puff();

// common config options shown with default values
el.puff({
    easing: 'easeOut',
    duration: .5,
    remove: false,
    useDisplay: false
});
</code></pre>
	 * @param {Object} options (optional) Object literal with any of the Fx config options
	 * @return {Roo.Element} The Element
	 */
    puff : function(o){
        var el = this.getFxEl();
        o = o || {};

        el.queueFx(o, function(){
            this.clearOpacity();
            this.show();

            // restore values after effect
            var r = this.getFxRestore();
            var st = this.dom.style;

            var after = function(){
                if(o.useDisplay){
                    el.setDisplayed(false);
                }else{
                    el.hide();
                }

                el.clearOpacity();

                el.setPositioning(r.pos);
                st.width = r.width;
                st.height = r.height;
                st.fontSize = '';
                el.afterFx(o);
            };

            var width = this.getWidth();
            var height = this.getHeight();

            arguments.callee.anim = this.fxanim({
                    width : {to: this.adjustWidth(width * 2)},
                    height : {to: this.adjustHeight(height * 2)},
                    points : {by: [-(width * .5), -(height * .5)]},
                    opacity : {to: 0},
                    fontSize: {to:200, unit: "%"}
                },
                o,
                'motion',
                .5,
                "easeOut", after);
        });
        return this;
    },

	/**
	 * Blinks the element as if it was clicked and then collapses on its center (similar to switching off a television).
	 * When the effect is completed, the element will be hidden (visibility = 'hidden') but block elements will still 
	 * take up space in the document. The element must be removed from the DOM using the 'remove' config option if desired.
	 * Usage:
	 *<pre><code>
// default
el.switchOff();

// all config options shown with default values
el.switchOff({
    easing: 'easeIn',
    duration: .3,
    remove: false,
    useDisplay: false
});
</code></pre>
	 * @param {Object} options (optional) Object literal with any of the Fx config options
	 * @return {Roo.Element} The Element
	 */
    switchOff : function(o){
        var el = this.getFxEl();
        o = o || {};

        el.queueFx(o, function(){
            this.clearOpacity();
            this.clip();

            // restore values after effect
            var r = this.getFxRestore();
            var st = this.dom.style;

            var after = function(){
                if(o.useDisplay){
                    el.setDisplayed(false);
                }else{
                    el.hide();
                }

                el.clearOpacity();
                el.setPositioning(r.pos);
                st.width = r.width;
                st.height = r.height;

                el.afterFx(o);
            };

            this.fxanim({opacity:{to:0.3}}, null, null, .1, null, function(){
                this.clearOpacity();
                (function(){
                    this.fxanim({
                        height:{to:1},
                        points:{by:[0, this.getHeight() * .5]}
                    }, o, 'motion', 0.3, 'easeIn', after);
                }).defer(100, this);
            });
        });
        return this;
    },

    /**
     * Highlights the Element by setting a color (applies to the background-color by default, but can be
     * changed using the "attr" config option) and then fading back to the original color. If no original
     * color is available, you should provide the "endColor" config option which will be cleared after the animation.
     * Usage:
<pre><code>
// default: highlight background to yellow
el.highlight();

// custom: highlight foreground text to blue for 2 seconds
el.highlight("0000ff", { attr: 'color', duration: 2 });

// common config options shown with default values
el.highlight("ffff9c", {
    attr: "background-color", //can be any valid CSS property (attribute) that supports a color value
    endColor: (current color) or "ffffff",
    easing: 'easeIn',
    duration: 1
});
</code></pre>
     * @param {String} color (optional) The highlight color. Should be a 6 char hex color without the leading # (defaults to yellow: 'ffff9c')
     * @param {Object} options (optional) Object literal with any of the Fx config options
     * @return {Roo.Element} The Element
     */	
    highlight : function(color, o){
        var el = this.getFxEl();
        o = o || {};

        el.queueFx(o, function(){
            color = color || "ffff9c";
            attr = o.attr || "backgroundColor";

            this.clearOpacity();
            this.show();

            var origColor = this.getColor(attr);
            var restoreColor = this.dom.style[attr];
            endColor = (o.endColor || origColor) || "ffffff";

            var after = function(){
                el.dom.style[attr] = restoreColor;
                el.afterFx(o);
            };

            var a = {};
            a[attr] = {from: color, to: endColor};
            arguments.callee.anim = this.fxanim(a,
                o,
                'color',
                1,
                'easeIn', after);
        });
        return this;
    },

   /**
    * Shows a ripple of exploding, attenuating borders to draw attention to an Element.
    * Usage:
<pre><code>
// default: a single light blue ripple
el.frame();

// custom: 3 red ripples lasting 3 seconds total
el.frame("ff0000", 3, { duration: 3 });

// common config options shown with default values
el.frame("C3DAF9", 1, {
    duration: 1 //duration of entire animation (not each individual ripple)
    // Note: Easing is not configurable and will be ignored if included
});
</code></pre>
    * @param {String} color (optional) The color of the border.  Should be a 6 char hex color without the leading # (defaults to light blue: 'C3DAF9').
    * @param {Number} count (optional) The number of ripples to display (defaults to 1)
    * @param {Object} options (optional) Object literal with any of the Fx config options
    * @return {Roo.Element} The Element
    */
    frame : function(color, count, o){
        var el = this.getFxEl();
        o = o || {};

        el.queueFx(o, function(){
            color = color || "#C3DAF9";
            if(color.length == 6){
                color = "#" + color;
            }
            count = count || 1;
            duration = o.duration || 1;
            this.show();

            var b = this.getBox();
            var animFn = function(){
                var proxy = this.createProxy({

                     style:{
                        visbility:"hidden",
                        position:"absolute",
                        "z-index":"35000", // yee haw
                        border:"0px solid " + color
                     }
                  });
                var scale = Roo.isBorderBox ? 2 : 1;
                proxy.animate({
                    top:{from:b.y, to:b.y - 20},
                    left:{from:b.x, to:b.x - 20},
                    borderWidth:{from:0, to:10},
                    opacity:{from:1, to:0},
                    height:{from:b.height, to:(b.height + (20*scale))},
                    width:{from:b.width, to:(b.width + (20*scale))}
                }, duration, function(){
                    proxy.remove();
                });
                if(--count > 0){
                     animFn.defer((duration/2)*1000, this);
                }else{
                    el.afterFx(o);
                }
            };
            animFn.call(this);
        });
        return this;
    },

   /**
    * Creates a pause before any subsequent queued effects begin.  If there are
    * no effects queued after the pause it will have no effect.
    * Usage:
<pre><code>
el.pause(1);
</code></pre>
    * @param {Number} seconds The length of time to pause (in seconds)
    * @return {Roo.Element} The Element
    */
    pause : function(seconds){
        var el = this.getFxEl();
        var o = {};

        el.queueFx(o, function(){
            setTimeout(function(){
                el.afterFx(o);
            }, seconds * 1000);
        });
        return this;
    },

   /**
    * Fade an element in (from transparent to opaque).  The ending opacity can be specified
    * using the "endOpacity" config option.
    * Usage:
<pre><code>
// default: fade in from opacity 0 to 100%
el.fadeIn();

// custom: fade in from opacity 0 to 75% over 2 seconds
el.fadeIn({ endOpacity: .75, duration: 2});

// common config options shown with default values
el.fadeIn({
    endOpacity: 1, //can be any value between 0 and 1 (e.g. .5)
    easing: 'easeOut',
    duration: .5
});
</code></pre>
    * @param {Object} options (optional) Object literal with any of the Fx config options
    * @return {Roo.Element} The Element
    */
    fadeIn : function(o){
        var el = this.getFxEl();
        o = o || {};
        el.queueFx(o, function(){
            this.setOpacity(0);
            this.fixDisplay();
            this.dom.style.visibility = 'visible';
            var to = o.endOpacity || 1;
            arguments.callee.anim = this.fxanim({opacity:{to:to}},
                o, null, .5, "easeOut", function(){
                if(to == 1){
                    this.clearOpacity();
                }
                el.afterFx(o);
            });
        });
        return this;
    },

   /**
    * Fade an element out (from opaque to transparent).  The ending opacity can be specified
    * using the "endOpacity" config option.
    * Usage:
<pre><code>
// default: fade out from the element's current opacity to 0
el.fadeOut();

// custom: fade out from the element's current opacity to 25% over 2 seconds
el.fadeOut({ endOpacity: .25, duration: 2});

// common config options shown with default values
el.fadeOut({
    endOpacity: 0, //can be any value between 0 and 1 (e.g. .5)
    easing: 'easeOut',
    duration: .5
    remove: false,
    useDisplay: false
});
</code></pre>
    * @param {Object} options (optional) Object literal with any of the Fx config options
    * @return {Roo.Element} The Element
    */
    fadeOut : function(o){
        var el = this.getFxEl();
        o = o || {};
        el.queueFx(o, function(){
            arguments.callee.anim = this.fxanim({opacity:{to:o.endOpacity || 0}},
                o, null, .5, "easeOut", function(){
                if(this.visibilityMode == Roo.Element.DISPLAY || o.useDisplay){
                     this.dom.style.display = "none";
                }else{
                     this.dom.style.visibility = "hidden";
                }
                this.clearOpacity();
                el.afterFx(o);
            });
        });
        return this;
    },

   /**
    * Animates the transition of an element's dimensions from a starting height/width
    * to an ending height/width.
    * Usage:
<pre><code>
// change height and width to 100x100 pixels
el.scale(100, 100);

// common config options shown with default values.  The height and width will default to
// the element's existing values if passed as null.
el.scale(
    [element's width],
    [element's height], {
    easing: 'easeOut',
    duration: .35
});
</code></pre>
    * @param {Number} width  The new width (pass undefined to keep the original width)
    * @param {Number} height  The new height (pass undefined to keep the original height)
    * @param {Object} options (optional) Object literal with any of the Fx config options
    * @return {Roo.Element} The Element
    */
    scale : function(w, h, o){
        this.shift(Roo.apply({}, o, {
            width: w,
            height: h
        }));
        return this;
    },

   /**
    * Animates the transition of any combination of an element's dimensions, xy position and/or opacity.
    * Any of these properties not specified in the config object will not be changed.  This effect 
    * requires that at least one new dimension, position or opacity setting must be passed in on
    * the config object in order for the function to have any effect.
    * Usage:
<pre><code>
// slide the element horizontally to x position 200 while changing the height and opacity
el.shift({ x: 200, height: 50, opacity: .8 });

// common config options shown with default values.
el.shift({
    width: [element's width],
    height: [element's height],
    x: [element's x position],
    y: [element's y position],
    opacity: [element's opacity],
    easing: 'easeOut',
    duration: .35
});
</code></pre>
    * @param {Object} options  Object literal with any of the Fx config options
    * @return {Roo.Element} The Element
    */
    shift : function(o){
        var el = this.getFxEl();
        o = o || {};
        el.queueFx(o, function(){
            var a = {}, w = o.width, h = o.height, x = o.x, y = o.y,  op = o.opacity;
            if(w !== undefined){
                a.width = {to: this.adjustWidth(w)};
            }
            if(h !== undefined){
                a.height = {to: this.adjustHeight(h)};
            }
            if(x !== undefined || y !== undefined){
                a.points = {to: [
                    x !== undefined ? x : this.getX(),
                    y !== undefined ? y : this.getY()
                ]};
            }
            if(op !== undefined){
                a.opacity = {to: op};
            }
            if(o.xy !== undefined){
                a.points = {to: o.xy};
            }
            arguments.callee.anim = this.fxanim(a,
                o, 'motion', .35, "easeOut", function(){
                el.afterFx(o);
            });
        });
        return this;
    },

	/**
	 * Slides the element while fading it out of view.  An anchor point can be optionally passed to set the 
	 * ending point of the effect.
	 * Usage:
	 *<pre><code>
// default: slide the element downward while fading out
el.ghost();

// custom: slide the element out to the right with a 2-second duration
el.ghost('r', { duration: 2 });

// common config options shown with default values
el.ghost('b', {
    easing: 'easeOut',
    duration: .5
    remove: false,
    useDisplay: false
});
</code></pre>
	 * @param {String} anchor (optional) One of the valid Fx anchor positions (defaults to bottom: 'b')
	 * @param {Object} options (optional) Object literal with any of the Fx config options
	 * @return {Roo.Element} The Element
	 */
    ghost : function(anchor, o){
        var el = this.getFxEl();
        o = o || {};

        el.queueFx(o, function(){
            anchor = anchor || "b";

            // restore values after effect
            var r = this.getFxRestore();
            var w = this.getWidth(),
                h = this.getHeight();

            var st = this.dom.style;

            var after = function(){
                if(o.useDisplay){
                    el.setDisplayed(false);
                }else{
                    el.hide();
                }

                el.clearOpacity();
                el.setPositioning(r.pos);
                st.width = r.width;
                st.height = r.height;

                el.afterFx(o);
            };

            var a = {opacity: {to: 0}, points: {}}, pt = a.points;
            switch(anchor.toLowerCase()){
                case "t":
                    pt.by = [0, -h];
                break;
                case "l":
                    pt.by = [-w, 0];
                break;
                case "r":
                    pt.by = [w, 0];
                break;
                case "b":
                    pt.by = [0, h];
                break;
                case "tl":
                    pt.by = [-w, -h];
                break;
                case "bl":
                    pt.by = [-w, h];
                break;
                case "br":
                    pt.by = [w, h];
                break;
                case "tr":
                    pt.by = [w, -h];
                break;
            }

            arguments.callee.anim = this.fxanim(a,
                o,
                'motion',
                .5,
                "easeOut", after);
        });
        return this;
    },

	/**
	 * Ensures that all effects queued after syncFx is called on the element are
	 * run concurrently.  This is the opposite of {@link #sequenceFx}.
	 * @return {Roo.Element} The Element
	 */
    syncFx : function(){
        this.fxDefaults = Roo.apply(this.fxDefaults || {}, {
            block : false,
            concurrent : true,
            stopFx : false
        });
        return this;
    },

	/**
	 * Ensures that all effects queued after sequenceFx is called on the element are
	 * run in sequence.  This is the opposite of {@link #syncFx}.
	 * @return {Roo.Element} The Element
	 */
    sequenceFx : function(){
        this.fxDefaults = Roo.apply(this.fxDefaults || {}, {
            block : false,
            concurrent : false,
            stopFx : false
        });
        return this;
    },

	/* @private */
    nextFx : function(){
        var ef = this.fxQueue[0];
        if(ef){
            ef.call(this);
        }
    },

	/**
	 * Returns true if the element has any effects actively running or queued, else returns false.
	 * @return {Boolean} True if element has active effects, else false
	 */
    hasActiveFx : function(){
        return this.fxQueue && this.fxQueue[0];
    },

	/**
	 * Stops any running effects and clears the element's internal effects queue if it contains
	 * any additional effects that haven't started yet.
	 * @return {Roo.Element} The Element
	 */
    stopFx : function(){
        if(this.hasActiveFx()){
            var cur = this.fxQueue[0];
            if(cur && cur.anim && cur.anim.isAnimated()){
                this.fxQueue = [cur]; // clear out others
                cur.anim.stop(true);
            }
        }
        return this;
    },

	/* @private */
    beforeFx : function(o){
        if(this.hasActiveFx() && !o.concurrent){
           if(o.stopFx){
               this.stopFx();
               return true;
           }
           return false;
        }
        return true;
    },

	/**
	 * Returns true if the element is currently blocking so that no other effect can be queued
	 * until this effect is finished, else returns false if blocking is not set.  This is commonly
	 * used to ensure that an effect initiated by a user action runs to completion prior to the
	 * same effect being restarted (e.g., firing only one effect even if the user clicks several times).
	 * @return {Boolean} True if blocking, else false
	 */
    hasFxBlock : function(){
        var q = this.fxQueue;
        return q && q[0] && q[0].block;
    },

	/* @private */
    queueFx : function(o, fn){
        if(!this.fxQueue){
            this.fxQueue = [];
        }
        if(!this.hasFxBlock()){
            Roo.applyIf(o, this.fxDefaults);
            if(!o.concurrent){
                var run = this.beforeFx(o);
                fn.block = o.block;
                this.fxQueue.push(fn);
                if(run){
                    this.nextFx();
                }
            }else{
                fn.call(this);
            }
        }
        return this;
    },

	/* @private */
    fxWrap : function(pos, o, vis){
        var wrap;
        if(!o.wrap || !(wrap = Roo.get(o.wrap))){
            var wrapXY;
            if(o.fixPosition){
                wrapXY = this.getXY();
            }
            var div = document.createElement("div");
            div.style.visibility = vis;
            wrap = Roo.get(this.dom.parentNode.insertBefore(div, this.dom));
            wrap.setPositioning(pos);
            if(wrap.getStyle("position") == "static"){
                wrap.position("relative");
            }
            this.clearPositioning('auto');
            wrap.clip();
            wrap.dom.appendChild(this.dom);
            if(wrapXY){
                wrap.setXY(wrapXY);
            }
        }
        return wrap;
    },

	/* @private */
    fxUnwrap : function(wrap, pos, o){
        this.clearPositioning();
        this.setPositioning(pos);
        if(!o.wrap){
            wrap.dom.parentNode.insertBefore(this.dom, wrap.dom);
            wrap.remove();
        }
    },

	/* @private */
    getFxRestore : function(){
        var st = this.dom.style;
        return {pos: this.getPositioning(), width: st.width, height : st.height};
    },

	/* @private */
    afterFx : function(o){
        if(o.afterStyle){
            this.applyStyles(o.afterStyle);
        }
        if(o.afterCls){
            this.addClass(o.afterCls);
        }
        if(o.remove === true){
            this.remove();
        }
        Roo.callback(o.callback, o.scope, [this]);
        if(!o.concurrent){
            this.fxQueue.shift();
            this.nextFx();
        }
    },

	/* @private */
    getFxEl : function(){ // support for composite element fx
        return Roo.get(this.dom);
    },

	/* @private */
    fxanim : function(args, opt, animType, defaultDur, defaultEase, cb){
        animType = animType || 'run';
        opt = opt || {};
        var anim = Roo.lib.Anim[animType](
            this.dom, args,
            (opt.duration || defaultDur) || .35,
            (opt.easing || defaultEase) || 'easeOut',
            function(){
                Roo.callback(cb, this);
            },
            this
        );
        opt.anim = anim;
        return anim;
    }
};

// backwords compat
Roo.Fx.resize = Roo.Fx.scale;

//When included, Roo.Fx is automatically applied to Element so that all basic
//effects are available directly via the Element API
Roo.apply(Roo.Element.prototype, Roo.Fx);/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */


/**
 * @class Roo.CompositeElement
 * Standard composite class. Creates a Roo.Element for every element in the collection.
 * <br><br>
 * <b>NOTE: Although they are not listed, this class supports all of the set/update methods of Roo.Element. All Roo.Element
 * actions will be performed on all the elements in this collection.</b>
 * <br><br>
 * All methods return <i>this</i> and can be chained.
 <pre><code>
 var els = Roo.select("#some-el div.some-class", true);
 // or select directly from an existing element
 var el = Roo.get('some-el');
 el.select('div.some-class', true);

 els.setWidth(100); // all elements become 100 width
 els.hide(true); // all elements fade out and hide
 // or
 els.setWidth(100).hide(true);
 </code></pre>
 */
Roo.CompositeElement = function(els){
    this.elements = [];
    this.addElements(els);
};
Roo.CompositeElement.prototype = {
    isComposite: true,
    addElements : function(els){
        if(!els) {
            return this;
        }
        if(typeof els == "string"){
            els = Roo.Element.selectorFunction(els);
        }
        var yels = this.elements;
        var index = yels.length-1;
        for(var i = 0, len = els.length; i < len; i++) {
        	yels[++index] = Roo.get(els[i]);
        }
        return this;
    },

    /**
    * Clears this composite and adds the elements returned by the passed selector.
    * @param {String/Array} els A string CSS selector, an array of elements or an element
    * @return {CompositeElement} this
    */
    fill : function(els){
        this.elements = [];
        this.add(els);
        return this;
    },

    /**
    * Filters this composite to only elements that match the passed selector.
    * @param {String} selector A string CSS selector
    * @param {Boolean} inverse return inverse filter (not matches)
    * @return {CompositeElement} this
    */
    filter : function(selector, inverse){
        var els = [];
        inverse = inverse || false;
        this.each(function(el){
            var match = inverse ? !el.is(selector) : el.is(selector);
            if(match){
                els[els.length] = el.dom;
            }
        });
        this.fill(els);
        return this;
    },

    invoke : function(fn, args){
        var els = this.elements;
        for(var i = 0, len = els.length; i < len; i++) {
        	Roo.Element.prototype[fn].apply(els[i], args);
        }
        return this;
    },
    /**
    * Adds elements to this composite.
    * @param {String/Array} els A string CSS selector, an array of elements or an element
    * @return {CompositeElement} this
    */
    add : function(els){
        if(typeof els == "string"){
            this.addElements(Roo.Element.selectorFunction(els));
        }else if(els.length !== undefined){
            this.addElements(els);
        }else{
            this.addElements([els]);
        }
        return this;
    },
    /**
    * Calls the passed function passing (el, this, index) for each element in this composite.
    * @param {Function} fn The function to call
    * @param {Object} scope (optional) The <i>this</i> object (defaults to the element)
    * @return {CompositeElement} this
    */
    each : function(fn, scope){
        var els = this.elements;
        for(var i = 0, len = els.length; i < len; i++){
            if(fn.call(scope || els[i], els[i], this, i) === false) {
                break;
            }
        }
        return this;
    },

    /**
     * Returns the Element object at the specified index
     * @param {Number} index
     * @return {Roo.Element}
     */
    item : function(index){
        return this.elements[index] || null;
    },

    /**
     * Returns the first Element
     * @return {Roo.Element}
     */
    first : function(){
        return this.item(0);
    },

    /**
     * Returns the last Element
     * @return {Roo.Element}
     */
    last : function(){
        return this.item(this.elements.length-1);
    },

    /**
     * Returns the number of elements in this composite
     * @return Number
     */
    getCount : function(){
        return this.elements.length;
    },

    /**
     * Returns true if this composite contains the passed element
     * @return Boolean
     */
    contains : function(el){
        return this.indexOf(el) !== -1;
    },

    /**
     * Returns true if this composite contains the passed element
     * @return Boolean
     */
    indexOf : function(el){
        return this.elements.indexOf(Roo.get(el));
    },


    /**
    * Removes the specified element(s).
    * @param {Mixed} el The id of an element, the Element itself, the index of the element in this composite
    * or an array of any of those.
    * @param {Boolean} removeDom (optional) True to also remove the element from the document
    * @return {CompositeElement} this
    */
    removeElement : function(el, removeDom){
        if(el instanceof Array){
            for(var i = 0, len = el.length; i < len; i++){
                this.removeElement(el[i]);
            }
            return this;
        }
        var index = typeof el == 'number' ? el : this.indexOf(el);
        if(index !== -1){
            if(removeDom){
                var d = this.elements[index];
                if(d.dom){
                    d.remove();
                }else{
                    d.parentNode.removeChild(d);
                }
            }
            this.elements.splice(index, 1);
        }
        return this;
    },

    /**
    * Replaces the specified element with the passed element.
    * @param {String/HTMLElement/Element/Number} el The id of an element, the Element itself, the index of the element in this composite
    * to replace.
    * @param {String/HTMLElement/Element} replacement The id of an element or the Element itself.
    * @param {Boolean} domReplace (Optional) True to remove and replace the element in the document too.
    * @return {CompositeElement} this
    */
    replaceElement : function(el, replacement, domReplace){
        var index = typeof el == 'number' ? el : this.indexOf(el);
        if(index !== -1){
            if(domReplace){
                this.elements[index].replaceWith(replacement);
            }else{
                this.elements.splice(index, 1, Roo.get(replacement))
            }
        }
        return this;
    },

    /**
     * Removes all elements.
     */
    clear : function(){
        this.elements = [];
    }
};
(function(){
    Roo.CompositeElement.createCall = function(proto, fnName){
        if(!proto[fnName]){
            proto[fnName] = function(){
                return this.invoke(fnName, arguments);
            };
        }
    };
    for(var fnName in Roo.Element.prototype){
        if(typeof Roo.Element.prototype[fnName] == "function"){
            Roo.CompositeElement.createCall(Roo.CompositeElement.prototype, fnName);
        }
    };
})();
/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

/**
 * @class Roo.CompositeElementLite
 * @extends Roo.CompositeElement
 * Flyweight composite class. Reuses the same Roo.Element for element operations.
 <pre><code>
 var els = Roo.select("#some-el div.some-class");
 // or select directly from an existing element
 var el = Roo.get('some-el');
 el.select('div.some-class');

 els.setWidth(100); // all elements become 100 width
 els.hide(true); // all elements fade out and hide
 // or
 els.setWidth(100).hide(true);
 </code></pre><br><br>
 * <b>NOTE: Although they are not listed, this class supports all of the set/update methods of Roo.Element. All Roo.Element
 * actions will be performed on all the elements in this collection.</b>
 */
Roo.CompositeElementLite = function(els){
    Roo.CompositeElementLite.superclass.constructor.call(this, els);
    this.el = new Roo.Element.Flyweight();
};
Roo.extend(Roo.CompositeElementLite, Roo.CompositeElement, {
    addElements : function(els){
        if(els){
            if(els instanceof Array){
                this.elements = this.elements.concat(els);
            }else{
                var yels = this.elements;
                var index = yels.length-1;
                for(var i = 0, len = els.length; i < len; i++) {
                    yels[++index] = els[i];
                }
            }
        }
        return this;
    },
    invoke : function(fn, args){
        var els = this.elements;
        var el = this.el;
        for(var i = 0, len = els.length; i < len; i++) {
            el.dom = els[i];
        	Roo.Element.prototype[fn].apply(el, args);
        }
        return this;
    },
    /**
     * Returns a flyweight Element of the dom element object at the specified index
     * @param {Number} index
     * @return {Roo.Element}
     */
    item : function(index){
        if(!this.elements[index]){
            return null;
        }
        this.el.dom = this.elements[index];
        return this.el;
    },

    // fixes scope with flyweight
    addListener : function(eventName, handler, scope, opt){
        var els = this.elements;
        for(var i = 0, len = els.length; i < len; i++) {
            Roo.EventManager.on(els[i], eventName, handler, scope || els[i], opt);
        }
        return this;
    },

    /**
    * Calls the passed function passing (el, this, index) for each element in this composite. <b>The element
    * passed is the flyweight (shared) Roo.Element instance, so if you require a
    * a reference to the dom node, use el.dom.</b>
    * @param {Function} fn The function to call
    * @param {Object} scope (optional) The <i>this</i> object (defaults to the element)
    * @return {CompositeElement} this
    */
    each : function(fn, scope){
        var els = this.elements;
        var el = this.el;
        for(var i = 0, len = els.length; i < len; i++){
            el.dom = els[i];
        	if(fn.call(scope || el, el, this, i) === false){
                break;
            }
        }
        return this;
    },

    indexOf : function(el){
        return this.elements.indexOf(Roo.getDom(el));
    },

    replaceElement : function(el, replacement, domReplace){
        var index = typeof el == 'number' ? el : this.indexOf(el);
        if(index !== -1){
            replacement = Roo.getDom(replacement);
            if(domReplace){
                var d = this.elements[index];
                d.parentNode.insertBefore(replacement, d);
                d.parentNode.removeChild(d);
            }
            this.elements.splice(index, 1, replacement);
        }
        return this;
    }
});
Roo.CompositeElementLite.prototype.on = Roo.CompositeElementLite.prototype.addListener;

/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

 

/**
 * @class Roo.data.Connection
 * @extends Roo.util.Observable
 * The class encapsulates a connection to the page's originating domain, allowing requests to be made
 * either to a configured URL, or to a URL specified at request time. 
 * 
 * Requests made by this class are asynchronous, and will return immediately. No data from
 * the server will be available to the statement immediately following the {@link #request} call.
 * To process returned data, use a callback in the request options object, or an event listener.
 * 
 * Note: If you are doing a file upload, you will not get a normal response object sent back to
 * your callback or event handler.  Since the upload is handled via in IFRAME, there is no XMLHttpRequest.
 * The response object is created using the innerHTML of the IFRAME's document as the responseText
 * property and, if present, the IFRAME's XML document as the responseXML property.
 * 
 * This means that a valid XML or HTML document must be returned. If JSON data is required, it is suggested
 * that it be placed either inside a &lt;textarea> in an HTML document and retrieved from the responseText
 * using a regex, or inside a CDATA section in an XML document and retrieved from the responseXML using
 * standard DOM methods.
 * @constructor
 * @param {Object} config a configuration object.
 */
Roo.data.Connection = function(config){
    Roo.apply(this, config);
    this.addEvents({
        /**
         * @event beforerequest
         * Fires before a network request is made to retrieve a data object.
         * @param {Connection} conn This Connection object.
         * @param {Object} options The options config object passed to the {@link #request} method.
         */
        "beforerequest" : true,
        /**
         * @event requestcomplete
         * Fires if the request was successfully completed.
         * @param {Connection} conn This Connection object.
         * @param {Object} response The XHR object containing the response data.
         * See {@link http://www.w3.org/TR/XMLHttpRequest/} for details.
         * @param {Object} options The options config object passed to the {@link #request} method.
         */
        "requestcomplete" : true,
        /**
         * @event requestexception
         * Fires if an error HTTP status was returned from the server.
         * See {@link http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html} for details of HTTP status codes.
         * @param {Connection} conn This Connection object.
         * @param {Object} response The XHR object containing the response data.
         * See {@link http://www.w3.org/TR/XMLHttpRequest/} for details.
         * @param {Object} options The options config object passed to the {@link #request} method.
         */
        "requestexception" : true
    });
    Roo.data.Connection.superclass.constructor.call(this);
};

Roo.extend(Roo.data.Connection, Roo.util.Observable, {
    /**
     * @cfg {String} url (Optional) The default URL to be used for requests to the server. (defaults to undefined)
     */
    /**
     * @cfg {Object} extraParams (Optional) An object containing properties which are used as
     * extra parameters to each request made by this object. (defaults to undefined)
     */
    /**
     * @cfg {Object} defaultHeaders (Optional) An object containing request headers which are added
     *  to each request made by this object. (defaults to undefined)
     */
    /**
     * @cfg {String} method (Optional) The default HTTP method to be used for requests. (defaults to undefined; if not set but parms are present will use POST, otherwise GET)
     */
    /**
     * @cfg {Number} timeout (Optional) The timeout in milliseconds to be used for requests. (defaults to 30000)
     */
    timeout : 30000,
    /**
     * @cfg {Boolean} autoAbort (Optional) Whether this request should abort any pending requests. (defaults to false)
     * @type Boolean
     */
    autoAbort:false,

    /**
     * @cfg {Boolean} disableCaching (Optional) True to add a unique cache-buster param to GET requests. (defaults to true)
     * @type Boolean
     */
    disableCaching: true,

    /**
     * Sends an HTTP request to a remote server.
     * @param {Object} options An object which may contain the following properties:<ul>
     * <li><b>url</b> {String} (Optional) The URL to which to send the request. Defaults to configured URL</li>
     * <li><b>params</b> {Object/String/Function} (Optional) An object containing properties which are used as parameters to the
     * request, a url encoded string or a function to call to get either.</li>
     * <li><b>method</b> {String} (Optional) The HTTP method to use for the request. Defaults to the configured method, or
     * if no method was configured, "GET" if no parameters are being sent, and "POST" if parameters are being sent.</li>
     * <li><b>callback</b> {Function} (Optional) The function to be called upon receipt of the HTTP response.
     * The callback is called regardless of success or failure and is passed the following parameters:<ul>
     * <li>options {Object} The parameter to the request call.</li>
     * <li>success {Boolean} True if the request succeeded.</li>
     * <li>response {Object} The XMLHttpRequest object containing the response data.</li>
     * </ul></li>
     * <li><b>success</b> {Function} (Optional) The function to be called upon success of the request.
     * The callback is passed the following parameters:<ul>
     * <li>response {Object} The XMLHttpRequest object containing the response data.</li>
     * <li>options {Object} The parameter to the request call.</li>
     * </ul></li>
     * <li><b>failure</b> {Function} (Optional) The function to be called upon failure of the request.
     * The callback is passed the following parameters:<ul>
     * <li>response {Object} The XMLHttpRequest object containing the response data.</li>
     * <li>options {Object} The parameter to the request call.</li>
     * </ul></li>
     * <li><b>scope</b> {Object} (Optional) The scope in which to execute the callbacks: The "this" object
     * for the callback function. Defaults to the browser window.</li>
     * <li><b>form</b> {Object/String} (Optional) A form object or id to pull parameters from.</li>
     * <li><b>isUpload</b> {Boolean} (Optional) True if the form object is a file upload (will usually be automatically detected).</li>
     * <li><b>headers</b> {Object} (Optional) Request headers to set for the request.</li>
     * <li><b>xmlData</b> {Object} (Optional) XML document to use for the post. Note: This will be used instead of
     * params for the post data. Any params will be appended to the URL.</li>
     * <li><b>disableCaching</b> {Boolean} (Optional) True to add a unique cache-buster param to GET requests.</li>
     * </ul>
     * @return {Number} transactionId
     */
    request : function(o){
        if(this.fireEvent("beforerequest", this, o) !== false){
            var p = o.params;

            if(typeof p == "function"){
                p = p.call(o.scope||window, o);
            }
            if(typeof p == "object"){
                p = Roo.urlEncode(o.params);
            }
            if(this.extraParams){
                var extras = Roo.urlEncode(this.extraParams);
                p = p ? (p + '&' + extras) : extras;
            }

            var url = o.url || this.url;
            if(typeof url == 'function'){
                url = url.call(o.scope||window, o);
            }

            if(o.form){
                var form = Roo.getDom(o.form);
                url = url || form.action;

                var enctype = form.getAttribute("enctype");
                
                if (o.formData) {
                    return this.doFormDataUpload(o, url);
                }
                
                if(o.isUpload || (enctype && enctype.toLowerCase() == 'multipart/form-data')){
                    return this.doFormUpload(o, p, url);
                }
                var f = Roo.lib.Ajax.serializeForm(form);
                p = p ? (p + '&' + f) : f;
            }
            
            if (!o.form && o.formData) {
                o.formData = o.formData === true ? new FormData() : o.formData;
                for (var k in o.params) {
                    o.formData.append(k,o.params[k]);
                }
                    
                return this.doFormDataUpload(o, url);
            }
            

            var hs = o.headers;
            if(this.defaultHeaders){
                hs = Roo.apply(hs || {}, this.defaultHeaders);
                if(!o.headers){
                    o.headers = hs;
                }
            }

            var cb = {
                success: this.handleResponse,
                failure: this.handleFailure,
                scope: this,
                argument: {options: o},
                timeout : o.timeout || this.timeout
            };

            var method = o.method||this.method||(p ? "POST" : "GET");

            if(method == 'GET' && (this.disableCaching && o.disableCaching !== false) || o.disableCaching === true){
                url += (url.indexOf('?') != -1 ? '&' : '?') + '_dc=' + (new Date().getTime());
            }

            if(typeof o.autoAbort == 'boolean'){ // options gets top priority
                if(o.autoAbort){
                    this.abort();
                }
            }else if(this.autoAbort !== false){
                this.abort();
            }

            if((method == 'GET' && p) || o.xmlData){
                url += (url.indexOf('?') != -1 ? '&' : '?') + p;
                p = '';
            }
            Roo.lib.Ajax.useDefaultHeader = typeof(o.headers) == 'undefined' || typeof(o.headers['Content-Type']) == 'undefined';
            this.transId = Roo.lib.Ajax.request(method, url, cb, p, o);
            Roo.lib.Ajax.useDefaultHeader == true;
            return this.transId;
        }else{
            Roo.callback(o.callback, o.scope, [o, null, null]);
            return null;
        }
    },

    /**
     * Determine whether this object has a request outstanding.
     * @param {Number} transactionId (Optional) defaults to the last transaction
     * @return {Boolean} True if there is an outstanding request.
     */
    isLoading : function(transId){
        if(transId){
            return Roo.lib.Ajax.isCallInProgress(transId);
        }else{
            return this.transId ? true : false;
        }
    },

    /**
     * Aborts any outstanding request.
     * @param {Number} transactionId (Optional) defaults to the last transaction
     */
    abort : function(transId){
        if(transId || this.isLoading()){
            Roo.lib.Ajax.abort(transId || this.transId);
        }
    },

    // private
    handleResponse : function(response){
        this.transId = false;
        var options = response.argument.options;
        response.argument = options ? options.argument : null;
        this.fireEvent("requestcomplete", this, response, options);
        Roo.callback(options.success, options.scope, [response, options]);
        Roo.callback(options.callback, options.scope, [options, true, response]);
    },

    // private
    handleFailure : function(response, e){
        this.transId = false;
        var options = response.argument.options;
        response.argument = options ? options.argument : null;
        this.fireEvent("requestexception", this, response, options, e);
        Roo.callback(options.failure, options.scope, [response, options]);
        Roo.callback(options.callback, options.scope, [options, false, response]);
    },

    // private
    doFormUpload : function(o, ps, url){
        var id = Roo.id();
        var frame = document.createElement('iframe');
        frame.id = id;
        frame.name = id;
        frame.className = 'x-hidden';
        if(Roo.isIE){
            frame.src = Roo.SSL_SECURE_URL;
        }
        document.body.appendChild(frame);

        if(Roo.isIE){
           document.frames[id].name = id;
        }

        var form = Roo.getDom(o.form);
        form.target = id;
        form.method = 'POST';
        form.enctype = form.encoding = 'multipart/form-data';
        if(url){
            form.action = url;
        }

        var hiddens, hd;
        if(ps){ // add dynamic params
            hiddens = [];
            ps = Roo.urlDecode(ps, false);
            for(var k in ps){
                if(ps.hasOwnProperty(k)){
                    hd = document.createElement('input');
                    hd.type = 'hidden';
                    hd.name = k;
                    hd.value = ps[k];
                    form.appendChild(hd);
                    hiddens.push(hd);
                }
            }
        }

        function cb(){
            var r = {  // bogus response object
                responseText : '',
                responseXML : null
            };

            r.argument = o ? o.argument : null;

            try { //
                var doc;
                if(Roo.isIE){
                    doc = frame.contentWindow.document;
                }else {
                    doc = (frame.contentDocument || window.frames[id].document);
                }
                if(doc && doc.body){
                    r.responseText = doc.body.innerHTML;
                }
                if(doc && doc.XMLDocument){
                    r.responseXML = doc.XMLDocument;
                }else {
                    r.responseXML = doc;
                }
            }
            catch(e) {
                // ignore
            }

            Roo.EventManager.removeListener(frame, 'load', cb, this);

            this.fireEvent("requestcomplete", this, r, o);
            Roo.callback(o.success, o.scope, [r, o]);
            Roo.callback(o.callback, o.scope, [o, true, r]);

            setTimeout(function(){document.body.removeChild(frame);}, 100);
        }

        Roo.EventManager.on(frame, 'load', cb, this);
        form.submit();

        if(hiddens){ // remove dynamic params
            for(var i = 0, len = hiddens.length; i < len; i++){
                form.removeChild(hiddens[i]);
            }
        }
    },
    // this is a 'formdata version???'
    
    
    doFormDataUpload : function(o,  url)
    {
        var formData;
        if (o.form) {
            var form =  Roo.getDom(o.form);
            form.enctype = form.encoding = 'multipart/form-data';
            formData = o.formData === true ? new FormData(form) : o.formData;
        } else {
            formData = o.formData === true ? new FormData() : o.formData;
        }
        
      
        var cb = {
            success: this.handleResponse,
            failure: this.handleFailure,
            scope: this,
            argument: {options: o},
            timeout : o.timeout || this.timeout
        };
 
        if(typeof o.autoAbort == 'boolean'){ // options gets top priority
            if(o.autoAbort){
                this.abort();
            }
        }else if(this.autoAbort !== false){
            this.abort();
        }

        //Roo.lib.Ajax.defaultPostHeader = null;
        Roo.lib.Ajax.useDefaultHeader = false;
        this.transId = Roo.lib.Ajax.request( "POST", url, cb,  formData, o);
        Roo.lib.Ajax.useDefaultHeader = true;
 
         
    }
    
});
/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 
/**
 * Global Ajax request class.
 * 
 * @class Roo.Ajax
 * @extends Roo.data.Connection
 * @static
 * 
 * @cfg {String} url  The default URL to be used for requests to the server. (defaults to undefined)
 * @cfg {Object} extraParams  An object containing properties which are used as extra parameters to each request made by this object. (defaults to undefined)
 * @cfg {Object} defaultHeaders  An object containing request headers which are added to each request made by this object. (defaults to undefined)
 * @cfg {String} method (Optional)  The default HTTP method to be used for requests. (defaults to undefined; if not set but parms are present will use POST, otherwise GET)
 * @cfg {Number} timeout (Optional) The timeout in milliseconds to be used for requests. (defaults to 30000)
 * @cfg {Boolean} autoAbort (Optional) Whether a new request should abort any pending requests. (defaults to false)
 * @cfg {Boolean} disableCaching (Optional)   True to add a unique cache-buster param to GET requests. (defaults to true)
 */
Roo.Ajax = new Roo.data.Connection({
    // fix up the docs
    /**
     * @scope Roo.Ajax
     * @type {Boolear} 
     */
    autoAbort : false,

    /**
     * Serialize the passed form into a url encoded string
     * @scope Roo.Ajax
     * @param {String/HTMLElement} form
     * @return {String}
     */
    serializeForm : function(form){
        return Roo.lib.Ajax.serializeForm(form);
    }
});/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

 
/**
 * @class Roo.UpdateManager
 * @extends Roo.util.Observable
 * Provides AJAX-style update for Element object.<br><br>
 * Usage:<br>
 * <pre><code>
 * // Get it from a Roo.Element object
 * var el = Roo.get("foo");
 * var mgr = el.getUpdateManager();
 * mgr.update("http://myserver.com/index.php", "param1=1&amp;param2=2");
 * ...
 * mgr.formUpdate("myFormId", "http://myserver.com/index.php");
 * <br>
 * // or directly (returns the same UpdateManager instance)
 * var mgr = new Roo.UpdateManager("myElementId");
 * mgr.startAutoRefresh(60, "http://myserver.com/index.php");
 * mgr.on("update", myFcnNeedsToKnow);
 * <br>
   // short handed call directly from the element object
   Roo.get("foo").load({
        url: "bar.php",
        scripts:true,
        params: "for=bar",
        text: "Loading Foo..."
   });
 * </code></pre>
 * @constructor
 * Create new UpdateManager directly.
 * @param {String/HTMLElement/Roo.Element} el The element to update
 * @param {Boolean} forceNew (optional) By default the constructor checks to see if the passed element already has an UpdateManager and if it does it returns the same instance. This will skip that check (useful for extending this class).
 */
Roo.UpdateManager = function(el, forceNew){
    el = Roo.get(el);
    if(!forceNew && el.updateManager){
        return el.updateManager;
    }
    /**
     * The Element object
     * @type Roo.Element
     */
    this.el = el;
    /**
     * Cached url to use for refreshes. Overwritten every time update() is called unless "discardUrl" param is set to true.
     * @type String
     */
    this.defaultUrl = null;

    this.addEvents({
        /**
         * @event beforeupdate
         * Fired before an update is made, return false from your handler and the update is cancelled.
         * @param {Roo.Element} el
         * @param {String/Object/Function} url
         * @param {String/Object} params
         */
        "beforeupdate": true,
        /**
         * @event update
         * Fired after successful update is made.
         * @param {Roo.Element} el
         * @param {Object} oResponseObject The response Object
         */
        "update": true,
        /**
         * @event failure
         * Fired on update failure.
         * @param {Roo.Element} el
         * @param {Object} oResponseObject The response Object
         */
        "failure": true
    });
    var d = Roo.UpdateManager.defaults;
    /**
     * Blank page URL to use with SSL file uploads (Defaults to Roo.UpdateManager.defaults.sslBlankUrl or "about:blank").
     * @type String
     */
    this.sslBlankUrl = d.sslBlankUrl;
    /**
     * Whether to append unique parameter on get request to disable caching (Defaults to Roo.UpdateManager.defaults.disableCaching or false).
     * @type Boolean
     */
    this.disableCaching = d.disableCaching;
    /**
     * Text for loading indicator (Defaults to Roo.UpdateManager.defaults.indicatorText or '&lt;div class="loading-indicator"&gt;Loading...&lt;/div&gt;').
     * @type String
     */
    this.indicatorText = d.indicatorText;
    /**
     * Whether to show indicatorText when loading (Defaults to Roo.UpdateManager.defaults.showLoadIndicator or true).
     * @type String
     */
    this.showLoadIndicator = d.showLoadIndicator;
    /**
     * Timeout for requests or form posts in seconds (Defaults to Roo.UpdateManager.defaults.timeout or 30 seconds).
     * @type Number
     */
    this.timeout = d.timeout;

    /**
     * True to process scripts in the output (Defaults to Roo.UpdateManager.defaults.loadScripts (false)).
     * @type Boolean
     */
    this.loadScripts = d.loadScripts;

    /**
     * Transaction object of current executing transaction
     */
    this.transaction = null;

    /**
     * @private
     */
    this.autoRefreshProcId = null;
    /**
     * Delegate for refresh() prebound to "this", use myUpdater.refreshDelegate.createCallback(arg1, arg2) to bind arguments
     * @type Function
     */
    this.refreshDelegate = this.refresh.createDelegate(this);
    /**
     * Delegate for update() prebound to "this", use myUpdater.updateDelegate.createCallback(arg1, arg2) to bind arguments
     * @type Function
     */
    this.updateDelegate = this.update.createDelegate(this);
    /**
     * Delegate for formUpdate() prebound to "this", use myUpdater.formUpdateDelegate.createCallback(arg1, arg2) to bind arguments
     * @type Function
     */
    this.formUpdateDelegate = this.formUpdate.createDelegate(this);
    /**
     * @private
     */
    this.successDelegate = this.processSuccess.createDelegate(this);
    /**
     * @private
     */
    this.failureDelegate = this.processFailure.createDelegate(this);

    if(!this.renderer){
     /**
      * The renderer for this UpdateManager. Defaults to {@link Roo.UpdateManager.BasicRenderer}.
      */
    this.renderer = new Roo.UpdateManager.BasicRenderer();
    }
    
    Roo.UpdateManager.superclass.constructor.call(this);
};

Roo.extend(Roo.UpdateManager, Roo.util.Observable, {
    /**
     * Get the Element this UpdateManager is bound to
     * @return {Roo.Element} The element
     */
    getEl : function(){
        return this.el;
    },
    /**
     * Performs an async request, updating this element with the response. If params are specified it uses POST, otherwise it uses GET.
     * @param {Object/String/Function} url The url for this request or a function to call to get the url or a config object containing any of the following options:
<pre><code>
um.update({<br/>
    url: "your-url.php",<br/>
    params: {param1: "foo", param2: "bar"}, // or a URL encoded string<br/>
    callback: yourFunction,<br/>
    scope: yourObject, //(optional scope)  <br/>
    discardUrl: false, <br/>
    nocache: false,<br/>
    text: "Loading...",<br/>
    timeout: 30,<br/>
    scripts: false<br/>
});
</code></pre>
     * The only required property is url. The optional properties nocache, text and scripts
     * are shorthand for disableCaching, indicatorText and loadScripts and are used to set their associated property on this UpdateManager instance.
     * @param {String/Object} params (optional) The parameters to pass as either a url encoded string "param1=1&amp;param2=2" or an object {param1: 1, param2: 2}
     * @param {Function} callback (optional) Callback when transaction is complete - called with signature (oElement, bSuccess, oResponse)
     * @param {Boolean} discardUrl (optional) By default when you execute an update the defaultUrl is changed to the last used url. If true, it will not store the url.
     */
    update : function(url, params, callback, discardUrl){
        if(this.fireEvent("beforeupdate", this.el, url, params) !== false){
            var method = this.method,
                cfg;
            if(typeof url == "object"){ // must be config object
                cfg = url;
                url = cfg.url;
                params = params || cfg.params;
                callback = callback || cfg.callback;
                discardUrl = discardUrl || cfg.discardUrl;
                if(callback && cfg.scope){
                    callback = callback.createDelegate(cfg.scope);
                }
                if(typeof cfg.method != "undefined"){method = cfg.method;};
                if(typeof cfg.nocache != "undefined"){this.disableCaching = cfg.nocache;};
                if(typeof cfg.text != "undefined"){this.indicatorText = '<div class="loading-indicator">'+cfg.text+"</div>";};
                if(typeof cfg.scripts != "undefined"){this.loadScripts = cfg.scripts;};
                if(typeof cfg.timeout != "undefined"){this.timeout = cfg.timeout;};
            }
            this.showLoading();
            if(!discardUrl){
                this.defaultUrl = url;
            }
            if(typeof url == "function"){
                url = url.call(this);
            }

            method = method || (params ? "POST" : "GET");
            if(method == "GET"){
                url = this.prepareUrl(url);
            }

            var o = Roo.apply(cfg ||{}, {
                url : url,
                params: params,
                success: this.successDelegate,
                failure: this.failureDelegate,
                callback: undefined,
                timeout: (this.timeout*1000),
                argument: {"url": url, "form": null, "callback": callback, "params": params}
            });
            Roo.log("updated manager called with timeout of " + o.timeout);
            this.transaction = Roo.Ajax.request(o);
        }
    },

    /**
     * Performs an async form post, updating this element with the response. If the form has the attribute enctype="multipart/form-data", it assumes it's a file upload.
     * Uses this.sslBlankUrl for SSL file uploads to prevent IE security warning.
     * @param {String/HTMLElement} form The form Id or form element
     * @param {String} url (optional) The url to pass the form to. If omitted the action attribute on the form will be used.
     * @param {Boolean} reset (optional) Whether to try to reset the form after the update
     * @param {Function} callback (optional) Callback when transaction is complete - called with signature (oElement, bSuccess, oResponse)
     */
    formUpdate : function(form, url, reset, callback){
        if(this.fireEvent("beforeupdate", this.el, form, url) !== false){
            if(typeof url == "function"){
                url = url.call(this);
            }
            form = Roo.getDom(form);
            this.transaction = Roo.Ajax.request({
                form: form,
                url:url,
                success: this.successDelegate,
                failure: this.failureDelegate,
                timeout: (this.timeout*1000),
                argument: {"url": url, "form": form, "callback": callback, "reset": reset}
            });
            this.showLoading.defer(1, this);
        }
    },

    /**
     * Refresh the element with the last used url or defaultUrl. If there is no url, it returns immediately
     * @param {Function} callback (optional) Callback when transaction is complete - called with signature (oElement, bSuccess)
     */
    refresh : function(callback){
        if(this.defaultUrl == null){
            return;
        }
        this.update(this.defaultUrl, null, callback, true);
    },

    /**
     * Set this element to auto refresh.
     * @param {Number} interval How often to update (in seconds).
     * @param {String/Function} url (optional) The url for this request or a function to call to get the url (Defaults to the last used url)
     * @param {String/Object} params (optional) The parameters to pass as either a url encoded string "&param1=1&param2=2" or as an object {param1: 1, param2: 2}
     * @param {Function} callback (optional) Callback when transaction is complete - called with signature (oElement, bSuccess)
     * @param {Boolean} refreshNow (optional) Whether to execute the refresh now, or wait the interval
     */
    startAutoRefresh : function(interval, url, params, callback, refreshNow){
        if(refreshNow){
            this.update(url || this.defaultUrl, params, callback, true);
        }
        if(this.autoRefreshProcId){
            clearInterval(this.autoRefreshProcId);
        }
        this.autoRefreshProcId = setInterval(this.update.createDelegate(this, [url || this.defaultUrl, params, callback, true]), interval*1000);
    },

    /**
     * Stop auto refresh on this element.
     */
     stopAutoRefresh : function(){
        if(this.autoRefreshProcId){
            clearInterval(this.autoRefreshProcId);
            delete this.autoRefreshProcId;
        }
    },

    isAutoRefreshing : function(){
       return this.autoRefreshProcId ? true : false;
    },
    /**
     * Called to update the element to "Loading" state. Override to perform custom action.
     */
    showLoading : function(){
        if(this.showLoadIndicator){
            this.el.update(this.indicatorText);
        }
    },

    /**
     * Adds unique parameter to query string if disableCaching = true
     * @private
     */
    prepareUrl : function(url){
        if(this.disableCaching){
            var append = "_dc=" + (new Date().getTime());
            if(url.indexOf("?") !== -1){
                url += "&" + append;
            }else{
                url += "?" + append;
            }
        }
        return url;
    },

    /**
     * @private
     */
    processSuccess : function(response){
        this.transaction = null;
        if(response.argument.form && response.argument.reset){
            try{ // put in try/catch since some older FF releases had problems with this
                response.argument.form.reset();
            }catch(e){}
        }
        if(this.loadScripts){
            this.renderer.render(this.el, response, this,
                this.updateComplete.createDelegate(this, [response]));
        }else{
            this.renderer.render(this.el, response, this);
            this.updateComplete(response);
        }
    },

    updateComplete : function(response){
        this.fireEvent("update", this.el, response);
        if(typeof response.argument.callback == "function"){
            response.argument.callback(this.el, true, response);
        }
    },

    /**
     * @private
     */
    processFailure : function(response){
        this.transaction = null;
        this.fireEvent("failure", this.el, response);
        if(typeof response.argument.callback == "function"){
            response.argument.callback(this.el, false, response);
        }
    },

    /**
     * Set the content renderer for this UpdateManager. See {@link Roo.UpdateManager.BasicRenderer#render} for more details.
     * @param {Object} renderer The object implementing the render() method
     */
    setRenderer : function(renderer){
        this.renderer = renderer;
    },

    getRenderer : function(){
       return this.renderer;
    },

    /**
     * Set the defaultUrl used for updates
     * @param {String/Function} defaultUrl The url or a function to call to get the url
     */
    setDefaultUrl : function(defaultUrl){
        this.defaultUrl = defaultUrl;
    },

    /**
     * Aborts the executing transaction
     */
    abort : function(){
        if(this.transaction){
            Roo.Ajax.abort(this.transaction);
        }
    },

    /**
     * Returns true if an update is in progress
     * @return {Boolean}
     */
    isUpdating : function(){
        if(this.transaction){
            return Roo.Ajax.isLoading(this.transaction);
        }
        return false;
    }
});

/**
 * @class Roo.UpdateManager.defaults
 * @static (not really - but it helps the doc tool)
 * The defaults collection enables customizing the default properties of UpdateManager
 */
   Roo.UpdateManager.defaults = {
       /**
         * Timeout for requests or form posts in seconds (Defaults 30 seconds).
         * @type Number
         */
         timeout : 30,

         /**
         * True to process scripts by default (Defaults to false).
         * @type Boolean
         */
        loadScripts : false,

        /**
        * Blank page URL to use with SSL file uploads (Defaults to "javascript:false").
        * @type String
        */
        sslBlankUrl : (Roo.SSL_SECURE_URL || "javascript:false"),
        /**
         * Whether to append unique parameter on get request to disable caching (Defaults to false).
         * @type Boolean
         */
        disableCaching : false,
        /**
         * Whether to show indicatorText when loading (Defaults to true).
         * @type Boolean
         */
        showLoadIndicator : true,
        /**
         * Text for loading indicator (Defaults to '&lt;div class="loading-indicator"&gt;Loading...&lt;/div&gt;').
         * @type String
         */
        indicatorText : '<div class="loading-indicator">Loading...</div>'
   };

/**
 * Static convenience method. This method is deprecated in favor of el.load({url:'foo.php', ...}).
 *Usage:
 * <pre><code>Roo.UpdateManager.updateElement("my-div", "stuff.php");</code></pre>
 * @param {String/HTMLElement/Roo.Element} el The element to update
 * @param {String} url The url
 * @param {String/Object} params (optional) Url encoded param string or an object of name/value pairs
 * @param {Object} options (optional) A config object with any of the UpdateManager properties you want to set - for example: {disableCaching:true, indicatorText: "Loading data..."}
 * @static
 * @deprecated
 * @member Roo.UpdateManager
 */
Roo.UpdateManager.updateElement = function(el, url, params, options){
    var um = Roo.get(el, true).getUpdateManager();
    Roo.apply(um, options);
    um.update(url, params, options ? options.callback : null);
};
// alias for backwards compat
Roo.UpdateManager.update = Roo.UpdateManager.updateElement;
/**
 * @class Roo.UpdateManager.BasicRenderer
 * Default Content renderer. Updates the elements innerHTML with the responseText.
 */
Roo.UpdateManager.BasicRenderer = function(){};

Roo.UpdateManager.BasicRenderer.prototype = {
    /**
     * This is called when the transaction is completed and it's time to update the element - The BasicRenderer
     * updates the elements innerHTML with the responseText - To perform a custom render (i.e. XML or JSON processing),
     * create an object with a "render(el, response)" method and pass it to setRenderer on the UpdateManager.
     * @param {Roo.Element} el The element being rendered
     * @param {Object} response The YUI Connect response object
     * @param {UpdateManager} updateManager The calling update manager
     * @param {Function} callback A callback that will need to be called if loadScripts is true on the UpdateManager
     */
     render : function(el, response, updateManager, callback){
        el.update(response.responseText, updateManager.loadScripts, callback);
    }
};
/*
 * Based on:
 * Roo JS
 * (c)) Alan Knowles
 * Licence : LGPL
 */


/**
 * @class Roo.DomTemplate
 * @extends Roo.Template
 * An effort at a dom based template engine..
 *
 * Similar to XTemplate, except it uses dom parsing to create the template..
 *
 * Supported features:
 *
 *  Tags:

<pre><code>
      {a_variable} - output encoded.
      {a_variable.format:("Y-m-d")} - call a method on the variable
      {a_variable:raw} - unencoded output
      {a_variable:toFixed(1,2)} - Roo.util.Format."toFixed"
      {a_variable:this.method_on_template(...)} - call a method on the template object.
 
</code></pre>
 *  The tpl tag:
<pre><code>
        &lt;div roo-for="a_variable or condition.."&gt;&lt;/div&gt;
        &lt;div roo-if="a_variable or condition"&gt;&lt;/div&gt;
        &lt;div roo-exec="some javascript"&gt;&lt;/div&gt;
        &lt;div roo-name="named_template"&gt;&lt;/div&gt; 
  
</code></pre>
 *      
 */
Roo.DomTemplate = function()
{
     Roo.DomTemplate.superclass.constructor.apply(this, arguments);
     if (this.html) {
        this.compile();
     }
};


Roo.extend(Roo.DomTemplate, Roo.Template, {
    /**
     * id counter for sub templates.
     */
    id : 0,
    /**
     * flag to indicate if dom parser is inside a pre,
     * it will strip whitespace if not.
     */
    inPre : false,
    
    /**
     * The various sub templates
     */
    tpls : false,
    
    
    
    /**
     *
     * basic tag replacing syntax
     * WORD:WORD()
     *
     * // you can fake an object call by doing this
     *  x.t:(test,tesT) 
     * 
     */
    re : /(\{|\%7B)([\w-\.]+)(?:\:([\w\.]*)(?:\(([^)]*?)?\))?)?(\}|\%7D)/g,
    //re : /\{([\w-\.]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
    
    iterChild : function (node, method) {
        
        var oldPre = this.inPre;
        if (node.tagName == 'PRE') {
            this.inPre = true;
        }
        for( var i = 0; i < node.childNodes.length; i++) {
            method.call(this, node.childNodes[i]);
        }
        this.inPre = oldPre;
    },
    
    
    
    /**
     * compile the template
     *
     * This is not recursive, so I'm not sure how nested templates are really going to be handled..
     *
     */
    compile: function()
    {
        var s = this.html;
        
        // covert the html into DOM...
        var doc = false;
        var div =false;
        try {
            doc = document.implementation.createHTMLDocument("");
            doc.documentElement.innerHTML =   this.html  ;
            div = doc.documentElement;
        } catch (e) {
            // old IE... - nasty -- it causes all sorts of issues.. with
            // images getting pulled from server..
            div = document.createElement('div');
            div.innerHTML = this.html;
        }
        //doc.documentElement.innerHTML = htmlBody
         
        
        
        this.tpls = [];
        var _t = this;
        this.iterChild(div, function(n) {_t.compileNode(n, true); });
        
        var tpls = this.tpls;
        
        // create a top level template from the snippet..
        
        //Roo.log(div.innerHTML);
        
        var tpl = {
            uid : 'master',
            id : this.id++,
            attr : false,
            value : false,
            body : div.innerHTML,
            
            forCall : false,
            execCall : false,
            dom : div,
            isTop : true
            
        };
        tpls.unshift(tpl);
        
        
        // compile them...
        this.tpls = [];
        Roo.each(tpls, function(tp){
            this.compileTpl(tp);
            this.tpls[tp.id] = tp;
        }, this);
        
        this.master = tpls[0];
        return this;
        
        
    },
    
    compileNode : function(node, istop) {
        // test for
        //Roo.log(node);
        
        
        // skip anything not a tag..
        if (node.nodeType != 1) {
            if (node.nodeType == 3 && !this.inPre) {
                // reduce white space..
                node.nodeValue = node.nodeValue.replace(/\s+/g, ' '); 
                
            }
            return;
        }
        
        var tpl = {
            uid : false,
            id : false,
            attr : false,
            value : false,
            body : '',
            
            forCall : false,
            execCall : false,
            dom : false,
            isTop : istop
            
            
        };
        
        
        switch(true) {
            case (node.hasAttribute('roo-for')): tpl.attr = 'for'; break;
            case (node.hasAttribute('roo-if')): tpl.attr = 'if'; break;
            case (node.hasAttribute('roo-name')): tpl.attr = 'name'; break;
            case (node.hasAttribute('roo-exec')): tpl.attr = 'exec'; break;
            // no default..
        }
        
        
        if (!tpl.attr) {
            // just itterate children..
            this.iterChild(node,this.compileNode);
            return;
        }
        tpl.uid = this.id++;
        tpl.value = node.getAttribute('roo-' +  tpl.attr);
        node.removeAttribute('roo-'+ tpl.attr);
        if (tpl.attr != 'name') {
            var placeholder = document.createTextNode('{domtpl' + tpl.uid + '}');
            node.parentNode.replaceChild(placeholder,  node);
        } else {
            
            var placeholder =  document.createElement('span');
            placeholder.className = 'roo-tpl-' + tpl.value;
            node.parentNode.replaceChild(placeholder,  node);
        }
        
        // parent now sees '{domtplXXXX}
        this.iterChild(node,this.compileNode);
        
        // we should now have node body...
        var div = document.createElement('div');
        div.appendChild(node);
        tpl.dom = node;
        // this has the unfortunate side effect of converting tagged attributes
        // eg. href="{...}" into %7C...%7D
        // this has been fixed by searching for those combo's although it's a bit hacky..
        
        
        tpl.body = div.innerHTML;
        
        
         
        tpl.id = tpl.uid;
        switch(tpl.attr) {
            case 'for' :
                switch (tpl.value) {
                    case '.':  tpl.forCall = new Function('values', 'parent', 'with(values){ return values; }'); break;
                    case '..': tpl.forCall= new Function('values', 'parent', 'with(values){ return parent; }'); break;
                    default:   tpl.forCall= new Function('values', 'parent', 'with(values){ return '+tpl.value+'; }');
                }
                break;
            
            case 'exec':
                tpl.execCall = new Function('values', 'parent', 'with(values){ '+(Roo.util.Format.htmlDecode(tpl.value))+'; }');
                break;
            
            case 'if':     
                tpl.ifCall = new Function('values', 'parent', 'with(values){ return '+(Roo.util.Format.htmlDecode(tpl.value))+'; }');
                break;
            
            case 'name':
                tpl.id  = tpl.value; // replace non characters???
                break;
            
        }
        
        
        this.tpls.push(tpl);
        
        
        
    },
    
    
    
    
    /**
     * Compile a segment of the template into a 'sub-template'
     *
     * 
     * 
     *
     */
    compileTpl : function(tpl)
    {
        var fm = Roo.util.Format;
        var useF = this.disableFormats !== true;
        
        var sep = Roo.isGecko ? "+\n" : ",\n";
        
        var undef = function(str) {
            Roo.debug && Roo.log("Property not found :"  + str);
            return '';
        };
          
        //Roo.log(tpl.body);
        
        
        
        var fn = function(m, lbrace, name, format, args)
        {
            //Roo.log("ARGS");
            //Roo.log(arguments);
            args = args ? args.replace(/\\'/g,"'") : args;
            //["{TEST:(a,b,c)}", "TEST", "", "a,b,c", 0, "{TEST:(a,b,c)}"]
            if (typeof(format) == 'undefined') {
                format =  'htmlEncode'; 
            }
            if (format == 'raw' ) {
                format = false;
            }
            
            if(name.substr(0, 6) == 'domtpl'){
                return "'"+ sep +'this.applySubTemplate('+name.substr(6)+', values, parent)'+sep+"'";
            }
            
            // build an array of options to determine if value is undefined..
            
            // basically get 'xxxx.yyyy' then do
            // (typeof(xxxx) == 'undefined' || typeof(xxx.yyyy) == 'undefined') ?
            //    (function () { Roo.log("Property not found"); return ''; })() :
            //    ......
            
            var udef_ar = [];
            var lookfor = '';
            Roo.each(name.split('.'), function(st) {
                lookfor += (lookfor.length ? '.': '') + st;
                udef_ar.push(  "(typeof(" + lookfor + ") == 'undefined')"  );
            });
            
            var udef_st = '((' + udef_ar.join(" || ") +") ? undef('" + name + "') : "; // .. needs )
            
            
            if(format && useF){
                
                args = args ? ',' + args : "";
                 
                if(format.substr(0, 5) != "this."){
                    format = "fm." + format + '(';
                }else{
                    format = 'this.call("'+ format.substr(5) + '", ';
                    args = ", values";
                }
                
                return "'"+ sep +   udef_st   +    format + name + args + "))"+sep+"'";
            }
             
            if (args && args.length) {
                // called with xxyx.yuu:(test,test)
                // change to ()
                return "'"+ sep + udef_st  + name + '(' +  args + "))"+sep+"'";
            }
            // raw.. - :raw modifier..
            return "'"+ sep + udef_st  + name + ")"+sep+"'";
            
        };
        var body;
        // branched to use + in gecko and [].join() in others
        if(Roo.isGecko){
            body = "tpl.compiled = function(values, parent){  with(values) { return '" +
                   tpl.body.replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn) +
                    "';};};";
        }else{
            body = ["tpl.compiled = function(values, parent){  with (values) { return ['"];
            body.push(tpl.body.replace(/(\r\n|\n)/g,
                            '\\n').replace(/'/g, "\\'").replace(this.re, fn));
            body.push("'].join('');};};");
            body = body.join('');
        }
        
        Roo.debug && Roo.log(body.replace(/\\n/,'\n'));
       
        /** eval:var:tpl eval:var:fm eval:var:useF eval:var:undef  */
        eval(body);
        
        return this;
    },
     
    /**
     * same as applyTemplate, except it's done to one of the subTemplates
     * when using named templates, you can do:
     *
     * var str = pl.applySubTemplate('your-name', values);
     *
     * 
     * @param {Number} id of the template
     * @param {Object} values to apply to template
     * @param {Object} parent (normaly the instance of this object)
     */
    applySubTemplate : function(id, values, parent)
    {
        
        
        var t = this.tpls[id];
        
        
        try { 
            if(t.ifCall && !t.ifCall.call(this, values, parent)){
                Roo.debug && Roo.log('if call on ' + t.value + ' return false');
                return '';
            }
        } catch(e) {
            Roo.log('Xtemplate.applySubTemplate('+ id+ '): Exception thrown on roo-if="' + t.value + '" - ' + e.toString());
            Roo.log(values);
          
            return '';
        }
        try { 
            
            if(t.execCall && t.execCall.call(this, values, parent)){
                return '';
            }
        } catch(e) {
            Roo.log('Xtemplate.applySubTemplate('+ id+ '): Exception thrown on roo-for="' + t.value + '" - ' + e.toString());
            Roo.log(values);
            return '';
        }
        
        try {
            var vs = t.forCall ? t.forCall.call(this, values, parent) : values;
            parent = t.target ? values : parent;
            if(t.forCall && vs instanceof Array){
                var buf = [];
                for(var i = 0, len = vs.length; i < len; i++){
                    try {
                        buf[buf.length] = t.compiled.call(this, vs[i], parent);
                    } catch (e) {
                        Roo.log('Xtemplate.applySubTemplate('+ id+ '): Exception thrown on body="' + t.value + '" - ' + e.toString());
                        Roo.log(e.body);
                        //Roo.log(t.compiled);
                        Roo.log(vs[i]);
                    }   
                }
                return buf.join('');
            }
        } catch (e) {
            Roo.log('Xtemplate.applySubTemplate('+ id+ '): Exception thrown on roo-for="' + t.value + '" - ' + e.toString());
            Roo.log(values);
            return '';
        }
        try {
            return t.compiled.call(this, vs, parent);
        } catch (e) {
            Roo.log('Xtemplate.applySubTemplate('+ id+ '): Exception thrown on body="' + t.value + '" - ' + e.toString());
            Roo.log(e.body);
            //Roo.log(t.compiled);
            Roo.log(values);
            return '';
        }
    },

   

    applyTemplate : function(values){
        return this.master.compiled.call(this, values, {});
        //var s = this.subs;
    },

    apply : function(){
        return this.applyTemplate.apply(this, arguments);
    }

 });

Roo.DomTemplate.from = function(el){
    el = Roo.getDom(el);
    return new Roo.Domtemplate(el.value || el.innerHTML);
};/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

/**
 * @class Roo.util.DelayedTask
 * Provides a convenient method of performing setTimeout where a new
 * timeout cancels the old timeout. An example would be performing validation on a keypress.
 * You can use this class to buffer
 * the keypress events for a certain number of milliseconds, and perform only if they stop
 * for that amount of time.
 * @constructor The parameters to this constructor serve as defaults and are not required.
 * @param {Function} fn (optional) The default function to timeout
 * @param {Object} scope (optional) The default scope of that timeout
 * @param {Array} args (optional) The default Array of arguments
 */
Roo.util.DelayedTask = function(fn, scope, args){
    var id = null, d, t;

    var call = function(){
        var now = new Date().getTime();
        if(now - t >= d){
            clearInterval(id);
            id = null;
            fn.apply(scope, args || []);
        }
    };
    /**
     * Cancels any pending timeout and queues a new one
     * @param {Number} delay The milliseconds to delay
     * @param {Function} newFn (optional) Overrides function passed to constructor
     * @param {Object} newScope (optional) Overrides scope passed to constructor
     * @param {Array} newArgs (optional) Overrides args passed to constructor
     */
    this.delay = function(delay, newFn, newScope, newArgs){
        if(id && delay != d){
            this.cancel();
        }
        d = delay;
        t = new Date().getTime();
        fn = newFn || fn;
        scope = newScope || scope;
        args = newArgs || args;
        if(!id){
            id = setInterval(call, d);
        }
    };

    /**
     * Cancel the last queued timeout
     */
    this.cancel = function(){
        if(id){
            clearInterval(id);
            id = null;
        }
    };
};/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
/**
 * @class Roo.util.TaskRunner
 * Manage background tasks - not sure why this is better that setInterval?
 * @static
 *
 */
 
Roo.util.TaskRunner = function(interval){
    interval = interval || 10;
    var tasks = [], removeQueue = [];
    var id = 0;
    var running = false;

    var stopThread = function(){
        running = false;
        clearInterval(id);
        id = 0;
    };

    var startThread = function(){
        if(!running){
            running = true;
            id = setInterval(runTasks, interval);
        }
    };

    var removeTask = function(task){
        removeQueue.push(task);
        if(task.onStop){
            task.onStop();
        }
    };

    var runTasks = function(){
        if(removeQueue.length > 0){
            for(var i = 0, len = removeQueue.length; i < len; i++){
                tasks.remove(removeQueue[i]);
            }
            removeQueue = [];
            if(tasks.length < 1){
                stopThread();
                return;
            }
        }
        var now = new Date().getTime();
        for(var i = 0, len = tasks.length; i < len; ++i){
            var t = tasks[i];
            var itime = now - t.taskRunTime;
            if(t.interval <= itime){
                var rt = t.run.apply(t.scope || t, t.args || [++t.taskRunCount]);
                t.taskRunTime = now;
                if(rt === false || t.taskRunCount === t.repeat){
                    removeTask(t);
                    return;
                }
            }
            if(t.duration && t.duration <= (now - t.taskStartTime)){
                removeTask(t);
            }
        }
    };

    /**
     * Queues a new task.
     * @param {Object} task
     *
     * Task property : interval = how frequent to run.
     * Task object should implement
     * function run()
     * Task object may implement
     * function onStop()
     */
    this.start = function(task){
        tasks.push(task);
        task.taskStartTime = new Date().getTime();
        task.taskRunTime = 0;
        task.taskRunCount = 0;
        startThread();
        return task;
    };
    /**
     * Stop  new task.
     * @param {Object} task
     */
    this.stop = function(task){
        removeTask(task);
        return task;
    };
    /**
     * Stop all Tasks
     */
    this.stopAll = function(){
        stopThread();
        for(var i = 0, len = tasks.length; i < len; i++){
            if(tasks[i].onStop){
                tasks[i].onStop();
            }
        }
        tasks = [];
        removeQueue = [];
    };
};

Roo.TaskMgr = new Roo.util.TaskRunner();/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

 
/**
 * @class Roo.util.MixedCollection
 * @extends Roo.util.Observable
 * A Collection class that maintains both numeric indexes and keys and exposes events.
 * @constructor
 * @param {Boolean} allowFunctions True if the addAll function should add function references to the
 * collection (defaults to false)
 * @param {Function} keyFn A function that can accept an item of the type(s) stored in this MixedCollection
 * and return the key value for that item.  This is used when available to look up the key on items that
 * were passed without an explicit key parameter to a MixedCollection method.  Passing this parameter is
 * equivalent to providing an implementation for the {@link #getKey} method.
 */
Roo.util.MixedCollection = function(allowFunctions, keyFn){
    this.items = [];
    this.map = {};
    this.keys = [];
    this.length = 0;
    this.addEvents({
        /**
         * @event clear
         * Fires when the collection is cleared.
         */
        "clear" : true,
        /**
         * @event add
         * Fires when an item is added to the collection.
         * @param {Number} index The index at which the item was added.
         * @param {Object} o The item added.
         * @param {String} key The key associated with the added item.
         */
        "add" : true,
        /**
         * @event replace
         * Fires when an item is replaced in the collection.
         * @param {String} key he key associated with the new added.
         * @param {Object} old The item being replaced.
         * @param {Object} new The new item.
         */
        "replace" : true,
        /**
         * @event remove
         * Fires when an item is removed from the collection.
         * @param {Object} o The item being removed.
         * @param {String} key (optional) The key associated with the removed item.
         */
        "remove" : true,
        "sort" : true
    });
    this.allowFunctions = allowFunctions === true;
    if(keyFn){
        this.getKey = keyFn;
    }
    Roo.util.MixedCollection.superclass.constructor.call(this);
};

Roo.extend(Roo.util.MixedCollection, Roo.util.Observable, {
    allowFunctions : false,
    
/**
 * Adds an item to the collection.
 * @param {String} key The key to associate with the item
 * @param {Object} o The item to add.
 * @return {Object} The item added.
 */
    add : function(key, o){
        if(arguments.length == 1){
            o = arguments[0];
            key = this.getKey(o);
        }
        if(typeof key == "undefined" || key === null){
            this.length++;
            this.items.push(o);
            this.keys.push(null);
        }else{
            var old = this.map[key];
            if(old){
                return this.replace(key, o);
            }
            this.length++;
            this.items.push(o);
            this.map[key] = o;
            this.keys.push(key);
        }
        this.fireEvent("add", this.length-1, o, key);
        return o;
    },
       
/**
  * MixedCollection has a generic way to fetch keys if you implement getKey.
<pre><code>
// normal way
var mc = new Roo.util.MixedCollection();
mc.add(someEl.dom.id, someEl);
mc.add(otherEl.dom.id, otherEl);
//and so on

// using getKey
var mc = new Roo.util.MixedCollection();
mc.getKey = function(el){
   return el.dom.id;
};
mc.add(someEl);
mc.add(otherEl);

// or via the constructor
var mc = new Roo.util.MixedCollection(false, function(el){
   return el.dom.id;
});
mc.add(someEl);
mc.add(otherEl);
</code></pre>
 * @param o {Object} The item for which to find the key.
 * @return {Object} The key for the passed item.
 */
    getKey : function(o){
         return o.id; 
    },
   
/**
 * Replaces an item in the collection.
 * @param {String} key The key associated with the item to replace, or the item to replace.
 * @param o {Object} o (optional) If the first parameter passed was a key, the item to associate with that key.
 * @return {Object}  The new item.
 */
    replace : function(key, o){
        if(arguments.length == 1){
            o = arguments[0];
            key = this.getKey(o);
        }
        var old = this.item(key);
        if(typeof key == "undefined" || key === null || typeof old == "undefined"){
             return this.add(key, o);
        }
        var index = this.indexOfKey(key);
        this.items[index] = o;
        this.map[key] = o;
        this.fireEvent("replace", key, old, o);
        return o;
    },
   
/**
 * Adds all elements of an Array or an Object to the collection.
 * @param {Object/Array} objs An Object containing properties which will be added to the collection, or
 * an Array of values, each of which are added to the collection.
 */
    addAll : function(objs){
        if(arguments.length > 1 || objs instanceof Array){
            var args = arguments.length > 1 ? arguments : objs;
            for(var i = 0, len = args.length; i < len; i++){
                this.add(args[i]);
            }
        }else{
            for(var key in objs){
                if(this.allowFunctions || typeof objs[key] != "function"){
                    this.add(key, objs[key]);
                }
            }
        }
    },
   
/**
 * Executes the specified function once for every item in the collection, passing each
 * item as the first and only parameter. returning false from the function will stop the iteration.
 * @param {Function} fn The function to execute for each item.
 * @param {Object} scope (optional) The scope in which to execute the function.
 */
    each : function(fn, scope){
        var items = [].concat(this.items); // each safe for removal
        for(var i = 0, len = items.length; i < len; i++){
            if(fn.call(scope || items[i], items[i], i, len) === false){
                break;
            }
        }
    },
   
/**
 * Executes the specified function once for every key in the collection, passing each
 * key, and its associated item as the first two parameters.
 * @param {Function} fn The function to execute for each item.
 * @param {Object} scope (optional) The scope in which to execute the function.
 */
    eachKey : function(fn, scope){
        for(var i = 0, len = this.keys.length; i < len; i++){
            fn.call(scope || window, this.keys[i], this.items[i], i, len);
        }
    },
   
/**
 * Returns the first item in the collection which elicits a true return value from the
 * passed selection function.
 * @param {Function} fn The selection function to execute for each item.
 * @param {Object} scope (optional) The scope in which to execute the function.
 * @return {Object} The first item in the collection which returned true from the selection function.
 */
    find : function(fn, scope){
        for(var i = 0, len = this.items.length; i < len; i++){
            if(fn.call(scope || window, this.items[i], this.keys[i])){
                return this.items[i];
            }
        }
        return null;
    },
   
/**
 * Inserts an item at the specified index in the collection.
 * @param {Number} index The index to insert the item at.
 * @param {String} key The key to associate with the new item, or the item itself.
 * @param {Object} o  (optional) If the second parameter was a key, the new item.
 * @return {Object} The item inserted.
 */
    insert : function(index, key, o){
        if(arguments.length == 2){
            o = arguments[1];
            key = this.getKey(o);
        }
        if(index >= this.length){
            return this.add(key, o);
        }
        this.length++;
        this.items.splice(index, 0, o);
        if(typeof key != "undefined" && key != null){
            this.map[key] = o;
        }
        this.keys.splice(index, 0, key);
        this.fireEvent("add", index, o, key);
        return o;
    },
   
/**
 * Removed an item from the collection.
 * @param {Object} o The item to remove.
 * @return {Object} The item removed.
 */
    remove : function(o){
        return this.removeAt(this.indexOf(o));
    },
   
/**
 * Remove an item from a specified index in the collection.
 * @param {Number} index The index within the collection of the item to remove.
 */
    removeAt : function(index){
        if(index < this.length && index >= 0){
            this.length--;
            var o = this.items[index];
            this.items.splice(index, 1);
            var key = this.keys[index];
            if(typeof key != "undefined"){
                delete this.map[key];
            }
            this.keys.splice(index, 1);
            this.fireEvent("remove", o, key);
        }
    },
   
/**
 * Removed an item associated with the passed key fom the collection.
 * @param {String} key The key of the item to remove.
 */
    removeKey : function(key){
        return this.removeAt(this.indexOfKey(key));
    },
   
/**
 * Returns the number of items in the collection.
 * @return {Number} the number of items in the collection.
 */
    getCount : function(){
        return this.length; 
    },
   
/**
 * Returns index within the collection of the passed Object.
 * @param {Object} o The item to find the index of.
 * @return {Number} index of the item.
 */
    indexOf : function(o){
        if(!this.items.indexOf){
            for(var i = 0, len = this.items.length; i < len; i++){
                if(this.items[i] == o) {
                    return i;
                }
            }
            return -1;
        }else{
            return this.items.indexOf(o);
        }
    },
   
/**
 * Returns index within the collection of the passed key.
 * @param {String} key The key to find the index of.
 * @return {Number} index of the key.
 */
    indexOfKey : function(key){
        if(!this.keys.indexOf){
            for(var i = 0, len = this.keys.length; i < len; i++){
                if(this.keys[i] == key) {
                    return i;
                }
            }
            return -1;
        }else{
            return this.keys.indexOf(key);
        }
    },
   
/**
 * Returns the item associated with the passed key OR index. Key has priority over index.
 * @param {String/Number} key The key or index of the item.
 * @return {Object} The item associated with the passed key.
 */
    item : function(key){
        if (key === 'length') {
            return null;
        }
        var item = typeof this.map[key] != "undefined" ? this.map[key] : this.items[key];
        return typeof item != 'function' || this.allowFunctions ? item : null; // for prototype!
    },
    
/**
 * Returns the item at the specified index.
 * @param {Number} index The index of the item.
 * @return {Object}
 */
    itemAt : function(index){
        return this.items[index];
    },
    
/**
 * Returns the item associated with the passed key.
 * @param {String/Number} key The key of the item.
 * @return {Object} The item associated with the passed key.
 */
    key : function(key){
        return this.map[key];
    },
   
/**
 * Returns true if the collection contains the passed Object as an item.
 * @param {Object} o  The Object to look for in the collection.
 * @return {Boolean} True if the collection contains the Object as an item.
 */
    contains : function(o){
        return this.indexOf(o) != -1;
    },
   
/**
 * Returns true if the collection contains the passed Object as a key.
 * @param {String} key The key to look for in the collection.
 * @return {Boolean} True if the collection contains the Object as a key.
 */
    containsKey : function(key){
        return typeof this.map[key] != "undefined";
    },
   
/**
 * Removes all items from the collection.
 */
    clear : function(){
        this.length = 0;
        this.items = [];
        this.keys = [];
        this.map = {};
        this.fireEvent("clear");
    },
   
/**
 * Returns the first item in the collection.
 * @return {Object} the first item in the collection..
 */
    first : function(){
        return this.items[0]; 
    },
   
/**
 * Returns the last item in the collection.
 * @return {Object} the last item in the collection..
 */
    last : function(){
        return this.items[this.length-1];   
    },
    
    _sort : function(property, dir, fn){
        var dsc = String(dir).toUpperCase() == "DESC" ? -1 : 1;
        fn = fn || function(a, b){
            return a-b;
        };
        var c = [], k = this.keys, items = this.items;
        for(var i = 0, len = items.length; i < len; i++){
            c[c.length] = {key: k[i], value: items[i], index: i};
        }
        c.sort(function(a, b){
            var v = fn(a[property], b[property]) * dsc;
            if(v == 0){
                v = (a.index < b.index ? -1 : 1);
            }
            return v;
        });
        for(var i = 0, len = c.length; i < len; i++){
            items[i] = c[i].value;
            k[i] = c[i].key;
        }
        this.fireEvent("sort", this);
    },
    
    /**
     * Sorts this collection with the passed comparison function
     * @param {String} direction (optional) "ASC" or "DESC"
     * @param {Function} fn (optional) comparison function
     */
    sort : function(dir, fn){
        this._sort("value", dir, fn);
    },
    
    /**
     * Sorts this collection by keys
     * @param {String} direction (optional) "ASC" or "DESC"
     * @param {Function} fn (optional) a comparison function (defaults to case insensitive string)
     */
    keySort : function(dir, fn){
        this._sort("key", dir, fn || function(a, b){
            return String(a).toUpperCase()-String(b).toUpperCase();
        });
    },
    
    /**
     * Returns a range of items in this collection
     * @param {Number} startIndex (optional) defaults to 0
     * @param {Number} endIndex (optional) default to the last item
     * @return {Array} An array of items
     */
    getRange : function(start, end){
        var items = this.items;
        if(items.length < 1){
            return [];
        }
        start = start || 0;
        end = Math.min(typeof end == "undefined" ? this.length-1 : end, this.length-1);
        var r = [];
        if(start <= end){
            for(var i = start; i <= end; i++) {
        	    r[r.length] = items[i];
            }
        }else{
            for(var i = start; i >= end; i--) {
        	    r[r.length] = items[i];
            }
        }
        return r;
    },
        
    /**
     * Filter the <i>objects</i> in this collection by a specific property. 
     * Returns a new collection that has been filtered.
     * @param {String} property A property on your objects
     * @param {String/RegExp} value Either string that the property values 
     * should start with or a RegExp to test against the property
     * @return {MixedCollection} The new filtered collection
     */
    filter : function(property, value){
        if(!value.exec){ // not a regex
            value = String(value);
            if(value.length == 0){
                return this.clone();
            }
            value = new RegExp("^" + Roo.escapeRe(value), "i");
        }
        return this.filterBy(function(o){
            return o && value.test(o[property]);
        });
	},
    
    /**
     * Filter by a function. * Returns a new collection that has been filtered.
     * The passed function will be called with each 
     * object in the collection. If the function returns true, the value is included 
     * otherwise it is filtered.
     * @param {Function} fn The function to be called, it will receive the args o (the object), k (the key)
     * @param {Object} scope (optional) The scope of the function (defaults to this) 
     * @return {MixedCollection} The new filtered collection
     */
    filterBy : function(fn, scope){
        var r = new Roo.util.MixedCollection();
        r.getKey = this.getKey;
        var k = this.keys, it = this.items;
        for(var i = 0, len = it.length; i < len; i++){
            if(fn.call(scope||this, it[i], k[i])){
				r.add(k[i], it[i]);
			}
        }
        return r;
    },
    
    /**
     * Creates a duplicate of this collection
     * @return {MixedCollection}
     */
    clone : function(){
        var r = new Roo.util.MixedCollection();
        var k = this.keys, it = this.items;
        for(var i = 0, len = it.length; i < len; i++){
            r.add(k[i], it[i]);
        }
        r.getKey = this.getKey;
        return r;
    }
});
/**
 * Returns the item associated with the passed key or index.
 * @method
 * @param {String/Number} key The key or index of the item.
 * @return {Object} The item associated with the passed key.
 */
Roo.util.MixedCollection.prototype.get = Roo.util.MixedCollection.prototype.item;/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
/**
 * @class Roo.util.JSON
 * Modified version of Douglas Crockford"s json.js that doesn"t
 * mess with the Object prototype 
 * http://www.json.org/js.html
 * @static
 */
Roo.util.JSON = new (function(){
    var useHasOwn = {}.hasOwnProperty ? true : false;
    
    // crashes Safari in some instances
    //var validRE = /^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/;
    
    var pad = function(n) {
        return n < 10 ? "0" + n : n;
    };
    
    var m = {
        "\b": '\\b',
        "\t": '\\t',
        "\n": '\\n',
        "\f": '\\f',
        "\r": '\\r',
        '"' : '\\"',
        "\\": '\\\\'
    };

    var encodeString = function(s){
        if (/["\\\x00-\x1f]/.test(s)) {
            return '"' + s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                var c = m[b];
                if(c){
                    return c;
                }
                c = b.charCodeAt();
                return "\\u00" +
                    Math.floor(c / 16).toString(16) +
                    (c % 16).toString(16);
            }) + '"';
        }
        return '"' + s + '"';
    };
    
    var encodeArray = function(o){
        var a = ["["], b, i, l = o.length, v;
            for (i = 0; i < l; i += 1) {
                v = o[i];
                switch (typeof v) {
                    case "undefined":
                    case "function":
                    case "unknown":
                        break;
                    default:
                        if (b) {
                            a.push(',');
                        }
                        a.push(v === null ? "null" : Roo.util.JSON.encode(v));
                        b = true;
                }
            }
            a.push("]");
            return a.join("");
    };
    
    var encodeDate = function(o){
        return '"' + o.getFullYear() + "-" +
                pad(o.getMonth() + 1) + "-" +
                pad(o.getDate()) + "T" +
                pad(o.getHours()) + ":" +
                pad(o.getMinutes()) + ":" +
                pad(o.getSeconds()) + '"';
    };
    
    /**
     * Encodes an Object, Array or other value
     * @param {Mixed} o The variable to encode
     * @return {String} The JSON string
     */
    this.encode = function(o)
    {
        // should this be extended to fully wrap stringify..
        
        if(typeof o == "undefined" || o === null){
            return "null";
        }else if(o instanceof Array){
            return encodeArray(o);
        }else if(o instanceof Date){
            return encodeDate(o);
        }else if(typeof o == "string"){
            return encodeString(o);
        }else if(typeof o == "number"){
            return isFinite(o) ? String(o) : "null";
        }else if(typeof o == "boolean"){
            return String(o);
        }else {
            var a = ["{"], b, i, v;
            for (i in o) {
                if(!useHasOwn || o.hasOwnProperty(i)) {
                    v = o[i];
                    switch (typeof v) {
                    case "undefined":
                    case "function":
                    case "unknown":
                        break;
                    default:
                        if(b){
                            a.push(',');
                        }
                        a.push(this.encode(i), ":",
                                v === null ? "null" : this.encode(v));
                        b = true;
                    }
                }
            }
            a.push("}");
            return a.join("");
        }
    };
    
    /**
     * Decodes (parses) a JSON string to an object. If the JSON is invalid, this function throws a SyntaxError.
     * @param {String} json The JSON string
     * @return {Object} The resulting object
     */
    this.decode = function(json){
        
        return  /** eval:var:json */ eval("(" + json + ')');
    };
})();
/** 
 * Shorthand for {@link Roo.util.JSON#encode}
 * @member Roo encode 
 * @method */
Roo.encode = typeof(JSON) != 'undefined' && JSON.stringify ? JSON.stringify : Roo.util.JSON.encode;
/** 
 * Shorthand for {@link Roo.util.JSON#decode}
 * @member Roo decode 
 * @method */
Roo.decode = typeof(JSON) != 'undefined' && JSON.parse ? JSON.parse : Roo.util.JSON.decode;
/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 
/**
 * @class Roo.util.Format
 * Reusable data formatting functions
 * @static
 */
Roo.util.Format = function(){
    var trimRe = /^\s+|\s+$/g;
    return {
        /**
         * Truncate a string and add an ellipsis ('...') to the end if it exceeds the specified length
         * @param {String} value The string to truncate
         * @param {Number} length The maximum length to allow before truncating
         * @return {String} The converted text
         */
        ellipsis : function(value, len){
            if(value && value.length > len){
                return value.substr(0, len-3)+"...";
            }
            return value;
        },

        /**
         * Checks a reference and converts it to empty string if it is undefined
         * @param {Mixed} value Reference to check
         * @return {Mixed} Empty string if converted, otherwise the original value
         */
        undef : function(value){
            return typeof value != "undefined" ? value : "";
        },

        /**
         * Convert certain characters (&, <, >, and ') to their HTML character equivalents for literal display in web pages.
         * @param {String} value The string to encode
         * @return {String} The encoded text
         */
        htmlEncode : function(value){
            return !value ? value : String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
        },

        /**
         * Convert certain characters (&, <, >, and ') from their HTML character equivalents.
         * @param {String} value The string to decode
         * @return {String} The decoded text
         */
        htmlDecode : function(value){
            return !value ? value : String(value).replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"');
        },

        /**
         * Trims any whitespace from either side of a string
         * @param {String} value The text to trim
         * @return {String} The trimmed text
         */
        trim : function(value){
            return String(value).replace(trimRe, "");
        },

        /**
         * Returns a substring from within an original string
         * @param {String} value The original text
         * @param {Number} start The start index of the substring
         * @param {Number} length The length of the substring
         * @return {String} The substring
         */
        substr : function(value, start, length){
            return String(value).substr(start, length);
        },

        /**
         * Converts a string to all lower case letters
         * @param {String} value The text to convert
         * @return {String} The converted text
         */
        lowercase : function(value){
            return String(value).toLowerCase();
        },

        /**
         * Converts a string to all upper case letters
         * @param {String} value The text to convert
         * @return {String} The converted text
         */
        uppercase : function(value){
            return String(value).toUpperCase();
        },

        /**
         * Converts the first character only of a string to upper case
         * @param {String} value The text to convert
         * @return {String} The converted text
         */
        capitalize : function(value){
            return !value ? value : value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();
        },

        // private
        call : function(value, fn){
            if(arguments.length > 2){
                var args = Array.prototype.slice.call(arguments, 2);
                args.unshift(value);
                 
                return /** eval:var:value */  eval(fn).apply(window, args);
            }else{
                /** eval:var:value */
                return /** eval:var:value */ eval(fn).call(window, value);
            }
        },

       
        /**
         * safer version of Math.toFixed..??/
         * @param {Number/String} value The numeric value to format
         * @param {Number/String} value Decimal places 
         * @return {String} The formatted currency string
         */
        toFixed : function(v, n)
        {
            // why not use to fixed - precision is buggered???
            if (!n) {
                return Math.round(v-0);
            }
            var fact = Math.pow(10,n+1);
            v = (Math.round((v-0)*fact))/fact;
            var z = (''+fact).substring(2);
            if (v == Math.floor(v)) {
                return Math.floor(v) + '.' + z;
            }
            
            // now just padd decimals..
            var ps = String(v).split('.');
            var fd = (ps[1] + z);
            var r = fd.substring(0,n); 
            var rm = fd.substring(n); 
            if (rm < 5) {
                return ps[0] + '.' + r;
            }
            r*=1; // turn it into a number;
            r++;
            if (String(r).length != n) {
                ps[0]*=1;
                ps[0]++;
                r = String(r).substring(1); // chop the end off.
            }
            
            return ps[0] + '.' + r;
             
        },
        
        /**
         * Format a number as US currency
         * @param {Number/String} value The numeric value to format
         * @return {String} The formatted currency string
         */
        usMoney : function(v){
            return '$' + Roo.util.Format.number(v);
        },
        
        /**
         * Format a number
         * eventually this should probably emulate php's number_format
         * @param {Number/String} value The numeric value to format
         * @param {Number} decimals number of decimal places
         * @param {String} delimiter for thousands (default comma)
         * @return {String} The formatted currency string
         */
        number : function(v, decimals, thousandsDelimiter)
        {
            // multiply and round.
            decimals = typeof(decimals) == 'undefined' ? 2 : decimals;
            thousandsDelimiter = typeof(thousandsDelimiter) == 'undefined' ? ',' : thousandsDelimiter;
            
            var mul = Math.pow(10, decimals);
            var zero = String(mul).substring(1);
            v = (Math.round((v-0)*mul))/mul;
            
            // if it's '0' number.. then
            
            //v = (v == Math.floor(v)) ? v + "." + zero : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
            v = String(v);
            var ps = v.split('.');
            var whole = ps[0];
            
            var r = /(\d+)(\d{3})/;
            // add comma's
            
            if(thousandsDelimiter.length != 0) {
                whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsDelimiter );
            } 
            
            var sub = ps[1] ?
                    // has decimals..
                    (decimals ?  ('.'+ ps[1] + zero.substring(ps[1].length)) : '') :
                    // does not have decimals
                    (decimals ? ('.' + zero) : '');
            
            
            return whole + sub ;
        },
        
        /**
         * Parse a value into a formatted date using the specified format pattern.
         * @param {Mixed} value The value to format
         * @param {String} format (optional) Any valid date format string (defaults to 'm/d/Y')
         * @return {String} The formatted date string
         */
        date : function(v, format){
            if(!v){
                return "";
            }
            if(!(v instanceof Date)){
                v = new Date(Date.parse(v));
            }
            return v.dateFormat(format || Roo.util.Format.defaults.date);
        },

        /**
         * Returns a date rendering function that can be reused to apply a date format multiple times efficiently
         * @param {String} format Any valid date format string
         * @return {Function} The date formatting function
         */
        dateRenderer : function(format){
            return function(v){
                return Roo.util.Format.date(v, format);  
            };
        },

        // private
        stripTagsRE : /<\/?[^>]+>/gi,
        
        /**
         * Strips all HTML tags
         * @param {Mixed} value The text from which to strip tags
         * @return {String} The stripped text
         */
        stripTags : function(v){
            return !v ? v : String(v).replace(this.stripTagsRE, "");
        },
        
        /**
         * Size in Mb,Gb etc.
         * @param {Number} value The number to be formated
         * @param {number} decimals how many decimal places
         * @return {String} the formated string
         */
        size : function(value, decimals)
        {
            var sizes = ['b', 'k', 'M', 'G', 'T'];
            if (value == 0) {
                return 0;
            }
            var i = parseInt(Math.floor(Math.log(value) / Math.log(1024)));
            return Roo.util.Format.number(value/ Math.pow(1024, i) ,decimals)   + sizes[i];
        }
        
        
        
    };
}();
Roo.util.Format.defaults = {
    date : 'd/M/Y'
};/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */


 

/**
 * @class Roo.MasterTemplate
 * @extends Roo.Template
 * Provides a template that can have child templates. The syntax is:
<pre><code>
var t = new Roo.MasterTemplate(
	'&lt;select name="{name}"&gt;',
		'&lt;tpl name="options"&gt;&lt;option value="{value:trim}"&gt;{text:ellipsis(10)}&lt;/option&gt;&lt;/tpl&gt;',
	'&lt;/select&gt;'
);
t.add('options', {value: 'foo', text: 'bar'});
// or you can add multiple child elements in one shot
t.addAll('options', [
    {value: 'foo', text: 'bar'},
    {value: 'foo2', text: 'bar2'},
    {value: 'foo3', text: 'bar3'}
]);
// then append, applying the master template values
t.append('my-form', {name: 'my-select'});
</code></pre>
* A name attribute for the child template is not required if you have only one child
* template or you want to refer to them by index.
 */
Roo.MasterTemplate = function(){
    Roo.MasterTemplate.superclass.constructor.apply(this, arguments);
    this.originalHtml = this.html;
    var st = {};
    var m, re = this.subTemplateRe;
    re.lastIndex = 0;
    var subIndex = 0;
    while(m = re.exec(this.html)){
        var name = m[1], content = m[2];
        st[subIndex] = {
            name: name,
            index: subIndex,
            buffer: [],
            tpl : new Roo.Template(content)
        };
        if(name){
            st[name] = st[subIndex];
        }
        st[subIndex].tpl.compile();
        st[subIndex].tpl.call = this.call.createDelegate(this);
        subIndex++;
    }
    this.subCount = subIndex;
    this.subs = st;
};
Roo.extend(Roo.MasterTemplate, Roo.Template, {
    /**
    * The regular expression used to match sub templates
    * @type RegExp
    * @property
    */
    subTemplateRe : /<tpl(?:\sname="([\w-]+)")?>((?:.|\n)*?)<\/tpl>/gi,

    /**
     * Applies the passed values to a child template.
     * @param {String/Number} name (optional) The name or index of the child template
     * @param {Array/Object} values The values to be applied to the template
     * @return {MasterTemplate} this
     */
     add : function(name, values){
        if(arguments.length == 1){
            values = arguments[0];
            name = 0;
        }
        var s = this.subs[name];
        s.buffer[s.buffer.length] = s.tpl.apply(values);
        return this;
    },

    /**
     * Applies all the passed values to a child template.
     * @param {String/Number} name (optional) The name or index of the child template
     * @param {Array} values The values to be applied to the template, this should be an array of objects.
     * @param {Boolean} reset (optional) True to reset the template first
     * @return {MasterTemplate} this
     */
    fill : function(name, values, reset){
        var a = arguments;
        if(a.length == 1 || (a.length == 2 && typeof a[1] == "boolean")){
            values = a[0];
            name = 0;
            reset = a[1];
        }
        if(reset){
            this.reset();
        }
        for(var i = 0, len = values.length; i < len; i++){
            this.add(name, values[i]);
        }
        return this;
    },

    /**
     * Resets the template for reuse
     * @return {MasterTemplate} this
     */
     reset : function(){
        var s = this.subs;
        for(var i = 0; i < this.subCount; i++){
            s[i].buffer = [];
        }
        return this;
    },

    applyTemplate : function(values){
        var s = this.subs;
        var replaceIndex = -1;
        this.html = this.originalHtml.replace(this.subTemplateRe, function(m, name){
            return s[++replaceIndex].buffer.join("");
        });
        return Roo.MasterTemplate.superclass.applyTemplate.call(this, values);
    },

    apply : function(){
        return this.applyTemplate.apply(this, arguments);
    },

    compile : function(){return this;}
});

/**
 * Alias for fill().
 * @method
 */
Roo.MasterTemplate.prototype.addAll = Roo.MasterTemplate.prototype.fill;
 /**
 * Creates a template from the passed element's value (display:none textarea, preferred) or innerHTML. e.g.
 * var tpl = Roo.MasterTemplate.from('element-id');
 * @param {String/HTMLElement} el
 * @param {Object} config
 * @static
 */
Roo.MasterTemplate.from = function(el, config){
    el = Roo.getDom(el);
    return new Roo.MasterTemplate(el.value || el.innerHTML, config || '');
};/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

 
/**
 * @class Roo.util.CSS
 * Utility class for manipulating CSS rules
 * @static

 */
Roo.util.CSS = function(){
	var rules = null;
   	var doc = document;

    var camelRe = /(-[a-z])/gi;
    var camelFn = function(m, a){ return a.charAt(1).toUpperCase(); };

   return {
   /**
    * Very simple dynamic creation of stylesheets from a text blob of rules.  The text will wrapped in a style
    * tag and appended to the HEAD of the document.
    * @param {String|Object} cssText The text containing the css rules
    * @param {String} id An id to add to the stylesheet for later removal
    * @return {StyleSheet}
    */
    createStyleSheet : function(cssText, id){
        var ss;
        var head = doc.getElementsByTagName("head")[0];
        var nrules = doc.createElement("style");
        nrules.setAttribute("type", "text/css");
        if(id){
            nrules.setAttribute("id", id);
        }
        if (typeof(cssText) != 'string') {
            // support object maps..
            // not sure if this a good idea.. 
            // perhaps it should be merged with the general css handling
            // and handle js style props.
            var cssTextNew = [];
            for(var n in cssText) {
                var citems = [];
                for(var k in cssText[n]) {
                    citems.push( k + ' : ' +cssText[n][k] + ';' );
                }
                cssTextNew.push( n + ' { ' + citems.join(' ') + '} ');
                
            }
            cssText = cssTextNew.join("\n");
            
        }
       
       
       if(Roo.isIE){
           head.appendChild(nrules);
           ss = nrules.styleSheet;
           ss.cssText = cssText;
       }else{
           try{
                nrules.appendChild(doc.createTextNode(cssText));
           }catch(e){
               nrules.cssText = cssText; 
           }
           head.appendChild(nrules);
           ss = nrules.styleSheet ? nrules.styleSheet : (nrules.sheet || doc.styleSheets[doc.styleSheets.length-1]);
       }
       this.cacheStyleSheet(ss);
       return ss;
   },

   /**
    * Removes a style or link tag by id
    * @param {String} id The id of the tag
    */
   removeStyleSheet : function(id){
       var existing = doc.getElementById(id);
       if(existing){
           existing.parentNode.removeChild(existing);
       }
   },

   /**
    * Dynamically swaps an existing stylesheet reference for a new one
    * @param {String} id The id of an existing link tag to remove
    * @param {String} url The href of the new stylesheet to include
    */
   swapStyleSheet : function(id, url){
       this.removeStyleSheet(id);
       var ss = doc.createElement("link");
       ss.setAttribute("rel", "stylesheet");
       ss.setAttribute("type", "text/css");
       ss.setAttribute("id", id);
       ss.setAttribute("href", url);
       doc.getElementsByTagName("head")[0].appendChild(ss);
   },
   
   /**
    * Refresh the rule cache if you have dynamically added stylesheets
    * @return {Object} An object (hash) of rules indexed by selector
    */
   refreshCache : function(){
       return this.getRules(true);
   },

   // private
   cacheStyleSheet : function(stylesheet){
       if(!rules){
           rules = {};
       }
       try{// try catch for cross domain access issue
           var ssRules = stylesheet.cssRules || stylesheet.rules;
           for(var j = ssRules.length-1; j >= 0; --j){
               rules[ssRules[j].selectorText] = ssRules[j];
           }
       }catch(e){}
   },
   
   /**
    * Gets all css rules for the document
    * @param {Boolean} refreshCache true to refresh the internal cache
    * @return {Object} An object (hash) of rules indexed by selector
    */
   getRules : function(refreshCache){
   		if(rules == null || refreshCache){
   			rules = {};
   			var ds = doc.styleSheets;
   			for(var i =0, len = ds.length; i < len; i++){
   			    try{
    		        this.cacheStyleSheet(ds[i]);
    		    }catch(e){} 
	        }
   		}
   		return rules;
   	},
   	
   	/**
    * Gets an an individual CSS rule by selector(s)
    * @param {String/Array} selector The CSS selector or an array of selectors to try. The first selector that is found is returned.
    * @param {Boolean} refreshCache true to refresh the internal cache if you have recently updated any rules or added styles dynamically
    * @return {CSSRule} The CSS rule or null if one is not found
    */
   getRule : function(selector, refreshCache){
   		var rs = this.getRules(refreshCache);
   		if(!(selector instanceof Array)){
   		    return rs[selector];
   		}
   		for(var i = 0; i < selector.length; i++){
			if(rs[selector[i]]){
				return rs[selector[i]];
			}
		}
		return null;
   	},
   	
   	
   	/**
    * Updates a rule property
    * @param {String/Array} selector If it's an array it tries each selector until it finds one. Stops immediately once one is found.
    * @param {String} property The css property
    * @param {String} value The new value for the property
    * @return {Boolean} true If a rule was found and updated
    */
   updateRule : function(selector, property, value){
   		if(!(selector instanceof Array)){
   			var rule = this.getRule(selector);
   			if(rule){
   				rule.style[property.replace(camelRe, camelFn)] = value;
   				return true;
   			}
   		}else{
   			for(var i = 0; i < selector.length; i++){
   				if(this.updateRule(selector[i], property, value)){
   					return true;
   				}
   			}
   		}
   		return false;
   	}
   };	
}();/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

 

/**
 * @class Roo.util.ClickRepeater
 * @extends Roo.util.Observable
 * 
 * A wrapper class which can be applied to any element. Fires a "click" event while the
 * mouse is pressed. The interval between firings may be specified in the config but
 * defaults to 10 milliseconds.
 * 
 * Optionally, a CSS class may be applied to the element during the time it is pressed.
 * 
 * @cfg {String/HTMLElement/Element} el The element to act as a button.
 * @cfg {Number} delay The initial delay before the repeating event begins firing.
 * Similar to an autorepeat key delay.
 * @cfg {Number} interval The interval between firings of the "click" event. Default 10 ms.
 * @cfg {String} pressClass A CSS class name to be applied to the element while pressed.
 * @cfg {Boolean} accelerate True if autorepeating should start slowly and accelerate.
 *           "interval" and "delay" are ignored. "immediate" is honored.
 * @cfg {Boolean} preventDefault True to prevent the default click event
 * @cfg {Boolean} stopDefault True to stop the default click event
 * 
 * @history
 *     2007-02-02 jvs Original code contributed by Nige "Animal" White
 *     2007-02-02 jvs Renamed to ClickRepeater
 *   2007-02-03 jvs Modifications for FF Mac and Safari 
 *
 *  @constructor
 * @param {String/HTMLElement/Element} el The element to listen on
 * @param {Object} config
 **/
Roo.util.ClickRepeater = function(el, config)
{
    this.el = Roo.get(el);
    this.el.unselectable();

    Roo.apply(this, config);

    this.addEvents({
    /**
     * @event mousedown
     * Fires when the mouse button is depressed.
     * @param {Roo.util.ClickRepeater} this
     */
        "mousedown" : true,
    /**
     * @event click
     * Fires on a specified interval during the time the element is pressed.
     * @param {Roo.util.ClickRepeater} this
     */
        "click" : true,
    /**
     * @event mouseup
     * Fires when the mouse key is released.
     * @param {Roo.util.ClickRepeater} this
     */
        "mouseup" : true
    });

    this.el.on("mousedown", this.handleMouseDown, this);
    if(this.preventDefault || this.stopDefault){
        this.el.on("click", function(e){
            if(this.preventDefault){
                e.preventDefault();
            }
            if(this.stopDefault){
                e.stopEvent();
            }
        }, this);
    }

    // allow inline handler
    if(this.handler){
        this.on("click", this.handler,  this.scope || this);
    }

    Roo.util.ClickRepeater.superclass.constructor.call(this);
};

Roo.extend(Roo.util.ClickRepeater, Roo.util.Observable, {
    interval : 20,
    delay: 250,
    preventDefault : true,
    stopDefault : false,
    timer : 0,

    // private
    handleMouseDown : function(){
        clearTimeout(this.timer);
        this.el.blur();
        if(this.pressClass){
            this.el.addClass(this.pressClass);
        }
        this.mousedownTime = new Date();

        Roo.get(document).on("mouseup", this.handleMouseUp, this);
        this.el.on("mouseout", this.handleMouseOut, this);

        this.fireEvent("mousedown", this);
        this.fireEvent("click", this);
        
        this.timer = this.click.defer(this.delay || this.interval, this);
    },

    // private
    click : function(){
        this.fireEvent("click", this);
        this.timer = this.click.defer(this.getInterval(), this);
    },

    // private
    getInterval: function(){
        if(!this.accelerate){
            return this.interval;
        }
        var pressTime = this.mousedownTime.getElapsed();
        if(pressTime < 500){
            return 400;
        }else if(pressTime < 1700){
            return 320;
        }else if(pressTime < 2600){
            return 250;
        }else if(pressTime < 3500){
            return 180;
        }else if(pressTime < 4400){
            return 140;
        }else if(pressTime < 5300){
            return 80;
        }else if(pressTime < 6200){
            return 50;
        }else{
            return 10;
        }
    },

    // private
    handleMouseOut : function(){
        clearTimeout(this.timer);
        if(this.pressClass){
            this.el.removeClass(this.pressClass);
        }
        this.el.on("mouseover", this.handleMouseReturn, this);
    },

    // private
    handleMouseReturn : function(){
        this.el.un("mouseover", this.handleMouseReturn);
        if(this.pressClass){
            this.el.addClass(this.pressClass);
        }
        this.click();
    },

    // private
    handleMouseUp : function(){
        clearTimeout(this.timer);
        this.el.un("mouseover", this.handleMouseReturn);
        this.el.un("mouseout", this.handleMouseOut);
        Roo.get(document).un("mouseup", this.handleMouseUp);
        this.el.removeClass(this.pressClass);
        this.fireEvent("mouseup", this);
    }
});/**
 * @class Roo.util.Clipboard
 * @static
 * 
 * Clipboard UTILS
 * 
 **/
Roo.util.Clipboard = {
    /**
     * Writes a string to the clipboard - using the Clipboard API if https, otherwise using text area.
     * @param {String} text to copy to clipboard
     */
    write : function(text) {
        // navigator clipboard api needs a secure context (https)
        if (navigator.clipboard && window.isSecureContext) {
            // navigator clipboard api method'
            navigator.clipboard.writeText(text);
            return ;
        } 
        // text area method
        var ta = document.createElement("textarea");
        ta.value = text;
        // make the textarea out of viewport
        ta.style.position = "fixed";
        ta.style.left = "-999999px";
        ta.style.top = "-999999px";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        (function() {
            ta.remove();
        }).defer(100);
        
    }
        
}
    /*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

 
/**
 * @class Roo.KeyNav
 * <p>Provides a convenient wrapper for normalized keyboard navigation.  KeyNav allows you to bind
 * navigation keys to function calls that will get called when the keys are pressed, providing an easy
 * way to implement custom navigation schemes for any UI component.</p>
 * <p>The following are all of the possible keys that can be implemented: enter, left, right, up, down, tab, esc,
 * pageUp, pageDown, del, home, end.  Usage:</p>
 <pre><code>
var nav = new Roo.KeyNav("my-element", {
    "left" : function(e){
        this.moveLeft(e.ctrlKey);
    },
    "right" : function(e){
        this.moveRight(e.ctrlKey);
    },
    "enter" : function(e){
        this.save();
    },
    scope : this
});
</code></pre>
 * @constructor
 * @param {String/HTMLElement/Roo.Element} el The element to bind to
 * @param {Object} config The config
 */
Roo.KeyNav = function(el, config){
    this.el = Roo.get(el);
    Roo.apply(this, config);
    if(!this.disabled){
        this.disabled = true;
        this.enable();
    }
};

Roo.KeyNav.prototype = {
    /**
     * @cfg {Boolean} disabled
     * True to disable this KeyNav instance (defaults to false)
     */
    disabled : false,
    /**
     * @cfg {String} defaultEventAction
     * The method to call on the {@link Roo.EventObject} after this KeyNav intercepts a key.  Valid values are
     * {@link Roo.EventObject#stopEvent}, {@link Roo.EventObject#preventDefault} and
     * {@link Roo.EventObject#stopPropagation} (defaults to 'stopEvent')
     */
    defaultEventAction: "stopEvent",
    /**
     * @cfg {Boolean} forceKeyDown
     * Handle the keydown event instead of keypress (defaults to false).  KeyNav automatically does this for IE since
     * IE does not propagate special keys on keypress, but setting this to true will force other browsers to also
     * handle keydown instead of keypress.
     */
    forceKeyDown : false,

    // private
    prepareEvent : function(e){
        var k = e.getKey();
        var h = this.keyToHandler[k];
        //if(h && this[h]){
        //    e.stopPropagation();
        //}
        if(Roo.isSafari && h && k >= 37 && k <= 40){
            e.stopEvent();
        }
    },

    // private
    relay : function(e){
        var k = e.getKey();
        var h = this.keyToHandler[k];
        if(h && this[h]){
            if(this.doRelay(e, this[h], h) !== true){
                e[this.defaultEventAction]();
            }
        }
    },

    // private
    doRelay : function(e, h, hname){
        return h.call(this.scope || this, e);
    },

    // possible handlers
    enter : false,
    left : false,
    right : false,
    up : false,
    down : false,
    tab : false,
    esc : false,
    pageUp : false,
    pageDown : false,
    del : false,
    home : false,
    end : false,

    // quick lookup hash
    keyToHandler : {
        37 : "left",
        39 : "right",
        38 : "up",
        40 : "down",
        33 : "pageUp",
        34 : "pageDown",
        46 : "del",
        36 : "home",
        35 : "end",
        13 : "enter",
        27 : "esc",
        9  : "tab"
    },

	/**
	 * Enable this KeyNav
	 */
	enable: function(){
		if(this.disabled){
            // ie won't do special keys on keypress, no one else will repeat keys with keydown
            // the EventObject will normalize Safari automatically
            if(this.forceKeyDown || Roo.isIE || Roo.isAir){
                this.el.on("keydown", this.relay,  this);
            }else{
                this.el.on("keydown", this.prepareEvent,  this);
                this.el.on("keypress", this.relay,  this);
            }
		    this.disabled = false;
		}
	},

	/**
	 * Disable this KeyNav
	 */
	disable: function(){
		if(!this.disabled){
		    if(this.forceKeyDown || Roo.isIE || Roo.isAir){
                this.el.un("keydown", this.relay);
            }else{
                this.el.un("keydown", this.prepareEvent);
                this.el.un("keypress", this.relay);
            }
		    this.disabled = true;
		}
	}
};/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

 
/**
 * @class Roo.KeyMap
 * Handles mapping keys to actions for an element. One key map can be used for multiple actions.
 * The constructor accepts the same config object as defined by {@link #addBinding}.
 * If you bind a callback function to a KeyMap, anytime the KeyMap handles an expected key
 * combination it will call the function with this signature (if the match is a multi-key
 * combination the callback will still be called only once): (String key, Roo.EventObject e)
 * A KeyMap can also handle a string representation of keys.<br />
 * Usage:
 <pre><code>
// map one key by key code
var map = new Roo.KeyMap("my-element", {
    key: 13, // or Roo.EventObject.ENTER
    fn: myHandler,
    scope: myObject
});

// map multiple keys to one action by string
var map = new Roo.KeyMap("my-element", {
    key: "a\r\n\t",
    fn: myHandler,
    scope: myObject
});

// map multiple keys to multiple actions by strings and array of codes
var map = new Roo.KeyMap("my-element", [
    {
        key: [10,13],
        fn: function(){ alert("Return was pressed"); }
    }, {
        key: "abc",
        fn: function(){ alert('a, b or c was pressed'); }
    }, {
        key: "\t",
        ctrl:true,
        shift:true,
        fn: function(){ alert('Control + shift + tab was pressed.'); }
    }
]);
</code></pre>
 * <b>Note: A KeyMap starts enabled</b>
 * @constructor
 * @param {String/HTMLElement/Roo.Element} el The element to bind to
 * @param {Object} config The config (see {@link #addBinding})
 * @param {String} eventName (optional) The event to bind to (defaults to "keydown")
 */
Roo.KeyMap = function(el, config, eventName){
    this.el  = Roo.get(el);
    this.eventName = eventName || "keydown";
    this.bindings = [];
    if(config){
        this.addBinding(config);
    }
    this.enable();
};

Roo.KeyMap.prototype = {
    /**
     * True to stop the event from bubbling and prevent the default browser action if the
     * key was handled by the KeyMap (defaults to false)
     * @type Boolean
     */
    stopEvent : false,

    /**
     * Add a new binding to this KeyMap. The following config object properties are supported:
     * <pre>
Property    Type             Description
----------  ---------------  ----------------------------------------------------------------------
key         String/Array     A single keycode or an array of keycodes to handle
shift       Boolean          True to handle key only when shift is pressed (defaults to false)
ctrl        Boolean          True to handle key only when ctrl is pressed (defaults to false)
alt         Boolean          True to handle key only when alt is pressed (defaults to false)
fn          Function         The function to call when KeyMap finds the expected key combination
scope       Object           The scope of the callback function
</pre>
     *
     * Usage:
     * <pre><code>
// Create a KeyMap
var map = new Roo.KeyMap(document, {
    key: Roo.EventObject.ENTER,
    fn: handleKey,
    scope: this
});

//Add a new binding to the existing KeyMap later
map.addBinding({
    key: 'abc',
    shift: true,
    fn: handleKey,
    scope: this
});
</code></pre>
     * @param {Object/Array} config A single KeyMap config or an array of configs
     */
	addBinding : function(config){
        if(config instanceof Array){
            for(var i = 0, len = config.length; i < len; i++){
                this.addBinding(config[i]);
            }
            return;
        }
        var keyCode = config.key,
            shift = config.shift, 
            ctrl = config.ctrl, 
            alt = config.alt,
            fn = config.fn,
            scope = config.scope;
        if(typeof keyCode == "string"){
            var ks = [];
            var keyString = keyCode.toUpperCase();
            for(var j = 0, len = keyString.length; j < len; j++){
                ks.push(keyString.charCodeAt(j));
            }
            keyCode = ks;
        }
        var keyArray = keyCode instanceof Array;
        var handler = function(e){
            if((!shift || e.shiftKey) && (!ctrl || e.ctrlKey) &&  (!alt || e.altKey)){
                var k = e.getKey();
                if(keyArray){
                    for(var i = 0, len = keyCode.length; i < len; i++){
                        if(keyCode[i] == k){
                          if(this.stopEvent){
                              e.stopEvent();
                          }
                          fn.call(scope || window, k, e);
                          return;
                        }
                    }
                }else{
                    if(k == keyCode){
                        if(this.stopEvent){
                           e.stopEvent();
                        }
                        fn.call(scope || window, k, e);
                    }
                }
            }
        };
        this.bindings.push(handler);  
	},

    /**
     * Shorthand for adding a single key listener
     * @param {Number/Array/Object} key Either the numeric key code, array of key codes or an object with the
     * following options:
     * {key: (number or array), shift: (true/false), ctrl: (true/false), alt: (true/false)}
     * @param {Function} fn The function to call
     * @param {Object} scope (optional) The scope of the function
     */
    on : function(key, fn, scope){
        var keyCode, shift, ctrl, alt;
        if(typeof key == "object" && !(key instanceof Array)){
            keyCode = key.key;
            shift = key.shift;
            ctrl = key.ctrl;
            alt = key.alt;
        }else{
            keyCode = key;
        }
        this.addBinding({
            key: keyCode,
            shift: shift,
            ctrl: ctrl,
            alt: alt,
            fn: fn,
            scope: scope
        })
    },

    // private
    handleKeyDown : function(e){
	    if(this.enabled){ //just in case
    	    var b = this.bindings;
    	    for(var i = 0, len = b.length; i < len; i++){
    	        b[i].call(this, e);
    	    }
	    }
	},
	
	/**
	 * Returns true if this KeyMap is enabled
	 * @return {Boolean} 
	 */
	isEnabled : function(){
	    return this.enabled;  
	},
	
	/**
	 * Enables this KeyMap
	 */
	enable: function(){
		if(!this.enabled){
		    this.el.on(this.eventName, this.handleKeyDown, this);
		    this.enabled = true;
		}
	},

	/**
	 * Disable this KeyMap
	 */
	disable: function(){
		if(this.enabled){
		    this.el.removeListener(this.eventName, this.handleKeyDown, this);
		    this.enabled = false;
		}
	}
};/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

 
/**
 * @class Roo.util.TextMetrics
 * Provides precise pixel measurements for blocks of text so that you can determine exactly how high and
 * wide, in pixels, a given block of text will be.
 * @static
 */
Roo.util.TextMetrics = function(){
    var shared;
    return {
        /**
         * Measures the size of the specified text
         * @param {String/HTMLElement} el The element, dom node or id from which to copy existing CSS styles
         * that can affect the size of the rendered text
         * @param {String} text The text to measure
         * @param {Number} fixedWidth (optional) If the text will be multiline, you have to set a fixed width
         * in order to accurately measure the text height
         * @return {Object} An object containing the text's size {width: (width), height: (height)}
         */
        measure : function(el, text, fixedWidth){
            if(!shared){
                shared = Roo.util.TextMetrics.Instance(el, fixedWidth);
            }
            shared.bind(el);
            shared.setFixedWidth(fixedWidth || 'auto');
            return shared.getSize(text);
        },

        /**
         * Return a unique TextMetrics instance that can be bound directly to an element and reused.  This reduces
         * the overhead of multiple calls to initialize the style properties on each measurement.
         * @param {String/HTMLElement} el The element, dom node or id that the instance will be bound to
         * @param {Number} fixedWidth (optional) If the text will be multiline, you have to set a fixed width
         * in order to accurately measure the text height
         * @return {Roo.util.TextMetrics.Instance} instance The new instance
         */
        createInstance : function(el, fixedWidth){
            return Roo.util.TextMetrics.Instance(el, fixedWidth);
        }
    };
}();

/**
 * @class Roo.util.TextMetrics.Instance
 * Instance of  TextMetrics Calcuation
 * @constructor
 * Create a new TextMetrics Instance
 * @param {Object} bindto
 * @param {Boolean} fixedWidth
 */

Roo.util.TextMetrics.Instance = function(bindTo, fixedWidth)
{
    var ml = new Roo.Element(document.createElement('div'));
    document.body.appendChild(ml.dom);
    ml.position('absolute');
    ml.setLeftTop(-1000, -1000);
    ml.hide();

    if(fixedWidth){
        ml.setWidth(fixedWidth);
    }
     
    var instance = {
        /**
         * Returns the size of the specified text based on the internal element's style and width properties
         * @param {String} text The text to measure
         * @return {Object} An object containing the text's size {width: (width), height: (height)}
         */
        getSize : function(text){
            ml.update(text);
            var s = ml.getSize();
            ml.update('');
            return s;
        },

        /**
         * Binds this TextMetrics instance to an element from which to copy existing CSS styles
         * that can affect the size of the rendered text
         * @param {String/HTMLElement} el The element, dom node or id
         */
        bind : function(el){
            ml.setStyle(
                Roo.fly(el).getStyles('font-size','font-style', 'font-weight', 'font-family','line-height')
            );
        },

        /**
         * Sets a fixed width on the internal measurement element.  If the text will be multiline, you have
         * to set a fixed width in order to accurately measure the text height.
         * @param {Number} width The width to set on the element
         */
        setFixedWidth : function(width){
            ml.setWidth(width);
        },

        /**
         * Returns the measured width of the specified text
         * @param {String} text The text to measure
         * @return {Number} width The width in pixels
         */
        getWidth : function(text){
            ml.dom.style.width = 'auto';
            return this.getSize(text).width;
        },

        /**
         * Returns the measured height of the specified text.  For multiline text, be sure to call
         * {@link #setFixedWidth} if necessary.
         * @param {String} text The text to measure
         * @return {Number} height The height in pixels
         */
        getHeight : function(text){
            return this.getSize(text).height;
        }
    };

    instance.bind(bindTo);

    return instance;
};

// backwards compat
Roo.Element.measureText = Roo.util.TextMetrics.measure;/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

/**
 * @class Roo.state.Provider
 * Abstract base class for state provider implementations. This class provides methods
 * for encoding and decoding <b>typed</b> variables including dates and defines the 
 * Provider interface.
 */
Roo.state.Provider = function(){
    /**
     * @event statechange
     * Fires when a state change occurs.
     * @param {Provider} this This state provider
     * @param {String} key The state key which was changed
     * @param {String} value The encoded value for the state
     */
    this.addEvents({
        "statechange": true
    });
    this.state = {};
    Roo.state.Provider.superclass.constructor.call(this);
};
Roo.extend(Roo.state.Provider, Roo.util.Observable, {
    /**
     * Returns the current value for a key
     * @param {String} name The key name
     * @param {Mixed} defaultValue A default value to return if the key's value is not found
     * @return {Mixed} The state data
     */
    get : function(name, defaultValue){
        return typeof this.state[name] == "undefined" ?
            defaultValue : this.state[name];
    },
    
    /**
     * Clears a value from the state
     * @param {String} name The key name
     */
    clear : function(name){
        delete this.state[name];
        this.fireEvent("statechange", this, name, null);
    },
    
    /**
     * Sets the value for a key
     * @param {String} name The key name
     * @param {Mixed} value The value to set
     */
    set : function(name, value){
        this.state[name] = value;
        this.fireEvent("statechange", this, name, value);
    },
    
    /**
     * Decodes a string previously encoded with {@link #encodeValue}.
     * @param {String} value The value to decode
     * @return {Mixed} The decoded value
     */
    decodeValue : function(cookie){
        var re = /^(a|n|d|b|s|o)\:(.*)$/;
        var matches = re.exec(unescape(cookie));
        if(!matches || !matches[1]) {
            return; // non state cookie
        }
        var type = matches[1];
        var v = matches[2];
        switch(type){
            case "n":
                return parseFloat(v);
            case "d":
                return new Date(Date.parse(v));
            case "b":
                return (v == "1");
            case "a":
                var all = [];
                var values = v.split("^");
                for(var i = 0, len = values.length; i < len; i++){
                    all.push(this.decodeValue(values[i]));
                }
                return all;
           case "o":
                var all = {};
                var values = v.split("^");
                for(var i = 0, len = values.length; i < len; i++){
                    var kv = values[i].split("=");
                    all[kv[0]] = this.decodeValue(kv[1]);
                }
                return all;
           default:
                return v;
        }
    },
    
    /**
     * Encodes a value including type information.  Decode with {@link #decodeValue}.
     * @param {Mixed} value The value to encode
     * @return {String} The encoded value
     */
    encodeValue : function(v){
        var enc;
        if(typeof v == "number"){
            enc = "n:" + v;
        }else if(typeof v == "boolean"){
            enc = "b:" + (v ? "1" : "0");
        }else if(v instanceof Date){
            enc = "d:" + v.toGMTString();
        }else if(v instanceof Array){
            var flat = "";
            for(var i = 0, len = v.length; i < len; i++){
                flat += this.encodeValue(v[i]);
                if(i != len-1) {
                    flat += "^";
                }
            }
            enc = "a:" + flat;
        }else if(typeof v == "object"){
            var flat = "";
            for(var key in v){
                if(typeof v[key] != "function"){
                    flat += key + "=" + this.encodeValue(v[key]) + "^";
                }
            }
            enc = "o:" + flat.substring(0, flat.length-1);
        }else{
            enc = "s:" + v;
        }
        return escape(enc);        
    }
});

/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
/**
 * @class Roo.state.Manager
 * This is the global state manager. By default all components that are "state aware" check this class
 * for state information if you don't pass them a custom state provider. In order for this class
 * to be useful, it must be initialized with a provider when your application initializes.
 <pre><code>
// in your initialization function
init : function(){
   Roo.state.Manager.setProvider(new Roo.state.CookieProvider());
   ...
   // supposed you have a {@link Roo.layout.Border}
   var layout = new Roo.layout.Border(...);
   layout.restoreState();
   // or a {Roo.BasicDialog}
   var dialog = new Roo.BasicDialog(...);
   dialog.restoreState();
 </code></pre>
 * @static
 */
Roo.state.Manager = function(){
    var provider = new Roo.state.Provider();
    
    return {
        /**
         * Configures the default state provider for your application
         * @param {Provider} stateProvider The state provider to set
         */
        setProvider : function(stateProvider){
            provider = stateProvider;
        },
        
        /**
         * Returns the current value for a key
         * @param {String} name The key name
         * @param {Mixed} defaultValue The default value to return if the key lookup does not match
         * @return {Mixed} The state data
         */
        get : function(key, defaultValue){
            return provider.get(key, defaultValue);
        },
        
        /**
         * Sets the value for a key
         * @param {String} name The key name
         * @param {Mixed} value The state data
         */
         set : function(key, value){
            provider.set(key, value);
        },
        
        /**
         * Clears a value from the state
         * @param {String} name The key name
         */
        clear : function(key){
            provider.clear(key);
        },
        
        /**
         * Gets the currently configured state provider
         * @return {Provider} The state provider
         */
        getProvider : function(){
            return provider;
        }
    };
}();
/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
/**
 * @class Roo.state.CookieProvider
 * @extends Roo.state.Provider
 * The default Provider implementation which saves state via cookies.
 * <br />Usage:
 <pre><code>
   var cp = new Roo.state.CookieProvider({
       path: "/cgi-bin/",
       expires: new Date(new Date().getTime()+(1000*60*60*24*30)); //30 days
       domain: "roojs.com"
   })
   Roo.state.Manager.setProvider(cp);
 </code></pre>
 * @cfg {String} path The path for which the cookie is active (defaults to root '/' which makes it active for all pages in the site)
 * @cfg {Date} expires The cookie expiration date (defaults to 7 days from now)
 * @cfg {String} domain The domain to save the cookie for.  Note that you cannot specify a different domain than
 * your page is on, but you can specify a sub-domain, or simply the domain itself like 'roojs.com' to include
 * all sub-domains if you need to access cookies across different sub-domains (defaults to null which uses the same
 * domain the page is running on including the 'www' like 'www.roojs.com')
 * @cfg {Boolean} secure True if the site is using SSL (defaults to false)
 * @constructor
 * Create a new CookieProvider
 * @param {Object} config The configuration object
 */
Roo.state.CookieProvider = function(config){
    Roo.state.CookieProvider.superclass.constructor.call(this);
    this.path = "/";
    this.expires = new Date(new Date().getTime()+(1000*60*60*24*7)); //7 days
    this.domain = null;
    this.secure = false;
    Roo.apply(this, config);
    this.state = this.readCookies();
};

Roo.extend(Roo.state.CookieProvider, Roo.state.Provider, {
    // private
    set : function(name, value){
        if(typeof value == "undefined" || value === null){
            this.clear(name);
            return;
        }
        this.setCookie(name, value);
        Roo.state.CookieProvider.superclass.set.call(this, name, value);
    },

    // private
    clear : function(name){
        this.clearCookie(name);
        Roo.state.CookieProvider.superclass.clear.call(this, name);
    },

    // private
    readCookies : function(){
        var cookies = {};
        var c = document.cookie + ";";
        var re = /\s?(.*?)=(.*?);/g;
    	var matches;
    	while((matches = re.exec(c)) != null){
            var name = matches[1];
            var value = matches[2];
            if(name && name.substring(0,3) == "ys-"){
                cookies[name.substr(3)] = this.decodeValue(value);
            }
        }
        return cookies;
    },

    // private
    setCookie : function(name, value){
        document.cookie = "ys-"+ name + "=" + this.encodeValue(value) +
           ((this.expires == null) ? "" : ("; expires=" + this.expires.toGMTString())) +
           ((this.path == null) ? "" : ("; path=" + this.path)) +
           ((this.domain == null) ? "" : ("; domain=" + this.domain)) +
           ((this.secure == true) ? "; secure" : "");
    },

    // private
    clearCookie : function(name){
        document.cookie = "ys-" + name + "=null; expires=Thu, 01-Jan-70 00:00:01 GMT" +
           ((this.path == null) ? "" : ("; path=" + this.path)) +
           ((this.domain == null) ? "" : ("; domain=" + this.domain)) +
           ((this.secure == true) ? "; secure" : "");
    }
});/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 

/**
 * @class Roo.ComponentMgr
 * Provides a common registry of all components on a page so that they can be easily accessed by component id (see {@link Roo.getCmp}).
 * @static
 */
Roo.ComponentMgr = function(){
    var all = new Roo.util.MixedCollection();

    return {
        /**
         * Registers a component.
         * @param {Roo.Component} c The component
         */
        register : function(c){
            all.add(c);
        },

        /**
         * Unregisters a component.
         * @param {Roo.Component} c The component
         */
        unregister : function(c){
            all.remove(c);
        },

        /**
         * Returns a component by id
         * @param {String} id The component id
         */
        get : function(id){
            return all.get(id);
        },

        /**
         * Registers a function that will be called when a specified component is added to ComponentMgr
         * @param {String} id The component id
         * @param {Funtction} fn The callback function
         * @param {Object} scope The scope of the callback
         */
        onAvailable : function(id, fn, scope){
            all.on("add", function(index, o){
                if(o.id == id){
                    fn.call(scope || o, o);
                    all.un("add", fn, scope);
                }
            });
        }
    };
}();/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 
/**
 * @class Roo.Component
 * @extends Roo.util.Observable
 * Base class for all major Roo components.  All subclasses of Component can automatically participate in the standard
 * Roo component lifecycle of creation, rendering and destruction.  They also have automatic support for basic hide/show
 * and enable/disable behavior.  Component allows any subclass to be lazy-rendered into any {@link Roo.Container} and
 * to be automatically registered with the {@link Roo.ComponentMgr} so that it can be referenced at any time via {@link Roo.getCmp}.
 * All visual components (widgets) that require rendering into a layout should subclass Component.
 * @constructor
 * @param {Roo.Element/String/Object} config The configuration options.  If an element is passed, it is set as the internal
 * element and its id used as the component id.  If a string is passed, it is assumed to be the id of an existing element
 * and is used as the component id.  Otherwise, it is assumed to be a standard config object and is applied to the component.
 */
Roo.Component = function(config){
    config = config || {};
    if(config.tagName || config.dom || typeof config == "string"){ // element object
        config = {el: config, id: config.id || config};
    }
    this.initialConfig = config;

    Roo.apply(this, config);
    this.addEvents({
        /**
         * @event disable
         * Fires after the component is disabled.
	     * @param {Roo.Component} this
	     */
        disable : true,
        /**
         * @event enable
         * Fires after the component is enabled.
	     * @param {Roo.Component} this
	     */
        enable : true,
        /**
         * @event beforeshow
         * Fires before the component is shown.  Return false to stop the show.
	     * @param {Roo.Component} this
	     */
        beforeshow : true,
        /**
         * @event show
         * Fires after the component is shown.
	     * @param {Roo.Component} this
	     */
        show : true,
        /**
         * @event beforehide
         * Fires before the component is hidden. Return false to stop the hide.
	     * @param {Roo.Component} this
	     */
        beforehide : true,
        /**
         * @event hide
         * Fires after the component is hidden.
	     * @param {Roo.Component} this
	     */
        hide : true,
        /**
         * @event beforerender
         * Fires before the component is rendered. Return false to stop the render.
	     * @param {Roo.Component} this
	     */
        beforerender : true,
        /**
         * @event render
         * Fires after the component is rendered.
	     * @param {Roo.Component} this
	     */
        render : true,
        /**
         * @event beforedestroy
         * Fires before the component is destroyed. Return false to stop the destroy.
	     * @param {Roo.Component} this
	     */
        beforedestroy : true,
        /**
         * @event destroy
         * Fires after the component is destroyed.
	     * @param {Roo.Component} this
	     */
        destroy : true
    });
    if(!this.id){
        this.id = "roo-comp-" + (++Roo.Component.AUTO_ID);
    }
    Roo.ComponentMgr.register(this);
    Roo.Component.superclass.constructor.call(this);
    this.initComponent();
    if(this.renderTo){ // not supported by all components yet. use at your own risk!
        this.render(this.renderTo);
        delete this.renderTo;
    }
};

/** @private */
Roo.Component.AUTO_ID = 1000;

Roo.extend(Roo.Component, Roo.util.Observable, {
    /**
     * @scope Roo.Component.prototype
     * @type {Boolean}
     * true if this component is hidden. Read-only.
     */
    hidden : false,
    /**
     * @type {Boolean}
     * true if this component is disabled. Read-only.
     */
    disabled : false,
    /**
     * @type {Boolean}
     * true if this component has been rendered. Read-only.
     */
    rendered : false,
    
    /** @cfg {String} disableClass
     * CSS class added to the component when it is disabled (defaults to "x-item-disabled").
     */
    disabledClass : "x-item-disabled",
	/** @cfg {Boolean} allowDomMove
	 * Whether the component can move the Dom node when rendering (defaults to true).
	 */
    allowDomMove : true,
    /** @cfg {String} hideMode (display|visibility)
     * How this component should hidden. Supported values are
     * "visibility" (css visibility), "offsets" (negative offset position) and
     * "display" (css display) - defaults to "display".
     */
    hideMode: 'display',

    /** @private */
    ctype : "Roo.Component",

    /**
     * @cfg {String} actionMode 
     * which property holds the element that used for  hide() / show() / disable() / enable()
     * default is 'el' for forms you probably want to set this to fieldEl 
     */
    actionMode : "el",

	 /**
     * @cfg {String} style
     * css styles to add to component
     * eg. text-align:right;
     */
    style : false,
	
    /** @private */
    getActionEl : function(){
        return this[this.actionMode];
    },

    initComponent : Roo.emptyFn,
    /**
     * If this is a lazy rendering component, render it to its container element.
     * @param {String/HTMLElement/Element} container (optional) The element this component should be rendered into. If it is being applied to existing markup, this should be left off.
     */
    render : function(container, position){
        
        if(this.rendered){
            return this;
        }
        
        if(this.fireEvent("beforerender", this) === false){
            return false;
        }
        
        if(!container && this.el){
            this.el = Roo.get(this.el);
            container = this.el.dom.parentNode;
            this.allowDomMove = false;
        }
        this.container = Roo.get(container);
        this.rendered = true;
        if(position !== undefined){
            if(typeof position == 'number'){
                position = this.container.dom.childNodes[position];
            }else{
                position = Roo.getDom(position);
            }
        }
        this.onRender(this.container, position || null);
        if(this.cls){
            this.el.addClass(this.cls);
            delete this.cls;
        }
        if(this.style){
            this.el.applyStyles(this.style);
            delete this.style;
        }
        this.fireEvent("render", this);
        this.afterRender(this.container);
        if(this.hidden){
            this.hide();
        }
        if(this.disabled){
            this.disable();
        }

        return this;
        
    },

    /** @private */
    // default function is not really useful
    onRender : function(ct, position){
        if(this.el){
            this.el = Roo.get(this.el);
            if(this.allowDomMove !== false){
                ct.dom.insertBefore(this.el.dom, position);
            }
        }
    },

    /** @private */
    getAutoCreate : function(){
        var cfg = typeof this.autoCreate == "object" ?
                      this.autoCreate : Roo.apply({}, this.defaultAutoCreate);
        if(this.id && !cfg.id){
            cfg.id = this.id;
        }
        return cfg;
    },

    /** @private */
    afterRender : Roo.emptyFn,

    /**
     * Destroys this component by purging any event listeners, removing the component's element from the DOM,
     * removing the component from its {@link Roo.Container} (if applicable) and unregistering it from {@link Roo.ComponentMgr}.
     */
    destroy : function(){
        if(this.fireEvent("beforedestroy", this) !== false){
            this.purgeListeners();
            this.beforeDestroy();
            if(this.rendered){
                this.el.removeAllListeners();
                this.el.remove();
                if(this.actionMode == "container"){
                    this.container.remove();
                }
            }
            this.onDestroy();
            Roo.ComponentMgr.unregister(this);
            this.fireEvent("destroy", this);
        }
    },

	/** @private */
    beforeDestroy : function(){

    },

	/** @private */
	onDestroy : function(){

    },

    /**
     * Returns the underlying {@link Roo.Element}.
     * @return {Roo.Element} The element
     */
    getEl : function(){
        return this.el;
    },

    /**
     * Returns the id of this component.
     * @return {String}
     */
    getId : function(){
        return this.id;
    },

    /**
     * Try to focus this component.
     * @param {Boolean} selectText True to also select the text in this component (if applicable)
     * @return {Roo.Component} this
     */
    focus : function(selectText){
        if(this.rendered){
            this.el.focus();
            if(selectText === true){
                this.el.dom.select();
            }
        }
        return this;
    },

    /** @private */
    blur : function(){
        if(this.rendered){
            this.el.blur();
        }
        return this;
    },

    /**
     * Disable this component.
     * @return {Roo.Component} this
     */
    disable : function(){
        if(this.rendered){
            this.onDisable();
        }
        this.disabled = true;
        this.fireEvent("disable", this);
        return this;
    },

	// private
    onDisable : function(){
        this.getActionEl().addClass(this.disabledClass);
        this.el.dom.disabled = true;
    },

    /**
     * Enable this component.
     * @return {Roo.Component} this
     */
    enable : function(){
        if(this.rendered){
            this.onEnable();
        }
        this.disabled = false;
        this.fireEvent("enable", this);
        return this;
    },

	// private
    onEnable : function(){
        this.getActionEl().removeClass(this.disabledClass);
        this.el.dom.disabled = false;
    },

    /**
     * Convenience function for setting disabled/enabled by boolean.
     * @param {Boolean} disabled
     */
    setDisabled : function(disabled){
        this[disabled ? "disable" : "enable"]();
    },

    /**
     * Show this component.
     * @return {Roo.Component} this
     */
    show: function(){
        if(this.fireEvent("beforeshow", this) !== false){
            this.hidden = false;
            if(this.rendered){
                this.onShow();
            }
            this.fireEvent("show", this);
        }
        return this;
    },

    // private
    onShow : function(){
        var ae = this.getActionEl();
        if(this.hideMode == 'visibility'){
            ae.dom.style.visibility = "visible";
        }else if(this.hideMode == 'offsets'){
            ae.removeClass('x-hidden');
        }else{
            ae.dom.style.display = "";
        }
    },

    /**
     * Hide this component.
     * @return {Roo.Component} this
     */
    hide: function(){
        if(this.fireEvent("beforehide", this) !== false){
            this.hidden = true;
            if(this.rendered){
                this.onHide();
            }
            this.fireEvent("hide", this);
        }
        return this;
    },

    // private
    onHide : function(){
        var ae = this.getActionEl();
        if(this.hideMode == 'visibility'){
            ae.dom.style.visibility = "hidden";
        }else if(this.hideMode == 'offsets'){
            ae.addClass('x-hidden');
        }else{
            ae.dom.style.display = "none";
        }
    },

    /**
     * Convenience function to hide or show this component by boolean.
     * @param {Boolean} visible True to show, false to hide
     * @return {Roo.Component} this
     */
    setVisible: function(visible){
        if(visible) {
            this.show();
        }else{
            this.hide();
        }
        return this;
    },

    /**
     * Returns true if this component is visible.
     */
    isVisible : function(){
        return this.getActionEl().isVisible();
    },

    cloneConfig : function(overrides){
        overrides = overrides || {};
        var id = overrides.id || Roo.id();
        var cfg = Roo.applyIf(overrides, this.initialConfig);
        cfg.id = id; // prevent dup id
        return new this.constructor(cfg);
    }
});/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

/**
 * @class Roo.BoxComponent
 * @extends Roo.Component
 * Base class for any visual {@link Roo.Component} that uses a box container.  BoxComponent provides automatic box
 * model adjustments for sizing and positioning and will work correctly withnin the Component rendering model.  All
 * container classes should subclass BoxComponent so that they will work consistently when nested within other Roo
 * layout containers.
 * @constructor
 * @param {Roo.Element/String/Object} config The configuration options.
 */
Roo.BoxComponent = function(config){
    Roo.Component.call(this, config);
    this.addEvents({
        /**
         * @event resize
         * Fires after the component is resized.
	     * @param {Roo.Component} this
	     * @param {Number} adjWidth The box-adjusted width that was set
	     * @param {Number} adjHeight The box-adjusted height that was set
	     * @param {Number} rawWidth The width that was originally specified
	     * @param {Number} rawHeight The height that was originally specified
	     */
        resize : true,
        /**
         * @event move
         * Fires after the component is moved.
	     * @param {Roo.Component} this
	     * @param {Number} x The new x position
	     * @param {Number} y The new y position
	     */
        move : true
    });
};

Roo.extend(Roo.BoxComponent, Roo.Component, {
    // private, set in afterRender to signify that the component has been rendered
    boxReady : false,
    // private, used to defer height settings to subclasses
    deferHeight: false,
    /** @cfg {Number} width
     * width (optional) size of component
     */
     /** @cfg {Number} height
     * height (optional) size of component
     */
     
    /**
     * Sets the width and height of the component.  This method fires the resize event.  This method can accept
     * either width and height as separate numeric arguments, or you can pass a size object like {width:10, height:20}.
     * @param {Number/Object} width The new width to set, or a size object in the format {width, height}
     * @param {Number} height The new height to set (not required if a size object is passed as the first arg)
     * @return {Roo.BoxComponent} this
     */
    setSize : function(w, h){
        // support for standard size objects
        if(typeof w == 'object'){
            h = w.height;
            w = w.width;
        }
        // not rendered
        if(!this.boxReady){
            this.width = w;
            this.height = h;
            return this;
        }

        // prevent recalcs when not needed
        if(this.lastSize && this.lastSize.width == w && this.lastSize.height == h){
            return this;
        }
        this.lastSize = {width: w, height: h};

        var adj = this.adjustSize(w, h);
        var aw = adj.width, ah = adj.height;
        if(aw !== undefined || ah !== undefined){ // this code is nasty but performs better with floaters
            var rz = this.getResizeEl();
            if(!this.deferHeight && aw !== undefined && ah !== undefined){
                rz.setSize(aw, ah);
            }else if(!this.deferHeight && ah !== undefined){
                rz.setHeight(ah);
            }else if(aw !== undefined){
                rz.setWidth(aw);
            }
            this.onResize(aw, ah, w, h);
            this.fireEvent('resize', this, aw, ah, w, h);
        }
        return this;
    },

    /**
     * Gets the current size of the component's underlying element.
     * @return {Object} An object containing the element's size {width: (element width), height: (element height)}
     */
    getSize : function(){
        return this.el.getSize();
    },

    /**
     * Gets the current XY position of the component's underlying element.
     * @param {Boolean} local (optional) If true the element's left and top are returned instead of page XY (defaults to false)
     * @return {Array} The XY position of the element (e.g., [100, 200])
     */
    getPosition : function(local){
        if(local === true){
            return [this.el.getLeft(true), this.el.getTop(true)];
        }
        return this.xy || this.el.getXY();
    },

    /**
     * Gets the current box measurements of the component's underlying element.
     * @param {Boolean} local (optional) If true the element's left and top are returned instead of page XY (defaults to false)
     * @returns {Object} box An object in the format {x, y, width, height}
     */
    getBox : function(local){
        var s = this.el.getSize();
        if(local){
            s.x = this.el.getLeft(true);
            s.y = this.el.getTop(true);
        }else{
            var xy = this.xy || this.el.getXY();
            s.x = xy[0];
            s.y = xy[1];
        }
        return s;
    },

    /**
     * Sets the current box measurements of the component's underlying element.
     * @param {Object} box An object in the format {x, y, width, height}
     * @returns {Roo.BoxComponent} this
     */
    updateBox : function(box){
        this.setSize(box.width, box.height);
        this.setPagePosition(box.x, box.y);
        return this;
    },

    // protected
    getResizeEl : function(){
        return this.resizeEl || this.el;
    },

    // protected
    getPositionEl : function(){
        return this.positionEl || this.el;
    },

    /**
     * Sets the left and top of the component.  To set the page XY position instead, use {@link #setPagePosition}.
     * This method fires the move event.
     * @param {Number} left The new left
     * @param {Number} top The new top
     * @returns {Roo.BoxComponent} this
     */
    setPosition : function(x, y){
        this.x = x;
        this.y = y;
        if(!this.boxReady){
            return this;
        }
        var adj = this.adjustPosition(x, y);
        var ax = adj.x, ay = adj.y;

        var el = this.getPositionEl();
        if(ax !== undefined || ay !== undefined){
            if(ax !== undefined && ay !== undefined){
                el.setLeftTop(ax, ay);
            }else if(ax !== undefined){
                el.setLeft(ax);
            }else if(ay !== undefined){
                el.setTop(ay);
            }
            this.onPosition(ax, ay);
            this.fireEvent('move', this, ax, ay);
        }
        return this;
    },

    /**
     * Sets the page XY position of the component.  To set the left and top instead, use {@link #setPosition}.
     * This method fires the move event.
     * @param {Number} x The new x position
     * @param {Number} y The new y position
     * @returns {Roo.BoxComponent} this
     */
    setPagePosition : function(x, y){
        this.pageX = x;
        this.pageY = y;
        if(!this.boxReady){
            return;
        }
        if(x === undefined || y === undefined){ // cannot translate undefined points
            return;
        }
        var p = this.el.translatePoints(x, y);
        this.setPosition(p.left, p.top);
        return this;
    },

    // private
    onRender : function(ct, position){
        Roo.BoxComponent.superclass.onRender.call(this, ct, position);
        if(this.resizeEl){
            this.resizeEl = Roo.get(this.resizeEl);
        }
        if(this.positionEl){
            this.positionEl = Roo.get(this.positionEl);
        }
    },

    // private
    afterRender : function(){
        Roo.BoxComponent.superclass.afterRender.call(this);
        this.boxReady = true;
        this.setSize(this.width, this.height);
        if(this.x || this.y){
            this.setPosition(this.x, this.y);
        }
        if(this.pageX || this.pageY){
            this.setPagePosition(this.pageX, this.pageY);
        }
    },

    /**
     * Force the component's size to recalculate based on the underlying element's current height and width.
     * @returns {Roo.BoxComponent} this
     */
    syncSize : function(){
        delete this.lastSize;
        this.setSize(this.el.getWidth(), this.el.getHeight());
        return this;
    },

    /**
     * Called after the component is resized, this method is empty by default but can be implemented by any
     * subclass that needs to perform custom logic after a resize occurs.
     * @param {Number} adjWidth The box-adjusted width that was set
     * @param {Number} adjHeight The box-adjusted height that was set
     * @param {Number} rawWidth The width that was originally specified
     * @param {Number} rawHeight The height that was originally specified
     */
    onResize : function(adjWidth, adjHeight, rawWidth, rawHeight){

    },

    /**
     * Called after the component is moved, this method is empty by default but can be implemented by any
     * subclass that needs to perform custom logic after a move occurs.
     * @param {Number} x The new x position
     * @param {Number} y The new y position
     */
    onPosition : function(x, y){

    },

    // private
    adjustSize : function(w, h){
        if(this.autoWidth){
            w = 'auto';
        }
        if(this.autoHeight){
            h = 'auto';
        }
        return {width : w, height: h};
    },

    // private
    adjustPosition : function(x, y){
        return {x : x, y: y};
    }
});/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 (function(){ 
/**
 * @class Roo.Layer
 * @extends Roo.Element
 * An extended {@link Roo.Element} object that supports a shadow and shim, constrain to viewport and
 * automatic maintaining of shadow/shim positions.
 * @cfg {Boolean} shim False to disable the iframe shim in browsers which need one (defaults to true)
 * @cfg {String/Boolean} shadow True to create a shadow element with default class "x-layer-shadow", or
 * you can pass a string with a CSS class name. False turns off the shadow.
 * @cfg {Object} dh DomHelper object config to create element with (defaults to {tag: "div", cls: "x-layer"}).
 * @cfg {Boolean} constrain False to disable constrain to viewport (defaults to true)
 * @cfg {String} cls CSS class to add to the element
 * @cfg {Number} zindex Starting z-index (defaults to 11000)
 * @cfg {Number} shadowOffset Number of pixels to offset the shadow (defaults to 3)
 * @constructor
 * @param {Object} config An object with config options.
 * @param {String/HTMLElement} existingEl (optional) Uses an existing DOM element. If the element is not found it creates it.
 */

Roo.Layer = function(config, existingEl){
    config = config || {};
    var dh = Roo.DomHelper;
    var cp = config.parentEl, pel = cp ? Roo.getDom(cp) : document.body;
    if(existingEl){
        this.dom = Roo.getDom(existingEl);
    }
    if(!this.dom){
        var o = config.dh || {tag: "div", cls: "x-layer"};
        this.dom = dh.append(pel, o);
    }
    if(config.cls){
        this.addClass(config.cls);
    }
    this.constrain = config.constrain !== false;
    this.visibilityMode = Roo.Element.VISIBILITY;
    if(config.id){
        this.id = this.dom.id = config.id;
    }else{
        this.id = Roo.id(this.dom);
    }
    this.zindex = config.zindex || this.getZIndex();
    this.position("absolute", this.zindex);
    if(config.shadow){
        this.shadowOffset = config.shadowOffset || 4;
        this.shadow = new Roo.Shadow({
            offset : this.shadowOffset,
            mode : config.shadow
        });
    }else{
        this.shadowOffset = 0;
    }
    this.useShim = config.shim !== false && Roo.useShims;
    this.useDisplay = config.useDisplay;
    this.hide();
};

var supr = Roo.Element.prototype;

// shims are shared among layer to keep from having 100 iframes
var shims = [];

Roo.extend(Roo.Layer, Roo.Element, {

    getZIndex : function(){
        return this.zindex || parseInt(this.getStyle("z-index"), 10) || 11000;
    },

    getShim : function(){
        if(!this.useShim){
            return null;
        }
        if(this.shim){
            return this.shim;
        }
        var shim = shims.shift();
        if(!shim){
            shim = this.createShim();
            shim.enableDisplayMode('block');
            shim.dom.style.display = 'none';
            shim.dom.style.visibility = 'visible';
        }
        var pn = this.dom.parentNode;
        if(shim.dom.parentNode != pn){
            pn.insertBefore(shim.dom, this.dom);
        }
        shim.setStyle('z-index', this.getZIndex()-2);
        this.shim = shim;
        return shim;
    },

    hideShim : function(){
        if(this.shim){
            this.shim.setDisplayed(false);
            shims.push(this.shim);
            delete this.shim;
        }
    },

    disableShadow : function(){
        if(this.shadow){
            this.shadowDisabled = true;
            this.shadow.hide();
            this.lastShadowOffset = this.shadowOffset;
            this.shadowOffset = 0;
        }
    },

    enableShadow : function(show){
        if(this.shadow){
            this.shadowDisabled = false;
            this.shadowOffset = this.lastShadowOffset;
            delete this.lastShadowOffset;
            if(show){
                this.sync(true);
            }
        }
    },

    // private
    // this code can execute repeatedly in milliseconds (i.e. during a drag) so
    // code size was sacrificed for effeciency (e.g. no getBox/setBox, no XY calls)
    sync : function(doShow){
        var sw = this.shadow;
        if(!this.updating && this.isVisible() && (sw || this.useShim)){
            var sh = this.getShim();

            var w = this.getWidth(),
                h = this.getHeight();

            var l = this.getLeft(true),
                t = this.getTop(true);

            if(sw && !this.shadowDisabled){
                if(doShow && !sw.isVisible()){
                    sw.show(this);
                }else{
                    sw.realign(l, t, w, h);
                }
                if(sh){
                    if(doShow){
                       sh.show();
                    }
                    // fit the shim behind the shadow, so it is shimmed too
                    var a = sw.adjusts, s = sh.dom.style;
                    s.left = (Math.min(l, l+a.l))+"px";
                    s.top = (Math.min(t, t+a.t))+"px";
                    s.width = (w+a.w)+"px";
                    s.height = (h+a.h)+"px";
                }
            }else if(sh){
                if(doShow){
                   sh.show();
                }
                sh.setSize(w, h);
                sh.setLeftTop(l, t);
            }
            
        }
    },

    // private
    destroy : function(){
        this.hideShim();
        if(this.shadow){
            this.shadow.hide();
        }
        this.removeAllListeners();
        var pn = this.dom.parentNode;
        if(pn){
            pn.removeChild(this.dom);
        }
        Roo.Element.uncache(this.id);
    },

    remove : function(){
        this.destroy();
    },

    // private
    beginUpdate : function(){
        this.updating = true;
    },

    // private
    endUpdate : function(){
        this.updating = false;
        this.sync(true);
    },

    // private
    hideUnders : function(negOffset){
        if(this.shadow){
            this.shadow.hide();
        }
        this.hideShim();
    },

    // private
    constrainXY : function(){
        if(this.constrain){
            var vw = Roo.lib.Dom.getViewWidth(),
                vh = Roo.lib.Dom.getViewHeight();
            var s = Roo.get(document).getScroll();

            var xy = this.getXY();
            var x = xy[0], y = xy[1];   
            var w = this.dom.offsetWidth+this.shadowOffset, h = this.dom.offsetHeight+this.shadowOffset;
            // only move it if it needs it
            var moved = false;
            // first validate right/bottom
            if((x + w) > vw+s.left){
                x = vw - w - this.shadowOffset;
                moved = true;
            }
            if((y + h) > vh+s.top){
                y = vh - h - this.shadowOffset;
                moved = true;
            }
            // then make sure top/left isn't negative
            if(x < s.left){
                x = s.left;
                moved = true;
            }
            if(y < s.top){
                y = s.top;
                moved = true;
            }
            if(moved){
                if(this.avoidY){
                    var ay = this.avoidY;
                    if(y <= ay && (y+h) >= ay){
                        y = ay-h-5;   
                    }
                }
                xy = [x, y];
                this.storeXY(xy);
                supr.setXY.call(this, xy);
                this.sync();
            }
        }
    },

    isVisible : function(){
        return this.visible;    
    },

    // private
    showAction : function(){
        this.visible = true; // track visibility to prevent getStyle calls
        if(this.useDisplay === true){
            this.setDisplayed("");
        }else if(this.lastXY){
            supr.setXY.call(this, this.lastXY);
        }else if(this.lastLT){
            supr.setLeftTop.call(this, this.lastLT[0], this.lastLT[1]);
        }
    },

    // private
    hideAction : function(){
        this.visible = false;
        if(this.useDisplay === true){
            this.setDisplayed(false);
        }else{
            this.setLeftTop(-10000,-10000);
        }
    },

    // overridden Element method
    setVisible : function(v, a, d, c, e){
        if(v){
            this.showAction();
        }
        if(a && v){
            var cb = function(){
                this.sync(true);
                if(c){
                    c();
                }
            }.createDelegate(this);
            supr.setVisible.call(this, true, true, d, cb, e);
        }else{
            if(!v){
                this.hideUnders(true);
            }
            var cb = c;
            if(a){
                cb = function(){
                    this.hideAction();
                    if(c){
                        c();
                    }
                }.createDelegate(this);
            }
            supr.setVisible.call(this, v, a, d, cb, e);
            if(v){
                this.sync(true);
            }else if(!a){
                this.hideAction();
            }
        }
    },

    storeXY : function(xy){
        delete this.lastLT;
        this.lastXY = xy;
    },

    storeLeftTop : function(left, top){
        delete this.lastXY;
        this.lastLT = [left, top];
    },

    // private
    beforeFx : function(){
        this.beforeAction();
        return Roo.Layer.superclass.beforeFx.apply(this, arguments);
    },

    // private
    afterFx : function(){
        Roo.Layer.superclass.afterFx.apply(this, arguments);
        this.sync(this.isVisible());
    },

    // private
    beforeAction : function(){
        if(!this.updating && this.shadow){
            this.shadow.hide();
        }
    },

    // overridden Element method
    setLeft : function(left){
        this.storeLeftTop(left, this.getTop(true));
        supr.setLeft.apply(this, arguments);
        this.sync();
    },

    setTop : function(top){
        this.storeLeftTop(this.getLeft(true), top);
        supr.setTop.apply(this, arguments);
        this.sync();
    },

    setLeftTop : function(left, top){
        this.storeLeftTop(left, top);
        supr.setLeftTop.apply(this, arguments);
        this.sync();
    },

    setXY : function(xy, a, d, c, e){
        this.fixDisplay();
        this.beforeAction();
        this.storeXY(xy);
        var cb = this.createCB(c);
        supr.setXY.call(this, xy, a, d, cb, e);
        if(!a){
            cb();
        }
    },

    // private
    createCB : function(c){
        var el = this;
        return function(){
            el.constrainXY();
            el.sync(true);
            if(c){
                c();
            }
        };
    },

    // overridden Element method
    setX : function(x, a, d, c, e){
        this.setXY([x, this.getY()], a, d, c, e);
    },

    // overridden Element method
    setY : function(y, a, d, c, e){
        this.setXY([this.getX(), y], a, d, c, e);
    },

    // overridden Element method
    setSize : function(w, h, a, d, c, e){
        this.beforeAction();
        var cb = this.createCB(c);
        supr.setSize.call(this, w, h, a, d, cb, e);
        if(!a){
            cb();
        }
    },

    // overridden Element method
    setWidth : function(w, a, d, c, e){
        this.beforeAction();
        var cb = this.createCB(c);
        supr.setWidth.call(this, w, a, d, cb, e);
        if(!a){
            cb();
        }
    },

    // overridden Element method
    setHeight : function(h, a, d, c, e){
        this.beforeAction();
        var cb = this.createCB(c);
        supr.setHeight.call(this, h, a, d, cb, e);
        if(!a){
            cb();
        }
    },

    // overridden Element method
    setBounds : function(x, y, w, h, a, d, c, e){
        this.beforeAction();
        var cb = this.createCB(c);
        if(!a){
            this.storeXY([x, y]);
            supr.setXY.call(this, [x, y]);
            supr.setSize.call(this, w, h, a, d, cb, e);
            cb();
        }else{
            supr.setBounds.call(this, x, y, w, h, a, d, cb, e);
        }
        return this;
    },
    
    /**
     * Sets the z-index of this layer and adjusts any shadow and shim z-indexes. The layer z-index is automatically
     * incremented by two more than the value passed in so that it always shows above any shadow or shim (the shadow
     * element, if any, will be assigned z-index + 1, and the shim element, if any, will be assigned the unmodified z-index).
     * @param {Number} zindex The new z-index to set
     * @return {this} The Layer
     */
    setZIndex : function(zindex){
        this.zindex = zindex;
        this.setStyle("z-index", zindex + 2);
        if(this.shadow){
            this.shadow.setZIndex(zindex + 1);
        }
        if(this.shim){
            this.shim.setStyle("z-index", zindex);
        }
    }
});
})();/*
 * Original code for Roojs - LGPL
 * <script type="text/javascript">
 */
 
/**
 * @class Roo.XComponent
 * A delayed Element creator...
 * Or a way to group chunks of interface together.
 * technically this is a wrapper around a tree of Roo elements (which defines a 'module'),
 *  used in conjunction with XComponent.build() it will create an instance of each element,
 *  then call addxtype() to build the User interface.
 * 
 * Mypart.xyx = new Roo.XComponent({

    parent : 'Mypart.xyz', // empty == document.element.!!
    order : '001',
    name : 'xxxx'
    region : 'xxxx'
    disabled : function() {} 
     
    tree : function() { // return an tree of xtype declared components
        var MODULE = this;
        return 
        {
            xtype : 'NestedLayoutPanel',
            // technicall
        }
     ]
 *})
 *
 *
 * It can be used to build a big heiracy, with parent etc.
 * or you can just use this to render a single compoent to a dom element
 * MYPART.render(Roo.Element | String(id) | dom_element )
 *
 *
 * Usage patterns.
 *
 * Classic Roo
 *
 * Roo is designed primarily as a single page application, so the UI build for a standard interface will
 * expect a single 'TOP' level module normally indicated by the 'parent' of the XComponent definition being defined as false.
 *
 * Each sub module is expected to have a parent pointing to the class name of it's parent module.
 *
 * When the top level is false, a 'Roo.layout.Border' is created and the element is flagged as 'topModule'
 * - if mulitple topModules exist, the last one is defined as the top module.
 *
 * Embeded Roo
 * 
 * When the top level or multiple modules are to embedded into a existing HTML page,
 * the parent element can container '#id' of the element where the module will be drawn.
 *
 * Bootstrap Roo
 *
 * Unlike classic Roo, the bootstrap tends not to be used as a single page.
 * it relies more on a include mechanism, where sub modules are included into an outer page.
 * This is normally managed by the builder tools using Roo.apply( options, Included.Sub.Module )
 * 
 * Bootstrap Roo Included elements
 *
 * Our builder application needs the ability to preview these sub compoennts. They will normally have parent=false set,
 * hence confusing the component builder as it thinks there are multiple top level elements. 
 *
 * String Over-ride & Translations
 *
 * Our builder application writes all the strings as _strings and _named_strings. This is to enable the translation of elements,
 * and also the 'overlaying of string values - needed when different versions of the same application with different text content
 * are needed. @see Roo.XComponent.overlayString  
 * 
 * 
 * 
 * @extends Roo.util.Observable
 * @constructor
 * @param cfg {Object} configuration of component
 * 
 */
Roo.XComponent = function(cfg) {
    Roo.apply(this, cfg);
    this.addEvents({ 
        /**
	     * @event built
	     * Fires when this the componnt is built
	     * @param {Roo.XComponent} c the component
	     */
        'built' : true
        
    });
    this.region = this.region || 'center'; // default..
    Roo.XComponent.register(this);
    this.modules = false;
    this.el = false; // where the layout goes..
    
    
}
Roo.extend(Roo.XComponent, Roo.util.Observable, {
    /**
     * @property el
     * The created element (with Roo.factory())
     * @type {Roo.Layout}
     */
    el  : false,
    
    /**
     * @property el
     * for BC  - use el in new code
     * @type {Roo.Layout}
     */
    panel : false,
    
    /**
     * @property layout
     * for BC  - use el in new code
     * @type {Roo.Layout}
     */
    layout : false,
    
     /**
     * @cfg {Function|boolean} disabled
     * If this module is disabled by some rule, return true from the funtion
     */
    disabled : false,
    
    /**
     * @cfg {String} parent 
     * Name of parent element which it get xtype added to..
     */
    parent: false,
    
    /**
     * @cfg {String} order
     * Used to set the order in which elements are created (usefull for multiple tabs)
     */
    
    order : false,
    /**
     * @cfg {String} name
     * String to display while loading.
     */
    name : false,
    /**
     * @cfg {String} region
     * Region to render component to (defaults to center)
     */
    region : 'center',
    
    /**
     * @cfg {Array} items
     * A single item array - the first element is the root of the tree..
     * It's done this way to stay compatible with the Xtype system...
     */
    items : false,
    
    /**
     * @property _tree
     * The method that retuns the tree of parts that make up this compoennt 
     * @type {function}
     */
    _tree  : false,
    
     /**
     * render
     * render element to dom or tree
     * @param {Roo.Element|String|DomElement} optional render to if parent is not set.
     */
    
    render : function(el)
    {
        
        el = el || false;
        var hp = this.parent ? 1 : 0;
        Roo.debug &&  Roo.log(this);
        
        var tree = this._tree ? this._tree() : this.tree();

        
        if (!el && typeof(this.parent) == 'string' && this.parent.substring(0,1) == '#') {
            // if parent is a '#.....' string, then let's use that..
            var ename = this.parent.substr(1);
            this.parent = false;
            Roo.debug && Roo.log(ename);
            switch (ename) {
                case 'bootstrap-body':
                    if (typeof(tree.el) != 'undefined' && tree.el == document.body)  {
                        // this is the BorderLayout standard?
                       this.parent = { el : true };
                       break;
                    }
                    if (["Nest", "Content", "Grid", "Tree"].indexOf(tree.xtype)  > -1)  {
                        // need to insert stuff...
                        this.parent =  {
                             el : new Roo.bootstrap.layout.Border({
                                 el : document.body, 
                     
                                 center: {
                                    titlebar: false,
                                    autoScroll:false,
                                    closeOnTab: true,
                                    tabPosition: 'top',
                                      //resizeTabs: true,
                                    alwaysShowTabs: true,
                                    hideTabs: false
                                     //minTabWidth: 140
                                 }
                             })
                        
                         };
                         break;
                    }
                         
                    if (typeof(Roo.bootstrap.Body) != 'undefined' ) {
                        this.parent = { el :  new  Roo.bootstrap.Body() };
                        Roo.debug && Roo.log("setting el to doc body");
                         
                    } else {
                        throw "Container is bootstrap body, but Roo.bootstrap.Body is not defined";
                    }
                    break;
                case 'bootstrap':
                    this.parent = { el : true};
                    // fall through
                default:
                    el = Roo.get(ename);
                    if (typeof(Roo.bootstrap) != 'undefined' && tree['|xns'] == 'Roo.bootstrap') {
                        this.parent = { el : true};
                    }
                    
                    break;
            }
                
            
            if (!el && !this.parent) {
                Roo.debug && Roo.log("Warning - element can not be found :#" + ename );
                return;
            }
        }
        
        Roo.debug && Roo.log("EL:");
        Roo.debug && Roo.log(el);
        Roo.debug && Roo.log("this.parent.el:");
        Roo.debug && Roo.log(this.parent.el);
        

        // altertive root elements ??? - we need a better way to indicate these.
        var is_alt = Roo.XComponent.is_alt ||
                    (typeof(tree.el) != 'undefined' && tree.el == document.body) ||
                    (typeof(Roo.bootstrap) != 'undefined' && tree.xns == Roo.bootstrap) ||
                    (typeof(Roo.mailer) != 'undefined' && tree.xns == Roo.mailer) ;
        
        
        
        if (!this.parent && is_alt) {
            //el = Roo.get(document.body);
            this.parent = { el : true };
        }
            
            
        
        if (!this.parent) {
            
            Roo.debug && Roo.log("no parent - creating one");
            
            el = el ? Roo.get(el) : false; 	
            
            if (typeof(Roo.layout.Border) == 'undefined' ) {
                
                this.parent =  {
                    el : new Roo.bootstrap.layout.Border({
                        el: el || document.body,
                    
                        center: {
                            titlebar: false,
                            autoScroll:false,
                            closeOnTab: true,
                            tabPosition: 'top',
                             //resizeTabs: true,
                            alwaysShowTabs: false,
                            hideTabs: true,
                            minTabWidth: 140,
                            overflow: 'visible'
                         }
                     })
                };
            } else {
            
                // it's a top level one..
                this.parent =  {
                    el : new Roo.layout.Border(el || document.body, {
                        center: {
                            titlebar: false,
                            autoScroll:false,
                            closeOnTab: true,
                            tabPosition: 'top',
                             //resizeTabs: true,
                            alwaysShowTabs: el && hp? false :  true,
                            hideTabs: el || !hp ? true :  false,
                            minTabWidth: 140
                         }
                    })
                };
            }
        }
        
        if (!this.parent.el) {
                // probably an old style ctor, which has been disabled.
                return;

        }
		// The 'tree' method is  '_tree now' 
            
        tree.region = tree.region || this.region;
        var is_body = false;
        if (this.parent.el === true) {
            // bootstrap... - body..
            if (el) {
                tree.el = el;
            }
            this.parent.el = Roo.factory(tree);
            is_body = true;
        }
        
        this.el = this.parent.el.addxtype(tree, undefined, is_body);
        this.fireEvent('built', this);
        
        this.panel = this.el;
        this.layout = this.panel.layout;
        this.parentLayout = this.parent.layout  || false;  
         
    }
    
});

Roo.apply(Roo.XComponent, {
    /**
     * @property  hideProgress
     * true to disable the building progress bar.. usefull on single page renders.
     * @type Boolean
     */
    hideProgress : false,
    /**
     * @property  buildCompleted
     * True when the builder has completed building the interface.
     * @type Boolean
     */
    buildCompleted : false,
     
    /**
     * @property  topModule
     * the upper most module - uses document.element as it's constructor.
     * @type Object
     */
     
    topModule  : false,
      
    /**
     * @property  modules
     * array of modules to be created by registration system.
     * @type {Array} of Roo.XComponent
     */
    
    modules : [],
    /**
     * @property  elmodules
     * array of modules to be created by which use #ID 
     * @type {Array} of Roo.XComponent
     */
     
    elmodules : [],

     /**
     * @property  is_alt
     * Is an alternative Root - normally used by bootstrap or other systems,
     *    where the top element in the tree can wrap 'body' 
     * @type {boolean}  (default false)
     */
     
    is_alt : false,
    /**
     * @property  build_from_html
     * Build elements from html - used by bootstrap HTML stuff 
     *    - this is cleared after build is completed
     * @type {boolean}    (default false)
     */
     
    build_from_html : false,
    /**
     * Register components to be built later.
     *
     * This solves the following issues
     * - Building is not done on page load, but after an authentication process has occured.
     * - Interface elements are registered on page load
     * - Parent Interface elements may not be loaded before child, so this handles that..
     * 
     *
     * example:
     * 
     * MyApp.register({
          order : '000001',
          module : 'Pman.Tab.projectMgr',
          region : 'center',
          parent : 'Pman.layout',
          disabled : false,  // or use a function..
        })
     
     * * @param {Object} details about module
     */
    register : function(obj) {
		
        Roo.XComponent.event.fireEvent('register', obj);
        switch(typeof(obj.disabled) ) {
                
            case 'undefined':
                break;
            
            case 'function':
                if ( obj.disabled() ) {
                        return;
                }
                break;
            
            default:
                if (obj.disabled || obj.region == '#disabled') {
                        return;
                }
                break;
        }
		
        this.modules.push(obj);
         
    },
    /**
     * convert a string to an object..
     * eg. 'AAA.BBB' -> finds AAA.BBB

     */
    
    toObject : function(str)
    {
        if (!str || typeof(str) == 'object') {
            return str;
        }
        if (str.substring(0,1) == '#') {
            return str;
        }

        var ar = str.split('.');
        var rt, o;
        rt = ar.shift();
            /** eval:var:o */
        try {
            eval('if (typeof ' + rt + ' == "undefined"){ o = false;} o = ' + rt + ';');
        } catch (e) {
            throw "Module not found : " + str;
        }
        
        if (o === false) {
            throw "Module not found : " + str;
        }
        Roo.each(ar, function(e) {
            if (typeof(o[e]) == 'undefined') {
                throw "Module not found : " + str;
            }
            o = o[e];
        });
        
        return o;
        
    },
    
    
    /**
     * move modules into their correct place in the tree..
     * 
     */
    preBuild : function ()
    {
        var _t = this;
        Roo.each(this.modules , function (obj)
        {
            Roo.XComponent.event.fireEvent('beforebuild', obj);
            
            var opar = obj.parent;
            try { 
                obj.parent = this.toObject(opar);
            } catch(e) {
                Roo.debug && Roo.log("parent:toObject failed: " + e.toString());
                return;
            }
            
            if (!obj.parent) {
                Roo.debug && Roo.log("GOT top level module");
                Roo.debug && Roo.log(obj);
                obj.modules = new Roo.util.MixedCollection(false, 
                    function(o) { return o.order + '' }
                );
                this.topModule = obj;
                return;
            }
			// parent is a string (usually a dom element name..)
            if (typeof(obj.parent) == 'string') {
                this.elmodules.push(obj);
                return;
            }
            if (obj.parent.constructor != Roo.XComponent) {
                Roo.debug && Roo.log("Warning : Object Parent is not instance of XComponent:" + obj.name)
            }
            if (!obj.parent.modules) {
                obj.parent.modules = new Roo.util.MixedCollection(false, 
                    function(o) { return o.order + '' }
                );
            }
            if (obj.parent.disabled) {
                obj.disabled = true;
            }
            obj.parent.modules.add(obj);
        }, this);
    },
    
     /**
     * make a list of modules to build.
     * @return {Array} list of modules. 
     */ 
    
    buildOrder : function()
    {
        var _this = this;
        var cmp = function(a,b) {   
            return String(a).toUpperCase() > String(b).toUpperCase() ? 1 : -1;
        };
        if ((!this.topModule || !this.topModule.modules) && !this.elmodules.length) {
            throw "No top level modules to build";
        }
        
        // make a flat list in order of modules to build.
        var mods = this.topModule ? [ this.topModule ] : [];
		
        
	// elmodules (is a list of DOM based modules )
        Roo.each(this.elmodules, function(e) {
            mods.push(e);
            if (!this.topModule &&
                typeof(e.parent) == 'string' &&
                e.parent.substring(0,1) == '#' &&
                Roo.get(e.parent.substr(1))
               ) {
                
                _this.topModule = e;
            }
            
        });

        
        // add modules to their parents..
        var addMod = function(m) {
            Roo.debug && Roo.log("build Order: add: " + m.name);
                
            mods.push(m);
            if (m.modules && !m.disabled) {
                Roo.debug && Roo.log("build Order: " + m.modules.length + " child modules");
                m.modules.keySort('ASC',  cmp );
                Roo.debug && Roo.log("build Order: " + m.modules.length + " child modules (after sort)");
    
                m.modules.each(addMod);
            } else {
                Roo.debug && Roo.log("build Order: no child modules");
            }
            // not sure if this is used any more..
            if (m.finalize) {
                m.finalize.name = m.name + " (clean up) ";
                mods.push(m.finalize);
            }
            
        }
        if (this.topModule && this.topModule.modules) { 
            this.topModule.modules.keySort('ASC',  cmp );
            this.topModule.modules.each(addMod);
        } 
        return mods;
    },
    
     /**
     * Build the registered modules.
     * @param {Object} parent element.
     * @param {Function} optional method to call after module has been added.
     * 
     */ 
   
    build : function(opts) 
    {
        
        if (typeof(opts) != 'undefined') {
            Roo.apply(this,opts);
        }
        
        this.preBuild();
        var mods = this.buildOrder();
      
        //this.allmods = mods;
        //Roo.debug && Roo.log(mods);
        //return;
        if (!mods.length) { // should not happen
            throw "NO modules!!!";
        }
        
        
        var msg = "Building Interface...";
        // flash it up as modal - so we store the mask!?
        if (!this.hideProgress && Roo.MessageBox) {
            Roo.MessageBox.show({ title: 'loading' });
            Roo.MessageBox.show({
               title: "Please wait...",
               msg: msg,
               width:450,
               progress:true,
	       buttons : false,
               closable:false,
               modal: false
              
            });
        }
        var total = mods.length;
        
        var _this = this;
        var progressRun = function() {
            if (!mods.length) {
                Roo.debug && Roo.log('hide?');
                if (!this.hideProgress && Roo.MessageBox) {
                    Roo.MessageBox.hide();
                }
                Roo.XComponent.build_from_html = false; // reset, so dialogs will be build from javascript
                
                Roo.XComponent.event.fireEvent('buildcomplete', _this.topModule);
                
                // THE END...
                return false;   
            }
            
            var m = mods.shift();
            
            
            Roo.debug && Roo.log(m);
            // not sure if this is supported any more.. - modules that are are just function
            if (typeof(m) == 'function') { 
                m.call(this);
                return progressRun.defer(10, _this);
            } 
            
            
            msg = "Building Interface " + (total  - mods.length) + 
                    " of " + total + 
                    (m.name ? (' - ' + m.name) : '');
			Roo.debug && Roo.log(msg);
            if (!_this.hideProgress &&  Roo.MessageBox) { 
                Roo.MessageBox.updateProgress(  (total  - mods.length)/total, msg  );
            }
            
         
            // is the module disabled?
            var disabled = (typeof(m.disabled) == 'function') ?
                m.disabled.call(m.module.disabled) : m.disabled;    
            
            
            if (disabled) {
                return progressRun(); // we do not update the display!
            }
            
            // now build 
            
			
			
            m.render();
            // it's 10 on top level, and 1 on others??? why...
            return progressRun.defer(10, _this);
             
        }
        progressRun.defer(1, _this);
     
        
        
    },
    /**
     * Overlay a set of modified strings onto a component
     * This is dependant on our builder exporting the strings and 'named strings' elements.
     * 
     * @param {Object} element to overlay on - eg. Pman.Dialog.Login
     * @param {Object} associative array of 'named' string and it's new value.
     * 
     */
	overlayStrings : function( component, strings )
    {
        if (typeof(component['_named_strings']) == 'undefined') {
            throw "ERROR: component does not have _named_strings";
        }
        for ( var k in strings ) {
            var md = typeof(component['_named_strings'][k]) == 'undefined' ? false : component['_named_strings'][k];
            if (md !== false) {
                component['_strings'][md] = strings[k];
            } else {
                Roo.log('could not find named string: ' + k + ' in');
                Roo.log(component);
            }
            
        }
        
    },
    
	
	/**
	 * Event Object.
	 *
	 *
	 */
	event: false, 
    /**
	 * wrapper for event.on - aliased later..  
	 * Typically use to register a event handler for register:
	 *
	 * eg. Roo.XComponent.on('register', function(comp) { comp.disable = true } );
	 *
	 */
    on : false
   
    
    
});

Roo.XComponent.event = new Roo.util.Observable({
		events : { 
			/**
			 * @event register
			 * Fires when an Component is registered,
			 * set the disable property on the Component to stop registration.
			 * @param {Roo.XComponent} c the component being registerd.
			 * 
			 */
			'register' : true,
            /**
			 * @event beforebuild
			 * Fires before each Component is built
			 * can be used to apply permissions.
			 * @param {Roo.XComponent} c the component being registerd.
			 * 
			 */
			'beforebuild' : true,
			/**
			 * @event buildcomplete
			 * Fires on the top level element when all elements have been built
			 * @param {Roo.XComponent} the top level component.
			 */
			'buildcomplete' : true
			
		}
});

Roo.XComponent.on = Roo.XComponent.event.on.createDelegate(Roo.XComponent.event); 
 //
 /**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */


/**
 *
 * Roo.Markdown - is a very crude wrapper around marked..
 *
 * usage:
 * 
 * alert( Roo.Markdown.toHtml("Markdown *rocks*.") );
 * 
 * Note: move the sample code to the bottom of this
 * file before uncommenting it.
 *
 */

Roo.Markdown = {};
Roo.Markdown.toHtml = function(text) {
    
    var c = new Roo.Markdown.marked.setOptions({
            renderer: new Roo.Markdown.marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
          });
    // A FEW HACKS!!?
    
    text = text.replace(/\\\n/g,' ');
    return Roo.Markdown.marked(text);
};
//
// converter
//
// Wraps all "globals" so that the only thing
// exposed is makeHtml().
//
(function() {
    
     /**
         * eval:var:escape
         * eval:var:unescape
         * eval:var:replace
         */
      
    /**
     * Helpers
     */
    
    var escape = function (html, encode) {
      return html
        .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }
    
    var unescape = function (html) {
        // explicitly match decimal, hex, and named HTML entities 
      return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function(_, n) {
        n = n.toLowerCase();
        if (n === 'colon') { return ':'; }
        if (n.charAt(0) === '#') {
          return n.charAt(1) === 'x'
            ? String.fromCharCode(parseInt(n.substring(2), 16))
            : String.fromCharCode(+n.substring(1));
        }
        return '';
      });
    }
    
    var replace = function (regex, opt) {
      regex = regex.source;
      opt = opt || '';
      return function self(name, val) {
        if (!name) { return new RegExp(regex, opt); }
        val = val.source || val;
        val = val.replace(/(^|[^\[])\^/g, '$1');
        regex = regex.replace(name, val);
        return self;
      };
    }


         /**
         * eval:var:noop
    */
    var noop = function () {}
    noop.exec = noop;
    
         /**
         * eval:var:merge
    */
    var merge = function (obj) {
      var i = 1
        , target
        , key;
    
      for (; i < arguments.length; i++) {
        target = arguments[i];
        for (key in target) {
          if (Object.prototype.hasOwnProperty.call(target, key)) {
            obj[key] = target[key];
          }
        }
      }
    
      return obj;
    }
    
    
    /**
     * Block-Level Grammar
     */
    
    
    
    
    var block = {
      newline: /^\n+/,
      code: /^( {4}[^\n]+\n*)+/,
      fences: noop,
      hr: /^( *[-*_]){3,} *(?:\n+|$)/,
      heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
      nptable: noop,
      lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
      blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
      list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
      html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
      def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
      table: noop,
      paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
      text: /^[^\n]+/
    };
    
    block.bullet = /(?:[*+-]|\d+\.)/;
    block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
    block.item = replace(block.item, 'gm')
      (/bull/g, block.bullet)
      ();
    
    block.list = replace(block.list)
      (/bull/g, block.bullet)
      ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
      ('def', '\\n+(?=' + block.def.source + ')')
      ();
    
    block.blockquote = replace(block.blockquote)
      ('def', block.def)
      ();
    
    block._tag = '(?!(?:'
      + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
      + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
      + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';
    
    block.html = replace(block.html)
      ('comment', /<!--[\s\S]*?-->/)
      ('closed', /<(tag)[\s\S]+?<\/\1>/)
      ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
      (/tag/g, block._tag)
      ();
    
    block.paragraph = replace(block.paragraph)
      ('hr', block.hr)
      ('heading', block.heading)
      ('lheading', block.lheading)
      ('blockquote', block.blockquote)
      ('tag', '<' + block._tag)
      ('def', block.def)
      ();
    
    /**
     * Normal Block Grammar
     */
    
    block.normal = merge({}, block);
    
    /**
     * GFM Block Grammar
     */
    
    block.gfm = merge({}, block.normal, {
      fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
      paragraph: /^/,
      heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
    });
    
    block.gfm.paragraph = replace(block.paragraph)
      ('(?!', '(?!'
        + block.gfm.fences.source.replace('\\1', '\\2') + '|'
        + block.list.source.replace('\\1', '\\3') + '|')
      ();
    
    /**
     * GFM + Tables Block Grammar
     */
    
    block.tables = merge({}, block.gfm, {
      nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
      table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
    });
    
    /**
     * Block Lexer
     */
    
    var Lexer = function (options) {
      this.tokens = [];
      this.tokens.links = {};
      this.options = options || marked.defaults;
      this.rules = block.normal;
    
      if (this.options.gfm) {
        if (this.options.tables) {
          this.rules = block.tables;
        } else {
          this.rules = block.gfm;
        }
      }
    }
    
    /**
     * Expose Block Rules
     */
    
    Lexer.rules = block;
    
    /**
     * Static Lex Method
     */
    
    Lexer.lex = function(src, options) {
      var lexer = new Lexer(options);
      return lexer.lex(src);
    };
    
    /**
     * Preprocessing
     */
    
    Lexer.prototype.lex = function(src) {
      src = src
        .replace(/\r\n|\r/g, '\n')
        .replace(/\t/g, '    ')
        .replace(/\u00a0/g, ' ')
        .replace(/\u2424/g, '\n');
    
      return this.token(src, true);
    };
    
    /**
     * Lexing
     */
    
    Lexer.prototype.token = function(src, top, bq) {
      var src = src.replace(/^ +$/gm, '')
        , next
        , loose
        , cap
        , bull
        , b
        , item
        , space
        , i
        , l;
    
      while (src) {
        // newline
        if (cap = this.rules.newline.exec(src)) {
          src = src.substring(cap[0].length);
          if (cap[0].length > 1) {
            this.tokens.push({
              type: 'space'
            });
          }
        }
    
        // code
        if (cap = this.rules.code.exec(src)) {
          src = src.substring(cap[0].length);
          cap = cap[0].replace(/^ {4}/gm, '');
          this.tokens.push({
            type: 'code',
            text: !this.options.pedantic
              ? cap.replace(/\n+$/, '')
              : cap
          });
          continue;
        }
    
        // fences (gfm)
        if (cap = this.rules.fences.exec(src)) {
          src = src.substring(cap[0].length);
          this.tokens.push({
            type: 'code',
            lang: cap[2],
            text: cap[3] || ''
          });
          continue;
        }
    
        // heading
        if (cap = this.rules.heading.exec(src)) {
          src = src.substring(cap[0].length);
          this.tokens.push({
            type: 'heading',
            depth: cap[1].length,
            text: cap[2]
          });
          continue;
        }
    
        // table no leading pipe (gfm)
        if (top && (cap = this.rules.nptable.exec(src))) {
          src = src.substring(cap[0].length);
    
          item = {
            type: 'table',
            header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
            align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
            cells: cap[3].replace(/\n$/, '').split('\n')
          };
    
          for (i = 0; i < item.align.length; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }
    
          for (i = 0; i < item.cells.length; i++) {
            item.cells[i] = item.cells[i].split(/ *\| */);
          }
    
          this.tokens.push(item);
    
          continue;
        }
    
        // lheading
        if (cap = this.rules.lheading.exec(src)) {
          src = src.substring(cap[0].length);
          this.tokens.push({
            type: 'heading',
            depth: cap[2] === '=' ? 1 : 2,
            text: cap[1]
          });
          continue;
        }
    
        // hr
        if (cap = this.rules.hr.exec(src)) {
          src = src.substring(cap[0].length);
          this.tokens.push({
            type: 'hr'
          });
          continue;
        }
    
        // blockquote
        if (cap = this.rules.blockquote.exec(src)) {
          src = src.substring(cap[0].length);
    
          this.tokens.push({
            type: 'blockquote_start'
          });
    
          cap = cap[0].replace(/^ *> ?/gm, '');
    
          // Pass `top` to keep the current
          // "toplevel" state. This is exactly
          // how markdown.pl works.
          this.token(cap, top, true);
    
          this.tokens.push({
            type: 'blockquote_end'
          });
    
          continue;
        }
    
        // list
        if (cap = this.rules.list.exec(src)) {
          src = src.substring(cap[0].length);
          bull = cap[2];
    
          this.tokens.push({
            type: 'list_start',
            ordered: bull.length > 1
          });
    
          // Get each top-level item.
          cap = cap[0].match(this.rules.item);
    
          next = false;
          l = cap.length;
          i = 0;
    
          for (; i < l; i++) {
            item = cap[i];
    
            // Remove the list item's bullet
            // so it is seen as the next token.
            space = item.length;
            item = item.replace(/^ *([*+-]|\d+\.) +/, '');
    
            // Outdent whatever the
            // list item contains. Hacky.
            if (~item.indexOf('\n ')) {
              space -= item.length;
              item = !this.options.pedantic
                ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
                : item.replace(/^ {1,4}/gm, '');
            }
    
            // Determine whether the next list item belongs here.
            // Backpedal if it does not belong in this list.
            if (this.options.smartLists && i !== l - 1) {
              b = block.bullet.exec(cap[i + 1])[0];
              if (bull !== b && !(bull.length > 1 && b.length > 1)) {
                src = cap.slice(i + 1).join('\n') + src;
                i = l - 1;
              }
            }
    
            // Determine whether item is loose or not.
            // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
            // for discount behavior.
            loose = next || /\n\n(?!\s*$)/.test(item);
            if (i !== l - 1) {
              next = item.charAt(item.length - 1) === '\n';
              if (!loose) { loose = next; }
            }
    
            this.tokens.push({
              type: loose
                ? 'loose_item_start'
                : 'list_item_start'
            });
    
            // Recurse.
            this.token(item, false, bq);
    
            this.tokens.push({
              type: 'list_item_end'
            });
          }
    
          this.tokens.push({
            type: 'list_end'
          });
    
          continue;
        }
    
        // html
        if (cap = this.rules.html.exec(src)) {
          src = src.substring(cap[0].length);
          this.tokens.push({
            type: this.options.sanitize
              ? 'paragraph'
              : 'html',
            pre: !this.options.sanitizer
              && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
            text: cap[0]
          });
          continue;
        }
    
        // def
        if ((!bq && top) && (cap = this.rules.def.exec(src))) {
          src = src.substring(cap[0].length);
          this.tokens.links[cap[1].toLowerCase()] = {
            href: cap[2],
            title: cap[3]
          };
          continue;
        }
    
        // table (gfm)
        if (top && (cap = this.rules.table.exec(src))) {
          src = src.substring(cap[0].length);
    
          item = {
            type: 'table',
            header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
            align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
            cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
          };
    
          for (i = 0; i < item.align.length; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }
    
          for (i = 0; i < item.cells.length; i++) {
            item.cells[i] = item.cells[i]
              .replace(/^ *\| *| *\| *$/g, '')
              .split(/ *\| */);
          }
    
          this.tokens.push(item);
    
          continue;
        }
    
        // top-level paragraph
        if (top && (cap = this.rules.paragraph.exec(src))) {
          src = src.substring(cap[0].length);
          this.tokens.push({
            type: 'paragraph',
            text: cap[1].charAt(cap[1].length - 1) === '\n'
              ? cap[1].slice(0, -1)
              : cap[1]
          });
          continue;
        }
    
        // text
        if (cap = this.rules.text.exec(src)) {
          // Top-level should never reach here.
          src = src.substring(cap[0].length);
          this.tokens.push({
            type: 'text',
            text: cap[0]
          });
          continue;
        }
    
        if (src) {
          throw new
            Error('Infinite loop on byte: ' + src.charCodeAt(0));
        }
      }
    
      return this.tokens;
    };
    
    /**
     * Inline-Level Grammar
     */
    
    var inline = {
      escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
      autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
      url: noop,
      tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
      link: /^!?\[(inside)\]\(href\)/,
      reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
      nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
      strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
      em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
      code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
      br: /^ {2,}\n(?!\s*$)/,
      del: noop,
      text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
    };
    
    inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
    inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;
    
    inline.link = replace(inline.link)
      ('inside', inline._inside)
      ('href', inline._href)
      ();
    
    inline.reflink = replace(inline.reflink)
      ('inside', inline._inside)
      ();
    
    /**
     * Normal Inline Grammar
     */
    
    inline.normal = merge({}, inline);
    
    /**
     * Pedantic Inline Grammar
     */
    
    inline.pedantic = merge({}, inline.normal, {
      strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
    });
    
    /**
     * GFM Inline Grammar
     */
    
    inline.gfm = merge({}, inline.normal, {
      escape: replace(inline.escape)('])', '~|])')(),
      url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
      del: /^~~(?=\S)([\s\S]*?\S)~~/,
      text: replace(inline.text)
        (']|', '~]|')
        ('|', '|https?://|')
        ()
    });
    
    /**
     * GFM + Line Breaks Inline Grammar
     */
    
    inline.breaks = merge({}, inline.gfm, {
      br: replace(inline.br)('{2,}', '*')(),
      text: replace(inline.gfm.text)('{2,}', '*')()
    });
    
    /**
     * Inline Lexer & Compiler
     */
    
    var InlineLexer  = function (links, options) {
      this.options = options || marked.defaults;
      this.links = links;
      this.rules = inline.normal;
      this.renderer = this.options.renderer || new Renderer;
      this.renderer.options = this.options;
    
      if (!this.links) {
        throw new
          Error('Tokens array requires a `links` property.');
      }
    
      if (this.options.gfm) {
        if (this.options.breaks) {
          this.rules = inline.breaks;
        } else {
          this.rules = inline.gfm;
        }
      } else if (this.options.pedantic) {
        this.rules = inline.pedantic;
      }
    }
    
    /**
     * Expose Inline Rules
     */
    
    InlineLexer.rules = inline;
    
    /**
     * Static Lexing/Compiling Method
     */
    
    InlineLexer.output = function(src, links, options) {
      var inline = new InlineLexer(links, options);
      return inline.output(src);
    };
    
    /**
     * Lexing/Compiling
     */
    
    InlineLexer.prototype.output = function(src) {
      var out = ''
        , link
        , text
        , href
        , cap;
    
      while (src) {
        // escape
        if (cap = this.rules.escape.exec(src)) {
          src = src.substring(cap[0].length);
          out += cap[1];
          continue;
        }
    
        // autolink
        if (cap = this.rules.autolink.exec(src)) {
          src = src.substring(cap[0].length);
          if (cap[2] === '@') {
            text = cap[1].charAt(6) === ':'
              ? this.mangle(cap[1].substring(7))
              : this.mangle(cap[1]);
            href = this.mangle('mailto:') + text;
          } else {
            text = escape(cap[1]);
            href = text;
          }
          out += this.renderer.link(href, null, text);
          continue;
        }
    
        // url (gfm)
        if (!this.inLink && (cap = this.rules.url.exec(src))) {
          src = src.substring(cap[0].length);
          text = escape(cap[1]);
          href = text;
          out += this.renderer.link(href, null, text);
          continue;
        }
    
        // tag
        if (cap = this.rules.tag.exec(src)) {
          if (!this.inLink && /^<a /i.test(cap[0])) {
            this.inLink = true;
          } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
            this.inLink = false;
          }
          src = src.substring(cap[0].length);
          out += this.options.sanitize
            ? this.options.sanitizer
              ? this.options.sanitizer(cap[0])
              : escape(cap[0])
            : cap[0];
          continue;
        }
    
        // link
        if (cap = this.rules.link.exec(src)) {
          src = src.substring(cap[0].length);
          this.inLink = true;
          out += this.outputLink(cap, {
            href: cap[2],
            title: cap[3]
          });
          this.inLink = false;
          continue;
        }
    
        // reflink, nolink
        if ((cap = this.rules.reflink.exec(src))
            || (cap = this.rules.nolink.exec(src))) {
          src = src.substring(cap[0].length);
          link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
          link = this.links[link.toLowerCase()];
          if (!link || !link.href) {
            out += cap[0].charAt(0);
            src = cap[0].substring(1) + src;
            continue;
          }
          this.inLink = true;
          out += this.outputLink(cap, link);
          this.inLink = false;
          continue;
        }
    
        // strong
        if (cap = this.rules.strong.exec(src)) {
          src = src.substring(cap[0].length);
          out += this.renderer.strong(this.output(cap[2] || cap[1]));
          continue;
        }
    
        // em
        if (cap = this.rules.em.exec(src)) {
          src = src.substring(cap[0].length);
          out += this.renderer.em(this.output(cap[2] || cap[1]));
          continue;
        }
    
        // code
        if (cap = this.rules.code.exec(src)) {
          src = src.substring(cap[0].length);
          out += this.renderer.codespan(escape(cap[2], true));
          continue;
        }
    
        // br
        if (cap = this.rules.br.exec(src)) {
          src = src.substring(cap[0].length);
          out += this.renderer.br();
          continue;
        }
    
        // del (gfm)
        if (cap = this.rules.del.exec(src)) {
          src = src.substring(cap[0].length);
          out += this.renderer.del(this.output(cap[1]));
          continue;
        }
    
        // text
        if (cap = this.rules.text.exec(src)) {
          src = src.substring(cap[0].length);
          out += this.renderer.text(escape(this.smartypants(cap[0])));
          continue;
        }
    
        if (src) {
          throw new
            Error('Infinite loop on byte: ' + src.charCodeAt(0));
        }
      }
    
      return out;
    };
    
    /**
     * Compile Link
     */
    
    InlineLexer.prototype.outputLink = function(cap, link) {
      var href = escape(link.href)
        , title = link.title ? escape(link.title) : null;
    
      return cap[0].charAt(0) !== '!'
        ? this.renderer.link(href, title, this.output(cap[1]))
        : this.renderer.image(href, title, escape(cap[1]));
    };
    
    /**
     * Smartypants Transformations
     */
    
    InlineLexer.prototype.smartypants = function(text) {
      if (!this.options.smartypants)  { return text; }
      return text
        // em-dashes
        .replace(/---/g, '\u2014')
        // en-dashes
        .replace(/--/g, '\u2013')
        // opening singles
        .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
        // closing singles & apostrophes
        .replace(/'/g, '\u2019')
        // opening doubles
        .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
        // closing doubles
        .replace(/"/g, '\u201d')
        // ellipses
        .replace(/\.{3}/g, '\u2026');
    };
    
    /**
     * Mangle Links
     */
    
    InlineLexer.prototype.mangle = function(text) {
      if (!this.options.mangle) { return text; }
      var out = ''
        , l = text.length
        , i = 0
        , ch;
    
      for (; i < l; i++) {
        ch = text.charCodeAt(i);
        if (Math.random() > 0.5) {
          ch = 'x' + ch.toString(16);
        }
        out += '&#' + ch + ';';
      }
    
      return out;
    };
    
    /**
     * Renderer
     */
    
     /**
         * eval:var:Renderer
    */
    
    var Renderer   = function (options) {
      this.options = options || {};
    }
    
    Renderer.prototype.code = function(code, lang, escaped) {
      if (this.options.highlight) {
        var out = this.options.highlight(code, lang);
        if (out != null && out !== code) {
          escaped = true;
          code = out;
        }
      } else {
            // hack!!! - it's already escapeD?
            escaped = true;
      }
    
      if (!lang) {
        return '<pre><code>'
          + (escaped ? code : escape(code, true))
          + '\n</code></pre>';
      }
    
      return '<pre><code class="'
        + this.options.langPrefix
        + escape(lang, true)
        + '">'
        + (escaped ? code : escape(code, true))
        + '\n</code></pre>\n';
    };
    
    Renderer.prototype.blockquote = function(quote) {
      return '<blockquote>\n' + quote + '</blockquote>\n';
    };
    
    Renderer.prototype.html = function(html) {
      return html;
    };
    
    Renderer.prototype.heading = function(text, level, raw) {
      return '<h'
        + level
        + ' id="'
        + this.options.headerPrefix
        + raw.toLowerCase().replace(/[^\w]+/g, '-')
        + '">'
        + text
        + '</h'
        + level
        + '>\n';
    };
    
    Renderer.prototype.hr = function() {
      return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
    };
    
    Renderer.prototype.list = function(body, ordered) {
      var type = ordered ? 'ol' : 'ul';
      return '<' + type + '>\n' + body + '</' + type + '>\n';
    };
    
    Renderer.prototype.listitem = function(text) {
      return '<li>' + text + '</li>\n';
    };
    
    Renderer.prototype.paragraph = function(text) {
      return '<p>' + text + '</p>\n';
    };
    
    Renderer.prototype.table = function(header, body) {
      return '<table class="table table-striped">\n'
        + '<thead>\n'
        + header
        + '</thead>\n'
        + '<tbody>\n'
        + body
        + '</tbody>\n'
        + '</table>\n';
    };
    
    Renderer.prototype.tablerow = function(content) {
      return '<tr>\n' + content + '</tr>\n';
    };
    
    Renderer.prototype.tablecell = function(content, flags) {
      var type = flags.header ? 'th' : 'td';
      var tag = flags.align
        ? '<' + type + ' style="text-align:' + flags.align + '">'
        : '<' + type + '>';
      return tag + content + '</' + type + '>\n';
    };
    
    // span level renderer
    Renderer.prototype.strong = function(text) {
      return '<strong>' + text + '</strong>';
    };
    
    Renderer.prototype.em = function(text) {
      return '<em>' + text + '</em>';
    };
    
    Renderer.prototype.codespan = function(text) {
      return '<code>' + text + '</code>';
    };
    
    Renderer.prototype.br = function() {
      return this.options.xhtml ? '<br/>' : '<br>';
    };
    
    Renderer.prototype.del = function(text) {
      return '<del>' + text + '</del>';
    };
    
    Renderer.prototype.link = function(href, title, text) {
      if (this.options.sanitize) {
        try {
          var prot = decodeURIComponent(unescape(href))
            .replace(/[^\w:]/g, '')
            .toLowerCase();
        } catch (e) {
          return '';
        }
        if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
          return '';
        }
      }
      var out = '<a href="' + href + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += '>' + text + '</a>';
      return out;
    };
    
    Renderer.prototype.image = function(href, title, text) {
      var out = '<img src="' + href + '" alt="' + text + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += this.options.xhtml ? '/>' : '>';
      return out;
    };
    
    Renderer.prototype.text = function(text) {
      return text;
    };
    
    /**
     * Parsing & Compiling
     */
         /**
         * eval:var:Parser
    */
    
    var Parser= function (options) {
      this.tokens = [];
      this.token = null;
      this.options = options || marked.defaults;
      this.options.renderer = this.options.renderer || new Renderer;
      this.renderer = this.options.renderer;
      this.renderer.options = this.options;
    }
    
    /**
     * Static Parse Method
     */
    
    Parser.parse = function(src, options, renderer) {
      var parser = new Parser(options, renderer);
      return parser.parse(src);
    };
    
    /**
     * Parse Loop
     */
    
    Parser.prototype.parse = function(src) {
      this.inline = new InlineLexer(src.links, this.options, this.renderer);
      this.tokens = src.reverse();
    
      var out = '';
      while (this.next()) {
        out += this.tok();
      }
    
      return out;
    };
    
    /**
     * Next Token
     */
    
    Parser.prototype.next = function() {
      return this.token = this.tokens.pop();
    };
    
    /**
     * Preview Next Token
     */
    
    Parser.prototype.peek = function() {
      return this.tokens[this.tokens.length - 1] || 0;
    };
    
    /**
     * Parse Text Tokens
     */
    
    Parser.prototype.parseText = function() {
      var body = this.token.text;
    
      while (this.peek().type === 'text') {
        body += '\n' + this.next().text;
      }
    
      return this.inline.output(body);
    };
    
    /**
     * Parse Current Token
     */
    
    Parser.prototype.tok = function() {
      switch (this.token.type) {
        case 'space': {
          return '';
        }
        case 'hr': {
          return this.renderer.hr();
        }
        case 'heading': {
          return this.renderer.heading(
            this.inline.output(this.token.text),
            this.token.depth,
            this.token.text);
        }
        case 'code': {
          return this.renderer.code(this.token.text,
            this.token.lang,
            this.token.escaped);
        }
        case 'table': {
          var header = ''
            , body = ''
            , i
            , row
            , cell
            , flags
            , j;
    
          // header
          cell = '';
          for (i = 0; i < this.token.header.length; i++) {
            flags = { header: true, align: this.token.align[i] };
            cell += this.renderer.tablecell(
              this.inline.output(this.token.header[i]),
              { header: true, align: this.token.align[i] }
            );
          }
          header += this.renderer.tablerow(cell);
    
          for (i = 0; i < this.token.cells.length; i++) {
            row = this.token.cells[i];
    
            cell = '';
            for (j = 0; j < row.length; j++) {
              cell += this.renderer.tablecell(
                this.inline.output(row[j]),
                { header: false, align: this.token.align[j] }
              );
            }
    
            body += this.renderer.tablerow(cell);
          }
          return this.renderer.table(header, body);
        }
        case 'blockquote_start': {
          var body = '';
    
          while (this.next().type !== 'blockquote_end') {
            body += this.tok();
          }
    
          return this.renderer.blockquote(body);
        }
        case 'list_start': {
          var body = ''
            , ordered = this.token.ordered;
    
          while (this.next().type !== 'list_end') {
            body += this.tok();
          }
    
          return this.renderer.list(body, ordered);
        }
        case 'list_item_start': {
          var body = '';
    
          while (this.next().type !== 'list_item_end') {
            body += this.token.type === 'text'
              ? this.parseText()
              : this.tok();
          }
    
          return this.renderer.listitem(body);
        }
        case 'loose_item_start': {
          var body = '';
    
          while (this.next().type !== 'list_item_end') {
            body += this.tok();
          }
    
          return this.renderer.listitem(body);
        }
        case 'html': {
          var html = !this.token.pre && !this.options.pedantic
            ? this.inline.output(this.token.text)
            : this.token.text;
          return this.renderer.html(html);
        }
        case 'paragraph': {
          return this.renderer.paragraph(this.inline.output(this.token.text));
        }
        case 'text': {
          return this.renderer.paragraph(this.parseText());
        }
      }
    };
  
    
    /**
     * Marked
     */
         /**
         * eval:var:marked
    */
    var marked = function (src, opt, callback) {
      if (callback || typeof opt === 'function') {
        if (!callback) {
          callback = opt;
          opt = null;
        }
    
        opt = merge({}, marked.defaults, opt || {});
    
        var highlight = opt.highlight
          , tokens
          , pending
          , i = 0;
    
        try {
          tokens = Lexer.lex(src, opt)
        } catch (e) {
          return callback(e);
        }
    
        pending = tokens.length;
         /**
         * eval:var:done
    */
        var done = function(err) {
          if (err) {
            opt.highlight = highlight;
            return callback(err);
          }
    
          var out;
    
          try {
            out = Parser.parse(tokens, opt);
          } catch (e) {
            err = e;
          }
    
          opt.highlight = highlight;
    
          return err
            ? callback(err)
            : callback(null, out);
        };
    
        if (!highlight || highlight.length < 3) {
          return done();
        }
    
        delete opt.highlight;
    
        if (!pending) { return done(); }
    
        for (; i < tokens.length; i++) {
          (function(token) {
            if (token.type !== 'code') {
              return --pending || done();
            }
            return highlight(token.text, token.lang, function(err, code) {
              if (err) { return done(err); }
              if (code == null || code === token.text) {
                return --pending || done();
              }
              token.text = code;
              token.escaped = true;
              --pending || done();
            });
          })(tokens[i]);
        }
    
        return;
      }
      try {
        if (opt) { opt = merge({}, marked.defaults, opt); }
        return Parser.parse(Lexer.lex(src, opt), opt);
      } catch (e) {
        e.message += '\nPlease report this to https://github.com/chjj/marked.';
        if ((opt || marked.defaults).silent) {
          return '<p>An error occured:</p><pre>'
            + escape(e.message + '', true)
            + '</pre>';
        }
        throw e;
      }
    }
    
    /**
     * Options
     */
    
    marked.options =
    marked.setOptions = function(opt) {
      merge(marked.defaults, opt);
      return marked;
    };
    
    marked.defaults = {
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      sanitizer: null,
      mangle: true,
      smartLists: false,
      silent: false,
      highlight: null,
      langPrefix: 'lang-',
      smartypants: false,
      headerPrefix: '',
      renderer: new Renderer,
      xhtml: false
    };
    
    /**
     * Expose
     */
    
    marked.Parser = Parser;
    marked.parser = Parser.parse;
    
    marked.Renderer = Renderer;
    
    marked.Lexer = Lexer;
    marked.lexer = Lexer.lex;
    
    marked.InlineLexer = InlineLexer;
    marked.inlineLexer = InlineLexer.output;
    
    marked.parse = marked;
    
    Roo.Markdown.marked = marked;

})();/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */



/*
 * These classes are derivatives of the similarly named classes in the YUI Library.
 * The original license:
 * Copyright (c) 2006, Yahoo! Inc. All rights reserved.
 * Code licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 */

(function() {

var Event=Roo.EventManager;
var Dom=Roo.lib.Dom;

/**
 * @class Roo.dd.DragDrop
 * @extends Roo.util.Observable
 * Defines the interface and base operation of items that that can be
 * dragged or can be drop targets.  It was designed to be extended, overriding
 * the event handlers for startDrag, onDrag, onDragOver and onDragOut.
 * Up to three html elements can be associated with a DragDrop instance:
 * <ul>
 * <li>linked element: the element that is passed into the constructor.
 * This is the element which defines the boundaries for interaction with
 * other DragDrop objects.</li>
 * <li>handle element(s): The drag operation only occurs if the element that
 * was clicked matches a handle element.  By default this is the linked
 * element, but there are times that you will want only a portion of the
 * linked element to initiate the drag operation, and the setHandleElId()
 * method provides a way to define this.</li>
 * <li>drag element: this represents the element that would be moved along
 * with the cursor during a drag operation.  By default, this is the linked
 * element itself as in {@link Roo.dd.DD}.  setDragElId() lets you define
 * a separate element that would be moved, as in {@link Roo.dd.DDProxy}.
 * </li>
 * </ul>
 * This class should not be instantiated until the onload event to ensure that
 * the associated elements are available.
 * The following would define a DragDrop obj that would interact with any
 * other DragDrop obj in the "group1" group:
 * <pre>
 *  dd = new Roo.dd.DragDrop("div1", "group1");
 * </pre>
 * Since none of the event handlers have been implemented, nothing would
 * actually happen if you were to run the code above.  Normally you would
 * override this class or one of the default implementations, but you can
 * also override the methods you want on an instance of the class...
 * <pre>
 *  dd.onDragDrop = function(e, id) {
 *  &nbsp;&nbsp;alert("dd was dropped on " + id);
 *  }
 * </pre>
 * @constructor
 * @param {String} id of the element that is linked to this instance
 * @param {String} sGroup the group of related DragDrop objects
 * @param {object} config an object containing configurable attributes
 *                Valid properties for DragDrop:
 *                    padding, isTarget, maintainOffset, primaryButtonOnly
 */
Roo.dd.DragDrop = function(id, sGroup, config) {
    if (id) {
        this.init(id, sGroup, config);
    }
    
};

Roo.extend(Roo.dd.DragDrop, Roo.util.Observable , {

    /**
     * The id of the element associated with this object.  This is what we
     * refer to as the "linked element" because the size and position of
     * this element is used to determine when the drag and drop objects have
     * interacted.
     * @property id
     * @type String
     */
    id: null,

    /**
     * Configuration attributes passed into the constructor
     * @property config
     * @type object
     */
    config: null,

    /**
     * The id of the element that will be dragged.  By default this is same
     * as the linked element , but could be changed to another element. Ex:
     * Roo.dd.DDProxy
     * @property dragElId
     * @type String
     * @private
     */
    dragElId: null,

    /**
     * the id of the element that initiates the drag operation.  By default
     * this is the linked element, but could be changed to be a child of this
     * element.  This lets us do things like only starting the drag when the
     * header element within the linked html element is clicked.
     * @property handleElId
     * @type String
     * @private
     */
    handleElId: null,

    /**
     * An associative array of HTML tags that will be ignored if clicked.
     * @property invalidHandleTypes
     * @type {string: string}
     */
    invalidHandleTypes: null,

    /**
     * An associative array of ids for elements that will be ignored if clicked
     * @property invalidHandleIds
     * @type {string: string}
     */
    invalidHandleIds: null,

    /**
     * An indexted array of css class names for elements that will be ignored
     * if clicked.
     * @property invalidHandleClasses
     * @type string[]
     */
    invalidHandleClasses: null,

    /**
     * The linked element's absolute X position at the time the drag was
     * started
     * @property startPageX
     * @type int
     * @private
     */
    startPageX: 0,

    /**
     * The linked element's absolute X position at the time the drag was
     * started
     * @property startPageY
     * @type int
     * @private
     */
    startPageY: 0,

    /**
     * The group defines a logical collection of DragDrop objects that are
     * related.  Instances only get events when interacting with other
     * DragDrop object in the same group.  This lets us define multiple
     * groups using a single DragDrop subclass if we want.
     * @property groups
     * @type {string: string}
     */
    groups: null,

    /**
     * Individual drag/drop instances can be locked.  This will prevent
     * onmousedown start drag.
     * @property locked
     * @type boolean
     * @private
     */
    locked: false,

    /**
     * Lock this instance
     * @method lock
     */
    lock: function() { this.locked = true; },

    /**
     * Unlock this instace
     * @method unlock
     */
    unlock: function() { this.locked = false; },

    /**
     * By default, all insances can be a drop target.  This can be disabled by
     * setting isTarget to false.
     * @method isTarget
     * @type boolean
     */
    isTarget: true,

    /**
     * The padding configured for this drag and drop object for calculating
     * the drop zone intersection with this object.
     * @method padding
     * @type int[]
     */
    padding: null,

    /**
     * Cached reference to the linked element
     * @property _domRef
     * @private
     */
    _domRef: null,

    /**
     * Internal typeof flag
     * @property __ygDragDrop
     * @private
     */
    __ygDragDrop: true,

    /**
     * Set to true when horizontal contraints are applied
     * @property constrainX
     * @type boolean
     * @private
     */
    constrainX: false,

    /**
     * Set to true when vertical contraints are applied
     * @property constrainY
     * @type boolean
     * @private
     */
    constrainY: false,

    /**
     * The left constraint
     * @property minX
     * @type int
     * @private
     */
    minX: 0,

    /**
     * The right constraint
     * @property maxX
     * @type int
     * @private
     */
    maxX: 0,

    /**
     * The up constraint
     * @property minY
     * @type int
     * @type int
     * @private
     */
    minY: 0,

    /**
     * The down constraint
     * @property maxY
     * @type int
     * @private
     */
    maxY: 0,

    /**
     * Maintain offsets when we resetconstraints.  Set to true when you want
     * the position of the element relative to its parent to stay the same
     * when the page changes
     *
     * @property maintainOffset
     * @type boolean
     */
    maintainOffset: false,

    /**
     * Array of pixel locations the element will snap to if we specified a
     * horizontal graduation/interval.  This array is generated automatically
     * when you define a tick interval.
     * @property xTicks
     * @type int[]
     */
    xTicks: null,

    /**
     * Array of pixel locations the element will snap to if we specified a
     * vertical graduation/interval.  This array is generated automatically
     * when you define a tick interval.
     * @property yTicks
     * @type int[]
     */
    yTicks: null,

    /**
     * By default the drag and drop instance will only respond to the primary
     * button click (left button for a right-handed mouse).  Set to true to
     * allow drag and drop to start with any mouse click that is propogated
     * by the browser
     * @property primaryButtonOnly
     * @type boolean
     */
    primaryButtonOnly: true,

    /**
     * The availabe property is false until the linked dom element is accessible.
     * @property available
     * @type boolean
     */
    available: false,

    /**
     * By default, drags can only be initiated if the mousedown occurs in the
     * region the linked element is.  This is done in part to work around a
     * bug in some browsers that mis-report the mousedown if the previous
     * mouseup happened outside of the window.  This property is set to true
     * if outer handles are defined.
     *
     * @property hasOuterHandles
     * @type boolean
     * @default false
     */
    hasOuterHandles: false,

    /**
     * Code that executes immediately before the startDrag event
     * @method b4StartDrag
     * @private
     */
    b4StartDrag: function(x, y) { },

    /**
     * Abstract method called after a drag/drop object is clicked
     * and the drag or mousedown time thresholds have beeen met.
     * @method startDrag
     * @param {int} X click location
     * @param {int} Y click location
     */
    startDrag: function(x, y) { /* override this */ },

    /**
     * Code that executes immediately before the onDrag event
     * @method b4Drag
     * @private
     */
    b4Drag: function(e) { },

    /**
     * Abstract method called during the onMouseMove event while dragging an
     * object.
     * @method onDrag
     * @param {Event} e the mousemove event
     */
    onDrag: function(e) { /* override this */ },

    /**
     * Abstract method called when this element fist begins hovering over
     * another DragDrop obj
     * @method onDragEnter
     * @param {Event} e the mousemove event
     * @param {String|DragDrop[]} id In POINT mode, the element
     * id this is hovering over.  In INTERSECT mode, an array of one or more
     * dragdrop items being hovered over.
     */
    onDragEnter: function(e, id) { /* override this */ },

    /**
     * Code that executes immediately before the onDragOver event
     * @method b4DragOver
     * @private
     */
    b4DragOver: function(e) { },

    /**
     * Abstract method called when this element is hovering over another
     * DragDrop obj
     * @method onDragOver
     * @param {Event} e the mousemove event
     * @param {String|DragDrop[]} id In POINT mode, the element
     * id this is hovering over.  In INTERSECT mode, an array of dd items
     * being hovered over.
     */
    onDragOver: function(e, id) { /* override this */ },

    /**
     * Code that executes immediately before the onDragOut event
     * @method b4DragOut
     * @private
     */
    b4DragOut: function(e) { },

    /**
     * Abstract method called when we are no longer hovering over an element
     * @method onDragOut
     * @param {Event} e the mousemove event
     * @param {String|DragDrop[]} id In POINT mode, the element
     * id this was hovering over.  In INTERSECT mode, an array of dd items
     * that the mouse is no longer over.
     */
    onDragOut: function(e, id) { /* override this */ },

    /**
     * Code that executes immediately before the onDragDrop event
     * @method b4DragDrop
     * @private
     */
    b4DragDrop: function(e) { },

    /**
     * Abstract method called when this item is dropped on another DragDrop
     * obj
     * @method onDragDrop
     * @param {Event} e the mouseup event
     * @param {String|DragDrop[]} id In POINT mode, the element
     * id this was dropped on.  In INTERSECT mode, an array of dd items this
     * was dropped on.
     */
    onDragDrop: function(e, id) { /* override this */ },

    /**
     * Abstract method called when this item is dropped on an area with no
     * drop target
     * @method onInvalidDrop
     * @param {Event} e the mouseup event
     */
    onInvalidDrop: function(e) { /* override this */ },

    /**
     * Code that executes immediately before the endDrag event
     * @method b4EndDrag
     * @private
     */
    b4EndDrag: function(e) { },

    /**
     * Fired when we are done dragging the object
     * @method endDrag
     * @param {Event} e the mouseup event
     */
    endDrag: function(e) { /* override this */ },

    /**
     * Code executed immediately before the onMouseDown event
     * @method b4MouseDown
     * @param {Event} e the mousedown event
     * @private
     */
    b4MouseDown: function(e) {  },

    /**
     * Event handler that fires when a drag/drop obj gets a mousedown
     * @method onMouseDown
     * @param {Event} e the mousedown event
     */
    onMouseDown: function(e) { /* override this */ },

    /**
     * Event handler that fires when a drag/drop obj gets a mouseup
     * @method onMouseUp
     * @param {Event} e the mouseup event
     */
    onMouseUp: function(e) { /* override this */ },

    /**
     * Override the onAvailable method to do what is needed after the initial
     * position was determined.
     * @method onAvailable
     */
    onAvailable: function () {
    },

    /*
     * Provides default constraint padding to "constrainTo" elements (defaults to {left: 0, right:0, top:0, bottom:0}).
     * @type Object
     */
    defaultPadding : {left:0, right:0, top:0, bottom:0},

    /*
     * Initializes the drag drop object's constraints to restrict movement to a certain element.
 *
 * Usage:
 <pre><code>
 var dd = new Roo.dd.DDProxy("dragDiv1", "proxytest",
                { dragElId: "existingProxyDiv" });
 dd.startDrag = function(){
     this.constrainTo("parent-id");
 };
 </code></pre>
 * Or you can initalize it using the {@link Roo.Element} object:
 <pre><code>
 Roo.get("dragDiv1").initDDProxy("proxytest", {dragElId: "existingProxyDiv"}, {
     startDrag : function(){
         this.constrainTo("parent-id");
     }
 });
 </code></pre>
     * @param {String/HTMLElement/Element} constrainTo The element to constrain to.
     * @param {Object/Number} pad (optional) Pad provides a way to specify "padding" of the constraints,
     * and can be either a number for symmetrical padding (4 would be equal to {left:4, right:4, top:4, bottom:4}) or
     * an object containing the sides to pad. For example: {right:10, bottom:10}
     * @param {Boolean} inContent (optional) Constrain the draggable in the content box of the element (inside padding and borders)
     */
    constrainTo : function(constrainTo, pad, inContent){
        if(typeof pad == "number"){
            pad = {left: pad, right:pad, top:pad, bottom:pad};
        }
        pad = pad || this.defaultPadding;
        var b = Roo.get(this.getEl()).getBox();
        var ce = Roo.get(constrainTo);
        var s = ce.getScroll();
        var c, cd = ce.dom;
        if(cd == document.body){
            c = { x: s.left, y: s.top, width: Roo.lib.Dom.getViewWidth(), height: Roo.lib.Dom.getViewHeight()};
        }else{
            xy = ce.getXY();
            c = {x : xy[0]+s.left, y: xy[1]+s.top, width: cd.clientWidth, height: cd.clientHeight};
        }


        var topSpace = b.y - c.y;
        var leftSpace = b.x - c.x;

        this.resetConstraints();
        this.setXConstraint(leftSpace - (pad.left||0), // left
                c.width - leftSpace - b.width - (pad.right||0) //right
        );
        this.setYConstraint(topSpace - (pad.top||0), //top
                c.height - topSpace - b.height - (pad.bottom||0) //bottom
        );
    },

    /**
     * Returns a reference to the linked element
     * @method getEl
     * @return {HTMLElement} the html element
     */
    getEl: function() {
        if (!this._domRef) {
            this._domRef = Roo.getDom(this.id);
        }

        return this._domRef;
    },

    /**
     * Returns a reference to the actual element to drag.  By default this is
     * the same as the html element, but it can be assigned to another
     * element. An example of this can be found in Roo.dd.DDProxy
     * @method getDragEl
     * @return {HTMLElement} the html element
     */
    getDragEl: function() {
        return Roo.getDom(this.dragElId);
    },

    /**
     * Sets up the DragDrop object.  Must be called in the constructor of any
     * Roo.dd.DragDrop subclass
     * @method init
     * @param id the id of the linked element
     * @param {String} sGroup the group of related items
     * @param {object} config configuration attributes
     */
    init: function(id, sGroup, config) {
        this.initTarget(id, sGroup, config);
        if (!Roo.isTouch) {
            Event.on(this.id, "mousedown", this.handleMouseDown, this);
        }
        Event.on(this.id, "touchstart", this.handleMouseDown, this);
        // Event.on(this.id, "selectstart", Event.preventDefault);
    },

    /**
     * Initializes Targeting functionality only... the object does not
     * get a mousedown handler.
     * @method initTarget
     * @param id the id of the linked element
     * @param {String} sGroup the group of related items
     * @param {object} config configuration attributes
     */
    initTarget: function(id, sGroup, config) {

        // configuration attributes
        this.config = config || {};

        // create a local reference to the drag and drop manager
        this.DDM = Roo.dd.DDM;
        // initialize the groups array
        this.groups = {};

        // assume that we have an element reference instead of an id if the
        // parameter is not a string
        if (typeof id !== "string") {
            id = Roo.id(id);
        }

        // set the id
        this.id = id;

        // add to an interaction group
        this.addToGroup((sGroup) ? sGroup : "default");

        // We don't want to register this as the handle with the manager
        // so we just set the id rather than calling the setter.
        this.handleElId = id;

        // the linked element is the element that gets dragged by default
        this.setDragElId(id);

        // by default, clicked anchors will not start drag operations.
        this.invalidHandleTypes = { A: "A" };
        this.invalidHandleIds = {};
        this.invalidHandleClasses = [];

        this.applyConfig();

        this.handleOnAvailable();
    },

    /**
     * Applies the configuration parameters that were passed into the constructor.
     * This is supposed to happen at each level through the inheritance chain.  So
     * a DDProxy implentation will execute apply config on DDProxy, DD, and
     * DragDrop in order to get all of the parameters that are available in
     * each object.
     * @method applyConfig
     */
    applyConfig: function() {

        // configurable properties:
        //    padding, isTarget, maintainOffset, primaryButtonOnly
        this.padding           = this.config.padding || [0, 0, 0, 0];
        this.isTarget          = (this.config.isTarget !== false);
        this.maintainOffset    = (this.config.maintainOffset);
        this.primaryButtonOnly = (this.config.primaryButtonOnly !== false);

    },

    /**
     * Executed when the linked element is available
     * @method handleOnAvailable
     * @private
     */
    handleOnAvailable: function() {
        this.available = true;
        this.resetConstraints();
        this.onAvailable();
    },

     /**
     * Configures the padding for the target zone in px.  Effectively expands
     * (or reduces) the virtual object size for targeting calculations.
     * Supports css-style shorthand; if only one parameter is passed, all sides
     * will have that padding, and if only two are passed, the top and bottom
     * will have the first param, the left and right the second.
     * @method setPadding
     * @param {int} iTop    Top pad
     * @param {int} iRight  Right pad
     * @param {int} iBot    Bot pad
     * @param {int} iLeft   Left pad
     */
    setPadding: function(iTop, iRight, iBot, iLeft) {
        // this.padding = [iLeft, iRight, iTop, iBot];
        if (!iRight && 0 !== iRight) {
            this.padding = [iTop, iTop, iTop, iTop];
        } else if (!iBot && 0 !== iBot) {
            this.padding = [iTop, iRight, iTop, iRight];
        } else {
            this.padding = [iTop, iRight, iBot, iLeft];
        }
    },

    /**
     * Stores the initial placement of the linked element.
     * @method setInitialPosition
     * @param {int} diffX   the X offset, default 0
     * @param {int} diffY   the Y offset, default 0
     */
    setInitPosition: function(diffX, diffY) {
        var el = this.getEl();

        if (!this.DDM.verifyEl(el)) {
            return;
        }

        var dx = diffX || 0;
        var dy = diffY || 0;

        var p = Dom.getXY( el );

        this.initPageX = p[0] - dx;
        this.initPageY = p[1] - dy;

        this.lastPageX = p[0];
        this.lastPageY = p[1];


        this.setStartPosition(p);
    },

    /**
     * Sets the start position of the element.  This is set when the obj
     * is initialized, the reset when a drag is started.
     * @method setStartPosition
     * @param pos current position (from previous lookup)
     * @private
     */
    setStartPosition: function(pos) {
        var p = pos || Dom.getXY( this.getEl() );
        this.deltaSetXY = null;

        this.startPageX = p[0];
        this.startPageY = p[1];
    },

    /**
     * Add this instance to a group of related drag/drop objects.  All
     * instances belong to at least one group, and can belong to as many
     * groups as needed.
     * @method addToGroup
     * @param sGroup {string} the name of the group
     */
    addToGroup: function(sGroup) {
        this.groups[sGroup] = true;
        this.DDM.regDragDrop(this, sGroup);
    },

    /**
     * Remove's this instance from the supplied interaction group
     * @method removeFromGroup
     * @param {string}  sGroup  The group to drop
     */
    removeFromGroup: function(sGroup) {
        if (this.groups[sGroup]) {
            delete this.groups[sGroup];
        }

        this.DDM.removeDDFromGroup(this, sGroup);
    },

    /**
     * Allows you to specify that an element other than the linked element
     * will be moved with the cursor during a drag
     * @method setDragElId
     * @param id {string} the id of the element that will be used to initiate the drag
     */
    setDragElId: function(id) {
        this.dragElId = id;
    },

    /**
     * Allows you to specify a child of the linked element that should be
     * used to initiate the drag operation.  An example of this would be if
     * you have a content div with text and links.  Clicking anywhere in the
     * content area would normally start the drag operation.  Use this method
     * to specify that an element inside of the content div is the element
     * that starts the drag operation.
     * @method setHandleElId
     * @param id {string} the id of the element that will be used to
     * initiate the drag.
     */
    setHandleElId: function(id) {
        if (typeof id !== "string") {
            id = Roo.id(id);
        }
        this.handleElId = id;
        this.DDM.regHandle(this.id, id);
    },

    /**
     * Allows you to set an element outside of the linked element as a drag
     * handle
     * @method setOuterHandleElId
     * @param id the id of the element that will be used to initiate the drag
     */
    setOuterHandleElId: function(id) {
        if (typeof id !== "string") {
            id = Roo.id(id);
        }
        Event.on(id, "mousedown",
                this.handleMouseDown, this);
        this.setHandleElId(id);

        this.hasOuterHandles = true;
    },

    /**
     * Remove all drag and drop hooks for this element
     * @method unreg
     */
    unreg: function() {
        Event.un(this.id, "mousedown",
                this.handleMouseDown);
        Event.un(this.id, "touchstart",
                this.handleMouseDown);
        this._domRef = null;
        this.DDM._remove(this);
    },

    destroy : function(){
        this.unreg();
    },

    /**
     * Returns true if this instance is locked, or the drag drop mgr is locked
     * (meaning that all drag/drop is disabled on the page.)
     * @method isLocked
     * @return {boolean} true if this obj or all drag/drop is locked, else
     * false
     */
    isLocked: function() {
        return (this.DDM.isLocked() || this.locked);
    },

    /**
     * Fired when this object is clicked
     * @method handleMouseDown
     * @param {Event} e
     * @param {Roo.dd.DragDrop} oDD the clicked dd object (this dd obj)
     * @private
     */
    handleMouseDown: function(e, oDD){
     
        if (!Roo.isTouch && this.primaryButtonOnly && e.button != 0) {
            //Roo.log('not touch/ button !=0');
            return;
        }
        if (e.browserEvent.touches && e.browserEvent.touches.length != 1) {
            return; // double touch..
        }
        

        if (this.isLocked()) {
            //Roo.log('locked');
            return;
        }

        this.DDM.refreshCache(this.groups);
//        Roo.log([Roo.lib.Event.getPageX(e), Roo.lib.Event.getPageY(e)]);
        var pt = new Roo.lib.Point(Roo.lib.Event.getPageX(e), Roo.lib.Event.getPageY(e));
        if (!this.hasOuterHandles && !this.DDM.isOverTarget(pt, this) )  {
            //Roo.log('no outer handes or not over target');
                // do nothing.
        } else {
//            Roo.log('check validator');
            if (this.clickValidator(e)) {
//                Roo.log('validate success');
                // set the initial element position
                this.setStartPosition();


                this.b4MouseDown(e);
                this.onMouseDown(e);

                this.DDM.handleMouseDown(e, this);

                this.DDM.stopEvent(e);
            } else {


            }
        }
    },

    clickValidator: function(e) {
        var target = e.getTarget();
        return ( this.isValidHandleChild(target) &&
                    (this.id == this.handleElId ||
                        this.DDM.handleWasClicked(target, this.id)) );
    },

    /**
     * Allows you to specify a tag name that should not start a drag operation
     * when clicked.  This is designed to facilitate embedding links within a
     * drag handle that do something other than start the drag.
     * @method addInvalidHandleType
     * @param {string} tagName the type of element to exclude
     */
    addInvalidHandleType: function(tagName) {
        var type = tagName.toUpperCase();
        this.invalidHandleTypes[type] = type;
    },

    /**
     * Lets you to specify an element id for a child of a drag handle
     * that should not initiate a drag
     * @method addInvalidHandleId
     * @param {string} id the element id of the element you wish to ignore
     */
    addInvalidHandleId: function(id) {
        if (typeof id !== "string") {
            id = Roo.id(id);
        }
        this.invalidHandleIds[id] = id;
    },

    /**
     * Lets you specify a css class of elements that will not initiate a drag
     * @method addInvalidHandleClass
     * @param {string} cssClass the class of the elements you wish to ignore
     */
    addInvalidHandleClass: function(cssClass) {
        this.invalidHandleClasses.push(cssClass);
    },

    /**
     * Unsets an excluded tag name set by addInvalidHandleType
     * @method removeInvalidHandleType
     * @param {string} tagName the type of element to unexclude
     */
    removeInvalidHandleType: function(tagName) {
        var type = tagName.toUpperCase();
        // this.invalidHandleTypes[type] = null;
        delete this.invalidHandleTypes[type];
    },

    /**
     * Unsets an invalid handle id
     * @method removeInvalidHandleId
     * @param {string} id the id of the element to re-enable
     */
    removeInvalidHandleId: function(id) {
        if (typeof id !== "string") {
            id = Roo.id(id);
        }
        delete this.invalidHandleIds[id];
    },

    /**
     * Unsets an invalid css class
     * @method removeInvalidHandleClass
     * @param {string} cssClass the class of the element(s) you wish to
     * re-enable
     */
    removeInvalidHandleClass: function(cssClass) {
        for (var i=0, len=this.invalidHandleClasses.length; i<len; ++i) {
            if (this.invalidHandleClasses[i] == cssClass) {
                delete this.invalidHandleClasses[i];
            }
        }
    },

    /**
     * Checks the tag exclusion list to see if this click should be ignored
     * @method isValidHandleChild
     * @param {HTMLElement} node the HTMLElement to evaluate
     * @return {boolean} true if this is a valid tag type, false if not
     */
    isValidHandleChild: function(node) {

        var valid = true;
        // var n = (node.nodeName == "#text") ? node.parentNode : node;
        var nodeName;
        try {
            nodeName = node.nodeName.toUpperCase();
        } catch(e) {
            nodeName = node.nodeName;
        }
        valid = valid && !this.invalidHandleTypes[nodeName];
        valid = valid && !this.invalidHandleIds[node.id];

        for (var i=0, len=this.invalidHandleClasses.length; valid && i<len; ++i) {
            valid = !Dom.hasClass(node, this.invalidHandleClasses[i]);
        }


        return valid;

    },

    /**
     * Create the array of horizontal tick marks if an interval was specified
     * in setXConstraint().
     * @method setXTicks
     * @private
     */
    setXTicks: function(iStartX, iTickSize) {
        this.xTicks = [];
        this.xTickSize = iTickSize;

        var tickMap = {};

        for (var i = this.initPageX; i >= this.minX; i = i - iTickSize) {
            if (!tickMap[i]) {
                this.xTicks[this.xTicks.length] = i;
                tickMap[i] = true;
            }
        }

        for (i = this.initPageX; i <= this.maxX; i = i + iTickSize) {
            if (!tickMap[i]) {
                this.xTicks[this.xTicks.length] = i;
                tickMap[i] = true;
            }
        }

        this.xTicks.sort(this.DDM.numericSort) ;
    },

    /**
     * Create the array of vertical tick marks if an interval was specified in
     * setYConstraint().
     * @method setYTicks
     * @private
     */
    setYTicks: function(iStartY, iTickSize) {
        this.yTicks = [];
        this.yTickSize = iTickSize;

        var tickMap = {};

        for (var i = this.initPageY; i >= this.minY; i = i - iTickSize) {
            if (!tickMap[i]) {
                this.yTicks[this.yTicks.length] = i;
                tickMap[i] = true;
            }
        }

        for (i = this.initPageY; i <= this.maxY; i = i + iTickSize) {
            if (!tickMap[i]) {
                this.yTicks[this.yTicks.length] = i;
                tickMap[i] = true;
            }
        }

        this.yTicks.sort(this.DDM.numericSort) ;
    },

    /**
     * By default, the element can be dragged any place on the screen.  Use
     * this method to limit the horizontal travel of the element.  Pass in
     * 0,0 for the parameters if you want to lock the drag to the y axis.
     * @method setXConstraint
     * @param {int} iLeft the number of pixels the element can move to the left
     * @param {int} iRight the number of pixels the element can move to the
     * right
     * @param {int} iTickSize optional parameter for specifying that the
     * element
     * should move iTickSize pixels at a time.
     */
    setXConstraint: function(iLeft, iRight, iTickSize) {
        this.leftConstraint = iLeft;
        this.rightConstraint = iRight;

        this.minX = this.initPageX - iLeft;
        this.maxX = this.initPageX + iRight;
        if (iTickSize) { this.setXTicks(this.initPageX, iTickSize); }

        this.constrainX = true;
    },

    /**
     * Clears any constraints applied to this instance.  Also clears ticks
     * since they can't exist independent of a constraint at this time.
     * @method clearConstraints
     */
    clearConstraints: function() {
        this.constrainX = false;
        this.constrainY = false;
        this.clearTicks();
    },

    /**
     * Clears any tick interval defined for this instance
     * @method clearTicks
     */
    clearTicks: function() {
        this.xTicks = null;
        this.yTicks = null;
        this.xTickSize = 0;
        this.yTickSize = 0;
    },

    /**
     * By default, the element can be dragged any place on the screen.  Set
     * this to limit the vertical travel of the element.  Pass in 0,0 for the
     * parameters if you want to lock the drag to the x axis.
     * @method setYConstraint
     * @param {int} iUp the number of pixels the element can move up
     * @param {int} iDown the number of pixels the element can move down
     * @param {int} iTickSize optional parameter for specifying that the
     * element should move iTickSize pixels at a time.
     */
    setYConstraint: function(iUp, iDown, iTickSize) {
        this.topConstraint = iUp;
        this.bottomConstraint = iDown;

        this.minY = this.initPageY - iUp;
        this.maxY = this.initPageY + iDown;
        if (iTickSize) { this.setYTicks(this.initPageY, iTickSize); }

        this.constrainY = true;

    },

    /**
     * resetConstraints must be called if you manually reposition a dd element.
     * @method resetConstraints
     * @param {boolean} maintainOffset
     */
    resetConstraints: function() {


        // Maintain offsets if necessary
        if (this.initPageX || this.initPageX === 0) {
            // figure out how much this thing has moved
            var dx = (this.maintainOffset) ? this.lastPageX - this.initPageX : 0;
            var dy = (this.maintainOffset) ? this.lastPageY - this.initPageY : 0;

            this.setInitPosition(dx, dy);

        // This is the first time we have detected the element's position
        } else {
            this.setInitPosition();
        }

        if (this.constrainX) {
            this.setXConstraint( this.leftConstraint,
                                 this.rightConstraint,
                                 this.xTickSize        );
        }

        if (this.constrainY) {
            this.setYConstraint( this.topConstraint,
                                 this.bottomConstraint,
                                 this.yTickSize         );
        }
    },

    /**
     * Normally the drag element is moved pixel by pixel, but we can specify
     * that it move a number of pixels at a time.  This method resolves the
     * location when we have it set up like this.
     * @method getTick
     * @param {int} val where we want to place the object
     * @param {int[]} tickArray sorted array of valid points
     * @return {int} the closest tick
     * @private
     */
    getTick: function(val, tickArray) {

        if (!tickArray) {
            // If tick interval is not defined, it is effectively 1 pixel,
            // so we return the value passed to us.
            return val;
        } else if (tickArray[0] >= val) {
            // The value is lower than the first tick, so we return the first
            // tick.
            return tickArray[0];
        } else {
            for (var i=0, len=tickArray.length; i<len; ++i) {
                var next = i + 1;
                if (tickArray[next] && tickArray[next] >= val) {
                    var diff1 = val - tickArray[i];
                    var diff2 = tickArray[next] - val;
                    return (diff2 > diff1) ? tickArray[i] : tickArray[next];
                }
            }

            // The value is larger than the last tick, so we return the last
            // tick.
            return tickArray[tickArray.length - 1];
        }
    },

    /**
     * toString method
     * @method toString
     * @return {string} string representation of the dd obj
     */
    toString: function() {
        return ("DragDrop " + this.id);
    }

});

})();
/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */


/**
 * The drag and drop utility provides a framework for building drag and drop
 * applications.  In addition to enabling drag and drop for specific elements,
 * the drag and drop elements are tracked by the manager class, and the
 * interactions between the various elements are tracked during the drag and
 * the implementing code is notified about these important moments.
 */

// Only load the library once.  Rewriting the manager class would orphan
// existing drag and drop instances.
if (!Roo.dd.DragDropMgr) {

/**
 * @class Roo.dd.DragDropMgr
 * DragDropMgr is a singleton that tracks the element interaction for
 * all DragDrop items in the window.  Generally, you will not call
 * this class directly, but it does have helper methods that could
 * be useful in your DragDrop implementations.
 * @static
 */
Roo.dd.DragDropMgr = function() {

    var Event = Roo.EventManager;

    return {

        /**
         * Two dimensional Array of registered DragDrop objects.  The first
         * dimension is the DragDrop item group, the second the DragDrop
         * object.
         * @property ids
         * @type {string: string}
         * @private
         * @static
         */
        ids: {},

        /**
         * Array of element ids defined as drag handles.  Used to determine
         * if the element that generated the mousedown event is actually the
         * handle and not the html element itself.
         * @property handleIds
         * @type {string: string}
         * @private
         * @static
         */
        handleIds: {},

        /**
         * the DragDrop object that is currently being dragged
         * @property dragCurrent
         * @type DragDrop
         * @private
         * @static
         **/
        dragCurrent: null,

        /**
         * the DragDrop object(s) that are being hovered over
         * @property dragOvers
         * @type Array
         * @private
         * @static
         */
        dragOvers: {},

        /**
         * the X distance between the cursor and the object being dragged
         * @property deltaX
         * @type int
         * @private
         * @static
         */
        deltaX: 0,

        /**
         * the Y distance between the cursor and the object being dragged
         * @property deltaY
         * @type int
         * @private
         * @static
         */
        deltaY: 0,

        /**
         * Flag to determine if we should prevent the default behavior of the
         * events we define. By default this is true, but this can be set to
         * false if you need the default behavior (not recommended)
         * @property preventDefault
         * @type boolean
         * @static
         */
        preventDefault: true,

        /**
         * Flag to determine if we should stop the propagation of the events
         * we generate. This is true by default but you may want to set it to
         * false if the html element contains other features that require the
         * mouse click.
         * @property stopPropagation
         * @type boolean
         * @static
         */
        stopPropagation: true,

        /**
         * Internal flag that is set to true when drag and drop has been
         * intialized
         * @property initialized
         * @private
         * @static
         */
        initalized: false,

        /**
         * All drag and drop can be disabled.
         * @property locked
         * @private
         * @static
         */
        locked: false,

        /**
         * Called the first time an element is registered.
         * @method init
         * @private
         * @static
         */
        init: function() {
            this.initialized = true;
        },

        /**
         * In point mode, drag and drop interaction is defined by the
         * location of the cursor during the drag/drop
         * @property POINT
         * @type int
         * @static
         */
        POINT: 0,

        /**
         * In intersect mode, drag and drop interactio nis defined by the
         * overlap of two or more drag and drop objects.
         * @property INTERSECT
         * @type int
         * @static
         */
        INTERSECT: 1,

        /**
         * The current drag and drop mode.  Default: POINT
         * @property mode
         * @type int
         * @static
         */
        mode: 0,

        /**
         * Runs method on all drag and drop objects
         * @method _execOnAll
         * @private
         * @static
         */
        _execOnAll: function(sMethod, args) {
            for (var i in this.ids) {
                for (var j in this.ids[i]) {
                    var oDD = this.ids[i][j];
                    if (! this.isTypeOfDD(oDD)) {
                        continue;
                    }
                    oDD[sMethod].apply(oDD, args);
                }
            }
        },

        /**
         * Drag and drop initialization.  Sets up the global event handlers
         * @method _onLoad
         * @private
         * @static
         */
        _onLoad: function() {

            this.init();

            if (!Roo.isTouch) {
                Event.on(document, "mouseup",   this.handleMouseUp, this, true);
                Event.on(document, "mousemove", this.handleMouseMove, this, true);
            }
            Event.on(document, "touchend",   this.handleMouseUp, this, true);
            Event.on(document, "touchmove", this.handleMouseMove, this, true);
            
            Event.on(window,   "unload",    this._onUnload, this, true);
            Event.on(window,   "resize",    this._onResize, this, true);
            // Event.on(window,   "mouseout",    this._test);

        },

        /**
         * Reset constraints on all drag and drop objs
         * @method _onResize
         * @private
         * @static
         */
        _onResize: function(e) {
            this._execOnAll("resetConstraints", []);
        },

        /**
         * Lock all drag and drop functionality
         * @method lock
         * @static
         */
        lock: function() { this.locked = true; },

        /**
         * Unlock all drag and drop functionality
         * @method unlock
         * @static
         */
        unlock: function() { this.locked = false; },

        /**
         * Is drag and drop locked?
         * @method isLocked
         * @return {boolean} True if drag and drop is locked, false otherwise.
         * @static
         */
        isLocked: function() { return this.locked; },

        /**
         * Location cache that is set for all drag drop objects when a drag is
         * initiated, cleared when the drag is finished.
         * @property locationCache
         * @private
         * @static
         */
        locationCache: {},

        /**
         * Set useCache to false if you want to force object the lookup of each
         * drag and drop linked element constantly during a drag.
         * @property useCache
         * @type boolean
         * @static
         */
        useCache: true,

        /**
         * The number of pixels that the mouse needs to move after the
         * mousedown before the drag is initiated.  Default=3;
         * @property clickPixelThresh
         * @type int
         * @static
         */
        clickPixelThresh: 3,

        /**
         * The number of milliseconds after the mousedown event to initiate the
         * drag if we don't get a mouseup event. Default=1000
         * @property clickTimeThresh
         * @type int
         * @static
         */
        clickTimeThresh: 350,

        /**
         * Flag that indicates that either the drag pixel threshold or the
         * mousdown time threshold has been met
         * @property dragThreshMet
         * @type boolean
         * @private
         * @static
         */
        dragThreshMet: false,

        /**
         * Timeout used for the click time threshold
         * @property clickTimeout
         * @type Object
         * @private
         * @static
         */
        clickTimeout: null,

        /**
         * The X position of the mousedown event stored for later use when a
         * drag threshold is met.
         * @property startX
         * @type int
         * @private
         * @static
         */
        startX: 0,

        /**
         * The Y position of the mousedown event stored for later use when a
         * drag threshold is met.
         * @property startY
         * @type int
         * @private
         * @static
         */
        startY: 0,

        /**
         * Each DragDrop instance must be registered with the DragDropMgr.
         * This is executed in DragDrop.init()
         * @method regDragDrop
         * @param {DragDrop} oDD the DragDrop object to register
         * @param {String} sGroup the name of the group this element belongs to
         * @static
         */
        regDragDrop: function(oDD, sGroup) {
            if (!this.initialized) { this.init(); }

            if (!this.ids[sGroup]) {
                this.ids[sGroup] = {};
            }
            this.ids[sGroup][oDD.id] = oDD;
        },

        /**
         * Removes the supplied dd instance from the supplied group. Executed
         * by DragDrop.removeFromGroup, so don't call this function directly.
         * @method removeDDFromGroup
         * @private
         * @static
         */
        removeDDFromGroup: function(oDD, sGroup) {
            if (!this.ids[sGroup]) {
                this.ids[sGroup] = {};
            }

            var obj = this.ids[sGroup];
            if (obj && obj[oDD.id]) {
                delete obj[oDD.id];
            }
        },

        /**
         * Unregisters a drag and drop item.  This is executed in
         * DragDrop.unreg, use that method instead of calling this directly.
         * @method _remove
         * @private
         * @static
         */
        _remove: function(oDD) {
            for (var g in oDD.groups) {
                if (g && this.ids[g][oDD.id]) {
                    delete this.ids[g][oDD.id];
                }
            }
            delete this.handleIds[oDD.id];
        },

        /**
         * Each DragDrop handle element must be registered.  This is done
         * automatically when executing DragDrop.setHandleElId()
         * @method regHandle
         * @param {String} sDDId the DragDrop id this element is a handle for
         * @param {String} sHandleId the id of the element that is the drag
         * handle
         * @static
         */
        regHandle: function(sDDId, sHandleId) {
            if (!this.handleIds[sDDId]) {
                this.handleIds[sDDId] = {};
            }
            this.handleIds[sDDId][sHandleId] = sHandleId;
        },

        /**
         * Utility function to determine if a given element has been
         * registered as a drag drop item.
         * @method isDragDrop
         * @param {String} id the element id to check
         * @return {boolean} true if this element is a DragDrop item,
         * false otherwise
         * @static
         */
        isDragDrop: function(id) {
            return ( this.getDDById(id) ) ? true : false;
        },

        /**
         * Returns the drag and drop instances that are in all groups the
         * passed in instance belongs to.
         * @method getRelated
         * @param {DragDrop} p_oDD the obj to get related data for
         * @param {boolean} bTargetsOnly if true, only return targetable objs
         * @return {DragDrop[]} the related instances
         * @static
         */
        getRelated: function(p_oDD, bTargetsOnly) {
            var oDDs = [];
            for (var i in p_oDD.groups) {
                for (j in this.ids[i]) {
                    var dd = this.ids[i][j];
                    if (! this.isTypeOfDD(dd)) {
                        continue;
                    }
                    if (!bTargetsOnly || dd.isTarget) {
                        oDDs[oDDs.length] = dd;
                    }
                }
            }

            return oDDs;
        },

        /**
         * Returns true if the specified dd target is a legal target for
         * the specifice drag obj
         * @method isLegalTarget
         * @param {DragDrop} the drag obj
         * @param {DragDrop} the target
         * @return {boolean} true if the target is a legal target for the
         * dd obj
         * @static
         */
        isLegalTarget: function (oDD, oTargetDD) {
            var targets = this.getRelated(oDD, true);
            for (var i=0, len=targets.length;i<len;++i) {
                if (targets[i].id == oTargetDD.id) {
                    return true;
                }
            }

            return false;
        },

        /**
         * My goal is to be able to transparently determine if an object is
         * typeof DragDrop, and the exact subclass of DragDrop.  typeof
         * returns "object", oDD.constructor.toString() always returns
         * "DragDrop" and not the name of the subclass.  So for now it just
         * evaluates a well-known variable in DragDrop.
         * @method isTypeOfDD
         * @param {Object} the object to evaluate
         * @return {boolean} true if typeof oDD = DragDrop
         * @static
         */
        isTypeOfDD: function (oDD) {
            return (oDD && oDD.__ygDragDrop);
        },

        /**
         * Utility function to determine if a given element has been
         * registered as a drag drop handle for the given Drag Drop object.
         * @method isHandle
         * @param {String} id the element id to check
         * @return {boolean} true if this element is a DragDrop handle, false
         * otherwise
         * @static
         */
        isHandle: function(sDDId, sHandleId) {
            return ( this.handleIds[sDDId] &&
                            this.handleIds[sDDId][sHandleId] );
        },

        /**
         * Returns the DragDrop instance for a given id
         * @method getDDById
         * @param {String} id the id of the DragDrop object
         * @return {DragDrop} the drag drop object, null if it is not found
         * @static
         */
        getDDById: function(id) {
            for (var i in this.ids) {
                if (this.ids[i][id]) {
                    return this.ids[i][id];
                }
            }
            return null;
        },

        /**
         * Fired after a registered DragDrop object gets the mousedown event.
         * Sets up the events required to track the object being dragged
         * @method handleMouseDown
         * @param {Event} e the event
         * @param oDD the DragDrop object being dragged
         * @private
         * @static
         */
        handleMouseDown: function(e, oDD) {
            if(Roo.QuickTips){
                Roo.QuickTips.disable();
            }
            this.currentTarget = e.getTarget();

            this.dragCurrent = oDD;

            var el = oDD.getEl();

            // track start position
            this.startX = e.getPageX();
            this.startY = e.getPageY();

            this.deltaX = this.startX - el.offsetLeft;
            this.deltaY = this.startY - el.offsetTop;

            this.dragThreshMet = false;

            this.clickTimeout = setTimeout(
                    function() {
                        var DDM = Roo.dd.DDM;
                        DDM.startDrag(DDM.startX, DDM.startY);
                    },
                    this.clickTimeThresh );
        },

        /**
         * Fired when either the drag pixel threshol or the mousedown hold
         * time threshold has been met.
         * @method startDrag
         * @param x {int} the X position of the original mousedown
         * @param y {int} the Y position of the original mousedown
         * @static
         */
        startDrag: function(x, y) {
            clearTimeout(this.clickTimeout);
            if (this.dragCurrent) {
                this.dragCurrent.b4StartDrag(x, y);
                this.dragCurrent.startDrag(x, y);
            }
            this.dragThreshMet = true;
        },

        /**
         * Internal function to handle the mouseup event.  Will be invoked
         * from the context of the document.
         * @method handleMouseUp
         * @param {Event} e the event
         * @private
         * @static
         */
        handleMouseUp: function(e) {

            if(Roo.QuickTips){
                Roo.QuickTips.enable();
            }
            if (! this.dragCurrent) {
                return;
            }

            clearTimeout(this.clickTimeout);

            if (this.dragThreshMet) {
                this.fireEvents(e, true);
            } else {
            }

            this.stopDrag(e);

            this.stopEvent(e);
        },

        /**
         * Utility to stop event propagation and event default, if these
         * features are turned on.
         * @method stopEvent
         * @param {Event} e the event as returned by this.getEvent()
         * @static
         */
        stopEvent: function(e){
            if(this.stopPropagation) {
                e.stopPropagation();
            }

            if (this.preventDefault) {
                e.preventDefault();
            }
        },

        /**
         * Internal function to clean up event handlers after the drag
         * operation is complete
         * @method stopDrag
         * @param {Event} e the event
         * @private
         * @static
         */
        stopDrag: function(e) {
            // Fire the drag end event for the item that was dragged
            if (this.dragCurrent) {
                if (this.dragThreshMet) {
                    this.dragCurrent.b4EndDrag(e);
                    this.dragCurrent.endDrag(e);
                }

                this.dragCurrent.onMouseUp(e);
            }

            this.dragCurrent = null;
            this.dragOvers = {};
        },

        /**
         * Internal function to handle the mousemove event.  Will be invoked
         * from the context of the html element.
         *
         * @TODO figure out what we can do about mouse events lost when the
         * user drags objects beyond the window boundary.  Currently we can
         * detect this in internet explorer by verifying that the mouse is
         * down during the mousemove event.  Firefox doesn't give us the
         * button state on the mousemove event.
         * @method handleMouseMove
         * @param {Event} e the event
         * @private
         * @static
         */
        handleMouseMove: function(e) {
            if (! this.dragCurrent) {
                return true;
            }

            // var button = e.which || e.button;

            // check for IE mouseup outside of page boundary
            if (Roo.isIE && (e.button !== 0 && e.button !== 1 && e.button !== 2)) {
                this.stopEvent(e);
                return this.handleMouseUp(e);
            }

            if (!this.dragThreshMet) {
                var diffX = Math.abs(this.startX - e.getPageX());
                var diffY = Math.abs(this.startY - e.getPageY());
                if (diffX > this.clickPixelThresh ||
                            diffY > this.clickPixelThresh) {
                    this.startDrag(this.startX, this.startY);
                }
            }

            if (this.dragThreshMet) {
                this.dragCurrent.b4Drag(e);
                this.dragCurrent.onDrag(e);
                if(!this.dragCurrent.moveOnly){
                    this.fireEvents(e, false);
                }
            }

            this.stopEvent(e);

            return true;
        },

        /**
         * Iterates over all of the DragDrop elements to find ones we are
         * hovering over or dropping on
         * @method fireEvents
         * @param {Event} e the event
         * @param {boolean} isDrop is this a drop op or a mouseover op?
         * @private
         * @static
         */
        fireEvents: function(e, isDrop) {
            var dc = this.dragCurrent;

            // If the user did the mouse up outside of the window, we could
            // get here even though we have ended the drag.
            if (!dc || dc.isLocked()) {
                return;
            }

            var pt = e.getPoint();

            // cache the previous dragOver array
            var oldOvers = [];

            var outEvts   = [];
            var overEvts  = [];
            var dropEvts  = [];
            var enterEvts = [];

            // Check to see if the object(s) we were hovering over is no longer
            // being hovered over so we can fire the onDragOut event
            for (var i in this.dragOvers) {

                var ddo = this.dragOvers[i];

                if (! this.isTypeOfDD(ddo)) {
                    continue;
                }

                if (! this.isOverTarget(pt, ddo, this.mode)) {
                    outEvts.push( ddo );
                }

                oldOvers[i] = true;
                delete this.dragOvers[i];
            }

            for (var sGroup in dc.groups) {

                if ("string" != typeof sGroup) {
                    continue;
                }

                for (i in this.ids[sGroup]) {
                    var oDD = this.ids[sGroup][i];
                    if (! this.isTypeOfDD(oDD)) {
                        continue;
                    }

                    if (oDD.isTarget && !oDD.isLocked() && oDD != dc) {
                        if (this.isOverTarget(pt, oDD, this.mode)) {
                            // look for drop interactions
                            if (isDrop) {
                                dropEvts.push( oDD );
                            // look for drag enter and drag over interactions
                            } else {

                                // initial drag over: dragEnter fires
                                if (!oldOvers[oDD.id]) {
                                    enterEvts.push( oDD );
                                // subsequent drag overs: dragOver fires
                                } else {
                                    overEvts.push( oDD );
                                }

                                this.dragOvers[oDD.id] = oDD;
                            }
                        }
                    }
                }
            }

            if (this.mode) {
                if (outEvts.length) {
                    dc.b4DragOut(e, outEvts);
                    dc.onDragOut(e, outEvts);
                }

                if (enterEvts.length) {
                    dc.onDragEnter(e, enterEvts);
                }

                if (overEvts.length) {
                    dc.b4DragOver(e, overEvts);
                    dc.onDragOver(e, overEvts);
                }

                if (dropEvts.length) {
                    dc.b4DragDrop(e, dropEvts);
                    dc.onDragDrop(e, dropEvts);
                }

            } else {
                // fire dragout events
                var len = 0;
                for (i=0, len=outEvts.length; i<len; ++i) {
                    dc.b4DragOut(e, outEvts[i].id);
                    dc.onDragOut(e, outEvts[i].id);
                }

                // fire enter events
                for (i=0,len=enterEvts.length; i<len; ++i) {
                    // dc.b4DragEnter(e, oDD.id);
                    dc.onDragEnter(e, enterEvts[i].id);
                }

                // fire over events
                for (i=0,len=overEvts.length; i<len; ++i) {
                    dc.b4DragOver(e, overEvts[i].id);
                    dc.onDragOver(e, overEvts[i].id);
                }

                // fire drop events
                for (i=0, len=dropEvts.length; i<len; ++i) {
                    dc.b4DragDrop(e, dropEvts[i].id);
                    dc.onDragDrop(e, dropEvts[i].id);
                }

            }

            // notify about a drop that did not find a target
            if (isDrop && !dropEvts.length) {
                dc.onInvalidDrop(e);
            }

        },

        /**
         * Helper function for getting the best match from the list of drag
         * and drop objects returned by the drag and drop events when we are
         * in INTERSECT mode.  It returns either the first object that the
         * cursor is over, or the object that has the greatest overlap with
         * the dragged element.
         * @method getBestMatch
         * @param  {DragDrop[]} dds The array of drag and drop objects
         * targeted
         * @return {DragDrop}       The best single match
         * @static
         */
        getBestMatch: function(dds) {
            var winner = null;
            // Return null if the input is not what we expect
            //if (!dds || !dds.length || dds.length == 0) {
               // winner = null;
            // If there is only one item, it wins
            //} else if (dds.length == 1) {

            var len = dds.length;

            if (len == 1) {
                winner = dds[0];
            } else {
                // Loop through the targeted items
                for (var i=0; i<len; ++i) {
                    var dd = dds[i];
                    // If the cursor is over the object, it wins.  If the
                    // cursor is over multiple matches, the first one we come
                    // to wins.
                    if (dd.cursorIsOver) {
                        winner = dd;
                        break;
                    // Otherwise the object with the most overlap wins
                    } else {
                        if (!winner ||
                            winner.overlap.getArea() < dd.overlap.getArea()) {
                            winner = dd;
                        }
                    }
                }
            }

            return winner;
        },

        /**
         * Refreshes the cache of the top-left and bottom-right points of the
         * drag and drop objects in the specified group(s).  This is in the
         * format that is stored in the drag and drop instance, so typical
         * usage is:
         * <code>
         * Roo.dd.DragDropMgr.refreshCache(ddinstance.groups);
         * </code>
         * Alternatively:
         * <code>
         * Roo.dd.DragDropMgr.refreshCache({group1:true, group2:true});
         * </code>
         * @TODO this really should be an indexed array.  Alternatively this
         * method could accept both.
         * @method refreshCache
         * @param {Object} groups an associative array of groups to refresh
         * @static
         */
        refreshCache: function(groups) {
            for (var sGroup in groups) {
                if ("string" != typeof sGroup) {
                    continue;
                }
                for (var i in this.ids[sGroup]) {
                    var oDD = this.ids[sGroup][i];

                    if (this.isTypeOfDD(oDD)) {
                    // if (this.isTypeOfDD(oDD) && oDD.isTarget) {
                        var loc = this.getLocation(oDD);
                        if (loc) {
                            this.locationCache[oDD.id] = loc;
                        } else {
                            delete this.locationCache[oDD.id];
                            // this will unregister the drag and drop object if
                            // the element is not in a usable state
                            // oDD.unreg();
                        }
                    }
                }
            }
        },

        /**
         * This checks to make sure an element exists and is in the DOM.  The
         * main purpose is to handle cases where innerHTML is used to remove
         * drag and drop objects from the DOM.  IE provides an 'unspecified
         * error' when trying to access the offsetParent of such an element
         * @method verifyEl
         * @param {HTMLElement} el the element to check
         * @return {boolean} true if the element looks usable
         * @static
         */
        verifyEl: function(el) {
            if (el) {
                var parent;
                if(Roo.isIE){
                    try{
                        parent = el.offsetParent;
                    }catch(e){}
                }else{
                    parent = el.offsetParent;
                }
                if (parent) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Returns a Region object containing the drag and drop element's position
         * and size, including the padding configured for it
         * @method getLocation
         * @param {DragDrop} oDD the drag and drop object to get the
         *                       location for
         * @return {Roo.lib.Region} a Region object representing the total area
         *                             the element occupies, including any padding
         *                             the instance is configured for.
         * @static
         */
        getLocation: function(oDD) {
            if (! this.isTypeOfDD(oDD)) {
                return null;
            }

            var el = oDD.getEl(), pos, x1, x2, y1, y2, t, r, b, l;

            try {
                pos= Roo.lib.Dom.getXY(el);
            } catch (e) { }

            if (!pos) {
                return null;
            }

            x1 = pos[0];
            x2 = x1 + el.offsetWidth;
            y1 = pos[1];
            y2 = y1 + el.offsetHeight;

            t = y1 - oDD.padding[0];
            r = x2 + oDD.padding[1];
            b = y2 + oDD.padding[2];
            l = x1 - oDD.padding[3];

            return new Roo.lib.Region( t, r, b, l );
        },

        /**
         * Checks the cursor location to see if it over the target
         * @method isOverTarget
         * @param {Roo.lib.Point} pt The point to evaluate
         * @param {DragDrop} oTarget the DragDrop object we are inspecting
         * @return {boolean} true if the mouse is over the target
         * @private
         * @static
         */
        isOverTarget: function(pt, oTarget, intersect) {
            // use cache if available
            var loc = this.locationCache[oTarget.id];
            if (!loc || !this.useCache) {
                loc = this.getLocation(oTarget);
                this.locationCache[oTarget.id] = loc;

            }

            if (!loc) {
                return false;
            }

            oTarget.cursorIsOver = loc.contains( pt );

            // DragDrop is using this as a sanity check for the initial mousedown
            // in this case we are done.  In POINT mode, if the drag obj has no
            // contraints, we are also done. Otherwise we need to evaluate the
            // location of the target as related to the actual location of the
            // dragged element.
            var dc = this.dragCurrent;
            if (!dc || !dc.getTargetCoord ||
                    (!intersect && !dc.constrainX && !dc.constrainY)) {
                return oTarget.cursorIsOver;
            }

            oTarget.overlap = null;

            // Get the current location of the drag element, this is the
            // location of the mouse event less the delta that represents
            // where the original mousedown happened on the element.  We
            // need to consider constraints and ticks as well.
            var pos = dc.getTargetCoord(pt.x, pt.y);

            var el = dc.getDragEl();
            var curRegion = new Roo.lib.Region( pos.y,
                                                   pos.x + el.offsetWidth,
                                                   pos.y + el.offsetHeight,
                                                   pos.x );

            var overlap = curRegion.intersect(loc);

            if (overlap) {
                oTarget.overlap = overlap;
                return (intersect) ? true : oTarget.cursorIsOver;
            } else {
                return false;
            }
        },

        /**
         * unload event handler
         * @method _onUnload
         * @private
         * @static
         */
        _onUnload: function(e, me) {
            Roo.dd.DragDropMgr.unregAll();
        },

        /**
         * Cleans up the drag and drop events and objects.
         * @method unregAll
         * @private
         * @static
         */
        unregAll: function() {

            if (this.dragCurrent) {
                this.stopDrag();
                this.dragCurrent = null;
            }

            this._execOnAll("unreg", []);

            for (i in this.elementCache) {
                delete this.elementCache[i];
            }

            this.elementCache = {};
            this.ids = {};
        },

        /**
         * A cache of DOM elements
         * @property elementCache
         * @private
         * @static
         */
        elementCache: {},

        /**
         * Get the wrapper for the DOM element specified
         * @method getElWrapper
         * @param {String} id the id of the element to get
         * @return {Roo.dd.DDM.ElementWrapper} the wrapped element
         * @private
         * @deprecated This wrapper isn't that useful
         * @static
         */
        getElWrapper: function(id) {
            var oWrapper = this.elementCache[id];
            if (!oWrapper || !oWrapper.el) {
                oWrapper = this.elementCache[id] =
                    new this.ElementWrapper(Roo.getDom(id));
            }
            return oWrapper;
        },

        /**
         * Returns the actual DOM element
         * @method getElement
         * @param {String} id the id of the elment to get
         * @return {Object} The element
         * @deprecated use Roo.getDom instead
         * @static
         */
        getElement: function(id) {
            return Roo.getDom(id);
        },

        /**
         * Returns the style property for the DOM element (i.e.,
         * document.getElById(id).style)
         * @method getCss
         * @param {String} id the id of the elment to get
         * @return {Object} The style property of the element
         * @deprecated use Roo.getDom instead
         * @static
         */
        getCss: function(id) {
            var el = Roo.getDom(id);
            return (el) ? el.style : null;
        },

        /**
         * Inner class for cached elements
         * @class DragDropMgr.ElementWrapper
         * @for DragDropMgr
         * @private
         * @deprecated
         */
        ElementWrapper: function(el) {
                /**
                 * The element
                 * @property el
                 */
                this.el = el || null;
                /**
                 * The element id
                 * @property id
                 */
                this.id = this.el && el.id;
                /**
                 * A reference to the style property
                 * @property css
                 */
                this.css = this.el && el.style;
            },

        /**
         * Returns the X position of an html element
         * @method getPosX
         * @param el the element for which to get the position
         * @return {int} the X coordinate
         * @for DragDropMgr
         * @deprecated use Roo.lib.Dom.getX instead
         * @static
         */
        getPosX: function(el) {
            return Roo.lib.Dom.getX(el);
        },

        /**
         * Returns the Y position of an html element
         * @method getPosY
         * @param el the element for which to get the position
         * @return {int} the Y coordinate
         * @deprecated use Roo.lib.Dom.getY instead
         * @static
         */
        getPosY: function(el) {
            return Roo.lib.Dom.getY(el);
        },

        /**
         * Swap two nodes.  In IE, we use the native method, for others we
         * emulate the IE behavior
         * @method swapNode
         * @param n1 the first node to swap
         * @param n2 the other node to swap
         * @static
         */
        swapNode: function(n1, n2) {
            if (n1.swapNode) {
                n1.swapNode(n2);
            } else {
                var p = n2.parentNode;
                var s = n2.nextSibling;

                if (s == n1) {
                    p.insertBefore(n1, n2);
                } else if (n2 == n1.nextSibling) {
                    p.insertBefore(n2, n1);
                } else {
                    n1.parentNode.replaceChild(n2, n1);
                    p.insertBefore(n1, s);
                }
            }
        },

        /**
         * Returns the current scroll position
         * @method getScroll
         * @private
         * @static
         */
        getScroll: function () {
            var t, l, dde=document.documentElement, db=document.body;
            if (dde && (dde.scrollTop || dde.scrollLeft)) {
                t = dde.scrollTop;
                l = dde.scrollLeft;
            } else if (db) {
                t = db.scrollTop;
                l = db.scrollLeft;
            } else {

            }
            return { top: t, left: l };
        },

        /**
         * Returns the specified element style property
         * @method getStyle
         * @param {HTMLElement} el          the element
         * @param {string}      styleProp   the style property
         * @return {string} The value of the style property
         * @deprecated use Roo.lib.Dom.getStyle
         * @static
         */
        getStyle: function(el, styleProp) {
            return Roo.fly(el).getStyle(styleProp);
        },

        /**
         * Gets the scrollTop
         * @method getScrollTop
         * @return {int} the document's scrollTop
         * @static
         */
        getScrollTop: function () { return this.getScroll().top; },

        /**
         * Gets the scrollLeft
         * @method getScrollLeft
         * @return {int} the document's scrollTop
         * @static
         */
        getScrollLeft: function () { return this.getScroll().left; },

        /**
         * Sets the x/y position of an element to the location of the
         * target element.
         * @method moveToEl
         * @param {HTMLElement} moveEl      The element to move
         * @param {HTMLElement} targetEl    The position reference element
         * @static
         */
        moveToEl: function (moveEl, targetEl) {
            var aCoord = Roo.lib.Dom.getXY(targetEl);
            Roo.lib.Dom.setXY(moveEl, aCoord);
        },

        /**
         * Numeric array sort function
         * @method numericSort
         * @static
         */
        numericSort: function(a, b) { return (a - b); },

        /**
         * Internal counter
         * @property _timeoutCount
         * @private
         * @static
         */
        _timeoutCount: 0,

        /**
         * Trying to make the load order less important.  Without this we get
         * an error if this file is loaded before the Event Utility.
         * @method _addListeners
         * @private
         * @static
         */
        _addListeners: function() {
            var DDM = Roo.dd.DDM;
            if ( Roo.lib.Event && document ) {
                DDM._onLoad();
            } else {
                if (DDM._timeoutCount > 2000) {
                } else {
                    setTimeout(DDM._addListeners, 10);
                    if (document && document.body) {
                        DDM._timeoutCount += 1;
                    }
                }
            }
        },

        /**
         * Recursively searches the immediate parent and all child nodes for
         * the handle element in order to determine wheter or not it was
         * clicked.
         * @method handleWasClicked
         * @param node the html element to inspect
         * @static
         */
        handleWasClicked: function(node, id) {
            if (this.isHandle(id, node.id)) {
                return true;
            } else {
                // check to see if this is a text node child of the one we want
                var p = node.parentNode;

                while (p) {
                    if (this.isHandle(id, p.id)) {
                        return true;
                    } else {
                        p = p.parentNode;
                    }
                }
            }

            return false;
        }

    };

}();

// shorter alias, save a few bytes
Roo.dd.DDM = Roo.dd.DragDropMgr;
Roo.dd.DDM._addListeners();

}/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

/**
 * @class Roo.dd.DD
 * A DragDrop implementation where the linked element follows the
 * mouse cursor during a drag.
 * @extends Roo.dd.DragDrop
 * @constructor
 * @param {String} id the id of the linked element
 * @param {String} sGroup the group of related DragDrop items
 * @param {object} config an object containing configurable attributes
 *                Valid properties for DD:
 *                    scroll
 */
Roo.dd.DD = function(id, sGroup, config) {
    if (id) {
        this.init(id, sGroup, config);
    }
};

Roo.extend(Roo.dd.DD, Roo.dd.DragDrop, {

    /**
     * When set to true, the utility automatically tries to scroll the browser
     * window wehn a drag and drop element is dragged near the viewport boundary.
     * Defaults to true.
     * @property scroll
     * @type boolean
     */
    scroll: true,

    /**
     * Sets the pointer offset to the distance between the linked element's top
     * left corner and the location the element was clicked
     * @method autoOffset
     * @param {int} iPageX the X coordinate of the click
     * @param {int} iPageY the Y coordinate of the click
     */
    autoOffset: function(iPageX, iPageY) {
        var x = iPageX - this.startPageX;
        var y = iPageY - this.startPageY;
        this.setDelta(x, y);
    },

    /**
     * Sets the pointer offset.  You can call this directly to force the
     * offset to be in a particular location (e.g., pass in 0,0 to set it
     * to the center of the object)
     * @method setDelta
     * @param {int} iDeltaX the distance from the left
     * @param {int} iDeltaY the distance from the top
     */
    setDelta: function(iDeltaX, iDeltaY) {
        this.deltaX = iDeltaX;
        this.deltaY = iDeltaY;
    },

    /**
     * Sets the drag element to the location of the mousedown or click event,
     * maintaining the cursor location relative to the location on the element
     * that was clicked.  Override this if you want to place the element in a
     * location other than where the cursor is.
     * @method setDragElPos
     * @param {int} iPageX the X coordinate of the mousedown or drag event
     * @param {int} iPageY the Y coordinate of the mousedown or drag event
     */
    setDragElPos: function(iPageX, iPageY) {
        // the first time we do this, we are going to check to make sure
        // the element has css positioning

        var el = this.getDragEl();
        this.alignElWithMouse(el, iPageX, iPageY);
    },

    /**
     * Sets the element to the location of the mousedown or click event,
     * maintaining the cursor location relative to the location on the element
     * that was clicked.  Override this if you want to place the element in a
     * location other than where the cursor is.
     * @method alignElWithMouse
     * @param {HTMLElement} el the element to move
     * @param {int} iPageX the X coordinate of the mousedown or drag event
     * @param {int} iPageY the Y coordinate of the mousedown or drag event
     */
    alignElWithMouse: function(el, iPageX, iPageY) {
        var oCoord = this.getTargetCoord(iPageX, iPageY);
        var fly = el.dom ? el : Roo.fly(el);
        if (!this.deltaSetXY) {
            var aCoord = [oCoord.x, oCoord.y];
            fly.setXY(aCoord);
            var newLeft = fly.getLeft(true);
            var newTop  = fly.getTop(true);
            this.deltaSetXY = [ newLeft - oCoord.x, newTop - oCoord.y ];
        } else {
            fly.setLeftTop(oCoord.x + this.deltaSetXY[0], oCoord.y + this.deltaSetXY[1]);
        }

        this.cachePosition(oCoord.x, oCoord.y);
        this.autoScroll(oCoord.x, oCoord.y, el.offsetHeight, el.offsetWidth);
        return oCoord;
    },

    /**
     * Saves the most recent position so that we can reset the constraints and
     * tick marks on-demand.  We need to know this so that we can calculate the
     * number of pixels the element is offset from its original position.
     * @method cachePosition
     * @param iPageX the current x position (optional, this just makes it so we
     * don't have to look it up again)
     * @param iPageY the current y position (optional, this just makes it so we
     * don't have to look it up again)
     */
    cachePosition: function(iPageX, iPageY) {
        if (iPageX) {
            this.lastPageX = iPageX;
            this.lastPageY = iPageY;
        } else {
            var aCoord = Roo.lib.Dom.getXY(this.getEl());
            this.lastPageX = aCoord[0];
            this.lastPageY = aCoord[1];
        }
    },

    /**
     * Auto-scroll the window if the dragged object has been moved beyond the
     * visible window boundary.
     * @method autoScroll
     * @param {int} x the drag element's x position
     * @param {int} y the drag element's y position
     * @param {int} h the height of the drag element
     * @param {int} w the width of the drag element
     * @private
     */
    autoScroll: function(x, y, h, w) {

        if (this.scroll) {
            // The client height
            var clientH = Roo.lib.Dom.getViewWidth();

            // The client width
            var clientW = Roo.lib.Dom.getViewHeight();

            // The amt scrolled down
            var st = this.DDM.getScrollTop();

            // The amt scrolled right
            var sl = this.DDM.getScrollLeft();

            // Location of the bottom of the element
            var bot = h + y;

            // Location of the right of the element
            var right = w + x;

            // The distance from the cursor to the bottom of the visible area,
            // adjusted so that we don't scroll if the cursor is beyond the
            // element drag constraints
            var toBot = (clientH + st - y - this.deltaY);

            // The distance from the cursor to the right of the visible area
            var toRight = (clientW + sl - x - this.deltaX);


            // How close to the edge the cursor must be before we scroll
            // var thresh = (document.all) ? 100 : 40;
            var thresh = 40;

            // How many pixels to scroll per autoscroll op.  This helps to reduce
            // clunky scrolling. IE is more sensitive about this ... it needs this
            // value to be higher.
            var scrAmt = (document.all) ? 80 : 30;

            // Scroll down if we are near the bottom of the visible page and the
            // obj extends below the crease
            if ( bot > clientH && toBot < thresh ) {
                window.scrollTo(sl, st + scrAmt);
            }

            // Scroll up if the window is scrolled down and the top of the object
            // goes above the top border
            if ( y < st && st > 0 && y - st < thresh ) {
                window.scrollTo(sl, st - scrAmt);
            }

            // Scroll right if the obj is beyond the right border and the cursor is
            // near the border.
            if ( right > clientW && toRight < thresh ) {
                window.scrollTo(sl + scrAmt, st);
            }

            // Scroll left if the window has been scrolled to the right and the obj
            // extends past the left border
            if ( x < sl && sl > 0 && x - sl < thresh ) {
                window.scrollTo(sl - scrAmt, st);
            }
        }
    },

    /**
     * Finds the location the element should be placed if we want to move
     * it to where the mouse location less the click offset would place us.
     * @method getTargetCoord
     * @param {int} iPageX the X coordinate of the click
     * @param {int} iPageY the Y coordinate of the click
     * @return an object that contains the coordinates (Object.x and Object.y)
     * @private
     */
    getTargetCoord: function(iPageX, iPageY) {


        var x = iPageX - this.deltaX;
        var y = iPageY - this.deltaY;

        if (this.constrainX) {
            if (x < this.minX) { x = this.minX; }
            if (x > this.maxX) { x = this.maxX; }
        }

        if (this.constrainY) {
            if (y < this.minY) { y = this.minY; }
            if (y > this.maxY) { y = this.maxY; }
        }

        x = this.getTick(x, this.xTicks);
        y = this.getTick(y, this.yTicks);


        return {x:x, y:y};
    },

    /*
     * Sets up config options specific to this class. Overrides
     * Roo.dd.DragDrop, but all versions of this method through the
     * inheritance chain are called
     */
    applyConfig: function() {
        Roo.dd.DD.superclass.applyConfig.call(this);
        this.scroll = (this.config.scroll !== false);
    },

    /*
     * Event that fires prior to the onMouseDown event.  Overrides
     * Roo.dd.DragDrop.
     */
    b4MouseDown: function(e) {
        // this.resetConstraints();
        this.autoOffset(e.getPageX(),
                            e.getPageY());
    },

    /*
     * Event that fires prior to the onDrag event.  Overrides
     * Roo.dd.DragDrop.
     */
    b4Drag: function(e) {
        this.setDragElPos(e.getPageX(),
                            e.getPageY());
    },

    toString: function() {
        return ("DD " + this.id);
    }

    //////////////////////////////////////////////////////////////////////////
    // Debugging ygDragDrop events that can be overridden
    //////////////////////////////////////////////////////////////////////////
    /*
    startDrag: function(x, y) {
    },

    onDrag: function(e) {
    },

    onDragEnter: function(e, id) {
    },

    onDragOver: function(e, id) {
    },

    onDragOut: function(e, id) {
    },

    onDragDrop: function(e, id) {
    },

    endDrag: function(e) {
    }

    */

});/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

/**
 * @class Roo.dd.DDProxy
 * A DragDrop implementation that inserts an empty, bordered div into
 * the document that follows the cursor during drag operations.  At the time of
 * the click, the frame div is resized to the dimensions of the linked html
 * element, and moved to the exact location of the linked element.
 *
 * References to the "frame" element refer to the single proxy element that
 * was created to be dragged in place of all DDProxy elements on the
 * page.
 *
 * @extends Roo.dd.DD
 * @constructor
 * @param {String} id the id of the linked html element
 * @param {String} sGroup the group of related DragDrop objects
 * @param {object} config an object containing configurable attributes
 *                Valid properties for DDProxy in addition to those in DragDrop:
 *                   resizeFrame, centerFrame, dragElId
 */
Roo.dd.DDProxy = function(id, sGroup, config) {
    if (id) {
        this.init(id, sGroup, config);
        this.initFrame();
    }
};

/**
 * The default drag frame div id
 * @property Roo.dd.DDProxy.dragElId
 * @type String
 * @static
 */
Roo.dd.DDProxy.dragElId = "ygddfdiv";

Roo.extend(Roo.dd.DDProxy, Roo.dd.DD, {

    /**
     * By default we resize the drag frame to be the same size as the element
     * we want to drag (this is to get the frame effect).  We can turn it off
     * if we want a different behavior.
     * @property resizeFrame
     * @type boolean
     */
    resizeFrame: true,

    /**
     * By default the frame is positioned exactly where the drag element is, so
     * we use the cursor offset provided by Roo.dd.DD.  Another option that works only if
     * you do not have constraints on the obj is to have the drag frame centered
     * around the cursor.  Set centerFrame to true for this effect.
     * @property centerFrame
     * @type boolean
     */
    centerFrame: false,

    /**
     * Creates the proxy element if it does not yet exist
     * @method createFrame
     */
    createFrame: function() {
        var self = this;
        var body = document.body;

        if (!body || !body.firstChild) {
            setTimeout( function() { self.createFrame(); }, 50 );
            return;
        }

        var div = this.getDragEl();

        if (!div) {
            div    = document.createElement("div");
            div.id = this.dragElId;
            var s  = div.style;

            s.position   = "absolute";
            s.visibility = "hidden";
            s.cursor     = "move";
            s.border     = "2px solid #aaa";
            s.zIndex     = 999;

            // appendChild can blow up IE if invoked prior to the window load event
            // while rendering a table.  It is possible there are other scenarios
            // that would cause this to happen as well.
            body.insertBefore(div, body.firstChild);
        }
    },

    /**
     * Initialization for the drag frame element.  Must be called in the
     * constructor of all subclasses
     * @method initFrame
     */
    initFrame: function() {
        this.createFrame();
    },

    applyConfig: function() {
        Roo.dd.DDProxy.superclass.applyConfig.call(this);

        this.resizeFrame = (this.config.resizeFrame !== false);
        this.centerFrame = (this.config.centerFrame);
        this.setDragElId(this.config.dragElId || Roo.dd.DDProxy.dragElId);
    },

    /**
     * Resizes the drag frame to the dimensions of the clicked object, positions
     * it over the object, and finally displays it
     * @method showFrame
     * @param {int} iPageX X click position
     * @param {int} iPageY Y click position
     * @private
     */
    showFrame: function(iPageX, iPageY) {
        var el = this.getEl();
        var dragEl = this.getDragEl();
        var s = dragEl.style;

        this._resizeProxy();

        if (this.centerFrame) {
            this.setDelta( Math.round(parseInt(s.width,  10)/2),
                           Math.round(parseInt(s.height, 10)/2) );
        }

        this.setDragElPos(iPageX, iPageY);

        Roo.fly(dragEl).show();
    },

    /**
     * The proxy is automatically resized to the dimensions of the linked
     * element when a drag is initiated, unless resizeFrame is set to false
     * @method _resizeProxy
     * @private
     */
    _resizeProxy: function() {
        if (this.resizeFrame) {
            var el = this.getEl();
            Roo.fly(this.getDragEl()).setSize(el.offsetWidth, el.offsetHeight);
        }
    },

    // overrides Roo.dd.DragDrop
    b4MouseDown: function(e) {
        var x = e.getPageX();
        var y = e.getPageY();
        this.autoOffset(x, y);
        this.setDragElPos(x, y);
    },

    // overrides Roo.dd.DragDrop
    b4StartDrag: function(x, y) {
        // show the drag frame
        this.showFrame(x, y);
    },

    // overrides Roo.dd.DragDrop
    b4EndDrag: function(e) {
        Roo.fly(this.getDragEl()).hide();
    },

    // overrides Roo.dd.DragDrop
    // By default we try to move the element to the last location of the frame.
    // This is so that the default behavior mirrors that of Roo.dd.DD.
    endDrag: function(e) {

        var lel = this.getEl();
        var del = this.getDragEl();

        // Show the drag frame briefly so we can get its position
        del.style.visibility = "";

        this.beforeMove();
        // Hide the linked element before the move to get around a Safari
        // rendering bug.
        lel.style.visibility = "hidden";
        Roo.dd.DDM.moveToEl(lel, del);
        del.style.visibility = "hidden";
        lel.style.visibility = "";

        this.afterDrag();
    },

    beforeMove : function(){

    },

    afterDrag : function(){

    },

    toString: function() {
        return ("DDProxy " + this.id);
    }

});
/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

 /**
 * @class Roo.dd.DDTarget
 * A DragDrop implementation that does not move, but can be a drop
 * target.  You would get the same result by simply omitting implementation
 * for the event callbacks, but this way we reduce the processing cost of the
 * event listener and the callbacks.
 * @extends Roo.dd.DragDrop
 * @constructor
 * @param {String} id the id of the element that is a drop target
 * @param {String} sGroup the group of related DragDrop objects
 * @param {object} config an object containing configurable attributes
 *                 Valid properties for DDTarget in addition to those in
 *                 DragDrop:
 *                    none
 */
Roo.dd.DDTarget = function(id, sGroup, config) {
    if (id) {
        this.initTarget(id, sGroup, config);
    }
    if (config && (config.listeners || config.events)) { 
        Roo.dd.DragDrop.superclass.constructor.call(this,  { 
            listeners : config.listeners || {}, 
            events : config.events || {} 
        });    
    }
};

// Roo.dd.DDTarget.prototype = new Roo.dd.DragDrop();
Roo.extend(Roo.dd.DDTarget, Roo.dd.DragDrop, {
    toString: function() {
        return ("DDTarget " + this.id);
    }
});
/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 

/**
 * @class Roo.dd.ScrollManager
 * Provides automatic scrolling of overflow regions in the page during drag operations.<br><br>
 * <b>Note: This class uses "Point Mode" and is untested in "Intersect Mode".</b>
 * @static
 */
Roo.dd.ScrollManager = function(){
    var ddm = Roo.dd.DragDropMgr;
    var els = {};
    var dragEl = null;
    var proc = {};
    
    
    
    var onStop = function(e){
        dragEl = null;
        clearProc();
    };
    
    var triggerRefresh = function(){
        if(ddm.dragCurrent){
             ddm.refreshCache(ddm.dragCurrent.groups);
        }
    };
    
    var doScroll = function(){
        if(ddm.dragCurrent){
            var dds = Roo.dd.ScrollManager;
            if(!dds.animate){
                if(proc.el.scroll(proc.dir, dds.increment)){
                    triggerRefresh();
                }
            }else{
                proc.el.scroll(proc.dir, dds.increment, true, dds.animDuration, triggerRefresh);
            }
        }
    };
    
    var clearProc = function(){
        if(proc.id){
            clearInterval(proc.id);
        }
        proc.id = 0;
        proc.el = null;
        proc.dir = "";
    };
    
    var startProc = function(el, dir){
         Roo.log('scroll startproc');
        clearProc();
        proc.el = el;
        proc.dir = dir;
        proc.id = setInterval(doScroll, Roo.dd.ScrollManager.frequency);
    };
    
    var onFire = function(e, isDrop){
       
        if(isDrop || !ddm.dragCurrent){ return; }
        var dds = Roo.dd.ScrollManager;
        if(!dragEl || dragEl != ddm.dragCurrent){
            dragEl = ddm.dragCurrent;
            // refresh regions on drag start
            dds.refreshCache();
        }
        
        var xy = Roo.lib.Event.getXY(e);
        var pt = new Roo.lib.Point(xy[0], xy[1]);
        for(var id in els){
            var el = els[id], r = el._region;
            if(r && r.contains(pt) && el.isScrollable()){
                if(r.bottom - pt.y <= dds.thresh){
                    if(proc.el != el){
                        startProc(el, "down");
                    }
                    return;
                }else if(r.right - pt.x <= dds.thresh){
                    if(proc.el != el){
                        startProc(el, "left");
                    }
                    return;
                }else if(pt.y - r.top <= dds.thresh){
                    if(proc.el != el){
                        startProc(el, "up");
                    }
                    return;
                }else if(pt.x - r.left <= dds.thresh){
                    if(proc.el != el){
                        startProc(el, "right");
                    }
                    return;
                }
            }
        }
        clearProc();
    };
    
    ddm.fireEvents = ddm.fireEvents.createSequence(onFire, ddm);
    ddm.stopDrag = ddm.stopDrag.createSequence(onStop, ddm);
    
    return {
        /**
         * Registers new overflow element(s) to auto scroll
         * @param {String/HTMLElement/Element/Array} el The id of or the element to be scrolled or an array of either
         */
        register : function(el){
            if(el instanceof Array){
                for(var i = 0, len = el.length; i < len; i++) {
                	this.register(el[i]);
                }
            }else{
                el = Roo.get(el);
                els[el.id] = el;
            }
            Roo.dd.ScrollManager.els = els;
        },
        
        /**
         * Unregisters overflow element(s) so they are no longer scrolled
         * @param {String/HTMLElement/Element/Array} el The id of or the element to be removed or an array of either
         */
        unregister : function(el){
            if(el instanceof Array){
                for(var i = 0, len = el.length; i < len; i++) {
                	this.unregister(el[i]);
                }
            }else{
                el = Roo.get(el);
                delete els[el.id];
            }
        },
        
        /**
         * The number of pixels from the edge of a container the pointer needs to be to 
         * trigger scrolling (defaults to 25)
         * @type Number
         */
        thresh : 25,
        
        /**
         * The number of pixels to scroll in each scroll increment (defaults to 50)
         * @type Number
         */
        increment : 100,
        
        /**
         * The frequency of scrolls in milliseconds (defaults to 500)
         * @type Number
         */
        frequency : 500,
        
        /**
         * True to animate the scroll (defaults to true)
         * @type Boolean
         */
        animate: true,
        
        /**
         * The animation duration in seconds - 
         * MUST BE less than Roo.dd.ScrollManager.frequency! (defaults to .4)
         * @type Number
         */
        animDuration: .4,
        
        /**
         * Manually trigger a cache refresh.
         */
        refreshCache : function(){
            for(var id in els){
                if(typeof els[id] == 'object'){ // for people extending the object prototype
                    els[id]._region = els[id].getRegion();
                }
            }
        }
    };
}();/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 

/**
 * @class Roo.dd.Registry
 * Provides easy access to all drag drop components that are registered on a page.  Items can be retrieved either
 * directly by DOM node id, or by passing in the drag drop event that occurred and looking up the event target.
 * @static
 */
Roo.dd.Registry = function(){
    var elements = {}; 
    var handles = {}; 
    var autoIdSeed = 0;

    var getId = function(el, autogen){
        if(typeof el == "string"){
            return el;
        }
        var id = el.id;
        if(!id && autogen !== false){
            id = "roodd-" + (++autoIdSeed);
            el.id = id;
        }
        return id;
    };
    
    return {
    /**
     * Register a drag drop element
     * @param {String|HTMLElement} element The id or DOM node to register
     * @param {Object} data (optional) A custom data object that will be passed between the elements that are involved
     * in drag drop operations.  You can populate this object with any arbitrary properties that your own code
     * knows how to interpret, plus there are some specific properties known to the Registry that should be
     * populated in the data object (if applicable):
     * <pre>
Value      Description<br />
---------  ------------------------------------------<br />
handles    Array of DOM nodes that trigger dragging<br />
           for the element being registered<br />
isHandle   True if the element passed in triggers<br />
           dragging itself, else false
</pre>
     */
        register : function(el, data){
            data = data || {};
            if(typeof el == "string"){
                el = document.getElementById(el);
            }
            data.ddel = el;
            elements[getId(el)] = data;
            if(data.isHandle !== false){
                handles[data.ddel.id] = data;
            }
            if(data.handles){
                var hs = data.handles;
                for(var i = 0, len = hs.length; i < len; i++){
                	handles[getId(hs[i])] = data;
                }
            }
        },

    /**
     * Unregister a drag drop element
     * @param {String|HTMLElement}  element The id or DOM node to unregister
     */
        unregister : function(el){
            var id = getId(el, false);
            var data = elements[id];
            if(data){
                delete elements[id];
                if(data.handles){
                    var hs = data.handles;
                    for(var i = 0, len = hs.length; i < len; i++){
                    	delete handles[getId(hs[i], false)];
                    }
                }
            }
        },

    /**
     * Returns the handle registered for a DOM Node by id
     * @param {String|HTMLElement} id The DOM node or id to look up
     * @return {Object} handle The custom handle data
     */
        getHandle : function(id){
            if(typeof id != "string"){ // must be element?
                id = id.id;
            }
            return handles[id];
        },

    /**
     * Returns the handle that is registered for the DOM node that is the target of the event
     * @param {Event} e The event
     * @return {Object} handle The custom handle data
     */
        getHandleFromEvent : function(e){
            var t = Roo.lib.Event.getTarget(e);
            return t ? handles[t.id] : null;
        },

    /**
     * Returns a custom data object that is registered for a DOM node by id
     * @param {String|HTMLElement} id The DOM node or id to look up
     * @return {Object} data The custom data
     */
        getTarget : function(id){
            if(typeof id != "string"){ // must be element?
                id = id.id;
            }
            return elements[id];
        },

    /**
     * Returns a custom data object that is registered for the DOM node that is the target of the event
     * @param {Event} e The event
     * @return {Object} data The custom data
     */
        getTargetFromEvent : function(e){
            var t = Roo.lib.Event.getTarget(e);
            return t ? elements[t.id] || handles[t.id] : null;
        }
    };
}();/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 

/**
 * @class Roo.dd.StatusProxy
 * A specialized drag proxy that supports a drop status icon, {@link Roo.Layer} styles and auto-repair.  This is the
 * default drag proxy used by all Roo.dd components.
 * @constructor
 * @param {Object} config
 */
Roo.dd.StatusProxy = function(config){
    Roo.apply(this, config);
    this.id = this.id || Roo.id();
    this.el = new Roo.Layer({
        dh: {
            id: this.id, tag: "div", cls: "x-dd-drag-proxy "+this.dropNotAllowed, children: [
                {tag: "div", cls: "x-dd-drop-icon"},
                {tag: "div", cls: "x-dd-drag-ghost"}
            ]
        }, 
        shadow: !config || config.shadow !== false
    });
    this.ghost = Roo.get(this.el.dom.childNodes[1]);
    this.dropStatus = this.dropNotAllowed;
};

Roo.dd.StatusProxy.prototype = {
    /**
     * @cfg {String} dropAllowed
     * The CSS class to apply to the status element when drop is allowed (defaults to "x-dd-drop-ok").
     */
    dropAllowed : "x-dd-drop-ok",
    /**
     * @cfg {String} dropNotAllowed
     * The CSS class to apply to the status element when drop is not allowed (defaults to "x-dd-drop-nodrop").
     */
    dropNotAllowed : "x-dd-drop-nodrop",

    /**
     * Updates the proxy's visual element to indicate the status of whether or not drop is allowed
     * over the current target element.
     * @param {String} cssClass The css class for the new drop status indicator image
     */
    setStatus : function(cssClass){
        cssClass = cssClass || this.dropNotAllowed;
        if(this.dropStatus != cssClass){
            this.el.replaceClass(this.dropStatus, cssClass);
            this.dropStatus = cssClass;
        }
    },

    /**
     * Resets the status indicator to the default dropNotAllowed value
     * @param {Boolean} clearGhost True to also remove all content from the ghost, false to preserve it
     */
    reset : function(clearGhost){
        this.el.dom.className = "x-dd-drag-proxy " + this.dropNotAllowed;
        this.dropStatus = this.dropNotAllowed;
        if(clearGhost){
            this.ghost.update("");
        }
    },

    /**
     * Updates the contents of the ghost element
     * @param {String} html The html that will replace the current innerHTML of the ghost element
     */
    update : function(html){
        if(typeof html == "string"){
            this.ghost.update(html);
        }else{
            this.ghost.update("");
            html.style.margin = "0";
            this.ghost.dom.appendChild(html);
        }
        // ensure float = none set?? cant remember why though.
        var el = this.ghost.dom.firstChild;
		if(el){
			Roo.fly(el).setStyle('float', 'none');
		}
    },
    
    /**
     * Returns the underlying proxy {@link Roo.Layer}
     * @return {Roo.Layer} el
    */
    getEl : function(){
        return this.el;
    },

    /**
     * Returns the ghost element
     * @return {Roo.Element} el
     */
    getGhost : function(){
        return this.ghost;
    },

    /**
     * Hides the proxy
     * @param {Boolean} clear True to reset the status and clear the ghost contents, false to preserve them
     */
    hide : function(clear){
        this.el.hide();
        if(clear){
            this.reset(true);
        }
    },

    /**
     * Stops the repair animation if it's currently running
     */
    stop : function(){
        if(this.anim && this.anim.isAnimated && this.anim.isAnimated()){
            this.anim.stop();
        }
    },

    /**
     * Displays this proxy
     */
    show : function(){
        this.el.show();
    },

    /**
     * Force the Layer to sync its shadow and shim positions to the element
     */
    sync : function(){
        this.el.sync();
    },

    /**
     * Causes the proxy to return to its position of origin via an animation.  Should be called after an
     * invalid drop operation by the item being dragged.
     * @param {Array} xy The XY position of the element ([x, y])
     * @param {Function} callback The function to call after the repair is complete
     * @param {Object} scope The scope in which to execute the callback
     */
    repair : function(xy, callback, scope){
        this.callback = callback;
        this.scope = scope;
        if(xy && this.animRepair !== false){
            this.el.addClass("x-dd-drag-repair");
            this.el.hideUnders(true);
            this.anim = this.el.shift({
                duration: this.repairDuration || .5,
                easing: 'easeOut',
                xy: xy,
                stopFx: true,
                callback: this.afterRepair,
                scope: this
            });
        }else{
            this.afterRepair();
        }
    },

    // private
    afterRepair : function(){
        this.hide(true);
        if(typeof this.callback == "function"){
            this.callback.call(this.scope || this);
        }
        this.callback = null;
        this.scope = null;
    }
};/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

/**
 * @class Roo.dd.DragSource
 * @extends Roo.dd.DDProxy
 * A simple class that provides the basic implementation needed to make any element draggable.
 * @constructor
 * @param {String/HTMLElement/Element} el The container element
 * @param {Object} config
 */
Roo.dd.DragSource = function(el, config){
    this.el = Roo.get(el);
    this.dragData = {};
    
    Roo.apply(this, config);
    
    if(!this.proxy){
        this.proxy = new Roo.dd.StatusProxy();
    }

    Roo.dd.DragSource.superclass.constructor.call(this, this.el.dom, this.ddGroup || this.group,
          {dragElId : this.proxy.id, resizeFrame: false, isTarget: false, scroll: this.scroll === true});
    
    this.dragging = false;
};

Roo.extend(Roo.dd.DragSource, Roo.dd.DDProxy, {
    /**
     * @cfg {String} dropAllowed
     * The CSS class returned to the drag source when drop is allowed (defaults to "x-dd-drop-ok").
     */
    dropAllowed : "x-dd-drop-ok",
    /**
     * @cfg {String} dropNotAllowed
     * The CSS class returned to the drag source when drop is not allowed (defaults to "x-dd-drop-nodrop").
     */
    dropNotAllowed : "x-dd-drop-nodrop",

    /**
     * Returns the data object associated with this drag source
     * @return {Object} data An object containing arbitrary data
     */
    getDragData : function(e){
        return this.dragData;
    },

    // private
    onDragEnter : function(e, id){
        var target = Roo.dd.DragDropMgr.getDDById(id);
        this.cachedTarget = target;
        if(this.beforeDragEnter(target, e, id) !== false){
            if(target.isNotifyTarget){
                var status = target.notifyEnter(this, e, this.dragData);
                this.proxy.setStatus(status);
            }else{
                this.proxy.setStatus(this.dropAllowed);
            }
            
            if(this.afterDragEnter){
                /**
                 * An empty function by default, but provided so that you can perform a custom action
                 * when the dragged item enters the drop target by providing an implementation.
                 * @param {Roo.dd.DragDrop} target The drop target
                 * @param {Event} e The event object
                 * @param {String} id The id of the dragged element
                 * @method afterDragEnter
                 */
                this.afterDragEnter(target, e, id);
            }
        }
    },

    /**
     * An empty function by default, but provided so that you can perform a custom action
     * before the dragged item enters the drop target and optionally cancel the onDragEnter.
     * @param {Roo.dd.DragDrop} target The drop target
     * @param {Event} e The event object
     * @param {String} id The id of the dragged element
     * @return {Boolean} isValid True if the drag event is valid, else false to cancel
     */
    beforeDragEnter : function(target, e, id){
        return true;
    },

    // private
    alignElWithMouse: function() {
        Roo.dd.DragSource.superclass.alignElWithMouse.apply(this, arguments);
        this.proxy.sync();
    },

    // private
    onDragOver : function(e, id){
        var target = this.cachedTarget || Roo.dd.DragDropMgr.getDDById(id);
        if(this.beforeDragOver(target, e, id) !== false){
            if(target.isNotifyTarget){
                var status = target.notifyOver(this, e, this.dragData);
                this.proxy.setStatus(status);
            }

            if(this.afterDragOver){
                /**
                 * An empty function by default, but provided so that you can perform a custom action
                 * while the dragged item is over the drop target by providing an implementation.
                 * @param {Roo.dd.DragDrop} target The drop target
                 * @param {Event} e The event object
                 * @param {String} id The id of the dragged element
                 * @method afterDragOver
                 */
                this.afterDragOver(target, e, id);
            }
        }
    },

    /**
     * An empty function by default, but provided so that you can perform a custom action
     * while the dragged item is over the drop target and optionally cancel the onDragOver.
     * @param {Roo.dd.DragDrop} target The drop target
     * @param {Event} e The event object
     * @param {String} id The id of the dragged element
     * @return {Boolean} isValid True if the drag event is valid, else false to cancel
     */
    beforeDragOver : function(target, e, id){
        return true;
    },

    // private
    onDragOut : function(e, id){
        var target = this.cachedTarget || Roo.dd.DragDropMgr.getDDById(id);
        if(this.beforeDragOut(target, e, id) !== false){
            if(target.isNotifyTarget){
                target.notifyOut(this, e, this.dragData);
            }
            this.proxy.reset();
            if(this.afterDragOut){
                /**
                 * An empty function by default, but provided so that you can perform a custom action
                 * after the dragged item is dragged out of the target without dropping.
                 * @param {Roo.dd.DragDrop} target The drop target
                 * @param {Event} e The event object
                 * @param {String} id The id of the dragged element
                 * @method afterDragOut
                 */
                this.afterDragOut(target, e, id);
            }
        }
        this.cachedTarget = null;
    },

    /**
     * An empty function by default, but provided so that you can perform a custom action before the dragged
     * item is dragged out of the target without dropping, and optionally cancel the onDragOut.
     * @param {Roo.dd.DragDrop} target The drop target
     * @param {Event} e The event object
     * @param {String} id The id of the dragged element
     * @return {Boolean} isValid True if the drag event is valid, else false to cancel
     */
    beforeDragOut : function(target, e, id){
        return true;
    },
    
    // private
    onDragDrop : function(e, id){
        var target = this.cachedTarget || Roo.dd.DragDropMgr.getDDById(id);
        if(this.beforeDragDrop(target, e, id) !== false){
            if(target.isNotifyTarget){
                if(target.notifyDrop(this, e, this.dragData)){ // valid drop?
                    this.onValidDrop(target, e, id);
                }else{
                    this.onInvalidDrop(target, e, id);
                }
            }else{
                this.onValidDrop(target, e, id);
            }
            
            if(this.afterDragDrop){
                /**
                 * An empty function by default, but provided so that you can perform a custom action
                 * after a valid drag drop has occurred by providing an implementation.
                 * @param {Roo.dd.DragDrop} target The drop target
                 * @param {Event} e The event object
                 * @param {String} id The id of the dropped element
                 * @method afterDragDrop
                 */
                this.afterDragDrop(target, e, id);
            }
        }
        delete this.cachedTarget;
    },

    /**
     * An empty function by default, but provided so that you can perform a custom action before the dragged
     * item is dropped onto the target and optionally cancel the onDragDrop.
     * @param {Roo.dd.DragDrop} target The drop target
     * @param {Event} e The event object
     * @param {String} id The id of the dragged element
     * @return {Boolean} isValid True if the drag drop event is valid, else false to cancel
     */
    beforeDragDrop : function(target, e, id){
        return true;
    },

    // private
    onValidDrop : function(target, e, id){
        this.hideProxy();
        if(this.afterValidDrop){
            /**
             * An empty function by default, but provided so that you can perform a custom action
             * after a valid drop has occurred by providing an implementation.
             * @param {Object} target The target DD 
             * @param {Event} e The event object
             * @param {String} id The id of the dropped element
             * @method afterInvalidDrop
             */
            this.afterValidDrop(target, e, id);
        }
    },

    // private
    getRepairXY : function(e, data){
        return this.el.getXY();  
    },

    // private
    onInvalidDrop : function(target, e, id){
        this.beforeInvalidDrop(target, e, id);
        if(this.cachedTarget){
            if(this.cachedTarget.isNotifyTarget){
                this.cachedTarget.notifyOut(this, e, this.dragData);
            }
            this.cacheTarget = null;
        }
        this.proxy.repair(this.getRepairXY(e, this.dragData), this.afterRepair, this);

        if(this.afterInvalidDrop){
            /**
             * An empty function by default, but provided so that you can perform a custom action
             * after an invalid drop has occurred by providing an implementation.
             * @param {Event} e The event object
             * @param {String} id The id of the dropped element
             * @method afterInvalidDrop
             */
            this.afterInvalidDrop(e, id);
        }
    },

    // private
    afterRepair : function(){
        if(Roo.enableFx){
            this.el.highlight(this.hlColor || "c3daf9");
        }
        this.dragging = false;
    },

    /**
     * An empty function by default, but provided so that you can perform a custom action after an invalid
     * drop has occurred.
     * @param {Roo.dd.DragDrop} target The drop target
     * @param {Event} e The event object
     * @param {String} id The id of the dragged element
     * @return {Boolean} isValid True if the invalid drop should proceed, else false to cancel
     */
    beforeInvalidDrop : function(target, e, id){
        return true;
    },

    // private
    handleMouseDown : function(e){
        if(this.dragging) {
            return;
        }
        var data = this.getDragData(e);
        if(data && this.onBeforeDrag(data, e) !== false){
            this.dragData = data;
            this.proxy.stop();
            Roo.dd.DragSource.superclass.handleMouseDown.apply(this, arguments);
        } 
    },

    /**
     * An empty function by default, but provided so that you can perform a custom action before the initial
     * drag event begins and optionally cancel it.
     * @param {Object} data An object containing arbitrary data to be shared with drop targets
     * @param {Event} e The event object
     * @return {Boolean} isValid True if the drag event is valid, else false to cancel
     */
    onBeforeDrag : function(data, e){
        return true;
    },

    /**
     * An empty function by default, but provided so that you can perform a custom action once the initial
     * drag event has begun.  The drag cannot be canceled from this function.
     * @param {Number} x The x position of the click on the dragged object
     * @param {Number} y The y position of the click on the dragged object
     */
    onStartDrag : Roo.emptyFn,

    // private - YUI override
    startDrag : function(x, y){
        this.proxy.reset();
        this.dragging = true;
        this.proxy.update("");
        this.onInitDrag(x, y);
        this.proxy.show();
    },

    // private
    onInitDrag : function(x, y){
        var clone = this.el.dom.cloneNode(true);
        clone.id = Roo.id(); // prevent duplicate ids
        this.proxy.update(clone);
        this.onStartDrag(x, y);
        return true;
    },

    /**
     * Returns the drag source's underlying {@link Roo.dd.StatusProxy}
     * @return {Roo.dd.StatusProxy} proxy The StatusProxy
     */
    getProxy : function(){
        return this.proxy;  
    },

    /**
     * Hides the drag source's {@link Roo.dd.StatusProxy}
     */
    hideProxy : function(){
        this.proxy.hide();  
        this.proxy.reset(true);
        this.dragging = false;
    },

    // private
    triggerCacheRefresh : function(){
        Roo.dd.DDM.refreshCache(this.groups);
    },

    // private - override to prevent hiding
    b4EndDrag: function(e) {
    },

    // private - override to prevent moving
    endDrag : function(e){
        this.onEndDrag(this.dragData, e);
    },

    // private
    onEndDrag : function(data, e){
    },
    
    // private - pin to cursor
    autoOffset : function(x, y) {
        this.setDelta(-12, -20);
    }    
});/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */


/**
 * @class Roo.dd.DropTarget
 * @extends Roo.dd.DDTarget
 * A simple class that provides the basic implementation needed to make any element a drop target that can have
 * draggable items dropped onto it.  The drop has no effect until an implementation of notifyDrop is provided.
 * @constructor
 * @param {String/HTMLElement/Element} el The container element
 * @param {Object} config
 */
Roo.dd.DropTarget = function(el, config){
    this.el = Roo.get(el);
    
    var listeners = false; ;
    if (config && config.listeners) {
        listeners= config.listeners;
        delete config.listeners;
    }
    Roo.apply(this, config);
    
    if(this.containerScroll){
        Roo.dd.ScrollManager.register(this.el);
    }
    this.addEvents( {
         /**
         * @scope Roo.dd.DropTarget
         */
         
         /**
         * @event enter
         * The function a {@link Roo.dd.DragSource} calls once to notify this drop target that the source is now over the
         * target.  This default implementation adds the CSS class specified by overClass (if any) to the drop element
         * and returns the dropAllowed config value.  This method should be overridden if drop validation is required.
         * 
         * IMPORTANT : it should set  this.valid to true|false
         * 
         * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop target
         * @param {Event} e The event
         * @param {Object} data An object containing arbitrary data supplied by the drag source
         */
        "enter" : true,
        
         /**
         * @event over
         * The function a {@link Roo.dd.DragSource} calls continuously while it is being dragged over the target.
         * This method will be called on every mouse movement while the drag source is over the drop target.
         * This default implementation simply returns the dropAllowed config value.
         * 
         * IMPORTANT : it should set  this.valid to true|false
         * 
         * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop target
         * @param {Event} e The event
         * @param {Object} data An object containing arbitrary data supplied by the drag source
         
         */
        "over" : true,
        /**
         * @event out
         * The function a {@link Roo.dd.DragSource} calls once to notify this drop target that the source has been dragged
         * out of the target without dropping.  This default implementation simply removes the CSS class specified by
         * overClass (if any) from the drop element.
         * 
         * 
         * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop target
         * @param {Event} e The event
         * @param {Object} data An object containing arbitrary data supplied by the drag source
         */
         "out" : true,
         
        /**
         * @event drop
         * The function a {@link Roo.dd.DragSource} calls once to notify this drop target that the dragged item has
         * been dropped on it.  This method has no default implementation and returns false, so you must provide an
         * implementation that does something to process the drop event and returns true so that the drag source's
         * repair action does not run.
         * 
         * IMPORTANT : it should set this.success
         * 
         * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop target
         * @param {Event} e The event
         * @param {Object} data An object containing arbitrary data supplied by the drag source
        */
         "drop" : true
    });
            
     
    Roo.dd.DropTarget.superclass.constructor.call(  this, 
        this.el.dom, 
        this.ddGroup || this.group,
        {
            isTarget: true,
            listeners : listeners || {} 
           
        
        }
    );

};

Roo.extend(Roo.dd.DropTarget, Roo.dd.DDTarget, {
    /**
     * @cfg {String} overClass
     * The CSS class applied to the drop target element while the drag source is over it (defaults to "").
     */
     /**
     * @cfg {String} ddGroup
     * The drag drop group to handle drop events for
     */
     
    /**
     * @cfg {String} dropAllowed
     * The CSS class returned to the drag source when drop is allowed (defaults to "x-dd-drop-ok").
     */
    dropAllowed : "x-dd-drop-ok",
    /**
     * @cfg {String} dropNotAllowed
     * The CSS class returned to the drag source when drop is not allowed (defaults to "x-dd-drop-nodrop").
     */
    dropNotAllowed : "x-dd-drop-nodrop",
    /**
     * @cfg {boolean} success
     * set this after drop listener.. 
     */
    success : false,
    /**
     * @cfg {boolean|String} valid true/false or string (ok-add/ok-sub/ok/nodrop)
     * if the drop point is valid for over/enter..
     */
    valid : false,
    // private
    isTarget : true,

    // private
    isNotifyTarget : true,
    
    /**
     * @hide
     */
    notifyEnter : function(dd, e, data)
    {
        this.valid = true;
        this.fireEvent('enter', dd, e, data);
        if(this.overClass){
            this.el.addClass(this.overClass);
        }
        return typeof(this.valid) == 'string' ? 'x-dd-drop-' + this.valid : (
            this.valid ? this.dropAllowed : this.dropNotAllowed
        );
    },

    /**
     * @hide
     */
    notifyOver : function(dd, e, data)
    {
        this.valid = true;
        this.fireEvent('over', dd, e, data);
        return typeof(this.valid) == 'string' ? 'x-dd-drop-' + this.valid : (
            this.valid ? this.dropAllowed : this.dropNotAllowed
        );
    },

    /**
     * @hide
     */
    notifyOut : function(dd, e, data)
    {
        this.fireEvent('out', dd, e, data);
        if(this.overClass){
            this.el.removeClass(this.overClass);
        }
    },

    /**
     * @hide
     */
    notifyDrop : function(dd, e, data)
    {
        this.success = false;
        this.fireEvent('drop', dd, e, data);
        return this.success;
    }
});/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */


/**
 * @class Roo.dd.DragZone
 * @extends Roo.dd.DragSource
 * This class provides a container DD instance that proxies for multiple child node sources.<br />
 * By default, this class requires that draggable child nodes are registered with {@link Roo.dd.Registry}.
 * @constructor
 * @param {String/HTMLElement/Element} el The container element
 * @param {Object} config
 */
Roo.dd.DragZone = function(el, config){
    Roo.dd.DragZone.superclass.constructor.call(this, el, config);
    if(this.containerScroll){
        Roo.dd.ScrollManager.register(this.el);
    }
};

Roo.extend(Roo.dd.DragZone, Roo.dd.DragSource, {
    /**
     * @cfg {Boolean} containerScroll True to register this container with the Scrollmanager
     * for auto scrolling during drag operations.
     */
    /**
     * @cfg {String} hlColor The color to use when visually highlighting the drag source in the afterRepair
     * method after a failed drop (defaults to "c3daf9" - light blue)
     */

    /**
     * Called when a mousedown occurs in this container. Looks in {@link Roo.dd.Registry}
     * for a valid target to drag based on the mouse down. Override this method
     * to provide your own lookup logic (e.g. finding a child by class name). Make sure your returned
     * object has a "ddel" attribute (with an HTML Element) for other functions to work.
     * @param {EventObject} e The mouse down event
     * @return {Object} The dragData
     */
    getDragData : function(e){
        return Roo.dd.Registry.getHandleFromEvent(e);
    },
    
    /**
     * Called once drag threshold has been reached to initialize the proxy element. By default, it clones the
     * this.dragData.ddel
     * @param {Number} x The x position of the click on the dragged object
     * @param {Number} y The y position of the click on the dragged object
     * @return {Boolean} true to continue the drag, false to cancel
     */
    onInitDrag : function(x, y){
        this.proxy.update(this.dragData.ddel.cloneNode(true));
        this.onStartDrag(x, y);
        return true;
    },
    
    /**
     * Called after a repair of an invalid drop. By default, highlights this.dragData.ddel 
     */
    afterRepair : function(){
        if(Roo.enableFx){
            Roo.Element.fly(this.dragData.ddel).highlight(this.hlColor || "c3daf9");
        }
        this.dragging = false;
    },

    /**
     * Called before a repair of an invalid drop to get the XY to animate to. By default returns
     * the XY of this.dragData.ddel
     * @param {EventObject} e The mouse up event
     * @return {Array} The xy location (e.g. [100, 200])
     */
    getRepairXY : function(e){
        return Roo.Element.fly(this.dragData.ddel).getXY();  
    }
});/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
/**
 * @class Roo.dd.DropZone
 * @extends Roo.dd.DropTarget
 * This class provides a container DD instance that proxies for multiple child node targets.<br />
 * By default, this class requires that child nodes accepting drop are registered with {@link Roo.dd.Registry}.
 * @constructor
 * @param {String/HTMLElement/Element} el The container element
 * @param {Object} config
 */
Roo.dd.DropZone = function(el, config){
    Roo.dd.DropZone.superclass.constructor.call(this, el, config);
};

Roo.extend(Roo.dd.DropZone, Roo.dd.DropTarget, {
    /**
     * Returns a custom data object associated with the DOM node that is the target of the event.  By default
     * this looks up the event target in the {@link Roo.dd.Registry}, although you can override this method to
     * provide your own custom lookup.
     * @param {Event} e The event
     * @return {Object} data The custom data
     */
    getTargetFromEvent : function(e){
        return Roo.dd.Registry.getTargetFromEvent(e);
    },

    /**
     * Called internally when the DropZone determines that a {@link Roo.dd.DragSource} has entered a drop node
     * that it has registered.  This method has no default implementation and should be overridden to provide
     * node-specific processing if necessary.
     * @param {Object} nodeData The custom data associated with the drop node (this is the same value returned from 
     * {@link #getTargetFromEvent} for this node)
     * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     */
    onNodeEnter : function(n, dd, e, data){
        
    },

    /**
     * Called internally while the DropZone determines that a {@link Roo.dd.DragSource} is over a drop node
     * that it has registered.  The default implementation returns this.dropNotAllowed, so it should be
     * overridden to provide the proper feedback.
     * @param {Object} nodeData The custom data associated with the drop node (this is the same value returned from
     * {@link #getTargetFromEvent} for this node)
     * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     * @return {String} status The CSS class that communicates the drop status back to the source so that the
     * underlying {@link Roo.dd.StatusProxy} can be updated
     */
    onNodeOver : function(n, dd, e, data){
        return this.dropAllowed;
    },

    /**
     * Called internally when the DropZone determines that a {@link Roo.dd.DragSource} has been dragged out of
     * the drop node without dropping.  This method has no default implementation and should be overridden to provide
     * node-specific processing if necessary.
     * @param {Object} nodeData The custom data associated with the drop node (this is the same value returned from
     * {@link #getTargetFromEvent} for this node)
     * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     */
    onNodeOut : function(n, dd, e, data){
        
    },

    /**
     * Called internally when the DropZone determines that a {@link Roo.dd.DragSource} has been dropped onto
     * the drop node.  The default implementation returns false, so it should be overridden to provide the
     * appropriate processing of the drop event and return true so that the drag source's repair action does not run.
     * @param {Object} nodeData The custom data associated with the drop node (this is the same value returned from
     * {@link #getTargetFromEvent} for this node)
     * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     * @return {Boolean} True if the drop was valid, else false
     */
    onNodeDrop : function(n, dd, e, data){
        return false;
    },

    /**
     * Called internally while the DropZone determines that a {@link Roo.dd.DragSource} is being dragged over it,
     * but not over any of its registered drop nodes.  The default implementation returns this.dropNotAllowed, so
     * it should be overridden to provide the proper feedback if necessary.
     * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     * @return {String} status The CSS class that communicates the drop status back to the source so that the
     * underlying {@link Roo.dd.StatusProxy} can be updated
     */
    onContainerOver : function(dd, e, data){
        return this.dropNotAllowed;
    },

    /**
     * Called internally when the DropZone determines that a {@link Roo.dd.DragSource} has been dropped on it,
     * but not on any of its registered drop nodes.  The default implementation returns false, so it should be
     * overridden to provide the appropriate processing of the drop event if you need the drop zone itself to
     * be able to accept drops.  It should return true when valid so that the drag source's repair action does not run.
     * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     * @return {Boolean} True if the drop was valid, else false
     */
    onContainerDrop : function(dd, e, data){
        return false;
    },

    /**
     * The function a {@link Roo.dd.DragSource} calls once to notify this drop zone that the source is now over
     * the zone.  The default implementation returns this.dropNotAllowed and expects that only registered drop
     * nodes can process drag drop operations, so if you need the drop zone itself to be able to process drops
     * you should override this method and provide a custom implementation.
     * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     * @return {String} status The CSS class that communicates the drop status back to the source so that the
     * underlying {@link Roo.dd.StatusProxy} can be updated
     */
    notifyEnter : function(dd, e, data){
        return this.dropNotAllowed;
    },

    /**
     * The function a {@link Roo.dd.DragSource} calls continuously while it is being dragged over the drop zone.
     * This method will be called on every mouse movement while the drag source is over the drop zone.
     * It will call {@link #onNodeOver} while the drag source is over a registered node, and will also automatically
     * delegate to the appropriate node-specific methods as necessary when the drag source enters and exits
     * registered nodes ({@link #onNodeEnter}, {@link #onNodeOut}). If the drag source is not currently over a
     * registered node, it will call {@link #onContainerOver}.
     * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     * @return {String} status The CSS class that communicates the drop status back to the source so that the
     * underlying {@link Roo.dd.StatusProxy} can be updated
     */
    notifyOver : function(dd, e, data){
        var n = this.getTargetFromEvent(e);
        if(!n){ // not over valid drop target
            if(this.lastOverNode){
                this.onNodeOut(this.lastOverNode, dd, e, data);
                this.lastOverNode = null;
            }
            return this.onContainerOver(dd, e, data);
        }
        if(this.lastOverNode != n){
            if(this.lastOverNode){
                this.onNodeOut(this.lastOverNode, dd, e, data);
            }
            this.onNodeEnter(n, dd, e, data);
            this.lastOverNode = n;
        }
        return this.onNodeOver(n, dd, e, data);
    },

    /**
     * The function a {@link Roo.dd.DragSource} calls once to notify this drop zone that the source has been dragged
     * out of the zone without dropping.  If the drag source is currently over a registered node, the notification
     * will be delegated to {@link #onNodeOut} for node-specific handling, otherwise it will be ignored.
     * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop target
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag zone
     */
    notifyOut : function(dd, e, data){
        if(this.lastOverNode){
            this.onNodeOut(this.lastOverNode, dd, e, data);
            this.lastOverNode = null;
        }
    },

    /**
     * The function a {@link Roo.dd.DragSource} calls once to notify this drop zone that the dragged item has
     * been dropped on it.  The drag zone will look up the target node based on the event passed in, and if there
     * is a node registered for that event, it will delegate to {@link #onNodeDrop} for node-specific handling,
     * otherwise it will call {@link #onContainerDrop}.
     * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     * @return {Boolean} True if the drop was valid, else false
     */
    notifyDrop : function(dd, e, data){
        if(this.lastOverNode){
            this.onNodeOut(this.lastOverNode, dd, e, data);
            this.lastOverNode = null;
        }
        var n = this.getTargetFromEvent(e);
        return n ?
            this.onNodeDrop(n, dd, e, data) :
            this.onContainerDrop(dd, e, data);
    },

    // private
    triggerCacheRefresh : function(){
        Roo.dd.DDM.refreshCache(this.groups);
    }  
});Roo.languagedetect = {};// source : https://www.unicode.org/charts/unihan.html
// array of characters that are only used in traditional chinese

Roo.languagedetect.zh_HK = [
	"\u346E",
	"\u346F",
	"\u3473",
	"\u3476",
	"\u3493",
	"\u349C",
	"\u34A3",
	"\u34BF",
	"\u34C4",
	"\u34D6",
	"\u34E8",
	"\u3503",
	"\u3505",
	"\u350B",
	"\u351D",
	"\u3522",
	"\u3552",
	"\u3562",
	"\u35A6",
	"\u35AE",
	"\u35D9",
	"\u35E2",
	"\u35E3",
	"\u35F0",
	"\u35F2",
	"\u35F6",
	"\u35FB",
	"\u35FC",
	"\u35FF",
	"\u3613",
	"\u3614",
	"\u3616",
	"\u3619",
	"\u361A",
	"\u3624",
	"\u3654",
	"\u3661",
	"\u3662",
	"\u366C",
	"\u367A",
	"\u367E",
	"\u36DD",
	"\u3704",
	"\u370F",
	"\u3710",
	"\u3717",
	"\u371E",
	"\u3722",
	"\u3725",
	"\u372D",
	"\u372E",
	"\u3737",
	"\u373A",
	"\u375E",
	"\u375F",
	"\u379E",
	"\u37FA",
	"\u3801",
	"\u380F",
	"\u3820",
	"\u3823",
	"\u3853",
	"\u385E",
	"\u3897",
	"\u389D",
	"\u3932",
	"\u396E",
	"\u3977",
	"\u398A",
	"\u398E",
	"\u3996",
	"\u399B",
	"\u399E",
	"\u39A6",
	"\u39AC",
	"\u39AD",
	"\u3A1B",
	"\u3A1F",
	"\u3A25",
	"\u3A3B",
	"\u3A47",
	"\u3A4B",
	"\u3A4C",
	"\u3A5C",
	"\u3A63",
	"\u3A6D",
	"\u3A73",
	"\u3A75",
	"\u3A77",
	"\u3A79",
	"\u3A8E",
	"\u3AB9",
	"\u3B23",
	"\u3B2E",
	"\u3B93",
	"\u3B9D",
	"\u3BB2",
	"\u3BC2",
	"\u3BC6",
	"\u3BE4",
	"\u3BF8",
	"\u3BFC",
	"\u3C02",
	"\u3C05",
	"\u3C0D",
	"\u3C30",
	"\u3C33",
	"\u3CAF",
	"\u3CB0",
	"\u3CB2",
	"\u3CFD",
	"\u3D38",
	"\u3D3F",
	"\u3D4D",
	"\u3D51",
	"\u3D52",
	"\u3D57",
	"\u3D64",
	"\u3D7E",
	"\u3D86",
	"\u3D8C",
	"\u3D8D",
	"\u3D8F",
	"\u3D92",
	"\u3D95",
	"\u3DC3",
	"\u3DCD",
	"\u3DF2",
	"\u3DF6",
	"\u3DFB",
	"\u3DFF",
	"\u3E05",
	"\u3E0A",
	"\u3E10",
	"\u3E53",
	"\u3E7D",
	"\u3E8F",
	"\u3E91",
	"\u3E9C",
	"\u3EF6",
	"\u3EFD",
	"\u3F06",
	"\u3F08",
	"\u3F3B",
	"\u3FB5",
	"\u3FBA",
	"\u3FC9",
	"\u3FCE",
	"\u3FD6",
	"\u3FD7",
	"\u3FE7",
	"\u3FF9",
	"\u4009",
	"\u400D",
	"\u4034",
	"\u4039",
	"\u405D",
	"\u406A",
	"\u4071",
	"\u407B",
	"\u408E",
	"\u4093",
	"\u40C1",
	"\u40D5",
	"\u40D8",
	"\u40E2",
	"\u40E3",
	"\u40E4",
	"\u40EE",
	"\u40F4",
	"\u4150",
	"\u4158",
	"\u4173",
	"\u4185",
	"\u4189",
	"\u41D3",
	"\u424D",
	"\u4250",
	"\u4251",
	"\u4259",
	"\u426C",
	"\u4271",
	"\u4272",
	"\u4276",
	"\u429C",
	"\u429F",
	"\u42AD",
	"\u42B2",
	"\u42B5",
	"\u42B7",
	"\u42BA",
	"\u42C3",
	"\u42C6",
	"\u42CD",
	"\u42CE",
	"\u42CF",
	"\u42D0",
	"\u42D1",
	"\u42D4",
	"\u42D9",
	"\u42DA",
	"\u42E6",
	"\u42EB",
	"\u42F9",
	"\u42FA",
	"\u42FB",
	"\u42FC",
	"\u42FD",
	"\u42FE",
	"\u42FF",
	"\u4301",
	"\u4307",
	"\u4308",
	"\u430B",
	"\u430C",
	"\u4310",
	"\u4316",
	"\u431D",
	"\u431E",
	"\u431F",
	"\u4325",
	"\u432A",
	"\u4330",
	"\u4364",
	"\u4377",
	"\u437D",
	"\u4398",
	"\u4399",
	"\u43B1",
	"\u43CA",
	"\u4422",
	"\u4423",
	"\u4437",
	"\u4439",
	"\u443D",
	"\u4457",
	"\u447C",
	"\u44E3",
	"\u4507",
	"\u4508",
	"\u4521",
	"\u4561",
	"\u4564",
	"\u4573",
	"\u4579",
	"\u457C",
	"\u4580",
	"\u4585",
	"\u459A",
	"\u45C3",
	"\u45C5",
	"\u45E5",
	"\u45FB",
	"\u45FD",
	"\u45FF",
	"\u4654",
	"\u4661",
	"\u4671",
	"\u467C",
	"\u4686",
	"\u4689",
	"\u4695",
	"\u469E",
	"\u46A9",
	"\u46B3",
	"\u46B5",
	"\u46BD",
	"\u46C0",
	"\u46C4",
	"\u46CC",
	"\u46CD",
	"\u46D8",
	"\u46DB",
	"\u46DE",
	"\u46E0",
	"\u46E4",
	"\u46EC",
	"\u46ED",
	"\u46F3",
	"\u46FD",
	"\u46FF",
	"\u4700",
	"\u4704",
	"\u4709",
	"\u470B",
	"\u470D",
	"\u470E",
	"\u470F",
	"\u4712",
	"\u4716",
	"\u471A",
	"\u471D",
	"\u474F",
	"\u4755",
	"\u476D",
	"\u476F",
	"\u477B",
	"\u477C",
	"\u4780",
	"\u4781",
	"\u4782",
	"\u4788",
	"\u4789",
	"\u478B",
	"\u4793",
	"\u47B6",
	"\u47C3",
	"\u47C6",
	"\u47CF",
	"\u47D0",
	"\u47FA",
	"\u4806",
	"\u481F",
	"\u4820",
	"\u4829",
	"\u482E",
	"\u4831",
	"\u4841",
	"\u4845",
	"\u4847",
	"\u484A",
	"\u4850",
	"\u4857",
	"\u4858",
	"\u485D",
	"\u485F",
	"\u4866",
	"\u4869",
	"\u4870",
	"\u4874",
	"\u4875",
	"\u4876",
	"\u4877",
	"\u487B",
	"\u487E",
	"\u4888",
	"\u48A8",
	"\u490C",
	"\u490D",
	"\u4920",
	"\u4924",
	"\u4925",
	"\u4928",
	"\u4929",
	"\u492A",
	"\u492C",
	"\u4935",
	"\u4938",
	"\u493B",
	"\u493C",
	"\u4944",
	"\u4947",
	"\u4951",
	"\u4955",
	"\u4956",
	"\u4957",
	"\u495B",
	"\u495D",
	"\u495E",
	"\u4969",
	"\u496F",
	"\u4971",
	"\u4974",
	"\u4976",
	"\u4977",
	"\u4978",
	"\u498C",
	"\u498E",
	"\u4998",
	"\u499B",
	"\u499D",
	"\u499F",
	"\u49AA",
	"\u49AF",
	"\u49B1",
	"\u49B3",
	"\u49DE",
	"\u49E2",
	"\u4A34",
	"\u4A6B",
	"\u4A8A",
	"\u4A8D",
	"\u4A8F",
	"\u4A90",
	"\u4A93",
	"\u4A97",
	"\u4A98",
	"\u4A9C",
	"\u4A9D",
	"\u4AA5",
	"\u4AB4",
	"\u4ABC",
	"\u4ABE",
	"\u4AC0",
	"\u4AC2",
	"\u4AC8",
	"\u4AC9",
	"\u4ACC",
	"\u4ACF",
	"\u4AD0",
	"\u4ADC",
	"\u4ADF",
	"\u4AE0",
	"\u4AE5",
	"\u4AE9",
	"\u4AF4",
	"\u4AF6",
	"\u4AFB",
	"\u4AFC",
	"\u4AFE",
	"\u4B00",
	"\u4B02",
	"\u4B05",
	"\u4B0D",
	"\u4B0E",
	"\u4B10",
	"\u4B13",
	"\u4B14",
	"\u4B18",
	"\u4B1D",
	"\u4B1E",
	"\u4B1F",
	"\u4B23",
	"\u4B27",
	"\u4B2A",
	"\u4B2B",
	"\u4B2C",
	"\u4B2F",
	"\u4B32",
	"\u4B33",
	"\u4B36",
	"\u4B39",
	"\u4B3E",
	"\u4B40",
	"\u4B43",
	"\u4B45",
	"\u4B47",
	"\u4B48",
	"\u4B49",
	"\u4B51",
	"\u4B52",
	"\u4B53",
	"\u4B54",
	"\u4B55",
	"\u4B58",
	"\u4B5E",
	"\u4B61",
	"\u4B62",
	"\u4B63",
	"\u4B6D",
	"\u4B7F",
	"\u4B82",
	"\u4B84",
	"\u4B88",
	"\u4B97",
	"\u4B9D",
	"\u4B9E",
	"\u4BA0",
	"\u4BA7",
	"\u4BAB",
	"\u4BB0",
	"\u4BB2",
	"\u4BB3",
	"\u4BB8",
	"\u4BBD",
	"\u4BBE",
	"\u4BBF",
	"\u4BC0",
	"\u4BE4",
	"\u4C0E",
	"\u4C10",
	"\u4C16",
	"\u4C2B",
	"\u4C32",
	"\u4C37",
	"\u4C3B",
	"\u4C3D",
	"\u4C3E",
	"\u4C40",
	"\u4C41",
	"\u4C42",
	"\u4C45",
	"\u4C47",
	"\u4C4C",
	"\u4C4D",
	"\u4C4E",
	"\u4C50",
	"\u4C52",
	"\u4C53",
	"\u4C57",
	"\u4C59",
	"\u4C5A",
	"\u4C5B",
	"\u4C5C",
	"\u4C5F",
	"\u4C61",
	"\u4C64",
	"\u4C65",
	"\u4C67",
	"\u4C6C",
	"\u4C6D",
	"\u4C70",
	"\u4C71",
	"\u4C74",
	"\u4C75",
	"\u4C77",
	"\u4C78",
	"\u4C79",
	"\u4C7B",
	"\u4C7D",
	"\u4C7E",
	"\u4C81",
	"\u4C85",
	"\u4C89",
	"\u4C8F",
	"\u4C95",
	"\u4C96",
	"\u4C97",
	"\u4C98",
	"\u4C99",
	"\u4C9A",
	"\u4C9B",
	"\u4CA8",
	"\u4CB0",
	"\u4CB8",
	"\u4CB9",
	"\u4CBC",
	"\u4CC5",
	"\u4CC7",
	"\u4CCD",
	"\u4CCF",
	"\u4CD2",
	"\u4CD3",
	"\u4CD5",
	"\u4CDA",
	"\u4CDC",
	"\u4CDF",
	"\u4CE2",
	"\u4CE4",
	"\u4CE7",
	"\u4CE8",
	"\u4CEB",
	"\u4CED",
	"\u4CEE",
	"\u4CF2",
	"\u4CFA",
	"\u4D07",
	"\u4D08",
	"\u4D09",
	"\u4D0B",
	"\u4D1A",
	"\u4D1D",
	"\u4D2C",
	"\u4D2D",
	"\u4D2E",
	"\u4D31",
	"\u4D32",
	"\u4D33",
	"\u4D34",
	"\u4D35",
	"\u4D37",
	"\u4D38",
	"\u4D39",
	"\u4D3A",
	"\u4D3D",
	"\u4D42",
	"\u4D43",
	"\u4D46",
	"\u4D50",
	"\u4D58",
	"\u4D73",
	"\u4D74",
	"\u4D76",
	"\u4D77",
	"\u4D95",
	"\u4D97",
	"\u4DA2",
	"\u4DA3",
	"\u4DA6",
	"\u4DA7",
	"\u4DA8",
	"\u4DAA",
	"\u4DB1",
	"\u4DB2",
	"\u4E07",
	"\u4E11",
	"\u4E1F",
	"\u4E22",
	"\u4E24",
	"\u4E26",
	"\u4E2A",
	"\u4E30",
	"\u4E48",
	"\u4E49",
	"\u4E50",
	"\u4E54",
	"\u4E71",
	"\u4E7E",
	"\u4E82",
	"\u4E86",
	"\u4E89",
	"\u4E8E",
	"\u4E8F",
	"\u4E91",
	"\u4E9E",
	"\u4EC5",
	"\u4EC6",
	"\u4ECE",
	"\u4EEA",
	"\u4EF7",
	"\u4F17",
	"\u4F18",
	"\u4F19",
	"\u4F1A",
	"\u4F24",
	"\u4F47",
	"\u4F53",
	"\u4F59",
	"\u4F63",
	"\u4F75",
	"\u4F86",
	"\u4F96",
	"\u4FA0",
	"\u4FA9",
	"\u4FB6",
	"\u4FC1",
	"\u4FC2",
	"\u4FD3",
	"\u4FD4",
	"\u4FE0",
	"\u4FE5",
	"\u4FE6",
	"\u5000",
	"\u5006",
	"\u5008",
	"\u5009",
	"\u500B",
	"\u5011",
	"\u501F",
	"\u502B",
	"\u5032",
	"\u5049",
	"\u5051",
	"\u5069",
	"\u506C",
	"\u5074",
	"\u5075",
	"\u507B",
	"\u507D",
	"\u508C",
	"\u5091",
	"\u5096",
	"\u5098",
	"\u5099",
	"\u50A2",
	"\u50AA",
	"\u50AD",
	"\u50AF",
	"\u50B1",
	"\u50B3",
	"\u50B4",
	"\u50B5",
	"\u50B7",
	"\u50BE",
	"\u50C0",
	"\u50C2",
	"\u50C5",
	"\u50C6",
	"\u50C9",
	"\u50CD",
	"\u50D1",
	"\u50D3",
	"\u50D5",
	"\u50D7",
	"\u50DE",
	"\u50E4",
	"\u50E5",
	"\u50E8",
	"\u50E9",
	"\u50F4",
	"\u50F9",
	"\u50FE",
	"\u5100",
	"\u5101",
	"\u5102",
	"\u5104",
	"\u5105",
	"\u5108",
	"\u5109",
	"\u5110",
	"\u5114",
	"\u5115",
	"\u5116",
	"\u5118",
	"\u511F",
	"\u5122",
	"\u5123",
	"\u5125",
	"\u5129",
	"\u512A",
	"\u5130",
	"\u5131",
	"\u5132",
	"\u5137",
	"\u5138",
	"\u5139",
	"\u513A",
	"\u513B",
	"\u513C",
	"\u513F",
	"\u514B",
	"\u514C",
	"\u5151",
	"\u5152",
	"\u5157",
	"\u515A",
	"\u5167",
	"\u5169",
	"\u5185",
	"\u518A",
	"\u518C",
	"\u51AA",
	"\u51AC",
	"\u51B2",
	"\u51B5",
	"\u51C6",
	"\u51C8",
	"\u51C9",
	"\u51CD",
	"\u51CF",
	"\u51D1",
	"\u51D4",
	"\u51D9",
	"\u51DC",
	"\u51DF",
	"\u51E0",
	"\u51E4",
	"\u51ED",
	"\u51F1",
	"\u51FA",
	"\u5212",
	"\u5218",
	"\u5220",
	"\u5225",
	"\u522A",
	"\u522B",
	"\u522E",
	"\u5236",
	"\u5239",
	"\u523E",
	"\u5244",
	"\u5247",
	"\u524B",
	"\u524E",
	"\u5257",
	"\u525B",
	"\u525D",
	"\u5267",
	"\u526E",
	"\u5274",
	"\u5275",
	"\u5278",
	"\u527E",
	"\u5283",
	"\u5287",
	"\u5289",
	"\u528A",
	"\u528C",
	"\u528D",
	"\u528F",
	"\u5291",
	"\u5297",
	"\u529A",
	"\u529D",
	"\u529E",
	"\u52A8",
	"\u52B1",
	"\u52B3",
	"\u52BF",
	"\u52C1",
	"\u52D1",
	"\u52D5",
	"\u52D9",
	"\u52DB",
	"\u52DD",
	"\u52DE",
	"\u52E2",
	"\u52E3",
	"\u52E9",
	"\u52F1",
	"\u52F4",
	"\u52F5",
	"\u52F8",
	"\u52FB",
	"\u5300",
	"\u532D",
	"\u532F",
	"\u5330",
	"\u5331",
	"\u5335",
	"\u533A",
	"\u533B",
	"\u5340",
	"\u5343",
	"\u5354",
	"\u5355",
	"\u535C",
	"\u5368",
	"\u5374",
	"\u5377",
	"\u537B",
	"\u5382",
	"\u5386",
	"\u5389",
	"\u538B",
	"\u5398",
	"\u5399",
	"\u53A0",
	"\u53A6",
	"\u53A8",
	"\u53A9",
	"\u53AD",
	"\u53AE",
	"\u53B1",
	"\u53B2",
	"\u53B4",
	"\u53C2",
	"\u53C3",
	"\u53C4",
	"\u53CC",
	"\u53D9",
	"\u53E0",
	"\u53E2",
	"\u53EA",
	"\u53F0",
	"\u53F6",
	"\u53F7",
	"\u5401",
	"\u5408",
	"\u540C",
	"\u540E",
	"\u5411",
	"\u5412",
	"\u5413",
	"\u542C",
	"\u5433",
	"\u5434",
	"\u5436",
	"\u5442",
	"\u548F",
	"\u54A4",
	"\u54B8",
	"\u54BC",
	"\u54CD",
	"\u54E1",
	"\u54EF",
	"\u5504",
	"\u550A",
	"\u5513",
	"\u551A",
	"\u553B",
	"\u554F",
	"\u5553",
	"\u555E",
	"\u555F",
	"\u5562",
	"\u5570",
	"\u558E",
	"\u559A",
	"\u55AA",
	"\u55AC",
	"\u55AE",
	"\u55B2",
	"\u55BD",
	"\u55C6",
	"\u55C7",
	"\u55CA",
	"\u55CE",
	"\u55DA",
	"\u55E7",
	"\u55E9",
	"\u55F6",
	"\u55F9",
	"\u55FF",
	"\u5604",
	"\u5606",
	"\u5607",
	"\u560D",
	"\u5613",
	"\u5614",
	"\u5616",
	"\u5617",
	"\u561C",
	"\u5629",
	"\u562A",
	"\u562E",
	"\u562F",
	"\u5630",
	"\u5631",
	"\u5633",
	"\u5635",
	"\u5638",
	"\u563A",
	"\u563D",
	"\u5641",
	"\u5645",
	"\u5653",
	"\u565A",
	"\u565D",
	"\u565E",
	"\u5660",
	"\u5665",
	"\u5666",
	"\u566F",
	"\u5672",
	"\u5674",
	"\u5678",
	"\u5679",
	"\u5680",
	"\u5682",
	"\u5687",
	"\u5688",
	"\u568C",
	"\u568D",
	"\u5690",
	"\u5695",
	"\u5699",
	"\u569B",
	"\u569D",
	"\u56A0",
	"\u56A6",
	"\u56A7",
	"\u56A8",
	"\u56A9",
	"\u56AA",
	"\u56AB",
	"\u56AC",
	"\u56AE",
	"\u56B1",
	"\u56B2",
	"\u56B3",
	"\u56B4",
	"\u56B6",
	"\u56B8",
	"\u56BD",
	"\u56BF",
	"\u56C0",
	"\u56C1",
	"\u56C2",
	"\u56C3",
	"\u56C5",
	"\u56C7",
	"\u56C8",
	"\u56C9",
	"\u56CB",
	"\u56CC",
	"\u56D0",
	"\u56D1",
	"\u56D2",
	"\u56D5",
	"\u56DE",
	"\u56EA",
	"\u56ED",
	"\u56F0",
	"\u56FE",
	"\u5707",
	"\u570B",
	"\u570D",
	"\u5712",
	"\u5713",
	"\u5716",
	"\u5718",
	"\u571E",
	"\u5742",
	"\u574F",
	"\u5757",
	"\u575B",
	"\u57B5",
	"\u57B7",
	"\u57BB",
	"\u57C9",
	"\u57E1",
	"\u57E8",
	"\u57EC",
	"\u57F0",
	"\u57F7",
	"\u5805",
	"\u5808",
	"\u580A",
	"\u5815",
	"\u5816",
	"\u581A",
	"\u581D",
	"\u582F",
	"\u5831",
	"\u5834",
	"\u584A",
	"\u584B",
	"\u584F",
	"\u5852",
	"\u5857",
	"\u5862",
	"\u5864",
	"\u5875",
	"\u5878",
	"\u5879",
	"\u587C",
	"\u587F",
	"\u5886",
	"\u588A",
	"\u588B",
	"\u588F",
	"\u589C",
	"\u589D",
	"\u58A0",
	"\u58A2",
	"\u58A7",
	"\u58AE",
	"\u58B3",
	"\u58B6",
	"\u58B7",
	"\u58BB",
	"\u58BE",
	"\u58BF",
	"\u58C7",
	"\u58C8",
	"\u58CB",
	"\u58CD",
	"\u58CF",
	"\u58D0",
	"\u58D2",
	"\u58D3",
	"\u58D4",
	"\u58D7",
	"\u58D8",
	"\u58D9",
	"\u58DA",
	"\u58DB",
	"\u58DD",
	"\u58DE",
	"\u58DF",
	"\u58E0",
	"\u58E2",
	"\u58E3",
	"\u58E7",
	"\u58E9",
	"\u58EA",
	"\u58EE",
	"\u58EF",
	"\u58F0",
	"\u58F3",
	"\u58FA",
	"\u58FC",
	"\u58FD",
	"\u590D",
	"\u591F",
	"\u5920",
	"\u5922",
	"\u5925",
	"\u5934",
	"\u5938",
	"\u593E",
	"\u5950",
	"\u5967",
	"\u5969",
	"\u596A",
	"\u596B",
	"\u596C",
	"\u596E",
	"\u596F",
	"\u5972",
	"\u5978",
	"\u597C",
	"\u599D",
	"\u59CD",
	"\u59D7",
	"\u59DC",
	"\u59E6",
	"\u59F9",
	"\u5A04",
	"\u5A07",
	"\u5A08",
	"\u5A19",
	"\u5A1B",
	"\u5A31",
	"\u5A41",
	"\u5A61",
	"\u5A66",
	"\u5A6D",
	"\u5A78",
	"\u5A81",
	"\u5A88",
	"\u5A9C",
	"\u5AA7",
	"\u5AAF",
	"\u5AB0",
	"\u5ABC",
	"\u5ABD",
	"\u5AC8",
	"\u5AD7",
	"\u5AE2",
	"\u5AE5",
	"\u5AE7",
	"\u5AF5",
	"\u5AFB",
	"\u5AFF",
	"\u5B00",
	"\u5B03",
	"\u5B05",
	"\u5B07",
	"\u5B08",
	"\u5B0B",
	"\u5B0C",
	"\u5B10",
	"\u5B12",
	"\u5B19",
	"\u5B21",
	"\u5B23",
	"\u5B24",
	"\u5B26",
	"\u5B2A",
	"\u5B2E",
	"\u5B30",
	"\u5B38",
	"\u5B3B",
	"\u5B3E",
	"\u5B44",
	"\u5B46",
	"\u5B47",
	"\u5B4B",
	"\u5B4C",
	"\u5B4E",
	"\u5B59",
	"\u5B6A",
	"\u5B6B",
	"\u5B72",
	"\u5B78",
	"\u5B7B",
	"\u5B7E",
	"\u5B7F",
	"\u5B81",
	"\u5B9D",
	"\u5B9E",
	"\u5BAE",
	"\u5BB6",
	"\u5BBE",
	"\u5BE0",
	"\u5BE2",
	"\u5BE6",
	"\u5BE7",
	"\u5BE9",
	"\u5BEA",
	"\u5BEB",
	"\u5BEC",
	"\u5BEF",
	"\u5BF5",
	"\u5BF6",
	"\u5BF7",
	"\u5BF9",
	"\u5BFF",
	"\u5C07",
	"\u5C08",
	"\u5C0B",
	"\u5C0D",
	"\u5C0E",
	"\u5C14",
	"\u5C1D",
	"\u5C35",
	"\u5C37",
	"\u5C38",
	"\u5C3D",
	"\u5C46",
	"\u5C4A",
	"\u5C4D",
	"\u5C53",
	"\u5C5C",
	"\u5C5E",
	"\u5C61",
	"\u5C62",
	"\u5C64",
	"\u5C68",
	"\u5C69",
	"\u5C6C",
	"\u5C81",
	"\u5CA1",
	"\u5CE6",
	"\u5CF4",
	"\u5CF6",
	"\u5CFD",
	"\u5D0D",
	"\u5D17",
	"\u5D19",
	"\u5D20",
	"\u5D22",
	"\u5D2C",
	"\u5D31",
	"\u5D35",
	"\u5D50",
	"\u5D77",
	"\u5D78",
	"\u5D7C",
	"\u5D7D",
	"\u5D7E",
	"\u5D81",
	"\u5D84",
	"\u5D87",
	"\u5D88",
	"\u5D94",
	"\u5D97",
	"\u5DA0",
	"\u5DA2",
	"\u5DA4",
	"\u5DA7",
	"\u5DA8",
	"\u5DA9",
	"\u5DAA",
	"\u5DAE",
	"\u5DB4",
	"\u5DB8",
	"\u5DB9",
	"\u5DBA",
	"\u5DBC",
	"\u5DBD",
	"\u5DC3",
	"\u5DC6",
	"\u5DCA",
	"\u5DCB",
	"\u5DD1",
	"\u5DD2",
	"\u5DD4",
	"\u5DD6",
	"\u5DD7",
	"\u5DD8",
	"\u5DDA",
	"\u5DE0",
	"\u5DF0",
	"\u5E08",
	"\u5E18",
	"\u5E25",
	"\u5E2B",
	"\u5E2E",
	"\u5E33",
	"\u5E34",
	"\u5E36",
	"\u5E40",
	"\u5E42",
	"\u5E43",
	"\u5E53",
	"\u5E57",
	"\u5E58",
	"\u5E5F",
	"\u5E60",
	"\u5E63",
	"\u5E69",
	"\u5E6B",
	"\u5E6C",
	"\u5E70",
	"\u5E71",
	"\u5E72",
	"\u5E76",
	"\u5E79",
	"\u5E7A",
	"\u5E7E",
	"\u5E7F",
	"\u5E84",
	"\u5E90",
	"\u5E94",
	"\u5E99",
	"\u5EAB",
	"\u5EB2",
	"\u5EC1",
	"\u5EC2",
	"\u5EC4",
	"\u5EC8",
	"\u5ECE",
	"\u5ED4",
	"\u5ED5",
	"\u5ED7",
	"\u5EDA",
	"\u5EDD",
	"\u5EDE",
	"\u5EDF",
	"\u5EE0",
	"\u5EE1",
	"\u5EE2",
	"\u5EE3",
	"\u5EE5",
	"\u5EE7",
	"\u5EE9",
	"\u5EEC",
	"\u5EEE",
	"\u5EF3",
	"\u5F00",
	"\u5F03",
	"\u5F12",
	"\u5F2F",
	"\u5F33",
	"\u5F35",
	"\u5F37",
	"\u5F39",
	"\u5F3A",
	"\u5F44",
	"\u5F46",
	"\u5F48",
	"\u5F4C",
	"\u5F4D",
	"\u5F4E",
	"\u5F52",
	"\u5F53",
	"\u5F59",
	"\u5F5E",
	"\u5F60",
	"\u5F65",
	"\u5F66",
	"\u5F72",
	"\u5F81",
	"\u5F8C",
	"\u5F91",
	"\u5F9E",
	"\u5FA0",
	"\u5FA1",
	"\u5FA9",
	"\u5FB5",
	"\u5FB9",
	"\u5FBF",
	"\u5FD7",
	"\u6000",
	"\u601C",
	"\u6046",
	"\u604B",
	"\u6052",
	"\u6065",
	"\u607C",
	"\u6085",
	"\u608F",
	"\u609E",
	"\u60B5",
	"\u60B6",
	"\u60C0",
	"\u60E1",
	"\u60E7",
	"\u60E9",
	"\u60F1",
	"\u60F2",
	"\u60FB",
	"\u6107",
	"\u611B",
	"\u611C",
	"\u6120",
	"\u6128",
	"\u6129",
	"\u6134",
	"\u6137",
	"\u613E",
	"\u613F",
	"\u6144",
	"\u614B",
	"\u614D",
	"\u6150",
	"\u6158",
	"\u6159",
	"\u615A",
	"\u615F",
	"\u6163",
	"\u6164",
	"\u616A",
	"\u616B",
	"\u616E",
	"\u616F",
	"\u6171",
	"\u6172",
	"\u6173",
	"\u6176",
	"\u6178",
	"\u6179",
	"\u617A",
	"\u6182",
	"\u618A",
	"\u618D",
	"\u6190",
	"\u6191",
	"\u6192",
	"\u6196",
	"\u619A",
	"\u61A2",
	"\u61A4",
	"\u61A6",
	"\u61AA",
	"\u61AB",
	"\u61AE",
	"\u61B2",
	"\u61B4",
	"\u61B6",
	"\u61B8",
	"\u61B9",
	"\u61C0",
	"\u61C7",
	"\u61C9",
	"\u61CC",
	"\u61CD",
	"\u61D3",
	"\u61D5",
	"\u61D8",
	"\u61D9",
	"\u61DC",
	"\u61DE",
	"\u61DF",
	"\u61E0",
	"\u61E3",
	"\u61E4",
	"\u61E7",
	"\u61E8",
	"\u61E9",
	"\u61EB",
	"\u61ED",
	"\u61F0",
	"\u61F2",
	"\u61F6",
	"\u61F7",
	"\u61F8",
	"\u61FA",
	"\u61FC",
	"\u61FE",
	"\u6200",
	"\u6201",
	"\u6203",
	"\u6207",
	"\u620F",
	"\u6214",
	"\u6218",
	"\u6220",
	"\u6227",
	"\u6229",
	"\u6230",
	"\u6231",
	"\u6232",
	"\u6236",
	"\u6237",
	"\u624D",
	"\u6251",
	"\u6267",
	"\u6298",
	"\u629B",
	"\u62A5",
	"\u62C5",
	"\u62CB",
	"\u6302",
	"\u631B",
	"\u631F",
	"\u6321",
	"\u6329",
	"\u633D",
	"\u633E",
	"\u6368",
	"\u636B",
	"\u636E",
	"\u6372",
	"\u6381",
	"\u6383",
	"\u6384",
	"\u6386",
	"\u6397",
	"\u6399",
	"\u639A",
	"\u639B",
	"\u63A1",
	"\u63B7",
	"\u63C0",
	"\u63DA",
	"\u63DB",
	"\u63EE",
	"\u63FE",
	"\u640A",
	"\u640D",
	"\u640E",
	"\u6416",
	"\u6417",
	"\u6435",
	"\u6436",
	"\u643A",
	"\u6440",
	"\u6443",
	"\u6446",
	"\u6448",
	"\u644A",
	"\u644B",
	"\u6450",
	"\u6451",
	"\u6455",
	"\u6459",
	"\u645C",
	"\u645F",
	"\u646A",
	"\u646B",
	"\u646F",
	"\u6472",
	"\u6473",
	"\u6476",
	"\u647A",
	"\u647B",
	"\u647C",
	"\u6488",
	"\u648A",
	"\u648B",
	"\u648C",
	"\u648F",
	"\u6490",
	"\u6491",
	"\u6493",
	"\u649D",
	"\u649F",
	"\u64A3",
	"\u64A5",
	"\u64A7",
	"\u64AB",
	"\u64B2",
	"\u64B3",
	"\u64B6",
	"\u64BB",
	"\u64BE",
	"\u64BF",
	"\u64C1",
	"\u64C3",
	"\u64C4",
	"\u64C7",
	"\u64C8",
	"\u64CA",
	"\u64CB",
	"\u64D3",
	"\u64D4",
	"\u64DA",
	"\u64DF",
	"\u64E0",
	"\u64E3",
	"\u64E5",
	"\u64E7",
	"\u64EA",
	"\u64EB",
	"\u64EC",
	"\u64EF",
	"\u64F0",
	"\u64F1",
	"\u64F2",
	"\u64F3",
	"\u64F4",
	"\u64F7",
	"\u64FA",
	"\u64FB",
	"\u64FC",
	"\u64FD",
	"\u64FE",
	"\u6504",
	"\u6506",
	"\u650B",
	"\u650E",
	"\u650F",
	"\u6511",
	"\u6514",
	"\u6516",
	"\u6519",
	"\u651B",
	"\u651C",
	"\u651D",
	"\u651E",
	"\u6522",
	"\u6523",
	"\u6524",
	"\u6526",
	"\u6527",
	"\u6529",
	"\u652A",
	"\u652C",
	"\u6533",
	"\u6557",
	"\u6558",
	"\u6570",
	"\u6575",
	"\u6578",
	"\u657A",
	"\u657F",
	"\u6581",
	"\u6582",
	"\u6583",
	"\u6584",
	"\u6585",
	"\u6586",
	"\u658B",
	"\u6595",
	"\u6597",
	"\u65AC",
	"\u65AD",
	"\u65B7",
	"\u65B8",
	"\u65BC",
	"\u65CB",
	"\u65DD",
	"\u65DF",
	"\u65E0",
	"\u65F6",
	"\u65F7",
	"\u661C",
	"\u663C",
	"\u6642",
	"\u6649",
	"\u664B",
	"\u6652",
	"\u665B",
	"\u665D",
	"\u6688",
	"\u6689",
	"\u6690",
	"\u6698",
	"\u669F",
	"\u66A2",
	"\u66AB",
	"\u66C4",
	"\u66C6",
	"\u66C7",
	"\u66C9",
	"\u66CA",
	"\u66CF",
	"\u66D6",
	"\u66E0",
	"\u66E5",
	"\u66E8",
	"\u66EC",
	"\u66ED",
	"\u66EE",
	"\u66F2",
	"\u66F8",
	"\u6703",
	"\u6725",
	"\u6727",
	"\u672F",
	"\u6731",
	"\u6734",
	"\u673A",
	"\u6743",
	"\u6746",
	"\u6770",
	"\u6771",
	"\u677E",
	"\u677F",
	"\u6781",
	"\u6784",
	"\u67DC",
	"\u67F5",
	"\u6800",
	"\u6805",
	"\u6807",
	"\u6816",
	"\u6817",
	"\u683E",
	"\u6871",
	"\u687F",
	"\u6894",
	"\u6896",
	"\u6898",
	"\u689C",
	"\u689D",
	"\u689F",
	"\u68A6",
	"\u68B2",
	"\u68C4",
	"\u68C6",
	"\u68D6",
	"\u68D7",
	"\u68DF",
	"\u68E1",
	"\u68E7",
	"\u68F2",
	"\u68F6",
	"\u690F",
	"\u691A",
	"\u6932",
	"\u6947",
	"\u694A",
	"\u694E",
	"\u6953",
	"\u6968",
	"\u696D",
	"\u6975",
	"\u697C",
	"\u699D",
	"\u69AA",
	"\u69AE",
	"\u69AF",
	"\u69B2",
	"\u69BF",
	"\u69CB",
	"\u69CD",
	"\u69E4",
	"\u69E7",
	"\u69E8",
	"\u69EB",
	"\u69EE",
	"\u69F3",
	"\u69F6",
	"\u69FB",
	"\u69FC",
	"\u6A01",
	"\u6A02",
	"\u6A05",
	"\u6A13",
	"\u6A19",
	"\u6A1E",
	"\u6A20",
	"\u6A22",
	"\u6A23",
	"\u6A2B",
	"\u6A32",
	"\u6A33",
	"\u6A38",
	"\u6A39",
	"\u6A3A",
	"\u6A3B",
	"\u6A3F",
	"\u6A43",
	"\u6A45",
	"\u6A48",
	"\u6A4B",
	"\u6A5A",
	"\u6A5F",
	"\u6A62",
	"\u6A68",
	"\u6A6B",
	"\u6A6F",
	"\u6A81",
	"\u6A82",
	"\u6A89",
	"\u6A8B",
	"\u6A92",
	"\u6A94",
	"\u6A9B",
	"\u6A9C",
	"\u6A9F",
	"\u6AA1",
	"\u6AA2",
	"\u6AA3",
	"\u6AA5",
	"\u6AAD",
	"\u6AAE",
	"\u6AAF",
	"\u6AB0",
	"\u6AB2",
	"\u6AB3",
	"\u6AB5",
	"\u6AB8",
	"\u6ABB",
	"\u6ABE",
	"\u6ABF",
	"\u6AC3",
	"\u6AC5",
	"\u6ACD",
	"\u6ACE",
	"\u6ACF",
	"\u6AD3",
	"\u6ADA",
	"\u6ADB",
	"\u6ADD",
	"\u6ADE",
	"\u6ADF",
	"\u6AE0",
	"\u6AE2",
	"\u6AE5",
	"\u6AE7",
	"\u6AE8",
	"\u6AE9",
	"\u6AEA",
	"\u6AEB",
	"\u6AEC",
	"\u6AEF",
	"\u6AF1",
	"\u6AF3",
	"\u6AF4",
	"\u6AF6",
	"\u6AF8",
	"\u6AF9",
	"\u6AFB",
	"\u6AFD",
	"\u6B04",
	"\u6B07",
	"\u6B0A",
	"\u6B0D",
	"\u6B0F",
	"\u6B10",
	"\u6B11",
	"\u6B12",
	"\u6B13",
	"\u6B16",
	"\u6B18",
	"\u6B1E",
	"\u6B22",
	"\u6B24",
	"\u6B3D",
	"\u6B44",
	"\u6B4D",
	"\u6B50",
	"\u6B55",
	"\u6B57",
	"\u6B5B",
	"\u6B5E",
	"\u6B5F",
	"\u6B61",
	"\u6B72",
	"\u6B77",
	"\u6B78",
	"\u6B7F",
	"\u6B98",
	"\u6B9E",
	"\u6BA1",
	"\u6BA2",
	"\u6BA4",
	"\u6BA8",
	"\u6BAB",
	"\u6BAE",
	"\u6BAF",
	"\u6BB0",
	"\u6BB2",
	"\u6BBA",
	"\u6BBB",
	"\u6BBC",
	"\u6BC0",
	"\u6BC4",
	"\u6BC6",
	"\u6BCA",
	"\u6BE1",
	"\u6BFF",
	"\u6C00",
	"\u6C02",
	"\u6C08",
	"\u6C0C",
	"\u6C14",
	"\u6C23",
	"\u6C2B",
	"\u6C2C",
	"\u6C2D",
	"\u6C33",
	"\u6C79",
	"\u6C7A",
	"\u6C84",
	"\u6C88",
	"\u6C92",
	"\u6C96",
	"\u6CA1",
	"\u6CAA",
	"\u6CC1",
	"\u6CE8",
	"\u6CEA",
	"\u6D12",
	"\u6D36",
	"\u6D3C",
	"\u6D45",
	"\u6D79",
	"\u6D7F",
	"\u6D82",
	"\u6D87",
	"\u6D9B",
	"\u6DB7",
	"\u6DBC",
	"\u6DC0",
	"\u6DDA",
	"\u6DE5",
	"\u6DEA",
	"\u6DF5",
	"\u6DF6",
	"\u6DFA",
	"\u6E0A",
	"\u6E19",
	"\u6E1B",
	"\u6E22",
	"\u6E26",
	"\u6E29",
	"\u6E2C",
	"\u6E3E",
	"\u6E4A",
	"\u6E4B",
	"\u6E5E",
	"\u6E6F",
	"\u6E7E",
	"\u6E88",
	"\u6E96",
	"\u6E9D",
	"\u6EA1",
	"\u6EA4",
	"\u6EAB",
	"\u6EAE",
	"\u6EB0",
	"\u6EB3",
	"\u6EC4",
	"\u6EC5",
	"\u6ECC",
	"\u6ECE",
	"\u6EDA",
	"\u6EE6",
	"\u6EE8",
	"\u6EE9",
	"\u6EEC",
	"\u6EED",
	"\u6EEF",
	"\u6EF2",
	"\u6EF7",
	"\u6EF8",
	"\u6EFB",
	"\u6EFE",
	"\u6EFF",
	"\u6F01",
	"\u6F0A",
	"\u6F0D",
	"\u6F0E",
	"\u6F10",
	"\u6F13",
	"\u6F19",
	"\u6F1A",
	"\u6F22",
	"\u6F23",
	"\u6F2C",
	"\u6F32",
	"\u6F35",
	"\u6F38",
	"\u6F3F",
	"\u6F41",
	"\u6F51",
	"\u6F54",
	"\u6F55",
	"\u6F59",
	"\u6F5A",
	"\u6F5B",
	"\u6F63",
	"\u6F64",
	"\u6F6C",
	"\u6F6F",
	"\u6F70",
	"\u6F77",
	"\u6F7F",
	"\u6F80",
	"\u6F85",
	"\u6F86",
	"\u6F87",
	"\u6F90",
	"\u6F92",
	"\u6F96",
	"\u6F97",
	"\u6FA0",
	"\u6FA2",
	"\u6FA4",
	"\u6FA6",
	"\u6FA9",
	"\u6FAB",
	"\u6FAC",
	"\u6FAE",
	"\u6FB0",
	"\u6FB1",
	"\u6FBE",
	"\u6FC1",
	"\u6FC3",
	"\u6FC4",
	"\u6FC6",
	"\u6FC7",
	"\u6FCA",
	"\u6FD5",
	"\u6FD8",
	"\u6FDA",
	"\u6FDB",
	"\u6FDC",
	"\u6FDF",
	"\u6FE4",
	"\u6FE7",
	"\u6FEB",
	"\u6FF0",
	"\u6FF1",
	"\u6FFA",
	"\u6FFC",
	"\u6FFE",
	"\u6FFF",
	"\u7001",
	"\u7002",
	"\u7003",
	"\u7004",
	"\u7005",
	"\u7006",
	"\u7007",
	"\u7008",
	"\u7009",
	"\u700B",
	"\u700F",
	"\u7015",
	"\u7018",
	"\u7019",
	"\u701D",
	"\u701F",
	"\u7020",
	"\u7022",
	"\u7026",
	"\u7027",
	"\u7028",
	"\u702F",
	"\u7030",
	"\u7032",
	"\u7033",
	"\u7034",
	"\u7035",
	"\u703E",
	"\u7043",
	"\u7044",
	"\u704D",
	"\u7051",
	"\u7052",
	"\u7053",
	"\u7055",
	"\u7058",
	"\u7059",
	"\u705D",
	"\u705F",
	"\u7060",
	"\u7061",
	"\u7063",
	"\u7064",
	"\u7066",
	"\u7067",
	"\u706F",
	"\u7076",
	"\u707D",
	"\u707E",
	"\u7089",
	"\u70B9",
	"\u70BA",
	"\u70CF",
	"\u70DB",
	"\u70DF",
	"\u70E9",
	"\u70EC",
	"\u70ED",
	"\u70F4",
	"\u711B",
	"\u7121",
	"\u7147",
	"\u7149",
	"\u7152",
	"\u7159",
	"\u7162",
	"\u7165",
	"\u7169",
	"\u716C",
	"\u7171",
	"\u717C",
	"\u7182",
	"\u7185",
	"\u7189",
	"\u718C",
	"\u7192",
	"\u7193",
	"\u7195",
	"\u7197",
	"\u719E",
	"\u71A1",
	"\u71B0",
	"\u71B1",
	"\u71B2",
	"\u71BE",
	"\u71C0",
	"\u71C1",
	"\u71C8",
	"\u71CC",
	"\u71D2",
	"\u71D6",
	"\u71D8",
	"\u71D9",
	"\u71DC",
	"\u71DF",
	"\u71E1",
	"\u71E6",
	"\u71ED",
	"\u71F0",
	"\u71F4",
	"\u71F5",
	"\u71F6",
	"\u71FC",
	"\u71FD",
	"\u71FE",
	"\u7201",
	"\u7203",
	"\u7204",
	"\u720D",
	"\u7210",
	"\u7213",
	"\u7216",
	"\u721B",
	"\u7223",
	"\u7225",
	"\u7227",
	"\u722D",
	"\u7232",
	"\u723A",
	"\u723E",
	"\u7246",
	"\u724B",
	"\u7258",
	"\u727C",
	"\u727D",
	"\u7285",
	"\u7293",
	"\u7296",
	"\u729E",
	"\u72A2",
	"\u72A4",
	"\u72A7",
	"\u72B9",
	"\u72C0",
	"\u72EC",
	"\u72EF",
	"\u72F9",
	"\u72FD",
	"\u730C",
	"\u730D",
	"\u7315",
	"\u7319",
	"\u7327",
	"\u732A",
	"\u732B",
	"\u732C",
	"\u732E",
	"\u7336",
	"\u733B",
	"\u7341",
	"\u7344",
	"\u7345",
	"\u734A",
	"\u734E",
	"\u7351",
	"\u7356",
	"\u735F",
	"\u7362",
	"\u7368",
	"\u7369",
	"\u736A",
	"\u736B",
	"\u736E",
	"\u7370",
	"\u7371",
	"\u7372",
	"\u7375",
	"\u7377",
	"\u7378",
	"\u7379",
	"\u737A",
	"\u737B",
	"\u737C",
	"\u7380",
	"\u7381",
	"\u7382",
	"\u73AF",
	"\u73D0",
	"\u73FC",
	"\u73FE",
	"\u7416",
	"\u743A",
	"\u743C",
	"\u743F",
	"\u744B",
	"\u7452",
	"\u7459",
	"\u7463",
	"\u7464",
	"\u7469",
	"\u746A",
	"\u7472",
	"\u747B",
	"\u747D",
	"\u7489",
	"\u748A",
	"\u7495",
	"\u7497",
	"\u749B",
	"\u749D",
	"\u74A1",
	"\u74A3",
	"\u74A6",
	"\u74AB",
	"\u74AF",
	"\u74B0",
	"\u74B5",
	"\u74B8",
	"\u74B9",
	"\u74BC",
	"\u74BD",
	"\u74BE",
	"\u74C4",
	"\u74C5",
	"\u74CA",
	"\u74CF",
	"\u74D0",
	"\u74D3",
	"\u74D4",
	"\u74D5",
	"\u74DA",
	"\u74DB",
	"\u750A",
	"\u750C",
	"\u7512",
	"\u7516",
	"\u7522",
	"\u7523",
	"\u7535",
	"\u753B",
	"\u755D",
	"\u7562",
	"\u756B",
	"\u7570",
	"\u7576",
	"\u7587",
	"\u758A",
	"\u75B1",
	"\u75B4",
	"\u75C7",
	"\u75D2",
	"\u75D9",
	"\u75EE",
	"\u75FE",
	"\u7602",
	"\u760B",
	"\u760D",
	"\u7611",
	"\u7612",
	"\u7613",
	"\u7618",
	"\u761E",
	"\u7621",
	"\u7627",
	"\u762E",
	"\u7631",
	"\u7632",
	"\u763A",
	"\u763B",
	"\u7642",
	"\u7646",
	"\u7647",
	"\u7648",
	"\u7649",
	"\u764E",
	"\u7650",
	"\u7658",
	"\u765F",
	"\u7660",
	"\u7662",
	"\u7664",
	"\u7665",
	"\u7667",
	"\u7669",
	"\u766A",
	"\u766C",
	"\u766D",
	"\u766E",
	"\u7670",
	"\u7671",
	"\u7672",
	"\u7674",
	"\u767C",
	"\u769A",
	"\u769F",
	"\u76AA",
	"\u76B0",
	"\u76B1",
	"\u76B8",
	"\u76BA",
	"\u76BE",
	"\u76D6",
	"\u76DC",
	"\u76DE",
	"\u76E1",
	"\u76E3",
	"\u76E4",
	"\u76E7",
	"\u76E8",
	"\u76EA",
	"\u7725",
	"\u7726",
	"\u773E",
	"\u7740",
	"\u774D",
	"\u774F",
	"\u7754",
	"\u775C",
	"\u775E",
	"\u776A",
	"\u7774",
	"\u7793",
	"\u7798",
	"\u779B",
	"\u779C",
	"\u779E",
	"\u77A1",
	"\u77A4",
	"\u77AD",
	"\u77AF",
	"\u77B1",
	"\u77B6",
	"\u77B7",
	"\u77BC",
	"\u77C7",
	"\u77C9",
	"\u77CA",
	"\u77D1",
	"\u77D3",
	"\u77D5",
	"\u77D6",
	"\u77D8",
	"\u77DA",
	"\u77EB",
	"\u77EF",
	"\u77F2",
	"\u7843",
	"\u785C",
	"\u7864",
	"\u7868",
	"\u786E",
	"\u786F",
	"\u788D",
	"\u7899",
	"\u78A2",
	"\u78A9",
	"\u78AD",
	"\u78B8",
	"\u78BA",
	"\u78BC",
	"\u78BD",
	"\u78D1",
	"\u78D2",
	"\u78DA",
	"\u78E0",
	"\u78E3",
	"\u78E7",
	"\u78EF",
	"\u78F1",
	"\u78F5",
	"\u78FD",
	"\u78FE",
	"\u7904",
	"\u7906",
	"\u790B",
	"\u790E",
	"\u790F",
	"\u7910",
	"\u7912",
	"\u7919",
	"\u791A",
	"\u791B",
	"\u7925",
	"\u7926",
	"\u7929",
	"\u792A",
	"\u792B",
	"\u792C",
	"\u792E",
	"\u7930",
	"\u7931",
	"\u7932",
	"\u7939",
	"\u793C",
	"\u7962",
	"\u7977",
	"\u797F",
	"\u7980",
	"\u798D",
	"\u798E",
	"\u7993",
	"\u7995",
	"\u799C",
	"\u79A1",
	"\u79A6",
	"\u79AA",
	"\u79AC",
	"\u79AE",
	"\u79AF",
	"\u79B0",
	"\u79B1",
	"\u79B5",
	"\u79BF",
	"\u79C3",
	"\u79C6",
	"\u79C8",
	"\u79CB",
	"\u79CD",
	"\u79F0",
	"\u7A05",
	"\u7A08",
	"\u7A0F",
	"\u7A1F",
	"\u7A2E",
	"\u7A31",
	"\u7A33",
	"\u7A40",
	"\u7A47",
	"\u7A4C",
	"\u7A4D",
	"\u7A4E",
	"\u7A56",
	"\u7A60",
	"\u7A61",
	"\u7A62",
	"\u7A67",
	"\u7A68",
	"\u7A69",
	"\u7A6B",
	"\u7A6C",
	"\u7A6D",
	"\u7A77",
	"\u7A83",
	"\u7AA9",
	"\u7AAA",
	"\u7AAE",
	"\u7AAF",
	"\u7AB1",
	"\u7AB5",
	"\u7AB6",
	"\u7ABA",
	"\u7AC0",
	"\u7AC4",
	"\u7AC5",
	"\u7AC7",
	"\u7AC8",
	"\u7AC9",
	"\u7ACA",
	"\u7AEA",
	"\u7AF1",
	"\u7AF6",
	"\u7B0B",
	"\u7B14",
	"\u7B46",
	"\u7B4D",
	"\u7B51",
	"\u7B67",
	"\u7B74",
	"\u7B8B",
	"\u7B8F",
	"\u7BA9",
	"\u7BB9",
	"\u7BC0",
	"\u7BC4",
	"\u7BC9",
	"\u7BCB",
	"\u7BD3",
	"\u7BD4",
	"\u7BD8",
	"\u7BE2",
	"\u7BE4",
	"\u7BE9",
	"\u7BF1",
	"\u7BF3",
	"\u7BF5",
	"\u7BF8",
	"\u7BFF",
	"\u7C00",
	"\u7C02",
	"\u7C0D",
	"\u7C1C",
	"\u7C1E",
	"\u7C21",
	"\u7C22",
	"\u7C23",
	"\u7C25",
	"\u7C2B",
	"\u7C35",
	"\u7C39",
	"\u7C3B",
	"\u7C3D",
	"\u7C3E",
	"\u7C43",
	"\u7C4B",
	"\u7C4C",
	"\u7C54",
	"\u7C59",
	"\u7C5A",
	"\u7C5B",
	"\u7C5C",
	"\u7C5F",
	"\u7C60",
	"\u7C63",
	"\u7C64",
	"\u7C66",
	"\u7C69",
	"\u7C6A",
	"\u7C6B",
	"\u7C6C",
	"\u7C6D",
	"\u7C6E",
	"\u7C6F",
	"\u7C72",
	"\u7C74",
	"\u7C9C",
	"\u7CAE",
	"\u7CAF",
	"\u7CB5",
	"\u7CBB",
	"\u7CC7",
	"\u7CDD",
	"\u7CDE",
	"\u7CE7",
	"\u7CEE",
	"\u7CF0",
	"\u7CF2",
	"\u7CF4",
	"\u7CF6",
	"\u7CF7",
	"\u7CF9",
	"\u7CFA",
	"\u7CFB",
	"\u7CFD",
	"\u7CFE",
	"\u7D00",
	"\u7D02",
	"\u7D03",
	"\u7D04",
	"\u7D05",
	"\u7D06",
	"\u7D07",
	"\u7D08",
	"\u7D09",
	"\u7D0B",
	"\u7D0C",
	"\u7D0D",
	"\u7D10",
	"\u7D11",
	"\u7D12",
	"\u7D13",
	"\u7D14",
	"\u7D15",
	"\u7D16",
	"\u7D17",
	"\u7D18",
	"\u7D19",
	"\u7D1A",
	"\u7D1B",
	"\u7D1C",
	"\u7D1D",
	"\u7D1E",
	"\u7D1F",
	"\u7D21",
	"\u7D28",
	"\u7D29",
	"\u7D2C",
	"\u7D2D",
	"\u7D2F",
	"\u7D30",
	"\u7D31",
	"\u7D32",
	"\u7D33",
	"\u7D35",
	"\u7D36",
	"\u7D38",
	"\u7D39",
	"\u7D3A",
	"\u7D3C",
	"\u7D3D",
	"\u7D3E",
	"\u7D3F",
	"\u7D40",
	"\u7D41",
	"\u7D42",
	"\u7D43",
	"\u7D44",
	"\u7D45",
	"\u7D46",
	"\u7D47",
	"\u7D4D",
	"\u7D4E",
	"\u7D50",
	"\u7D51",
	"\u7D53",
	"\u7D55",
	"\u7D56",
	"\u7D58",
	"\u7D59",
	"\u7D5A",
	"\u7D5B",
	"\u7D5D",
	"\u7D5E",
	"\u7D5F",
	"\u7D60",
	"\u7D61",
	"\u7D62",
	"\u7D63",
	"\u7D64",
	"\u7D65",
	"\u7D66",
	"\u7D67",
	"\u7D68",
	"\u7D6A",
	"\u7D6F",
	"\u7D70",
	"\u7D71",
	"\u7D72",
	"\u7D73",
	"\u7D76",
	"\u7D78",
	"\u7D79",
	"\u7D7A",
	"\u7D7B",
	"\u7D7C",
	"\u7D7D",
	"\u7D7E",
	"\u7D7F",
	"\u7D80",
	"\u7D81",
	"\u7D83",
	"\u7D84",
	"\u7D85",
	"\u7D86",
	"\u7D87",
	"\u7D88",
	"\u7D89",
	"\u7D8A",
	"\u7D8B",
	"\u7D8C",
	"\u7D8D",
	"\u7D8E",
	"\u7D8F",
	"\u7D90",
	"\u7D93",
	"\u7D95",
	"\u7D96",
	"\u7D9C",
	"\u7D9D",
	"\u7D9E",
	"\u7D9F",
	"\u7DA0",
	"\u7DA1",
	"\u7DA2",
	"\u7DA3",
	"\u7DA7",
	"\u7DAA",
	"\u7DAB",
	"\u7DAC",
	"\u7DAD",
	"\u7DAF",
	"\u7DB0",
	"\u7DB1",
	"\u7DB2",
	"\u7DB3",
	"\u7DB4",
	"\u7DB5",
	"\u7DB7",
	"\u7DB8",
	"\u7DB9",
	"\u7DBA",
	"\u7DBB",
	"\u7DBC",
	"\u7DBD",
	"\u7DBE",
	"\u7DBF",
	"\u7DC0",
	"\u7DC1",
	"\u7DC2",
	"\u7DC4",
	"\u7DC5",
	"\u7DC6",
	"\u7DC7",
	"\u7DC9",
	"\u7DCA",
	"\u7DCB",
	"\u7DCC",
	"\u7DCD",
	"\u7DCE",
	"\u7DCF",
	"\u7DD1",
	"\u7DD2",
	"\u7DD3",
	"\u7DD4",
	"\u7DD7",
	"\u7DD8",
	"\u7DD9",
	"\u7DDA",
	"\u7DDB",
	"\u7DDD",
	"\u7DDE",
	"\u7DDF",
	"\u7DE0",
	"\u7DE1",
	"\u7DE2",
	"\u7DE3",
	"\u7DE4",
	"\u7DE6",
	"\u7DE7",
	"\u7DE8",
	"\u7DE9",
	"\u7DEA",
	"\u7DEB",
	"\u7DEC",
	"\u7DEE",
	"\u7DEF",
	"\u7DF0",
	"\u7DF1",
	"\u7DF2",
	"\u7DF4",
	"\u7DF5",
	"\u7DF6",
	"\u7DF7",
	"\u7DF8",
	"\u7DF9",
	"\u7DFA",
	"\u7DFB",
	"\u7DFC",
	"\u7E08",
	"\u7E09",
	"\u7E0A",
	"\u7E0B",
	"\u7E0C",
	"\u7E0D",
	"\u7E0E",
	"\u7E10",
	"\u7E11",
	"\u7E12",
	"\u7E13",
	"\u7E15",
	"\u7E16",
	"\u7E17",
	"\u7E1A",
	"\u7E1B",
	"\u7E1C",
	"\u7E1D",
	"\u7E1E",
	"\u7E1F",
	"\u7E21",
	"\u7E23",
	"\u7E27",
	"\u7E29",
	"\u7E2A",
	"\u7E2B",
	"\u7E2C",
	"\u7E2D",
	"\u7E2E",
	"\u7E2F",
	"\u7E30",
	"\u7E31",
	"\u7E32",
	"\u7E33",
	"\u7E34",
	"\u7E35",
	"\u7E36",
	"\u7E37",
	"\u7E38",
	"\u7E39",
	"\u7E3A",
	"\u7E3C",
	"\u7E3D",
	"\u7E3E",
	"\u7E3F",
	"\u7E40",
	"\u7E42",
	"\u7E43",
	"\u7E45",
	"\u7E46",
	"\u7E48",
	"\u7E4E",
	"\u7E4F",
	"\u7E50",
	"\u7E51",
	"\u7E52",
	"\u7E53",
	"\u7E54",
	"\u7E55",
	"\u7E56",
	"\u7E57",
	"\u7E58",
	"\u7E59",
	"\u7E5A",
	"\u7E5C",
	"\u7E5E",
	"\u7E5F",
	"\u7E61",
	"\u7E62",
	"\u7E63",
	"\u7E68",
	"\u7E69",
	"\u7E6A",
	"\u7E6B",
	"\u7E6C",
	"\u7E6D",
	"\u7E6E",
	"\u7E6F",
	"\u7E70",
	"\u7E72",
	"\u7E73",
	"\u7E75",
	"\u7E76",
	"\u7E77",
	"\u7E78",
	"\u7E79",
	"\u7E7B",
	"\u7E7C",
	"\u7E7D",
	"\u7E7E",
	"\u7E7F",
	"\u7E80",
	"\u7E81",
	"\u7E83",
	"\u7E86",
	"\u7E87",
	"\u7E88",
	"\u7E8A",
	"\u7E8B",
	"\u7E8C",
	"\u7E8D",
	"\u7E8F",
	"\u7E91",
	"\u7E93",
	"\u7E94",
	"\u7E95",
	"\u7E96",
	"\u7E97",
	"\u7E98",
	"\u7E9A",
	"\u7E9C",
	"\u7F3D",
	"\u7F43",
	"\u7F46",
	"\u7F48",
	"\u7F4C",
	"\u7F4E",
	"\u7F4F",
	"\u7F51",
	"\u7F57",
	"\u7F62",
	"\u7F70",
	"\u7F75",
	"\u7F77",
	"\u7F7C",
	"\u7F82",
	"\u7F85",
	"\u7F86",
	"\u7F88",
	"\u7F8B",
	"\u7FA5",
	"\u7FA9",
	"\u7FB5",
	"\u7FD2",
	"\u7FDC",
	"\u7FEC",
	"\u7FF9",
	"\u7FFD",
	"\u7FFF",
	"\u802C",
	"\u802E",
	"\u803B",
	"\u804C",
	"\u8054",
	"\u8056",
	"\u805E",
	"\u806F",
	"\u8070",
	"\u8072",
	"\u8073",
	"\u8075",
	"\u8076",
	"\u8077",
	"\u8079",
	"\u807B",
	"\u807D",
	"\u807E",
	"\u8085",
	"\u80AE",
	"\u80B4",
	"\u80C6",
	"\u80DC",
	"\u80E1",
	"\u8105",
	"\u8108",
	"\u8109",
	"\u810D",
	"\u8114",
	"\u811A",
	"\u811B",
	"\u8125",
	"\u812B",
	"\u8139",
	"\u814A",
	"\u814E",
	"\u8156",
	"\u8161",
	"\u8166",
	"\u816A",
	"\u816B",
	"\u816D",
	"\u8173",
	"\u8178",
	"\u817C",
	"\u8183",
	"\u8191",
	"\u8192",
	"\u8195",
	"\u819A",
	"\u819E",
	"\u81A0",
	"\u81A2",
	"\u81A9",
	"\u81AE",
	"\u81B4",
	"\u81B6",
	"\u81B7",
	"\u81B9",
	"\u81BD",
	"\u81BE",
	"\u81BF",
	"\u81C7",
	"\u81C9",
	"\u81CD",
	"\u81CF",
	"\u81D7",
	"\u81D8",
	"\u81DA",
	"\u81DF",
	"\u81E0",
	"\u81E1",
	"\u81E2",
	"\u81E4",
	"\u81E8",
	"\u81F4",
	"\u81FA",
	"\u8207",
	"\u8208",
	"\u8209",
	"\u820A",
	"\u820D",
	"\u8259",
	"\u825B",
	"\u825C",
	"\u8264",
	"\u8266",
	"\u826B",
	"\u826D",
	"\u8271",
	"\u8273",
	"\u8277",
	"\u82A6",
	"\u82B8",
	"\u82BB",
	"\u82CF",
	"\u82E7",
	"\u82F9",
	"\u8303",
	"\u8332",
	"\u8346",
	"\u834A",
	"\u8350",
	"\u8363",
	"\u8385",
	"\u838A",
	"\u8396",
	"\u83A2",
	"\u83A7",
	"\u83D5",
	"\u83EF",
	"\u8407",
	"\u840A",
	"\u841D",
	"\u842C",
	"\u842F",
	"\u8434",
	"\u8435",
	"\u8449",
	"\u8452",
	"\u8457",
	"\u845D",
	"\u8464",
	"\u8466",
	"\u846F",
	"\u8471",
	"\u8477",
	"\u847B",
	"\u848D",
	"\u8492",
	"\u8493",
	"\u8494",
	"\u8499",
	"\u849E",
	"\u84AD",
	"\u84B3",
	"\u84B6",
	"\u84BC",
	"\u84C0",
	"\u84CB",
	"\u84EE",
	"\u84EF",
	"\u84F2",
	"\u84F4",
	"\u84FD",
	"\u8502",
	"\u8504",
	"\u850E",
	"\u8511",
	"\u8514",
	"\u851E",
	"\u8520",
	"\u8523",
	"\u8525",
	"\u8526",
	"\u852A",
	"\u852D",
	"\u852E",
	"\u852F",
	"\u8531",
	"\u853F",
	"\u8541",
	"\u8544",
	"\u8546",
	"\u854E",
	"\u8551",
	"\u8552",
	"\u8553",
	"\u8555",
	"\u8558",
	"\u855D",
	"\u855F",
	"\u8561",
	"\u8562",
	"\u8567",
	"\u8569",
	"\u856A",
	"\u856D",
	"\u8573",
	"\u8577",
	"\u857D",
	"\u8580",
	"\u8586",
	"\u8588",
	"\u8589",
	"\u858A",
	"\u858B",
	"\u858C",
	"\u8591",
	"\u8594",
	"\u8596",
	"\u8598",
	"\u859F",
	"\u85A0",
	"\u85A6",
	"\u85A9",
	"\u85B1",
	"\u85B2",
	"\u85B3",
	"\u85B4",
	"\u85B5",
	"\u85BA",
	"\u85C7",
	"\u85C9",
	"\u85CD",
	"\u85CE",
	"\u85D6",
	"\u85D8",
	"\u85DA",
	"\u85DD",
	"\u85E3",
	"\u85E5",
	"\u85EA",
	"\u85EC",
	"\u85ED",
	"\u85F0",
	"\u85F4",
	"\u85F6",
	"\u85F7",
	"\u85F9",
	"\u85FA",
	"\u85FE",
	"\u8600",
	"\u8604",
	"\u8606",
	"\u8607",
	"\u8608",
	"\u860A",
	"\u860B",
	"\u8616",
	"\u861A",
	"\u861E",
	"\u861F",
	"\u8621",
	"\u8622",
	"\u862B",
	"\u862C",
	"\u862D",
	"\u8631",
	"\u8635",
	"\u8639",
	"\u863A",
	"\u863F",
	"\u8645",
	"\u8646",
	"\u8649",
	"\u8655",
	"\u865B",
	"\u865C",
	"\u865F",
	"\u8666",
	"\u8667",
	"\u866B",
	"\u866C",
	"\u866F",
	"\u867E",
	"\u8681",
	"\u8695",
	"\u86EE",
	"\u86F0",
	"\u86F5",
	"\u86FA",
	"\u86FB",
	"\u86FC",
	"\u8706",
	"\u8721",
	"\u8726",
	"\u8738",
	"\u873D",
	"\u8740",
	"\u8741",
	"\u8755",
	"\u875C",
	"\u875F",
	"\u8766",
	"\u8778",
	"\u877C",
	"\u8784",
	"\u8798",
	"\u879E",
	"\u87A2",
	"\u87AE",
	"\u87B4",
	"\u87B9",
	"\u87BB",
	"\u87BF",
	"\u87C2",
	"\u87C4",
	"\u87C8",
	"\u87CE",
	"\u87D8",
	"\u87DC",
	"\u87E1",
	"\u87E3",
	"\u87E6",
	"\u87EC",
	"\u87EF",
	"\u87F1",
	"\u87F2",
	"\u87F3",
	"\u87F6",
	"\u87F7",
	"\u87FB",
	"\u87FD",
	"\u8800",
	"\u8801",
	"\u8805",
	"\u8806",
	"\u8808",
	"\u880C",
	"\u8810",
	"\u8811",
	"\u8812",
	"\u8819",
	"\u881E",
	"\u881F",
	"\u8823",
	"\u8826",
	"\u8828",
	"\u882A",
	"\u8831",
	"\u8833",
	"\u8836",
	"\u883B",
	"\u883E",
	"\u8845",
	"\u8846",
	"\u884A",
	"\u8853",
	"\u8855",
	"\u885A",
	"\u885B",
	"\u885D",
	"\u8865",
	"\u8868",
	"\u886E",
	"\u8879",
	"\u8884",
	"\u889C",
	"\u889E",
	"\u88CA",
	"\u88CC",
	"\u88CF",
	"\u88DC",
	"\u88DD",
	"\u88E1",
	"\u88F2",
	"\u88FD",
	"\u8907",
	"\u890C",
	"\u8918",
	"\u892D",
	"\u8932",
	"\u8933",
	"\u8938",
	"\u893A",
	"\u893B",
	"\u8940",
	"\u8942",
	"\u8947",
	"\u894C",
	"\u894F",
	"\u8953",
	"\u8956",
	"\u8957",
	"\u8958",
	"\u895B",
	"\u895D",
	"\u8960",
	"\u8964",
	"\u8968",
	"\u896A",
	"\u896C",
	"\u896D",
	"\u896F",
	"\u8970",
	"\u8971",
	"\u8972",
	"\u8974",
	"\u8975",
	"\u8978",
	"\u8979",
	"\u897C",
	"\u8986",
	"\u898B",
	"\u898E",
	"\u898F",
	"\u8992",
	"\u8993",
	"\u8995",
	"\u8996",
	"\u8997",
	"\u8998",
	"\u899B",
	"\u899C",
	"\u899F",
	"\u89A0",
	"\u89A1",
	"\u89A2",
	"\u89A4",
	"\u89A5",
	"\u89A6",
	"\u89A9",
	"\u89AA",
	"\u89AC",
	"\u89AD",
	"\u89AF",
	"\u89B0",
	"\u89B2",
	"\u89B4",
	"\u89B6",
	"\u89B7",
	"\u89B8",
	"\u89B9",
	"\u89BA",
	"\u89BB",
	"\u89BC",
	"\u89BD",
	"\u89BF",
	"\u89C0",
	"\u89F4",
	"\u89F6",
	"\u89F7",
	"\u89F8",
	"\u89F9",
	"\u89FB",
	"\u89FD",
	"\u8A01",
	"\u8A02",
	"\u8A03",
	"\u8A06",
	"\u8A08",
	"\u8A0A",
	"\u8A0C",
	"\u8A0E",
	"\u8A0F",
	"\u8A10",
	"\u8A11",
	"\u8A12",
	"\u8A13",
	"\u8A15",
	"\u8A16",
	"\u8A17",
	"\u8A18",
	"\u8A1B",
	"\u8A1C",
	"\u8A1D",
	"\u8A1E",
	"\u8A1F",
	"\u8A22",
	"\u8A23",
	"\u8A25",
	"\u8A26",
	"\u8A27",
	"\u8A28",
	"\u8A29",
	"\u8A2A",
	"\u8A2C",
	"\u8A2D",
	"\u8A30",
	"\u8A31",
	"\u8A34",
	"\u8A36",
	"\u8A38",
	"\u8A39",
	"\u8A3A",
	"\u8A3B",
	"\u8A3D",
	"\u8A40",
	"\u8A41",
	"\u8A43",
	"\u8A44",
	"\u8A45",
	"\u8A46",
	"\u8A47",
	"\u8A49",
	"\u8A4A",
	"\u8A4C",
	"\u8A4D",
	"\u8A4E",
	"\u8A4F",
	"\u8A50",
	"\u8A51",
	"\u8A52",
	"\u8A53",
	"\u8A54",
	"\u8A55",
	"\u8A56",
	"\u8A57",
	"\u8A58",
	"\u8A5B",
	"\u8A5C",
	"\u8A5D",
	"\u8A5E",
	"\u8A60",
	"\u8A61",
	"\u8A62",
	"\u8A63",
	"\u8A65",
	"\u8A66",
	"\u8A68",
	"\u8A69",
	"\u8A6A",
	"\u8A6B",
	"\u8A6C",
	"\u8A6D",
	"\u8A6E",
	"\u8A6F",
	"\u8A70",
	"\u8A71",
	"\u8A72",
	"\u8A73",
	"\u8A74",
	"\u8A75",
	"\u8A76",
	"\u8A77",
	"\u8A7A",
	"\u8A7B",
	"\u8A7C",
	"\u8A7F",
	"\u8A82",
	"\u8A83",
	"\u8A84",
	"\u8A85",
	"\u8A86",
	"\u8A87",
	"\u8A89",
	"\u8A8B",
	"\u8A8C",
	"\u8A8D",
	"\u8A8E",
	"\u8A8F",
	"\u8A90",
	"\u8A91",
	"\u8A92",
	"\u8A94",
	"\u8A95",
	"\u8A97",
	"\u8A98",
	"\u8A99",
	"\u8A9A",
	"\u8A9C",
	"\u8A9E",
	"\u8AA0",
	"\u8AA1",
	"\u8AA3",
	"\u8AA4",
	"\u8AA5",
	"\u8AA6",
	"\u8AA7",
	"\u8AA8",
	"\u8AAA",
	"\u8AAB",
	"\u8AAC",
	"\u8AB0",
	"\u8AB2",
	"\u8AB3",
	"\u8AB4",
	"\u8AB6",
	"\u8AB7",
	"\u8AB9",
	"\u8ABA",
	"\u8ABB",
	"\u8ABC",
	"\u8ABD",
	"\u8ABE",
	"\u8ABF",
	"\u8AC1",
	"\u8AC2",
	"\u8AC3",
	"\u8AC4",
	"\u8AC6",
	"\u8AC7",
	"\u8AC8",
	"\u8AC9",
	"\u8ACB",
	"\u8ACD",
	"\u8ACE",
	"\u8ACF",
	"\u8AD1",
	"\u8AD2",
	"\u8AD3",
	"\u8AD4",
	"\u8AD5",
	"\u8AD6",
	"\u8AD7",
	"\u8ADB",
	"\u8ADC",
	"\u8ADD",
	"\u8ADE",
	"\u8ADF",
	"\u8AE0",
	"\u8AE2",
	"\u8AE3",
	"\u8AE4",
	"\u8AE5",
	"\u8AE6",
	"\u8AE7",
	"\u8AE9",
	"\u8AEB",
	"\u8AED",
	"\u8AEE",
	"\u8AEF",
	"\u8AF0",
	"\u8AF1",
	"\u8AF2",
	"\u8AF3",
	"\u8AF4",
	"\u8AF6",
	"\u8AF7",
	"\u8AF8",
	"\u8AF9",
	"\u8AFA",
	"\u8AFB",
	"\u8AFC",
	"\u8AFE",
	"\u8B00",
	"\u8B01",
	"\u8B02",
	"\u8B04",
	"\u8B05",
	"\u8B06",
	"\u8B09",
	"\u8B0A",
	"\u8B0B",
	"\u8B0C",
	"\u8B0D",
	"\u8B0E",
	"\u8B0F",
	"\u8B10",
	"\u8B11",
	"\u8B14",
	"\u8B16",
	"\u8B17",
	"\u8B19",
	"\u8B1A",
	"\u8B1B",
	"\u8B1C",
	"\u8B1D",
	"\u8B1E",
	"\u8B1F",
	"\u8B20",
	"\u8B21",
	"\u8B23",
	"\u8B25",
	"\u8B28",
	"\u8B2B",
	"\u8B2C",
	"\u8B2D",
	"\u8B2F",
	"\u8B30",
	"\u8B31",
	"\u8B32",
	"\u8B33",
	"\u8B34",
	"\u8B35",
	"\u8B38",
	"\u8B39",
	"\u8B3B",
	"\u8B3C",
	"\u8B3E",
	"\u8B40",
	"\u8B42",
	"\u8B44",
	"\u8B45",
	"\u8B46",
	"\u8B47",
	"\u8B48",
	"\u8B49",
	"\u8B4A",
	"\u8B4C",
	"\u8B4E",
	"\u8B4F",
	"\u8B50",
	"\u8B51",
	"\u8B53",
	"\u8B54",
	"\u8B56",
	"\u8B58",
	"\u8B59",
	"\u8B5A",
	"\u8B5C",
	"\u8B5E",
	"\u8B5F",
	"\u8B60",
	"\u8B61",
	"\u8B68",
	"\u8B69",
	"\u8B6B",
	"\u8B6F",
	"\u8B70",
	"\u8B73",
	"\u8B74",
	"\u8B77",
	"\u8B78",
	"\u8B79",
	"\u8B7A",
	"\u8B7B",
	"\u8B7C",
	"\u8B7D",
	"\u8B7E",
	"\u8B7F",
	"\u8B80",
	"\u8B82",
	"\u8B85",
	"\u8B86",
	"\u8B87",
	"\u8B89",
	"\u8B8A",
	"\u8B8B",
	"\u8B8C",
	"\u8B8E",
	"\u8B91",
	"\u8B92",
	"\u8B93",
	"\u8B94",
	"\u8B95",
	"\u8B96",
	"\u8B98",
	"\u8B99",
	"\u8B9A",
	"\u8B9B",
	"\u8B9C",
	"\u8B9D",
	"\u8B9E",
	"\u8B9F",
	"\u8C37",
	"\u8C44",
	"\u8C45",
	"\u8C48",
	"\u8C4E",
	"\u8C50",
	"\u8C6C",
	"\u8C75",
	"\u8C76",
	"\u8C93",
	"\u8C97",
	"\u8C99",
	"\u8C9D",
	"\u8C9E",
	"\u8C9F",
	"\u8CA0",
	"\u8CA1",
	"\u8CA2",
	"\u8CA3",
	"\u8CA4",
	"\u8CA6",
	"\u8CA7",
	"\u8CA8",
	"\u8CA9",
	"\u8CAA",
	"\u8CAB",
	"\u8CAC",
	"\u8CAF",
	"\u8CB0",
	"\u8CB1",
	"\u8CB2",
	"\u8CB3",
	"\u8CB4",
	"\u8CB6",
	"\u8CB7",
	"\u8CB8",
	"\u8CBA",
	"\u8CBB",
	"\u8CBC",
	"\u8CBD",
	"\u8CBE",
	"\u8CBF",
	"\u8CC0",
	"\u8CC1",
	"\u8CC2",
	"\u8CC3",
	"\u8CC4",
	"\u8CC5",
	"\u8CC7",
	"\u8CC8",
	"\u8CCA",
	"\u8CD1",
	"\u8CD2",
	"\u8CD3",
	"\u8CD5",
	"\u8CD7",
	"\u8CD9",
	"\u8CDA",
	"\u8CDC",
	"\u8CDD",
	"\u8CDE",
	"\u8CDF",
	"\u8CE0",
	"\u8CE1",
	"\u8CE2",
	"\u8CE3",
	"\u8CE4",
	"\u8CE5",
	"\u8CE6",
	"\u8CE7",
	"\u8CE8",
	"\u8CEA",
	"\u8CEB",
	"\u8CEC",
	"\u8CED",
	"\u8CEE",
	"\u8CF0",
	"\u8CF4",
	"\u8CF5",
	"\u8CF6",
	"\u8CF8",
	"\u8CF9",
	"\u8CFA",
	"\u8CFB",
	"\u8CFC",
	"\u8CFD",
	"\u8CFE",
	"\u8D03",
	"\u8D04",
	"\u8D05",
	"\u8D06",
	"\u8D07",
	"\u8D08",
	"\u8D09",
	"\u8D0A",
	"\u8D0B",
	"\u8D0D",
	"\u8D0F",
	"\u8D10",
	"\u8D11",
	"\u8D13",
	"\u8D14",
	"\u8D15",
	"\u8D16",
	"\u8D17",
	"\u8D19",
	"\u8D1A",
	"\u8D1B",
	"\u8D1C",
	"\u8D6C",
	"\u8D76",
	"\u8D8B",
	"\u8D95",
	"\u8D99",
	"\u8DA8",
	"\u8DAB",
	"\u8DAC",
	"\u8DB2",
	"\u8DE1",
	"\u8E0A",
	"\u8E10",
	"\u8E1A",
	"\u8E2A",
	"\u8E34",
	"\u8E4C",
	"\u8E54",
	"\u8E55",
	"\u8E5B",
	"\u8E61",
	"\u8E63",
	"\u8E64",
	"\u8E65",
	"\u8E6A",
	"\u8E70",
	"\u8E73",
	"\u8E7A",
	"\u8E7B",
	"\u8E80",
	"\u8E82",
	"\u8E89",
	"\u8E8A",
	"\u8E8B",
	"\u8E8D",
	"\u8E8E",
	"\u8E91",
	"\u8E92",
	"\u8E93",
	"\u8E95",
	"\u8E98",
	"\u8E9A",
	"\u8E9D",
	"\u8EA1",
	"\u8EA5",
	"\u8EA6",
	"\u8EA7",
	"\u8EAA",
	"\u8EAF",
	"\u8EC0",
	"\u8EC2",
	"\u8EC3",
	"\u8EC7",
	"\u8EC9",
	"\u8ECA",
	"\u8ECB",
	"\u8ECC",
	"\u8ECD",
	"\u8ECE",
	"\u8ECF",
	"\u8ED1",
	"\u8ED2",
	"\u8ED3",
	"\u8ED4",
	"\u8ED5",
	"\u8ED6",
	"\u8ED7",
	"\u8ED8",
	"\u8EDB",
	"\u8EDC",
	"\u8EDD",
	"\u8EDE",
	"\u8EDF",
	"\u8EE4",
	"\u8EE5",
	"\u8EE7",
	"\u8EE8",
	"\u8EEB",
	"\u8EEC",
	"\u8EEE",
	"\u8EEF",
	"\u8EF1",
	"\u8EF2",
	"\u8EF3",
	"\u8EF5",
	"\u8EF7",
	"\u8EF8",
	"\u8EF9",
	"\u8EFA",
	"\u8EFB",
	"\u8EFC",
	"\u8EFE",
	"\u8EFF",
	"\u8F00",
	"\u8F01",
	"\u8F02",
	"\u8F03",
	"\u8F04",
	"\u8F05",
	"\u8F06",
	"\u8F07",
	"\u8F08",
	"\u8F09",
	"\u8F0A",
	"\u8F0B",
	"\u8F10",
	"\u8F11",
	"\u8F12",
	"\u8F13",
	"\u8F14",
	"\u8F15",
	"\u8F16",
	"\u8F17",
	"\u8F18",
	"\u8F19",
	"\u8F1A",
	"\u8F1B",
	"\u8F1C",
	"\u8F1D",
	"\u8F1E",
	"\u8F1F",
	"\u8F20",
	"\u8F21",
	"\u8F22",
	"\u8F23",
	"\u8F24",
	"\u8F25",
	"\u8F26",
	"\u8F28",
	"\u8F29",
	"\u8F2A",
	"\u8F2B",
	"\u8F2C",
	"\u8F2E",
	"\u8F2F",
	"\u8F32",
	"\u8F33",
	"\u8F34",
	"\u8F35",
	"\u8F36",
	"\u8F37",
	"\u8F38",
	"\u8F39",
	"\u8F3B",
	"\u8F3C",
	"\u8F3E",
	"\u8F3F",
	"\u8F40",
	"\u8F42",
	"\u8F43",
	"\u8F44",
	"\u8F45",
	"\u8F46",
	"\u8F47",
	"\u8F48",
	"\u8F49",
	"\u8F4A",
	"\u8F4D",
	"\u8F4E",
	"\u8F4F",
	"\u8F50",
	"\u8F51",
	"\u8F52",
	"\u8F53",
	"\u8F54",
	"\u8F55",
	"\u8F56",
	"\u8F57",
	"\u8F58",
	"\u8F59",
	"\u8F5A",
	"\u8F5B",
	"\u8F5D",
	"\u8F5E",
	"\u8F5F",
	"\u8F60",
	"\u8F61",
	"\u8F62",
	"\u8F63",
	"\u8F64",
	"\u8F65",
	"\u8F9E",
	"\u8F9F",
	"\u8FA6",
	"\u8FAD",
	"\u8FAE",
	"\u8FAF",
	"\u8FB2",
	"\u8FB9",
	"\u8FC1",
	"\u8FC7",
	"\u8FD8",
	"\u8FD9",
	"\u8FDC",
	"\u8FE9",
	"\u8FF4",
	"\u8FF9",
	"\u9002",
	"\u9009",
	"\u900A",
	"\u9012",
	"\u9015",
	"\u9019",
	"\u9023",
	"\u9032",
	"\u903B",
	"\u903F",
	"\u904B",
	"\u904E",
	"\u9054",
	"\u9055",
	"\u9059",
	"\u905C",
	"\u905E",
	"\u9060",
	"\u9069",
	"\u9070",
	"\u9071",
	"\u9072",
	"\u9076",
	"\u9077",
	"\u9078",
	"\u907A",
	"\u907C",
	"\u9081",
	"\u9084",
	"\u9087",
	"\u908A",
	"\u908F",
	"\u9090",
	"\u90C1",
	"\u90D1",
	"\u90DF",
	"\u90F2",
	"\u90F5",
	"\u9106",
	"\u9109",
	"\u9112",
	"\u9114",
	"\u9116",
	"\u911F",
	"\u9121",
	"\u9126",
	"\u9127",
	"\u9129",
	"\u912A",
	"\u912C",
	"\u912D",
	"\u912E",
	"\u9130",
	"\u9132",
	"\u9133",
	"\u9134",
	"\u9136",
	"\u913A",
	"\u9147",
	"\u9148",
	"\u9186",
	"\u9196",
	"\u919C",
	"\u919E",
	"\u91A6",
	"\u91A7",
	"\u91AB",
	"\u91AC",
	"\u91B1",
	"\u91B2",
	"\u91B3",
	"\u91B6",
	"\u91C0",
	"\u91C1",
	"\u91C3",
	"\u91C5",
	"\u91C7",
	"\u91CB",
	"\u91CC",
	"\u91D0",
	"\u91D2",
	"\u91D3",
	"\u91D4",
	"\u91D5",
	"\u91D7",
	"\u91D8",
	"\u91D9",
	"\u91DA",
	"\u91DB",
	"\u91DD",
	"\u91DF",
	"\u91E3",
	"\u91E4",
	"\u91E5",
	"\u91E6",
	"\u91E7",
	"\u91E8",
	"\u91E9",
	"\u91EA",
	"\u91EB",
	"\u91EC",
	"\u91ED",
	"\u91F1",
	"\u91F2",
	"\u91F3",
	"\u91F4",
	"\u91F5",
	"\u91F7",
	"\u91F9",
	"\u91FA",
	"\u91FD",
	"\u91FE",
	"\u91FF",
	"\u9200",
	"\u9201",
	"\u9202",
	"\u9203",
	"\u9204",
	"\u9206",
	"\u9207",
	"\u9208",
	"\u9209",
	"\u920B",
	"\u920D",
	"\u920E",
	"\u920F",
	"\u9210",
	"\u9211",
	"\u9212",
	"\u9213",
	"\u9214",
	"\u9215",
	"\u9216",
	"\u9217",
	"\u921A",
	"\u921B",
	"\u921C",
	"\u921E",
	"\u9220",
	"\u9223",
	"\u9224",
	"\u9225",
	"\u9226",
	"\u9227",
	"\u922A",
	"\u922E",
	"\u922F",
	"\u9230",
	"\u9232",
	"\u9233",
	"\u9234",
	"\u9235",
	"\u9236",
	"\u9237",
	"\u9238",
	"\u9239",
	"\u923A",
	"\u923C",
	"\u923D",
	"\u923E",
	"\u923F",
	"\u9240",
	"\u9241",
	"\u9245",
	"\u9248",
	"\u9249",
	"\u924A",
	"\u924B",
	"\u924C",
	"\u924D",
	"\u924E",
	"\u924F",
	"\u9250",
	"\u9251",
	"\u9252",
	"\u9254",
	"\u9255",
	"\u9257",
	"\u9258",
	"\u9259",
	"\u925A",
	"\u925B",
	"\u925C",
	"\u925D",
	"\u925E",
	"\u925F",
	"\u9260",
	"\u9261",
	"\u9262",
	"\u9264",
	"\u9265",
	"\u9266",
	"\u9267",
	"\u9268",
	"\u926C",
	"\u926D",
	"\u926E",
	"\u9272",
	"\u9275",
	"\u9276",
	"\u9277",
	"\u9278",
	"\u9279",
	"\u927A",
	"\u927B",
	"\u927C",
	"\u927D",
	"\u927E",
	"\u927F",
	"\u9280",
	"\u9281",
	"\u9282",
	"\u9283",
	"\u9285",
	"\u9288",
	"\u928A",
	"\u928B",
	"\u928D",
	"\u928F",
	"\u9291",
	"\u9293",
	"\u9294",
	"\u9296",
	"\u9297",
	"\u9298",
	"\u9299",
	"\u929A",
	"\u929B",
	"\u929C",
	"\u92A0",
	"\u92A1",
	"\u92A3",
	"\u92A5",
	"\u92A6",
	"\u92A7",
	"\u92A8",
	"\u92A9",
	"\u92AA",
	"\u92AB",
	"\u92AC",
	"\u92AE",
	"\u92B1",
	"\u92B2",
	"\u92B3",
	"\u92B6",
	"\u92B7",
	"\u92B8",
	"\u92B9",
	"\u92BB",
	"\u92BC",
	"\u92BE",
	"\u92C1",
	"\u92C2",
	"\u92C3",
	"\u92C5",
	"\u92C7",
	"\u92C9",
	"\u92CA",
	"\u92CB",
	"\u92CC",
	"\u92CD",
	"\u92CF",
	"\u92D0",
	"\u92D2",
	"\u92D7",
	"\u92D8",
	"\u92D9",
	"\u92DC",
	"\u92DD",
	"\u92DF",
	"\u92E0",
	"\u92E1",
	"\u92E3",
	"\u92E4",
	"\u92E5",
	"\u92E6",
	"\u92E7",
	"\u92E8",
	"\u92E9",
	"\u92EA",
	"\u92ED",
	"\u92EE",
	"\u92EF",
	"\u92F0",
	"\u92F1",
	"\u92F6",
	"\u92F8",
	"\u92F9",
	"\u92FC",
	"\u92FE",
	"\u9300",
	"\u9301",
	"\u9302",
	"\u9304",
	"\u9306",
	"\u9307",
	"\u9308",
	"\u930B",
	"\u930D",
	"\u930F",
	"\u9310",
	"\u9311",
	"\u9312",
	"\u9314",
	"\u9315",
	"\u9317",
	"\u9318",
	"\u9319",
	"\u931A",
	"\u931B",
	"\u931C",
	"\u931D",
	"\u931E",
	"\u931F",
	"\u9320",
	"\u9321",
	"\u9322",
	"\u9323",
	"\u9324",
	"\u9325",
	"\u9326",
	"\u9327",
	"\u9328",
	"\u9329",
	"\u932A",
	"\u932B",
	"\u932D",
	"\u932E",
	"\u932F",
	"\u9332",
	"\u9333",
	"\u9336",
	"\u9338",
	"\u933D",
	"\u9340",
	"\u9341",
	"\u9342",
	"\u9343",
	"\u9344",
	"\u9346",
	"\u9347",
	"\u9348",
	"\u9349",
	"\u934A",
	"\u934B",
	"\u934D",
	"\u934F",
	"\u9350",
	"\u9351",
	"\u9352",
	"\u9354",
	"\u9356",
	"\u9358",
	"\u935A",
	"\u935B",
	"\u935C",
	"\u935D",
	"\u935F",
	"\u9360",
	"\u9361",
	"\u9363",
	"\u9364",
	"\u9365",
	"\u9366",
	"\u9367",
	"\u9368",
	"\u9369",
	"\u936C",
	"\u936D",
	"\u936E",
	"\u936F",
	"\u9370",
	"\u9371",
	"\u9374",
	"\u9375",
	"\u9376",
	"\u937A",
	"\u937C",
	"\u937E",
	"\u9382",
	"\u9384",
	"\u9385",
	"\u9387",
	"\u9388",
	"\u9389",
	"\u938A",
	"\u938B",
	"\u938C",
	"\u938D",
	"\u9391",
	"\u9392",
	"\u9393",
	"\u9394",
	"\u9395",
	"\u9396",
	"\u9397",
	"\u9398",
	"\u9399",
	"\u939A",
	"\u939B",
	"\u939D",
	"\u939E",
	"\u93A1",
	"\u93A2",
	"\u93A3",
	"\u93A6",
	"\u93A7",
	"\u93A9",
	"\u93AA",
	"\u93AC",
	"\u93AE",
	"\u93AF",
	"\u93B0",
	"\u93B2",
	"\u93B3",
	"\u93B5",
	"\u93B6",
	"\u93B7",
	"\u93B8",
	"\u93BF",
	"\u93C1",
	"\u93C2",
	"\u93C3",
	"\u93C6",
	"\u93C7",
	"\u93C8",
	"\u93C9",
	"\u93CC",
	"\u93CD",
	"\u93CF",
	"\u93D0",
	"\u93D1",
	"\u93D2",
	"\u93D3",
	"\u93D4",
	"\u93D5",
	"\u93D7",
	"\u93D8",
	"\u93D9",
	"\u93DA",
	"\u93DC",
	"\u93DD",
	"\u93DE",
	"\u93DF",
	"\u93E1",
	"\u93E2",
	"\u93E4",
	"\u93E5",
	"\u93E6",
	"\u93E8",
	"\u93E9",
	"\u93F0",
	"\u93F5",
	"\u93F7",
	"\u93F8",
	"\u93F9",
	"\u93FA",
	"\u93FB",
	"\u93FD",
	"\u93FE",
	"\u9400",
	"\u9401",
	"\u9403",
	"\u9404",
	"\u9407",
	"\u9408",
	"\u9409",
	"\u940A",
	"\u940B",
	"\u940D",
	"\u940E",
	"\u940F",
	"\u9410",
	"\u9412",
	"\u9413",
	"\u9414",
	"\u9415",
	"\u9416",
	"\u9418",
	"\u9419",
	"\u941A",
	"\u941D",
	"\u9420",
	"\u9424",
	"\u9425",
	"\u9426",
	"\u9427",
	"\u9428",
	"\u9429",
	"\u942A",
	"\u942B",
	"\u942C",
	"\u942E",
	"\u942F",
	"\u9432",
	"\u9433",
	"\u9434",
	"\u9435",
	"\u9436",
	"\u9438",
	"\u9439",
	"\u943A",
	"\u943C",
	"\u943D",
	"\u943F",
	"\u9440",
	"\u9444",
	"\u9447",
	"\u9448",
	"\u9449",
	"\u944A",
	"\u944B",
	"\u944C",
	"\u944F",
	"\u9450",
	"\u9451",
	"\u9452",
	"\u9454",
	"\u9455",
	"\u9456",
	"\u9458",
	"\u9459",
	"\u945B",
	"\u945E",
	"\u9460",
	"\u9461",
	"\u9462",
	"\u9463",
	"\u9465",
	"\u9468",
	"\u946A",
	"\u946D",
	"\u946E",
	"\u946F",
	"\u9470",
	"\u9471",
	"\u9472",
	"\u9474",
	"\u9477",
	"\u9478",
	"\u9479",
	"\u947C",
	"\u947D",
	"\u947E",
	"\u947F",
	"\u9480",
	"\u9481",
	"\u9482",
	"\u9483",
	"\u9577",
	"\u9580",
	"\u9582",
	"\u9583",
	"\u9584",
	"\u9585",
	"\u9586",
	"\u9588",
	"\u9589",
	"\u958B",
	"\u958C",
	"\u958D",
	"\u958E",
	"\u958F",
	"\u9590",
	"\u9591",
	"\u9592",
	"\u9593",
	"\u9594",
	"\u9595",
	"\u9597",
	"\u9598",
	"\u959B",
	"\u959C",
	"\u959D",
	"\u959E",
	"\u959F",
	"\u95A1",
	"\u95A3",
	"\u95A4",
	"\u95A5",
	"\u95A6",
	"\u95A7",
	"\u95A8",
	"\u95A9",
	"\u95AB",
	"\u95AC",
	"\u95AD",
	"\u95AF",
	"\u95B1",
	"\u95B2",
	"\u95B5",
	"\u95B6",
	"\u95B7",
	"\u95B9",
	"\u95BB",
	"\u95BC",
	"\u95BD",
	"\u95BE",
	"\u95BF",
	"\u95C3",
	"\u95C4",
	"\u95C6",
	"\u95C7",
	"\u95C8",
	"\u95C9",
	"\u95CA",
	"\u95CB",
	"\u95CC",
	"\u95CD",
	"\u95D0",
	"\u95D1",
	"\u95D2",
	"\u95D3",
	"\u95D4",
	"\u95D5",
	"\u95D6",
	"\u95DA",
	"\u95DB",
	"\u95DC",
	"\u95DE",
	"\u95DF",
	"\u95E0",
	"\u95E1",
	"\u95E2",
	"\u95E4",
	"\u95E5",
	"\u962A",
	"\u9645",
	"\u9658",
	"\u965D",
	"\u9663",
	"\u9670",
	"\u9673",
	"\u9678",
	"\u967D",
	"\u967F",
	"\u9689",
	"\u968A",
	"\u968E",
	"\u968F",
	"\u9690",
	"\u9691",
	"\u9695",
	"\u9696",
	"\u969B",
	"\u96A4",
	"\u96A8",
	"\u96AA",
	"\u96AB",
	"\u96AE",
	"\u96AF",
	"\u96B1",
	"\u96B2",
	"\u96B4",
	"\u96B6",
	"\u96B8",
	"\u96BB",
	"\u96BD",
	"\u96BE",
	"\u96CB",
	"\u96D6",
	"\u96D9",
	"\u96DB",
	"\u96DC",
	"\u96DE",
	"\u96E2",
	"\u96E3",
	"\u96F2",
	"\u96FB",
	"\u9709",
	"\u9721",
	"\u9722",
	"\u9723",
	"\u9727",
	"\u973C",
	"\u973D",
	"\u9742",
	"\u9744",
	"\u9745",
	"\u9746",
	"\u9748",
	"\u9749",
	"\u9759",
	"\u975A",
	"\u975C",
	"\u9762",
	"\u9766",
	"\u9767",
	"\u9768",
	"\u9780",
	"\u978F",
	"\u979D",
	"\u97A6",
	"\u97B8",
	"\u97BB",
	"\u97BC",
	"\u97BD",
	"\u97BE",
	"\u97C1",
	"\u97C3",
	"\u97C6",
	"\u97C7",
	"\u97C9",
	"\u97CA",
	"\u97CB",
	"\u97CC",
	"\u97CD",
	"\u97CF",
	"\u97D0",
	"\u97D2",
	"\u97D3",
	"\u97D4",
	"\u97D7",
	"\u97D8",
	"\u97D9",
	"\u97DA",
	"\u97DB",
	"\u97DC",
	"\u97DD",
	"\u97DE",
	"\u97E0",
	"\u97E1",
	"\u97E2",
	"\u97E3",
	"\u97F5",
	"\u97FB",
	"\u97FF",
	"\u9801",
	"\u9802",
	"\u9803",
	"\u9804",
	"\u9805",
	"\u9806",
	"\u9807",
	"\u9808",
	"\u980A",
	"\u980C",
	"\u980D",
	"\u980E",
	"\u980F",
	"\u9810",
	"\u9811",
	"\u9812",
	"\u9813",
	"\u9814",
	"\u9815",
	"\u9816",
	"\u9817",
	"\u9818",
	"\u981B",
	"\u981C",
	"\u981E",
	"\u981F",
	"\u9820",
	"\u9821",
	"\u9822",
	"\u9824",
	"\u9826",
	"\u9829",
	"\u982A",
	"\u982B",
	"\u982D",
	"\u982E",
	"\u982F",
	"\u9830",
	"\u9832",
	"\u9834",
	"\u9835",
	"\u9837",
	"\u9838",
	"\u9839",
	"\u983B",
	"\u983D",
	"\u9840",
	"\u9841",
	"\u9843",
	"\u9844",
	"\u9845",
	"\u9846",
	"\u9847",
	"\u9849",
	"\u984A",
	"\u984B",
	"\u984C",
	"\u984D",
	"\u984E",
	"\u984F",
	"\u9850",
	"\u9851",
	"\u9852",
	"\u9853",
	"\u9854",
	"\u9856",
	"\u9857",
	"\u9858",
	"\u9859",
	"\u985B",
	"\u985C",
	"\u985D",
	"\u985E",
	"\u9860",
	"\u9862",
	"\u9863",
	"\u9864",
	"\u9865",
	"\u9866",
	"\u9867",
	"\u9869",
	"\u986A",
	"\u986B",
	"\u986C",
	"\u986E",
	"\u986F",
	"\u9870",
	"\u9871",
	"\u9873",
	"\u9874",
	"\u98A8",
	"\u98A9",
	"\u98AC",
	"\u98AD",
	"\u98AE",
	"\u98AF",
	"\u98B0",
	"\u98B1",
	"\u98B2",
	"\u98B3",
	"\u98B4",
	"\u98B6",
	"\u98B7",
	"\u98B8",
	"\u98B9",
	"\u98BA",
	"\u98BB",
	"\u98BC",
	"\u98BD",
	"\u98BE",
	"\u98BF",
	"\u98C0",
	"\u98C1",
	"\u98C2",
	"\u98C4",
	"\u98C6",
	"\u98C7",
	"\u98C8",
	"\u98C9",
	"\u98CB",
	"\u98CD",
	"\u98CE",
	"\u98DB",
	"\u98E0",
	"\u98E2",
	"\u98E3",
	"\u98E4",
	"\u98E5",
	"\u98E6",
	"\u98E9",
	"\u98EA",
	"\u98EB",
	"\u98ED",
	"\u98EF",
	"\u98F0",
	"\u98F2",
	"\u98F4",
	"\u98F5",
	"\u98F6",
	"\u98F7",
	"\u98FC",
	"\u98FD",
	"\u98FE",
	"\u98FF",
	"\u9900",
	"\u9902",
	"\u9903",
	"\u9904",
	"\u9905",
	"\u9909",
	"\u990A",
	"\u990C",
	"\u990E",
	"\u990F",
	"\u9911",
	"\u9912",
	"\u9913",
	"\u9914",
	"\u9915",
	"\u9916",
	"\u9917",
	"\u9918",
	"\u991A",
	"\u991B",
	"\u991C",
	"\u991E",
	"\u991F",
	"\u9921",
	"\u9922",
	"\u9923",
	"\u9924",
	"\u9926",
	"\u9927",
	"\u9928",
	"\u9929",
	"\u992A",
	"\u992B",
	"\u992C",
	"\u992D",
	"\u992F",
	"\u9930",
	"\u9931",
	"\u9932",
	"\u9933",
	"\u9934",
	"\u9935",
	"\u9936",
	"\u9937",
	"\u9938",
	"\u9939",
	"\u993A",
	"\u993C",
	"\u993E",
	"\u993F",
	"\u9940",
	"\u9941",
	"\u9943",
	"\u9945",
	"\u9946",
	"\u9947",
	"\u9948",
	"\u9949",
	"\u994A",
	"\u994B",
	"\u994C",
	"\u994E",
	"\u9950",
	"\u9951",
	"\u9952",
	"\u9957",
	"\u9958",
	"\u9959",
	"\u995B",
	"\u995C",
	"\u995E",
	"\u995F",
	"\u9960",
	"\u9961",
	"\u9962",
	"\u99A9",
	"\u99AC",
	"\u99AD",
	"\u99AE",
	"\u99AF",
	"\u99B1",
	"\u99B2",
	"\u99B3",
	"\u99B4",
	"\u99B5",
	"\u99B9",
	"\u99BA",
	"\u99BC",
	"\u99BD",
	"\u99C1",
	"\u99C2",
	"\u99C3",
	"\u99C9",
	"\u99CA",
	"\u99CD",
	"\u99CE",
	"\u99CF",
	"\u99D0",
	"\u99D1",
	"\u99D2",
	"\u99D3",
	"\u99D4",
	"\u99D5",
	"\u99D7",
	"\u99D8",
	"\u99D9",
	"\u99DA",
	"\u99DB",
	"\u99DC",
	"\u99DD",
	"\u99DE",
	"\u99DF",
	"\u99E1",
	"\u99E2",
	"\u99E3",
	"\u99E4",
	"\u99E5",
	"\u99E7",
	"\u99E9",
	"\u99EA",
	"\u99EB",
	"\u99EC",
	"\u99ED",
	"\u99EE",
	"\u99F0",
	"\u99F1",
	"\u99F4",
	"\u99F6",
	"\u99F7",
	"\u99F8",
	"\u99F9",
	"\u99FA",
	"\u99FB",
	"\u99FC",
	"\u99FD",
	"\u99FE",
	"\u99FF",
	"\u9A00",
	"\u9A01",
	"\u9A02",
	"\u9A03",
	"\u9A04",
	"\u9A05",
	"\u9A07",
	"\u9A09",
	"\u9A0A",
	"\u9A0B",
	"\u9A0C",
	"\u9A0D",
	"\u9A0E",
	"\u9A0F",
	"\u9A11",
	"\u9A14",
	"\u9A15",
	"\u9A16",
	"\u9A17",
	"\u9A19",
	"\u9A1A",
	"\u9A1C",
	"\u9A1D",
	"\u9A1E",
	"\u9A1F",
	"\u9A20",
	"\u9A22",
	"\u9A23",
	"\u9A24",
	"\u9A25",
	"\u9A27",
	"\u9A29",
	"\u9A2A",
	"\u9A2B",
	"\u9A2C",
	"\u9A2D",
	"\u9A2E",
	"\u9A2F",
	"\u9A30",
	"\u9A31",
	"\u9A32",
	"\u9A33",
	"\u9A34",
	"\u9A35",
	"\u9A36",
	"\u9A37",
	"\u9A38",
	"\u9A39",
	"\u9A3A",
	"\u9A3B",
	"\u9A3C",
	"\u9A3D",
	"\u9A3E",
	"\u9A40",
	"\u9A41",
	"\u9A42",
	"\u9A43",
	"\u9A44",
	"\u9A45",
	"\u9A48",
	"\u9A49",
	"\u9A4A",
	"\u9A4B",
	"\u9A4C",
	"\u9A4D",
	"\u9A4E",
	"\u9A4F",
	"\u9A50",
	"\u9A52",
	"\u9A53",
	"\u9A54",
	"\u9A55",
	"\u9A56",
	"\u9A57",
	"\u9A59",
	"\u9A5A",
	"\u9A5B",
	"\u9A5E",
	"\u9A5F",
	"\u9A60",
	"\u9A61",
	"\u9A62",
	"\u9A64",
	"\u9A65",
	"\u9A66",
	"\u9A68",
	"\u9A69",
	"\u9A6A",
	"\u9A6B",
	"\u9AAF",
	"\u9ACF",
	"\u9AD0",
	"\u9AD2",
	"\u9AD4",
	"\u9AD5",
	"\u9AD6",
	"\u9AEE",
	"\u9B06",
	"\u9B0D",
	"\u9B16",
	"\u9B17",
	"\u9B1A",
	"\u9B1C",
	"\u9B1D",
	"\u9B1E",
	"\u9B20",
	"\u9B21",
	"\u9B22",
	"\u9B25",
	"\u9B27",
	"\u9B29",
	"\u9B2E",
	"\u9B31",
	"\u9B39",
	"\u9B3A",
	"\u9B4E",
	"\u9B57",
	"\u9B58",
	"\u9B5A",
	"\u9B5B",
	"\u9B5C",
	"\u9B5D",
	"\u9B5F",
	"\u9B60",
	"\u9B61",
	"\u9B62",
	"\u9B63",
	"\u9B65",
	"\u9B66",
	"\u9B67",
	"\u9B68",
	"\u9B6A",
	"\u9B6B",
	"\u9B6C",
	"\u9B6D",
	"\u9B6E",
	"\u9B6F",
	"\u9B71",
	"\u9B74",
	"\u9B75",
	"\u9B76",
	"\u9B77",
	"\u9B7A",
	"\u9B7B",
	"\u9B7C",
	"\u9B7D",
	"\u9B7E",
	"\u9B80",
	"\u9B81",
	"\u9B82",
	"\u9B83",
	"\u9B84",
	"\u9B85",
	"\u9B86",
	"\u9B87",
	"\u9B88",
	"\u9B8A",
	"\u9B8B",
	"\u9B8C",
	"\u9B8D",
	"\u9B8E",
	"\u9B8F",
	"\u9B90",
	"\u9B91",
	"\u9B92",
	"\u9B93",
	"\u9B97",
	"\u9B98",
	"\u9B9A",
	"\u9B9B",
	"\u9B9C",
	"\u9B9D",
	"\u9B9E",
	"\u9B9F",
	"\u9BA0",
	"\u9BA1",
	"\u9BA3",
	"\u9BA4",
	"\u9BA5",
	"\u9BA6",
	"\u9BA7",
	"\u9BA8",
	"\u9BAA",
	"\u9BAB",
	"\u9BAC",
	"\u9BAD",
	"\u9BAE",
	"\u9BAF",
	"\u9BB0",
	"\u9BB3",
	"\u9BB5",
	"\u9BB6",
	"\u9BB7",
	"\u9BB8",
	"\u9BB9",
	"\u9BBA",
	"\u9BBB",
	"\u9BBF",
	"\u9BC0",
	"\u9BC1",
	"\u9BC4",
	"\u9BC5",
	"\u9BC6",
	"\u9BC7",
	"\u9BC8",
	"\u9BC9",
	"\u9BCA",
	"\u9BCC",
	"\u9BD2",
	"\u9BD4",
	"\u9BD5",
	"\u9BD6",
	"\u9BD7",
	"\u9BDA",
	"\u9BDB",
	"\u9BDD",
	"\u9BDE",
	"\u9BE0",
	"\u9BE1",
	"\u9BE2",
	"\u9BE4",
	"\u9BE5",
	"\u9BE6",
	"\u9BE7",
	"\u9BE8",
	"\u9BE9",
	"\u9BEA",
	"\u9BEB",
	"\u9BEC",
	"\u9BEE",
	"\u9BF0",
	"\u9BF1",
	"\u9BF4",
	"\u9BF6",
	"\u9BF7",
	"\u9BF8",
	"\u9BF9",
	"\u9BFB",
	"\u9BFC",
	"\u9BFD",
	"\u9BFE",
	"\u9BFF",
	"\u9C01",
	"\u9C02",
	"\u9C03",
	"\u9C05",
	"\u9C06",
	"\u9C07",
	"\u9C08",
	"\u9C09",
	"\u9C0A",
	"\u9C0B",
	"\u9C0C",
	"\u9C0D",
	"\u9C0F",
	"\u9C10",
	"\u9C11",
	"\u9C12",
	"\u9C13",
	"\u9C15",
	"\u9C17",
	"\u9C1B",
	"\u9C1C",
	"\u9C1D",
	"\u9C1F",
	"\u9C20",
	"\u9C21",
	"\u9C23",
	"\u9C24",
	"\u9C25",
	"\u9C26",
	"\u9C27",
	"\u9C28",
	"\u9C29",
	"\u9C2B",
	"\u9C2C",
	"\u9C2D",
	"\u9C2E",
	"\u9C2F",
	"\u9C31",
	"\u9C32",
	"\u9C33",
	"\u9C34",
	"\u9C35",
	"\u9C36",
	"\u9C37",
	"\u9C39",
	"\u9C3A",
	"\u9C3B",
	"\u9C3C",
	"\u9C3D",
	"\u9C3E",
	"\u9C3F",
	"\u9C40",
	"\u9C41",
	"\u9C42",
	"\u9C43",
	"\u9C44",
	"\u9C45",
	"\u9C46",
	"\u9C47",
	"\u9C48",
	"\u9C49",
	"\u9C4A",
	"\u9C4B",
	"\u9C4C",
	"\u9C4D",
	"\u9C4E",
	"\u9C4F",
	"\u9C50",
	"\u9C51",
	"\u9C52",
	"\u9C53",
	"\u9C54",
	"\u9C55",
	"\u9C56",
	"\u9C57",
	"\u9C58",
	"\u9C5A",
	"\u9C5D",
	"\u9C5E",
	"\u9C5F",
	"\u9C60",
	"\u9C62",
	"\u9C63",
	"\u9C64",
	"\u9C65",
	"\u9C66",
	"\u9C67",
	"\u9C68",
	"\u9C6C",
	"\u9C6D",
	"\u9C6E",
	"\u9C6F",
	"\u9C72",
	"\u9C74",
	"\u9C75",
	"\u9C77",
	"\u9C78",
	"\u9C79",
	"\u9C7A",
	"\u9C7B",
	"\u9CE5",
	"\u9CE6",
	"\u9CE7",
	"\u9CE9",
	"\u9CEC",
	"\u9CED",
	"\u9CF1",
	"\u9CF2",
	"\u9CF3",
	"\u9CF4",
	"\u9CF6",
	"\u9CF7",
	"\u9CF8",
	"\u9CFA",
	"\u9CFB",
	"\u9CFC",
	"\u9CFD",
	"\u9CFE",
	"\u9CFF",
	"\u9D00",
	"\u9D01",
	"\u9D02",
	"\u9D03",
	"\u9D05",
	"\u9D06",
	"\u9D07",
	"\u9D09",
	"\u9D0D",
	"\u9D10",
	"\u9D12",
	"\u9D13",
	"\u9D14",
	"\u9D15",
	"\u9D17",
	"\u9D18",
	"\u9D19",
	"\u9D1A",
	"\u9D1B",
	"\u9D1C",
	"\u9D1D",
	"\u9D1E",
	"\u9D1F",
	"\u9D20",
	"\u9D21",
	"\u9D22",
	"\u9D23",
	"\u9D25",
	"\u9D26",
	"\u9D28",
	"\u9D29",
	"\u9D2E",
	"\u9D2F",
	"\u9D30",
	"\u9D31",
	"\u9D32",
	"\u9D33",
	"\u9D34",
	"\u9D36",
	"\u9D37",
	"\u9D38",
	"\u9D39",
	"\u9D3A",
	"\u9D3B",
	"\u9D3D",
	"\u9D3E",
	"\u9D3F",
	"\u9D40",
	"\u9D41",
	"\u9D42",
	"\u9D43",
	"\u9D44",
	"\u9D45",
	"\u9D4A",
	"\u9D4B",
	"\u9D4C",
	"\u9D4E",
	"\u9D4F",
	"\u9D50",
	"\u9D51",
	"\u9D52",
	"\u9D53",
	"\u9D54",
	"\u9D55",
	"\u9D56",
	"\u9D57",
	"\u9D59",
	"\u9D5A",
	"\u9D5B",
	"\u9D5C",
	"\u9D5D",
	"\u9D5F",
	"\u9D60",
	"\u9D61",
	"\u9D67",
	"\u9D69",
	"\u9D6A",
	"\u9D6B",
	"\u9D6C",
	"\u9D6E",
	"\u9D6F",
	"\u9D70",
	"\u9D71",
	"\u9D72",
	"\u9D73",
	"\u9D74",
	"\u9D75",
	"\u9D76",
	"\u9D77",
	"\u9D78",
	"\u9D79",
	"\u9D7B",
	"\u9D7C",
	"\u9D7D",
	"\u9D7E",
	"\u9D80",
	"\u9D82",
	"\u9D83",
	"\u9D84",
	"\u9D85",
	"\u9D86",
	"\u9D87",
	"\u9D89",
	"\u9D8A",
	"\u9D8B",
	"\u9D8C",
	"\u9D92",
	"\u9D93",
	"\u9D94",
	"\u9D95",
	"\u9D96",
	"\u9D97",
	"\u9D98",
	"\u9D99",
	"\u9D9A",
	"\u9D9B",
	"\u9D9D",
	"\u9D9E",
	"\u9D9F",
	"\u9DA0",
	"\u9DA1",
	"\u9DA2",
	"\u9DA3",
	"\u9DA4",
	"\u9DA5",
	"\u9DA6",
	"\u9DA8",
	"\u9DA9",
	"\u9DAA",
	"\u9DAC",
	"\u9DAD",
	"\u9DAF",
	"\u9DB0",
	"\u9DB1",
	"\u9DB2",
	"\u9DB4",
	"\u9DB5",
	"\u9DB6",
	"\u9DB7",
	"\u9DB9",
	"\u9DBA",
	"\u9DBB",
	"\u9DBC",
	"\u9DBD",
	"\u9DC0",
	"\u9DC1",
	"\u9DC2",
	"\u9DC3",
	"\u9DC4",
	"\u9DC5",
	"\u9DC7",
	"\u9DC8",
	"\u9DC9",
	"\u9DCA",
	"\u9DCB",
	"\u9DCE",
	"\u9DCF",
	"\u9DD0",
	"\u9DD1",
	"\u9DD2",
	"\u9DD3",
	"\u9DD4",
	"\u9DD5",
	"\u9DD6",
	"\u9DD7",
	"\u9DD9",
	"\u9DDA",
	"\u9DDB",
	"\u9DDC",
	"\u9DDE",
	"\u9DDF",
	"\u9DE2",
	"\u9DE3",
	"\u9DE4",
	"\u9DE5",
	"\u9DE6",
	"\u9DE7",
	"\u9DE8",
	"\u9DE9",
	"\u9DEB",
	"\u9DED",
	"\u9DEE",
	"\u9DEF",
	"\u9DF0",
	"\u9DF2",
	"\u9DF3",
	"\u9DF5",
	"\u9DF6",
	"\u9DF7",
	"\u9DF8",
	"\u9DF9",
	"\u9DFA",
	"\u9DFD",
	"\u9DFE",
	"\u9DFF",
	"\u9E00",
	"\u9E01",
	"\u9E02",
	"\u9E03",
	"\u9E04",
	"\u9E05",
	"\u9E06",
	"\u9E07",
	"\u9E09",
	"\u9E0A",
	"\u9E0B",
	"\u9E0C",
	"\u9E0E",
	"\u9E0F",
	"\u9E10",
	"\u9E11",
	"\u9E12",
	"\u9E13",
	"\u9E15",
	"\u9E16",
	"\u9E17",
	"\u9E18",
	"\u9E19",
	"\u9E1A",
	"\u9E1B",
	"\u9E1C",
	"\u9E1D",
	"\u9E1E",
	"\u9E75",
	"\u9E79",
	"\u9E7A",
	"\u9E7C",
	"\u9E7D",
	"\u9E97",
	"\u9EA1",
	"\u9EA5",
	"\u9EA6",
	"\u9EA7",
	"\u9EA8",
	"\u9EA9",
	"\u9EAC",
	"\u9EAE",
	"\u9EAF",
	"\u9EB0",
	"\u9EB1",
	"\u9EB2",
	"\u9EB3",
	"\u9EB4",
	"\u9EB5",
	"\u9EB7",
	"\u9EBC",
	"\u9EBD",
	"\u9EC2",
	"\u9EC3",
	"\u9EC4",
	"\u9ECC",
	"\u9EDE",
	"\u9EE8",
	"\u9EF2",
	"\u9EF4",
	"\u9EF6",
	"\u9EF7",
	"\u9EF8",
	"\u9EFD",
	"\u9EFE",
	"\u9EFF",
	"\u9F00",
	"\u9F01",
	"\u9F04",
	"\u9F05",
	"\u9F06",
	"\u9F08",
	"\u9F09",
	"\u9F0A",
	"\u9F15",
	"\u9F17",
	"\u9F1A",
	"\u9F32",
	"\u9F34",
	"\u9F39",
	"\u9F48",
	"\u9F4A",
	"\u9F4B",
	"\u9F4C",
	"\u9F4D",
	"\u9F4E",
	"\u9F4F",
	"\u9F52",
	"\u9F54",
	"\u9F55",
	"\u9F56",
	"\u9F57",
	"\u9F58",
	"\u9F59",
	"\u9F5A",
	"\u9F5C",
	"\u9F5D",
	"\u9F5E",
	"\u9F5F",
	"\u9F60",
	"\u9F61",
	"\u9F63",
	"\u9F64",
	"\u9F65",
	"\u9F66",
	"\u9F67",
	"\u9F69",
	"\u9F6A",
	"\u9F6C",
	"\u9F6D",
	"\u9F6E",
	"\u9F6F",
	"\u9F70",
	"\u9F71",
	"\u9F72",
	"\u9F73",
	"\u9F74",
	"\u9F75",
	"\u9F76",
	"\u9F77",
	"\u9F78",
	"\u9F79",
	"\u9F7A",
	"\u9F7B",
	"\u9F7C",
	"\u9F7D",
	"\u9F7E",
	"\u9F8D",
	"\u9F8E",
	"\u9F8F",
	"\u9F90",
	"\u9F91",
	"\u9F93",
	"\u9F94",
	"\u9F95",
	"\u9F96",
	"\u9F9C",
	"\u9F9D",
	"\u9F9E",
	"\u9F9F",
	"\u9FA5",
	"\u9FAD",
	"\u9FAF",
	"\u9FB2",
	"\u9FBB",
	"\u9FBD",
	"\u9FC1",
	"\u9FD0",
	"\u9FD3",
	"\u9FE0",
	"\u9FF3",
	"\u20054",
	"\u2005E",
	"\u20325",
	"\u20385",
	"\u20392",
	"\u203E2",
	"\u203EE",
	"\u20407",
	"\u2040A",
	"\u2040D",
	"\u2042E",
	"\u2043D",
	"\u20447",
	"\u20459",
	"\u20472",
	"\u205AB",
	"\u205FF",
	"\u20625",
	"\u20732",
	"\u2077F",
	"\u20786",
	"\u207AD",
	"\u207EA",
	"\u2080E",
	"\u2080F",
	"\u2081D",
	"\u2082B",
	"\u20A58",
	"\u20A6C",
	"\u20B19",
	"\u20D54",
	"\u20D58",
	"\u20D79",
	"\u20DB8",
	"\u20DB9",
	"\u20DCC",
	"\u20DCF",
	"\u20E5B",
	"\u20E96",
	"\u20EAE",
	"\u20F17",
	"\u20F24",
	"\u20F2E",
	"\u20F48",
	"\u20F78",
	"\u20FAC",
	"\u20FD5",
	"\u20FD8",
	"\u20FFF",
	"\u21020",
	"\u2103F",
	"\u2105A",
	"\u2106F",
	"\u21092",
	"\u210A1",
	"\u210BF",
	"\u210C4",
	"\u210C8",
	"\u210E4",
	"\u21114",
	"\u21116",
	"\u21123",
	"\u21124",
	"\u21129",
	"\u2114F",
	"\u21158",
	"\u21165",
	"\u21167",
	"\u2136B",
	"\u2144D",
	"\u2144E",
	"\u2146D",
	"\u2146F",
	"\u214B6",
	"\u214C1",
	"\u214D7",
	"\u214E6",
	"\u214FE",
	"\u215C6",
	"\u217B5",
	"\u217EB",
	"\u2181A",
	"\u21839",
	"\u21883",
	"\u21898",
	"\u218BF",
	"\u218E8",
	"\u21920",
	"\u21921",
	"\u2192B",
	"\u21B89",
	"\u21BA3",
	"\u21BA4",
	"\u21CF3",
	"\u21DE8",
	"\u21E17",
	"\u21E6C",
	"\u21EA0",
	"\u21EA8",
	"\u21F31",
	"\u21F3E",
	"\u21F57",
	"\u21F73",
	"\u21F75",
	"\u21F86",
	"\u21FB1",
	"\u21FD6",
	"\u22113",
	"\u2213C",
	"\u22161",
	"\u22163",
	"\u2227F",
	"\u22283",
	"\u22370",
	"\u22417",
	"\u22569",
	"\u22595",
	"\u226D4",
	"\u2272D",
	"\u22830",
	"\u2283C",
	"\u22880",
	"\u228CF",
	"\u228D0",
	"\u228DA",
	"\u228ED",
	"\u2290C",
	"\u2291C",
	"\u22927",
	"\u22929",
	"\u22931",
	"\u2293F",
	"\u22960",
	"\u22BE6",
	"\u22BE9",
	"\u22BF7",
	"\u22C61",
	"\u22C90",
	"\u22CA9",
	"\u22CAB",
	"\u22CB8",
	"\u22CBE",
	"\u22CC2",
	"\u22CDA",
	"\u22D26",
	"\u22D29",
	"\u22D63",
	"\u22D91",
	"\u22D92",
	"\u22DAB",
	"\u22DC3",
	"\u22DCF",
	"\u22DDE",
	"\u22DEE",
	"\u22E01",
	"\u22E14",
	"\u22E19",
	"\u22E33",
	"\u22E34",
	"\u22E38",
	"\u22E4F",
	"\u22E65",
	"\u22E7C",
	"\u22E7F",
	"\u22E8E",
	"\u22EB3",
	"\u22FD3",
	"\u22FE1",
	"\u23018",
	"\u23037",
	"\u2303B",
	"\u23138",
	"\u23236",
	"\u232AF",
	"\u232CB",
	"\u232DE",
	"\u23302",
	"\u23350",
	"\u23384",
	"\u2339C",
	"\u2353F",
	"\u2364E",
	"\u2367F",
	"\u23699",
	"\u236E3",
	"\u23755",
	"\u23781",
	"\u23790",
	"\u237BB",
	"\u23815",
	"\u23829",
	"\u23832",
	"\u2384C",
	"\u23876",
	"\u2390B",
	"\u2393F",
	"\u23A55",
	"\u23AD2",
	"\u23BE9",
	"\u23BF4",
	"\u23BF6",
	"\u23C1B",
	"\u23C28",
	"\u23D07",
	"\u23DAF",
	"\u23ECF",
	"\u23ED1",
	"\u23F0A",
	"\u23F29",
	"\u23F4F",
	"\u23FB7",
	"\u23FC9",
	"\u2402A",
	"\u24063",
	"\u2406A",
	"\u24119",
	"\u24137",
	"\u24159",
	"\u24169",
	"\u24177",
	"\u241FE",
	"\u24356",
	"\u2435C",
	"\u243A4",
	"\u243B1",
	"\u243D0",
	"\u24473",
	"\u24479",
	"\u2448E",
	"\u244A6",
	"\u244BB",
	"\u244CC",
	"\u244CE",
	"\u244D3",
	"\u24600",
	"\u246EE",
	"\u246F1",
	"\u24706",
	"\u247E4",
	"\u24814",
	"\u2482E",
	"\u24872",
	"\u2489F",
	"\u248CE",
	"\u248E4",
	"\u2496D",
	"\u24A42",
	"\u24AA4",
	"\u24ABA",
	"\u24AE9",
	"\u24B05",
	"\u24BA6",
	"\u24C93",
	"\u24CA2",
	"\u24CF7",
	"\u24CF8",
	"\u24DC3",
	"\u24DFD",
	"\u24E2B",
	"\u24E89",
	"\u24E94",
	"\u24EDC",
	"\u24EDD",
	"\u24EF2",
	"\u24F08",
	"\u24F89",
	"\u2502C",
	"\u25032",
	"\u250AB",
	"\u250B8",
	"\u251D4",
	"\u25278",
	"\u252DD",
	"\u25303",
	"\u2531A",
	"\u253DD",
	"\u25502",
	"\u25565",
	"\u25585",
	"\u2558F",
	"\u255A9",
	"\u255B2",
	"\u255C7",
	"\u255F4",
	"\u255F9",
	"\u255FA",
	"\u255FD",
	"\u25603",
	"\u25710",
	"\u25730",
	"\u257B5",
	"\u2588A",
	"\u258A2",
	"\u258B6",
	"\u258B7",
	"\u25A10",
	"\u25A82",
	"\u25BE4",
	"\u25C78",
	"\u25CCA",
	"\u25D28",
	"\u25D3C",
	"\u25D43",
	"\u25D4A",
	"\u25D5B",
	"\u25D5C",
	"\u25D5D",
	"\u25E20",
	"\u25EBC",
	"\u25EE4",
	"\u25EE6",
	"\u25EF5",
	"\u25F36",
	"\u25F3D",
	"\u25F56",
	"\u25F6D",
	"\u25F7D",
	"\u25F82",
	"\u25F9D",
	"\u25FAF",
	"\u25FC9",
	"\u25FCA",
	"\u25FEF",
	"\u2600E",
	"\u26016",
	"\u26044",
	"\u26055",
	"\u26067",
	"\u26085",
	"\u2608B",
	"\u260C4",
	"\u260D2",
	"\u260D8",
	"\u260E9",
	"\u2610B",
	"\u2610D",
	"\u26127",
	"\u2613C",
	"\u26147",
	"\u26148",
	"\u2614B",
	"\u26158",
	"\u26177",
	"\u26186",
	"\u26188",
	"\u261B2",
	"\u261CE",
	"\u261DB",
	"\u2633E",
	"\u26346",
	"\u263B9",
	"\u263D1",
	"\u26480",
	"\u26516",
	"\u26627",
	"\u26716",
	"\u2679B",
	"\u267D0",
	"\u267FC",
	"\u26805",
	"\u2684F",
	"\u26856",
	"\u2685D",
	"\u26867",
	"\u26876",
	"\u26888",
	"\u268C7",
	"\u268CE",
	"\u2696F",
	"\u269F4",
	"\u269FA",
	"\u26AAD",
	"\u26ABD",
	"\u26C4C",
	"\u26CDD",
	"\u26D55",
	"\u26D86",
	"\u26E37",
	"\u26EA3",
	"\u26F52",
	"\u26F8F",
	"\u26FB5",
	"\u26FB6",
	"\u26FCD",
	"\u2707F",
	"\u27085",
	"\u270FD",
	"\u27355",
	"\u273FB",
	"\u27410",
	"\u27431",
	"\u27496",
	"\u274AF",
	"\u27525",
	"\u2755F",
	"\u27566",
	"\u275A6",
	"\u276F8",
	"\u27701",
	"\u27702",
	"\u27717",
	"\u27723",
	"\u27735",
	"\u27736",
	"\u2775E",
	"\u27785",
	"\u27794",
	"\u277A3",
	"\u277AB",
	"\u277B6",
	"\u277CC",
	"\u27808",
	"\u27825",
	"\u27835",
	"\u2784D",
	"\u2786A",
	"\u27874",
	"\u27878",
	"\u27883",
	"\u27884",
	"\u2788D",
	"\u278A2",
	"\u278F4",
	"\u27963",
	"\u2797A",
	"\u2799D",
	"\u279A6",
	"\u279A7",
	"\u279AD",
	"\u279DD",
	"\u279ED",
	"\u279F5",
	"\u279F8",
	"\u27A0A",
	"\u27A1D",
	"\u27A33",
	"\u27A3E",
	"\u27A55",
	"\u27A59",
	"\u27A66",
	"\u27A67",
	"\u27A6A",
	"\u27A7C",
	"\u27A9E",
	"\u27AA1",
	"\u27AA6",
	"\u27AAA",
	"\u27AAE",
	"\u27ADA",
	"\u27ADD",
	"\u27B01",
	"\u27B05",
	"\u27B07",
	"\u27B0C",
	"\u27B24",
	"\u27B28",
	"\u27B2A",
	"\u27B2E",
	"\u27B2F",
	"\u27B3B",
	"\u27B48",
	"\u27B79",
	"\u27B86",
	"\u27B87",
	"\u27B88",
	"\u27B93",
	"\u27C06",
	"\u27C0E",
	"\u27C7B",
	"\u27CDF",
	"\u27D2A",
	"\u27D4A",
	"\u27D73",
	"\u27D84",
	"\u27D94",
	"\u27D9F",
	"\u27DA7",
	"\u27DB2",
	"\u27DCE",
	"\u27DDB",
	"\u27E16",
	"\u27E18",
	"\u27E26",
	"\u27E2A",
	"\u27E2B",
	"\u27E48",
	"\u27F62",
	"\u27F6F",
	"\u27F75",
	"\u27FA5",
	"\u28042",
	"\u28090",
	"\u280D8",
	"\u280DC",
	"\u28109",
	"\u28123",
	"\u28130",
	"\u2814D",
	"\u28185",
	"\u28189",
	"\u281AA",
	"\u281B1",
	"\u281C1",
	"\u281CD",
	"\u281D7",
	"\u281DE",
	"\u281E4",
	"\u281EF",
	"\u281F0",
	"\u281FD",
	"\u28200",
	"\u28206",
	"\u28207",
	"\u2820A",
	"\u2820C",
	"\u28256",
	"\u28279",
	"\u282A0",
	"\u282B0",
	"\u282B8",
	"\u282B9",
	"\u282BB",
	"\u282C1",
	"\u282DA",
	"\u282E2",
	"\u282EE",
	"\u28304",
	"\u28308",
	"\u28348",
	"\u2834F",
	"\u28350",
	"\u28352",
	"\u28370",
	"\u28379",
	"\u2838C",
	"\u283A9",
	"\u283AA",
	"\u283AE",
	"\u283D2",
	"\u283D4",
	"\u283E0",
	"\u283E5",
	"\u28436",
	"\u2844A",
	"\u2860C",
	"\u287A8",
	"\u287AA",
	"\u287BA",
	"\u287CA",
	"\u288BF",
	"\u288C3",
	"\u288C8",
	"\u288C9",
	"\u288DE",
	"\u288E7",
	"\u288E8",
	"\u2890B",
	"\u28921",
	"\u2893B",
	"\u2895B",
	"\u2895C",
	"\u2895F",
	"\u28966",
	"\u2897A",
	"\u289A1",
	"\u289AB",
	"\u289B1",
	"\u289C0",
	"\u289D0",
	"\u289DA",
	"\u289DC",
	"\u289EB",
	"\u289F0",
	"\u289F1",
	"\u28A0F",
	"\u28A1B",
	"\u28A1D",
	"\u28A22",
	"\u28A2F",
	"\u28A39",
	"\u28A68",
	"\u28A70",
	"\u28A85",
	"\u28A8B",
	"\u28A95",
	"\u28AC0",
	"\u28AD2",
	"\u28AFC",
	"\u28B02",
	"\u28B12",
	"\u28B16",
	"\u28B1E",
	"\u28B1F",
	"\u28B43",
	"\u28B46",
	"\u28B4C",
	"\u28B4E",
	"\u28B50",
	"\u28B56",
	"\u28B57",
	"\u28B5A",
	"\u28B5B",
	"\u28B65",
	"\u28B78",
	"\u28B81",
	"\u28B82",
	"\u28B85",
	"\u28BB0",
	"\u28BB3",
	"\u28BC5",
	"\u28BDF",
	"\u28BF5",
	"\u28C03",
	"\u28C0B",
	"\u28C20",
	"\u28C25",
	"\u28C2D",
	"\u28C32",
	"\u28C35",
	"\u28C37",
	"\u28C39",
	"\u28C65",
	"\u28CAD",
	"\u28CB3",
	"\u28CCC",
	"\u28CD0",
	"\u28CD1",
	"\u28CD2",
	"\u28CD5",
	"\u28CD9",
	"\u28CDA",
	"\u28CE8",
	"\u28CF8",
	"\u28CFF",
	"\u28D11",
	"\u28D17",
	"\u28D24",
	"\u28D39",
	"\u28D46",
	"\u28D4C",
	"\u28D57",
	"\u28D64",
	"\u28D66",
	"\u28D69",
	"\u28D6C",
	"\u28D78",
	"\u28D80",
	"\u28D8F",
	"\u28D91",
	"\u28DAE",
	"\u28DAF",
	"\u28DB0",
	"\u28DB2",
	"\u28DBB",
	"\u28DBF",
	"\u28DC8",
	"\u28DF2",
	"\u28DFB",
	"\u28F33",
	"\u28F48",
	"\u28F4F",
	"\u29028",
	"\u29159",
	"\u29166",
	"\u2917E",
	"\u291C9",
	"\u2924D",
	"\u29259",
	"\u292CC",
	"\u292F0",
	"\u2935C",
	"\u29392",
	"\u29395",
	"\u29396",
	"\u2939F",
	"\u293A0",
	"\u293A2",
	"\u293C2",
	"\u293CC",
	"\u293E0",
	"\u293EA",
	"\u293F4",
	"\u293F7",
	"\u2940C",
	"\u29443",
	"\u29452",
	"\u29454",
	"\u29461",
	"\u29463",
	"\u29466",
	"\u2948E",
	"\u2949C",
	"\u2949D",
	"\u294B2",
	"\u294BA",
	"\u294BC",
	"\u294E3",
	"\u294E5",
	"\u294F8",
	"\u294F9",
	"\u29507",
	"\u29508",
	"\u2950A",
	"\u29511",
	"\u29523",
	"\u29533",
	"\u2954A",
	"\u29570",
	"\u29581",
	"\u295B0",
	"\u295BF",
	"\u295C0",
	"\u295D3",
	"\u295DB",
	"\u295E1",
	"\u295F4",
	"\u29600",
	"\u2961A",
	"\u2961D",
	"\u29639",
	"\u2963A",
	"\u2963B",
	"\u29648",
	"\u29685",
	"\u2969A",
	"\u2969B",
	"\u296A5",
	"\u296A9",
	"\u296B5",
	"\u296C6",
	"\u296CC",
	"\u296CE",
	"\u296DE",
	"\u296E1",
	"\u296E9",
	"\u296F2",
	"\u29707",
	"\u29720",
	"\u29726",
	"\u2972F",
	"\u29730",
	"\u29735",
	"\u29736",
	"\u29751",
	"\u29754",
	"\u29760",
	"\u29761",
	"\u29763",
	"\u29767",
	"\u2977D",
	"\u29783",
	"\u29784",
	"\u29786",
	"\u29789",
	"\u297A1",
	"\u297A6",
	"\u297A7",
	"\u297AC",
	"\u297AF",
	"\u297C0",
	"\u297C2",
	"\u297D0",
	"\u297D7",
	"\u297E0",
	"\u29834",
	"\u29863",
	"\u29864",
	"\u2987A",
	"\u2988D",
	"\u298A1",
	"\u298B0",
	"\u298B2",
	"\u298B4",
	"\u298B8",
	"\u298BC",
	"\u298BE",
	"\u298CA",
	"\u298CB",
	"\u298CF",
	"\u298D1",
	"\u298D4",
	"\u298E1",
	"\u298EB",
	"\u298F5",
	"\u298FA",
	"\u2990A",
	"\u29919",
	"\u29932",
	"\u29935",
	"\u29938",
	"\u29943",
	"\u29944",
	"\u29945",
	"\u29947",
	"\u29949",
	"\u2994E",
	"\u29951",
	"\u29972",
	"\u2997C",
	"\u29983",
	"\u2999A",
	"\u299A0",
	"\u299BA",
	"\u299C6",
	"\u299C9",
	"\u299D0",
	"\u299E2",
	"\u29B59",
	"\u29B6F",
	"\u29BC1",
	"\u29BC3",
	"\u29BC6",
	"\u29BF3",
	"\u29C00",
	"\u29C39",
	"\u29C48",
	"\u29CE4",
	"\u29D06",
	"\u29D35",
	"\u29D5A",
	"\u29D66",
	"\u29D69",
	"\u29D71",
	"\u29D79",
	"\u29D7A",
	"\u29D80",
	"\u29D81",
	"\u29D98",
	"\u29DAF",
	"\u29DB0",
	"\u29DB1",
	"\u29DD2",
	"\u29DD3",
	"\u29DD5",
	"\u29DF0",
	"\u29DF6",
	"\u29E03",
	"\u29E04",
	"\u29E06",
	"\u29E21",
	"\u29E23",
	"\u29E24",
	"\u29E26",
	"\u29E29",
	"\u29E2C",
	"\u29E42",
	"\u29E4A",
	"\u29E4E",
	"\u29E5D",
	"\u29E7D",
	"\u29E7E",
	"\u29E9D",
	"\u29E9E",
	"\u29ED7",
	"\u29EDB",
	"\u29EE7",
	"\u29EEC",
	"\u29EEE",
	"\u29EF0",
	"\u29EF1",
	"\u29F14",
	"\u29F36",
	"\u29F45",
	"\u29F47",
	"\u29F48",
	"\u29F54",
	"\u29F77",
	"\u29F90",
	"\u29F92",
	"\u29F9D",
	"\u29FC5",
	"\u29FCA",
	"\u29FE4",
	"\u29FE7",
	"\u29FEA",
	"\u29FF1",
	"\u29FFA",
	"\u2A009",
	"\u2A016",
	"\u2A017",
	"\u2A01A",
	"\u2A01B",
	"\u2A026",
	"\u2A03B",
	"\u2A03E",
	"\u2A048",
	"\u2A04F",
	"\u2A050",
	"\u2A051",
	"\u2A056",
	"\u2A05B",
	"\u2A05C",
	"\u2A071",
	"\u2A07F",
	"\u2A086",
	"\u2A088",
	"\u2A0A9",
	"\u2A0AB",
	"\u2A0C3",
	"\u2A0CD",
	"\u2A0CF",
	"\u2A0D2",
	"\u2A0E6",
	"\u2A0E7",
	"\u2A0EE",
	"\u2A0FF",
	"\u2A105",
	"\u2A106",
	"\u2A115",
	"\u2A120",
	"\u2A132",
	"\u2A133",
	"\u2A142",
	"\u2A143",
	"\u2A156",
	"\u2A15C",
	"\u2A17E",
	"\u2A183",
	"\u2A1AB",
	"\u2A1B0",
	"\u2A1B4",
	"\u2A1B7",
	"\u2A1C4",
	"\u2A1D6",
	"\u2A1D8",
	"\u2A1F0",
	"\u2A1F3",
	"\u2A20F",
	"\u2A214",
	"\u2A217",
	"\u2A23C",
	"\u2A256",
	"\u2A25C",
	"\u2A263",
	"\u2A268",
	"\u2A26E",
	"\u2A271",
	"\u2A278",
	"\u2A27F",
	"\u2A289",
	"\u2A2C8",
	"\u2A2FC",
	"\u2A2FD",
	"\u2A2FF",
	"\u2A310",
	"\u2A312",
	"\u2A317",
	"\u2A318",
	"\u2A31C",
	"\u2A323",
	"\u2A328",
	"\u2A32C",
	"\u2A32D",
	"\u2A32E",
	"\u2A32F",
	"\u2A330",
	"\u2A33D",
	"\u2A33E",
	"\u2A33F",
	"\u2A340",
	"\u2A347",
	"\u2A34D",
	"\u2A351",
	"\u2A352",
	"\u2A353",
	"\u2A358",
	"\u2A35A",
	"\u2A35E",
	"\u2A360",
	"\u2A363",
	"\u2A364",
	"\u2A36C",
	"\u2A374",
	"\u2A376",
	"\u2A377",
	"\u2A37F",
	"\u2A382",
	"\u2A45A",
	"\u2A473",
	"\u2A4AC",
	"\u2A4BF",
	"\u2A4DB",
	"\u2A4EC",
	"\u2A4F0",
	"\u2A4F9",
	"\u2A4FD",
	"\u2A535",
	"\u2A563",
	"\u2A5A8",
	"\u2A5CB",
	"\u2A5DC",
	"\u2A5DD",
	"\u2A5EA",
	"\u2A5ED",
	"\u2A5F3",
	"\u2A5FB",
	"\u2A5FD",
	"\u2A600",
	"\u2A605",
	"\u2A613",
	"\u2A61E",
	"\u2A625",
	"\u2A627",
	"\u2A628",
	"\u2A629",
	"\u2A62C",
	"\u2A62F",
	"\u2A632",
	"\u2A649",
	"\u2A64D",
	"\u2A64F",
	"\u2A651",
	"\u2A655",
	"\u2A65E",
	"\u2A664",
	"\u2A685",
	"\u2A694",
	"\u2A6A3",
	"\u2A6AD",
	"\u2A6AE",
	"\u2A6B0",
	"\u2A6D5",
	"\u2A756",
	"\u2A775",
	"\u2A7D6",
	"\u2A88D",
	"\u2A8A5",
	"\u2ABB0",
	"\u2ABC2",
	"\u2ACF7",
	"\u2AD25",
	"\u2AD62",
	"\u2ADC8",
	"\u2B0D0",
	"\u2B0D1",
	"\u2B0DE",
	"\u2B0E5",
	"\u2B0F7",
	"\u2B107",
	"\u2B1E0",
	"\u2B239",
	"\u2B24D",
	"\u2B2D0",
	"\u2B2E7",
	"\u2B319",
	"\u2B358",
	"\u2B49E",
	"\u2B4A1",
	"\u2B4A2",
	"\u2B4B7",
	"\u2B518",
	"\u2B521",
	"\u2B59E",
	"\u2B5D1",
	"\u2B5D5",
	"\u2B5FB",
	"\u2B726",
	"\u2B8F4",
	"\u2B95D",
	"\u2B994",
	"\u2B999",
	"\u2B9B8",
	"\u2B9DD",
	"\u2BA11",
	"\u2BA9B",
	"\u2BB06",
	"\u2BB31",
	"\u2BBD3",
	"\u2BCB4",
	"\u2BDA6",
	"\u2BED1",
	"\u2BFA1",
	"\u2C11D",
	"\u2C189",
	"\u2C264",
	"\u2C267",
	"\u2C326",
	"\u2C341",
	"\u2C3F2",
	"\u2C461",
	"\u2C492",
	"\u2C4E1",
	"\u2C5CF",
	"\u2C5FA",
	"\u2C654",
	"\u2C6D5",
	"\u2C810",
	"\u2C8CD",
	"\u2C8D8",
	"\u2C972",
	"\u2C9D9",
	"\u2CB87",
	"\u2CB8D",
	"\u2CBD8",
	"\u2CC42",
	"\u2CC48",
	"\u2CC9A",
	"\u2CC9B",
	"\u2CD42",
	"\u2CD43",
	"\u2CD68",
	"\u2CD6E",
	"\u2CDBC",
	"\u2CE42",
	"\u2D096",
	"\u2D27E",
	"\u2D459",
	"\u2D5E1",
	"\u2D892",
	"\u2D9D2",
	"\u2D9D6",
	"\u2DA21",
	"\u2DC58",
	"\u2DD99",
	"\u2E717",
	"\u2E7FD",
	"\u2E848",
	"\u2E90F",
	"\u2E912",
	"\u2E997",
	"\u2EA2D",
	"\u2EA3B",
	"\u300A0",
	"\u300B4",
	"\u300F4",
	"\u3021D",
	"\u30240",
	"\u302C6",
	"\u303BC",
	"\u30520",
	"\u3052B",
	"\u3053A",
	"\u305BB",
	"\u3062F",
	"\u30682",
	"\u306A3",
	"\u30762",
	"\u307EB",
	"\u30853",
	"\u30AC6",
	"\u30ACF",
	"\u30ADB",
	"\u30AF3",
	"\u30BF2",
	"\u30D0F",
	"\u30D26",
	"\u30D3D",
	"\u30E48",
	"\u30EDE",
	"\u30FE2",
	"\u310E1",
	"\u310E2",
	"\u310EA",
	"\u311A5",
	"\u311CB"
];// source : https://www.unicode.org/charts/unihan.html
// array of characters that are only used in simplified chinese

Roo.languagedetect.zh_CN = [
	"\u3437",
	"\u3439",
	"\u343D",
	"\u3447",
	"\u3448",
	"\u3454",
	"\u3469",
	"\u347A",
	"\u34E5",
	"\u3509",
	"\u358A",
	"\u359E",
	"\u360E",
	"\u36AF",
	"\u36C0",
	"\u36DF",
	"\u36E0",
	"\u36E3",
	"\u36E4",
	"\u36FF",
	"\u3766",
	"\u37C6",
	"\u37DC",
	"\u37E5",
	"\u384E",
	"\u3916",
	"\u3918",
	"\u392D",
	"\u393D",
	"\u396A",
	"\u3988",
	"\u39CF",
	"\u39D0",
	"\u39D1",
	"\u39DB",
	"\u39DF",
	"\u39F0",
	"\u3A2B",
	"\u3B4E",
	"\u3B4F",
	"\u3B63",
	"\u3B64",
	"\u3B74",
	"\u3BA0",
	"\u3C69",
	"\u3C6E",
	"\u3CBF",
	"\u3CD4",
	"\u3CD5",
	"\u3CE0",
	"\u3CE1",
	"\u3CE2",
	"\u3CFD",
	"\u3D0B",
	"\u3D89",
	"\u3DB6",
	"\u3DBD",
	"\u3DEA",
	"\u3E8D",
	"\u3EC5",
	"\u3ECF",
	"\u3ED8",
	"\u3EEA",
	"\u3FA1",
	"\u4025",
	"\u4056",
	"\u40B5",
	"\u40C5",
	"\u4149",
	"\u415F",
	"\u416A",
	"\u41DA",
	"\u41F2",
	"\u4264",
	"\u4336",
	"\u4337",
	"\u4338",
	"\u4339",
	"\u433A",
	"\u433B",
	"\u433C",
	"\u433D",
	"\u433E",
	"\u433F",
	"\u4340",
	"\u4341",
	"\u43AC",
	"\u43DD",
	"\u442A",
	"\u44D3",
	"\u44D5",
	"\u44D6",
	"\u44E8",
	"\u45BC",
	"\u45D6",
	"\u461B",
	"\u461E",
	"\u464A",
	"\u464C",
	"\u4653",
	"\u46D3",
	"\u4723",
	"\u4724",
	"\u4725",
	"\u4727",
	"\u4729",
	"\u4759",
	"\u478C",
	"\u478D",
	"\u478E",
	"\u4790",
	"\u47E2",
	"\u4880",
	"\u4881",
	"\u4882",
	"\u497A",
	"\u497D",
	"\u497E",
	"\u497F",
	"\u4980",
	"\u4981",
	"\u4982",
	"\u4983",
	"\u4985",
	"\u4986",
	"\u49B6",
	"\u49B7",
	"\u4A44",
	"\u4B6A",
	"\u4BC3",
	"\u4BC4",
	"\u4BC5",
	"\u4C9D",
	"\u4C9E",
	"\u4C9F",
	"\u4CA0",
	"\u4CA1",
	"\u4CA2",
	"\u4CA3",
	"\u4CA4",
	"\u4D13",
	"\u4D14",
	"\u4D15",
	"\u4D16",
	"\u4D17",
	"\u4D18",
	"\u4D19",
	"\u4DAE",
	"\u4E07",
	"\u4E0E",
	"\u4E11",
	"\u4E13",
	"\u4E1A",
	"\u4E1B",
	"\u4E1C",
	"\u4E1D",
	"\u4E22",
	"\u4E24",
	"\u4E25",
	"\u4E27",
	"\u4E2A",
	"\u4E30",
	"\u4E34",
	"\u4E3A",
	"\u4E3D",
	"\u4E3E",
	"\u4E48",
	"\u4E49",
	"\u4E4C",
	"\u4E50",
	"\u4E54",
	"\u4E60",
	"\u4E61",
	"\u4E66",
	"\u4E70",
	"\u4E71",
	"\u4E7E",
	"\u4E86",
	"\u4E89",
	"\u4E8E",
	"\u4E8F",
	"\u4E91",
	"\u4E9A",
	"\u4EA7",
	"\u4EA9",
	"\u4EB2",
	"\u4EB5",
	"\u4EB8",
	"\u4EBF",
	"\u4EC5",
	"\u4EC6",
	"\u4ECE",
	"\u4ED1",
	"\u4ED3",
	"\u4EEA",
	"\u4EEC",
	"\u4EF7",
	"\u4F17",
	"\u4F18",
	"\u4F19",
	"\u4F1A",
	"\u4F1B",
	"\u4F1E",
	"\u4F1F",
	"\u4F20",
	"\u4F21",
	"\u4F23",
	"\u4F24",
	"\u4F25",
	"\u4F26",
	"\u4F27",
	"\u4F2A",
	"\u4F2B",
	"\u4F53",
	"\u4F59",
	"\u4F63",
	"\u4F65",
	"\u4FA0",
	"\u4FA3",
	"\u4FA5",
	"\u4FA6",
	"\u4FA7",
	"\u4FA8",
	"\u4FA9",
	"\u4FAA",
	"\u4FAC",
	"\u4FE3",
	"\u4FE6",
	"\u4FE8",
	"\u4FE9",
	"\u4FEA",
	"\u4FEB",
	"\u4FED",
	"\u501F",
	"\u503A",
	"\u503E",
	"\u506C",
	"\u507B",
	"\u507E",
	"\u507F",
	"\u50A5",
	"\u50A7",
	"\u50A8",
	"\u50A9",
	"\u513F",
	"\u514B",
	"\u5151",
	"\u5156",
	"\u515A",
	"\u5170",
	"\u5173",
	"\u5174",
	"\u5179",
	"\u517B",
	"\u517D",
	"\u5181",
	"\u5185",
	"\u5188",
	"\u518C",
	"\u5199",
	"\u519B",
	"\u519C",
	"\u51AC",
	"\u51AF",
	"\u51B2",
	"\u51B3",
	"\u51B5",
	"\u51BB",
	"\u51C0",
	"\u51C6",
	"\u51C9",
	"\u51CF",
	"\u51D1",
	"\u51DB",
	"\u51E0",
	"\u51E4",
	"\u51EB",
	"\u51ED",
	"\u51EF",
	"\u51FA",
	"\u51FB",
	"\u51FF",
	"\u520D",
	"\u5212",
	"\u5218",
	"\u5219",
	"\u521A",
	"\u521B",
	"\u5220",
	"\u522B",
	"\u522C",
	"\u522D",
	"\u522E",
	"\u5236",
	"\u5239",
	"\u523D",
	"\u523E",
	"\u523F",
	"\u5240",
	"\u5242",
	"\u5250",
	"\u5251",
	"\u5265",
	"\u5267",
	"\u529D",
	"\u529E",
	"\u52A1",
	"\u52A2",
	"\u52A8",
	"\u52B1",
	"\u52B2",
	"\u52B3",
	"\u52BF",
	"\u52CB",
	"\u52DA",
	"\u5300",
	"\u5326",
	"\u532E",
	"\u533A",
	"\u533B",
	"\u5343",
	"\u534E",
	"\u534F",
	"\u5355",
	"\u5356",
	"\u535C",
	"\u5362",
	"\u5364",
	"\u536B",
	"\u5374",
	"\u5377",
	"\u5382",
	"\u5385",
	"\u5386",
	"\u5389",
	"\u538B",
	"\u538C",
	"\u538D",
	"\u5390",
	"\u5395",
	"\u5398",
	"\u53A2",
	"\u53A3",
	"\u53A6",
	"\u53A8",
	"\u53A9",
	"\u53AE",
	"\u53BF",
	"\u53C1",
	"\u53C2",
	"\u53C6",
	"\u53C7",
	"\u53CC",
	"\u53D1",
	"\u53D8",
	"\u53D9",
	"\u53E0",
	"\u53EA",
	"\u53F0",
	"\u53F6",
	"\u53F7",
	"\u53F9",
	"\u53FD",
	"\u5401",
	"\u5408",
	"\u540C",
	"\u540E",
	"\u5411",
	"\u5413",
	"\u5415",
	"\u5417",
	"\u5423",
	"\u5428",
	"\u542C",
	"\u542F",
	"\u5434",
	"\u5450",
	"\u5452",
	"\u5453",
	"\u5455",
	"\u5456",
	"\u5457",
	"\u5458",
	"\u5459",
	"\u545B",
	"\u545C",
	"\u548F",
	"\u5499",
	"\u549B",
	"\u549D",
	"\u54A4",
	"\u54B8",
	"\u54CD",
	"\u54D1",
	"\u54D2",
	"\u54D3",
	"\u54D4",
	"\u54D5",
	"\u54D7",
	"\u54D9",
	"\u54DC",
	"\u54DD",
	"\u54DF",
	"\u551B",
	"\u551D",
	"\u5520",
	"\u5521",
	"\u5522",
	"\u5524",
	"\u5567",
	"\u556C",
	"\u556D",
	"\u556E",
	"\u556F",
	"\u5570",
	"\u5574",
	"\u5578",
	"\u55B7",
	"\u55BD",
	"\u55BE",
	"\u55EB",
	"\u55F3",
	"\u5618",
	"\u5624",
	"\u5631",
	"\u565C",
	"\u56A3",
	"\u56DE",
	"\u56E2",
	"\u56ED",
	"\u56F0",
	"\u56F1",
	"\u56F4",
	"\u56F5",
	"\u56FD",
	"\u56FE",
	"\u5706",
	"\u5723",
	"\u5739",
	"\u573A",
	"\u5742",
	"\u574F",
	"\u5757",
	"\u575A",
	"\u575B",
	"\u575C",
	"\u575D",
	"\u575E",
	"\u575F",
	"\u5760",
	"\u5784",
	"\u5785",
	"\u5786",
	"\u5792",
	"\u57A6",
	"\u57A9",
	"\u57AB",
	"\u57AD",
	"\u57AF",
	"\u57B1",
	"\u57B2",
	"\u57B4",
	"\u57D8",
	"\u57D9",
	"\u57DA",
	"\u57EF",
	"\u5811",
	"\u5815",
	"\u5846",
	"\u5899",
	"\u58EE",
	"\u58F0",
	"\u58F3",
	"\u58F6",
	"\u58F8",
	"\u5904",
	"\u5907",
	"\u590D",
	"\u591F",
	"\u5925",
	"\u5934",
	"\u5938",
	"\u5939",
	"\u593A",
	"\u5941",
	"\u5942",
	"\u594B",
	"\u5956",
	"\u5965",
	"\u5968",
	"\u5978",
	"\u5986",
	"\u5987",
	"\u5988",
	"\u59A9",
	"\u59AA",
	"\u59AB",
	"\u59D7",
	"\u59DC",
	"\u59F9",
	"\u5A04",
	"\u5A05",
	"\u5A06",
	"\u5A07",
	"\u5A08",
	"\u5A31",
	"\u5A32",
	"\u5A34",
	"\u5A73",
	"\u5A74",
	"\u5A75",
	"\u5A76",
	"\u5AAA",
	"\u5AAD",
	"\u5AD2",
	"\u5AD4",
	"\u5AF1",
	"\u5B37",
	"\u5B59",
	"\u5B66",
	"\u5B6A",
	"\u5B81",
	"\u5B9D",
	"\u5B9E",
	"\u5BA0",
	"\u5BA1",
	"\u5BAA",
	"\u5BAB",
	"\u5BB6",
	"\u5BBD",
	"\u5BBE",
	"\u5BDD",
	"\u5BF9",
	"\u5BFB",
	"\u5BFC",
	"\u5BFF",
	"\u5C06",
	"\u5C14",
	"\u5C18",
	"\u5C1D",
	"\u5C27",
	"\u5C34",
	"\u5C38",
	"\u5C3D",
	"\u5C42",
	"\u5C43",
	"\u5C49",
	"\u5C4A",
	"\u5C5E",
	"\u5C61",
	"\u5C66",
	"\u5C7F",
	"\u5C81",
	"\u5C82",
	"\u5C96",
	"\u5C97",
	"\u5C98",
	"\u5C99",
	"\u5C9A",
	"\u5C9B",
	"\u5CAD",
	"\u5CBD",
	"\u5CBF",
	"\u5CC3",
	"\u5CC4",
	"\u5CE1",
	"\u5CE3",
	"\u5CE4",
	"\u5CE5",
	"\u5CE6",
	"\u5D02",
	"\u5D03",
	"\u5D04",
	"\u5D2D",
	"\u5D58",
	"\u5D5A",
	"\u5D5D",
	"\u5DC5",
	"\u5DE9",
	"\u5DEF",
	"\u5E01",
	"\u5E05",
	"\u5E08",
	"\u5E0F",
	"\u5E10",
	"\u5E18",
	"\u5E1C",
	"\u5E26",
	"\u5E27",
	"\u5E2E",
	"\u5E31",
	"\u5E3B",
	"\u5E3C",
	"\u5E42",
	"\u5E72",
	"\u5E76",
	"\u5E7F",
	"\u5E84",
	"\u5E86",
	"\u5E90",
	"\u5E91",
	"\u5E93",
	"\u5E94",
	"\u5E99",
	"\u5E9E",
	"\u5E9F",
	"\u5EBC",
	"\u5EEA",
	"\u5F00",
	"\u5F02",
	"\u5F03",
	"\u5F11",
	"\u5F20",
	"\u5F25",
	"\u5F2A",
	"\u5F2F",
	"\u5F39",
	"\u5F3A",
	"\u5F52",
	"\u5F53",
	"\u5F55",
	"\u5F5D",
	"\u5F5F",
	"\u5F66",
	"\u5F68",
	"\u5F7B",
	"\u5F81",
	"\u5F84",
	"\u5F95",
	"\u5FA1",
	"\u5FA9",
	"\u5FB5",
	"\u5FC6",
	"\u5FCF",
	"\u5FD7",
	"\u5FE7",
	"\u5FFE",
	"\u6000",
	"\u6001",
	"\u6002",
	"\u6003",
	"\u6004",
	"\u6005",
	"\u6006",
	"\u601C",
	"\u603B",
	"\u603C",
	"\u603F",
	"\u604B",
	"\u6052",
	"\u6073",
	"\u6076",
	"\u6078",
	"\u6079",
	"\u607A",
	"\u607B",
	"\u607C",
	"\u607D",
	"\u60A6",
	"\u60AB",
	"\u60AC",
	"\u60AD",
	"\u60AE",
	"\u60AF",
	"\u60CA",
	"\u60E7",
	"\u60E8",
	"\u60E9",
	"\u60EB",
	"\u60EC",
	"\u60ED",
	"\u60EE",
	"\u60EF",
	"\u6120",
	"\u6124",
	"\u6126",
	"\u613F",
	"\u6151",
	"\u616D",
	"\u61D1",
	"\u61D2",
	"\u61D4",
	"\u6206",
	"\u620B",
	"\u620F",
	"\u6217",
	"\u6218",
	"\u6220",
	"\u622C",
	"\u622F",
	"\u6237",
	"\u624D",
	"\u6251",
	"\u6267",
	"\u6269",
	"\u626A",
	"\u626B",
	"\u626C",
	"\u6270",
	"\u6298",
	"\u629A",
	"\u629B",
	"\u629F",
	"\u62A0",
	"\u62A1",
	"\u62A2",
	"\u62A4",
	"\u62A5",
	"\u62C5",
	"\u62DF",
	"\u62E2",
	"\u62E3",
	"\u62E5",
	"\u62E6",
	"\u62E7",
	"\u62E8",
	"\u62E9",
	"\u6302",
	"\u6319",
	"\u631A",
	"\u631B",
	"\u631C",
	"\u631D",
	"\u631E",
	"\u631F",
	"\u6320",
	"\u6321",
	"\u6322",
	"\u6323",
	"\u6324",
	"\u6325",
	"\u6326",
	"\u633D",
	"\u635D",
	"\u635E",
	"\u635F",
	"\u6361",
	"\u6362",
	"\u6363",
	"\u636E",
	"\u63B3",
	"\u63B4",
	"\u63B7",
	"\u63B8",
	"\u63BA",
	"\u63BC",
	"\u63FD",
	"\u63FE",
	"\u63FF",
	"\u6400",
	"\u6401",
	"\u6402",
	"\u6405",
	"\u643A",
	"\u6444",
	"\u6445",
	"\u6446",
	"\u6447",
	"\u6448",
	"\u644A",
	"\u647A",
	"\u6484",
	"\u6491",
	"\u64B5",
	"\u64B7",
	"\u64B8",
	"\u64BA",
	"\u64DC",
	"\u64DE",
	"\u6512",
	"\u654C",
	"\u655B",
	"\u6569",
	"\u6570",
	"\u658B",
	"\u6593",
	"\u6597",
	"\u65A9",
	"\u65AD",
	"\u65CB",
	"\u65E0",
	"\u65E7",
	"\u65F6",
	"\u65F7",
	"\u65F8",
	"\u6619",
	"\u663C",
	"\u663D",
	"\u663E",
	"\u664B",
	"\u6652",
	"\u6653",
	"\u6654",
	"\u6655",
	"\u6656",
	"\u6682",
	"\u6685",
	"\u66A7",
	"\u66F2",
	"\u672F",
	"\u6731",
	"\u6734",
	"\u673A",
	"\u6740",
	"\u6742",
	"\u6743",
	"\u6746",
	"\u6761",
	"\u6765",
	"\u6768",
	"\u6769",
	"\u6770",
	"\u677E",
	"\u677F",
	"\u6781",
	"\u6784",
	"\u679E",
	"\u67A2",
	"\u67A3",
	"\u67A5",
	"\u67A7",
	"\u67A8",
	"\u67AA",
	"\u67AB",
	"\u67AD",
	"\u67DC",
	"\u67E0",
	"\u67FD",
	"\u6800",
	"\u6805",
	"\u6807",
	"\u6808",
	"\u6809",
	"\u680A",
	"\u680B",
	"\u680C",
	"\u680E",
	"\u680F",
	"\u6811",
	"\u6816",
	"\u6817",
	"\u6837",
	"\u683E",
	"\u6860",
	"\u6861",
	"\u6862",
	"\u6863",
	"\u6864",
	"\u6865",
	"\u6866",
	"\u6867",
	"\u6868",
	"\u6869",
	"\u686A",
	"\u68A6",
	"\u68BC",
	"\u68BE",
	"\u68BF",
	"\u68C0",
	"\u68C1",
	"\u68C2",
	"\u6901",
	"\u691D",
	"\u691F",
	"\u6920",
	"\u6922",
	"\u6924",
	"\u692B",
	"\u692D",
	"\u692E",
	"\u697C",
	"\u6984",
	"\u6985",
	"\u6987",
	"\u6988",
	"\u6989",
	"\u69DA",
	"\u69DB",
	"\u69DF",
	"\u69E0",
	"\u6A2A",
	"\u6A2F",
	"\u6A31",
	"\u6A65",
	"\u6A71",
	"\u6A79",
	"\u6A7C",
	"\u6AA9",
	"\u6B22",
	"\u6B24",
	"\u6B27",
	"\u6B7C",
	"\u6B81",
	"\u6B87",
	"\u6B8B",
	"\u6B92",
	"\u6B93",
	"\u6B9A",
	"\u6BA1",
	"\u6BB4",
	"\u6BC1",
	"\u6BC2",
	"\u6BD5",
	"\u6BD9",
	"\u6BE1",
	"\u6BF5",
	"\u6BF6",
	"\u6C07",
	"\u6C14",
	"\u6C22",
	"\u6C29",
	"\u6C32",
	"\u6C47",
	"\u6C49",
	"\u6C64",
	"\u6C79",
	"\u6C84",
	"\u6C88",
	"\u6C9F",
	"\u6CA1",
	"\u6CA3",
	"\u6CA4",
	"\u6CA5",
	"\u6CA6",
	"\u6CA7",
	"\u6CA8",
	"\u6CA9",
	"\u6CAA",
	"\u6CDE",
	"\u6CE8",
	"\u6CEA",
	"\u6CF6",
	"\u6CF7",
	"\u6CF8",
	"\u6CFA",
	"\u6CFB",
	"\u6CFC",
	"\u6CFD",
	"\u6CFE",
	"\u6D01",
	"\u6D12",
	"\u6D3C",
	"\u6D43",
	"\u6D45",
	"\u6D46",
	"\u6D47",
	"\u6D48",
	"\u6D49",
	"\u6D4A",
	"\u6D4B",
	"\u6D4D",
	"\u6D4E",
	"\u6D4F",
	"\u6D50",
	"\u6D51",
	"\u6D52",
	"\u6D53",
	"\u6D54",
	"\u6D55",
	"\u6D82",
	"\u6D9B",
	"\u6D9D",
	"\u6D9E",
	"\u6D9F",
	"\u6DA0",
	"\u6DA1",
	"\u6DA2",
	"\u6DA3",
	"\u6DA4",
	"\u6DA6",
	"\u6DA7",
	"\u6DA8",
	"\u6DA9",
	"\u6DC0",
	"\u6E0A",
	"\u6E0C",
	"\u6E0D",
	"\u6E0E",
	"\u6E10",
	"\u6E11",
	"\u6E14",
	"\u6E16",
	"\u6E17",
	"\u6E29",
	"\u6E7E",
	"\u6E7F",
	"\u6E81",
	"\u6E83",
	"\u6E85",
	"\u6E86",
	"\u6E87",
	"\u6ED7",
	"\u6EDA",
	"\u6EDE",
	"\u6EDF",
	"\u6EE0",
	"\u6EE1",
	"\u6EE2",
	"\u6EE4",
	"\u6EE5",
	"\u6EE6",
	"\u6EE8",
	"\u6EE9",
	"\u6EEA",
	"\u6F13",
	"\u6F46",
	"\u6F47",
	"\u6F4B",
	"\u6F4D",
	"\u6F5C",
	"\u6F74",
	"\u6F9B",
	"\u6F9C",
	"\u6FD1",
	"\u6FD2",
	"\u704F",
	"\u706D",
	"\u706F",
	"\u7075",
	"\u7076",
	"\u707E",
	"\u707F",
	"\u7080",
	"\u7089",
	"\u709C",
	"\u709D",
	"\u70B9",
	"\u70BC",
	"\u70BD",
	"\u70C1",
	"\u70C2",
	"\u70C3",
	"\u70DB",
	"\u70DF",
	"\u70E6",
	"\u70E7",
	"\u70E8",
	"\u70E9",
	"\u70EB",
	"\u70EC",
	"\u70ED",
	"\u7115",
	"\u7116",
	"\u7118",
	"\u7174",
	"\u7231",
	"\u7237",
	"\u724D",
	"\u7266",
	"\u7275",
	"\u727A",
	"\u728A",
	"\u72B6",
	"\u72B7",
	"\u72B8",
	"\u72B9",
	"\u72C8",
	"\u72DD",
	"\u72DE",
	"\u72EC",
	"\u72ED",
	"\u72EE",
	"\u72EF",
	"\u72F0",
	"\u72F1",
	"\u72F2",
	"\u7303",
	"\u730E",
	"\u7315",
	"\u7321",
	"\u732A",
	"\u732B",
	"\u732C",
	"\u732E",
	"\u736D",
	"\u7391",
	"\u7399",
	"\u739A",
	"\u739B",
	"\u73AE",
	"\u73AF",
	"\u73B0",
	"\u73B1",
	"\u73BA",
	"\u73D0",
	"\u73D1",
	"\u73F0",
	"\u73F2",
	"\u740E",
	"\u740F",
	"\u7410",
	"\u743C",
	"\u7476",
	"\u7477",
	"\u7478",
	"\u748E",
	"\u74D2",
	"\u74EF",
	"\u7535",
	"\u753B",
	"\u7545",
	"\u7574",
	"\u7596",
	"\u7597",
	"\u759F",
	"\u75A0",
	"\u75A1",
	"\u75AC",
	"\u75AD",
	"\u75AE",
	"\u75AF",
	"\u75B1",
	"\u75B4",
	"\u75C7",
	"\u75C8",
	"\u75C9",
	"\u75D2",
	"\u75D6",
	"\u75E8",
	"\u75EA",
	"\u75EB",
	"\u7605",
	"\u7606",
	"\u7617",
	"\u7618",
	"\u762A",
	"\u762B",
	"\u763E",
	"\u763F",
	"\u765E",
	"\u7663",
	"\u766B",
	"\u7691",
	"\u76B1",
	"\u76B2",
	"\u76CF",
	"\u76D0",
	"\u76D1",
	"\u76D6",
	"\u76D7",
	"\u76D8",
	"\u770D",
	"\u7726",
	"\u772C",
	"\u7740",
	"\u7741",
	"\u7750",
	"\u7751",
	"\u7786",
	"\u7792",
	"\u77A9",
	"\u77AD",
	"\u77EB",
	"\u77F6",
	"\u77FE",
	"\u77FF",
	"\u7800",
	"\u7801",
	"\u7816",
	"\u7817",
	"\u781A",
	"\u781C",
	"\u783A",
	"\u783B",
	"\u783E",
	"\u7840",
	"\u7841",
	"\u7855",
	"\u7856",
	"\u7857",
	"\u7859",
	"\u785A",
	"\u786E",
	"\u7875",
	"\u7877",
	"\u788D",
	"\u789B",
	"\u789C",
	"\u793C",
	"\u7943",
	"\u794E",
	"\u7962",
	"\u796F",
	"\u7977",
	"\u7978",
	"\u7980",
	"\u7984",
	"\u7985",
	"\u79BB",
	"\u79C3",
	"\u79C6",
	"\u79CB",
	"\u79CD",
	"\u79EF",
	"\u79F0",
	"\u79FD",
	"\u79FE",
	"\u7A06",
	"\u7A0E",
	"\u7A23",
	"\u7A33",
	"\u7A51",
	"\u7A77",
	"\u7A83",
	"\u7A8D",
	"\u7A8E",
	"\u7A91",
	"\u7A9C",
	"\u7A9D",
	"\u7AA5",
	"\u7AA6",
	"\u7AAD",
	"\u7AD6",
	"\u7ADE",
	"\u7B03",
	"\u7B0B",
	"\u7B14",
	"\u7B15",
	"\u7B3A",
	"\u7B3C",
	"\u7B3E",
	"\u7B51",
	"\u7B5A",
	"\u7B5B",
	"\u7B5C",
	"\u7B5D",
	"\u7B79",
	"\u7B7C",
	"\u7B7E",
	"\u7B80",
	"\u7B93",
	"\u7BA6",
	"\u7BA7",
	"\u7BA8",
	"\u7BA9",
	"\u7BAA",
	"\u7BAB",
	"\u7BD1",
	"\u7BD3",
	"\u7BEE",
	"\u7BEF",
	"\u7BF1",
	"\u7C16",
	"\u7C41",
	"\u7C74",
	"\u7C7B",
	"\u7C7C",
	"\u7C9C",
	"\u7C9D",
	"\u7CA4",
	"\u7CAA",
	"\u7CAE",
	"\u7CC1",
	"\u7CC7",
	"\u7CFB",
	"\u7D27",
	"\u7D2F",
	"\u7D77",
	"\u7E9F",
	"\u7EA0",
	"\u7EA1",
	"\u7EA2",
	"\u7EA3",
	"\u7EA4",
	"\u7EA5",
	"\u7EA6",
	"\u7EA7",
	"\u7EA8",
	"\u7EA9",
	"\u7EAA",
	"\u7EAB",
	"\u7EAC",
	"\u7EAD",
	"\u7EAE",
	"\u7EAF",
	"\u7EB0",
	"\u7EB1",
	"\u7EB2",
	"\u7EB3",
	"\u7EB4",
	"\u7EB5",
	"\u7EB6",
	"\u7EB7",
	"\u7EB8",
	"\u7EB9",
	"\u7EBA",
	"\u7EBB",
	"\u7EBC",
	"\u7EBD",
	"\u7EBE",
	"\u7EBF",
	"\u7EC0",
	"\u7EC1",
	"\u7EC2",
	"\u7EC3",
	"\u7EC4",
	"\u7EC5",
	"\u7EC6",
	"\u7EC7",
	"\u7EC8",
	"\u7EC9",
	"\u7ECA",
	"\u7ECB",
	"\u7ECC",
	"\u7ECD",
	"\u7ECE",
	"\u7ECF",
	"\u7ED0",
	"\u7ED1",
	"\u7ED2",
	"\u7ED3",
	"\u7ED4",
	"\u7ED5",
	"\u7ED6",
	"\u7ED7",
	"\u7ED8",
	"\u7ED9",
	"\u7EDA",
	"\u7EDB",
	"\u7EDC",
	"\u7EDD",
	"\u7EDE",
	"\u7EDF",
	"\u7EE0",
	"\u7EE1",
	"\u7EE2",
	"\u7EE3",
	"\u7EE4",
	"\u7EE5",
	"\u7EE6",
	"\u7EE7",
	"\u7EE8",
	"\u7EE9",
	"\u7EEA",
	"\u7EEB",
	"\u7EEC",
	"\u7EED",
	"\u7EEE",
	"\u7EEF",
	"\u7EF0",
	"\u7EF1",
	"\u7EF2",
	"\u7EF3",
	"\u7EF4",
	"\u7EF5",
	"\u7EF6",
	"\u7EF7",
	"\u7EF8",
	"\u7EF9",
	"\u7EFA",
	"\u7EFB",
	"\u7EFC",
	"\u7EFD",
	"\u7EFE",
	"\u7EFF",
	"\u7F00",
	"\u7F01",
	"\u7F02",
	"\u7F03",
	"\u7F04",
	"\u7F05",
	"\u7F06",
	"\u7F07",
	"\u7F08",
	"\u7F09",
	"\u7F0A",
	"\u7F0B",
	"\u7F0C",
	"\u7F0D",
	"\u7F0E",
	"\u7F0F",
	"\u7F10",
	"\u7F11",
	"\u7F12",
	"\u7F13",
	"\u7F14",
	"\u7F15",
	"\u7F16",
	"\u7F17",
	"\u7F18",
	"\u7F19",
	"\u7F1A",
	"\u7F1B",
	"\u7F1C",
	"\u7F1D",
	"\u7F1E",
	"\u7F1F",
	"\u7F20",
	"\u7F21",
	"\u7F22",
	"\u7F23",
	"\u7F24",
	"\u7F25",
	"\u7F26",
	"\u7F27",
	"\u7F28",
	"\u7F29",
	"\u7F2A",
	"\u7F2B",
	"\u7F2C",
	"\u7F2D",
	"\u7F2E",
	"\u7F2F",
	"\u7F30",
	"\u7F31",
	"\u7F32",
	"\u7F33",
	"\u7F34",
	"\u7F35",
	"\u7F42",
	"\u7F51",
	"\u7F57",
	"\u7F5A",
	"\u7F62",
	"\u7F74",
	"\u7F81",
	"\u7F9F",
	"\u7FD8",
	"\u7FD9",
	"\u7FDA",
	"\u8022",
	"\u8027",
	"\u8038",
	"\u803B",
	"\u8042",
	"\u804B",
	"\u804C",
	"\u804D",
	"\u8054",
	"\u8069",
	"\u806A",
	"\u8083",
	"\u80A0",
	"\u80A4",
	"\u80AE",
	"\u80B4",
	"\u80BE",
	"\u80BF",
	"\u80C0",
	"\u80C1",
	"\u80C6",
	"\u80DC",
	"\u80E1",
	"\u80E7",
	"\u80E8",
	"\u80EA",
	"\u80EB",
	"\u80F6",
	"\u8109",
	"\u810D",
	"\u810F",
	"\u8110",
	"\u8111",
	"\u8113",
	"\u8114",
	"\u811A",
	"\u8131",
	"\u8136",
	"\u8138",
	"\u814A",
	"\u8158",
	"\u816D",
	"\u817B",
	"\u817C",
	"\u817D",
	"\u817E",
	"\u8191",
	"\u81DC",
	"\u81E4",
	"\u81F4",
	"\u8206",
	"\u820D",
	"\u8223",
	"\u8230",
	"\u8231",
	"\u823B",
	"\u8270",
	"\u8273",
	"\u827A",
	"\u8282",
	"\u8288",
	"\u8297",
	"\u829C",
	"\u82A6",
	"\u82B8",
	"\u82C1",
	"\u82C7",
	"\u82C8",
	"\u82CB",
	"\u82CC",
	"\u82CD",
	"\u82CE",
	"\u82CF",
	"\u82E7",
	"\u82F9",
	"\u8303",
	"\u830E",
	"\u830F",
	"\u8311",
	"\u8314",
	"\u8315",
	"\u8327",
	"\u8346",
	"\u8350",
	"\u8359",
	"\u835A",
	"\u835B",
	"\u835C",
	"\u835D",
	"\u835E",
	"\u835F",
	"\u8360",
	"\u8361",
	"\u8363",
	"\u8364",
	"\u8365",
	"\u8366",
	"\u8367",
	"\u8368",
	"\u8369",
	"\u836A",
	"\u836B",
	"\u836C",
	"\u836D",
	"\u836E",
	"\u836F",
	"\u8385",
	"\u83B1",
	"\u83B2",
	"\u83B3",
	"\u83B4",
	"\u83B6",
	"\u83B7",
	"\u83B8",
	"\u83B9",
	"\u83BA",
	"\u83BC",
	"\u841A",
	"\u841D",
	"\u8424",
	"\u8425",
	"\u8426",
	"\u8427",
	"\u8428",
	"\u8457",
	"\u8471",
	"\u8487",
	"\u8489",
	"\u848B",
	"\u848C",
	"\u8499",
	"\u84DD",
	"\u84DF",
	"\u84E0",
	"\u84E3",
	"\u84E5",
	"\u84E6",
	"\u8502",
	"\u8511",
	"\u8537",
	"\u8539",
	"\u853A",
	"\u853C",
	"\u8570",
	"\u8572",
	"\u8574",
	"\u85AE",
	"\u85C9",
	"\u85D3",
	"\u8616",
	"\u864F",
	"\u8651",
	"\u865A",
	"\u866B",
	"\u866C",
	"\u866E",
	"\u867D",
	"\u867E",
	"\u867F",
	"\u8680",
	"\u8681",
	"\u8682",
	"\u8683",
	"\u8695",
	"\u86AC",
	"\u86CA",
	"\u86CE",
	"\u86CF",
	"\u86EE",
	"\u86F0",
	"\u86F1",
	"\u86F2",
	"\u86F3",
	"\u86F4",
	"\u8715",
	"\u8717",
	"\u8721",
	"\u8747",
	"\u8748",
	"\u8749",
	"\u877C",
	"\u877E",
	"\u8780",
	"\u87A8",
	"\u87CF",
	"\u8845",
	"\u8854",
	"\u8865",
	"\u8868",
	"\u886C",
	"\u886E",
	"\u8884",
	"\u8885",
	"\u8886",
	"\u889C",
	"\u88AD",
	"\u88AF",
	"\u88C5",
	"\u88C6",
	"\u88C8",
	"\u88E1",
	"\u88E2",
	"\u88E3",
	"\u88E4",
	"\u88E5",
	"\u891B",
	"\u891D",
	"\u8934",
	"\u8955",
	"\u8986",
	"\u89C1",
	"\u89C2",
	"\u89C3",
	"\u89C4",
	"\u89C5",
	"\u89C6",
	"\u89C7",
	"\u89C8",
	"\u89C9",
	"\u89CA",
	"\u89CB",
	"\u89CC",
	"\u89CD",
	"\u89CE",
	"\u89CF",
	"\u89D0",
	"\u89D1",
	"\u89DE",
	"\u89E6",
	"\u89EF",
	"\u8A1A",
	"\u8A5F",
	"\u8A89",
	"\u8A8A",
	"\u8BA0",
	"\u8BA1",
	"\u8BA2",
	"\u8BA3",
	"\u8BA4",
	"\u8BA5",
	"\u8BA6",
	"\u8BA7",
	"\u8BA8",
	"\u8BA9",
	"\u8BAA",
	"\u8BAB",
	"\u8BAC",
	"\u8BAD",
	"\u8BAE",
	"\u8BAF",
	"\u8BB0",
	"\u8BB1",
	"\u8BB2",
	"\u8BB3",
	"\u8BB4",
	"\u8BB5",
	"\u8BB6",
	"\u8BB7",
	"\u8BB8",
	"\u8BB9",
	"\u8BBA",
	"\u8BBB",
	"\u8BBC",
	"\u8BBD",
	"\u8BBE",
	"\u8BBF",
	"\u8BC0",
	"\u8BC1",
	"\u8BC2",
	"\u8BC3",
	"\u8BC4",
	"\u8BC5",
	"\u8BC6",
	"\u8BC7",
	"\u8BC8",
	"\u8BC9",
	"\u8BCA",
	"\u8BCB",
	"\u8BCC",
	"\u8BCD",
	"\u8BCE",
	"\u8BCF",
	"\u8BD0",
	"\u8BD1",
	"\u8BD2",
	"\u8BD3",
	"\u8BD4",
	"\u8BD5",
	"\u8BD6",
	"\u8BD7",
	"\u8BD8",
	"\u8BD9",
	"\u8BDA",
	"\u8BDB",
	"\u8BDC",
	"\u8BDD",
	"\u8BDE",
	"\u8BDF",
	"\u8BE0",
	"\u8BE1",
	"\u8BE2",
	"\u8BE3",
	"\u8BE4",
	"\u8BE5",
	"\u8BE6",
	"\u8BE7",
	"\u8BE8",
	"\u8BE9",
	"\u8BEA",
	"\u8BEB",
	"\u8BEC",
	"\u8BED",
	"\u8BEE",
	"\u8BEF",
	"\u8BF0",
	"\u8BF1",
	"\u8BF2",
	"\u8BF3",
	"\u8BF4",
	"\u8BF5",
	"\u8BF6",
	"\u8BF7",
	"\u8BF8",
	"\u8BF9",
	"\u8BFA",
	"\u8BFB",
	"\u8BFC",
	"\u8BFD",
	"\u8BFE",
	"\u8BFF",
	"\u8C00",
	"\u8C01",
	"\u8C02",
	"\u8C03",
	"\u8C04",
	"\u8C05",
	"\u8C06",
	"\u8C07",
	"\u8C08",
	"\u8C09",
	"\u8C0A",
	"\u8C0B",
	"\u8C0C",
	"\u8C0D",
	"\u8C0E",
	"\u8C0F",
	"\u8C10",
	"\u8C11",
	"\u8C12",
	"\u8C13",
	"\u8C14",
	"\u8C15",
	"\u8C16",
	"\u8C17",
	"\u8C18",
	"\u8C19",
	"\u8C1A",
	"\u8C1B",
	"\u8C1C",
	"\u8C1D",
	"\u8C1E",
	"\u8C1F",
	"\u8C20",
	"\u8C21",
	"\u8C22",
	"\u8C23",
	"\u8C24",
	"\u8C25",
	"\u8C26",
	"\u8C27",
	"\u8C28",
	"\u8C29",
	"\u8C2A",
	"\u8C2B",
	"\u8C2C",
	"\u8C2D",
	"\u8C2E",
	"\u8C2F",
	"\u8C30",
	"\u8C31",
	"\u8C32",
	"\u8C33",
	"\u8C34",
	"\u8C35",
	"\u8C36",
	"\u8C37",
	"\u8C6E",
	"\u8D1D",
	"\u8D1E",
	"\u8D1F",
	"\u8D20",
	"\u8D21",
	"\u8D22",
	"\u8D23",
	"\u8D24",
	"\u8D25",
	"\u8D26",
	"\u8D27",
	"\u8D28",
	"\u8D29",
	"\u8D2A",
	"\u8D2B",
	"\u8D2C",
	"\u8D2D",
	"\u8D2E",
	"\u8D2F",
	"\u8D30",
	"\u8D31",
	"\u8D32",
	"\u8D33",
	"\u8D34",
	"\u8D35",
	"\u8D36",
	"\u8D37",
	"\u8D38",
	"\u8D39",
	"\u8D3A",
	"\u8D3B",
	"\u8D3C",
	"\u8D3D",
	"\u8D3E",
	"\u8D3F",
	"\u8D40",
	"\u8D41",
	"\u8D42",
	"\u8D43",
	"\u8D44",
	"\u8D45",
	"\u8D46",
	"\u8D47",
	"\u8D48",
	"\u8D49",
	"\u8D4A",
	"\u8D4B",
	"\u8D4C",
	"\u8D4D",
	"\u8D4E",
	"\u8D4F",
	"\u8D50",
	"\u8D51",
	"\u8D52",
	"\u8D53",
	"\u8D54",
	"\u8D55",
	"\u8D56",
	"\u8D57",
	"\u8D58",
	"\u8D59",
	"\u8D5A",
	"\u8D5B",
	"\u8D5C",
	"\u8D5D",
	"\u8D5E",
	"\u8D5F",
	"\u8D60",
	"\u8D61",
	"\u8D62",
	"\u8D63",
	"\u8D6A",
	"\u8D75",
	"\u8D76",
	"\u8D8B",
	"\u8DB1",
	"\u8DB8",
	"\u8DC3",
	"\u8DC4",
	"\u8DDE",
	"\u8DF5",
	"\u8DF6",
	"\u8DF7",
	"\u8DF8",
	"\u8DF9",
	"\u8DFB",
	"\u8E0A",
	"\u8E0C",
	"\u8E2A",
	"\u8E2C",
	"\u8E2F",
	"\u8E51",
	"\u8E52",
	"\u8E70",
	"\u8E7F",
	"\u8E8F",
	"\u8E9C",
	"\u8EAF",
	"\u8F66",
	"\u8F67",
	"\u8F68",
	"\u8F69",
	"\u8F6A",
	"\u8F6B",
	"\u8F6C",
	"\u8F6D",
	"\u8F6E",
	"\u8F6F",
	"\u8F70",
	"\u8F71",
	"\u8F72",
	"\u8F73",
	"\u8F74",
	"\u8F75",
	"\u8F76",
	"\u8F77",
	"\u8F78",
	"\u8F79",
	"\u8F7A",
	"\u8F7B",
	"\u8F7C",
	"\u8F7D",
	"\u8F7E",
	"\u8F7F",
	"\u8F80",
	"\u8F81",
	"\u8F82",
	"\u8F83",
	"\u8F84",
	"\u8F85",
	"\u8F86",
	"\u8F87",
	"\u8F88",
	"\u8F89",
	"\u8F8A",
	"\u8F8B",
	"\u8F8C",
	"\u8F8D",
	"\u8F8E",
	"\u8F8F",
	"\u8F90",
	"\u8F91",
	"\u8F92",
	"\u8F93",
	"\u8F94",
	"\u8F95",
	"\u8F96",
	"\u8F97",
	"\u8F98",
	"\u8F99",
	"\u8F9A",
	"\u8F9E",
	"\u8F9F",
	"\u8FA9",
	"\u8FAB",
	"\u8FB9",
	"\u8FBD",
	"\u8FBE",
	"\u8FC1",
	"\u8FC7",
	"\u8FC8",
	"\u8FD0",
	"\u8FD8",
	"\u8FD9",
	"\u8FDB",
	"\u8FDC",
	"\u8FDD",
	"\u8FDE",
	"\u8FDF",
	"\u8FE9",
	"\u8FF3",
	"\u8FF9",
	"\u9002",
	"\u9009",
	"\u900A",
	"\u9012",
	"\u9026",
	"\u903B",
	"\u9057",
	"\u9065",
	"\u9093",
	"\u909D",
	"\u90AC",
	"\u90AE",
	"\u90B9",
	"\u90BA",
	"\u90BB",
	"\u90C1",
	"\u90CF",
	"\u90D0",
	"\u90D1",
	"\u90D3",
	"\u90E6",
	"\u90E7",
	"\u90F8",
	"\u9142",
	"\u915D",
	"\u9166",
	"\u9171",
	"\u917D",
	"\u917E",
	"\u917F",
	"\u91C7",
	"\u91CA",
	"\u91CC",
	"\u9274",
	"\u92AE",
	"\u933E",
	"\u9485",
	"\u9486",
	"\u9487",
	"\u9488",
	"\u9489",
	"\u948A",
	"\u948B",
	"\u948C",
	"\u948D",
	"\u948E",
	"\u948F",
	"\u9490",
	"\u9491",
	"\u9492",
	"\u9493",
	"\u9494",
	"\u9495",
	"\u9496",
	"\u9497",
	"\u9498",
	"\u9499",
	"\u949A",
	"\u949B",
	"\u949C",
	"\u949D",
	"\u949E",
	"\u949F",
	"\u94A0",
	"\u94A1",
	"\u94A2",
	"\u94A3",
	"\u94A4",
	"\u94A5",
	"\u94A6",
	"\u94A7",
	"\u94A8",
	"\u94A9",
	"\u94AA",
	"\u94AB",
	"\u94AC",
	"\u94AD",
	"\u94AE",
	"\u94AF",
	"\u94B0",
	"\u94B1",
	"\u94B2",
	"\u94B3",
	"\u94B4",
	"\u94B5",
	"\u94B6",
	"\u94B7",
	"\u94B8",
	"\u94B9",
	"\u94BA",
	"\u94BB",
	"\u94BC",
	"\u94BD",
	"\u94BE",
	"\u94BF",
	"\u94C0",
	"\u94C1",
	"\u94C2",
	"\u94C3",
	"\u94C4",
	"\u94C5",
	"\u94C6",
	"\u94C7",
	"\u94C8",
	"\u94C9",
	"\u94CA",
	"\u94CB",
	"\u94CC",
	"\u94CD",
	"\u94CE",
	"\u94CF",
	"\u94D0",
	"\u94D1",
	"\u94D2",
	"\u94D3",
	"\u94D4",
	"\u94D5",
	"\u94D6",
	"\u94D7",
	"\u94D8",
	"\u94D9",
	"\u94DA",
	"\u94DB",
	"\u94DC",
	"\u94DD",
	"\u94DE",
	"\u94DF",
	"\u94E0",
	"\u94E1",
	"\u94E2",
	"\u94E3",
	"\u94E4",
	"\u94E5",
	"\u94E6",
	"\u94E7",
	"\u94E8",
	"\u94E9",
	"\u94EA",
	"\u94EB",
	"\u94EC",
	"\u94ED",
	"\u94EE",
	"\u94EF",
	"\u94F0",
	"\u94F1",
	"\u94F2",
	"\u94F3",
	"\u94F4",
	"\u94F5",
	"\u94F6",
	"\u94F7",
	"\u94F8",
	"\u94F9",
	"\u94FA",
	"\u94FB",
	"\u94FC",
	"\u94FD",
	"\u94FE",
	"\u94FF",
	"\u9500",
	"\u9501",
	"\u9502",
	"\u9503",
	"\u9504",
	"\u9505",
	"\u9506",
	"\u9507",
	"\u9508",
	"\u9509",
	"\u950A",
	"\u950B",
	"\u950C",
	"\u950D",
	"\u950E",
	"\u950F",
	"\u9510",
	"\u9511",
	"\u9512",
	"\u9513",
	"\u9514",
	"\u9515",
	"\u9516",
	"\u9517",
	"\u9518",
	"\u9519",
	"\u951A",
	"\u951B",
	"\u951C",
	"\u951D",
	"\u951E",
	"\u951F",
	"\u9520",
	"\u9521",
	"\u9522",
	"\u9523",
	"\u9524",
	"\u9525",
	"\u9526",
	"\u9527",
	"\u9528",
	"\u9529",
	"\u952A",
	"\u952B",
	"\u952C",
	"\u952D",
	"\u952E",
	"\u952F",
	"\u9530",
	"\u9531",
	"\u9532",
	"\u9533",
	"\u9534",
	"\u9535",
	"\u9536",
	"\u9537",
	"\u9538",
	"\u9539",
	"\u953A",
	"\u953B",
	"\u953C",
	"\u953D",
	"\u953E",
	"\u953F",
	"\u9540",
	"\u9541",
	"\u9542",
	"\u9543",
	"\u9544",
	"\u9545",
	"\u9546",
	"\u9547",
	"\u9548",
	"\u9549",
	"\u954A",
	"\u954B",
	"\u954C",
	"\u954D",
	"\u954E",
	"\u954F",
	"\u9550",
	"\u9551",
	"\u9552",
	"\u9553",
	"\u9554",
	"\u9555",
	"\u9556",
	"\u9557",
	"\u9558",
	"\u9559",
	"\u955A",
	"\u955B",
	"\u955C",
	"\u955D",
	"\u955E",
	"\u955F",
	"\u9560",
	"\u9561",
	"\u9562",
	"\u9563",
	"\u9564",
	"\u9565",
	"\u9566",
	"\u9567",
	"\u9568",
	"\u9569",
	"\u956A",
	"\u956B",
	"\u956C",
	"\u956D",
	"\u956E",
	"\u956F",
	"\u9570",
	"\u9571",
	"\u9572",
	"\u9573",
	"\u9574",
	"\u9575",
	"\u9576",
	"\u957F",
	"\u95E8",
	"\u95E9",
	"\u95EA",
	"\u95EB",
	"\u95EC",
	"\u95ED",
	"\u95EE",
	"\u95EF",
	"\u95F0",
	"\u95F1",
	"\u95F2",
	"\u95F3",
	"\u95F4",
	"\u95F5",
	"\u95F6",
	"\u95F7",
	"\u95F8",
	"\u95F9",
	"\u95FA",
	"\u95FB",
	"\u95FC",
	"\u95FD",
	"\u95FE",
	"\u95FF",
	"\u9600",
	"\u9601",
	"\u9602",
	"\u9603",
	"\u9604",
	"\u9605",
	"\u9606",
	"\u9607",
	"\u9608",
	"\u9609",
	"\u960A",
	"\u960B",
	"\u960C",
	"\u960D",
	"\u960E",
	"\u960F",
	"\u9610",
	"\u9611",
	"\u9612",
	"\u9613",
	"\u9614",
	"\u9615",
	"\u9616",
	"\u9617",
	"\u9618",
	"\u9619",
	"\u961A",
	"\u961B",
	"\u961F",
	"\u9633",
	"\u9634",
	"\u9635",
	"\u9636",
	"\u9645",
	"\u9646",
	"\u9647",
	"\u9648",
	"\u9649",
	"\u9655",
	"\u9666",
	"\u9667",
	"\u9668",
	"\u9669",
	"\u968F",
	"\u9690",
	"\u96B6",
	"\u96BD",
	"\u96BE",
	"\u96CF",
	"\u96E0",
	"\u96F3",
	"\u96FE",
	"\u9701",
	"\u9709",
	"\u9721",
	"\u972D",
	"\u9753",
	"\u9759",
	"\u9762",
	"\u9765",
	"\u9791",
	"\u9792",
	"\u97AF",
	"\u97E6",
	"\u97E7",
	"\u97E8",
	"\u97E9",
	"\u97EA",
	"\u97EB",
	"\u97EC",
	"\u97F5",
	"\u9875",
	"\u9876",
	"\u9877",
	"\u9878",
	"\u9879",
	"\u987A",
	"\u987B",
	"\u987C",
	"\u987D",
	"\u987E",
	"\u987F",
	"\u9880",
	"\u9881",
	"\u9882",
	"\u9883",
	"\u9884",
	"\u9885",
	"\u9886",
	"\u9887",
	"\u9888",
	"\u9889",
	"\u988A",
	"\u988B",
	"\u988C",
	"\u988D",
	"\u988E",
	"\u988F",
	"\u9890",
	"\u9891",
	"\u9892",
	"\u9893",
	"\u9894",
	"\u9895",
	"\u9896",
	"\u9897",
	"\u9898",
	"\u9899",
	"\u989A",
	"\u989B",
	"\u989C",
	"\u989D",
	"\u989E",
	"\u989F",
	"\u98A0",
	"\u98A1",
	"\u98A2",
	"\u98A3",
	"\u98A4",
	"\u98A5",
	"\u98A6",
	"\u98A7",
	"\u98CE",
	"\u98CF",
	"\u98D0",
	"\u98D1",
	"\u98D2",
	"\u98D3",
	"\u98D4",
	"\u98D5",
	"\u98D6",
	"\u98D7",
	"\u98D8",
	"\u98D9",
	"\u98DA",
	"\u98DE",
	"\u98E8",
	"\u990D",
	"\u9963",
	"\u9964",
	"\u9965",
	"\u9966",
	"\u9967",
	"\u9968",
	"\u9969",
	"\u996A",
	"\u996B",
	"\u996C",
	"\u996D",
	"\u996E",
	"\u996F",
	"\u9970",
	"\u9971",
	"\u9972",
	"\u9973",
	"\u9974",
	"\u9975",
	"\u9976",
	"\u9977",
	"\u9978",
	"\u9979",
	"\u997A",
	"\u997B",
	"\u997C",
	"\u997D",
	"\u997E",
	"\u997F",
	"\u9980",
	"\u9981",
	"\u9982",
	"\u9983",
	"\u9984",
	"\u9985",
	"\u9986",
	"\u9987",
	"\u9988",
	"\u9989",
	"\u998A",
	"\u998B",
	"\u998C",
	"\u998D",
	"\u998E",
	"\u998F",
	"\u9990",
	"\u9991",
	"\u9992",
	"\u9993",
	"\u9994",
	"\u9995",
	"\u9A6C",
	"\u9A6D",
	"\u9A6E",
	"\u9A6F",
	"\u9A70",
	"\u9A71",
	"\u9A72",
	"\u9A73",
	"\u9A74",
	"\u9A75",
	"\u9A76",
	"\u9A77",
	"\u9A78",
	"\u9A79",
	"\u9A7A",
	"\u9A7B",
	"\u9A7C",
	"\u9A7D",
	"\u9A7E",
	"\u9A7F",
	"\u9A80",
	"\u9A81",
	"\u9A82",
	"\u9A83",
	"\u9A84",
	"\u9A85",
	"\u9A86",
	"\u9A87",
	"\u9A88",
	"\u9A89",
	"\u9A8A",
	"\u9A8B",
	"\u9A8C",
	"\u9A8D",
	"\u9A8E",
	"\u9A8F",
	"\u9A90",
	"\u9A91",
	"\u9A92",
	"\u9A93",
	"\u9A94",
	"\u9A95",
	"\u9A96",
	"\u9A97",
	"\u9A98",
	"\u9A99",
	"\u9A9A",
	"\u9A9B",
	"\u9A9C",
	"\u9A9D",
	"\u9A9E",
	"\u9A9F",
	"\u9AA0",
	"\u9AA1",
	"\u9AA2",
	"\u9AA3",
	"\u9AA4",
	"\u9AA5",
	"\u9AA6",
	"\u9AA7",
	"\u9AC5",
	"\u9ACB",
	"\u9ACC",
	"\u9B13",
	"\u9B36",
	"\u9B47",
	"\u9B49",
	"\u9C7C",
	"\u9C7D",
	"\u9C7E",
	"\u9C7F",
	"\u9C80",
	"\u9C81",
	"\u9C82",
	"\u9C83",
	"\u9C84",
	"\u9C85",
	"\u9C86",
	"\u9C87",
	"\u9C88",
	"\u9C89",
	"\u9C8A",
	"\u9C8B",
	"\u9C8C",
	"\u9C8D",
	"\u9C8E",
	"\u9C8F",
	"\u9C90",
	"\u9C91",
	"\u9C92",
	"\u9C93",
	"\u9C94",
	"\u9C95",
	"\u9C96",
	"\u9C97",
	"\u9C98",
	"\u9C99",
	"\u9C9A",
	"\u9C9B",
	"\u9C9C",
	"\u9C9D",
	"\u9C9E",
	"\u9C9F",
	"\u9CA0",
	"\u9CA1",
	"\u9CA2",
	"\u9CA3",
	"\u9CA4",
	"\u9CA5",
	"\u9CA6",
	"\u9CA7",
	"\u9CA8",
	"\u9CA9",
	"\u9CAA",
	"\u9CAB",
	"\u9CAC",
	"\u9CAD",
	"\u9CAE",
	"\u9CAF",
	"\u9CB0",
	"\u9CB1",
	"\u9CB2",
	"\u9CB3",
	"\u9CB4",
	"\u9CB5",
	"\u9CB6",
	"\u9CB7",
	"\u9CB8",
	"\u9CB9",
	"\u9CBA",
	"\u9CBB",
	"\u9CBC",
	"\u9CBD",
	"\u9CBE",
	"\u9CBF",
	"\u9CC0",
	"\u9CC1",
	"\u9CC2",
	"\u9CC3",
	"\u9CC4",
	"\u9CC5",
	"\u9CC6",
	"\u9CC7",
	"\u9CC8",
	"\u9CC9",
	"\u9CCA",
	"\u9CCB",
	"\u9CCC",
	"\u9CCD",
	"\u9CCE",
	"\u9CCF",
	"\u9CD0",
	"\u9CD1",
	"\u9CD2",
	"\u9CD3",
	"\u9CD4",
	"\u9CD5",
	"\u9CD6",
	"\u9CD7",
	"\u9CD8",
	"\u9CD9",
	"\u9CDA",
	"\u9CDB",
	"\u9CDC",
	"\u9CDD",
	"\u9CDE",
	"\u9CDF",
	"\u9CE0",
	"\u9CE1",
	"\u9CE2",
	"\u9CE3",
	"\u9CE4",
	"\u9E1F",
	"\u9E20",
	"\u9E21",
	"\u9E22",
	"\u9E23",
	"\u9E24",
	"\u9E25",
	"\u9E26",
	"\u9E27",
	"\u9E28",
	"\u9E29",
	"\u9E2A",
	"\u9E2B",
	"\u9E2C",
	"\u9E2D",
	"\u9E2E",
	"\u9E2F",
	"\u9E30",
	"\u9E31",
	"\u9E32",
	"\u9E33",
	"\u9E34",
	"\u9E35",
	"\u9E36",
	"\u9E37",
	"\u9E38",
	"\u9E39",
	"\u9E3A",
	"\u9E3B",
	"\u9E3C",
	"\u9E3D",
	"\u9E3E",
	"\u9E3F",
	"\u9E40",
	"\u9E41",
	"\u9E42",
	"\u9E43",
	"\u9E44",
	"\u9E45",
	"\u9E46",
	"\u9E47",
	"\u9E48",
	"\u9E49",
	"\u9E4A",
	"\u9E4B",
	"\u9E4C",
	"\u9E4D",
	"\u9E4E",
	"\u9E4F",
	"\u9E50",
	"\u9E51",
	"\u9E52",
	"\u9E53",
	"\u9E54",
	"\u9E55",
	"\u9E56",
	"\u9E57",
	"\u9E58",
	"\u9E59",
	"\u9E5A",
	"\u9E5B",
	"\u9E5C",
	"\u9E5D",
	"\u9E5E",
	"\u9E5F",
	"\u9E60",
	"\u9E61",
	"\u9E62",
	"\u9E63",
	"\u9E64",
	"\u9E65",
	"\u9E66",
	"\u9E67",
	"\u9E68",
	"\u9E69",
	"\u9E6A",
	"\u9E6B",
	"\u9E6C",
	"\u9E6D",
	"\u9E6E",
	"\u9E6F",
	"\u9E70",
	"\u9E71",
	"\u9E72",
	"\u9E73",
	"\u9E74",
	"\u9E7E",
	"\u9EA6",
	"\u9EB8",
	"\u9EB9",
	"\u9EC4",
	"\u9EC9",
	"\u9EE1",
	"\u9EE9",
	"\u9EEA",
	"\u9EFE",
	"\u9F0B",
	"\u9F0D",
	"\u9F17",
	"\u9F39",
	"\u9F50",
	"\u9F51",
	"\u9F7F",
	"\u9F80",
	"\u9F81",
	"\u9F82",
	"\u9F83",
	"\u9F84",
	"\u9F85",
	"\u9F86",
	"\u9F87",
	"\u9F88",
	"\u9F89",
	"\u9F8A",
	"\u9F8B",
	"\u9F8C",
	"\u9F99",
	"\u9F9A",
	"\u9F9B",
	"\u9F9F",
	"\u9FCE",
	"\u9FCF",
	"\u9FD2",
	"\u9FD4",
	"\u9FD5",
	"\u9FDF",
	"\u9FED",
	"\u9FF0",
	"\u9FF2",
	"\u9FF4",
	"\u9FF5",
	"\u9FF6",
	"\u9FF7",
	"\u9FF8",
	"\u9FF9",
	"\u9FFA",
	"\u2003E",
	"\u200B2",
	"\u200D3",
	"\u201B2",
	"\u201BF",
	"\u201D0",
	"\u201F9",
	"\u20242",
	"\u20257",
	"\u206B3",
	"\u206C5",
	"\u206C6",
	"\u206FE",
	"\u20860",
	"\u20B24",
	"\u20BDF",
	"\u20BE0",
	"\u20C37",
	"\u20C5E",
	"\u20CA5",
	"\u20CDE",
	"\u20D22",
	"\u20D78",
	"\u20D7E",
	"\u2121B",
	"\u21291",
	"\u212C0",
	"\u212D7",
	"\u212E4",
	"\u213C6",
	"\u21484",
	"\u21760",
	"\u2178B",
	"\u217B1",
	"\u2181F",
	"\u21847",
	"\u21967",
	"\u21B5C",
	"\u21B6C",
	"\u21CC3",
	"\u21CD2",
	"\u21D5D",
	"\u21DB4",
	"\u21E03",
	"\u21E83",
	"\u21ED8",
	"\u22016",
	"\u222C8",
	"\u224C5",
	"\u225D3",
	"\u22619",
	"\u2261D",
	"\u2261E",
	"\u22650",
	"\u22651",
	"\u22652",
	"\u22653",
	"\u226EF",
	"\u227FC",
	"\u229D0",
	"\u22A93",
	"\u22A97",
	"\u22ACA",
	"\u22AD8",
	"\u22ADE",
	"\u22AEC",
	"\u22B0D",
	"\u22B26",
	"\u22B4F",
	"\u22DA3",
	"\u22F7E",
	"\u230C1",
	"\u23190",
	"\u23223",
	"\u2327C",
	"\u23368",
	"\u2336F",
	"\u23370",
	"\u23391",
	"\u233E2",
	"\u23415",
	"\u23424",
	"\u2345D",
	"\u23476",
	"\u2348C",
	"\u23497",
	"\u234FF",
	"\u23572",
	"\u235CA",
	"\u235CB",
	"\u23610",
	"\u23613",
	"\u23634",
	"\u23637",
	"\u2363E",
	"\u23665",
	"\u2369A",
	"\u2378E",
	"\u23A3C",
	"\u23B64",
	"\u23BE3",
	"\u23C5D",
	"\u23C97",
	"\u23C98",
	"\u23CC6",
	"\u23DA9",
	"\u23DAB",
	"\u23E23",
	"\u23EBC",
	"\u23EBD",
	"\u23F77",
	"\u23F8D",
	"\u241A1",
	"\u241A2",
	"\u241C3",
	"\u241C4",
	"\u241ED",
	"\u241FB",
	"\u24236",
	"\u24237",
	"\u24280",
	"\u242CF",
	"\u243BA",
	"\u243BB",
	"\u2466F",
	"\u24735",
	"\u24762",
	"\u24783",
	"\u247A4",
	"\u2480B",
	"\u24980",
	"\u24A7D",
	"\u24CC4",
	"\u24D8A",
	"\u24DA7",
	"\u24E7A",
	"\u24ECA",
	"\u24F6F",
	"\u24F80",
	"\u24FF2",
	"\u25062",
	"\u25158",
	"\u25174",
	"\u251A7",
	"\u251E2",
	"\u2539D",
	"\u2541F",
	"\u2542F",
	"\u25430",
	"\u2543B",
	"\u25564",
	"\u257A6",
	"\u257C2",
	"\u259C2",
	"\u25A7A",
	"\u25B00",
	"\u25B08",
	"\u25B1E",
	"\u25B20",
	"\u25B49",
	"\u25B8B",
	"\u25B9C",
	"\u25BBE",
	"\u25C54",
	"\u25E65",
	"\u25E85",
	"\u25E87",
	"\u26208",
	"\u26209",
	"\u2620B",
	"\u2620C",
	"\u2620E",
	"\u2620F",
	"\u26210",
	"\u26211",
	"\u26212",
	"\u26213",
	"\u26214",
	"\u26215",
	"\u26216",
	"\u26217",
	"\u26218",
	"\u26219",
	"\u2621A",
	"\u2621B",
	"\u2621C",
	"\u2621D",
	"\u2621E",
	"\u2621F",
	"\u26220",
	"\u26221",
	"\u26360",
	"\u266E8",
	"\u2677C",
	"\u2678C",
	"\u267D7",
	"\u26A29",
	"\u26B19",
	"\u26C34",
	"\u26D07",
	"\u26ED5",
	"\u27234",
	"\u2723F",
	"\u27250",
	"\u2725E",
	"\u273D6",
	"\u273D7",
	"\u2744F",
	"\u274AD",
	"\u27721",
	"\u2772D",
	"\u2775D",
	"\u27924",
	"\u27945",
	"\u27BAA",
	"\u27CD5",
	"\u27E51",
	"\u27E52",
	"\u27E53",
	"\u27E54",
	"\u27E55",
	"\u27E56",
	"\u27E57",
	"\u27EA3",
	"\u27FC8",
	"\u27FDB",
	"\u28001",
	"\u28031",
	"\u28074",
	"\u280BA",
	"\u28104",
	"\u2815B",
	"\u2816B",
	"\u2816C",
	"\u28257",
	"\u28405",
	"\u28406",
	"\u28407",
	"\u28408",
	"\u28409",
	"\u2840A",
	"\u28479",
	"\u28755",
	"\u287F3",
	"\u28828",
	"\u28859",
	"\u2887A",
	"\u288B8",
	"\u28930",
	"\u289EE",
	"\u28C3E",
	"\u28C3F",
	"\u28C40",
	"\u28C41",
	"\u28C42",
	"\u28C43",
	"\u28C44",
	"\u28C45",
	"\u28C46",
	"\u28C47",
	"\u28C48",
	"\u28C49",
	"\u28C4A",
	"\u28C4B",
	"\u28C4C",
	"\u28C4D",
	"\u28C4E",
	"\u28C4F",
	"\u28C50",
	"\u28C51",
	"\u28C52",
	"\u28C53",
	"\u28C54",
	"\u28C55",
	"\u28C56",
	"\u28DFF",
	"\u28E00",
	"\u28E01",
	"\u28E02",
	"\u28E03",
	"\u28E04",
	"\u28E05",
	"\u28E06",
	"\u28E07",
	"\u28E09",
	"\u28E0A",
	"\u28E0B",
	"\u28E0C",
	"\u28E0E",
	"\u28E18",
	"\u28E1F",
	"\u28EF9",
	"\u293FC",
	"\u293FD",
	"\u293FE",
	"\u293FF",
	"\u29400",
	"\u29595",
	"\u29596",
	"\u29597",
	"\u29665",
	"\u29666",
	"\u29667",
	"\u29668",
	"\u29669",
	"\u2966A",
	"\u2966B",
	"\u2966C",
	"\u2966D",
	"\u2966E",
	"\u2966F",
	"\u29670",
	"\u297FF",
	"\u29800",
	"\u29801",
	"\u29802",
	"\u29803",
	"\u29805",
	"\u29806",
	"\u29807",
	"\u29808",
	"\u29809",
	"\u2980A",
	"\u2980B",
	"\u2980C",
	"\u2980E",
	"\u2980F",
	"\u29820",
	"\u29856",
	"\u2985A",
	"\u299E6",
	"\u299E8",
	"\u299E9",
	"\u299EA",
	"\u299EB",
	"\u299EC",
	"\u299ED",
	"\u299EE",
	"\u299EF",
	"\u299F0",
	"\u299F1",
	"\u299F2",
	"\u299F3",
	"\u299F4",
	"\u299F5",
	"\u299F6",
	"\u299F8",
	"\u299FA",
	"\u299FB",
	"\u299FC",
	"\u299FF",
	"\u29A00",
	"\u29A01",
	"\u29A03",
	"\u29A04",
	"\u29A05",
	"\u29A06",
	"\u29A07",
	"\u29A08",
	"\u29A09",
	"\u29A0A",
	"\u29A0B",
	"\u29A0C",
	"\u29A0D",
	"\u29A0E",
	"\u29A0F",
	"\u29A10",
	"\u29A48",
	"\u29B23",
	"\u29B24",
	"\u29B3E",
	"\u29B79",
	"\u29BD2",
	"\u29C30",
	"\u29C92",
	"\u29D0C",
	"\u29F79",
	"\u29F7A",
	"\u29F7B",
	"\u29F7C",
	"\u29F7D",
	"\u29F7E",
	"\u29F7F",
	"\u29F81",
	"\u29F82",
	"\u29F83",
	"\u29F84",
	"\u29F85",
	"\u29F86",
	"\u29F87",
	"\u29F88",
	"\u29F8A",
	"\u29F8B",
	"\u29F8C",
	"\u29F8E",
	"\u2A242",
	"\u2A243",
	"\u2A244",
	"\u2A245",
	"\u2A246",
	"\u2A248",
	"\u2A249",
	"\u2A24A",
	"\u2A24B",
	"\u2A24C",
	"\u2A24D",
	"\u2A24E",
	"\u2A24F",
	"\u2A250",
	"\u2A251",
	"\u2A252",
	"\u2A254",
	"\u2A255",
	"\u2A388",
	"\u2A389",
	"\u2A38A",
	"\u2A38B",
	"\u2A38C",
	"\u2A445",
	"\u2A52D",
	"\u2A68F",
	"\u2A690",
	"\u2A6DE",
	"\u2A70E",
	"\u2A73A",
	"\u2A79D",
	"\u2A7CE",
	"\u2A7DD",
	"\u2A7F2",
	"\u2A800",
	"\u2A803",
	"\u2A80F",
	"\u2A81F",
	"\u2A821",
	"\u2A833",
	"\u2A835",
	"\u2A838",
	"\u2A83D",
	"\u2A840",
	"\u2A843",
	"\u2A84B",
	"\u2A84F",
	"\u2A85B",
	"\u2A85E",
	"\u2A87A",
	"\u2A888",
	"\u2A88B",
	"\u2A88C",
	"\u2A890",
	"\u2A892",
	"\u2A895",
	"\u2A8A0",
	"\u2A8AE",
	"\u2A8C6",
	"\u2A8D2",
	"\u2A8FB",
	"\u2A904",
	"\u2A905",
	"\u2A91A",
	"\u2A960",
	"\u2A96B",
	"\u2A970",
	"\u2A97F",
	"\u2A9C0",
	"\u2A9D8",
	"\u2AA07",
	"\u2AA0A",
	"\u2AA17",
	"\u2AA27",
	"\u2AA29",
	"\u2AA36",
	"\u2AA37",
	"\u2AA39",
	"\u2AA47",
	"\u2AA4E",
	"\u2AA58",
	"\u2AA5B",
	"\u2AA78",
	"\u2AA91",
	"\u2AA9E",
	"\u2AAB4",
	"\u2AACC",
	"\u2AAE1",
	"\u2AAF7",
	"\u2AAF8",
	"\u2AAFA",
	"\u2AB1A",
	"\u2AB2F",
	"\u2AB5D",
	"\u2AB62",
	"\u2AB67",
	"\u2AB6F",
	"\u2AB75",
	"\u2AB7E",
	"\u2AB83",
	"\u2AB8B",
	"\u2AB96",
	"\u2ABB3",
	"\u2ABB6",
	"\u2ABCB",
	"\u2AC36",
	"\u2AC65",
	"\u2AC77",
	"\u2AC8E",
	"\u2AC94",
	"\u2AC9B",
	"\u2ACAE",
	"\u2ACCD",
	"\u2AD19",
	"\u2AD2F",
	"\u2AD47",
	"\u2AD51",
	"\u2AD63",
	"\u2AD71",
	"\u2AD84",
	"\u2AD92",
	"\u2ADAE",
	"\u2ADCD",
	"\u2ADFD",
	"\u2AE15",
	"\u2AE29",
	"\u2AE40",
	"\u2AE60",
	"\u2AE73",
	"\u2AE79",
	"\u2AEA3",
	"\u2AEAA",
	"\u2AEAD",
	"\u2AEB7",
	"\u2AEB8",
	"\u2AEBB",
	"\u2AEBD",
	"\u2AED0",
	"\u2AEE8",
	"\u2AEF2",
	"\u2AEFA",
	"\u2AF0B",
	"\u2AF34",
	"\u2AF42",
	"\u2AF5D",
	"\u2AF6A",
	"\u2AF6D",
	"\u2AF6E",
	"\u2AF74",
	"\u2AF77",
	"\u2AF94",
	"\u2AFA2",
	"\u2AFA6",
	"\u2AFB8",
	"\u2AFCA",
	"\u2AFDE",
	"\u2AFEB",
	"\u2AFF5",
	"\u2B00C",
	"\u2B013",
	"\u2B028",
	"\u2B02C",
	"\u2B02E",
	"\u2B042",
	"\u2B05F",
	"\u2B061",
	"\u2B072",
	"\u2B073",
	"\u2B077",
	"\u2B07A",
	"\u2B083",
	"\u2B086",
	"\u2B088",
	"\u2B096",
	"\u2B0BF",
	"\u2B0D7",
	"\u2B119",
	"\u2B11A",
	"\u2B11B",
	"\u2B11C",
	"\u2B11D",
	"\u2B11E",
	"\u2B11F",
	"\u2B120",
	"\u2B121",
	"\u2B122",
	"\u2B123",
	"\u2B124",
	"\u2B125",
	"\u2B126",
	"\u2B127",
	"\u2B128",
	"\u2B129",
	"\u2B12A",
	"\u2B12B",
	"\u2B12C",
	"\u2B12D",
	"\u2B12E",
	"\u2B12F",
	"\u2B130",
	"\u2B131",
	"\u2B132",
	"\u2B133",
	"\u2B134",
	"\u2B135",
	"\u2B136",
	"\u2B137",
	"\u2B138",
	"\u2B139",
	"\u2B145",
	"\u2B157",
	"\u2B165",
	"\u2B16D",
	"\u2B17C",
	"\u2B18F",
	"\u2B19D",
	"\u2B1AB",
	"\u2B1D8",
	"\u2B1E6",
	"\u2B1EA",
	"\u2B1ED",
	"\u2B1F4",
	"\u2B1FD",
	"\u2B209",
	"\u2B20E",
	"\u2B21F",
	"\u2B235",
	"\u2B241",
	"\u2B244",
	"\u2B2AA",
	"\u2B2AE",
	"\u2B2B1",
	"\u2B2B8",
	"\u2B2B9",
	"\u2B2BB",
	"\u2B2C7",
	"\u2B2CC",
	"\u2B2F2",
	"\u2B2F7",
	"\u2B2F9",
	"\u2B2FB",
	"\u2B300",
	"\u2B307",
	"\u2B30B",
	"\u2B328",
	"\u2B329",
	"\u2B32A",
	"\u2B32B",
	"\u2B32C",
	"\u2B32D",
	"\u2B32F",
	"\u2B34F",
	"\u2B350",
	"\u2B359",
	"\u2B35A",
	"\u2B35B",
	"\u2B35C",
	"\u2B35E",
	"\u2B35F",
	"\u2B360",
	"\u2B361",
	"\u2B362",
	"\u2B363",
	"\u2B364",
	"\u2B365",
	"\u2B366",
	"\u2B367",
	"\u2B368",
	"\u2B369",
	"\u2B36A",
	"\u2B36B",
	"\u2B36C",
	"\u2B36D",
	"\u2B36E",
	"\u2B36F",
	"\u2B370",
	"\u2B371",
	"\u2B372",
	"\u2B373",
	"\u2B374",
	"\u2B375",
	"\u2B376",
	"\u2B377",
	"\u2B378",
	"\u2B379",
	"\u2B37A",
	"\u2B37B",
	"\u2B37C",
	"\u2B37D",
	"\u2B37E",
	"\u2B37F",
	"\u2B386",
	"\u2B38C",
	"\u2B3A6",
	"\u2B3A7",
	"\u2B3A8",
	"\u2B3A9",
	"\u2B3AA",
	"\u2B3AB",
	"\u2B3AC",
	"\u2B3AD",
	"\u2B3B1",
	"\u2B3B3",
	"\u2B3B8",
	"\u2B3BA",
	"\u2B3C3",
	"\u2B3C6",
	"\u2B3CB",
	"\u2B3CC",
	"\u2B3D0",
	"\u2B3D1",
	"\u2B3D5",
	"\u2B3DE",
	"\u2B3E8",
	"\u2B404",
	"\u2B405",
	"\u2B406",
	"\u2B407",
	"\u2B408",
	"\u2B409",
	"\u2B40A",
	"\u2B40B",
	"\u2B40C",
	"\u2B40D",
	"\u2B40E",
	"\u2B40F",
	"\u2B410",
	"\u2B411",
	"\u2B412",
	"\u2B413",
	"\u2B414",
	"\u2B415",
	"\u2B416",
	"\u2B417",
	"\u2B418",
	"\u2B419",
	"\u2B437",
	"\u2B458",
	"\u2B461",
	"\u2B477",
	"\u2B4E5",
	"\u2B4E6",
	"\u2B4E7",
	"\u2B4E8",
	"\u2B4E9",
	"\u2B4EA",
	"\u2B4EB",
	"\u2B4EC",
	"\u2B4ED",
	"\u2B4EE",
	"\u2B4EF",
	"\u2B4F0",
	"\u2B4F1",
	"\u2B4F2",
	"\u2B4F3",
	"\u2B4F4",
	"\u2B4F5",
	"\u2B4F6",
	"\u2B4F7",
	"\u2B4F8",
	"\u2B4F9",
	"\u2B4FA",
	"\u2B4FB",
	"\u2B4FC",
	"\u2B4FD",
	"\u2B4FE",
	"\u2B4FF",
	"\u2B500",
	"\u2B501",
	"\u2B502",
	"\u2B503",
	"\u2B504",
	"\u2B505",
	"\u2B506",
	"\u2B507",
	"\u2B508",
	"\u2B509",
	"\u2B50A",
	"\u2B50B",
	"\u2B50C",
	"\u2B50D",
	"\u2B50E",
	"\u2B50F",
	"\u2B510",
	"\u2B511",
	"\u2B512",
	"\u2B513",
	"\u2B514",
	"\u2B515",
	"\u2B516",
	"\u2B52D",
	"\u2B52F",
	"\u2B530",
	"\u2B531",
	"\u2B532",
	"\u2B534",
	"\u2B535",
	"\u2B536",
	"\u2B53D",
	"\u2B55A",
	"\u2B565",
	"\u2B568",
	"\u2B583",
	"\u2B585",
	"\u2B587",
	"\u2B591",
	"\u2B592",
	"\u2B593",
	"\u2B594",
	"\u2B595",
	"\u2B596",
	"\u2B5AA",
	"\u2B5AB",
	"\u2B5AC",
	"\u2B5AD",
	"\u2B5AE",
	"\u2B5AF",
	"\u2B5B0",
	"\u2B5B1",
	"\u2B5B2",
	"\u2B5B3",
	"\u2B5B4",
	"\u2B5B5",
	"\u2B5B6",
	"\u2B5B7",
	"\u2B5B8",
	"\u2B5B9",
	"\u2B5BA",
	"\u2B5C7",
	"\u2B5C8",
	"\u2B5C9",
	"\u2B5CA",
	"\u2B5CB",
	"\u2B5DA",
	"\u2B5DE",
	"\u2B5DF",
	"\u2B5E0",
	"\u2B5E1",
	"\u2B5E2",
	"\u2B5E3",
	"\u2B5E4",
	"\u2B5E5",
	"\u2B5E6",
	"\u2B5E7",
	"\u2B5E8",
	"\u2B5E9",
	"\u2B5EA",
	"\u2B5EB",
	"\u2B5EC",
	"\u2B5ED",
	"\u2B5EE",
	"\u2B5EF",
	"\u2B5F0",
	"\u2B5F1",
	"\u2B5F2",
	"\u2B5F3",
	"\u2B5F4",
	"\u2B5F5",
	"\u2B61B",
	"\u2B61C",
	"\u2B61D",
	"\u2B61E",
	"\u2B61F",
	"\u2B620",
	"\u2B621",
	"\u2B623",
	"\u2B624",
	"\u2B625",
	"\u2B626",
	"\u2B627",
	"\u2B628",
	"\u2B629",
	"\u2B62A",
	"\u2B62B",
	"\u2B62C",
	"\u2B62D",
	"\u2B62E",
	"\u2B62F",
	"\u2B630",
	"\u2B631",
	"\u2B63D",
	"\u2B642",
	"\u2B688",
	"\u2B689",
	"\u2B68A",
	"\u2B68B",
	"\u2B68C",
	"\u2B68D",
	"\u2B68E",
	"\u2B68F",
	"\u2B690",
	"\u2B691",
	"\u2B692",
	"\u2B693",
	"\u2B694",
	"\u2B695",
	"\u2B696",
	"\u2B697",
	"\u2B698",
	"\u2B699",
	"\u2B69A",
	"\u2B69B",
	"\u2B69C",
	"\u2B69D",
	"\u2B69E",
	"\u2B69F",
	"\u2B6A0",
	"\u2B6A1",
	"\u2B6A2",
	"\u2B6A3",
	"\u2B6A4",
	"\u2B6A5",
	"\u2B6A6",
	"\u2B6A7",
	"\u2B6A8",
	"\u2B6A9",
	"\u2B6AA",
	"\u2B6AB",
	"\u2B6AC",
	"\u2B6AD",
	"\u2B6DA",
	"\u2B6DB",
	"\u2B6DC",
	"\u2B6DD",
	"\u2B6DE",
	"\u2B6DF",
	"\u2B6E0",
	"\u2B6E1",
	"\u2B6E2",
	"\u2B6E3",
	"\u2B6E4",
	"\u2B6E5",
	"\u2B6E6",
	"\u2B6E7",
	"\u2B6E8",
	"\u2B6E9",
	"\u2B6EA",
	"\u2B6EB",
	"\u2B6EC",
	"\u2B6ED",
	"\u2B6EE",
	"\u2B6EF",
	"\u2B6F0",
	"\u2B6F1",
	"\u2B6F2",
	"\u2B6F3",
	"\u2B6F4",
	"\u2B6F5",
	"\u2B6F6",
	"\u2B6F7",
	"\u2B6F8",
	"\u2B6F9",
	"\u2B6FA",
	"\u2B6FB",
	"\u2B6FC",
	"\u2B6FD",
	"\u2B6FE",
	"\u2B700",
	"\u2B701",
	"\u2B702",
	"\u2B703",
	"\u2B704",
	"\u2B705",
	"\u2B70A",
	"\u2B711",
	"\u2B712",
	"\u2B713",
	"\u2B714",
	"\u2B715",
	"\u2B719",
	"\u2B71F",
	"\u2B728",
	"\u2B729",
	"\u2B72A",
	"\u2B72B",
	"\u2B72C",
	"\u2B72D",
	"\u2B72E",
	"\u2B72F",
	"\u2B730",
	"\u2B732",
	"\u2B733",
	"\u2B737",
	"\u2B748",
	"\u2B74B",
	"\u2B761",
	"\u2B766",
	"\u2B767",
	"\u2B768",
	"\u2B769",
	"\u2B76A",
	"\u2B76B",
	"\u2B76C",
	"\u2B76D",
	"\u2B76E",
	"\u2B775",
	"\u2B785",
	"\u2B797",
	"\u2B79A",
	"\u2B79B",
	"\u2B79D",
	"\u2B7A0",
	"\u2B7A1",
	"\u2B7A2",
	"\u2B7A3",
	"\u2B7A5",
	"\u2B7A6",
	"\u2B7A7",
	"\u2B7A8",
	"\u2B7A9",
	"\u2B7B7",
	"\u2B7C3",
	"\u2B7C4",
	"\u2B7C5",
	"\u2B7C6",
	"\u2B7C7",
	"\u2B7D1",
	"\u2B7D5",
	"\u2B7DE",
	"\u2B7DF",
	"\u2B7E0",
	"\u2B7E1",
	"\u2B7E2",
	"\u2B7E4",
	"\u2B7E5",
	"\u2B7E6",
	"\u2B7EB",
	"\u2B7EC",
	"\u2B7F2",
	"\u2B7F3",
	"\u2B7F4",
	"\u2B7F5",
	"\u2B7F6",
	"\u2B7F7",
	"\u2B7F8",
	"\u2B7F9",
	"\u2B7FA",
	"\u2B7FB",
	"\u2B7FC",
	"\u2B7FD",
	"\u2B7FE",
	"\u2B7FF",
	"\u2B800",
	"\u2B801",
	"\u2B802",
	"\u2B805",
	"\u2B806",
	"\u2B807",
	"\u2B808",
	"\u2B80A",
	"\u2B80B",
	"\u2B80C",
	"\u2B80F",
	"\u2B810",
	"\u2B811",
	"\u2B812",
	"\u2B816",
	"\u2B81C",
	"\u2B86C",
	"\u2B876",
	"\u2B892",
	"\u2B894",
	"\u2B898",
	"\u2B899",
	"\u2B89C",
	"\u2B89F",
	"\u2B8A8",
	"\u2B8AA",
	"\u2B8AC",
	"\u2B8AD",
	"\u2B8B2",
	"\u2B8B8",
	"\u2B8B9",
	"\u2B8BA",
	"\u2B8C9",
	"\u2B8CA",
	"\u2B8DB",
	"\u2B8EB",
	"\u2B938",
	"\u2B93D",
	"\u2B94D",
	"\u2B954",
	"\u2B973",
	"\u2B975",
	"\u2B97A",
	"\u2B97C",
	"\u2B97D",
	"\u2B981",
	"\u2B985",
	"\u2B989",
	"\u2B98B",
	"\u2B98C",
	"\u2B9A9",
	"\u2B9B0",
	"\u2B9B3",
	"\u2B9C3",
	"\u2B9EE",
	"\u2B9EF",
	"\u2B9F7",
	"\u2B9FF",
	"\u2BA06",
	"\u2BA55",
	"\u2BA56",
	"\u2BA5A",
	"\u2BA5B",
	"\u2BA64",
	"\u2BA65",
	"\u2BA69",
	"\u2BA6B",
	"\u2BA6F",
	"\u2BA73",
	"\u2BA78",
	"\u2BA7A",
	"\u2BA80",
	"\u2BA81",
	"\u2BA82",
	"\u2BA83",
	"\u2BA84",
	"\u2BA85",
	"\u2BA91",
	"\u2BA98",
	"\u2BA9A",
	"\u2BAA7",
	"\u2BAAA",
	"\u2BABA",
	"\u2BABD",
	"\u2BAC7",
	"\u2BACF",
	"\u2BAE6",
	"\u2BAF5",
	"\u2BAFE",
	"\u2BB10",
	"\u2BB19",
	"\u2BB1F",
	"\u2BB5E",
	"\u2BB5F",
	"\u2BB62",
	"\u2BB68",
	"\u2BB6A",
	"\u2BB6E",
	"\u2BB6F",
	"\u2BB72",
	"\u2BB7C",
	"\u2BB83",
	"\u2BB85",
	"\u2BB9C",
	"\u2BBD2",
	"\u2BBE5",
	"\u2BBF6",
	"\u2BC02",
	"\u2BC0D",
	"\u2BC1B",
	"\u2BC20",
	"\u2BC21",
	"\u2BC22",
	"\u2BC23",
	"\u2BC28",
	"\u2BC30",
	"\u2BC39",
	"\u2BC55",
	"\u2BC7F",
	"\u2BC97",
	"\u2BCB8",
	"\u2BCC3",
	"\u2BD3C",
	"\u2BD75",
	"\u2BD76",
	"\u2BD77",
	"\u2BD78",
	"\u2BD79",
	"\u2BD84",
	"\u2BD85",
	"\u2BD87",
	"\u2BD8A",
	"\u2BD95",
	"\u2BDB2",
	"\u2BDC5",
	"\u2BDC8",
	"\u2BDC9",
	"\u2BDCC",
	"\u2BDD8",
	"\u2BDEC",
	"\u2BDEE",
	"\u2BDF7",
	"\u2BDF9",
	"\u2BDFE",
	"\u2BE29",
	"\u2BE6E",
	"\u2BE74",
	"\u2BE77",
	"\u2BE7C",
	"\u2BE7D",
	"\u2BE81",
	"\u2BE82",
	"\u2BE86",
	"\u2BE8A",
	"\u2BE8C",
	"\u2BE92",
	"\u2BE93",
	"\u2BE98",
	"\u2BEAA",
	"\u2BEAB",
	"\u2BEB7",
	"\u2BEB9",
	"\u2BEC1",
	"\u2BEC7",
	"\u2BF17",
	"\u2BF1D",
	"\u2BF23",
	"\u2BF24",
	"\u2BF25",
	"\u2BF27",
	"\u2BF2B",
	"\u2BF2E",
	"\u2BF31",
	"\u2BF32",
	"\u2BF35",
	"\u2BF36",
	"\u2BF3D",
	"\u2BF3E",
	"\u2BF40",
	"\u2BF41",
	"\u2BF47",
	"\u2BF4A",
	"\u2BF4B",
	"\u2BF50",
	"\u2BF54",
	"\u2BF59",
	"\u2BF62",
	"\u2BF63",
	"\u2BF65",
	"\u2BF67",
	"\u2BF6B",
	"\u2BF6E",
	"\u2BF72",
	"\u2BF73",
	"\u2BF81",
	"\u2BF83",
	"\u2BF89",
	"\u2BF8F",
	"\u2BFB2",
	"\u2BFB3",
	"\u2BFC2",
	"\u2BFD7",
	"\u2C025",
	"\u2C029",
	"\u2C02A",
	"\u2C02E",
	"\u2C031",
	"\u2C051",
	"\u2C058",
	"\u2C073",
	"\u2C075",
	"\u2C078",
	"\u2C07A",
	"\u2C07D",
	"\u2C080",
	"\u2C082",
	"\u2C085",
	"\u2C089",
	"\u2C0A0",
	"\u2C0A9",
	"\u2C0AE",
	"\u2C0B0",
	"\u2C0B1",
	"\u2C0BB",
	"\u2C0C0",
	"\u2C0CA",
	"\u2C0CF",
	"\u2C0D8",
	"\u2C0DB",
	"\u2C0E6",
	"\u2C0EB",
	"\u2C0EE",
	"\u2C0F2",
	"\u2C0F3",
	"\u2C11E",
	"\u2C129",
	"\u2C12C",
	"\u2C162",
	"\u2C165",
	"\u2C16B",
	"\u2C182",
	"\u2C199",
	"\u2C1A6",
	"\u2C1AE",
	"\u2C1BE",
	"\u2C1C3",
	"\u2C1C4",
	"\u2C1C7",
	"\u2C1D5",
	"\u2C1D8",
	"\u2C1D9",
	"\u2C1EC",
	"\u2C1F0",
	"\u2C1F9",
	"\u2C1FC",
	"\u2C201",
	"\u2C20F",
	"\u2C215",
	"\u2C227",
	"\u2C231",
	"\u2C23E",
	"\u2C242",
	"\u2C247",
	"\u2C24B",
	"\u2C260",
	"\u2C27C",
	"\u2C282",
	"\u2C288",
	"\u2C289",
	"\u2C28D",
	"\u2C28E",
	"\u2C296",
	"\u2C297",
	"\u2C29C",
	"\u2C2A4",
	"\u2C2A6",
	"\u2C2B5",
	"\u2C2B6",
	"\u2C2BA",
	"\u2C2BE",
	"\u2C2C3",
	"\u2C2CD",
	"\u2C31D",
	"\u2C320",
	"\u2C32E",
	"\u2C334",
	"\u2C335",
	"\u2C337",
	"\u2C359",
	"\u2C35B",
	"\u2C361",
	"\u2C364",
	"\u2C386",
	"\u2C391",
	"\u2C3A7",
	"\u2C3AC",
	"\u2C3DC",
	"\u2C3DF",
	"\u2C3E4",
	"\u2C3E6",
	"\u2C3EB",
	"\u2C3EE",
	"\u2C3F7",
	"\u2C420",
	"\u2C446",
	"\u2C447",
	"\u2C44D",
	"\u2C44F",
	"\u2C452",
	"\u2C453",
	"\u2C455",
	"\u2C457",
	"\u2C459",
	"\u2C467",
	"\u2C484",
	"\u2C486",
	"\u2C487",
	"\u2C488",
	"\u2C48A",
	"\u2C48D",
	"\u2C48E",
	"\u2C493",
	"\u2C495",
	"\u2C497",
	"\u2C4E0",
	"\u2C4EB",
	"\u2C4F1",
	"\u2C4F8",
	"\u2C4FC",
	"\u2C52F",
	"\u2C539",
	"\u2C542",
	"\u2C544",
	"\u2C54A",
	"\u2C55B",
	"\u2C566",
	"\u2C56C",
	"\u2C583",
	"\u2C591",
	"\u2C596",
	"\u2C598",
	"\u2C59E",
	"\u2C59F",
	"\u2C5A0",
	"\u2C5AE",
	"\u2C5BA",
	"\u2C613",
	"\u2C614",
	"\u2C615",
	"\u2C616",
	"\u2C617",
	"\u2C618",
	"\u2C619",
	"\u2C61A",
	"\u2C61B",
	"\u2C61C",
	"\u2C61D",
	"\u2C61E",
	"\u2C61F",
	"\u2C620",
	"\u2C621",
	"\u2C622",
	"\u2C623",
	"\u2C624",
	"\u2C625",
	"\u2C626",
	"\u2C627",
	"\u2C628",
	"\u2C629",
	"\u2C62A",
	"\u2C62B",
	"\u2C62C",
	"\u2C62D",
	"\u2C62E",
	"\u2C62F",
	"\u2C630",
	"\u2C631",
	"\u2C632",
	"\u2C633",
	"\u2C634",
	"\u2C635",
	"\u2C636",
	"\u2C637",
	"\u2C638",
	"\u2C639",
	"\u2C63A",
	"\u2C63B",
	"\u2C63C",
	"\u2C63D",
	"\u2C63E",
	"\u2C63F",
	"\u2C640",
	"\u2C641",
	"\u2C642",
	"\u2C643",
	"\u2C644",
	"\u2C645",
	"\u2C646",
	"\u2C647",
	"\u2C648",
	"\u2C649",
	"\u2C64A",
	"\u2C64B",
	"\u2C64E",
	"\u2C64F",
	"\u2C65D",
	"\u2C66A",
	"\u2C66B",
	"\u2C66D",
	"\u2C684",
	"\u2C6F9",
	"\u2C6FC",
	"\u2C714",
	"\u2C725",
	"\u2C727",
	"\u2C728",
	"\u2C72C",
	"\u2C72F",
	"\u2C738",
	"\u2C73A",
	"\u2C73E",
	"\u2C73F",
	"\u2C741",
	"\u2C743",
	"\u2C74A",
	"\u2C74B",
	"\u2C756",
	"\u2C760",
	"\u2C76F",
	"\u2C774",
	"\u2C78B",
	"\u2C795",
	"\u2C798",
	"\u2C79F",
	"\u2C7A3",
	"\u2C7AB",
	"\u2C7C1",
	"\u2C7EA",
	"\u2C7FA",
	"\u2C7FD",
	"\u2C803",
	"\u2C805",
	"\u2C808",
	"\u2C820",
	"\u2C831",
	"\u2C837",
	"\u2C847",
	"\u2C84D",
	"\u2C84E",
	"\u2C852",
	"\u2C853",
	"\u2C854",
	"\u2C855",
	"\u2C860",
	"\u2C866",
	"\u2C871",
	"\u2C877",
	"\u2C87B",
	"\u2C887",
	"\u2C888",
	"\u2C889",
	"\u2C88A",
	"\u2C88B",
	"\u2C88C",
	"\u2C88D",
	"\u2C88E",
	"\u2C88F",
	"\u2C890",
	"\u2C891",
	"\u2C892",
	"\u2C893",
	"\u2C894",
	"\u2C895",
	"\u2C8AA",
	"\u2C8AF",
	"\u2C8B3",
	"\u2C8C0",
	"\u2C8D9",
	"\u2C8DA",
	"\u2C8DB",
	"\u2C8DC",
	"\u2C8DD",
	"\u2C8DE",
	"\u2C8DF",
	"\u2C8E0",
	"\u2C8E1",
	"\u2C8E2",
	"\u2C8E3",
	"\u2C8E4",
	"\u2C8E5",
	"\u2C8E6",
	"\u2C8E7",
	"\u2C8E8",
	"\u2C8E9",
	"\u2C8EA",
	"\u2C8EB",
	"\u2C8EC",
	"\u2C8ED",
	"\u2C8EE",
	"\u2C8EF",
	"\u2C8F0",
	"\u2C8F1",
	"\u2C8F2",
	"\u2C8F3",
	"\u2C8F4",
	"\u2C8F5",
	"\u2C8F6",
	"\u2C8F7",
	"\u2C8F8",
	"\u2C8F9",
	"\u2C8FA",
	"\u2C8FB",
	"\u2C8FC",
	"\u2C8FD",
	"\u2C8FE",
	"\u2C8FF",
	"\u2C900",
	"\u2C901",
	"\u2C902",
	"\u2C903",
	"\u2C904",
	"\u2C905",
	"\u2C906",
	"\u2C907",
	"\u2C908",
	"\u2C909",
	"\u2C90A",
	"\u2C90B",
	"\u2C90C",
	"\u2C90D",
	"\u2C90E",
	"\u2C90F",
	"\u2C910",
	"\u2C911",
	"\u2C912",
	"\u2C913",
	"\u2C914",
	"\u2C915",
	"\u2C916",
	"\u2C917",
	"\u2C918",
	"\u2C919",
	"\u2C91A",
	"\u2C91B",
	"\u2C91C",
	"\u2C91D",
	"\u2C91E",
	"\u2C91F",
	"\u2C920",
	"\u2C921",
	"\u2C922",
	"\u2C923",
	"\u2C924",
	"\u2C925",
	"\u2C926",
	"\u2C927",
	"\u2C928",
	"\u2C929",
	"\u2C92A",
	"\u2C92B",
	"\u2C92C",
	"\u2C92D",
	"\u2C92E",
	"\u2C92F",
	"\u2C930",
	"\u2C931",
	"\u2C937",
	"\u2C944",
	"\u2C948",
	"\u2C973",
	"\u2C974",
	"\u2C975",
	"\u2C976",
	"\u2C977",
	"\u2C978",
	"\u2C979",
	"\u2C97A",
	"\u2C97B",
	"\u2C97C",
	"\u2C97D",
	"\u2C97E",
	"\u2C97F",
	"\u2C980",
	"\u2C985",
	"\u2C986",
	"\u2C9A3",
	"\u2C9A5",
	"\u2C9A7",
	"\u2C9A9",
	"\u2C9AB",
	"\u2C9AF",
	"\u2C9B4",
	"\u2C9B5",
	"\u2C9B9",
	"\u2C9BB",
	"\u2C9BE",
	"\u2C9C0",
	"\u2C9C3",
	"\u2C9D1",
	"\u2C9D4",
	"\u2C9DA",
	"\u2C9DB",
	"\u2C9E2",
	"\u2C9E4",
	"\u2C9E9",
	"\u2CA01",
	"\u2CA02",
	"\u2CA03",
	"\u2CA04",
	"\u2CA05",
	"\u2CA06",
	"\u2CA07",
	"\u2CA08",
	"\u2CA09",
	"\u2CA0B",
	"\u2CA0C",
	"\u2CA0D",
	"\u2CA0E",
	"\u2CA0F",
	"\u2CA10",
	"\u2CA11",
	"\u2CA12",
	"\u2CA13",
	"\u2CA14",
	"\u2CA4E",
	"\u2CA7D",
	"\u2CA7E",
	"\u2CA8D",
	"\u2CAA7",
	"\u2CAA8",
	"\u2CAA9",
	"\u2CAAB",
	"\u2CAAF",
	"\u2CABA",
	"\u2CB07",
	"\u2CB27",
	"\u2CB28",
	"\u2CB29",
	"\u2CB2A",
	"\u2CB2B",
	"\u2CB2C",
	"\u2CB2D",
	"\u2CB2E",
	"\u2CB2F",
	"\u2CB30",
	"\u2CB31",
	"\u2CB32",
	"\u2CB33",
	"\u2CB34",
	"\u2CB35",
	"\u2CB36",
	"\u2CB37",
	"\u2CB38",
	"\u2CB39",
	"\u2CB3A",
	"\u2CB3B",
	"\u2CB3C",
	"\u2CB3D",
	"\u2CB3E",
	"\u2CB3F",
	"\u2CB40",
	"\u2CB41",
	"\u2CB42",
	"\u2CB43",
	"\u2CB45",
	"\u2CB46",
	"\u2CB47",
	"\u2CB48",
	"\u2CB49",
	"\u2CB4A",
	"\u2CB4B",
	"\u2CB4C",
	"\u2CB4D",
	"\u2CB4E",
	"\u2CB4F",
	"\u2CB50",
	"\u2CB51",
	"\u2CB53",
	"\u2CB54",
	"\u2CB55",
	"\u2CB56",
	"\u2CB57",
	"\u2CB58",
	"\u2CB59",
	"\u2CB5A",
	"\u2CB5B",
	"\u2CB5C",
	"\u2CB5D",
	"\u2CB5E",
	"\u2CB5F",
	"\u2CB60",
	"\u2CB61",
	"\u2CB62",
	"\u2CB63",
	"\u2CB64",
	"\u2CB65",
	"\u2CB66",
	"\u2CB68",
	"\u2CB69",
	"\u2CB6A",
	"\u2CB6B",
	"\u2CB6C",
	"\u2CB6D",
	"\u2CB6F",
	"\u2CB70",
	"\u2CB71",
	"\u2CB72",
	"\u2CB73",
	"\u2CB74",
	"\u2CB75",
	"\u2CB76",
	"\u2CB77",
	"\u2CB78",
	"\u2CB79",
	"\u2CB7A",
	"\u2CB7B",
	"\u2CB7C",
	"\u2CB7D",
	"\u2CB7E",
	"\u2CB7F",
	"\u2CB80",
	"\u2CB81",
	"\u2CB82",
	"\u2CB83",
	"\u2CB84",
	"\u2CB98",
	"\u2CB99",
	"\u2CB9C",
	"\u2CB9D",
	"\u2CB9F",
	"\u2CBA0",
	"\u2CBA1",
	"\u2CBA2",
	"\u2CBA3",
	"\u2CBA4",
	"\u2CBA5",
	"\u2CBA7",
	"\u2CBA8",
	"\u2CBA9",
	"\u2CBAA",
	"\u2CBAC",
	"\u2CBAD",
	"\u2CBAE",
	"\u2CBAF",
	"\u2CBB0",
	"\u2CBB1",
	"\u2CBB2",
	"\u2CBB3",
	"\u2CBB4",
	"\u2CBB5",
	"\u2CBB8",
	"\u2CBB9",
	"\u2CBBA",
	"\u2CBBB",
	"\u2CBBF",
	"\u2CBC0",
	"\u2CBC5",
	"\u2CBCA",
	"\u2CBCE",
	"\u2CC21",
	"\u2CC23",
	"\u2CC24",
	"\u2CC25",
	"\u2CC31",
	"\u2CC32",
	"\u2CC33",
	"\u2CC34",
	"\u2CC35",
	"\u2CC36",
	"\u2CC37",
	"\u2CC38",
	"\u2CC3A",
	"\u2CC53",
	"\u2CC54",
	"\u2CC55",
	"\u2CC56",
	"\u2CC57",
	"\u2CC58",
	"\u2CC59",
	"\u2CC5A",
	"\u2CC5B",
	"\u2CC5C",
	"\u2CC5D",
	"\u2CC5E",
	"\u2CC5F",
	"\u2CC60",
	"\u2CC61",
	"\u2CC62",
	"\u2CC63",
	"\u2CC64",
	"\u2CC65",
	"\u2CC66",
	"\u2CC67",
	"\u2CC68",
	"\u2CC69",
	"\u2CC6A",
	"\u2CC6B",
	"\u2CC6C",
	"\u2CC6D",
	"\u2CC6E",
	"\u2CC6F",
	"\u2CC70",
	"\u2CC71",
	"\u2CC72",
	"\u2CC73",
	"\u2CC75",
	"\u2CC77",
	"\u2CC78",
	"\u2CC7A",
	"\u2CC7C",
	"\u2CC7D",
	"\u2CC7E",
	"\u2CC7F",
	"\u2CC80",
	"\u2CC85",
	"\u2CC86",
	"\u2CC95",
	"\u2CCA5",
	"\u2CCA6",
	"\u2CCA7",
	"\u2CCA8",
	"\u2CCA9",
	"\u2CCAA",
	"\u2CCAB",
	"\u2CCAC",
	"\u2CCAD",
	"\u2CCAE",
	"\u2CCAF",
	"\u2CCB0",
	"\u2CCB1",
	"\u2CCB2",
	"\u2CCB3",
	"\u2CCB4",
	"\u2CCB5",
	"\u2CCB6",
	"\u2CCB7",
	"\u2CCB8",
	"\u2CCB9",
	"\u2CCBA",
	"\u2CCBB",
	"\u2CCBC",
	"\u2CCBD",
	"\u2CCBE",
	"\u2CCBF",
	"\u2CCC0",
	"\u2CCC1",
	"\u2CCC2",
	"\u2CCC3",
	"\u2CCC4",
	"\u2CCC5",
	"\u2CCC6",
	"\u2CCC7",
	"\u2CCC8",
	"\u2CCC9",
	"\u2CCCA",
	"\u2CCCB",
	"\u2CCCC",
	"\u2CCCD",
	"\u2CCCE",
	"\u2CCD0",
	"\u2CCD1",
	"\u2CCD2",
	"\u2CCD3",
	"\u2CCD4",
	"\u2CCD9",
	"\u2CCDF",
	"\u2CCF3",
	"\u2CCF4",
	"\u2CCF5",
	"\u2CCF6",
	"\u2CCF7",
	"\u2CCF8",
	"\u2CCF9",
	"\u2CCFA",
	"\u2CCFB",
	"\u2CCFC",
	"\u2CCFD",
	"\u2CCFE",
	"\u2CCFF",
	"\u2CD00",
	"\u2CD01",
	"\u2CD02",
	"\u2CD03",
	"\u2CD04",
	"\u2CD05",
	"\u2CD06",
	"\u2CD07",
	"\u2CD08",
	"\u2CD09",
	"\u2CD0A",
	"\u2CD0B",
	"\u2CD0C",
	"\u2CD0D",
	"\u2CD0E",
	"\u2CD0F",
	"\u2CD10",
	"\u2CD28",
	"\u2CD29",
	"\u2CD80",
	"\u2CD81",
	"\u2CD82",
	"\u2CD83",
	"\u2CD84",
	"\u2CD85",
	"\u2CD86",
	"\u2CD87",
	"\u2CD88",
	"\u2CD89",
	"\u2CD8A",
	"\u2CD8B",
	"\u2CD8C",
	"\u2CD8D",
	"\u2CD8E",
	"\u2CD8F",
	"\u2CD90",
	"\u2CD91",
	"\u2CD92",
	"\u2CD93",
	"\u2CD94",
	"\u2CD95",
	"\u2CD96",
	"\u2CD97",
	"\u2CD99",
	"\u2CD9A",
	"\u2CD9B",
	"\u2CD9C",
	"\u2CD9D",
	"\u2CD9E",
	"\u2CD9F",
	"\u2CDA0",
	"\u2CDA1",
	"\u2CDA2",
	"\u2CDA3",
	"\u2CDA4",
	"\u2CDA5",
	"\u2CDA6",
	"\u2CDA7",
	"\u2CDA8",
	"\u2CDA9",
	"\u2CDAA",
	"\u2CDAB",
	"\u2CDAC",
	"\u2CDAD",
	"\u2CDAE",
	"\u2CDAF",
	"\u2CDB0",
	"\u2CDB1",
	"\u2CDB2",
	"\u2CDB3",
	"\u2CDB4",
	"\u2CDB5",
	"\u2CDB6",
	"\u2CDB7",
	"\u2CDB8",
	"\u2CDB9",
	"\u2CDBA",
	"\u2CDBB",
	"\u2CDD5",
	"\u2CDFB",
	"\u2CDFC",
	"\u2CDFD",
	"\u2CDFE",
	"\u2CDFF",
	"\u2CE00",
	"\u2CE01",
	"\u2CE02",
	"\u2CE03",
	"\u2CE04",
	"\u2CE05",
	"\u2CE06",
	"\u2CE08",
	"\u2CE09",
	"\u2CE0A",
	"\u2CE0B",
	"\u2CE0C",
	"\u2CE0D",
	"\u2CE0E",
	"\u2CE0F",
	"\u2CE10",
	"\u2CE11",
	"\u2CE12",
	"\u2CE13",
	"\u2CE14",
	"\u2CE15",
	"\u2CE16",
	"\u2CE17",
	"\u2CE18",
	"\u2CE19",
	"\u2CE1A",
	"\u2CE1B",
	"\u2CE1C",
	"\u2CE1D",
	"\u2CE1E",
	"\u2CE1F",
	"\u2CE20",
	"\u2CE21",
	"\u2CE22",
	"\u2CE23",
	"\u2CE24",
	"\u2CE25",
	"\u2CE26",
	"\u2CE27",
	"\u2CE28",
	"\u2CE29",
	"\u2CE2A",
	"\u2CE2B",
	"\u2CE2C",
	"\u2CE2D",
	"\u2CE2E",
	"\u2CE2F",
	"\u2CE30",
	"\u2CE31",
	"\u2CE35",
	"\u2CE36",
	"\u2CE37",
	"\u2CE38",
	"\u2CE39",
	"\u2CE3E",
	"\u2CE45",
	"\u2CE46",
	"\u2CE47",
	"\u2CE48",
	"\u2CE49",
	"\u2CE4A",
	"\u2CE4B",
	"\u2CE4C",
	"\u2CE4D",
	"\u2CE4E",
	"\u2CE55",
	"\u2CE56",
	"\u2CE57",
	"\u2CE58",
	"\u2CE63",
	"\u2CE64",
	"\u2CE6D",
	"\u2CE7A",
	"\u2CE7B",
	"\u2CE7C",
	"\u2CE7D",
	"\u2CE7E",
	"\u2CE7F",
	"\u2CE80",
	"\u2CE81",
	"\u2CE82",
	"\u2CE83",
	"\u2CE84",
	"\u2CE85",
	"\u2CE86",
	"\u2CE87",
	"\u2CE88",
	"\u2CE89",
	"\u2CE8A",
	"\u2CE8B",
	"\u2CE8C",
	"\u2CE8D",
	"\u2CE8E",
	"\u2CE8F",
	"\u2CE90",
	"\u2CE91",
	"\u2CE92",
	"\u2CE93",
	"\u2CE94",
	"\u2CE95",
	"\u2CE96",
	"\u2CE9B",
	"\u2CE9C",
	"\u2CE9D",
	"\u2CE9F",
	"\u2CEEE",
	"\u2CF96",
	"\u2CFA3",
	"\u2D11B",
	"\u2D1C0",
	"\u2D1C9",
	"\u2D1D9",
	"\u2D1DC",
	"\u2D1E1",
	"\u2D1EF",
	"\u2D1F4",
	"\u2D208",
	"\u2D209",
	"\u2D21C",
	"\u2D21F",
	"\u2D22E",
	"\u2D257",
	"\u2D268",
	"\u2D27C",
	"\u2D2B8",
	"\u2D382",
	"\u2D39C",
	"\u2D3E6",
	"\u2D3F8",
	"\u2D478",
	"\u2D479",
	"\u2D4C0",
	"\u2D546",
	"\u2D613",
	"\u2D61A",
	"\u2D6A6",
	"\u2D74B",
	"\u2D76B",
	"\u2D784",
	"\u2D819",
	"\u2D83D",
	"\u2D846",
	"\u2D85C",
	"\u2D875",
	"\u2D88B",
	"\u2D895",
	"\u2D89D",
	"\u2D8C7",
	"\u2D8E7",
	"\u2D90E",
	"\u2D930",
	"\u2D953",
	"\u2D9CB",
	"\u2DA5A",
	"\u2DA5B",
	"\u2DA70",
	"\u2DA86",
	"\u2DAC0",
	"\u2DAD9",
	"\u2DADD",
	"\u2DB48",
	"\u2DC0E",
	"\u2DC12",
	"\u2DC17",
	"\u2DC25",
	"\u2DC40",
	"\u2DC4A",
	"\u2DCAB",
	"\u2DD0A",
	"\u2DD33",
	"\u2DE5C",
	"\u2DECD",
	"\u2DED4",
	"\u2E021",
	"\u2E024",
	"\u2E02A",
	"\u2E032",
	"\u2E14E",
	"\u2E18F",
	"\u2E1D4",
	"\u2E1E4",
	"\u2E260",
	"\u2E261",
	"\u2E262",
	"\u2E263",
	"\u2E264",
	"\u2E265",
	"\u2E267",
	"\u2E268",
	"\u2E269",
	"\u2E26A",
	"\u2E26B",
	"\u2E26C",
	"\u2E26D",
	"\u2E26E",
	"\u2E26F",
	"\u2E30C",
	"\u2E38D",
	"\u2E3C0",
	"\u2E3FA",
	"\u2E41A",
	"\u2E428",
	"\u2E502",
	"\u2E505",
	"\u2E50A",
	"\u2E581",
	"\u2E583",
	"\u2E5B1",
	"\u2E64A",
	"\u2E64B",
	"\u2E6D7",
	"\u2E736",
	"\u2E774",
	"\u2E775",
	"\u2E777",
	"\u2E778",
	"\u2E779",
	"\u2E77A",
	"\u2E81E",
	"\u2E833",
	"\u2E8F2",
	"\u2E8F3",
	"\u2E8F4",
	"\u2E8F5",
	"\u2E8F6",
	"\u2E92B",
	"\u2E92C",
	"\u2E92D",
	"\u2E92E",
	"\u2E92F",
	"\u2E932",
	"\u2E933",
	"\u2E936",
	"\u2E937",
	"\u2E938",
	"\u2E985",
	"\u2E99A",
	"\u2E9F4",
	"\u2E9F5",
	"\u2EA34",
	"\u2EA35",
	"\u2EA5B",
	"\u2EA5C",
	"\u2EA5D",
	"\u2EA5E",
	"\u2EAA1",
	"\u2EAA2",
	"\u2EAA3",
	"\u2EAA4",
	"\u2EAA5",
	"\u2EAC2",
	"\u2EB1B",
	"\u2EB1C",
	"\u2EB1D",
	"\u2EB1E",
	"\u2EB1F",
	"\u2EB20",
	"\u2EB21",
	"\u2EB22",
	"\u2EB23",
	"\u2EB24",
	"\u2EB61",
	"\u2EB62",
	"\u2EB64",
	"\u2EB65",
	"\u2EB66",
	"\u2EB68",
	"\u2EB6A",
	"\u2EB70",
	"\u2EB85",
	"\u2EB87",
	"\u2EBD9",
	"\u30021",
	"\u30022",
	"\u30048",
	"\u3005C",
	"\u30067",
	"\u30078",
	"\u3007E",
	"\u30081",
	"\u30083",
	"\u3008B",
	"\u3008E",
	"\u3008F",
	"\u30097",
	"\u3009C",
	"\u300A6",
	"\u300AD",
	"\u300BB",
	"\u300C6",
	"\u300EE",
	"\u300F3",
	"\u300F6",
	"\u300F7",
	"\u300FB",
	"\u300FF",
	"\u30101",
	"\u3011E",
	"\u3012D",
	"\u30154",
	"\u30165",
	"\u30166",
	"\u3017B",
	"\u30195",
	"\u30199",
	"\u3019A",
	"\u301C0",
	"\u301CA",
	"\u301CE",
	"\u301D5",
	"\u301D6",
	"\u301D8",
	"\u301E0",
	"\u301E1",
	"\u301E3",
	"\u301E5",
	"\u301F2",
	"\u301FC",
	"\u30206",
	"\u30207",
	"\u3020A",
	"\u3020D",
	"\u30213",
	"\u3022E",
	"\u3022F",
	"\u30236",
	"\u30241",
	"\u30244",
	"\u30258",
	"\u30259",
	"\u3025A",
	"\u30263",
	"\u30265",
	"\u30269",
	"\u3026A",
	"\u30271",
	"\u3027D",
	"\u30282",
	"\u30285",
	"\u30288",
	"\u30291",
	"\u3029B",
	"\u3029F",
	"\u302A1",
	"\u302A2",
	"\u302D6",
	"\u302F8",
	"\u302F9",
	"\u302FD",
	"\u302FE",
	"\u30300",
	"\u30302",
	"\u30306",
	"\u30307",
	"\u30309",
	"\u30319",
	"\u30326",
	"\u30337",
	"\u3038C",
	"\u3038E",
	"\u3038F",
	"\u30390",
	"\u30391",
	"\u30394",
	"\u30396",
	"\u3039B",
	"\u3039D",
	"\u3039E",
	"\u303A0",
	"\u303A2",
	"\u303A6",
	"\u303AB",
	"\u303B4",
	"\u303B7",
	"\u303B9",
	"\u303C1",
	"\u303D3",
	"\u303D5",
	"\u303DC",
	"\u303DF",
	"\u303F2",
	"\u303F6",
	"\u303FC",
	"\u303FD",
	"\u3041A",
	"\u3043E",
	"\u30441",
	"\u30444",
	"\u30445",
	"\u30454",
	"\u30455",
	"\u30459",
	"\u3045F",
	"\u30465",
	"\u30467",
	"\u3046A",
	"\u3046B",
	"\u3046C",
	"\u30475",
	"\u30478",
	"\u3047F",
	"\u30486",
	"\u30492",
	"\u30496",
	"\u304C4",
	"\u304C6",
	"\u304D4",
	"\u304D5",
	"\u304D7",
	"\u304D9",
	"\u304DC",
	"\u304DD",
	"\u304DF",
	"\u304E4",
	"\u304E7",
	"\u304EC",
	"\u304F1",
	"\u304F7",
	"\u304FB",
	"\u304FC",
	"\u30507",
	"\u3050B",
	"\u30532",
	"\u30536",
	"\u30541",
	"\u30545",
	"\u30548",
	"\u30550",
	"\u3056D",
	"\u30588",
	"\u3058F",
	"\u3059A",
	"\u305A0",
	"\u305A9",
	"\u305C5",
	"\u305C6",
	"\u305D3",
	"\u305D6",
	"\u305D8",
	"\u305D9",
	"\u305DA",
	"\u305DB",
	"\u305DC",
	"\u305E1",
	"\u305E2",
	"\u305E6",
	"\u305E8",
	"\u305EC",
	"\u305F5",
	"\u305F9",
	"\u305FA",
	"\u30600",
	"\u30605",
	"\u30608",
	"\u30613",
	"\u30620",
	"\u30623",
	"\u30629",
	"\u30633",
	"\u30636",
	"\u30638",
	"\u3064B",
	"\u3064E",
	"\u30651",
	"\u30655",
	"\u3068D",
	"\u30694",
	"\u306A6",
	"\u306AA",
	"\u306AC",
	"\u306B1",
	"\u306C9",
	"\u306CA",
	"\u306CF",
	"\u306D2",
	"\u306DB",
	"\u306E1",
	"\u306E3",
	"\u306E4",
	"\u306E5",
	"\u306E6",
	"\u306E8",
	"\u306E9",
	"\u306EA",
	"\u306EE",
	"\u306F1",
	"\u306F2",
	"\u306F5",
	"\u306FA",
	"\u306FB",
	"\u306FD",
	"\u30710",
	"\u3071C",
	"\u3071D",
	"\u30722",
	"\u30728",
	"\u30733",
	"\u30745",
	"\u3074B",
	"\u3074D",
	"\u30757",
	"\u3075C",
	"\u3075E",
	"\u3075F",
	"\u30764",
	"\u3077E",
	"\u30787",
	"\u30789",
	"\u3078D",
	"\u307A4",
	"\u307B2",
	"\u307B3",
	"\u307B7",
	"\u307BB",
	"\u307C4",
	"\u307D8",
	"\u3081B",
	"\u3082B",
	"\u30832",
	"\u30834",
	"\u30839",
	"\u30844",
	"\u30849",
	"\u3084A",
	"\u3084B",
	"\u3084E",
	"\u3084F",
	"\u30850",
	"\u30854",
	"\u3085E",
	"\u30862",
	"\u30869",
	"\u30870",
	"\u30875",
	"\u3087B",
	"\u3087D",
	"\u30884",
	"\u308A2",
	"\u308A4",
	"\u308A6",
	"\u308E2",
	"\u308E6",
	"\u308E9",
	"\u308EB",
	"\u308EC",
	"\u308EF",
	"\u308F6",
	"\u308FC",
	"\u308FD",
	"\u30913",
	"\u30915",
	"\u30928",
	"\u3092B",
	"\u3092C",
	"\u3093D",
	"\u3094A",
	"\u30952",
	"\u3095B",
	"\u3095E",
	"\u30960",
	"\u30962",
	"\u30963",
	"\u30968",
	"\u3096A",
	"\u3096D",
	"\u30979",
	"\u30994",
	"\u3099C",
	"\u309A6",
	"\u309A8",
	"\u309AD",
	"\u309B0",
	"\u309B4",
	"\u309B7",
	"\u309BE",
	"\u309BF",
	"\u309C3",
	"\u309C7",
	"\u309C8",
	"\u309C9",
	"\u309CE",
	"\u309D4",
	"\u309D8",
	"\u309F0",
	"\u309FB",
	"\u309FE",
	"\u30A16",
	"\u30A1C",
	"\u30A26",
	"\u30A33",
	"\u30A45",
	"\u30A4F",
	"\u30A53",
	"\u30A67",
	"\u30A6E",
	"\u30A72",
	"\u30A78",
	"\u30A79",
	"\u30A7A",
	"\u30A7B",
	"\u30A8A",
	"\u30A8F",
	"\u30AA3",
	"\u30AAA",
	"\u30AAB",
	"\u30AAD",
	"\u30AB6",
	"\u30ABC",
	"\u30ABF",
	"\u30ACB",
	"\u30AD6",
	"\u30AFC",
	"\u30AFD",
	"\u30AFF",
	"\u30B00",
	"\u30B01",
	"\u30B02",
	"\u30B03",
	"\u30B05",
	"\u30B06",
	"\u30B07",
	"\u30B08",
	"\u30B09",
	"\u30B0B",
	"\u30B0C",
	"\u30B0D",
	"\u30B0E",
	"\u30B0F",
	"\u30B10",
	"\u30B11",
	"\u30B12",
	"\u30B13",
	"\u30B14",
	"\u30B16",
	"\u30B17",
	"\u30B18",
	"\u30B19",
	"\u30B1A",
	"\u30B1B",
	"\u30B1C",
	"\u30B1D",
	"\u30B1E",
	"\u30B1F",
	"\u30B20",
	"\u30B21",
	"\u30B22",
	"\u30B23",
	"\u30B24",
	"\u30B25",
	"\u30B26",
	"\u30B27",
	"\u30B28",
	"\u30B29",
	"\u30B2A",
	"\u30B2B",
	"\u30B2C",
	"\u30B2D",
	"\u30B2E",
	"\u30B2F",
	"\u30B30",
	"\u30B31",
	"\u30B32",
	"\u30B33",
	"\u30B34",
	"\u30B35",
	"\u30B36",
	"\u30B37",
	"\u30B38",
	"\u30B39",
	"\u30B3A",
	"\u30B3B",
	"\u30B3C",
	"\u30B3D",
	"\u30B3E",
	"\u30B3F",
	"\u30B40",
	"\u30B41",
	"\u30B44",
	"\u30B54",
	"\u30B57",
	"\u30B5A",
	"\u30B62",
	"\u30B63",
	"\u30B79",
	"\u30B85",
	"\u30B87",
	"\u30B99",
	"\u30B9D",
	"\u30BAD",
	"\u30BB2",
	"\u30BC2",
	"\u30BCB",
	"\u30BCE",
	"\u30C06",
	"\u30C0B",
	"\u30C0C",
	"\u30C0F",
	"\u30C11",
	"\u30C20",
	"\u30C22",
	"\u30C24",
	"\u30C28",
	"\u30C2E",
	"\u30C31",
	"\u30C33",
	"\u30C34",
	"\u30C35",
	"\u30C36",
	"\u30C37",
	"\u30C39",
	"\u30C3A",
	"\u30C3E",
	"\u30C3F",
	"\u30C40",
	"\u30C47",
	"\u30C48",
	"\u30C49",
	"\u30C4A",
	"\u30C4C",
	"\u30C4D",
	"\u30C50",
	"\u30C51",
	"\u30C5B",
	"\u30C5D",
	"\u30C5F",
	"\u30C66",
	"\u30C69",
	"\u30C6E",
	"\u30C6F",
	"\u30C71",
	"\u30C72",
	"\u30C7E",
	"\u30C81",
	"\u30C82",
	"\u30C92",
	"\u30C96",
	"\u30C9F",
	"\u30CA0",
	"\u30CAB",
	"\u30CAC",
	"\u30CAE",
	"\u30CAF",
	"\u30CB0",
	"\u30CB2",
	"\u30CB3",
	"\u30CB4",
	"\u30CB5",
	"\u30CB6",
	"\u30CB8",
	"\u30CB9",
	"\u30CBA",
	"\u30CBB",
	"\u30CC1",
	"\u30CC2",
	"\u30CC4",
	"\u30CC6",
	"\u30CCA",
	"\u30CD7",
	"\u30CDA",
	"\u30CF2",
	"\u30CF5",
	"\u30CF8",
	"\u30CF9",
	"\u30CFA",
	"\u30CFB",
	"\u30CFC",
	"\u30D02",
	"\u30D15",
	"\u30D16",
	"\u30D17",
	"\u30D18",
	"\u30D19",
	"\u30D1A",
	"\u30D1B",
	"\u30D1C",
	"\u30D1D",
	"\u30D1E",
	"\u30D22",
	"\u30D23",
	"\u30D24",
	"\u30D25",
	"\u30D2F",
	"\u30D4A",
	"\u30D4C",
	"\u30D4D",
	"\u30D4E",
	"\u30D4F",
	"\u30D50",
	"\u30D51",
	"\u30D52",
	"\u30D53",
	"\u30D54",
	"\u30D56",
	"\u30D57",
	"\u30D58",
	"\u30D59",
	"\u30D5A",
	"\u30D5B",
	"\u30D5C",
	"\u30D5D",
	"\u30D5E",
	"\u30D60",
	"\u30D61",
	"\u30D62",
	"\u30D63",
	"\u30D64",
	"\u30D65",
	"\u30D66",
	"\u30D67",
	"\u30D68",
	"\u30D69",
	"\u30D6A",
	"\u30D6B",
	"\u30D6C",
	"\u30D6D",
	"\u30D6E",
	"\u30D6F",
	"\u30D70",
	"\u30D71",
	"\u30D72",
	"\u30D73",
	"\u30D74",
	"\u30D75",
	"\u30D76",
	"\u30D77",
	"\u30D78",
	"\u30D79",
	"\u30D7A",
	"\u30D7B",
	"\u30D7C",
	"\u30D7D",
	"\u30D7E",
	"\u30D7F",
	"\u30D80",
	"\u30D81",
	"\u30D82",
	"\u30D83",
	"\u30D84",
	"\u30D85",
	"\u30D86",
	"\u30D87",
	"\u30D88",
	"\u30D89",
	"\u30D8A",
	"\u30D8B",
	"\u30D8C",
	"\u30D8D",
	"\u30D8E",
	"\u30D8F",
	"\u30D91",
	"\u30D94",
	"\u30DA8",
	"\u30DAC",
	"\u30DDE",
	"\u30DE0",
	"\u30DE1",
	"\u30DE2",
	"\u30DE4",
	"\u30DE5",
	"\u30DE6",
	"\u30DE7",
	"\u30DE8",
	"\u30DE9",
	"\u30DEA",
	"\u30DEB",
	"\u30DEC",
	"\u30DED",
	"\u30DEE",
	"\u30DF4",
	"\u30DF5",
	"\u30DF6",
	"\u30DF8",
	"\u30E07",
	"\u30E08",
	"\u30E0A",
	"\u30E0E",
	"\u30E10",
	"\u30E14",
	"\u30E1A",
	"\u30E1B",
	"\u30E1E",
	"\u30E26",
	"\u30E40",
	"\u30E6F",
	"\u30E71",
	"\u30E72",
	"\u30E73",
	"\u30E74",
	"\u30E75",
	"\u30E76",
	"\u30E77",
	"\u30E78",
	"\u30E7A",
	"\u30E7B",
	"\u30E7C",
	"\u30E7D",
	"\u30E7E",
	"\u30E7F",
	"\u30E80",
	"\u30E81",
	"\u30E82",
	"\u30E83",
	"\u30E84",
	"\u30E85",
	"\u30E86",
	"\u30E87",
	"\u30E88",
	"\u30E89",
	"\u30E8A",
	"\u30E8B",
	"\u30E8C",
	"\u30E8D",
	"\u30E8E",
	"\u30E8F",
	"\u30E90",
	"\u30E91",
	"\u30E92",
	"\u30E93",
	"\u30E94",
	"\u30E95",
	"\u30E96",
	"\u30E97",
	"\u30E98",
	"\u30E99",
	"\u30E9A",
	"\u30E9B",
	"\u30E9C",
	"\u30E9D",
	"\u30E9E",
	"\u30E9F",
	"\u30EA0",
	"\u30EA1",
	"\u30EA2",
	"\u30EA3",
	"\u30EA4",
	"\u30EA8",
	"\u30EAD",
	"\u30EB2",
	"\u30EB7",
	"\u30EC6",
	"\u30EDD",
	"\u30EE1",
	"\u30EE6",
	"\u30EE8",
	"\u30EEE",
	"\u30EF3",
	"\u30F05",
	"\u30F0B",
	"\u30F0F",
	"\u30F11",
	"\u30F3B",
	"\u30F55",
	"\u30F56",
	"\u30F57",
	"\u30F58",
	"\u30F5A",
	"\u30F5B",
	"\u30F5C",
	"\u30F5D",
	"\u30F5E",
	"\u30F60",
	"\u30F61",
	"\u30F62",
	"\u30F63",
	"\u30F65",
	"\u30F66",
	"\u30F67",
	"\u30F68",
	"\u30F69",
	"\u30F6B",
	"\u30F6C",
	"\u30F6D",
	"\u30F6E",
	"\u30F6F",
	"\u30F70",
	"\u30F71",
	"\u30F72",
	"\u30F73",
	"\u30F74",
	"\u30F75",
	"\u30F76",
	"\u30F77",
	"\u30F78",
	"\u30F79",
	"\u30F7A",
	"\u30F7B",
	"\u30F7C",
	"\u30F7D",
	"\u30F7E",
	"\u30F7F",
	"\u30F80",
	"\u30F81",
	"\u30F83",
	"\u30F84",
	"\u30F85",
	"\u30F86",
	"\u30F87",
	"\u30F88",
	"\u30F89",
	"\u30F8A",
	"\u30F8B",
	"\u30F8C",
	"\u30F8D",
	"\u30F8E",
	"\u30F8F",
	"\u30F90",
	"\u30F91",
	"\u30F92",
	"\u30F93",
	"\u30F95",
	"\u30F96",
	"\u30F97",
	"\u30F98",
	"\u30F99",
	"\u30F9A",
	"\u30F9B",
	"\u30F9C",
	"\u30F9D",
	"\u30F9E",
	"\u30F9F",
	"\u30FA1",
	"\u30FA2",
	"\u30FA3",
	"\u30FA4",
	"\u30FA5",
	"\u30FA6",
	"\u30FA7",
	"\u30FA8",
	"\u30FA9",
	"\u30FAA",
	"\u30FAB",
	"\u30FAC",
	"\u30FAD",
	"\u30FAE",
	"\u30FAF",
	"\u30FB0",
	"\u30FB1",
	"\u30FB2",
	"\u30FB3",
	"\u30FB4",
	"\u30FB5",
	"\u30FB6",
	"\u30FB7",
	"\u30FB8",
	"\u30FB9",
	"\u30FBA",
	"\u30FBB",
	"\u30FBC",
	"\u30FBD",
	"\u30FBE",
	"\u30FBF",
	"\u30FC0",
	"\u30FC1",
	"\u30FC2",
	"\u30FC3",
	"\u30FC4",
	"\u30FC5",
	"\u30FC6",
	"\u30FC7",
	"\u30FC8",
	"\u30FC9",
	"\u30FCA",
	"\u30FD6",
	"\u30FE5",
	"\u30FE6",
	"\u30FE7",
	"\u30FE8",
	"\u30FE9",
	"\u30FEA",
	"\u30FEB",
	"\u30FEC",
	"\u30FED",
	"\u30FEF",
	"\u30FF0",
	"\u30FF3",
	"\u30FF4",
	"\u30FF5",
	"\u30FF8",
	"\u30FF9",
	"\u30FFA",
	"\u30FFB",
	"\u30FFE",
	"\u31011",
	"\u31021",
	"\u31052",
	"\u3105E",
	"\u31071",
	"\u31073",
	"\u31074",
	"\u31076",
	"\u31077",
	"\u31079",
	"\u3107A",
	"\u3107D",
	"\u3107E",
	"\u31083",
	"\u31084",
	"\u31085",
	"\u31086",
	"\u31087",
	"\u31088",
	"\u31089",
	"\u3108A",
	"\u3108B",
	"\u3108C",
	"\u3108D",
	"\u3108E",
	"\u31090",
	"\u310A0",
	"\u310A1",
	"\u310A2",
	"\u310A3",
	"\u310A4",
	"\u310A5",
	"\u310A6",
	"\u310A7",
	"\u310A8",
	"\u310A9",
	"\u310AB",
	"\u310AC",
	"\u310AD",
	"\u310AE",
	"\u310AF",
	"\u310B0",
	"\u310B1",
	"\u310B2",
	"\u310B3",
	"\u310B4",
	"\u310B5",
	"\u310B6",
	"\u310B7",
	"\u310B8",
	"\u310BA",
	"\u310BB",
	"\u310D4",
	"\u310D5",
	"\u310D6",
	"\u310D7",
	"\u310D8",
	"\u310D9",
	"\u310DA",
	"\u310DB",
	"\u310DC",
	"\u310DD",
	"\u310DE",
	"\u310DF",
	"\u310E0",
	"\u310F1",
	"\u310F2",
	"\u310F3",
	"\u310F4",
	"\u310F5",
	"\u310F7",
	"\u310F8",
	"\u310F9",
	"\u310FA",
	"\u310FC",
	"\u310FD",
	"\u310FE",
	"\u310FF",
	"\u31100",
	"\u31101",
	"\u31102",
	"\u31103",
	"\u31104",
	"\u31105",
	"\u31106",
	"\u31107",
	"\u31108",
	"\u31109",
	"\u3110A",
	"\u3113C",
	"\u3113D",
	"\u3113E",
	"\u3113F",
	"\u31140",
	"\u31141",
	"\u31142",
	"\u31143",
	"\u31144",
	"\u31145",
	"\u31147",
	"\u31148",
	"\u31149",
	"\u3114A",
	"\u3114B",
	"\u3114D",
	"\u3114E",
	"\u3114F",
	"\u31150",
	"\u31152",
	"\u31153",
	"\u31154",
	"\u31155",
	"\u31156",
	"\u31157",
	"\u31158",
	"\u31159",
	"\u3115A",
	"\u3115B",
	"\u3115C",
	"\u3115D",
	"\u3115E",
	"\u3115F",
	"\u31160",
	"\u31161",
	"\u31162",
	"\u31163",
	"\u31164",
	"\u31165",
	"\u31166",
	"\u31167",
	"\u31168",
	"\u31169",
	"\u3116A",
	"\u3116B",
	"\u3116C",
	"\u3116E",
	"\u31180",
	"\u31181",
	"\u31183",
	"\u31184",
	"\u31185",
	"\u31186",
	"\u31188",
	"\u3118C",
	"\u3118D",
	"\u31196",
	"\u31199",
	"\u3119A",
	"\u3119B",
	"\u311CD",
	"\u311CE",
	"\u311CF",
	"\u311D0",
	"\u311D1",
	"\u311D2",
	"\u311D3",
	"\u311D4",
	"\u311D5",
	"\u311D6",
	"\u311D7",
	"\u311D8",
	"\u311D9",
	"\u311DA",
	"\u311DB",
	"\u311DC",
	"\u311DD",
	"\u311DE",
	"\u311DF",
	"\u311E0",
	"\u311E1",
	"\u311E2",
	"\u311E3",
	"\u311E4",
	"\u311E5",
	"\u311E6",
	"\u311E7",
	"\u311E8",
	"\u311E9",
	"\u311EA",
	"\u311EB",
	"\u311EC",
	"\u311ED",
	"\u311EE",
	"\u311EF",
	"\u311F0",
	"\u311F1",
	"\u311F2",
	"\u311F3",
	"\u311F4",
	"\u311F5",
	"\u311F6",
	"\u311F7",
	"\u311F8",
	"\u311F9",
	"\u311FA",
	"\u311FB",
	"\u311FC",
	"\u311FD",
	"\u311FE",
	"\u311FF",
	"\u31200",
	"\u31201",
	"\u31202",
	"\u31203",
	"\u31204",
	"\u31205",
	"\u31206",
	"\u31207",
	"\u31208",
	"\u31209",
	"\u3120A",
	"\u3120B",
	"\u3120C",
	"\u3120D",
	"\u3120E",
	"\u3120F",
	"\u31210",
	"\u31211",
	"\u31212",
	"\u31213",
	"\u31214",
	"\u31215",
	"\u31216",
	"\u31217",
	"\u31218",
	"\u31219",
	"\u3121A",
	"\u3121B",
	"\u3121C",
	"\u31247",
	"\u31248",
	"\u31249",
	"\u3124A",
	"\u3124B",
	"\u3124C",
	"\u3124D",
	"\u3124E",
	"\u3124F",
	"\u31250",
	"\u31251",
	"\u31252",
	"\u31253",
	"\u31254",
	"\u31255",
	"\u31256",
	"\u31257",
	"\u31258",
	"\u31259",
	"\u3125A",
	"\u3125B",
	"\u3125C",
	"\u3125D",
	"\u3125E",
	"\u3125F",
	"\u31260",
	"\u31261",
	"\u31262",
	"\u31263",
	"\u31264",
	"\u31265",
	"\u31266",
	"\u31267",
	"\u31268",
	"\u31269",
	"\u3126A",
	"\u3126B",
	"\u3126C",
	"\u3126D",
	"\u3126E",
	"\u3126F",
	"\u31271",
	"\u31272",
	"\u31273",
	"\u31274",
	"\u31275",
	"\u31276",
	"\u31277",
	"\u31278",
	"\u31279",
	"\u3127A",
	"\u3127B",
	"\u3127C",
	"\u3127D",
	"\u3127E",
	"\u3127F",
	"\u31280",
	"\u31281",
	"\u31282",
	"\u31283",
	"\u31284",
	"\u31285",
	"\u31286",
	"\u31287",
	"\u31288",
	"\u31289",
	"\u3128A",
	"\u3128B",
	"\u3128C",
	"\u3128D",
	"\u3128E",
	"\u3128F",
	"\u31290",
	"\u31291",
	"\u31292",
	"\u31293",
	"\u31294",
	"\u31295",
	"\u31296",
	"\u31297",
	"\u31298",
	"\u31299",
	"\u3129A",
	"\u3129B",
	"\u3129C",
	"\u3129D",
	"\u3129E",
	"\u3129F",
	"\u312A0",
	"\u312A1",
	"\u312A2",
	"\u312A3",
	"\u312A4",
	"\u312A5",
	"\u312A6",
	"\u312A7",
	"\u312A8",
	"\u312A9",
	"\u312AA",
	"\u312AB",
	"\u312AC",
	"\u312AD",
	"\u312AE",
	"\u312AF",
	"\u312B0",
	"\u312B1",
	"\u312B2",
	"\u312B3",
	"\u312B4",
	"\u312B5",
	"\u312BA",
	"\u312BB",
	"\u312BC",
	"\u312BD",
	"\u312C2",
	"\u312C4",
	"\u312C5",
	"\u312C6",
	"\u312C7",
	"\u312C8",
	"\u312C9",
	"\u312CA",
	"\u312CB",
	"\u312CC",
	"\u312CD",
	"\u312CE",
	"\u312D0",
	"\u312D1",
	"\u312D3",
	"\u312D4",
	"\u312D5",
	"\u312D6",
	"\u312D7",
	"\u312D8",
	"\u312D9",
	"\u312DA",
	"\u312DC",
	"\u312DD",
	"\u312DF",
	"\u312E0",
	"\u312E1",
	"\u312E2",
	"\u312E3",
	"\u312E4",
	"\u312E5",
	"\u312E6",
	"\u312E8",
	"\u312EA",
	"\u312EB",
	"\u312EC",
	"\u312ED",
	"\u312EE",
	"\u312F1",
	"\u312F4",
	"\u312F6",
	"\u312FE",
	"\u312FF",
	"\u31300",
	"\u31301",
	"\u31303",
	"\u31304",
	"\u31305",
	"\u31306",
	"\u31307",
	"\u31308",
	"\u31309",
	"\u3130A",
	"\u3130F",
	"\u31315",
	"\u31316",
	"\u31317",
	"\u31318",
	"\u31319",
	"\u3132B",
	"\u3132C",
	"\u3132D",
	"\u3132E",
	"\u3132F",
	"\u31330",
	"\u31331",
	"\u31332",
	"\u31333",
	"\u31334",
	"\u31335",
	"\u31336",
	"\u31337",
	"\u31338",
	"\u31339",
	"\u3133A",
	"\u3133C",
	"\u3133D",
	"\u31341",
	"\u31342",
	"\u31344",
	"\u31345",
	"\u31346",
	"\u31347",
	"\u31348",
	"\u31349"
];// source : https://github.com/FGRibreau/node-language-detect/tree/master

Roo.languagedetect.LanguageDetect = function (languageType) {

  /**
   * The trigram data for comparison
   *
   * Will be loaded on start from $this->_db_filename
   *
   * May be set to a PEAR_Error object if there is an error during its
   * initialization
   *
   * @var      array
   * @access   private
   */
  this.langDb = {};

  /**
   * The size of the trigram data arrays
   *
   * @var     int
   * @access  private
   */
  this.threshold = 300;

  this.useUnicodeNarrowing = true;

  /**
   * Constructor
   *
   * Load the language database.
   *
   */
  this.langDb = Roo.languagedetect.dbLang['trigram'];
  this.unicodeMap = Roo.languagedetect.dbLang['trigram-unicodemap'];

  this.languageType = languageType || null;
};

Roo.languagedetect.LanguageDetect.prototype = {

  /**
   * Returns the number of languages that this object can detect
   *
   * @access public
   * @return int the number of languages
   */
  getLanguageCount:function () {
    return this.getLanguages().length;
  },

  setLanguageType:function (type) {
    return this.languageType = type;
  },

  /**
   * Returns the list of detectable languages
   *
   * @access public
   * @return object the names of the languages known to this object
   */
  getLanguages:function () {
    return Object.keys(this.langDb);
  },

  /**
   * Returns the list of detectable languages in code
   * 
   * @returns object the code of the languages known to this object
   * 
   */
  getLanguageCodes:function() {
      var languages = this.getLanguages();
      switch(this.languageType) {
          case 'iso2' :
            return languages.map((name) => this.getCode2(name)).filter(code => code !== null);
          case 'iso3' :
            return languages.map((name) => this.getCode3(name)).filter(code => code !== null);
          default :
            return languages;
      }
  },

  /**
   * Calculates a linear rank-order distance statistic between two sets of
   * ranked trigrams
   *
   * Sums the differences in rank for each trigram. If the trigram does not
   * appear in both, consider it a difference of $this->_threshold.
   *
   * This distance measure was proposed by Cavnar & Trenkle (1994). Despite
   * its simplicity it has been shown to be highly accurate for language
   * identification tasks.
   *
   * @access  private
   * @param   arr1  the reference set of trigram ranks
   * @param   arr2  the target set of trigram ranks
   * @return  int   the sum of the differences between the ranks of
   *                the two trigram sets
   */
  distance:function (arr1, arr2) {
    var me = this
      , sumdist = 0
      , keys = Object.keys(arr2)
      , i;

    for (i = keys.length; i--;) {
      sumdist += arr1[keys[i]] ? Math.abs(arr2[keys[i]] - arr1[keys[i]]) : me.threshold;
    }

    return sumdist;
  },

  /**
   * Normalizes the score returned by _distance()
   *
   * Different if perl compatible or not
   *
   * @access  private
   * @param   score       the score from _distance()
   * @param   baseCount   the number of trigrams being considered
   * @return  number      the normalized score
   *
   * @see     distance()
   */
  normalizeScore:function (score, baseCount) {
    return 1 - (score / (baseCount || this.threshold) / this.threshold);
  },

  /**
   * Detects the closeness of a sample of text to the known languages
   *
   * Calculates the statistical difference between the text and
   * the trigrams for each language, normalizes the score then
   * returns results for all languages in sorted order
   *
   * If perl compatible, the score is 300-0, 0 being most similar.
   * Otherwise, it's 0-1 with 1 being most similar.
   *
   * The $sample text should be at least a few sentences in length;
   * should be ascii-7 or utf8 encoded, if another and the mbstring extension
   * is present it will try to detect and convert. However, experience has
   * shown that mb_detect_encoding() *does not work very well* with at least
   * some types of encoding.
   *
   * @access  public
   * @param   sample  a sample of text to compare.
   * @param   limit  if specified, return an array of the most likely
   *                  $limit languages and their scores.
   * @return  Array   sorted array of language scores, blank array if no
   *                  useable text was found, or PEAR_Error if error
   *                  with the object setup
   *
   * @see     distance()
   */
  detect:function (sample, limit) {
    var me = this
      , scores = [];

    limit = +limit || 0;

    if (sample == '' || String(sample).length < 3) {return [];}

    var sampleObj = new Roo.languagedetect.Parser(sample);
    sampleObj.setPadStart(true);
    sampleObj.analyze();

    var trigramFreqs = sampleObj.getTrigramRanks()
      , trigramCount = Object.keys(trigramFreqs).length;

    if (trigramCount == 0) {return [];}

    var keys = [], i, lang;

    if (this.useUnicodeNarrowing) {
      var blocks = sampleObj.getUnicodeBlocks()
        , languages = Object.keys(blocks)
        , keysLength = languages.length;

      for (i = keysLength; i--;) {
        if (this.unicodeMap[languages[i]]) {
          for (lang in this.unicodeMap[languages[i]]) {
            if (!~keys.indexOf(lang)) {keys.push(lang);}
          }
        }
      }
    } else {
      keys = me.getLanguages();
    }

    for (i = keys.length; i--;) {
      var score = me.normalizeScore(me.distance(me.langDb[keys[i]], trigramFreqs), trigramCount);
      if (score) {scores.push([keys[i], score]);}
    }

    // Sort the array
    scores.sort(function (a, b) { return b[1] - a[1]; });
    var scoresLength = scores.length;

    if (!scoresLength) {return [];}

    switch (me.languageType) {
      case 'iso2':
        for (i = scoresLength; i--;) {
          scores[i][0] = this.getCode2(scores[i][0]);
        }
        break;
      case 'iso3':
        for (i = scoresLength; i--;) {
          scores[i][0] = this.getCode3(scores[i][0]);
        }
        break;
    }

    // limit the number of returned scores
    return limit > 0 ? scores.slice(0, limit) : scores;
  },

  getCode2:function (lang) {
    return Roo.languagedetect.LanguageDetect.nameToCode2[String(lang).toLowerCase()] || null;
  },

  getCode3: function(lang) {
    return Roo.languagedetect.LanguageDetect.nameToCode3[String(lang).toLowerCase()] || null;
  },

  getName2: function(code) {
    return Roo.languagedetect.LanguageDetect.code2ToName[String(code).toLowerCase()] || null;
  },

  getName3: function(code) {
    return Roo.languagedetect.LanguageDetect.code3ToName[String(code).toLowerCase()] || null;
  }
};

Roo.apply(Roo.languagedetect.LanguageDetect, {
  nameToCode2:{
    'albanian':'sq',
    'arabic':'ar',
    'azeri':'az',
    'bengali':'bn',
    'bulgarian':'bg',
    'cebuano':null,
    'croatian':'hr',
    'czech':'cs',
    'danish':'da',
    'dutch':'nl',
    'english':'en',
    'estonian':'et',
    'farsi':'fa',
    'finnish':'fi',
    'french':'fr',
    'german':'de',
    'hausa':'ha',
    'hawaiian':null,
    'hindi':'hi',
    'hungarian':'hu',
    'icelandic':'is',
    'indonesian':'id',
    'italian':'it',
    'kazakh':'kk',
    'kyrgyz':'ky',
    'latin':'la',
    'latvian':'lv',
    'lithuanian':'lt',
    'macedonian':'mk',
    'mongolian':'mn',
    'nepali':'ne',
    'norwegian':'no',
    'pashto':'ps',
    'pidgin':null,
    'polish':'pl',
    'portuguese':'pt',
    'romanian':'ro',
    'russian':'ru',
    'serbian':'sr',
    'slovak':'sk',
    'slovene':'sl',
    'somali':'so',
    'spanish':'es',
    'swahili':'sw',
    'swedish':'sv',
    'tagalog':'tl',
    'turkish':'tr',
    'ukrainian':'uk',
    'urdu':'ur',
    'uzbek':'uz',
    'vietnamese':'vi',
    'welsh':'cy'
  },

  nameToCode3:{
    'albanian':'sqi',
    'arabic':'ara',
    'azeri':'aze',
    'bengali':'ben',
    'bulgarian':'bul',
    'cebuano':'ceb',
    'croatian':'hrv',
    'czech':'ces',
    'danish':'dan',
    'dutch':'nld',
    'english':'eng',
    'estonian':'est',
    'farsi':'fas',
    'finnish':'fin',
    'french':'fra',
    'german':'deu',
    'hausa':'hau',
    'hawaiian':'haw',
    'hindi':'hin',
    'hungarian':'hun',
    'icelandic':'isl',
    'indonesian':'ind',
    'italian':'ita',
    'kazakh':'kaz',
    'kyrgyz':'kir',
    'latin':'lat',
    'latvian':'lav',
    'lithuanian':'lit',
    'macedonian':'mkd',
    'mongolian':'mon',
    'nepali':'nep',
    'norwegian':'nor',
    'pashto':'pus',
    'pidgin':'crp',
    'polish':'pol',
    'portuguese':'por',
    'romanian':'ron',
    'russian':'rus',
    'serbian':'srp',
    'slovak':'slk',
    'slovene':'slv',
    'somali':'som',
    'spanish':'spa',
    'swahili':'swa',
    'swedish':'swe',
    'tagalog':'tgl',
    'turkish':'tur',
    'ukrainian':'ukr',
    'urdu':'urd',
    'uzbek':'uzb',
    'vietnamese':'vie',
    'welsh':'cym'
  },
  code2ToName:{
    'ar':'arabic',
    'az':'azeri',
    'bg':'bulgarian',
    'bn':'bengali',
    'cs':'czech',
    'cy':'welsh',
    'da':'danish',
    'de':'german',
    'en':'english',
    'es':'spanish',
    'et':'estonian',
    'fa':'farsi',
    'fi':'finnish',
    'fr':'french',
    'ha':'hausa',
    'hi':'hindi',
    'hr':'croatian',
    'hu':'hungarian',
    'id':'indonesian',
    'is':'icelandic',
    'it':'italian',
    'kk':'kazakh',
    'ky':'kyrgyz',
    'la':'latin',
    'lt':'lithuanian',
    'lv':'latvian',
    'mk':'macedonian',
    'mn':'mongolian',
    'ne':'nepali',
    'nl':'dutch',
    'no':'norwegian',
    'pl':'polish',
    'ps':'pashto',
    'pt':'portuguese',
    'ro':'romanian',
    'ru':'russian',
    'sk':'slovak',
    'sl':'slovene',
    'so':'somali',
    'sq':'albanian',
    'sr':'serbian',
    'sv':'swedish',
    'sw':'swahili',
    'tl':'tagalog',
    'tr':'turkish',
    'uk':'ukrainian',
    'ur':'urdu',
    'uz':'uzbek',
    'vi':'vietnamese'
  },

  code3ToName:{
    'ara':'arabic',
    'aze':'azeri',
    'ben':'bengali',
    'bul':'bulgarian',
    'ceb':'cebuano',
    'ces':'czech',
    'crp':'pidgin',
    'cym':'welsh',
    'dan':'danish',
    'deu':'german',
    'eng':'english',
    'est':'estonian',
    'fas':'farsi',
    'fin':'finnish',
    'fra':'french',
    'hau':'hausa',
    'haw':'hawaiian',
    'hin':'hindi',
    'hrv':'croatian',
    'hun':'hungarian',
    'ind':'indonesian',
    'isl':'icelandic',
    'ita':'italian',
    'kaz':'kazakh',
    'kir':'kyrgyz',
    'lat':'latin',
    'lav':'latvian',
    'lit':'lithuanian',
    'mkd':'macedonian',
    'mon':'mongolian',
    'nep':'nepali',
    'nld':'dutch',
    'nor':'norwegian',
    'pol':'polish',
    'por':'portuguese',
    'pus':'pashto',
    'rom':'romanian',
    'rus':'russian',
    'slk':'slovak',
    'slv':'slovene',
    'som':'somali',
    'spa':'spanish',
    'sqi':'albanian',
    'srp':'serbian',
    'swa':'swahili',
    'swe':'swedish',
    'tgl':'tagalog',
    'tur':'turkish',
    'ukr':'ukrainian',
    'urd':'urdu',
    'uzb':'uzbek',
    'vie':'vietnamese'
  }
});// source : https://github.com/FGRibreau/node-language-detect/tree/master

Roo.languagedetect.Parser = function (string) {
    /**
     * The size of the trigram data arrays
     *
     * @access   private
     * @var      int
     */
    this.threshold = 300;
  
    /**
     * stores the trigram ranks of the sample
     *
     * @access  private
     * @var     array
     */
    this.trigramRanks = {};
  
    /**
     * Whether the parser should compile trigrams
     *
     * @access  private
     * @var     bool
     */
    this.compileTrigram = true;
  
    this.compileUnicode = true;
    this.unicodeSkipAscii = true;
    this.unicodeBlocks = {};
  
    /**
     * Whether the trigram parser should pad the beginning of the string
     *
     * @access  private
     * @var     bool
     */
    this.trigramPadStart = false;
  
    this.trigram = {};
  
    /**
     * the piece of text being parsed
     *
     * @access  private
     * @var     string
     */
  
    /**
     * Constructor
     *
     * @access  private
     * @param   string  string to be parsed
     */
    this.string = string ? string.replace(/[~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/g, ' ') : '';
};

  
Roo.languagedetect.Parser.prototype = {
  /**
   * turn on/off padding the beginning of the sample string
   *
   * @access  public
   * @param   bool   true for on, false for off
   */
  setPadStart: function (bool) {
    this.trigramPadStart = bool || true;
  },

  /**
   * Returns the trigram ranks for the text sample
   *
   * @access  public
   * @return  array   trigram ranks in the text sample
   */
  getTrigramRanks: function () {
    return this.trigramRanks;
  },

  getBlockCount: function () {
    return Roo.languagedetect.Parser.dbUnicodeBlocks.length;
  },

  getUnicodeBlocks: function () {
    return this.unicodeBlocks;
  },

  /**
   * Executes the parsing operation
   *
   * Be sure to call the set*() functions to set options and the
   * prepare*() functions first to tell it what kind of data to compute
   *
   * Afterwards the get*() functions can be used to access the compiled
   * information.
   *
   * @access public
   */
  analyze: function () {
    var len = this.string.length
      , byteCounter = 0
      , a = ' ', b = ' '
      , dropone, c;

    if (this.compileUnicode) {
      var blocksCount = Roo.languagedetect.Parser.dbUnicodeBlocks.length;
    }

    // trigram startup
    if (this.compileTrigram) {
      // initialize them as blank so the parser will skip the first two
      // (since it skips trigrams with more than  2 contiguous spaces)
      a = ' ';
      b = ' ';

      // kludge
      // if it finds a valid trigram to start and the start pad option is
      // off, then set a variable that will be used to reduce this
      // trigram after parsing has finished
      if (!this.trigramPadStart) {
        a = this.string.charAt(byteCounter++).toLowerCase();

        if (a != ' ') {
          b = this.string.charAt(byteCounter).toLowerCase();
          dropone = ' ' + a + b;
        }

        byteCounter = 0;
        a = ' ';
        b = ' ';
      }
    }

    var skippedCount = 0;
    var unicodeChars = {};

    while (byteCounter < len) {
      c = this.string.charAt(byteCounter++).toLowerCase();

      // language trigram detection
      if (this.compileTrigram) {
        if (!(b == ' ' && (a == ' ' || c == ' '))) {
          var abc = a + b + c;
          this.trigram[abc] = this.trigram[abc] ? this.trigram[abc] += 1 : 1;
        }

        a = b;
        b = c;
      }

      if (this.compileUnicode) {
        var charCode = c.charCodeAt(0);

        if (this.unicodeSkipAscii
          && c.match(/[a-z ]/i)
          && (charCode < 65 || charCode > 122 || (charCode > 90 && charCode < 97))
          && c != "'") {

          skippedCount++;
          continue;
        }

        unicodeChars[c] = unicodeChars[c] ? unicodeChars[c] += 1 : 1;
      }
    }

    this.unicodeBlocks = {};

    if (this.compileUnicode) {
      var keys = Object.keys(unicodeChars)
        , keysLength = keys.length;

      for (var i = keysLength; i--;) {
        var unicode = keys[i].charCodeAt(0)
          , count = unicodeChars[keys[i]]
          , search = this.unicodeBlockName(unicode, blocksCount)
          , blockName = search != -1 ? search[2] : '[Malformatted]';

        this.unicodeBlocks[blockName] = this.unicodeBlocks[blockName] ? this.unicodeBlocks[blockName] += count : count;
      }
    }

    // trigram cleanup
    if (this.compileTrigram) {
      // pad the end
      if (b != ' ') {
        var ab = a + b + ' ';
        this.trigram[ab] = this.trigram[ab] ? this.trigram[ab] += 1 : 1;
      }

      // perl compatibility; Language::Guess does not pad the beginning
      // kludge
      if (typeof dropone != 'undefined' && this.trigram[dropone] == 1) {
        delete this.trigram[dropone];
      }

      if (this.trigram && Object.keys(this.trigram).length > 0) {
        this.trigramRanks = this.arrRank(this.trigram);
      } else {
        this.trigramRanks = {};
      }
    }
  },

  /**
   * Sorts an array by value breaking ties alphabetically
   *
   * @access private
   * @param arr the array to sort
   */
  bubleSort: function (arr) {
    // should do the same as this perl statement:
    // sort { $trigrams{$b} == $trigrams{$a} ?  $a cmp $b : $trigrams{$b} <=> $trigrams{$a} }

    // needs to sort by both key and value at once
    // using the key to break ties for the value

    // converts array into an array of arrays of each key and value
    // may be a better way of doing this
    var combined = [];

    for (var key in arr) {
      combined.push([key, arr[key]]);
    }

    combined = combined.sort(this.sortFunc);

    var replacement = {};

    var length = combined.length;

    for (var i = 0; i < length; i++) {
      replacement[combined[i][0]] = combined[i][1];
    }

    return replacement;
  },

  /**
   * Converts a set of trigrams from frequencies to ranks
   *
   * Thresholds (cuts off) the list at $this->_threshold
   *
   * @access  protected
   * @param   arr     array of trgram
   * @return  object  ranks of trigrams
   */
  arrRank: function (arr) {

    // sorts alphabetically first as a standard way of breaking rank ties
    arr = this.bubleSort(arr);

    var rank = {}, i = 0;

    for (var key in arr) {
      rank[key] = i++;

      // cut off at a standard threshold
      if (i >= this.threshold) {
        break;
      }
    }

    return rank;
  },

  /**
   * Sort function used by bubble sort
   *
   * Callback function for usort().
   *
   * @access   private
   * @param    a    first param passed by usort()
   * @param    b    second param passed by usort()
   * @return   int  1 if $a is greater, -1 if not
   *
   * @see      bubleSort()
   */
  sortFunc: function (a, b) {
    // each is actually a key/value pair, so that it can compare using both
    var aKey = a[0]
      , aValue = a[1]
      , bKey = b[0]
      , bValue = b[1];

    // if the values are the same, break ties using the key
    if (aValue == bValue) {
      return aKey.localeCompare(bKey);
    } else {
      return aValue > bValue ? -1 : 1;
    }
  },

  unicodeBlockName: function (unicode, blockCount) {
    if (unicode <= Roo.languagedetect.Parser.dbUnicodeBlocks[0][1]) {
      return Roo.languagedetect.Parser.dbUnicodeBlocks[0];
    }

    var high = blockCount ? blockCount - 1 : Roo.languagedetect.Parser.dbUnicodeBlocks.length
      , low = 1
      , mid;

    while (low <= high) {
      mid = Math.floor((low + high) / 2);

      if (unicode < Roo.languagedetect.Parser.dbUnicodeBlocks[mid][0]) {
        high = mid - 1;
      } else if (unicode > Roo.languagedetect.Parser.dbUnicodeBlocks[mid][1]) {
        low = mid + 1;
      } else {
        return Roo.languagedetect.Parser.dbUnicodeBlocks[mid];
      }
    }

    return -1;
  }
};

Roo.apply(Roo.languagedetect.Parser, {
  dbUnicodeBlocks: [
      ["0x0000", "0x007F", "Basic Latin"],
      ["0x0080", "0x00FF", "Latin-1 Supplement"],
      ["0x0100", "0x017F", "Latin Extended-A"],
      ["0x0180", "0x024F", "Latin Extended-B"],
      ["0x0250", "0x02AF", "IPA Extensions"],
      ["0x02B0", "0x02FF", "Spacing Modifier Letters"],
      ["0x0300", "0x036F", "Combining Diacritical Marks"],
      ["0x0370", "0x03FF", "Greek and Coptic"],
      ["0x0400", "0x04FF", "Cyrillic"],
      ["0x0500", "0x052F", "Cyrillic Supplement"],
      ["0x0530", "0x058F", "Armenian"],
      ["0x0590", "0x05FF", "Hebrew"],
      ["0x0600", "0x06FF", "Arabic"],
      ["0x0700", "0x074F", "Syriac"],
      ["0x0750", "0x077F", "Arabic Supplement"],
      ["0x0780", "0x07BF", "Thaana"],
      ["0x0900", "0x097F", "Devanagari"],
      ["0x0980", "0x09FF", "Bengali"],
      ["0x0A00", "0x0A7F", "Gurmukhi"],
      ["0x0A80", "0x0AFF", "Gujarati"],
      ["0x0B00", "0x0B7F", "Oriya"],
      ["0x0B80", "0x0BFF", "Tamil"],
      ["0x0C00", "0x0C7F", "Telugu"],
      ["0x0C80", "0x0CFF", "Kannada"],
      ["0x0D00", "0x0D7F", "Malayalam"],
      ["0x0D80", "0x0DFF", "Sinhala"],
      ["0x0E00", "0x0E7F", "Thai"],
      ["0x0E80", "0x0EFF", "Lao"],
      ["0x0F00", "0x0FFF", "Tibetan"],
      ["0x1000", "0x109F", "Myanmar"],
      ["0x10A0", "0x10FF", "Georgian"],
      ["0x1100", "0x11FF", "Hangul Jamo"],
      ["0x1200", "0x137F", "Ethiopic"],
      ["0x1380", "0x139F", "Ethiopic Supplement"],
      ["0x13A0", "0x13FF", "Cherokee"],
      ["0x1400", "0x167F", "Unified Canadian Aboriginal Syllabics"],
      ["0x1680", "0x169F", "Ogham"],
      ["0x16A0", "0x16FF", "Runic"],
      ["0x1700", "0x171F", "Tagalog"],
      ["0x1720", "0x173F", "Hanunoo"],
      ["0x1740", "0x175F", "Buhid"],
      ["0x1760", "0x177F", "Tagbanwa"],
      ["0x1780", "0x17FF", "Khmer"],
      ["0x1800", "0x18AF", "Mongolian"],
      ["0x1900", "0x194F", "Limbu"],
      ["0x1950", "0x197F", "Tai Le"],
      ["0x1980", "0x19DF", "New Tai Lue"],
      ["0x19E0", "0x19FF", "Khmer Symbols"],
      ["0x1A00", "0x1A1F", "Buginese"],
      ["0x1D00", "0x1D7F", "Phonetic Extensions"],
      ["0x1D80", "0x1DBF", "Phonetic Extensions Supplement"],
      ["0x1DC0", "0x1DFF", "Combining Diacritical Marks Supplement"],
      ["0x1E00", "0x1EFF", "Latin Extended Additional"],
      ["0x1F00", "0x1FFF", "Greek Extended"],
      ["0x2000", "0x206F", "General Punctuation"],
      ["0x2070", "0x209F", "Superscripts and Subscripts"],
      ["0x20A0", "0x20CF", "Currency Symbols"],
      ["0x20D0", "0x20FF", "Combining Diacritical Marks for Symbols"],
      ["0x2100", "0x214F", "Letterlike Symbols"],
      ["0x2150", "0x218F", "Number Forms"],
      ["0x2190", "0x21FF", "Arrows"],
      ["0x2200", "0x22FF", "Mathematical Operators"],
      ["0x2300", "0x23FF", "Miscellaneous Technical"],
      ["0x2400", "0x243F", "Control Pictures"],
      ["0x2440", "0x245F", "Optical Character Recognition"],
      ["0x2460", "0x24FF", "Enclosed Alphanumerics"],
      ["0x2500", "0x257F", "Box Drawing"],
      ["0x2580", "0x259F", "Block Elements"],
      ["0x25A0", "0x25FF", "Geometric Shapes"],
      ["0x2600", "0x26FF", "Miscellaneous Symbols"],
      ["0x2700", "0x27BF", "Dingbats"],
      ["0x27C0", "0x27EF", "Miscellaneous Mathematical Symbols-A"],
      ["0x27F0", "0x27FF", "Supplemental Arrows-A"],
      ["0x2800", "0x28FF", "Braille Patterns"],
      ["0x2900", "0x297F", "Supplemental Arrows-B"],
      ["0x2980", "0x29FF", "Miscellaneous Mathematical Symbols-B"],
      ["0x2A00", "0x2AFF", "Supplemental Mathematical Operators"],
      ["0x2B00", "0x2BFF", "Miscellaneous Symbols and Arrows"],
      ["0x2C00", "0x2C5F", "Glagolitic"],
      ["0x2C80", "0x2CFF", "Coptic"],
      ["0x2D00", "0x2D2F", "Georgian Supplement"],
      ["0x2D30", "0x2D7F", "Tifinagh"],
      ["0x2D80", "0x2DDF", "Ethiopic Extended"],
      ["0x2E00", "0x2E7F", "Supplemental Punctuation"],
      ["0x2E80", "0x2EFF", "CJK Radicals Supplement"],
      ["0x2F00", "0x2FDF", "Kangxi Radicals"],
      ["0x2FF0", "0x2FFF", "Ideographic Description Characters"],
      ["0x3000", "0x303F", "CJK Symbols and Punctuation"],
      ["0x3040", "0x309F", "Hiragana"],
      ["0x30A0", "0x30FF", "Katakana"],
      ["0x3100", "0x312F", "Bopomofo"],
      ["0x3130", "0x318F", "Hangul Compatibility Jamo"],
      ["0x3190", "0x319F", "Kanbun"],
      ["0x31A0", "0x31BF", "Bopomofo Extended"],
      ["0x31C0", "0x31EF", "CJK Strokes"],
      ["0x31F0", "0x31FF", "Katakana Phonetic Extensions"],
      ["0x3200", "0x32FF", "Enclosed CJK Letters and Months"],
      ["0x3300", "0x33FF", "CJK Compatibility"],
      ["0x3400", "0x4DBF", "CJK Unified Ideographs Extension A"],
      ["0x4DC0", "0x4DFF", "Yijing Hexagram Symbols"],
      ["0x4E00", "0x9FFF", "CJK Unified Ideographs"],
      ["0xA000", "0xA48F", "Yi Syllables"],
      ["0xA490", "0xA4CF", "Yi Radicals"],
      ["0xA700", "0xA71F", "Modifier Tone Letters"],
      ["0xA800", "0xA82F", "Syloti Nagri"],
      ["0xAC00", "0xD7AF", "Hangul Syllables"],
      ["0xD800", "0xDB7F", "High Surrogates"],
      ["0xDB80", "0xDBFF", "High Private Use Surrogates"],
      ["0xDC00", "0xDFFF", "Low Surrogates"],
      ["0xE000", "0xF8FF", "Private Use Area"],
      ["0xF900", "0xFAFF", "CJK Compatibility Ideographs"],
      ["0xFB00", "0xFB4F", "Alphabetic Presentation Forms"],
      ["0xFB50", "0xFDFF", "Arabic Presentation Forms-A"],
      ["0xFE00", "0xFE0F", "Variation Selectors"],
      ["0xFE10", "0xFE1F", "Vertical Forms"],
      ["0xFE20", "0xFE2F", "Combining Half Marks"],
      ["0xFE30", "0xFE4F", "CJK Compatibility Forms"],
      ["0xFE50", "0xFE6F", "Small Form Variants"],
      ["0xFE70", "0xFEFF", "Arabic Presentation Forms-B"],
      ["0xFF00", "0xFFEF", "Halfwidth and Fullwidth Forms"],
      ["0xFFF0", "0xFFFF", "Specials"],
      ["0x10000", "0x1007F", "Linear B Syllabary"],
      ["0x10080", "0x100FF", "Linear B Ideograms"],
      ["0x10100", "0x1013F", "Aegean Numbers"],
      ["0x10140", "0x1018F", "Ancient Greek Numbers"],
      ["0x10300", "0x1032F", "Old Italic"],
      ["0x10330", "0x1034F", "Gothic"],
      ["0x10380", "0x1039F", "Ugaritic"],
      ["0x103A0", "0x103DF", "Old Persian"],
      ["0x10400", "0x1044F", "Deseret"],
      ["0x10450", "0x1047F", "Shavian"],
      ["0x10480", "0x104AF", "Osmanya"],
      ["0x10800", "0x1083F", "Cypriot Syllabary"],
      ["0x10A00", "0x10A5F", "Kharoshthi"],
      ["0x1D000", "0x1D0FF", "Byzantine Musical Symbols"],
      ["0x1D100", "0x1D1FF", "Musical Symbols"],
      ["0x1D200", "0x1D24F", "Ancient Greek Musical Notation"],
      ["0x1D300", "0x1D35F", "Tai Xuan Jing Symbols"],
      ["0x1D400", "0x1D7FF", "Mathematical Alphanumeric Symbols"],
      ["0x20000", "0x2A6DF", "CJK Unified Ideographs Extension B"],
      ["0x2F800", "0x2FA1F", "CJK Compatibility Ideographs Supplement"],
      ["0xE0000", "0xE007F", "Tags"],
      ["0xE0100", "0xE01EF", "Variation Selectors Supplement"],
      ["0xF0000", "0xFFFFF", "Supplementary Private Use Area-A"],
      ["0x100000", "0x10FFFF", "Supplementary Private Use Area-B"]
  ]
});Roo.languagedetect.Detect = function() {
    this.languageDetect = new Roo.languagedetect.LanguageDetect('iso2');
};

Roo.languagedetect.Detect.prototype = {
    koRegex : /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/,
    jaRegex : /[\u3040-\u30ff]|[\uff66-\uff9f]|[\u1aff0-\u1b16f]/,
    codeToName : {
        'ja':'japanese',
        'ko':'korean',
        'zh_HK':'traditional chinese',
        'zh_CN':'simplified chinese'
    },

    /**
     * 
     * @param {String} lang iso 639 language code
     * @returns {Boolean} indicate whether the language is detectable
     */
    isSupported : function(lang) {
        var supportedLangs = this.languageDetect.getLanguageCodes();

        supportedLangs.push('ja', 'ko', 'zh_HK', 'zh_CN');

        if(!supportedLangs.includes(lang)) {
            return false;
        }

        return true;
    },
    /**
     * 
     * @param {String} input input text
     * @param {String} lang iso 639 language code
     * @returns {Boolean} indicate whether is the input text is written in input language
     */
    isLanguage : function(input, lang) {
        if(!this.isSupported(lang)) {
            return false;
        }

        if(['ja', 'ko', 'zh_HK', 'zh_CN'].includes(lang)) {
            return this.isCJK(input, lang);
        }

        var scores = this.languageDetect.detect(input);

        var ret = false;
        Roo.each(scores, (score) => {
            if(score[1] > 0.3 && score[0] == lang) {
                ret = true;
            }
        });

        return ret;
    },
    isCJK : function(input, lang) {
        var count = {};
        Roo.each(['ja', 'ko', 'zh_HK', 'zh_CN'], function(code) {
            count[code] = 0;
        });

        for(var i = 0; i < input.length; i++) {
            if(this.koRegex.test(input[i])) {
                count['ko'] ++;
                continue;
            }
            if(this.jaRegex.test(input[i])) {
                count['ja'] ++;
                continue;
            }
            if(Roo.languagedetect.zh_CN.includes(input[i])) {
                count['zh_CN'] ++;
                continue;
            }
            if(Roo.languagedetect.zh_HK.includes(input[i])) {
                count['zh_HK'] ++;
                continue;
            }
        }

        Roo.log(count);

        
        return false;
    },
    /**
     * 
     * @param {String} code iso 639 language code
     * @returns {String} name of the input language code
     */
    getName : function(code) {
        if(!this.isSupported(code)) {
            return '';
        }
        return (
            this.languageDetect.getName2(code) || // LanguageDetect
            this.codeToName[code] || // CJK
            null
        );
    }
};