  
/**
 * @class Roo.bootstrap.form.HtmlEditorToolbar.Context
 * @parent Roo.bootstrap.form.HtmlEditor
 * @extends Roo.bootstrap.nav.Simplebar
 * Basic Toolbar
 * 
 * @example
 * Usage:
 *
 new Roo.bootstrap.form.HtmlEditor({
    ....
    toolbars : [
        {
            xtyle: 'Standard',
            disable : { fonts: 1 , format: 1, ..., ... , ...],
            btns : [ .... ]
        },
        {
            xtyle : 'Context',
            ....
        }
    }
     
 * 
 * 
 */
 
Roo.bootstrap.form.HtmlEditorToolbar.Context = function(config)
{
    
    Roo.apply(this, config);
    
    
    Roo.bootstrap.form.HtmlEditorToolbar.Context.superclass.constructor.call(this, config);
    
    this.editor = config.editor;
    this.editorcore = config.editor.editorcore;
    
    this.buttons   = new Roo.util.MixedCollection(false, function(o) { return o.cmd; });
    
}

Roo.bootstrap.form.HtmlEditorToolbar.Context.types = {
    'IMG' : [
        {
            name : 'width',
            title: "Width",
            width: 40
        },
        {
            name : 'height',
            title: "Height",
            width: 40
        },
        {
            name : 'align',
            title: "Align",
            opts : [ [""],[ "left"],[ "right"],[ "center"],[ "top"]],
            width : 80
            
        },
        {
            name : 'border',
            title: "Border",
            width: 40
        },
        {
            name : 'alt',
            title: "Alt",
            width: 120
        },
        {
            name : 'src',
            title: "Src",
            width: 220
        }
        
    ],
    
    
    'A' : [
        {
            name : 'name',
            title: "Name",
            width: 50
        },
        {
            name : 'target',
            title: "Target",
            width: 120
        },
        {
            name : 'href',
            title: "Href",
            width: 220
        } // border?
        
    ],
    /*
    'INPUT' : [
        {
            name : 'name',
            title: "name",
            width: 120
        },
        {
            name : 'value',
            title: "Value",
            width: 120
        },
        {
            name : 'width',
            title: "Width",
            width: 40
        }
    ],
    'LABEL' : [
         {
            name : 'for',
            title: "For",
            width: 120
        }
    ],
    'TEXTAREA' : [
        {
            name : 'name',
            title: "name",
            width: 120
        },
        {
            name : 'rows',
            title: "Rows",
            width: 20
        },
        {
            name : 'cols',
            title: "Cols",
            width: 20
        }
    ],
    'SELECT' : [
        {
            name : 'name',
            title: "name",
            width: 120
        },
        {
            name : 'selectoptions',
            title: "Options",
            width: 200
        }
    ],
    
    // should we really allow this??
    // should this just be 
    'BODY' : [
        
        {
            name : 'title',
            title: "Title",
            width: 200,
            disabled : true
        }
    ],
    */
    '*' : [
        // empty.
    ]

};

Roo.extend(Roo.bootstrap.form.HtmlEditorToolbar.Context, Roo.bootstrap.nav.Simplebar,  {
    
    editor : false,
    editorcore : false,
    buttons : false,
    
    buttons_group : false, // subtoolbars...  - buttson?
    
    
    selectedNode : false,
    
    onRender : function(ct, position)
    {
       // Roo.log("Call onRender: " + this.xtype);
        
        Roo.bootstrap.form.HtmlEditorToolbar.Standard.superclass.onRender.call(this, ct, position);
       
        
         
        var fid = editorcore.frameId;
        var etb = this;
         
          
        // disable everything...
        var ty = Roo.bootstrap.form.HtmlEditorToolbar.Context.types;
        this.toolbars = {};
        // block toolbars are built in updateToolbar when needed.
        for (var i in  ty) {
            this.buttons_group[i] = this.buildToolbar(ty[i],i);
        }
        this.buildToolbarDelete();
         
        // the all the btns;
        this.editorcore.on('editorevent', this.updateToolbar, this);
        
    },
    
    
    
    buildToolbarGroup: function(tlist, key )
    {
        var editor = this.editor;
        var editorcore = this.editorcore;
        var tb = this;
       
        var ret = [];
         
        for (var i = 0; i < tlist.length; i++) {
            
            // newer versions will use xtype cfg to create menus.
            if (typeof(tlist[i].xtype) != 'undefined') {
                tb[typeof(tlist[i].name)== 'undefined' ? 'add' : 'addField'](Roo.factory(tlist[i]));
                continue;
            }
            
            var item = tlist[i];
            ret.push(
                this.addxtypeChild({
                    xtype : 'Element',
                    xns : Roo.bootstrap,
                    cls : 'roo-htmleditor-context-label-' + key + '-' + item.name,
                    html : item.title
                })  
            );
            
            // add a text entry!?
            ret.push(
                this.addxtypeChild({
                    xtype : 'Input',
                    xns : Roo.bootstrap.form,
                    cls : 'roo-htmleditor-context-entry-' + key + '-' + item.name,
                    name: '-roo-edit-' + item.name,
                    width: item.width,
                    //allowBlank:true,
                    value: '',
                    listeners: {
                        'change' : function(f, nv, ov) {
                            tb.selectedNode.setAttribute(f.attrname, nv);
                            editorcore.syncValue();
                        }
                    }
                })
            );
                
        }
        // hide them all..
        ret.forEach(function(e) {
            e.hide();
        });
        
        
        return ret;
    },
    buildToolbarDelete : function()
    {
        
        this.addxtypeChild({
            xtype : 'Element',
            xns : Roo.bootstrap,
            cls : 'roo-htmleditor-fill'
        });
        
        this.deleteBtn = this.addxtypeChild({
            size : 'sm',
            xtype: 'Button',
            xns: Roo.bootstrap,
            fa: 'trash',
            listeners : {
                click : this.onDelete.delegate(this)
            }
        });
        this.deleteBtn.hide();     
        
    },
    
    
    onDelete : function()
    {
        var range = editorcore.createRange();
        var selection = this.editorcore.getSelection();
        range.setStart(stn,0);
        range.setEnd(stn,0); 
        
        var sn = this.selectedNode;
        if (sn.hasAttribute('data-block')) {
            var block = Roo.htmleditor.Block.factory(tb.selectedNode)
            if (block) {
                block.removeNode();
                selection.removeAllRanges();
                selection.addRange(range);
                this.updateToolbar(null, null, null);
            }   
             
        }
        if (!sn) {
            return; // should not really happen..
        }
        if (sn && sn.tagName == 'BODY') {
            return;
        }
        var stn =  sn.childNodes[0] || sn.nextSibling || sn.previousSibling || sn.parentNode;
        
        // remove and keep parents.
        a = new Roo.htmleditor.FilterKeepChildren({tag : false});
        a.replaceTag(sn);
        
        selection.removeAllRanges();
        selection.addRange(range);
        this.updateToolbar(null, null, null);
        
        
    },
    
    
});