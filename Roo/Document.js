/*
 * Original code for Roojs - LGPL
 * <script type="text/javascript">
 */
 
/**
 * 
 * This needs some more thought..
 * 
 *
 * 
 * 
 * 
 * @class Roo.XComponent
 * @extends Roo.data.Observable
 * 
 * A delayed Element creator...
 * 
 * Mypart.xyx = new Roo.XComponent({

    parent : 'Mypart.xyz', // empty == document.element.!!
    order : '001',
    name : 'xxxx'
    region : 'xxxx'
    disabled : function() {} 
     
    items : [  // technically only one component..
        {
            xtype : 'NestedLayoutPanel',
            // technicall
        }
     ]
 *})
 * 
 * 
 * 
 */
Roo.XComponent = function(cfg) {
    Roo.apply(this, cfg);
    this.addEvents({ 
        /**
	     * @event built
	     * Fires when this the componnt is built
	     * @param {Button} this
	     * @param {EventObject} e The click event
	     */
        'built' : true
    });

    Roo.XComponent.register(this);
    this.modules = [];
     
    
    
}
Roo.extend(Roo.XComponent, Roo.util.Observable {
    panel : false,
    layout : false,
    
});

Roo.apply(Roo.XComponent, 
    /**
     * @property  buildCompleted
     * True when the builder has completed building the interface.
     * @type Boolean
     */
    buildCompleted : false,
     
    /**
     * @property  topModule
     * the upper most module - uses document.element as it's constructor.
     * @type Object
     */
     
    topModule  : false,
      
    /**
     * @property  modules
     * array of modules to be created by registration system.
     * @type Roo.XComponent
     */
    
    modules : [],
      
    
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
          parent : 'Pman.layout',
          disabled : false,  // or use a function..
        })
     * 
     */
    register : function(obj) {
        this.modules.push(obj);
         
    },
    /**
     * convert a string to an object..
     * 
     */
    
    toObject : function(str)
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
    
    
    /**
     * move modules into their correct place in the tree..
     * 
     */
    preBuild : function ()
    {
        var modules = this.modules;
        this.modules = false;
        
        Roo.each(modules , function (obj)
        {
            obj.parent = this.toObject(obj.parent);
            
            if (!obj.parent) {
                this.topModule = obj;
                return;
            }
            obj.parent = toObject(obj.parent);
            if (!obj.parent.modules) {
                obj.parent.modules = new Roo.util.MixedCollection(false, function(o) { return o.order + '' });
            }
            
            obj.parent.modules.add(obj);
        }, this);
    }
    
    
     /**
     * Build the registered modules.
     * @param {Object} parent element.
     * @param {Function} optional method to call after module has been added.
     * 
     */ 
   
    build : function() 
    {
        
        this.preBuild();
        
        var _this = this;
        var cmp = function(a,b) {   
            return String(a).toUpperCase() > String(b).toUpperCase() ? 1 : -1;
        };
        
        if (!parent.modules) {
            return;
        }
       
        // make a flat list in order of modules to build.
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
        parent.modules.keySort('ASC',  cmp );
        parent.modules.each(addMod);
        //this.allmods = mods;
        //console.log(mods);
        //return;
        if (!mods.length) { // should not happen
            throw "NO modules!!!";
        }
        // flash it up as modal - so we store the mask!?
        Roo.MessageBox.show({ title: 'loading' });
        Roo.MessageBox.show({
           title: "Please wait...",
           msg: "Building Interface...",
           width:450,
           progress:true,
           closable:false,
           modal: false
          
        });
        var n = -1;
        var _this = this;
        var progressRun = function() {
            n++;
            if (n >= mods.length) {
                Roo.MessageBox.hide();
                _this.topModule.fireEvent('built', _this.topModule);
                return;
            }
            
            var m = mods[n];
            
            
            Roo.MessageBox.updateProgress(
                (n+1)/mods.length,  "Building Interface " + (n+1) + 
                    " of " + mods.length + 
                    (m.name ? (' - ' + m.name) : '')
                    );
            
            if (typeof(m) == 'function') {
                m.call(this);
                progressRun.defer(10, _this);    
                return;
            } 
            var disabled = (typeof(m.module.disabled) == 'function') ?
                m.module.disabled.call(m.module.disabled) : m.module.disabled;
                
            }
            
            if (m.parent.layout && !disabled) {
                // modules have to support a  'add method'
                // should we just move that code into here..
                m.module.add(m.parent.layout, m.region);    
            }
                 
             
            
        }
        progressRun.defer(1, _this);
     
        
        
    }
     
   
    
    
});
 