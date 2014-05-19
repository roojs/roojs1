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
 * @singleton
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
        isIE = ua.indexOf("msie") > -1,
        isIE7 = ua.indexOf("msie 7") > -1,
        isGecko = !isSafari && ua.indexOf("gecko") > -1,
        isBorderBox = isIE && !isStrict,
        isWindows = (ua.indexOf("windows") != -1 || ua.indexOf("win32") != -1),
        isMac = (ua.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1),
        isLinux = (ua.indexOf("linux") != -1),
        isSecure = window.location.href.toLowerCase().indexOf("https") === 0,
        isTouch =  'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;
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
                if (Roo.debug) Roo.log("Roo.Factory(" + c.xtype + ")");
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

        // internal
        callback : function(cb, scope, args, delay){
            if(typeof cb == "function"){
                if(delay){
                    cb.defer(delay, scope, args || []);
                }else{
                    cb.apply(scope, args || []);
                }
            }
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
        isIE : isIE,
        /** @type Boolean */
        isIE7 : isIE7,
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
        }
        
    });


})();

Roo.namespace("Roo", "Roo.util", "Roo.grid", "Roo.dd", "Roo.tree", "Roo.data",
                "Roo.form", "Roo.menu", "Roo.state", "Roo.lib", "Roo.layout", "Roo.app", "Roo.ux");
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
     * Checks whether or not the specified object exists in the array.
     * @param {Object} o The object to check for
     * @return {Number} The index of o in the array (or -1 if it is not found)
     */
    indexOf : function(o){
       for (var i = 0, len = this.length; i < len; i++){
 	      if(this[i] == o) return i;
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
        if (typeof fun != "function")
            throw new TypeError();

        var res = new Array(len);
        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
        {
            if (i in this)
                res[i] = fun.call(thisp, this[i], i, this);
        }

        return res;
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
 @return {Number} The diff in milliseconds
 @member Date getElapsed
 */
Date.prototype.getElapsed = function(date) {
	return Math.abs((date || new Date()).getTime()-this.getTime());
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
        + "{v = new Date(y, m, d, h, i, s);}\n"
        + "else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0)\n"
        + "{v = new Date(y, m, d, h, i);}\n"
        + "else if (y >= 0 && m >= 0 && d > 0 && h >= 0)\n"
        + "{v = new Date(y, m, d, h);}\n"
        + "else if (y >= 0 && m >= 0 && d > 0)\n"
        + "{v = new Date(y, m, d);}\n"
        + "else if (y >= 0 && m >= 0)\n"
        + "{v = new Date(y, m);}\n"
        + "else if (y >= 0)\n"
        + "{v = new Date(y);}\n"
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
            c:"m = parseInt(results[" + currentGroup + "], 10) - 1;\n",
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
// safari setMonth is broken
if(Roo.isSafari){
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
  if (!interval || value === 0) return d;
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
 * @class Roo.lib.Dom
 * @static
 * 
 * Dom utils (from YIU afaik)
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

    getDocumentHeight: function() {
        var scrollHeight = (document.compatMode != "CSS1Compat") ? document.body.scrollHeight : document.documentElement.scrollHeight;
        return Math.max(scrollHeight, this.getViewportHeight());
    },

    getDocumentWidth: function() {
        var scrollWidth = (document.compatMode != "CSS1Compat") ? document.body.scrollWidth : document.documentElement.scrollWidth;
        return Math.max(scrollWidth, this.getViewportWidth());
    },

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

/*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */

(function() {
    /**
     * @class Roo.lib.Ajax
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

        serializeForm : function(form) {
            if(typeof form == 'string') {
                form = (document.getElementById(form) || document.forms[form]);
            }

            var el, name, val, disabled, data = '', hasSubmit = false;
            for (var i = 0; i < form.elements.length; i++) {
                el = form.elements[i];
                disabled = form.elements[i].disabled;
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
    };/*
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
 * @singleton
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
            if(attr == "tag" || attr == "children" || attr == "cn" || attr == "html" || typeof o[attr] == "function") continue;
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
        o.tag = o.tag || div;
        if (o.ns && Roo.isIE) {
            ns = false;
            o.tag = o.ns + ':' + o.tag;
            
        }
        var el = ns ? document.createElementNS( ns, o.tag||'div') :  document.createElement(o.tag||'div');
        var useSet = el.setAttribute ? true : false; // In IE some elements don't have setAttribute
        for(var attr in o){
            
            if(attr == "tag" || attr == "ns" ||attr == "xmlns" ||attr == "children" || attr == "cn" || attr == "html" || 
                    attr == "style" || typeof o[attr] == "function") continue;
                    
            if(attr=="cls" && Roo.isIE){
                el.className = o["cls"];
            }else{
                if(useSet) el.setAttribute(attr=="cls" ? 'class' : attr, o[attr]);
                else el[attr] = o[attr];
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
        while(++i < depth){
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
    overwrite : function(el, o, returnElement){
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
     * @cfg {String} url  The Url to load the template from. beware if you are loading from a url, the data may not be ready if you use it instantly..
     *                    it should be fixed so that template is observable...
     */
    url : false,
    /**
     * @cfg {String} html  The HTML fragment or an array of fragments to join("") or multiple arguments to join("")
     */
    html : '',
    /**
     * Returns an HTML fragment of this template with the specified values applied.
     * @param {Object} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @return {String} The HTML fragment
     */
    applyTemplate : function(values){
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
                _t.html = response.responseText;
                _t.url = false;
                _t.compile();
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
        this.compiled = null;
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
 * @singleton
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
            if((' '+ci.className+' ').indexOf(v) != -1){
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
            return n.className;
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
                a = ci.className;
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
                    Roo.log('tm');
                    Roo.log(tm);
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
                    Roo.log('fn');
                        Roo.log(fn);
                        Roo.log(q);
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
            if(!this.events[ename]){ this.events[ename] = true; };
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
                    if(l.fireFn.apply(l.scope||this.obj||window, arguments) === false){
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
 * @singleton
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

    var listen = function(element, ename, opt, fn, scope){
        var o = (!opt || typeof opt == "boolean") ? {} : opt;
        fn = fn || o.fn; scope = scope || o.scope;
        var el = Roo.getDom(element);
        if(!el){
            throw "Error listening for \"" + ename + '\". Element "' + element + '" doesn\'t exist.';
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

        E.on(el, ename, h);
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
        onWindowResize : function(fn, scope, options){
            if(!resizeEvent){
                resizeEvent = new Roo.util.Event();
                resizeTask = new Roo.util.DelayedTask(function(){
                    resizeEvent.fire(D.getViewWidth(), D.getViewHeight());
                });
                E.on(window, "resize", function(){
                    if(Roo.isIE){
                        resizeTask.delay(50);
                    }else{
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
            : Roo.isGecko ? "roo-gecko"
            : Roo.isOpera ? "roo-opera"
            : Roo.isSafari ? "roo-safari" : ""];

    if(Roo.isMac){
        cls.push("roo-mac");
    }
    if(Roo.isLinux){
        cls.push("roo-linux");
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
 * @singleton
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
    Roo.Element = function(element, forceNew){
        var dom = typeof element == "string" ?
                document.getElementById(element) : element;
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
    };

    var El = Roo.Element;

    El.prototype = {
        /**
         * The element's default display mode  (defaults to "")
         * @type String
         */
        originalDisplay : "",

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
            if(typeof display != "undefined") this.originalDisplay = display;
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
                        if(typeof onComplete == "function") onComplete();
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
                    this.dom.className = this.dom.className + " " + className;
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
            if(!className || !this.dom.className){
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
                    this.dom.className =
                        this.dom.className.replace(re, " ");
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
        addListener : function(eventName, fn, scope, options){
            if (this.dom) {
                Roo.EventManager.on(this.dom,  eventName, fn, scope || this, options);
            }
        },

        /**
         * Removes an event handler from this element
         * @param {String} eventName the type of event to remove
         * @param {Function} fn the method the event invokes
         * @return {Roo.Element} this
         */
        removeListener : function(eventName, fn){
            Roo.EventManager.removeListener(this.dom,  eventName, fn);
            return this;
        },

        /**
         * Removes all previous added listeners from this element
         * @return {Roo.Element} this
         */
        removeAllListeners : function(){
            E.purgeElement(this.dom);
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
        getAlignToXY : function(el, p, o){
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
               var swapY = ((p1y=="t" && p2y=="b") || (p1y=="b" && p2y=="t"));
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
         * @param {String} msgCls (optional) A css class to apply to the msg element
         * @return {Element} The mask  element
         */
        mask : function(msg, msgCls)
        {
            if(this.getStyle("position") == "static"){
                this.setStyle("position", "relative");
            }
            if(!this._mask){
                this._mask = Roo.DomHelper.append(this.dom, {cls:"roo-el-mask"}, true);
            }
            this.addClass("x-masked");
            this._mask.setDisplayed(true);
            
            // we wander
            var z = 0;
            var dom = this.dom
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
                    this._maskMsg = Roo.DomHelper.append(this.dom, {cls:"roo-el-mask-msg", cn:{tag:'div'}}, true);
                }
                var mm = this._maskMsg;
                mm.dom.className = msgCls ? "roo-el-mask-msg " + msgCls : "roo-el-mask-msg";
                mm.dom.firstChild.innerHTML = msg;
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
            return;
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
                if(attr == "style" || typeof o[attr] == "function") continue;
                if(attr=="cls"){
                    el.className = o["cls"];
                }else{
                    if(useSet) el.setAttribute(attr, o[attr]);
                    else el[attr] = o[attr];
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
         * @param {String} name The attribute name
         * @param {String} value (optional) The value to set the attribute to
         * @return {String} The attribute value
         */
        attr : function(name){
            if (arguments.length > 1) {
                this.dom.setAttribute(name, arguments[1]);
                return arguments[1];
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
        if(!els) return this;
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
    * @return {CompositeElement} this
    */
    filter : function(selector){
        var els = [];
        this.each(function(el){
            if(el.is(selector)){
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
 * either to a configured URL, or to a URL specified at request time.<br><br>
 * <p>
 * Requests made by this class are asynchronous, and will return immediately. No data from
 * the server will be available to the statement immediately following the {@link #request} call.
 * To process returned data, use a callback in the request options object, or an event listener.</p><br>
 * <p>
 * Note: If you are doing a file upload, you will not get a normal response object sent back to
 * your callback or event handler.  Since the upload is handled via in IFRAME, there is no XMLHttpRequest.
 * The response object is created using the innerHTML of the IFRAME's document as the responseText
 * property and, if present, the IFRAME's XML document as the responseXML property.</p><br>
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
                if(o.isUpload || (enctype && enctype.toLowerCase() == 'multipart/form-data')){
                    return this.doFormUpload(o, p, url);
                }
                var f = Roo.lib.Ajax.serializeForm(form);
                p = p ? (p + '&' + f) : f;
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
            this.transId = Roo.lib.Ajax.request(method, url, cb, p, o);
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
     */
    this.start = function(task){
        tasks.push(task);
        task.taskStartTime = new Date().getTime();
        task.taskRunTime = 0;
        task.taskRunCount = 0;
        startThread();
        return task;
    };

    this.stop = function(task){
        removeTask(task);
        return task;
    };

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
                if(this.items[i] == o) return i;
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
                if(this.keys[i] == key) return i;
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
 * @singleton
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
 * @singleton
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
         * @return {String} The formatted currency string
         */
        number : function(v,decimals)
        {
            // multiply and round.
            decimals = typeof(decimals) == 'undefined' ? 2 : decimals;
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
            while (r.test(whole)) {
                whole = whole.replace(r, '$1' + ',' + '$2');
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
 * @singleton
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
 * @singleton
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

 

Roo.util.TextMetrics.Instance = function(bindTo, fixedWidth){
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
         * @memberOf Roo.util.TextMetrics.Instance#
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
         * @memberOf Roo.util.TextMetrics.Instance#
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
         * @memberOf Roo.util.TextMetrics.Instance#
         * @param {Number} width The width to set on the element
         */
        setFixedWidth : function(width){
            ml.setWidth(width);
        },

        /**
         * Returns the measured width of the specified text
         * @memberOf Roo.util.TextMetrics.Instance#
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
         * @memberOf Roo.util.TextMetrics.Instance#
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
        if(!matches || !matches[1]) return; // non state cookie
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
                if(i != len-1) flat += "^";
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
   // supposed you have a {@link Roo.BorderLayout}
   var layout = new Roo.BorderLayout(...);
   layout.restoreState();
   // or a {Roo.BasicDialog}
   var dialog = new Roo.BasicDialog(...);
   dialog.restoreState();
 </code></pre>
 * @singleton
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
 * @singleton
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
        this.id = "ext-comp-" + (++Roo.Component.AUTO_ID);
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
    /** @cfg {String} hideMode
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
     * default is 'el' 
     */
    actionMode : "el",

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
        if(!this.rendered && this.fireEvent("beforerender", this) !== false){
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
 * container classes should subclass BoxComponent so that they will work consistently when nested within other Ext
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
 * Original code for Roojs - LGPL
 * <script type="text/javascript">
 */
 
/**
 * @class Roo.XComponent
 * A delayed Element creator...
 * Or a way to group chunks of interface together.
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
        
        if (!el && typeof(this.parent) == 'string' && this.parent.substring(0,1) == '#') {
            // if parent is a '#.....' string, then let's use that..
            var ename = this.parent.substr(1)
            this.parent = (this.parent == '#bootstrap') ? { el : true}  : false; // flags it as a top module...
            el = Roo.get(ename);
            if (!el && !this.parent) {
                Roo.log("Warning - element can not be found :#" + ename );
                return;
            }
        }
        var tree = this._tree ? this._tree() : this.tree();

        
        if (!this.parent && typeof(Roo.bootstrap) != 'undefined' && tree.xns == Roo.bootstrap) {
            //el = Roo.get(document.body);
            this.parent = { el : true };
        }
            
            
        
        if (!this.parent) {
            
            Roo.log("no parent - creating one");
            
            el = el ? Roo.get(el) : false; 	
            
            // it's a top level one..
            this.parent =  {
                el : new Roo.BorderLayout(el || document.body, {
                
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
            }
        }
        
		if (!this.parent.el) {
			// probably an old style ctor, which has been disabled.
			return;
			
		}
		// The 'tree' method is  '_tree now' 
            
        tree.region = tree.region || this.region;
        
        if (this.parent.el === true) {
            // bootstrap... - body..
            this.parent.el = Roo.factory(tree);
        }
        
        this.el = this.parent.el.addxtype(tree);
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
     * @property  build_from_html
     * Build elements from html - used by bootstrap HTML stuff 
     *    - this is cleared after build is completed
     * @type {boolean} true  (default false)
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
                if (obj.disabled) {
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
                Roo.log("parent:toObject failed: " + e.toString());
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
                Roo.log("Warning : Object Parent is not instance of XComponent:" + obj.name)
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
            if (!this.hideProgress &&  Roo.MessageBox) { 
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
 