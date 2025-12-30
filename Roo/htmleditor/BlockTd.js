/**
 *
 * editing a TD?
 *
 * since selections really work on the table cell, then editing really should work from there
 *
 * The original plan was to support merging etc... - but that may not be needed yet..
 *
 * So this simple version will support:
 *   add/remove cols
 *   adjust the width +/-
 *   reset the width...
 *   
 *
 */


 

/**
 * @class Roo.htmleditor.BlockTable
 * Block that manages a table
 * 
 * @constructor
 * Create a new Filter.
 * @param {Object} config Configuration options
 */

Roo.htmleditor.BlockTd = function(cfg)
{
    if (cfg.node) {
        this.readElement(cfg.node);
        this.updateElement(cfg.node);
    }
    Roo.apply(this, cfg);
     
    
    
}
Roo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {
 
    node : false,
    
    width: '',
    textAlign : 'left',
    valign : 'top',
    
    colspan : 1,
    rowspan : 1,
    border : 'B',
    
    
    // used by context menu
    friendly_name : 'Table Cell',
    deleteTitle : false, // use our customer delete
    
    // Store button references for border toggles (set by contextMenu)
    leftBorderBtn : false,
    rightBorderBtn : false,
 

    updateBorderButtons : function()
    {
        if (!this.leftBorderBtn || !this.rightBorderBtn) {
            return;
        }
        var border = this.border || 'B';
        this.leftBorderBtn.setPressed((border == 'L' || border == 'B'));
        this.rightBorderBtn.setPressed((border == 'R' || border == 'B'));
    },
    
    // context menu is drawn once..
    
    contextMenu : function(toolbar)
    {
        
        var cell = function() {
            return Roo.htmleditor.Block.factory(toolbar.tb.selectedNode);
        };
        
        var table = function() {
            return Roo.htmleditor.Block.factory(toolbar.tb.selectedNode.closest('table'));
        };
        
        var lr = false;
        var saveSel = function()
        {
            lr = toolbar.editorcore.getSelection().getRangeAt(0);
        }
        var restoreSel = function()
        {
            if (lr) {
                (function() {
                    toolbar.editorcore.focus();
                    var cr = toolbar.editorcore.getSelection();
                    cr.removeAllRanges();
                    cr.addRange(lr);
                    toolbar.editorcore.onEditorEvent();
                }).defer(10, this);
                
                
            }
        }
        
        var rooui =  typeof(Roo.bootstrap.form) == 'undefined' ? Roo : Roo.bootstrap;
        
        var syncValue = toolbar.editorcore.syncValue;
        
        var fields = {};


        var tdbar = this;
        var borderField = false;
        return [
            {
                xtype : 'Button',
                text : 'Edit Table',
                listeners : {
                    click : function() {
                        var t = toolbar.tb.selectedNode.closest('table');
                        toolbar.editorcore.selectNode(t);
                        toolbar.editorcore.onEditorEvent();                        
                    }
                }
                
            },
              
           
             
            {
                xtype : 'TextItem',
                text : "Column Width: ",
                 xns : rooui.Toolbar 
               
            },
            {
                xtype : 'Button',
                text: '-',
                listeners : {
                    click : function (_self, e)
                    {
                        toolbar.editorcore.selectNode(toolbar.tb.selectedNode);
                        cell().shrinkColumn();
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
                        cell().growColumn();
                        syncValue();
                        toolbar.editorcore.onEditorEvent();
                    }
                },
                xns : rooui.Toolbar
            },
            
            {
                xtype : 'TextItem',
                text : "Vertical Align: ",
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
                name : 'valign',
                listeners : {
                    select : function (combo, r, index)
                    {
                        toolbar.editorcore.selectNode(toolbar.tb.selectedNode);
                        var b = cell();
                        b.valign = r.get('val');
                        b.updateElement();
                        syncValue();
                        toolbar.editorcore.onEditorEvent();
                    }
                },
                xns : rooui.form,
                store : {
                    xtype : 'SimpleStore',
                    data : [
                        ['top'],
                        ['middle'],
                        ['bottom'] // there are afew more... 
                    ],
                    fields : [ 'val'],
                    xns : Roo.data
                }
            },
            
            {
                xtype : 'TextItem',
                text : "Borders: ",
                xns : rooui.Toolbar 
            },
            {
                xtype : 'Hidden',
                name : 'border',
                listeners : {
                    render : function (_self)
                    {
                        borderField = _self;
                    }
                },
                setValue : function(value)
                {
                    Roo.form.Field.prototype.setValue.call(this, value);
                    var b = cell(); // creates a new object - reading from the current node
                    var border =  b.border || 'B';
                    leftBorderBtn.setPressed(!(border == 'L' || border == 'B'));
                    rightBorderBtn.setPressed(!(border == 'R' || border == 'B'));
                    
                },
                xns : rooui.form
            },
            {
                xtype : 'Button',
                text: ' | ',
                enableToggle : true,
                listeners : {
                    render : function (_self)
                    {
                        leftBorderBtn = _self;
                    },
                    click : function (_self, e)
                    {
                        toolbar.editorcore.selectNode(toolbar.tb.selectedNode);
                        var b = cell();
                        b.setLeft(!b.getLeft(), true);
                        syncValue();
                        borderField.setValue(b.border);
                        toolbar.editorcore.onEditorEvent();
                    }
                },
                xns : rooui.Toolbar
            },
            {
                xtype : 'Button',
                text: ' | ',
                enableToggle : true,
                listeners : {
                    render : function (_self)
                    {
                        rightBorderBtn = _self;
                    },
                    click : function (_self, e)
                    {
                        toolbar.editorcore.selectNode(toolbar.tb.selectedNode);
                        var b = cell();
                        b.setRight(!b.getRight(), true);
                        syncValue();
                        borderField.setValue(b.border);
                        toolbar.editorcore.onEditorEvent();
                    }
                },
                xns : rooui.Toolbar
            },
            
            {
                xtype : 'TextItem',
                text : "Merge Cells: ",
                 xns : rooui.Toolbar 
               
            },
            
            
            {
                xtype : 'Button',
                text: 'Right',
                listeners : {
                    click : function (_self, e)
                    {
                        toolbar.editorcore.selectNode(toolbar.tb.selectedNode);
                        cell().mergeRight();
                        //block().growColumn();
                        syncValue();
                        toolbar.editorcore.onEditorEvent();
                    }
                },
                xns : rooui.Toolbar
            },
             
            {
                xtype : 'Button',
                text: 'Below',
                listeners : {
                    click : function (_self, e)
                    {
                        toolbar.editorcore.selectNode(toolbar.tb.selectedNode);
                        cell().mergeBelow();
                        //block().growColumn();
                        syncValue();
                        toolbar.editorcore.onEditorEvent();
                    }
                },
                xns : rooui.Toolbar
            },
            {
                xtype : 'TextItem',
                text : "| ",
                 xns : rooui.Toolbar 
               
            },
            
            {
                xtype : 'Button',
                text: 'Split',
                listeners : {
                    click : function (_self, e)
                    {
                        //toolbar.editorcore.selectNode(toolbar.tb.selectedNode);
                        cell().split();
                        syncValue();
                        toolbar.editorcore.selectNode(toolbar.tb.selectedNode);
                        toolbar.editorcore.onEditorEvent();
                                             
                    }
                },
                xns : rooui.Toolbar
            },
            {
                xtype : 'Fill',
                xns : rooui.Toolbar 
               
            },
        
          
            {
                xtype : 'Button',
                text: 'Delete',
                 
                xns : rooui.Toolbar,
                menu : {
                    xtype : 'Menu',
                    xns : rooui.menu,
                    items : [
                        {
                            xtype : 'Item',
                            html: 'Column',
                            listeners : {
                                click : function (_self, e)
                                {
                                    var t = table();
                                    
                                    cell().deleteColumn();
                                    syncValue();
                                    toolbar.editorcore.selectNode(t.node);
                                    toolbar.editorcore.onEditorEvent();   
                                }
                            },
                            xns : rooui.menu
                        },
                        {
                            xtype : 'Item',
                            html: 'Row',
                            listeners : {
                                click : function (_self, e)
                                {
                                    var t = table();
                                    cell().deleteRow();
                                    syncValue();
                                    
                                    toolbar.editorcore.selectNode(t.node);
                                    toolbar.editorcore.onEditorEvent();   
                                                         
                                }
                            },
                            xns : rooui.menu
                        },
                       {
                            xtype : 'Separator',
                            xns : rooui.menu
                        },
                        {
                            xtype : 'Item',
                            html: 'Table',
                            listeners : {
                                click : function (_self, e)
                                {
                                    var t = table();
                                    var nn = t.node.nextSibling || t.node.previousSibling;
                                    t.node.parentNode.removeChild(t.node);
                                    if (nn) { 
                                        toolbar.editorcore.selectNode(nn, true);
                                    }
                                    toolbar.editorcore.onEditorEvent();   
                                                         
                                }
                            },
                            xns : rooui.menu
                        }
                    ]
                }
            }
            
            // align... << fixme
            
        ];
        
    },
    
    
  /**
     * create a DomHelper friendly object - for use with
     * Roo.DomHelper.markup / overwrite / etc..
     * ?? should it be called with option to hide all editing features?
     */
 /**
     * create a DomHelper friendly object - for use with
     * Roo.DomHelper.markup / overwrite / etc..
     * ?? should it be called with option to hide all editing features?
     */
    toObject : function()
    {
        var border = this.border || 'B';
        var borderStyle = 'solid 1px rgb(0, 0, 0)';
        
        var ret = {
            tag : 'td',
            contenteditable : 'true', // this stops cell selection from picking the table.
            'data-block' : 'Td',
            valign : this.valign,
            style : {  
                'text-align' :  this.textAlign,
                'border-collapse' : 'collapse',
                padding : '6px', // 8 for desktop / 4 for mobile
                'vertical-align': this.valign,
                'border-top': borderStyle,
                'border-bottom': borderStyle,
                'border-left': ['L','B'].indexOf(border) >= 0 ? borderStyle : 'none',
                'border-right': ['R','B'].indexOf(border) >= 0 ? borderStyle : 'none'
            },
            html : this.html
        };
        
        if (this.width != '') {
            ret.width = this.width;
            ret.style.width = this.width;
        }
        
        
        if (this.colspan > 1) {
            ret.colspan = this.colspan ;
        } 
        if (this.rowspan > 1) {
            ret.rowspan = this.rowspan ;
        }
        
        // Set data-border attribute for L, R, or N (not for B which is default)
        if (border == 'L' || border == 'R' || border == 'N') {
            ret['data-border'] = border;
        }
        
        return ret;
         
    },
    
    readElement : function(node)
    {
        node  = node ? node : this.node ;
        this.width = node.style.width;
        this.colspan = Math.max(1,1*node.getAttribute('colspan'));
        this.rowspan = Math.max(1,1*node.getAttribute('rowspan'));
        this.html = node.innerHTML;
        if (node.style.textAlign != '') {
            this.textAlign = node.style.textAlign;
        }
        var borderAttr = node.getAttribute('data-border');
        this.border = borderAttr ? borderAttr : 'B';
        
        
    },
     
    // the default cell object... at present...
    emptyCell : function() {
        return {
            colspan :  1,
            rowspan :  1,
            textAlign : 'left',
            html : "&nbsp;" // is this going to be editable now?
        };
     
    },
    
    removeNode : function()
    {
        return this.node.closest('table');
         
    },
    
    cellData : false,
    
    colWidths : false,
    
    toTableArray  : function()
    {
        var ret = [];
        var tab = this.node.closest('tr').closest('table');
        Array.from(tab.rows).forEach(function(r, ri){
            ret[ri] = [];
        });
        var rn = 0;
        this.colWidths = [];
        var all_auto = true;
        Array.from(tab.rows).forEach(function(r, ri){
            
            var cn = 0;
            Array.from(r.cells).forEach(function(ce, ci){
                var c =  {
                    cell : ce,
                    row : rn,
                    col: cn,
                    colspan : ce.colSpan,
                    rowspan : ce.rowSpan
                };
                if (ce.isEqualNode(this.node)) {
                    this.cellData = c;
                }
                // if we have been filled up by a row?
                if (typeof(ret[rn][cn]) != 'undefined') {
                    while(typeof(ret[rn][cn]) != 'undefined') {
                        cn++;
                    }
                    c.col = cn;
                }
                
                if (typeof(this.colWidths[cn]) == 'undefined' && c.colspan < 2) {
                    this.colWidths[cn] =   ce.style.width;
                    if (this.colWidths[cn] != '') {
                        all_auto = false;
                    }
                }
                
                
                if (c.colspan < 2 && c.rowspan < 2 ) {
                    ret[rn][cn] = c;
                    cn++;
                    return;
                }
                for(var j = 0; j < c.rowspan; j++) {
                    if (typeof(ret[rn+j]) == 'undefined') {
                        continue; // we have a problem..
                    }
                    ret[rn+j][cn] = c;
                    for(var i = 0; i < c.colspan; i++) {
                        ret[rn+j][cn+i] = c;
                    }
                }
                
                cn += c.colspan;
            }, this);
            rn++;
        }, this);
        
        // initalize widths.?
        // either all widths or no widths..
        if (all_auto) {
            this.colWidths[0] = false; // no widths flag.
        }
        
        
        return ret;
        
    },
    
    
    
    
    mergeRight: function()
    {
         
        // get the contents of the next cell along..
        var tr = this.node.closest('tr');
        var i = Array.prototype.indexOf.call(tr.childNodes, this.node);
        if (i >= tr.childNodes.length - 1) {
            return; // no cells on right to merge with.
        }
        var table = this.toTableArray();
        
        if (typeof(table[this.cellData.row][this.cellData.col+this.cellData.colspan]) == 'undefined') {
            return; // nothing right?
        }
        var rc = table[this.cellData.row][this.cellData.col+this.cellData.colspan];
        // right cell - must be same rowspan and on the same row.
        if (rc.rowspan != this.cellData.rowspan || rc.row != this.cellData.row) {
            return; // right hand side is not same rowspan.
        }
        
        
        
        this.node.innerHTML += ' ' + rc.cell.innerHTML;
        tr.removeChild(rc.cell);
        this.colspan += rc.colspan;
        this.node.setAttribute('colspan', this.colspan);

        var table = this.toTableArray();
        this.normalizeWidths(table);
        this.updateWidths(table);
    },
    
    
    mergeBelow : function()
    {
        var table = this.toTableArray();
        if (typeof(table[this.cellData.row+this.cellData.rowspan]) == 'undefined') {
            return; // no row below
        }
        if (typeof(table[this.cellData.row+this.cellData.rowspan][this.cellData.col]) == 'undefined') {
            return; // nothing right?
        }
        var rc = table[this.cellData.row+this.cellData.rowspan][this.cellData.col];
        
        if (rc.colspan != this.cellData.colspan || rc.col != this.cellData.col) {
            return; // right hand side is not same rowspan.
        }
        this.node.innerHTML =  this.node.innerHTML + rc.cell.innerHTML ;
        rc.cell.parentNode.removeChild(rc.cell);
        this.rowspan += rc.rowspan;
        this.node.setAttribute('rowspan', this.rowspan);
    },
    
    split: function()
    {
        if (this.node.rowSpan < 2 && this.node.colSpan < 2) {
            return;
        }
        var table = this.toTableArray();
        var cd = this.cellData;
        this.rowspan = 1;
        this.colspan = 1;
        
        for(var r = cd.row; r < cd.row + cd.rowspan; r++) {
             
            
            for(var c = cd.col; c < cd.col + cd.colspan; c++) {
                if (r == cd.row && c == cd.col) {
                    this.node.removeAttribute('rowspan');
                    this.node.removeAttribute('colspan');
                }
                 
                var ntd = this.node.cloneNode(); // which col/row should be 0..
                ntd.removeAttribute('id'); 
                ntd.style.width  = this.colWidths[c];
                ntd.innerHTML = '';
                table[r][c] = { cell : ntd, col : c, row: r , colspan : 1 , rowspan : 1   };
            }
            
        }
        this.redrawAllCells(table);
        
    },
    
    
    
    redrawAllCells: function(table)
    {
        
         
        var tab = this.node.closest('tr').closest('table');
        var ctr = tab.rows[0].parentNode;
        Array.from(tab.rows).forEach(function(r, ri){
            
            Array.from(r.cells).forEach(function(ce, ci){
                ce.parentNode.removeChild(ce);
            });
            r.parentNode.removeChild(r);
        });
        for(var r = 0 ; r < table.length; r++) {
            var re = tab.rows[r];
            
            var re = tab.ownerDocument.createElement('tr');
            ctr.appendChild(re);
            for(var c = 0 ; c < table[r].length; c++) {
                if (table[r][c].cell === false) {
                    continue;
                }
                
                re.appendChild(table[r][c].cell);
                 
                table[r][c].cell = false;
            }
        }
        
    },
    updateWidths : function(table)
    {
        for(var r = 0 ; r < table.length; r++) {
           
            for(var c = 0 ; c < table[r].length; c++) {
                if (table[r][c].cell === false) {
                    continue;
                }
                
                if (this.colWidths[0] != false && table[r][c].colspan < 2) {
                    var el = Roo.htmleditor.Block.factory(table[r][c].cell);
                    el.width = Math.floor(this.colWidths[c])  +'%';
                    el.updateElement(el.node);
                }
                if (this.colWidths[0] != false && table[r][c].colspan > 1) {
                    var el = Roo.htmleditor.Block.factory(table[r][c].cell);
                    var width = 0;
                    var lv = false;
                    for(var i = 0; i < table[r][c].colspan; i ++) {
                        if (typeof(this.colWidths[c + i]) != 'undefined') {
                            lv = this.colWidths[c + i];
                        } else {
                            this.colWidths[c + i] = lv;
                        }
                        width += Math.floor(this.colWidths[c + i]);
                    }
                    el.width = width  +'%';
                    el.updateElement(el.node);
                }
                table[r][c].cell = false; // done
            }
        }
    },
    normalizeWidths : function(table)
    {
        if (this.colWidths[0] === false) {
            var nw = 100.0 / this.colWidths.length;
            this.colWidths.forEach(function(w,i) {
                this.colWidths[i] = nw;
            },this);
            return;
        }
    
        var t = 0, missing = [];
        
        this.colWidths.forEach(function(w,i) {
            //if you mix % and
            this.colWidths[i] = this.colWidths[i] == '' ? 0 : (this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;
            var add =  this.colWidths[i];
            if (add > 0) {
                t+=add;
                return;
            }
            missing.push(i);
            
            
        },this);
        var nc = this.colWidths.length;
        if (missing.length) {
            var mult = (nc - missing.length) / (1.0 * nc);
            var t = mult * t;
            var ew = (100 -t) / (1.0 * missing.length);
            this.colWidths.forEach(function(w,i) {
                if (w > 0) {
                    this.colWidths[i] = w * mult;
                    return;
                }
                
                this.colWidths[i] = ew;
            }, this);
            // have to make up numbers..
             
        }
        // now we should have all the widths..
        
    
    },
    
    shrinkColumn : function()
    {
        var table = this.toTableArray();
        this.normalizeWidths(table);
        var col = this.cellData.col;
        var nw = this.colWidths[col] * 0.8;
        if (nw < 5) {
            return;
        }
        var otherAdd = (this.colWidths[col]  * 0.2) / (this.colWidths.length -1);
        this.colWidths.forEach(function(w,i) {
            if (i == col) {
                 this.colWidths[i] = nw;
                return;
            }
            if (typeof(this.colWidths[i]) == 'undefined') {
                this.colWidths[i] = otherAdd;
            } else {
                this.colWidths[i] += otherAdd;
            }
        }, this);
        this.updateWidths(table);
         
    },
    growColumn : function()
    {
        var table = this.toTableArray();
        this.normalizeWidths(table);
        var col = this.cellData.col;
        var nw = this.colWidths[col] * 1.2;
        if (nw > 90) {
            return;
        }
        var otherSub = (this.colWidths[col]  * 0.2) / (this.colWidths.length -1);
        this.colWidths.forEach(function(w,i) {
            if (i == col) {
                this.colWidths[i] = nw;
                return;
            }
            if (typeof(this.colWidths[i]) == 'undefined') {
                this.colWidths[i] = otherSub;
            } else {
                this.colWidths[i] -= otherSub;
            }
            
        }, this);
        this.updateWidths(table);
         
    },
    deleteRow : function()
    {
        // delete this rows 'tr'
        // if any of the cells in this row have a rowspan > 1 && row!= this row..
        // then reduce the rowspan.
        var table = this.toTableArray();
        // this.cellData.row;
        for (var i =0;i< table[this.cellData.row].length ; i++) {
            var c = table[this.cellData.row][i];
            if (c.row != this.cellData.row) {
                
                c.rowspan--;
                c.cell.setAttribute('rowspan', c.rowspan);
                continue;
            }
            if (c.rowspan > 1) {
                c.rowspan--;
                c.cell.setAttribute('rowspan', c.rowspan);
            }
        }
        table.splice(this.cellData.row,1);
        this.redrawAllCells(table);
        
    },
    deleteColumn : function()
    {
        var table = this.toTableArray();
        
        for (var i =0;i< table.length ; i++) {
            var c = table[i][this.cellData.col];
            if (c.col != this.cellData.col) {
                table[i][this.cellData.col].colspan--;
            } else if (c.colspan > 1) {
                c.colspan--;
                c.cell.setAttribute('colspan', c.colspan);
            }
            table[i].splice(this.cellData.col,1);
        }
        
        this.redrawAllCells(table);
    },
    
    
    updateElement : function(node)
    {
        node = node ? node : this.node;
        if (!node) {
            return;
        }
        
        var border = this.border || 'B';
        var borderStyle = 'solid 1px rgb(0, 0, 0)';
        
        // Update left and right borders based on border value
        node.style.borderLeft = ['L','B'].indexOf(border) >= 0 ? borderStyle : 'none';
        node.style.borderRight = ['R','B'].indexOf(border) >= 0 ? borderStyle : 'none';
        
        // Set or remove data-border attribute
        // Only set attribute if value is 'L', 'R', or 'N' (not for 'B' which is default)
        if (border == 'L' || border == 'R' || border == 'N') {
            node.setAttribute('data-border', border);
        } else {
            node.removeAttribute('data-border');
        }
        
        // Update width if set
        if (this.width != '') {
            node.style.width = this.width;
            node.setAttribute('width', this.width);
        } else {
            node.style.width = '';
            node.removeAttribute('width');
        }
    },
    
    getLeft : function()
    {
        var border = this.border || 'B';
        return (border == 'L' || border == 'B');
    },
    
    getRight : function()
    {
        var border = this.border || 'B';
        return (border == 'R' || border == 'B');
    },
    
    setLeft : function(on, recurse)
    {
        recurse = recurse || false;
        
        // Update border state
        this.border = on 
            ? (this.getRight() ? 'B' : 'L') 
            : (this.getRight() ? 'R' : 'N');
        
        // Update this cell's DOM
        this.updateElement();
        
        // If recurse is false, return early (no adjacent cell updates)
        if (!recurse) {
            return;
        }
        
        // Update previous cell's right border to match this cell's left border
        var prevCell = this.getPreviousCell();
        if (!prevCell) {
            return;
        }
        prevCell.setRight(this.getLeft(), false);
    },
    
    setRight : function(on, recurse)
    {
        recurse = recurse || false;
        
        // Update border state
        this.border = on 
            ? (this.getLeft() ? 'B' : 'R') 
            : (this.getLeft() ? 'L' : 'N');
        
        // Update this cell's DOM
        this.updateElement();
        
        // If recurse is false, return early (no adjacent cell updates)
        if (!recurse) {
            return;
        }
        
        // Update next cell's left border to match this cell's right border
        var nextCell = this.getNextCell();
        if (!nextCell) {
            return;
        }
        nextCell.setLeft(this.getRight(), false);
    },
    
    // Adjacent cell helper methods
    getPreviousCell : function()
    {
        if (!this.node) {
            return false;
        }
        var prevNode = this.node.previousElementSibling;
        if (!prevNode) {
            return false;
        }
        return Roo.htmleditor.Block.factory(prevNode);
    },
    
    getNextCell : function()
    {
        if (!this.node) {
            return false;
        }
        var nextNode = this.node.nextElementSibling;
        if (!nextNode) {
            return false;
        }
        return Roo.htmleditor.Block.factory(nextNode);
    },
    
})

