 
/**
 * @class Roo.htmleditor.Filter
 * Base Class for filtering htmleditor stuff. - do not use this directly - extend it.
 * @cfg {DomElement} node The node to iterate and filter
 * @cfg {boolean|String|Array} tag Tags to replace 
 * @constructor
 * Create a new Filter.
 * @param {Object} config Configuration options
 */



Roo.htmleditor.Filter = function(cfg) {
    Roo.apply(this.cfg);
    // this does not actually call walk as it's really just a abstract class
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
                
                case e.nodeType == 8 &&  this.replaceComment  !== false: // comment
                    this.replaceComment(e);
                    return;
                
                case e.nodeType != 1: //not a node.
                    return;
                
                case this.tag === true: // everything
                case e.tagName.indexOf(":") > -1 && typeof(this.tag) == 'object' && this.tag.indexOf(":") > -1:
                case e.tagName.indexOf(":") > -1 && typeof(this.tag) == 'string' && this.tag == ":":
                case typeof(this.tag) == 'object' && this.tag.indexOf(e.tagName) > -1: // array and it matches.
                case typeof(this.tag) == 'string' && this.tag == e.tagName: // array and it matches.
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
        
    },
    
    
    removeNodeKeepChildren : function( node)
    {
    
        ar = Array.from(node.childNodes);
        for (var i = 0; i < ar.length; i++) {
         
            node.removeChild(ar[i]);
            // what if we need to walk these???
            node.parentNode.insertBefore(ar[i], node);
           
        }
        node.parentNode.removeChild(node);
    },

    walkTag : function(dom)
    {
        if(this.tag === false) {
            return;
        }

        var a = document.getElementsByTagName(tag);
        Roo.log(a);
    }
};