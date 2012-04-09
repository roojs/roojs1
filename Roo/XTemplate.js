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
 * @class Roo.XTemplate
 * @extends Roo.Template
 * Provides a template that can have nested templates for loops or conditionals. The syntax is:
<pre><code>
var t = new Roo.XTemplate(
	'&lt;select name="{name}"&gt;',
		'&lt;tpl for="options"&gt;&lt;option value="{value:trim}"&gt;{text:ellipsis(10)}&lt;/option&gt;&lt;/tpl&gt;',
	'&lt;/select&gt;'
);
 
// then append, applying the master template values
 </code></pre>
 *
 * Supported features:
 *
 *  Tags:
 *    {a_variable} - output encoded.
 *    {a_variable.format:("Y-m-d")} - call a method on the variable
 *    {a_variable:raw} - unencoded output
 *    {a_variable:toFixed(1,2)} - Roo.util.Format."toFixed"
 *    {a_variable:this.method_on_template(...)} - call a method on the template object.
 *  
 *  Tpl:
 *      &lt;tpl for="a_variable or condition.."&gt;&lt;/tpl&gt;
 *      &lt;tpl if="a_variable or condition"&gt;&lt;/tpl&gt;
 *      &lt;tpl exec="some javascript"&gt;&lt;/tpl&gt;
 *
 *      &lt;tpl for="."&gt;&lt;/tpl&gt; - just iterate the property..
 *      &lt;tpl for=".."&gt;&lt;/tpl&gt; - iterates with the parent (probably the template) 
 *      
 *      
 */
Roo.XTemplate = function()
{
    Roo.XTemplate.superclass.constructor.apply(this, arguments);
    if (this.html) {
        this.compile();
    }
};


Roo.extend(Roo.XTemplate, Roo.Template, {

    /**
     *
     * basic tag replacing syntax
     * WORD:WORD()
     *
     * // you can fake an object call by doing this
     *  x.t:(test,tesT) 
     * 
     */
    re : /\{([\w-\.]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,

    
    compile: function()
    {
        var s = this.html;
     
        s = ['<tpl>', s, '</tpl>'].join('');
    
        var re     = /<tpl\b[^>]*>((?:(?=([^<]+))\2|<(?!tpl\b[^>]*>))*?)<\/tpl>/,
            nameRe = /^<tpl\b[^>]*?for="(.*?)"/,
            ifRe   = /^<tpl\b[^>]*?if="(.*?)"/,
            execRe = /^<tpl\b[^>]*?exec="(.*?)"/,
            namedRe = /^<tpl\b[^>]*?name="(\w+)"/,  // named templates..
            m,
            id     = 0,
            tpls   = [];
    
        while(true == !!(m = s.match(re))){
            var forMatch   = m[0].match(nameRe),
                ifMatch   = m[0].match(ifRe),
                m4   = m[0].match(execRe),
                namedMatch   = m[0].match(namedRe),
                
                exp  = null, 
                fn   = null,
                exec = null,
                name = forMatch && forMatch[1] ? forMatch[1] : '';
                
            if (ifMatch) {
                // if - puts fn into test..
                exp = ifMatch && ifMatch[1] ? ifMatch[1] : null;
                if(exp){
                   fn = new Function('values', 'parent', 'with(values){ return '+(Roo.util.Format.htmlDecode(exp))+'; }');
                }
            }
            if (m4) {
                // exec - calls a function... returns empty if true is  returned.
                exp = m4 && m4[1] ? m4[1] : null;
                if(exp){
                   exec = new Function('values', 'parent', 'with(values){ '+(Roo.util.Format.htmlDecode(exp))+'; }');
                }
            }
            if (name) {
                // for = 
                switch(name){
                    case '.':  name = new Function('values', 'parent', 'with(values){ return values; }'); break;
                    case '..': name = new Function('values', 'parent', 'with(values){ return parent; }'); break;
                    default:   name = new Function('values', 'parent', 'with(values){ return '+name+'; }');
                }
            }
            tpls.push({
                id:     id,
                target: name,
                exec:   exec,
                test:   fn,
                body:   m[1] || ''
            });
            s = s.replace(m[0], '{xtpl'+ id + '}');
            ++id;
        }
        for(var i = tpls.length-1; i >= 0; --i){
            this.compileTpl(tpls[i]);
        }
        this.master = tpls[tpls.length-1];
        this.tpls = tpls;
        return this;
    },
    /**
     * same as applyTemplate, except it's done to one of the subTemplates
     * @param {Number} id of the template
     * @param {Object} values to apply to template
     * @param {Object} parent (normaly the instance of this object)
     */
    applySubTemplate : function(id, values, parent)
    {
        var t = this.tpls[id];
        try { 
            if(t.test && !t.test.call(this, values, parent)){
                return '';
            }
        } catch(e) {
            Roo.log("Xtemplate.applySubTemplate 'test': Exception thrown");
            Roo.log(e.toString());
            Roo.log(t.test);
            return ''
        }
        try { 
            
            if(t.exec && t.exec.call(this, values, parent)){
                return '';
            }
        } catch(e) {
            Roo.log("Xtemplate.applySubTemplate 'exec': Exception thrown");
            Roo.log(e.toString());
            Roo.log(t.exec);
            return ''
        }
        try {
            var vs = t.target ? t.target.call(this, values, parent) : values;
            parent = t.target ? values : parent;
            if(t.target && vs instanceof Array){
                var buf = [];
                for(var i = 0, len = vs.length; i < len; i++){
                    buf[buf.length] = t.compiled.call(this, vs[i], parent);
                }
                return buf.join('');
            }
            return t.compiled.call(this, vs, parent);
        } catch (e) {
            Roo.log("Xtemplate.applySubTemplate : Exception thrown");
            Roo.log(e.toString());
            Roo.log(t.compiled);
            return '';
        }
    },

    compileTpl : function(tpl)
    {
        var fm = Roo.util.Format;
        var useF = this.disableFormats !== true;
        var sep = Roo.isGecko ? "+" : ",";
        var undef = function(str) {
            Roo.log("Property not found :"  + str);
            return '';
        };
        
        var fn = function(m, name, format, args)
        {
            //Roo.log(arguments);
            args = args ? args.replace(/\\'/g,"'") : args;
            //["{TEST:(a,b,c)}", "TEST", "", "a,b,c", 0, "{TEST:(a,b,c)}"]
            if (typeof(format) == 'undefined') {
                format= 'htmlEncode';
            }
            if (format == 'raw' ) {
                format = false;
            }
            
            if(name.substr(0, 4) == 'xtpl'){
                return "'"+ sep +'this.applySubTemplate('+name.substr(4)+', values, parent)'+sep+"'";
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
             
            if (args.length) {
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
       
        /** eval:var:zzzzzzz */
        eval(body);
        
        return this;
    },

    applyTemplate : function(values){
        return this.master.compiled.call(this, values, {});
        //var s = this.subs;
    },

    apply : function(){
        return this.applyTemplate.apply(this, arguments);
    }

 });

Roo.XTemplate.from = function(el){
    el = Roo.getDom(el);
    return new Roo.XTemplate(el.value || el.innerHTML);
};