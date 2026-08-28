 

/**
 * @class Roo.htmleditor.FilterBlock
 * removes id / contenteditable (and data-block unless keep_data_block) from a cloned block DOM
 * usage should be done on a cloned copy of the dom
 * @constructor
 * Run a new Attribute Filter { node : xxxx }}
 * @param {Object} config Configuration options
 * @cfg {DomElement} node clone root
 * @cfg {Array|false} keep_data_block default false - array ⇒ leave data-block on the clone
 */

Roo.htmleditor.FilterBlock = function(cfg)
{
    Roo.apply(this, cfg);
    if (!this.keep_data_block) {
        this.removeAttributes('data-block');
    }
    this.removeAttributes('contenteditable');
    this.removeAttributes('id');
}

Roo.apply(Roo.htmleditor.FilterBlock.prototype,
{
    node: true, // all tags

    keep_data_block : false,
     
    removeAttributes : function(attr)
    {
        var ar = this.node.querySelectorAll('*[' + attr + ']');
        for (var i =0;i<ar.length;i++) {
            ar[i].removeAttribute(attr);
        }
    }
        
        
        
    
});
