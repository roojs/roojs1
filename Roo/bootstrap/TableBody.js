/*
 * - LGPL
 *
 * table body
 * 
 */

/**
 * @class Roo.bootstrap.TableBody
 * @extends Roo.bootstrap.Component
 * Bootstrap TableBody class
 * 
 * @constructor
 * Create a new TableBody
 * @param {Object} config The config object
 */

Roo.bootstrap.TableBody = function(config){
    Roo.bootstrap.TableBody.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.TableBody, Roo.bootstrap.Component,  {
    
    html: false,
    cls: false,
    tag: false,
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.TableBody.superclass.getAutoCreate.call(this));
	
	cfg = {
	    tag: 'tbody'
	}
        
        if(this.tag){
            cfg.tag = this.tag;
        }
        
        if (this.html) {
            cfg.html=this.html
        }
        if (this.cls) {
            cfg.cls=this.cls
        }
	
        return cfg;
    }
   
});

 

 