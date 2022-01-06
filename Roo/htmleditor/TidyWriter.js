/***
 * This is based loosely on tinymce 
 * @class Roo.htmleditor.TidyWriter
 * 
 */

Roo.htmleditor.TidyWriter = function(settings)
{
    
    // indent, indentBefore, indentAfter, encode, htmlOutput, html = [];
    Roo.apply(this, settings);
    this.html = [];
    
    this.indentBefore =this.makeMap(settings.indent_before || '');
    this.indentAfter = this.makeMap(settings.indent_after || '');
    this.encode = Roo.htmleditor.TidyEntities.getEncodeFunc(settings.entity_encoding || 'raw', settings.entities);
    
}
Roo.apply(Roo.htmleditor.TidyWriter,
          {
     

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
    encod : false,
    
    encode = Entities.getEncodeFunc(settings.entity_encoding || 'raw', settings.entities);
        htmlOutput = 'html' == settings.element_format;
    

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
                if (indent && indentBefore[name] && html.length > 0) {
                    value = html[html.length - 1];
                    value.length > 0 && '\n' !== value && html.push('\n');
                }
                html.push('<', name);
                if (attrs) {
                    for (i = 0, l = attrs.length; i < l; i++) {
                        attr = attrs[i];
                        html.push(' ', attr.name, '="', encode(attr.value, true), '"');
                    }
                }
                html[html.length] = !empty || htmlOutput ? '>' : ' />';
                if (empty && indent && indentAfter[name] && html.length > 0) {
                    value = html[html.length - 1];
                    value.length > 0 && '\n' !== value && html.push('\n');
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
                /*if (indent && indentBefore[name] && html.length > 0) {
                value = html[html.length - 1];
                if (value.length > 0 && value !== '\n')
                    html.push('\n');
            }*/
                html.push('</', name, '>');
                if (indent && indentAfter[name] && html.length > 0) {
                    value = html[html.length - 1];
                    value.length > 0 && '\n' !== value && html.push('\n');
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
                text.length > 0 && (html[html.length] = raw ? text : encode(text));
            },
            /**
             * Writes a cdata node such as <![CDATA[data]]>.
             *
             * @method cdata
             * @param {String} text String to write out inside the cdata.
             */
            cdata: function(text) {
                html.push('<![CDATA[', text, ']]>');
            },
            /**
             * Writes a comment node such as <!-- Comment -->.
             *
             * @method cdata
             * @param {String} text String to write out inside the comment.
             */
            comment: function(text) {
                html.push('<!--', text, '-->');
            },
            /**
             * Writes a PI node such as <?xml attr="value" ?>.
             *
             * @method pi
             * @param {String} name Name of the pi.
             * @param {String} text String to write out inside the pi.
             */
            pi: function(name, text) {
                text ? html.push('<?', name, ' ', encode(text), '?>') : html.push('<?', name, '?>');
                indent && html.push('\n');
            },
            /**
             * Writes a doctype node such as <!DOCTYPE data>.
             *
             * @method doctype
             * @param {String} text String to write out inside the doctype.
             */
            doctype: function(text) {
                html.push('<!DOCTYPE', text, '>', indent ? '\n' : '');
            },
            /**
             * Resets the internal buffer if one wants to reuse the writer.
             *
             * @method reset
             */
            reset: function() {
                html.length = 0;
            },
            /**
             * Returns the contents that got serialized.
             *
             * @method getContent
             * @return {String} HTML contents that got written down.
             */
            getContent: function() {
                return html.join('').replace(/\n$/, '');
            }
        };
    };
});