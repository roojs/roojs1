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
    bar: true,
    collapse: false,
    
    arrangement: '',
    position: '',
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Navbar.superclass.getAutoCreate.call(this));
	
	if (this.bar) {
	    cfg = {
		tag: 'nav',
		cls: 'navbar',
		role: 'navigation'
	    }
	    
	    cfg.cls += this.inverse ? ' navbar-inverse' : '';
	    
	    if (['fixed-top','fixed-bottom','static-top'].indexOf(this.position)>-1) {
		cfg.cls += ' navbar-' + this.position;
		cfg.tag = this.position  == 'fixed-bottom' ? 'footer' : 'header';
	    }
	    
	    if (this.brand||this.collapse) {
		cfg.cn=[]
		cfg.cn.push({
		    tag: 'div',
		    cls: 'navbar-header',
		    cn: []
		})
		if (this.brand) {
		    cfg.cn[0].cn.push({
			tag: 'a',
			cls:'navbar-brand',
			href:'#',
			html: this.brand
		    })
		}
		if (this.collapse) {
		    cfg.cn.push({
			tag: 'div',
			cls: 'collapse navbar-collapse',
			items: this.items
		    })
		    delete this.items
		}
	    }
	    
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
        return this.el;
    }
   
});

 

 