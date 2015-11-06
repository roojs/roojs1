/*
 * - LGPL
 *
 * column
 * 
 */

/**
 * @class Roo.bootstrap.TabGroup
 * @extends Roo.bootstrap.Column
 * Bootstrap Column class
 * @cfg {String} navId the navigation id (for use with navbars) - will be auto generated if it does not exist..
 * @cfg {Boolean} carousel true to make the group behave like a carousel
 * @cfg {Number} showPointer show the panel pointer.. default 0
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
    showPointer : 0,
     
    getAutoCreate : function()
    {
        var cfg = Roo.apply({}, Roo.bootstrap.TabGroup.superclass.getAutoCreate.call(this));
        
        cfg.cls += ' tab-content';
        
        if (this.carousel) {
            cfg.cls += ' carousel slide';
            
            cfg.cn = [{
               cls : 'carousel-inner'
            }];
        
            if(this.showPointer > 0){
                
                var bullets = {
                    cls : 'carousel-bullets',
                    cn : []
                };
                
                for (var i = 0; i < this.showPointer; i++){
                    bullets.cn.push({
                        cls : 'bullet bullet-' + i
                    });
                }
                
                bullets.cn.push({
                    cls : 'clear'
                });
                
                cfg.cn[0].cn = bullets;
            }
        }
        
        return cfg;
    },
    
    initEvents:  function()
    {
        Roo.log('-------- init events on tab group ---------');
        
        if(this.showPointer > 0){
            for (var i = 0; i < this.showPointer; i++){
                Roo.log(this.el.select('.carousel-inner > .bullet-' + i, true).first());
            }
        }
    },
    
    getChildContainer : function()
    {
        return this.carousel ? this.el.select('.carousel-inner', true).first() : this.el;
    },
    
    /**
    * register a Navigation item
    * @param {Roo.bootstrap.NavItem} the navitem to add
    */
    register : function(item)
    {
        this.tabs.push( item);
        item.navId = this.navId; // not really needed..
    
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
        
        if (typeof(pan) == 'number') {
            pan = this.tabs[pan];
        }
        if (typeof(pan) == 'string') {
            pan = this.getPanelByName(pan);
        }
        if (pan.tabId == this.getActivePanel().tabId) {
            return true;
        }
        var cur = this.getActivePanel();
        
        if (false === cur.fireEvent('beforedeactivate')) {
            return false;
        }
        
        if (this.carousel && typeof(Roo.get(document.body).dom.style.transition) != 'undefined') {
            
            this.transition = true;
            var dir = this.indexOfPanel(pan) > this.indexOfPanel(cur)  ? 'next' : 'prev';
            var lr = dir == 'next' ? 'left' : 'right';
            pan.el.addClass(dir); // or prev
            pan.el.dom.offsetWidth; // find the offset with - causing a reflow?
            cur.el.addClass(lr); // or right
            pan.el.addClass(lr);
            
            var _this = this;
            cur.el.on('transitionend', function() {
                Roo.log("trans end?");
                
                pan.el.removeClass([lr,dir]);
                pan.setActive(true);
                
                cur.el.removeClass([lr]);
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
        if (i > this.tabs.length) {
            return;
        }
        this.showPanel(this.tabs[i+1]);
    },
    showPanelPrev : function()
    {
        var i = this.indexOfPanel(this.getActivePanel());
        if (i  < 1) {
            return;
        }
        this.showPanel(this.tabs[i-1]);
    }
    
    
  
});

 

 
 
Roo.apply(Roo.bootstrap.TabGroup, {
    
    groups: {},
     /**
    * register a Navigation Group
    * @param {Roo.bootstrap.NavGroup} the navgroup to add
    */
    register : function(navgrp)
    {
        this.groups[navgrp.navId] = navgrp;
	
    },
    /**
    * fetch a Navigation Group based on the navigation ID
    * if one does not exist , it will get created.
    * @param {string} the navgroup to add
    * @returns {Roo.bootstrap.NavGroup} the navgroup 
    */
    get: function(navId) {
        if (typeof(this.groups[navId]) == 'undefined') {
            this.register(new Roo.bootstrap.TabGroup({ navId : navId }));
        }
        return this.groups[navId] ;
    }
    
    
    
});

 