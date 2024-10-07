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
      
    },

    getNextListItem: function (currentItem)
    {

        // special case : current item is last li inside ol or ul
        if(['OL', 'UL'].includes(currentItem.parentNode.tagName) && currentItem.parentNode.lastElementChild == currentItem && currentItem.tagName == 'LI') {
            currentItem = currentItem.parentNode;
        }

        currentItem = currentItem.nextElementSibling;

        if(!currentItem) {
            return false;
        }

        // special case : next item is first li inside ol or ul
        if(['OL', 'UL'].includes(currentItem.tagName) && currentItem.firstElementChild.tagName == 'LI') {
            currentItem = currentItem.firstElementChild;
        }


        if(!currentItem.className.match(/(MsoListParagraph)/i)) {
            return false;
        }

        return currentItem;
    },

    replaceDocListItem: function(item)
    {
        var currentItem = item;
        var listItems = [];
        var levelToMargin = [];

        while(currentItem) {
            var style = this.styleToObject(currentItem);
            var spans = currentItem.getElementsByTagName('span');
            if(
                typeof(style['mso-list']) == 'undefined' // no mso-list in style
                ||
                !spans.length // no span
            ) {
                var oldItem = currentItem;
                currentItem = this.getNextListItem(currentItem);
                oldItem.parentNode.remove(oldItem); // removed
                continue;
            }

            var listItem = {
                'node' : currentItem
            };

            // get the type of list
            var fontFamily = false;
            var span = false;
            for(var i = 0; i < spans.length; i ++) {
                if(spans[i].hasAttribute('style') && spans[i].style.fontFamily != '') {
                    fontFamily = spans[i].style.fontFamily;
                    span = spans[i];
                    break;
                }
            }

            var type = (fontFamily !== false && !fontFamily.match(/(Symbol|Wingdings)/)) ? 'ol' : 'ul';
            Roo.log(fontFamily);
            Roo.log(type);
            Roo.log(span.innerText.trim());
            Roo.log("●○".indexOf(span.innerText.trim()) < 0);

            if(currentItem.tagName == 'LI' && currentItem.parentNode.tagName == 'OL') { // special case : current item is li inside ol
                type = 'ol';
            }

            if(currentItem.tagName == 'LI' && currentItem.parentNode.tagName == 'UL') { // special case : current item is li inside ul
                type = 'ul';   
            }

            listItem['type'] = type;

            // get the level of list
            var level = listItems.length ? listItems[listItems.length - 1]['level'] + 1 : levelToMargin.length;
            var margin = style['margin-left'];
            if(typeof(margin) == 'undefined') {
                margin = 'undefined';
            }
            margin = margin + type;

            if(levelToMargin.includes(margin)) {
                for(var i = 0; i < levelToMargin.length; i ++) {
                    if(levelToMargin[i] == margin) {
                        level = i;
                    }
                }
            }
            else {
                if(level > 0) {
                    previousMargin = levelToMargin[level - 1];
                    if(
                        margin.substr(margin.length - 2) == previousMargin.substr(previousMargin.length - 2) // same type
                        &&
                        margin.substr(0, margin.length - 2) != 'undefined' // current margin is defined
                        &&
                        previousMargin.substr(0, previousMargin.length - 2) == 'undefined' // previous margin is undefined
                    ) {
                        // set current level to previous level
                        level --;
                        // replace undefined by the current margin
                        levelToMargin[level] = margin;
                    }

                    if(
                        margin.substr(margin.length - 2) == previousMargin.substr(previousMargin.length - 2) // same type
                        &&
                        margin.substr(0, margin.length - 2) == 'undefined' // current margin is undefined
                        &&
                        previousMargin.substr(0, previousMargin.length - 2) != 'undefined' // previous margin is defined
                    ) {
                        // set current level to previous level
                        level --;
                        // replace undefined by the margin of of previous level
                        margin = levelToMargin[level];
                    }
                }

                levelToMargin[level] = margin;
            }

            listItem['level'] = level;

            listItems.push(listItem);

            currentItem = this.getNextListItem(currentItem);
        }

        if (!listItems.length) {
            return;
        }


        if(item.tagName == 'LI' && ['OL', 'UL'].includes(item.parentNode.tagName)) {
            item = item.parentNode;
        }
        var parent = item.parentNode;
        var doc = parent.ownerDocument;

        var list = doc.createElement(listItems[0]['type']);
        parent.insertBefore(list, item);
        var level = 0;
        var stack = [list];
        var li = false;

        listItems.forEach(function(listItem) {
            var node = listItem['node'];

            var spans = node.getElementsByTagName('span');

            var style = {};
            for(var i = 0; i < spans.length; i++) {
            
                style = this.styleToObject(spans[i]);
                if (typeof(style['mso-list']) == 'undefined') {
                    continue;
                }
                spans[i].parentNode.removeChild(spans[i]); // remove the fake bullet.
                break;
            }

            var listLevel = listItem['level'];
             
            if (listLevel > level) {
                var newList = doc.createElement(listItem['type']);
                li.appendChild(newList);
                stack[listLevel] = newList;
                
            }

            level = listLevel;

            li = stack[level].appendChild(doc.createElement('li'));
            li.innerHTML = node.innerHTML;
            if(node.tagName == 'LI' && ['OL', 'UL'].includes(node.parentNode.tagName)) {
                node = node.parentNode;
            }
            if(node.parentNode) {
                node.parentNode.removeChild(node);
            }
            
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