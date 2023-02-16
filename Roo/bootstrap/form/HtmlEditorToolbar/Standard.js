  
/**
 * @class Roo.bootstrap.form.HtmlEditorToolbar.Standard
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
        new Roo.bootstrap.form.HtmlEditorToolbar.Standard({
            disable : { fonts: 1 , format: 1, ..., ... , ...],
            btns : [ .... ]
        })
    }
     
 * 
 * @cfg {Object} disable List of elements to disable..
 * @cfg {Array} btns List of additional buttons.
 * 
 * 
 * NEEDS Extra CSS? 
 * .x-html-editor-tb .x-edit-none .x-btn-text { background: none; }
 */
 
Roo.bootstrap.form.HtmlEditorToolbar.Standard = function(config)
{
    
    Roo.apply(this, config);
    
    // default disabled, based on 'good practice'..
    this.disable = this.disable || {};
    Roo.applyIf(this.disable, {
        fontSize : true,
        colors : true,
        specialElements : true
    });
    Roo.bootstrap.form.HtmlEditorToolbar.Standard.superclass.constructor.call(this, config);
    
    this.editor = config.editor;
    this.editorcore = config.editor.editorcore;
    
    this.buttons   = new Roo.util.MixedCollection(false, function(o) { return o.btnid; });
    
    //Roo.form.HtmlEditorToolbar1.superclass.constructor.call(this, editor.wrap.dom.firstChild, [], config);
    // dont call parent... till later.
}
Roo.extend(Roo.bootstrap.form.HtmlEditorToolbar.Standard, Roo.bootstrap.nav.Simplebar,  {
     
    bar : true,
    
    editor : false,
    editorcore : false,
    
    
    formats : [
        "p" ,  
        "h1","h2","h3","h4","h5","h6", 
        "pre", "code", 
        "abbr", "acronym", "address", "cite", "samp", "var",
        'div','span'
    ],
    
    
    deleteBtn: false,
    
    onRender : function(ct, position)
    {
       // Roo.log("Call onRender: " + this.xtype);
        
       Roo.bootstrap.form.HtmlEditorToolbar.Standard.superclass.onRender.call(this, ct, position);
       Roo.log(this.el);
       this.el.dom.style.marginBottom = '0';
       var _this = this;
       var editorcore = this.editorcore;
       var editor= this.editor;
       
       var children = [];
       var btn = function(id, cmd , toggle, handler, html){
       
            var  event = toggle ? 'toggle' : 'click';
       
            var a = {
                size : 'sm',
                xtype: 'Button',
                xns: Roo.bootstrap,
                //glyphicon : id,
                btnid : id,
                fa: id,
                cmd : cmd, // why id || cmd
                enableToggle: toggle !== false,
                html : html || '',
                pressed : toggle ? false : null,
                listeners : {}
            };
            a.listeners[toggle ? 'toggle' : 'click'] = function() {
                handler ? handler.call(_this,this) :_this.onBtnClick.call(_this, cmd ||  id);
            };
            children.push(a);
            return a;
       }
       
    //    var cb_box = function...
        
        var style = {
                xtype: 'Button',
                size : 'sm',
                xns: Roo.bootstrap,
                fa : 'font',
                //html : 'submit'
                menu : {
                    xtype: 'Menu',
                    xns: Roo.bootstrap,
                    items:  []
                }
        };
        Roo.each(this.formats, function(f) {
            style.menu.items.push({
                xtype :'MenuItem',
                xns: Roo.bootstrap,
                html : '<'+ f+' style="margin:2px">'+f +'</'+ f+'>',
                tagname : f,
                listeners : {
                    click : function()
                    {
                        editorcore.insertTag(this.tagname);
                        editor.focus();
                    }
                }
                
            });
        });
        children.push(style);   
        
        btn('bold',         false,true);
        btn('italic',       false,true);
        btn('align-left',   'justifyleft',true);
        btn('align-center', 'justifycenter',true);
        btn('align-right' , 'justifyright',true);
        btn('link', false, true, function(btn) {
            var url = this.selectedNode && this.selectedNode.tagName.toUpperCase() == 'A' ?
                    this.selectedNode.getAttribute('url') : '';
                
            Roo.bootstrap.MessageBox.show({
                title : "Add / Edit Link URL",
                msg : "Enter the URL for the link",
                buttons: this.OKCANCEL,
                minWidth: 250,
                scope : scope,
                prompt:true,
                multiline: false,
                modal : true,
                value : url,
                fn:  function(pressed, url) {
                    if (pressed != 'ok') {
                        return;
                    }
                    
                    if(url && url.match(/http(s):\/\/.+/)) {
                        this.editorcore.relayCmd('createlink', url);
                    }
                }
            });
        });
        btn('list','insertunorderedlist',true);
        btn('list-ol','insertorderedlist',true);

        btn('pencil', false,true, function(btn){
                Roo.log(this);
                this.toggleSourceEdit(btn.pressed);
        });
        
        if (this.editor.btns.length > 0) {
            for (var i = 0; i<this.editor.btns.length; i++) {
                children.push(this.editor.btns[i]);
            }
        }
        
        
         
        this.xtype = 'NavSimplebar'; // why?
        
        for(var i=0;i< children.length;i++) {
            
            this.buttons.add(this.addxtypeChild(children[i]));
            
        }
        this.buildToolbarDelete();

        editor.on('editorevent', this.updateToolbar, this);
    },
    
    buildToolbarDelete : function()
    {
        
       /* this.addxtypeChild({
            xtype : 'Element',
            xns : Roo.bootstrap,
            cls : 'roo-htmleditor-fill'
        });
        */
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
    
    
    onBtnClick : function(id)
    {
       this.editorcore.relayCmd(id);
       this.editorcore.focus();
    },
    
    /**
     * Protected method that will not generally be called directly. It triggers
     * a toolbar update by reading the markup state of the current selection in the editor.
     */
    updateToolbar: function(editor ,ev, sel){

        if(!this.editorcore.activated){
            this.editor.onFirstFocus(); // is this neeed?
            return;
        }

        var btns = this.buttons; 
        var doc = this.editorcore.doc;
        var hasToggle  = false;
        btns.each(function(e) {
            if (e.enableToggle && e.cmd) {
                hasToggle = hasToggle  || doc.queryCommandState(e.cmd);
                e.setActive(doc.queryCommandState(e.cmd));
            }
        }, this);
        
        
        if (ev &&
            (ev.type == 'mouseup' || ev.type == 'click' ) &&
            ev.target && ev.target.tagName != 'BODY' ) { // && ev.target.tagName == 'IMG') {
            // they have click on an image...
            // let's see if we can change the selection...
            sel = ev.target;
            
        }
        
        var ans = this.editorcore.getAllAncestors();
        if (!sel) { 
            sel = ans.length ? (ans[0] ?  ans[0]  : ans[1]) : this.editorcore.doc.body;
            sel = sel ? sel : this.editorcore.doc.body;
            sel = sel.tagName.length ? sel : this.editorcore.doc.body;
            
        }
        
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
                sel = this.selectedNode = db;
            }
        }
        
        // highlight the 'a'..
        var tn = sel && sel.tagName.toUpperCase() || '';
        if (sel && tn != 'A') {
            var asel = sel.closest('A');
            if (asel) {
                sel = asel;
            }
        }
       
        btns.get('link').setActive(tn == 'A' && this.selectedNode.hasAttribute('href'));
        
        Roo.bootstrap.menu.Manager.hideAll();
         
        
        Array.from(this.editorcore.doc.body.querySelectorAll('.roo-ed-selection')).forEach(function(e) {
            e.classList.remove('roo-ed-selection');
        });
        
        
        // handle delete button..
        if (hasToggle || (tn.length && tn == 'BODY')) {
            this.deleteBtn.hide();
            return;
            
        }
        this.deleteBtn.show();
        
        
        
        //this.editorsyncValue();
    },
    onFirstFocus: function() {
        this.buttons.each(function(item){
           item.enable();
        });
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
    
    
    toggleSourceEdit : function(sourceEditMode){
        
          
        if(sourceEditMode){
            Roo.log("disabling buttons");
           this.buttons.each( function(item){
                if(item.cmd != 'pencil'){
                    item.disable();
                }
            });
          
        }else{
            Roo.log("enabling buttons");
            if(this.editorcore.initialized){
                this.buttons.each( function(item){
                    item.enable();
                });
            }
            
        }
        Roo.log("calling toggole on editor");
        // tell the editor that it's been pressed..
        this.editor.toggleSourceEdit(sourceEditMode);
       
    }
});




