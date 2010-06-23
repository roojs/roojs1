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
    this.modules = [];
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
    /**
     * @property  modules
     * array of modules to be created by registration system.
     * @type Array
     */
    
    modules : false,
      
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
     
    
    
    /**
     * Register components to be built later.
     * @param {Object} details about module
     *
     * This solves the following issues
     * - Building is not done on page load, but after an authentication process has occured.
     * - Interface elements are registered on page load
     * - Parent Interface elements may not be loaded before child, so this handles that..
     * 
     *
     * example:
     * 
     * MyApp.register({
          order : '000001',
          module : 'Pman.Tab.projectMgr',
          region : 'center',
          parent : 'Pman.layout'
        })
     * 
     */
    register : function(obj) {
        this.modules.push(obj);
        
        
    },
    
    
    
    /**
     * move modules into their correct place in the tree..
     * 
     */
    preBuild : function ()
    {
        var modules = this.modules;
        this.modules = false;
        
        function toObject(str)
        {
            if (typeof(str) == 'object') {
                return str;
            }
            var ar = str.split('.');
            var rt, o;
            rt = ar.unshift();
                /** eval:var:o */
            eval('if (typeof ' + rt + ' == "undefined"){ o = false;} o = ' + rt + ';');
            if (o === false) {
                throw "Module not found : " + str;
            }
            Roo.each(ar, function(e) {
                if (typeof(o[e]) == 'undefined') {
                    throw "Module not found : " + str;
                }
                o = o[e];
            });
            return o;
            
        }
        
        Roo.each(modules , function (obj)
        {
            
            obj.parent = toObject(obj.parent);
             
            if (!obj.parent.modules) {
                obj.parent.modules = new Roo.util.MixedCollection(false, function(o) { return o.order + '' });
            }
            
            obj.parent.modules.add(obj);
        }
    }
    
    
     /**
     * Build the registered modules.
     * @param {Object} parent element.
     * @param {Function} optional method to call after module has been added.
     * 
     */ 
   
    build : function(parent, onComplete) 
    {
        
        var _this = this;
        var cmp = function(a,b) {   
            return String(a).toUpperCase() > String(b).toUpperCase() ? 1 : -1;
        };
        
        if (!parent.modules) {
            return;
        }
        parent.modules.keySort('ASC',  cmp );
        var mods = [];
        
        
        // add modules to their parents..
        var addMod = function(m) {
           // console.log(m.modKey);
            
            mods.push(m);
            if (m.module.modules) {
                m.module.modules.keySort('ASC',  cmp );
                m.module.modules.each(addMod);
            }
            if (m.finalize) {
                m.finalize.name = m.name + " (clean up) ";
                mods.push(m.finalize);
            }
            
        }
 
        parent.modules.each(addMod);
        //this.allmods = mods;
        //console.log(mods);
        //return;
        if (!mods.length) {
            if (onComplete) onComplete();
            return;
        }
        // flash it up as modal - so we store the mask!?
        Ext.MessageBox.show({ title: 'loading' });
        Ext.MessageBox.show({
           title: "Please wait...",
           msg: "Building Interface...",
           width:450,
           progress:true,
           closable:false,
           modal: false
          
        });
        var n = 0;
        var progressRun = function() {
            
            var m = mods[n];
            
            
            Ext.MessageBox.updateProgress(
                (n+1)/mods.length,  "Building Interface " + (n+1) + 
                    " of " + mods.length + 
                    (m.name ? (' - ' + m.name) : '')
                    );
            
            
            
            if (typeof(m) == 'function') {
                m();
                
            } else {
                if (m.parent.layout && !m.module.disabled) {
                    m.module.add(m.parent.layout, m.region);    
                }
                
            }
            
            
            n++;
            if (n >= mods.length) {
                onComplete();  
                return;
            }
                
            
            progressRun.defer(10, Pman);    
        }
        progressRun.defer(1, Pman);
     
        
        
    },
    
},
   
    
    
});
 