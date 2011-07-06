/*
 * Original code for Roojs - LGPL
 * <script type="text/javascript">
 */
 
/**
 * @class Roo.XComponent
 * A delayed Element creator...
 * 
 * Mypart.xyx = new Roo.XComponent({

    parent : 'Mypart.xyz', // empty == document.element.!!
    order : '001',
    name : 'xxxx'
    region : 'xxxx'
    disabled : function() {} 
     
    tree : function() { // return an tree of xtype declared components
        var MODULE = this;
        return 
        {
            xtype : 'NestedLayoutPanel',
            // technicall
        }
     ]
 *})
 *
 *
 * It can be used to build a big heiracy,
 * or you can use
 * MYPART.renderTo(Roo.Element | String(id) | dom_element )
 * 
 *
 * @extends Roo.util.Observable
 * @constructor
 * @param cfg {Object} configuration of component
 * 
 */
Roo.XComponent = function(cfg) {
    Roo.apply(this, cfg);
    this.addEvents({ 
        /**
	     * @event built
	     * Fires when this the componnt is built
	     * @param {Roo.XComponent} c the component
	     */
        'built' : true,
        /**
	     * @event buildcomplete
	     * Fires on the top level element when all elements have been built
	     * @param {Roo.XComponent} c the top level component.
         */
        'buildcomplete' : true
        
    });
    
    Roo.XComponent.register(this);
    this.modules = false;
    this.el = false; // where the layout goes..
    
    
}
Roo.extend(Roo.XComponent, Roo.util.Observable, {
    /**
     * @property el
     * The created element (with Roo.factory())
     * @type {Roo.Layout}
     */
    el  : false,
    
    /**
     * @property el
     * for BC  - use el in new code
     * @type {Roo.Layout}
     */
    panel : false,
    
    /**
     * @property layout
     * for BC  - use el in new code
     * @type {Roo.Layout}
     */
    layout : false,
    
     /**
     * @cfg {Function|boolean} disabled
     * If this module is disabled by some rule, return true from the funtion
     */
    disabled : false,
    
    /**
     * @cfg {String} parent 
     * Name of parent element which it get xtype added to..
     */
    parent: false,
    
    /**
     * @cfg {String} order
     * Used to set the order in which elements are created (usefull for multiple tabs)
     */
    
    order : false,
    /**
     * @cfg {String} name
     * String to display while loading.
     */
    name : false,
    /**
     * @cfg {String} region
     * Region to render component to (defaults to center)
     */
    region : 'center',
    
    /**
     * @cfg {Array} items
     * A single item array - the first element is the root of the tree..
     * It's done this way to stay compatible with the Xtype system...
     */
    items : false,
    
    
     /**
     * render
     * render element to dom or tree
     * @param {Roo.Element|String|DomElement} optional render to if parent is not set.
     */
    
    render : function(el)
    {
        
        if (!this.parent) {
            
            el = el ? Roo.get(el) : false;
            
            
            // it's a top level one..
            this.parent =  {
                el : new Ext.BorderLayout(el || document.body, {
                
                     center: {
                         titlebar: false,
                         autoScroll:false,
                         closeOnTab: true,
                         tabPosition: 'top',
                          //resizeTabs: true,
                         alwaysShowTabs: el ? false :  true,
                         minTabWidth: 140
                     }
                 })
            }
        }
            
        var tree = this.tree();
        tree.region = tree.region || this.region;
        this.el = this.parent.el.addxtype(tree);
        this.fireEvent('built', this);
        
        this.panel = this.el;
        this.layout = this.panel.layout;    
         
    }
    
     
     
    
});

Roo.apply(Roo.XComponent, {
    
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
     
     * * @param {Object} details about module
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
        if (!str || typeof(str) == 'object') {
            return str;
        }
        var ar = str.split('.');
        var rt, o;
        rt = ar.shift();
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
        
    },
    
    
    /**
     * move modules into their correct place in the tree..
     * 
     */
    preBuild : function ()
    {
        
        Roo.each(this.modules , function (obj)
        {
            obj.parent = this.toObject(obj.parent);
            
            if (!obj.parent) {
                this.topModule = obj;
                return;
            }
            
            if (!obj.parent.modules) {
                obj.parent.modules = new Roo.util.MixedCollection(false, 
                    function(o) { return o.order + '' }
                );
            }
            
            obj.parent.modules.add(obj);
        }, this);
    },
    
     /**
     * make a list of modules to build.
     * @return {Array} list of modules. 
     */ 
    
    buildOrder : function()
    {
        var _this = this;
        var cmp = function(a,b) {   
            return String(a).toUpperCase() > String(b).toUpperCase() ? 1 : -1;
        };
        
        if (!this.topModule || !this.topModule.modules) {
            throw "No top level modules to build";
        }
       
        // make a flat list in order of modules to build.
        var mods = [ this.topModule ];
        
        
        // add modules to their parents..
        var addMod = function(m) {
           // Roo.debug && Roo.log(m.modKey);
            
            mods.push(m);
            if (m.modules) {
                m.modules.keySort('ASC',  cmp );
                m.modules.each(addMod);
            }
            // not sure if this is used any more..
            if (m.finalize) {
                m.finalize.name = m.name + " (clean up) ";
                mods.push(m.finalize);
            }
            
        }
        this.topModule.modules.keySort('ASC',  cmp );
        this.topModule.modules.each(addMod);
        return mods;
    },
    
     /**
     * Build the registered modules.
     * @param {Object} parent element.
     * @param {Function} optional method to call after module has been added.
     * 
     */ 
   
    build : function() 
    {
        
        this.preBuild();
        var mods = this.buildOrder();
      
        //this.allmods = mods;
        //Roo.debug && Roo.log(mods);
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
        var total = mods.length;
        
        var _this = this;
        var progressRun = function() {
            if (!mods.length) {
                Roo.debug && Roo.log('hide?');
                Roo.MessageBox.hide();
                _this.topModule.fireEvent('buildcomplete', _this.topModule);
                return flase;    
            }
            
            var m = mods.shift();
            
            
            Roo.debug && Roo.log(m);
            // not sure if this is supported any more.. - modules that are are just function
            if (typeof(m) == 'function') { 
                m.call(this);
                return progressRun.defer(10, _this);
            } 
            
            
            
            Roo.MessageBox.updateProgress(
                (total  - mods.length)/total,  "Building Interface " + (total  - mods.length) + 
                    " of " + total + 
                    (m.name ? (' - ' + m.name) : '')
                    );
            
         
            // is the module disabled?
            var disabled = (typeof(m.disabled) == 'function') ?
                m.disabled.call(m.module.disabled) : m.disabled;    
            
            
            if (disabled) {
                return progressRun(); // we do not update the display!
            }
            
            // now build 
            
            m.render();
            // it's 10 on top level, and 1 on others??? why...
            return progressRun.defer(10, _this);
             
        }
        progressRun.defer(1, _this);
     
        
        
    }
    
     
   
    
    
});
 