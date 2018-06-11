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
};