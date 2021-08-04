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
 * @class Roo.ComponentMgr
 * Provides a common registry of all components on a page so that they can be easily accessed by component id (see {@link Roo.getCmp}).
 * @static
 */
Roo.ComponentMgr = function(){
    var all = new Roo.util.MixedCollection();

    return {
        /**
         * Registers a component.
         * @param {Roo.Component} c The component
         */
        register : function(c){
            all.add(c);
        },

        /**
         * Unregisters a component.
         * @param {Roo.Component} c The component
         */
        unregister : function(c){
            all.remove(c);
        },

        /**
         * Returns a component by id
         * @param {String} id The component id
         */
        get : function(id){
            return all.get(id);
        },

        /**
         * Registers a function that will be called when a specified component is added to ComponentMgr
         * @param {String} id The component id
         * @param {Funtction} fn The callback function
         * @param {Object} scope The scope of the callback
         */
        onAvailable : function(id, fn, scope){
            all.on("add", function(index, o){
                if(o.id == id){
                    fn.call(scope || o, o);
                    all.un("add", fn, scope);
                }
            });
        }
    };
}();