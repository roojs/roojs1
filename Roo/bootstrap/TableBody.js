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
 * @cfg {String} cls element class
 * @cfg {String} tag element tag (thead|tbody|tfoot) default tbody
 * @cfg {String} align Aligns the content inside the element
 * @cfg {Number} charoff Sets the number of characters the content inside the element will be aligned from the character specified by the char attribute
 * @cfg {String} valign Vertical aligns the content inside the <tbody> element
 * 
 * @constructor
 * Create a new TableBody
 * @param {Object} config The config object
 */

Roo.bootstrap.TableBody = function(config){
    Roo.bootstrap.TableBody.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.TableBody, Roo.bootstrap.Component,  {
    
    cls: false,
    tag: false,
    align: false,
    charoff: false,
    valign: false,
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.TableBody.superclass.getAutoCreate.call(this));
	
        cfg = {
            tag: 'tbody'
        }
            
        if (this.cls) {
            cfg.cls=this.cls
        }
        if(this.tag){
            cfg.tag = this.tag;
        }
	
        if(this.align){
            cfg.align = this.align;
        }
        if(this.charoff){
            cfg.charoff = this.charoff;
        }
        if(this.valign){
            cfg.valign = this.valign;
        }
        
        return cfg;
    },
    
    initEvents : function()
    {
        if(!this.store){
            return;
        }
        
        this.store = Roo.factory(this.store, Roo.data);
        this.store.on('load', this.onLoad, this);
        
    },
    
    onLoad: function () {
        
        this.clearTabel();
        
        this.fireEvent('load', this);
    }
   
});

 

 