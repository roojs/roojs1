 

/**
 * @class Roo.htmleditor.FilterBlock
 * removes id / data-block and contenteditable that are associated with blocks
 * usage should be done on a cloned copy of the dom
 * @constructor
* Run a new Attribute Filter { node : xxxx }}
* @param {Object} config Configuration options
 */
Roo.htmleditor.FilterBlock = function(cfg)
{
    Roo.apply(this, cfg);
    var qa = cfg.node.querySelectorAll;
    this.removeAttributes('data-block');
    this.removeAttributes('contenteditable');
    this.removeAttributes('id');
    
}

Roo.app(Roo.htmleditor.FilterAttributes, Roo.htmleditor.Filter,
{
    node: true, // all tags
     
     
    replaceAttributes : function(attr)
    {
        var ar = this.node.querySelectorAll('*[' + attr + ']');
        for (var i =0;i<ar.length;i++) {
            ar[i].removeAttribute(attr);
        }
    }
        
        
        
    
});