/***
 * This is based loosely on tinymce 
 * @class Roo.htmleditor.TidyWriter
 * https://github.com/thorn0/tinymce.html/blob/master/tinymce.html.js
 */

Roo.htmleditor.TidyWriter = function(settings)
{
    
    // indent, indentBefore, indentAfter, encode, htmlOutput, html = [];
    Roo.apply(this, settings);
    this.html = [];
    
    this.indentBefore =this.makeMap(settings.indent_before || '');
    this.indentAfter = this.makeMap(settings.indent_after || '');
    this.encode = Roo.htmleditor.TidyEntities.getEncodeFunc(settings.entity_encoding || 'raw', settings.entities);
    this.htmlOutput = 'html' == settings.element_format;
}
Roo.htmleditor.TidyWriter.prototype = {



    makeMap : function (items, delim, map) {
		var i;
		items = items || [];
		delim = delim || ',';
		if (typeof items == "string") {
			items = items.split(delim);
		}
		map = map || {};
		i = items.length;
		while (i--) {
			map[items[i]] = {};
		}
		return map;
	},


    indent : 0,
    indentBefore : false,
    indentAfter : false,
    encode : false,
    htmlOutput : false,
    
            /**
    * Writes the a start element such as <p id="a">.
    *
    * @method start
    * @param {String} name Name of the element.
    * @param {Array} attrs Optional attribute array or undefined if it hasn't any.
    * @param {Boolean} empty Optional empty state if the tag should end like <br />.
    */
    start: function(name, attrs, empty) {
       var i, l, attr, value;
       if (this.indent && this.indentBefore[name] && this.html.length > 0) {
           this.value = this.html[this.html.length - 1];
           value.length > 0 && '\n' !== value && this.html.push('\n');
       }
       this.html.push('<', name);
       if (attrs) {
           for (i = 0, l = attrs.length; i < l; i++) {
               attr = attrs[i];
               this.html.push(' ', attr.name, '="', this.encode(attr.value, true), '"');
           }
       }
       this.html[this.html.length] = !empty || this.htmlOutput ? '>' : ' />';
       if (empty && this.indent && this.indentAfter[name] && this.html.length > 0) {
           value = this.html[this.html.length - 1];
           value.length > 0 && '\n' !== value && this.html.push('\n');
       }
    },
    /**
     * Writes the a end element such as </p>.
     *
     * @method end
     * @param {String} name Name of the element.
     */
    end: function(name) {
        var value;
         
        this.html.push('</', name, '>');
        if (this.indent && this.indentAfter[name] && this.html.length > 0) {
            value = this.html[this.html.length - 1];
            value.length > 0 && '\n' !== value && this.html.push('\n');
        }
    },
    /**
     * Writes a text node.
     *
     * @method text
     * @param {String} text String to write out.
     * @param {Boolean} raw Optional raw state if true the contents wont get encoded.
     */
    text: function(text, raw) {
        text.length > 0 && (this.html[this.html.length] = raw ? text : encode(text));
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
        this.indent && this.html.push('\n');
    },
    /**
     * Writes a doctype node such as <!DOCTYPE data>.
     *
     * @method doctype
     * @param {String} text String to write out inside the doctype.
     */
    doctype: function(text) {
        this.html.push('<!DOCTYPE', text, '>', this.indent ? '\n' : '');
    },
    /**
     * Resets the internal buffer if one wants to reuse the writer.
     *
     * @method reset
     */
    reset: function() {
        this.html.length = 0;
    },
    /**
     * Returns the contents that got serialized.
     *
     * @method getContent
     * @return {String} HTML contents that got written down.
     */
    getContent: function() {
        return this.html.join('').replace(/\n$/, '');
    }

};