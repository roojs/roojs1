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
 * @cfg {String} bgcolor Box background color, such as (aqua | green | yellow | red etc..) Default aqua
 * @cfg {String} headline Box headline
 * @cfg {String} content Box content
 * @cfg {String} icon Box icon
 * @cfg {String} footer Footer text
 * @cfg {String} fhref Footer href
 * @cfg {String} ficon Footer icon
 * 
 * @constructor
 * Create a new NumberBox
 * @param {Object} config The config object
 */


Roo.bootstrap.dash.NumberBox = function(config){
    Roo.bootstrap.dash.NumberBox.superclass.constructor.call(this, config);
    
};

Roo.extend(Roo.bootstrap.dash.NumberBox, Roo.bootstrap.Component,  {
    
    bgcolor : 'aqua',
    headline : '',
    content : '',
    icon : '',
    footer : '',
    fhref : '',
    ficon : '',
    
    getAutoCreate : function(){
        
        var cfg = {
            tag : 'div',
            cls : 'small-box bg-' + this.bgcolor,
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
        }
        
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
                html : this.footer,
                cn : []
            };
            
            if(this.ficon){
                footer.cn.push({
                    tag : 'i',
                    cls : 'fa ' + this.ficon
                });
            }
            
            cfg.cn.push(footer);
            
        }
        
        return  cfg;
    },

    onRender : function(ct,position){
        Roo.bootstrap.dash.NumberBox.superclass.onRender.call(this,ct,position);


       
                
    },

    setHeadline: function ()
    {
        this.el.select('.roo-headline',true).first().dom.innerHTML = value;
    },


    initEvents: function() {
        
        if(!this.href){
            this.el.on('click', this.onClick, this);
        }
    },
    
    onClick : function(e)
    {
        Roo.log('img onclick');
        this.fireEvent('click', this, e);
    }
   
});

 
