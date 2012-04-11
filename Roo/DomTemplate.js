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
        &lt;div roo-for="a_variable or condition.."&gt;&lt;/tpl&gt;
        &lt;tpl roo-if="a_variable or condition"&gt;&lt;/tpl&gt;
        &lt;tpl roo-exec="some javascript"&gt;&lt;/tpl&gt;
        &lt;tpl roo-name="named_template"&gt;&lt;/tpl&gt; 
  
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
    re : /\{([\w-\.]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,

    
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
        
        var div = document.createElement('div');
        div.innerHTML =   this.html  ;
        
        this.tpls = [];
        var _t = this;
        this.iterChild(div, function(n) {_t.compileNode(n, true); });
        
        var tpls = this.tpls;
        
        // create a top level template from the snippet..
        
        Roo.log(div.innerHTML);
        
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
                // trim
                node.nodeValue = Roo.util.Format.trim(node.nodeValue);
                
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
            this.iterChild(node,this.compileNode)
            return;
        }
        tpl.uid = this.id++;
        tpl.value = node.getAttribute('roo-' +  tpl.attr);
        node.removeAttribute('roo-'+ tpl.attr);
        if (tpl.attr != 'name') {
            var placeholder = document.createTextNode('{domtpl' + tpl.uid + '}');
            node.parentNode.replaceChild(placeholder,  node);
        } else {
            node.parentNode.removeChild(node);
        }
        
        // parent now sees '{domtplXXXX}
        this.iterChild(node,this.compileNode)
        
        // we should now have node body...
        var div = document.createElement('div');
        div.appendChild(node);
        tpl.dom = node;
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
                Roo.log('if call on ' + t.value + ' return false')
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
                    buf[buf.length] = t.compiled.call(this, vs[i], parent);
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

    compileTpl : function(tpl)
    {
        var fm = Roo.util.Format;
        var useF = this.disableFormats !== true;
        var sep = Roo.isGecko ? "+\n" : ",\n";
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
       
        /** eval:var:tpl eval:var:fm eval:var:useF eval:var:undef  */
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