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
 * @class Roo.form.TextItem
 * @extends Roo.BoxComponent
 * Base class for form fields that provides default event handling, sizing, value handling and other functionality.
 * @constructor
 * Creates a new TextItem
 * @param {Object} config Configuration options
 */
Roo.form.TextItem = function(config){
    Roo.form.TextItem.superclass.constructor.call(this, config);
};

Roo.extend(Roo.form.TextItem, Roo.BoxComponent,  {
    
    /**
     * @cfg {String} tag the tag for this item (default div)
     */
    tag : 'div',
    /**
     * @cfg {String} html the content for this item
     */
    html : '',
    /**
     * @cfg {String} cls the class for this item
     */
    cls : '',
    
    getAutoCreate : function()
    {
        var cfg = {
            id: this.id,
            tag: this.tag,
            html: this.html
        }
        
        if(this.cls) {
            cfg.cls = this.cls;
        }
        
        return cfg;
    }
});