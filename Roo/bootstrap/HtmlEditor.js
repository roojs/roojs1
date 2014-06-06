/*
 * - LGPL
 *
 * HtmlEditor
 * 
 */

/**
 * @class Roo.bootstrap.HtmlEditor
 * @extends Roo.bootstrap.TextArea
 * Bootstrap HtmlEditor class

 * @constructor
 * Create a new HtmlEditor
 * @param {Object} config The config object
 */

Roo.bootstrap.HtmlEditor = function(config){
    Roo.bootstrap.HtmlEditor.superclass.constructor.call(this, config);
    if (!this.toolbars) {
        this.toolbars = [];
    }
    this.editorcore = new Roo.HtmlEditorCore(Roo.apply({ owner : this} , config));
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
            savedpreview: true
        });
};


Roo.extend(Roo.bootstrap.HtmlEditor, Roo.bootstrap.TextArea,  {
    
    
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
    
    toolbarContainer :function() {
        return this.wrap.select('.x-html-editor-tb',true).first();
    },

    /**
     * Protected method that will not generally be called directly. It
     * is called when the editor creates its toolbar. Override this method if you need to
     * add custom toolbar buttons.
     * @param {HtmlEditor} editor
     */
    createToolbar : function(){
        
        Roo.log("create toolbars");
        
        this.toolbars = [ new Roo.bootstrap.HtmlEditor.ToolbarStandard({editor: this} ) ];
        this.toolbars[0].render(this.toolbarContainer());
        
        return;
        
//        if (!editor.toolbars || !editor.toolbars.length) {
//            editor.toolbars = [ new Roo.bootstrap.HtmlEditor.ToolbarStandard() ]; // can be empty?
//        }
//        
//        for (var i =0 ; i < editor.toolbars.length;i++) {
//            editor.toolbars[i] = Roo.factory(
//                    typeof(editor.toolbars[i]) == 'string' ?
//                        { xtype: editor.toolbars[i]} : editor.toolbars[i],
//                Roo.bootstrap.HtmlEditor);
//            editor.toolbars[i].init(editor);
//        }
    },

     
    // private
    onRender : function(ct, position)
    {
       // Roo.log("Call onRender: " + this.xtype);
        var _t = this;
        Roo.bootstrap.HtmlEditor.superclass.onRender.call(this, ct, position);
      
        this.wrap = this.inputEl().wrap({
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
       
        
        if(!this.width && this.resizable){
            this.setSize(this.wrap.getSize());
        }
        if (this.resizeEl) {
            this.resizeEl.resizeTo.defer(100, this.resizeEl,[ this.width,this.height ] );
            // should trigger onReize..
        }
        
//        if(this.autosave && this.w){
//            this.autoSaveFn = setInterval(this.autosave, 1000);
//        }
    },

    // private
    onResize : function(w, h)
    {
        Roo.log('resize: ' +w + ',' + h );
        Roo.bootstrap.HtmlEditor.superclass.onResize.apply(this, arguments);
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
            this.editorcore.syncValue();
            this.inputEl().removeClass('hide');
            this.inputEl().dom.removeAttribute('tabIndex');
            this.inputEl().focus();
        }else{
            Roo.log('editor - hiding textarea');
//            Roo.log('out')
//            Roo.log(this.pushValue()); 
            this.editorcore.pushValue();
            
            this.inputEl().addClass('hide');
            this.inputEl().dom.setAttribute('tabIndex', -1);
            //this.deferFocus();
        }
         
        if(!this.resiable)
        this.setSize(this.wrap.getSize());
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
        Roo.bootstrap.HtmlEditor.superclass.setValue.call(this, v);
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
 
    
   
   
   
    