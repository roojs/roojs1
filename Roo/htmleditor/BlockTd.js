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
    
    colspan : 1,
    rowspan : 1,
    
    
    // used by context menu
    friendly_name : 'Table Cell',
    
    // context menu is drawn once..
    
    contextMenu : function(toolbar)
    {
        
        var cell = function() {
            return Roo.htmleditor.Block.factory(toolbar.tb.selectedNode);
        };
        
        var table = function() {
            return Roo.htmleditor.Block.factory(Roo.get(toolbar.tb.selectedNode).findParent('table'));
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
        
        var rooui =  typeof(Roo.bootstrap) == 'undefined' ? Roo : Roo.bootstrap;
        
        var syncValue = toolbar.editorcore.syncValue;
        
        var fields = {};
        
        return [
            {
                xtype : 'Button',
                text : 'Edit Table',
                listeners : {
                    click : function() {
                        var t = Roo.get(toolbar.tb.selectedNode).findParent('table');
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
                        saveSel();
                        block().shrinkColumn();
                        syncValue();
                        restoreSel();
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
                        saveSel();
                        block().growColumn();
                        syncValue();
                        restoreSel();
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
                text: '<',
                listeners : {
                    click : function (_self, e)
                    {
                        saveSel();
                        cell().mergeLeft();
                        //block().growColumn();
                        syncValue();
                        restoreSel();
                    }
                },
                xns : rooui.Toolbar
            },
            {
                xtype : 'Button',
                text: '>',
                listeners : {
                    click : function (_self, e)
                    {
                        saveSel();
                        cell().mergeRight();
                        //block().growColumn();
                        syncValue();
                        restoreSel();
                    }
                },
                xns : rooui.Toolbar
            },
            {
                xtype : 'Button',
                text: '^',
                listeners : {
                    click : function (_self, e)
                    {
                        saveSel();
                        cell().mergeAbove();
                        //block().growColumn();
                        syncValue();
                        restoreSel();
                    }
                },
                xns : rooui.Toolbar
            },
            {
                xtype : 'Button',
                text: 'v',
                listeners : {
                    click : function (_self, e)
                    {
                        saveSel();
                        cell().mergeBelow();
                        //block().growColumn();
                        syncValue();
                        restoreSel();
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
                        saveSel();
                        cell().split();
                        syncValue();
                        restoreSel();
                    }
                },
                xns : rooui.Toolbar
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
        
        var ret = {
            tag : 'td',
            contenteditable : 'true', // this stops cell selection from picking the table.
            'data-block' : 'Td',
            style : {
                width:  this.width,
                'text-align' :  this.textAlign,
                border : 'solid 1px #000', // ??? hard coded?
                'border-collapse' : 'collapse',
            },
            html : this.html
        };
        
        if (this.colspan > 1) {
            ret.colspan = cell.colspan ;
        } 
        if (ret.rowspan > 1) {
            this.rowspan = cell.rowspan ;
        }
        
           
        
        return ret;
         
    },
    
    readElement : function(node)
    {
        node  = node ? node : this.node ;
        this.width = this.getVal(node, true, 'style', 'width');
        this.html = node.innerHTML;
        
        
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
        return Roo.get(this.node).findParent('table');
        
        
    },
    
    cellData : false,
    
    toTableArray  : function()
    {
        var ret = [];
        var tab = this.node.closest('tr').closest('table');
        Array.from(tab.rows).forEach(function(r, ri){
            ret[ri] = [];
        });
        var rn = 0;
        
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

    },
    
    mergeLeft: function()
    {
        // technically this is 
        
        // get the contents of the next cell along..
        var tr = this.node.closest('tr');
        var i = Array.prototype.indexOf.call(tr.childNodes, this.node);
        if (i < 1) {
            return; // cant do that.
        }
        var table = this.toTableArray();
        
        if (typeof(table[this.cellData.row][this.cellData.col-1]) == 'undefined') {
            return; // nothing right?
        }
        var rc = table[this.cellData.row][this.cellData.col-1];
        // right cell - must be same rowspan and on the same row.
        if (rc.rowspan != this.cellData.rowspan || rc.row != this.cellData.row) {
            return; // right hand side is not same rowspan.
        }
        
        this.node.innerHTML =  rc.cell.innerHTML + ' ' +  this.node.innerHTML ;
        tr.removeChild(rc.cell);
        this.colspan += rc.colspan;
        this.node.setAttribute('colspan', this.colspan);

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
    
    mergeAbove : function()
    {
        
        var table = this.toTableArray();
        if (typeof(table[this.cellData.row-1]) == 'undefined') {
            return; // no row below
        }
        if (typeof(table[this.cellData.row-1][this.cellData.col]) == 'undefined') {
            return; // nothing right?
        }
        var rc = table[this.cellData.row-1][this.cellData.col];
        
        if (rc.colspan != this.cellData.colspan || rc.col != this.cellData.col) {
            return; // right hand side is not same rowspan.
        }
        this.node.innerHTML =  rc.cell.innerHTML + this.node.innerHTML ;
        this.node.parentNode.removeChild(this.node);
        rc.cell.parentNode.replaceChild(this.node, rc.cell);
        
        this.rowspan++;
        this.node.setAttribute('rowspan', this.rowspan);
    }
    
    
    
})

