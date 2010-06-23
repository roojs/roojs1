/*
 * Original code for Roojs - LGPL
 * <script type="text/javascript">
 */
 
/**
 * @class Roo.Documents
 * @extends Roo.data.Observable
 * 
 * Document and interface builder class..
 * 
 * MyApp = new Roo.Document({
 *     loadingIndicator : 'loading',
 *     listeners :  Roo.Login.onLoad();
 * });
 * 
 * MyApp.on('beforeload', function() {
 *      MyApp.register()
 
 * 
 * 
 * 
 */
Roo.Document = function(cfg) {
     
    this.addEvents({ 
        'ready' : true,
        'beforeload' : true, // fired after page ready, before module building.
        'load' : true, // fired after module building
        'authrefreshed' : true // fire on auth updated?? - should be on Login?!?!?
        
    });
    Roo.util.Observable.call(this,cfg);
    var _this = this;
    Roo.onReady(function() {
        _this.fireEvent('ready');
    },null,false);
    
    this.on('ready', onReady, this);
    this.on('load', onLoad, this);  
    
}
Roo.extend(Roo.Document, Roo.util.Observable, {
    /**
     * @property  buildCompleted
     * True when the builder has completed building the interface.
     * @type Boolean
     */
    buildCompleted : false,
     /**
     * @property  loadingIndicator
     * ID of loading indictor element.
     * @type String
     */
    loadingIndicator : false,
    
      
    // protected - on Ready handler.
    onReady :   function()
    {
        // kludge to fix firebug debugger
        if (typeof(console) == 'undefined') {
            console = { log : function() {  } };
        }
        
    
        // init cookies..
        Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
            
        // link errors...
        
      
       
            
    },
     
},
   
    
    
});
 