/*
 * - LGPL
 *
 * nav progress bar
 * 
 */

/**
 * @class Roo.bootstrap.NavProgressBar
 * @extends Roo.bootstrap.Component
 * Bootstrap NavProgressBar class
 * 
 * @constructor
 * Create a new nav progress bar
 * @param {Object} config The config object
 */

Roo.bootstrap.NavProgressBar = function(config){
    Roo.bootstrap.NavProgressBar.superclass.constructor.call(this, config);

    this.bullets = this.bullets || [];
   
//    Roo.bootstrap.NavProgressBar.register(this);
     this.addEvents({
        /**
	     * @event changed
	     * Fires when the active item changes
	     * @param {Roo.bootstrap.NavProgressBar} this
	     * @param {Roo.bootstrap.NavProgressItem} selected The item selected
	     * @param {Roo.bootstrap.NavProgressItem} prev The previously selected item 
         */
        'changed': true
     });
    
};

Roo.extend(Roo.bootstrap.NavProgressBar, Roo.bootstrap.Component,  {
    
    bullets : [],
    barItems : [],
    
    getAutoCreate : function()
    {
        var cfg = Roo.apply({}, Roo.bootstrap.NavProgressBar.superclass.getAutoCreate.call(this));
        
        cfg = {
            tag : 'div',
            cls : 'roo-navigation-bar-group',
            cn : [
                {
                    tag : 'div',
                    cls : 'roo-navigation-top-bar'
                },
                {
                    tag : 'ul',
                    cls : 'roo-navigation-bar'
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
        Roo.log('initEvent????');
        
    },
    
    onRender : function(ct, position) 
    {
        Roo.log('render bar???');
        
        Roo.bootstrap.NavProgressBar.superclass.onRender.call(this, ct, position);
        
        if(this.bullets.length){
            Roo.each(this.bullets, function(b){
               this.addItem(b);
            }, this);
        }
        
    },
    
    addItem : function(cfg)
    {
        var item = new Roo.bootstrap.NavProgressItem(cfg);
        
        item.parentId = this.id;
        item.render(this.el.select('.roo-navigation-bar', true).first(), null);
        
        this.barItems.push(item);
        
        this.formatBullets();
        
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
    
    formatBullets : function()
    {
        if(!this.barItems.length){
            return;
        }
        
        var width = 100 / this.barItems.length;
        
        Roo.each(this.barItems, function(i){
            i.el.setStyle('width', width + '%');
        }, this);
    }
    
});
