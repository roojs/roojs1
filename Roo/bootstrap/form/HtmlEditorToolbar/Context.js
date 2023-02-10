  
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


Roo.extend(Roo.bootstrap.form.HtmlEditorToolbar.Context, Roo.bootstrap.nav.Simplebar,  {
    
    editor : false,
    editorcore : false,
    buttons : false,
    
    toolbars : false, // subtoolbars...
        
    onRender : function(ct, position)
    {
       // Roo.log("Call onRender: " + this.xtype);
        
        Roo.bootstrap.form.HtmlEditorToolbar.Standard.superclass.onRender.call(this, ct, position);
       
        
         
        var fid = editorcore.frameId;
        var etb = this;
         
        // create a new element.
         
        // disable everything...
        var ty = Roo.bootstrap.form.HtmlEditorToolbar.Context.types;
        this.toolbars = {};
        // block toolbars are built in updateToolbar when needed.
        for (var i in  ty) {
            this.toolbars[i] = this.buildToolbar(ty[i],i);
        }
        
    
        editor.on('hide', function( ) { this.footer.hide() }, this);
        editor.on('show', function( ) { this.footer.show() }, this);
        
         
        this.rendered = true;
        
        // the all the btns;
        editor.on('editorevent', this.updateToolbar, this);
        // other toolbars need to implement this..
        //editor.on('editmodechange', this.updateToolbar, this);
    },
    
});