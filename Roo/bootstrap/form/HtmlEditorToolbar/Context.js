  
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
    
    /*
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
    */
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
    
    button_groups : false, // subtoolbars...  - buttson?
    active_group : false,
    
    selectedNode : false,
    
    onRender : function(ct, position)
    {
       // Roo.log("Call onRender: " + this.xtype);
        
        this.constructor.superclass.onRender.call(this, ct, position);
       
        
         
        
          
        // disable everything...
        var ty = this.constructor.types;
        this.button_groups = {};
        // block toolbars are built in updateToolbar when needed.
        for (var i in  ty) {
            this.button_groups[i] = this.buildToolbarGroup(ty[i],i);
        }
        this.buildToolbarDelete();
          this.hide();
        // the all the btns;
        this.editor.on('editorevent', this.updateToolbar, this);
        
    },
    onFirstFocus: function() {
       
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
                    attrname : item.name,
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
        ret.name = key;
        
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
                click : this.onDelete.createDelegate(this)
            }
        });
        this.deleteBtn.hide();     
        
    },
    
    
    onDelete : function()
    {
        var range = this.editorcore.createRange();
        var selection = this.editorcore.getSelection();
        var sn = this.selectedNode;
        range.setStart(sn,0);
        range.setEnd(sn,0); 
        
        
        if (sn.hasAttribute('data-block')) {
            var block = Roo.htmleditor.Block.factory(tb.selectedNode);
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
        this.editorcore.fireEditorEvent(false);
        
        
    },
    /**
     * Protected method that will not generally be called directly. It triggers
     * a toolbar update by reading the markup state of the current selection in the editor.
     *
     * Note you can force an update by calling on('editorevent', scope, false)
     */
    updateToolbar: function(editor ,ev, sel)
    {
        var ty = this.constructor.types;
        
        
        if (ev) {
            ev.stopEvent(); // se if we can stop this looping with mutiple events.
        }
        
         
        // capture mouse up - this is handy for selecting images..
        // perhaps should go somewhere else...
        if(!this.editorcore.activated){
            this.editor.onFirstFocus();
            return;
        }
        //Roo.log(ev ? ev.target : 'NOTARGET');
        
        
        // http://developer.yahoo.com/yui/docs/simple-editor.js.html
        // selectNode - might want to handle IE?
         
        if (ev &&
            (ev.type == 'mouseup' || ev.type == 'click' ) &&
            ev.target && ev.target.tagName != 'BODY' ) { // && ev.target.tagName == 'IMG') {
            // they have click on an image...
            // let's see if we can change the selection...
            sel = ev.target;
           
             
        }
        
        // this forces an id..
        Array.from(this.editorcore.doc.body.querySelectorAll('.roo-ed-selection')).forEach(function(e) {
            e.classList.remove('roo-ed-selection');
        });
          
        var ans = this.editorcore.getAllAncestors();
        
               
        if (!sel) { 
            sel = ans.length ? (ans[0] ?  ans[0]  : ans[1]) : this.editorcore.doc.body;
            sel = sel ? sel : this.editorcore.doc.body;
            sel = sel.tagName.length ? sel : this.editorcore.doc.body;
            
        }
        
        var tn = sel.tagName.toUpperCase();
        var lastSel = this.selectedNode;
        this.selectedNode = sel;
         
        // ok see if we are editing a block?
        
        var db = false;
        // you are not actually selecting the block.
        if (sel && sel.hasAttribute('data-block')) {
            db = sel;
        } else if (sel && sel.closest('[data-block]')) {
            
            db = sel.closest('[data-block]');
             
        }
        
       
        var block = false;
        if (db && this.editorcore.enableBlocks) {
            block = Roo.htmleditor.Block.factory(db);
            
            
            if (block) {
                db.className = (
                        db.classList.length > 0  ? db.className + ' ' : ''
                    )  + 'roo-ed-selection';
                 
                 // since we removed it earlier... its not there..
                tn = 'BLOCK.' + db.getAttribute('data-block');
                
                //this.editorcore.selectNode(db);
                if (typeof(this.button_groups[tn]) == 'undefined') {
                   this.button_groups[tn] = this.buildBlockToolbar( block );
                }
                this.selectedNode = db;
               
                 
            }
              
            
        }
        
        
        if ( this.active_group !== false && this.active_group.name == tn && lastSel == this.selectedNode && ev !== false) {
            return; // no change?
        }
        
        if (tn == 'BODY') {
            this.deleteBtn.hide();
            this.hide();
            this.hideActiveGroup();
            return;
            
        }
        
        
        if (this.active_group) {
            this.hideActiveGroup();
        }
        this.showActiveGroup(tn);
        this.show();
        this.deleteBtn.show();
        
    },
    hideActiveGroup : function()
    {
        this.hide();
        if (this.active_group === false) {
            return;
        }
        this.active_group.forEach(function(e) {
            e.hide();
        });
        this.active_group = false;
    },
    showActiveGroup : function(tn)
    {
        
        if (typeof(this.button_groups[tn]) == 'undefined') {
            
            return;
        }
        
        this.active_group = this.button_groups[tn];
        
        this.active_group.forEach(function(e) {
            e.show();
        });
        
        // update attributes
        if (this.selectedNode.hasAttribute('data-block') ) {
            var block = Roo.htmleditor.Block.factory(this.selectedNode);
            this.active_group.forEach(function(e) {
                e.setValue(this.selectedNode.getAttribute(block[e.name]));
            }, this);
                
            return;
            
        }
        // based on attributes...
        this.active_group.forEach(function(e) {
            if (typeof(e.attrname) == 'undefined') {
                return;
            }
             e.setValue(this.selectedNode.getAttribute(e.attrname));
        }, this);
        
            
    }
    
});