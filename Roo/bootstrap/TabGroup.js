/**
 * @class Roo.bootstrap.TabGroup
 * @extends Roo.bootstrap.Column
 * @children Roo.bootstrap.TabPanel
 * Bootstrap Column class
 * @cfg {String} navId the navigation id (for use with navbars) - will be auto generated if it does not exist..
 * @cfg {Boolean} carousel true to make the group behave like a carousel
 * @cfg {Boolean} bullets show bullets for the panels
 * @cfg {Boolean} autoslide (true|false) auto slide .. default false
 * @cfg {Number} timer auto slide timer .. default 0 millisecond
 * @cfg {Boolean} showarrow (true|false) show arrow default true
 * 
 * @constructor
 * Create a new TabGroup
 * @param {Object} config The config object
 */

Roo.bootstrap.TabGroup = function(config){
    Roo.bootstrap.TabGroup.superclass.constructor.call(this, config);
    if (!this.navId) {
        this.navId = Roo.id();
    }
    this.tabs = [];
    Roo.bootstrap.TabGroup.register(this);
    
};

Roo.extend(Roo.bootstrap.TabGroup, Roo.bootstrap.Column,  {
    
    carousel : false,
    transition : false,
    bullets : 0,
    timer : 0,
    autoslide : false,
    slideFn : false,
    slideOnTouch : false,
    showarrow : true,
    
    getAutoCreate : function()
    {
        var cfg = Roo.apply({}, Roo.bootstrap.TabGroup.superclass.getAutoCreate.call(this));
        
        cfg.cls += ' tab-content';
        
        if (this.carousel) {
            cfg.cls += ' carousel slide';
            
            cfg.cn = [{
               cls : 'carousel-inner',
               cn : []
            }];
        
            if(this.bullets  && !Roo.isTouch){
                
                var bullets = {
                    cls : 'carousel-bullets',
                    cn : []
                };
               
                if(this.bullets_cls){
                    bullets.cls = bullets.cls + ' ' + this.bullets_cls;
                }
                
                bullets.cn.push({
                    cls : 'clear'
                });
                
                cfg.cn[0].cn.push(bullets);
            }
            
            if(this.showarrow){
                cfg.cn[0].cn.push({
                    tag : 'div',
                    class : 'carousel-arrow',
                    cn : [
                        {
                            tag : 'div',
                            class : 'carousel-prev',
                            cn : [
                                {
                                    tag : 'i',
                                    class : 'fa fa-chevron-left'
                                }
                            ]
                        },
                        {
                            tag : 'div',
                            class : 'carousel-next',
                            cn : [
                                {
                                    tag : 'i',
                                    class : 'fa fa-chevron-right'
                                }
                            ]
                        }
                    ]
                });
            }
            
        }
        
        return cfg;
    },
    
    initEvents:  function()
    {
//        if(Roo.isTouch && this.slideOnTouch && !this.showarrow){
//            this.el.on("touchstart", this.onTouchStart, this);
//        }
        
        if(this.autoslide){
            var _this = this;
            
            this.slideFn = window.setInterval(function() {
                _this.showPanelNext();
            }, this.timer);
        }
        
        if(this.showarrow){
            this.el.select('.carousel-prev', true).first().on('click', this.showPanelPrev, this);
            this.el.select('.carousel-next', true).first().on('click', this.showPanelNext, this);
        }
        
        
    },
    
//    onTouchStart : function(e, el, o)
//    {
//        if(!this.slideOnTouch || !Roo.isTouch || Roo.get(e.getTarget()).hasClass('roo-button-text')){
//            return;
//        }
//        
//        this.showPanelNext();
//    },
    
    
    getChildContainer : function()
    {
        return this.carousel ? this.el.select('.carousel-inner', true).first() : this.el;
    },
    
    /**
    * register a Navigation item
    * @param {Roo.bootstrap.nav.Item} the navitem to add
    */
    register : function(item)
    {
        this.tabs.push( item);
        item.navId = this.navId; // not really needed..
        this.addBullet();
    
    },
    
    getActivePanel : function()
    {
        var r = false;
        Roo.each(this.tabs, function(t) {
            if (t.active) {
                r = t;
                return false;
            }
            return null;
        });
        return r;
        
    },
    getPanelByName : function(n)
    {
        var r = false;
        Roo.each(this.tabs, function(t) {
            if (t.tabId == n) {
                r = t;
                return false;
            }
            return null;
        });
        return r;
    },
    indexOfPanel : function(p)
    {
        var r = false;
        Roo.each(this.tabs, function(t,i) {
            if (t.tabId == p.tabId) {
                r = i;
                return false;
            }
            return null;
        });
        return r;
    },
    /**
     * show a specific panel
     * @param {Roo.bootstrap.TabPanel|number|string} panel to change to (use the tabId to specify a specific one)
     * @return {boolean} false if panel was not shown (invalid entry or beforedeactivate fails.)
     */
    showPanel : function (pan)
    {
        if(this.transition || typeof(pan) == 'undefined'){
            Roo.log("waiting for the transitionend");
            return false;
        }
        
        if (typeof(pan) == 'number') {
            pan = this.tabs[pan];
        }
        
        if (typeof(pan) == 'string') {
            pan = this.getPanelByName(pan);
        }
        
        var cur = this.getActivePanel();
        
        if(!pan || !cur){
            Roo.log('pan or acitve pan is undefined');
            return false;
        }
        
        if (pan.tabId == this.getActivePanel().tabId) {
            return true;
        }
        
        if (false === cur.fireEvent('beforedeactivate')) {
            return false;
        }
        
        if(this.bullets > 0 && !Roo.isTouch){
            this.setActiveBullet(this.indexOfPanel(pan));
        }
        
        if (this.carousel && typeof(Roo.get(document.body).dom.style.transition) != 'undefined') {
            
            //class="carousel-item carousel-item-next carousel-item-left"
            
            this.transition = true;
            var dir = this.indexOfPanel(pan) > this.indexOfPanel(cur)  ? 'next' : 'prev';
            var lr = dir == 'next' ? 'left' : 'right';
            pan.el.addClass(dir); // or prev
            pan.el.addClass('carousel-item-' + dir); // or prev
            pan.el.dom.offsetWidth; // find the offset with - causing a reflow?
            cur.el.addClass(lr); // or right
            pan.el.addClass(lr);
            cur.el.addClass('carousel-item-' +lr); // or right
            pan.el.addClass('carousel-item-' +lr);
            
            
            var _this = this;
            cur.el.on('transitionend', function() {
                Roo.log("trans end?");
                
                pan.el.removeClass([lr,dir, 'carousel-item-' + lr, 'carousel-item-' + dir]);
                pan.setActive(true);
                
                cur.el.removeClass([lr, 'carousel-item-' + lr]);
                cur.setActive(false);
                
                _this.transition = false;
                
            }, this, { single:  true } );
            
            return true;
        }
        
        cur.setActive(false);
        pan.setActive(true);
        
        return true;
        
    },
    showPanelNext : function()
    {
        var i = this.indexOfPanel(this.getActivePanel());
        
        if (i >= this.tabs.length - 1 && !this.autoslide) {
            return;
        }
        
        if (i >= this.tabs.length - 1 && this.autoslide) {
            i = -1;
        }
        
        this.showPanel(this.tabs[i+1]);
    },
    
    showPanelPrev : function()
    {
        var i = this.indexOfPanel(this.getActivePanel());
        
        if (i  < 1 && !this.autoslide) {
            return;
        }
        
        if (i < 1 && this.autoslide) {
            i = this.tabs.length;
        }
        
        this.showPanel(this.tabs[i-1]);
    },
    
    
    addBullet: function()
    {
        if(!this.bullets || Roo.isTouch){
            return;
        }
        var ctr = this.el.select('.carousel-bullets',true).first();
        var i = this.el.select('.carousel-bullets .bullet',true).getCount() ;
        var bullet = ctr.createChild({
            cls : 'bullet bullet-' + i
        },ctr.dom.lastChild);
        
        
        var _this = this;
        
        bullet.on('click', (function(e, el, o, ii, t){

            e.preventDefault();

            this.showPanel(ii);

            if(this.autoslide && this.slideFn){
                clearInterval(this.slideFn);
                this.slideFn = window.setInterval(function() {
                    _this.showPanelNext();
                }, this.timer);
            }

        }).createDelegate(this, [i, bullet], true));
                
        
    },
     
    setActiveBullet : function(i)
    {
        if(Roo.isTouch){
            return;
        }
        
        Roo.each(this.el.select('.bullet', true).elements, function(el){
            el.removeClass('selected');
        });

        var bullet = this.el.select('.bullet-' + i, true).first();
        
        if(!bullet){
            return;
        }
        
        bullet.addClass('selected');
    }
    
    
  
});

 

 
 
Roo.apply(Roo.bootstrap.TabGroup, {
    
    groups: {},
     /**
    * register a Navigation Group
    * @param {Roo.bootstrap.nav.Group} the navgroup to add
    */
    register : function(navgrp)
    {
        this.groups[navgrp.navId] = navgrp;
	
    },
    /**
    * fetch a Navigation Group based on the navigation ID
    * if one does not exist , it will get created.
    * @param {string} the navgroup to add
    * @returns {Roo.bootstrap.nav.Group} the navgroup 
    */
    get: function(navId) {
        if (typeof(this.groups[navId]) == 'undefined') {
            this.register(new Roo.bootstrap.TabGroup({ navId : navId }));
        }
        return this.groups[navId] ;
    }
    
    
    
});

 