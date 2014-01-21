/*
 * - LGPL
 *
 * row
 * 
 */ 
Roo.bootstrap.Navbar = function(config){
    Roo.bootstrap.Navbar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Navbar, Roo.bootstrap.Component,  {
    
    type: 'nav',
    inverse: false,
    bar: false,
    
    autoCreate : {
        cls: 'nav',
        tag: 'ul',
        role: 'navigation'
    },
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Navbar.superclass.getAutoCreate.call(this));
	
	if (this.bar) {
	    cfg = {
		tag: 'nav',
		cls: 'navbar',
		role: 'navigation'
	    }
	    
	    cfg.cn = [
		{
		    tag : 'ul',
		    cls: 'nav'
		}
	    ];
	    
	    return cfg;
	}
	
        cfg.cn = [
            {
                cls: 'nav',
                tag : 'ul'
            }
        ];
        
        if (['tabs','pills'].indexOf(this.type)!==-1) {
            cfg.cn[0].cls += ' nav-' + this.type
        } else {
            if (this.type!=='nav') {
            Roo.log('nav type must be nav/tabs/pills')
            }
            cfg.cn[0].cls += ' navbar-nav'
        }
        
        if (['stacked','justified'].indexOf(this.arrangement)!==-1) {
            cfg.cn[0].cls += ' nav-' + this.arrangement;
        }
        
        if (['fixed-top','fixed-bottom','static-top'].indexOf(this.position)> -1) {
            cfg.cls += ' navbar-' + this.position;
            cfg.tag = this.position  == 'fixed-bottom' ? 'footer' : 'header';
        }
        
        if (this.align === 'right') {
            cfg.cn[0].cls += ' navbar-right';
        }
        if (this.inverse) {
            cfg.cls += ' navbar-inverse';
            
        }
        /* type: nav | tabs | pills
         * arrangement: stacked | justified
         * position: fixed/static etc
         * inverse: true/false
         */
        
        
        return cfg;
    },
    
    getChildContainer : function() {
        return this.el.select('ul', true).first();
    }
   
});

 

 