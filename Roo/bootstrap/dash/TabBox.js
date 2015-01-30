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
    
    setTitle : function(value)
    {
        this.el.select('.header', true).first().dom.innerHTML = value;
    },
    onAddPane : function(pane)
    {
        Roo.log('addpane');
        Roo.log(pane);
        // tabs are rendere left to right..
        var ctr = this.el.select('.nav-tabs', true).first();
         
        
        var tab = ctr.createChild({
            tag : 'li',
            cls : 'active nav-tab',
            cn : [
                {
                    tag : 'a',
                    href:'#',
                    html : pane.title
                }
            ]
            
            
        });
        pane.tab = tab;
        
        tab.on('click', this.onTabClick.createDelegate(this, [pane], true));
                
    },
    onTabClick : function(ev,un,ob,pane)
    {
        
        this.el.select('.nav-tabs li.nav-tab', true).removeClass('active');
        panel.tab.addClass('active');
        Roo.log(pane.title);
        
    }
    
    
});

 
