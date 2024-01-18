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
 * @class Roo.state.Manager
 * This is the global state manager. By default all components that are "state aware" check this class
 * for state information if you don't pass them a custom state provider. In order for this class
 * to be useful, it must be initialized with a provider when your application initializes.
 <pre><code>
// in your initialization function
init : function(){
   Roo.state.Manager.setProvider(new Roo.state.CookieProvider());
   ...
   // supposed you have a {@link Roo.layout.Border}
   var layout = new Roo.layout.Border(...);
   layout.restoreState();
   // or a {Roo.BasicDialog}
   var dialog = new Roo.BasicDialog(...);
   dialog.restoreState();
 </code></pre>
 * @static
 */
Roo.state.Manager = function(){
    var provider = new Roo.state.Provider();
    
    return {
        /**
         * Configures the default state provider for your application
         * @param {Provider} stateProvider The state provider to set
         */
        setProvider : function(stateProvider){
            provider = stateProvider;
        },
        
        /**
         * Returns the current value for a key
         * @param {String} name The key name
         * @param {Mixed} defaultValue The default value to return if the key lookup does not match
         * @return {Mixed} The state data
         */
        get : function(key, defaultValue){
            return provider.get(key, defaultValue);
        },
        
        /**
         * Sets the value for a key
         * @param {String} name The key name
         * @param {Mixed} value The state data
         */
         set : function(key, value){
            provider.set(key, value);
        },
        
        /**
         * Clears a value from the state
         * @param {String} name The key name
         */
        clear : function(key){
            provider.clear(key);
        },
        
        /**
         * Gets the currently configured state provider
         * @return {Provider} The state provider
         */
        getProvider : function(){
            return provider;
        }
    };
}();
