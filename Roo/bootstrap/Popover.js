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
    
    tag: 'div',
    cls: '',
    html: '',
    
    
    
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
    }
   
});

 

 