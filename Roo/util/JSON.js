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
