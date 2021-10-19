 

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
    no_column : 0,
    no_width : 0,
    editing : false,
    
    width: '100%',
    
    // used by context menu
    friendly_name : 'Table',
    
    // context menu is drawn once..
    
    contextMenu : function(toolbar)
    {
        
        var block = function() {
            return Roo.htmleditor.Block.factory({node: toolbar.selectedNode});
        };
        var syncValue = toolbar.editorcore.syncValue;
        
        var fields = {};
        
        return [
            {
                xtype : 'ComboBox',
                allowBlank : false,
                displayField : 'val',
                editable : true,
                listWidth : 100,
                triggerAction : 'all',
                typeAhead : true,
                valueField : 'val',
                width : 100,
                listeners : {
                    select : function (combo, record, index)
                    {
                        var b = block();
                        b.width = r.get('val');
                        b.updateElement(toolbar.selectedNode);
                        syncValue();
                        
                    }
                },
                xns : Roo.ui.form,
                store : {
                    xtype : 'SimpleStore',
                    data : [
                        ['100%'],
                        ['auto']
                    ],
                    fields : [ 'val'],
                    xns : Roo.data
                }
            },
            // -------- Cols
            
            {
                xtype : 'TextItem',
                text : "Columns: ",
                xns : Roo.ui.Toolbar  //Boostrap?
            },
         
            {
                xtype : 'Button',
                text: '-',
                listeners : {
                    click : function (_self, e)
                    {
                        block().removeColumn();
                        syncValue();
                    }
                },
                xns : Roo.ui.Toolbar
            },
            {
                xtype : 'Button',
                text: '+',
                listeners : {
                    click : function (_self, e)
                    {
                        block().addColumn();
                        syncValue();
                    }
                },~
            };
            if (this.edting) {
                tr.cn.push({
                    tag : 'td',
                    cls : 'roo-html-editor-el',
                    html : 'Row:',
                });
            }
            ret.cn.push(tr);
            // does the row have any properties? ?? height?
            var nc = 0;
            Roo.each(row.cells, function( cell ) {
                var td = {
                    tag : 'td',
                    contenteditable : this.editing ? 'false' : 'true',
                    html : cell.html
                };
                if (cell.colspan > 1) {
                    td.colspan = cell.colspan ;
                    nc += cell.colspan;
                } else {
                    nc++;
                }
                if (cell.rowspan > 1) {
                    td.rowspan = cell.rowspan ;
                }
                if (cell.textAlign != '') {
                    td.style.textAlign = cell.textAlign;
                }
                // widths ?
                tr.cn.push(td);
                    
                
            }, this);
            ncols = Math.max(nc, ncols);
            
            
        }, this);
        // add the header row..
        
        ncols++;
        if (this.editing) {
            for (var i = 0; i< ncols; i++ ) {
                head.push({
                    tag : 'td',
                    cls : 'roo-html-editor-el',
                    html : i > 0 ?  'Col:' : ''
                });
            }
        }
        
        return ret;
         
    },
    
    readElement : function(node)
    {
        
        this.width = this.getVal(node, true, 'style', 'width');
        
        this.rows = [];
        this.no_row = 0;
        var trs = Array.from(node.getElementsByTabName('tr'));
        trs.forEach(function(tr) {
            var row = { cells : [] };
            this.rows.push(row);
            if (Roo.get(tr).hadClass('roo-html-editor-el')) {
                return;
            }
            this.no_row++;
            var no_column = 0;
            Array.from(tr.getElementsByTabName('td')).forEach(function(td) {
                if (Roo.get(td).hadClass('roo-html-editor-el')) {
                    return;
                }
                var add ={
                    colspan : td.hasAttribute('colspan') ? td.getAttribute('colspan') : 1,
                    rowspan : td.hasAttribute('rowspan') ? td.getAttribute('rowspan') : 1,
                    textAlign : this.getVal(node, true, 'style', 'text-align'),
                    html : td.innerHTML
                }
                no_column += colspan;
                     
                
                tow.push(add);
                
                
            });
            this.no_column = Math.max(this.no_column, no_column);
            
            
        });
        
        
    },
    
    
    removeColumn : function()
    {
        
    }
  
   
     
    
    
    
    
})

