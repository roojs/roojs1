//<script type="text/javascript">

/*
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * Licence LGPL
 * 
 */
 
 
Roo.form.HtmlEditor = function(config){
    
    
    
    Roo.form.HtmlEditor.superclass.constructor.call(this, config);
    
    if (!this.toolbars) {
        this.toolbars = [];
    }
    this.editorcore = new Roo.HtmlEditorCore(Roo.apply({ owner : this} , config));
    
    
};

/**
 * @class Roo.form.HtmlEditor
 * @extends Roo.form.Field
 * Provides a lightweight HTML Editor component.
 *
 * This has been tested on Fireforx / Chrome.. IE may not be so great..
 * 
 * <br><br><b>Note: The focus/blur and validation marking functionality inherited from Ext.form.Field is NOT
 * supported by this editor.</b><br/><br/>
 * An Editor is a sensitive component that can't be used in all spots standard fields can be used. Putting an Editor within
 * any element that has display set to 'none' can cause problems in Safari and Firefox.<br/><br/>
 */
Roo.extend(Roo.form.HtmlEditor, Roo.form.Field, {
    /**
     * @cfg {Boolean} clearUp
     */
    clearUp : true,
      /**
     * @cfg {Array} toolbars Array of toolbars. - defaults to just the Standard one
     */
    toolbars : false,
   
     /**
     * @cfg {String} resizable  's' or 'se' or 'e' - wrapps the element in a
     *                        Roo.resizable.
     */
    resizable : false,
     /**
     * @cfg {Number} height (in pixels)
     */   
    height: 300,
   /**
     * @cfg {Number} width (in pixels)
     */   
    width: 500,
    
    /**
     * @cfg {Array} stylesheets url of stylesheets. set to [] to disable stylesheets - this is usally a good idea  rootURL + '/roojs1/css/undoreset.css',   .
     * 
     */
    stylesheets: false,
    
    
     /**
     * @cfg {Array} blacklist of css styles style attributes (blacklist overrides whitelist)
     * 
     */
    cblack: false,
    /**
     * @cfg {Array} whitelist of css styles style attributes (blacklist overrides whitelist)
     * 
     */
    cwhite: false,
    
     /**
     * @cfg {Array} blacklist of html tags - in addition to standard blacklist.
     * 
     */
    black: false,
    /**
     * @cfg {Array} whitelist of html tags - in addition to statndard whitelist
     * 
     */
    white: false,
    /**
     * @cfg {boolean} allowComments - default false - allow comments in HTML source - by default they are stripped - if you are editing email you may need this.
     */
    allowComments: false,
    /**
     * @cfg {boolean} enableBlocks - default true - if the block editor (table and figure should be enabled)
     */
    enableBlocks : true,
    
    /**
     * @cfg {boolean} autoClean - default true - loading and saving will remove quite a bit of formating,
     *         if you are doing an email editor, this probably needs disabling, it's designed
     */
    autoClean: true,
    /**
     * @cfg {string} bodyCls default '' default classes to add to body of editable area - usually undoreset is a good start..
     */
    bodyCls : '',
    /**
     * @cfg {String} language default en - language of text (usefull for rtl languages)
     * 
     */
    language: 'en',
    
     
    // id of frame..
    frameId: false,
    
    // private properties
    validationEvent : false,
    deferHeight: true,
    initialized : false,
    activated : false,
    
    onFocus : Roo.emptyFn,
    iframePad:3,
    hideMode:'offsets',
    
    actionMode : 'container', // defaults to hiding it...
    
    defaultAutoCreate : { // modified by initCompnoent..
        tag: "textarea",
        style:"width:500px;height:300px;",
        autocomplete: "new-password"
    },

    // private
    initComponent : function(){
        this.addEvents({
            /**
             * @event initialize
             * Fires when the editor is fully initialized (including the iframe)
             * @param {HtmlEditor} this
             */
            initialize: true,
            /**
             * @event activate
             * Fires when the editor is first receives the focus. Any insertion must wait
             * until after this event.
             * @param {HtmlEditor} this
             */
            activate: true,
             /**
             * @event beforesync
             * Fires before the textarea is updated with content from the editor iframe. Return false
             * to cancel the sync.
             * @param {HtmlEditor} this
             * @param {String} html
             */
            beforesync: true,
             /**
             * @event beforepush
             * Fires before the iframe editor is updated with content from the textarea. Return false
             * to cancel the push.
             * @param {HtmlEditor} this
             * @param {String} html
             */
            beforepush: true,
             /**
             * @event sync
             * Fires when the textarea is updated with content from the editor iframe.
             * @param {HtmlEditor} this
             * @param {String} html
             */
            sync: true,
             /**
             * @event push
             * Fires when the iframe editor is updated with content from the textarea.
             * @param {HtmlEditor} this
             * @param {String} html
             */
            push: true,
             /**
             * @event editmodechange
             * Fires when the editor switches edit modes
             * @param {HtmlEditor} this
             * @param {Boolean} sourceEdit True if source edit, false if standard editing.
             */
            editmodechange: true,
            /**
             * @event editorevent
             * Fires when on any editor (mouse up/down cursor movement etc.) - used for toolbar hooks.
             * @param {HtmlEditor} this
             */
            editorevent: true,
            /**
             * @event firstfocus
             * Fires when on first focus - needed by toolbars..
             * @param {HtmlEditor} this
             */
            firstfocus: true,
            /**
             * @event autosave
             * Auto save the htmlEditor value as a file into Events
             * @param {HtmlEditor} this
             */
            autosave: true,
            /**
             * @event savedpreview
             * preview the saved version of htmlEditor
             * @param {HtmlEditor} this
             */
            savedpreview: true,
            
            /**
            * @event stylesheetsclick
            * Fires when press the Sytlesheets button
            * @param {Roo.HtmlEditorCore} this
            */
            stylesheetsclick: true,
            /**
            * @event paste
            * Fires when press user pastes into the editor
            * @param {Roo.HtmlEditorCore} this
            */
            paste: true 
            
        });
        this.defaultAutoCreate =  {
            tag: "textarea",
            style:'width: ' + this.width + 'px;height: ' + this.height + 'px;',
            autocomplete: "new-password"
        };
    },

    /**
     * Protected method that will not generally be called directly. It
     * is called when the editor creates its toolbar. Override this method if you need to
     * add custom toolbar buttons.
     * @param {HtmlEditor} editor
     */
    createToolbar : function(editor){
        Roo.log("create toolbars");
        if (!editor.toolbars || !editor.toolbars.length) {
            editor.toolbars = [ new Roo.form.HtmlEditor.ToolbarStandard() ]; // can be empty?
        }
        
        for (var i =0 ; i < editor.toolbars.length;i++) {
            editor.toolbars[i] = Roo.factory(
                    typeof(editor.toolbars[i]) == 'string' ?
                        { xtype: editor.toolbars[i]} : editor.toolbars[i],
                Roo.form.HtmlEditor);
            editor.toolbars[i].init(editor);
        }
         
        
    },
    /**
     * get the Context selected node
     * @returns {DomElement|boolean} selected node if active or false if none
     * 
     */
    getSelectedNode : function()
    {
        if (this.toolbars.length < 2 || !this.toolbars[1].tb) {
            return false;
        }
        return this.toolbars[1].tb.selectedNode;
    
    },
    // private
    onRender : function(ct, position)
    {
        var _t = this;
        Roo.form.HtmlEditor.superclass.onRender.call(this, ct, position);
        
        this.wrap = this.el.wrap({
            cls:'x-html-editor-wrap', cn:{cls:'x-html-editor-tb'}
        });
        
        this.editorcore.onRender(ct, position);
         
        if (this.resizable) {
            this.resizeEl = new Roo.Resizable(this.wrap, {
                pinned : true,
                wrap: true,
                dynamic : true,
                minHeight : this.height,
                height: this.height,
                handles : this.resizable,
                width: this.width,
                listeners : {
                    resize : function(r, w, h) {
                        _t.onResize(w,h); // -something
                    }
                }
            });
            
        }
        this.createToolbar(this);
       
        
        if(!this.width){
            this.setSize(this.wrap.getSize());
        }
        if (this.resizeEl) {
            this.resizeEl.resizeTo.defer(100, this.resizeEl,[ this.width,this.height ] );
            // should trigger onReize..
        }
        
        this.keyNav = new Roo.KeyNav(this.el, {
            
            "tab" : function(e){
                e.preventDefault();
                
                var value = this.getValue();
                
                var start = this.el.dom.selectionStart;
                var end = this.el.dom.selectionEnd;
                
                if(!e.shiftKey){
                    
                    this.setValue(value.substring(0, start) + "\t" + value.substring(end));
                    this.el.dom.setSelectionRange(end + 1, end + 1);
                    return;
                }
                
                var f = value.substring(0, start).split("\t");
                
                if(f.pop().length != 0){
                    return;
                }
                
                this.setValue(f.join("\t") + value.substring(end));
                this.el.dom.setSelectionRange(start - 1, start - 1);
                
            },
            
            "home" : function(e){
                e.preventDefault();
                
                var curr = this.el.dom.selectionStart;
                var lines = this.getValue().split("\n");
                
                if(!lines.length){
                    return;
                }
                
                if(e.ctrlKey){
                    this.el.dom.setSelectionRange(0, 0);
                    return;
                }
                
                var pos = 0;
                
                for (var i = 0; i < lines.length;i++) {
                    pos += lines[i].length;
                    
                    if(i != 0){
                        pos += 1;
                    }
                    
                    if(pos < curr){
                        continue;
                    }
                    
                    pos -= lines[i].length;
                    
                    break;
                }
                
                if(!e.shiftKey){
                    this.el.dom.setSelectionRange(pos, pos);
                    return;
                }
                
                this.el.dom.selectionStart = pos;
                this.el.dom.selectionEnd = curr;
            },
            
            "end" : function(e){
                e.preventDefault();
                
                var curr = this.el.dom.selectionStart;
                var lines = this.getValue().split("\n");
                
                if(!lines.length){
                    return;
                }
                
                if(e.ctrlKey){
                    this.el.dom.setSelectionRange(this.getValue().length, this.getValue().length);
                    return;
                }
                
                var pos = 0;
                
                for (var i = 0; i < lines.length;i++) {
                    
                    pos += lines[i].length;
                    
                    if(i != 0){
                        pos += 1;
                    }
                    
                    if(pos < curr){
                        continue;
                    }
                    
                    break;
                }
                
                if(!e.shiftKey){
                    this.el.dom.setSelectionRange(pos, pos);
                    return;
                }
                
                this.el.dom.selectionStart = curr;
                this.el.dom.selectionEnd = pos;
            },

            scope : this,

            doRelay : function(foo, bar, hname){
                return Roo.KeyNav.prototype.doRelay.apply(this, arguments);
            },

            forceKeyDown: true
        });
        
//        if(this.autosave && this.w){
//            this.autoSaveFn = setInterval(this.autosave, 1000);
//        }
    },

    // private
    onResize : function(w, h)
    {
        Roo.form.HtmlEditor.superclass.onResize.apply(this, arguments);
        var ew = false;
        var eh = false;
        
        if(this.el ){
            if(typeof w == 'number'){
                var aw = w - this.wrap.getFrameWidth('lr');
                this.el.setWidth(this.adjustWidth('textarea', aw));
                ew = aw;
            }
            if(typeof h == 'number'){
                var tbh = 0;
                for (var i =0; i < this.toolbars.length;i++) {
                    // fixme - ask toolbars for heights?
                    tbh += this.toolbars[i].tb.el.getHeight();
                    if (this.toolbars[i].footer) {
                        tbh += this.toolbars[i].footer.el.getHeight();
                    }
                }
                
                
                
                
                var ah = h - this.wrap.getFrameWidth('tb') - tbh;// this.tb.el.getHeight();
                ah -= 5; // knock a few pixes off for look..
//                Roo.log(ah);
                this.el.setHeight(this.adjustWidth('textarea', ah));
                var eh = ah;
            }
        }
        Roo.log('onResize:' + [w,h,ew,eh].join(',') );
        this.editorcore.onResize(ew,eh);
        
    },

    /**
     * Toggles the editor between standard and source edit mode.
     * @param {Boolean} sourceEdit (optional) True for source edit, false for standard
     */
    toggleSourceEdit : function(sourceEditMode)
    {
        this.editorcore.toggleSourceEdit(sourceEditMode);
        
        if(this.editorcore.sourceEditMode){
            Roo.log('editor - showing textarea');
            
//            Roo.log('in');
//            Roo.log(this.syncValue());
            this.editorcore.syncValue();
            this.el.removeClass('x-hidden');
            this.el.dom.removeAttribute('tabIndex');
            this.el.focus();
            this.el.dom.scrollTop = 0;
            
            
            for (var i = 0; i < this.toolbars.length; i++) {
                if(this.toolbars[i] instanceof Roo.form.HtmlEditor.ToolbarContext){
                    this.toolbars[i].tb.hide();
                    this.toolbars[i].footer.hide();
                }
            }
            
        }else{
            Roo.log('editor - hiding textarea');
//            Roo.log('out')
//            Roo.log(this.pushValue()); 
            this.editorcore.pushValue();
            
            this.el.addClass('x-hidden');
            this.el.dom.setAttribute('tabIndex', -1);
            
            for (var i = 0; i < this.toolbars.length; i++) {
                if(this.toolbars[i] instanceof Roo.form.HtmlEditor.ToolbarContext){
                    this.toolbars[i].tb.show();
                    this.toolbars[i].footer.show();
                }
            }
            
            //this.deferFocus();
        }
        
        this.setSize(this.wrap.getSize());
        this.onResize(this.wrap.getSize().width, this.wrap.getSize().height);
        
        this.fireEvent('editmodechange', this, this.editorcore.sourceEditMode);
    },
 
    // private (for BoxComponent)
    adjustSize : Roo.BoxComponent.prototype.adjustSize,

    // private (for BoxComponent)
    getResizeEl : function(){
        return this.wrap;
    },

    // private (for BoxComponent)
    getPositionEl : function(){
        return this.wrap;
    },

    // private
    initEvents : function(){
        this.originalValue = this.getValue();
    },

    /**
     * Overridden and disabled. The editor element does not support standard valid/invalid marking. @hide
     * @method
     */
    markInvalid : Roo.emptyFn,
    /**
     * Overridden and disabled. The editor element does not support standard valid/invalid marking. @hide
     * @method
     */
    clearInvalid : Roo.emptyFn,

    setValue : function(v){
        Roo.log('HtmlEditor::setValue');
        Roo.log(v);
        Roo.form.HtmlEditor.superclass.setValue.call(this, v);
        this.editorcore.pushValue();
    },

    /**
     * update the language in the body - really done by core
     * @param {String} language - eg. en / ar / zh-CN etc..
     */
    updateLanguage : function(lang)
    {
        this.language = lang;
        this.editorcore.language = lang;
        this.editorcore.updateLanguage();
     
    },
    // private
    deferFocus : function(){
        this.focus.defer(10, this);
    },

    // doc'ed in Field
    focus : function(){
        this.editorcore.focus();
        
    },
      

    // private
    onDestroy : function(){
        
        
        
        if(this.rendered){
            
            for (var i =0; i < this.toolbars.length;i++) {
                // fixme - ask toolbars for heights?
                this.toolbars[i].onDestroy();
            }
            
            this.wrap.dom.innerHTML = '';
            this.wrap.remove();
        }
    },

    // private
    onFirstFocus : function(){
        //Roo.log("onFirstFocus");
        this.editorcore.onFirstFocus();
         for (var i =0; i < this.toolbars.length;i++) {
            this.toolbars[i].onFirstFocus();
        }
        
    },
    
    // private
    syncValue : function()
    {
        this.editorcore.syncValue();
    },
    
    pushValue : function()
    {
        this.editorcore.pushValue();
    },
    
    setStylesheets : function(stylesheets)
    {
        this.editorcore.setStylesheets(stylesheets);
    },
    
    removeStylesheets : function()
    {
        this.editorcore.removeStylesheets();
    }
     
    
    // hide stuff that is not compatible
    /**
     * @event blur
     * @hide
     */
    /**
     * @event change
     * @hide
     */
    /**
     * @event focus
     * @hide
     */
    /**
     * @event specialkey
     * @hide
     */
    /**
     * @cfg {String} fieldClass @hide
     */
    /**
     * @cfg {String} focusClass @hide
     */
    /**
     * @cfg {String} autoCreate @hide
     */
    /**
     * @cfg {String} inputType @hide
     */
    /**
     * @cfg {String} invalidClass @hide
     */
    /**
     * @cfg {String} invalidText @hide
     */
    /**
     * @cfg {String} msgFx @hide
     */
    /**
     * @cfg {String} validateOnBlur @hide
     */
});
 
    