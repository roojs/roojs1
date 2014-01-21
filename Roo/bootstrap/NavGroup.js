/*
 * - LGPL
 *
 * row
 * 
 */ 
Roo.bootstrap.NavGroup = function(config){
    Roo.bootstrap.NavGroup.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.NavGroup, Roo.bootstrap.Component,  {
    
    type: 'nav',
    arrangement: '',
    position: '',
    inverse: false,
    collapse: false,
    align: '',
    
    autoCreate : {
        cls: 'nav navbar-nav',
        tag : 'ul',
    },
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.NavGroup.superclass.getAutoCreate.call(this));
	
        
        if (this.align === 'right') {
            cfg.cls += ' navbar-right';
        }
        
        if (this.inverse) {
            cfg.cls += ' navbar-inverse';
            
        }
        /* type: nav | tabs | pills
         * arrangement: stacked | justified
         * position: fixed/static etc
         * inverse: true/false
         */
        
        
        return cfg;
    },
    
    getChildContainer : function() {
        return this.el.select('ul', true).first();
    }
   
});

 

 