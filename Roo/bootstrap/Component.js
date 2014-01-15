/*
 * - LGPL
 *
 * base class for bootstrap elements..
 * 
 */
Roo.bootstrap = Roo.bootstrap || {};
Roo.bootstrap.Component = function(config){
    Roo.bootstrap.Component.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Component, Roo.BoxComponent,  {
      
	 
    autoCreate : false,
    
    initEvents : function() {  },
    
    parentId : false,
    
    parent: function() {
        // returns the parent component..
        return Roo.ComponentMgr.get(this.parentId)
        
        
    },
    
    // private
    onRender : function(ct, position){
        Roo.bootstrap.Component.superclass.onRender.call(this, ct, position);
        if(!this.el){
            var cfg = Roo.apply({},  this.getAutoCreate());
            cfg.id = Roo.id();
            //if(!cfg.name){
            //    cfg.name = typeof(this.name) == 'undefined' ? this.id : this.name;
            //}
            //if (!cfg.name.length) {
            //    delete cfg.name;
           // }
            if (this.cls) {
                cfg.cls += ' ' + this.cls;
            }
            if (this.style) {
                cfg.style = this.style;
            }
            this.el = ct.createChild(cfg, position);
        }
        //var type = this.el.dom.type;
         
        if(this.tabIndex !== undefined){
            this.el.dom.setAttribute('tabIndex', this.tabIndex);
        }
        this.initEvents();
        //this.el.addClass([this.fieldClass, this.cls]);
        
    },
    getChildContainer : function()
    {
        return this.el;
    },
    
    addxtype : function (tree) {
        var cn = this;
        if (tree.xtype != 'Body') {
            
            cn = Roo.factory(tree);
            cn.parentType = this.xtype;
            cn.onRender(this.getChildContainer());
            // then add the element..
        }
        var nitems = [];
        if (typeof (tree.menu) != 'undefined') {
            tree.menu.parentType = cn.xtype;
            tree.menu.triggerEl = cn.el;
            nitems.push(cn.addxtype(Roo.apply({}, tree.menu)));
            
        }
	
        if (!tree.items || !tree.items.length) {
            this.items = nitems;
            return this;
        }
        var items = tree.items;
        delete tree.items;
        
        Roo.log(items.length);
            // add the items..
        for(var i =0;i < items.length;i++) {
            nitems.push(cn.addxtype(Roo.apply({}, items[i])));
            
        }
    
        this.items = nitems;
	
	
        return this;
    }
    
     
 
    
});

 