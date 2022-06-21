/**
 * @class Roo.htmleditor.FilterWord
 * try and clean up all the mess that Word generates.
 * 
 * This is the 'nice version' - see 'Heavy' that white lists a very short list of elements, and multi-filters 
 
 * @constructor
 * Run a new Span Filter
 * @param {Object} config Configuration options
 */

Roo.htmleditor.FilterWord = function(cfg)
{
    // no need to apply config.
    this.replaceDocBullets(cfg.node);
    
    // this is disabled as the removal is done by other filters;
   // this.walk(cfg.node);
    
    
}

Roo.extend(Roo.htmleditor.FilterWord, Roo.htmleditor.Filter,
{
    tag: true,
     
    
    /**
     * Clean up MS wordisms...
     */
    replaceTag : function(node)
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
                if (cn.nodeType == 1) {
                    this.replaceTag(cn);
                }
                
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
        
        
        
    },
    
    styleToObject: function(node)
    {
        var styles = (node.getAttribute("style") || '').split(";");
        var ret = {};
        Roo.each(styles, function(s) {
            if (!s.match(/:/)) {
                return;
            }
            var kv = s.split(":");
             
            // what ever is left... we allow.
            ret[kv[0].trim()] = kv[1];
        });
        return ret;
    },
    
    
    replaceDocBullets : function(doc)
    {
        // this is a bit odd - but it appears some indents use ql-indent-1
        //Roo.log(doc.innerHTML);
        
        var listpara = doc.getElementsByClassName('MsoListParagraphCxSpFirst');
        for( var i = 0; i < listpara.length; i ++) {
            listpara.item(i).className = "MsoListParagraph";
        }
        // this is a bit hacky - we had one word document where h2 had a miso-list attribute.
        var htwo = doc.getElementsByTagName('h2');
        for( var i = 0; i < htwo.length; i ++) {
            if (htwo.item(i).getAttribute('style').match(/mso-list:/)) {
                htwo.item(i).className = "MsoListParagraph";
            }
        }
        
        listpara = doc.getElementsByClassName('ql-indent-1');
        while(listpara.length) {
            this.replaceDocBullet(listpara.item(0));
        }
        listpara = doc.getElementsByClassName('MsoListParagraph');
        while(listpara.length) {
            this.replaceDocBullet(listpara.item(0));
        }
      
    },
    
    replaceDocBullet : function(p)
    {
        // gather all the siblings.
        var ns = p,
            parent = p.parentNode,
            doc = parent.ownerDocument,
            items = [];
            
            
        while (ns) {
            if (ns.nodeType != 1) {
                ns = ns.nextSibling;
                continue;
            }
            if (!ns.className.match(/(MsoListParagraph|ql-indent-1)/i)) {
                break;
            }
            items.push(ns);
            ns = ns.nextSibling;
        }
        
        
        var ul = parent.ownerDocument.createElement('ul'); // what about number lists...
        parent.insertBefore(ul, p);
        var lvl = 0;
        var stack = [ ul ];
        var last_li = false;
        
        items.forEach(function(n, ipos) {
            //Roo.log("got innertHMLT=" + n.innerHTML);
            
            var spans = n.getElementsByTagName('span');
            if (!spans.length) {
                //Roo.log("No spans found");

                parent.removeChild(n);
                return; // skip it...
            }
           
                
            
            var style = {};
            for(var i = 0; i < spans.length; i++) {
            
                style = this.styleToObject(spans[i]);
                if (typeof(style['mso-list']) == 'undefined') {
                    continue;
                }
                
                spans[i].parentNode.removeChild(spans[i]); // remove the fake bullet.
                break;
            }
            //Roo.log("NOW GOT innertHMLT=" + n.innerHTML);
            style = this.styleToObject(n); // mo-list is from the parent node.
            if (typeof(style['mso-list']) == 'undefined') {
                //Roo.log("parent is missing level");
                parent.removeChild(n);
                return;
            }
            
            var nlvl =   (style['mso-list'].split(' ')[1].replace(/level/,'') *1) - 1  ;
            
            
            
            if (nlvl > lvl) {
                //new indent
                var nul = doc.createElement('ul'); // what about number lists...
                if (!last_li) {
                    last_li = doc.createElement('li');
                    stack[lvl].appendChild(last_li);
                }
                last_li.appendChild(nul);
                stack[nlvl] = nul;
                
            }
            lvl = nlvl;
            
            var nli = stack[nlvl].appendChild(doc.createElement('li'));
            last_li = nli;
            nli.innerHTML = n.innerHTML;
            //Roo.log("innerHTML = " + n.innerHTML);
            parent.removeChild(n);
            
            // copy children of p into nli
            /*while(n.firstChild) {
                var fc = n.firstChild;
                n.removeChild(fc);
                nli.appendChild(fc);
            }*/
             
            
        },this);
        
        
        
        
    }
    
    
    
});