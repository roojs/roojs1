 

/**
 * @class Roo.htmleditor.BlockFigure
 * Block that has an image and a figcaption
 * @cfg {String} image_src the url for the image
 * @cfg {String} align (left|right) alignment for the block default left
 * @cfg {String} text_align (left|right) alignment for the text caption default left.
 * @cfg {String} caption the text to appear below  (and in the alt tag)
 * @cfg {String|number} image_width the width of the image number or %?
 * @cfg {String|number} image_height the height of the image number or %?
 * 
 * @constructor
 * Create a new Filter.
 * @param {Object} config Configuration options
 */

Roo.htmleditor.BlockFigure = function(cfg)
{
    if (cfg.node) {
        this.readElement(cfg.node);
        this.updateElement(cfg.node);
    }
    Roo.apply(this, cfg);
}
Roo.extend(Roo.htmleditor.BlockFigure, Roo.htmleditor.Block, {
 
    
    // setable values.
    image_src: '',
    
    align: 'center',
    caption : '',
    text_align: 'left',
    
    width : '100%',
    margin: '2%',
    
    // used by context menu
    friendly_name : 'Image with caption',
    deleteTitle : "Delete Image and Caption",
    
    
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
                        ['auto'],
                        ['50%'],
                        ['100%']
                    ],
                    fields : [ 'val'],
                    xns : Roo.data
                }
            },
            {
                xtype : 'TextItem',
                text : "Align: ",
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
                name : 'align',
                listeners : {
                    select : function (combo, r, index)
                    {
                        toolbar.editorcore.selectNode(toolbar.tb.selectedNode);
                        var b = block();
                        b.align = r.get('val');
                        b.updateElement();
                        syncValue();
                        toolbar.editorcore.onEditorEvent();
                    }
                },
                xns : rooui.form,
                store : {
                    xtype : 'SimpleStore',
                    data : [
                        ['left'],
                        ['right'],
                        ['center']
                    ],
                    fields : [ 'val'],
                    xns : Roo.data
                }
            },
            {
                xtype : 'TextItem',
                text : "Image Source: ",
                xns : rooui.Toolbar  //Boostrap?
            },
            {
                xtype : 'TextField',
                allowBlank : false,
                width : 150,
                name : 'src',
                listeners : {
                    change : function (combo, r, index)
                    {
                        return;
                        toolbar.editorcore.selectNode(toolbar.tb.selectedNode);
                        var b = block();
                        b.align = r.get('val');
                        b.updateElement();
                        syncValue();
                        toolbar.editorcore.onEditorEvent();
                    }
                },
                xns : rooui.form
                
            }
        ];
        
    },
    /**
     * create a DomHelper friendly object - for use with
     * Roo.DomHelper.markup / overwrite / etc..
     */
    toObject : function()
    {
        var d = document.createElement('div');
        d.innerHTML = this.caption;
        
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

