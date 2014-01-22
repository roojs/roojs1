/*
 * - LGPL
 *
 * row
 * 
 */ 
Roo.bootstrap.Navbar.Item = function(config){
    Roo.bootstrap.Navbar.Item.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Navbar.Item, Roo.bootstrap.Component,  {
    
    href : false,
    html : false,
    badge : '',
    
    getAutoCreate : function(){
        
        var cfg = Roo.apply({}, Roo.bootstrap.Navbar.Item.superclass.getAutoCreate.call(this));
	
	cfg = {
	    tag: 'li'
	}
	cfg.cn = [
            {
		tag: 'p',
		html: 'Text'
            }
        ];
	
        cfg.cn[0].html = this.html || cfg.cn[0].html ;
	if (this.menu) {
	    cfg.cn[0].tag='a';
	    cfg.cn[0].href='#';
	    cfg.cn[0].html += " <span class='caret'></span>";
	//}else if (!this.href) {
	//    cfg.cn[0].tag='p';
	//    cfg.cn[0].cls='navbar-text';
	} else {
	    cfg.cn[0].tag='a';
	    cfg.cn[0].href=this.href||'#';
	    cfg.cn[0].html=this.html;
	}
        
        if (this.glyphicon) {
            cfg.html = ' ' + cfg.html;
            cfg.cn=cfg.cn||[]
            cfg.cn.unshift(
                {
                    tag: 'span',
                    cls: 'glyphicon glyphicon-' + this.glyphicon
                }
            );
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
    },
    initEvents: function() {
       // Roo.log('init events?');
       // Roo.log(this.el.dom);
        this.el.select('a',true).on('click',
                function(e) {
                    this.fireEvent('click', this);
                },
                this
        );
    }
   
});

 

 