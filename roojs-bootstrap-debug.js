/*
 * - LGPL
 *
 * base class for bootstrap elements.
 * 
 */

Roo.bootstrap = Roo.bootstrap || {};
/**
 * @class Roo.bootstrap.Component
 * @extends Roo.Component
 * Bootstrap Component base class
 * @cfg {String} cls css class
 * @cfg {String} style any extra css
 * @cfg {Object} xattr extra attributes to add to 'element' (used by builder to store stuff.)
 
 * 
 * @constructor
 * Do not use directly - it does not do anything..
 * @param {Object} config The config object
 */



Roo.bootstrap.Component = function(config){
    Roo.bootstrap.Component.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Component, Roo.BoxComponent,  {
    
    
    allowDomMove : false, // to stop relocations in parent onRender...
    
    cls : false,
    
    style : false,
    
    autoCreate : false,
    
    initEvents : function() {  },
    
    xattr : false,
    
    parentId : false,
    
    parent: function() {
        // returns the parent component..
        return Roo.ComponentMgr.get(this.parentId)
        
        
    },
    
    // private
    onRender : function(ct, position)
    {
       // Roo.log("Call onRender: " + this.xtype);
        
        Roo.bootstrap.Component.superclass.onRender.call(this, ct, position);
        
        if(this.el){
            if (this.el.attr('xtype')) {
                this.el.dom.removeAttribute('xtype');
                this.initEvents();
            }
            
            return;
        }
        
         
        
        var cfg = Roo.apply({},  this.getAutoCreate());
        cfg.id = Roo.id();
        
        // fill in the extra attributes 
        if (this.xattr && typeof(this.xattr) =='object') {
            for (var i in this.xattr) {
                cfg[i] = this.xattr[i];
            }
        }
        
        if (this.cls) {
            cfg.cls += ' ' + this.cls;
        }
        if (this.style) { // fixme needs to support more complex style data.
            cfg.style = this.style;
        }
        this.el = ct.createChild(cfg, position);
        if(this.tabIndex !== undefined){
            this.el.dom.setAttribute('tabIndex', this.tabIndex);
        }
        this.initEvents();
	
        
    },
    
    getChildContainer : function()
    {
        return this.el;
    },
    
    addxtype : function (tree, cntr) {
        var cn = this;
        cntr = typeof(cntr == 'undefined' ) ? 'getChildContainer' : cntr;
        
        // render the element if it's not BODY.
        if (tree.xtype != 'Body') {
            
            cn = Roo.factory(tree);
           // Roo.log(cn);
            cn.parentType = this.xtype; //??
            cn.parentId = this.id;
            
            // does the container contain child eleemnts with 'xtype' attributes.
            // that match this xtype..
            // note - when we render we create these as well..
            // so we should check to see if body has xtype set.
            if (Roo.get(document.body).attr('xtype') == 'Roo.bootstrap.Body') {
            
                var echild = Roo.get(this[cntr]()).child('*[xtype]');
                if (echild) {
                  //  Roo.log("found child for " + this.xtype +": " + echild.attr('xtype') );
                    cn.el = echild;
                    //echild.dom.removeAttribute('xtype');
                } else {
                    Roo.log("missing child for " + this.xtype);
                }
            }
            cn.render(this[cntr]());
            // then add the element..
        }
        
        
        // handle the kids..
        
        var nitems = [];
        if (typeof (tree.menu) != 'undefined') {
            tree.menu.parentType = cn.xtype;
            tree.menu.triggerEl = cn.el;
            nitems.push(cn.addxtype(Roo.apply({}, tree.menu)));
            
        }
        if (typeof (tree.buttons) != 'undefined' && typeof(cn.getButtonContainer) == 'function') {
            
            for(var i =0;i < tree.buttons.length;i++) {
                nitems.push(cn.addxtype(Roo.apply({}, tree.buttons[i]), 'getButtonContainer'));
            }
            
            
        }
        if (!tree.items || !tree.items.length) {
            cn.items = nitems;
            return cn;
        }
        var items = tree.items;
        delete tree.items;
        
        //Roo.log(items.length);
            // add the items..
        for(var i =0;i < items.length;i++) {
            nitems.push(cn.addxtype(Roo.apply({}, items[i])));
        }
	
        cn.items = nitems;
	
	
        return cn;
    }
    
    
    
    
});

 /*
 * - LGPL
 *
 * page container.
 * 
 */ 
Roo.bootstrap.Body = function(config){
    Roo.bootstrap.Body.superclass.constructor.call(this, config);
    this.el = Roo.get(document.body);
};

Roo.extend(Roo.bootstrap.Body, Roo.bootstrap.Component,  {
      
	autoCreate : {
        cls: 'container'
    },
    onRender : function(ct, position){
        
        
        //this.el.addClass([this.fieldClass, this.cls]);
        
    }
    
    
 
   
});

 /*
 * - LGPL
 *
 * button group
 * 
 */


/**
 * @class Roo.bootstrap.ButtonGroup
 * @extends Roo.bootstrap.Component
 * Bootstrap ButtonGroup class
 * @cfg {String} size lg | sm | xs (default empty normal)
 * @cfg {String} align vertical | justified  (default none)
 * @cfg {String} direction up | down (default down)
 * @cfg {Boolean} toolbar false | true
 * @cfg {Boolean} btn true | false
 * 
 * 
 * @constructor
 * Create a new Input
 * @param {Object} config The config object
 */

Roo.bootstrap.ButtonGroup = function(config){
    Roo.bootstrap.ButtonGroup.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.ButtonGroup, Roo.bootstrap.Component,  {
    
    size: '',
    align: '',
    direction: '',
    toolbar: false,
    btn: true,

    getAutoCreate : function(){
        var cfg = {
            cls: 'btn-group',
            html : null
        }
        
        cfg.html = this.html || cfg.html;
        
        if (this.toolbar) {
            cfg = {
                cls: 'btn-toolbar',
                html: null
            }
            
            return cfg;
        }
        
        if (['vertical','justified'].indexOf(this.align)!==-1) {
            cfg.cls = 'btn-group-' + this.align;
            
            if (this.align == 'justified') {
                console.log(this.items);
            }
        }
        
        if (['lg','sm','xs'].indexOf(this.size)!==-1) {
            cfg.cls += ' btn-group-' + this.size;
        }
        
        if (this.direction == 'up') {
            cfg.cls += ' dropup' ;
        }
        
        return cfg;
    }
   
});

 /*
 * - LGPL
 *
 * button
 * 
 */

/**
 * @class Roo.bootstrap.Button
 * @extends Roo.bootstrap.Component
 * Bootstrap Button class
 * @cfg {String} html The button content
 * @cfg {String} weight default (or empty) | primary | success | info | warning | danger
 * @cfg {String} size empty | lg | sm | xs
 * @cfg {String} tag empty | a | input | submit
 * @cfg {String} href empty or href
 * @cfg {Boolean} disabled false | true
 * @cfg {Boolean} isClose false | true
 * @cfg {String} glyphicon empty | adjust | align-center | align-justify | align-left | align-right | arrow-down | arrow-left | arrow-right | arrow-up | asterisk | backward | ban-circle | barcode | bell | bold | book | bookmark | briefcase | bullhorn | calendar | camera | certificate | check | chevron-down | chevron-left | chevron-right | chevron-up | circle-arrow-down | circle-arrow-left | circle-arrow-right | circle-arrow-up | cloud | cloud-download | cloud-upload | cog | collapse-down | collapse-up | comment | compressed | copyright-mark | credit-card | cutlery | dashboard | download | download-alt | earphone | edit | eject | envelope | euro | exclamation-sign | expand | export | eye-close | eye-open | facetime-video | fast-backward | fast-forward | file | film | filter | fire | flag | flash | floppy-disk | floppy-open | floppy-remove | floppy-save | floppy-saved | folder-close | folder-open | font | forward | fullscreen | gbp | gift | glass | globe | hand-down | hand-left | hand-right | hand-up | hd-video | hdd | header | headphones | heart | heart-empty | home | import | inbox | indent-left | indent-right | info-sign | italic | leaf | link | list | list-alt | lock | log-in | log-out | magnet | map-marker | minus | minus-sign | move | music | new-window | off | ok | ok-circle | ok-sign | open | paperclip | pause | pencil | phone | phone-alt | picture | plane | play | play-circle | plus | plus-sign | print | pushpin | qrcode | question-sign | random | record | refresh | registration-mark | remove | remove-circle | remove-sign | repeat | resize-full | resize-horizontal | resize-small | resize-vertical | retweet | road | save | saved | screenshot | sd-video | search | send | share | share-alt | shopping-cart | signal | sort | sort-by-alphabet | sort-by-alphabet-alt | sort-by-attributes | sort-by-attributes-alt | sort-by-order | sort-by-order-alt | sound-5-1 | sound-6-1 | sound-7-1 | sound-dolby | sound-stereo | star | star-empty | stats | step-backward | step-forward | stop | subtitles | tag | tags | tasks | text-height | text-width | th | th-large | th-list | thumbs-down | thumbs-up | time | tint | tower | transfer | trash | tree-conifer | tree-deciduous | unchecked | upload | usd | user | volume-down | volume-off | volume-up | warning-sign | wrench | zoom-in | zoom-out
 * @cfg {String} badge text for badge
 * @cfg {String} theme default (or empty) | glow
 * @cfg {Boolean} inverse false | true
 * @cfg {Boolean} toggle false | true
 * @cfg {String} ontext text for on toggle state
 * @cfg {String} offtext text for off toggle state
 * @cfg {Boolean} defaulton true | false
 * 
 * @constructor
 * Create a new button
 * @param {Object} config The config object
 */


Roo.bootstrap.Button = function(config){
    Roo.bootstrap.Button.superclass.constructor.call(this, config);
    this.addEvents({
        // raw events
        /**
         * @event click
         * The raw click event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "click" : true
    });
};

Roo.extend(Roo.bootstrap.Button, Roo.bootstrap.Component,  {
    html: false,
    active: false,
    weight: '',
    size: '',
    tag: 'button',
    href: '',
    disabled: false,
    isClose: false,
    glyphicon: '',
    badge: '',
    theme: 'default',
    inverse: false,
    
    toggle: false,
    ontext: 'ON',
    offtext: 'OFF',
    defaulton: true,
    
    getAutoCreate : function(){
        
        var cfg = {
            tag : 'button',
            cls : 'roo-button',
            html: 'hello'
        };
        
        if (['a', 'button', 'input', 'submit'].indexOf(this.tag) < 0) {
            throw "Invalid value for tag: " + this.tag + ". must be a, button, input or submit.";
            this.tag = 'button';
        } else {
            cfg.tag = this.tag;
        }
        cfg.html = this.html || cfg.html;
        
        if (this.toggle===true) {
            cfg={
                tag: 'div',
                cls: 'slider-frame roo-button',
                cn: [
                    {
                        tag: 'span',
                        'data-on-text':'ON',
                        'data-off-text':'OFF',
                        cls: 'slider-button',
                        html: this.offtext
                    }
                ]
            };
            
            if (['default', 'primary', 'success', 'info', 'warning', 'danger', 'link'].indexOf(this.weight) > -1) {
                cfg.cls += ' '+this.weight;
            }
            
            return cfg;
        }
        
        if (this.isClose) {
            cfg.cls += ' close';
            
            cfg["aria-hidden"] = true;
            
            cfg.html = "&times;";
            
            return cfg;
        }
        
         
        if (this.theme==='default') {
            cfg.cls = 'btn roo-button';
            
            if (this.parentType != 'Navbar') {
                this.weight = this.weight.length ?  this.weight : 'default';
            }
            if (['default', 'primary', 'success', 'info', 'warning', 'danger', 'link'].indexOf(this.weight) > -1) {
                
                cfg.cls += ' btn-' + this.weight;
            }
        } else if (this.theme==='glow') {
            
            cfg.tag = 'a';
            cfg.cls = 'btn-glow roo-button';
            
            if (['default', 'primary', 'success', 'info', 'warning', 'danger', 'link'].indexOf(this.weight) > -1) {
                
                cfg.cls += ' ' + this.weight;
            }
        }
   
        
        if (this.inverse) {
            this.cls += ' inverse';
        }
        
        
        if (this.active) {
            cfg.cls += ' active';
        }
        
        cfg.cls += this.size.length ? (' btn-' + this.size) : '';
         
        //gsRoo.log(this.parentType);
        if (this.parentType === 'Navbar') {
            cfg.tag = 'li';
            
            cfg.cls = '';
            cfg.cn =  [{
                tag : 'a',
                cls : 'roo-button',
                html : this.html,
                href : this.href || '#'
            }];
            if (this.menu) {
                cfg.cn[0].html = this.html  + ' <span class="caret"></span>';
                cfg.cls += ' dropdown';
            }   
            
            delete cfg.html;
            
        } else if (this.menu) {
            cfg.tag = 'a';
            cfg.cls += ' dropdown test';
        }
        
        
        
        if (this.disabled) {
            cfg.disabled = 'disabled';
        }
        //????
        if (this.items) {
            Roo.log('changing to ul' );
            cfg.tag = 'ul';
            this.glyphicon = 'caret';
        }
        
        if (this.glyphicon) {
            cfg.html = ' ' + cfg.html;
            
            cfg.cn = [
                {
                    tag: 'span',
                    cls: 'glyphicon glyphicon-' + this.glyphicon
                }
            ];
        }
        
        if (this.badge) {
            cfg.html += ' ';
            
            cfg.tag = 'a';
            
            cfg.cls='btn roo-button';
            
            cfg.href=this.href;
            
            cfg.cn = [
                cfg.html,
                {
                    tag: 'span',
                    cls: 'badge',
                    html: this.badge
                }
            ];
            
            cfg.html='';
        }
        
        if (cfg.tag !== 'a' && this.href !== '') {
            throw "Tag must be a to set href.";
        } else if (this.href.length > 0) {
            cfg.href = this.href;
        }
        
        return cfg;
    },
    initEvents: function() {
       // Roo.log('init events?');
       // Roo.log(this.el.dom);
       if (this.el.hasClass('roo-button')) {
            this.el.on('click', this.onClick, this);
       } else {
            this.el.select('.roo-button').on('click', this.onClick, this);
       }
       
       
        
    },
    onClick : function(e)
    {
        Roo.log('button on click ');
        e.preventDefault();
        this.fireEvent('click', this, e);
    }
    
    
});

 /*
 * - LGPL
 *
 * column
 * 
 */

/**
 * @class Roo.bootstrap.Column
 * @extends Roo.bootstrap.Component
 * Bootstrap Column class
 * @cfg {Number} xs colspan out of 12 for mobile-sized screens
 * @cfg {Number} sm colspan out of 12 for tablet-sized screens
 * @cfg {Number} md colspan out of 12 for computer-sized screens
 * @cfg {Number} lg colspan out of 12 for large computer-sized screens
 * @cfg {String} html content of column.
 * 
 * @constructor
 * Create a new Column
 * @param {Object} config The config object
 */

Roo.bootstrap.Column = function(config){
    Roo.bootstrap.Column.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Column, Roo.bootstrap.Component,  {
    
    xs: null,
    sm: null,
    md: null,
    lg: null,
    html: '',
    offset: 0,
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Column.superclass.getAutoCreate.call(this));
        
        cfg = {
            tag: 'div',
            cls: 'column'
        };
        
        var settings=this;
        ['xs','sm','md','lg'].map(function(size){
            if (settings[size]) {
                cfg.cls += ' col-' + size + '-' + settings[size];
            }
        });
        if (this.html.length) {
            cfg.html = this.html;
        }
	
        return cfg;
    }
   
});

 

 /*
 * - LGPL
 *
 * page container.
 * 
 */


/**
 * @class Roo.bootstrap.Container
 * @extends Roo.bootstrap.Component
 * Bootstrap Container class
 * @cfg {Boolean} jumbotron is it a jumbotron element
 * @cfg {String} html content of element
 * @cfg {String} well (lg|sm|md) a well, large, small or medium.
 * @cfg {String} panel (primary|success|info|warning|danger) render as a panel.
 * @cfg {String} header content of header (for panel)
 * @cfg {String} footer content of footer (for panel)
 * @cfg {String} sticky (footer|wrap|push) block to use as footer or body- needs css-bootstrap/sticky-footer.css
 *     
 * @constructor
 * Create a new Container
 * @param {Object} config The config object
 */

Roo.bootstrap.Container = function(config){
    Roo.bootstrap.Container.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Container, Roo.bootstrap.Component,  {
    
    jumbotron : false,
    well: '',
    panel : '',
    header: '',
    footer : '',
    sticky: '',
  
     
    getChildContainer : function() {
        if (this.panel.length) {
            return this.el.select('.panel-body',true).first();
        }
        
        return this.el;
    },
    
    
    getAutoCreate : function(){
        
        var cfg = {
            html : '',
            cls : ''
        };
        if (this.jumbotron) {
            cfg.cls = 'jumbotron';
        }
        if (this.cls) {
            cfg.cls = this.cls + '';
        }
        
        if (this.sticky.length) {
            var bd = Roo.get(document.body);
            if (!bd.hasClass('bootstrap-sticky')) {
                bd.addClass('bootstrap-sticky');
                Roo.select('html',true).setStyle('height', '100%');
            }
             
            cfg.cls += 'bootstrap-sticky-' + this.sticky;
        }
	
	
        if (this.well.length) {
            switch (this.well) {
                case 'lg':
                case 'sm':
                    cfg.cls +=' well well-' +this.well;
                    break;
                default:
                    cfg.cls +=' well';
                    break;
            }
        }
        
        var body = cfg;
        
        if (this.panel.length) {
            cfg.cls += 'panel panel-' + this.panel;
            cfg.cn = [];
            if (this.header.length) {
                cfg.cn.push({
                    
                    cls : 'panel-heading',
                    cn : [{
                        tag: 'h3',
                        cls : 'panel-title',
                        html : this.header
                    }]
                    
                });
            }
            body = false;
            cfg.cn.push({
                cls : 'panel-body',
                html : this.html
            });
            
            
            if (this.footer.length) {
                cfg.cn.push({
                    cls : 'panel-footer',
                    html : this.footer
                    
                });
            }
            
        }
        if (body) {
            body.html = this.html || cfg.html;
        }
        if (!cfg.cls.length) {
            cfg.cls =  'container';
        }
        
        return cfg;
    }
   
});

 /*
 * - LGPL
 *
 * image
 * 
 */


/**
 * @class Roo.bootstrap.Img
 * @extends Roo.bootstrap.Component
 * Bootstrap Img class
 * @cfg {Boolean} imgResponsive false | true
 * @cfg {String} border rounded | circle | thumbnail
 * @cfg {String} src image source
 * @cfg {String} alt image alternative text
 * 
 * @constructor
 * Create a new Input
 * @param {Object} config The config object
 */

Roo.bootstrap.Img = function(config){
    Roo.bootstrap.Img.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Img, Roo.bootstrap.Component,  {
    
    imgResponsive: true,
    border: '',
    src: '',

    getAutoCreate : function(){
        
        cfg = {
            tag: 'img',
            cls: 'img-responsive',
            html : null
        }
        
        cfg.html = this.html || cfg.html;
        
        cfg.src = this.src || cfg.src;
        
        if (['rounded','circle','thumbnail'].indexOf(this.border)>-1) {
            cfg.cls += ' img-' + this.border;
        }
        
        if(this.alt){
            cfg.alt = this.alt;
        }
        
        return cfg;
    }
   
});

 /*
 * - LGPL
 *
 * header
 * 
 */

/**
 * @class Roo.bootstrap.Header
 * @extends Roo.bootstrap.Component
 * Bootstrap Header class
 * @cfg {String} html content of header
 * @cfg {Number} level (1|2|3|4|5|6) default 1
 * 
 * @constructor
 * Create a new Header
 * @param {Object} config The config object
 */


Roo.bootstrap.Header  = function(config){
    Roo.bootstrap.Header.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Header, Roo.bootstrap.Component,  {
    
    //href : false,
    html : false,
    level : 1,
    
    
    
    getAutoCreate : function(){
        
        var cfg = {
            tag: 'h' + (1 *this.level),
            html: this.html || 'fill in html'
        } ;
        
        return cfg;
    }
   
});

 

 /*
 * - LGPL
 *
 * menu
 * 
 */

/**
 * @class Roo.bootstrap.Menu
 * @extends Roo.bootstrap.Component
 * Bootstrap Menu class - container for MenuItems
 * @cfg {String} type type of menu
 * 
 * @constructor
 * Create a new Menu
 * @param {Object} config The config object
 */


Roo.bootstrap.Menu = function(config){
    Roo.bootstrap.Menu.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Menu, Roo.bootstrap.Component,  {
    
   /// html : false,
    //align : '',
    triggerEl : false,
    type: false,
    
    
    getChildContainer : function() {
        return this.el;  
    },
    
    getAutoCreate : function(){
	 
	//if (['right'].indexOf(this.align)!==-1) {
	//    cfg.cn[1].cls += ' pull-right'
	//}
	var cfg = {
	    tag : 'ul',
	    cls : 'dropdown-menu' 
	    
	}
	
	if (this.type==='submenu') {
	    cfg.cls='submenu active'
	}
	
        return cfg;
    },
    initEvents : function() {
       // Roo.log("ADD event");
       // Roo.log(this.triggerEl.dom);
        this.triggerEl.on('click', this.toggle, this);
        this.triggerEl.addClass('dropdown-toggle');
        
    },
    toggle  : function(e)
    {
        //Roo.log(e.getTarget());
       // Roo.log(this.triggerEl.dom);
        if (Roo.get(e.getTarget()).findParent('.dropdown-menu')) {
            return;
        }
        var isActive = this.triggerEl.hasClass('open');
        // if disabled.. ingore
        this.clearMenus(e);
        //if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
         // if mobile we use a backdrop because click events don't delegate
        // $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
        // }
 
       //var relatedTarget = { relatedTarget: this }
       //$parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))
 
       //if (e.isDefaultPrevented()) return;
        
       this.triggerEl[isActive ? 'removeClass' : 'addClass']('open');
       
       //  .trigger('shown.bs.dropdown', relatedTarget)
 
       this.triggerEl.focus();
       Roo.log(e);
       e.preventDefault(); 
        
        
    },
    clearMenus : function()
    {
        //$(backdrop).remove()
        Roo.select('.dropdown-toggle',true).each(function(aa) {
            if (!aa.hasClass('open')) {
                return;
            }
            // triger close...
            aa.removeClass('open');
          //var parent = getParent($(this))
          //var relatedTarget = { relatedTarget: this }
          
           //$parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
          //if (e.isDefaultPrevented()) return
           //$parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
        })
    }
    
   
});

 

 /*
 * - LGPL
 *
 * menu item
 * 
 */


/**
 * @class Roo.bootstrap.MenuItem
 * @extends Roo.bootstrap.Component
 * Bootstrap MenuItem class
 * @cfg {String} html the menu label
 * @cfg {String} href the link
 * 
 * 
 * @constructor
 * Create a new MenuItem
 * @param {Object} config The config object
 */


Roo.bootstrap.MenuItem = function(config){
    Roo.bootstrap.MenuItem.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.MenuItem, Roo.bootstrap.Component,  {
    
    href : false,
    html : false,
    
    getAutoCreate : function(){
        var cfg= {
	    tag: 'li',
	    cn: [
		{
		    tag : 'a',
		    href : '#',
		    html : 'Link'
		}
	    ]
        };
	
        cfg.cn[0].href = this.href || cfg.cn[0].href ;
        cfg.cn[0].html = this.html || cfg.cn[0].html ;
        return cfg;
    }
   
});

 

 /*
 * - LGPL
 *
 * menu separator
 * 
 */


/**
 * @class Roo.bootstrap.MenuSeparator
 * @extends Roo.bootstrap.Component
 * Bootstrap MenuSeparator class
 * 
 * @constructor
 * Create a new MenuItem
 * @param {Object} config The config object
 */


Roo.bootstrap.MenuSeparator = function(config){
    Roo.bootstrap.MenuSeparator.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.MenuSeparator, Roo.bootstrap.Component,  {
    
    getAutoCreate : function(){
        var cfg = {
            cls: 'divider',
            tag : 'li'
        };
        
        return cfg;
    }
   
});

 

 
/*
<div class="modal fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Modal title</h4>
      </div>
      <div class="modal-body">
        <p>One fine body&hellip;</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
*/
/*
 * - LGPL
 *
 * page contgainer.
 * 
 */

/**
 * @class Roo.bootstrap.Modal
 * @extends Roo.bootstrap.Component
 * Bootstrap Modal class
 * @cfg {String} title Title of dialog
 * @cfg {Array} buttons Array of buttons
 * 
 * @constructor
 * Create a new Modal Dialog
 * @param {Object} config The config object
 */

Roo.bootstrap.Modal = function(config){
    Roo.bootstrap.Modal.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Modal, Roo.bootstrap.Component,  {
    
    title : 'test dialog',
   
    buttons : false,

    onRender : function(ct, position)
    {
        Roo.bootstrap.Component.superclass.onRender.call(this, ct, position);
        if(!this.el){
            var cfg = Roo.apply({},  this.getAutoCreate());
            cfg.id = Roo.id();
            //if(!cfg.name){
            //    cfg.name = typeof(this.name) == 'undefined' ? this.id : this.name;
            //}
            //if (!cfg.name.length) {
            //    delete cfg.name;
           // }
            if (this.cls) {
                cfg.cls += ' ' + this.cls;
            }
            if (this.style) {
                cfg.style = this.style;
            }
            this.el = Roo.get(document.body).createChild(cfg, position);
        }
        //var type = this.el.dom.type;
         
        if(this.tabIndex !== undefined){
            this.el.dom.setAttribute('tabIndex', this.tabIndex);
        }
        this.initEvents();
        //this.el.addClass([this.fieldClass, this.cls]);
        
    },
    getAutoCreate : function(){
        
        return {
            cls: "modal fade",
            cn : [
                {
                    cls: "modal-dialog",
                    cn : [
                        {
                            cls : "modal-content",
                            cn : [
                                {
                                    cls : 'modal-header',
                                    cn : [
                                        {
                                            tag: 'button',
                                            cls : 'close',
                                            html : '&times'
                                        },
                                        {
                                            tag: 'h4',
                                            cls : 'modal-title',
                                            html : this.title
                                        }
                                    
                                    ]
                                },
                                {
                                    cls : 'modal-body'
                                 
                                },
                                 {
                                    cls : 'modal-footer'
                                    /*
                                    cn : [
                                        {
                                            tag: 'button',
                                            cls : 'btn btn-default',
                                            html : 'Close'
                                        },
                                        {
                                            tag: 'button',
                                            cls : 'btn btn-primary',
                                            html : 'Save'
                                        }
                                    
                                    ]
                                    */
                                }
                                
                                
                            ]
                            
                        }
                    ]
                        
                }
            ]
            
            
        };
          
    },
    getChildContainer : function() {
         
         return this.el.select('.modal-body',true).first();
        
    },
    getButtonContainer : function() {
         return this.el.select('.modal-footer',true).first();
        
    },
    initEvents : function()
    {
        this.el.select('.modal-header .close').on('click', this.hide, this);
    },
    show : function() {
        this.el.addClass('on');
        this.el.removeClass('fade');
        this.el.setStyle('display', 'block');
    },
    hide : function() {
        this.el.removeClass('on');
        this.el.addClass('fade');
        this.el.setStyle('display', 'none');
    }
});

 /*
 * - LGPL
 *
 * navbar
 * 
 */

/**
 * @class Roo.bootstrap.Navbar
 * @extends Roo.bootstrap.Component
 * Bootstrap Navbar class
 * @cfg {Boolean} sidebar has side bar
 * @cfg {Boolean} bar is a bar?
 * @cfg {String} position (fixed-top|fixed-bottom|static-top) position
 * @cfg {String} brand what is brand
 * @cfg {Boolean} inverse is inverted color
 * @cfg {String} type (nav | pills | tabs)
 * @cfg {Boolean} arrangement stacked | justified
 * @cfg {String} align (left | right) alignment
 *
 * 
 * @constructor
 * Create a new Navbar
 * @param {Object} config The config object
 */


Roo.bootstrap.Navbar = function(config){
    Roo.bootstrap.Navbar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Navbar, Roo.bootstrap.Component,  {
    
    sidebar: false,
    
    bar: false,
    brand: '',
    inverse: false,
    position: '',
    align : false,
    type: 'nav',
    arrangement: '',
    
    getAutoCreate : function(){
        var cfg = {
            cls : 'navbar'
        };
	
        if (this.sidebar === true) {
            cfg = {
                tag: 'div',
                cls: 'sidebar-nav'
            };
            return cfg;
        }
        
        if (this.bar === true) {
            cfg = {
                tag: 'nav',
                cls: 'navbar',
                role: 'navigation',
                cn: [
                    {
                        tag: 'div',
                        cls: 'navbar-header',
                        cn: [
                            {
                            tag: 'button',
                            type: 'button',
                            cls: 'navbar-toggle',
                            'data-toggle': 'collapse',
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
                    },
                    {
                    tag: 'div',
                    cls: 'collapse navbar-collapse'
                    }
                ]
            };
            
            cfg.cls += this.inverse ? ' navbar-inverse' : ' navbar-default';
            
            if (['fixed-top','fixed-bottom','static-top'].indexOf(this.position)>-1) {
            cfg.cls += ' navbar-' + this.position;
            cfg.tag = this.position  == 'fixed-bottom' ? 'footer' : 'header';
            }
            
            if (this.brand !== '') {
                cfg.cn[0].cn.push({
                    tag: 'a',
                    href: '#',
                    cls: 'navbar-brand',
                    cn: [
                    this.brand
                    ]
                });
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
        
        
        return cfg;
    },
    
    getChildContainer : function() {
        if (this.bar === true) {
            return this.el.select('.collapse',true).first();
        }
        console.log(this);
        return this.el;
    }
   
});

 

 /*
 * - LGPL
 *
 * nav group
 * 
 */

/**
 * @class Roo.bootstrap.NavGroup
 * @extends Roo.bootstrap.Component
 * Bootstrap NavGroup class
 * @cfg {String} align left | right
 * @cfg {Boolean} inverse false | true
 * 
 * @constructor
 * Create a new nav group
 * @param {Object} config The config object
 */

Roo.bootstrap.NavGroup = function(config){
    Roo.bootstrap.NavGroup.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.NavGroup, Roo.bootstrap.Component,  {
    
    align: '',
    inverse: false,
    form: false,
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.NavGroup.superclass.getAutoCreate.call(this));
        
        cfg = {
            tag : 'ul',
            cls: 'nav navbar-nav' 
        }
        
        if (this.parent().sidebar === true) {
            cfg = {
                tag: 'ul',
                cls: 'dashboard-menu'
            }
            
            return cfg;
        }
        
        if (this.form === true) {
            cfg = {
                tag: 'form',
                cls: 'navbar-form'
            }
            
            if (this.align === 'right') {
                cfg.cls += ' navbar-right';
            } else {
                cfg.cls += ' navbar-left';
            }
        }
        
        
        if (this.align === 'right') {
            cfg.cls += ' navbar-right';
        }
        
        if (this.inverse) {
            cfg.cls += ' navbar-inverse';
            
        }
        
        
        return cfg;
    }
   
});

 

 /*
 * - LGPL
 *
 * row
 * 
 */
/**
 * @class Roo.bootstrap.Navbar.Button
 * @extends Roo.bootstrap.Component
 * Bootstrap Navbar.Button class
 * @cfg {String} href  link to
 * @cfg {String} html content of button
    
 * @constructor
 * Create a new Navbar Button
 * @param {Object} config The config object
 */


Roo.bootstrap.Navbar.Button = function(config){
    Roo.bootstrap.Navbar.Button.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Navbar.Button, Roo.bootstrap.Component,  {
    
    href : false,
    html : false,
    
    autoCreate : {
        cls: 'btn',
        tag : 'button',
        html: 'hello'
    },
    
    getAutoCreate : function(){
        
        var cfg = {
            cls: 'btn',
            tag : 'button',
            html: 'hello',
            cn : []
            
        } ;
        cfg.cn.push({
            html : this.html || ''
            //href : this.
             //       )
        });
        cfg.cn.push({
            tag: 'span',
            cls : 'carat'
        });
        
        return cfg;
    }
   
});

 

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
 

 /*
 * - LGPL
 *
 * row
 * 
 */

/**
 * @class Roo.bootstrap.Row
 * @extends Roo.bootstrap.Component
 * Bootstrap Row class (contains columns...)
 * 
 * @constructor
 * Create a new Row
 * @param {Object} config The config object
 */

Roo.bootstrap.Row = function(config){
    Roo.bootstrap.Row.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Row, Roo.bootstrap.Component,  {
    
    autoCreate: {
        cls: 'row clearfix'
    }
    
    
});

 

 /*
 * - LGPL
 *
 * element
 * 
 */

/**
 * @class Roo.bootstrap.Element
 * @extends Roo.bootstrap.Component
 * Bootstrap Element class
 * @cfg {String} html contents of the element
 * @cfg {String} tag tag of the element
 * @cfg {String} cls class of the element
 * 
 * @constructor
 * Create a new Element
 * @param {Object} config The config object
 */

Roo.bootstrap.Element = function(config){
    Roo.bootstrap.Element.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Element, Roo.bootstrap.Component,  {
    
    tag: 'div',
    cls: '',
    html: '',
    
    
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Element.superclass.getAutoCreate.call(this));
	
	cfg = {
	    tag: this.tag,
	    cls: '',
            html: this.html
	}
	
        return cfg;
    }
   
});

 

 /*
 * - LGPL
 *
 * pagination
 * 
 */

/**
 * @class Roo.bootstrap.Pagination
 * @extends Roo.bootstrap.Component
 * Bootstrap Pagination class
 * @cfg {String} size xs | sm | md | lg
 * @cfg {Boolean} inverse false | true
 * @cfg {Number} from pagination starting number
 * @cfg {Number} to pagination ending number
 * @cfg {String} align empty or left | right
 * @cfg {Number} active active page number
 * 
 * @constructor
 * Create a new Pagination
 * @param {Object} config The config object
 */

Roo.bootstrap.Pagination = function(config){
    Roo.bootstrap.Pagination.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Pagination, Roo.bootstrap.Component,  {
    
    cls: false,
    size: false,
    inverse: false,
    from: 1,
    to: 4,
    align: false,
    active: 1,
    
    getAutoCreate : function(){
        cfg = {
            tag: 'ul',
                cls: 'pagination',
                cn: []
        };
        if (this.inverse) {
            cfg.cls += ' inverse';
        }
        if (this.html) {
            cfg.html=this.html;
        }
        if (this.cls) {
            cfg.cls=this.cls;
        }
        cfg.cn[0]={
            tag: 'li',
            cn: [
                {
                    tag: 'a',
                    href:'#',
                    html: '&laquo;'
                }
            ]
        };
        var from=this.from>0?this.from:1;
        var to=this.to-from<=10?this.to:from+10;
        var active=this.active>=from&&this.active<=to?this.active:null;
        for (var i=from;i<=to;i++) {
            cfg.cn.push(
                {
                    tag: 'li',
                    cls: active===i?'active':'',
                    cn: [
                        {
                            tag: 'a',
                            href: '#',
                            html: i
                        }
                    ]
                }
            );
        }
        
        cfg.cn.push(
            {
                tag: 'li',
                cn: [
                    {
                       tag: 'a',
                       href: '#',
                       html: '&raquo;'
                    }
                ]
            }
        );
	
        return cfg;
    }
   
});

 

 /*
 * - LGPL
 *
 * slider
 * 
 */


/**
 * @class Roo.bootstrap.Slider
 * @extends Roo.bootstrap.Component
 * Bootstrap Slider class
 *    
 * @constructor
 * Create a new Slider
 * @param {Object} config The config object
 */

Roo.bootstrap.Slider = function(config){
    Roo.bootstrap.Slider.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Slider, Roo.bootstrap.Component,  {
    
    getAutoCreate : function(){
        
        var cfg = {
            tag: 'div',
            cls: 'slider slider-sample1 vertical-handler ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all',
            cn: [
                {
                    tag: 'a',
                    cls: 'ui-slider-handle ui-state-default ui-corner-all'
                }
            ]
        }
        
        return cfg;
    }
   
});

 /*
 * - LGPL
 *
 * table
 * 
 */

/**
 * @class Roo.bootstrap.Table
 * @extends Roo.bootstrap.Component
 * Bootstrap Table class
 * 
 * @constructor
 * Create a new Table
 * @param {Object} config The config object
 */

Roo.bootstrap.Table = function(config){
    Roo.bootstrap.Table.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Table, Roo.bootstrap.Component,  {
    
    html: false,
    cls: false,
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Table.superclass.getAutoCreate.call(this));
	
	cfg = {
	    tag: 'table',
	    cn: [
		{
		    tag: 'tbody'
		}
	    ]
	}
        if (this.html) {
            cfg.html=this.html
        }
        if (this.cls) {
            cfg.cls=this.cls
        }
	
        return cfg;
    }
   
});

 

 /*
 * - LGPL
 *
 * table cell
 * 
 */

/**
 * @class Roo.bootstrap.TableCell
 * @extends Roo.bootstrap.Component
 * Bootstrap TableCell class
 * 
 * @constructor
 * Create a new TableCell
 * @param {Object} config The config object
 */

Roo.bootstrap.TableCell = function(config){
    Roo.bootstrap.TableCell.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.TableCell, Roo.bootstrap.Component,  {
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.TableCell.superclass.getAutoCreate.call(this));
	
	cfg = {
	    tag: 'td'
	}
        if (this.html) {
            cfg.html=this.html
        }
        if (this.cls) {
            cfg.cls=this.cls
        }
	
        return cfg;
    }
   
});

 

 /*
 * - LGPL
 *
 * table row
 * 
 */

/**
 * @class Roo.bootstrap.TableRow
 * @extends Roo.bootstrap.Component
 * Bootstrap TableRow class
 * 
 * @constructor
 * Create a new TableRow
 * @param {Object} config The config object
 */

Roo.bootstrap.TableRow = function(config){
    Roo.bootstrap.TableRow.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.TableRow, Roo.bootstrap.Component,  {
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.TableRow.superclass.getAutoCreate.call(this));
	
	cfg = {
	    tag: 'tr'
	}
	
        return cfg;
    }
   
});

 

 /*
 * - LGPL
 *
 * form
 * 
 */

/**
 * @class Roo.bootstrap.Form
 * @extends Roo.bootstrap.Component
 * Bootstrap Form class
 * @cfg {String} method  GET | POST (default POST)
 * @cfg {String} labelAlign top | left (default top)
 * 
 * @constructor
 * Create a new Form
 * @param {Object} config The config object
 */


Roo.bootstrap.Form = function(config){
    Roo.bootstrap.Form.superclass.constructor.call(this, config);
    this.addEvents({
        /**
         * @event clientvalidation
         * If the monitorValid config option is true, this event fires repetitively to notify of valid state
         * @param {Form} this
         * @param {Boolean} valid true if the form has passed client-side validation
         */
        clientvalidation: true,
        /**
         * @event beforeaction
         * Fires before any action is performed. Return false to cancel the action.
         * @param {Form} this
         * @param {Action} action The action to be performed
         */
        beforeaction: true,
        /**
         * @event actionfailed
         * Fires when an action fails.
         * @param {Form} this
         * @param {Action} action The action that failed
         */
        actionfailed : true,
        /**
         * @event actioncomplete
         * Fires when an action is completed.
         * @param {Form} this
         * @param {Action} action The action that completed
         */
        actioncomplete : true
    });
    
};

Roo.extend(Roo.bootstrap.Form, Roo.bootstrap.Component,  {
      
     /**
     * @cfg {String} method
     * The request method to use (GET or POST) for form actions if one isn't supplied in the action options.
     */
    method : 'POST',
    /**
     * @cfg {String} url
     * The URL to use for form actions if one isn't supplied in the action options.
     */
    /**
     * @cfg {Boolean} fileUpload
     * Set to true if this form is a file upload.
     */
     
    /**
     * @cfg {Object} baseParams
     * Parameters to pass with all requests. e.g. baseParams: {id: '123', foo: 'bar'}.
     */
      
    /**
     * @cfg {Number} timeout Timeout for form actions in seconds (default is 30 seconds).
     */
    timeout: 30,

    // private
    activeAction : null,
 
    /**
     * By default wait messages are displayed with Roo.MessageBox.wait. You can target a specific
     * element by passing it or its id or mask the form itself by passing in true.
     * @type Mixed
     */
    waitMsgTarget : false,
    
     
    
    /**
     * By default wait messages are displayed with Roo.MessageBox.wait. You can target a specific
     * element by passing it or its id or mask the form itself by passing in true.
     * @type Mixed
     */
    
    getAutoCreate : function(){
        
        var cfg = {
            tag: 'form',
            method : this.method || 'POST',
            id : this.id || Roo.id(),
            cls : ''
        }
        
        if (this.labelAlign == 'left' ) {
            cfg.cls += ' form-horizontal';
        }
        return cfg;
    },
    initEvents : function()
    {
        this.el.on('submit', this.onSubmit, this);
        
        
    },
    // private
    onSubmit : function(e){
        e.stopEvent();
    },
    
     /**
     * Returns true if client-side validation on the form is successful.
     * @return Boolean
     */
    isValid : function(){
        var items = this.getItems();
        var valid = true;
        items.each(function(f){
           if(!f.validate()){
               valid = false;
               
           }
        });
        return valid;
    },
    /**
     * Returns true if any fields in this form have changed since their original load.
     * @return Boolean
     */
    isDirty : function(){
        var dirty = false;
        var items = this.getItems();
        items.each(function(f){
           if(f.isDirty()){
               dirty = true;
               return false;
           }
           return true;
        });
        return dirty;
    },
     /**
     * Performs a predefined action (submit or load) or custom actions you define on this form.
     * @param {String} actionName The name of the action type
     * @param {Object} options (optional) The options to pass to the action.  All of the config options listed
     * below are supported by both the submit and load actions unless otherwise noted (custom actions could also
     * accept other config options):
     * <pre>
Property          Type             Description
----------------  ---------------  ----------------------------------------------------------------------------------
url               String           The url for the action (defaults to the form's url)
method            String           The form method to use (defaults to the form's method, or POST if not defined)
params            String/Object    The params to pass (defaults to the form's baseParams, or none if not defined)
clientValidation  Boolean          Applies to submit only.  Pass true to call form.isValid() prior to posting to
                                   validate the form on the client (defaults to false)
     * </pre>
     * @return {BasicForm} this
     */
    doAction : function(action, options){
        if(typeof action == 'string'){
            action = new Roo.form.Action.ACTION_TYPES[action](this, options);
        }
        if(this.fireEvent('beforeaction', this, action) !== false){
            this.beforeAction(action);
            action.run.defer(100, action);
        }
        return this;
    },
    
    // private
    beforeAction : function(action){
        var o = action.options;
        
        // not really supported yet.. ??
        
        //if(this.waitMsgTarget === true){
            this.el.mask(o.waitMsg || "Sending", 'x-mask-loading');
        //}else if(this.waitMsgTarget){
        //    this.waitMsgTarget = Roo.get(this.waitMsgTarget);
        //    this.waitMsgTarget.mask(o.waitMsg || "Sending", 'x-mask-loading');
        //}else {
        //    Roo.MessageBox.wait(o.waitMsg || "Sending", o.waitTitle || this.waitTitle || 'Please Wait...');
       // }
         
    },

    // private
    afterAction : function(action, success){
        this.activeAction = null;
        var o = action.options;
        
        //if(this.waitMsgTarget === true){
            this.el.unmask();
        //}else if(this.waitMsgTarget){
        //    this.waitMsgTarget.unmask();
        //}else{
        //    Roo.MessageBox.updateProgress(1);
        //    Roo.MessageBox.hide();
       // }
        // 
        if(success){
            if(o.reset){
                this.reset();
            }
            Roo.callback(o.success, o.scope, [this, action]);
            this.fireEvent('actioncomplete', this, action);
            
        }else{
            
            // failure condition..
            // we have a scenario where updates need confirming.
            // eg. if a locking scenario exists..
            // we look for { errors : { needs_confirm : true }} in the response.
            if (
                (typeof(action.result) != 'undefined')  &&
                (typeof(action.result.errors) != 'undefined')  &&
                (typeof(action.result.errors.needs_confirm) != 'undefined')
           ){
                var _t = this;
                Roo.log("not supported yet");
                 /*
                
                Roo.MessageBox.confirm(
                    "Change requires confirmation",
                    action.result.errorMsg,
                    function(r) {
                        if (r != 'yes') {
                            return;
                        }
                        _t.doAction('submit', { params :  { _submit_confirmed : 1 } }  );
                    }
                    
                );
                */
                
                
                return;
            }
            
            Roo.callback(o.failure, o.scope, [this, action]);
            // show an error message if no failed handler is set..
            if (!this.hasListener('actionfailed')) {
                Roo.log("need to add dialog support");
                /*
                Roo.MessageBox.alert("Error",
                    (typeof(action.result) != 'undefined' && typeof(action.result.errorMsg) != 'undefined') ?
                        action.result.errorMsg :
                        "Saving Failed, please check your entries or try again"
                );
                */
            }
            
            this.fireEvent('actionfailed', this, action);
        }
        
    },
    /**
     * Find a Roo.form.Field in this form by id, dataIndex, name or hiddenName
     * @param {String} id The value to search for
     * @return Field
     */
    findField : function(id){
        var items = this.getItems();
        var field = items.get(id);
        if(!field){
             items.each(function(f){
                if(f.isFormField && (f.dataIndex == id || f.id == id || f.getName() == id)){
                    field = f;
                    return false;
                }
                return true;
            });
        }
        return field || null;
    },
     /**
     * Mark fields in this form invalid in bulk.
     * @param {Array/Object} errors Either an array in the form [{id:'fieldId', msg:'The message'},...] or an object hash of {id: msg, id2: msg2}
     * @return {BasicForm} this
     */
    markInvalid : function(errors){
        if(errors instanceof Array){
            for(var i = 0, len = errors.length; i < len; i++){
                var fieldError = errors[i];
                var f = this.findField(fieldError.id);
                if(f){
                    f.markInvalid(fieldError.msg);
                }
            }
        }else{
            var field, id;
            for(id in errors){
                if(typeof errors[id] != 'function' && (field = this.findField(id))){
                    field.markInvalid(errors[id]);
                }
            }
        }
        //Roo.each(this.childForms || [], function (f) {
        //    f.markInvalid(errors);
        //});
        
        return this;
    },

    /**
     * Set values for fields in this form in bulk.
     * @param {Array/Object} values Either an array in the form [{id:'fieldId', value:'foo'},...] or an object hash of {id: value, id2: value2}
     * @return {BasicForm} this
     */
    setValues : function(values){
        if(values instanceof Array){ // array of objects
            for(var i = 0, len = values.length; i < len; i++){
                var v = values[i];
                var f = this.findField(v.id);
                if(f){
                    f.setValue(v.value);
                    if(this.trackResetOnLoad){
                        f.originalValue = f.getValue();
                    }
                }
            }
        }else{ // object hash
            var field, id;
            for(id in values){
                if(typeof values[id] != 'function' && (field = this.findField(id))){
                    
                    if (field.setFromData && 
                        field.valueField && 
                        field.displayField &&
                        // combos' with local stores can 
                        // be queried via setValue()
                        // to set their value..
                        (field.store && !field.store.isLocal)
                        ) {
                        // it's a combo
                        var sd = { };
                        sd[field.valueField] = typeof(values[field.hiddenName]) == 'undefined' ? '' : values[field.hiddenName];
                        sd[field.displayField] = typeof(values[field.name]) == 'undefined' ? '' : values[field.name];
                        field.setFromData(sd);
                        
                    } else {
                        field.setValue(values[id]);
                    }
                    
                    
                    if(this.trackResetOnLoad){
                        field.originalValue = field.getValue();
                    }
                }
            }
        }
         
        //Roo.each(this.childForms || [], function (f) {
        //    f.setValues(values);
        //});
                
        return this;
    },

    /**
     * Returns the fields in this form as an object with key/value pairs. If multiple fields exist with the same name
     * they are returned as an array.
     * @param {Boolean} asString
     * @return {Object}
     */
    getValues : function(asString){
        //if (this.childForms) {
            // copy values from the child forms
        //    Roo.each(this.childForms, function (f) {
        //        this.setValues(f.getValues());
        //    }, this);
        //}
        
        
        
        var fs = Roo.lib.Ajax.serializeForm(this.el.dom);
        if(asString === true){
            return fs;
        }
        return Roo.urlDecode(fs);
    },
    
    /**
     * Returns the fields in this form as an object with key/value pairs. 
     * This differs from getValues as it calls getValue on each child item, rather than using dom data.
     * @return {Object}
     */
    getFieldValues : function(with_hidden)
    {
        var items = this.getItems();
        var ret = {};
        items.each(function(f){
            if (!f.getName()) {
                return;
            }
            var v = f.getValue();
            if (f.inputType =='radio') {
                if (typeof(ret[f.getName()]) == 'undefined') {
                    ret[f.getName()] = ''; // empty..
                }
                
                if (!f.el.dom.checked) {
                    return;
                    
                }
                v = f.el.dom.value;
                
            }
            
            // not sure if this supported any more..
            if ((typeof(v) == 'object') && f.getRawValue) {
                v = f.getRawValue() ; // dates..
            }
            // combo boxes where name != hiddenName...
            if (f.name != f.getName()) {
                ret[f.name] = f.getRawValue();
            }
            ret[f.getName()] = v;
        });
        
        return ret;
    },

    /**
     * Clears all invalid messages in this form.
     * @return {BasicForm} this
     */
    clearInvalid : function(){
        var items = this.getItems();
        
        items.each(function(f){
           f.clearInvalid();
        });
        
        
        
        return this;
    },

    /**
     * Resets this form.
     * @return {BasicForm} this
     */
    reset : function(){
        var items = this.getItems();
        items.each(function(f){
            f.reset();
        });
        
        Roo.each(this.childForms || [], function (f) {
            f.reset();
        });
       
        
        return this;
    },
    getItems : function()
    {
        var r=new Roo.util.MixedCollection(false, function(o){
            return o.id || (o.id = Roo.id());
        });
        var iter = function(el) {
            if (el.inputEl) {
                r.add(el);
            }
            if (!el.items) {
                return;
            }
            Roo.each(el.items,function(e) {
                iter(e);
            });
            
            
        };
        iter(this);
        return r;
        
        
        
        
    }
    
});

 
/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
/**
 * @class Roo.form.VTypes
 * Overridable validation definitions. The validations provided are basic and intended to be easily customizable and extended.
 * @singleton
 */
Roo.form.VTypes = function(){
    // closure these in so they are only created once.
    var alpha = /^[a-zA-Z_]+$/;
    var alphanum = /^[a-zA-Z0-9_]+$/;
    var email = /^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/;
    var url = /(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;

    // All these messages and functions are configurable
    return {
        /**
         * The function used to validate email addresses
         * @param {String} value The email address
         */
        'email' : function(v){
            return email.test(v);
        },
        /**
         * The error text to display when the email validation function returns false
         * @type String
         */
        'emailText' : 'This field should be an e-mail address in the format "user@domain.com"',
        /**
         * The keystroke filter mask to be applied on email input
         * @type RegExp
         */
        'emailMask' : /[a-z0-9_\.\-@]/i,

        /**
         * The function used to validate URLs
         * @param {String} value The URL
         */
        'url' : function(v){
            return url.test(v);
        },
        /**
         * The error text to display when the url validation function returns false
         * @type String
         */
        'urlText' : 'This field should be a URL in the format "http:/'+'/www.domain.com"',
        
        /**
         * The function used to validate alpha values
         * @param {String} value The value
         */
        'alpha' : function(v){
            return alpha.test(v);
        },
        /**
         * The error text to display when the alpha validation function returns false
         * @type String
         */
        'alphaText' : 'This field should only contain letters and _',
        /**
         * The keystroke filter mask to be applied on alpha input
         * @type RegExp
         */
        'alphaMask' : /[a-z_]/i,

        /**
         * The function used to validate alphanumeric values
         * @param {String} value The value
         */
        'alphanum' : function(v){
            return alphanum.test(v);
        },
        /**
         * The error text to display when the alphanumeric validation function returns false
         * @type String
         */
        'alphanumText' : 'This field should only contain letters, numbers and _',
        /**
         * The keystroke filter mask to be applied on alphanumeric input
         * @type RegExp
         */
        'alphanumMask' : /[a-z0-9_]/i
    };
}();/*
 * - LGPL
 *
 * Input
 * 
 */

/**
 * @class Roo.bootstrap.Input
 * @extends Roo.bootstrap.Component
 * Bootstrap Input class
 * @cfg {Boolean} disabled is it disabled
 * @cfg {String} fieldLabel - the label associated
 * @cfg {String} inputType button | checkbox | email | file | hidden | image | number | password | radio | range | reset | search | submit | text
 * @cfg {String} name name of the input
 * @cfg {string} fieldLabel - the label associated
 * @cfg {string}  inputType - input / file submit ...
 * @cfg {string} placeholder - placeholder to put in text.
 * @cfg {string}  before - input group add on before
 * @cfg {string} after - input group add on after
 * 
 * 
 * @constructor
 * Create a new Input
 * @param {Object} config The config object
 */

Roo.bootstrap.Input = function(config){
    Roo.bootstrap.Input.superclass.constructor.call(this, config);
   
        this.addEvents({
            /**
             * @event focus
             * Fires when this field receives input focus.
             * @param {Roo.form.Field} this
             */
            focus : true,
            /**
             * @event blur
             * Fires when this field loses input focus.
             * @param {Roo.form.Field} this
             */
            blur : true,
            /**
             * @event specialkey
             * Fires when any key related to navigation (arrows, tab, enter, esc, etc.) is pressed.  You can check
             * {@link Roo.EventObject#getKey} to determine which key was pressed.
             * @param {Roo.form.Field} this
             * @param {Roo.EventObject} e The event object
             */
            specialkey : true,
            /**
             * @event change
             * Fires just before the field blurs if the field value has changed.
             * @param {Roo.form.Field} this
             * @param {Mixed} newValue The new value
             * @param {Mixed} oldValue The original value
             */
            change : true,
            /**
             * @event invalid
             * Fires after the field has been marked as invalid.
             * @param {Roo.form.Field} this
             * @param {String} msg The validation message
             */
            invalid : true,
            /**
             * @event valid
             * Fires after the field has been validated with no errors.
             * @param {Roo.form.Field} this
             */
            valid : true,
             /**
             * @event keyup
             * Fires after the key up
             * @param {Roo.form.Field} this
             * @param {Roo.EventObject}  e The event Object
             */
            keyup : true
        });
};

Roo.extend(Roo.bootstrap.Input, Roo.bootstrap.Component,  {
     /**
     * @cfg {String/Boolean} validationEvent The event that should initiate field validation. Set to false to disable
      automatic validation (defaults to "keyup").
     */
    validationEvent : "keyup",
     /**
     * @cfg {Boolean} validateOnBlur Whether the field should validate when it loses focus (defaults to true).
     */
    validateOnBlur : true,
    /**
     * @cfg {Number} validationDelay The length of time in milliseconds after user input begins until validation is initiated (defaults to 250)
     */
    validationDelay : 250,
     /**
     * @cfg {String} focusClass The CSS class to use when the field receives focus (defaults to "x-form-focus")
     */
    focusClass : "x-form-focus",  // not needed???
    
       
    /**
     * @cfg {String} invalidClass The CSS class to use when marking a field invalid (defaults to "x-form-invalid")
     */
    invalidClass : "has-error",
    
    /**
     * @cfg {Boolean} selectOnFocus True to automatically select any existing field text when the field receives input focus (defaults to false)
     */
    selectOnFocus : false,
    
     /**
     * @cfg {String} maskRe An input mask regular expression that will be used to filter keystrokes that don't match (defaults to null)
     */
    maskRe : null,
       /**
     * @cfg {String} vtype A validation type name as defined in {@link Roo.form.VTypes} (defaults to null)
     */
    vtype : null,
    
      /**
     * @cfg {Boolean} disableKeyFilter True to disable input keystroke filtering (defaults to false)
     */
    disableKeyFilter : false,
    
       /**
     * @cfg {Boolean} disabled True to disable the field (defaults to false).
     */
    disabled : false,
     /**
     * @cfg {Boolean} allowBlank False to validate that the value length > 0 (defaults to true)
     */
    allowBlank : true,
    /**
     * @cfg {String} blankText Error text to display if the allow blank validation fails (defaults to "This field is required")
     */
    blankText : "This field is required",
    
     /**
     * @cfg {Number} minLength Minimum input field length required (defaults to 0)
     */
    minLength : 0,
    /**
     * @cfg {Number} maxLength Maximum input field length allowed (defaults to Number.MAX_VALUE)
     */
    maxLength : Number.MAX_VALUE,
    /**
     * @cfg {String} minLengthText Error text to display if the minimum length validation fails (defaults to "The minimum length for this field is {minLength}")
     */
    minLengthText : "The minimum length for this field is {0}",
    /**
     * @cfg {String} maxLengthText Error text to display if the maximum length validation fails (defaults to "The maximum length for this field is {maxLength}")
     */
    maxLengthText : "The maximum length for this field is {0}",
  
    
    /**
     * @cfg {Function} validator A custom validation function to be called during field validation (defaults to null).
     * If available, this function will be called only after the basic validators all return true, and will be passed the
     * current field value and expected to return boolean true if the value is valid or a string error message if invalid.
     */
    validator : null,
    /**
     * @cfg {RegExp} regex A JavaScript RegExp object to be tested against the field value during validation (defaults to null).
     * If available, this regex will be evaluated only after the basic validators all return true, and will be passed the
     * current field value.  If the test fails, the field will be marked invalid using {@link #regexText}.
     */
    regex : null,
    /**
     * @cfg {String} regexText The error text to display if {@link #regex} is used and the test fails during validation (defaults to "")
     */
    regexText : "",
    
    
    
    fieldLabel : '',
    inputType : 'text',
    
    name : false,
    placeholder: false,
    before : false,
    after : false,
    
    // private
    hasFocus : false,
    preventMark: false,
    
    getAutoCreate : function(){
        
        var parent = this.parent();
        
        var align = parent.labelAlign;
        
        var id = Roo.id();
        
        var cfg = {
            cls: 'form-group' //input-group
        };
        
        var input =  {
            tag: 'input',
            id : id,
            type : this.inputType,
            cls : 'form-control',
            placeholder : this.placeholder || '' 
            
        };
        if (this.name) {
            input.name = name;
        }
        
        var inputblock = input;
        
        if (this.before || this.after) {
            
            inputblock = {
                cls : 'input-group',
                cn :  [] 
            };
            if (this.before) {
                inputblock.cn.push({
                    tag :'span',
                    cls : 'input-group-addon',
                    html : this.before
                });
            }
            inputblock.cn.push(input);
            if (this.after) {
                inputblock.cn.push({
                    tag :'span',
                    cls : 'input-group-addon',
                    html : this.after
                });
            }
            
        }
        
        Roo.log(align);
        Roo.log(this.fieldLabel.length);
        
        if (align ==='left' && this.fieldLabel.length) {
                Roo.log("left and has label");
                cfg.cn = [
                    
                    {
                        tag: 'label',
                        'for' :  id,
                        cls : 'col-sm-2 control-label',
                        html : this.fieldLabel
                        
                    },
                    {
                        cls : "col-sm-10", 
                        cn: [
                            inputblock
                        ]
                    }
                    
                ];
        } else if ( this.fieldLabel.length) {
                Roo.log(" label");
                 cfg.cn = [
                   
                    {
                        tag: 'label',
                        //cls : 'input-group-addon',
                        html : this.fieldLabel
                        
                    },
                    
                    inputblock
                    
                ];

        } else {
            
                   Roo.log(" no label && no align");
                cfg.cn = [
                    
                        inputblock
                    
                ];
                
                
        }
         
        
        
        
        if (this.disabled) {
            input.disabled=true;
        }
        return cfg;
        
    },
    /**
     * return the real input element.
     */
    inputEl: function ()
    {
        return this.el.select('input.form-control',true).first();
    },
    setDisabled : function(v)
    {
        var i  = this.inputEl().dom;
        if (v) {
            i.removeAttribute('disabled');
            return;
            
        }
        i.setAttribute('disabled','true');
    },
    initEvents : function()
    {
        
        this.inputEl().on("keydown" , this.fireKey,  this);
        this.inputEl().on("focus", this.onFocus,  this);
        this.inputEl().on("blur", this.onBlur,  this);
        this.inputEl().relayEvent('keyup', this);

        // reference to original value for reset
        this.originalValue = this.getValue();
        //Roo.form.TextField.superclass.initEvents.call(this);
        if(this.validationEvent == 'keyup'){
            this.validationTask = new Roo.util.DelayedTask(this.validate, this);
            this.inputEl().on('keyup', this.filterValidation, this);
        }
        else if(this.validationEvent !== false){
            this.inputEl().on(this.validationEvent, this.validate, this, {buffer: this.validationDelay});
        }
        
        if(this.selectOnFocus){
            this.on("focus", this.preFocus, this);
            
        }
        if(this.maskRe || (this.vtype && this.disableKeyFilter !== true && (this.maskRe = Roo.form.VTypes[this.vtype+'Mask']))){
            this.inputEl().on("keypress", this.filterKeys, this);
        }
       /* if(this.grow){
            this.el.on("keyup", this.onKeyUp,  this, {buffer:50});
            this.el.on("click", this.autoSize,  this);
        }
        */
        if(this.inputEl().is('input[type=password]') && Roo.isSafari){
            this.inputEl().on('keydown', this.SafariOnKeyDown, this);
        }
        
    },
    filterValidation : function(e){
        if(!e.isNavKeyPress()){
            this.validationTask.delay(this.validationDelay);
        }
    },
     /**
     * Validates the field value
     * @return {Boolean} True if the value is valid, else false
     */
    validate : function(){
        //if(this.disabled || this.validateValue(this.processValue(this.getRawValue()))){
        if(this.disabled || this.validateValue(this.getRawValue())){
            this.clearInvalid();
            return true;
        }
        return false;
    },
    
    
    /**
     * Validates a value according to the field's validation rules and marks the field as invalid
     * if the validation fails
     * @param {Mixed} value The value to validate
     * @return {Boolean} True if the value is valid, else false
     */
    validateValue : function(value){
        if(value.length < 1)  { // if it's blank
             if(this.allowBlank){
                this.clearInvalid();
                return true;
             }else{
                this.markInvalid(this.blankText);
                return false;
             }
        }
        if(value.length < this.minLength){
            this.markInvalid(String.format(this.minLengthText, this.minLength));
            return false;
        }
        if(value.length > this.maxLength){
            this.markInvalid(String.format(this.maxLengthText, this.maxLength));
            return false;
        }
        if(this.vtype){
            var vt = Roo.form.VTypes;
            if(!vt[this.vtype](value, this)){
                this.markInvalid(this.vtypeText || vt[this.vtype +'Text']);
                return false;
            }
        }
        if(typeof this.validator == "function"){
            var msg = this.validator(value);
            if(msg !== true){
                this.markInvalid(msg);
                return false;
            }
        }
        if(this.regex && !this.regex.test(value)){
            this.markInvalid(this.regexText);
            return false;
        }
        return true;
    },

    
    
     // private
    fireKey : function(e){
        //Roo.log('field ' + e.getKey());
        if(e.isNavKeyPress()){
            this.fireEvent("specialkey", this, e);
        }
    },
    onFocus : function(){
        if(!Roo.isOpera && this.focusClass){ // don't touch in Opera
           // this.el.addClass(this.focusClass);
        }
        if(!this.hasFocus){
            this.hasFocus = true;
            this.startValue = this.getValue();
            this.fireEvent("focus", this);
        }
    },
    
    beforeBlur : Roo.emptyFn,

    
    // private
    onBlur : function(){
        this.beforeBlur();
        if(!Roo.isOpera && this.focusClass){ // don't touch in Opera
            //this.el.removeClass(this.focusClass);
        }
        this.hasFocus = false;
        if(this.validationEvent !== false && this.validateOnBlur && this.validationEvent != "blur"){
            this.validate();
        }
        var v = this.getValue();
        if(String(v) !== String(this.startValue)){
            this.fireEvent('change', this, v, this.startValue);
        }
        this.fireEvent("blur", this);
    },
     /**
     * Returns the normalized data value (undefined or emptyText will be returned as '').  To return the raw value see {@link #getRawValue}.
     * @return {Mixed} value The field value
     */
    getValue : function(){
        var v = this.inputEl().getValue();
        return v;
    },
    /**
     * Returns the raw data value which may or may not be a valid, defined value.  To return a normalized value see {@link #getValue}.
     * @return {Mixed} value The field value
     */
    getRawValue : function(){
        var v = this.inputEl().getValue();
        
        return v;
    },
    /**
     * Sets a data value into the field and validates it.  To set the value directly without validation see {@link #setRawValue}.
     * @param {Mixed} value The value to set
     */
    setValue : function(v){
        this.value = v;
        if(this.rendered){
            this.inputEl().dom.value = (v === null || v === undefined ? '' : v);
            this.validate();
        }
    },
    
    /*
    processValue : function(value){
        if(this.stripCharsRe){
            var newValue = value.replace(this.stripCharsRe, '');
            if(newValue !== value){
                this.setRawValue(newValue);
                return newValue;
            }
        }
        return value;
    },
  */
    preFocus : function(){
        
        if(this.selectOnFocus){
            this.inputEl().dom.select();
        }
    },
    filterKeys : function(e){
        var k = e.getKey();
        if(!Roo.isIE && (e.isNavKeyPress() || k == e.BACKSPACE || (k == e.DELETE && e.button == -1))){
            return;
        }
        var c = e.getCharCode(), cc = String.fromCharCode(c);
        if(Roo.isIE && (e.isSpecialKey() || !cc)){
            return;
        }
        if(!this.maskRe.test(cc)){
            e.stopEvent();
        }
    },
     /**
     * Clear any invalid styles/messages for this field
     */
    clearInvalid : function(){
        
        if(!this.el || this.preventMark){ // not rendered
            return;
        }
        this.el.removeClass(this.invalidClass);
        /*
        switch(this.msgTarget){
            case 'qtip':
                this.el.dom.qtip = '';
                break;
            case 'title':
                this.el.dom.title = '';
                break;
            case 'under':
                if(this.errorEl){
                    Roo.form.Field.msgFx[this.msgFx].hide(this.errorEl, this);
                }
                break;
            case 'side':
                if(this.errorIcon){
                    this.errorIcon.dom.qtip = '';
                    this.errorIcon.hide();
                    this.un('resize', this.alignErrorIcon, this);
                }
                break;
            default:
                var t = Roo.getDom(this.msgTarget);
                t.innerHTML = '';
                t.style.display = 'none';
                break;
        }
        */
        this.fireEvent('valid', this);
    },
     /**
     * Mark this field as invalid
     * @param {String} msg The validation message
     */
    markInvalid : function(msg){
        if(!this.el  || this.preventMark){ // not rendered
            return;
        }
        this.el.addClass(this.invalidClass);
        /*
        msg = msg || this.invalidText;
        switch(this.msgTarget){
            case 'qtip':
                this.el.dom.qtip = msg;
                this.el.dom.qclass = 'x-form-invalid-tip';
                if(Roo.QuickTips){ // fix for floating editors interacting with DND
                    Roo.QuickTips.enable();
                }
                break;
            case 'title':
                this.el.dom.title = msg;
                break;
            case 'under':
                if(!this.errorEl){
                    var elp = this.el.findParent('.x-form-element', 5, true);
                    this.errorEl = elp.createChild({cls:'x-form-invalid-msg'});
                    this.errorEl.setWidth(elp.getWidth(true)-20);
                }
                this.errorEl.update(msg);
                Roo.form.Field.msgFx[this.msgFx].show(this.errorEl, this);
                break;
            case 'side':
                if(!this.errorIcon){
                    var elp = this.el.findParent('.x-form-element', 5, true);
                    this.errorIcon = elp.createChild({cls:'x-form-invalid-icon'});
                }
                this.alignErrorIcon();
                this.errorIcon.dom.qtip = msg;
                this.errorIcon.dom.qclass = 'x-form-invalid-tip';
                this.errorIcon.show();
                this.on('resize', this.alignErrorIcon, this);
                break;
            default:
                var t = Roo.getDom(this.msgTarget);
                t.innerHTML = msg;
                t.style.display = this.msgDisplay;
                break;
        }
        */
        this.fireEvent('invalid', this, msg);
    },
    // private
    SafariOnKeyDown : function(event)
    {
        // this is a workaround for a password hang bug on chrome/ webkit.
        
        var isSelectAll = false;
        
        if(this.inputEl().dom.selectionEnd > 0){
            isSelectAll = (this.inputEl().dom.selectionEnd - this.inputEl().dom.selectionStart - this.getValue().length == 0) ? true : false;
        }
        if(((event.getKey() == 8 || event.getKey() == 46) && this.getValue().length ==1)){ // backspace and delete key
            event.preventDefault();
            this.setValue('');
            return;
        }
        
        if(isSelectAll){ // backspace and delete key
            
            event.preventDefault();
            // this is very hacky as keydown always get's upper case.
            //
            var cc = String.fromCharCode(event.getCharCode());
            this.setValue( event.shiftKey ?  cc : cc.toLowerCase());
            
        }
        
        
    }
});

 
