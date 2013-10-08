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
 * @class Roo.form.Signature
 * @extends Roo.form.Field
 * Signature field.  
 * @constructor
 * 
 * @param {Object} config Configuration options
 */

Roo.form.Signature = function(config){
    Roo.form.Signature.superclass.constructor.call(this, config);
};

Roo.extend(Roo.form.Signature, Roo.form.Field,  {
    /**
     * @cfg {Boolean} grow True if this field should automatically grow and shrink to its content
     */
    grow : false,
    /**
     * @cfg {Number} growMin The minimum width to allow when grow = true (defaults to 30)
     */
    growMin : 30,
    
    // private
    initEvents : function()
    {
        
    }
});