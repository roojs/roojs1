/*
 * - LGPL
 *
 * HtmlEditor
 * 
 */

/**
 * @class Roo.bootstrap.form.HtmlEditor
 * @extends Roo.bootstrap.form.TextArea
 * Bootstrap HtmlEditor class

 * @constructor
 * Create a new HtmlEditor
 * @param {Object} config The config object
 */

Roo.bootstrap.form.HtmlEditor = function(config){

    this.addEvents({
            /**
             * @event initialize
             * Fires when the editor is fully initialized (including the iframe)
             * @param {Roo.bootstrap.form.HtmlEditor} this
             */
            initialize: true,
            /**
             * @event activate
             * Fires when the editor is first receives the focus. Any insertion must wait
             * until after this event.
             * @param {Roo.bootstrap.form.HtmlEditor} this
             */
            activate: true,
             /**
             * @event beforesync
             * Fires before the textarea is updated with content from the editor iframe. Return false
             * to cancel the sync.
             * @param {Roo.bootstrap.form.HtmlEditor} this
             * @param {String} html
             */
            beforesync: true,
             /**
             * @event beforepush
             * Fires before the iframe editor is updated with content from the textarea. Return false
             * to cancel the push.
             * @param {Roo.bootstrap.form.HtmlEditor} this
             * @param {String} html
             */
            beforepush: true,
             /**
             * @event sync
             * Fires when the textarea is updated with content from the editor iframe.
             * @param {Roo.bootstrap.form.HtmlEditor} this
             * @param {String} html
             */
            sync: true,
             /**
             * @event push
             * Fires when the iframe editor is updated with content from the textarea.
             * @param {Roo.bootstrap.form.HtmlEditor} this
             * @param {String} html
             */
            push: true,
             /**
             * @event editmodechange
             * Fires when the editor switches edit modes
             * @param {Roo.bootstrap.form.HtmlEditor} this
             * @param {Boolean} sourceEdit True if source edit, false if standard editing.
             */
            editmodechange: true,
            /**
             * @event editorevent
             * Fires when on any editor (mouse up/down cursor movement etc.) - used for toolbar hooks.
             * @param {Roo.bootstrap.form.HtmlEditor} this
             */
            editorevent: true,
            /**
             * @event firstfocus
             * Fires when on first focus - needed by toolbars..
             * @param {Roo.bootstrap.form.HtmlEditor} this
             */
            firstfocus: true,
            /**
             * @event autosave
             * Auto save the htmlEditor value as a file into Events
             * @param {Roo.bootstrap.form.HtmlEditor} this
             */
            autosave: true,
            /**
             * @event savedpreview
             * preview the saved version of htmlEditor
             * @param {Roo.bootstrap.form.HtmlEditor} this
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
            paste: true,
            /**
            * @event imageadd
            * Fires when on any editor when an image is added (excluding paste)
            * @param {Roo.bootstrap.form.HtmlEditor} this
            */
           imageadd: true ,
            /**
            * @event imageupdated
            * Fires when on any editor when an image is changed (excluding paste)
            * @param {Roo.bootstrap.form.HtmlEditor} this
            * @param {HTMLElement} img could also be a figure if blocks are enabled
            */
           imageupdate: true ,
           /**
            * @event imagedelete
            * Fires when on any editor when an image is deleted
            * @param {Roo.bootstrap.form.HtmlEditor} this
            * @param {HTMLElement} img could also be a figure if blocks are enabled
            * @param {HTMLElement} oldSrc source of image being replaced
            */
           imagedelete: true  
    });
    Roo.bootstrap.form.HtmlEditor.superclass.constructor.call(this, config);
    if (!this.toolbars) {
        this.toolbars = [];
    }
    
    this.editorcore = new Roo.HtmlEditorCore(Roo.apply({ owner : this} , config));
    
};


Roo.extend(Roo.bootstrap.form.HtmlEditor, Roo.bootstrap.form.TextArea,  {
    
    
      /**
     * @cfg {Array|boolean} toolbars Array of toolbars, or names of toolbars. - true for standard, and false for none.
     */
    toolbars : true,
    
     /**
    * @cfg {Array} buttons Array of toolbar's buttons. - defaults to empty
    */
    btns : [],
   
     /**
     * @cfg {String} resize  (none|both|horizontal|vertical) - css resize of element
     */
    resize : false,
     /**
     * @cfg {Number} height (in pixels)
     */   
    height: 300,
   /**
     * @cfg {Number} width (in pixels)
     */   
    width: false,
    
    /**
     * @cfg {Array} stylesheets url of stylesheets. set to [] to disable stylesheets.
     * 
     */
    stylesheets: false,
    
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
    
    tbContainer : false,
    
    bodyCls : '',

    linkDialogCls : '',
    
    toolbarContainer :function() {
        return this.wrap.select('.x-html-editor-tb',true).first();
    },

    /**
     * Protected method that will not generally be called directly. It
     * is called when the editor creates its toolbar. Override this method if you need to
     * add custom toolbar buttons.
     * @param {HtmlEditor} editor
     */
    createToolbar : function()
    {
        //Roo.log('renewing');
        //Roo.log("create toolbars");
        if (this.toolbars === false) {
            return;
        }
        if (this.toolbars === true) {
            this.toolbars = [ 'Standard' ];
        }
        
        var ar = Array.from(this.toolbars);
        this.toolbars = [];
        ar.forEach(function(t,i) {
            if (typeof(t) == 'string') {
                t = {
                    xtype : t
                };
            }
            if (typeof(t) == 'object' && typeof(t.xtype) == 'string') {
                t.editor = this;
                t.xns = t.xns || Roo.bootstrap.form.HtmlEditorToolbar;
                t = Roo.factory(t);
            }
            this.toolbars[i] = t;
            this.toolbars[i].render(this.toolbarContainer());
        }, this);
        
        
    },

     
    // private
    onRender : function(ct, position)
    {
       // Roo.log("Call onRender: " + this.xtype);
        var _t = this;
        Roo.bootstrap.form.HtmlEditor.superclass.onRender.call(this, ct, position);
      
        this.wrap = this.inputEl().wrap({
            cls:'x-html-editor-wrap', cn:{cls:'x-html-editor-tb'}
        });
        
        this.editorcore.onRender(ct, position);
         
         
        this.createToolbar(this);
       
        
          
        
    },

    // private
    onResize : function(w, h)
    {
        Roo.log('resize: ' +w + ',' + h );
        Roo.bootstrap.form.HtmlEditor.superclass.onResize.apply(this, arguments);
        var ew = false;
        var eh = false;
        
        if(this.inputEl() ){
            if(typeof w == 'number'){
                var aw = w - this.wrap.getFrameWidth('lr');
                this.inputEl().setWidth(this.adjustWidth('textarea', aw));
                ew = aw;
            }
            if(typeof h == 'number'){
                 var tbh = -11;  // fixme it needs to tool bar size!
                for (var i =0; i < this.toolbars.length;i++) {
                    // fixme - ask toolbars for heights?
                    tbh += this.toolbars[i].el.getHeight();
                    //if (this.toolbars[i].footer) {
                    //    tbh += this.toolbars[i].footer.el.getHeight();
                    //}
                }
              
                
                
                
                
                var ah = h - this.wrap.getFrameWidth('tb') - tbh;// this.tb.el.getHeight();
                ah -= 5; // knock a few pixes off for look..
                this.inputEl().setHeight(this.adjustWidth('textarea', ah));
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
            this.syncValue();
            this.inputEl().removeClass(['hide', 'x-hidden']);
            this.inputEl().dom.removeAttribute('tabIndex');
            this.inputEl().focus();
        }else{
            Roo.log('editor - hiding textarea');
//            Roo.log('out')
//            Roo.log(this.pushValue()); 
            this.pushValue();
            
            this.inputEl().addClass(['hide', 'x-hidden']);
            this.inputEl().dom.setAttribute('tabIndex', -1);
            //this.deferFocus();
        }
         
        //if(this.resizable){
        //    this.setSize(this.wrap.getSize());
        //}
        
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

//    /**
//     * Overridden and disabled. The editor element does not support standard valid/invalid marking. @hide
//     * @method
//     */
//    markInvalid : Roo.emptyFn,
//    /**
//     * Overridden and disabled. The editor element does not support standard valid/invalid marking. @hide
//     * @method
//     */
//    clearInvalid : Roo.emptyFn,

    setValue : function(v){
        Roo.bootstrap.form.HtmlEditor.superclass.setValue.call(this, v);
        this.editorcore.pushValue();
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
     * @cfg {String} invalidText @hide
     */
    /**
     * @cfg {String} msgFx @hide
     */
    /**
     * @cfg {String} validateOnBlur @hide
     */
});
 
    
   
   
   
    