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
 * @cfg {Boolean} backgroundContain (use style background and contain image in content)
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
        "click" : true,
        /**
         * @event load
         * The when any image loads
         * @param {Roo.EventObject} e
         */
        "load" : true
    });
};

Roo.extend(Roo.bootstrap.Img, Roo.bootstrap.Component,  {
    
    imgResponsive: true,
    border: '',
    src: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
    href: false,
    target: false,
    xsUrl: '',
    smUrl: '',
    mdUrl: '',
    lgUrl: '',
    backgroundContain : false,

    getAutoCreate : function()
    {   
        if(this.src || (!this.xsUrl && !this.smUrl && !this.mdUrl && !this.lgUrl)){
            return this.createSingleImg();
        }
        
        var cfg = {
            tag: 'div',
            cls: 'roo-image-responsive-group',
            cn: []
        };
        var _this = this;
        
        Roo.each(['xs', 'sm', 'md', 'lg'], function(size){
            
            if(!_this[size + 'Url']){
                return;
            }
            
            var img = {
                tag: 'img',
                cls: (_this.imgResponsive) ? 'img-responsive' : '',
                html: _this.html || cfg.html,
                src: _this[size + 'Url']
            };
            
            img.cls += ' roo-image-responsive-' + size;
            
            var s = ['xs', 'sm', 'md', 'lg'];
            
            s.splice(s.indexOf(size), 1);
            
            Roo.each(s, function(ss){
                img.cls += ' hidden-' + ss;
            });
            
            if (['rounded','circle','thumbnail'].indexOf(_this.border)>-1) {
                cfg.cls += ' img-' + _this.border;
            }
            
            if(_this.alt){
                cfg.alt = _this.alt;
            }
            
            if(_this.href){
                var a = {
                    tag: 'a',
                    href: _this.href,
                    cn: [
                        img
                    ]
                };

                if(this.target){
                    a.target = _this.target;
                }
            }
            
            cfg.cn.push((_this.href) ? a : img);
            
        });
        
        return cfg;
    },
    
    createSingleImg : function()
    {
        var cfg = {
            tag: 'img',
            cls: (this.imgResponsive) ? 'img-responsive' : '',
            html : null,
            src : Roo.BLANK_IMAGE_URL  // just incase src get's set to undefined?!?
        };
        
        if (this.backgroundContain) {
            cfg.cls += ' background-contain';
        }
        
        cfg.html = this.html || cfg.html;
        
        if (this.backgroundContain) {
            cfg.style="background-image: url(" + this.src + ')';
        } else {
            cfg.src = this.src || cfg.src;
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
                    cfg
                ]
            };
            
            if(this.target){
                a.target = this.target;
            }
            
        }
        
        return (this.href) ? a : cfg;
    },
    
    initEvents: function() 
    {
        if(!this.href){
            this.el.on('click', this.onClick, this);
        }
        if(this.src || (!this.xsUrl && !this.smUrl && !this.mdUrl && !this.lgUrl)){
            this.el.on('load', this.onImageLoad, this);
        } else {
            // not sure if this works.. not tested
            this.el.select('img', true).on('load', this.onImageLoad, this);
        }
        
    },
    
    onClick : function(e)
    {
        Roo.log('img onclick');
        this.fireEvent('click', this, e);
    },
    onImageLoad: function(e)
    {
        Roo.log('img load');
        this.fireEvent('load', this, e);
    },
    
    /**
     * Sets the url of the image - used to update it
     * @param {String} url the url of the image
     */
    
    setSrc : function(url)
    {
        this.src =  url;
        
        if(this.src || (!this.xsUrl && !this.smUrl && !this.mdUrl && !this.lgUrl)){
            if (this.backgroundContain) {
                this.el.dom.style.backgroundImage =  'url(' + url + ')';
            } else {
                this.el.dom.src =  url;
            }
            return;
        }
        
        this.el.select('img', true).first().dom.src =  url;
    }
    
    
   
});

 