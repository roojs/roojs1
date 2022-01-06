
/***
 * This is based loosely on tinymce 
 * @class Roo.htmleditor.TidySerializer
 * https://github.com/thorn0/tinymce.html/blob/master/tinymce.html.js
 * @constructor
 * @method Serializer
 * @param {Object} settings Name/value settings object.
 * @param {tinymce.html.Schema} schema Schema instance to use.
 */


Roo.htmleditor.TidySerializer = function(settings)
{
    Roo.apply(this.settings);
    
    this.writer = new Roo.htmleditor.TidyWriter(settings);
    
    //settings.validate = !('validate' in settings) || settings.validate;
    //      self.schema = schema = schema || new Schema();

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
        var walk  = this.walk;
        this.handlers = {
            // #text
            3: function(node) {
                writer.text(node.value, node.raw);
            },
            // #comment
            8: function(node) {
                writer.comment(node.value);
            },
            // Processing instruction
            7: function(node) {
                writer.pi(node.name, node.value);
            },
            // Doctype
            10: function(node) {
                writer.doctype(node.value);
            },
            // CDATA
            4: function(node) {
                writer.cdata(node.value);
            },
            // Document fragment
            11: function(node) {
                node = node.firstChild;
                if (!node) {
                    return;
                }
                while(node) {
                    walk(node);
                    node = node.nextSibling
                }
            }
        };
        writer.reset();
        1 != node.nodeType || this.inner ? handlers[11](node) : walk(node);
        return writer.getContent();
    },

    walk: function(node)
    {
        var attrName, attrValue, sortedAttrs, i, l, elementRule,
            handler = this.handlers[node.type];
            
        if (handler) {
            handler(node);
            return;
        }
    
        var name = node.nodeName;
        var isEmpty = node.childNodes.length < 1;
        var writer = this.writer;
        var attrs = node.attributes;
        // Sort attributes
        /*
        if (validate && attrs && attrs.length > 1) {
            sortedAttrs = [];
            sortedAttrs.map = {};
            elementRule = schema.getElementRule(node.name);
            if (elementRule) {
                for (i = 0, l = elementRule.attributesOrder.length; i < l; i++) {
                    attrName = elementRule.attributesOrder[i];
                    if (attrName in attrs.map) {
                        attrValue = attrs.map[attrName];
                        sortedAttrs.map[attrName] = attrValue;
                        sortedAttrs.push({
                            name: attrName,
                            value: attrValue
                        });
                    }
                }
                for (i = 0, l = attrs.length; i < l; i++) {
                    attrName = attrs[i].name;
                    if (!(attrName in sortedAttrs.map)) {
                        attrValue = attrs.map[attrName];
                        sortedAttrs.map[attrName] = attrValue;
                        sortedAttrs.push({
                            name: attrName,
                            value: attrValue
                        });
                    }
                }
                attrs = sortedAttrs;
            }
        }
        */
        writer.start(node.name, attrs, isEmpty);
        if (isEmpty) {
            return;
        }
        node = node.firstChild;
        if (!node) {
            writer.end(name);
            return;
        }
        while (node) {
            walk(node);
            node = node.nextNode;
        }
        writer.end(name);
        
    
    }
    // Serialize element and treat all non elements as fragments
   
}; 

