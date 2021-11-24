 

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
            this.rows[r] = []
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
    
    // context menu is drawn once..
    
    contextMenu : function(toolbar)
    {
        
        var block = function() {
            return Roo.htmleditor.Block.factory(toolbar.tb.selectedNode);
        };
        
        
        var rooui =  typeof(Roo.bootstrap) == 'undefined' ? Roo : Roo.bootstrap;
        
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
                name : 'width',
                listeners : {
                    select : function (combo, r, index)
                    {
                        var b = block();
                        b.width = r.get('val');
                        b.updateElement();
                        syncValue();
                        
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
                        block().removeColumn();
                        syncValue();
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
                        block().addColumn();
                        syncValue();
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
                        block().removeRow();
                        syncValue();
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
                'border-collapse' : 'collapse',
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
                    textAlign : 'left',
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
                    td.style = {
                        'text-align' :  cell.textAlign,
                        border : '1px solid #000'
                    };
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
        this.width = this.getVal(node, true, 'style', 'width');
        
        this.rows = [];
        this.no_row = 0;
        var trs = Array.from(node.getElementsByTagName('tr'));
        trs.forEach(function(tr) {
            var row =  []  
            this.rows.push(row);
            if (Roo.get(tr).hasClass('roo-html-editor-el')) { // ??? this is for our 'row' selection'
                return;
            }
            this.no_row++;
            var no_column = 0;
            Array.from(tr.getElementsByTagName('td')).forEach(function(td) {
                if (Roo.get(td).hasClass('roo-html-editor-el')) { // ??? this is for our 'row' selection'
                    return;
                }
                var add ={
                    colspan : td.hasAttribute('colspan') ? td.getAttribute('colspan') : 1,
                    rowspan : td.hasAttribute('rowspan') ? td.getAttribute('rowspan') : 1,
                    textAlign : this.getVal(node, true, 'style', 'text-align'),
                    html : td.innerHTML
                }
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
        
        row = [];
        for (var i = 0; i < this.no_col; i++ ) {
            
            row.push(this.emptyCell());
           
        }
        this.rows.push(row);
        this.updateElement();
        
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
            
            this.joinCol(sels[i].col, 0, -1);
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
            this.joinCol(c, r[0], r[r.length-1]);
            
        }
        if (typeof(rc) === 'object') {
            // c contins column
            // r is a list of arrays.
            c.sort();
             for (var i = 1; i < r.length; i++) {
                if (c[i] != c[0]+1) {
                    Roo.MessageBox.alert("Cells have to be next to each other");
                    return;
                }
                
            }
            this.joinRow(r, c[0], c[r.length-1]);
            
        }
        
        
    },
    
    joinCol : function(col, s, e)
    {
        var grid = this.normalizeRows();
        if (s === -1) {
            s = 0;
            e = grid.length;
        }
        var tg = grid[s][col].html;
        for (var i = s+1; i < e+1; i++) {
            html += '<br/>' + grid[i][col].html;
            
            this.rows[i].remove(grid[i][col]);
        }
        grid[s][col].html = html;
        grid[s][col].colspan = (e-s)+1; //???
        
        this.updateElement();
        
    },
    joinRow: function(row, s, e)
    {
        var grid = this.normalizeRows();
        if (s === -1) {
            s = 0;
            e = grid[row].length;
        }
        var html = grid[row][s].html;
        for (var i = s+1; i < e+1; i++) {
            html += ' ' + grid[row][i].html;
            this.rows[row].remove(grid[row][i]);
        }
        grid[r[0]][c].html = html;
        grid[r[0]][c].rowspan = (e-s)+1; //???
        this.updateElement();
    },
    
    
    splitCells : function(sel)
    {
        if (sels.type != 'cell') {
            Roo.MessageBox.alert("you can only join cells to join");
            return;
        }
        if (cell.colspan > 1 && cell.rowspan > 1) {
            Roo.MessageBox.alert("splitting a merged row+cel is not supported yet.");
            return;
        }   
        var grid = this.normalizeRows();
        var cell = grid[sel.row][sel.col];
        if (cell.colspan ==1 && cell.rowspan == 1) {
            Roo.MessageBox.alert("select a merged cell to join");
            return;
        }
        var ix = this.rows[sel.row].indexOf(cell);
        if (cell.rowspan > 1) {
            this.splitCellsRow(sel.row, sel.col, cell.rowspan);
        } else {
            this.splitCellsCol(sel.row, sel.col, cell.colspan);
        }
        
    },
    splitCellsRow : function(row, col, num)
    {
        /// this means we have to look at each row below, and insert a cell  after the first cell 
        var grid = this.normalizeRows();
        grid[row][col].rowspan = 1;
        for(var r = row+1; r < num+1;r++) {
            var nrow = [];
            var added = false;
            for(c = 0; c < this.rows[r].length;c++) {
                if (!added && this.rows[r][c].col > col) {
                    nrow.push(this.emptyCell());
                    added = true;
                }
                nrow.push(this.rows[r][c])
            }
            if (!added) {
                nrow.push(this.emptyCell());
            }
            this.row[r] = nrow;
              
        }
        this.updateElement();
        
    },
  
    splitCellsCol: function(row, col, num)
    {
        /// this means we have to look at each row below, and insert a cell  after the first cell 
        var grid = this.normalizeRows();
        grid[row][col].colspan = 1;
        
        var pos = this.rows[row].indexOf(grid[row][col]);
        var nrow =  this.rows[row].slice(0, pos);
        var right =  this.rows[row].slice(pos);
    
        for (var i = 1; i < num; i++) {
            nrow.push(this.emptyCell());
        }
        
        this.row[row] = nrow.concat(right);
        this.updateElement();
        
    },
    // the default cell object... at present...
    emptyCell : function() {
        return {
            colspan :  1,
            rowspan :  1,
            textAlign : 'left',
            html : "&nbsp;" // is this going to be editable now?
        };
     
    }
    
    
    
    
})

