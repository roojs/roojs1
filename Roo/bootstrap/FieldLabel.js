/*
 * - LGPL
 *
 * FieldLabel
 * 
 */

/**
 * @class Roo.bootstrap.FieldLabel
 * @extends Roo.bootstrap.Component
 * Bootstrap Element class
 * @cfg {String} html contents of the element
 * @cfg {String} tag tag of the element
 * @cfg {String} cls class of the element
 * @cfg {Boolean} preventDefault (true|false) default false
 * @cfg {Boolean} clickable (true|false) default false
 * 
 * @constructor
 * Create a new Element
 * @param {Object} config The config object
 */

Roo.bootstrap.Element = function(config){
    Roo.bootstrap.Element.superclass.constructor.call(this, config);
    
    this.addEvents({
        // raw events
        /**
         * @event click
         * When a element is chick
         * @param {Roo.bootstrap.Element} this
         * @param {Roo.EventObject} e
         */
        "click" : true
    });
};

Roo.extend(Roo.bootstrap.Element, Roo.bootstrap.Component,  {
    
    tag: 'div',
    cls: '',
    html: '',
    preventDefault: false, 
    clickable: false,
    
    getAutoCreate : function(){
        
        var cfg = {
            tag: this.tag,
            cls: this.cls,
            html: this.html
        };
        
        return cfg;
    },
    
    initEvents: function() 
    {
        Roo.bootstrap.Element.superclass.initEvents.call(this);
        
        if(this.clickable){
            this.el.on('click', this.onClick, this);
        }
        
    },
    
    onClick : function(e)
    {
        if(this.preventDefault){
            e.preventDefault();
        }
        
        this.fireEvent('click', this, e);
    },
    
    getValue : function()
    {
        return this.el.dom.innerHTML;
    },
    
    setValue : function(value)
    {
        this.el.dom.innerHTML = value;
    }
   
});

 

 