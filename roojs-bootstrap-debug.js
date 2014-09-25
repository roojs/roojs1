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
 * @cfg {string} dataId cutomer id
 * @cfg {string} name Specifies name attribute
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
    
    dataId : false,
    
    name : false,
    
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
        
        if(this.dataId){
            cfg.dataId = this.dataId;
        }
        
        if (this.cls) {
            cfg.cls = (typeof(cfg.cls) == 'undefined') ? this.cls : cfg.cls + ' ' + this.cls;
        }
        
        if (this.style) { // fixme needs to support more complex style data.
            cfg.style = this.style;
        }
        
        if(this.name){
            cfg.name = this.name;
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
    
    
    addxtype  : function(tree,cntr)
    {
        var cn = this;
        
        cn = Roo.factory(tree);
           
        cn.parentType = this.xtype; //??
        cn.parentId = this.id;
        
        cntr = (typeof(cntr) == 'undefined' ) ? 'getChildContainer' : cntr;
        
        var has_flexy_each =  (typeof(tree['flexy:foreach']) != 'undefined');
        
        var has_flexy_if =  (typeof(tree['flexy:if']) != 'undefined');
        
        var build_from_html =  Roo.XComponent.build_from_html;
          
        var is_body  = (tree.xtype == 'Body') ;
          
        var page_has_body = (Roo.get(document.body).attr('xtype') == 'Roo.bootstrap.Body');
          
        var self_cntr_el = Roo.get(this[cntr](false));
        
        if (!has_flexy_each || !build_from_html || is_body || !page_has_body) {
            if(!has_flexy_if || typeof(tree.name) == 'undefined' || !build_from_html || is_body || !page_has_body){
                return this.addxtypeChild(tree,cntr);
            }
            
            var echild =self_cntr_el ? self_cntr_el.child('>*[name=' + tree.name + ']') : false;
                
            if(echild){
                return this.addxtypeChild(Roo.apply({}, tree),cntr);
            }
            
            Roo.log('skipping render');
            return cn;
            
        }
        
        var ret = false;
        
        while (true) {
            var echild =self_cntr_el ? self_cntr_el.child('>*[xtype]') : false;
            
            if (!echild) {
                break;
            }
            
            if (echild && echild.attr('xtype').split('.').pop() != cn.xtype) {
                break;
            }
            
            ret = this.addxtypeChild(Roo.apply({}, tree),cntr);
        }
        return ret;
    },
    
    addxtypeChild : function (tree, cntr)
    {
        Roo.log('addxtypeChild:' + cntr);
        var cn = this;
        cntr = (typeof(cntr) == 'undefined' ) ? 'getChildContainer' : cntr;
        
        
        var has_flexy = (typeof(tree['flexy:if']) != 'undefined') ||
                    (typeof(tree['flexy:foreach']) != 'undefined');
          
        
        
        
        // render the element if it's not BODY.
        if (tree.xtype != 'Body') {
           
            cn = Roo.factory(tree);
           
            cn.parentType = this.xtype; //??
            cn.parentId = this.id;
            
            var build_from_html =  Roo.XComponent.build_from_html;
            
            
            // does the container contain child eleemnts with 'xtype' attributes.
            // that match this xtype..
            // note - when we render we create these as well..
            // so we should check to see if body has xtype set.
            if (Roo.get(document.body).attr('xtype') == 'Roo.bootstrap.Body') {
               
                var self_cntr_el = Roo.get(this[cntr](false));
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
           
            
               
            // if object has flexy:if - then it may or may not be rendered.
            if (build_from_html && has_flexy && !cn.el &&  cn.can_build_overlaid) {
                // skip a flexy if element.
                Roo.log('skipping render');
             } else {
                 
                // actually if flexy:foreach is found, we really want to create 
                // multiple copies here...
                //Roo.log('render');
                //Roo.log(this[cntr]());
                cn.render(this[cntr](true));
             }
            // then add the element..
        }
        
        
        // handle the kids..
        
        var nitems = [];
        /*
        if (typeof (tree.menu) != 'undefined') {
            tree.menu.parentType = cn.xtype;
            tree.menu.triggerEl = cn.el;
            nitems.push(cn.addxtype(Roo.apply({}, tree.menu)));
            
        }
        */
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
 * Body
 * 
 */

/**
 * @class Roo.bootstrap.Body
 * @extends Roo.bootstrap.Component
 * Bootstrap Body class
 * 
 * @constructor
 * Create a new body
 * @param {Object} config The config object
 */

Roo.bootstrap.Body = function(config){
    Roo.bootstrap.Body.superclass.constructor.call(this, config);
    this.el = Roo.get(document.body);
    if (this.cls && this.cls.length) {
        Roo.get(document.body).addClass(this.cls);
    }
};

Roo.extend(Roo.bootstrap.Body, Roo.bootstrap.Component,  {
      
	autoCreate : {
        cls: 'container'
    },
    onRender : function(ct, position)
    {
       /* Roo.log("Roo.bootstrap.Body - onRender");
        if (this.cls && this.cls.length) {
            Roo.get(document.body).addClass(this.cls);
        }
        // style??? xttr???
        */
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
 * @cfg {String} weight default (or empty) | primary | success | info | warning | danger | link
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
 * @cfg {Boolean} preventDefault (true | false) default true
 * @cfg {Boolean} removeClass true | false remove the standard class..
 * @cfg {String} target (_self|_blank|_parent|_top)target for a href.
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
         * When a butotn is pressed
         * @param {Roo.EventObject} e
         */
        "click" : true,
         /**
         * @event toggle
         * After the button has been toggles
         * @param {Roo.EventObject} e
         * @param {boolean} pressed (also available as button.pressed)
         */
        "toggle" : true
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
    preventDefault: true,
    removeClass: false,
    name: false,
    target: false,
    
    
    pressed : null,
     
    
    getAutoCreate : function(){
        
        var cfg = {
            tag : 'button',
            cls : 'roo-button',
            html: ''
        };
        
        if (['a', 'button', 'input', 'submit'].indexOf(this.tag) < 0) {
            throw "Invalid value for tag: " + this.tag + ". must be a, button, input or submit.";
            this.tag = 'button';
        } else {
            cfg.tag = this.tag;
        }
        cfg.html = '<span class="roo-button-text">' + (this.html || cfg.html) + '</span>';
        
        if (this.toggle == true) {
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
            
            //if (this.parentType != 'Navbar') {
            this.weight = this.weight.length ?  this.weight : 'default';
            //}
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
        
        if (this.disabled) {
            cfg.disabled = 'disabled';
        }
        
        if (this.items) {
            Roo.log('changing to ul' );
            cfg.tag = 'ul';
            this.glyphicon = 'caret';
        }
        
        cfg.cls += this.size.length ? (' btn-' + this.size) : '';
         
        //gsRoo.log(this.parentType);
        if (this.parentType === 'Navbar' && !this.parent().bar) {
            Roo.log('changing to li?');
            
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
            
        }
        
       cfg.cls += this.parentType === 'Navbar' ?  ' navbar-btn' : '';
        
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
            
//            cfg.cls='btn roo-button';
            
            cfg.href=this.href;
            
            var value = cfg.html;
            
            if(this.glyphicon){
                value = {
                            tag: 'span',
                            cls: 'glyphicon glyphicon-' + this.glyphicon,
                            html: this.html
                        };
                
            }
            
            cfg.cn = [
                value,
                {
                    tag: 'span',
                    cls: 'badge',
                    html: this.badge
                }
            ];
            
            cfg.html='';
        }
        
        if (this.menu) {
            cfg.cls += ' dropdown';
            cfg.html = typeof(cfg.html) != 'undefined' ? cfg.html + ' <span class="caret"></span>' : '<span class="caret"></span>';
        }
        
        if (cfg.tag !== 'a' && this.href !== '') {
            throw "Tag must be a to set href.";
        } else if (this.href.length > 0) {
            cfg.href = this.href;
        }
        
        if(this.removeClass){
            cfg.cls = '';
        }
        
        if(this.target){
            cfg.target = this.target;
        }
        
        return cfg;
    },
    initEvents: function() {
       // Roo.log('init events?');
//        Roo.log(this.el.dom);
        // add the menu...
        
        if (typeof (this.menu) != 'undefined') {
            this.menu.parentType = this.xtype;
            this.menu.triggerEl = this.el;
            this.addxtype(Roo.apply({}, this.menu));
        }


       if (this.el.hasClass('roo-button')) {
            this.el.on('click', this.onClick, this);
       } else {
            this.el.select('.roo-button').on('click', this.onClick, this);
       }
       
       if(this.removeClass){
           this.el.on('click', this.onClick, this);
       }
       
       this.el.enableDisplayMode();
        
    },
    onClick : function(e)
    {
        if (this.disabled) {
            return;
        }
        
        Roo.log('button on click ');
        if(this.preventDefault){
            e.preventDefault();
        }
        if (this.pressed === true || this.pressed === false) {
            this.pressed = !this.pressed;
            this.el[this.pressed ? 'addClass' : 'removeClass']('active');
            this.fireEvent('toggle', this, e, this.pressed);
        }
        
        
        this.fireEvent('click', this, e);
    },
    
    /**
     * Enables this button
     */
    enable : function()
    {
        this.disabled = false;
        this.el.removeClass('disabled');
    },
    
    /**
     * Disable this button
     */
    disable : function()
    {
        this.disabled = true;
        this.el.addClass('disabled');
    },
     /**
     * sets the active state on/off, 
     * @param {Boolean} state (optional) Force a particular state
     */
    setActive : function(v) {
        
        this.el[v ? 'addClass' : 'removeClass']('active');
    },
     /**
     * toggles the current active state 
     */
    toggleActive : function()
    {
       var active = this.el.hasClass('active');
       this.setActive(!active);
       
        
    },
    setText : function(str)
    {
        this.el.select('.roo-button-text',true).first().dom.innerHTML = str;
    },
    getText : function()
    {
        return this.el.select('.roo-button-text',true).first().dom.innerHTML;
    },
    hide: function() {
       
     
        this.el.hide();   
    },
    show: function() {
       
        this.el.show();   
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
 * @cfg {String} tag (header|aside|section) type of HTML tag.

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
    tag : false,
  
     
    getChildContainer : function() {
        
        if(!this.el){
            return false;
        }
        
        if (this.panel.length) {
            return this.el.select('.panel-body',true).first();
        }
        
        return this.el;
    },
    
    
    getAutoCreate : function(){
        
        var cfg = {
            tag : this.tag || 'div',
            html : '',
            cls : ''
        };
        if (this.jumbotron) {
            cfg.cls = 'jumbotron';
        }
        // - this is applied by the parent..
        //if (this.cls) {
        //    cfg.cls = this.cls + '';
        //}
        
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
            cfg.cls += ' panel panel-' + this.panel;
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
        if ((!this.cls || !this.cls.length) && (!cfg.cls || !cfg.cls.length)) {
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
 * @cfg {String} href a tag href
 * @cfg {String} target (_self|_blank|_parent|_top)target for a href.
 * 
 * @constructor
 * Create a new Input
 * @param {Object} config The config object
 */

Roo.bootstrap.Img = function(config){
    Roo.bootstrap.Img.superclass.constructor.call(this, config);
    
    this.addEvents({
        // img events
        /**
         * @event click
         * The img click event for the img.
         * @param {Roo.EventObject} e
         */
        "click" : true
    });
};

Roo.extend(Roo.bootstrap.Img, Roo.bootstrap.Component,  {
    
    imgResponsive: true,
    border: '',
    src: '',
    href: false,
    target: false,

    getAutoCreate : function(){
        
        var cfg = {
            tag: 'img',
            cls: (this.imgResponsive) ? 'img-responsive' : '',
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
        
        if(this.href){
            var a = {
                tag: 'a',
                href: this.href,
                cn: [
		    cfg
		]
            }
            
            if(this.target){
                a.target = this.target;
            }
            
        }
        
        
        return (this.href) ? a : cfg;
    },
    
    initEvents: function() {
        
        if(!this.href){
            this.el.on('click', this.onClick, this);
        }
    },
    
    onClick : function(e)
    {
        Roo.log('img onclick');
        this.fireEvent('click', this, e);
    }
   
});

 /*
 * - LGPL
 *
 * image
 * 
 */


/**
 * @class Roo.bootstrap.Link
 * @extends Roo.bootstrap.Component
 * Bootstrap Link Class
 * @cfg {String} alt image alternative text
 * @cfg {String} href a tag href
 * @cfg {String} target (_self|_blank|_parent|_top) target for a href.
 * @cfg {String} html the content of the link.

 * 
 * @constructor
 * Create a new Input
 * @param {Object} config The config object
 */

Roo.bootstrap.Link = function(config){
    Roo.bootstrap.Link.superclass.constructor.call(this, config);
    
    this.addEvents({
        // img events
        /**
         * @event click
         * The img click event for the img.
         * @param {Roo.EventObject} e
         */
        "click" : true
    });
};

Roo.extend(Roo.bootstrap.Link, Roo.bootstrap.Component,  {
    
    href: false,
    target: false,

    getAutoCreate : function(){
        
        var cfg = {
            tag: 'a',
            html : this.html || 'html-missing'
        }
        
        
        if(this.alt){
            cfg.alt = this.alt;
        }
        cfg.href = this.href || '#';
        if(this.target){
            cfg.target = this.target;
        }
        
        return cfg;
    },
    
    initEvents: function() {
        
        if(!this.href){
            this.el.on('click', this.onClick, this);
        }
    },
    
    onClick : function(e)
    {
        //Roo.log('img onclick');
        this.fireEvent('click', this, e);
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
 * @class Roo.bootstrap.MenuMgr
 * Provides a common registry of all menu items on a page so that they can be easily accessed by id.
 * @singleton
 */
Roo.bootstrap.MenuMgr = function(){
   var menus, active, groups = {}, attached = false, lastShow = new Date();

   // private - called when first menu is created
   function init(){
       menus = {};
       active = new Roo.util.MixedCollection();
       Roo.get(document).addKeyListener(27, function(){
           if(active.length > 0){
               hideAll();
           }
       });
   }

   // private
   function hideAll(){
       if(active && active.length > 0){
           var c = active.clone();
           c.each(function(m){
               m.hide();
           });
       }
   }

   // private
   function onHide(m){
       active.remove(m);
       if(active.length < 1){
           Roo.get(document).un("mouseup", onMouseDown);
            
           attached = false;
       }
   }

   // private
   function onShow(m){
       var last = active.last();
       lastShow = new Date();
       active.add(m);
       if(!attached){
          Roo.get(document).on("mouseup", onMouseDown);
           
           attached = true;
       }
       if(m.parentMenu){
          //m.getEl().setZIndex(parseInt(m.parentMenu.getEl().getStyle("z-index"), 10) + 3);
          m.parentMenu.activeChild = m;
       }else if(last && last.isVisible()){
          //m.getEl().setZIndex(parseInt(last.getEl().getStyle("z-index"), 10) + 3);
       }
   }

   // private
   function onBeforeHide(m){
       if(m.activeChild){
           m.activeChild.hide();
       }
       if(m.autoHideTimer){
           clearTimeout(m.autoHideTimer);
           delete m.autoHideTimer;
       }
   }

   // private
   function onBeforeShow(m){
       var pm = m.parentMenu;
       if(!pm && !m.allowOtherMenus){
           hideAll();
       }else if(pm && pm.activeChild && active != m){
           pm.activeChild.hide();
       }
   }

   // private
   function onMouseDown(e){
        Roo.log("on MouseDown");
        if(lastShow.getElapsed() > 50 && active.length > 0 && !e.getTarget(".x-menu")){
           hideAll();
        }
        
        
   }

   // private
   function onBeforeCheck(mi, state){
       if(state){
           var g = groups[mi.group];
           for(var i = 0, l = g.length; i < l; i++){
               if(g[i] != mi){
                   g[i].setChecked(false);
               }
           }
       }
   }

   return {

       /**
        * Hides all menus that are currently visible
        */
       hideAll : function(){
            hideAll();  
       },

       // private
       register : function(menu){
           if(!menus){
               init();
           }
           menus[menu.id] = menu;
           menu.on("beforehide", onBeforeHide);
           menu.on("hide", onHide);
           menu.on("beforeshow", onBeforeShow);
           menu.on("show", onShow);
           var g = menu.group;
           if(g && menu.events["checkchange"]){
               if(!groups[g]){
                   groups[g] = [];
               }
               groups[g].push(menu);
               menu.on("checkchange", onCheck);
           }
       },

        /**
         * Returns a {@link Roo.menu.Menu} object
         * @param {String/Object} menu The string menu id, an existing menu object reference, or a Menu config that will
         * be used to generate and return a new Menu instance.
         */
       get : function(menu){
           if(typeof menu == "string"){ // menu id
               return menus[menu];
           }else if(menu.events){  // menu instance
               return menu;
           }
           /*else if(typeof menu.length == 'number'){ // array of menu items?
               return new Roo.bootstrap.Menu({items:menu});
           }else{ // otherwise, must be a config
               return new Roo.bootstrap.Menu(menu);
           }
           */
           return false;
       },

       // private
       unregister : function(menu){
           delete menus[menu.id];
           menu.un("beforehide", onBeforeHide);
           menu.un("hide", onHide);
           menu.un("beforeshow", onBeforeShow);
           menu.un("show", onShow);
           var g = menu.group;
           if(g && menu.events["checkchange"]){
               groups[g].remove(menu);
               menu.un("checkchange", onCheck);
           }
       },

       // private
       registerCheckable : function(menuItem){
           var g = menuItem.group;
           if(g){
               if(!groups[g]){
                   groups[g] = [];
               }
               groups[g].push(menuItem);
               menuItem.on("beforecheckchange", onBeforeCheck);
           }
       },

       // private
       unregisterCheckable : function(menuItem){
           var g = menuItem.group;
           if(g){
               groups[g].remove(menuItem);
               menuItem.un("beforecheckchange", onBeforeCheck);
           }
       }
   };
}();/*
 * - LGPL
 *
 * menu
 * 
 */

/**
 * @class Roo.bootstrap.Menu
 * @extends Roo.bootstrap.Component
 * Bootstrap Menu class - container for MenuItems
 * @cfg {String} type (dropdown|treeview|submenu) type of menu
 * 
 * @constructor
 * Create a new Menu
 * @param {Object} config The config object
 */


Roo.bootstrap.Menu = function(config){
    Roo.bootstrap.Menu.superclass.constructor.call(this, config);
    if (this.registerMenu) {
        Roo.bootstrap.MenuMgr.register(this);
    }
    this.addEvents({
        /**
         * @event beforeshow
         * Fires before this menu is displayed
         * @param {Roo.menu.Menu} this
         */
        beforeshow : true,
        /**
         * @event beforehide
         * Fires before this menu is hidden
         * @param {Roo.menu.Menu} this
         */
        beforehide : true,
        /**
         * @event show
         * Fires after this menu is displayed
         * @param {Roo.menu.Menu} this
         */
        show : true,
        /**
         * @event hide
         * Fires after this menu is hidden
         * @param {Roo.menu.Menu} this
         */
        hide : true,
        /**
         * @event click
         * Fires when this menu is clicked (or when the enter key is pressed while it is active)
         * @param {Roo.menu.Menu} this
         * @param {Roo.menu.Item} menuItem The menu item that was clicked
         * @param {Roo.EventObject} e
         */
        click : true,
        /**
         * @event mouseover
         * Fires when the mouse is hovering over this menu
         * @param {Roo.menu.Menu} this
         * @param {Roo.EventObject} e
         * @param {Roo.menu.Item} menuItem The menu item that was clicked
         */
        mouseover : true,
        /**
         * @event mouseout
         * Fires when the mouse exits this menu
         * @param {Roo.menu.Menu} this
         * @param {Roo.EventObject} e
         * @param {Roo.menu.Item} menuItem The menu item that was clicked
         */
        mouseout : true,
        /**
         * @event itemclick
         * Fires when a menu item contained in this menu is clicked
         * @param {Roo.menu.BaseItem} baseItem The BaseItem that was clicked
         * @param {Roo.EventObject} e
         */
        itemclick: true
    });
    this.menuitems = new Roo.util.MixedCollection(false, function(o) { return o.el.id; });
};

Roo.extend(Roo.bootstrap.Menu, Roo.bootstrap.Component,  {
    
   /// html : false,
    //align : '',
    triggerEl : false,  // is this set by component builder? -- it should really be fetched from parent()???
    type: false,
    /**
     * @cfg {Boolean} registerMenu True (default) - means that clicking on screen etc. hides it.
     */
    registerMenu : true,
    
    menuItems :false, // stores the menu items..
    
    hidden:true,
    
    parentMenu : false,
    
    getChildContainer : function() {
        return this.el;  
    },
    
    getAutoCreate : function(){
	 
        //if (['right'].indexOf(this.align)!==-1) {
        //    cfg.cn[1].cls += ' pull-right'
        //}
        
        
        var cfg = {
            tag : 'ul',
            cls : 'dropdown-menu' ,
            style : 'z-index:1000'
            
        }
	
        if (this.type === 'submenu') {
            cfg.cls = 'submenu active';
        }
        if (this.type === 'treeview') {
            cfg.cls = 'treeview-menu';
        }
        
        return cfg;
    },
    initEvents : function() {
        
       // Roo.log("ADD event");
       // Roo.log(this.triggerEl.dom);
        this.triggerEl.on('click', this.onTriggerPress, this);
        this.triggerEl.addClass('dropdown-toggle');
        this.el.on(Roo.isTouch ? 'touchstart' : 'click'   , this.onClick, this);

        this.el.on("mouseover", this.onMouseOver, this);
        this.el.on("mouseout", this.onMouseOut, this);
        
        
    },
    findTargetItem : function(e){
        var t = e.getTarget(".dropdown-menu-item", this.el,  true);
        if(!t){
            return false;
        }
        //Roo.log(t);         Roo.log(t.id);
        if(t && t.id){
            //Roo.log(this.menuitems);
            return this.menuitems.get(t.id);
            
            //return this.items.get(t.menuItemId);
        }
        
        return false;
    },
    onClick : function(e){
        Roo.log("menu.onClick");
        var t = this.findTargetItem(e);
        if(!t){
            return;
        }
        Roo.log(e);
        /*
        if (Roo.isTouch && e.type == 'touchstart' && t.menu  && !t.disabled) {
            if(t == this.activeItem && t.shouldDeactivate(e)){
                this.activeItem.deactivate();
                delete this.activeItem;
                return;
            }
            if(t.canActivate){
                this.setActiveItem(t, true);
            }
            return;
            
            
        }
        */
        Roo.log('pass click event');
        
        t.onClick(e);
        
        this.fireEvent("click", this, t, e);
        
        this.hide();
    },
     onMouseOver : function(e){
        var t  = this.findTargetItem(e);
        //Roo.log(t);
        //if(t){
        //    if(t.canActivate && !t.disabled){
        //        this.setActiveItem(t, true);
        //    }
        //}
        
        this.fireEvent("mouseover", this, e, t);
    },
    isVisible : function(){
        return !this.hidden;
    },
     onMouseOut : function(e){
        var t  = this.findTargetItem(e);
        
        //if(t ){
        //    if(t == this.activeItem && t.shouldDeactivate(e)){
        //        this.activeItem.deactivate();
        //        delete this.activeItem;
        //    }
        //}
        this.fireEvent("mouseout", this, e, t);
    },
    
    
    /**
     * Displays this menu relative to another element
     * @param {String/HTMLElement/Roo.Element} element The element to align to
     * @param {String} position (optional) The {@link Roo.Element#alignTo} anchor position to use in aligning to
     * the element (defaults to this.defaultAlign)
     * @param {Roo.menu.Menu} parentMenu (optional) This menu's parent menu, if applicable (defaults to undefined)
     */
    show : function(el, pos, parentMenu){
        this.parentMenu = parentMenu;
        if(!this.el){
            this.render();
        }
        this.fireEvent("beforeshow", this);
        this.showAt(this.el.getAlignToXY(el, pos || this.defaultAlign), parentMenu, false);
    },
     /**
     * Displays this menu at a specific xy position
     * @param {Array} xyPosition Contains X & Y [x, y] values for the position at which to show the menu (coordinates are page-based)
     * @param {Roo.menu.Menu} parentMenu (optional) This menu's parent menu, if applicable (defaults to undefined)
     */
    showAt : function(xy, parentMenu, /* private: */_e){
        this.parentMenu = parentMenu;
        if(!this.el){
            this.render();
        }
        if(_e !== false){
            this.fireEvent("beforeshow", this);
            
            //xy = this.el.adjustForConstraints(xy);
        }
        //this.el.setXY(xy);
        //this.el.show();
        this.hideMenuItems();
        this.hidden = false;
        this.triggerEl.addClass('open');
        this.focus();
        this.fireEvent("show", this);
    },
    
    focus : function(){
        return;
        if(!this.hidden){
            this.doFocus.defer(50, this);
        }
    },

    doFocus : function(){
        if(!this.hidden){
            this.focusEl.focus();
        }
    },

    /**
     * Hides this menu and optionally all parent menus
     * @param {Boolean} deep (optional) True to hide all parent menus recursively, if any (defaults to false)
     */
    hide : function(deep){
        
        this.hideMenuItems();
        if(this.el && this.isVisible()){
            this.fireEvent("beforehide", this);
            if(this.activeItem){
                this.activeItem.deactivate();
                this.activeItem = null;
            }
            this.triggerEl.removeClass('open');;
            this.hidden = true;
            this.fireEvent("hide", this);
        }
        if(deep === true && this.parentMenu){
            this.parentMenu.hide(true);
        }
    },
    
    onTriggerPress  : function(e)
    {
        
        Roo.log('trigger press');
        //Roo.log(e.getTarget());
       // Roo.log(this.triggerEl.dom);
        if (Roo.get(e.getTarget()).findParent('.dropdown-menu')) {
            return;
        }
        if (this.isVisible()) {
            Roo.log('hide');
            this.hide();
        } else {
            this.show(this.triggerEl, false, false);
        }
        
        
    },
    
         
       
    
    hideMenuItems : function()
    {
        //$(backdrop).remove()
        Roo.select('.open',true).each(function(aa) {
            
            aa.removeClass('open');
          //var parent = getParent($(this))
          //var relatedTarget = { relatedTarget: this }
          
           //$parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
          //if (e.isDefaultPrevented()) return
           //$parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
        })
    },
    addxtypeChild : function (tree, cntr) {
        var comp= Roo.bootstrap.Menu.superclass.addxtypeChild.call(this, tree, cntr);
          
        this.menuitems.add(comp);
        return comp;

    },
    getEl : function()
    {
        Roo.log(this.el);
        return this.el;
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
 * @cfg {Boolean} preventDefault (true | false) default true
 * 
 * 
 * @constructor
 * Create a new MenuItem
 * @param {Object} config The config object
 */


Roo.bootstrap.MenuItem = function(config){
    Roo.bootstrap.MenuItem.superclass.constructor.call(this, config);
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

Roo.extend(Roo.bootstrap.MenuItem, Roo.bootstrap.Component,  {
    
    href : false,
    html : false,
    preventDefault: true,
    
    getAutoCreate : function(){
        var cfg= {
            tag: 'li',
            cls: 'dropdown-menu-item',
            cn: [
                    {
                        tag : 'a',
                        href : '#',
                        html : 'Link'
                    }
                ]
        };
        if (this.parent().type == 'treeview') {
            cfg.cls = 'treeview-menu';
        }
        
        cfg.cn[0].href = this.href || cfg.cn[0].href ;
        cfg.cn[0].html = this.html || cfg.cn[0].html ;
        return cfg;
    },
    
    initEvents: function() {
        
        //this.el.select('a').on('click', this.onClick, this);
        
    },
    onClick : function(e)
    {
        Roo.log('item on click ');
        //if(this.preventDefault){
        //    e.preventDefault();
        //}
        //this.parent().hideMenuItems();
        
        this.fireEvent('click', this, e);
    },
    getEl : function()
    {
        return this.el;
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
 * @cfg {Boolean} specificTitle (true|false) default false
 * @cfg {Array} buttons Array of buttons or standard button set..
 * @cfg {String} buttonPosition (left|right|center) default right
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
         * @event btnclick
         * The raw btnclick event for the button
         * @param {Roo.EventObject} e
         */
        "btnclick" : true
    });
    this.buttons = this.buttons || [];
};

Roo.extend(Roo.bootstrap.Modal, Roo.bootstrap.Component,  {
    
    title : 'test dialog',
   
    buttons : false,
    
    // set on load...
    body:  false,
    
    specificTitle: false,
    
    buttonPosition: 'right',
    
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
    
        if (this.buttons.length) {
            Roo.each(this.buttons, function(bb) {
                b = Roo.apply({}, bb);
                b.xns = b.xns || Roo.bootstrap;
                b.xtype = b.xtype || 'Button';
                if (typeof(b.listeners) == 'undefined') {
                    b.listeners = { click : this.onButtonClick.createDelegate(this)  };
                }
                
                var btn = Roo.factory(b);
                
                btn.onRender(this.el.select('.modal-footer div').first());
                
            },this);
        }
        // render the children.
        var nitems = [];
        
        if(typeof(this.items) != 'undefined'){
            var items = this.items;
            delete this.items;

            for(var i =0;i < items.length;i++) {
                nitems.push(this.addxtype(Roo.apply({}, items[i])));
            }
        }
        
        this.items = nitems;
        
        this.body = this.el.select('.modal-body',true).first();
        this.close = this.el.select('.modal-header .close', true).first();
        this.footer = this.el.select('.modal-footer',true).first();
        this.initEvents();
        //this.el.addClass([this.fieldClass, this.cls]);
        
    },
    getAutoCreate : function(){
        
        
        var bdy = {
                cls : 'modal-body',
                html : this.html || ''
        };
        
        var title = {
            tag: 'h4',
            cls : 'modal-title',
            html : this.title
        };
        
        if(this.specificTitle){
            title = this.title;
        };
        
        return modal = {
            cls: "modal fade",
            style : 'display: none',
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
                                        title
                                    ]
                                },
                                bdy,
                                {
                                    cls : 'modal-footer',
                                    cn : [
                                        {
                                            tag: 'div',
                                            cls: 'btn-' + this.buttonPosition
                                        }
                                    ]
                                    
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
         return this.el.select('.modal-footer div',true).first();
        
    },
    initEvents : function()
    {
        this.el.select('.modal-header .close').on('click', this.hide, this);
//        
//        this.addxtype(this);
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
        this.fireEvent('show', this);
        
        
    },
    hide : function()
    {
        Roo.log('Modal hide?!');
        this.maskEl.hide();
        Roo.get(document.body).removeClass("x-body-masked");
        this.el.removeClass('on');
        this.el.addClass('fade');
        this.el.setStyle('display', 'none');
        this.fireEvent('hide', this);
    },
    
    addButton : function(str, cb)
    {
         
        
        var b = Roo.apply({}, { html : str } );
        b.xns = b.xns || Roo.bootstrap;
        b.xtype = b.xtype || 'Button';
        if (typeof(b.listeners) == 'undefined') {
            b.listeners = { click : cb.createDelegate(this)  };
        }
        
        var btn = Roo.factory(b);
           
        btn.onRender(this.el.select('.modal-footer div').first());
        
        return btn;   
       
    },
    
    setDefaultButton : function(btn)
    {
        //this.el.select('.modal-footer').()
    },
    resizeTo: function(w,h)
    {
        // skip..
    },
    setContentSize  : function(w, h)
    {
        
    },
    onButtonClick: function(btn,e)
    {
        //Roo.log([a,b,c]);
        this.fireEvent('btnclick', btn.name, e);
    },
    setTitle: function(str) {
        this.el.select('.modal-title',true).first().dom.innerHTML = str;
        
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
                name  : 'no',
                html : 'No'
            },
            {
                name  :'yes',
                weight : 'primary',
                html : 'Yes'
            }
        ],
        
        /**
         * Button config that displays OK and Cancel buttons
         * @type Object
         */
        OKCANCEL : [
            {
               name : 'cancel',
                html : 'Cancel'
            },
            {
                name : 'ok',
                weight : 'primary',
                html : 'OK'
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
 * messagebox - can be used as a replace
 * 
 */
/**
 * @class Roo.MessageBox
 * Utility class for generating different styles of message boxes.  The alias Roo.Msg can also be used.
 * Example usage:
 *<pre><code>
// Basic alert:
Roo.Msg.alert('Status', 'Changes saved successfully.');

// Prompt for user data:
Roo.Msg.prompt('Name', 'Please enter your name:', function(btn, text){
    if (btn == 'ok'){
        // process text value...
    }
});

// Show a dialog using config options:
Roo.Msg.show({
   title:'Save Changes?',
   msg: 'Your are closing a tab that has unsaved changes. Would you like to save your changes?',
   buttons: Roo.Msg.YESNOCANCEL,
   fn: processResult,
   animEl: 'elId'
});
</code></pre>
 * @singleton
 */
Roo.bootstrap.MessageBox = function(){
    var dlg, opt, mask, waitTimer;
    var bodyEl, msgEl, textboxEl, textareaEl, progressEl, pp;
    var buttons, activeTextEl, bwidth;

    
    // private
    var handleButton = function(button){
        dlg.hide();
        Roo.callback(opt.fn, opt.scope||window, [button, activeTextEl.dom.value], 1);
    };

    // private
    var handleHide = function(){
        if(opt && opt.cls){
            dlg.el.removeClass(opt.cls);
        }
        //if(waitTimer){
        //    Roo.TaskMgr.stop(waitTimer);
        //    waitTimer = null;
        //}
    };

    // private
    var updateButtons = function(b){
        var width = 0;
        if(!b){
            buttons["ok"].hide();
            buttons["cancel"].hide();
            buttons["yes"].hide();
            buttons["no"].hide();
            //dlg.footer.dom.style.display = 'none';
            return width;
        }
        dlg.footer.dom.style.display = '';
        for(var k in buttons){
            if(typeof buttons[k] != "function"){
                if(b[k]){
                    buttons[k].show();
                    buttons[k].setText(typeof b[k] == "string" ? b[k] : Roo.bootstrap.MessageBox.buttonText[k]);
                    width += buttons[k].el.getWidth()+15;
                }else{
                    buttons[k].hide();
                }
            }
        }
        return width;
    };

    // private
    var handleEsc = function(d, k, e){
        if(opt && opt.closable !== false){
            dlg.hide();
        }
        if(e){
            e.stopEvent();
        }
    };

    return {
        /**
         * Returns a reference to the underlying {@link Roo.BasicDialog} element
         * @return {Roo.BasicDialog} The BasicDialog element
         */
        getDialog : function(){
           if(!dlg){
                dlg = new Roo.bootstrap.Modal( {
                    //draggable: true,
                    //resizable:false,
                    //constraintoviewport:false,
                    //fixedcenter:true,
                    //collapsible : false,
                    //shim:true,
                    //modal: true,
                  //  width:400,
                  //  height:100,
                    //buttonAlign:"center",
                    closeClick : function(){
                        if(opt && opt.buttons && opt.buttons.no && !opt.buttons.cancel){
                            handleButton("no");
                        }else{
                            handleButton("cancel");
                        }
                    }
                });
                dlg.render();
                dlg.on("hide", handleHide);
                mask = dlg.mask;
                //dlg.addKeyListener(27, handleEsc);
                buttons = {};
                this.buttons = buttons;
                var bt = this.buttonText;
                buttons["ok"] = dlg.addButton(bt["ok"], handleButton.createCallback("ok"));
                buttons["yes"] = dlg.addButton(bt["yes"], handleButton.createCallback("yes"));
                buttons["no"] = dlg.addButton(bt["no"], handleButton.createCallback("no"));
                buttons["cancel"] = dlg.addButton(bt["cancel"], handleButton.createCallback("cancel"));
                Roo.log(buttons)
                bodyEl = dlg.body.createChild({

                    html:'<span class="roo-mb-text"></span><br /><input type="text" class="roo-mb-input" />' +
                        '<textarea class="roo-mb-textarea"></textarea>' +
                        '<div class="roo-mb-progress-wrap"><div class="roo-mb-progress"><div class="roo-mb-progress-bar">&#160;</div></div></div>'
                });
                msgEl = bodyEl.dom.firstChild;
                textboxEl = Roo.get(bodyEl.dom.childNodes[2]);
                textboxEl.enableDisplayMode();
                textboxEl.addKeyListener([10,13], function(){
                    if(dlg.isVisible() && opt && opt.buttons){
                        if(opt.buttons.ok){
                            handleButton("ok");
                        }else if(opt.buttons.yes){
                            handleButton("yes");
                        }
                    }
                });
                textareaEl = Roo.get(bodyEl.dom.childNodes[3]);
                textareaEl.enableDisplayMode();
                progressEl = Roo.get(bodyEl.dom.childNodes[4]);
                progressEl.enableDisplayMode();
                var pf = progressEl.dom.firstChild;
                if (pf) {
                    pp = Roo.get(pf.firstChild);
                    pp.setHeight(pf.offsetHeight);
                }
                
            }
            return dlg;
        },

        /**
         * Updates the message box body text
         * @param {String} text (optional) Replaces the message box element's innerHTML with the specified string (defaults to
         * the XHTML-compliant non-breaking space character '&amp;#160;')
         * @return {Roo.MessageBox} This message box
         */
        updateText : function(text){
            if(!dlg.isVisible() && !opt.width){
                dlg.resizeTo(this.maxWidth, 100); // resize first so content is never clipped from previous shows
            }
            msgEl.innerHTML = text || '&#160;';
      
            var cw =  Math.max(msgEl.offsetWidth, msgEl.parentNode.scrollWidth);
            //Roo.log("guesed size: " + JSON.stringify([cw,msgEl.offsetWidth, msgEl.parentNode.scrollWidth]));
            var w = Math.max(
                    Math.min(opt.width || cw , this.maxWidth), 
                    Math.max(opt.minWidth || this.minWidth, bwidth)
            );
            if(opt.prompt){
                activeTextEl.setWidth(w);
            }
            if(dlg.isVisible()){
                dlg.fixedcenter = false;
            }
            // to big, make it scroll. = But as usual stupid IE does not support
            // !important..
            
            if ( bodyEl.getHeight() > (Roo.lib.Dom.getViewHeight() - 100)) {
                bodyEl.setHeight ( Roo.lib.Dom.getViewHeight() - 100 );
                bodyEl.dom.style.overflowY = 'auto' + ( Roo.isIE ? '' : ' !important');
            } else {
                bodyEl.dom.style.height = '';
                bodyEl.dom.style.overflowY = '';
            }
            if (cw > w) {
                bodyEl.dom.style.get = 'auto' + ( Roo.isIE ? '' : ' !important');
            } else {
                bodyEl.dom.style.overflowX = '';
            }
            
            dlg.setContentSize(w, bodyEl.getHeight());
            if(dlg.isVisible()){
                dlg.fixedcenter = true;
            }
            return this;
        },

        /**
         * Updates a progress-style message box's text and progress bar.  Only relevant on message boxes
         * initiated via {@link Roo.MessageBox#progress} or by calling {@link Roo.MessageBox#show} with progress: true.
         * @param {Number} value Any number between 0 and 1 (e.g., .5)
         * @param {String} text (optional) If defined, the message box's body text is replaced with the specified string (defaults to undefined)
         * @return {Roo.MessageBox} This message box
         */
        updateProgress : function(value, text){
            if(text){
                this.updateText(text);
            }
            if (pp) { // weird bug on my firefox - for some reason this is not defined
                pp.setWidth(Math.floor(value*progressEl.dom.firstChild.offsetWidth));
            }
            return this;
        },        

        /**
         * Returns true if the message box is currently displayed
         * @return {Boolean} True if the message box is visible, else false
         */
        isVisible : function(){
            return dlg && dlg.isVisible();  
        },

        /**
         * Hides the message box if it is displayed
         */
        hide : function(){
            if(this.isVisible()){
                dlg.hide();
            }  
        },

        /**
         * Displays a new message box, or reinitializes an existing message box, based on the config options
         * passed in. All functions (e.g. prompt, alert, etc) on MessageBox call this function internally.
         * The following config object properties are supported:
         * <pre>
Property    Type             Description
----------  ---------------  ------------------------------------------------------------------------------------
animEl            String/Element   An id or Element from which the message box should animate as it opens and
                                   closes (defaults to undefined)
buttons           Object/Boolean   A button config object (e.g., Roo.MessageBox.OKCANCEL or {ok:'Foo',
                                   cancel:'Bar'}), or false to not show any buttons (defaults to false)
closable          Boolean          False to hide the top-right close button (defaults to true).  Note that
                                   progress and wait dialogs will ignore this property and always hide the
                                   close button as they can only be closed programmatically.
cls               String           A custom CSS class to apply to the message box element
defaultTextHeight Number           The default height in pixels of the message box's multiline textarea if
                                   displayed (defaults to 75)
fn                Function         A callback function to execute after closing the dialog.  The arguments to the
                                   function will be btn (the name of the button that was clicked, if applicable,
                                   e.g. "ok"), and text (the value of the active text field, if applicable).
                                   Progress and wait dialogs will ignore this option since they do not respond to
                                   user actions and can only be closed programmatically, so any required function
                                   should be called by the same code after it closes the dialog.
icon              String           A CSS class that provides a background image to be used as an icon for
                                   the dialog (e.g., Roo.MessageBox.WARNING or 'custom-class', defaults to '')
maxWidth          Number           The maximum width in pixels of the message box (defaults to 600)
minWidth          Number           The minimum width in pixels of the message box (defaults to 100)
modal             Boolean          False to allow user interaction with the page while the message box is
                                   displayed (defaults to true)
msg               String           A string that will replace the existing message box body text (defaults
                                   to the XHTML-compliant non-breaking space character '&#160;')
multiline         Boolean          True to prompt the user to enter multi-line text (defaults to false)
progress          Boolean          True to display a progress bar (defaults to false)
progressText      String           The text to display inside the progress bar if progress = true (defaults to '')
prompt            Boolean          True to prompt the user to enter single-line text (defaults to false)
proxyDrag         Boolean          True to display a lightweight proxy while dragging (defaults to false)
title             String           The title text
value             String           The string value to set into the active textbox element if displayed
wait              Boolean          True to display a progress bar (defaults to false)
width             Number           The width of the dialog in pixels
</pre>
         *
         * Example usage:
         * <pre><code>
Roo.Msg.show({
   title: 'Address',
   msg: 'Please enter your address:',
   width: 300,
   buttons: Roo.MessageBox.OKCANCEL,
   multiline: true,
   fn: saveAddress,
   animEl: 'addAddressBtn'
});
</code></pre>
         * @param {Object} config Configuration options
         * @return {Roo.MessageBox} This message box
         */
        show : function(options)
        {
            
            // this causes nightmares if you show one dialog after another
            // especially on callbacks..
             
            if(this.isVisible()){
                
                this.hide();
                Roo.log("[Roo.Messagebox] Show called while message displayed:" );
                Roo.log("Old Dialog Message:" +  msgEl.innerHTML );
                Roo.log("New Dialog Message:" +  options.msg )
                //this.alert("ERROR", "Multiple dialogs where displayed at the same time");
                //throw "Roo.MessageBox ERROR : Multiple dialogs where displayed at the same time";
                
            }
            var d = this.getDialog();
            opt = options;
            d.setTitle(opt.title || "&#160;");
            d.close.setDisplayed(opt.closable !== false);
            activeTextEl = textboxEl;
            opt.prompt = opt.prompt || (opt.multiline ? true : false);
            if(opt.prompt){
                if(opt.multiline){
                    textboxEl.hide();
                    textareaEl.show();
                    textareaEl.setHeight(typeof opt.multiline == "number" ?
                        opt.multiline : this.defaultTextHeight);
                    activeTextEl = textareaEl;
                }else{
                    textboxEl.show();
                    textareaEl.hide();
                }
            }else{
                textboxEl.hide();
                textareaEl.hide();
            }
            progressEl.setDisplayed(opt.progress === true);
            this.updateProgress(0);
            activeTextEl.dom.value = opt.value || "";
            if(opt.prompt){
                dlg.setDefaultButton(activeTextEl);
            }else{
                var bs = opt.buttons;
                var db = null;
                if(bs && bs.ok){
                    db = buttons["ok"];
                }else if(bs && bs.yes){
                    db = buttons["yes"];
                }
                dlg.setDefaultButton(db);
            }
            bwidth = updateButtons(opt.buttons);
            this.updateText(opt.msg);
            if(opt.cls){
                d.el.addClass(opt.cls);
            }
            d.proxyDrag = opt.proxyDrag === true;
            d.modal = opt.modal !== false;
            d.mask = opt.modal !== false ? mask : false;
            if(!d.isVisible()){
                // force it to the end of the z-index stack so it gets a cursor in FF
                document.body.appendChild(dlg.el.dom);
                d.animateTarget = null;
                d.show(options.animEl);
            }
            return this;
        },

        /**
         * Displays a message box with a progress bar.  This message box has no buttons and is not closeable by
         * the user.  You are responsible for updating the progress bar as needed via {@link Roo.MessageBox#updateProgress}
         * and closing the message box when the process is complete.
         * @param {String} title The title bar text
         * @param {String} msg The message box body text
         * @return {Roo.MessageBox} This message box
         */
        progress : function(title, msg){
            this.show({
                title : title,
                msg : msg,
                buttons: false,
                progress:true,
                closable:false,
                minWidth: this.minProgressWidth,
                modal : true
            });
            return this;
        },

        /**
         * Displays a standard read-only message box with an OK button (comparable to the basic JavaScript Window.alert).
         * If a callback function is passed it will be called after the user clicks the button, and the
         * id of the button that was clicked will be passed as the only parameter to the callback
         * (could also be the top-right close button).
         * @param {String} title The title bar text
         * @param {String} msg The message box body text
         * @param {Function} fn (optional) The callback function invoked after the message box is closed
         * @param {Object} scope (optional) The scope of the callback function
         * @return {Roo.MessageBox} This message box
         */
        alert : function(title, msg, fn, scope){
            this.show({
                title : title,
                msg : msg,
                buttons: this.OK,
                fn: fn,
                scope : scope,
                modal : true
            });
            return this;
        },

        /**
         * Displays a message box with an infinitely auto-updating progress bar.  This can be used to block user
         * interaction while waiting for a long-running process to complete that does not have defined intervals.
         * You are responsible for closing the message box when the process is complete.
         * @param {String} msg The message box body text
         * @param {String} title (optional) The title bar text
         * @return {Roo.MessageBox} This message box
         */
        wait : function(msg, title){
            this.show({
                title : title,
                msg : msg,
                buttons: false,
                closable:false,
                progress:true,
                modal:true,
                width:300,
                wait:true
            });
            waitTimer = Roo.TaskMgr.start({
                run: function(i){
                    Roo.MessageBox.updateProgress(((((i+20)%20)+1)*5)*.01);
                },
                interval: 1000
            });
            return this;
        },

        /**
         * Displays a confirmation message box with Yes and No buttons (comparable to JavaScript's Window.confirm).
         * If a callback function is passed it will be called after the user clicks either button, and the id of the
         * button that was clicked will be passed as the only parameter to the callback (could also be the top-right close button).
         * @param {String} title The title bar text
         * @param {String} msg The message box body text
         * @param {Function} fn (optional) The callback function invoked after the message box is closed
         * @param {Object} scope (optional) The scope of the callback function
         * @return {Roo.MessageBox} This message box
         */
        confirm : function(title, msg, fn, scope){
            this.show({
                title : title,
                msg : msg,
                buttons: this.YESNO,
                fn: fn,
                scope : scope,
                modal : true
            });
            return this;
        },

        /**
         * Displays a message box with OK and Cancel buttons prompting the user to enter some text (comparable to
         * JavaScript's Window.prompt).  The prompt can be a single-line or multi-line textbox.  If a callback function
         * is passed it will be called after the user clicks either button, and the id of the button that was clicked
         * (could also be the top-right close button) and the text that was entered will be passed as the two
         * parameters to the callback.
         * @param {String} title The title bar text
         * @param {String} msg The message box body text
         * @param {Function} fn (optional) The callback function invoked after the message box is closed
         * @param {Object} scope (optional) The scope of the callback function
         * @param {Boolean/Number} multiline (optional) True to create a multiline textbox using the defaultTextHeight
         * property, or the height in pixels to create the textbox (defaults to false / single-line)
         * @return {Roo.MessageBox} This message box
         */
        prompt : function(title, msg, fn, scope, multiline){
            this.show({
                title : title,
                msg : msg,
                buttons: this.OKCANCEL,
                fn: fn,
                minWidth:250,
                scope : scope,
                prompt:true,
                multiline: multiline,
                modal : true
            });
            return this;
        },

        /**
         * Button config that displays a single OK button
         * @type Object
         */
        OK : {ok:true},
        /**
         * Button config that displays Yes and No buttons
         * @type Object
         */
        YESNO : {yes:true, no:true},
        /**
         * Button config that displays OK and Cancel buttons
         * @type Object
         */
        OKCANCEL : {ok:true, cancel:true},
        /**
         * Button config that displays Yes, No and Cancel buttons
         * @type Object
         */
        YESNOCANCEL : {yes:true, no:true, cancel:true},

        /**
         * The default height in pixels of the message box's multiline textarea if displayed (defaults to 75)
         * @type Number
         */
        defaultTextHeight : 75,
        /**
         * The maximum width in pixels of the message box (defaults to 600)
         * @type Number
         */
        maxWidth : 600,
        /**
         * The minimum width in pixels of the message box (defaults to 100)
         * @type Number
         */
        minWidth : 100,
        /**
         * The minimum width in pixels of the message box if it is a progress-style dialog.  This is useful
         * for setting a different minimum width than text-only dialogs may need (defaults to 250)
         * @type Number
         */
        minProgressWidth : 250,
        /**
         * An object containing the default button text strings that can be overriden for localized language support.
         * Supported properties are: ok, cancel, yes and no.
         * Customize the default text like so: Roo.MessageBox.buttonText.yes = "S?";
         * @type Object
         */
        buttonText : {
            ok : "OK",
            cancel : "Cancel",
            yes : "Yes",
            no : "No"
        }
    };
}();

/**
 * Shorthand for {@link Roo.MessageBox}
 */
Roo.MessageBox = Roo.MessageBox || Roo.bootstrap.MessageBox 
Roo.Msg = Roo.Msg || Roo.MessageBox;
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

 * @constructor
 * Create a new Navbar
 * @param {Object} config The config object
 */


Roo.bootstrap.Navbar = function(config){
    Roo.bootstrap.Navbar.superclass.constructor.call(this, config);
    
};

Roo.extend(Roo.bootstrap.Navbar, Roo.bootstrap.Component,  {
    
    
   
    // private
    navItems : false,
    loadMask : false,
    
    
    getAutoCreate : function(){
        
        
        throw { message : "nav bar is now a abstract base class - use NavSimplebar / NavHeaderbar / NavSidebar etc..."};
        
    },
    
    initEvents :function ()
    {
        //Roo.log(this.el.select('.navbar-toggle',true));
        this.el.select('.navbar-toggle',true).on('click', function() {
           // Roo.log('click');
            this.el.select('.navbar-collapse',true).toggleClass('in');                                 
        }, this);
        
        var mark = {
            tag: "div",
            cls:"x-dlg-mask"
        }
        
        this.maskEl = Roo.DomHelper.append(this.el, mark, true);
        
        var size = this.el.getSize();
        this.maskEl.setSize(size.width, size.height);
        this.maskEl.enableDisplayMode("block");
        this.maskEl.hide();
        
        if(this.loadMask){
            this.maskEl.show();
        }
    },
    
    
    getChildContainer : function()
    {
        if (this.el.select('.collapse').getCount()) {
            return this.el.select('.collapse',true).first();
        }
        
        return this.el;
    },
    
    mask : function()
    {
        this.maskEl.show();
    },
    
    unmask : function()
    {
        this.maskEl.hide();
    } 
    
    
    
    
});



 

 /*
 * - LGPL
 *
 * navbar
 * 
 */

/**
 * @class Roo.bootstrap.NavSimplebar
 * @extends Roo.bootstrap.Navbar
 * Bootstrap Sidebar class
 *
 * @cfg {Boolean} inverse is inverted color
 * 
 * @cfg {String} type (nav | pills | tabs)
 * @cfg {Boolean} arrangement stacked | justified
 * @cfg {String} align (left | right) alignment
 * 
 * @cfg {Boolean} main (true|false) main nav bar? default false
 * @cfg {Boolean} loadMask (true|false) loadMask on the bar
 * 
 * @cfg {String} tag (header|footer|nav|div) default is nav 

 * 
 * 
 * 
 * @constructor
 * Create a new Sidebar
 * @param {Object} config The config object
 */


Roo.bootstrap.NavSimplebar = function(config){
    Roo.bootstrap.NavSimplebar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.NavSimplebar, Roo.bootstrap.Navbar,  {
    
    inverse: false,
    
    type: false,
    arrangement: '',
    align : false,
    
    
    
    main : false,
    
    
    tag : false,
    
    
    getAutoCreate : function(){
        
        
        var cfg = {
            tag : this.tag || 'div',
            cls : 'navbar'
        };
	  
	
        cfg.cn = [
            {
                cls: 'nav',
                tag : 'ul'
            }
        ];
        
         
        this.type = this.type || 'nav';
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
    
        
    }
    
    
    
});



 

 
       /*
 * - LGPL
 *
 * navbar
 * 
 */

/**
 * @class Roo.bootstrap.NavHeaderbar
 * @extends Roo.bootstrap.NavSimplebar
 * Bootstrap Sidebar class
 *
 * @cfg {String} brand what is brand
 * @cfg {String} position (fixed-top|fixed-bottom|static-top) position
 * @cfg {String} brand_href href of the brand
 * 
 * @constructor
 * Create a new Sidebar
 * @param {Object} config The config object
 */


Roo.bootstrap.NavHeaderbar = function(config){
    Roo.bootstrap.NavHeaderbar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.NavHeaderbar, Roo.bootstrap.NavSimplebar,  {
    
    position: '',
    brand: '',
    brand_href: false,
    
    
    getAutoCreate : function(){
        
        
        
        var   cfg = {
            tag: this.nav || 'nav',
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
            
            // tag can override this..
            
            cfg.tag = this.tag || (this.position  == 'fixed-bottom' ? 'footer' : 'header');
        }
        
        if (this.brand !== '') {
            cfg.cn[0].cn.push({
                tag: 'a',
                href: this.brand_href ? this.brand_href : '#',
                cls: 'navbar-brand',
                cn: [
                this.brand
                ]
            });
        }
        
        if(this.main){
            cfg.cls += ' main-nav';
        }
        
        
        return cfg;

        
    }
    
    
    
});



 

 /*
 * - LGPL
 *
 * navbar
 * 
 */

/**
 * @class Roo.bootstrap.NavSidebar
 * @extends Roo.bootstrap.Navbar
 * Bootstrap Sidebar class
 * 
 * @constructor
 * Create a new Sidebar
 * @param {Object} config The config object
 */


Roo.bootstrap.NavSidebar = function(config){
    Roo.bootstrap.NavSidebar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.NavSidebar, Roo.bootstrap.Navbar,  {
    
    sidebar : true, // used by Navbar Item and NavbarGroup at present...
    
    getAutoCreate : function(){
        
        
        return  {
            tag: 'div',
            cls: 'sidebar sidebar-nav'
        };
    
        
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
 * @cfg {String} type (nav|pills|tab) default nav
 * @cfg {String} navId - reference Id for navbar.

 * 
 * @constructor
 * Create a new nav group
 * @param {Object} config The config object
 */

Roo.bootstrap.NavGroup = function(config){
    Roo.bootstrap.NavGroup.superclass.constructor.call(this, config);
    this.navItems = [];
    Roo.bootstrap.NavGroup.register(this);
     this.addEvents({
        /**
	     * @event changed
	     * Fires when the active item changes
	     * @param {Roo.bootstrap.NavGroup} this
	     * @param {Roo.bootstrap.Navbar.Item} item The item selected
	     * @param {Roo.bootstrap.Navbar.Item} item The previously selected item 
         */
        'changed': true
     });
    
};

Roo.extend(Roo.bootstrap.NavGroup, Roo.bootstrap.Component,  {
    
    align: '',
    inverse: false,
    form: false,
    type: 'nav',
    navId : '',
    // private
    
    navItems : false,
    
    getAutoCreate : function()
    {
        var cfg = Roo.apply({}, Roo.bootstrap.NavGroup.superclass.getAutoCreate.call(this));
        
        cfg = {
            tag : 'ul',
            cls: 'nav' 
        }
        
        if (['tabs','pills'].indexOf(this.type)!==-1) {
            cfg.cls += ' nav-' + this.type
        } else {
            if (this.type!=='nav') {
                Roo.log('nav type must be nav/tabs/pills')
            }
            cfg.cls += ' navbar-nav'
        }
        
        if (this.parent().sidebar) {
            cfg = {
                tag: 'ul',
                cls: 'dashboard-menu sidebar-menu'
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
    },
    
    setActiveItem : function(item)
    {
        var prev = false;
        Roo.each(this.navItems, function(v){
            if (v == item) {
                return ;
            }
            if (v.isActive()) {
                v.setActive(false, true);
                prev = v;
                
            }
            
        });

        item.setActive(true, true);
        this.fireEvent('changed', this, item, prev);
        
        
    },
    
    addItem : function(cfg)
    {
        var cn = new Roo.bootstrap.NavItem(cfg);
        this.register(cn);
        cn.parentId = this.id;
        cn.onRender(this.el, null);
        return cn;
    },
    
    register : function(item)
    {
        this.navItems.push( item);
        item.navId = this.navId;
    
    },
    getNavItem: function(tabId)
    {
        var ret = false;
        Roo.each(this.navItems, function(e) {
            if (e.tabId == tabId) {
               ret =  e;
               return false;
            }
            return true;
            
        });
        return ret;
    },
    
    
    
    
});

 
Roo.apply(Roo.bootstrap.NavGroup, {
    
    groups: {},
    
    register : function(navgrp)
    {
	this.groups[navgrp.navId] = navgrp;
	
    },
    get: function(navId) {
        return this.groups[navId];
    }
    
    
    
});

 