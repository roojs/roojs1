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
 * @cfg {Boolean} can_build_overlaid  True if element can be rebuild from a HTML page
 * @cfg {string} dataId cutomer id
 * @cfg {string} name Specifies name attribute
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
    
    can_build_overlaid : true,
    
    dataId : false,
    
    name : false,
    
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
                this.el.attr('xtypex', this.el.attr('xtype'));
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
        
        if(this.dataId){
            cfg.dataId = this.dataId;
        }
        
        if (this.cls) {
            cfg.cls = (typeof(cfg.cls) == 'undefined') ? this.cls : cfg.cls + ' ' + this.cls;
        }
        
        if (this.style) { // fixme needs to support more complex style data.
            cfg.style = this.style;
        }
        
        if(this.name){
            cfg.name = this.name;
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
    
    
    addxtype  : function(tree,cntr)
    {
        var cn = this;
        
        cn = Roo.factory(tree);
           
        cn.parentType = this.xtype; //??
        cn.parentId = this.id;
        
        cntr = typeof(cntr == 'undefined' ) ? 'getChildContainer' : cntr;
        
        var has_flexy_each =  (typeof(tree['flexy:foreach']) != 'undefined');
        
        var has_flexy_if =  (typeof(tree['flexy:if']) != 'undefined');
        
        var build_from_html =  Roo.XComponent.build_from_html;
          
        var is_body  = (tree.xtype == 'Body') ;
          
        var page_has_body = (Roo.get(document.body).attr('xtype') == 'Roo.bootstrap.Body');
          
        var self_cntr_el = Roo.get(this[cntr]());
        
        if (!has_flexy_each || !build_from_html || is_body || !page_has_body) {
            if(!has_flexy_if || typeof(tree.name) == 'undefined' || !build_from_html || is_body || !page_has_body){
                return this.addxtypeChild(tree,cntr);
            }
            
            var echild =self_cntr_el ? self_cntr_el.child('>*[name=' + tree.name + ']') : false;
                
            if(echild){
                return this.addxtypeChild(Roo.apply({}, tree),cntr);
            }
            
            Roo.log('skipping render');
            return cn;
            
        }
        
        var ret = false;
        
        while (true) {
            var echild =self_cntr_el ? self_cntr_el.child('>*[xtype]') : false;
            
            if (!echild) {
                break;
            }
            
            if (echild && echild.attr('xtype').split('.').pop() != cn.xtype) {
                break;
            }
            
            ret = this.addxtypeChild(Roo.apply({}, tree),cntr);
        }
        return ret;
    },
    
    addxtypeChild : function (tree, cntr)
    {
        var cn = this;
        cntr = typeof(cntr == 'undefined' ) ? 'getChildContainer' : cntr;
        
        
        var has_flexy = (typeof(tree['flexy:if']) != 'undefined') ||
                    (typeof(tree['flexy:foreach']) != 'undefined');
          
        
        
        
        // render the element if it's not BODY.
        if (tree.xtype != 'Body') {
            Roo.log(tree);
            cn = Roo.factory(tree);
           
            cn.parentType = this.xtype; //??
            cn.parentId = this.id;
            
            var build_from_html =  Roo.XComponent.build_from_html;
            
            
            // does the container contain child eleemnts with 'xtype' attributes.
            // that match this xtype..
            // note - when we render we create these as well..
            // so we should check to see if body has xtype set.
            if (Roo.get(document.body).attr('xtype') == 'Roo.bootstrap.Body') {
               
                var self_cntr_el = Roo.get(this[cntr]());
                var echild =self_cntr_el ? self_cntr_el.child('>*[xtype]') : false;
                
                if (echild && echild.attr('xtype').split('.').pop() == cn.xtype) {
                  //  Roo.log("found child for " + this.xtype +": " + echild.attr('xtype') );
                  
                  
                  
                    cn.el = echild;
                  //  Roo.log("GOT");
                    //echild.dom.removeAttribute('xtype');
                } else {
                    Roo.log("MISSING " + cn.xtype + " on child of " + (this.el ? this.el.attr('xbuilderid') : 'no parent'));
                   
                }
            }
           
            
               
            // if object has flexy:if - then it may or may not be rendered.
            if (build_from_html && has_flexy && !cn.el &&  cn.can_build_overlaid) {
                // skip a flexy if element.
                Roo.log('skipping render');
             } else {
                 
                // actually if flexy:foreach is found, we really want to create 
                // multiple copies here...
                Roo.log(cn);
                cn.render(this[cntr]());
             }
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

 