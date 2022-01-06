
/**
 * @class Roo.htmleditor.Tidy
 * Tidy HTML 
 * 
 * @constructor
 * Create a new Filter.
 * @param {Object} config Configuration options
 */


Roo.htmleditor.Tidy = function(cfg) {
    Roo.apply(this, cfg);
    
    this.core.doc.body.innerHTML = this.tidy(this.core.doc.body, '');
     
}

Roo.htmleditor.Tidy.toString = function(node)
{
    return Roo.htmleditor.Tidy.prototype.tidy(node, '');
}

Roo.htmleditor.Tidy.prototype = {
    
    /**
     *
     * @cfg {Roo.HtmlEditorCore} core the editor.
     */
    core : false,
    
 
    
    tidy : function(node, indent) {
        var ser = new Roo.htmleditor.TidySerializer({
            indent : 2,
        });
        return ser.serialize(node);
         
    
    }
    
}