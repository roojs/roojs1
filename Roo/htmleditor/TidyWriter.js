/***
 * This is based loosely on tinymce 
 * @class Roo.htmleditor.TidyWriter
 * https://github.com/thorn0/tinymce.html/blob/master/tinymce.html.js
 *
 * Known issues?
 * - not tested much with 'PRE' formated elements.
 * 
 *
 *
 */

Roo.htmleditor.TidyWriter = function(settings)
{
    
    // indent, indentBefore, indentAfter, encode, htmlOutput, html = [];
    Roo.apply(this, settings);
    this.html = [];
    this.state = [];
     
    this.encode = Roo.htmleditor.TidyEntities.getEncodeFunc(settings.entity_encoding || 'raw', settings.entities);
  
}
Roo.htmleditor.TidyWriter.prototype = {

 
    state : false,
    
    indent :  '  ',
    
    // part of state...
    indentstr : '',
    in_pre: false,
    in_inline : false,
    last_inline : false,
    encode : false,
     
    
            /**
    * Writes the a start element such as <p id="a">.
    *
    * @method start
    * @param {String} name Name of the element.
    * @param {Array} attrs Optional attribute array or undefined if it hasn't any.
    * @param {Boolean} empty Optional empty state if the tag should end like <br />.
    */
    start: function(name, attrs, empty, node)
    {
        var i, l, attr, value;
        
        // there are some situations where adding line break && indentation will not work. will not work.
        // <span / b / i ... formating?
        
        var in_inline = this.in_inline || Roo.htmleditor.TidyWriter.inline_elements.indexOf(name) > -1;
        var in_pre    = this.in_pre    || Roo.htmleditor.TidyWriter.whitespace_elements.indexOf(name) > -1;
        
        var is_short   = empty ? Roo.htmleditor.TidyWriter.shortend_elements.indexOf(name) > -1 : false;
        
        var add_lb = name == 'BR' ? false : in_inline;
        
        if (!add_lb && !this.in_pre && this.lastElementEndsWS()) {
            i_inline = false;
        }

        var indentstr =  this.indentstr;
        
        // e_inline = elements that can be inline, but still allow \n before and after?
        // only 'BR' ??? any others?
        
        // ADD LINE BEFORE tage
        if (!this.in_pre) {
            if (in_inline) {
                //code
                if (name == 'BR') {
                    this.addLine();
                } else if (this.lastElementEndsWS()) {
                    this.addLine();
                } else{
                    // otherwise - no new line. (and dont indent.)
                    indentstr = '';
                }
                
            } else {
                this.addLine();
            }
        } else {
            indentstr = '';
        }
        
        this.html.push(indentstr + '<', name.toLowerCase());
        
        if (attrs) {
            for (i = 0, l = attrs.length; i < l; i++) {
                attr = attrs[i];
                this.html.push(' ', attr.name, '="', this.encode(attr.value, true), '"');
            }
        }
     
        if (empty) {
            if (is_short) {
                this.html[this.html.length] = '/>';
            } else {
                this.html[this.html.length] = '></' + name.toLowerCase() + '>';
            }
            var e_inline = name == 'BR' ? false : this.in_inline;
            
            if (!e_inline && !this.in_pre) {
                this.addLine();
            }
            return;
        
        }
        // not empty..
        this.html[this.html.length] = '>';
        
        // there is a special situation, where we need to turn on in_inline - if any of the imediate chidlren are one of these.
        /*
        if (!in_inline && !in_pre) {
            var cn = node.firstChild;
            while(cn) {
                if (Roo.htmleditor.TidyWriter.inline_elements.indexOf(cn.nodeName) > -1) {
                    in_inline = true
                    break;
                }
                cn = cn.nextSibling;
            }
             
        }
        */
        
        
        this.pushState({
            indentstr : in_pre   ? '' : (this.indentstr + this.indent),
            in_pre : in_pre,
            in_inline :  in_inline
        });
        // add a line after if we are not in a
        
        if (!in_inline && !in_pre) {
            this.addLine();
        }
        
            
         
        
    },
    
    lastElementEndsWS : function()
    {
        var value = this.html.length > 0 ? this.html[this.html.length-1] : false;
        if (value === false) {
            return true;
        }
        return value != "　" && value.match(/\s+$/);
        
    },
    
    /**
     * Writes the a end element such as </p>.
     *
     * @method end
     * @param {String} name Name of the element.
     */
    end: function(name) {
        var value;
        this.popState();
        var indentstr = '';
        var in_inline = this.in_inline || Roo.htmleditor.TidyWriter.inline_elements.indexOf(name) > -1;
        
        if (!this.in_pre && !in_inline) {
            this.addLine();
            indentstr  = this.indentstr;
        }
        this.html.push(indentstr + '</', name.toLowerCase(), '>');
        this.last_inline = in_inline;
        
        // pop the indent state..
    },
    /**
     * Writes a text node.
     *
     * In pre - we should not mess with the contents.
     * 
     *
     * @method text
     * @param {String} text String to write out.
     * @param {Boolean} raw Optional raw state if true the contents wont get encoded.
     */
    text: function(in_text, node)
    {
        // if not in whitespace critical
        if (in_text.length < 1) {
            return;
        }
        var text = new XMLSerializer().serializeToString(document.createTextNode(in_text)); // escape it properly?
        
        if (this.in_pre) {
            this.html[this.html.length] =  text;
            return;   
        }
        
        if (this.in_inline) {
            if (text != "　") {
                text = text.replace(/\s+/g,' '); // all white space inc line breaks to a slingle' '
            }
            if (text != ' ') {
                if (text != "　") { // we allow <span>&emsp</span> - as a special space char.
                    text = text.replace(/\s+/,' ');  // all white space to single white space
                }
                
                
                    
                // if next tag is '<BR>', then we can trim right..
                if (node.nextSibling &&
                    node.nextSibling.nodeType == 1 &&
                    node.nextSibling.nodeName == 'BR' )
                {
                    text = text.replace(/\s+$/g,'');
                }
                // if previous tag was a BR, we can also trim..
                if (node.previousSibling &&
                    node.previousSibling.nodeType == 1 &&
                    node.previousSibling.nodeName == 'BR' )
                {
                    text = this.indentstr +  text.replace(/^\s+/g,'');
                }
                if (text.match(/\n/)) {
                    text = text.replace(
                        /(?![^\n]{1,64}$)([^\n]{1,64})\s/g, '$1\n' + this.indentstr
                    );
                    // remoeve the last whitespace / line break.
                    text = text.replace(/\n\s+$/,'');
                }
                // repace long lines
                
            }
             
            this.html[this.html.length] =  text;
            return;   
        }
        // see if previous element was a inline element.
        var indentstr = this.indentstr;
        if (text != "　") { 
            text = text.replace(/\s+/g," "); // all whitespace into single white space.
        }
        
        // should trim left?
        if (node.previousSibling &&
            node.previousSibling.nodeType == 1 &&
            Roo.htmleditor.TidyWriter.inline_elements.indexOf(node.previousSibling.nodeName) > -1)
        {
            indentstr = '';
            
        } else {
            this.addLine();
            if (text != "　") { 
                text = text.replace(/^\s+/,''); // trim left
            }
          
        }
        // should trim right?
        if (node.nextSibling &&
            node.nextSibling.nodeType == 1 &&
            Roo.htmleditor.TidyWriter.inline_elements.indexOf(node.nextSibling.nodeName) > -1)
        {
          // noop
            
        }  else {
            if (text != "　") { 
                text = text.replace(/\s+$/,''); // trim right
            }
        }
         
              
        
        
        
        if (text.length < 1 ||   text == "　") {
            return;
        }
        if (!text.match(/\n/)) {
            this.html.push(indentstr + text);
            return;
        }
        
        text = this.indentstr + text.replace(
            /(?![^\n]{1,64}$)([^\n]{1,64})\s/g, '$1\n' + this.indentstr
        );
        // remoeve the last whitespace / line break.
        text = text.replace(/\s+$/,''); 
        
        this.html.push(text);
        
        // split and indent..
        
        
    },
    /**
     * Writes a cdata node such as <![CDATA[data]]>.
     *
     * @method cdata
     * @param {String} text String to write out inside the cdata.
     */
    cdata: function(text) {
        this.html.push('<![CDATA[', text, ']]>');
    },
    /**
    * Writes a comment node such as <!-- Comment -->.
    *
    * @method cdata
    * @param {String} text String to write out inside the comment.
    */
   comment: function(text) {
       this.html.push('<!--', text, '-->');
   },
    /**
     * Writes a PI node such as <?xml attr="value" ?>.
     *
     * @method pi
     * @param {String} name Name of the pi.
     * @param {String} text String to write out inside the pi.
     */
    pi: function(name, text) {
        text ? this.html.push('<?', name, ' ', this.encode(text), '?>') : this.html.push('<?', name, '?>');
        this.indent != '' && this.html.push('\n');
    },
    /**
     * Writes a doctype node such as <!DOCTYPE data>.
     *
     * @method doctype
     * @param {String} text String to write out inside the doctype.
     */
    doctype: function(text) {
        this.html.push('<!DOCTYPE', text, '>', this.indent != '' ? '\n' : '');
    },
    /**
     * Resets the internal buffer if one wants to reuse the writer.
     *
     * @method reset
     */
    reset: function() {
        this.html.length = 0;
        this.state = [];
        this.pushState({
            indentstr : '',
            in_pre : false, 
            in_inline : false
        })
    },
    /**
     * Returns the contents that got serialized.
     *
     * @method getContent
     * @return {String} HTML contents that got written down.
     */
    getContent: function() {
        return this.html.join('').replace(/\n$/, '');
    },
    
    pushState : function(cfg)
    {
        this.state.push(cfg);
        Roo.apply(this, cfg);
    },
    
    popState : function()
    {
        if (this.state.length < 1) {
            return; // nothing to push
        }
        var cfg = {
            in_pre: false,
            indentstr : ''
        };
        this.state.pop();
        if (this.state.length > 0) {
            cfg = this.state[this.state.length-1]; 
        }
        Roo.apply(this, cfg);
    },
    
    addLine: function()
    {
        if (this.html.length < 1) {
            return;
        }
        
        
        var value = this.html[this.html.length - 1];
        if (value.length > 0 && '\n' !== value) {
            this.html.push('\n');
        }
    }
    
    
//'pre script noscript style textarea video audio iframe object code'
// shortended... 'area base basefont br col frame hr img input isindex link  meta param embed source wbr track');
// inline 
};

Roo.htmleditor.TidyWriter.inline_elements = [
        'SPAN','STRONG','B','EM','I','FONT','STRIKE','U','VAR',
        'CITE','DFN','CODE','MARK','Q','SUP','SUB','SAMP', 'A'
];
Roo.htmleditor.TidyWriter.shortend_elements = [
    'AREA','BASE','BASEFONT','BR','COL','FRAME','HR','IMG','INPUT',
    'ISINDEX','LINK','','META','PARAM','EMBED','SOURCE','WBR','TRACK'
];

Roo.htmleditor.TidyWriter.whitespace_elements = [
    'PRE','SCRIPT','NOSCRIPT','STYLE','TEXTAREA','VIDEO','AUDIO','IFRAME','OBJECT','CODE'
];