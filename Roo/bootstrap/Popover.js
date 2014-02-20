/*
 * - LGPL
 *
 * element
 * 
 */

/**
 * @class Roo.bootstrap.Popover
 * @extends Roo.bootstrap.Component
 * Bootstrap Element class
 * @cfg {String} html contents of the popover
 * @cfg {String} title of popover
 * 
 * @constructor
 * Create a new Popover
 * @param {Object} config The config object
 */

Roo.bootstrap.Popover = function(config){
    Roo.bootstrap.Popover.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Popover, Roo.bootstrap.Component,  {
    
    title: 'Fill in a title',
    html: '',
    
    placement : 'right',
    trigger : 'click',
    
    element : 'parent'
    
    
    getAutoCreate : function(){
         
        var cfg = {
           cls : 'popover',
           cn : [
                {
                    cls : 'arrow'
                },
                {
                    cls : 'popover-inner',
                    cn : [
                        {
                            tag: 'h3',
                            cls: 'popover-title',
                            html : this.title
                        },
                        {
                            cls : 'popover-content',
                            html : this.html
                        }
                    ]
                    
                }
           ]
        };
        
        return cfg;
    },
    // as it get's added to the bottom of the page.
    onRender : function(ct, position)
    {
        Roo.bootstrap.Component.superclass.onRender.call(this, ct, position);
        if(!this.el){
            var cfg = Roo.apply({},  this.getAutoCreate());
            cfg.id = Roo.id();
            
            if (this.cls) {
                cfg.cls += ' ' + this.cls;
            }
            if (this.style) {
                cfg.style = this.style;
            }
            this.el = Roo.get(document.body).createChild(cfg, position);
        }
    }
});

 

 