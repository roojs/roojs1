 
/**
 * @class Roo.htmleditor.Block
 * Base class for html editor blocks - do not use it directly .. extend it..
 * @cfg {DomElement} node The node to apply stuff to.
 * @cfg {String} friendly_name the name that appears in the context bar about this block
 * @cfg {Object} Context menu - see Roo.form.HtmlEditor.ToolbarContext
 
 * @constructor
 * Create a new Filter.
 * @param {Object} config Configuration options
 */

Roo.htmleditor.Block  = function(cfg)
{
    // do nothing .. should not be called really.
}

Roo.htmleditor.Block.factory = function(node)
{
    
    var id = Roo.get(node).id;
    if (typeof(Roo.htmleditor.Block.cache[id]) != 'undefined') {
        Roo.htmleditor.Block.cache[id].readElement();
        return Roo.htmleditor.Block.cache[id];
    }
    
    var cls = Roo.htmleditor['Block' + node.getAttribute('data-block')];
    if (typeof(cls) == 'undefined') {
        Roo.log("OOps missing block : " + 'Block' + node.getAttribute('data-block'));
        return false;
    }
    Roo.htmleditor.Block.cache[id] = new cls({ node: node });
    return Roo.htmleditor.Block.cache[id];  /// should trigger update element
};
// question goes here... do we need to clear out this cache sometimes?
// or show we make it relivant to the htmleditor.
Roo.htmleditor.Block.cache = {};

Roo.htmleditor.Block.prototype = {
    
    node : false,
    
     // used by context menu
    friendly_name : 'Image with caption',
    
    context : false,
    /**
     * Update a node with values from this object
     * @param {DomElement} node
     */
    updateElement : function(node)
    {
        Roo.DomHelper.update(node === undefined ? this.node : node, this.toObject());
    },
     /**
     * convert to plain HTML for calling insertAtCursor..
     */
    toHTML : function()
    {
        return Roo.DomHelper.markup(this.toObject());
    },
    /**
     * used by readEleemnt to extract data from a node
     * may need improving as it's pretty basic
     
     * @param {DomElement} node
     * @param {String} tag - tag to find, eg. IMG ?? might be better to use DomQuery ?
     * @param {String} attribute (use html - for contents, or style for using next param as style)
     * @param {String} style the style property - eg. text-align
     */
    getVal : function(node, tag, attr, style)
    {
        var n = node;
        if (tag !== true && n.tagName != tag.toUpperCase()) {
            // in theory we could do figure[3] << 3rd figure? or some more complex search..?
            // but kiss for now.
            n = node.getElementsByTagName(tag).item(0);
        }
        if (attr == 'html') {
            return n.innerHTML;
        }
        if (attr == 'style') {
            return n.style[style]
        }
        
        return Roo.get(n).attr(attr);
            
    },
    /**
     * create a DomHelper friendly object - for use with 
     * Roo.DomHelper.markup / overwrite / etc..
     * (override this)
     */
    toObject : function()
    {
        return {};
    },
      /**
     * Read a node that has a 'data-block' property - and extract the values from it.
     * @param {DomElement} node - the node
     */
    readElement : function(node)
    {
        
    } 
    
    
};

