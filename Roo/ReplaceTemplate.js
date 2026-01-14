/*
 * Based on:
 * Roo JS
 * (c) Alan Knowles
 * Licence : LGPL
 */

/**
 * @class Roo.ReplaceTemplate
 * A template engine that uses string replacement instead of eval().
 * 
 * Follows a similar API to Roo.Template but avoids eval() for security and performance.
 * 
 * Supported features:
 * <pre><code>
 *     {a_variable} - output encoded (htmlEncode)
 *     {a_variable:raw} - unencoded output
 *     {a_variable:this.methodName} - call a method on the template object
 *     {a_variable:htmlEncode} - use Roo.util.Format method
 * </code></pre>
 * 
 * Usage:
 * <pre><code>
 * var t = new Roo.ReplaceTemplate({
 *     html: '<div>{name}</div>',
 *     formatName: function(v, allv) {
 *         return String.format('<B>{0}</B>', v);
 *     }
 * });
 * t.apply({name: 'Test'}); // returns '<div>Test</div>'
 * </code></pre>
 * 
 * @constructor
 * @param {Object/String} cfg Configuration object or HTML string
 */
Roo.ReplaceTemplate = function(cfg){
    // BC - support string or config object
    if(cfg instanceof Array){
        cfg = cfg.join("");
    }else if(arguments.length > 1){
        cfg = Array.prototype.join.call(arguments, "");
    }
    
    if (typeof(cfg) == 'object') {
        Roo.apply(this, cfg);
    } else {
        // backward compatibility - string passed directly
        this.html = cfg;
    }
    
    // Store formatter methods for this.methodName calls
    this.formatters = {};
    
    // Copy any methods that look like formatters to formatters object
    for (var key in this) {
        if (typeof this[key] === 'function' && key !== 'apply' && key !== 'applyTemplate' && 
            key !== 'compile' && key !== 'call' && key !== 'set') {
            this.formatters[key] = this[key];
        }
    }
};

Roo.ReplaceTemplate.prototype = {
    
    /**
     * @cfg {String} html The HTML fragment template
     */
    html : '',
    
    /**
     * @cfg {Boolean} disableFormats True to disable format functions (defaults to false)
     */
    disableFormats : false,
    
    /**
     * Regular expression to match template variables
     * Matches: {variable}, {variable:format}, {variable:this.method}
     * @type RegExp
     */
    re : /\{([\w-\.]+)(?:\:([\w\.]*))?\}/g,
    
    /**
     * Store formatter methods
     */
    formatters : {},
    
    /**
     * Returns an HTML fragment with the specified values applied.
     * Uses string replacement instead of eval().
     * 
     * @param {Object} values The template values
     * @return {String} The HTML fragment
     */
    applyTemplate : function(values){
        if (!this.html) {
            return '';
        }
        
        var useF = this.disableFormats !== true;
        var fm = Roo.util.Format;
        var tpl = this;
        
        return this.html.replace(this.re, function(match, name, format) {
            // Get the value from the data object
            var value = tpl.getValue(values, name);
            
            // Handle undefined/null values
            if (value === undefined || value === null) {
                return '';
            }
            
            // No format specified - default to htmlEncode
            if (!format) {
                return useF && fm.htmlEncode ? fm.htmlEncode(value) : String(value);
            }
            
            // Raw output - no encoding
            if (format === 'raw') {
                return String(value);
            }
            
            // Custom formatter: {variable:this.methodName}
            if (format.substr(0, 5) === 'this.') {
                var methodName = format.substr(5);
                if (tpl.formatters[methodName] && typeof tpl.formatters[methodName] === 'function') {
                    return String(tpl.formatters[methodName].call(tpl.formatters, value, values));
                }
                if (tpl[methodName] && typeof tpl[methodName] === 'function') {
                    return String(tpl[methodName].call(tpl, value, values));
                }
                Roo.debug && Roo.log('ReplaceTemplate: Formatter method "' + methodName + '" not found');
                return String(value);
            }
            
            // Roo.util.Format method: {variable:htmlEncode}
            if (useF && fm[format] && typeof fm[format] === 'function') {
                return String(fm[format](value));
            }
            
            // Format not found
            Roo.debug && Roo.log('ReplaceTemplate: Format "' + format + '" not found');
            return String(value);
        });
    },
    
    /**
     * Get a value from the data object, supporting dot notation
     * @param {Object} data The data object
     * @param {String} path The property path (e.g., "user.name")
     * @return {*} The value or undefined
     */
    getValue : function(data, path) {
        var parts = path.split('.');
        var value = data;
        
        for (var i = 0; i < parts.length; i++) {
            if (value === undefined || value === null) {
                return undefined;
            }
            value = value[parts[i]];
        }
        
        return value;
    },
    
    /**
     * Sets the HTML used as the template.
     * @param {String} html
     * @return {Roo.ReplaceTemplate} this
     */
    set : function(html) {
        this.html = html;
        return this;
    },
    
    /**
     * Compile is a no-op for ReplaceTemplate (no compilation needed)
     * Kept for API compatibility
     * @return {Roo.ReplaceTemplate} this
     */
    compile : function() {
        // No compilation needed - replacement happens at runtime
        return this;
    },
    
    /**
     * Call method - used internally for formatter calls
     * @private
     * @param {String} fnName Method name
     * @param {*} value The value to format
     * @param {Object} allValues All template values
     * @return {String} Formatted value
     */
    call : function(fnName, value, allValues) {
        if (this.formatters[fnName] && typeof this.formatters[fnName] === 'function') {
            return this.formatters[fnName].call(this.formatters, value, allValues);
        } else if (this[fnName] && typeof this[fnName] === 'function') {
            return this[fnName].call(this, value, allValues);
        }
        return String(value);
    }
};

/**
 * Alias for {@link #applyTemplate}
 * @method
 */
Roo.ReplaceTemplate.prototype.apply = Roo.ReplaceTemplate.prototype.applyTemplate;

 