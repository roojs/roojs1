/**
 *
 * try and remove table width data - as that frequently messes up other stuff.
 * 
 *      was cleanTableWidths.
 *
 * Quite often pasting from word etc.. results in tables with column and widths.
 * This does not work well on fluid HTML layouts - like emails. - so this code should hunt an destroy them..
 *
 */

Roo.htmleditor.FilterParagraph  =   {
    
    walk: function (body)
    {
        Roo.htmleditor.Filter.walk.call(this, body, ['TABLE', 'TD', 'TR', 'TH', 'THEAD', 'TBODY' ]); 
    },
    
    
    replace: function(node) {
        
        
      
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
};