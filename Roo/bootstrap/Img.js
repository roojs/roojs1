/*
 * - LGPL
 *
 * image
 * 
 */


/**
 * @class Roo.bootstrap.Img
 * @extends Roo.bootstrap.Component
 * Bootstrap Img class
 * @cfg {Boolean} imgResponsive false | true
 * @cfg {String} border rounded | circle | thumbnail
 * @cfg {String} src image source
 * @cfg {String} alt image alternative text
 * @cfg {String} href a tag href
 * @cfg {String} target (_self|_blank|_parent|_top)target for a href.
 * @cfg {String} xsUrl xs image source
 * @cfg {String} smUrl sm image source
 * @cfg {String} mdUrl md image source
 * @cfg {String} lgUrl lg image source
 * 
 * @constructor
 * Create a new Input
 * @param {Object} config The config object
 */

Roo.bootstrap.Img = function(config){
    Roo.bootstrap.Img.superclass.constructor.call(this, config);
    
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

Roo.extend(Roo.bootstrap.Img, Roo.bootstrap.Component,  {
    
    imgResponsive: true,
    border: '',
    src: '',
    href: false,
    target: false,
    xsUrl: '',
    smUrl: '',
    mdUrl: '',
    lgUrl: '',

    getAutoCreate : function()
    {   
        if(this.src || (!this.xsUrl && !this.smUrl && !this.mdUrl && !this.lgUrl)){
            return this.createSingleImg();
        }
        
        var cfg = {
            tag: 'div',
            cls: 'roo-image-responsive-group',
            cn: []
        }
        
        var img = {};
        
        if(this.xsUrl){
            img = {
                tag: 'img',
                cls: (this.imgResponsive) ? 'img-responsive' : '',
                html: this.html || cfg.html,
                src: this.xsUrl
            }
            
            if (['rounded','circle','thumbnail'].indexOf(this.border)>-1) {
                cfg.cls += ' img-' + this.border;
            }
            
            if(this.alt){
                cfg.alt = this.alt;
            }
            
            if(this.href){
                var a = {
                    tag: 'a',
                    href: this.href,
                    cn: [
                        img
                    ]
                }

                if(this.target){
                    a.target = this.target;
                }
            }
            
            cfg.cn.push((this.href) ? a : img);

        }
        
    },
    
    createSingleImg : function()
    {
        var cfg = {
            tag: 'img',
            cls: (this.imgResponsive) ? 'img-responsive' : '',
            html : null
        }
        
        cfg.html = this.html || cfg.html;
        
        cfg.src = this.src || cfg.src;
        
        if (['rounded','circle','thumbnail'].indexOf(this.border)>-1) {
            cfg.cls += ' img-' + this.border;
        }
        
        if(this.alt){
            cfg.alt = this.alt;
        }
        
        if(this.href){
            var a = {
                tag: 'a',
                href: this.href,
                cn: [
		    cfg
		]
            }
            
            if(this.target){
                a.target = this.target;
            }
            
        }
        
        return (this.href) ? a : cfg;
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

 