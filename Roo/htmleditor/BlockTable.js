 

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
            
            // align... << fixme
            
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
                     
                
                row.push(add);
                
                
            });
            this.no_column = Math.max(this.no_column, no_column);
            
            
        });
        
        
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
        this.rows.forEach(function(row) {
            var cols = this.normalizeRow(row);
            var col = cols[sel.col];
            if (col.colspan > 1) {
                col.colspan --;
            } else {
                row.remove(col);
            }
            
        }, this);
        this.no_column--;
        
    },
    removeColumn : function()
    {
        this.deleteColumn({
            type: 'col',
            col : this.no_column-1
        });
    },
    
     
    addColumn : function()
    {
        
        this.rows.forEach(function(row) {
            row.push({
                colspan :  1,
                rowspan :  1,
                style : {
                    textAlign : 'left',
                },
                html : "&nbsp;" // is this going to be editable now?
            });
           
        }, this)
    },
    
    deleteRow : function(sel)
    {
        if (!sel || sel.type != 'row') {
            return;
        }
        var rows = this.normalizeRows();
        
        
        rows[sel.row].forEach(function(row) {
            var col = cols[sel.row];
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
        
    },
    removeRow : function()
    {
        this.deleteColumn({
            type: 'col',
            col : this.no_row-1
        });
    },
    
     
    addRow : function()
    {
        
        row = [];
        for (var i = 0; i < this.no_cols; i++ ) {
            
            row.push({
                colspan :  1,
                rowspan :  1,
                style : {
                    textAlign : 'left',
                },
                html : "&nbsp;" // is this going to be editable now?
            });
           
        }
        this.rows.push(row);
        
    },
    
    joinCells: function(sels)
    {
        
        
        if (sels.length < 0 ) {
            Roo.MessageBox.alert("Select something to join");
            return;
        }
        if (sels.length < 1 ) {
            if (sels[i].type == 'cell') {
                Roo.MessageBox.alert("You must select more than 1 cell to join");
                return;
            }
            if (sels[i].type == 'row' ) {
                this.joinRow(sels[i].row);
                return;
            }
            
            this.joinCol(sels[i].col);
            return;
            
        }
        // how to tell if we are joining a row of cells or colums.
        var r = sels[0].row , c = sels[0].col ;
        for (var i = 1 ; i < sels.length; i++) {
            
            if (sels[i].type != 'cell') {
                Roo.MessageBox.alert("you can only join cells to join");
                return;
            }
            
            if (sels[i].colspan > 1 || sels[i].rowspan > 1  ) {
                Roo.MessageBox.alert("you can only join un-joined cells (unjoin them first)");
                return;
            }
            if (typeof(r) != 'object' && r == sels[i].row ) {
                if (typeof(c) === 'object') {
                    c.push(sels[i].col);
                    continue;
                }
                c = [ c ];
                c.push(sels[i].col);
                continue;
            }
            if (typeof(c) != 'object' && c == sels[i].col) {
                if (typeof(r) === 'object') {
                    r.push(sels[i].row);
                    continue;
                }
                r = [ r ];
                r.push(sels[i].row);
                continue;
            }
            Roo.MessageBox.alert("you can only join a row or column, not both");
            return;
            
        }
        
        var grid = this.normalizeRows();
        // at this point either r or c is an array
        if (typeof(r) === 'object') {
            // c contins column
            // r is a list of arrays.
            r.sort();
            var html = grid[r[0]][c].html;
            for (var i = 1; i < r.length; i++) {
                if (r[i] != r[0]+1) {
                    Roo.MessageBox.alert("Cells have to be next to each other");
                    return;
                }
                
            }
            this.joinCol(c, r[0], r[r.lenght-1]);
            
        }
        
        
        
    },
    
    joinCol : function(col, s, e)
    {
        var html = grid[s][c].html;
        for (var i = s; i < e+1; i++) {
            html += '<br/>' + grid[i][c].html;
            this.rows[i].remove(grid[i][c]);
        }
        grid[r[0]][c].html = html;
        grid[r[0]][c].colspan = (e-s)+1; //???
        
    }
    
    
    splitCells : function(sel)
    {
        
    }
  
   
     
    
    
    
    
})

