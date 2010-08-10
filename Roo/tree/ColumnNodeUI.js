//<Script type="text/javascript">
/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 
/**
 * Not documented??? - probably should be...
 */

Roo.tree.ColumnNodeUI = Roo.extend(Roo.tree.TreeNodeUI, {
    //focus: Roo.emptyFn, // prevent odd scrolling behavior
    
    renderElements : function(n, a, targetNode, bulkRender){
        //consel.log("renderElements?");
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';

        var t = n.getOwnerTree();
        var tid = Pman.Tab.Document_TypesTree.tree.el.id;
        
        var cols = t.columns;
        var bw = t.borderWidth;
        var c = cols[0];
        var href = a.href ? a.href : Roo.isGecko ? "" : "#";
         var cb = typeof a.checked == "boolean";
        var tx = String.format('{0}',n.text || (c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]));
        var colcls = 'x-t-' + tid + '-c0';
        var buf = [
            '<li class="x-tree-node">',
            
                
                '<div class="x-tree-node-el ', a.cls,'">',
                    // extran...
                    '<div class="x-tree-col ', colcls, '" style="width:', c.width-bw, 'px;">',
                
                
                        '<span class="x-tree-node-indent">',this.indentMarkup,'</span>',
                        '<img src="', this.emptyIcon, '" class="x-tree-ec-icon  " />',
                        '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',
                           (a.icon ? ' x-tree-node-inline-icon' : ''),
                           (a.iconCls ? ' '+a.iconCls : ''),
                           '" unselectable="on" />',
                        (cb ? ('<input class="x-tree-node-cb" type="checkbox" ' + 
                             (a.checked ? 'checked="checked" />' : ' />')) : ''),
                             
                        '<a class="x-tree-node-anchor" hidefocus="on" href="',href,'" tabIndex="1" ',
                            (a.hrefTarget ? ' target="' +a.hrefTarget + '"' : ''), '>',
                            '<span unselectable="on" qtip="' + tx + '">',
                             tx,
                             '</span></a>' ,
                    '</div>',
                     '<a class="x-tree-node-anchor" hidefocus="on" href="',href,'" tabIndex="1" ',
                            (a.hrefTarget ? ' target="' +a.hrefTarget + '"' : ''), '>'
                 ];
        for(var i = 1, len = cols.length; i < len; i++){
            c = cols[i];
            colcls = 'x-t-' + tid + '-c' +i;
            tx = String.format('{0}', (c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]));
            buf.push('<div class="x-tree-col ', colcls, ' ' ,(c.cls?c.cls:''),'" style="width:',c.width-bw,'px;">',
                        '<div class="x-tree-col-text" qtip="' + tx +'">',tx,"</div>",
                      "</div>");
         }
         
         buf.push(
            '</a>',
            '<div class="x-clear"></div></div>',
            '<ul class="x-tree-node-ct" style="display:none;"></ul>',
            "</li>");
        
        if(bulkRender !== true && n.nextSibling && n.nextSibling.ui.getEl()){
            this.wrap = Roo.DomHelper.insertHtml("beforeBegin",
                                n.nextSibling.ui.getEl(), buf.join(""));
        }else{
            this.wrap = Roo.DomHelper.insertHtml("beforeEnd", targetNode, buf.join(""));
        }
        var el = this.wrap.firstChild;
        this.elRow = el;
        this.elNode = el.firstChild;
        this.ranchor = el.childNodes[1];
        this.ctNode = this.wrap.childNodes[1];
        var cs = el.firstChild.childNodes;
        this.indentNode = cs[0];
        this.ecNode = cs[1];
        this.iconNode = cs[2];
        var index = 3;
        if(cb){
            this.checkbox = cs[3];
            index++;
        }
        this.anchor = cs[index];
        
        this.textNode = cs[index].firstChild;
        
        //el.on("click", this.onClick, this);
        //el.on("dblclick", this.onDblClick, this);
        
        
       // console.log(this);
    },
    initEvents : function(){
        Roo.tree.ColumnNodeUI.superclass.initEvents.call(this);
        
            
        var a = this.ranchor;

        var el = Roo.get(a);

        if(Roo.isOpera){ // opera render bug ignores the CSS
            el.setStyle("text-decoration", "none");
        }

        el.on("click", this.onClick, this);
        el.on("dblclick", this.onDblClick, this);
        el.on("contextmenu", this.onContextMenu, this);
        
    },
    
    /*onSelectedChange : function(state){
        if(state){
            this.focus();
            this.addClass("x-tree-selected");
        }else{
            //this.blur();
            this.removeClass("x-tree-selected");
        }
    },*/
    addClass : function(cls){
        if(this.elRow){
            Roo.fly(this.elRow).addClass(cls);
        }
        
    },
    
    
    removeClass : function(cls){
        if(this.elRow){
            Roo.fly(this.elRow).removeClass(cls);
        }
    }

    
    
});