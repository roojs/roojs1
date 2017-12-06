/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 
/**
 * @class Roo.LoadMask
 * A simple utility class for generically masking elements while loading data.  If the element being masked has
 * an underlying {@link Roo.data.Store}, the masking will be automatically synchronized with the store's loading
 * process and the mask element will be cached for reuse.  For all other elements, this mask will replace the
 * element's UpdateManager load indicator and will be destroyed after the initial load.
 * @constructor
 * Create a new LoadMask
 * @param {String/HTMLElement/Roo.Element} el The element or DOM node, or its id
 * @param {Object} config The config object
 */
Roo.LoadMask = function(el, config){
    this.el = Roo.get(el);
    Roo.apply(this, config);
    if(this.store){
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.on('load', this.onLoad, this);
        this.store.on('loadexception', this.onLoadException, this);
        this.removeMask = false;
    }else{
        var um = this.el.getUpdateManager();
        um.showLoadIndicator = false; // disable the default indicator
        um.on('beforeupdate', this.onBeforeLoad, this);
        um.on('update', this.onLoad, this);
        um.on('failure', this.onLoad, this);
        this.removeMask = true;
    }
};

Roo.LoadMask.prototype = {
    /**
     * @cfg {Boolean} removeMask
     * True to create a single-use mask that is automatically destroyed after loading (useful for page loads),
     * False to persist the mask element reference for multiple uses (e.g., for paged data widgets).  Defaults to false.
     */
    /**
     * @cfg {String} msg
     * The text to display in a centered loading message box (defaults to 'Loading...')
     */
    msg : 'Loading...',
    /**
     * @cfg {String} msgCls
     * The CSS class to apply to the loading message element (defaults to "x-mask-loading")
     */
    msgCls : 'x-mask-loading',

    /**
     * Read-only. True if the mask is currently disabled so that it will not be displayed (defaults to false)
     * @type Boolean
     */
    disabled: false,

    /**
     * Disables the mask to prevent it from being displayed
     */
    disable : function(){
       this.disabled = true;
    },

    /**
     * Enables the mask so that it can be displayed
     */
    enable : function(){
        this.disabled = false;
    },
    
    onLoadException : function()
    {
        Roo.log(arguments);
        
        if (typeof(arguments[3]) != 'undefined') {
            Roo.MessageBox.alert("Error loading",arguments[3]);
        } 
        /*
        try {
            if (this.store && typeof(this.store.reader.jsonData.errorMsg) != 'undefined') {
                Roo.MessageBox.alert("Error loading",this.store.reader.jsonData.errorMsg);
            }   
        } catch(e) {
            
        }
        */
    
        
        
        this.el.unmask(this.removeMask);
    },
    // private
    onLoad : function()
    {
        this.el.unmask(this.removeMask);
    },

    // private
    onBeforeLoad : function(){
        if(!this.disabled){
            this.el.mask(this.msg, this.msgCls).defer(100);
        }
    },

    // private
    destroy : function(){
        if(this.store){
            this.store.un('beforeload', this.onBeforeLoad, this);
            this.store.un('load', this.onLoad, this);
            this.store.un('loadexception', this.onLoadException, this);
        }else{
            var um = this.el.getUpdateManager();
            um.un('beforeupdate', this.onBeforeLoad, this);
            um.un('update', this.onLoad, this);
            um.un('failure', this.onLoad, this);
        }
    }
};