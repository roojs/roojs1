/*
 * - LGPL
 *
 * page contgainer.
 * 
 */


/**
 * @class Roo.bootstrap.ButtonGroup
 * @extends Roo.bootstrap.Component
 * Bootstrap ButtonGroup class
 * @cfg {string} size lg | sm | xs (default empty normal)
 * @cfg {string} align vertical | justified  (default none)
 * @cfg {string} direction up | down (default down)
 * 
 * 
 * @constructor
 * Create a new Input
 * @param {Object} config The config object
 */

Roo.bootstrap.ButtonGroup = function(config){
    Roo.bootstrap.ButtonGroup.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.ButtonGroup, Roo.bootstrap.Component,  {
    
    size: '',
    align: '',
    direction: '',
    toolbar: false,
    btn: true,
    
    autoCreate : {
        cls: 'btn-group',
        html : null
    },

    getAutoCreate : function(){
        
        var cfg = Roo.apply({}, Roo.bootstrap.ButtonGroup.superclass.getAutoCreate.call(this));
        
        cfg.html = this.html || cfg.html;
        
        if (this.toolbar) {
            cfg = {
                cls: 'btn-toolbar',
                html: null
            }
            
            return cfg;
        }
        
        if (['vertical','justified'].indexOf(this.align)!==-1) {
            cfg.cls = 'btn-group-' + this.align;
            
            if (this.align == 'justified') {
                console.log(this.items);
            }
        }
        
        if (['lg','sm','xs'].indexOf(this.size)!==-1) {
            cfg.cls += ' btn-group-' + this.size;
        }
        
        if (this.direction == 'up') {
            cfg.cls += ' dropup' ;
        }
        
        return cfg;
    }
   
});

 