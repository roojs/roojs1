
/***
 * This is based loosely on tinymce 
 * @class Roo.htmleditor.TidySerializer
 * https://github.com/thorn0/tinymce.html/blob/master/tinymce.html.js
 * @constructor
 * @method Serializer
 * @param {Object} settings Name/value settings object.
 */


Roo.htmleditor.TidySerializer = function(settings)
{
    Roo.apply(this, settings);
    
    this.writer = new Roo.htmleditor.TidyWriter(settings);
    
    

};
Roo.htmleditor.TidySerializer.prototype = {
    
    /**
     * @param {boolean} inner do the inner of the node.
     */
    inner : false,
    
    writer : false,
    
    /**
    * Serializes the specified node into a string.
    *
    * @example
    * new tinymce.html.Serializer().serialize(new tinymce.html.DomParser().parse('<p>text</p>'));
    * @method serialize
    * @param {DomElement} node Node instance to serialize.
    * @return {String} String with HTML based on DOM tree.
    */
    serialize : function(node) {
        
        // = settings.validate;
        var writer = this.writer;
        var self  = this;
        this.handlers = {
            // #text
            3: function(node) {
                
                writer.text(node.nodeValue, node);
            },
            // #comment
            8: function(node) {
                writer.comment(node.nodeValue);
            },
            // Processing instruction
            7: function(node) {
                writer.pi(node.name, node.nodeValue);
            },
            // Doctype
            10: function(node) {
                writer.doctype(node.nodeValue);
            },
            // CDATA
            4: function(node) {
                writer.cdata(node.nodeValue);
            },
            // Document fragment
            11: function(node) {
                node = node.firstChild;
                if (!node) {
                    return;
                }
                while(node) {
                    self.walk(node);
                    node = node.nextSibling
                }
            }
        };
        writer.reset();
        1 != node.nodeType || this.inner ? this.handlers[11](node) : this.walk(node);
        return writer.getContent();
    },

    walk: function(node)
    {
        var attrName, attrValue, sortedAttrs, i, l, elementRule,
            handler = this.handlers[node.nodeType];
            
        if (handler) {
            handler(node);
            return;
        }
    
        var name = node.nodeName;
        var isEmpty = node.childNodes.length < 1;
      
        var writer = this.writer;
        var attrs = node.attributes;
        // Sort attributes
        
        writer.start(node.nodeName, attrs, isEmpty, node);
        if (isEmpty) {
            return;
        }
        node = node.firstChild;
        if (!node) {
            writer.end(name);
            return;
        }
        while (node) {
            this.walk(node);
            node = node.nextSibling;
        }
        writer.end(name);
        
    
    }
    // Serialize element and treat all non elements as fragments
   
}; 

