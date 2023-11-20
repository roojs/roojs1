/**
 * @class Roo.htmleditor.FilterHashLink
 * remove hash link
 * @constructor
 * Run a new Hash Link Filter
 * @param {Object} config Configuration options
 */

 Roo.htmleditor.FilterHashLink = function(cfg)
 {
     // no need to apply config.
    //  this.walk(cfg.node);
    this.walkTag(cfg.node);
 }
 
 Roo.extend(Roo.htmleditor.FilterHashLink, Roo.htmleditor.Filter,
 {
      
     tag : 'A',
     
      
     replaceTag : function(node)
     {
         for(var i = 0; i < node.attributes.length; i ++) {
             var a = node.attributes[i];

             if(a.name.toLowerCase() == 'href' && a.value.startsWith('#')) {
                 Roo.log('REMOVE NODE KEEP CHILDREN');
                 Roo.log(node);
                //  this.removeNodeKeepChildren(node);
             }
         }
         
         return false;
 
     }
     
 });