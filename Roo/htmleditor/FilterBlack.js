/**
 * Filter Clean
 *
 * Based on White / Blacklists etc...
 * 
 * 
 * usually call Roo.apply(Roo.htmleditor.FilterClean)
 *
 */

Roo.htmleditor.FilterBlack =  {
    
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
