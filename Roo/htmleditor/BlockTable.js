 

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
            return Roo.htmleditor.Block.factory(toolbar.selectedNode);
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
                },
                xns : Roo.ui.Toolbar
            },
            // -------- ROWS
            {
                xtype : 'TextItem',
                text : "Rows: ",
                xns : Roo.ui.Toolbar  //Boostrap?
            },
         
            {
                xtype : 'Button',
                text: '-',
                listeners : {
                    click : function (_self, e)
                    {
                        block().removeRow();
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
                        block().addRow();
                        syncValue();
                    }
                },
                xns : Roo.ui.Toolbar
            },
            // -------- ROWS
            {
                xtype : 'Button',
                text: 'Reset Column Widths',
                listeners : {
                    
                    toggle : function (_self, e)
                    {
                        block().toggleEdit(this.toggle);
                        this.setText("Stop Editing Cells");
                    }
                },
                xns : Roo.ui.Toolbar
            },
            
            {
                xtype : 'Button',
                text: 'Edit / Join Cells',
                listeners : {
                    
                    toggle : function (_self, e)
                    {
                        block().toggleEdit(this.toggle);
                        this.setText("Stop Editing Cells");
                    }
                },
                xns : Roo.ui.Toolbar
            },
            {
                xtype : 'Button',
                text: 'Delete Row or Column',
                listeners : {
                    
                    toggle : function (_self, e)
                    {
                        block().deleteColumnOrRow();
                        syncValue();
                    }
                },
                xns : Roo.ui.Toolbar
            }, 
            {
                xtype : 'Button',
                text: 'Join Selected Cells',
                listeners : {
                    
                    toggle : function (_self, e)
                    {
                        block().joinSelectedCells();
                        syncValue();
                    }
                },
                xns : Roo.ui.Toolbar
            },
            {
                xtype : 'Button',
                text: 'Unjoin Selected Cells',
                listeners : {
                    
                    toggle : function (_self, e)
                    {
                        block().unjoinSelectedCells();
                        syncValue();
                    }
                },
                xns : Roo.ui.Toolbar
            },
            
            {
                xtype : 'TextItem',
                text : "Column Width: ",
                xns : Roo.ui.Toolbar  //Boostrap?
            },
            {
                xtype : 'Button',
                text: '-',
                listeners : {
                    click : function (_self, e)
                    {
                        block().widthLess();
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
                        block().widthMore();
                        syncValue();
                    }
                },
                xns : Roo.ui.Toolbar
            },
        ];
        
    },
    
    
    
    /**
     * create a DomHelper friendly object - for use with
     * Roo.DomHelper.markup / overwrite / etc..
     * ?? should it be called with option to hide all editing features?
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
        if (this.editing) {
            var head = {
                tag: 'tr',
                style : {
                    margin: '6px',
                    border : 'solid 1px #000',
                    textAlign : 'left',
                },
                cls : 'roo-html-editor-el', // flag is at to be deleted...
                cn : []
            };
            cn.push(head)
        }
        
        // do we have a head = not really 
        var ncols = 0;
        Roo.each(this.rows, function( row ) {
            var tr = {
                tag: 'tr',
                style : {
                    margin: '6px',
                    border : 'solid 1px #000',
                    textAlign : 'left',
                },
                cn : [
                    
                ]
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
                    //code
                }
                tow.push(add);
                
                
            });
            this.no_column = Math.max(this.no_column, no_column);
            
            
        });
        
        
    },
    
    editTable : function()
    {
        
        
        
        
    }
  
   
     
    
    
    
    
})

