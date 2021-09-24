/**
 * @class Roo.htmleditor.FilterTableWidth
  try and remove table width data - as that frequently messes up other stuff.
 * 
 *      was cleanTableWidths.
 *
 * Quite often pasting from word etc.. results in tables with column and widths.
 * This does not work well on fluid HTML layouts - like emails. - so this code should hunt an destroy them..
 *
 * @constructor
 * Run a new Table Filter
 * @param {Object} config Configuration options
 */

Roo.htmleditor.FilterTableWidth = function(cfg)
{
    // no need to apply config.
    this.tag = ['table', 'td', 'tr', 'th', 'thead', 'tbody' ];
    this.walk(cfg.node);
}

Roo.extend(Roo.htmleditor.FilterTableWidth, Roo.htmleditor.Filter,
{
     
     
    
    replaceTag: function(node) {
        
        
      
        if (node.hasAttribute('width')) {
            node.removeAttribute('width');
        }
        
         
        if (node.hasAttribute("style")) {
            // pretty basic...
            
            var styles = node.getAttribute("style").split(";");
            var nstyle = [];
            Roo.each(styles, function(s) {
                if (!s.match(/:/)) {
                    return;
                }
                var kv = s.split(":");
                if (kv[0].match(/^\s*(width|min-width)\s*$/)) {
                    return;
                }
                // what ever is left... we allow.
                nstyle.push(s);
            });
            node.setAttribute("style", nstyle.length ? nstyle.join(';') : '');
            if (!nstyle.length) {
                node.removeAttribute('style');
            }
        }
        
        this.walk(node);
    }
});