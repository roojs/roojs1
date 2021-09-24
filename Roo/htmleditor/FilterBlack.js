/**
 * Filter Clean
 *
 * Based on White / Blacklists etc...
 * 
 * 
 * usually call Roo.apply(Roo.htmleditor.FilterClean)
 *
 */

/**
 * @class Roo.htmleditor.FilterBlack
 * remove blacklisted elements.
 * @constructor
 * Run a new Blacklisted Filter
 * @param {Object} config Configuration options
 */

Roo.htmleditor.FilterBlack = function(cfg)
{
    Roo.apply(this, cfg);
    this.walk(cfg.node);
}

Roo.extend(Roo.htmleditor.FilterBlack, Roo.htmleditor.Filter,
{
Roo.htmleditor.FilterBlack =  {
    /**
     * @cfg {array} black blacklist of elements
     */
    black : false, // array
    
    walkWith : function(node, black)
    {
        this.black = black;
        this.walk(node);
    },
    
      
    walk : function (node)
    {
       Roo.htmleditor.Filter.walk.call(this, node, this.black);
     
    },
    
    replace : function(n)
    {
        n.parentNode.removeChild(n);
    }
};
