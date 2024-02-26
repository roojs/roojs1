/**
 * @class Roo.htmleditor.FilterEmpty
 * filter empty elements (normally <B> on paste)
 * @constructor
 * Run a new Empty Filter
 * @param {Object} config Configuration options
 */

Roo.htmleditor.FilterEmpty = function(cfg)
{
    // no need to apply config.
    this.walk(cfg.node);
}

Roo.extend(Roo.htmleditor.FilterEmpty, Roo.htmleditor.FilterBlack,
{
     
    tag : true,
     
 
    replaceTag : function(node)
    {
        Roo.log(node.innerHTML);
        this.walk(node);
        Roo.log(node.tagName);
        if(!['B', 'I', 'U', 'S'].includes(node.tagName)) {
            return false;
        }

        if (node.innerHTML.trim() != '') {
            return false;
        }
        if (node.attributes && node.attributes.length > 0) {
            return false; // walk if there are any.
        }
        Roo.htmleditor.FilterBlack.prototype.replaceTag.call(this, node);
        return false;
     
    }
    
});