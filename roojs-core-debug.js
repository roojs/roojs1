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
            Roo.log('ns');
            Roo.log(ns);
            if (c.constructor == ns[c.xtype]) {// already created...
                return c;
            }
            if (ns[c.xtype]) {
                Roo.log("Roo.Factory(" + c.xtype + ")");
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

    