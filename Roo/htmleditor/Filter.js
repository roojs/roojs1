/**
 *
 * Base Class for filtering htmleditor stuff.
 *
 */

/**
 * @class Roo.htmleditor.Filter
 * Base Class for filtering htmleditor stuff.
 * @cfg {DomElement} node The node to iterate and filter
 * @cfg {boolean|String|Array} tag Tags to replace 
 * @constructor
 * Create a new Filter.
 * @param {Object} config Configuration options
 */



Roo.htmleditor.Filter = function(cfg) {
    Roo.apply(this.cfg);
}


Roo.htmleditor.Filter.prototype = {
    
    node: false,
    
    tag: false,

    // overrride to do replace comments.
    replaceComment : false,
    
    // overrride to do replace or do stuff with tags..
    replaceTag : false,
    
    walk : function(dom)
    {
        Roo.each( Array.from(dom.childNodes), function( e ) {
            switch(true) {
                
                case e.nodeType == 8 && typeof(this.replaceComment) != 'undefined': // comment
                    this.replaceComment(e);
                    return;
                
                case e.nodeType != 3: //not a node.
                    return;
                
                case tag === true: // everything
                case typeof(tag) == 'object' && tag.indexOf(e.tagName) > -1: // array and it matches.
                case typeof(tag) == 'string' && tag == e.tagName: // array and it matches.
                    if (this.replaceTag && false === this.replaceTag(e)) {
                        return;
                    }
                    if (e.hasChildNodes()) {
                        this.walk(e);
                    }
                    return;
                
                default:    // tags .. that do not match.
                    if (e.hasChildNodes()) {
                        this.walk(e);
                    }
            }
            
        }, this);
        
    }
};