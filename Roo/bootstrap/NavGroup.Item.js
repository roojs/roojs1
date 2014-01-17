/*
 * - LGPL
 *
 * row
 * 
 */ 
Roo.bootstrap.NavGroup.Item = function(config){
    Roo.bootstrap.NavGroup.Item.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Navbar.Item, Roo.bootstrap.Component,  {
    
    href : false,
    html : false,
    badge : '',
    
    autoCreate : {
        tag : 'li'
    },
    
    getAutoCreate : function(){
        
        var cfg = Roo.apply({}, Roo.bootstrap.NavGroup.Item.superclass.getAutoCreate.call(this));
	cfg.cn = [
            {
		tag: 'p',
		html: 'Text'
            }
        ];
	
        cfg.cn[0].html = this.html || cfg.cn[0].html ;
	
	if (!this.href) {
	    cfg.cn[0].tag='p';
	    cfg.cn[0].cls='navbar-text';
	} else {
	    cfg.cn[0].tag='a';
	    cfg.cn[0].href=this.href;
	    cfg.cn[0].html=this.html;
	}
	
	if (this.badge !== '') {
	    
	    cfg.cn[0].cn=[
		cfg.cn[0].html + ' ',
		{
		    tag: 'span',
		    cls: 'badge',
		    html: this.badge
		}
	    ];
	    cfg.cn[0].html=''
	}
	 
	
        return cfg;
    }
   
});

 

 