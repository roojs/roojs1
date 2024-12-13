 

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
    if (!cfg.node) {
        this.rows = [];
        for(var r = 0; r < this.no_row; r++) {
            this.rows[r] = [];
            for(var c = 0; c < this.no_col; c++) {
                this.rows[r][c] = this.emptyCell();
            }
        }
    }
    
    
}
Roo.extend(Roo.htmleditor.BlockTable, Roo.htmleditor.Block, {
 
    rows : false,
    no_col : 1,
    no_row : 1,
    
    
    width: '100%',
    
    // used by context menu
    friendly_name : 'Table',
    deleteTitle : 'Delete Table',
    // context menu is drawn once..
    
    contextMenu : function(toolbar)
    {
        
        var block = function() {
            return Roo.htmleditor.Block.factory(toolbar.tb.selectedNode);
        };
        
        
        var rooui =  typeof(Roo.bootstrap.form.HtmlEditor) == 'undefined' ? Roo : Roo.bootstrap;
        
        var syncValue = toolbar.editorcore.syncValue;
        
        var fields = {};
        
        return [
            {
                xtype : 'TextItem',
                text : "Width: ",
                xns : rooui.Toolbar  //Boostrap?
            },
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
                name : 'width',
                listeners : {
                    select : function (combo, r, index)
                    {
                        toolbar.editorcore.selectNode(toolbar.tb.selectedNode);
                        var b = block();
                        b.width = r.get('val');
                        b.updateElement();
                        syncValue();
                        toolbar.editorcore.onEditorEvent();
                    }
                },
                xns : rooui.form,
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
                xns : rooui.Toolbar  //Boostrap?
            },
         
            {
                xtype : 'Button',
                text: '-',
                listeners : {
                    click : function (_self, e)
                    {
                        toolbar.editorcore.selectNode(toolbar.tb.selectedNode);
                        block().removeColumn();
                        syncValue();
                        toolbar.editorcore.onEditorEvent();
                    }
                },
                xns : rooui.Toolbar
            },
            {
                xtype : 'Button',
                text: '+',
                listeners : {
                    click : function (_self, e)
                    {
                        toolbar.editorcore.selectNode(toolbar.tb.selectedNode);
                        block().addColumn();
                        syncValue();
                        toolbar.editorcore.onEditorEvent();
                    }
                },
                xns : rooui.Toolbar
            },
            // -------- ROWS
            {
                xtype : 'TextItem',
                text : "Rows: ",
                xns : rooui.Toolbar  //Boostrap?
            },
         
            {
                xtype : 'Button',
                text: '-',
                listeners : {
                    click : function (_self, e)
                    {
                        toolbar.editorcore.selectNode(toolbar.tb.selectedNode);
                        block().removeRow();
                        syncValue();
                        toolbar.editorcore.onEditorEvent();
                    }
                },
                xns : rooui.Toolbar
            },
            {
                xtype : 'Button',
                text: '+',
                listeners : {
                    click : function (_self, e)
                    {
                        block().addRow();
                        syncValue();
                        toolbar.editorcore.onEditorEvent();
                    }
                },
                xns : rooui.Toolbar
            },
            // -------- ROWS
            {
                xtype : 'Button',
                text: 'Reset Column Widths',
                listeners : {
                    
                    click : function (_self, e)
                    {
                        block().resetWidths();
                        syncValue();
                        toolbar.editorcore.onEditorEvent();
                    }
                },
                xns : rooui.Toolbar
            } 
            
            
            
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
            contenteditable : 'false', // this stops cell selection from picking the table.
            'data-block' : 'Table',
            style : {
                width:  this.width,
                border : 'solid 1px #000', // ??? hard coded?
                'border-collapse' : 'collapse' 
            },
            cn : [
                { tag : 'tbody' , cn : [] }
            ]
        };
        
        // do we have a head = not really 
        var ncols = 0;
        Roo.each(this.rows, function( row ) {
            var tr = {
                tag: 'tr',
                style : {
                    margin: '6px',
                    border : 'solid 1px #000',
                    textAlign : 'left' 
                },
                cn : [ ]
            };
            
            ret.cn[0].cn.push(tr);
            // does the row have any properties? ?? height?
            var nc = 0;
            Roo.each(row, function( cell ) {
                
                var td = {
                    tag : 'td',
                    contenteditable :  'true',
                    'data-block' : 'Td',
                    html : cell.html,
                    style : cell.style
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
                
                
                // widths ?
                tr.cn.push(td);
                    
                
            }, this);
            ncols = Math.max(nc, ncols);
            
            
        }, this);
        // add the header row..
        
        ncols++;
         
        
        return ret;
         
    },
    
    readElement : function(node)
    {
        node  = node ? node : this.node ;
        this.width = this.getVal(node, true, 'style', 'width') || '100%';
        
        this.rows = [];
        this.no_row = 0;
        var trs = Array.from(node.rows);
        trs.forEach(function(tr) {
            var row =  [];
            this.rows.push(row);
            
            this.no_row++;
            var no_column = 0;
            Array.from(tr.cells).forEach(function(td) {
                
                var add = {
                    colspan : td.hasAttribute('colspan') ? td.getAttribute('colspan')*1 : 1,
                    rowspan : td.hasAttribute('rowspan') ? td.getAttribute('rowspan')*1 : 1,
                    style : td.hasAttribute('style') ? td.getAttribute('style') : '',
                    html : td.innerHTML
                };
                no_column += add.colspan;
                     
                
                row.push(add);
                
                
            },this);
            this.no_col = Math.max(this.no_col, no_column);
            
            
        },this);
        
        
    },
    normalizeRows: function()
    {
        var ret= [];
        var rid = -1;
        this.rows.forEach(function(row) {
            rid++;
            ret[rid] = [];
            row = this.normalizeRow(row);
            var cid = 0;
            row.forEach(function(c) {
                while (typeof(ret[rid][cid]) != 'undefined') {
                    cid++;
                }
                if (typeof(ret[rid]) == 'undefined') {
                    ret[rid] = [];
                }
                ret[rid][cid] = c;
                c.row = rid;
                c.col = cid;
                if (c.rowspan < 2) {
                    return;
                }
                
                for(var i = 1 ;i < c.rowspan; i++) {
                    if (typeof(ret[rid+i]) == 'undefined') {
                        ret[rid+i] = [];
                    }
                    ret[rid+i][cid] = c;
                }
            });
        }, this);
        return ret;
    
    },
    
    normalizeRow: function(row)
    {
        var ret= [];
        row.forEach(function(c) {
            if (c.colspan < 2) {
                ret.push(c);
                return;
            }
            for(var i =0 ;i < c.colspan; i++) {
                ret.push(c);
            }
        });
        return ret;
    
    },
    
    deleteColumn : function(sel)
    {
        if (!sel || sel.type != 'col') {
            return;
        }
        if (this.no_col < 2) {
            return;
        }
        
        this.rows.forEach(function(row) {
            var cols = this.normalizeRow(row);
            var col = cols[sel.col];
            if (col.colspan > 1) {
                col.colspan --;
            } else {
                row.remove(col);
            }
            
        }, this);
        this.no_col--;
        
    },
    removeColumn : function()
    {
        this.deleteColumn({
            type: 'col',
            col : this.no_col-1
        });
        this.updateElement();
    },
    
     
    addColumn : function()
    {
        
        this.rows.forEach(function(row) {
            row.push(this.emptyCell());
           
        }, this);
        this.updateElement();
    },
    
    deleteRow : function(sel)
    {
        if (!sel || sel.type != 'row') {
            return;
        }
        
        if (this.no_row < 2) {
            return;
        }
        
        var rows = this.normalizeRows();
        
        
        rows[sel.row].forEach(function(col) {
            if (col.rowspan > 1) {
                col.rowspan--;
            } else {
                col.remove = 1; // flage it as removed.
            }
            
        }, this);
        var newrows = [];
        this.rows.forEach(function(row) {
            newrow = [];
            row.forEach(function(c) {
                if (typeof(c.remove) == 'undefined') {
                    newrow.push(c);
                }
                
            });
            if (newrow.length > 0) {
                newrows.push(row);
            }
        });
        this.rows =  newrows;
        
        
        
        this.no_row--;
        this.updateElement();
        
    },
    removeRow : function()
    {
        this.deleteRow({
            type: 'row',
            row : this.no_row-1
        });
        
    },
    
     
    addRow : function()
    {
        
        var row = [];
        for (var i = 0; i < this.no_col; i++ ) {
            
            row.push(this.emptyCell());
           
        }
        this.rows.push(row);
        this.updateElement();
        
    },
     
    // the default cell object... at present...
    emptyCell : function() {
        return (new Roo.htmleditor.BlockTd({})).toObject();
        
     
    },
    
    removeNode : function()
    {
        return this.node;
    },
    
    
    
    resetWidths : function()
    {
        Array.from(this.node.getElementsByTagName('td')).forEach(function(n) {
            var nn = Roo.htmleditor.Block.factory(n);
            nn.width = '';
            nn.updateElement(n);
        });
    }
    
    
    
    
})

