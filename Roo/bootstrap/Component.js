/*
 * - LGPL
 *
 * base class for bootstrap elements..
 * 
 */

Roo.bootstrap = Roo.bootstrap || {};
/**
 * @class Roo.bootstrap.Component
 * @extends Roo.Component
 * Bootstrap Component base class
 * @cfg {String} cls css class
 * @cfg {String} style any extra css
 * 
 * @constructor
 * Do not use directly - it does not do anything..
 * @param {Object} config The config object
 */



Roo.bootstrap.Component = function(config){
    Roo.bootstrap.Component.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Component, Roo.BoxComponent,  {
      
	cls : false,
    
    style : false,
    
    autoCreate : false,
    
    initEvents : function() {  },
    
    parentId : false,
    
    parent: function() {
        // returns the parent component..
        return Roo.ComponentMgr.get(this.parentId)
        
        
    },
    
    // private
    onRender : function(ct, position)
    {
        Roo.bootstrap.Component.superclass.onRender.call(this, ct, position);
        if(this.el){
            return;
        }
        var cfg = Roo.apply({},  this.getAutoCreate());
        cfg.id = Roo.id();
        
        if (this.cls) {
            cfg.cls += ' ' + this.cls;
        }
        if (this.style) { // fixme needs to support more complex style data.
            cfg.style = this.style;
        }
        this.el = ct.createChild(cfg, position);
        if(this.tabIndex !== undefined){
            this.el.dom.setAttribute('tabIndex', this.tabIndex);
        }
        this.initEvents();
    
        
    },
    getChildContainer : function()
    {
        return this.el;
    },
    
    addxtype : function (tree, cntr) {
        var cn = this;
        cntr = typeof(cntr == 'undefined' ) ? 'getChildContainer' : cntr;
        
        if (tree.xtype != 'Body') {
            
            cn = Roo.factory(tree);
            
            cn.parentType = this.xtype; //??
            cn.parentId = this.id;
            cn.render(this[cntr]());
            // then add the element..
        }
        var nitems = [];
        if (typeof (tree.menu) != 'undefined') {
            tree.menu.parentType = cn.xtype;
            tree.menu.triggerEl = cn.el;
            nitems.push(cn.addxtype(Roo.apply({}, tree.menu)));
            
        }
        if (typeof (tree.buttons) != 'undefined' && typeof(cn.getButtonContainer) == 'function') {
            
            for(var i =0;i < items.length;i++) {
                nitems.push(cn.addxtype(Roo.apply({}, items[i]), 'getButtonContainer'));
            }
            
            
        }
        if (!tree.items || !tree.items.length) {
            this.items = nitems;
            return this;
        }
        var items = tree.items;
        delete tree.items;
        
        //Roo.log(items.length);
            // add the items..
        for(var i =0;i < items.length;i++) {
            nitems.push(cn.addxtype(Roo.apply({}, items[i])));
        }
    
        this.items = nitems;
	
	
        return this;
    }
    
     
 
    
});

 