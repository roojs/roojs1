/**
 * @class Roo.htmleditor.FilterFigureLink
 * remove figure link
 * @constructor
 * Run a new Figure Link Filter
 * @param {Object} config Configuration options
 */

 Roo.htmleditor.FilterFigureLink = function(cfg)
 {
    this.searchTag(cfg.node);
 }
 
 Roo.extend(Roo.htmleditor.FilterFigureLink, Roo.htmleditor.Filter,
 {
      
     tag : 'A',
     
      
     replaceTag : function(node)
     {
        Roo.log('FILTER FIGURE LINK');
        ar = Array.from(node.childNodes);
        Roo.log(ar);

        if(ar.length == 1 && ar[0].tagName == 'figure') {
            Roo.log(ar[0]);
        }
         
         return false;
 
     }
     
 });