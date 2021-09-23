/**
 *
 * try and clean up all the mess that Word generates.
 * 
 * This is the 'nice version' - see 'Heavy' that white lists a very short list of elements, and multi-filters 
 *
 */
Roo.htmleditor.FilterWord  =   {
    
    walk: function (node)
    {
         Roo.htmleditor.Filter.walk.call(this, node, true);
    },
    
    /**
     * Clean up MS wordisms...
     */
    replace : function(node)
    {
         
        // no idea what this does - span with text, replaceds with just text.
        if(
                node.nodeName == 'SPAN' &&
                !node.hasAttributes() &&
                node.childNodes.length == 1 &&
                node.firstChild.nodeName == "#text"  
        ) {
            var textNode = node.firstChild;
            node.removeChild(textNode);
            if (node.getAttribute('lang') != 'zh-CN') {   // do not space pad on chinese characters..
                node.parentNode.insertBefore(node.ownerDocument.createTextNode(" "), node);
            }
            node.parentNode.insertBefore(textNode, node);
            if (node.getAttribute('lang') != 'zh-CN') {   // do not space pad on chinese characters..
                node.parentNode.insertBefore(node.ownerDocument.createTextNode(" ") , node);
            }
            
            node.parentNode.removeChild(node);
            return false; // dont do chidren - we have remove our node - so no need to do chdhilren?
        }
        
   
        
        if (node.tagName.toLowerCase().match(/^(style|script|applet|embed|noframes|noscript)$/)) {
            node.parentNode.removeChild(node);
            return false; // dont do chidlren
        }
        //Roo.log(node.tagName);
        // remove - but keep children..
        if (node.tagName.toLowerCase().match(/^(meta|link|\\?xml:|st1:|o:|v:|font)/)) {
            //Roo.log('-- removed');
            while (node.childNodes.length) {
                var cn = node.childNodes[0];
                node.removeChild(cn);
                node.parentNode.insertBefore(cn, node);
                // move node to parent - and clean it..
                this.replace(cn);
            }
            node.parentNode.removeChild(node);
            /// no need to iterate chidlren = it's got none..
            //this.iterateChildren(node, this.cleanWord);
            return false; // no need to iterate children.
        }
        // clean styles
        if (node.className.length) {
            
            var cn = node.className.split(/\W+/);
            var cna = [];
            Roo.each(cn, function(cls) {
                if (cls.match(/Mso[a-zA-Z]+/)) {
                    return;
                }
                cna.push(cls);
            });
            node.className = cna.length ? cna.join(' ') : '';
            if (!cna.length) {
                node.removeAttribute("class");
            }
        }
        
        if (node.hasAttribute("lang")) {
            node.removeAttribute("lang");
        }
        
        if (node.hasAttribute("style")) {
            
            var styles = node.getAttribute("style").split(";");
            var nstyle = [];
            Roo.each(styles, function(s) {
                if (!s.match(/:/)) {
                    return;
                }
                var kv = s.split(":");
                if (kv[0].match(/^(mso-|line|font|background|margin|padding|color)/)) {
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
        return true; // do children
        
        
        
    }
};