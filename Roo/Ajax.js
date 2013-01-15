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
 * Global Ajax request class.
 * 
 * @class Roo.Ajax
 * @extends Roo.data.Connection
 * @static
 * 
 * @cfg {String} url  The default URL to be used for requests to the server. (defaults to undefined)
 * @cfg {Object} extraParams  An object containing properties which are used as extra parameters to each request made by this object. (defaults to undefined)
 * @cfg {Object} defaultHeaders  An object containing request headers which are added to each request made by this object. (defaults to undefined)
 * @cfg {String} method (Optional)  The default HTTP method to be used for requests. (defaults to undefined; if not set but parms are present will use POST, otherwise GET)
 * @cfg {Number} timeout (Optional) The timeout in milliseconds to be used for requests. (defaults to 30000)
 * @cfg {Boolean} autoAbort (Optional) Whether a new request should abort any pending requests. (defaults to false)
 * @cfg {Boolean} disableCaching (Optional)   True to add a unique cache-buster param to GET requests. (defaults to true)
 */

/**
 * @class Roo.Ajax
 * @extends Roo.data.Connection
 * Global Ajax request class.
 *
 * @singleton
 */
Roo.Ajax = new Roo.data.Connection({
    
    autoAbort : false,

    /**
     * Serialize the passed form into a url encoded string
     * @param {String/HTMLElement} form
     * @return {String}
     */
    serializeForm : function(form){
        return Roo.lib.Ajax.serializeForm(form);
    }
});