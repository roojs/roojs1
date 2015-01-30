/*
 * - LGPL
 *
 * TabBox
 * 
 */
Roo.bootstrap.dash = Roo.bootstrap.dash || {};

/**
 * @class Roo.bootstrap.dash.TabBox
 * @extends Roo.bootstrap.Component
 * Bootstrap TabBox class
 * @cfg {String} title Title of the TabBox
 * @cfg {String} icon Icon of the TabBox
 * 
 * @constructor
 * Create a new TabBox
 * @param {Object} config The config object
 */


Roo.bootstrap.dash.TabBox = function(config){
    Roo.bootstrap.dash.TabBox.superclass.constructor.call(this, config);
    this.addEvents({
        // raw events
        /**
         * @event addpane
         * When a pane is added
         * @param {Roo.bootstrap.dash.TabPane} pane
         */
        "addpane" : true
         
    });
};

Roo.extend(Roo.bootstrap.dash.TabBox, Roo.bootstrap.Component,  {

    title : '',
    icon : false,
    
    getChildContainer : function()
    {
        return this.el.select('.tab-content', true).first();
    },
    
    getAutoCreate : function(){
        
        var header = {
            tag: 'li',
            cls: 'pull-left header',
            html: this.title,
            cn : []
        };
        
        if(this.icon){
            header.cn.push({
                tag: 'i',
                cls: 'fa ' + this.icon
            });
        }
        
        
        var cfg = {
            tag: 'div',
            cls: 'nav-tabs-custom',
            cn: [
                {
                    tag: 'ul',
                    cls: 'nav nav-tabs pull-right',
                    cn: [
                        header
                    ]
                },
                {
                    tag: 'div',
                    cls: 'tab-content no-padding',
                    cn: []
                }
            ]
        }

        return  cfg;
    },
    initEvents : function()
    {
        Roo.log('add add pane handler');
        this.on('addpane', this.onAddPane, this);
    },
     /**
     * Updates the box title
     * @param {String} html to set the title to.
     */
    setTitle : function(value)
    {
        this.el.select('.nav-tabs .header', true).first().dom.innerHTML = value;
    },
    onAddPane : function(pane)
    {
        Roo.log('addpane');
        Roo.log(pane);
        // tabs are rendere left to right..
        var ctr = this.el.select('.nav-tabs', true).first();
         
         
        var existing = ctr.select('.nav-tab',true);
        var qty = existing.getCount();;
        
        
        var tab = ctr.createChild({
            tag : 'li',
            cls : 'nav-tab' + (qty ? '' : ' active'),
            cn : [
                {
                    tag : 'a',
                    href:'#',
                    html : pane.title
                }
            ]
        }, qty ? existing.first().dom : ctr.select('.header', true).first().dom );
        pane.tab = tab;
        
        tab.on('click', this.onTabClick.createDelegate(this, [pane], true));
        if (!qty) {
            pane.el.addClass('active');
        }
        
                
    },
    onTabClick : function(ev,un,ob,pane)
    {
        //Roo.log('tab - prev default');
        ev.preventDefault();
        
        
        this.el.select('.nav-tabs li.nav-tab', true).removeClass('active');
        pane.tab.addClass('active');
        //Roo.log(pane.title);
        this.getChildContainer().select('.tab-pane',true).removeClass('active');
        // technically we should have a deactivate event.. but maybe add later.
        // and it should not de-activate the selected tab...
        
        pane.el.addClass('active');
        pane.fireEvent('activate');
        
        
    }
    
    
});

 
