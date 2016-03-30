/*
 * - LGPL
 *
 * Tab pane
 * 
 */
Roo.bootstrap.dash = Roo.bootstrap.dash || {};
/**
 * @class Roo.bootstrap.TabPane
 * @extends Roo.bootstrap.Component
 * Bootstrap TabPane class
 * @cfg {Boolean} active (false | true) Default false
 * @cfg {String} title title of panel

 * 
 * @constructor
 * Create a new TabPane
 * @param {Object} config The config object
 */

Roo.bootstrap.dash.TabPane = function(config){
    Roo.bootstrap.dash.TabPane.superclass.constructor.call(this, config);
    
    this.addEvents({
        // raw events
        /**
         * @event activate
         * When a pane is activated
         * @param {Roo.bootstrap.dash.TabPane} pane
         */
        "activate" : true
         
    });
};

Roo.extend(Roo.bootstrap.dash.TabPane, Roo.bootstrap.Component,  {
    
    active : false,
    title : '',
    
    // the tabBox that this is attached to.
    tab : false,
     
    getAutoCreate : function() 
    {
        var cfg = {
            tag: 'div',
            cls: 'tab-pane'
        };
        
        if(this.active){
            cfg.cls += ' active';
        }
        
        return cfg;
    },
    initEvents  : function()
    {
        //Roo.log('trigger add pane handler');
        this.parent().fireEvent('addpane', this)
    },
    
     /**
     * Updates the tab title 
     * @param {String} html to set the title to.
     */
    setTitle: function(str)
    {
        if (!this.tab) {
            return;
        }
        this.title = str;
        this.tab.select('a', true).first().dom.innerHTML = str;
        
    }
    
    
    
});

 


 