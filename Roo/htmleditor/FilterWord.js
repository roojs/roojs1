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
    
    this.replaceAname(cfg.node);
    // this is disabled as the removal is done by other filters;
   // this.walk(cfg.node);
    this.replaceImageTable(cfg.node);
    
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
    
    
    replaceAname : function (doc)
    {
        // replace all the a/name without..
        var aa = Array.from(doc.getElementsByTagName('a'));
        for (var i = 0; i  < aa.length; i++) {
            var a = aa[i];
            if (a.hasAttribute("name")) {
                a.removeAttribute("name");
            }
            if (a.hasAttribute("href")) {
                continue;
            }
            // reparent children.
            this.removeNodeKeepChildren(a);
            
        }
        
        
        
    },

    
    
    replaceDocBullets : function(doc)
    {
        // this is a bit odd - but it appears some indents use ql-indent-1
         //Roo.log(doc.innerHTML);
        
        var listpara = Array.from(doc.getElementsByClassName('MsoListParagraphCxSpFirst'));
        for( var i = 0; i < listpara.length; i ++) {
            listpara[i].className = "MsoListParagraph";
        }
        
        listpara =  Array.from(doc.getElementsByClassName('MsoListParagraphCxSpMiddle'));
        for( var i = 0; i < listpara.length; i ++) {
            listpara[i].className = "MsoListParagraph";
        }
        listpara =  Array.from(doc.getElementsByClassName('MsoListParagraphCxSpLast'));
        for( var i = 0; i < listpara.length; i ++) {
            listpara[i].className = "MsoListParagraph";
        }
        listpara =  Array.from(doc.getElementsByClassName('ql-indent-1'));
        for( var i = 0; i < listpara.length; i ++) {
            listpara[i].className = "MsoListParagraph";
        }
        
        // this is a bit hacky - we had one word document where h2 had a miso-list attribute.
        var htwo =  Array.from(doc.getElementsByTagName('h2'));
        for( var i = 0; i < htwo.length; i ++) {
            if (htwo[i].hasAttribute('style') && htwo[i].getAttribute('style').match(/mso-list:/)) {
                htwo[i].className = "MsoListParagraph";
            }
        }
        listpara =  Array.from(doc.getElementsByClassName('MsoNormal'));
        for( var i = 0; i < listpara.length; i ++) {
            if (listpara[i].hasAttribute('style') && listpara[i].getAttribute('style').match(/mso-list:/)) {
                listpara[i].className = "MsoListParagraph";
            } else {
                listpara[i].className = "MsoNormalx";
            }
        }
       
        listpara = doc.getElementsByClassName('MsoListParagraph');

        while(listpara.length) {
            this.replaceDocListItem(listpara.item(0));
        }
        
        // while(listpara.length) {
            
        //     this.replaceDocBullet(listpara.item(0));
        // }
      
    },

    getNextListItem: function (currentItem)
    {
        var parent = currentItem.parentNode;

        currentItem = currentItem.nextSibling;
        while(currentItem && currentItem.nodeType != 1) {
            currentItem = currentItem.nextSibling;
        }

        if(!currentItem) {
            // a list item embedded in ol
            if(parent.tagName == 'ol' && currentItem.tagName == 'li') {
                currentItem = parent;
            }
            else {
                return false;
            }
        }

        if(!currentItem.className.match(/(MsoListParagraph)/i)) {
            return false;
        }

        return currentItem;
    },

    replaceDocListItem: function(item)
    {
        var currentItem = item;
        var parent = item.parentNode;
        var doc = parent.ownerDocument;

        var listItems = [];
        var maxListLevel = 0;
        var marginToLevel = {};

        while(currentItem) {
            var style = this.styleToObject(currentItem);
            var spans = currentItem.getElementsByTagName('span');
            if(
                typeof(style['mso-list']) == 'undefined' // no mso-list in style
                ||
                !spans.length // no span
            ) {
                currentItem = currentItem.nextSibling;
                parent.remove(currentItem.previousSibling); // removed
                continue;
            }


            var listItem = {
                'node' : currentItem,
                'type' : 'ul',
                'level' : 0
            };

            // get the type of list
            var fontFamily = false;
            for(var i = 0; i < spans.length; i ++) {
                if(spans[i].hasAttribute('style') && spans[i].style.fontFamily != '') {
                    fontFamily = spans[i].style.fontFamily;
                    break;
                }
            }

            if(fontFamily !== false && !fontFamily.match(/(Symbol|Wingdings)/) ) {
                listItem['type'] = 'ol';
            }

            // get the level of list
            var margin = style['margin-left'];
            if (typeof(marginToLevel[margin]) == 'undefined') {
                marginToLevel[margin] = maxListLevel;
                maxListLevel ++;

            }
            listItem['level'] = marginToLevel[margin];

            listItems.push(listItem);

            currentItem = this.getNextListItem(currentItem);
        }

        Roo.log('MARGIN TO LEVEL');
        Roo.log(marginToLevel);
        Roo.log('LIST ITEMS');
        Roo.log(listItems);

        if (!listItems.length) {
            return;
        }


        var list = doc.createElement(listItems[0]['type']);
        parent.insertBefore(list, item);
        var level = 0;
        var stack = [list];
        var last_li = false;

        listItems.forEach(function(listItem) {
            var node = listItem['node'];

            var spans = node.getElementsByTagName('span');

            // var num = 1;
            var style = {};
            for(var i = 0; i < spans.length; i++) {
            
                style = this.styleToObject(spans[i]);
                if (typeof(style['mso-list']) == 'undefined') {
                    continue;
                }
                if (listItem['type'] == 'ol') {
                //    num = spans[i].innerText.replace(/[^0-9]+]/g,'')  * 1;
                }
                spans[i].parentNode.removeChild(spans[i]); // remove the fake bullet.
                break;
            }

            var listLevel = listItem['level'];
             
            if (listLevel > level) {
                //new indent
                var newList = doc.createElement(listItem['type']); // what about number lists...
                if (!last_li) {
                    last_li = doc.createElement('li');
                    stack[level].appendChild(last_li);
                }
                last_li.appendChild(newList);
                stack[listLevel] = newList;
                
            }

            level = listLevel;
            
            // not starting at 1..
            // if (!stack[listLevel].hasAttribute("start") && listItem['type'] == 'ol') {
            //     stack[listLevel].setAttribute("start", num);
            // }
            
            var newListItem = stack[listLevel].appendChild(doc.createElement('li'));
            last_li = newListItem;
            newListItem.innerHTML = node.innerHTML;
            parent.removeChild(node);
            
        },this);
    },
    
    replaceDocBullet : function(p)
    {
        // gather all the siblings.
        var ns = p,
            parent = p.parentNode,
            doc = parent.ownerDocument,
            items = [];
        
        var listtype = 'ul';   
        while (ns) {
            if (ns.nodeType != 1) {
                ns = ns.nextSibling;
                continue;
            }
            if (!ns.className.match(/(MsoListParagraph|ql-indent-1)/i)) {
                //Roo.log("Missing para r q1indent - got:" + ns.className);
                break;
            }

            var spans = ns.getElementsByTagName('span');
            
            if (ns.hasAttribute('style') && ns.getAttribute('style').match(/mso-list/)) {
                items.push(ns);
                ns = ns.nextSibling;
                has_list = true;
                if (!spans.length) {
                    continue;
                }
                var ff = '';
                var se = spans[0];
                for (var i = 0; i < spans.length;i++) {
                    se = spans[i];
                    if (se.hasAttribute('style')  && se.hasAttribute('style') && se.style.fontFamily != '') {
                        ff = se.style.fontFamily;
                        break;
                    }
                }
                 
                    
                //Roo.log("got font family: " + ff);
                if (typeof(ff) != 'undefined' && !ff.match(/(Symbol|Wingdings)/) && "·o".indexOf(se.innerText.trim()) < 0) {
                    listtype = 'ol';
                }
                
                continue;
            }
            //Roo.log("no mso-list?");
            
            var spans = ns.getElementsByTagName('span');
            if (!spans.length) {
                break;
            }
            var has_list  = false;
            for(var i = 0; i < spans.length; i++) {
                if (spans[i].hasAttribute('style') && spans[i].getAttribute('style').match(/mso-list/)) {
                    has_list = true;
                    break;
                }
            }
            if (!has_list) {
                break;
            }
            items.push(ns);
            ns = ns.nextSibling;
            
            
        }

        if (!items.length) {
            ns.className = "";
            return;
        }
        
        var ul = parent.ownerDocument.createElement(listtype); // what about number lists...
        parent.insertBefore(ul, p);
        var lvl = 0;
        var stack = [ ul ];
        var last_li = false;
        
        var margin_to_depth = {};
        max_margins = -1;
        
        items.forEach(function(n, ipos) {
            //Roo.log("got innertHMLT=" + n.innerHTML);
            
            var spans = n.getElementsByTagName('span');
            if (!spans.length) {
                //Roo.log("No spans found");
                 
                parent.removeChild(n);
                
                
                return; // skip it...
            }
           
                
            var num = 1;
            var style = {};
            for(var i = 0; i < spans.length; i++) {
            
                style = this.styleToObject(spans[i]);
                if (typeof(style['mso-list']) == 'undefined') {
                    continue;
                }
                if (listtype == 'ol') {
                   num = spans[i].innerText.replace(/[^0-9]+]/g,'')  * 1;
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
            
            var margin = style['margin-left'];
            if (typeof(margin_to_depth[margin]) == 'undefined') {
                max_margins++;
                margin_to_depth[margin] = max_margins;
            }
            nlvl = margin_to_depth[margin] ;
             
            if (nlvl > lvl) {
                //new indent
                var nul = doc.createElement(listtype); // what about number lists...
                if (!last_li) {
                    last_li = doc.createElement('li');
                    stack[lvl].appendChild(last_li);
                }
                last_li.appendChild(nul);
                stack[nlvl] = nul;
                
            }
            lvl = nlvl;
            
            // not starting at 1..
            if (!stack[nlvl].hasAttribute("start") && listtype == "ol") {
                stack[nlvl].setAttribute("start", num);
            }
            
            var nli = stack[nlvl].appendChild(doc.createElement('li'));
            last_li = nli;
            nli.innerHTML = n.innerHTML;
            //Roo.log("innerHTML = " + n.innerHTML);
            parent.removeChild(n);
            
             
             
            
        },this);
        
        
        
        
    },
    
    replaceImageTable : function(doc)
    {
         /*
          <table cellpadding=0 cellspacing=0 align=left>
  <tr>
   <td width=423 height=0></td>
  </tr>
  <tr>
   <td></td>
   <td><img width=601 height=401
   src="file:///C:/Users/Alan/AppData/Local/Temp/msohtmlclip1/01/clip_image002.jpg"
   v:shapes="Picture_x0020_2"></td>
  </tr>
 </table>
 */
        var imgs = Array.from(doc.getElementsByTagName('img'));
        Roo.each(imgs, function(img) {
            var td = img.parentNode;
            if (td.nodeName !=  'TD') {
                return;
            }
            var tr = td.parentNode;
            if (tr.nodeName !=  'TR') {
                return;
            }
            var tbody = tr.parentNode;
            if (tbody.nodeName !=  'TBODY') {
                return;
            }
            var table = tbody.parentNode;
            if (table.nodeName !=  'TABLE') {
                return;
            }
            // first row..
            
            if (table.getElementsByTagName('tr').length != 2) {
                return;
            }
            if (table.getElementsByTagName('td').length != 3) {
                return;
            }
            if (table.innerText.trim() != '') {
                return;
            }
            var p = table.parentNode;
            img.parentNode.removeChild(img);
            p.insertBefore(img, table);
            p.removeChild(table);
            
            
            
        });
        
      
    }
    
});