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
    
    table_width : '',
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
                text : "Table Width: ",
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
                name : 'table_width',
                listeners : {
                    select : function (combo, r, index)
                    {
                        var b = cell();
                        var t = table();
                        t.width  = b.table_width = r.get('val');
                        
                        t.updateElement();
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
                        saveSel();
                        
                        table().removeColumn();
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
                        table().addColumn();
                        syncValue();
                        restoreSel();
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
                        saveSel();
                        table().removeRow();
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
                        table().addRow();
                        syncValue();
                        restoreSel();
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
                       saveSel();
                        block().resetWidths();
                        restoreSel();
                    }
                },
                xns : rooui.Toolbar
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
        this.table_width = this.getVal(Roo.get(node).findParent('table'), true, 'style', 'width');
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
        
        
    }
    
    
    
    
})

