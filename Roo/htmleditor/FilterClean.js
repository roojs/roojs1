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

/**
 *  filter span's with no attributes out..
 */

Roo.htmleditor.FilterSpan =  {

    walk : function (node)
    {
        Roo.htmleditor.Filter.walk.call(this, 'SPAN', true );
     
    },
    replace : function(node)
    {
        if (node.attributes && node.attributes.length > 0) {
            this.walk(node);
            return true;
        }
        for (var i = 0; i < node.childNodes.length; i++) {
            node.removeChild(node.childNodes[i]);
            // what if we need to walk these???
            node.insertBefore(node.childNodes[i], node);
            this.walk(node.childNodes[i]);
        }
        n.parentNode.removeChild(n);
        return false; // don't walk children
     
    }
    
};
/**
 *  filter span's with no attributes out..
 */
Roo.htmleditor.FilterKeepChildren =  {
    
    black : false, // array
    walkWith : function (node, black)
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
        // walk children...
        for (var i = 0; i < node.childNodes.length; i++) {
            node.removeChild(node.childNodes[i]);
            // what if we need to walk these???
            node.insertBefore(node.childNodes[i], node);
            this.walk(node.childNodes[i]);
        }
        n.parentNode.removeChild(n);
        return false; // don't walk children
        
        
    }
}
Roo.htmleditor.FilterAttributes =  {
    black : false, // array
    walkWith : function (node, true, clean, )
    {
        this.black = black;
        this.walk(node);
     
    },
    walk : function (node)
    {
        Roo.htmleditor.Filter.walk.call(this, node, this.black);
    },
    
    
    replace : function(node)
    {
        if (!node.attributes || !node.attributes.length) {
            return true;
        }
        
        for (var i = node.attributes.length-1; i > -1 ; i--) {
            var a = node.attributes[i];
            //console.log(a);
            
            if (a.name.toLowerCase().substr(0,2)=='on')  {
                node.removeAttribute(a.name);
                continue;
            }
            
            
            if (Roo.HtmlEditorCore.this.black.indexOf(a.name.toLowerCase()) > -1) {
                node.removeAttribute(a.name);
                continue;
            }
            if (Roo.HtmlEditorCore.aclean.indexOf(a.name.toLowerCase()) > -1) {
                cleanAttr(a.name,a.value); // fixme..
                continue;
            }
            if (a.name == 'style') {
                cleanStyle(a.name,a.value);
                continue;
            }
            /// clean up MS crap..
            // tecnically this should be a list of valid class'es..
            
            
            if (a.name == 'class') {
                if (a.value.match(/^Mso/)) {
                    node.removeAttribute('class');
                }
                
                if (a.value.match(/^body$/)) {
                    node.removeAttribute('class');
                }
                continue;
            }
            
            // style cleanup!?
            // class cleanup?
            
        }
        
        
        function cleanAttr(n,v)
        {
            
            if (v.match(/^\./) || v.match(/^\//)) {
                return;
            }
            if (v.match(/^(http|https):\/\//) || v.match(/^mailto:/) || v.match(/^ftp:/)) {
                return;
            }
            if (v.match(/^#/)) {
                return;
            }
            if (v.match(/^\{/)) { // allow template editing.
                return;
            }
//            Roo.log("(REMOVE TAG)"+ node.tagName +'.' + n + '=' + v);
            node.removeAttribute(n);
            
        }
        
        var cwhite = this.cwhite;
        var cblack = this.cblack;
            
        function cleanStyle(n,v)
        {
            if (v.match(/expression/)) { //XSS?? should we even bother..
                node.removeAttribute(n);
                return;
            }
            
            var parts = v.split(/;/);
            var clean = [];
            
            Roo.each(parts, function(p) {
                p = p.replace(/^\s+/g,'').replace(/\s+$/g,'');
                if (!p.length) {
                    return true;
                }
                var l = p.split(':').shift().replace(/\s+/g,'');
                l = l.replace(/^\s+/g,'').replace(/\s+$/g,'');
                
                if ( cwhite.length && cblack.indexOf(l) > -1) {
//                    Roo.log('(REMOVE CSS)' + node.tagName +'.' + n + ':'+l + '=' + v);
                    //node.removeAttribute(n);
                    return true;
                }
                //Roo.log()
                // only allow 'c whitelisted system attributes'
                if ( cwhite.length &&  cwhite.indexOf(l) < 0 && cwhite.indexOf(l.toLowerCase()) < 0 ) {
//                    Roo.log('(REMOVE CSS)' + node.tagName +'.' + n + ':'+l + '=' + v);
                    //node.removeAttribute(n);
                    return true;
                }
                
                
                 
                
                clean.push(p);
                return true;
            });
            if (clean.length) { 
                node.setAttribute(n, clean.join(';'));
            } else {
                node.removeAttribute(n);
            }
            
        }
        
        
        
        
        this.cleanUpChildren(node);
        
    
}