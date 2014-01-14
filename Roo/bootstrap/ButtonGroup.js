/*
 * - LGPL
 *
 * page contgainer.
 * 
 */ 
Roo.bootstrap.ButtonGroup = function(config){
    Roo.bootstrap.ButtonGroup.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.ButtonGroup, Roo.bootstrap.Component,  {
    
    size: '',
    align: '',
    dropdirection: '',
    
    autoCreate : {
        cls: 'btn-group',
        html : null
    },

    getAutoCreate : function(){
        
        var cfg = Roo.apply({}, Roo.bootstrap.ButtonGroup.superclass.getAutoCreate.call(this));
        
        cfg.html = this.html || cfg.html;
        
        if (['vertical','justified'].indexOf(this.align)!==-1) {
            cfg.cls = 'btn-group-' + this.align;
            
            if (this.align==='justified') {
                console.log(this.items)
            }
        }
        
        if (['lg','sm','xs'].indexOf(this.size)!==-1) {
            cfg.cls += ' btn-group-' + this.size;
        }
        
        if (['dropup'].indexOf(this.dropdirection)) {
            cfg.cls += ' dropup';
        }
        
        return cfg;
    }
   
});

 