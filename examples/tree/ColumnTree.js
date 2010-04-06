//<Script type="text/javascript">

Roo.tree.ColumnTree = Roo.extend(Roo.tree.TreePanel, {
    lines:false,
    borderWidth: Roo.isBorderBox ? 0 : 2, // the combined left/right border for each cell
    
    
    render : function(){
        // add the header.....
       
        Roo.tree.ColumnTree.superclass.render.apply(this);
        
        this.el.addClass('x-column-tree');
        
        this.headers = this.el.createChild(
            {cls:'x-tree-headers'},this.innerCt.dom);
   
        var cols = this.columns, c;
        var totalWidth = 0;

        for(var i = 0, len = cols.length; i < len; i++){
             c = cols[i];
             totalWidth += c.width;
             this.headers.createChild({
                 cls:'x-tree-hd ' + (c.cls?c.cls+'-hd':''),
                 cn: {
                     cls:'x-tree-hd-text',
                     html: c.header
                 },
                 style:'width:'+(c.width-this.borderWidth)+'px;'
             });
        }
        this.headers.createChild({cls:'x-clear'});
        // prevent floats from wrapping when clipped
        this.headers.setWidth(totalWidth);
        //this.innerCt.setWidth(totalWidth);
        this.innerCt.setWidth(this.width);
        this.innerCt.setHeight(this.height-20);
        this.innerCt.setStyle({ overflow: 'auto' });
             
        
    }
});

Roo.tree.ColumnNodeUI = Roo.extend(Roo.tree.TreeNodeUI, {
    //focus: Roo.emptyFn, // prevent odd scrolling behavior
    
    renderElements : function(n, a, targetNode, bulkRender){
        //consel.log("renderElements?");
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';

        var t = n.getOwnerTree();
        var cols = t.columns;
        var bw = t.borderWidth;
        var c = cols[0];
        var href = a.href ? a.href : Roo.isGecko ? "" : "#";
         var cb = typeof a.checked == "boolean";
     
        var buf = [
            '<li class="x-tree-node">',
            
                
                '<div class="x-tree-node-el ', a.cls,'">',
                    // extran...
                    '<div class="x-tree-col" style="width:', c.width-bw, 'px;">',
                
                
                        '<span class="x-tree-node-indent">',this.indentMarkup,'</span>',
                        '<img src="', this.emptyIcon, '" class="x-tree-ec-icon  " />',
                        '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',
                           (a.icon ? ' x-tree-node-inline-icon' : ''),
                           (a.iconCls ? ' '+a.iconCls : ''),
                           '" unselectable="on" />',
                        (cb ? ('<input class="x-tree-node-cb" type="checkbox" ' + 
                             (a.checked ? 'checked="checked" />' : ' />')) : ''),
                             
                        '<a class="x-tree-node-anchor" hidefocus="on" href="',href,'" tabIndex="1" ',
                            (a.hrefTarget ? ' target="' +a.hrefTarget + '"' : ''),
                            '><span unselectable="on">',
                              n.text || (c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]),
                             '</span></a>' ,
                  '</div>'
                 ];
       
         for(var i = 1, len = cols.length; i < len; i++){
             c = cols[i];

             buf.push('<div class="x-tree-col ',(c.cls?c.cls:''),'" style="width:',c.width-bw,'px;">',
                        '<div class="x-tree-col-text">',(c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]),"</div>",
                      "</div>");
         }
         
         buf.push(
            '<div class="x-clear"></div></div>',
            '<ul class="x-tree-node-ct" style="display:none;"></ul>',
            "</li>");
        
        if(bulkRender !== true && n.nextSibling && n.nextSibling.ui.getEl()){
            this.wrap = Roo.DomHelper.insertHtml("beforeBegin",
                                n.nextSibling.ui.getEl(), buf.join(""));
        }else{
            this.wrap = Roo.DomHelper.insertHtml("beforeEnd", targetNode, buf.join(""));
        }
        var el = this.wrap.childNodes[0];
        this.elNode = el.firstChild;
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
        
       // console.log(this);
    }
    
});