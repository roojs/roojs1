/*
 * - LGPL
 *
 * nav progress bar
 * 
 */

/**
 * @class Roo.bootstrap.nav.ProgressBar
 * @extends Roo.bootstrap.Component
 * @children Roo.bootstrap.nav.ProgressBarItem
 * Bootstrap NavProgressBar class
 * 
 * @constructor
 * Create a new nav progress bar - a bar indicating step along a process
 * @param {Object} config The config object
 */

Roo.bootstrap.nav.ProgressBar = function(config){
    Roo.bootstrap.nav.ProgressBar.superclass.constructor.call(this, config);

    this.bullets = this.bullets || [];
   
//    Roo.bootstrap.nav.ProgressBar.register(this);
     this.addEvents({
        /**
	     * @event changed
	     * Fires when the active item changes
	     * @param {Roo.bootstrap.nav.ProgressBar} this
	     * @param {Roo.bootstrap.nav.ProgressItem} selected The item selected
	     * @param {Roo.bootstrap.nav.ProgressItem} prev The previously selected item 
         */
        'changed': true
     });
    
};

Roo.extend(Roo.bootstrap.nav.ProgressBar, Roo.bootstrap.Component,  {
    /**
     * @cfg {Roo.bootstrap.nav.ProgressItem} NavProgressBar:bullets[]
     * Bullets for the Nav Progress bar for the toolbar
     */
    bullets : [],
    barItems : [],
    
    getAutoCreate : function()
    {
        var cfg = Roo.apply({}, Roo.bootstrap.nav.ProgressBar.superclass.getAutoCreate.call(this));
        
        cfg = {
            tag : 'div',
            cls : 'roo-navigation-bar-group',
            cn : [
                {
                    tag : 'div',
                    cls : 'roo-navigation-top-bar'
                },
                {
                    tag : 'div',
                    cls : 'roo-navigation-bullets-bar',
                    cn : [
                        {
                            tag : 'ul',
                            cls : 'roo-navigation-bar'
                        }
                    ]
                },
                
                {
                    tag : 'div',
                    cls : 'roo-navigation-bottom-bar'
                }
            ]
            
        };
        
        return cfg;
        
    },
    
    initEvents: function() 
    {
        
    },
    
    onRender : function(ct, position) 
    {
        Roo.bootstrap.nav.ProgressBar.superclass.onRender.call(this, ct, position);
        
        if(this.bullets.length){
            Roo.each(this.bullets, function(b){
               this.addItem(b);
            }, this);
        }
        
        this.format();
        
    },
    
    addItem : function(cfg)
    {
        var item = new Roo.bootstrap.nav.ProgressItem(cfg);
        
        item.parentId = this.id;
        item.render(this.el.select('.roo-navigation-bar', true).first(), null);
        
        if(cfg.html){
            var top = new Roo.bootstrap.Element({
                tag : 'div',
                cls : 'roo-navigation-bar-text'
            });
            
            var bottom = new Roo.bootstrap.Element({
                tag : 'div',
                cls : 'roo-navigation-bar-text'
            });
            
            top.onRender(this.el.select('.roo-navigation-top-bar', true).first(), null);
            bottom.onRender(this.el.select('.roo-navigation-bottom-bar', true).first(), null);
            
            var topText = new Roo.bootstrap.Element({
                tag : 'span',
                html : (typeof(cfg.position) != 'undefined' && cfg.position == 'top') ? cfg.html : ''
            });
            
            var bottomText = new Roo.bootstrap.Element({
                tag : 'span',
                html : (typeof(cfg.position) != 'undefined' && cfg.position == 'top') ? '' : cfg.html
            });
            
            topText.onRender(top.el, null);
            bottomText.onRender(bottom.el, null);
            
            item.topEl = top;
            item.bottomEl = bottom;
        }
        
        this.barItems.push(item);
        
        return item;
    },
    
    getActive : function()
    {
        var active = false;
        
        Roo.each(this.barItems, function(v){
            
            if (!v.isActive()) {
                return;
            }
            
            active = v;
            return false;
            
        });
        
        return active;
    },
    
    setActiveItem : function(item)
    {
        var prev = false;
        
        Roo.each(this.barItems, function(v){
            if (v.rid == item.rid) {
                return ;
            }
            
            if (v.isActive()) {
                v.setActive(false);
                prev = v;
            }
        });

        item.setActive(true);
        
        this.fireEvent('changed', this, item, prev);
    },
    
    getBarItem: function(rid)
    {
        var ret = false;
        
        Roo.each(this.barItems, function(e) {
            if (e.rid != rid) {
                return;
            }
            
            ret =  e;
            return false;
        });
        
        return ret;
    },
    
    indexOfItem : function(item)
    {
        var index = false;
        
        Roo.each(this.barItems, function(v, i){
            
            if (v.rid != item.rid) {
                return;
            }
            
            index = i;
            return false
        });
        
        return index;
    },
    
    setActiveNext : function()
    {
        var i = this.indexOfItem(this.getActive());
        
        if (i > this.barItems.length) {
            return;
        }
        
        this.setActiveItem(this.barItems[i+1]);
    },
    
    setActivePrev : function()
    {
        var i = this.indexOfItem(this.getActive());
        
        if (i  < 1) {
            return;
        }
        
        this.setActiveItem(this.barItems[i-1]);
    },
    
    format : function()
    {
        if(!this.barItems.length){
            return;
        }
     
        var width = 100 / this.barItems.length;
        
        Roo.each(this.barItems, function(i){
            i.el.setStyle('width', width + '%');
            i.topEl.el.setStyle('width', width + '%');
            i.bottomEl.el.setStyle('width', width + '%');
        }, this);
        
    }
    
});
