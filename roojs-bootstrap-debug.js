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
 * @cfg {Boolean} can_build_overlaid  True if element can be rebuild from a HTML page
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
    
    can_build_overlaid : true,
    
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
                this.el.attr('xtypex', this.el.attr('xtype'));
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
           
            cn.parentType = this.xtype; //??
            cn.parentId = this.id;
            
            var is_js_build = !Roo.select('body').first().attr('xtype');
            // does the container contain child eleemnts with 'xtype' attributes.
            // that match this xtype..
            // note - when we render we create these as well..
            // so we should check to see if body has xtype set.
            if (Roo.get(document.body).attr('xtype') == 'Roo.bootstrap.Body') {
                
                var self_cntr_el = Roo.get(this[cntr]());
                var echild =self_cntr_el ? self_cntr_el.child('>*[xtype]') : false;
                
                 
                if (echild && echild.attr('xtype').split('.').pop() == cn.xtype) {
                  //  Roo.log("found child for " + this.xtype +": " + echild.attr('xtype') );
                  
                  
                  
                    cn.el = echild;
                  //  Roo.log("GOT");
                    //echild.dom.removeAttribute('xtype');
                } else {
                    Roo.log("MISSING " + cn.xtype + " on child of " + (this.el ? this.el.attr('xbuilderid') : 'no parent'));
                   
                }
            }
           
            
            var has_flexy = typeof(tree['flexy:if'] != 'undefined') ||
                    typeof(tree['flexy:foreach'] != 'undefined');
                
            // if object has flexy:if - then it may or may not be rendered.
            if (!is_js_build && has_flexy && !cn.el &&  cn.can_build_overlaid) {
                // skip a flexy if element.
                Roo.log('skipping render');
             } else {
            
                // actually if flexy:foreach is found, we really want to create 
                // multiple copies here...
                cn.render(this[cntr]());
             }
            // then add the element..
        }
        
        
        // handle the kids..
        
        var nitems = [];
        if (typeof (tree.menu) != 'undefined') {
            tree.menu.parentType = cn.xtype;
            tree.menu.triggerEl = cn.el;
            nitems.push(cn.addxtype(Roo.apply({}, tree.menu)));
            
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
 * @cfg {Array} buttons Array of buttons or standard button set..
 * 
 * @constructor
 * Create a new Modal Dialog
 * @param {Object} config The config object
 */

Roo.bootstrap.Modal = function(config){
    Roo.bootstrap.Modal.superclass.constructor.call(this, config);
    this.addEvents({
        // raw events
        /**
         * @event click
         * The raw click event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "btnclick" : true
    });
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
        
        
        
        this.maskEl = Roo.DomHelper.append(document.body, {tag: "div", cls:"x-dlg-mask"}, true);
        this.maskEl.enableDisplayMode("block");
        this.maskEl.hide();
        //this.el.addClass("x-dlg-modal");
    
        
        if (this.buttons) {
            Roo.each(this.buttons, function(bb) {
                b = Roo.apply({}, bb);
                b.xns = b.xns || Roo.bootstrap;
                b.xtype = b.xtype || 'Button';
                if (typeof(b.listeners) == 'undefined') {
                    b.listeners = { click : this.onButtonClick.createDelegate(this)  };
                }
                
                var btn = Roo.factory(b);
                
                btn.onRender(this.el.select('.modal-footer').first());
                
            },this);
        }
        
        
        
        this.initEvents();
        //this.el.addClass([this.fieldClass, this.cls]);
        
    },
    getAutoCreate : function(){
        
        
        var bdy = {
                cls : 'modal-body',
                html : this.html || ''
        };
        
         
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
                                bdy,
                                {
                                    cls : 'modal-footer' 
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
        if (!this.rendered) {
            this.render();
        }
       
        this.el.addClass('on');
        this.el.removeClass('fade');
        this.el.setStyle('display', 'block');
        Roo.get(document.body).addClass("x-body-masked");
        this.maskEl.setSize(Roo.lib.Dom.getViewWidth(true), Roo.lib.Dom.getViewHeight(true));
        this.maskEl.show();
        this.el.setStyle('zIndex', '10001');
        
        
    },
    hide : function()
    {
        this.maskEl.hide();
        this.el.removeClass('on');
        this.el.addClass('fade');
        this.el.setStyle('display', 'none');
    },
    onButtonClick: function(btn,e)
    {
        //Roo.log([a,b,c]);
        this.fireEvent('btnclick', btn.name, e);
    }
});


Roo.apply(Roo.bootstrap.Modal,  {
    /**
         * Button config that displays a single OK button
         * @type Object
         */
        OK :  [{
            name : 'ok',
            weight : 'primary',
            html : 'OK'
        }], 
        /**
         * Button config that displays Yes and No buttons
         * @type Object
         */
        YESNO : [
            {
                name  :'yes',
                weight : 'primary',
                html : 'Yes'
            },
            {
                name  : 'no',
                html : 'No'
            }
        ],
        
        /**
         * Button config that displays OK and Cancel buttons
         * @type Object
         */
        OKCANCEL : [
            {
                name : 'ok',
                weight : 'primary',
                html : 'OK'
            },
            {
               name : 'cancel',
                html : 'Cancel'
            }
        ],
        /**
         * Button config that displays Yes, No and Cancel buttons
         * @type Object
         */
        YESNOCANCEL : [
            {
                name : 'yes',
                weight : 'primary',
                html : 'Yes'
            },
            {
                name : 'no',
                html : 'No'
            },
            {
                name : 'cancel',
                html : 'Cancel'
            }
        ]
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
    
    initEvents :function ()
    {
        //Roo.log(this.el.select('.navbar-toggle',true));
        this.el.select('.navbar-toggle',true).on('click', function() {
           // Roo.log('click');
            this.el.select('.navbar-collapse',true).toggleClass('in');                                 
        }, this);
    },
    
    
    getChildContainer : function()
    {
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
    
    getAutoCreate : function(){
       return {
            cls: 'row clearfix'
       };
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
        
        var cfg = {
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
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

// as we use this in bootstrap.
Roo.namespace('Roo.form');
 /**
 * @class Roo.form.Action
 * Internal Class used to handle form actions
 * @constructor
 * @param {Roo.form.BasicForm} el The form element or its id
 * @param {Object} config Configuration options
 */

 
 
// define the action interface
Roo.form.Action = function(form, options){
    this.form = form;
    this.options = options || {};
};
/**
 * Client Validation Failed
 * @const 
 */
Roo.form.Action.CLIENT_INVALID = 'client';
/**
 * Server Validation Failed
 * @const 
 */
Roo.form.Action.SERVER_INVALID = 'server';
 /**
 * Connect to Server Failed
 * @const 
 */
Roo.form.Action.CONNECT_FAILURE = 'connect';
/**
 * Reading Data from Server Failed
 * @const 
 */
Roo.form.Action.LOAD_FAILURE = 'load';

Roo.form.Action.prototype = {
    type : 'default',
    failureType : undefined,
    response : undefined,
    result : undefined,

    // interface method
    run : function(options){

    },

    // interface method
    success : function(response){

    },

    // interface method
    handleResponse : function(response){

    },

    // default connection failure
    failure : function(response){
        
        this.response = response;
        this.failureType = Roo.form.Action.CONNECT_FAILURE;
        this.form.afterAction(this, false);
    },

    processResponse : function(response){
        this.response = response;
        if(!response.responseText){
            return true;
        }
        this.result = this.handleResponse(response);
        return this.result;
    },

    // utility functions used internally
    getUrl : function(appendParams){
        var url = this.options.url || this.form.url || this.form.el.dom.action;
        if(appendParams){
            var p = this.getParams();
            if(p){
                url += (url.indexOf('?') != -1 ? '&' : '?') + p;
            }
        }
        return url;
    },

    getMethod : function(){
        return (this.options.method || this.form.method || this.form.el.dom.method || 'POST').toUpperCase();
    },

    getParams : function(){
        var bp = this.form.baseParams;
        var p = this.options.params;
        if(p){
            if(typeof p == "object"){
                p = Roo.urlEncode(Roo.applyIf(p, bp));
            }else if(typeof p == 'string' && bp){
                p += '&' + Roo.urlEncode(bp);
            }
        }else if(bp){
            p = Roo.urlEncode(bp);
        }
        return p;
    },

    createCallback : function(){
        return {
            success: this.success,
            failure: this.failure,
            scope: this,
            timeout: (this.form.timeout*1000),
            upload: this.form.fileUpload ? this.success : undefined
        };
    }
};

Roo.form.Action.Submit = function(form, options){
    Roo.form.Action.Submit.superclass.constructor.call(this, form, options);
};

Roo.extend(Roo.form.Action.Submit, Roo.form.Action, {
    type : 'submit',

    haveProgress : false,
    uploadComplete : false,
    
    // uploadProgress indicator.
    uploadProgress : function()
    {
        if (!this.form.progressUrl) {
            return;
        }
        
        if (!this.haveProgress) {
            Roo.MessageBox.progress("Uploading", "Uploading");
        }
        if (this.uploadComplete) {
           Roo.MessageBox.hide();
           return;
        }
        
        this.haveProgress = true;
   
        var uid = this.form.findField('UPLOAD_IDENTIFIER').getValue();
        
        var c = new Roo.data.Connection();
        c.request({
            url : this.form.progressUrl,
            params: {
                id : uid
            },
            method: 'GET',
            success : function(req){
               //console.log(data);
                var rdata = false;
                var edata;
                try  {
                   rdata = Roo.decode(req.responseText)
                } catch (e) {
                    Roo.log("Invalid data from server..");
                    Roo.log(edata);
                    return;
                }
                if (!rdata || !rdata.success) {
                    Roo.log(rdata);
                    Roo.MessageBox.alert(Roo.encode(rdata));
                    return;
                }
                var data = rdata.data;
                
                if (this.uploadComplete) {
                   Roo.MessageBox.hide();
                   return;
                }
                   
                if (data){
                    Roo.MessageBox.updateProgress(data.bytes_uploaded/data.bytes_total,
                       Math.floor((data.bytes_total - data.bytes_uploaded)/1000) + 'k remaining'
                    );
                }
                this.uploadProgress.defer(2000,this);
            },
       
            failure: function(data) {
                Roo.log('progress url failed ');
                Roo.log(data);
            },
            scope : this
        });
           
    },
    
    
    run : function()
    {
        // run get Values on the form, so it syncs any secondary forms.
        this.form.getValues();
        
        var o = this.options;
        var method = this.getMethod();
        var isPost = method == 'POST';
        if(o.clientValidation === false || this.form.isValid()){
            
            if (this.form.progressUrl) {
                this.form.findField('UPLOAD_IDENTIFIER').setValue(
                    (new Date() * 1) + '' + Math.random());
                    
            } 
            
            
            Roo.Ajax.request(Roo.apply(this.createCallback(), {
                form:this.form.el.dom,
                url:this.getUrl(!isPost),
                method: method,
                params:isPost ? this.getParams() : null,
                isUpload: this.form.fileUpload
            }));
            
            this.uploadProgress();

        }else if (o.clientValidation !== false){ // client validation failed
            this.failureType = Roo.form.Action.CLIENT_INVALID;
            this.form.afterAction(this, false);
        }
    },

    success : function(response)
    {
        this.uploadComplete= true;
        if (this.haveProgress) {
            Roo.MessageBox.hide();
        }
        
        
        var result = this.processResponse(response);
        if(result === true || result.success){
            this.form.afterAction(this, true);
            return;
        }
        if(result.errors){
            this.form.markInvalid(result.errors);
            this.failureType = Roo.form.Action.SERVER_INVALID;
        }
        this.form.afterAction(this, false);
    },
    failure : function(response)
    {
        this.uploadComplete= true;
        if (this.haveProgress) {
            Roo.MessageBox.hide();
        }
        
        this.response = response;
        this.failureType = Roo.form.Action.CONNECT_FAILURE;
        this.form.afterAction(this, false);
    },
    
    handleResponse : function(response){
        if(this.form.errorReader){
            var rs = this.form.errorReader.read(response);
            var errors = [];
            if(rs.records){
                for(var i = 0, len = rs.records.length; i < len; i++) {
                    var r = rs.records[i];
                    errors[i] = r.data;
                }
            }
            if(errors.length < 1){
                errors = null;
            }
            return {
                success : rs.success,
                errors : errors
            };
        }
        var ret = false;
        try {
            ret = Roo.decode(response.responseText);
        } catch (e) {
            ret = {
                success: false,
                errorMsg: "Failed to read server message: " + (response ? response.responseText : ' - no message'),
                errors : []
            };
        }
        return ret;
        
    }
});


Roo.form.Action.Load = function(form, options){
    Roo.form.Action.Load.superclass.constructor.call(this, form, options);
    this.reader = this.form.reader;
};

Roo.extend(Roo.form.Action.Load, Roo.form.Action, {
    type : 'load',

    run : function(){
        
        Roo.Ajax.request(Roo.apply(
                this.createCallback(), {
                    method:this.getMethod(),
                    url:this.getUrl(false),
                    params:this.getParams()
        }));
    },

    success : function(response){
        
        var result = this.processResponse(response);
        if(result === true || !result.success || !result.data){
            this.failureType = Roo.form.Action.LOAD_FAILURE;
            this.form.afterAction(this, false);
            return;
        }
        this.form.clearInvalid();
        this.form.setValues(result.data);
        this.form.afterAction(this, true);
    },

    handleResponse : function(response){
        if(this.form.reader){
            var rs = this.form.reader.read(response);
            var data = rs.records && rs.records[0] ? rs.records[0].data : null;
            return {
                success : rs.success,
                data : data
            };
        }
        return Roo.decode(response.responseText);
    }
});

Roo.form.Action.ACTION_TYPES = {
    'load' : Roo.form.Action.Load,
    'submit' : Roo.form.Action.Submit
};/*
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
  * @cfg {String} align left  | right - for navbars

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
    /**
     * @cfg {Sting} align (left|right) for navbar forms
     */
    align : 'left',

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
        if (this.parent().xtype.match(/^Nav/)) {
            cfg.cls = 'navbar-form navbar-' + this.align;
            
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
 * @cfg {string} size - (lg|sm) or leave empty..
 * @cfg {Number} xs colspan out of 12 for mobile-sized screens
 * @cfg {Number} sm colspan out of 12 for tablet-sized screens
 * @cfg {Number} md colspan out of 12 for computer-sized screens
 * @cfg {Number} lg colspan out of 12 for large computer-sized screens
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
    size : false,
    // private
    hasFocus : false,
    preventMark: false,
    isFormField : true,
    
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
            input.name = this.name;
        }
        if (this.size) {
            input.cls += ' input-' + this.size;
        }
        var settings=this;
        ['xs','sm','md','lg'].map(function(size){
            if (settings[size]) {
                cfg.cls += ' col-' + size + '-' + settings[size];
            }
        });
        
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
    focus : function (selectText){
        if(this.rendered){
            this.inputEl().focus();
            if(selectText === true){
                this.inputEl().dom.select();
            }
        }
        return this;
    } ,
    
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
     * Resets the current field value to the originally loaded value and clears any validation messages
     */
    reset : function(){
        this.setValue(this.originalValue);
        this.clearInvalid();
    },
     /**
     * Returns the name of the field
     * @return {Mixed} name The name field
     */
    getName: function(){
        return this.name;
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

 
/*
 * - LGPL
 *
 * trigger field - base class for combo..
 * 
 */
 
/**
 * @class Roo.bootstrap.TriggerField
 * @extends Roo.bootstrap.Input
 * Provides a convenient wrapper for TextFields that adds a clickable trigger button (looks like a combobox by default).
 * The trigger has no default action, so you must assign a function to implement the trigger click handler by
 * overriding {@link #onTriggerClick}. You can create a TriggerField directly, as it renders exactly like a combobox
 * for which you can provide a custom implementation.  For example:
 * <pre><code>
var trigger = new Roo.bootstrap.TriggerField();
trigger.onTriggerClick = myTriggerFn;
trigger.applyTo('my-field');
</code></pre>
 *
 * However, in general you will most likely want to use TriggerField as the base class for a reusable component.
 * {@link Roo.bootstrap.DateField} and {@link Roo.bootstrap.ComboBox} are perfect examples of this.
 * @cfg {String} triggerClass An additional CSS class used to style the trigger button.  The trigger will always get the
 * class 'x-form-trigger' by default and triggerClass will be <b>appended</b> if specified.
 * @constructor
 * Create a new TriggerField.
 * @param {Object} config Configuration options (valid {@Roo.bootstrap.Input} config options will also be applied
 * to the base TextField)
 */
Roo.bootstrap.TriggerField = function(config){
    this.mimicing = false;
    Roo.bootstrap.TriggerField.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.TriggerField, Roo.bootstrap.Input,  {
    /**
     * @cfg {String} triggerClass A CSS class to apply to the trigger
     */
     /**
     * @cfg {Boolean} hideTrigger True to hide the trigger element and display only the base text field (defaults to false)
     */
    hideTrigger:false,

    /** @cfg {Boolean} grow @hide */
    /** @cfg {Number} growMin @hide */
    /** @cfg {Number} growMax @hide */

    /**
     * @hide 
     * @method
     */
    autoSize: Roo.emptyFn,
    // private
    monitorTab : true,
    // private
    deferHeight : true,

    
    actionMode : 'wrap',
    
    
    
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
            autocomplete: 'off',
            placeholder : this.placeholder || '' 
            
        };
        if (this.name) {
            input.name = this.name;
        }
        if (this.size) {
            input.cls += ' input-' + this.size;
        }
        var inputblock = {
            cls: 'combobox-container input-group',
            cn: [
                {
                    tag: 'input',
                    type : 'hidden',
                    cls: 'form-hidden-field'
                },
                input,
                {
                    tag: 'ul',
                    cls : 'typeahead typeahead-long dropdown-menu',
                    style : 'display:none'
                },
                {
                    tag :'span',
                    cls : 'input-group-addon btn dropdown-toggle',
                    cn : [
                        {
                            tag: 'span',
                            cls: 'caret'
                        },
                        {
                            tag: 'span',
                            cls: 'combobox-clear',
                            cn  : [
                                {
                                    tag : 'i',
                                    cls: 'icon-remove'
                                }
                            ]
                        }
                    ]
                        
                }
            ]
        };
        
        
        
        
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
                cfg = inputblock
                     
                
        }
         
        var settings=this;
        ['xs','sm','md','lg'].map(function(size){
            if (settings[size]) {
                cfg.cls += ' col-' + size + '-' + settings[size];
            }
        });
        
        
        
        if (this.disabled) {
            input.disabled=true;
        }
        return cfg;
        
    },
    
    
    
    // private
    onResize : function(w, h){
        Roo.boostrap.TriggerField.superclass.onResize.apply(this, arguments);
        if(typeof w == 'number'){
            var x = w - this.trigger.getWidth();
            this.inputEl().setWidth(this.adjustWidth('input', x));
            this.trigger.setStyle('left', x+'px');
        }
    },

    // private
    adjustSize : Roo.BoxComponent.prototype.adjustSize,

    // private
    getResizeEl : function(){
        return this.inputEl();
    },

    // private
    getPositionEl : function(){
        return this.inputEl();
    },

    // private
    alignErrorIcon : function(){
        this.errorIcon.alignTo(this.inputEl(), 'tl-tr', [2, 0]);
    },

    // private
    initEvents : function(){
        
        //this.wrap = this.el.wrap({cls: "x-form-field-wrap"});
        
        this.trigger = this.el.select('span.dropdown-toggle',true).first();
        if(this.hideTrigger){
            this.trigger.setDisplayed(false);
        }
        this.trigger.on("click", this.onTriggerClick, this, {preventDefault:true});
        //this.trigger.addClassOnOver('x-form-trigger-over');
        //this.trigger.addClassOnClick('x-form-trigger-click');
        
        //if(!this.width){
        //    this.wrap.setWidth(this.el.getWidth()+this.trigger.getWidth());
        //}
    },

    // private
    initTrigger : function(){
       
    },

    // private
    onDestroy : function(){
        if(this.trigger){
            this.trigger.removeAllListeners();
          //  this.trigger.remove();
        }
        //if(this.wrap){
        //    this.wrap.remove();
        //}
        Roo.bootstrap.TriggerField.superclass.onDestroy.call(this);
    },

    // private
    onFocus : function(){
        Roo.bootstrap.TriggerField.superclass.onFocus.call(this);
        /*
        if(!this.mimicing){
            this.wrap.addClass('x-trigger-wrap-focus');
            this.mimicing = true;
            Roo.get(Roo.isIE ? document.body : document).on("mousedown", this.mimicBlur, this);
            if(this.monitorTab){
                this.el.on("keydown", this.checkTab, this);
            }
        }
        */
    },

    // private
    checkTab : function(e){
        if(e.getKey() == e.TAB){
            this.triggerBlur();
        }
    },

    // private
    onBlur : function(){
        // do nothing
    },

    // private
    mimicBlur : function(e, t){
        /*
        if(!this.wrap.contains(t) && this.validateBlur()){
            this.triggerBlur();
        }
        */
    },

    // private
    triggerBlur : function(){
        this.mimicing = false;
        Roo.get(Roo.isIE ? document.body : document).un("mousedown", this.mimicBlur);
        if(this.monitorTab){
            this.el.un("keydown", this.checkTab, this);
        }
        //this.wrap.removeClass('x-trigger-wrap-focus');
        Roo.bootstrap.TriggerField.superclass.onBlur.call(this);
    },

    // private
    // This should be overriden by any subclass that needs to check whether or not the field can be blurred.
    validateBlur : function(e, t){
        return true;
    },

    // private
    onDisable : function(){
        Roo.bootstrap.TriggerField.superclass.onDisable.call(this);
        //if(this.wrap){
        //    this.wrap.addClass('x-item-disabled');
        //}
    },

    // private
    onEnable : function(){
        Roo.bootstrap.TriggerField.superclass.onEnable.call(this);
        //if(this.wrap){
        //    this.el.removeClass('x-item-disabled');
        //}
    },

    // private
    onShow : function(){
        var ae = this.getActionEl();
        
        if(ae){
            ae.dom.style.display = '';
            ae.dom.style.visibility = 'visible';
        }
    },

    // private
    
    onHide : function(){
        var ae = this.getActionEl();
        ae.dom.style.display = 'none';
    },

    /**
     * The function that should handle the trigger's click event.  This method does nothing by default until overridden
     * by an implementing function.
     * @method
     * @param {EventObject} e
     */
    onTriggerClick : Roo.emptyFn
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
 * @class Roo.data.SortTypes
 * @singleton
 * Defines the default sorting (casting?) comparison functions used when sorting data.
 */
Roo.data.SortTypes = {
    /**
     * Default sort that does nothing
     * @param {Mixed} s The value being converted
     * @return {Mixed} The comparison value
     */
    none : function(s){
        return s;
    },
    
    /**
     * The regular expression used to strip tags
     * @type {RegExp}
     * @property
     */
    stripTagsRE : /<\/?[^>]+>/gi,
    
    /**
     * Strips all HTML tags to sort on text only
     * @param {Mixed} s The value being converted
     * @return {String} The comparison value
     */
    asText : function(s){
        return String(s).replace(this.stripTagsRE, "");
    },
    
    /**
     * Strips all HTML tags to sort on text only - Case insensitive
     * @param {Mixed} s The value being converted
     * @return {String} The comparison value
     */
    asUCText : function(s){
        return String(s).toUpperCase().replace(this.stripTagsRE, "");
    },
    
    /**
     * Case insensitive string
     * @param {Mixed} s The value being converted
     * @return {String} The comparison value
     */
    asUCString : function(s) {
    	return String(s).toUpperCase();
    },
    
    /**
     * Date sorting
     * @param {Mixed} s The value being converted
     * @return {Number} The comparison value
     */
    asDate : function(s) {
        if(!s){
            return 0;
        }
        if(s instanceof Date){
            return s.getTime();
        }
    	return Date.parse(String(s));
    },
    
    /**
     * Float sorting
     * @param {Mixed} s The value being converted
     * @return {Float} The comparison value
     */
    asFloat : function(s) {
    	var val = parseFloat(String(s).replace(/,/g, ""));
        if(isNaN(val)) val = 0;
    	return val;
    },
    
    /**
     * Integer sorting
     * @param {Mixed} s The value being converted
     * @return {Number} The comparison value
     */
    asInt : function(s) {
        var val = parseInt(String(s).replace(/,/g, ""));
        if(isNaN(val)) val = 0;
    	return val;
    }
};/*
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
* @class Roo.data.Record
 * Instances of this class encapsulate both record <em>definition</em> information, and record
 * <em>value</em> information for use in {@link Roo.data.Store} objects, or any code which needs
 * to access Records cached in an {@link Roo.data.Store} object.<br>
 * <p>
 * Constructors for this class are generated by passing an Array of field definition objects to {@link #create}.
 * Instances are usually only created by {@link Roo.data.Reader} implementations when processing unformatted data
 * objects.<br>
 * <p>
 * Record objects generated by this constructor inherit all the methods of Roo.data.Record listed below.
 * @constructor
 * This constructor should not be used to create Record objects. Instead, use the constructor generated by
 * {@link #create}. The parameters are the same.
 * @param {Array} data An associative Array of data values keyed by the field name.
 * @param {Object} id (Optional) The id of the record. This id should be unique, and is used by the
 * {@link Roo.data.Store} object which owns the Record to index its collection of Records. If
 * not specified an integer id is generated.
 */
Roo.data.Record = function(data, id){
    this.id = (id || id === 0) ? id : ++Roo.data.Record.AUTO_ID;
    this.data = data;
};

/**
 * Generate a constructor for a specific record layout.
 * @param {Array} o An Array of field definition objects which specify field names, and optionally,
 * data types, and a mapping for an {@link Roo.data.Reader} to extract the field's value from a data object.
 * Each field definition object may contain the following properties: <ul>
 * <li><b>name</b> : String<p style="margin-left:1em">The name by which the field is referenced within the Record. This is referenced by,
 * for example the <em>dataIndex</em> property in column definition objects passed to {@link Roo.grid.ColumnModel}</p></li>
 * <li><b>mapping</b> : String<p style="margin-left:1em">(Optional) A path specification for use by the {@link Roo.data.Reader} implementation
 * that is creating the Record to access the data value from the data object. If an {@link Roo.data.JsonReader}
 * is being used, then this is a string containing the javascript expression to reference the data relative to 
 * the record item's root. If an {@link Roo.data.XmlReader} is being used, this is an {@link Roo.DomQuery} path
 * to the data item relative to the record element. If the mapping expression is the same as the field name,
 * this may be omitted.</p></li>
 * <li><b>type</b> : String<p style="margin-left:1em">(Optional) The data type for conversion to displayable value. Possible values are
 * <ul><li>auto (Default, implies no conversion)</li>
 * <li>string</li>
 * <li>int</li>
 * <li>float</li>
 * <li>boolean</li>
 * <li>date</li></ul></p></li>
 * <li><b>sortType</b> : Mixed<p style="margin-left:1em">(Optional) A member of {@link Roo.data.SortTypes}.</p></li>
 * <li><b>sortDir</b> : String<p style="margin-left:1em">(Optional) Initial direction to sort. "ASC" or "DESC"</p></li>
 * <li><b>convert</b> : Function<p style="margin-left:1em">(Optional) A function which converts the value provided
 * by the Reader into an object that will be stored in the Record. It is passed the
 * following parameters:<ul>
 * <li><b>v</b> : Mixed<p style="margin-left:1em">The data value as read by the Reader.</p></li>
 * </ul></p></li>
 * <li><b>dateFormat</b> : String<p style="margin-left:1em">(Optional) A format String for the Date.parseDate function.</p></li>
 * </ul>
 * <br>usage:<br><pre><code>
var TopicRecord = Roo.data.Record.create(
    {name: 'title', mapping: 'topic_title'},
    {name: 'author', mapping: 'username'},
    {name: 'totalPosts', mapping: 'topic_replies', type: 'int'},
    {name: 'lastPost', mapping: 'post_time', type: 'date'},
    {name: 'lastPoster', mapping: 'user2'},
    {name: 'excerpt', mapping: 'post_text'}
);

var myNewRecord = new TopicRecord({
    title: 'Do my job please',
    author: 'noobie',
    totalPosts: 1,
    lastPost: new Date(),
    lastPoster: 'Animal',
    excerpt: 'No way dude!'
});
myStore.add(myNewRecord);
</code></pre>
 * @method create
 * @static
 */
Roo.data.Record.create = function(o){
    var f = function(){
        f.superclass.constructor.apply(this, arguments);
    };
    Roo.extend(f, Roo.data.Record);
    var p = f.prototype;
    p.fields = new Roo.util.MixedCollection(false, function(field){
        return field.name;
    });
    for(var i = 0, len = o.length; i < len; i++){
        p.fields.add(new Roo.data.Field(o[i]));
    }
    f.getField = function(name){
        return p.fields.get(name);  
    };
    return f;
};

Roo.data.Record.AUTO_ID = 1000;
Roo.data.Record.EDIT = 'edit';
Roo.data.Record.REJECT = 'reject';
Roo.data.Record.COMMIT = 'commit';

Roo.data.Record.prototype = {
    /**
     * Readonly flag - true if this record has been modified.
     * @type Boolean
     */
    dirty : false,
    editing : false,
    error: null,
    modified: null,

    // private
    join : function(store){
        this.store = store;
    },

    /**
     * Set the named field to the specified value.
     * @param {String} name The name of the field to set.
     * @param {Object} value The value to set the field to.
     */
    set : function(name, value){
        if(this.data[name] == value){
            return;
        }
        this.dirty = true;
        if(!this.modified){
            this.modified = {};
        }
        if(typeof this.modified[name] == 'undefined'){
            this.modified[name] = this.data[name];
        }
        this.data[name] = value;
        if(!this.editing && this.store){
            this.store.afterEdit(this);
        }       
    },

    /**
     * Get the value of the named field.
     * @param {String} name The name of the field to get the value of.
     * @return {Object} The value of the field.
     */
    get : function(name){
        return this.data[name]; 
    },

    // private
    beginEdit : function(){
        this.editing = true;
        this.modified = {}; 
    },

    // private
    cancelEdit : function(){
        this.editing = false;
        delete this.modified;
    },

    // private
    endEdit : function(){
        this.editing = false;
        if(this.dirty && this.store){
            this.store.afterEdit(this);
        }
    },

    /**
     * Usually called by the {@link Roo.data.Store} which owns the Record.
     * Rejects all changes made to the Record since either creation, or the last commit operation.
     * Modified fields are reverted to their original values.
     * <p>
     * Developers should subscribe to the {@link Roo.data.Store#update} event to have their code notified
     * of reject operations.
     */
    reject : function(){
        var m = this.modified;
        for(var n in m){
            if(typeof m[n] != "function"){
                this.data[n] = m[n];
            }
        }
        this.dirty = false;
        delete this.modified;
        this.editing = false;
        if(this.store){
            this.store.afterReject(this);
        }
    },

    /**
     * Usually called by the {@link Roo.data.Store} which owns the Record.
     * Commits all changes made to the Record since either creation, or the last commit operation.
     * <p>
     * Developers should subscribe to the {@link Roo.data.Store#update} event to have their code notified
     * of commit operations.
     */
    commit : function(){
        this.dirty = false;
        delete this.modified;
        this.editing = false;
        if(this.store){
            this.store.afterCommit(this);
        }
    },

    // private
    hasError : function(){
        return this.error != null;
    },

    // private
    clearError : function(){
        this.error = null;
    },

    /**
     * Creates a copy of this record.
     * @param {String} id (optional) A new record id if you don't want to use this record's id
     * @return {Record}
     */
    copy : function(newId) {
        return new this.constructor(Roo.apply({}, this.data), newId || this.id);
    }
};/*
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
 * @class Roo.data.Store
 * @extends Roo.util.Observable
 * The Store class encapsulates a client side cache of {@link Roo.data.Record} objects which provide input data
 * for widgets such as the Roo.grid.Grid, or the Roo.form.ComboBox.<br>
 * <p>
 * A Store object uses an implementation of {@link Roo.data.DataProxy} to access a data object unless you call loadData() directly and pass in your data. The Store object
 * has no knowledge of the format of the data returned by the Proxy.<br>
 * <p>
 * A Store object uses its configured implementation of {@link Roo.data.DataReader} to create {@link Roo.data.Record}
 * instances from the data object. These records are cached and made available through accessor functions.
 * @constructor
 * Creates a new Store.
 * @param {Object} config A config object containing the objects needed for the Store to access data,
 * and read the data into Records.
 */
Roo.data.Store = function(config){
    this.data = new Roo.util.MixedCollection(false);
    this.data.getKey = function(o){
        return o.id;
    };
    this.baseParams = {};
    // private
    this.paramNames = {
        "start" : "start",
        "limit" : "limit",
        "sort" : "sort",
        "dir" : "dir",
        "multisort" : "_multisort"
    };

    if(config && config.data){
        this.inlineData = config.data;
        delete config.data;
    }

    Roo.apply(this, config);
    
    if(this.reader){ // reader passed
        this.reader = Roo.factory(this.reader, Roo.data);
        this.reader.xmodule = this.xmodule || false;
        if(!this.recordType){
            this.recordType = this.reader.recordType;
        }
        if(this.reader.onMetaChange){
            this.reader.onMetaChange = this.onMetaChange.createDelegate(this);
        }
    }

    if(this.recordType){
        this.fields = this.recordType.prototype.fields;
    }
    this.modified = [];

    this.addEvents({
        /**
         * @event datachanged
         * Fires when the data cache has changed, and a widget which is using this Store
         * as a Record cache should refresh its view.
         * @param {Store} this
         */
        datachanged : true,
        /**
         * @event metachange
         * Fires when this store's reader provides new metadata (fields). This is currently only support for JsonReaders.
         * @param {Store} this
         * @param {Object} meta The JSON metadata
         */
        metachange : true,
        /**
         * @event add
         * Fires when Records have been added to the Store
         * @param {Store} this
         * @param {Roo.data.Record[]} records The array of Records added
         * @param {Number} index The index at which the record(s) were added
         */
        add : true,
        /**
         * @event remove
         * Fires when a Record has been removed from the Store
         * @param {Store} this
         * @param {Roo.data.Record} record The Record that was removed
         * @param {Number} index The index at which the record was removed
         */
        remove : true,
        /**
         * @event update
         * Fires when a Record has been updated
         * @param {Store} this
         * @param {Roo.data.Record} record The Record that was updated
         * @param {String} operation The update operation being performed.  Value may be one of:
         * <pre><code>
 Roo.data.Record.EDIT
 Roo.data.Record.REJECT
 Roo.data.Record.COMMIT
         * </code></pre>
         */
        update : true,
        /**
         * @event clear
         * Fires when the data cache has been cleared.
         * @param {Store} this
         */
        clear : true,
        /**
         * @event beforeload
         * Fires before a request is made for a new data object.  If the beforeload handler returns false
         * the load action will be canceled.
         * @param {Store} this
         * @param {Object} options The loading options that were specified (see {@link #load} for details)
         */
        beforeload : true,
        /**
         * @event beforeloadadd
         * Fires after a new set of Records has been loaded.
         * @param {Store} this
         * @param {Roo.data.Record[]} records The Records that were loaded
         * @param {Object} options The loading options that were specified (see {@link #load} for details)
         */
        beforeloadadd : true,
        /**
         * @event load
         * Fires after a new set of Records has been loaded, before they are added to the store.
         * @param {Store} this
         * @param {Roo.data.Record[]} records The Records that were loaded
         * @param {Object} options The loading options that were specified (see {@link #load} for details)
         * @params {Object} return from reader
         */
        load : true,
        /**
         * @event loadexception
         * Fires if an exception occurs in the Proxy during loading.
         * Called with the signature of the Proxy's "loadexception" event.
         * If you return Json { data: [] , success: false, .... } then this will be thrown with the following args
         * 
         * @param {Proxy} 
         * @param {Object} return from JsonData.reader() - success, totalRecords, records
         * @param {Object} load options 
         * @param {Object} jsonData from your request (normally this contains the Exception)
         */
        loadexception : true
    });
    
    if(this.proxy){
        this.proxy = Roo.factory(this.proxy, Roo.data);
        this.proxy.xmodule = this.xmodule || false;
        this.relayEvents(this.proxy,  ["loadexception"]);
    }
    this.sortToggle = {};
    this.sortOrder = []; // array of order of sorting - updated by grid if multisort is enabled.

    Roo.data.Store.superclass.constructor.call(this);

    if(this.inlineData){
        this.loadData(this.inlineData);
        delete this.inlineData;
    }
};

Roo.extend(Roo.data.Store, Roo.util.Observable, {
     /**
    * @cfg {boolean} isLocal   flag if data is locally available (and can be always looked up
    * without a remote query - used by combo/forms at present.
    */
    
    /**
    * @cfg {Roo.data.DataProxy} proxy The Proxy object which provides access to a data object.
    */
    /**
    * @cfg {Array} data Inline data to be loaded when the store is initialized.
    */
    /**
    * @cfg {Roo.data.Reader} reader The Reader object which processes the data object and returns
    * an Array of Roo.data.record objects which are cached keyed by their <em>id</em> property.
    */
    /**
    * @cfg {Object} baseParams An object containing properties which are to be sent as parameters
    * on any HTTP request
    */
    /**
    * @cfg {Object} sortInfo A config object in the format: {field: "fieldName", direction: "ASC|DESC"}
    */
    /**
    * @cfg {Boolean} multiSort enable multi column sorting (sort is based on the order of columns, remote only at present)
    */
    multiSort: false,
    /**
    * @cfg {boolean} remoteSort True if sorting is to be handled by requesting the Proxy to provide a refreshed
    * version of the data object in sorted order, as opposed to sorting the Record cache in place (defaults to false).
    */
    remoteSort : false,

    /**
    * @cfg {boolean} pruneModifiedRecords True to clear all modified record information each time the store is
     * loaded or when a record is removed. (defaults to false).
    */
    pruneModifiedRecords : false,

    // private
    lastOptions : null,

    /**
     * Add Records to the Store and fires the add event.
     * @param {Roo.data.Record[]} records An Array of Roo.data.Record objects to add to the cache.
     */
    add : function(records){
        records = [].concat(records);
        for(var i = 0, len = records.length; i < len; i++){
            records[i].join(this);
        }
        var index = this.data.length;
        this.data.addAll(records);
        this.fireEvent("add", this, records, index);
    },

    /**
     * Remove a Record from the Store and fires the remove event.
     * @param {Ext.data.Record} record The Roo.data.Record object to remove from the cache.
     */
    remove : function(record){
        var index = this.data.indexOf(record);
        this.data.removeAt(index);
        if(this.pruneModifiedRecords){
            this.modified.remove(record);
        }
        this.fireEvent("remove", this, record, index);
    },

    /**
     * Remove all Records from the Store and fires the clear event.
     */
    removeAll : function(){
        this.data.clear();
        if(this.pruneModifiedRecords){
            this.modified = [];
        }
        this.fireEvent("clear", this);
    },

    /**
     * Inserts Records to the Store at the given index and fires the add event.
     * @param {Number} index The start index at which to insert the passed Records.
     * @param {Roo.data.Record[]} records An Array of Roo.data.Record objects to add to the cache.
     */
    insert : function(index, records){
        records = [].concat(records);
        for(var i = 0, len = records.length; i < len; i++){
            this.data.insert(index, records[i]);
            records[i].join(this);
        }
        this.fireEvent("add", this, records, index);
    },

    /**
     * Get the index within the cache of the passed Record.
     * @param {Roo.data.Record} record The Roo.data.Record object to to find.
     * @return {Number} The index of the passed Record. Returns -1 if not found.
     */
    indexOf : function(record){
        return this.data.indexOf(record);
    },

    /**
     * Get the index within the cache of the Record with the passed id.
     * @param {String} id The id of the Record to find.
     * @return {Number} The index of the Record. Returns -1 if not found.
     */
    indexOfId : function(id){
        return this.data.indexOfKey(id);
    },

    /**
     * Get the Record with the specified id.
     * @param {String} id The id of the Record to find.
     * @return {Roo.data.Record} The Record with the passed id. Returns undefined if not found.
     */
    getById : function(id){
        return this.data.key(id);
    },

    /**
     * Get the Record at the specified index.
     * @param {Number} index The index of the Record to find.
     * @return {Roo.data.Record} The Record at the passed index. Returns undefined if not found.
     */
    getAt : function(index){
        return this.data.itemAt(index);
    },

    /**
     * Returns a range of Records between specified indices.
     * @param {Number} startIndex (optional) The starting index (defaults to 0)
     * @param {Number} endIndex (optional) The ending index (defaults to the last Record in the Store)
     * @return {Roo.data.Record[]} An array of Records
     */
    getRange : function(start, end){
        return this.data.getRange(start, end);
    },

    // private
    storeOptions : function(o){
        o = Roo.apply({}, o);
        delete o.callback;
        delete o.scope;
        this.lastOptions = o;
    },

    /**
     * Loads the Record cache from the configured Proxy using the configured Reader.
     * <p>
     * If using remote paging, then the first load call must specify the <em>start</em>
     * and <em>limit</em> properties in the options.params property to establish the initial
     * position within the dataset, and the number of Records to cache on each read from the Proxy.
     * <p>
     * <strong>It is important to note that for remote data sources, loading is asynchronous,
     * and this call will return before the new data has been loaded. Perform any post-processing
     * in a callback function, or in a "load" event handler.</strong>
     * <p>
     * @param {Object} options An object containing properties which control loading options:<ul>
     * <li>params {Object} An object containing properties to pass as HTTP parameters to a remote data source.</li>
     * <li>callback {Function} A function to be called after the Records have been loaded. The callback is
     * passed the following arguments:<ul>
     * <li>r : Roo.data.Record[]</li>
     * <li>options: Options object from the load call</li>
     * <li>success: Boolean success indicator</li></ul></li>
     * <li>scope {Object} Scope with which to call the callback (defaults to the Store object)</li>
     * <li>add {Boolean} indicator to append loaded records rather than replace the current cache.</li>
     * </ul>
     */
    load : function(options){
        options = options || {};
        if(this.fireEvent("beforeload", this, options) !== false){
            this.storeOptions(options);
            var p = Roo.apply(options.params || {}, this.baseParams);
            // if meta was not loaded from remote source.. try requesting it.
            if (!this.reader.metaFromRemote) {
                p._requestMeta = 1;
            }
            if(this.sortInfo && this.remoteSort){
                var pn = this.paramNames;
                p[pn["sort"]] = this.sortInfo.field;
                p[pn["dir"]] = this.sortInfo.direction;
            }
            if (this.multiSort) {
                var pn = this.paramNames;
                p[pn["multisort"]] = Roo.encode( { sort : this.sortToggle, order: this.sortOrder });
            }
            
            this.proxy.load(p, this.reader, this.loadRecords, this, options);
        }
    },

    /**
     * Reloads the Record cache from the configured Proxy using the configured Reader and
     * the options from the last load operation performed.
     * @param {Object} options (optional) An object containing properties which may override the options
     * used in the last load operation. See {@link #load} for details (defaults to null, in which case
     * the most recently used options are reused).
     */
    reload : function(options){
        this.load(Roo.applyIf(options||{}, this.lastOptions));
    },

    // private
    // Called as a callback by the Reader during a load operation.
    loadRecords : function(o, options, success){
        if(!o || success === false){
            if(success !== false){
                this.fireEvent("load", this, [], options, o);
            }
            if(options.callback){
                options.callback.call(options.scope || this, [], options, false);
            }
            return;
        }
        // if data returned failure - throw an exception.
        if (o.success === false) {
            // show a message if no listener is registered.
            if (!this.hasListener('loadexception') && typeof(o.raw.errorMsg) != 'undefined') {
                    Roo.MessageBox.alert("Error loading",o.raw.errorMsg);
            }
            // loadmask wil be hooked into this..
            this.fireEvent("loadexception", this, o, options, o.raw.errorMsg);
            return;
        }
        var r = o.records, t = o.totalRecords || r.length;
        
        this.fireEvent("beforeloadadd", this, r, options, o);
        
        if(!options || options.add !== true){
            if(this.pruneModifiedRecords){
                this.modified = [];
            }
            for(var i = 0, len = r.length; i < len; i++){
                r[i].join(this);
            }
            if(this.snapshot){
                this.data = this.snapshot;
                delete this.snapshot;
            }
            this.data.clear();
            this.data.addAll(r);
            this.totalLength = t;
            this.applySort();
            this.fireEvent("datachanged", this);
        }else{
            this.totalLength = Math.max(t, this.data.length+r.length);
            this.add(r);
        }
        this.fireEvent("load", this, r, options, o);
        if(options.callback){
            options.callback.call(options.scope || this, r, options, true);
        }
    },


    /**
     * Loads data from a passed data block. A Reader which understands the format of the data
     * must have been configured in the constructor.
     * @param {Object} data The data block from which to read the Records.  The format of the data expected
     * is dependent on the type of Reader that is configured and should correspond to that Reader's readRecords parameter.
     * @param {Boolean} append (Optional) True to append the new Records rather than replace the existing cache.
     */
    loadData : function(o, append){
        var r = this.reader.readRecords(o);
        this.loadRecords(r, {add: append}, true);
    },

    /**
     * Gets the number of cached records.
     * <p>
     * <em>If using paging, this may not be the total size of the dataset. If the data object
     * used by the Reader contains the dataset size, then the getTotalCount() function returns
     * the data set size</em>
     */
    getCount : function(){
        return this.data.length || 0;
    },

    /**
     * Gets the total number of records in the dataset as returned by the server.
     * <p>
     * <em>If using paging, for this to be accurate, the data object used by the Reader must contain
     * the dataset size</em>
     */
    getTotalCount : function(){
        return this.totalLength || 0;
    },

    /**
     * Returns the sort state of the Store as an object with two properties:
     * <pre><code>
 field {String} The name of the field by which the Records are sorted
 direction {String} The sort order, "ASC" or "DESC"
     * </code></pre>
     */
    getSortState : function(){
        return this.sortInfo;
    },

    // private
    applySort : function(){
        if(this.sortInfo && !this.remoteSort){
            var s = this.sortInfo, f = s.field;
            var st = this.fields.get(f).sortType;
            var fn = function(r1, r2){
                var v1 = st(r1.data[f]), v2 = st(r2.data[f]);
                return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
            };
            this.data.sort(s.direction, fn);
            if(this.snapshot && this.snapshot != this.data){
                this.snapshot.sort(s.direction, fn);
            }
        }
    },

    /**
     * Sets the default sort column and order to be used by the next load operation.
     * @param {String} fieldName The name of the field to sort by.
     * @param {String} dir (optional) The sort order, "ASC" or "DESC" (defaults to "ASC")
     */
    setDefaultSort : function(field, dir){
        this.sortInfo = {field: field, direction: dir ? dir.toUpperCase() : "ASC"};
    },

    /**
     * Sort the Records.
     * If remote sorting is used, the sort is performed on the server, and the cache is
     * reloaded. If local sorting is used, the cache is sorted internally.
     * @param {String} fieldName The name of the field to sort by.
     * @param {String} dir (optional) The sort order, "ASC" or "DESC" (defaults to "ASC")
     */
    sort : function(fieldName, dir){
        var f = this.fields.get(fieldName);
        if(!dir){
            this.sortToggle[f.name] = this.sortToggle[f.name] || f.sortDir;
            
            if(this.multiSort || (this.sortInfo && this.sortInfo.field == f.name) ){ // toggle sort dir
                dir = (this.sortToggle[f.name] || "ASC").toggle("ASC", "DESC");
            }else{
                dir = f.sortDir;
            }
        }
        this.sortToggle[f.name] = dir;
        this.sortInfo = {field: f.name, direction: dir};
        if(!this.remoteSort){
            this.applySort();
            this.fireEvent("datachanged", this);
        }else{
            this.load(this.lastOptions);
        }
    },

    /**
     * Calls the specified function for each of the Records in the cache.
     * @param {Function} fn The function to call. The Record is passed as the first parameter.
     * Returning <em>false</em> aborts and exits the iteration.
     * @param {Object} scope (optional) The scope in which to call the function (defaults to the Record).
     */
    each : function(fn, scope){
        this.data.each(fn, scope);
    },

    /**
     * Gets all records modified since the last commit.  Modified records are persisted across load operations
     * (e.g., during paging).
     * @return {Roo.data.Record[]} An array of Records containing outstanding modifications.
     */
    getModifiedRecords : function(){
        return this.modified;
    },

    // private
    createFilterFn : function(property, value, anyMatch){
        if(!value.exec){ // not a regex
            value = String(value);
            if(value.length == 0){
                return false;
            }
            value = new RegExp((anyMatch === true ? '' : '^') + Roo.escapeRe(value), "i");
        }
        return function(r){
            return value.test(r.data[property]);
        };
    },

    /**
     * Sums the value of <i>property</i> for each record between start and end and returns the result.
     * @param {String} property A field on your records
     * @param {Number} start The record index to start at (defaults to 0)
     * @param {Number} end The last record index to include (defaults to length - 1)
     * @return {Number} The sum
     */
    sum : function(property, start, end){
        var rs = this.data.items, v = 0;
        start = start || 0;
        end = (end || end === 0) ? end : rs.length-1;

        for(var i = start; i <= end; i++){
            v += (rs[i].data[property] || 0);
        }
        return v;
    },

    /**
     * Filter the records by a specified property.
     * @param {String} field A field on your records
     * @param {String/RegExp} value Either a string that the field
     * should start with or a RegExp to test against the field
     * @param {Boolean} anyMatch True to match any part not just the beginning
     */
    filter : function(property, value, anyMatch){
        var fn = this.createFilterFn(property, value, anyMatch);
        return fn ? this.filterBy(fn) : this.clearFilter();
    },

    /**
     * Filter by a function. The specified function will be called with each
     * record in this data source. If the function returns true the record is included,
     * otherwise it is filtered.
     * @param {Function} fn The function to be called, it will receive 2 args (record, id)
     * @param {Object} scope (optional) The scope of the function (defaults to this)
     */
    filterBy : function(fn, scope){
        this.snapshot = this.snapshot || this.data;
        this.data = this.queryBy(fn, scope||this);
        this.fireEvent("datachanged", this);
    },

    /**
     * Query the records by a specified property.
     * @param {String} field A field on your records
     * @param {String/RegExp} value Either a string that the field
     * should start with or a RegExp to test against the field
     * @param {Boolean} anyMatch True to match any part not just the beginning
     * @return {MixedCollection} Returns an Roo.util.MixedCollection of the matched records
     */
    query : function(property, value, anyMatch){
        var fn = this.createFilterFn(property, value, anyMatch);
        return fn ? this.queryBy(fn) : this.data.clone();
    },

    /**
     * Query by a function. The specified function will be called with each
     * record in this data source. If the function returns true the record is included
     * in the results.
     * @param {Function} fn The function to be called, it will receive 2 args (record, id)
     * @param {Object} scope (optional) The scope of the function (defaults to this)
      @return {MixedCollection} Returns an Roo.util.MixedCollection of the matched records
     **/
    queryBy : function(fn, scope){
        var data = this.snapshot || this.data;
        return data.filterBy(fn, scope||this);
    },

    /**
     * Collects unique values for a particular dataIndex from this store.
     * @param {String} dataIndex The property to collect
     * @param {Boolean} allowNull (optional) Pass true to allow null, undefined or empty string values
     * @param {Boolean} bypassFilter (optional) Pass true to collect from all records, even ones which are filtered
     * @return {Array} An array of the unique values
     **/
    collect : function(dataIndex, allowNull, bypassFilter){
        var d = (bypassFilter === true && this.snapshot) ?
                this.snapshot.items : this.data.items;
        var v, sv, r = [], l = {};
        for(var i = 0, len = d.length; i < len; i++){
            v = d[i].data[dataIndex];
            sv = String(v);
            if((allowNull || !Roo.isEmpty(v)) && !l[sv]){
                l[sv] = true;
                r[r.length] = v;
            }
        }
        return r;
    },

    /**
     * Revert to a view of the Record cache with no filtering applied.
     * @param {Boolean} suppressEvent If true the filter is cleared silently without notifying listeners
     */
    clearFilter : function(suppressEvent){
        if(this.snapshot && this.snapshot != this.data){
            this.data = this.snapshot;
            delete this.snapshot;
            if(suppressEvent !== true){
                this.fireEvent("datachanged", this);
            }
        }
    },

    // private
    afterEdit : function(record){
        if(this.modified.indexOf(record) == -1){
            this.modified.push(record);
        }
        this.fireEvent("update", this, record, Roo.data.Record.EDIT);
    },
    
    // private
    afterReject : function(record){
        this.modified.remove(record);
        this.fireEvent("update", this, record, Roo.data.Record.REJECT);
    },

    // private
    afterCommit : function(record){
        this.modified.remove(record);
        this.fireEvent("update", this, record, Roo.data.Record.COMMIT);
    },

    /**
     * Commit all Records with outstanding changes. To handle updates for changes, subscribe to the
     * Store's "update" event, and perform updating when the third parameter is Roo.data.Record.COMMIT.
     */
    commitChanges : function(){
        var m = this.modified.slice(0);
        this.modified = [];
        for(var i = 0, len = m.length; i < len; i++){
            m[i].commit();
        }
    },

    /**
     * Cancel outstanding changes on all changed records.
     */
    rejectChanges : function(){
        var m = this.modified.slice(0);
        this.modified = [];
        for(var i = 0, len = m.length; i < len; i++){
            m[i].reject();
        }
    },

    onMetaChange : function(meta, rtype, o){
        this.recordType = rtype;
        this.fields = rtype.prototype.fields;
        delete this.snapshot;
        this.sortInfo = meta.sortInfo || this.sortInfo;
        this.modified = [];
        this.fireEvent('metachange', this, this.reader.meta);
    }
});/*
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
 * @class Roo.data.SimpleStore
 * @extends Roo.data.Store
 * Small helper class to make creating Stores from Array data easier.
 * @cfg {Number} id The array index of the record id. Leave blank to auto generate ids.
 * @cfg {Array} fields An array of field definition objects, or field name strings.
 * @cfg {Array} data The multi-dimensional array of data
 * @constructor
 * @param {Object} config
 */
Roo.data.SimpleStore = function(config){
    Roo.data.SimpleStore.superclass.constructor.call(this, {
        isLocal : true,
        reader: new Roo.data.ArrayReader({
                id: config.id
            },
            Roo.data.Record.create(config.fields)
        ),
        proxy : new Roo.data.MemoryProxy(config.data)
    });
    this.load();
};
Roo.extend(Roo.data.SimpleStore, Roo.data.Store);/*
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
/**
 * @extends Roo.data.Store
 * @class Roo.data.JsonStore
 * Small helper class to make creating Stores for JSON data easier. <br/>
<pre><code>
var store = new Roo.data.JsonStore({
    url: 'get-images.php',
    root: 'images',
    fields: ['name', 'url', {name:'size', type: 'float'}, {name:'lastmod', type:'date'}]
});
</code></pre>
 * <b>Note: Although they are not listed, this class inherits all of the config options of Store,
 * JsonReader and HttpProxy (unless inline data is provided).</b>
 * @cfg {Array} fields An array of field definition objects, or field name strings.
 * @constructor
 * @param {Object} config
 */
Roo.data.JsonStore = function(c){
    Roo.data.JsonStore.superclass.constructor.call(this, Roo.apply(c, {
        proxy: !c.data ? new Roo.data.HttpProxy({url: c.url}) : undefined,
        reader: new Roo.data.JsonReader(c, c.fields)
    }));
};
Roo.extend(Roo.data.JsonStore, Roo.data.Store);/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

 
Roo.data.Field = function(config){
    if(typeof config == "string"){
        config = {name: config};
    }
    Roo.apply(this, config);
    
    if(!this.type){
        this.type = "auto";
    }
    
    var st = Roo.data.SortTypes;
    // named sortTypes are supported, here we look them up
    if(typeof this.sortType == "string"){
        this.sortType = st[this.sortType];
    }
    
    // set default sortType for strings and dates
    if(!this.sortType){
        switch(this.type){
            case "string":
                this.sortType = st.asUCString;
                break;
            case "date":
                this.sortType = st.asDate;
                break;
            default:
                this.sortType = st.none;
        }
    }

    // define once
    var stripRe = /[\$,%]/g;

    // prebuilt conversion function for this field, instead of
    // switching every time we're reading a value
    if(!this.convert){
        var cv, dateFormat = this.dateFormat;
        switch(this.type){
            case "":
            case "auto":
            case undefined:
                cv = function(v){ return v; };
                break;
            case "string":
                cv = function(v){ return (v === undefined || v === null) ? '' : String(v); };
                break;
            case "int":
                cv = function(v){
                    return v !== undefined && v !== null && v !== '' ?
                           parseInt(String(v).replace(stripRe, ""), 10) : '';
                    };
                break;
            case "float":
                cv = function(v){
                    return v !== undefined && v !== null && v !== '' ?
                           parseFloat(String(v).replace(stripRe, ""), 10) : ''; 
                    };
                break;
            case "bool":
            case "boolean":
                cv = function(v){ return v === true || v === "true" || v == 1; };
                break;
            case "date":
                cv = function(v){
                    if(!v){
                        return '';
                    }
                    if(v instanceof Date){
                        return v;
                    }
                    if(dateFormat){
                        if(dateFormat == "timestamp"){
                            return new Date(v*1000);
                        }
                        return Date.parseDate(v, dateFormat);
                    }
                    var parsed = Date.parse(v);
                    return parsed ? new Date(parsed) : null;
                };
             break;
            
        }
        this.convert = cv;
    }
};

Roo.data.Field.prototype = {
    dateFormat: null,
    defaultValue: "",
    mapping: null,
    sortType : null,
    sortDir : "ASC"
};/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 
// Base class for reading structured data from a data source.  This class is intended to be
// extended (see ArrayReader, JsonReader and XmlReader) and should not be created directly.

/**
 * @class Roo.data.DataReader
 * Base class for reading structured data from a data source.  This class is intended to be
 * extended (see {Roo.data.ArrayReader}, {Roo.data.JsonReader} and {Roo.data.XmlReader}) and should not be created directly.
 */

Roo.data.DataReader = function(meta, recordType){
    
    this.meta = meta;
    
    this.recordType = recordType instanceof Array ? 
        Roo.data.Record.create(recordType) : recordType;
};

Roo.data.DataReader.prototype = {
     /**
     * Create an empty record
     * @param {Object} data (optional) - overlay some values
     * @return {Roo.data.Record} record created.
     */
    newRow :  function(d) {
        var da =  {};
        this.recordType.prototype.fields.each(function(c) {
            switch( c.type) {
                case 'int' : da[c.name] = 0; break;
                case 'date' : da[c.name] = new Date(); break;
                case 'float' : da[c.name] = 0.0; break;
                case 'boolean' : da[c.name] = false; break;
                default : da[c.name] = ""; break;
            }
            
        });
        return new this.recordType(Roo.apply(da, d));
    }
    
};/*
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
 * @class Roo.data.DataProxy
 * @extends Roo.data.Observable
 * This class is an abstract base class for implementations which provide retrieval of
 * unformatted data objects.<br>
 * <p>
 * DataProxy implementations are usually used in conjunction with an implementation of Roo.data.DataReader
 * (of the appropriate type which knows how to parse the data object) to provide a block of
 * {@link Roo.data.Records} to an {@link Roo.data.Store}.<br>
 * <p>
 * Custom implementations must implement the load method as described in
 * {@link Roo.data.HttpProxy#load}.
 */
Roo.data.DataProxy = function(){
    this.addEvents({
        /**
         * @event beforeload
         * Fires before a network request is made to retrieve a data object.
         * @param {Object} This DataProxy object.
         * @param {Object} params The params parameter to the load function.
         */
        beforeload : true,
        /**
         * @event load
         * Fires before the load method's callback is called.
         * @param {Object} This DataProxy object.
         * @param {Object} o The data object.
         * @param {Object} arg The callback argument object passed to the load function.
         */
        load : true,
        /**
         * @event loadexception
         * Fires if an Exception occurs during data retrieval.
         * @param {Object} This DataProxy object.
         * @param {Object} o The data object.
         * @param {Object} arg The callback argument object passed to the load function.
         * @param {Object} e The Exception.
         */
        loadexception : true
    });
    Roo.data.DataProxy.superclass.constructor.call(this);
};

Roo.extend(Roo.data.DataProxy, Roo.util.Observable);

    /**
     * @cfg {void} listeners (Not available) Constructor blocks listeners from being set
     */
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
 * @class Roo.data.MemoryProxy
 * An implementation of Roo.data.DataProxy that simply passes the data specified in its constructor
 * to the Reader when its load method is called.
 * @constructor
 * @param {Object} data The data object which the Reader uses to construct a block of Roo.data.Records.
 */
Roo.data.MemoryProxy = function(data){
    if (data.data) {
        data = data.data;
    }
    Roo.data.MemoryProxy.superclass.constructor.call(this);
    this.data = data;
};

Roo.extend(Roo.data.MemoryProxy, Roo.data.DataProxy, {
    /**
     * Load data from the requested source (in this case an in-memory
     * data object passed to the constructor), read the data object into
     * a block of Roo.data.Records using the passed Roo.data.DataReader implementation, and
     * process that block using the passed callback.
     * @param {Object} params This parameter is not used by the MemoryProxy class.
     * @param {Roo.data.DataReader} reader The Reader object which converts the data
     * object into a block of Roo.data.Records.
     * @param {Function} callback The function into which to pass the block of Roo.data.records.
     * The function must be passed <ul>
     * <li>The Record block object</li>
     * <li>The "arg" argument from the load function</li>
     * <li>A boolean success indicator</li>
     * </ul>
     * @param {Object} scope The scope in which to call the callback
     * @param {Object} arg An optional argument which is passed to the callback as its second parameter.
     */
    load : function(params, reader, callback, scope, arg){
        params = params || {};
        var result;
        try {
            result = reader.readRecords(this.data);
        }catch(e){
            this.fireEvent("loadexception", this, arg, null, e);
            callback.call(scope, null, arg, false);
            return;
        }
        callback.call(scope, result, arg, true);
    },
    
    // private
    update : function(params, records){
        
    }
});/*
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
 * @class Roo.data.HttpProxy
 * @extends Roo.data.DataProxy
 * An implementation of {@link Roo.data.DataProxy} that reads a data object from an {@link Roo.data.Connection} object
 * configured to reference a certain URL.<br><br>
 * <p>
 * <em>Note that this class cannot be used to retrieve data from a domain other than the domain
 * from which the running page was served.<br><br>
 * <p>
 * For cross-domain access to remote data, use an {@link Roo.data.ScriptTagProxy}.</em><br><br>
 * <p>
 * Be aware that to enable the browser to parse an XML document, the server must set
 * the Content-Type header in the HTTP response to "text/xml".
 * @constructor
 * @param {Object} conn Connection config options to add to each request (e.g. {url: 'foo.php'} or
 * an {@link Roo.data.Connection} object.  If a Connection config is passed, the singleton {@link Roo.Ajax} object
 * will be used to make the request.
 */
Roo.data.HttpProxy = function(conn){
    Roo.data.HttpProxy.superclass.constructor.call(this);
    // is conn a conn config or a real conn?
    this.conn = conn;
    this.useAjax = !conn || !conn.events;
  
};

Roo.extend(Roo.data.HttpProxy, Roo.data.DataProxy, {
    // thse are take from connection...
    
    /**
     * @cfg {String} url (Optional) The default URL to be used for requests to the server. (defaults to undefined)
     */
    /**
     * @cfg {Object} extraParams (Optional) An object containing properties which are used as
     * extra parameters to each request made by this object. (defaults to undefined)
     */
    /**
     * @cfg {Object} defaultHeaders (Optional) An object containing request headers which are added
     *  to each request made by this object. (defaults to undefined)
     */
    /**
     * @cfg {String} method (Optional) The default HTTP method to be used for requests. (defaults to undefined; if not set but parms are present will use POST, otherwise GET)
     */
    /**
     * @cfg {Number} timeout (Optional) The timeout in milliseconds to be used for requests. (defaults to 30000)
     */
     /**
     * @cfg {Boolean} autoAbort (Optional) Whether this request should abort any pending requests. (defaults to false)
     * @type Boolean
     */
  

    /**
     * @cfg {Boolean} disableCaching (Optional) True to add a unique cache-buster param to GET requests. (defaults to true)
     * @type Boolean
     */
    /**
     * Return the {@link Roo.data.Connection} object being used by this Proxy.
     * @return {Connection} The Connection object. This object may be used to subscribe to events on
     * a finer-grained basis than the DataProxy events.
     */
    getConnection : function(){
        return this.useAjax ? Roo.Ajax : this.conn;
    },

    /**
     * Load data from the configured {@link Roo.data.Connection}, read the data object into
     * a block of Roo.data.Records using the passed {@link Roo.data.DataReader} implementation, and
     * process that block using the passed callback.
     * @param {Object} params An object containing properties which are to be used as HTTP parameters
     * for the request to the remote server.
     * @param {Roo.data.DataReader} reader The Reader object which converts the data
     * object into a block of Roo.data.Records.
     * @param {Function} callback The function into which to pass the block of Roo.data.Records.
     * The function must be passed <ul>
     * <li>The Record block object</li>
     * <li>The "arg" argument from the load function</li>
     * <li>A boolean success indicator</li>
     * </ul>
     * @param {Object} scope The scope in which to call the callback
     * @param {Object} arg An optional argument which is passed to the callback as its second parameter.
     */
    load : function(params, reader, callback, scope, arg){
        if(this.fireEvent("beforeload", this, params) !== false){
            var  o = {
                params : params || {},
                request: {
                    callback : callback,
                    scope : scope,
                    arg : arg
                },
                reader: reader,
                callback : this.loadResponse,
                scope: this
            };
            if(this.useAjax){
                Roo.applyIf(o, this.conn);
                if(this.activeRequest){
                    Roo.Ajax.abort(this.activeRequest);
                }
                this.activeRequest = Roo.Ajax.request(o);
            }else{
                this.conn.request(o);
            }
        }else{
            callback.call(scope||this, null, arg, false);
        }
    },

    // private
    loadResponse : function(o, success, response){
        delete this.activeRequest;
        if(!success){
            this.fireEvent("loadexception", this, o, response);
            o.request.callback.call(o.request.scope, null, o.request.arg, false);
            return;
        }
        var result;
        try {
            result = o.reader.read(response);
        }catch(e){
            this.fireEvent("loadexception", this, o, response, e);
            o.request.callback.call(o.request.scope, null, o.request.arg, false);
            return;
        }
        
        this.fireEvent("load", this, o, o.request.arg);
        o.request.callback.call(o.request.scope, result, o.request.arg, true);
    },

    // private
    update : function(dataSet){

    },

    // private
    updateResponse : function(dataSet){

    }
});/*
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
 * @class Roo.data.ScriptTagProxy
 * An implementation of Roo.data.DataProxy that reads a data object from a URL which may be in a domain
 * other than the originating domain of the running page.<br><br>
 * <p>
 * <em>Note that if you are retrieving data from a page that is in a domain that is NOT the same as the originating domain
 * of the running page, you must use this class, rather than DataProxy.</em><br><br>
 * <p>
 * The content passed back from a server resource requested by a ScriptTagProxy is executable JavaScript
 * source code that is used as the source inside a &lt;script> tag.<br><br>
 * <p>
 * In order for the browser to process the returned data, the server must wrap the data object
 * with a call to a callback function, the name of which is passed as a parameter by the ScriptTagProxy.
 * Below is a Java example for a servlet which returns data for either a ScriptTagProxy, or an HttpProxy
 * depending on whether the callback name was passed:
 * <p>
 * <pre><code>
boolean scriptTag = false;
String cb = request.getParameter("callback");
if (cb != null) {
    scriptTag = true;
    response.setContentType("text/javascript");
} else {
    response.setContentType("application/x-json");
}
Writer out = response.getWriter();
if (scriptTag) {
    out.write(cb + "(");
}
out.print(dataBlock.toJsonString());
if (scriptTag) {
    out.write(");");
}
</pre></code>
 *
 * @constructor
 * @param {Object} config A configuration object.
 */
Roo.data.ScriptTagProxy = function(config){
    Roo.data.ScriptTagProxy.superclass.constructor.call(this);
    Roo.apply(this, config);
    this.head = document.getElementsByTagName("head")[0];
};

Roo.data.ScriptTagProxy.TRANS_ID = 1000;

Roo.extend(Roo.data.ScriptTagProxy, Roo.data.DataProxy, {
    /**
     * @cfg {String} url The URL from which to request the data object.
     */
    /**
     * @cfg {Number} timeout (Optional) The number of milliseconds to wait for a response. Defaults to 30 seconds.
     */
    timeout : 30000,
    /**
     * @cfg {String} callbackParam (Optional) The name of the parameter to pass to the server which tells
     * the server the name of the callback function set up by the load call to process the returned data object.
     * Defaults to "callback".<p>The server-side processing must read this parameter value, and generate
     * javascript output which calls this named function passing the data object as its only parameter.
     */
    callbackParam : "callback",
    /**
     *  @cfg {Boolean} nocache (Optional) Defaults to true. Disable cacheing by adding a unique parameter
     * name to the request.
     */
    nocache : true,

    /**
     * Load data from the configured URL, read the data object into
     * a block of Roo.data.Records using the passed Roo.data.DataReader implementation, and
     * process that block using the passed callback.
     * @param {Object} params An object containing properties which are to be used as HTTP parameters
     * for the request to the remote server.
     * @param {Roo.data.DataReader} reader The Reader object which converts the data
     * object into a block of Roo.data.Records.
     * @param {Function} callback The function into which to pass the block of Roo.data.Records.
     * The function must be passed <ul>
     * <li>The Record block object</li>
     * <li>The "arg" argument from the load function</li>
     * <li>A boolean success indicator</li>
     * </ul>
     * @param {Object} scope The scope in which to call the callback
     * @param {Object} arg An optional argument which is passed to the callback as its second parameter.
     */
    load : function(params, reader, callback, scope, arg){
        if(this.fireEvent("beforeload", this, params) !== false){

            var p = Roo.urlEncode(Roo.apply(params, this.extraParams));

            var url = this.url;
            url += (url.indexOf("?") != -1 ? "&" : "?") + p;
            if(this.nocache){
                url += "&_dc=" + (new Date().getTime());
            }
            var transId = ++Roo.data.ScriptTagProxy.TRANS_ID;
            var trans = {
                id : transId,
                cb : "stcCallback"+transId,
                scriptId : "stcScript"+transId,
                params : params,
                arg : arg,
                url : url,
                callback : callback,
                scope : scope,
                reader : reader
            };
            var conn = this;

            window[trans.cb] = function(o){
                conn.handleResponse(o, trans);
            };

            url += String.format("&{0}={1}", this.callbackParam, trans.cb);

            if(this.autoAbort !== false){
                this.abort();
            }

            trans.timeoutId = this.handleFailure.defer(this.timeout, this, [trans]);

            var script = document.createElement("script");
            script.setAttribute("src", url);
            script.setAttribute("type", "text/javascript");
            script.setAttribute("id", trans.scriptId);
            this.head.appendChild(script);

            this.trans = trans;
        }else{
            callback.call(scope||this, null, arg, false);
        }
    },

    // private
    isLoading : function(){
        return this.trans ? true : false;
    },

    /**
     * Abort the current server request.
     */
    abort : function(){
        if(this.isLoading()){
            this.destroyTrans(this.trans);
        }
    },

    // private
    destroyTrans : function(trans, isLoaded){
        this.head.removeChild(document.getElementById(trans.scriptId));
        clearTimeout(trans.timeoutId);
        if(isLoaded){
            window[trans.cb] = undefined;
            try{
                delete window[trans.cb];
            }catch(e){}
        }else{
            // if hasn't been loaded, wait for load to remove it to prevent script error
            window[trans.cb] = function(){
                window[trans.cb] = undefined;
                try{
                    delete window[trans.cb];
                }catch(e){}
            };
        }
    },

    // private
    handleResponse : function(o, trans){
        this.trans = false;
        this.destroyTrans(trans, true);
        var result;
        try {
            result = trans.reader.readRecords(o);
        }catch(e){
            this.fireEvent("loadexception", this, o, trans.arg, e);
            trans.callback.call(trans.scope||window, null, trans.arg, false);
            return;
        }
        this.fireEvent("load", this, o, trans.arg);
        trans.callback.call(trans.scope||window, result, trans.arg, true);
    },

    // private
    handleFailure : function(trans){
        this.trans = false;
        this.destroyTrans(trans, false);
        this.fireEvent("loadexception", this, null, trans.arg);
        trans.callback.call(trans.scope||window, null, trans.arg, false);
    }
});/*
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
 * @class Roo.data.JsonReader
 * @extends Roo.data.DataReader
 * Data reader class to create an Array of Roo.data.Record objects from a JSON response
 * based on mappings in a provided Roo.data.Record constructor.
 * 
 * The default behaviour of a store is to send ?_requestMeta=1, unless the class has recieved 'metaData' property
 * in the reply previously. 
 * 
 * <p>
 * Example code:
 * <pre><code>
var RecordDef = Roo.data.Record.create([
    {name: 'name', mapping: 'name'},     // "mapping" property not needed if it's the same as "name"
    {name: 'occupation'}                 // This field will use "occupation" as the mapping.
]);
var myReader = new Roo.data.JsonReader({
    totalProperty: "results",    // The property which contains the total dataset size (optional)
    root: "rows",                // The property which contains an Array of row objects
    id: "id"                     // The property within each row object that provides an ID for the record (optional)
}, RecordDef);
</code></pre>
 * <p>
 * This would consume a JSON file like this:
 * <pre><code>
{ 'results': 2, 'rows': [
    { 'id': 1, 'name': 'Bill', occupation: 'Gardener' },
    { 'id': 2, 'name': 'Ben', occupation: 'Horticulturalist' } ]
}
</code></pre>
 * @cfg {String} totalProperty Name of the property from which to retrieve the total number of records
 * in the dataset. This is only needed if the whole dataset is not passed in one go, but is being
 * paged from the remote server.
 * @cfg {String} successProperty Name of the property from which to retrieve the success attribute used by forms.
 * @cfg {String} root name of the property which contains the Array of row objects.
 * @cfg {String} id Name of the property within a row object that contains a record identifier value.
 * @constructor
 * Create a new JsonReader
 * @param {Object} meta Metadata configuration options
 * @param {Object} recordType Either an Array of field definition objects,
 * or an {@link Roo.data.Record} object created using {@link Roo.data.Record#create}.
 */
Roo.data.JsonReader = function(meta, recordType){
    
    meta = meta || {};
    // set some defaults:
    Roo.applyIf(meta, {
        totalProperty: 'total',
        successProperty : 'success',
        root : 'data',
        id : 'id'
    });
    
    Roo.data.JsonReader.superclass.constructor.call(this, meta, recordType||meta.fields);
};
Roo.extend(Roo.data.JsonReader, Roo.data.DataReader, {
    
    /**
     * @prop {Boolean} metaFromRemote  - if the meta data was loaded from the remote source.
     * Used by Store query builder to append _requestMeta to params.
     * 
     */
    metaFromRemote : false,
    /**
     * This method is only used by a DataProxy which has retrieved data from a remote server.
     * @param {Object} response The XHR object which contains the JSON data in its responseText.
     * @return {Object} data A data block which is used by an Roo.data.Store object as
     * a cache of Roo.data.Records.
     */
    read : function(response){
        var json = response.responseText;
       
        var o = /* eval:var:o */ eval("("+json+")");
        if(!o) {
            throw {message: "JsonReader.read: Json object not found"};
        }
        
        if(o.metaData){
            
            delete this.ef;
            this.metaFromRemote = true;
            this.meta = o.metaData;
            this.recordType = Roo.data.Record.create(o.metaData.fields);
            this.onMetaChange(this.meta, this.recordType, o);
        }
        return this.readRecords(o);
    },

    // private function a store will implement
    onMetaChange : function(meta, recordType, o){

    },

    /**
	 * @ignore
	 */
    simpleAccess: function(obj, subsc) {
    	return obj[subsc];
    },

	/**
	 * @ignore
	 */
    getJsonAccessor: function(){
        var re = /[\[\.]/;
        return function(expr) {
            try {
                return(re.test(expr))
                    ? new Function("obj", "return obj." + expr)
                    : function(obj){
                        return obj[expr];
                    };
            } catch(e){}
            return Roo.emptyFn;
        };
    }(),

    /**
     * Create a data block containing Roo.data.Records from an XML document.
     * @param {Object} o An object which contains an Array of row objects in the property specified
     * in the config as 'root, and optionally a property, specified in the config as 'totalProperty'
     * which contains the total size of the dataset.
     * @return {Object} data A data block which is used by an Roo.data.Store object as
     * a cache of Roo.data.Records.
     */
    readRecords : function(o){
        /**
         * After any data loads, the raw JSON data is available for further custom processing.
         * @type Object
         */
        this.o = o;
        var s = this.meta, Record = this.recordType,
            f = Record.prototype.fields, fi = f.items, fl = f.length;

//      Generate extraction functions for the totalProperty, the root, the id, and for each field
        if (!this.ef) {
            if(s.totalProperty) {
	            this.getTotal = this.getJsonAccessor(s.totalProperty);
	        }
	        if(s.successProperty) {
	            this.getSuccess = this.getJsonAccessor(s.successProperty);
	        }
	        this.getRoot = s.root ? this.getJsonAccessor(s.root) : function(p){return p;};
	        if (s.id) {
	        	var g = this.getJsonAccessor(s.id);
	        	this.getId = function(rec) {
	        		var r = g(rec);
		        	return (r === undefined || r === "") ? null : r;
	        	};
	        } else {
	        	this.getId = function(){return null;};
	        }
            this.ef = [];
            for(var jj = 0; jj < fl; jj++){
                f = fi[jj];
                var map = (f.mapping !== undefined && f.mapping !== null) ? f.mapping : f.name;
                this.ef[jj] = this.getJsonAccessor(map);
            }
        }

    	var root = this.getRoot(o), c = root.length, totalRecords = c, success = true;
    	if(s.totalProperty){
            var vt = parseInt(this.getTotal(o), 10);
            if(!isNaN(vt)){
                totalRecords = vt;
            }
        }
        if(s.successProperty){
            var vs = this.getSuccess(o);
            if(vs === false || vs === 'false'){
                success = false;
            }
        }
        var records = [];
	    for(var i = 0; i < c; i++){
		    var n = root[i];
	        var values = {};
	        var id = this.getId(n);
	        for(var j = 0; j < fl; j++){
	            f = fi[j];
                var v = this.ef[j](n);
                if (!f.convert) {
                    Roo.log('missing convert for ' + f.name);
                    Roo.log(f);
                    continue;
                }
                values[f.name] = f.convert((v !== undefined) ? v : f.defaultValue);
	        }
	        var record = new Record(values, id);
	        record.json = n;
	        records[i] = record;
	    }
	    return {
            raw : o,
	        success : success,
	        records : records,
	        totalRecords : totalRecords
	    };
    }
});/*
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
 * @class Roo.data.ArrayReader
 * @extends Roo.data.DataReader
 * Data reader class to create an Array of Roo.data.Record objects from an Array.
 * Each element of that Array represents a row of data fields. The
 * fields are pulled into a Record object using as a subscript, the <em>mapping</em> property
 * of the field definition if it exists, or the field's ordinal position in the definition.<br>
 * <p>
 * Example code:.
 * <pre><code>
var RecordDef = Roo.data.Record.create([
    {name: 'name', mapping: 1},         // "mapping" only needed if an "id" field is present which
    {name: 'occupation', mapping: 2}    // precludes using the ordinal position as the index.
]);
var myReader = new Roo.data.ArrayReader({
    id: 0                     // The subscript within row Array that provides an ID for the Record (optional)
}, RecordDef);
</code></pre>
 * <p>
 * This would consume an Array like this:
 * <pre><code>
[ [1, 'Bill', 'Gardener'], [2, 'Ben', 'Horticulturalist'] ]
  </code></pre>
 * @cfg {String} id (optional) The subscript within row Array that provides an ID for the Record
 * @constructor
 * Create a new JsonReader
 * @param {Object} meta Metadata configuration options.
 * @param {Object} recordType Either an Array of field definition objects
 * as specified to {@link Roo.data.Record#create},
 * or an {@link Roo.data.Record} object
 * created using {@link Roo.data.Record#create}.
 */
Roo.data.ArrayReader = function(meta, recordType){
    Roo.data.ArrayReader.superclass.constructor.call(this, meta, recordType);
};

Roo.extend(Roo.data.ArrayReader, Roo.data.JsonReader, {
    /**
     * Create a data block containing Roo.data.Records from an XML document.
     * @param {Object} o An Array of row objects which represents the dataset.
     * @return {Object} data A data block which is used by an Roo.data.Store object as
     * a cache of Roo.data.Records.
     */
    readRecords : function(o){
        var sid = this.meta ? this.meta.id : null;
    	var recordType = this.recordType, fields = recordType.prototype.fields;
    	var records = [];
    	var root = o;
	    for(var i = 0; i < root.length; i++){
		    var n = root[i];
	        var values = {};
	        var id = ((sid || sid === 0) && n[sid] !== undefined && n[sid] !== "" ? n[sid] : null);
	        for(var j = 0, jlen = fields.length; j < jlen; j++){
                var f = fields.items[j];
                var k = f.mapping !== undefined && f.mapping !== null ? f.mapping : j;
                var v = n[k] !== undefined ? n[k] : f.defaultValue;
                v = f.convert(v);
                values[f.name] = v;
            }
	        var record = new recordType(values, id);
	        record.json = n;
	        records[records.length] = record;
	    }
	    return {
	        records : records,
	        totalRecords : records.length
	    };
    }
});/*
 * - LGPL
 * * 
 */

/**
 * @class Roo.bootstrap.ComboBox
 * @extends Roo.bootstrap.TriggerField
 * A combobox control with support for autocomplete, remote-loading, paging and many other features.
 * @constructor
 * Create a new ComboBox.
 * @param {Object} config Configuration options
 */
Roo.bootstrap.ComboBox = function(config){
    Roo.bootstrap.ComboBox.superclass.constructor.call(this, config);
    this.addEvents({
        /**
         * @event expand
         * Fires when the dropdown list is expanded
	     * @param {Roo.bootstrap.ComboBox} combo This combo box
	     */
        'expand' : true,
        /**
         * @event collapse
         * Fires when the dropdown list is collapsed
	     * @param {Roo.bootstrap.ComboBox} combo This combo box
	     */
        'collapse' : true,
        /**
         * @event beforeselect
         * Fires before a list item is selected. Return false to cancel the selection.
	     * @param {Roo.bootstrap.ComboBox} combo This combo box
	     * @param {Roo.data.Record} record The data record returned from the underlying store
	     * @param {Number} index The index of the selected item in the dropdown list
	     */
        'beforeselect' : true,
        /**
         * @event select
         * Fires when a list item is selected
	     * @param {Roo.bootstrap.ComboBox} combo This combo box
	     * @param {Roo.data.Record} record The data record returned from the underlying store (or false on clear)
	     * @param {Number} index The index of the selected item in the dropdown list
	     */
        'select' : true,
        /**
         * @event beforequery
         * Fires before all queries are processed. Return false to cancel the query or set cancel to true.
         * The event object passed has these properties:
	     * @param {Roo.bootstrap.ComboBox} combo This combo box
	     * @param {String} query The query
	     * @param {Boolean} forceAll true to force "all" query
	     * @param {Boolean} cancel true to cancel the query
	     * @param {Object} e The query event object
	     */
        'beforequery': true,
         /**
         * @event add
         * Fires when the 'add' icon is pressed (add a listener to enable add button)
	     * @param {Roo.bootstrap.ComboBox} combo This combo box
	     */
        'add' : true,
        /**
         * @event edit
         * Fires when the 'edit' icon is pressed (add a listener to enable add button)
	     * @param {Roo.bootstrap.ComboBox} combo This combo box
	     * @param {Roo.data.Record|false} record The data record returned from the underlying store (or false on nothing selected)
	     */
        'edit' : true
        
        
    });
    
    
    this.selectedIndex = -1;
    if(this.mode == 'local'){
        if(config.queryDelay === undefined){
            this.queryDelay = 10;
        }
        if(config.minChars === undefined){
            this.minChars = 0;
        }
    }
};

Roo.extend(Roo.bootstrap.ComboBox, Roo.bootstrap.TriggerField, {
     
    /**
     * @cfg {Boolean} lazyRender True to prevent the ComboBox from rendering until requested (should always be used when
     * rendering into an Roo.Editor, defaults to false)
     */
    /**
     * @cfg {Boolean/Object} autoCreate A DomHelper element spec, or true for a default element spec (defaults to:
     * {tag: "input", type: "text", size: "24", autocomplete: "off"})
     */
    /**
     * @cfg {Roo.data.Store} store The data store to which this combo is bound (defaults to undefined)
     */
    /**
     * @cfg {String} title If supplied, a header element is created containing this text and added into the top of
     * the dropdown list (defaults to undefined, with no header element)
     */

     /**
     * @cfg {String/Roo.Template} tpl The template to use to render the output
     */
     
     /**
     * @cfg {Number} listWidth The width in pixels of the dropdown list (defaults to the width of the ComboBox field)
     */
    listWidth: undefined,
    /**
     * @cfg {String} displayField The underlying data field name to bind to this CombBox (defaults to undefined if
     * mode = 'remote' or 'text' if mode = 'local')
     */
    displayField: undefined,
    /**
     * @cfg {String} valueField The underlying data value name to bind to this CombBox (defaults to undefined if
     * mode = 'remote' or 'value' if mode = 'local'). 
     * Note: use of a valueField requires the user make a selection
     * in order for a value to be mapped.
     */
    valueField: undefined,
    
    
    /**
     * @cfg {String} hiddenName If specified, a hidden form field with this name is dynamically generated to store the
     * field's data value (defaults to the underlying DOM element's name)
     */
    hiddenName: undefined,
    /**
     * @cfg {String} listClass CSS class to apply to the dropdown list element (defaults to '')
     */
    listClass: '',
    /**
     * @cfg {String} selectedClass CSS class to apply to the selected item in the dropdown list (defaults to 'x-combo-selected')
     */
    selectedClass: 'active',
    
    /**
     * @cfg {Boolean/String} shadow True or "sides" for the default effect, "frame" for 4-way shadow, and "drop" for bottom-right
     */
    shadow:'sides',
    /**
     * @cfg {String} listAlign A valid anchor position value. See {@link Roo.Element#alignTo} for details on supported
     * anchor positions (defaults to 'tl-bl')
     */
    listAlign: 'tl-bl?',
    /**
     * @cfg {Number} maxHeight The maximum height in pixels of the dropdown list before scrollbars are shown (defaults to 300)
     */
    maxHeight: 300,
    /**
     * @cfg {String} triggerAction The action to execute when the trigger field is activated.  Use 'all' to run the
     * query specified by the allQuery config option (defaults to 'query')
     */
    triggerAction: 'query',
    /**
     * @cfg {Number} minChars The minimum number of characters the user must type before autocomplete and typeahead activate
     * (defaults to 4, does not apply if editable = false)
     */
    minChars : 4,
    /**
     * @cfg {Boolean} typeAhead True to populate and autoselect the remainder of the text being typed after a configurable
     * delay (typeAheadDelay) if it matches a known value (defaults to false)
     */
    typeAhead: false,
    /**
     * @cfg {Number} queryDelay The length of time in milliseconds to delay between the start of typing and sending the
     * query to filter the dropdown list (defaults to 500 if mode = 'remote' or 10 if mode = 'local')
     */
    queryDelay: 500,
    /**
     * @cfg {Number} pageSize If greater than 0, a paging toolbar is displayed in the footer of the dropdown list and the
     * filter queries will execute with page start and limit parameters.  Only applies when mode = 'remote' (defaults to 0)
     */
    pageSize: 0,
    /**
     * @cfg {Boolean} selectOnFocus True to select any existing text in the field immediately on focus.  Only applies
     * when editable = true (defaults to false)
     */
    selectOnFocus:false,
    /**
     * @cfg {String} queryParam Name of the query as it will be passed on the querystring (defaults to 'query')
     */
    queryParam: 'query',
    /**
     * @cfg {String} loadingText The text to display in the dropdown list while data is loading.  Only applies
     * when mode = 'remote' (defaults to 'Loading...')
     */
    loadingText: 'Loading...',
    /**
     * @cfg {Boolean} resizable True to add a resize handle to the bottom of the dropdown list (defaults to false)
     */
    resizable: false,
    /**
     * @cfg {Number} handleHeight The height in pixels of the dropdown list resize handle if resizable = true (defaults to 8)
     */
    handleHeight : 8,
    /**
     * @cfg {Boolean} editable False to prevent the user from typing text directly into the field, just like a
     * traditional select (defaults to true)
     */
    editable: true,
    /**
     * @cfg {String} allQuery The text query to send to the server to return all records for the list with no filtering (defaults to '')
     */
    allQuery: '',
    /**
     * @cfg {String} mode Set to 'local' if the ComboBox loads local data (defaults to 'remote' which loads from the server)
     */
    mode: 'remote',
    /**
     * @cfg {Number} minListWidth The minimum width of the dropdown list in pixels (defaults to 70, will be ignored if
     * listWidth has a higher value)
     */
    minListWidth : 70,
    /**
     * @cfg {Boolean} forceSelection True to restrict the selected value to one of the values in the list, false to
     * allow the user to set arbitrary text into the field (defaults to false)
     */
    forceSelection:false,
    /**
     * @cfg {Number} typeAheadDelay The length of time in milliseconds to wait until the typeahead text is displayed
     * if typeAhead = true (defaults to 250)
     */
    typeAheadDelay : 250,
    /**
     * @cfg {String} valueNotFoundText When using a name/value combo, if the value passed to setValue is not found in
     * the store, valueNotFoundText will be displayed as the field text if defined (defaults to undefined)
     */
    valueNotFoundText : undefined,
    /**
     * @cfg {Boolean} blockFocus Prevents all focus calls, so it can work with things like HTML edtor bar
     */
    blockFocus : false,
    
    /**
     * @cfg {Boolean} disableClear Disable showing of clear button.
     */
    disableClear : false,
    /**
     * @cfg {Boolean} alwaysQuery  Disable caching of results, and always send query
     */
    alwaysQuery : false,
    
    //private
    addicon : false,
    editicon: false,
    
    // element that contains real text value.. (when hidden is used..)
     
    // private
    initEvents: function(){
        
        if (!this.store) {
            throw "can not find store for combo";
        }
        this.store = Roo.factory(this.store, Roo.data);
        
        
        
        Roo.bootstrap.ComboBox.superclass.initEvents.call(this);
        
        
        if(this.hiddenName){
            
            this.hiddenField = this.el.select('input.form-hidden-field',true).first();
            
            this.hiddenField.dom.value =
                this.hiddenValue !== undefined ? this.hiddenValue :
                this.value !== undefined ? this.value : '';

            // prevent input submission
            this.el.dom.removeAttribute('name');
            this.hiddenField.dom.setAttribute('name', this.hiddenName);
             
             
        }
        //if(Roo.isGecko){
        //    this.el.dom.setAttribute('autocomplete', 'off');
        //}

        var cls = 'x-combo-list';
        this.list = this.el.select('ul',true).first();

        //this.list = new Roo.Layer({
        //    shadow: this.shadow, cls: [cls, this.listClass].join(' '), constrain:false
        //});
        
        var lw = this.listWidth || Math.max(this.inputEl().getWidth(), this.minListWidth);
        this.list.setWidth(lw);
        
        this.list.on('mouseover', this.onViewOver, this);
        this.list.on('mousemove', this.onViewMove, this);
        Roo.log(this.list);
        /*
        this.list.swallowEvent('mousewheel');
        this.assetHeight = 0;

        if(this.title){
            this.header = this.list.createChild({cls:cls+'-hd', html: this.title});
            this.assetHeight += this.header.getHeight();
        }

        this.innerList = this.list.createChild({cls:cls+'-inner'});
        this.innerList.on('mouseover', this.onViewOver, this);
        this.innerList.on('mousemove', this.onViewMove, this);
        this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
        
        if(this.allowBlank && !this.pageSize && !this.disableClear){
            this.footer = this.list.createChild({cls:cls+'-ft'});
            this.pageTb = new Roo.Toolbar(this.footer);
           
        }
        if(this.pageSize){
            this.footer = this.list.createChild({cls:cls+'-ft'});
            this.pageTb = new Roo.PagingToolbar(this.footer, this.store,
                    {pageSize: this.pageSize});
            
        }
        
        if (this.pageTb && this.allowBlank && !this.disableClear) {
            var _this = this;
            this.pageTb.add(new Roo.Toolbar.Fill(), {
                cls: 'x-btn-icon x-btn-clear',
                text: '&#160;',
                handler: function()
                {
                    _this.collapse();
                    _this.clearValue();
                    _this.onSelect(false, -1);
                }
            });
        }
        if (this.footer) {
            this.assetHeight += this.footer.getHeight();
        }
        */
            
        if(!this.tpl){
            this.tpl = '<li><a href="#">{' + this.displayField + '}</a></li>';
        }

        this.view = new Roo.View(this.el.select('ul',true).first(), this.tpl, {
            singleSelect:true, store: this.store, selectedClass: this.selectedClass
        });
        //this.view.wrapEl.setDisplayed(false);
        this.view.on('click', this.onViewClick, this);
        
        
        
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.on('load', this.onLoad, this);
        this.store.on('loadexception', this.onLoadException, this);
        /*
        if(this.resizable){
            this.resizer = new Roo.Resizable(this.list,  {
               pinned:true, handles:'se'
            });
            this.resizer.on('resize', function(r, w, h){
                this.maxHeight = h-this.handleHeight-this.list.getFrameWidth('tb')-this.assetHeight;
                this.listWidth = w;
                this.innerList.setWidth(w - this.list.getFrameWidth('lr'));
                this.restrictHeight();
            }, this);
            this[this.pageSize?'footer':'innerList'].setStyle('margin-bottom', this.handleHeight+'px');
        }
        */
        if(!this.editable){
            this.editable = true;
            this.setEditable(false);
        }
        
        /*
        
        if (typeof(this.events.add.listeners) != 'undefined') {
            
            this.addicon = this.wrap.createChild(
                {tag: 'img', src: Roo.BLANK_IMAGE_URL, cls: 'x-form-combo-add' });  
       
            this.addicon.on('click', function(e) {
                this.fireEvent('add', this);
            }, this);
        }
        if (typeof(this.events.edit.listeners) != 'undefined') {
            
            this.editicon = this.wrap.createChild(
                {tag: 'img', src: Roo.BLANK_IMAGE_URL, cls: 'x-form-combo-edit' });  
            if (this.addicon) {
                this.editicon.setStyle('margin-left', '40px');
            }
            this.editicon.on('click', function(e) {
                
                // we fire even  if inothing is selected..
                this.fireEvent('edit', this, this.lastData );
                
            }, this);
        }
        */
        
 
        this.keyNav = new Roo.KeyNav(this.inputEl(), {
            "up" : function(e){
                this.inKeyMode = true;
                this.selectPrev();
            },

            "down" : function(e){
                if(!this.isExpanded()){
                    this.onTriggerClick();
                }else{
                    this.inKeyMode = true;
                    this.selectNext();
                }
            },

            "enter" : function(e){
                this.onViewClick();
                //return true;
            },

            "esc" : function(e){
                this.collapse();
            },

            "tab" : function(e){
                this.onViewClick(false);
                this.fireEvent("specialkey", this, e);
                return true;
            },

            scope : this,

            doRelay : function(foo, bar, hname){
                if(hname == 'down' || this.scope.isExpanded()){
                   return Roo.KeyNav.prototype.doRelay.apply(this, arguments);
                }
                return true;
            },

            forceKeyDown: true
        });
        
        
        this.queryDelay = Math.max(this.queryDelay || 10,
                this.mode == 'local' ? 10 : 250);
        
        
        this.dqTask = new Roo.util.DelayedTask(this.initQuery, this);
        
        if(this.typeAhead){
            this.taTask = new Roo.util.DelayedTask(this.onTypeAhead, this);
        }
        if(this.editable !== false){
            this.inputEl().on("keyup", this.onKeyUp, this);
        }
        if(this.forceSelection){
            this.on('blur', this.doForce, this);
        }
    },

    onDestroy : function(){
        if(this.view){
            this.view.setStore(null);
            this.view.el.removeAllListeners();
            this.view.el.remove();
            this.view.purgeListeners();
        }
        if(this.list){
            this.list.dom.innerHTML  = '';
        }
        if(this.store){
            this.store.un('beforeload', this.onBeforeLoad, this);
            this.store.un('load', this.onLoad, this);
            this.store.un('loadexception', this.onLoadException, this);
        }
        Roo.bootstrap.ComboBox.superclass.onDestroy.call(this);
    },

    // private
    fireKey : function(e){
        if(e.isNavKeyPress() && !this.list.isVisible()){
            this.fireEvent("specialkey", this, e);
        }
    },

    // private
    onResize: function(w, h){
        Roo.bootstrap.ComboBox.superclass.onResize.apply(this, arguments);
        
        if(typeof w != 'number'){
            // we do not handle it!?!?
            return;
        }
        var tw = this.trigger.getWidth();
       // tw += this.addicon ? this.addicon.getWidth() : 0;
       // tw += this.editicon ? this.editicon.getWidth() : 0;
        var x = w - tw;
        this.inputEl().setWidth( this.adjustWidth('input', x));
            
        //this.trigger.setStyle('left', x+'px');
        
        if(this.list && this.listWidth === undefined){
            var lw = Math.max(x + this.trigger.getWidth(), this.minListWidth);
            this.list.setWidth(lw);
            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
        }
        
    
        
    },

    /**
     * Allow or prevent the user from directly editing the field text.  If false is passed,
     * the user will only be able to select from the items defined in the dropdown list.  This method
     * is the runtime equivalent of setting the 'editable' config option at config time.
     * @param {Boolean} value True to allow the user to directly edit the field text
     */
    setEditable : function(value){
        if(value == this.editable){
            return;
        }
        this.editable = value;
        if(!value){
            this.inputEl().dom.setAttribute('readOnly', true);
            this.inputEl().on('mousedown', this.onTriggerClick,  this);
            this.inputEl().addClass('x-combo-noedit');
        }else{
            this.inputEl().dom.setAttribute('readOnly', false);
            this.inputEl().un('mousedown', this.onTriggerClick,  this);
            this.inputEl().removeClass('x-combo-noedit');
        }
    },

    // private
    onBeforeLoad : function(){
        if(!this.hasFocus){
            return;
        }
        //this.innerList.update(this.loadingText ?
        //       '<div class="loading-indicator">'+this.loadingText+'</div>' : '');
        this.list.dom.innerHTML = '<li class="loading-indicator">'+(this.loadingText||'loading')+'</li>' ;
        
        this.restrictHeight();
        this.selectedIndex = -1;
    },

    // private
    onLoad : function(){
        if(!this.hasFocus){
            return;
        }
        if(this.store.getCount() > 0){
            this.expand();
            this.restrictHeight();
            if(this.lastQuery == this.allQuery){
                if(this.editable){
                    this.inputEl().dom.select();
                }
                if(!this.selectByValue(this.value, true)){
                    this.select(0, true);
                }
            }else{
                this.selectNext();
                if(this.typeAhead && this.lastKey != Roo.EventObject.BACKSPACE && this.lastKey != Roo.EventObject.DELETE){
                    this.taTask.delay(this.typeAheadDelay);
                }
            }
        }else{
            this.onEmptyResults();
        }
        //this.el.focus();
    },
    // private
    onLoadException : function()
    {
        this.collapse();
        Roo.log(this.store.reader.jsonData);
        if (this.store && typeof(this.store.reader.jsonData.errorMsg) != 'undefined') {
            // fixme
            //Roo.MessageBox.alert("Error loading",this.store.reader.jsonData.errorMsg);
        }
        
        
    },
    // private
    onTypeAhead : function(){
        if(this.store.getCount() > 0){
            var r = this.store.getAt(0);
            var newValue = r.data[this.displayField];
            var len = newValue.length;
            var selStart = this.getRawValue().length;
            if(selStart != len){
                this.setRawValue(newValue);
                this.selectText(selStart, newValue.length);
            }
        }
    },

    // private
    onSelect : function(record, index){
        if(this.fireEvent('beforeselect', this, record, index) !== false){
            this.setFromData(index > -1 ? record.data : false);
            this.collapse();
            this.fireEvent('select', this, record, index);
        }
    },

    /**
     * Returns the currently selected field value or empty string if no value is set.
     * @return {String} value The selected value
     */
    getValue : function(){
        if(this.valueField){
            return typeof this.value != 'undefined' ? this.value : '';
        }else{
            return Roo.bootstrap.ComboBox.superclass.getValue.call(this);
        }
    },

    /**
     * Clears any text/value currently set in the field
     */
    clearValue : function(){
        if(this.hiddenField){
            this.hiddenField.dom.value = '';
        }
        this.value = '';
        this.setRawValue('');
        this.lastSelectionText = '';
        
    },

    /**
     * Sets the specified value into the field.  If the value finds a match, the corresponding record text
     * will be displayed in the field.  If the value does not match the data value of an existing item,
     * and the valueNotFoundText config option is defined, it will be displayed as the default field text.
     * Otherwise the field will be blank (although the value will still be set).
     * @param {String} value The value to match
     */
    setValue : function(v){
        var text = v;
        if(this.valueField){
            var r = this.findRecord(this.valueField, v);
            if(r){
                text = r.data[this.displayField];
            }else if(this.valueNotFoundText !== undefined){
                text = this.valueNotFoundText;
            }
        }
        this.lastSelectionText = text;
        if(this.hiddenField){
            this.hiddenField.dom.value = v;
        }
        Roo.bootstrap.ComboBox.superclass.setValue.call(this, text);
        this.value = v;
    },
    /**
     * @property {Object} the last set data for the element
     */
    
    lastData : false,
    /**
     * Sets the value of the field based on a object which is related to the record format for the store.
     * @param {Object} value the value to set as. or false on reset?
     */
    setFromData : function(o){
        var dv = ''; // display value
        var vv = ''; // value value..
        this.lastData = o;
        if (this.displayField) {
            dv = !o || typeof(o[this.displayField]) == 'undefined' ? '' : o[this.displayField];
        } else {
            // this is an error condition!!!
            Roo.log('no  displayField value set for '+ (this.name ? this.name : this.id));
        }
        
        if(this.valueField){
            vv = !o || typeof(o[this.valueField]) == 'undefined' ? dv : o[this.valueField];
        }
        if(this.hiddenField){
            this.hiddenField.dom.value = vv;
            
            this.lastSelectionText = dv;
            Roo.bootstrap.ComboBox.superclass.setValue.call(this, dv);
            this.value = vv;
            return;
        }
        // no hidden field.. - we store the value in 'value', but still display
        // display field!!!!
        this.lastSelectionText = dv;
        Roo.bootstrap.ComboBox.superclass.setValue.call(this, dv);
        this.value = vv;
        
        
    },
    // private
    reset : function(){
        // overridden so that last data is reset..
        this.setValue(this.originalValue);
        this.clearInvalid();
        this.lastData = false;
        if (this.view) {
            this.view.clearSelections();
        }
    },
    // private
    findRecord : function(prop, value){
        var record;
        if(this.store.getCount() > 0){
            this.store.each(function(r){
                if(r.data[prop] == value){
                    record = r;
                    return false;
                }
                return true;
            });
        }
        return record;
    },
    
    getName: function()
    {
        // returns hidden if it's set..
        if (!this.rendered) {return ''};
        return !this.hiddenName && this.inputEl().dom.name  ? this.inputEl().dom.name : (this.hiddenName || '');
        
    },
    // private
    onViewMove : function(e, t){
        this.inKeyMode = false;
    },

    // private
    onViewOver : function(e, t){
        if(this.inKeyMode){ // prevent key nav and mouse over conflicts
            return;
        }
        var item = this.view.findItemFromChild(t);
        if(item){
            var index = this.view.indexOf(item);
            this.select(index, false);
        }
    },

    // private
    onViewClick : function(doFocus)
    {
        var index = this.view.getSelectedIndexes()[0];
        var r = this.store.getAt(index);
        if(r){
            this.onSelect(r, index);
        }
        if(doFocus !== false && !this.blockFocus){
            this.inputEl().focus();
        }
    },

    // private
    restrictHeight : function(){
        //this.innerList.dom.style.height = '';
        //var inner = this.innerList.dom;
        //var h = Math.max(inner.clientHeight, inner.offsetHeight, inner.scrollHeight);
        //this.innerList.setHeight(h < this.maxHeight ? 'auto' : this.maxHeight);
        //this.list.beginUpdate();
        //this.list.setHeight(this.innerList.getHeight()+this.list.getFrameWidth('tb')+(this.resizable?this.handleHeight:0)+this.assetHeight);
        this.list.alignTo(this.inputEl(), this.listAlign);
        //this.list.endUpdate();
    },

    // private
    onEmptyResults : function(){
        this.collapse();
    },

    /**
     * Returns true if the dropdown list is expanded, else false.
     */
    isExpanded : function(){
        return this.list.isVisible();
    },

    /**
     * Select an item in the dropdown list by its data value. This function does NOT cause the select event to fire.
     * The store must be loaded and the list expanded for this function to work, otherwise use setValue.
     * @param {String} value The data value of the item to select
     * @param {Boolean} scrollIntoView False to prevent the dropdown list from autoscrolling to display the
     * selected item if it is not currently in view (defaults to true)
     * @return {Boolean} True if the value matched an item in the list, else false
     */
    selectByValue : function(v, scrollIntoView){
        if(v !== undefined && v !== null){
            var r = this.findRecord(this.valueField || this.displayField, v);
            if(r){
                this.select(this.store.indexOf(r), scrollIntoView);
                return true;
            }
        }
        return false;
    },

    /**
     * Select an item in the dropdown list by its numeric index in the list. This function does NOT cause the select event to fire.
     * The store must be loaded and the list expanded for this function to work, otherwise use setValue.
     * @param {Number} index The zero-based index of the list item to select
     * @param {Boolean} scrollIntoView False to prevent the dropdown list from autoscrolling to display the
     * selected item if it is not currently in view (defaults to true)
     */
    select : function(index, scrollIntoView){
        this.selectedIndex = index;
        this.view.select(index);
        if(scrollIntoView !== false){
            var el = this.view.getNode(index);
            if(el){
                this.List.scrollChildIntoView(el, false);
                
            }
        }
    },

    // private
    selectNext : function(){
        var ct = this.store.getCount();
        if(ct > 0){
            if(this.selectedIndex == -1){
                this.select(0);
            }else if(this.selectedIndex < ct-1){
                this.select(this.selectedIndex+1);
            }
        }
    },

    // private
    selectPrev : function(){
        var ct = this.store.getCount();
        if(ct > 0){
            if(this.selectedIndex == -1){
                this.select(0);
            }else if(this.selectedIndex != 0){
                this.select(this.selectedIndex-1);
            }
        }
    },

    // private
    onKeyUp : function(e){
        if(this.editable !== false && !e.isSpecialKey()){
            this.lastKey = e.getKey();
            this.dqTask.delay(this.queryDelay);
        }
    },

    // private
    validateBlur : function(){
        return !this.list || !this.list.isVisible();   
    },

    // private
    initQuery : function(){
        this.doQuery(this.getRawValue());
    },

    // private
    doForce : function(){
        if(this.el.dom.value.length > 0){
            this.el.dom.value =
                this.lastSelectionText === undefined ? '' : this.lastSelectionText;
             
        }
    },

    /**
     * Execute a query to filter the dropdown list.  Fires the beforequery event prior to performing the
     * query allowing the query action to be canceled if needed.
     * @param {String} query The SQL query to execute
     * @param {Boolean} forceAll True to force the query to execute even if there are currently fewer characters
     * in the field than the minimum specified by the minChars config option.  It also clears any filter previously
     * saved in the current store (defaults to false)
     */
    doQuery : function(q, forceAll){
        if(q === undefined || q === null){
            q = '';
        }
        var qe = {
            query: q,
            forceAll: forceAll,
            combo: this,
            cancel:false
        };
        if(this.fireEvent('beforequery', qe)===false || qe.cancel){
            return false;
        }
        q = qe.query;
        forceAll = qe.forceAll;
        if(forceAll === true || (q.length >= this.minChars)){
            if(this.lastQuery != q || this.alwaysQuery){
                this.lastQuery = q;
                if(this.mode == 'local'){
                    this.selectedIndex = -1;
                    if(forceAll){
                        this.store.clearFilter();
                    }else{
                        this.store.filter(this.displayField, q);
                    }
                    this.onLoad();
                }else{
                    this.store.baseParams[this.queryParam] = q;
                    this.store.load({
                        params: this.getParams(q)
                    });
                    this.expand();
                }
            }else{
                this.selectedIndex = -1;
                this.onLoad();   
            }
        }
    },

    // private
    getParams : function(q){
        var p = {};
        //p[this.queryParam] = q;
        if(this.pageSize){
            p.start = 0;
            p.limit = this.pageSize;
        }
        return p;
    },

    /**
     * Hides the dropdown list if it is currently expanded. Fires the 'collapse' event on completion.
     */
    collapse : function(){
        if(!this.isExpanded()){
            return;
        }
        this.list.hide();
        Roo.get(document).un('mousedown', this.collapseIf, this);
        Roo.get(document).un('mousewheel', this.collapseIf, this);
        if (!this.editable) {
            Roo.get(document).un('keydown', this.listKeyPress, this);
        }
        this.fireEvent('collapse', this);
    },

    // private
    collapseIf : function(e){
        if(!e.within(this.el) && !e.within(this.el)){
            this.collapse();
        }
    },

    /**
     * Expands the dropdown list if it is currently hidden. Fires the 'expand' event on completion.
     */
    expand : function(){
        Roo.log('expand');
        if(this.isExpanded() || !this.hasFocus){
            return;
        }
        this.list.alignTo(this.inputEl(), this.listAlign);
        this.list.show();
        Roo.get(document).on('mousedown', this.collapseIf, this);
        Roo.get(document).on('mousewheel', this.collapseIf, this);
        if (!this.editable) {
            Roo.get(document).on('keydown', this.listKeyPress, this);
        }
        
        this.fireEvent('expand', this);
    },

    // private
    // Implements the default empty TriggerField.onTriggerClick function
    onTriggerClick : function()
    {
        Roo.log('trigger click');
        
        if(this.disabled){
            return;
        }
        if(this.isExpanded()){
            this.collapse();
            if (!this.blockFocus) {
                this.inputEl().focus();
            }
            
        }else {
            this.hasFocus = true;
            if(this.triggerAction == 'all') {
                this.doQuery(this.allQuery, true);
            } else {
                this.doQuery(this.getRawValue());
            }
            if (!this.blockFocus) {
                this.inputEl().focus();
            }
        }
    },
    listKeyPress : function(e)
    {
        //Roo.log('listkeypress');
        // scroll to first matching element based on key pres..
        if (e.isSpecialKey()) {
            return false;
        }
        var k = String.fromCharCode(e.getKey()).toUpperCase();
        //Roo.log(k);
        var match  = false;
        var csel = this.view.getSelectedNodes();
        var cselitem = false;
        if (csel.length) {
            var ix = this.view.indexOf(csel[0]);
            cselitem  = this.store.getAt(ix);
            if (!cselitem.get(this.displayField) || cselitem.get(this.displayField).substring(0,1).toUpperCase() != k) {
                cselitem = false;
            }
            
        }
        
        this.store.each(function(v) { 
            if (cselitem) {
                // start at existing selection.
                if (cselitem.id == v.id) {
                    cselitem = false;
                }
                return true;
            }
                
            if (v.get(this.displayField) && v.get(this.displayField).substring(0,1).toUpperCase() == k) {
                match = this.store.indexOf(v);
                return false;
            }
            return true;
        }, this);
        
        if (match === false) {
            return true; // no more action?
        }
        // scroll to?
        this.view.select(match);
        var sn = Roo.get(this.view.getSelectedNodes()[0])
        //sn.scrollIntoView(sn.dom.parentNode, false);
    }

    /** 
    * @cfg {Boolean} grow 
    * @hide 
    */
    /** 
    * @cfg {Number} growMin 
    * @hide 
    */
    /** 
    * @cfg {Number} growMax 
    * @hide 
    */
    /**
     * @hide
     * @method autoSize
     */
});/*
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
 * @class Roo.View
 * @extends Roo.util.Observable
 * Create a "View" for an element based on a data model or UpdateManager and the supplied DomHelper template. 
 * This class also supports single and multi selection modes. <br>
 * Create a data model bound view:
 <pre><code>
 var store = new Roo.data.Store(...);

 var view = new Roo.View({
    el : "my-element",
    tpl : '&lt;div id="{0}"&gt;{2} - {1}&lt;/div&gt;', // auto create template
 
    singleSelect: true,
    selectedClass: "ydataview-selected",
    store: store
 });

 // listen for node click?
 view.on("click", function(vw, index, node, e){
 alert('Node "' + node.id + '" at index: ' + index + " was clicked.");
 });

 // load XML data
 dataModel.load("foobar.xml");
 </code></pre>
 For an example of creating a JSON/UpdateManager view, see {@link Roo.JsonView}.
 * <br><br>
 * <b>Note: The root of your template must be a single node. Table/row implementations may work but are not supported due to
 * IE"s limited insertion support with tables and Opera"s faulty event bubbling.</b>
 * 
 * Note: old style constructor is still suported (container, template, config)
 * 
 * @constructor
 * Create a new View
 * @param {Object} config The config object
 * 
 */
Roo.View = function(config, depreciated_tpl, depreciated_config){
    
    if (typeof(depreciated_tpl) == 'undefined') {
        // new way.. - universal constructor.
        Roo.apply(this, config);
        this.el  = Roo.get(this.el);
    } else {
        // old format..
        this.el  = Roo.get(config);
        this.tpl = depreciated_tpl;
        Roo.apply(this, depreciated_config);
    }
    this.wrapEl  = this.el.wrap().wrap();
    ///this.el = this.wrapEla.appendChild(document.createElement("div"));
    
    
    if(typeof(this.tpl) == "string"){
        this.tpl = new Roo.Template(this.tpl);
    } else {
        // support xtype ctors..
        this.tpl = new Roo.factory(this.tpl, Roo);
    }
    
    
    this.tpl.compile();
   
  
    
     
    /** @private */
    this.addEvents({
        /**
         * @event beforeclick
         * Fires before a click is processed. Returns false to cancel the default action.
         * @param {Roo.View} this
         * @param {Number} index The index of the target node
         * @param {HTMLElement} node The target node
         * @param {Roo.EventObject} e The raw event object
         */
            "beforeclick" : true,
        /**
         * @event click
         * Fires when a template node is clicked.
         * @param {Roo.View} this
         * @param {Number} index The index of the target node
         * @param {HTMLElement} node The target node
         * @param {Roo.EventObject} e The raw event object
         */
            "click" : true,
        /**
         * @event dblclick
         * Fires when a template node is double clicked.
         * @param {Roo.View} this
         * @param {Number} index The index of the target node
         * @param {HTMLElement} node The target node
         * @param {Roo.EventObject} e The raw event object
         */
            "dblclick" : true,
        /**
         * @event contextmenu
         * Fires when a template node is right clicked.
         * @param {Roo.View} this
         * @param {Number} index The index of the target node
         * @param {HTMLElement} node The target node
         * @param {Roo.EventObject} e The raw event object
         */
            "contextmenu" : true,
        /**
         * @event selectionchange
         * Fires when the selected nodes change.
         * @param {Roo.View} this
         * @param {Array} selections Array of the selected nodes
         */
            "selectionchange" : true,
    
        /**
         * @event beforeselect
         * Fires before a selection is made. If any handlers return false, the selection is cancelled.
         * @param {Roo.View} this
         * @param {HTMLElement} node The node to be selected
         * @param {Array} selections Array of currently selected nodes
         */
            "beforeselect" : true,
        /**
         * @event preparedata
         * Fires on every row to render, to allow you to change the data.
         * @param {Roo.View} this
         * @param {Object} data to be rendered (change this)
         */
          "preparedata" : true
          
          
        });



    this.el.on({
        "click": this.onClick,
        "dblclick": this.onDblClick,
        "contextmenu": this.onContextMenu,
        scope:this
    });

    this.selections = [];
    this.nodes = [];
    this.cmp = new Roo.CompositeElementLite([]);
    if(this.store){
        this.store = Roo.factory(this.store, Roo.data);
        this.setStore(this.store, true);
    }
    
    if ( this.footer && this.footer.xtype) {
           
         var fctr = this.wrapEl.appendChild(document.createElement("div"));
        
        this.footer.dataSource = this.store
        this.footer.container = fctr;
        this.footer = Roo.factory(this.footer, Roo);
        fctr.insertFirst(this.el);
        
        // this is a bit insane - as the paging toolbar seems to detach the el..
//        dom.parentNode.parentNode.parentNode
         // they get detached?
    }
    
    
    Roo.View.superclass.constructor.call(this);
    
    
};

Roo.extend(Roo.View, Roo.util.Observable, {
    
     /**
     * @cfg {Roo.data.Store} store Data store to load data from.
     */
    store : false,
    
    /**
     * @cfg {String|Roo.Element} el The container element.
     */
    el : '',
    
    /**
     * @cfg {String|Roo.Template} tpl The template used by this View 
     */
    tpl : false,
    /**
     * @cfg {String} dataName the named area of the template to use as the data area
     *                          Works with domtemplates roo-name="name"
     */
    dataName: false,
    /**
     * @cfg {String} selectedClass The css class to add to selected nodes
     */
    selectedClass : "x-view-selected",
     /**
     * @cfg {String} emptyText The empty text to show when nothing is loaded.
     */
    emptyText : "",
    
    /**
     * @cfg {String} text to display on mask (default Loading)
     */
    mask : false,
    /**
     * @cfg {Boolean} multiSelect Allow multiple selection
     */
    multiSelect : false,
    /**
     * @cfg {Boolean} singleSelect Allow single selection
     */
    singleSelect:  false,
    
    /**
     * @cfg {Boolean} toggleSelect - selecting 
     */
    toggleSelect : false,
    
    /**
     * Returns the element this view is bound to.
     * @return {Roo.Element}
     */
    getEl : function(){
        return this.wrapEl;
    },
    
    

    /**
     * Refreshes the view. - called by datachanged on the store. - do not call directly.
     */
    refresh : function(){
        var t = this.tpl;
        
        // if we are using something like 'domtemplate', then
        // the what gets used is:
        // t.applySubtemplate(NAME, data, wrapping data..)
        // the outer template then get' applied with
        //     the store 'extra data'
        // and the body get's added to the
        //      roo-name="data" node?
        //      <span class='roo-tpl-{name}'></span> ?????
        
        
        
        this.clearSelections();
        this.el.update("");
        var html = [];
        var records = this.store.getRange();
        if(records.length < 1) {
            
            // is this valid??  = should it render a template??
            
            this.el.update(this.emptyText);
            return;
        }
        var el = this.el;
        if (this.dataName) {
            this.el.update(t.apply(this.store.meta)); //????
            el = this.el.child('.roo-tpl-' + this.dataName);
        }
        
        for(var i = 0, len = records.length; i < len; i++){
            var data = this.prepareData(records[i].data, i, records[i]);
            this.fireEvent("preparedata", this, data, i, records[i]);
            html[html.length] = Roo.util.Format.trim(
                this.dataName ?
                    t.applySubtemplate(this.dataName, data, this.store.meta) :
                    t.apply(data)
            );
        }
        
        
        
        el.update(html.join(""));
        this.nodes = el.dom.childNodes;
        this.updateIndexes(0);
    },

    /**
     * Function to override to reformat the data that is sent to
     * the template for each node.
     * DEPRICATED - use the preparedata event handler.
     * @param {Array/Object} data The raw data (array of colData for a data model bound view or
     * a JSON object for an UpdateManager bound view).
     */
    prepareData : function(data, index, record)
    {
        this.fireEvent("preparedata", this, data, index, record);
        return data;
    },

    onUpdate : function(ds, record){
        this.clearSelections();
        var index = this.store.indexOf(record);
        var n = this.nodes[index];
        this.tpl.insertBefore(n, this.prepareData(record.data, index, record));
        n.parentNode.removeChild(n);
        this.updateIndexes(index, index);
    },

    
    
// --------- FIXME     
    onAdd : function(ds, records, index)
    {
        this.clearSelections();
        if(this.nodes.length == 0){
            this.refresh();
            return;
        }
        var n = this.nodes[index];
        for(var i = 0, len = records.length; i < len; i++){
            var d = this.prepareData(records[i].data, i, records[i]);
            if(n){
                this.tpl.insertBefore(n, d);
            }else{
                
                this.tpl.append(this.el, d);
            }
        }
        this.updateIndexes(index);
    },

    onRemove : function(ds, record, index){
        this.clearSelections();
        var el = this.dataName  ?
            this.el.child('.roo-tpl-' + this.dataName) :
            this.el; 
        el.dom.removeChild(this.nodes[index]);
        this.updateIndexes(index);
    },

    /**
     * Refresh an individual node.
     * @param {Number} index
     */
    refreshNode : function(index){
        this.onUpdate(this.store, this.store.getAt(index));
    },

    updateIndexes : function(startIndex, endIndex){
        var ns = this.nodes;
        startIndex = startIndex || 0;
        endIndex = endIndex || ns.length - 1;
        for(var i = startIndex; i <= endIndex; i++){
            ns[i].nodeIndex = i;
        }
    },

    /**
     * Changes the data store this view uses and refresh the view.
     * @param {Store} store
     */
    setStore : function(store, initial){
        if(!initial && this.store){
            this.store.un("datachanged", this.refresh);
            this.store.un("add", this.onAdd);
            this.store.un("remove", this.onRemove);
            this.store.un("update", this.onUpdate);
            this.store.un("clear", this.refresh);
            this.store.un("beforeload", this.onBeforeLoad);
            this.store.un("load", this.onLoad);
            this.store.un("loadexception", this.onLoad);
        }
        if(store){
          
            store.on("datachanged", this.refresh, this);
            store.on("add", this.onAdd, this);
            store.on("remove", this.onRemove, this);
            store.on("update", this.onUpdate, this);
            store.on("clear", this.refresh, this);
            store.on("beforeload", this.onBeforeLoad, this);
            store.on("load", this.onLoad, this);
            store.on("loadexception", this.onLoad, this);
        }
        
        if(store){
            this.refresh();
        }
    },
    /**
     * onbeforeLoad - masks the loading area.
     *
     */
    onBeforeLoad : function()
    {
        this.el.update("");
        this.el.mask(this.mask ? this.mask : "Loading" ); 
    },
    onLoad : function ()
    {
        this.el.unmask();
    },
    

    /**
     * Returns the template node the passed child belongs to or null if it doesn't belong to one.
     * @param {HTMLElement} node
     * @return {HTMLElement} The template node
     */
    findItemFromChild : function(node){
        var el = this.dataName  ?
            this.el.child('.roo-tpl-' + this.dataName,true) :
            this.el.dom; 
        
        if(!node || node.parentNode == el){
		    return node;
	    }
	    var p = node.parentNode;
	    while(p && p != el){
            if(p.parentNode == el){
            	return p;
            }
            p = p.parentNode;
        }
	    return null;
    },

    /** @ignore */
    onClick : function(e){
        var item = this.findItemFromChild(e.getTarget());
        if(item){
            var index = this.indexOf(item);
            if(this.onItemClick(item, index, e) !== false){
                this.fireEvent("click", this, index, item, e);
            }
        }else{
            this.clearSelections();
        }
    },

    /** @ignore */
    onContextMenu : function(e){
        var item = this.findItemFromChild(e.getTarget());
        if(item){
            this.fireEvent("contextmenu", this, this.indexOf(item), item, e);
        }
    },

    /** @ignore */
    onDblClick : function(e){
        var item = this.findItemFromChild(e.getTarget());
        if(item){
            this.fireEvent("dblclick", this, this.indexOf(item), item, e);
        }
    },

    onItemClick : function(item, index, e)
    {
        if(this.fireEvent("beforeclick", this, index, item, e) === false){
            return false;
        }
        if (this.toggleSelect) {
            var m = this.isSelected(item) ? 'unselect' : 'select';
            Roo.log(m);
            var _t = this;
            _t[m](item, true, false);
            return true;
        }
        if(this.multiSelect || this.singleSelect){
            if(this.multiSelect && e.shiftKey && this.lastSelection){
                this.select(this.getNodes(this.indexOf(this.lastSelection), index), false);
            }else{
                this.select(item, this.multiSelect && e.ctrlKey);
                this.lastSelection = item;
            }
            e.preventDefault();
        }
        return true;
    },

    /**
     * Get the number of selected nodes.
     * @return {Number}
     */
    getSelectionCount : function(){
        return this.selections.length;
    },

    /**
     * Get the currently selected nodes.
     * @return {Array} An array of HTMLElements
     */
    getSelectedNodes : function(){
        return this.selections;
    },

    /**
     * Get the indexes of the selected nodes.
     * @return {Array}
     */
    getSelectedIndexes : function(){
        var indexes = [], s = this.selections;
        for(var i = 0, len = s.length; i < len; i++){
            indexes.push(s[i].nodeIndex);
        }
        return indexes;
    },

    /**
     * Clear all selections
     * @param {Boolean} suppressEvent (optional) true to skip firing of the selectionchange event
     */
    clearSelections : function(suppressEvent){
        if(this.nodes && (this.multiSelect || this.singleSelect) && this.selections.length > 0){
            this.cmp.elements = this.selections;
            this.cmp.removeClass(this.selectedClass);
            this.selections = [];
            if(!suppressEvent){
                this.fireEvent("selectionchange", this, this.selections);
            }
        }
    },

    /**
     * Returns true if the passed node is selected
     * @param {HTMLElement/Number} node The node or node index
     * @return {Boolean}
     */
    isSelected : function(node){
        var s = this.selections;
        if(s.length < 1){
            return false;
        }
        node = this.getNode(node);
        return s.indexOf(node) !== -1;
    },

    /**
     * Selects nodes.
     * @param {Array/HTMLElement/String/Number} nodeInfo An HTMLElement template node, index of a template node, id of a template node or an array of any of those to select
     * @param {Boolean} keepExisting (optional) true to keep existing selections
     * @param {Boolean} suppressEvent (optional) true to skip firing of the selectionchange vent
     */
    select : function(nodeInfo, keepExisting, suppressEvent){
        if(nodeInfo instanceof Array){
            if(!keepExisting){
                this.clearSelections(true);
            }
            for(var i = 0, len = nodeInfo.length; i < len; i++){
                this.select(nodeInfo[i], true, true);
            }
            return;
        } 
        var node = this.getNode(nodeInfo);
        if(!node || this.isSelected(node)){
            return; // already selected.
        }
        if(!keepExisting){
            this.clearSelections(true);
        }
        if(this.fireEvent("beforeselect", this, node, this.selections) !== false){
            Roo.fly(node).addClass(this.selectedClass);
            this.selections.push(node);
            if(!suppressEvent){
                this.fireEvent("selectionchange", this, this.selections);
            }
        }
        
        
    },
      /**
     * Unselects nodes.
     * @param {Array/HTMLElement/String/Number} nodeInfo An HTMLElement template node, index of a template node, id of a template node or an array of any of those to select
     * @param {Boolean} keepExisting (optional) true IGNORED (for campatibility with select)
     * @param {Boolean} suppressEvent (optional) true to skip firing of the selectionchange vent
     */
    unselect : function(nodeInfo, keepExisting, suppressEvent)
    {
        if(nodeInfo instanceof Array){
            Roo.each(this.selections, function(s) {
                this.unselect(s, nodeInfo);
            }, this);
            return;
        }
        var node = this.getNode(nodeInfo);
        if(!node || !this.isSelected(node)){
            Roo.log("not selected");
            return; // not selected.
        }
        // fireevent???
        var ns = [];
        Roo.each(this.selections, function(s) {
            if (s == node ) {
                Roo.fly(node).removeClass(this.selectedClass);

                return;
            }
            ns.push(s);
        },this);
        
        this.selections= ns;
        this.fireEvent("selectionchange", this, this.selections);
    },

    /**
     * Gets a template node.
     * @param {HTMLElement/String/Number} nodeInfo An HTMLElement template node, index of a template node or the id of a template node
     * @return {HTMLElement} The node or null if it wasn't found
     */
    getNode : function(nodeInfo){
        if(typeof nodeInfo == "string"){
            return document.getElementById(nodeInfo);
        }else if(typeof nodeInfo == "number"){
            return this.nodes[nodeInfo];
        }
        return nodeInfo;
    },

    /**
     * Gets a range template nodes.
     * @param {Number} startIndex
     * @param {Number} endIndex
     * @return {Array} An array of nodes
     */
    getNodes : function(start, end){
        var ns = this.nodes;
        start = start || 0;
        end = typeof end == "undefined" ? ns.length - 1 : end;
        var nodes = [];
        if(start <= end){
            for(var i = start; i <= end; i++){
                nodes.push(ns[i]);
            }
        } else{
            for(var i = start; i >= end; i--){
                nodes.push(ns[i]);
            }
        }
        return nodes;
    },

    /**
     * Finds the index of the passed node
     * @param {HTMLElement/String/Number} nodeInfo An HTMLElement template node, index of a template node or the id of a template node
     * @return {Number} The index of the node or -1
     */
    indexOf : function(node){
        node = this.getNode(node);
        if(typeof node.nodeIndex == "number"){
            return node.nodeIndex;
        }
        var ns = this.nodes;
        for(var i = 0, len = ns.length; i < len; i++){
            if(ns[i] == node){
                return i;
            }
        }
        return -1;
    }
});
/*
 * - LGPL
 *
 * based on jquery fullcalendar
 * 
 */


/**
 * @class Roo.bootstrap.Calendar
 * @extends Roo.bootstrap.Component
 * Bootstrap Calendar class
    
 * @constructor
 * Create a new Container
 * @param {Object} config The config object
 */

Roo.bootstrap.Calendar = function(config){
    Roo.bootstrap.Calendar.superclass.constructor.call(this, config);
     this.addEvents({
        /**
	     * @event select
	     * Fires when a date is selected
	     * @param {DatePicker} this
	     * @param {Date} date The selected date
	     */
        'select': true,
        /**
	     * @event monthchange
	     * Fires when the displayed month changes 
	     * @param {DatePicker} this
	     * @param {Date} date The selected month
	     */
        'monthchange': true,
        /**
	     * @event evententer
	     * Fires when mouse over an event
	     * @param {Calendar} this
	     * @param {event} Event
	     */
        'evententer': true,
        /**
	     * @event eventleave
	     * Fires when the mouse leaves an
	     * @param {Calendar} this
	     * @param {event}
	     */
        'eventleave': true,
        /**
	     * @event eventclick
	     * Fires when the mouse click an
	     * @param {Calendar} this
	     * @param {event}
	     */
        'eventclick': true
        
    });

};

Roo.extend(Roo.bootstrap.Calendar, Roo.bootstrap.Component,  {
    
     /**
     * @cfg {Number} startDay
     * Day index at which the week should begin, 0-based (defaults to 0, which is Sunday)
     */
    startDay : 0,
      
    getAutoCreate : function(){
        
        
        fc_button = function(name, corner, style, content ) {
            return Roo.apply({},{
                tag : 'span',
                cls : 'fc-button fc-button-'+name+' fc-state-default ' + 
                         (corner.length ?
                            'fc-corner-' + corner.split(' ').join(' fc-corner-') :
                            ''
                        ),
                html : '<SPAN class="fc-text-'+style+ '">'+content +'</SPAN>',
                unselectable: 'on'
            });
        };
        
        var header = {
            tag : 'table',
            cls : 'fc-header',
            style : 'width:100%',
            cn : [
                {
                    tag: 'tr',
                    cn : [
                        {
                            tag : 'td',
                            cls : 'fc-header-left',
                            cn : [
                                fc_button('prev', 'left', 'arrow', '&#8249;' ),
                                fc_button('next', 'right', 'arrow', '&#8250;' ),
                                { tag: 'span', cls: 'fc-header-space' },
                                fc_button('today', 'left right', '', 'today' )  // neds state disabled..
                                
                                
                            ]
                        },
                        
                        {
                            tag : 'td',
                            cls : 'fc-header-center',
                            cn : [
                                {
                                    tag: 'span',
                                    cls: 'fc-header-title',
                                    cn : {
                                        tag: 'H2',
                                        html : 'month / year'
                                    }
                                }
                                
                            ]
                        },
                        {
                            tag : 'td',
                            cls : 'fc-header-right',
                            cn : [
                          /*      fc_button('month', 'left', '', 'month' ),
                                fc_button('week', '', '', 'week' ),
                                fc_button('day', 'right', '', 'day' )
                            */    
                                
                            ]
                        }
                        
                    ]
                }
            ]
        };
        
       
        var cal_heads = function() {
            var ret = [];
            // fixme - handle this.
            
            for (var i =0; i < Date.dayNames.length; i++) {
                var d = Date.dayNames[i];
                ret.push({
                    tag: 'th',
                    cls : 'fc-day-header fc-' + d.substring(0,3).toLowerCase() + ' fc-widget-header',
                    html : d.substring(0,3)
                });
                
            }
            ret[0].cls += ' fc-first';
            ret[6].cls += ' fc-last';
            return ret;
        };
        var cal_cell = function(n) {
            return  {
                tag: 'td',
                cls : 'fc-day fc-'+n + ' fc-widget-content', ///fc-other-month fc-past
                cn : [
                    {
                        cn : [
                            {
                                cls: 'fc-day-number',
                                html: 'D'
                            },
                            {
                                cls: 'fc-day-content',
                             
                                cn : [
                                     {
                                        style: 'position: relative;' // height: 17px;
                                    }
                                ]
                            }
                            
                            
                        ]
                    }
                ]
                
            }
        };
        var cal_rows = function() {
            
            var ret = []
            for (var r = 0; r < 6; r++) {
                var row= {
                    tag : 'tr',
                    cls : 'fc-week',
                    cn : []
                };
                
                for (var i =0; i < Date.dayNames.length; i++) {
                    var d = Date.dayNames[i];
                    row.cn.push(cal_cell(d.substring(0,3).toLowerCase()));

                }
                row.cn[0].cls+=' fc-first';
                row.cn[0].cn[0].style = 'min-height:90px';
                row.cn[6].cls+=' fc-last';
                ret.push(row);
                
            }
            ret[0].cls += ' fc-first';
            ret[4].cls += ' fc-prev-last';
            ret[5].cls += ' fc-last';
            return ret;
            
        };
        
        var cal_table = {
            tag: 'table',
            cls: 'fc-border-separate',
            style : 'width:100%',
            cellspacing  : 0,
            cn : [
                { 
                    tag: 'thead',
                    cn : [
                        { 
                            tag: 'tr',
                            cls : 'fc-first fc-last',
                            cn : cal_heads()
                        }
                    ]
                },
                { 
                    tag: 'tbody',
                    cn : cal_rows()
                }
                  
            ]
        };
         
         var cfg = {
            cls : 'fc fc-ltr',
            cn : [
                header,
                {
                    cls : 'fc-content',
                    style : "position: relative;",
                    cn : [
                        {
                            cls : 'fc-view fc-view-month fc-grid',
                            style : 'position: relative',
                            unselectable : 'on',
                            cn : [
                                {
                                    cls : 'fc-event-container',
                                    style : 'position:absolute;z-index:8;top:0;left:0;'
                                },
                                cal_table
                            ]
                        }
                    ]
    
                }
           ] 
            
        };
        
         
        
        return cfg;
    },
    
    
    initEvents : function()
    {
        if(!this.store){
            throw "can not find store for combo";
        }
        
        this.store = Roo.factory(this.store, Roo.data);
        this.store.on('load', this.onLoad, this);
        
        this.resize();
        this.cells = this.el.select('.fc-day',true);
        
        this.textNodes = this.el.query('.fc-day-number');
        this.cells.addClassOnOver('fc-state-hover');
        
        this.el.select('.fc-button-prev',true).on('click', this.showPrevMonth, this);
        this.el.select('.fc-button-next',true).on('click', this.showNextMonth, this);
        this.el.select('.fc-button-today',true).on('click', this.showToday, this);
        this.el.select('.fc-button',true).addClassOnOver('fc-state-hover');
        
        this.on('monthchange', this.onMonthChange, this);
        
        this.update(new Date().clearTime());
    },
    
    resize : function() {
        var sz  = this.el.getSize();
        
        this.el.select('.fc-day-header',true).setWidth(sz.width / 7);
        this.el.select('.fc-day-content div',true).setHeight(34);
    },
    
    
    // private
    showPrevMonth : function(e){
        this.update(this.activeDate.add("mo", -1));
    },
    showToday : function(e){
        this.update(new Date().clearTime());
    },
    // private
    showNextMonth : function(e){
        this.update(this.activeDate.add("mo", 1));
    },

    // private
    showPrevYear : function(){
        this.update(this.activeDate.add("y", -1));
    },

    // private
    showNextYear : function(){
        this.update(this.activeDate.add("y", 1));
    },

    
   // private
    update : function(date)
    {
        var vd = this.activeDate;
        this.activeDate = date;
        if(vd && this.el){
            var t = date.getTime();
            if(vd.getMonth() == date.getMonth() && vd.getFullYear() == date.getFullYear()){
                Roo.log('using add remove');
                this.cells.removeClass("fc-state-highlight");
                this.cells.each(function(c){
                   if(c.dateValue == t){
                       c.addClass("fc-state-highlight");
                       setTimeout(function(){
                            try{c.dom.firstChild.focus();}catch(e){}
                       }, 50);
                       return false;
                   }
                   return true;
                });
                return;
            }
        }
        
        var days = date.getDaysInMonth();
        
        var firstOfMonth = date.getFirstDateOfMonth();
        var startingPos = firstOfMonth.getDay()-this.startDay;
        
        if(startingPos < this.startDay){
            startingPos += 7;
        }
        
        var pm = date.add("mo", -1);
        var prevStart = pm.getDaysInMonth()-startingPos;
//        
        this.cells = this.el.select('.fc-day',true);
        this.textNodes = this.el.query('.fc-day-number');
        this.cells.addClassOnOver('fc-state-hover');
        
        var cells = this.cells.elements;
        var textEls = this.textNodes;
        
        Roo.each(cells, function(cell){
            cell.removeClass([ 'fc-past', 'fc-other-month', 'fc-future', 'fc-state-highlight', 'fc-state-disabled']);
        });
        
        days += startingPos;

        // convert everything to numbers so it's fast
        var day = 86400000;
        var d = (new Date(pm.getFullYear(), pm.getMonth(), prevStart)).clearTime();
        var today = new Date().clearTime().getTime();
        var sel = date.clearTime().getTime();
        var min = this.minDate ? this.minDate.clearTime() : Number.NEGATIVE_INFINITY;
        var max = this.maxDate ? this.maxDate.clearTime() : Number.POSITIVE_INFINITY;
        var ddMatch = this.disabledDatesRE;
        var ddText = this.disabledDatesText;
        var ddays = this.disabledDays ? this.disabledDays.join("") : false;
        var ddaysText = this.disabledDaysText;
        var format = this.format;

        var setCellClass = function(cal, cell){
            cell.title = "";
            var t = d.getTime();
            
            cell.dateValue = t;
            if(t == today){
                cell.className += " fc-today";
                cell.title = cal.todayText;
            }
            if(t == sel){
                cell.className += " fc-state-highlight";
                //setTimeout(function(){
                //    try{cell.firstChild.focus();}catch(e){}
                //}, 50);
            }
            // disabling
            if(t < min) {
                cell.className = " fc-state-disabled";
                cell.title = cal.minText;
                return;
            }
            if(t > max) {
                cell.className = " fc-state-disabled";
                cell.title = cal.maxText;
                return;
            }
            if(ddays){
                if(ddays.indexOf(d.getDay()) != -1){
                    cell.title = ddaysText;
                    cell.className = " fc-state-disabled";
                }
            }
            if(ddMatch && format){
                var fvalue = d.dateFormat(format);
                if(ddMatch.test(fvalue)){
                    cell.title = ddText.replace("%0", fvalue);
                    cell.className = " fc-state-disabled";
                }
            }
            
            if (!cell.initialClassName) {
                cell.initialClassName = cell.dom.className;
            }
            
            cell.dom.className = cell.initialClassName  + ' ' +  cell.className;
        };

        var i = 0;
        
        for(; i < startingPos; i++) {
            textEls[i].innerHTML = (++prevStart);
            d.setDate(d.getDate()+1);
            
            cells[i].className = "fc-past fc-other-month";
            setCellClass(this, cells[i]);
        }
        
        var intDay = 0;
        
        for(; i < days; i++){
            intDay = i - startingPos + 1;
            textEls[i].innerHTML = (intDay);
            d.setDate(d.getDate()+1);
            
            cells[i].className = ''; // "x-date-active";
            setCellClass(this, cells[i]);
        }
        var extraDays = 0;
        
        for(; i < 42; i++) {
            textEls[i].innerHTML = (++extraDays);
            d.setDate(d.getDate()+1);
            
            cells[i].className = "fc-future fc-other-month";
            setCellClass(this, cells[i]);
        }
        
        this.el.select('.fc-header-title h2',true).update(Date.monthNames[date.getMonth()] + " " + date.getFullYear());
        
        var totalRows = Math.ceil((date.getDaysInMonth() + date.getFirstDateOfMonth().getDay()) / 7);
        
        this.el.select('tr.fc-week.fc-prev-last',true).removeClass('fc-last');
        this.el.select('tr.fc-week.fc-next-last',true).addClass('fc-last').show();
        
        if(totalRows != 6){
            this.el.select('tr.fc-week.fc-last',true).removeClass('fc-last').addClass('fc-next-last').hide();
            this.el.select('tr.fc-week.fc-prev-last',true).addClass('fc-last');
        }
        
        this.fireEvent('monthchange', this, date);
        
        
        /*
        if(!this.internalRender){
            var main = this.el.dom.firstChild;
            var w = main.offsetWidth;
            this.el.setWidth(w + this.el.getBorderWidth("lr"));
            Roo.fly(main).setWidth(w);
            this.internalRender = true;
            // opera does not respect the auto grow header center column
            // then, after it gets a width opera refuses to recalculate
            // without a second pass
            if(Roo.isOpera && !this.secondPass){
                main.rows[0].cells[1].style.width = (w - (main.rows[0].cells[0].offsetWidth+main.rows[0].cells[2].offsetWidth)) + "px";
                this.secondPass = true;
                this.update.defer(10, this, [date]);
            }
        }
        */
        
    },
    
    findCell : function(dt) {
        dt = dt.clearTime().getTime();
        var ret = false;
        this.cells.each(function(c){
            //Roo.log("check " +c.dateValue + '?=' + dt);
            if(c.dateValue == dt){
                ret = c;
                return false;
            }
            return true;
        });
        
        return ret;
    },
    
    findCells : function(ev) {
        var s = ev.start.clone().clearTime().getTime();
        var e= ev.end.clone().clearTime().getTime();
        var ret = [];
        this.cells.each(function(c){
            //Roo.log("check " +c.dateValue + '<' + e + ' > ' + s);
            
            if(c.dateValue > e){
                return ;
            }
            if(c.dateValue < s){
                return ;
            }
            ret.push(c);
        });
        
        return ret;    
    },
    
    findBestRow: function(cells)
    {
        var ret = 0;
        
        for (var i =0 ; i < cells.length;i++) {
            ret  = Math.max(cells[i].rows || 0,ret);
        }
        return ret;
        
    },
    
    
    addItem : function(ev)
    {
        // look for vertical location slot in
        var cells = this.findCells(ev);
        
        ev.row = this.findBestRow(cells);
        
        // work out the location.
        
        var crow = false;
        var rows = [];
        for(var i =0; i < cells.length; i++) {
            if (!crow) {
                crow = {
                    start : cells[i],
                    end :  cells[i]
                };
                continue;
            }
            if (crow.start.getY() == cells[i].getY()) {
                // on same row.
                crow.end = cells[i];
                continue;
            }
            // different row.
            rows.push(crow);
            crow = {
                start: cells[i],
                end : cells[i]
            };
            
        }
        
        rows.push(crow);
        ev.els = [];
        ev.rows = rows;
        ev.cells = cells;
        for (var i = 0; i < cells.length;i++) {
            cells[i].rows = Math.max(cells[i].rows || 0 , ev.row + 1 );
            
        }
        
        this.calevents.push(ev);
    },
    
    clearEvents: function() {
        
        if(!this.calevents){
            return;
        }
        
        Roo.each(this.cells.elements, function(c){
            c.rows = 0;
        });
        
        Roo.each(this.calevents, function(e) {
            Roo.each(e.els, function(el) {
                el.un('mouseenter' ,this.onEventEnter, this);
                el.un('mouseleave' ,this.onEventLeave, this);
                el.remove();
            },this);
        },this);
        
    },
    
    renderEvents: function()
    {   
        // first make sure there is enough space..
        
        this.cells.each(function(c) {
        
            c.select('.fc-day-content div',true).first().setHeight(Math.max(34, c.rows * 20));
        });
        
        for (var e = 0; e < this.calevents.length; e++) {
            var ev = this.calevents[e];
            var cells = ev.cells;
            var rows = ev.rows;
            
            for(var i =0; i < rows.length; i++) {
                
                 
                // how many rows should it span..
                
                var  cfg = {
                    cls : 'roo-dynamic fc-event fc-event-hori fc-event-draggable ui-draggable',
                    style : 'position: absolute', // left: 387px; width: 121px; top: 359px;
                    
                    unselectable : "on",
                    cn : [
                        {
                            cls: 'fc-event-inner',
                            cn : [
                                {
                                  tag:'span',
                                  cls: 'fc-event-time',
                                  html : cells.length > 1 ? '' : ev.time
                                },
                                {
                                  tag:'span',
                                  cls: 'fc-event-title',
                                  html : String.format('{0}', ev.title)
                                }
                                
                                
                            ]
                        },
                        {
                            cls: 'ui-resizable-handle ui-resizable-e',
                            html : '&nbsp;&nbsp;&nbsp'
                        }
                        
                    ]
                };
                if (i == 0) {
                    cfg.cls += ' fc-event-start';
                }
                if ((i+1) == rows.length) {
                    cfg.cls += ' fc-event-end';
                }
                
                var ctr = this.el.select('.fc-event-container',true).first();
                var cg = ctr.createChild(cfg);
                
                cg.on('mouseenter' ,this.onEventEnter, this, ev);
                cg.on('mouseleave' ,this.onEventLeave, this, ev);
                cg.on('click', this.onEventClick, this, ev);
                
                ev.els.push(cg);
                
                var sbox = rows[i].start.select('.fc-day-content',true).first().getBox();
                var ebox = rows[i].end.select('.fc-day-content',true).first().getBox();
                //Roo.log(cg);
                cg.setXY([sbox.x +2, sbox.y +(ev.row * 20)]);    
                cg.setWidth(ebox.right - sbox.x -2);
            }
            
            
        }
        
    },
    
    onEventEnter: function (e, el,event,d) {
        this.fireEvent('evententer', this, el, event);
    },
    
    onEventLeave: function (e, el,event,d) {
        this.fireEvent('eventleave', this, el, event);
    },
    
    onEventClick: function (e, el,event,d) {
        this.fireEvent('eventclick', this, el, event);
    },
    
    onMonthChange: function () {
        this.store.load();
    },
    
    onLoad: function () {
        
        this.clearEvents();
//        
        this.calevents = [];
        var cal = this;
        if(this.store.getCount() > 0){
            this.store.data.each(function(d){
               cal.addItem({
                    id : d.data.id,
                    start: new Date(d.data.start_dt),
                    end : new Date(d.data.end_dt),
                    time : d.data.start_time,
                    title : d.data.title,
                    description : d.data.description
                });
            });
        }
        
        this.renderEvents();
    }
});

 
 /*
 * - LGPL
 *
 * element
 * 
 */

/**
 * @class Roo.bootstrap.Popover
 * @extends Roo.bootstrap.Component
 * Bootstrap Popover class
 * @cfg {String} html contents of the popover   (or false to use children..)
 * @cfg {String} title of popover (or false to hide)
 * @cfg {String} placement how it is placed
 * @cfg {String} trigger click || hover (or false to trigger manually)
 * @cfg {String} over what (parent or false to trigger manually.)
 * 
 * @constructor
 * Create a new Popover
 * @param {Object} config The config object
 */

Roo.bootstrap.Popover = function(config){
    Roo.bootstrap.Popover.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Popover, Roo.bootstrap.Component,  {
    
    title: 'Fill in a title',
    html: false,
    
    placement : 'right',
    trigger : 'hover', // hover
    
    over: 'parent',
    
    can_build_overlaid : false,
    
    getChildContainer : function()
    {
        return this.el.select('.popover-content',true).first();
    },
    
    getAutoCreate : function(){
         Roo.log('make popover?');
        var cfg = {
           cls : 'popover roo-dynamic',
           style: 'display:block',
           cn : [
                {
                    cls : 'arrow'
                },
                {
                    cls : 'popover-inner',
                    cn : [
                        {
                            tag: 'h3',
                            cls: 'popover-title',
                            html : this.title
                        },
                        {
                            cls : 'popover-content',
                            html : this.html
                        }
                    ]
                    
                }
           ]
        };
        
        return cfg;
    },
    setTitle: function(str)
    {
        this.el.select('.popover-title',true).first().dom.innerHTML = str;
    },
    setContent: function(str)
    {
        this.el.select('.popover-content',true).first().dom.innerHTML = str;
    },
    // as it get's added to the bottom of the page.
    onRender : function(ct, position)
    {
        Roo.bootstrap.Component.superclass.onRender.call(this, ct, position);
        if(!this.el){
            var cfg = Roo.apply({},  this.getAutoCreate());
            cfg.id = Roo.id();
            
            if (this.cls) {
                cfg.cls += ' ' + this.cls;
            }
            if (this.style) {
                cfg.style = this.style;
            }
            Roo.log("adding to ")
            this.el = Roo.get(document.body).createChild(cfg, position);
            Roo.log(this.el);
        }
        this.initEvents();
    },
    
    initEvents : function()
    {
        this.el.select('.popover-title',true).setVisibilityMode(Roo.Element.DISPLAY);
        this.el.enableDisplayMode('block');
        this.el.hide();
        if (this.over === false) {
            return; 
        }
        if (this.triggers === false) {
            return;
        }
        var on_el = (this.over == 'parent') ? this.parent().el : Roo.get(this.over);
        var triggers = this.trigger ? this.trigger.split(' ') : [];
        Roo.each(triggers, function(trigger) {
        
            if (trigger == 'click') {
                on_el.on('click', this.toggle, this);
            } else if (trigger != 'manual') {
                var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
                var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'
      
                on_el.on(eventIn  ,this.enter, this);
                on_el.on(eventOut, this.leave, this);
            }
        }, this);
        
    },
    
    
    // private
    timeout : null,
    hoverState : null,
    
    toggle : function () {
        this.hoverState == 'in' ? this.leave() : this.enter();
    },
    
    enter : function () {
       
    
        clearTimeout(this.timeout);
    
        this.hoverState = 'in'
    
        if (!this.delay || !this.delay.show) {
            this.show();
            return 
        }
        var _t = this;
        this.timeout = setTimeout(function () {
            if (_t.hoverState == 'in') {
                _t.show();
            }
        }, this.delay.show)
    },
    leave : function() {
        clearTimeout(this.timeout);
    
        this.hoverState = 'out'
    
        if (!this.delay || !this.delay.hide) {
            this.hide();
            return 
        }
        var _t = this;
        this.timeout = setTimeout(function () {
            if (_t.hoverState == 'out') {
                _t.hide();
            }
        }, this.delay.hide)
    },
    
    show : function (on_el)
    {
        if (!on_el) {
            on_el= (this.over == 'parent') ? this.parent().el : Roo.get(this.over);
        }
        // set content.
        this.el.select('.popover-title',true).first().dom.innerHtml = this.title;
        if (this.html !== false) {
            this.el.select('.popover-content',true).first().dom.innerHtml = this.title;
        }
        this.el.removeClass(['fade','top','bottom', 'left', 'right','in']);
        if (!this.title.length) {
            this.el.select('.popover-title',true).hide();
        }
        
        var placement = typeof this.placement == 'function' ?
            this.placement.call(this, this.el, on_el) :
            this.placement;
            
        var autoToken = /\s?auto?\s?/i;
        var autoPlace = autoToken.test(placement);
        if (autoPlace) {
            placement = placement.replace(autoToken, '') || 'top';
        }
        
        //this.el.detach()
        //this.el.setXY([0,0]);
        this.el.show();
        this.el.dom.style.display='block';
        this.el.addClass(placement);
        
        //this.el.appendTo(on_el);
        
        var p = this.getPosition();
        var box = this.el.getBox();
        
        if (autoPlace) {
            // fixme..
        }
        var align = Roo.bootstrap.Popover.alignment[placement]
        this.el.alignTo(on_el, align[0],align[1]);
        //var arrow = this.el.select('.arrow',true).first();
        //arrow.set(align[2], 
        
        this.el.addClass('in');
        this.hoverState = null;
        
        if (this.el.hasClass('fade')) {
            // fade it?
        }
        
    },
    hide : function()
    {
        this.el.setXY([0,0]);
        this.el.removeClass('in');
        this.el.hide();
        
    }
    
});

Roo.bootstrap.Popover.alignment = {
    'left' : ['r-l', [-10,0], 'right'],
    'right' : ['l-r', [10,0], 'left'],
    'bottom' : ['t-b', [0,10], 'top'],
    'top' : [ 'b-t', [0,-10], 'bottom']
};

 