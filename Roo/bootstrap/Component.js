/*
 * - LGPL
 *
 * base class for bootstrap elements.
 * 
 */

Roo.bootstrap = Roo.bootstrap || {};
/**
 * @class Roo.bootstrap.Component
 * @extends Roo.Component
 * Bootstrap Component base class
 * @cfg {String} cls css class
 * @cfg {String} style any extra css
 * @cfg {Object} xattr extra attributes to add to 'element' (used by builder to store stuff.)
 
 * 
 * @constructor
 * Do not use directly - it does not do anything..
 * @param {Object} config The config object
 */



Roo.bootstrap.Component = function(config){
    Roo.bootstrap.Component.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Component, Roo.BoxComponent,  {
    
    
    allowDomMove : false, // to stop relocations in parent onRender...
    
    cls : false,
    
    style : false,
    
    autoCreate : false,
    
    initEvents : function() {  },
    
    xattr : false,
    
    parentId : false,
    
    parent: function() {
        // returns the parent component..
        return Roo.ComponentMgr.get(this.parentId)
        
        
    },
    
    // private
    onRender : function(ct, position)
    {
       // Roo.log("Call onRender: " + this.xtype);
        
        Roo.bootstrap.Component.superclass.onRender.call(this, ct, position);
        
        if(this.el){
            if (this.el.attr('xtype')) {
                this.el.dom.removeAttribute('xtype');
                this.initEvents();
            }
            
            return;
        }
        
         
        
        var cfg = Roo.apply({},  this.getAutoCreate());
        cfg.id = Roo.id();
        
        // fill in the extra attributes 
        if (this.xattr && typeof(this.xattr) =='object') {
            for (var i in this.xattr) {
                cfg[i] = this.xattr[i];
            }
        }
        
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
        
        // render the element if it's not BODY.
        if (tree.xtype != 'Body') {
            
            cn = Roo.factory(tree);
           // Roo.log(cn);
            cn.parentType = this.xtype; //??
            cn.parentId = this.id;
            
            // does the container contain child eleemnts with 'xtype' attributes.
            // that match this xtype..
            // note - when we render we create these as well..
            // so we should check to see if body has xtype set.
            if (Roo.get(document.body).attr('xtype') == 'Roo.bootstrap.Body') {
                
                var echild = Roo.get(this[cntr]()).child('*[xtype]');
                if (echild) {
                  //  Roo.log("found child for " + this.xtype +": " + echild.attr('xtype') );
                    cn.el = echild;
                    //echild.dom.removeAttribute('xtype');
                } else {
                    
                    Roo.log("missing child for " + this.xtype);
                    Roo.log(this.el);
                    Roo.log(cntr);
                   
                }
            }
            cn.render(this[cntr]());
            // then add the element..
        }
        
        
        // handle the kids..
        
        var nitems = [];
        if (typeof (tree.menu) != 'undefined') {
            tree.menu.parentType = cn.xtype;
            tree.menu.triggerEl = cn.el;
            nitems.push(cn.addxtype(Roo.apply({}, tree.menu)));
            
        }
        
        if (!tree.items || !tree.items.length) {
            cn.items = nitems;
            return cn;
        }
        var items = tree.items;
        delete tree.items;
        
        //Roo.log(items.length);
            // add the items..
        for(var i =0;i < items.length;i++) {
            nitems.push(cn.addxtype(Roo.apply({}, items[i])));
        }
	
        cn.items = nitems;
	
	
        return cn;
    }
    
    
    
    
});

 