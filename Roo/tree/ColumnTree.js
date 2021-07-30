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
 * @class Roo.tree.ColumnTree
 * @extends Roo.tree.TreePanel
 * @cfg {Object} columns  Including width, header, renderer, cls, dataIndex 
 * @cfg {int} borderWidth  compined right/left border allowance
 * @constructor
 * @param {String/HTMLElement/Element} el The container element
 * @param {Object} config
 */
Roo.tree.ColumnTree =  function(el, config)
{
   Roo.tree.ColumnTree.superclass.constructor.call(this, el , config);
   this.addEvents({
        /**
        * @event resize
        * Fire this event on a container when it resizes
        * @param {int} w Width
        * @param {int} h Height
        */
       "resize" : true
    });
    this.on('resize', this.onResize, this);
};

Roo.extend(Roo.tree.ColumnTree, Roo.tree.TreePanel, {
    //lines:false,
    
    
    borderWidth: Roo.isBorderBox ? 0 : 2, 
    headEls : false,
    
    render : function(){
        // add the header.....
       
        Roo.tree.ColumnTree.superclass.render.apply(this);
        
        this.el.addClass('x-column-tree');
        
        this.headers = this.el.createChild(
            {cls:'x-tree-headers'},this.innerCt.dom);
   
        var cols = this.columns, c;
        var totalWidth = 0;
        this.headEls = [];
        var  len = cols.length;
        for(var i = 0; i < len; i++){
             c = cols[i];
             totalWidth += c.width;
            this.headEls.push(this.headers.createChild({
                 cls:'x-tree-hd ' + (c.cls?c.cls+'-hd':''),
                 cn: {
                     cls:'x-tree-hd-text',
                     html: c.header
                 },
                 style:'width:'+(c.width-this.borderWidth)+'px;'
             }));
        }
        this.headers.createChild({cls:'x-clear'});
        // prevent floats from wrapping when clipped
        this.headers.setWidth(totalWidth);
        //this.innerCt.setWidth(totalWidth);
        this.innerCt.setStyle({ overflow: 'auto' });
        this.onResize(this.width, this.height);
             
        
    },
    onResize : function(w,h)
    {
        this.height = h;
        this.width = w;
        // resize cols..
        this.innerCt.setWidth(this.width);
        this.innerCt.setHeight(this.height-20);
        
        // headers...
        var cols = this.columns, c;
        var totalWidth = 0;
        var expEl = false;
        var len = cols.length;
        for(var i = 0; i < len; i++){
            c = cols[i];
            if (this.autoExpandColumn !== false && c.dataIndex == this.autoExpandColumn) {
                // it's the expander..
                expEl  = this.headEls[i];
                continue;
            }
            totalWidth += c.width;
            
        }
        if (expEl) {
            expEl.setWidth(  ((w - totalWidth)-this.borderWidth - 20));
        }
        this.headers.setWidth(w-20);

        
        
        
    }
});
