/*
 * - LGPL
 *
 * numberBox
 * 
 */
Roo.bootstrap.dash = Roo.bootstrap.dash || {};

/**
 * @class Roo.bootstrap.dash.NumberBox
 * @extends Roo.bootstrap.Component
 * Bootstrap NumberBox class
 * @cfg {String} headline Box headline
 * @cfg {String} content Box content
 * @cfg {String} icon Box icon
 * @cfg {String} footer Footer text
 * @cfg {String} fhref Footer href
 * 
 * @constructor
 * Create a new NumberBox
 * @param {Object} config The config object
 */


Roo.bootstrap.dash.NumberBox = function(config){
    Roo.bootstrap.dash.NumberBox.superclass.constructor.call(this, config);
    
};

Roo.extend(Roo.bootstrap.dash.NumberBox, Roo.bootstrap.Component,  {
    
    headline : '',
    content : '',
    icon : '',
    footer : '',
    fhref : '',
    ficon : '',
    
    getAutoCreate : function(){
        
        var cfg = {
            tag : 'div',
            cls : 'small-box ',
            cn : [
                {
                    tag : 'div',
                    cls : 'inner',
                    cn :[
                        {
                            tag : 'h3',
                            cls : 'roo-headline',
                            html : this.headline
                        },
                        {
                            tag : 'p',
                            cls : 'roo-content',
                            html : this.content
                        }
                    ]
                }
            ]
        };
        
        if(this.icon){
            cfg.cn.push({
                tag : 'div',
                cls : 'icon',
                cn :[
                    {
                        tag : 'i',
                        cls : 'ion ' + this.icon
                    }
                ]
            });
        }
        
        if(this.footer){
            var footer = {
                tag : 'a',
                cls : 'small-box-footer',
                href : this.fhref || '#',
                html : this.footer
            };
            
            cfg.cn.push(footer);
            
        }
        
        return  cfg;
    },

    onRender : function(ct,position){
        Roo.bootstrap.dash.NumberBox.superclass.onRender.call(this,ct,position);


       
                
    },

    setHeadline: function (value)
    {
        this.el.select('.roo-headline',true).first().dom.innerHTML = value;
    },
    
    setFooter: function (value, href)
    {
        this.el.select('a.small-box-footer',true).first().dom.innerHTML = value;
        
        if(href){
            this.el.select('a.small-box-footer',true).first().attr('href', href);
        }
        
    },

    setContent: function (value)
    {
        this.el.select('.roo-content',true).first().dom.innerHTML = value;
    },

    initEvents: function() 
    {   
        
    }
    
});

 
