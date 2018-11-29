/*
 * - LGPL
 *
 * navbar
 * 
 */

/**
 * @class Roo.bootstrap.NavSimplebar
 * @extends Roo.bootstrap.Navbar
 * Bootstrap Sidebar class
 *
 * @cfg {Boolean} inverse is inverted color
 * 
 * @cfg {String} type (nav | pills | tabs)
 * @cfg {Boolean} arrangement stacked | justified
 * @cfg {String} align (left | right) alignment
 * 
 * @cfg {Boolean} main (true|false) main nav bar? default false
 * @cfg {Boolean} loadMask (true|false) loadMask on the bar
 * 
 * @cfg {String} tag (header|footer|nav|div) default is nav 

 * @cfg {String} weight (light|primary|secondary|success|danger|warning|info|dark|white) default is light.
 * 
 * 
 * @constructor
 * Create a new Sidebar
 * @param {Object} config The config object
 */


Roo.bootstrap.NavSimplebar = function(config){
    Roo.bootstrap.NavSimplebar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.NavSimplebar, Roo.bootstrap.Navbar,  {
    
    inverse: false,
    
    type: false,
    arrangement: '',
    align : false,
    
    weight : 'light',
    
    main : false,
    
    
    tag : false,
    
    
    getAutoCreate : function(){
        
        
        var cfg = {
            tag : this.tag || 'div',
            cls : 'navbar navbar-expand-lg'
        };
	if (['light','white'].indexOf(this.weight) > -1) {
	    cfg.cls += ['light','white'].indexOf(this.weight) > -1 ? ' navbar-light' : ' navbar-dark';
	}
	cfg.cls += ' bg-' + this.weight;
	
	  
	
        cfg.cn = [
            {
                cls: 'nav',
                tag : 'ul'
            }
        ];
        
         
        this.type = this.type || 'nav';
        if (['tabs','pills'].indexOf(this.type)!==-1) {
            cfg.cn[0].cls += ' nav-' + this.type
        
        
        } else {
            if (this.type!=='nav') {
                Roo.log('nav type must be nav/tabs/pills')
            }
            cfg.cn[0].cls += ' navbar-nav'
        }
        
        
        
        
        if (['stacked','justified'].indexOf(this.arrangement)!==-1) {
            cfg.cn[0].cls += ' nav-' + this.arrangement;
        }
        
        
        if (this.align === 'right') {
            cfg.cn[0].cls += ' navbar-right';
        }
        
        if (this.inverse) {
            cfg.cls += ' navbar-inverse';
            
        }
        
        
        return cfg;
    
        
    }
    
    
    
});



 

 
       