 

/**
 * @class Roo.htmleditor.BlockTable
 * Block that manages a table
 * 
 * @constructor
 * Create a new Filter.
 * @param {Object} config Configuration options
 */

Roo.htmleditor.BlockTable = function(cfg)
{
    if (cfg.node) {
        this.readElement(cfg.node);
        this.updateElement(cfg.node);
    }
    Roo.apply(this, cfg);
}
Roo.extend(Roo.htmleditor.BlockTable, Roo.htmleditor.Block, {
 
    cell_data : false,
    
    width: '100%',
    
    // used by context menu
    friendly_name : 'Table',
    
    context : { // ?? static really
        width : {
            title: "Width",
            opts : [ [ "100%"],[ "auto"]], // default 
            // ?? number
        },
        
    },
    /**
     * create a DomHelper friendly object - for use with
     * Roo.DomHelper.markup / overwrite / etc..
     */
    toObject : function()
    {
        
        var ret = {
            tag : 'table',
            
            style : {
                width:  this.width,
                border : 'solid 1px #000', // ??? hard coded?
                borderCollapse : 'collapse',
            },
            cn : []
        };
        // do we have a head = not really 
        
        Roo.each(this.cell_data, function( row ) {
            var tr = {
                tag: 'tr',
                style : {
                    margin: '6px',
                    border : 'solid 1px #000',
                    textAlign : 'left',
                },
                cn : []
            };
            ret.cn.push(tr);
            // does the row have any properties? ?? height?
            Roo.each(row.cells, function( cell ) {
                var td = {
                    tag : 'td',
                    html : cell.html
                };
                if (cell.colspan > 0) {
                    td.colspan = cell.colspan ;
                }
                if (cell.rowspan > 0) {
                    td.rowspan = cell.rowspan ;
                }
                if (cell.textAlign > 0) {
                    td.style.textAlign = cell.textAlign;
                }
                // widths ?
                tr.cn.push(td);
                    
                
            });
            
            
            
        });
        
        
        return {
            tag: 'figure',
            'data-block' : 'Figure',
            contenteditable : 'false',
            style : {
                display: 'table',
                float :  this.align ,
                width :  this.width,
                margin:  this.margin
            },
            cn : [
                {
                    tag : 'img',
                    src : this.image_src,
                    alt : d.innerText.replace(/\n/g, " "), // removeHTML..
                    style: {
                        width: '100%'
                    }
                },
                {
                    tag: 'figcaption',
                    contenteditable : true,
                    style : {
                        'text-align': this.text_align
                    },
                    html : this.caption
                    
                }
            ]
        };
    },
    
    readElement : function(node)
    {
        this.image_src = this.getVal(node, 'img', 'src');
        this.align = this.getVal(node, 'figure', 'style', 'float');
        this.caption = this.getVal(node, 'figcaption', 'html');
        this.text_align = this.getVal(node, 'figcaption', 'style','text-align');
        this.width = this.getVal(node, 'figure', 'style', 'width');
        this.margin = this.getVal(node, 'figure', 'style', 'margin');
        
    } 
    
  
   
     
    
    
    
    
})

