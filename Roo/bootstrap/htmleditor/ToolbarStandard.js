  
Roo.namespace('Roo.bootstrap.htmleditor');
/**
 * @class Roo.bootstrap.HtmlEditorToolbar1
 * Basic Toolbar
 * 
 * Usage:
 *
 new Roo.bootstrap.HtmlEditor({
    ....
    toolbars : [
        new Roo.bootstrap.HtmlEditorToolbar1({
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
 
Roo.bootstrap.htmleditor.ToolbarStandard = function(config)
{
    
    Roo.apply(this, config);
    
    // default disabled, based on 'good practice'..
    this.disable = this.disable || {};
    Roo.applyIf(this.disable, {
        fontSize : true,
        colors : true,
        specialElements : true
    });
    Roo.bootstrap.htmleditor.ToolbarStandard.superclass.constructor.call(this, config);
    
    this.editor = config.editor;
    this.editorcore = config.editor.editorcore;
    
    this.buttons   = new Roo.util.MixedCollection(false, function(o) { return o.cmd; });
    
    //Roo.form.HtmlEditorToolbar1.superclass.constructor.call(this, editor.wrap.dom.firstChild, [], config);
    // dont call parent... till later.
}
Roo.extend(Roo.bootstrap.htmleditor.ToolbarStandard, Roo.bootstrap.NavSimplebar,  {
     
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
    
    onRender : function(ct, position)
    {
       // Roo.log("Call onRender: " + this.xtype);
        
       Roo.bootstrap.htmleditor.ToolbarStandard.superclass.onRender.call(this, ct, position);
       Roo.log(this.el);
       this.el.dom.style.marginBottom = '0';
       var _this = this;
       var editorcore = this.editorcore;
       var editor= this.editor;
       
       var children = [];
       var btn = function(id,cmd , toggle, handler){
       
            var  event = toggle ? 'toggle' : 'click';
       
            var a = {
                size : 'sm',
                xtype: 'Button',
                xns: Roo.bootstrap,
                glyphicon : id,
                cmd : id || cmd,
                enableToggle:toggle !== false,
                //html : 'submit'
                pressed : toggle ? false : null,
                listeners : {}
            }
            a.listeners[toggle ? 'toggle' : 'click'] = function() {
                handler ? handler.call(_this,this) :_this.onBtnClick.call(_this, cmd ||  id);
            }
            children.push(a);
            return a;
       }
        
        var style = {
                xtype: 'Button',
                size : 'sm',
                xns: Roo.bootstrap,
                glyphicon : 'font',
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
            
            
        btn('bold',false,true);
        btn('italic',false,true);
        btn('align-left', 'justifyleft',true);
        btn('align-center', 'justifycenter',true);
        btn('align-right' , 'justifyright',true);
        btn('link', false, false, function(btn) {
            //Roo.log("create link?");
            var url = prompt(this.createLinkText, this.defaultLinkValue);
            if(url && url != 'http:/'+'/'){
                this.editorcore.relayCmd('createlink', url);
            }
        }),
        btn('list','insertunorderedlist',true);
        btn('pencil', false,true, function(btn){
                Roo.log(this);
                
                this.toggleSourceEdit(btn.pressed);
        });
        /*
        var cog = {
                xtype: 'Button',
                size : 'sm',
                xns: Roo.bootstrap,
                glyphicon : 'cog',
                //html : 'submit'
                menu : {
                    xtype: 'Menu',
                    xns: Roo.bootstrap,
                    items:  []
                }
        };
        
        cog.menu.items.push({
            xtype :'MenuItem',
            xns: Roo.bootstrap,
            html : Clean styles,
            tagname : f,
            listeners : {
                click : function()
                {
                    editorcore.insertTag(this.tagname);
                    editor.focus();
                }
            }
            
        });
       */
        
         
       this.xtype = 'NavSimplebar';
        
        for(var i=0;i< children.length;i++) {
            
            this.buttons.add(this.addxtypeChild(children[i]));
            
        }
        
        editor.on('editorevent', this.updateToolbar, this);
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
    updateToolbar: function(){

        if(!this.editorcore.activated){
            this.editor.onFirstFocus(); // is this neeed?
            return;
        }

        var btns = this.buttons; 
        var doc = this.editorcore.doc;
        btns.get('bold').setActive(doc.queryCommandState('bold'));
        btns.get('italic').setActive(doc.queryCommandState('italic'));
        //btns.get('underline').setActive(doc.queryCommandState('underline'));
        
        btns.get('align-left').setActive(doc.queryCommandState('justifyleft'));
        btns.get('align-center').setActive(doc.queryCommandState('justifycenter'));
        btns.get('align-right').setActive(doc.queryCommandState('justifyright'));
        
        //btns[frameId + '-insertorderedlist').setActive(doc.queryCommandState('insertorderedlist'));
        btns.get('list').setActive(doc.queryCommandState('insertunorderedlist'));
         /*
        
        var ans = this.editorcore.getAllAncestors();
        if (this.formatCombo) {
            
            
            var store = this.formatCombo.store;
            this.formatCombo.setValue("");
            for (var i =0; i < ans.length;i++) {
                if (ans[i] && store.query('tag',ans[i].tagName.toLowerCase(), false).length) {
                    // select it..
                    this.formatCombo.setValue(ans[i].tagName.toLowerCase());
                    break;
                }
            }
        }
        
        
        
        // hides menus... - so this cant be on a menu...
        Roo.bootstrap.MenuMgr.hideAll();
        */
        Roo.bootstrap.MenuMgr.hideAll();
        //this.editorsyncValue();
    },
    onFirstFocus: function() {
        this.buttons.each(function(item){
           item.enable();
        });
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




