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
    
    getAutoCreate : function()
    {
        var cfg = {
            id: this.id,
            tag: this.tag,
            html: this.html,
            cls: 'x-form-item'
        };
        
        return cfg;
        
    },
    
    onRender : function(ct, position)
    {
        Roo.form.TextItem.superclass.onRender.call(this, ct, position);
        
        if(!this.el){
            var cfg = this.getAutoCreate();
            if(!cfg.name){
                cfg.name = typeof(this.name) == 'undefined' ? this.id : this.name;
            }
            if (!cfg.name.length) {
                delete cfg.name;
            }
            this.el = ct.createChild(cfg, position);
        }
    },
    /*
     * setHTML
     * @param {String} html update the Contents of the element.
     */
    setHTML : function(html)
    {
        this.fieldEl.dom.innerHTML = html;
    }
    
});