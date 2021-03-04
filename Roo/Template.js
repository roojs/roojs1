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
};