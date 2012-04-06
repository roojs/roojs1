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
Roo.XTemplate = function(){
    Roo.XTemplate.superclass.constructor.apply(this, arguments);
    if (this.html) {
        this.preCompile();
    }
};


Roo.extend(Roo.XTemplate, Roo.Template, {

    /**
     *
     * basic tag replacing syntax
     * WORD:WORD()
     * 
     */
    re : /\{([\w-\.]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,

    
    compile: function()
    {
        var s = this.html;
     
        s = ['<tpl>', s, '</tpl>'].join('');
    
        var re = /<tpl\b[^>]*>((?:(?=([^<]+))\2|<(?!tpl\b[^>]*>))*?)<\/tpl>/;
    
        var nameRe = /^<tpl\b[^>]*?for="(.*?)"/;
        var ifRe   = /^<tpl\b[^>]*?if="(.*?)"/;
        var execRe = /^<tpl\b[^>]*?exec="(.*?)"/;
        var m, id = 0;
        var tpls = [];
    
        while(true == !!(m = s.match(re))){
           var m2 = m[0].match(nameRe);
           var m3 = m[0].match(ifRe);
           var m4 = m[0].match(execRe);
           var exp = null,
                fn = null,
                exec = null;
           var name = m2 && m2[1] ? m2[1] : '';
           if(m3){
                // if - puts fn into test..
                exp = m3 && m3[1] ? m3[1] : null;
                if(exp){
                   fn = new Function('values', 'parent', 'with(values){ return '+(Roo.util.Format.htmlDecode(exp))+'; }');
                }
           }
           if(m4){
                // exec - calls a function... returns empty if true is  returned.
               exp = m4 && m4[1] ? m4[1] : null;
               if(exp){
                   exec = new Function('values', 'parent', 'with(values){ '+(Roo.util.Format.htmlDecode(exp))+'; }');
               }
           }
           if(name){
                // for = 
               switch(name){
                   case '.':  name = new Function('values', 'parent', 'with(values){ return values; }'); break;
                   case '..': name = new Function('values', 'parent', 'with(values){ return parent; }'); break;
                   default:   name = new Function('values', 'parent', 'with(values){ return '+name+'; }');
               }
           }
           tpls.push({
                id: id,
                target: name,
                exec: exec,
                test: fn,
                body: m[1]||''
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
    
    applySubTemplate : function(id, values, parent){
        var t = this.tpls[id];
        if(t.test && !t.test.call(this, values, parent)){
            return '';
        }
        if(t.exec && t.exec.call(this, values, parent)){
            return '';
        }
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
    },

    compileTpl : function(tpl)
    {
        var fm = Roo.util.Format;
        var useF = this.disableFormats !== true;
        var sep = Roo.isGecko ? "+" : ",";
        var fn = function(m, name, format, args){
            
            if (!format) {
                format= 'htmlEncode';
            }
            if (format == 'raw' ) {
                format = false;
            }
            
            if(name.substr(0, 4) == 'xtpl'){
                return "'"+ sep +'this.applySubTemplate('+name.substr(4)+', values, parent)'+sep+"'";
            }
            
            var v;
            //if(name.indexOf('.') != -1){
                v = name;
            //}else{
            //    v = "values['" + name + "']";
            //}
            if(format && useF){
                args = args ? ',' + args : "";
                if(format.substr(0, 5) != "this."){
                    format = "fm." + format + '(';
                }else{
                    format = 'this.call("'+ format.substr(5) + '", ';
                    args = ", values";
                }
            }else{
                args= '';
                format = "("+v+" === undefined ? '' : ";
            }
            return "'"+ sep + format + v + args + ")"+sep+"'";
        };
        var body;
        // branched to use + in gecko and [].join() in others
        if(Roo.isGecko){
            body = "tpl.compiled = function(values, parent){ with(values) { return '" +
                   tpl.body.replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn) +
                    "';};};";
        }else{
            body = ["tpl.compiled = function(values, parent){ with (values) { return ['"];
            body.push(tpl.body.replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn));
            body.push("'].join('');};};");
            body = body.join('');
        }
        
        /** eval:var:zzzzzzz */
        eval(body);
        Roo.log(body.replace(/\\n/,'\n'));
        
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