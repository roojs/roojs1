/*
 * - LGPL
 *
 * TabBox
 * 
 */


/**
 * @class Roo.bootstrap.dash.TabBox
 * @extends Roo.bootstrap.Component
 * Bootstrap TabBox class
 * @cfg {String} title
 * @cfg {String} tab1_text
 * @cfg {String} tab2_text
 * 
 * @constructor
 * Create a new Input
 * @param {Object} config The config object
 */

Roo.bootstrap.dash = Roo.bootstrap.dash || {};
Roo.bootstrap.dash.TabBox = function(config){
    Roo.bootstrap.dash.TabBox.superclass.constructor.call(this, config);
    
    this.addEvents({
        // img events
        /**
         * @event click
         * The img click event for the img.
         * @param {Roo.EventObject} e
         */
        "click" : true
    });
};

Roo.extend(Roo.bootstrap.dash.TabBox, Roo.bootstrap.Component,  {
    

    title: '',
    tab1_text: '',
    tab2_text: '',

    getAutoCreate : function(){
        
        var cfg = {
            tag: 'div',
            cls: 'nav-tabs-custom',
            html : null,
            cn: [
            {
                tag: 'ul',
                cls: 'nav nav-tabs pull-right',
                cn: [{
                    tag: 'li',
                    cls: 'active',
                    html: null,
                    cn : [{
                        tag: 'a',
                        href: '#',
                        // data-toggle: 'tab',
                        html: this.tab1_text ? this.tab1_text : 'tab1'
                    }]
                },
                {
                    tag: 'li',
                    cls: '',
                    html: null,
                    cn : [{
                        tag: 'a',
                        href: '#',
                        // data-toggle: 'tab',
                        html: this.tab2_text ? this.tab2_text : 'tab2'
                    }]
                },
                {
                    tag: 'li',
                    cls: 'pull-left header',
                    html: this.title ? this.title : 'Title',
                    cn : [{
                        tag: 'i',
                        cls: 'fa fa-inbox',
                    }]
                }]
            }]
        }

        return  cfg;
    },
    
    initEvents: function() {
        
        // if(!this.href){
        //     this.el.on('click', this.onClick, this);
        // }
        var _this = this;
        Roo.each(_this.el.select('li',true).elements, function(el){
            Roo.log(el);
            el.on('click', _this.onClick, el);
        })
    },
    
    onClick : function(e)
    {
        Roo.log('img onclick');


        this.findParent('li',false, true).removeClass('active');
        this.el.addClass('active');
        Roo.log(this);
            //this.el.select('li.active',true).first().removeClass('active');            

           // Roo.get(e.target).findParent('li',false, true).addClass('active');

        //this.fireEvent('toggle', this, e);

    }
   
});

 
