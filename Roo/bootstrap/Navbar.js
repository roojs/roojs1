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
    arrangement: '',
    position: '',
    inverse: false,
    collapse: false,
    align: '',
    
    autoCreate : {
	cls: 'navbar navbar-default',
	tag : 'nav',
	role : 'navigation'
    },
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Navbar.superclass.getAutoCreate.call(this));
	
	cfg.cn = [
	    {
		cls: 'nav',
		tag : 'ul'
	    }
	]
	
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
	
	if (['fixed-top','fixed-bottom','static-top'].indexOf(this.position)!==-1) {
	    cfg.cn[0].cls += ' navbar-' + this.position;
	}
	 
	if (this.collapse) {
	    cfg.tag  = 'div';
	    cfg.cls =  'collapse navbar-collapse ';
		
	    
	}
	
	if (this.align === 'right') {
	    cfg.cn[0].cls += ' navbar-right';
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
    },
   
});

 

 