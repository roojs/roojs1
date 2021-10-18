 

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
 
    rows : false,
    
    width: '100%',
    
    // used by context menu
    friendly_name : 'Table',
    
    context : { // ?? static really
        width : {
            title: "Width",
            opts : [ [ "100%"],[ "auto"]], // default 
            // ?? number
        },
        _edit_ : {
            type : 'button',
            title : 'Edit Table',
            cb : 'editTable'
        }
        
    },
    /**
     * create a DomHelper friendly object - for use with
     * Roo.DomHelper.markup / overwrite / etc..
     */
    toObject : function()
    {
        
        var ret = {
            tag : 'table',
            contenteditable : 'false',
            style : {
                width:  this.width,
                border : 'solid 1px #000', // ??? hard coded?
                borderCollapse : 'collapse',
            },
            cn : []
        };
        // do we have a head = not really 
        
        Roo.each(this.rows, function( row ) {
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
                    contenteditable : 'true',
                    html : cell.html
                };
                if (cell.colspan > 1) {
                    td.colspan = cell.colspan ;
                }
                if (cell.rowspan > 1) {
                    td.rowspan = cell.rowspan ;
                }
                if (cell.textAlign != '') {
                    td.style.textAlign = cell.textAlign;
                }
                // widths ?
                tr.cn.push(td);
                    
                
            });
            
            
            
        });
        return ret;
         
    },
    
    readElement : function(node)
    {
        
        this.width = this.getVal(node, true, 'style', 'width');
        
        this.rows = [];
        var trs = Array.from(node.getElementsByTabName('tr'));
        trs.forEach(function(dom_row) {
            var row = { cells : [] };
            this.rows.push(row);
            Array.from(dom_row.getElementsByTabName('td')).forEach(function(td) {
                tow.push({
                    colspan : td.hasAttribute('colspan') ? td.getAttribute('colspan') : 1,
                    rowspan : td.hasAttribute('rowspan') ? td.getAttribute('rowspan') : 1,
                    textAlign : this.getVal(node, true, 'style', 'text-align'),
                    html : td.innerHTML
                });
                
                
                
            });;
            
            
        });
        
        
    },
    
    
  
   
     
    
    
    
    
})

