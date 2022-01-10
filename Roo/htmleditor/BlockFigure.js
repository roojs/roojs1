 

/**
 * @class Roo.htmleditor.BlockFigure
 * Block that has an image and a figcaption
 * @cfg {String} image_src the url for the image
 * @cfg {String} align (left|right) alignment for the block default left
 * @cfg {String} caption the text to appear below  (and in the alt tag)
 * @cfg {String} caption_display (block|none) display or not the caption
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
    caption_display : 'block',
    width : '100%',
    cls : '',
    href: '',
    video_url : '',
    
    // margin: '2%', not used
    
    text_align: 'left', //   (left|right) alignment for the text caption default left. - not used at present

    
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
                text : "Source: ",
                xns : rooui.Toolbar  //Boostrap?
            },
            {
                xtype : 'Button',
                text: 'Change Image URL',
                 
                listeners : {
                    click: function (btn, state)
                    {
                        
                        
                        Roo.MessageBox.show({
                            title : "Image Source URL",
                            msg : "Enter the url for the image",
                            buttons: Roo.MessageBox.OKCANCEL,
                            fn: function(val){
                                block().image_src = val;
                                block().updateElement();
                                syncValue();
                                toolbar.editorcore.onEditorEvent();
                            },
                            minWidth:250,
                            prompt:true,
                            //multiline: multiline,
                            modal : true,
                            value : block().image_src
                        });
                    }
                },
                xns : rooui.Toolbar
            },
         
            {
                xtype : 'Button',
                text: 'Change Link URL',
                 
                listeners : {
                    click: function (btn, state)
                    {
                        
                        
                        Roo.MessageBox.show({
                            title : "Link URL",
                            msg : "Enter the url for the link - leave blank to have no link",
                            buttons: Roo.MessageBox.OKCANCEL,
                            fn: function(val){
                                block().href = val;
                                block().updateElement();
                                syncValue();
                                toolbar.editorcore.onEditorEvent();
                            },
                            minWidth:250,
                            prompt:true,
                            //multiline: multiline,
                            modal : true,
                            value : block().href
                        });
                    }
                },
                xns : rooui.Toolbar
            },
            {
                xtype : 'Button',
                text: 'Show Video URL',
                 
                listeners : {
                    click: function (btn, state)
                    {
                        Roo.MessageBox.alert("Video URL",
                            block().video_url == '' ? 'This image is not linked ot a video' :
                                'The image is linked to: <a target="_new" href="' + block().video_url + '">' + block().video_url + '</a>');
                    }
                },
                xns : rooui.Toolbar
            },
            
            
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
                width : 70,
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
                width : 70,
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
                xtype : 'Button',
                text: 'Hide Caption',
                name : 'caption_display',
                pressed : false,
                enableToggle : true,
                setValue : function(v) {
                    this.toggle(v == 'block' ? false : true);
                },
                listeners : {
                    toggle: function (btn, state)
                    {
                        var b  = block();
                        b.caption_display = b.caption_display == 'block' ? 'none' : 'block';
                        this.setText(b.caption_display == 'block' ? "Hide Caption" : "Show Caption");
                        b.updateElement();
                        syncValue();
                        toolbar.editorcore.selectNode(toolbar.tb.selectedNode);
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
     */
    toObject : function()
    {
        var d = document.createElement('div');
        d.innerHTML = this.caption;
        
        var m = this.width == '50%' && this.align == 'center' ? '0 auto' : 0; 
        
        var img =   {
            tag : 'img',
            contenteditable : 'false',
            src : this.image_src,
            alt : d.innerText.replace(/\n/g, " ").replace(/\s+/g, ' ').trim(), // removeHTML and reduce spaces..
            style: {
                width : 'auto',
                'max-width': '100%',
                margin : '0px' 
                
                
            }
        };
        /*
        '<div class="{0}" width="420" height="315" src="{1}" frameborder="0" allowfullscreen>' +
                    '<a href="{2}">' + 
                        '<img class="{0}-thumbnail" src="{3}/Images/{4}/{5}#image-{4}" />' + 
                    '</a>' + 
                '</div>',
        */
                
        if (this.href.length > 0) {
            img = {
                tag : 'a',
                href: this.href,
                contenteditable : 'true',
                cn : [
                    img
                ]
            };
        }
        
        
        if (this.video_url.length > 0) {
            img = {
                tag : 'div',
                cls : this.cls,
                frameborder : 0,
                allowfullscreen : true,
                width : 420,  // these are for video tricks - that we replace the outer
                height : 315,
                src : this.video_url,
                cn : [
                    img
                ]
            };
        }
        
        return  {
            tag: 'figure',
            'data-block' : 'Figure',
            contenteditable : 'false',
            style : {
                display: 'block',
                float :  this.align ,
                'max-width':  this.width,
                width : 'auto',
                margin:  m,
                padding: '10px'
                
            },
           
            
            align : this.align,
            cn : [
                img,
              
                {
                    tag: 'figcaption',
                    contenteditable : true,
                    style : {
                        'text-align': 'left',
                        'margin-top' : '16px',
                        'font-size' : '16px',
                        'line-height' : '24px',
                        'font-style': 'italic',
                        display : this.caption_display
                    },
                    cls : this.cls.length > 0 ? (this.cls  + '-thumbnail' ) : '',
                    html : this.caption
                    
                }
            ]
        };
         
    },
    
    readElement : function(node)
    {
        // this should not really come from the link...
        this.video_url = this.getVal(node, 'div', 'src');
        this.cls = this.getVal(node, 'div', 'class');
        this.href = this.getVal(node, 'a', 'href');
        
        this.image_src = this.getVal(node, 'img', 'src');
         
        this.align = this.getVal(node, 'figure', 'align');
        this.caption = this.getVal(node, 'figcaption', 'html');
        //this.text_align = this.getVal(node, 'figcaption', 'style','text-align');
        this.width = this.getVal(node, 'figure', 'style', 'max-width');
        //this.margin = this.getVal(node, 'figure', 'style', 'margin');
        
    },
    removeNode : function()
    {
        return this.node;
    }
    
  
   
     
    
    
    
    
})

