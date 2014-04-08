/*
 * - LGPL
 *
 * row
 * 
 */

/**
 * @class Roo.bootstrap.Navbar.Item
 * @extends Roo.bootstrap.Component
 * Bootstrap Navbar.Button class
 * @cfg {String} href  link to
 * @cfg {String} html content of button
 * @cfg {String} badge text inside badge
 * @cfg {String} glyphicon name of glyphicon
 * @cfg {String} font_awesome_icon name of font awesome icon
  
 * @constructor
 * Create a new Navbar Button
 * @param {Object} config The config object
 */
Roo.bootstrap.Navbar.Item = function(config){
    Roo.bootstrap.Navbar.Item.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Navbar.Item, Roo.bootstrap.Component,  {
    
    href: false,
    html: '',
    badge: '',
    icon: false,
    glyphicon: false,
    font_awesome_icon: false,
    
    getAutoCreate : function(){
        
        var cfg = Roo.apply({}, Roo.bootstrap.Navbar.Item.superclass.getAutoCreate.call(this));
	
	if (this.parent().parent().sidebar === true) {
	    cfg = {
		tag: 'li',
		cls: '',
		cn: [
		    {
			tag: 'p',
			cls: ''
		    }
		]
	    }
	    
	    if (this.html) {
		cfg.cn[0].html = this.html;
	    }
	    
	    if (this.active) {
		this.cls += ' active';
	    }
	    
	    if (this.menu) {
		cfg.cn[0].cls += ' dropdown-toggle';
		cfg.cn[0].html = (cfg.cn[0].html || this.html) + '<span class="glyphicon glyphicon-chevron-down"></span>';
	    }
	    
	    if (this.href) {
		cfg.cn[0].tag = 'a',
		cfg.cn[0].href = this.href;
	    }
	    
	    if (this.glyphicon) {
		cfg.cn[0].html = '<i class="glyphicon glyphicon-'+this.glyphicon+'"></i><span>' + cfg.cn[0].html || this.html + '</span>'
	    }
            
            if (this.font_awesome_icon) {
		cfg.cn[0].html = '<i class="icon-'+this.font_awesome_icon+'"></i><span>' + cfg.cn[0].html || this.html + '</span>'
	    }
	    
	    return cfg;
	}
	
	cfg = {
	    tag: 'li'
	}
	cfg.cn = [
            {
		tag: 'p',
		html: 'Text'
            }
        ];
        
        if (this.glyphicon) {
            if(cfg.html){cfg.html = ' ' + this.html};
            cfg.cn=[
                {
                    tag: 'span',
                    cls: 'glyphicon glyphicon-' + this.glyphicon
                }
            ];
        }
	
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
 

 