/*
 * Original code for Roojs - LGPL
 * <script type="text/javascript">
 */
 
/**
 * @class Roo.XComponent
 * A delayed Element creator...
 * Or a way to group chunks of interface together.
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
 * It can be used to build a big heiracy, with parent etc.
 * or you can just use this to render a single compoent to a dom element
 * MYPART.render(Roo.Element | String(id) | dom_element )
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
        'built' : true
        
    });
    this.region = this.region || 'center'; // default..
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
     * @property _tree
     * The method that retuns the tree of parts that make up this compoennt 
     * @type {function}
     */
    _tree  : false,
    
     /**
     * render
     * render element to dom or tree
     * @param {Roo.Element|String|DomElement} optional render to if parent is not set.
     */
    
    render : function(el)
    {
        
        el = el || false;
        var hp = this.parent ? 1 : 0;
        
        if (!el && typeof(this.parent) == 'string' && this.parent.substring(0,1) == '#') {
            // if parent is a '#.....' string, then let's use that..
            var ename = this.parent.substr(1)
            this.parent = (this.parent == '#bootstrap') ? { el : true}  : false; // flags it as a top module...
            el = Roo.get(ename);
            if (!el && !this.parent) {
                Roo.log("Warning - element can not be found :#" + ename );
                return;
            }
        }
        
        
        if (!this.parent) {
            
            el = el ? Roo.get(el) : false; 	
            
            // it's a top level one..
            this.parent =  {
                el : new Roo.BorderLayout(el || document.body, {
                
                     center: {
                         titlebar: false,
                         autoScroll:false,
                         closeOnTab: true,
                         tabPosition: 'top',
                          //resizeTabs: true,
                         alwaysShowTabs: el && hp? false :  true,
                         hideTabs: el || !hp ? true :  false,
                         minTabWidth: 140
                     }
                 })
            }
        }
        
		if (!this.parent.el) {
			// probably an old style ctor, which has been disabled.
			return;
			
		}
		// The 'tree' method is  '_tree now' 
            
        var tree = this._tree ? this._tree() : this.tree();
        tree.region = tree.region || this.region;
        if (this.parent.el === true) {
            // bootstrap... - body..
            this.parent.el = Roo.factory(tree);
        }
        this.el = this.parent.el.addxtype(tree);
        this.fireEvent('built', this);
        
        this.panel = this.el;
        this.layout = this.panel.layout;
		this.parentLayout = this.parent.layout  || false;  
         
    }
    
});

Roo.apply(Roo.XComponent, {
    /**
     * @property  hideProgress
     * true to disable the building progress bar.. usefull on single page renders.
     * @type Boolean
     */
    hideProgress : false,
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
     * @type {Array} of Roo.XComponent
     */
    
    modules : [],
    /**
     * @property  elmodules
     * array of modules to be created by which use #ID 
     * @type {Array} of Roo.XComponent
     */
     
    elmodules : [],

    
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
		
        Roo.XComponent.event.fireEvent('register', obj);
        switch(typeof(obj.disabled) ) {
                
            case 'undefined':
                break;
            
            case 'function':
                if ( obj.disabled() ) {
                        return;
                }
                break;
            
            default:
                if (obj.disabled) {
                        return;
                }
                break;
        }
		
        this.modules.push(obj);
         
    },
    /**
     * convert a string to an object..
     * eg. 'AAA.BBB' -> finds AAA.BBB

     */
    
    toObject : function(str)
    {
        if (!str || typeof(str) == 'object') {
            return str;
        }
        if (str.substring(0,1) == '#') {
            return str;
        }

        var ar = str.split('.');
        var rt, o;
        rt = ar.shift();
            /** eval:var:o */
        try {
            eval('if (typeof ' + rt + ' == "undefined"){ o = false;} o = ' + rt + ';');
        } catch (e) {
            throw "Module not found : " + str;
        }
        
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
        var _t = this;
        Roo.each(this.modules , function (obj)
        {
            Roo.XComponent.event.fireEvent('beforebuild', obj);
            
            var opar = obj.parent;
            try { 
                obj.parent = this.toObject(opar);
            } catch(e) {
                Roo.log("parent:toObject failed: " + e.toString());
                return;
            }
            
            if (!obj.parent) {
                Roo.debug && Roo.log("GOT top level module");
                Roo.debug && Roo.log(obj);
                obj.modules = new Roo.util.MixedCollection(false, 
                    function(o) { return o.order + '' }
                );
                this.topModule = obj;
                return;
            }
			// parent is a string (usually a dom element name..)
            if (typeof(obj.parent) == 'string') {
                this.elmodules.push(obj);
                return;
            }
            if (obj.parent.constructor != Roo.XComponent) {
                Roo.log("Warning : Object Parent is not instance of XComponent:" + obj.name)
            }
            if (!obj.parent.modules) {
                obj.parent.modules = new Roo.util.MixedCollection(false, 
                    function(o) { return o.order + '' }
                );
            }
            if (obj.parent.disabled) {
                obj.disabled = true;
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
        if ((!this.topModule || !this.topModule.modules) && !this.elmodules.length) {
            throw "No top level modules to build";
        }
        
        // make a flat list in order of modules to build.
        var mods = this.topModule ? [ this.topModule ] : [];
		
        
	// elmodules (is a list of DOM based modules )
        Roo.each(this.elmodules, function(e) {
            mods.push(e);
            if (!this.topModule &&
                typeof(e.parent) == 'string' &&
                e.parent.substring(0,1) == '#' &&
                Roo.get(e.parent.substr(1))
               ) {
                
                _this.topModule = e;
            }
            
        });

        
        // add modules to their parents..
        var addMod = function(m) {
            Roo.debug && Roo.log("build Order: add: " + m.name);
                
            mods.push(m);
            if (m.modules && !m.disabled) {
                Roo.debug && Roo.log("build Order: " + m.modules.length + " child modules");
                m.modules.keySort('ASC',  cmp );
                Roo.debug && Roo.log("build Order: " + m.modules.length + " child modules (after sort)");
    
                m.modules.each(addMod);
            } else {
                Roo.debug && Roo.log("build Order: no child modules");
            }
            // not sure if this is used any more..
            if (m.finalize) {
                m.finalize.name = m.name + " (clean up) ";
                mods.push(m.finalize);
            }
            
        }
        if (this.topModule && this.topModule.modules) { 
            this.topModule.modules.keySort('ASC',  cmp );
            this.topModule.modules.each(addMod);
        } 
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
        
        
        var msg = "Building Interface...";
        // flash it up as modal - so we store the mask!?
        if (!this.hideProgress && Roo.MessageBox) {
            Roo.MessageBox.show({ title: 'loading' });
            Roo.MessageBox.show({
               title: "Please wait...",
               msg: msg,
               width:450,
               progress:true,
               closable:false,
               modal: false
              
            });
        }
        var total = mods.length;
        
        var _this = this;
        var progressRun = function() {
            if (!mods.length) {
                Roo.debug && Roo.log('hide?');
                if (!this.hideProgress && Roo.MessageBox) {
                    Roo.MessageBox.hide();
                }
                Roo.XComponent.event.fireEvent('buildcomplete', _this.topModule);
                
                // THE END...
                return false;   
            }
            
            var m = mods.shift();
            
            Roo.log('m');
            Roo.log(m);
            Roo.debug && Roo.log(m);
            // not sure if this is supported any more.. - modules that are are just function
            if (typeof(m) == 'function') { 
                m.call(this);
                return progressRun.defer(10, _this);
            } 
            
            
            msg = "Building Interface " + (total  - mods.length) + 
                    " of " + total + 
                    (m.name ? (' - ' + m.name) : '');
			Roo.debug && Roo.log(msg);
            if (!this.hideProgress &&  Roo.MessageBox) { 
                Roo.MessageBox.updateProgress(  (total  - mods.length)/total, msg  );
            }
            
            Roo.log('msg');
            Roo.log(msg);
         
            // is the module disabled?
            var disabled = (typeof(m.disabled) == 'function') ?
                m.disabled.call(m.module.disabled) : m.disabled;    
            
            Roo.log('disabled');
            Roo.log(disabled);
            if (disabled) {
                return progressRun(); // we do not update the display!
            }
            
            // now build 
            
		Roo.log('m');
                Roo.log(m)
			
            m.render();
            // it's 10 on top level, and 1 on others??? why...
            return progressRun.defer(10, _this);
             
        }
        progressRun.defer(1, _this);
     
        
        
    },
	
	
	/**
	 * Event Object.
	 *
	 *
	 */
	event: false, 
    /**
	 * wrapper for event.on - aliased later..  
	 * Typically use to register a event handler for register:
	 *
	 * eg. Roo.XComponent.on('register', function(comp) { comp.disable = true } );
	 *
	 */
    on : false
   
    
    
});

Roo.XComponent.event = new Roo.util.Observable({
		events : { 
			/**
			 * @event register
			 * Fires when an Component is registered,
			 * set the disable property on the Component to stop registration.
			 * @param {Roo.XComponent} c the component being registerd.
			 * 
			 */
			'register' : true,
            /**
			 * @event beforebuild
			 * Fires before each Component is built
			 * can be used to apply permissions.
			 * @param {Roo.XComponent} c the component being registerd.
			 * 
			 */
			'beforebuild' : true,
			/**
			 * @event buildcomplete
			 * Fires on the top level element when all elements have been built
			 * @param {Roo.XComponent} the top level component.
			 */
			'buildcomplete' : true
			
		}
});

Roo.XComponent.on = Roo.XComponent.event.on.createDelegate(Roo.XComponent.event); 
 