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
    
    bar: true,
    brand: '',
    inverse: false,
    collapse: false,
    position: '',
    
    type: 'nav',
    arrangement: '',
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Navbar.superclass.getAutoCreate.call(this));
	
	if (this.bar === true) {
	    cfg = {
		tag: 'nav',
		cls: 'navbar',
		role: 'navigation',
		cn: []
	    }
	    
	    cfg.cls += this.inverse ? ' navbar-inverse' : ' navbar-default';
	    
	    if (['fixed-top','fixed-bottom','static-top'].indexOf(this.position)>-1) {
		cfg.cls += ' navbar-' + this.position;
		cfg.tag = this.position  == 'fixed-bottom' ? 'footer' : 'header';
	    } else {
		Roo.log('Property \'position\' of Navbar must be either fixed-top, fixed-bottom or static-top')
	    }
	    
	    if (this.brand!==''||this.collapse) {
		var headercontents = [
		    {
			tag: 'button',
			type: 'button',
			cls: 'navbar-toggle',
			'data-toggle': 'collapse',
			'data-target': '#',
			cn: [
			    {
				tag: 'span',
				cls: 'sr-only',
				html: 'Toggle navigation'
			    },
			    {
				tag: 'span',
				cls: 'icon-bar'
			    },
			    {
				tag: 'span',
				cls: 'icon-bar'
			    },
			    {
				tag: 'span',
				cls: 'icon-bar'
			    }
			]
		    }
		]
		if (this.brand) {
		    headercontents.push(
			{
			    tag: 'a',
			    href: '#',
			    html: this.brand,
			    cls: 'navbar-brand'
			}
		    )
		}
		cfg.cn.push(
		    {
			tag:'div',
			cls: 'navbar-header',
			cn: headercontents
		    }
		)
	    }
	    
	    if (this.collapse) {
		cfg.cn.push(
		    {
			tag: 'div',
			cls: 'collapse navbar-collapse'
		    }
		)
	    }
	    
	    if (this.contained) {
		cfg.cn = [{
		    tag: 'div',
		    cls: 'container',
		    cn: cfg.cn
		}]
	    }
	    
	    return cfg;
	
	} else if (this.bar === false) {
	    
	} else {
	    Roo.log('Property \'bar\' in of Navbar must be either true or false')
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
	if (this.collapse) {
	    return this.el.select('.collapse',true).first();
	}
	
        return this.el;
    }
   
});

 

 