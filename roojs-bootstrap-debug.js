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
 * @cfg {string} tooltip  Text for the tooltip
 * @cfg {string} container_method method to fetch parents container element (used by NavHeaderbar -  getHeaderChildContainer)
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
    
    tooltip : null,
    /**
     * Initialize Events for the element
     */
    initEvents : function() { },
    
    xattr : false,
    
    parentId : false,
    
    can_build_overlaid : true,
    
    container_method : false,
    
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
        
        if (this.tooltip) {
            this.tooltipEl().attr('tooltip', this.tooltip);
        }
        
        if(this.tabIndex !== undefined){
            this.el.dom.setAttribute('tabIndex', this.tabIndex);
        }
        this.initEvents();
	
        
    },
    /**
     * Fetch the element to add children to
     * @return {Roo.Element} defaults to this.el
     */
    getChildContainer : function()
    {
        return this.el;
    },
    /**
     * Fetch the element to display the tooltip on.
     * @return {Roo.Element} defaults to this.el
     */
    tooltipEl : function()
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
        if (typeof(cn.container_method) == 'string') {
            cntr = cn.container_method;
        }
        
        
        var has_flexy_each =  (typeof(tree['flexy:foreach']) != 'undefined');
        
        var has_flexy_if =  (typeof(tree['flexy:if']) != 'undefined');
        
        var build_from_html =  Roo.XComponent.build_from_html;
          
        var is_body  = (tree.xtype == 'Body') ;
          
        var page_has_body = (Roo.get(document.body).attr('xtype') == 'Roo.bootstrap.Body');
          
        var self_cntr_el = Roo.get(this[cntr](false));
        
        // do not try and build conditional elements 
        if ((has_flexy_each || has_flexy_if || this.can_build_overlaid == false ) && build_from_html) {
            return false;
        }
        
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
        Roo.debug && Roo.log('addxtypeChild:' + cntr);
        var cn = this;
        cntr = (typeof(cntr) == 'undefined' ) ? 'getChildContainer' : cntr;
        
        
        var has_flexy = (typeof(tree['flexy:if']) != 'undefined') ||
                    (typeof(tree['flexy:foreach']) != 'undefined');
          
        
        
         skip_children = false;
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
                
                
                // there is a scenario where some of the child elements are flexy:if (and all of the same type)
                // and are not displayed -this causes this to use up the wrong element when matching.
                // at present the only work around for this is to nest flexy:if elements in another element that is always rendered.
                
                
                if (echild && echild.attr('xtype').split('.').pop() == cn.xtype) {
                  //  Roo.log("found child for " + this.xtype +": " + echild.attr('xtype') );
                  
                  
                  
                    cn.el = echild;
                  //  Roo.log("GOT");
                    //echild.dom.removeAttribute('xtype');
                } else {
                    Roo.debug && Roo.log("MISSING " + cn.xtype + " on child of " + (this.el ? this.el.attr('xbuilderid') : 'no parent'));
                    Roo.debug && Roo.log(self_cntr_el);
                    Roo.debug && Roo.log(echild);
                    Roo.debug && Roo.log(cn);
                }
            }
           
            
           
            // if object has flexy:if - then it may or may not be rendered.
            if (build_from_html && has_flexy && !cn.el &&  cn.can_build_overlaid) {
                // skip a flexy if element.
                Roo.debug && Roo.log('skipping render');
                Roo.debug && Roo.log(tree);
                if (!cn.el) {
                    Roo.debug && Roo.log('skipping all children');
                    skip_children = true;
                }
                
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
        if (!skip_children) {    
            for(var i =0;i < items.length;i++) {
                nitems.push(cn.addxtype(Roo.apply({}, items[i])));
            }
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
 * @cfg {String} weight (  primary | success | info | warning | danger | link ) default 
 * @cfg {String} size ( lg | sm | xs)
 * @cfg {String} tag ( a | input | submit)
 * @cfg {String} href empty or href
 * @cfg {Boolean} disabled default false;
 * @cfg {Boolean} isClose default false;
 * @cfg {String} glyphicon (| adjust | align-center | align-justify | align-left | align-right | arrow-down | arrow-left | arrow-right | arrow-up | asterisk | backward | ban-circle | barcode | bell | bold | book | bookmark | briefcase | bullhorn | calendar | camera | certificate | check | chevron-down | chevron-left | chevron-right | chevron-up | circle-arrow-down | circle-arrow-left | circle-arrow-right | circle-arrow-up | cloud | cloud-download | cloud-upload | cog | collapse-down | collapse-up | comment | compressed | copyright-mark | credit-card | cutlery | dashboard | download | download-alt | earphone | edit | eject | envelope | euro | exclamation-sign | expand | export | eye-close | eye-open | facetime-video | fast-backward | fast-forward | file | film | filter | fire | flag | flash | floppy-disk | floppy-open | floppy-remove | floppy-save | floppy-saved | folder-close | folder-open | font | forward | fullscreen | gbp | gift | glass | globe | hand-down | hand-left | hand-right | hand-up | hd-video | hdd | header | headphones | heart | heart-empty | home | import | inbox | indent-left | indent-right | info-sign | italic | leaf | link | list | list-alt | lock | log-in | log-out | magnet | map-marker | minus | minus-sign | move | music | new-window | off | ok | ok-circle | ok-sign | open | paperclip | pause | pencil | phone | phone-alt | picture | plane | play | play-circle | plus | plus-sign | print | pushpin | qrcode | question-sign | random | record | refresh | registration-mark | remove | remove-circle | remove-sign | repeat | resize-full | resize-horizontal | resize-small | resize-vertical | retweet | road | save | saved | screenshot | sd-video | search | send | share | share-alt | shopping-cart | signal | sort | sort-by-alphabet | sort-by-alphabet-alt | sort-by-attributes | sort-by-attributes-alt | sort-by-order | sort-by-order-alt | sound-5-1 | sound-6-1 | sound-7-1 | sound-dolby | sound-stereo | star | star-empty | stats | step-backward | step-forward | stop | subtitles | tag | tags | tasks | text-height | text-width | th | th-large | th-list | thumbs-down | thumbs-up | time | tint | tower | transfer | trash | tree-conifer | tree-deciduous | unchecked | upload | usd | user | volume-down | volume-off | volume-up | warning-sign | wrench | zoom-in | zoom-out)
 * @cfg {String} badge text for badge
 * @cfg {String} theme default 
 * @cfg {Boolean} inverse 
 * @cfg {Boolean} toggle 
 * @cfg {String} ontext text for on toggle state
 * @cfg {String} offtext text for off toggle state
 * @cfg {Boolean} defaulton 
 * @cfg {Boolean} preventDefault  default true
 * @cfg {Boolean} removeClass remove the standard class..
 * @cfg {String} target  target for a href. (_self|_blank|_parent|_top| other)
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
 * @cfg {Number} xs colspan out of 12 for mobile-sized screens or 0 for hidden
 * @cfg {Number} sm colspan out of 12 for tablet-sized screens or 0 for hidden
 * @cfg {Number} md colspan out of 12 for computer-sized screens or 0 for hidden
 * @cfg {Number} lg colspan out of 12 for large computer-sized screens or 0 for hidden
 * @cfg {Number} xsoff colspan offset out of 12 for mobile-sized screens or 0 for hidden
 * @cfg {Number} smoff colspan offset out of 12 for tablet-sized screens or 0 for hidden
 * @cfg {Number} mdoff colspan offset out of 12 for computer-sized screens or 0 for hidden
 * @cfg {Number} lgoff colspan offset out of 12 for large computer-sized screens or 0 for hidden
 *
 * 
 * @cfg {Boolean} hidden (true|false) hide the element
 * @cfg {String} alert (success|info|warning|danger) type alert (changes background / border...)
 * @cfg {String} fa (ban|check|...) font awesome icon
 * @cfg {Number} fasize (1|2|....) font awsome size

 * @cfg {String} icon (info-sign|check|...) glyphicon name

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
    
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xsoff: false,
    smoff: false,
    mdoff: false,
    lgoff: false,
    html: '',
    offset: 0,
    alert: false,
    fa: false,
    icon : false,
    hidden : false,
    fasize : 1,
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Column.superclass.getAutoCreate.call(this));
        
        cfg = {
            tag: 'div',
            cls: 'column'
        };
        
        var settings=this;
        ['xs','sm','md','lg'].map(function(size){
            //Roo.log( size + ':' + settings[size]);
            
            if (settings[size+'off'] !== false) {
                cfg.cls += ' col-' + size + '-offset-' + settings[size+'off'] ;
            }
            
            if (settings[size] === false) {
                return;
            }
            Roo.log(settings[size]);
            if (!settings[size]) { // 0 = hidden
                cfg.cls += ' hidden-' + size;
                return;
            }
            cfg.cls += ' col-' + size + '-' + settings[size];
            
        });
        
        if (this.hidden) {
            cfg.cls += ' hidden';
        }
        
        if (this.alert && ["success","info","warning", "danger"].indexOf(this.alert) > -1) {
            cfg.cls +=' alert alert-' + this.alert;
        }
        
        
        if (this.html.length) {
            cfg.html = this.html;
        }
        if (this.fa) {
            var fasize = '';
            if (this.fasize > 1) {
                fasize = ' fa-' + this.fasize + 'x';
            }
            cfg.html = '<i class="fa fa-'+this.fa + fasize + '"></i>' + (cfg.html || '');
            
            
        }
        if (this.icon) {
            cfg.html = '<i class="glyphicon glyphicon-'+this.icon + '"></i>' + + (cfg.html || '')
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
 * @cfg {String} alert (success|info|warning|danger) type alert (changes background / border...)
 * @cfg {String} fa (ban|check|...) font awesome icon
 * @cfg {String} icon (info-sign|check|...) glyphicon name
 * @cfg {Boolean} hidden (true|false) hide the element

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
    alert : false,
    fa: false,
    icon : false,
  
     
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
        
        if (this.hidden) {
            cfg.cls += ' hidden';
        }
        
        
        if (this.alert && ["success","info","warning", "danger"].indexOf(this.alert) > -1) {
            cfg.cls +=' alert alert-' + this.alert;
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
            // prefix with the icons..
            if (this.fa) {
                body.html = '<i class="fa fa-'+this.fa + '"></i>' + body.html ;
            }
            if (this.icon) {
                body.html = '<i class="glyphicon glyphicon-'+this.icon + '"></i>' + body.html ;
            }
            
            
        }
        if ((!this.cls || !this.cls.length) && (!cfg.cls || !cfg.cls.length)) {
            cfg.cls =  'container';
        }
        
        return cfg;
    },
    
    titleEl : function()
    {
        if(!this.el || !this.panel.length || !this.header.length){
            return;
        }
        
        return this.el.select('.panel-title',true).first();
    },
    
    setTitle : function(v)
    {
        var titleEl = this.titleEl();
        
        if(!titleEl){
            return;
        }
        
        titleEl.dom.innerHTML = v;
    },
    
    getTitle : function()
    {
        
        var titleEl = this.titleEl();
        
        if(!titleEl){
            return '';
        }
        
        return titleEl.dom.innerHTML;
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
 * @cfg {String} anchor name for the anchor link

 * @cfg {Boolean} preventDefault (true | false) default false

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
    preventDefault: false,
    anchor : false,
    alt : false,

    getAutoCreate : function()
    {
        
        var cfg = {
            tag: 'a'
        };
        // anchor's do not require html/href...
        if (this.anchor === false) {
            cfg.html = this.html || 'html-missing';
            cfg.href = this.href || '#';
        } else {
            cfg.name = this.anchor;
            if (this.html !== false) {
                cfg.html = this.html;
            }
            if (this.href !== false) {
                cfg.href = this.href;
            }
        }
        
        if(this.alt !== false){
            cfg.alt = this.alt;
        }
        
        
        if(this.target !== false) {
            cfg.target = this.target;
        }
        
        return cfg;
    },
    
    initEvents: function() {
        
        if(!this.href || this.preventDefault){
            this.el.on('click', this.onClick, this);
        }
    },
    
    onClick : function(e)
    {
        if(this.preventDefault){
            e.preventDefault();
        }
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
        if(lastShow.getElapsed() > 50 && active.length > 0 && !e.getTarget(".x-menu") && !e.getTarget('.user-menu')){
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
        if(!t || t.isContainer){
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
 * @cfg {Boolean} isContainer (true | false) default false
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
    isContainer : false,
    
    getAutoCreate : function(){
        
        if(this.isContainer){
            return {
                tag: 'li',
                cls: 'dropdown-menu-item'
            };
        }
        
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
 * @cfg {Boolean} specificTitle default false
 * @cfg {Array} buttons Array of buttons or standard button set..
 * @cfg {String} buttonPosition (left|right|center) default right
 * @cfg {Boolean} animate default true
 * @cfg {Boolean} allow_close default true
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
    
    allow_close : true,
    
    animate : true,
    
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
        
        var header = [];
        if (this.allow_close) {
            header.push({
                tag: 'button',
                cls : 'close',
                html : '&times'
            });
        }
        header.push(title);
        
        var modal = {
            cls: "modal",
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
                                    cn : header
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
        
        if(this.animate){
            modal.cls += ' fade';
        }
        
        return modal;
          
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
        
        this.el.setStyle('display', 'block');
        
        if(this.animate){
            var _this = this;
            (function(){ _this.el.addClass('in'); }).defer(50);
        }else{
            this.el.addClass('in');
        }
        
        Roo.get(document.body).addClass("x-body-masked");
        this.maskEl.setSize(Roo.lib.Dom.getViewWidth(true), Roo.lib.Dom.getViewHeight(true));
        this.maskEl.show();
        this.el.setStyle('zIndex', '10001');
        this.fireEvent('show', this);
        
        
    },
    hide : function()
    {
        this.maskEl.hide();
        Roo.get(document.body).removeClass("x-body-masked");
        this.el.removeClass('in');
        
        if(this.animate){
            var _this = this;
            (function(){ _this.el.setStyle('display', 'none'); }).defer(150);
        }else{
            this.el.setStyle('display', 'none');
        }
        
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
 * @cfg {Boolean} srButton generate the (screen reader / mobile) sr-only button   default true
 * @cfg {Boolean} autohide a top nav bar header that hides on scroll.
 * @cfg {Boolean} desktopCenter should the header be centered on desktop using a container class
 * @cfg {Roo.bootstrap.Row} mobilerow - a row to display on mobile only..
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
    srButton : true,
    autohide : false,
    desktopCenter : false,
   
    
    getAutoCreate : function(){
        
        var   cfg = {
            tag: this.nav || 'nav',
            cls: 'navbar',
            role: 'navigation',
            cn: []
        };
        
        var cn = cfg.cn;
        if (this.desktopCenter) {
            cn.push({cls : 'container', cn : []});
            cn = cn[0].cn;
        }
        
        if(this.srButton){
            cn.push({
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
            });
        }
        
        cn.push({
            tag: 'div',
            cls: 'collapse navbar-collapse',
            cn : []
        });
        
        cfg.cls += this.inverse ? ' navbar-inverse' : ' navbar-default';
        
        if (['fixed-top','fixed-bottom','static-top'].indexOf(this.position)>-1) {
            cfg.cls += ' navbar-' + this.position;
            
            // tag can override this..
            
            cfg.tag = this.tag || (this.position  == 'fixed-bottom' ? 'footer' : 'header');
        }
        
        if (this.brand !== '') {
            cn[0].cn.push({
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

        
    },
    getHeaderChildContainer : function()
    {
        if (this.el.select('.navbar-header').getCount()) {
            return this.el.select('.navbar-header',true).first();
        }
        
        return this.getChildContainer();
    },
    
    
    initEvents : function()
    {
        Roo.bootstrap.NavHeaderbar.superclass.initEvents.call(this);
        
        if (this.autohide) {
            
            var prevScroll = 0;
            var ft = this.el;
            
            Roo.get(document).on('scroll',function(e) {
                var ns = Roo.get(document).getScroll().top;
                var os = prevScroll;
                prevScroll = ns;
                
                if(ns > os){
                    ft.removeClass('slideDown');
                    ft.addClass('slideUp');
                    return;
                }
                ft.removeClass('slideUp');
                ft.addClass('slideDown');
                 
              
          },this);
        }
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
	     * @param {Roo.bootstrap.Navbar.Item} selected The item selected
	     * @param {Roo.bootstrap.Navbar.Item} prev The previously selected item 
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
    /**
    * sets the active Navigation item
    * @param {Roo.bootstrap.NavItem} the new current navitem
    */
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
    /**
    * gets the active Navigation item
    * @return {Roo.bootstrap.NavItem} the current navitem
    */
    getActive : function()
    {
        
        var prev = false;
        Roo.each(this.navItems, function(v){
            
            if (v.isActive()) {
                prev = v;
                
            }
            
        });
        return prev;
    },
    
    indexOfNav : function()
    {
        
        var prev = false;
        Roo.each(this.navItems, function(v,i){
            
            if (v.isActive()) {
                prev = i;
                
            }
            
        });
        return prev;
    },
    /**
    * adds a Navigation item
    * @param {Roo.bootstrap.NavItem} the navitem to add
    */
    addItem : function(cfg)
    {
        var cn = new Roo.bootstrap.NavItem(cfg);
        this.register(cn);
        cn.parentId = this.id;
        cn.onRender(this.el, null);
        return cn;
    },
    /**
    * register a Navigation item
    * @param {Roo.bootstrap.NavItem} the navitem to add
    */
    register : function(item)
    {
        this.navItems.push( item);
        item.navId = this.navId;
    
    },
    
    /**
    * clear all the Navigation item
    */
   
    clearAll : function()
    {
        this.navItems = [];
        this.el.dom.innerHTML = '';
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
    
    setActiveNext : function()
    {
        var i = this.indexOfNav(this.getActive());
        if (i > this.navItems.length) {
            return;
        }
        this.setActiveItem(this.navItems[i+1]);
    },
    setActivePrev : function()
    {
        var i = this.indexOfNav(this.getActive());
        if (i  < 1) {
            return;
        }
        this.setActiveItem(this.navItems[i-1]);
    },
    clearWasActive : function(except) {
        Roo.each(this.navItems, function(e) {
            if (e.tabId != except.tabId && e.was_active) {
               e.was_active = false;
               return false;
            }
            return true;
            
        });
    },
    getWasActive : function ()
    {
        var r = false;
        Roo.each(this.navItems, function(e) {
            if (e.was_active) {
               r = e;
               return false;
            }
            return true;
            
        });
        return r;
    }
    
    
});

 
Roo.apply(Roo.bootstrap.NavGroup, {
    
    groups: {},
     /**
    * register a Navigation Group
    * @param {Roo.bootstrap.NavGroup} the navgroup to add
    */
    register : function(navgrp)
    {
        this.groups[navgrp.navId] = navgrp;
	
    },
    /**
    * fetch a Navigation Group based on the navigation ID
    * @param {string} the navgroup to add
    * @returns {Roo.bootstrap.NavGroup} the navgroup 
    */
    get: function(navId) {
        if (typeof(this.groups[navId]) == 'undefined') {
            return false;
            //this.register(new Roo.bootstrap.NavGroup({ navId : navId }));
        }
        return this.groups[navId] ;
    }
    
    
    
});

 /*
 * - LGPL
 *
 * row
 * 
 */

/**
 * @class Roo.bootstrap.NavItem
 * @extends Roo.bootstrap.Component
 * Bootstrap Navbar.NavItem class
 * @cfg {String} href  link to
 * @cfg {String} html content of button
 * @cfg {String} badge text inside badge
 * @cfg {String} badgecls (bg-green|bg-red|bg-yellow)the extra classes for the badge
 * @cfg {String} glyphicon name of glyphicon
 * @cfg {String} icon name of font awesome icon
 * @cfg {Boolean} active Is item active
 * @cfg {Boolean} disabled Is item disabled
 
 * @cfg {Boolean} preventDefault (true | false) default false
 * @cfg {String} tabId the tab that this item activates.
 * @cfg {String} tagtype (a|span) render as a href or span?
  
 * @constructor
 * Create a new Navbar Item
 * @param {Object} config The config object
 */
Roo.bootstrap.NavItem = function(config){
    Roo.bootstrap.NavItem.superclass.constructor.call(this, config);
    this.addEvents({
        // raw events
        /**
         * @event click
         * The raw click event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "click" : true,
	 /**
	    * @event changed
	    * Fires when the active item active state changes
	    * @param {Roo.bootstrap.NavItem} this
	    * @param {boolean} state the new state
	     
         */
        'changed': true
    });
   
};

Roo.extend(Roo.bootstrap.NavItem, Roo.bootstrap.Component,  {
    
    href: false,
    html: '',
    badge: '',
    icon: false,
    glyphicon: false,
    active: false,
    preventDefault : false,
    tabId : false,
    tagtype : 'a',
    disabled : false,
    
    was_active : false,
    
    getAutoCreate : function(){
         
        var cfg = {
            tag: 'li',
            cls: 'nav-item'
            
        }
        if (this.active) {
            cfg.cls = typeof(cfg.cls) == 'undefined' ? 'active' : cfg.cls + ' active';
        }
        if (this.disabled) {
            cfg.cls += ' disabled';
        }
        
        if (this.href || this.html || this.glyphicon || this.icon) {
            cfg.cn = [
                {
                    tag: this.tagtype,
                    href : this.href || "#",
                    html: this.html || ''
                }
            ];
            
            if (this.icon) {
                cfg.cn[0].html = '<i class="'+this.icon+'"></i> <span>' + cfg.cn[0].html + '</span>'
            }

            if(this.glyphicon) {
                cfg.cn[0].html = '<span class="glyphicon glyphicon-' + this.glyphicon + '"></span> '  + cfg.cn[0].html;
            }
            
            if (this.menu) {
                
                cfg.cn[0].html += " <span class='caret'></span>";
             
            }
            
            if (this.badge !== '') {
                 
                cfg.cn[0].html += ' <span class="badge">' + this.badge + '</span>';
            }
        }
        
        
        
        return cfg;
    },
    initEvents: function() 
    {
        if (typeof (this.menu) != 'undefined') {
            this.menu.parentType = this.xtype;
            this.menu.triggerEl = this.el;
            this.addxtype(Roo.apply({}, this.menu));
        }
        
        this.el.select('a',true).on('click', this.onClick, this);
        
        if(this.tagtype == 'span'){
            this.el.select('span',true).on('click', this.onClick, this);
        }
       
        // at this point parent should be available..
        this.parent().register(this);
    },
    
    onClick : function(e)
    {
         
        if(this.preventDefault){
            e.preventDefault();
        }
        if (this.disabled) {
            return;
        }
        
        var tg = Roo.bootstrap.TabGroup.get(this.navId);
        if (tg && tg.transition) {
            Roo.log("waiting for the transitionend");
            return;
        }
        
        Roo.log("fire event clicked");
        if(this.fireEvent('click', this, e) === false){
            return;
        };
        
        if(this.tagtype == 'span'){
            return;
        }
        
        var p = this.parent();
        if (['tabs','pills'].indexOf(p.type)!==-1) {
            if (typeof(p.setActiveItem) !== 'undefined') {
                p.setActiveItem(this);
            }
        }
        // if parent is a navbarheader....- and link is probably a '#' page ref.. then remove the expanded menu.
        if (p.parentType == 'NavHeaderbar' && !this.menu) {
            // remove the collapsed menu expand...
            p.parent().el.select('.navbar-collapse',true).removeClass('in');  
        }
        
    },
    
    isActive: function () {
        return this.active
    },
    setActive : function(state, fire, is_was_active)
    {
        if (this.active && !state & this.navId) {
            this.was_active = true;
            var nv = Roo.bootstrap.NavGroup.get(this.navId);
            if (nv) {
                nv.clearWasActive(this);
            }
            
        }
        this.active = state;
        
        if (!state ) {
            this.el.removeClass('active');
        } else if (!this.el.hasClass('active')) {
            this.el.addClass('active');
        }
        if (fire) {
            this.fireEvent('changed', this, state);
        }
        
        // show a panel if it's registered and related..
        
        if (!this.navId || !this.tabId || !state || is_was_active) {
            return;
        }
        
        var tg = Roo.bootstrap.TabGroup.get(this.navId);
        if (!tg) {
            return;
        }
        var pan = tg.getPanelByName(this.tabId);
        if (!pan) {
            return;
        }
        // if we can not flip to new panel - go back to old nav highlight..
        if (false == tg.showPanel(pan)) {
            var nv = Roo.bootstrap.NavGroup.get(this.navId);
            if (nv) {
                var onav = nv.getWasActive();
                if (onav) {
                    onav.setActive(true, false, true);
                }
            }
            
        }
        
        
	
    },
     // this should not be here...
    setDisabled : function(state)
    {
        this.disabled = state;
        if (!state ) {
            this.el.removeClass('disabled');
        } else if (!this.el.hasClass('disabled')) {
            this.el.addClass('disabled');
        }
        
    },
    
    /**
     * Fetch the element to display the tooltip on.
     * @return {Roo.Element} defaults to this.el
     */
    tooltipEl : function()
    {
        return this.el.select('' + this.tagtype + '', true).first();
    }
});
 

 /*
 * - LGPL
 *
 * sidebar item
 *
 *  li
 *    <span> icon </span>
 *    <span> text </span>
 *    <span>badge </span>
 */

/**
 * @class Roo.bootstrap.NavSidebarItem
 * @extends Roo.bootstrap.NavItem
 * Bootstrap Navbar.NavSidebarItem class
 * @constructor
 * Create a new Navbar Button
 * @param {Object} config The config object
 */
Roo.bootstrap.NavSidebarItem = function(config){
    Roo.bootstrap.NavSidebarItem.superclass.constructor.call(this, config);
    this.addEvents({
        // raw events
        /**
         * @event click
         * The raw click event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "click" : true,
	 /**
	    * @event changed
	    * Fires when the active item active state changes
	    * @param {Roo.bootstrap.NavSidebarItem} this
	    * @param {boolean} state the new state
	     
         */
        'changed': true
    });
   
};

Roo.extend(Roo.bootstrap.NavSidebarItem, Roo.bootstrap.NavItem,  {
    
    
    getAutoCreate : function(){
        
        
        var a = {
                tag: 'a',
                href : this.href || '#',
                cls: '',
                html : '',
                cn : []
        };
        var cfg = {
            tag: 'li',
            cls: '',
            cn: [ a ]
        }
        var span = {
            tag: 'span',
            html : this.html || ''
        }
        
        
        if (this.active) {
            cfg.cls += ' active';
        }
        
        // left icon..
        if (this.glyphicon || this.icon) {
            var c = this.glyphicon  ? ('glyphicon glyphicon-'+this.glyphicon)  : this.icon;
            a.cn.push({ tag : 'i', cls : c }) ;
        }
        // html..
        a.cn.push(span);
        // then badge..
        if (this.badge !== '') {
            a.cn.push({ tag: 'span',  cls : 'badge pull-right ' + (this.badgecls || ''), html: this.badge }); 
        }
        // fi
        if (this.menu) {
            a.cn.push({ tag : 'i', cls : 'glyphicon glyphicon-chevron-down pull-right'});
            a.cls += 'dropdown-toggle treeview' ;
            
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
            cls: this.cls,
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
    
    getAutoCreate : function(){
        var cfg = {
            tag: 'ul',
                cls: 'pagination'
        };
        if (this.inverse) {
            cfg.cls += ' inverse';
        }
        if (this.html) {
            cfg.html=this.html;
        }
        if (this.cls) {
            cfg.cls += " " + this.cls;
        }
        return cfg;
    }
   
});

 

 /*
 * - LGPL
 *
 * Pagination item
 * 
 */


/**
 * @class Roo.bootstrap.PaginationItem
 * @extends Roo.bootstrap.Component
 * Bootstrap PaginationItem class
 * @cfg {String} html text
 * @cfg {String} href the link
 * @cfg {Boolean} preventDefault (true | false) default true
 * @cfg {Boolean} active (true | false) default false
 * 
 * 
 * @constructor
 * Create a new PaginationItem
 * @param {Object} config The config object
 */


Roo.bootstrap.PaginationItem = function(config){
    Roo.bootstrap.PaginationItem.superclass.constructor.call(this, config);
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

Roo.extend(Roo.bootstrap.PaginationItem, Roo.bootstrap.Component,  {
    
    href : false,
    html : false,
    preventDefault: true,
    active : false,
    cls : false,
    
    getAutoCreate : function(){
        var cfg= {
	    tag: 'li',
	    cn: [
		{
		    tag : 'a',
		    href : this.href ? this.href : '#',
		    html : this.html ? this.html : ''
		}
	    ]
        };
        
        if(this.cls){
            cfg.cls = this.cls;
        }
        
        if(this.active){
            cfg.cls = typeof(cfg.cls) !== 'undefined' ? cfg.cls + ' active' : 'active';
        }
	
        return cfg;
    },
    
    initEvents: function() {
        
        this.el.on('click', this.onClick, this);
        
    },
    onClick : function(e)
    {
        Roo.log('PaginationItem on click ');
        if(this.preventDefault){
            e.preventDefault();
        }
        
        this.fireEvent('click', this, e);
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
 * @class Roo.grid.ColumnModel
 * @extends Roo.util.Observable
 * This is the default implementation of a ColumnModel used by the Grid. It defines
 * the columns in the grid.
 * <br>Usage:<br>
 <pre><code>
 var colModel = new Roo.grid.ColumnModel([
	{header: "Ticker", width: 60, sortable: true, locked: true},
	{header: "Company Name", width: 150, sortable: true},
	{header: "Market Cap.", width: 100, sortable: true},
	{header: "$ Sales", width: 100, sortable: true, renderer: money},
	{header: "Employees", width: 100, sortable: true, resizable: false}
 ]);
 </code></pre>
 * <p>
 
 * The config options listed for this class are options which may appear in each
 * individual column definition.
 * <br/>RooJS Fix - column id's are not sequential but use Roo.id() - fixes bugs with layouts.
 * @constructor
 * @param {Object} config An Array of column config objects. See this class's
 * config objects for details.
*/
Roo.grid.ColumnModel = function(config){
	/**
     * The config passed into the constructor
     */
    this.config = config;
    this.lookup = {};

    // if no id, create one
    // if the column does not have a dataIndex mapping,
    // map it to the order it is in the config
    for(var i = 0, len = config.length; i < len; i++){
        var c = config[i];
        if(typeof c.dataIndex == "undefined"){
            c.dataIndex = i;
        }
        if(typeof c.renderer == "string"){
            c.renderer = Roo.util.Format[c.renderer];
        }
        if(typeof c.id == "undefined"){
            c.id = Roo.id();
        }
        if(c.editor && c.editor.xtype){
            c.editor  = Roo.factory(c.editor, Roo.grid);
        }
        if(c.editor && c.editor.isFormField){
            c.editor = new Roo.grid.GridEditor(c.editor);
        }
        this.lookup[c.id] = c;
    }

    /**
     * The width of columns which have no width specified (defaults to 100)
     * @type Number
     */
    this.defaultWidth = 100;

    /**
     * Default sortable of columns which have no sortable specified (defaults to false)
     * @type Boolean
     */
    this.defaultSortable = false;

    this.addEvents({
        /**
	     * @event widthchange
	     * Fires when the width of a column changes.
	     * @param {ColumnModel} this
	     * @param {Number} columnIndex The column index
	     * @param {Number} newWidth The new width
	     */
	    "widthchange": true,
        /**
	     * @event headerchange
	     * Fires when the text of a header changes.
	     * @param {ColumnModel} this
	     * @param {Number} columnIndex The column index
	     * @param {Number} newText The new header text
	     */
	    "headerchange": true,
        /**
	     * @event hiddenchange
	     * Fires when a column is hidden or "unhidden".
	     * @param {ColumnModel} this
	     * @param {Number} columnIndex The column index
	     * @param {Boolean} hidden true if hidden, false otherwise
	     */
	    "hiddenchange": true,
	    /**
         * @event columnmoved
         * Fires when a column is moved.
         * @param {ColumnModel} this
         * @param {Number} oldIndex
         * @param {Number} newIndex
         */
        "columnmoved" : true,
        /**
         * @event columlockchange
         * Fires when a column's locked state is changed
         * @param {ColumnModel} this
         * @param {Number} colIndex
         * @param {Boolean} locked true if locked
         */
        "columnlockchange" : true
    });
    Roo.grid.ColumnModel.superclass.constructor.call(this);
};
Roo.extend(Roo.grid.ColumnModel, Roo.util.Observable, {
    /**
     * @cfg {String} header The header text to display in the Grid view.
     */
    /**
     * @cfg {String} dataIndex (Optional) The name of the field in the grid's {@link Roo.data.Store}'s
     * {@link Roo.data.Record} definition from which to draw the column's value. If not
     * specified, the column's index is used as an index into the Record's data Array.
     */
    /**
     * @cfg {Number} width (Optional) The initial width in pixels of the column. Using this
     * instead of {@link Roo.grid.Grid#autoSizeColumns} is more efficient.
     */
    /**
     * @cfg {Boolean} sortable (Optional) True if sorting is to be allowed on this column.
     * Defaults to the value of the {@link #defaultSortable} property.
     * Whether local/remote sorting is used is specified in {@link Roo.data.Store#remoteSort}.
     */
    /**
     * @cfg {Boolean} locked (Optional) True to lock the column in place while scrolling the Grid.  Defaults to false.
     */
    /**
     * @cfg {Boolean} fixed (Optional) True if the column width cannot be changed.  Defaults to false.
     */
    /**
     * @cfg {Boolean} resizable (Optional) False to disable column resizing. Defaults to true.
     */
    /**
     * @cfg {Boolean} hidden (Optional) True to hide the column. Defaults to false.
     */
    /**
     * @cfg {Function} renderer (Optional) A function used to generate HTML markup for a cell
     * given the cell's data value. See {@link #setRenderer}. If not specified, the
     * default renderer uses the raw data value. If an object is returned (bootstrap only)
     * then it is treated as a Roo Component object instance, and it is rendered after the initial row is rendered
     */
       /**
     * @cfg {Roo.grid.GridEditor} editor (Optional) For grid editors - returns the grid editor 
     */
    /**
     * @cfg {String} align (Optional) Set the CSS text-align property of the column.  Defaults to undefined.
     */
    /**
     * @cfg {String} cursor (Optional)
     */
    /**
     * Returns the id of the column at the specified index.
     * @param {Number} index The column index
     * @return {String} the id
     */
    getColumnId : function(index){
        return this.config[index].id;
    },

    /**
     * Returns the column for a specified id.
     * @param {String} id The column id
     * @return {Object} the column
     */
    getColumnById : function(id){
        return this.lookup[id];
    },

    
    /**
     * Returns the column for a specified dataIndex.
     * @param {String} dataIndex The column dataIndex
     * @return {Object|Boolean} the column or false if not found
     */
    getColumnByDataIndex: function(dataIndex){
        var index = this.findColumnIndex(dataIndex);
        return index > -1 ? this.config[index] : false;
    },
    
    /**
     * Returns the index for a specified column id.
     * @param {String} id The column id
     * @return {Number} the index, or -1 if not found
     */
    getIndexById : function(id){
        for(var i = 0, len = this.config.length; i < len; i++){
            if(this.config[i].id == id){
                return i;
            }
        }
        return -1;
    },
    
    /**
     * Returns the index for a specified column dataIndex.
     * @param {String} dataIndex The column dataIndex
     * @return {Number} the index, or -1 if not found
     */
    
    findColumnIndex : function(dataIndex){
        for(var i = 0, len = this.config.length; i < len; i++){
            if(this.config[i].dataIndex == dataIndex){
                return i;
            }
        }
        return -1;
    },
    
    
    moveColumn : function(oldIndex, newIndex){
        var c = this.config[oldIndex];
        this.config.splice(oldIndex, 1);
        this.config.splice(newIndex, 0, c);
        this.dataMap = null;
        this.fireEvent("columnmoved", this, oldIndex, newIndex);
    },

    isLocked : function(colIndex){
        return this.config[colIndex].locked === true;
    },

    setLocked : function(colIndex, value, suppressEvent){
        if(this.isLocked(colIndex) == value){
            return;
        }
        this.config[colIndex].locked = value;
        if(!suppressEvent){
            this.fireEvent("columnlockchange", this, colIndex, value);
        }
    },

    getTotalLockedWidth : function(){
        var totalWidth = 0;
        for(var i = 0; i < this.config.length; i++){
            if(this.isLocked(i) && !this.isHidden(i)){
                this.totalWidth += this.getColumnWidth(i);
            }
        }
        return totalWidth;
    },

    getLockedCount : function(){
        for(var i = 0, len = this.config.length; i < len; i++){
            if(!this.isLocked(i)){
                return i;
            }
        }
    },

    /**
     * Returns the number of columns.
     * @return {Number}
     */
    getColumnCount : function(visibleOnly){
        if(visibleOnly === true){
            var c = 0;
            for(var i = 0, len = this.config.length; i < len; i++){
                if(!this.isHidden(i)){
                    c++;
                }
            }
            return c;
        }
        return this.config.length;
    },

    /**
     * Returns the column configs that return true by the passed function that is called with (columnConfig, index)
     * @param {Function} fn
     * @param {Object} scope (optional)
     * @return {Array} result
     */
    getColumnsBy : function(fn, scope){
        var r = [];
        for(var i = 0, len = this.config.length; i < len; i++){
            var c = this.config[i];
            if(fn.call(scope||this, c, i) === true){
                r[r.length] = c;
            }
        }
        return r;
    },

    /**
     * Returns true if the specified column is sortable.
     * @param {Number} col The column index
     * @return {Boolean}
     */
    isSortable : function(col){
        if(typeof this.config[col].sortable == "undefined"){
            return this.defaultSortable;
        }
        return this.config[col].sortable;
    },

    /**
     * Returns the rendering (formatting) function defined for the column.
     * @param {Number} col The column index.
     * @return {Function} The function used to render the cell. See {@link #setRenderer}.
     */
    getRenderer : function(col){
        if(!this.config[col].renderer){
            return Roo.grid.ColumnModel.defaultRenderer;
        }
        return this.config[col].renderer;
    },

    /**
     * Sets the rendering (formatting) function for a column.
     * @param {Number} col The column index
     * @param {Function} fn The function to use to process the cell's raw data
     * to return HTML markup for the grid view. The render function is called with
     * the following parameters:<ul>
     * <li>Data value.</li>
     * <li>Cell metadata. An object in which you may set the following attributes:<ul>
     * <li>css A CSS style string to apply to the table cell.</li>
     * <li>attr An HTML attribute definition string to apply to the data container element <i>within</i> the table cell.</li></ul>
     * <li>The {@link Roo.data.Record} from which the data was extracted.</li>
     * <li>Row index</li>
     * <li>Column index</li>
     * <li>The {@link Roo.data.Store} object from which the Record was extracted</li></ul>
     */
    setRenderer : function(col, fn){
        this.config[col].renderer = fn;
    },

    /**
     * Returns the width for the specified column.
     * @param {Number} col The column index
     * @return {Number}
     */
    getColumnWidth : function(col){
        return this.config[col].width * 1 || this.defaultWidth;
    },

    /**
     * Sets the width for a column.
     * @param {Number} col The column index
     * @param {Number} width The new width
     */
    setColumnWidth : function(col, width, suppressEvent){
        this.config[col].width = width;
        this.totalWidth = null;
        if(!suppressEvent){
             this.fireEvent("widthchange", this, col, width);
        }
    },

    /**
     * Returns the total width of all columns.
     * @param {Boolean} includeHidden True to include hidden column widths
     * @return {Number}
     */
    getTotalWidth : function(includeHidden){
        if(!this.totalWidth){
            this.totalWidth = 0;
            for(var i = 0, len = this.config.length; i < len; i++){
                if(includeHidden || !this.isHidden(i)){
                    this.totalWidth += this.getColumnWidth(i);
                }
            }
        }
        return this.totalWidth;
    },

    /**
     * Returns the header for the specified column.
     * @param {Number} col The column index
     * @return {String}
     */
    getColumnHeader : function(col){
        return this.config[col].header;
    },

    /**
     * Sets the header for a column.
     * @param {Number} col The column index
     * @param {String} header The new header
     */
    setColumnHeader : function(col, header){
        this.config[col].header = header;
        this.fireEvent("headerchange", this, col, header);
    },

    /**
     * Returns the tooltip for the specified column.
     * @param {Number} col The column index
     * @return {String}
     */
    getColumnTooltip : function(col){
            return this.config[col].tooltip;
    },
    /**
     * Sets the tooltip for a column.
     * @param {Number} col The column index
     * @param {String} tooltip The new tooltip
     */
    setColumnTooltip : function(col, tooltip){
            this.config[col].tooltip = tooltip;
    },

    /**
     * Returns the dataIndex for the specified column.
     * @param {Number} col The column index
     * @return {Number}
     */
    getDataIndex : function(col){
        return this.config[col].dataIndex;
    },

    /**
     * Sets the dataIndex for a column.
     * @param {Number} col The column index
     * @param {Number} dataIndex The new dataIndex
     */
    setDataIndex : function(col, dataIndex){
        this.config[col].dataIndex = dataIndex;
    },

    
    
    /**
     * Returns true if the cell is editable.
     * @param {Number} colIndex The column index
     * @param {Number} rowIndex The row index
     * @return {Boolean}
     */
    isCellEditable : function(colIndex, rowIndex){
        return (this.config[colIndex].editable || (typeof this.config[colIndex].editable == "undefined" && this.config[colIndex].editor)) ? true : false;
    },

    /**
     * Returns the editor defined for the cell/column.
     * return false or null to disable editing.
     * @param {Number} colIndex The column index
     * @param {Number} rowIndex The row index
     * @return {Object}
     */
    getCellEditor : function(colIndex, rowIndex){
        return this.config[colIndex].editor;
    },

    /**
     * Sets if a column is editable.
     * @param {Number} col The column index
     * @param {Boolean} editable True if the column is editable
     */
    setEditable : function(col, editable){
        this.config[col].editable = editable;
    },


    /**
     * Returns true if the column is hidden.
     * @param {Number} colIndex The column index
     * @return {Boolean}
     */
    isHidden : function(colIndex){
        return this.config[colIndex].hidden;
    },


    /**
     * Returns true if the column width cannot be changed
     */
    isFixed : function(colIndex){
        return this.config[colIndex].fixed;
    },

    /**
     * Returns true if the column can be resized
     * @return {Boolean}
     */
    isResizable : function(colIndex){
        return colIndex >= 0 && this.config[colIndex].resizable !== false && this.config[colIndex].fixed !== true;
    },
    /**
     * Sets if a column is hidden.
     * @param {Number} colIndex The column index
     * @param {Boolean} hidden True if the column is hidden
     */
    setHidden : function(colIndex, hidden){
        this.config[colIndex].hidden = hidden;
        this.totalWidth = null;
        this.fireEvent("hiddenchange", this, colIndex, hidden);
    },

    /**
     * Sets the editor for a column.
     * @param {Number} col The column index
     * @param {Object} editor The editor object
     */
    setEditor : function(col, editor){
        this.config[col].editor = editor;
    }
});

Roo.grid.ColumnModel.defaultRenderer = function(value){
	if(typeof value == "string" && value.length < 1){
	    return "&#160;";
	}
	return value;
};

// Alias for backwards compatibility
Roo.grid.DefaultColumnModel = Roo.grid.ColumnModel;
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
 * @class Roo.LoadMask
 * A simple utility class for generically masking elements while loading data.  If the element being masked has
 * an underlying {@link Roo.data.Store}, the masking will be automatically synchronized with the store's loading
 * process and the mask element will be cached for reuse.  For all other elements, this mask will replace the
 * element's UpdateManager load indicator and will be destroyed after the initial load.
 * @constructor
 * Create a new LoadMask
 * @param {String/HTMLElement/Roo.Element} el The element or DOM node, or its id
 * @param {Object} config The config object
 */
Roo.LoadMask = function(el, config){
    this.el = Roo.get(el);
    Roo.apply(this, config);
    if(this.store){
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.on('load', this.onLoad, this);
        this.store.on('loadexception', this.onLoadException, this);
        this.removeMask = false;
    }else{
        var um = this.el.getUpdateManager();
        um.showLoadIndicator = false; // disable the default indicator
        um.on('beforeupdate', this.onBeforeLoad, this);
        um.on('update', this.onLoad, this);
        um.on('failure', this.onLoad, this);
        this.removeMask = true;
    }
};

Roo.LoadMask.prototype = {
    /**
     * @cfg {Boolean} removeMask
     * True to create a single-use mask that is automatically destroyed after loading (useful for page loads),
     * False to persist the mask element reference for multiple uses (e.g., for paged data widgets).  Defaults to false.
     */
    /**
     * @cfg {String} msg
     * The text to display in a centered loading message box (defaults to 'Loading...')
     */
    msg : 'Loading...',
    /**
     * @cfg {String} msgCls
     * The CSS class to apply to the loading message element (defaults to "x-mask-loading")
     */
    msgCls : 'x-mask-loading',

    /**
     * Read-only. True if the mask is currently disabled so that it will not be displayed (defaults to false)
     * @type Boolean
     */
    disabled: false,

    /**
     * Disables the mask to prevent it from being displayed
     */
    disable : function(){
       this.disabled = true;
    },

    /**
     * Enables the mask so that it can be displayed
     */
    enable : function(){
        this.disabled = false;
    },
    
    onLoadException : function()
    {
        Roo.log(arguments);
        
        if (typeof(arguments[3]) != 'undefined') {
            Roo.MessageBox.alert("Error loading",arguments[3]);
        } 
        /*
        try {
            if (this.store && typeof(this.store.reader.jsonData.errorMsg) != 'undefined') {
                Roo.MessageBox.alert("Error loading",this.store.reader.jsonData.errorMsg);
            }   
        } catch(e) {
            
        }
        */
    
        
        
        this.el.unmask(this.removeMask);
    },
    // private
    onLoad : function()
    {
        this.el.unmask(this.removeMask);
    },

    // private
    onBeforeLoad : function(){
        if(!this.disabled){
            this.el.mask(this.msg, this.msgCls);
        }
    },

    // private
    destroy : function(){
        if(this.store){
            this.store.un('beforeload', this.onBeforeLoad, this);
            this.store.un('load', this.onLoad, this);
            this.store.un('loadexception', this.onLoadException, this);
        }else{
            var um = this.el.getUpdateManager();
            um.un('beforeupdate', this.onBeforeLoad, this);
            um.un('update', this.onLoad, this);
            um.un('failure', this.onLoad, this);
        }
    }
};/*
 * - LGPL
 *
 * table
 * 
 */

/**
 * @class Roo.bootstrap.Table
 * @extends Roo.bootstrap.Component
 * Bootstrap Table class
 * @cfg {String} cls table class
 * @cfg {String} align (left|center|right) Specifies the alignment of a table according to surrounding text
 * @cfg {String} bgcolor Specifies the background color for a table
 * @cfg {Number} border Specifies whether the table cells should have borders or not
 * @cfg {Number} cellpadding Specifies the space between the cell wall and the cell content
 * @cfg {Number} cellspacing Specifies the space between cells
 * @cfg {String} frame Specifies which parts of the outside borders that should be visible
 * @cfg {String} rules Specifies which parts of the inside borders that should be visible
 * @cfg {String} sortable Specifies that the table should be sortable
 * @cfg {String} summary Specifies a summary of the content of a table
 * @cfg {Number} width Specifies the width of a table
 * @cfg {String} layout table layout (auto | fixed | initial | inherit)
 * 
 * @cfg {boolean} striped Should the rows be alternative striped
 * @cfg {boolean} bordered Add borders to the table
 * @cfg {boolean} hover Add hover highlighting
 * @cfg {boolean} condensed Format condensed
 * @cfg {boolean} responsive Format condensed
 * @cfg {Boolean} loadMask (true|false) default false
 * @cfg {Boolean} tfoot (true|false) generate tfoot, default true
 * @cfg {Boolean} thead (true|false) generate thead, default true
 * @cfg {Boolean} RowSelection (true|false) default false
 * @cfg {Boolean} CellSelection (true|false) default false
 * @cfg {Roo.bootstrap.PagingToolbar} footer  a paging toolbar
 
 * 
 * @constructor
 * Create a new Table
 * @param {Object} config The config object
 */

Roo.bootstrap.Table = function(config){
    Roo.bootstrap.Table.superclass.constructor.call(this, config);
    
    if (this.sm) {
        this.selModel = Roo.factory(this.sm, Roo.bootstrap.Table);
        this.sm = this.selModel;
        this.sm.xmodule = this.xmodule || false;
    }
    if (this.cm && typeof(this.cm.config) == 'undefined') {
        this.colModel = new Roo.grid.ColumnModel(this.cm);
        this.cm = this.colModel;
        this.cm.xmodule = this.xmodule || false;
    }
    if (this.store) {
        this.store= Roo.factory(this.store, Roo.data);
        this.ds = this.store;
        this.ds.xmodule = this.xmodule || false;
         
    }
    if (this.footer && this.store) {
        this.footer.dataSource = this.ds;
        this.footer = Roo.factory(this.footer);
    }
    
    /** @private */
    this.addEvents({
        /**
         * @event cellclick
         * Fires when a cell is clicked
         * @param {Roo.bootstrap.Table} this
         * @param {Roo.Element} el
         * @param {Number} rowIndex
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "cellclick" : true,
        /**
         * @event celldblclick
         * Fires when a cell is double clicked
         * @param {Roo.bootstrap.Table} this
         * @param {Roo.Element} el
         * @param {Number} rowIndex
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "celldblclick" : true,
        /**
         * @event rowclick
         * Fires when a row is clicked
         * @param {Roo.bootstrap.Table} this
         * @param {Roo.Element} el
         * @param {Number} rowIndex
         * @param {Roo.EventObject} e
         */
        "rowclick" : true,
        /**
         * @event rowdblclick
         * Fires when a row is double clicked
         * @param {Roo.bootstrap.Table} this
         * @param {Roo.Element} el
         * @param {Number} rowIndex
         * @param {Roo.EventObject} e
         */
        "rowdblclick" : true,
        /**
         * @event mouseover
         * Fires when a mouseover occur
         * @param {Roo.bootstrap.Table} this
         * @param {Roo.Element} el
         * @param {Number} rowIndex
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "mouseover" : true,
        /**
         * @event mouseout
         * Fires when a mouseout occur
         * @param {Roo.bootstrap.Table} this
         * @param {Roo.Element} el
         * @param {Number} rowIndex
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "mouseout" : true,
        /**
         * @event rowclass
         * Fires when a row is rendered, so you can change add a style to it.
         * @param {Roo.bootstrap.Table} this
         * @param {Object} rowcfg   contains record  rowIndex colIndex and rowClass - set rowClass to add a style.
         */
        'rowclass' : true
        
    });
};

Roo.extend(Roo.bootstrap.Table, Roo.bootstrap.Component,  {
    
    cls: false,
    align: false,
    bgcolor: false,
    border: false,
    cellpadding: false,
    cellspacing: false,
    frame: false,
    rules: false,
    sortable: false,
    summary: false,
    width: false,
    striped : false,
    bordered: false,
    hover:  false,
    condensed : false,
    responsive : false,
    sm : false,
    cm : false,
    store : false,
    loadMask : false,
    tfoot : true,
    thead : true,
    RowSelection : false,
    CellSelection : false,
    layout : false,
    
    // Roo.Element - the tbody
    mainBody: false, 
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Table.superclass.getAutoCreate.call(this));
        
        cfg = {
            tag: 'table',
            cls : 'table',
            cn : []
        }
            
        if (this.striped) {
            cfg.cls += ' table-striped';
        }
        
        if (this.hover) {
            cfg.cls += ' table-hover';
        }
        if (this.bordered) {
            cfg.cls += ' table-bordered';
        }
        if (this.condensed) {
            cfg.cls += ' table-condensed';
        }
        if (this.responsive) {
            cfg.cls += ' table-responsive';
        }
        
        if (this.cls) {
            cfg.cls+=  ' ' +this.cls;
        }
        
        // this lot should be simplifed...
        
        if (this.align) {
            cfg.align=this.align;
        }
        if (this.bgcolor) {
            cfg.bgcolor=this.bgcolor;
        }
        if (this.border) {
            cfg.border=this.border;
        }
        if (this.cellpadding) {
            cfg.cellpadding=this.cellpadding;
        }
        if (this.cellspacing) {
            cfg.cellspacing=this.cellspacing;
        }
        if (this.frame) {
            cfg.frame=this.frame;
        }
        if (this.rules) {
            cfg.rules=this.rules;
        }
        if (this.sortable) {
            cfg.sortable=this.sortable;
        }
        if (this.summary) {
            cfg.summary=this.summary;
        }
        if (this.width) {
            cfg.width=this.width;
        }
        if (this.layout) {
            cfg.style = (typeof(cfg.style) == 'undefined') ? ('table-layout:' + this.layout + ';') : (cfg.style + ('table-layout:' + this.layout + ';'));
        }
        
        if(this.store || this.cm){
            if(this.thead){
                cfg.cn.push(this.renderHeader());
            }
            
            cfg.cn.push(this.renderBody());
            
            if(this.tfoot){
                cfg.cn.push(this.renderFooter());
            }
            
            cfg.cls+=  ' TableGrid';
        }
        
        return { cn : [ cfg ] };
    },
    
    initEvents : function()
    {   
        if(!this.store || !this.cm){
            return;
        }
        
        //Roo.log('initEvents with ds!!!!');
        
        this.mainBody = this.el.select('tbody', true).first();
        
        
        var _this = this;
        
        Roo.each(this.el.select('thead th.sortable', true).elements, function(e){
            e.on('click', _this.sort, _this);
        });
        
        this.el.on("click", this.onClick, this);
        this.el.on("dblclick", this.onDblClick, this);
        
        this.parent().el.setStyle('position', 'relative');
        if (this.footer) {
            this.footer.parentId = this.id;
            this.footer.onRender(this.el.select('tfoot tr td').first(), null);        
        }
        
        this.maskEl = new Roo.LoadMask(this.el, { store : this.ds, msgCls: 'roo-el-mask-msg' });
        
        this.store.on('load', this.onLoad, this);
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.on('update', this.onUpdate, this);
        this.store.on('add', this.onAdd, this);
        
    },
    
    onMouseover : function(e, el)
    {
        var cell = Roo.get(el);
        
        if(!cell){
            return;
        }
        
        if(e.getTarget().nodeName.toLowerCase() != 'td'){
            cell = cell.findParent('td', false, true);
        }
        
        var row = cell.findParent('tr', false, true);
        var cellIndex = cell.dom.cellIndex;
        var rowIndex = row.dom.rowIndex - 1; // start from 0
        
        this.fireEvent('mouseover', this, cell, rowIndex, cellIndex, e);
        
    },
    
    onMouseout : function(e, el)
    {
        var cell = Roo.get(el);
        
        if(!cell){
            return;
        }
        
        if(e.getTarget().nodeName.toLowerCase() != 'td'){
            cell = cell.findParent('td', false, true);
        }
        
        var row = cell.findParent('tr', false, true);
        var cellIndex = cell.dom.cellIndex;
        var rowIndex = row.dom.rowIndex - 1; // start from 0
        
        this.fireEvent('mouseout', this, cell, rowIndex, cellIndex, e);
        
    },
    
    onClick : function(e, el)
    {
        var cell = Roo.get(el);
        
        if(!cell || (!this.CellSelection && !this.RowSelection)){
            return;
        }
        
        
        if(e.getTarget().nodeName.toLowerCase() != 'td'){
            cell = cell.findParent('td', false, true);
        }
        
        var row = cell.findParent('tr', false, true);
        var cellIndex = cell.dom.cellIndex;
        var rowIndex = row.dom.rowIndex - 1;
        
        if(this.CellSelection){
            this.fireEvent('cellclick', this, cell, rowIndex, cellIndex, e);
        }
        
        if(this.RowSelection){
            this.fireEvent('rowclick', this, row, rowIndex, e);
        }
        
        
    },
    
    onDblClick : function(e,el)
    {
        var cell = Roo.get(el);
        
        if(!cell || (!this.CellSelection && !this.RowSelection)){
            return;
        }
        
        if(e.getTarget().nodeName.toLowerCase() != 'td'){
            cell = cell.findParent('td', false, true);
        }
        
        var row = cell.findParent('tr', false, true);
        var cellIndex = cell.dom.cellIndex;
        var rowIndex = row.dom.rowIndex - 1;
        
        if(this.CellSelection){
            this.fireEvent('celldblclick', this, cell, rowIndex, cellIndex, e);
        }
        
        if(this.RowSelection){
            this.fireEvent('rowdblclick', this, row, rowIndex, e);
        }
    },
    
    sort : function(e,el)
    {
        var col = Roo.get(el)
        
        if(!col.hasClass('sortable')){
            return;
        }
        
        var sort = col.attr('sort');
        var dir = 'ASC';
        
        if(col.hasClass('glyphicon-arrow-up')){
            dir = 'DESC';
        }
        
        this.store.sortInfo = {field : sort, direction : dir};
        
        if (this.footer) {
            Roo.log("calling footer first");
            this.footer.onClick('first');
        } else {
        
            this.store.load({ params : { start : 0 } });
        }
    },
    
    renderHeader : function()
    {
        var header = {
            tag: 'thead',
            cn : []
        };
        
        var cm = this.cm;
        
        for(var i = 0, len = cm.getColumnCount(); i < len; i++){
            
            var config = cm.config[i];
                    
            var c = {
                tag: 'th',
                style : '',
                html: cm.getColumnHeader(i)
            };
            
            if(typeof(config.hidden) != 'undefined' && config.hidden){
                c.style += ' display:none;';
            }
            
            if(typeof(config.dataIndex) != 'undefined'){
                c.sort = config.dataIndex;
            }
            
            if(typeof(config.sortable) != 'undefined' && config.sortable){
                c.cls = 'sortable';
            }
            
            if(typeof(config.align) != 'undefined' && config.align.length){
                c.style += ' text-align:' + config.align + ';';
            }
            
            if(typeof(config.width) != 'undefined'){
                c.style += ' width:' + config.width + 'px;';
            }
            
            header.cn.push(c)
        }
        
        return header;
    },
    
    renderBody : function()
    {
        var body = {
            tag: 'tbody',
            cn : [
                {
                    tag: 'tr',
                    cn : [
                        {
                            tag : 'td',
                            colspan :  this.cm.getColumnCount()
                        }
                    ]
                }
            ]
        };
        
        return body;
    },
    
    renderFooter : function()
    {
        var footer = {
            tag: 'tfoot',
            cn : [
                {
                    tag: 'tr',
                    cn : [
                        {
                            tag : 'td',
                            colspan :  this.cm.getColumnCount()
                        }
                    ]
                }
            ]
        };
        
        return footer;
    },
    
    
    
    onLoad : function()
    {
        Roo.log('ds onload');
        this.clear();
        
        var _this = this;
        var cm = this.cm;
        var ds = this.store;
        
        Roo.each(this.el.select('thead th.sortable', true).elements, function(e){
            e.removeClass(['glyphicon', 'glyphicon-arrow-up', 'glyphicon-arrow-down']);
            
            if(e.hasClass('sortable') && e.attr('sort') == _this.store.sortInfo.field && _this.store.sortInfo.direction.toUpperCase() == 'ASC'){
                e.addClass(['glyphicon', 'glyphicon-arrow-up']);
            }
            
            if(e.hasClass('sortable') && e.attr('sort') == _this.store.sortInfo.field && _this.store.sortInfo.direction.toUpperCase() == 'DESC'){
                e.addClass(['glyphicon', 'glyphicon-arrow-down']);
            }
        });
        
        var tbody =  this.mainBody;
              
        if(ds.getCount() > 0){
            ds.data.each(function(d,rowIndex){
                var row =  this.renderRow(cm, ds, rowIndex);
                
                tbody.createChild(row);
                
                var _this = this;
                
                if(row.cellObjects.length){
                    Roo.each(row.cellObjects, function(r){
                        _this.renderCellObject(r);
                    })
                }
                
            }, this);
        }
        
        Roo.each(this.el.select('tbody td', true).elements, function(e){
            e.on('mouseover', _this.onMouseover, _this);
        });
        
        Roo.each(this.el.select('tbody td', true).elements, function(e){
            e.on('mouseout', _this.onMouseout, _this);
        });

        //if(this.loadMask){
        //    this.maskEl.hide();
        //}
    },
    
    
    onUpdate : function(ds,record)
    {
        this.refreshRow(record);
    },
    onRemove : function(ds, record, index, isUpdate){
        if(isUpdate !== true){
            this.fireEvent("beforerowremoved", this, index, record);
        }
        var bt = this.mainBody.dom;
        if(bt.rows[index]){
            bt.removeChild(bt.rows[index]);
        }
        
        if(isUpdate !== true){
            //this.stripeRows(index);
            //this.syncRowHeights(index, index);
            //this.layout();
            this.fireEvent("rowremoved", this, index, record);
        }
    },
    
    onAdd : function(ds, records, rowIndex)
    {
        //Roo.log('on Add called');
        // - note this does not handle multiple adding very well..
        var bt = this.mainBody.dom;
        for (var i =0 ; i < records.length;i++) {
            //Roo.log('call insert row Add called on ' + rowIndex + ':' + i);
            //Roo.log(records[i]);
            //Roo.log(this.store.getAt(rowIndex+i));
            this.insertRow(this.store, rowIndex + i, false);
            return;
        }
        
    },
    
    
    refreshRow : function(record){
        var ds = this.store, index;
        if(typeof record == 'number'){
            index = record;
            record = ds.getAt(index);
        }else{
            index = ds.indexOf(record);
        }
        this.insertRow(ds, index, true);
        this.onRemove(ds, record, index+1, true);
        //this.syncRowHeights(index, index);
        //this.layout();
        this.fireEvent("rowupdated", this, index, record);
    },
    
    insertRow : function(dm, rowIndex, isUpdate){
        
        if(!isUpdate){
            this.fireEvent("beforerowsinserted", this, rowIndex);
        }
            //var s = this.getScrollState();
        var row = this.renderRow(this.cm, this.store, rowIndex);
        // insert before rowIndex..
        var e = this.mainBody.createChild(row,this.getRowDom(rowIndex));
        
        var _this = this;
                
        if(row.cellObjects.length){
            Roo.each(row.cellObjects, function(r){
                _this.renderCellObject(r);
            })
        }
            
        if(!isUpdate){
            this.fireEvent("rowsinserted", this, rowIndex);
            //this.syncRowHeights(firstRow, lastRow);
            //this.stripeRows(firstRow);
            //this.layout();
        }
        
    },
    
    
    getRowDom : function(rowIndex)
    {
        // not sure if I need to check this.. but let's do it anyway..
        return (this.mainBody.dom.rows && (rowIndex-1) < this.mainBody.dom.rows.length ) ?
                this.mainBody.dom.rows[rowIndex] : false
    },
    // returns the object tree for a tr..
  
    
    renderRow : function(cm, ds, rowIndex) {
        
        var d = ds.getAt(rowIndex);
        
        var row = {
            tag : 'tr',
            cn : []
        };
            
        var cellObjects = [];
        
        for(var i = 0, len = cm.getColumnCount(); i < len; i++){
            var config = cm.config[i];
            
            var renderer = cm.getRenderer(i);
            var value = '';
            var id = false;
            
            if(typeof(renderer) !== 'undefined'){
                value = renderer(d.data[cm.getDataIndex(i)], false, d);
            }
            // if object are returned, then they are expected to be Roo.bootstrap.Component instances
            // and are rendered into the cells after the row is rendered - using the id for the element.
            
            if(typeof(value) === 'object'){
                id = Roo.id();
                cellObjects.push({
                    container : id,
                    cfg : value 
                })
            }
            
            var rowcfg = {
                record: d,
                rowIndex : rowIndex,
                colIndex : i,
                rowClass : ''
            }

            this.fireEvent('rowclass', this, rowcfg);
            
            var td = {
                tag: 'td',
                cls : rowcfg.rowClass,
                style: '',
                html: (typeof(value) === 'object') ? '' : value
            };
            
            if (id) {
                td.id = id;
            }
            
            if(typeof(config.hidden) != 'undefined' && config.hidden){
                td.style += ' display:none;';
            }
            
            if(typeof(config.align) != 'undefined' && config.align.length){
                td.style += ' text-align:' + config.align + ';';
            }
            
            if(typeof(config.width) != 'undefined'){
                td.style += ' width:' +  config.width + 'px;';
            }
            
            if(typeof(config.cursor) != 'undefined'){
                td.style += ' cursor:' +  config.cursor + ';';
            }
             
            row.cn.push(td);
           
        }
        
        row.cellObjects = cellObjects;
        
        return row;
          
    },
    
    
    
    onBeforeLoad : function()
    {
        //Roo.log('ds onBeforeLoad');
        
        //this.clear();
        
        //if(this.loadMask){
        //    this.maskEl.show();
        //}
    },
     /**
     * Remove all rows
     */
    clear : function()
    {
        this.el.select('tbody', true).first().dom.innerHTML = '';
    },
    /**
     * Show or hide a row.
     * @param {Number} rowIndex to show or hide
     * @param {Boolean} state hide
     */
    setRowVisibility : function(rowIndex, state)
    {
        var bt = this.mainBody.dom;
        if(typeof(bt.rows[index]) == 'undefined'){
            return;
        }
        bt.rows[index].style.display = state ? '' : 'none';
    },
    
    
    getSelectionModel : function(){
        if(!this.selModel){
            this.selModel = new Roo.bootstrap.Table.RowSelectionModel();
        }
        return this.selModel;
    },
    /*
     * Render the Roo.bootstrap object from renderder
     */
    renderCellObject : function(r)
    {
        var _this = this;
        
        var t = r.cfg.render(r.container);
        
        if(r.cfg.cn){
            Roo.each(r.cfg.cn, function(c){
                var child = {
                    container: t.getChildContainer(),
                    cfg: c
                }
                _this.renderCellObject(child);
            })
        }
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
 * @cfg {String} html cell contain text
 * @cfg {String} cls cell class
 * @cfg {String} tag cell tag (td|th) default td
 * @cfg {String} abbr Specifies an abbreviated version of the content in a cell
 * @cfg {String} align Aligns the content in a cell
 * @cfg {String} axis Categorizes cells
 * @cfg {String} bgcolor Specifies the background color of a cell
 * @cfg {Number} charoff Sets the number of characters the content will be aligned from the character specified by the char attribute
 * @cfg {Number} colspan Specifies the number of columns a cell should span
 * @cfg {String} headers Specifies one or more header cells a cell is related to
 * @cfg {Number} height Sets the height of a cell
 * @cfg {String} nowrap Specifies that the content inside a cell should not wrap
 * @cfg {Number} rowspan Sets the number of rows a cell should span
 * @cfg {String} scope Defines a way to associate header cells and data cells in a table
 * @cfg {String} valign Vertical aligns the content in a cell
 * @cfg {Number} width Specifies the width of a cell
 * 
 * @constructor
 * Create a new TableCell
 * @param {Object} config The config object
 */

Roo.bootstrap.TableCell = function(config){
    Roo.bootstrap.TableCell.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.TableCell, Roo.bootstrap.Component,  {
    
    html: false,
    cls: false,
    tag: false,
    abbr: false,
    align: false,
    axis: false,
    bgcolor: false,
    charoff: false,
    colspan: false,
    headers: false,
    height: false,
    nowrap: false,
    rowspan: false,
    scope: false,
    valign: false,
    width: false,
    
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.TableCell.superclass.getAutoCreate.call(this));
	
	cfg = {
	    tag: 'td'
	}
        
        if(this.tag){
            cfg.tag = this.tag;
        }
        
        if (this.html) {
            cfg.html=this.html
        }
        if (this.cls) {
            cfg.cls=this.cls
        }
        if (this.abbr) {
            cfg.abbr=this.abbr
        }
        if (this.align) {
            cfg.align=this.align
        }
        if (this.axis) {
            cfg.axis=this.axis
        }
        if (this.bgcolor) {
            cfg.bgcolor=this.bgcolor
        }
        if (this.charoff) {
            cfg.charoff=this.charoff
        }
        if (this.colspan) {
            cfg.colspan=this.colspan
        }
        if (this.headers) {
            cfg.headers=this.headers
        }
        if (this.height) {
            cfg.height=this.height
        }
        if (this.nowrap) {
            cfg.nowrap=this.nowrap
        }
        if (this.rowspan) {
            cfg.rowspan=this.rowspan
        }
        if (this.scope) {
            cfg.scope=this.scope
        }
        if (this.valign) {
            cfg.valign=this.valign
        }
        if (this.width) {
            cfg.width=this.width
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
 * @cfg {String} cls row class
 * @cfg {String} align Aligns the content in a table row
 * @cfg {String} bgcolor Specifies a background color for a table row
 * @cfg {Number} charoff Sets the number of characters the content will be aligned from the character specified by the char attribute
 * @cfg {String} valign Vertical aligns the content in a table row
 * 
 * @constructor
 * Create a new TableRow
 * @param {Object} config The config object
 */

Roo.bootstrap.TableRow = function(config){
    Roo.bootstrap.TableRow.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.TableRow, Roo.bootstrap.Component,  {
    
    cls: false,
    align: false,
    bgcolor: false,
    charoff: false,
    valign: false,
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.TableRow.superclass.getAutoCreate.call(this));
	
        cfg = {
            tag: 'tr'
        }
            
        if(this.cls){
            cfg.cls = this.cls;
        }
        if(this.align){
            cfg.align = this.align;
        }
        if(this.bgcolor){
            cfg.bgcolor = this.bgcolor;
        }
        if(this.charoff){
            cfg.charoff = this.charoff;
        }
        if(this.valign){
            cfg.valign = this.valign;
        }
	
        return cfg;
    }
   
});

 

 /*
 * - LGPL
 *
 * table body
 * 
 */

/**
 * @class Roo.bootstrap.TableBody
 * @extends Roo.bootstrap.Component
 * Bootstrap TableBody class
 * @cfg {String} cls element class
 * @cfg {String} tag element tag (thead|tbody|tfoot) default tbody
 * @cfg {String} align Aligns the content inside the element
 * @cfg {Number} charoff Sets the number of characters the content inside the element will be aligned from the character specified by the char attribute
 * @cfg {String} valign Vertical aligns the content inside the <tbody> element
 * 
 * @constructor
 * Create a new TableBody
 * @param {Object} config The config object
 */

Roo.bootstrap.TableBody = function(config){
    Roo.bootstrap.TableBody.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.TableBody, Roo.bootstrap.Component,  {
    
    cls: false,
    tag: false,
    align: false,
    charoff: false,
    valign: false,
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.TableBody.superclass.getAutoCreate.call(this));
	
        cfg = {
            tag: 'tbody'
        }
            
        if (this.cls) {
            cfg.cls=this.cls
        }
        if(this.tag){
            cfg.tag = this.tag;
        }
	
        if(this.align){
            cfg.align = this.align;
        }
        if(this.charoff){
            cfg.charoff = this.charoff;
        }
        if(this.valign){
            cfg.valign = this.valign;
        }
        
        return cfg;
    }
    
    
//    initEvents : function()
//    {
//        
//        if(!this.store){
//            return;
//        }
//        
//        this.store = Roo.factory(this.store, Roo.data);
//        this.store.on('load', this.onLoad, this);
//        
//        this.store.load();
//        
//    },
//    
//    onLoad: function () 
//    {   
//        this.fireEvent('load', this);
//    }
//    
//   
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
 * @cfg {Boolean} loadMask load mask when submit (default true)

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
    
    loadMask : true,
    
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
        // this was added as random key presses on the form where triggering form submit.
        this.el.on('keypress', function(e) {
            if (e.getCharCode() != 13) {
                return true;
            }
            // we might need to allow it for textareas.. and some other items.
            // check e.getTarget().
            
            if(e.getTarget().nodeName.toLowerCase() === 'textarea'){
                return true;
            }
        
            Roo.log("keypress blocked");
            
            e.preventDefault();
            return false;
        });
        
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
        
        if(this.loadMask){
            this.el.mask(o.waitMsg || "Sending", 'x-mask-loading');
        }
        // not really supported yet.. ??
        
        //if(this.waitMsgTarget === true){
        //  this.el.mask(o.waitMsg || "Sending", 'x-mask-loading');
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
 * @cfg {string} value default value of the input
 * @cfg {Number} labelWidth set the width of label (0-12)
 * @cfg {String} labelAlign (top|left)
 * @cfg {Boolean} readOnly Specifies that the field should be read-only
 * @cfg {String} align (left|center|right) Default left
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
    value : '',
    labelWidth : 2,
    labelAlign : false,
    readOnly : false,
    align : false,
    formatedValue : false,
    
    parentLabelAlign : function()
    {
        var parent = this;
        while (parent.parent()) {
            parent = parent.parent();
            if (typeof(parent.labelAlign) !='undefined') {
                return parent.labelAlign;
            }
        }
        return 'left';
        
    },
    
    getAutoCreate : function(){
        
        var align = (!this.labelAlign) ? this.parentLabelAlign() : this.labelAlign;
        
        var id = Roo.id();
        
        var cfg = {};
        
        if(this.inputType != 'hidden'){
            cfg.cls = 'form-group' //input-group
        }
        
        var input =  {
            tag: 'input',
            id : id,
            type : this.inputType,
            value : this.value,
            cls : 'form-control',
            placeholder : this.placeholder || ''
            
        };
        
        if(this.align){
            input.style = (typeof(input.style) == 'undefined') ? ('text-align:' + this.align) : (input.style + 'text-align:' + this.align);
        }
        
        if(this.maxLength && this.maxLength != Number.MAX_VALUE){
            input.maxLength = this.maxLength;
        }
        
        if (this.disabled) {
            input.disabled=true;
        }
        
        if (this.readOnly) {
            input.readonly=true;
        }
        
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
            if (this.before && typeof(this.before) == 'string') {
                
                inputblock.cn.push({
                    tag :'span',
                    cls : 'roo-input-before input-group-addon',
                    html : this.before
                });
            }
            if (this.before && typeof(this.before) == 'object') {
                this.before = Roo.factory(this.before);
                Roo.log(this.before);
                inputblock.cn.push({
                    tag :'span',
                    cls : 'roo-input-before input-group-' +
                        (this.before.xtype == 'Button' ? 'btn' : 'addon')  //?? what about checkboxes - that looks like a bit of a hack thought? 
                });
            }
            
            inputblock.cn.push(input);
            
            if (this.after && typeof(this.after) == 'string') {
                inputblock.cn.push({
                    tag :'span',
                    cls : 'roo-input-after input-group-addon',
                    html : this.after
                });
            }
            if (this.after && typeof(this.after) == 'object') {
                this.after = Roo.factory(this.after);
                Roo.log(this.after);
                inputblock.cn.push({
                    tag :'span',
                    cls : 'roo-input-after input-group-' +
                        (this.after.xtype == 'Button' ? 'btn' : 'addon')  //?? what about checkboxes - that looks like a bit of a hack thought? 
                });
            }
        };
        
        if (align ==='left' && this.fieldLabel.length) {
                Roo.log("left and has label");
                cfg.cn = [
                    
                    {
                        tag: 'label',
                        'for' :  id,
                        cls : 'control-label col-sm-' + this.labelWidth,
                        html : this.fieldLabel
                        
                    },
                    {
                        cls : "col-sm-" + (12 - this.labelWidth), 
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
                
                
        };
        Roo.log('input-parentType: ' + this.parentType);
        
        if (this.parentType === 'Navbar' &&  this.parent().bar) {
           cfg.cls += ' navbar-form';
           Roo.log(cfg);
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
    
    tooltipEl : function()
    {
        return this.inputEl();
    },
    
    setDisabled : function(v)
    {
        var i  = this.inputEl().dom;
        if (!v) {
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
        
        if (typeof(this.before) == 'object') {
            this.before.render(this.el.select('.roo-input-before',true).first());
        }
        if (typeof(this.after) == 'object') {
            this.after.render(this.el.select('.roo-input-after',true).first());
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
     * Sets the underlying DOM field's value directly, bypassing validation.  To set the value with validation see {@link #setValue}.
     * @param {Mixed} value The value to set
     */
    setRawValue : function(v){
        return this.inputEl().dom.value = (v === null || v === undefined ? '' : v);
    },
    
    selectText : function(start, end){
        var v = this.getRawValue();
        if(v.length > 0){
            start = start === undefined ? 0 : start;
            end = end === undefined ? v.length : end;
            var d = this.inputEl().dom;
            if(d.setSelectionRange){
                d.setSelectionRange(start, end);
            }else if(d.createTextRange){
                var range = d.createTextRange();
                range.moveStart("character", start);
                range.moveEnd("character", v.length-end);
                range.select();
            }
        }
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
    },
    adjustWidth : function(tag, w){
        tag = tag.toLowerCase();
        if(typeof w == 'number' && Roo.isStrict && !Roo.isSafari){
            if(Roo.isIE && (tag == 'input' || tag == 'textarea')){
                if(tag == 'input'){
                    return w + 2;
                }
                if(tag == 'textarea'){
                    return w-2;
                }
            }else if(Roo.isOpera){
                if(tag == 'input'){
                    return w + 2;
                }
                if(tag == 'textarea'){
                    return w-2;
                }
            }
        }
        return w;
    }
    
});

 
/*
 * - LGPL
 *
 * Input
 * 
 */

/**
 * @class Roo.bootstrap.TextArea
 * @extends Roo.bootstrap.Input
 * Bootstrap TextArea class
 * @cfg {Number} cols Specifies the visible width of a text area
 * @cfg {Number} rows Specifies the visible number of lines in a text area
 * @cfg {string} wrap (soft|hard)Specifies how the text in a text area is to be wrapped when submitted in a form
 * @cfg {string} resize (none|both|horizontal|vertical|inherit|initial)
 * @cfg {string} html text
 * 
 * @constructor
 * Create a new TextArea
 * @param {Object} config The config object
 */

Roo.bootstrap.TextArea = function(config){
    Roo.bootstrap.TextArea.superclass.constructor.call(this, config);
   
};

Roo.extend(Roo.bootstrap.TextArea, Roo.bootstrap.Input,  {
     
    cols : false,
    rows : 5,
    readOnly : false,
    warp : 'soft',
    resize : false,
    value: false,
    html: false,
    
    getAutoCreate : function(){
        
        var align = (!this.labelAlign) ? this.parentLabelAlign() : this.labelAlign;
        
        var id = Roo.id();
        
        var cfg = {};
        
        var input =  {
            tag: 'textarea',
            id : id,
            warp : this.warp,
            rows : this.rows,
            value : this.value || '',
            html: this.html || '',
            cls : 'form-control',
            placeholder : this.placeholder || '' 
            
        };
        
        if(this.maxLength && this.maxLength != Number.MAX_VALUE){
            input.maxLength = this.maxLength;
        }
        
        if(this.resize){
            input.style = (typeof(input.style) == 'undefined') ? 'resize:' + this.resize : input.style + 'resize:' + this.resize;
        }
        
        if(this.cols){
            input.cols = this.cols;
        }
        
        if (this.readOnly) {
            input.readonly = true;
        }
        
        if (this.name) {
            input.name = this.name;
        }
        
        if (this.size) {
            input.cls = (typeof(input.cls) == 'undefined') ? 'input-' + this.size : input.cls + ' input-' + this.size;
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
        
        if (align ==='left' && this.fieldLabel.length) {
                Roo.log("left and has label");
                cfg.cn = [
                    
                    {
                        tag: 'label',
                        'for' :  id,
                        cls : 'control-label col-sm-' + this.labelWidth,
                        html : this.fieldLabel
                        
                    },
                    {
                        cls : "col-sm-" + (12 - this.labelWidth), 
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
     * return the real textarea element.
     */
    inputEl: function ()
    {
        return this.el.select('textarea.form-control',true).first();
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
 * @cfg {String} caret (search|calendar) a fontawesome for the trigger icon see http://fortawesome.github.io/Font-Awesome/icons/

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
    
    caret : false,
    
    
    getAutoCreate : function(){
       
        var align = this.labelAlign || this.parentLabelAlign();
        
        var id = Roo.id();
        
        var cfg = {
            cls: 'form-group' //input-group
        };
        
        
        var input =  {
            tag: 'input',
            id : id,
            type : this.inputType,
            cls : 'form-control',
            autocomplete: 'false',
            placeholder : this.placeholder || '' 
            
        };
        if (this.name) {
            input.name = this.name;
        }
        if (this.size) {
            input.cls += ' input-' + this.size;
        }
        
        if (this.disabled) {
            input.disabled=true;
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
            
        };
        
        var box = {
            tag: 'div',
            cn: [
                {
                    tag: 'input',
                    type : 'hidden',
                    cls: 'form-hidden-field'
                },
                inputblock
            ]
            
        };
        
        if(this.multiple){
            Roo.log('multiple');
            
            box = {
                tag: 'div',
                cn: [
                    {
                        tag: 'input',
                        type : 'hidden',
                        cls: 'form-hidden-field'
                    },
                    {
                        tag: 'ul',
                        cls: 'select2-choices',
                        cn:[
                            {
                                tag: 'li',
                                cls: 'select2-search-field',
                                cn: [

                                    inputblock
                                ]
                            }
                        ]
                    }
                ]
            }
        };
        
        var combobox = {
            cls: 'select2-container input-group',
            cn: [
                box
//                {
//                    tag: 'ul',
//                    cls: 'typeahead typeahead-long dropdown-menu',
//                    style: 'display:none'
//                }
            ]
        };
        
        if(!this.multiple && this.showToggleBtn){
            
            var caret = {
                        tag: 'span',
                        cls: 'caret'
             };
            if (this.caret != false) {
                caret = {
                     tag: 'i',
                     cls: 'fa fa-' + this.caret
                };
                
            }
            
            combobox.cn.push({
                tag :'span',
                cls : 'input-group-addon btn dropdown-toggle',
                cn : [
                    caret,
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

            })
        }
        
        if(this.multiple){
            combobox.cls += ' select2-container-multi';
        }
        
        if (align ==='left' && this.fieldLabel.length) {
            
                Roo.log("left and has label");
                cfg.cn = [
                    
                    {
                        tag: 'label',
                        'for' :  id,
                        cls : 'control-label col-sm-' + this.labelWidth,
                        html : this.fieldLabel
                        
                    },
                    {
                        cls : "col-sm-" + (12 - this.labelWidth), 
                        cn: [
                            combobox
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
                    
                    combobox
                    
                ];

        } else {
            
                Roo.log(" no label && no align");
                cfg = combobox
                     
                
        }
         
        var settings=this;
        ['xs','sm','md','lg'].map(function(size){
            if (settings[size]) {
                cfg.cls += ' col-' + size + '-' + settings[size];
            }
        });
        
        return cfg;
        
    },
    
    
    
    // private
    onResize : function(w, h){
//        Roo.bootstrap.TriggerField.superclass.onResize.apply(this, arguments);
//        if(typeof w == 'number'){
//            var x = w - this.trigger.getWidth();
//            this.inputEl().setWidth(this.adjustWidth('input', x));
//            this.trigger.setStyle('left', x+'px');
//        }
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
        
        this.createList();
        
        Roo.bootstrap.TriggerField.superclass.initEvents.call(this);
        //this.wrap = this.el.wrap({cls: "x-form-field-wrap"});
        if(!this.multiple && this.showToggleBtn){
            this.trigger = this.el.select('span.dropdown-toggle',true).first();
            if(this.hideTrigger){
                this.trigger.setDisplayed(false);
            }
            this.trigger.on("click", this.onTriggerClick, this, {preventDefault:true});
        }
        
        if(this.multiple){
            this.inputEl().on("click", this.onTriggerClick, this, {preventDefault:true});
        }
        
        //this.trigger.addClassOnOver('x-form-trigger-over');
        //this.trigger.addClassOnClick('x-form-trigger-click');
        
        //if(!this.width){
        //    this.wrap.setWidth(this.el.getWidth()+this.trigger.getWidth());
        //}
    },
    
    createList : function()
    {
        this.list = Roo.get(document.body).createChild({
            tag: 'ul',
            cls: 'typeahead typeahead-long dropdown-menu',
            style: 'display:none'
        });
        
        this.list.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';;
        
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
        this.inputEl().dom.disabled = true;
        //Roo.bootstrap.TriggerField.superclass.onDisable.call(this);
        //if(this.wrap){
        //    this.wrap.addClass('x-item-disabled');
        //}
    },

    // private
    onEnable : function(){
        this.inputEl().dom.disabled = false;
        //Roo.bootstrap.TriggerField.superclass.onEnable.call(this);
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
    },
    
    moveIndex : function(data, type)
    {
        var index = this.indexOf(data);
        
        var newIndex = index + type;
        
        this.remove(data);
        
        this.insert(newIndex, data);
        
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
            f = Record ? Record.prototype.fields : null, fi = f ? f.items : [], fl = f ? f.length : 0;

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
 * @cfg {Boolean} append (true|false) default false
 * @cfg {Boolean} autoFocus (true|false) auto focus the first item, default true
 * @cfg {Boolean} tickable ComboBox with tickable selections (true|false), default false
 * @cfg {Boolean} triggerList trigger show the list or not (true|false) default true
 * @cfg {Boolean} showToggleBtn show toggle button or not (true|false) default true
 * @cfg {String} btnPosition set the position of the trigger button (left | right) default right
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
        'edit' : true,
        /**
         * @event remove
         * Fires when the remove value from the combobox array
	     * @param {Roo.bootstrap.ComboBox} combo This combo box
	     */
        'remove' : true
        
    });
    
    this.item = [];
    this.tickItems = [];
    
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
    
    /**
     * @cfg {Boolean} multiple  (true|false) ComboBobArray, default false
     */
    multiple : false,
    
    //private
    addicon : false,
    editicon: false,
    
    page: 0,
    hasQuery: false,
    append: false,
    loadNext: false,
    autoFocus : true,
    tickable : false,
    btnPosition : 'right',
    triggerList : true,
    showToggleBtn : true,
    // element that contains real text value.. (when hidden is used..)
    
    getAutoCreate : function()
    {
        var cfg = false;
        
        /*
         *  Normal ComboBox
         */
        if(!this.tickable){
            cfg = Roo.bootstrap.ComboBox.superclass.getAutoCreate.call(this);
            return cfg;
        }
        
        /*
         *  ComboBox with tickable selections
         */
             
        var align = this.labelAlign || this.parentLabelAlign();
        
        cfg = {
            cls : 'form-group roo-combobox-tickable' //input-group
        };
        
        
        var buttons = {
            tag : 'div',
            cls : 'tickable-buttons',
            cn : [
                {
                    tag : 'button',
                    type : 'button',
                    cls : 'btn btn-link btn-edit pull-' + this.btnPosition,
                    html : 'Edit'
                },
                {
                    tag : 'button',
                    type : 'button',
                    name : 'ok',
                    cls : 'btn btn-link btn-ok pull-' + this.btnPosition,
                    html : 'Done'
                },
                {
                    tag : 'button',
                    type : 'button',
                    name : 'cancel',
                    cls : 'btn btn-link btn-cancel pull-' + this.btnPosition,
                    html : 'Cancel'
                }
            ]
        };
        
        var _this = this;
        Roo.each(buttons.cn, function(c){
            if (_this.size) {
                c.cls += ' btn-' + _this.size;
            }

            if (_this.disabled) {
                c.disabled = true;
            }
        });
        
        var box = {
            tag: 'div',
            cn: [
                {
                    tag: 'input',
                    type : 'hidden',
                    cls: 'form-hidden-field'
                },
                {
                    tag: 'ul',
                    cls: 'select2-choices',
                    cn:[
                        {
                            tag: 'li',
                            cls: 'select2-search-field',
                            cn: [

                                buttons
                            ]
                        }
                    ]
                }
            ]
        }
        
        var combobox = {
            cls: 'select2-container input-group select2-container-multi',
            cn: [
                box
//                {
//                    tag: 'ul',
//                    cls: 'typeahead typeahead-long dropdown-menu',
//                    style: 'display:none; max-height:' + this.maxHeight + 'px;'
//                }
            ]
        };
        
        if (align ==='left' && this.fieldLabel.length) {
            
                Roo.log("left and has label");
                cfg.cn = [
                    
                    {
                        tag: 'label',
                        'for' :  id,
                        cls : 'control-label col-sm-' + this.labelWidth,
                        html : this.fieldLabel
                        
                    },
                    {
                        cls : "col-sm-" + (12 - this.labelWidth), 
                        cn: [
                            combobox
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
                    
                    combobox
                    
                ];

        } else {
            
                Roo.log(" no label && no align");
                cfg = combobox
                     
                
        }
         
        var settings=this;
        ['xs','sm','md','lg'].map(function(size){
            if (settings[size]) {
                cfg.cls += ' col-' + size + '-' + settings[size];
            }
        });
        
        return cfg;
        
    },
    
    // private
    initEvents: function()
    {
        
        if (!this.store) {
            throw "can not find store for combo";
        }
        this.store = Roo.factory(this.store, Roo.data);
        
        if(this.tickable){
            this.initTickableEvents();
            return;
        }
        
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
        
        //this.list = new Roo.Layer({
        //    shadow: this.shadow, cls: [cls, this.listClass].join(' '), constrain:false
        //});
        
        var _this = this;
        
        (function(){
            var lw = _this.listWidth || Math.max(_this.inputEl().getWidth(), _this.minListWidth);
            _this.list.setWidth(lw);
        }).defer(100);
        
        this.list.on('mouseover', this.onViewOver, this);
        this.list.on('mousemove', this.onViewMove, this);
        
        this.list.on('scroll', this.onViewScroll, this);
        
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

        this.view = new Roo.View(this.list, this.tpl, {
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
//                this.onViewClick();
                //return true;
                this.collapse();
                
                if(this.fireEvent("specialkey", this, e)){
                    this.onViewClick(false);
                }
                
                return true;
            },

            "esc" : function(e){
                this.collapse();
            },

            "tab" : function(e){
                this.collapse();
                
                if(this.fireEvent("specialkey", this, e)){
                    this.onViewClick(false);
                }
                
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
            this.inputEl().on('blur', this.doForce, this);
        }
        
        if(this.multiple){
            this.choices = this.el.select('ul.select2-choices', true).first();
            this.searchField = this.el.select('ul li.select2-search-field', true).first();
        }
    },
    
    initTickableEvents: function()
    {   
        this.createList();
        
        if(this.hiddenName){
            
            this.hiddenField = this.el.select('input.form-hidden-field',true).first();
            
            this.hiddenField.dom.value =
                this.hiddenValue !== undefined ? this.hiddenValue :
                this.value !== undefined ? this.value : '';

            // prevent input submission
            this.el.dom.removeAttribute('name');
            this.hiddenField.dom.setAttribute('name', this.hiddenName);
             
             
        }
        
//        this.list = this.el.select('ul.dropdown-menu',true).first();
        
        this.choices = this.el.select('ul.select2-choices', true).first();
        this.searchField = this.el.select('ul li.select2-search-field', true).first();
        if(this.triggerList){
            this.searchField.on("click", this.onSearchFieldClick, this, {preventDefault:true});
        }
         
        this.trigger = this.el.select('.tickable-buttons > .btn-edit', true).first();
        this.trigger.on("click", this.onTickableTriggerClick, this, {preventDefault:true});
        
        this.okBtn = this.el.select('.tickable-buttons > .btn-ok', true).first();
        this.cancelBtn = this.el.select('.tickable-buttons > .btn-cancel', true).first();
        
        this.okBtn.on('click', this.onTickableFooterButtonClick, this, this.okBtn);
        this.cancelBtn.on('click', this.onTickableFooterButtonClick, this, this.cancelBtn);
        
        this.trigger.setVisibilityMode(Roo.Element.DISPLAY);
        this.okBtn.setVisibilityMode(Roo.Element.DISPLAY);
        this.cancelBtn.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.okBtn.hide();
        this.cancelBtn.hide();
        
        var _this = this;
        
        (function(){
            var lw = _this.listWidth || Math.max(_this.inputEl().getWidth(), _this.minListWidth);
            _this.list.setWidth(lw);
        }).defer(100);
        
        this.list.on('mouseover', this.onViewOver, this);
        this.list.on('mousemove', this.onViewMove, this);
        
        this.list.on('scroll', this.onViewScroll, this);
        
        if(!this.tpl){
            this.tpl = '<li class="select2-result"><div class="checkbox"><input id="{roo-id}" type="checkbox" {roo-data-checked}><label for="{roo-id}"><b>{' + this.displayField + '}</b></label></li>';
        }

        this.view = new Roo.View(this.list, this.tpl, {
            singleSelect:true, tickable:true, parent:this, store: this.store, selectedClass: this.selectedClass
        });
        
        //this.view.wrapEl.setDisplayed(false);
        this.view.on('click', this.onViewClick, this);
        
        
        
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.on('load', this.onLoad, this);
        this.store.on('loadexception', this.onLoadException, this);
        
//        this.keyNav = new Roo.KeyNav(this.inputEl(), {
//            "up" : function(e){
//                this.inKeyMode = true;
//                this.selectPrev();
//            },
//
//            "down" : function(e){
//                if(!this.isExpanded()){
//                    this.onTriggerClick();
//                }else{
//                    this.inKeyMode = true;
//                    this.selectNext();
//                }
//            },
//
//            "enter" : function(e){
////                this.onViewClick();
//                //return true;
//                this.collapse();
//                
//                if(this.fireEvent("specialkey", this, e)){
//                    this.onViewClick(false);
//                }
//                
//                return true;
//            },
//
//            "esc" : function(e){
//                this.collapse();
//            },
//
//            "tab" : function(e){
//                this.collapse();
//                
//                if(this.fireEvent("specialkey", this, e)){
//                    this.onViewClick(false);
//                }
//                
//                return true;
//            },
//
//            scope : this,
//
//            doRelay : function(foo, bar, hname){
//                if(hname == 'down' || this.scope.isExpanded()){
//                   return Roo.KeyNav.prototype.doRelay.apply(this, arguments);
//                }
//                return true;
//            },
//
//            forceKeyDown: true
//        });
        
        
        this.queryDelay = Math.max(this.queryDelay || 10,
                this.mode == 'local' ? 10 : 250);
        
        
        this.dqTask = new Roo.util.DelayedTask(this.initQuery, this);
        
        if(this.typeAhead){
            this.taTask = new Roo.util.DelayedTask(this.onTypeAhead, this);
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
//        Roo.bootstrap.ComboBox.superclass.onResize.apply(this, arguments);
//        
//        if(typeof w != 'number'){
//            // we do not handle it!?!?
//            return;
//        }
//        var tw = this.trigger.getWidth();
//       // tw += this.addicon ? this.addicon.getWidth() : 0;
//       // tw += this.editicon ? this.editicon.getWidth() : 0;
//        var x = w - tw;
//        this.inputEl().setWidth( this.adjustWidth('input', x));
//            
//        //this.trigger.setStyle('left', x+'px');
//        
//        if(this.list && this.listWidth === undefined){
//            var lw = Math.max(x + this.trigger.getWidth(), this.minListWidth);
//            this.list.setWidth(lw);
//            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
//        }
        
    
        
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
    
    onBeforeLoad : function(combo,opts){
        if(!this.hasFocus){
            return;
        }
         if (!opts.add) {
            this.list.dom.innerHTML = '<li class="loading-indicator">'+(this.loadingText||'loading')+'</li>' ;
         }
        this.restrictHeight();
        this.selectedIndex = -1;
    },

    // private
    onLoad : function(){
        
        this.hasQuery = false;
        
        if(!this.hasFocus){
            return;
        }
        
        if(typeof(this.loading) !== 'undefined' && this.loading !== null){
            this.loading.hide();
        }
        
        if(this.store.getCount() > 0){
            this.expand();
//            this.restrictHeight();
            if(this.lastQuery == this.allQuery){
                if(this.editable && !this.tickable){
                    this.inputEl().dom.select();
                }
                
                if(
                    !this.selectByValue(this.value, true) &&
                    this.autoFocus && (typeof(this.store.lastOptions.add) == 'undefined' || 
                    this.store.lastOptions.add != true)
                ){
                    this.select(0, true);
                }
            }else{
                if(this.autoFocus){
                    this.selectNext();
                }
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
        this.hasQuery = false;
        
        if(typeof(this.loading) !== 'undefined' && this.loading !== null){
            this.loading.hide();
        }
        
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
        
        if(this.multiple){
            return (this.hiddenField) ? this.hiddenField.dom.value : this.value;
        }
        
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
        if(this.multiple){
            this.syncValue();
            return;
        }
        
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
        
        if(this.multiple){
            this.addItem(o);
            return;
        }
            
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
    onViewClick : function(view, doFocus, el, e)
    {
        var index = this.view.getSelectedIndexes()[0];
        
        var r = this.store.getAt(index);
        
        if(this.tickable){
            
            if(e.getTarget().nodeName.toLowerCase() != 'input'){
                return;
            }
            
            var rm = false;
            var _this = this;
            
            Roo.each(this.tickItems, function(v,k){
                
                if(typeof(v) != 'undefined' && v[_this.valueField] == r.data[_this.valueField]){
                    _this.tickItems.splice(k, 1);
                    rm = true;
                    return;
                }
            })
            
            if(rm){
                return;
            }
            
            this.tickItems.push(r.data);
            return;
        }
        
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
            if(el && !this.multiple && !this.tickable){
                this.list.scrollChildIntoView(el, false);
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
        if(this.inputEl().dom.value.length > 0){
            this.inputEl().dom.value =
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
            
            this.hasQuery = true;
            
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
                    
                    var options = {params : this.getParams(q)};
                    
                    if(this.loadNext){
                        options.add = true;
                        options.params.start = this.page * this.pageSize;
                    }
                    
                    this.store.load(options);
                    /*
                     *  this code will make the page width larger, at the beginning, the list not align correctly, 
                     *  we should expand the list on onLoad
                     *  so command out it
                     */
//                    this.expand();
                }
            }else{
                this.selectedIndex = -1;
                this.onLoad();   
            }
        }
        
        this.loadNext = false;
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
        
        if(this.tickable){
            this.okBtn.hide();
            this.cancelBtn.hide();
            this.trigger.show();
        }
        
        Roo.get(document).un('mousedown', this.collapseIf, this);
        Roo.get(document).un('mousewheel', this.collapseIf, this);
        if (!this.editable) {
            Roo.get(document).un('keydown', this.listKeyPress, this);
        }
        this.fireEvent('collapse', this);
    },

    // private
    collapseIf : function(e){
        var in_combo  = e.within(this.el);
        var in_list =  e.within(this.list);
        var is_list = (Roo.get(e.getTarget()).id == this.list.id) ? true : false;
        
        if (in_combo || in_list || is_list) {
            //e.stopPropagation();
            return;
        }
        
        if(this.tickable){
            this.onTickableFooterButtonClick(e, false, false);
        }

        this.collapse();
        
    },

    /**
     * Expands the dropdown list if it is currently hidden. Fires the 'expand' event on completion.
     */
    expand : function(){
       
        if(this.isExpanded() || !this.hasFocus){
            return;
        }
        
        var lw = this.listWidth || Math.max(this.inputEl().getWidth(), this.minListWidth);
        this.list.setWidth(lw);
        
        
         Roo.log('expand');
        
        this.list.show();
        
        this.restrictHeight();
        
        if(this.tickable){
            
            this.tickItems = Roo.apply([], this.item);
            
            this.okBtn.show();
            this.cancelBtn.show();
            this.trigger.hide();
            
        }
        
        Roo.get(document).on('mousedown', this.collapseIf, this);
        Roo.get(document).on('mousewheel', this.collapseIf, this);
        if (!this.editable) {
            Roo.get(document).on('keydown', this.listKeyPress, this);
        }
        
        this.fireEvent('expand', this);
    },

    // private
    // Implements the default empty TriggerField.onTriggerClick function
    onTriggerClick : function(e)
    {
        Roo.log('trigger click');
        
        if(this.disabled || !this.triggerList){
            return;
        }
        
        this.page = 0;
        this.loadNext = false;
        
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
    
    onTickableTriggerClick : function(e)
    {
        if(this.disabled){
            return;
        }
        
        this.page = 0;
        this.loadNext = false;
        this.hasFocus = true;
        
        if(this.triggerAction == 'all') {
            this.doQuery(this.allQuery, true);
        } else {
            this.doQuery(this.getRawValue());
        }
    },
    
    onSearchFieldClick : function(e)
    {
        if(this.hasFocus || this.disabled || e.getTarget().nodeName.toLowerCase() == 'button'){
            return;
        }
        
        this.page = 0;
        this.loadNext = false;
        this.hasFocus = true;
        
        if(this.triggerAction == 'all') {
            this.doQuery(this.allQuery, true);
        } else {
            this.doQuery(this.getRawValue());
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
        sn.scrollIntoView(sn.dom.parentNode, false);
    },
    
    onViewScroll : function(e, t){
        
        if(this.view.el.getScroll().top == 0 ||this.view.el.getScroll().top < this.view.el.dom.scrollHeight - this.view.el.dom.clientHeight || !this.hasFocus || !this.append || this.hasQuery){
            return;
        }
        
        this.hasQuery = true;
        
        this.loading = this.list.select('.loading', true).first();
        
        if(this.loading === null){
            this.list.createChild({
                tag: 'div',
                cls: 'loading select2-more-results select2-active',
                html: 'Loading more results...'
            })
            
            this.loading = this.list.select('.loading', true).first();
            
            this.loading.setVisibilityMode(Roo.Element.DISPLAY);
            
            this.loading.hide();
        }
        
        this.loading.show();
        
        var _combo = this;
        
        this.page++;
        this.loadNext = true;
        
        (function() { _combo.doQuery(_combo.allQuery, true); }).defer(500);
        
        return;
    },
    
    addItem : function(o)
    {   
        var dv = ''; // display value
        
        if (this.displayField) {
            dv = !o || typeof(o[this.displayField]) == 'undefined' ? '' : o[this.displayField];
        } else {
            // this is an error condition!!!
            Roo.log('no  displayField value set for '+ (this.name ? this.name : this.id));
        }
        
        if(!dv.length){
            return;
        }
        
        var choice = this.choices.createChild({
            tag: 'li',
            cls: 'select2-search-choice',
            cn: [
                {
                    tag: 'div',
                    html: dv
                },
                {
                    tag: 'a',
                    href: '#',
                    cls: 'select2-search-choice-close',
                    tabindex: '-1'
                }
            ]
            
        }, this.searchField);
        
        var close = choice.select('a.select2-search-choice-close', true).first()
        
        close.on('click', this.onRemoveItem, this, { item : choice, data : o} );
        
        this.item.push(o);
        
        this.lastData = o;
        
        this.syncValue();
        
        this.inputEl().dom.value = '';
        
    },
    
    onRemoveItem : function(e, _self, o)
    {
        e.preventDefault();
        var index = this.item.indexOf(o.data) * 1;
        
        if( index < 0){
            Roo.log('not this item?!');
            return;
        }
        
        this.item.splice(index, 1);
        o.item.remove();
        
        this.syncValue();
        
        this.fireEvent('remove', this, e);
        
    },
    
    syncValue : function()
    {
        if(!this.item.length){
            this.clearValue();
            return;
        }
            
        var value = [];
        var _this = this;
        Roo.each(this.item, function(i){
            if(_this.valueField){
                value.push(i[_this.valueField]);
                return;
            }

            value.push(i);
        });

        this.value = value.join(',');

        if(this.hiddenField){
            this.hiddenField.dom.value = this.value;
        }
    },
    
    clearItem : function()
    {
        if(!this.multiple){
            return;
        }
        
        this.item = [];
        
        Roo.each(this.choices.select('>li.select2-search-choice', true).elements, function(c){
           c.remove();
        });
        
        this.syncValue();
    },
    
    inputEl: function ()
    {
        if(this.tickable){
            return this.searchField;
        }
        return this.el.select('input.form-control',true).first();
    },
    
    
    onTickableFooterButtonClick : function(e, btn, el)
    {
        e.preventDefault();
        
        if(btn && btn.name == 'cancel'){
            this.tickItems = Roo.apply([], this.item);
            this.collapse();
            return;
        }
        
        this.clearItem();
        
        var _this = this;
        
        Roo.each(this.tickItems, function(o){
            _this.addItem(o);
        });
        
        this.collapse();
        
    },
    
    validate : function()
    {
        var v = this.getRawValue();
        
        if(this.multiple){
            v = this.getValue();
        }
        
        if(this.disabled || this.validateValue(v)){
            this.clearInvalid();
            return true;
        }
        return false;
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
    
    this.parent = false;
    
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
     * @cfg {Boolean} tickable - selecting 
     */
    tickable : false,
    
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
        Roo.log('refresh');
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
            
            var d = Roo.apply({}, data);
            
            if(this.tickable){
                Roo.apply(d, {'roo-id' : Roo.id()});
                
                var _this = this;
            
                Roo.each(this.parent.item, function(item){
                    if(item[_this.parent.valueField] != data[_this.parent.valueField]){
                        return;
                    }
                    Roo.apply(d, {'roo-data-checked' : 'checked'});
                });
            }
            
            html[html.length] = Roo.util.Format.trim(
                this.dataName ?
                    t.applySubtemplate(this.dataName, d, this.store.meta) :
                    t.apply(d)
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
         Roo.log('on update');   
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
        Roo.log(['on Add', ds, records, index] );        
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
        Roo.log('onRemove');
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
    onBeforeLoad : function(store,opts)
    {
         Roo.log('onBeforeLoad');   
        if (!opts.add) {
            this.el.update("");
        }
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
            
            if(!this.tickable){
                e.preventDefault();
            }
            
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

Roo.bootstrap = Roo.bootstrap || {};
/**
 * @class Roo.bootstrap.Calendar
 * @extends Roo.bootstrap.Component
 * Bootstrap Calendar class
 * @cfg {Boolean} loadMask (true|false) default false
 * @cfg {Object} header generate the user specific header of the calendar, default false

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
    
    loadMask : false,
    
    header : false,
      
    getAutoCreate : function(){
        
        
        var fc_button = function(name, corner, style, content ) {
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
        
        var header = {};
        
        if(!this.header){
            header = {
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
        }
        
        header = this.header;
        
       
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
            throw "can not find store for calendar";
        }
        
        var mark = {
            tag: "div",
            cls:"x-dlg-mask",
            style: "text-align:center",
            cn: [
                {
                    tag: "div",
                    style: "background-color:white;width:50%;margin:250 auto",
                    cn: [
                        {
                            tag: "img",
                            src: Roo.rootURL + '/images/ux/lightbox/loading.gif' 
                        },
                        {
                            tag: "span",
                            html: "Loading"
                        }
                        
                    ]
                }
            ]
        }
        this.maskEl = Roo.DomHelper.append(this.el.select('.fc-content', true).first(), mark, true);
        
        var size = this.el.select('.fc-content', true).first().getSize();
        this.maskEl.setSize(size.width, size.height);
        this.maskEl.enableDisplayMode("block");
        if(!this.loadMask){
            this.maskEl.hide();
        }
        
        this.store = Roo.factory(this.store, Roo.data);
        this.store.on('load', this.onLoad, this);
        this.store.on('beforeload', this.onBeforeLoad, this);
        
        this.resize();
        
        this.cells = this.el.select('.fc-day',true);
        //Roo.log(this.cells);
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
//        if(vd && this.el){
//            var t = date.getTime();
//            if(vd.getMonth() == date.getMonth() && vd.getFullYear() == date.getFullYear()){
//                Roo.log('using add remove');
//                
//                this.fireEvent('monthchange', this, date);
//                
//                this.cells.removeClass("fc-state-highlight");
//                this.cells.each(function(c){
//                   if(c.dateValue == t){
//                       c.addClass("fc-state-highlight");
//                       setTimeout(function(){
//                            try{c.dom.firstChild.focus();}catch(e){}
//                       }, 50);
//                       return false;
//                   }
//                   return true;
//                });
//                return;
//            }
//        }
        
        var days = date.getDaysInMonth();
        
        var firstOfMonth = date.getFirstDateOfMonth();
        var startingPos = firstOfMonth.getDay()-this.startDay;
        
        if(startingPos < this.startDay){
            startingPos += 7;
        }
        
        var pm = date.add(Date.MONTH, -1);
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
        //Roo.log(d);
        //Roo.log(pm);
        //Roo.log(prevStart);
        
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
            cell.row = 0;
            cell.events = [];
            cell.more = [];
            //Roo.log('set Cell Class');
            cell.title = "";
            var t = d.getTime();
            
            //Roo.log(d);
            
            cell.dateValue = t;
            if(t == today){
                cell.className += " fc-today";
                cell.className += " fc-state-highlight";
                cell.title = cal.todayText;
            }
            if(t == sel){
                // disable highlight in other month..
                //cell.className += " fc-state-highlight";
                
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
       // Roo.log(s);
        var e= ev.end.clone().clearTime().getTime();
       // Roo.log(e);
        var ret = [];
        this.cells.each(function(c){
             ////Roo.log("check " +c.dateValue + '<' + e + ' > ' + s);
            
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
    
//    findBestRow: function(cells)
//    {
//        var ret = 0;
//        
//        for (var i =0 ; i < cells.length;i++) {
//            ret  = Math.max(cells[i].rows || 0,ret);
//        }
//        return ret;
//        
//    },
    
    
    addItem : function(ev)
    {
        // look for vertical location slot in
        var cells = this.findCells(ev);
        
//        ev.row = this.findBestRow(cells);
        
        // work out the location.
        
        var crow = false;
        var rows = [];
        for(var i =0; i < cells.length; i++) {
            
            cells[i].row = cells[0].row;
            
            if(i == 0){
                cells[i].row = cells[i].row + 1;
            }
            
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
        
        cells[0].events.push(ev);
        
        this.calevents.push(ev);
    },
    
    clearEvents: function() {
        
        if(!this.calevents){
            return;
        }
        
        Roo.each(this.cells.elements, function(c){
            c.row = 0;
            c.events = [];
            c.more = [];
        });
        
        Roo.each(this.calevents, function(e) {
            Roo.each(e.els, function(el) {
                el.un('mouseenter' ,this.onEventEnter, this);
                el.un('mouseleave' ,this.onEventLeave, this);
                el.remove();
            },this);
        },this);
        
        Roo.each(Roo.select('.fc-more-event', true).elements, function(e){
            e.remove();
        });
        
    },
    
    renderEvents: function()
    {   
        var _this = this;
        
        this.cells.each(function(c) {
            
            if(c.row < 5){
                return;
            }
            
            var ev = c.events;
            
            var r = 4;
            if(c.row != c.events.length){
                r = 4 - (4 - (c.row - c.events.length));
            }
            
            c.events = ev.slice(0, r);
            c.more = ev.slice(r);
            
            if(c.more.length && c.more.length == 1){
                c.events.push(c.more.pop());
            }
            
            c.row = (c.row - ev.length) + c.events.length + ((c.more.length) ? 1 : 0);
            
        });
            
        this.cells.each(function(c) {
            
            c.select('.fc-day-content div',true).first().setHeight(Math.max(34, c.row * 20));
            
            
            for (var e = 0; e < c.events.length; e++){
                var ev = c.events[e];
                var rows = ev.rows;
                
                for(var i = 0; i < rows.length; i++) {
                
                    // how many rows should it span..

                    var  cfg = {
                        cls : 'roo-dynamic fc-event fc-event-hori fc-event-draggable ui-draggable',
                        style : 'position: absolute', // left: 387px; width: 121px; top: 359px;

                        unselectable : "on",
                        cn : [
                            {
                                cls: 'fc-event-inner',
                                cn : [
    //                                {
    //                                  tag:'span',
    //                                  cls: 'fc-event-time',
    //                                  html : cells.length > 1 ? '' : ev.time
    //                                },
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

                    var ctr = _this.el.select('.fc-event-container',true).first();
                    var cg = ctr.createChild(cfg);

                    var sbox = rows[i].start.select('.fc-day-content',true).first().getBox();
                    var ebox = rows[i].end.select('.fc-day-content',true).first().getBox();

                    var r = (c.more.length) ? 1 : 0;
                    cg.setXY([sbox.x +2, sbox.y + ((c.row - c.events.length - r + e) * 20)]);    
                    cg.setWidth(ebox.right - sbox.x -2);

                    cg.on('mouseenter' ,_this.onEventEnter, _this, ev);
                    cg.on('mouseleave' ,_this.onEventLeave, _this, ev);
                    cg.on('click', _this.onEventClick, _this, ev);

                    ev.els.push(cg);
                    
                }
                
            }
            
            
            if(c.more.length){
                var  cfg = {
                    cls : 'fc-more-event roo-dynamic fc-event fc-event-hori fc-event-draggable ui-draggable fc-event-start fc-event-end',
                    style : 'position: absolute',
                    unselectable : "on",
                    cn : [
                        {
                            cls: 'fc-event-inner',
                            cn : [
                                {
                                  tag:'span',
                                  cls: 'fc-event-title',
                                  html : 'More'
                                }


                            ]
                        },
                        {
                            cls: 'ui-resizable-handle ui-resizable-e',
                            html : '&nbsp;&nbsp;&nbsp'
                        }

                    ]
                };

                var ctr = _this.el.select('.fc-event-container',true).first();
                var cg = ctr.createChild(cfg);

                var sbox = c.select('.fc-day-content',true).first().getBox();
                var ebox = c.select('.fc-day-content',true).first().getBox();
                //Roo.log(cg);
                cg.setXY([sbox.x +2, sbox.y +((c.row - 1) * 20)]);    
                cg.setWidth(ebox.right - sbox.x -2);

                cg.on('click', _this.onMoreEventClick, _this, c.more);
                
            }
            
        });
        
        
        
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
    
    onMoreEventClick: function(e, el, more)
    {
        var _this = this;
        
        this.calpopover.placement = 'right';
        this.calpopover.setTitle('More');
        
        this.calpopover.setContent('');
        
        var ctr = this.calpopover.el.select('.popover-content', true).first();
        
        Roo.each(more, function(m){
            var cfg = {
                cls : 'fc-event-hori fc-event-draggable',
                html : m.title
            }
            var cg = ctr.createChild(cfg);
            
            cg.on('click', _this.onEventClick, _this, m);
        });
        
        this.calpopover.show(el);
        
        
    },
    
    onLoad: function () 
    {   
        this.calevents = [];
        var cal = this;
        
        if(this.store.getCount() > 0){
            this.store.data.each(function(d){
               cal.addItem({
                    id : d.data.id,
                    start: (typeof(d.data.start_dt) === 'string') ? new Date.parseDate(d.data.start_dt, 'Y-m-d H:i:s') : d.data.start_dt,
                    end : (typeof(d.data.end_dt) === 'string') ? new Date.parseDate(d.data.end_dt, 'Y-m-d H:i:s') : d.data.end_dt,
                    time : d.data.start_time,
                    title : d.data.title,
                    description : d.data.description,
                    venue : d.data.venue
                });
            });
        }
        
        this.renderEvents();
        
        if(this.calevents.length && this.loadMask){
            this.maskEl.hide();
        }
    },
    
    onBeforeLoad: function()
    {
        this.clearEvents();
        if(this.loadMask){
            this.maskEl.show();
        }
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
 * @cfg {Number} delay - delay before showing
 
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
    
    delay : 0,
    
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

 /*
 * - LGPL
 *
 * Progress
 * 
 */

/**
 * @class Roo.bootstrap.Progress
 * @extends Roo.bootstrap.Component
 * Bootstrap Progress class
 * @cfg {Boolean} striped striped of the progress bar
 * @cfg {Boolean} active animated of the progress bar
 * 
 * 
 * @constructor
 * Create a new Progress
 * @param {Object} config The config object
 */

Roo.bootstrap.Progress = function(config){
    Roo.bootstrap.Progress.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Progress, Roo.bootstrap.Component,  {
    
    striped : false,
    active: false,
    
    getAutoCreate : function(){
        var cfg = {
            tag: 'div',
            cls: 'progress'
        };
        
        
        if(this.striped){
            cfg.cls += ' progress-striped';
        }
      
        if(this.active){
            cfg.cls += ' active';
        }
        
        
        return cfg;
    }
   
});

 

 /*
 * - LGPL
 *
 * ProgressBar
 * 
 */

/**
 * @class Roo.bootstrap.ProgressBar
 * @extends Roo.bootstrap.Component
 * Bootstrap ProgressBar class
 * @cfg {Number} aria_valuenow aria-value now
 * @cfg {Number} aria_valuemin aria-value min
 * @cfg {Number} aria_valuemax aria-value max
 * @cfg {String} label label for the progress bar
 * @cfg {String} panel (success | info | warning | danger )
 * @cfg {String} role role of the progress bar
 * @cfg {String} sr_only text
 * 
 * 
 * @constructor
 * Create a new ProgressBar
 * @param {Object} config The config object
 */

Roo.bootstrap.ProgressBar = function(config){
    Roo.bootstrap.ProgressBar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.ProgressBar, Roo.bootstrap.Component,  {
    
    aria_valuenow : 0,
    aria_valuemin : 0,
    aria_valuemax : 100,
    label : false,
    panel : false,
    role : false,
    sr_only: false,
    
    getAutoCreate : function()
    {
        
        var cfg = {
            tag: 'div',
            cls: 'progress-bar',
            style: 'width:' + Math.ceil((this.aria_valuenow / this.aria_valuemax) * 100) + '%'
        };
        
        if(this.sr_only){
            cfg.cn = {
                tag: 'span',
                cls: 'sr-only',
                html: this.sr_only
            }
        }
        
        if(this.role){
            cfg.role = this.role;
        }
        
        if(this.aria_valuenow){
            cfg['aria-valuenow'] = this.aria_valuenow;
        }
        
        if(this.aria_valuemin){
            cfg['aria-valuemin'] = this.aria_valuemin;
        }
        
        if(this.aria_valuemax){
            cfg['aria-valuemax'] = this.aria_valuemax;
        }
        
        if(this.label && !this.sr_only){
            cfg.html = this.label;
        }
        
        if(this.panel){
            cfg.cls += ' progress-bar-' + this.panel;
        }
        
        return cfg;
    },
    
    update : function(aria_valuenow)
    {
        this.aria_valuenow = aria_valuenow;
        
        this.el.setStyle('width', Math.ceil((this.aria_valuenow / this.aria_valuemax) * 100) + '%');
    }
   
});

 

 /*
 * - LGPL
 *
 * column
 * 
 */

/**
 * @class Roo.bootstrap.TabGroup
 * @extends Roo.bootstrap.Column
 * Bootstrap Column class
 * @cfg {String} navId the navigation id (for use with navbars) - will be auto generated if it does not exist..
 * @cfg {Boolean} carousel true to make the group behave like a carousel
 * 
 * @constructor
 * Create a new TabGroup
 * @param {Object} config The config object
 */

Roo.bootstrap.TabGroup = function(config){
    Roo.bootstrap.TabGroup.superclass.constructor.call(this, config);
    if (!this.navId) {
        this.navId = Roo.id();
    }
    this.tabs = [];
    Roo.bootstrap.TabGroup.register(this);
    
};

Roo.extend(Roo.bootstrap.TabGroup, Roo.bootstrap.Column,  {
    
    carousel : false,
    transition : false,
     
    getAutoCreate : function()
    {
        var cfg = Roo.apply({}, Roo.bootstrap.TabGroup.superclass.getAutoCreate.call(this));
        
        cfg.cls += ' tab-content';
        
        if (this.carousel) {
            cfg.cls += ' carousel slide';
            cfg.cn = [{
               cls : 'carousel-inner'
            }]
        }
        
        
        return cfg;
    },
    getChildContainer : function()
    {
        return this.carousel ? this.el.select('.carousel-inner', true).first() : this.el;
    },
    
    /**
    * register a Navigation item
    * @param {Roo.bootstrap.NavItem} the navitem to add
    */
    register : function(item)
    {
        this.tabs.push( item);
        item.navId = this.navId; // not really needed..
    
    },
    
    getActivePanel : function()
    {
        var r = false;
        Roo.each(this.tabs, function(t) {
            if (t.active) {
                r = t;
                return false;
            }
            return null;
        });
        return r;
        
    },
    getPanelByName : function(n)
    {
        var r = false;
        Roo.each(this.tabs, function(t) {
            if (t.tabId == n) {
                r = t;
                return false;
            }
            return null;
        });
        return r;
    },
    indexOfPanel : function(p)
    {
        var r = false;
        Roo.each(this.tabs, function(t,i) {
            if (t.tabId == p.tabId) {
                r = i;
                return false;
            }
            return null;
        });
        return r;
    },
    /**
     * show a specific panel
     * @param {Roo.bootstrap.TabPanel|number|string} panel to change to (use the tabId to specify a specific one)
     * @return {boolean} false if panel was not shown (invalid entry or beforedeactivate fails.)
     */
    showPanel : function (pan)
    {
        
        if (typeof(pan) == 'number') {
            pan = this.tabs[pan];
        }
        if (typeof(pan) == 'string') {
            pan = this.getPanelByName(pan);
        }
        if (pan.tabId == this.getActivePanel().tabId) {
            return true;
        }
        var cur = this.getActivePanel();
        
        if (false === cur.fireEvent('beforedeactivate')) {
            return false;
        }
        
        if (this.carousel) {
            this.transition = true;
            var dir = this.indexOfPanel(pan) > this.indexOfPanel(cur)  ? 'next' : 'prev';
            var lr = dir == 'next' ? 'left' : 'right';
            pan.el.addClass(dir); // or prev
            pan.el.dom.offsetWidth; // find the offset with - causing a reflow?
            cur.el.addClass(lr); // or right
            pan.el.addClass(lr);
            
            var _this = this;
            cur.el.on('transitionend', function() {
                Roo.log("trans end?");
                
                pan.el.removeClass([lr,dir]);
                pan.setActive(true);
                
                cur.el.removeClass([lr]);
                cur.setActive(false);
                
                _this.transition = false;
                
            }, this, { single:  true } );
            return true;
        }
        
        cur.setActive(false);
        pan.setActive(true);
        return true;
        
    },
    showPanelNext : function()
    {
        var i = this.indexOfPanel(this.getActivePanel());
        if (i > this.tabs.length) {
            return;
        }
        this.showPanel(this.tabs[i+1]);
    },
    showPanelPrev : function()
    {
        var i = this.indexOfPanel(this.getActivePanel());
        if (i  < 1) {
            return;
        }
        this.showPanel(this.tabs[i-1]);
    }
    
    
  
});

 

 
 
Roo.apply(Roo.bootstrap.TabGroup, {
    
    groups: {},
     /**
    * register a Navigation Group
    * @param {Roo.bootstrap.NavGroup} the navgroup to add
    */
    register : function(navgrp)
    {
        this.groups[navgrp.navId] = navgrp;
	
    },
    /**
    * fetch a Navigation Group based on the navigation ID
    * if one does not exist , it will get created.
    * @param {string} the navgroup to add
    * @returns {Roo.bootstrap.NavGroup} the navgroup 
    */
    get: function(navId) {
        if (typeof(this.groups[navId]) == 'undefined') {
            this.register(new Roo.bootstrap.TabGroup({ navId : navId }));
        }
        return this.groups[navId] ;
    }
    
    
    
});

 /*
 * - LGPL
 *
 * TabPanel
 * 
 */

/**
 * @class Roo.bootstrap.TabPanel
 * @extends Roo.bootstrap.Component
 * Bootstrap TabPanel class
 * @cfg {Boolean} active panel active
 * @cfg {String} html panel content
 * @cfg {String} tabId  unique tab ID (will be autogenerated if not set. - used to match TabItem to Panel)
 * @cfg {String} navId The Roo.bootstrap.NavGroup which triggers show hide ()
 * 
 * 
 * @constructor
 * Create a new TabPanel
 * @param {Object} config The config object
 */

Roo.bootstrap.TabPanel = function(config){
    Roo.bootstrap.TabPanel.superclass.constructor.call(this, config);
    this.addEvents({
        /**
	     * @event changed
	     * Fires when the active status changes
	     * @param {Roo.bootstrap.TabPanel} this
	     * @param {Boolean} state the new state
	    
         */
        'changed': true,
        /**
	     * @event beforedeactivate
	     * Fires before a tab is de-activated - can be used to do validation on a form.
	     * @param {Roo.bootstrap.TabPanel} this
	     * @return {Boolean} false if there is an error
	    
         */
        'beforedeactivate': true
     });
    
    this.tabId = this.tabId || Roo.id();
  
};

Roo.extend(Roo.bootstrap.TabPanel, Roo.bootstrap.Component,  {
    
    active: false,
    html: false,
    tabId: false,
    navId : false,
    
    getAutoCreate : function(){
        var cfg = {
            tag: 'div',
            // item is needed for carousel - not sure if it has any effect otherwise
            cls: 'tab-pane item',
            html: this.html || ''
        };
        
        if(this.active){
            cfg.cls += ' active';
        }
        
        if(this.tabId){
            cfg.tabId = this.tabId;
        }
        
        
        return cfg;
    },
    
    initEvents:  function()
    {
        Roo.log('-------- init events on tab panel ---------');
        
        var p = this.parent();
        this.navId = this.navId || p.navId;
        
        if (typeof(this.navId) != 'undefined') {
            // not really needed.. but just in case.. parent should be a NavGroup.
            var tg = Roo.bootstrap.TabGroup.get(this.navId);
            Roo.log(['register', tg, this]);
            tg.register(this);
        }
    },
    
    
    onRender : function(ct, position)
    {
       // Roo.log("Call onRender: " + this.xtype);
        
        Roo.bootstrap.TabPanel.superclass.onRender.call(this, ct, position);
        
        
        
        
        
    },
    
    setActive: function(state)
    {
        Roo.log("panel - set active " + this.tabId + "=" + state);
        
        this.active = state;
        if (!state) {
            this.el.removeClass('active');
            
        } else  if (!this.el.hasClass('active')) {
            this.el.addClass('active');
        }
        this.fireEvent('changed', this, state);
    }
    
    
});
 

 

 /*
 * - LGPL
 *
 * DateField
 * 
 */

/**
 * @class Roo.bootstrap.DateField
 * @extends Roo.bootstrap.Input
 * Bootstrap DateField class
 * @cfg {Number} weekStart default 0
 * @cfg {String} viewMode default empty, (months|years)
 * @cfg {String} minViewMode default empty, (months|years)
 * @cfg {Number} startDate default -Infinity
 * @cfg {Number} endDate default Infinity
 * @cfg {Boolean} todayHighlight default false
 * @cfg {Boolean} todayBtn default false
 * @cfg {Boolean} calendarWeeks default false
 * @cfg {Object} daysOfWeekDisabled default empty
 * @cfg {Boolean} singleMode default false (true | false)
 * 
 * @cfg {Boolean} keyboardNavigation default true
 * @cfg {String} language default en
 * 
 * @constructor
 * Create a new DateField
 * @param {Object} config The config object
 */

Roo.bootstrap.DateField = function(config){
    Roo.bootstrap.DateField.superclass.constructor.call(this, config);
     this.addEvents({
            /**
             * @event show
             * Fires when this field show.
             * @param {Roo.bootstrap.DateField} this
             * @param {Mixed} date The date value
             */
            show : true,
            /**
             * @event show
             * Fires when this field hide.
             * @param {Roo.bootstrap.DateField} this
             * @param {Mixed} date The date value
             */
            hide : true,
            /**
             * @event select
             * Fires when select a date.
             * @param {Roo.bootstrap.DateField} this
             * @param {Mixed} date The date value
             */
            select : true
        });
};

Roo.extend(Roo.bootstrap.DateField, Roo.bootstrap.Input,  {
    
    /**
     * @cfg {String} format
     * The default date format string which can be overriden for localization support.  The format must be
     * valid according to {@link Date#parseDate} (defaults to 'm/d/y').
     */
    format : "m/d/y",
    /**
     * @cfg {String} altFormats
     * Multiple date formats separated by "|" to try when parsing a user input value and it doesn't match the defined
     * format (defaults to 'm/d/Y|m-d-y|m-d-Y|m/d|m-d|d').
     */
    altFormats : "m/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d",
    
    weekStart : 0,
    
    viewMode : '',
    
    minViewMode : '',
    
    todayHighlight : false,
    
    todayBtn: false,
    
    language: 'en',
    
    keyboardNavigation: true,
    
    calendarWeeks: false,
    
    startDate: -Infinity,
    
    endDate: Infinity,
    
    daysOfWeekDisabled: [],
    
    _events: [],
    
    singleMode : false,
    
    UTCDate: function()
    {
        return new Date(Date.UTC.apply(Date, arguments));
    },
    
    UTCToday: function()
    {
        var today = new Date();
        return this.UTCDate(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
    },
    
    getDate: function() {
            var d = this.getUTCDate();
            return new Date(d.getTime() + (d.getTimezoneOffset()*60000));
    },
    
    getUTCDate: function() {
            return this.date;
    },
    
    setDate: function(d) {
            this.setUTCDate(new Date(d.getTime() - (d.getTimezoneOffset()*60000)));
    },
    
    setUTCDate: function(d) {
            this.date = d;
            this.setValue(this.formatDate(this.date));
    },
        
    onRender: function(ct, position)
    {
        
        Roo.bootstrap.DateField.superclass.onRender.call(this, ct, position);
        
        this.language = this.language || 'en';
        this.language = this.language in Roo.bootstrap.DateField.dates ? this.language : this.language.split('-')[0];
        this.language = this.language in Roo.bootstrap.DateField.dates ? this.language : "en";
        
        this.isRTL = Roo.bootstrap.DateField.dates[this.language].rtl || false;
        this.format = this.format || 'm/d/y';
        this.isInline = false;
        this.isInput = true;
        this.component = this.el.select('.add-on', true).first() || false;
        this.component = (this.component && this.component.length === 0) ? false : this.component;
        this.hasInput = this.component && this.inputEL().length;
        
        if (typeof(this.minViewMode === 'string')) {
            switch (this.minViewMode) {
                case 'months':
                    this.minViewMode = 1;
                    break;
                case 'years':
                    this.minViewMode = 2;
                    break;
                default:
                    this.minViewMode = 0;
                    break;
            }
        }
        
        if (typeof(this.viewMode === 'string')) {
            switch (this.viewMode) {
                case 'months':
                    this.viewMode = 1;
                    break;
                case 'years':
                    this.viewMode = 2;
                    break;
                default:
                    this.viewMode = 0;
                    break;
            }
        }
                
        this.pickerEl = Roo.get(document.body).createChild(Roo.bootstrap.DateField.template);
        
//        this.el.select('>.input-group', true).first().createChild(Roo.bootstrap.DateField.template);
        
        this.picker().setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.picker().on('mousedown', this.onMousedown, this);
        this.picker().on('click', this.onClick, this);
        
        this.picker().addClass('datepicker-dropdown');
        
        this.startViewMode = this.viewMode;
        
        if(this.singleMode){
            Roo.each(this.picker().select('thead > tr > th', true).elements, function(v){
                v.setVisibilityMode(Roo.Element.DISPLAY)
                v.hide();
            })
            
            Roo.each(this.picker().select('tbody > tr > td', true).elements, function(v){
                v.setStyle('width', '189px');
            });
        }
        
        Roo.each(this.picker().select('tfoot th.today', true).elements, function(v){
            if(!this.calendarWeeks){
                v.remove();
                return;
            };
            
            v.dom.innerHTML = Roo.bootstrap.DateField.dates[this.language].today
            v.attr('colspan', function(i, val){
                return parseInt(val) + 1;
            });
        })
			
        
        this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1;
        
        this.setStartDate(this.startDate);
        this.setEndDate(this.endDate);
        
        this.setDaysOfWeekDisabled(this.daysOfWeekDisabled);
        
        this.fillDow();
        this.fillMonths();
        this.update();
        this.showMode();
        
        if(this.isInline) {
            this.show();
        }
    },
    
    picker : function()
    {
        return this.pickerEl;
//        return this.el.select('.datepicker', true).first();
    },
    
    fillDow: function()
    {
        var dowCnt = this.weekStart;
        
        var dow = {
            tag: 'tr',
            cn: [
                
            ]
        };
        
        if(this.calendarWeeks){
            dow.cn.push({
                tag: 'th',
                cls: 'cw',
                html: '&nbsp;'
            })
        }
        
        while (dowCnt < this.weekStart + 7) {
            dow.cn.push({
                tag: 'th',
                cls: 'dow',
                html: Roo.bootstrap.DateField.dates[this.language].daysMin[(dowCnt++)%7]
            });
        }
        
        this.picker().select('>.datepicker-days thead', true).first().createChild(dow);
    },
    
    fillMonths: function()
    {    
        var i = 0
        var months = this.picker().select('>.datepicker-months td', true).first();
        
        months.dom.innerHTML = '';
        
        while (i < 12) {
            var month = {
                tag: 'span',
                cls: 'month',
                html: Roo.bootstrap.DateField.dates[this.language].monthsShort[i++]
            }
            
            months.createChild(month);
        }
        
    },
    
    update: function()
    {
        this.date = (typeof(this.date) === 'undefined' || ((typeof(this.date) === 'string') && !this.date.length)) ? this.UTCToday() : (typeof(this.date) === 'string') ? this.parseDate(this.date) : this.date;
        
        if (this.date < this.startDate) {
            this.viewDate = new Date(this.startDate);
        } else if (this.date > this.endDate) {
            this.viewDate = new Date(this.endDate);
        } else {
            this.viewDate = new Date(this.date);
        }
        
        this.fill();
    },
    
    fill: function() 
    {
        var d = new Date(this.viewDate),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth(),
                startYear = this.startDate !== -Infinity ? this.startDate.getUTCFullYear() : -Infinity,
                startMonth = this.startDate !== -Infinity ? this.startDate.getUTCMonth() : -Infinity,
                endYear = this.endDate !== Infinity ? this.endDate.getUTCFullYear() : Infinity,
                endMonth = this.endDate !== Infinity ? this.endDate.getUTCMonth() : Infinity,
                currentDate = this.date && this.date.valueOf(),
                today = this.UTCToday();
        
        this.picker().select('>.datepicker-days thead th.switch', true).first().dom.innerHTML = Roo.bootstrap.DateField.dates[this.language].months[month]+' '+year;
        
//        this.picker().select('>tfoot th.today', true).first().dom.innerHTML = Roo.bootstrap.DateField.dates[this.language].today;
        
//        this.picker.select('>tfoot th.today').
//						.text(dates[this.language].today)
//						.toggle(this.todayBtn !== false);
    
        this.updateNavArrows();
        this.fillMonths();
                                                
        var prevMonth = this.UTCDate(year, month-1, 28,0,0,0,0),
        
        day = prevMonth.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
         
        prevMonth.setUTCDate(day);
        
        prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.weekStart + 7)%7);
        
        var nextMonth = new Date(prevMonth);
        
        nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
        
        nextMonth = nextMonth.valueOf();
        
        var fillMonths = false;
        
        this.picker().select('>.datepicker-days tbody',true).first().dom.innerHTML = '';
        
        while(prevMonth.valueOf() < nextMonth) {
            var clsName = '';
            
            if (prevMonth.getUTCDay() === this.weekStart) {
                if(fillMonths){
                    this.picker().select('>.datepicker-days tbody',true).first().createChild(fillMonths);
                }
                    
                fillMonths = {
                    tag: 'tr',
                    cn: []
                };
                
                if(this.calendarWeeks){
                    // ISO 8601: First week contains first thursday.
                    // ISO also states week starts on Monday, but we can be more abstract here.
                    var
                    // Start of current week: based on weekstart/current date
                    ws = new Date(+prevMonth + (this.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
                    // Thursday of this week
                    th = new Date(+ws + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
                    // First Thursday of year, year from thursday
                    yth = new Date(+(yth = this.UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
                    // Calendar week: ms between thursdays, div ms per day, div 7 days
                    calWeek =  (th - yth) / 864e5 / 7 + 1;
                    
                    fillMonths.cn.push({
                        tag: 'td',
                        cls: 'cw',
                        html: calWeek
                    });
                }
            }
            
            if (prevMonth.getUTCFullYear() < year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() < month)) {
                clsName += ' old';
            } else if (prevMonth.getUTCFullYear() > year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() > month)) {
                clsName += ' new';
            }
            if (this.todayHighlight &&
                prevMonth.getUTCFullYear() == today.getFullYear() &&
                prevMonth.getUTCMonth() == today.getMonth() &&
                prevMonth.getUTCDate() == today.getDate()) {
                clsName += ' today';
            }
            
            if (currentDate && prevMonth.valueOf() === currentDate) {
                clsName += ' active';
            }
            
            if (prevMonth.valueOf() < this.startDate || prevMonth.valueOf() > this.endDate ||
                    this.daysOfWeekDisabled.indexOf(prevMonth.getUTCDay()) !== -1) {
                    clsName += ' disabled';
            }
            
            fillMonths.cn.push({
                tag: 'td',
                cls: 'day ' + clsName,
                html: prevMonth.getDate()
            })
            
            prevMonth.setDate(prevMonth.getDate()+1);
        }
          
        var currentYear = this.date && this.date.getUTCFullYear();
        var currentMonth = this.date && this.date.getUTCMonth();
        
        this.picker().select('>.datepicker-months th.switch',true).first().dom.innerHTML = year;
        
        Roo.each(this.picker().select('>.datepicker-months tbody span',true).elements, function(v,k){
            v.removeClass('active');
            
            if(currentYear === year && k === currentMonth){
                v.addClass('active');
            }
            
            if (year < startYear || year > endYear || (year == startYear && k < startMonth) || (year == endYear && k > endMonth)) {
                v.addClass('disabled');
            }
            
        });
        
        
        year = parseInt(year/10, 10) * 10;
        
        this.picker().select('>.datepicker-years th.switch', true).first().dom.innerHTML = year + '-' + (year + 9);
        
        this.picker().select('>.datepicker-years tbody td',true).first().dom.innerHTML = '';
        
        year -= 1;
        for (var i = -1; i < 11; i++) {
            this.picker().select('>.datepicker-years tbody td',true).first().createChild({
                tag: 'span',
                cls: 'year' + (i === -1 || i === 10 ? ' old' : '') + (currentYear === year ? ' active' : '') + (year < startYear || year > endYear ? ' disabled' : ''),
                html: year
            })
            
            year += 1;
        }
    },
    
    showMode: function(dir) 
    {
        if (dir) {
            this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + dir));
        }
        
        Roo.each(this.picker().select('>div',true).elements, function(v){
            v.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
            v.hide();
        });
        this.picker().select('>.datepicker-'+Roo.bootstrap.DateField.modes[this.viewMode].clsName, true).first().show();
    },
    
    place: function()
    {
        if(this.isInline) return;
        
        this.picker().removeClass(['bottom', 'top']);
        
        if((Roo.lib.Dom.getViewHeight() + Roo.get(document.body).getScroll().top) - (this.inputEl().getBottom() + this.picker().getHeight()) < 0){
            /*
             * place to the top of element!
             *
             */
            
            this.picker().addClass('top');
            this.picker().setTop(this.inputEl().getTop() - this.picker().getHeight()).setLeft(this.inputEl().getLeft());
            
            return;
        }
        
        this.picker().addClass('bottom');
        
        this.picker().setTop(this.inputEl().getBottom()).setLeft(this.inputEl().getLeft());
    },
    
    parseDate : function(value)
    {
        if(!value || value instanceof Date){
            return value;
        }
        var v = Date.parseDate(value, this.format);
        if (!v && (this.useIso || value.match(/^(\d{4})-0?(\d+)-0?(\d+)/))) {
            v = Date.parseDate(value, 'Y-m-d');
        }
        if(!v && this.altFormats){
            if(!this.altFormatsArray){
                this.altFormatsArray = this.altFormats.split("|");
            }
            for(var i = 0, len = this.altFormatsArray.length; i < len && !v; i++){
                v = Date.parseDate(value, this.altFormatsArray[i]);
            }
        }
        return v;
    },
    
    formatDate : function(date, fmt)
    {   
        return (!date || !(date instanceof Date)) ?
        date : date.dateFormat(fmt || this.format);
    },
    
    onFocus : function()
    {
        Roo.bootstrap.DateField.superclass.onFocus.call(this);
        this.show();
    },
    
    onBlur : function()
    {
        Roo.bootstrap.DateField.superclass.onBlur.call(this);
        
        var d = this.inputEl().getValue();
        
        this.setValue(d);
                
        this.hide();
    },
    
    show : function()
    {
        this.picker().show();
        this.update();
        this.place();
        
        this.fireEvent('show', this, this.date);
    },
    
    hide : function()
    {
        if(this.isInline) return;
        this.picker().hide();
        this.viewMode = this.startViewMode;
        this.showMode();
        
        this.fireEvent('hide', this, this.date);
        
    },
    
    onMousedown: function(e)
    {
        e.stopPropagation();
        e.preventDefault();
    },
    
    keyup: function(e)
    {
        Roo.bootstrap.DateField.superclass.keyup.call(this);
        this.update();
    },

    setValue: function(v)
    {
        
        // v can be a string or a date..
        
        
        var d = new Date(this.parseDate(v) ).clearTime();
        
        if(isNaN(d.getTime())){
            this.date = this.viewDate = '';
            Roo.bootstrap.DateField.superclass.setValue.call(this, '');
            return;
        }
        
        v = this.formatDate(d);
        
        Roo.bootstrap.DateField.superclass.setValue.call(this, v);
        
        this.date = new Date(d.getTime() - d.getTimezoneOffset()*60000);
     
        this.update();

        this.fireEvent('select', this, this.date);
        
    },
    
    getValue: function()
    {
        return this.formatDate(this.date);
    },
    
    fireKey: function(e)
    {
        if (!this.picker().isVisible()){
            if (e.keyCode == 27) // allow escape to hide and re-show picker
                this.show();
            return;
        }
        
        var dateChanged = false,
        dir, day, month,
        newDate, newViewDate;
        
        switch(e.keyCode){
            case 27: // escape
                this.hide();
                e.preventDefault();
                break;
            case 37: // left
            case 39: // right
                if (!this.keyboardNavigation) break;
                dir = e.keyCode == 37 ? -1 : 1;
                
                if (e.ctrlKey){
                    newDate = this.moveYear(this.date, dir);
                    newViewDate = this.moveYear(this.viewDate, dir);
                } else if (e.shiftKey){
                    newDate = this.moveMonth(this.date, dir);
                    newViewDate = this.moveMonth(this.viewDate, dir);
                } else {
                    newDate = new Date(this.date);
                    newDate.setUTCDate(this.date.getUTCDate() + dir);
                    newViewDate = new Date(this.viewDate);
                    newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir);
                }
                if (this.dateWithinRange(newDate)){
                    this.date = newDate;
                    this.viewDate = newViewDate;
                    this.setValue(this.formatDate(this.date));
//                    this.update();
                    e.preventDefault();
                    dateChanged = true;
                }
                break;
            case 38: // up
            case 40: // down
                if (!this.keyboardNavigation) break;
                dir = e.keyCode == 38 ? -1 : 1;
                if (e.ctrlKey){
                    newDate = this.moveYear(this.date, dir);
                    newViewDate = this.moveYear(this.viewDate, dir);
                } else if (e.shiftKey){
                    newDate = this.moveMonth(this.date, dir);
                    newViewDate = this.moveMonth(this.viewDate, dir);
                } else {
                    newDate = new Date(this.date);
                    newDate.setUTCDate(this.date.getUTCDate() + dir * 7);
                    newViewDate = new Date(this.viewDate);
                    newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir * 7);
                }
                if (this.dateWithinRange(newDate)){
                    this.date = newDate;
                    this.viewDate = newViewDate;
                    this.setValue(this.formatDate(this.date));
//                    this.update();
                    e.preventDefault();
                    dateChanged = true;
                }
                break;
            case 13: // enter
                this.setValue(this.formatDate(this.date));
                this.hide();
                e.preventDefault();
                break;
            case 9: // tab
                this.setValue(this.formatDate(this.date));
                this.hide();
                break;
            case 16: // shift
            case 17: // ctrl
            case 18: // alt
                break;
            default :
                this.hide();
                
        }
    },
    
    
    onClick: function(e) 
    {
        e.stopPropagation();
        e.preventDefault();
        
        var target = e.getTarget();
        
        if(target.nodeName.toLowerCase() === 'i'){
            target = Roo.get(target).dom.parentNode;
        }
        
        var nodeName = target.nodeName;
        var className = target.className;
        var html = target.innerHTML;
        //Roo.log(nodeName);
        
        switch(nodeName.toLowerCase()) {
            case 'th':
                switch(className) {
                    case 'switch':
                        this.showMode(1);
                        break;
                    case 'prev':
                    case 'next':
                        var dir = Roo.bootstrap.DateField.modes[this.viewMode].navStep * (className == 'prev' ? -1 : 1);
                        switch(this.viewMode){
                                case 0:
                                        this.viewDate = this.moveMonth(this.viewDate, dir);
                                        break;
                                case 1:
                                case 2:
                                        this.viewDate = this.moveYear(this.viewDate, dir);
                                        break;
                        }
                        this.fill();
                        break;
                    case 'today':
                        var date = new Date();
                        this.date = this.UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
//                        this.fill()
                        this.setValue(this.formatDate(this.date));
                        
                        this.hide();
                        break;
                }
                break;
            case 'span':
                if (className.indexOf('disabled') < 0) {
                    this.viewDate.setUTCDate(1);
                    if (className.indexOf('month') > -1) {
                        this.viewDate.setUTCMonth(Roo.bootstrap.DateField.dates[this.language].monthsShort.indexOf(html));
                    } else {
                        var year = parseInt(html, 10) || 0;
                        this.viewDate.setUTCFullYear(year);
                        
                    }
                    
                    if(this.singleMode){
                        this.setValue(this.formatDate(this.viewDate));
                        this.hide();
                        return;
                    }
                    
                    this.showMode(-1);
                    this.fill();
                }
                break;
                
            case 'td':
                //Roo.log(className);
                if (className.indexOf('day') > -1 && className.indexOf('disabled') < 0 ){
                    var day = parseInt(html, 10) || 1;
                    var year = this.viewDate.getUTCFullYear(),
                        month = this.viewDate.getUTCMonth();

                    if (className.indexOf('old') > -1) {
                        if(month === 0 ){
                            month = 11;
                            year -= 1;
                        }else{
                            month -= 1;
                        }
                    } else if (className.indexOf('new') > -1) {
                        if (month == 11) {
                            month = 0;
                            year += 1;
                        } else {
                            month += 1;
                        }
                    }
                    //Roo.log([year,month,day]);
                    this.date = this.UTCDate(year, month, day,0,0,0,0);
                    this.viewDate = this.UTCDate(year, month, Math.min(28, day),0,0,0,0);
//                    this.fill();
                    //Roo.log(this.formatDate(this.date));
                    this.setValue(this.formatDate(this.date));
                    this.hide();
                }
                break;
        }
    },
    
    setStartDate: function(startDate)
    {
        this.startDate = startDate || -Infinity;
        if (this.startDate !== -Infinity) {
            this.startDate = this.parseDate(this.startDate);
        }
        this.update();
        this.updateNavArrows();
    },

    setEndDate: function(endDate)
    {
        this.endDate = endDate || Infinity;
        if (this.endDate !== Infinity) {
            this.endDate = this.parseDate(this.endDate);
        }
        this.update();
        this.updateNavArrows();
    },
    
    setDaysOfWeekDisabled: function(daysOfWeekDisabled)
    {
        this.daysOfWeekDisabled = daysOfWeekDisabled || [];
        if (typeof(this.daysOfWeekDisabled) !== 'object') {
            this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/);
        }
        this.daysOfWeekDisabled = this.daysOfWeekDisabled.map(function (d) {
            return parseInt(d, 10);
        });
        this.update();
        this.updateNavArrows();
    },
    
    updateNavArrows: function() 
    {
        if(this.singleMode){
            return;
        }
        
        var d = new Date(this.viewDate),
        year = d.getUTCFullYear(),
        month = d.getUTCMonth();
        
        Roo.each(this.picker().select('.prev', true).elements, function(v){
            v.show();
            switch (this.viewMode) {
                case 0:

                    if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear() && month <= this.startDate.getUTCMonth()) {
                        v.hide();
                    }
                    break;
                case 1:
                case 2:
                    if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()) {
                        v.hide();
                    }
                    break;
            }
        });
        
        Roo.each(this.picker().select('.next', true).elements, function(v){
            v.show();
            switch (this.viewMode) {
                case 0:

                    if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear() && month >= this.endDate.getUTCMonth()) {
                        v.hide();
                    }
                    break;
                case 1:
                case 2:
                    if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()) {
                        v.hide();
                    }
                    break;
            }
        })
    },
    
    moveMonth: function(date, dir)
    {
        if (!dir) return date;
        var new_date = new Date(date.valueOf()),
        day = new_date.getUTCDate(),
        month = new_date.getUTCMonth(),
        mag = Math.abs(dir),
        new_month, test;
        dir = dir > 0 ? 1 : -1;
        if (mag == 1){
            test = dir == -1
            // If going back one month, make sure month is not current month
            // (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
            ? function(){
                return new_date.getUTCMonth() == month;
            }
            // If going forward one month, make sure month is as expected
            // (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
            : function(){
                return new_date.getUTCMonth() != new_month;
            };
            new_month = month + dir;
            new_date.setUTCMonth(new_month);
            // Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
            if (new_month < 0 || new_month > 11)
                new_month = (new_month + 12) % 12;
        } else {
            // For magnitudes >1, move one month at a time...
            for (var i=0; i<mag; i++)
                // ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
                new_date = this.moveMonth(new_date, dir);
            // ...then reset the day, keeping it in the new month
            new_month = new_date.getUTCMonth();
            new_date.setUTCDate(day);
            test = function(){
                return new_month != new_date.getUTCMonth();
            };
        }
        // Common date-resetting loop -- if date is beyond end of month, make it
        // end of month
        while (test()){
            new_date.setUTCDate(--day);
            new_date.setUTCMonth(new_month);
        }
        return new_date;
    },

    moveYear: function(date, dir)
    {
        return this.moveMonth(date, dir*12);
    },

    dateWithinRange: function(date)
    {
        return date >= this.startDate && date <= this.endDate;
    },

    
    remove: function() 
    {
        this.picker().remove();
    }
   
});

Roo.apply(Roo.bootstrap.DateField,  {
    
    head : {
        tag: 'thead',
        cn: [
        {
            tag: 'tr',
            cn: [
            {
                tag: 'th',
                cls: 'prev',
                html: '<i class="fa fa-arrow-left"/>'
            },
            {
                tag: 'th',
                cls: 'switch',
                colspan: '5'
            },
            {
                tag: 'th',
                cls: 'next',
                html: '<i class="fa fa-arrow-right"/>'
            }

            ]
        }
        ]
    },
    
    content : {
        tag: 'tbody',
        cn: [
        {
            tag: 'tr',
            cn: [
            {
                tag: 'td',
                colspan: '7'
            }
            ]
        }
        ]
    },
    
    footer : {
        tag: 'tfoot',
        cn: [
        {
            tag: 'tr',
            cn: [
            {
                tag: 'th',
                colspan: '7',
                cls: 'today'
            }
                    
            ]
        }
        ]
    },
    
    dates:{
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Today"
        }
    },
    
    modes: [
    {
        clsName: 'days',
        navFnc: 'Month',
        navStep: 1
    },
    {
        clsName: 'months',
        navFnc: 'FullYear',
        navStep: 1
    },
    {
        clsName: 'years',
        navFnc: 'FullYear',
        navStep: 10
    }]
});

Roo.apply(Roo.bootstrap.DateField,  {
  
    template : {
        tag: 'div',
        cls: 'datepicker dropdown-menu roo-dynamic',
        cn: [
        {
            tag: 'div',
            cls: 'datepicker-days',
            cn: [
            {
                tag: 'table',
                cls: 'table-condensed',
                cn:[
                Roo.bootstrap.DateField.head,
                {
                    tag: 'tbody'
                },
                Roo.bootstrap.DateField.footer
                ]
            }
            ]
        },
        {
            tag: 'div',
            cls: 'datepicker-months',
            cn: [
            {
                tag: 'table',
                cls: 'table-condensed',
                cn:[
                Roo.bootstrap.DateField.head,
                Roo.bootstrap.DateField.content,
                Roo.bootstrap.DateField.footer
                ]
            }
            ]
        },
        {
            tag: 'div',
            cls: 'datepicker-years',
            cn: [
            {
                tag: 'table',
                cls: 'table-condensed',
                cn:[
                Roo.bootstrap.DateField.head,
                Roo.bootstrap.DateField.content,
                Roo.bootstrap.DateField.footer
                ]
            }
            ]
        }
        ]
    }
});

 

 /*
 * - LGPL
 *
 * TimeField
 * 
 */

/**
 * @class Roo.bootstrap.TimeField
 * @extends Roo.bootstrap.Input
 * Bootstrap DateField class
 * 
 * 
 * @constructor
 * Create a new TimeField
 * @param {Object} config The config object
 */

Roo.bootstrap.TimeField = function(config){
    Roo.bootstrap.TimeField.superclass.constructor.call(this, config);
    this.addEvents({
            /**
             * @event show
             * Fires when this field show.
             * @param {Roo.bootstrap.DateField} this
             * @param {Mixed} date The date value
             */
            show : true,
            /**
             * @event show
             * Fires when this field hide.
             * @param {Roo.bootstrap.DateField} this
             * @param {Mixed} date The date value
             */
            hide : true,
            /**
             * @event select
             * Fires when select a date.
             * @param {Roo.bootstrap.DateField} this
             * @param {Mixed} date The date value
             */
            select : true
        });
};

Roo.extend(Roo.bootstrap.TimeField, Roo.bootstrap.Input,  {
    
    /**
     * @cfg {String} format
     * The default time format string which can be overriden for localization support.  The format must be
     * valid according to {@link Date#parseDate} (defaults to 'H:i').
     */
    format : "H:i",
       
    onRender: function(ct, position)
    {
        
        Roo.bootstrap.TimeField.superclass.onRender.call(this, ct, position);
                
        this.el.select('>.input-group', true).first().createChild(Roo.bootstrap.TimeField.template);
        
        this.picker().setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.pop = this.picker().select('>.datepicker-time',true).first();
        this.pop.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block' 
        
        this.picker().on('mousedown', this.onMousedown, this);
        this.picker().on('click', this.onClick, this);
        
        this.picker().addClass('datepicker-dropdown');
    
        this.fillTime();
        this.update();
            
        this.pop.select('span.hours-up', true).first().on('click', this.onIncrementHours, this);
        this.pop.select('span.hours-down', true).first().on('click', this.onDecrementHours, this);
        this.pop.select('span.minutes-up', true).first().on('click', this.onIncrementMinutes, this);
        this.pop.select('span.minutes-down', true).first().on('click', this.onDecrementMinutes, this);
        this.pop.select('button.period', true).first().on('click', this.onTogglePeriod, this);
        this.pop.select('button.ok', true).first().on('click', this.setTime, this);

    },
    
    fireKey: function(e){
        if (!this.picker().isVisible()){
            if (e.keyCode == 27) // allow escape to hide and re-show picker
                this.show();
            return;
        }

        e.preventDefault();
        
        switch(e.keyCode){
            case 27: // escape
                this.hide();
                break;
            case 37: // left
            case 39: // right
                this.onTogglePeriod();
                break;
            case 38: // up
                this.onIncrementMinutes();
                break;
            case 40: // down
                this.onDecrementMinutes();
                break;
            case 13: // enter
            case 9: // tab
                this.setTime();
                break;
        }
    },
    
    onClick: function(e) {
        e.stopPropagation();
        e.preventDefault();
    },
    
    picker : function()
    {
        return this.el.select('.datepicker', true).first();
    },
    
    fillTime: function()
    {    
        var time = this.pop.select('tbody', true).first();
        
        time.dom.innerHTML = '';
        
        time.createChild({
            tag: 'tr',
            cn: [
                {
                    tag: 'td',
                    cn: [
                        {
                            tag: 'a',
                            href: '#',
                            cls: 'btn',
                            cn: [
                                {
                                    tag: 'span',
                                    cls: 'hours-up glyphicon glyphicon-chevron-up'
                                }
                            ]
                        } 
                    ]
                },
                {
                    tag: 'td',
                    cls: 'separator'
                },
                {
                    tag: 'td',
                    cn: [
                        {
                            tag: 'a',
                            href: '#',
                            cls: 'btn',
                            cn: [
                                {
                                    tag: 'span',
                                    cls: 'minutes-up glyphicon glyphicon-chevron-up'
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: 'td',
                    cls: 'separator'
                }
            ]
        });
        
        time.createChild({
            tag: 'tr',
            cn: [
                {
                    tag: 'td',
                    cn: [
                        {
                            tag: 'span',
                            cls: 'timepicker-hour',
                            html: '00'
                        }  
                    ]
                },
                {
                    tag: 'td',
                    cls: 'separator',
                    html: ':'
                },
                {
                    tag: 'td',
                    cn: [
                        {
                            tag: 'span',
                            cls: 'timepicker-minute',
                            html: '00'
                        }  
                    ]
                },
                {
                    tag: 'td',
                    cls: 'separator'
                },
                {
                    tag: 'td',
                    cn: [
                        {
                            tag: 'button',
                            type: 'button',
                            cls: 'btn btn-primary period',
                            html: 'AM'
                            
                        }
                    ]
                }
            ]
        });
        
        time.createChild({
            tag: 'tr',
            cn: [
                {
                    tag: 'td',
                    cn: [
                        {
                            tag: 'a',
                            href: '#',
                            cls: 'btn',
                            cn: [
                                {
                                    tag: 'span',
                                    cls: 'hours-down glyphicon glyphicon-chevron-down'
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: 'td',
                    cls: 'separator'
                },
                {
                    tag: 'td',
                    cn: [
                        {
                            tag: 'a',
                            href: '#',
                            cls: 'btn',
                            cn: [
                                {
                                    tag: 'span',
                                    cls: 'minutes-down glyphicon glyphicon-chevron-down'
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: 'td',
                    cls: 'separator'
                }
            ]
        });
        
    },
    
    update: function()
    {
        
        this.time = (typeof(this.time) === 'undefined') ? new Date() : this.time;
        
        this.fill();
    },
    
    fill: function() 
    {
        var hours = this.time.getHours();
        var minutes = this.time.getMinutes();
        var period = 'AM';
        
        if(hours > 11){
            period = 'PM';
        }
        
        if(hours == 0){
            hours = 12;
        }
        
        
        if(hours > 12){
            hours = hours - 12;
        }
        
        if(hours < 10){
            hours = '0' + hours;
        }
        
        if(minutes < 10){
            minutes = '0' + minutes;
        }
        
        this.pop.select('.timepicker-hour', true).first().dom.innerHTML = hours;
        this.pop.select('.timepicker-minute', true).first().dom.innerHTML = minutes;
        this.pop.select('button', true).first().dom.innerHTML = period;
        
    },
    
    place: function()
    {   
        this.picker().removeClass(['bottom-left', 'bottom-right', 'top-left', 'top-right']);
        
        var cls = ['bottom'];
        
        if((Roo.lib.Dom.getViewHeight() + Roo.get(document.body).getScroll().top) - (this.inputEl().getBottom() + this.picker().getHeight()) < 0){ // top
            cls.pop();
            cls.push('top');
        }
        
        cls.push('right');
        
        if((Roo.lib.Dom.getViewWidth() + Roo.get(document.body).getScroll().left) - (this.inputEl().getLeft() + this.picker().getWidth()) < 0){ // left
            cls.pop();
            cls.push('left');
        }
        
        this.picker().addClass(cls.join('-'));
        
        var _this = this;
        
        Roo.each(cls, function(c){
            if(c == 'bottom'){
                _this.picker().setTop(_this.inputEl().getHeight());
                return;
            }
            if(c == 'top'){
                _this.picker().setTop(0 - _this.picker().getHeight());
                return;
            }
            
            if(c == 'left'){
                _this.picker().setLeft(_this.inputEl().getLeft() + _this.inputEl().getWidth() - _this.el.getLeft() - _this.picker().getWidth());
                return;
            }
            if(c == 'right'){
                _this.picker().setLeft(_this.inputEl().getLeft() - _this.el.getLeft());
                return;
            }
        });
        
    },
  
    onFocus : function()
    {
        Roo.bootstrap.TimeField.superclass.onFocus.call(this);
        this.show();
    },
    
    onBlur : function()
    {
        Roo.bootstrap.TimeField.superclass.onBlur.call(this);
        this.hide();
    },
    
    show : function()
    {
        this.picker().show();
        this.pop.show();
        this.update();
        this.place();
        
        this.fireEvent('show', this, this.date);
    },
    
    hide : function()
    {
        this.picker().hide();
        this.pop.hide();
        
        this.fireEvent('hide', this, this.date);
    },
    
    setTime : function()
    {
        this.hide();
        this.setValue(this.time.format(this.format));
        
        this.fireEvent('select', this, this.date);
        
        
    },
    
    onMousedown: function(e){
        e.stopPropagation();
        e.preventDefault();
    },
    
    onIncrementHours: function()
    {
        Roo.log('onIncrementHours');
        this.time = this.time.add(Date.HOUR, 1);
        this.update();
        
    },
    
    onDecrementHours: function()
    {
        Roo.log('onDecrementHours');
        this.time = this.time.add(Date.HOUR, -1);
        this.update();
    },
    
    onIncrementMinutes: function()
    {
        Roo.log('onIncrementMinutes');
        this.time = this.time.add(Date.MINUTE, 1);
        this.update();
    },
    
    onDecrementMinutes: function()
    {
        Roo.log('onDecrementMinutes');
        this.time = this.time.add(Date.MINUTE, -1);
        this.update();
    },
    
    onTogglePeriod: function()
    {
        Roo.log('onTogglePeriod');
        this.time = this.time.add(Date.HOUR, 12);
        this.update();
    }
    
   
});

Roo.apply(Roo.bootstrap.TimeField,  {
    
    content : {
        tag: 'tbody',
        cn: [
            {
                tag: 'tr',
                cn: [
                {
                    tag: 'td',
                    colspan: '7'
                }
                ]
            }
        ]
    },
    
    footer : {
        tag: 'tfoot',
        cn: [
            {
                tag: 'tr',
                cn: [
                {
                    tag: 'th',
                    colspan: '7',
                    cls: '',
                    cn: [
                        {
                            tag: 'button',
                            cls: 'btn btn-info ok',
                            html: 'OK'
                        }
                    ]
                }

                ]
            }
        ]
    }
});

Roo.apply(Roo.bootstrap.TimeField,  {
  
    template : {
        tag: 'div',
        cls: 'datepicker dropdown-menu',
        cn: [
            {
                tag: 'div',
                cls: 'datepicker-time',
                cn: [
                {
                    tag: 'table',
                    cls: 'table-condensed',
                    cn:[
                    Roo.bootstrap.TimeField.content,
                    Roo.bootstrap.TimeField.footer
                    ]
                }
                ]
            }
        ]
    }
});

 

 /*
 * - LGPL
 *
 * CheckBox
 * 
 */

/**
 * @class Roo.bootstrap.CheckBox
 * @extends Roo.bootstrap.Input
 * Bootstrap CheckBox class
 * 
 * @cfg {String} valueOff The value that should go into the generated input element's value when unchecked.
 * @cfg {String} inputValue The value that should go into the generated input element's value when checked.
 * @cfg {String} boxLabel The text that appears beside the checkbox
 * @cfg {String} weight (primary|warning|info|danger|success) The text that appears beside the checkbox
 * @cfg {Boolean} checked initnal the element
 * @cfg {Boolean} inline inline the element (default false)
 * 
 * @constructor
 * Create a new CheckBox
 * @param {Object} config The config object
 */

Roo.bootstrap.CheckBox = function(config){
    Roo.bootstrap.CheckBox.superclass.constructor.call(this, config);
   
        this.addEvents({
            /**
            * @event check
            * Fires when the element is checked or unchecked.
            * @param {Roo.bootstrap.CheckBox} this This input
            * @param {Boolean} checked The new checked value
            */
           check : true
        });
};

Roo.extend(Roo.bootstrap.CheckBox, Roo.bootstrap.Input,  {
    
    inputType: 'checkbox',
    inputValue: 1,
    valueOff: 0,
    boxLabel: false,
    checked: false,
    weight : false,
    inline: false,
    
    getAutoCreate : function()
    {
        var align = (!this.labelAlign) ? this.parentLabelAlign() : this.labelAlign;
        
        var id = Roo.id();
        
        var cfg = {};
        
        cfg.cls = 'form-group ' + this.inputType //input-group
        
        if(this.inline){
            cfg.cls += ' ' + this.inputType + '-inline';
        }
        
        var input =  {
            tag: 'input',
            id : id,
            type : this.inputType,
            value : (!this.checked) ? this.valueOff : this.inputValue,
            cls : 'roo-' + this.inputType, //'form-box',
            placeholder : this.placeholder || ''
            
        };
        
        if (this.weight) { // Validity check?
            cfg.cls += " " + this.inputType + "-" + this.weight;
        }
        
        if (this.disabled) {
            input.disabled=true;
        }
        
        if(this.checked){
            input.checked = this.checked;
        }
        
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
            
        };
        
        if (align ==='left' && this.fieldLabel.length) {
                Roo.log("left and has label");
                cfg.cn = [
                    
                    {
                        tag: 'label',
                        'for' :  id,
                        cls : 'control-label col-md-' + this.labelWidth,
                        html : this.fieldLabel
                        
                    },
                    {
                        cls : "col-md-" + (12 - this.labelWidth), 
                        cn: [
                            inputblock
                        ]
                    }
                    
                ];
        } else if ( this.fieldLabel.length) {
                Roo.log(" label");
                cfg.cn = [
                   
                    {
                        tag: this.boxLabel ? 'span' : 'label',
                        'for': id,
                        cls: 'control-label box-input-label',
                        //cls : 'input-group-addon',
                        html : this.fieldLabel
                        
                    },
                    
                    inputblock
                    
                ];

        } else {
            
                Roo.log(" no label && no align");
                cfg.cn = [  inputblock ] ;
                
                
        };
         if(this.boxLabel){
            cfg.cn.push( {
                tag: 'label',
                'for': id,
                cls: 'box-label',
                html: this.boxLabel
                
            });
        }
        
        
       
        return cfg;
        
    },
    
    /**
     * return the real input element.
     */
    inputEl: function ()
    {
        return this.el.select('input.roo-' + this.inputType,true).first();
    },
    
    label: function()
    {
        return this.el.select('label.control-label',true).first();
    },
    
    initEvents : function()
    {
//        Roo.bootstrap.CheckBox.superclass.initEvents.call(this);
        
        this.inputEl().on('click', this.onClick,  this);
        
    },
    
    onClick : function()
    {   
        this.setChecked(!this.checked);
    },
    
    setChecked : function(state,suppressEvent)
    {
        if(this.inputType == 'radio'){
            
            Roo.each(this.el.up('form').select('input[name='+this.name+']', true).elements, function(e){
                e.dom.checked = false;
            });
            
            this.inputEl().dom.checked = true;
            
            if(suppressEvent !== true){
                this.fireEvent('check', this, true);
            }
            
            this.inputEl().dom.value = this.inputValue;
            
            return;
        }
        
        this.checked = state;
        
        if(suppressEvent !== true){
            this.fireEvent('check', this, state);
        }
        
        this.inputEl().dom.checked = state;
        
        this.inputEl().dom.value = state ? this.inputValue : this.valueOff;
        
    },
    
    getValue : function()
    {
        if(this.inputType == 'radio'){
            return this.getGroupValue();
        }
        
        return this.inputEl().getValue();
        
    },
    
    getGroupValue : function()
    {
        return this.el.up('form').child('input[name='+this.name+']:checked', true).value;
    },
    
    setValue : function(v,suppressEvent)
    {
        if(this.inputType == 'radio'){
            this.setGroupValue(v, suppressEvent);
            return;
        }
        
        this.setChecked(((typeof(v) == 'undefined') ? this.checked : (String(v) === String(this.inputValue))), suppressEvent);
    },
    
    setGroupValue : function(v, suppressEvent)
    {
        Roo.each(this.el.up('form').select('input[name='+this.name+']', true).elements, function(e){
            e.dom.checked = false;
            
            if(e.dom.value == v){
                e.dom.checked = true;
            }
            
        });

        if(suppressEvent !== true){
            this.fireEvent('check', this, true);
        }

        return;
    }
    
});

 
/*
 * - LGPL
 *
 * Radio
 * 
 */

/**
 * @class Roo.bootstrap.Radio
 * @extends Roo.bootstrap.CheckBox
 * Bootstrap Radio class

 * @constructor
 * Create a new Radio
 * @param {Object} config The config object
 */

Roo.bootstrap.Radio = function(config){
    Roo.bootstrap.Radio.superclass.constructor.call(this, config);
   
};

Roo.extend(Roo.bootstrap.Radio, Roo.bootstrap.CheckBox,  {
    
    inputType: 'radio',
    inputValue: '',
    valueOff: '',
    
    getAutoCreate : function()
    {
        var align = (!this.labelAlign) ? this.parentLabelAlign() : this.labelAlign;
        
        var id = Roo.id();
        
        var cfg = {};
        
        cfg.cls = 'form-group radio' //input-group
        
        var input =  {
            tag: 'input',
            id : id,
            type : this.inputType,
            value : (!this.checked) ? this.valueOff : this.inputValue,
            cls : 'roo-radio',
            placeholder : this.placeholder || ''
            
        };
          if (this.weight) { // Validity check?
            cfg.cls += " radio-" + this.weight;
        }
        if (this.disabled) {
            input.disabled=true;
        }
        
        if(this.checked){
            input.checked = this.checked;
        }
        
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
            
        };
        
        if (align ==='left' && this.fieldLabel.length) {
                Roo.log("left and has label");
                cfg.cn = [
                    
                    {
                        tag: 'label',
                        'for' :  id,
                        cls : 'control-label col-md-' + this.labelWidth,
                        html : this.fieldLabel
                        
                    },
                    {
                        cls : "col-md-" + (12 - this.labelWidth), 
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
                        'for': id,
                        cls: 'control-label box-input-label',
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
                
                
        };
        
        if(this.boxLabel){
            cfg.cn.push({
                tag: 'label',
                'for': id,
                cls: 'box-label',
                html: this.boxLabel
            })
        }
        
        return cfg;
        
    },
    inputEl: function ()
    {
        return this.el.select('input.roo-radio',true).first();
    },
    onClick : function()
    {   
        this.setChecked(true);
    },
    
    setChecked : function(state,suppressEvent)
    {
        if(state){
            Roo.each(this.inputEl().up('form').select('input[name='+this.inputEl().dom.name+']', true).elements, function(v){
                v.dom.checked = false;
            });
        }
        
        this.checked = state;
        this.inputEl().dom.checked = state;
        
        if(suppressEvent !== true){
            this.fireEvent('check', this, state);
        }
        
        this.inputEl().dom.value = state ? this.inputValue : this.valueOff;
        
    },
    
    getGroupValue : function()
    {
        var value = ''
        Roo.each(this.inputEl().up('form').select('input[name='+this.inputEl().dom.name+']', true).elements, function(v){
            if(v.dom.checked == true){
                value = v.dom.value;
            }
        });
        
        return value;
    },
    
    /**
     * Returns the normalized data value (undefined or emptyText will be returned as '').  To return the raw value see {@link #getRawValue}.
     * @return {Mixed} value The field value
     */
    getValue : function(){
        return this.getGroupValue();
    }
    
});

 
//<script type="text/javascript">

/*
 * Based  Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * LGPL
 *
 */
 
/**
 * @class Roo.HtmlEditorCore
 * @extends Roo.Component
 * Provides a the editing component for the HTML editors in Roo. (bootstrap and Roo.form)
 *
 * any element that has display set to 'none' can cause problems in Safari and Firefox.<br/><br/>
 */

Roo.HtmlEditorCore = function(config){
    
    
    Roo.HtmlEditorCore.superclass.constructor.call(this, config);
    
    
    this.addEvents({
        /**
         * @event initialize
         * Fires when the editor is fully initialized (including the iframe)
         * @param {Roo.HtmlEditorCore} this
         */
        initialize: true,
        /**
         * @event activate
         * Fires when the editor is first receives the focus. Any insertion must wait
         * until after this event.
         * @param {Roo.HtmlEditorCore} this
         */
        activate: true,
         /**
         * @event beforesync
         * Fires before the textarea is updated with content from the editor iframe. Return false
         * to cancel the sync.
         * @param {Roo.HtmlEditorCore} this
         * @param {String} html
         */
        beforesync: true,
         /**
         * @event beforepush
         * Fires before the iframe editor is updated with content from the textarea. Return false
         * to cancel the push.
         * @param {Roo.HtmlEditorCore} this
         * @param {String} html
         */
        beforepush: true,
         /**
         * @event sync
         * Fires when the textarea is updated with content from the editor iframe.
         * @param {Roo.HtmlEditorCore} this
         * @param {String} html
         */
        sync: true,
         /**
         * @event push
         * Fires when the iframe editor is updated with content from the textarea.
         * @param {Roo.HtmlEditorCore} this
         * @param {String} html
         */
        push: true,
        
        /**
         * @event editorevent
         * Fires when on any editor (mouse up/down cursor movement etc.) - used for toolbar hooks.
         * @param {Roo.HtmlEditorCore} this
         */
        editorevent: true
    });
    
    // at this point this.owner is set, so we can start working out the whitelisted / blacklisted elements
    
    // defaults : white / black...
    this.applyBlacklists();
    
    
    
};


Roo.extend(Roo.HtmlEditorCore, Roo.Component,  {


     /**
     * @cfg {Roo.form.HtmlEditor|Roo.bootstrap.HtmlEditor} the owner field 
     */
    
    owner : false,
    
     /**
     * @cfg {String} resizable  's' or 'se' or 'e' - wrapps the element in a
     *                        Roo.resizable.
     */
    resizable : false,
     /**
     * @cfg {Number} height (in pixels)
     */   
    height: 300,
   /**
     * @cfg {Number} width (in pixels)
     */   
    width: 500,
    
    /**
     * @cfg {Array} stylesheets url of stylesheets. set to [] to disable stylesheets.
     * 
     */
    stylesheets: false,
    
    // id of frame..
    frameId: false,
    
    // private properties
    validationEvent : false,
    deferHeight: true,
    initialized : false,
    activated : false,
    sourceEditMode : false,
    onFocus : Roo.emptyFn,
    iframePad:3,
    hideMode:'offsets',
    
    clearUp: true,
    
    // blacklist + whitelisted elements..
    black: false,
    white: false,
     
    

    /**
     * Protected method that will not generally be called directly. It
     * is called when the editor initializes the iframe with HTML contents. Override this method if you
     * want to change the initialization markup of the iframe (e.g. to add stylesheets).
     */
    getDocMarkup : function(){
        // body styles..
        var st = '';
        Roo.log(this.stylesheets);
        
        // inherit styels from page...?? 
        if (this.stylesheets === false) {
            
            Roo.get(document.head).select('style').each(function(node) {
                st += node.dom.outerHTML || new XMLSerializer().serializeToString(node.dom);
            });
            
            Roo.get(document.head).select('link').each(function(node) { 
                st += node.dom.outerHTML || new XMLSerializer().serializeToString(node.dom);
            });
            
        } else if (!this.stylesheets.length) {
                // simple..
                st = '<style type="text/css">' +
                    'body{border:0;margin:0;padding:3px;height:98%;cursor:text;}' +
                   '</style>';
        } else {
            Roo.each(this.stylesheets, function(s) {
                st += '<link rel="stylesheet" type="text/css" href="' + s +'" />'
            });
            
        }
        
        st +=  '<style type="text/css">' +
            'IMG { cursor: pointer } ' +
        '</style>';

        
        return '<html><head>' + st  +
            //<style type="text/css">' +
            //'body{border:0;margin:0;padding:3px;height:98%;cursor:text;}' +
            //'</style>' +
            ' </head><body class="roo-htmleditor-body"></body></html>';
    },

    // private
    onRender : function(ct, position)
    {
        var _t = this;
        //Roo.HtmlEditorCore.superclass.onRender.call(this, ct, position);
        this.el = this.owner.inputEl ? this.owner.inputEl() : this.owner.el;
        
        
        this.el.dom.style.border = '0 none';
        this.el.dom.setAttribute('tabIndex', -1);
        this.el.addClass('x-hidden hide');
        
        
        
        if(Roo.isIE){ // fix IE 1px bogus margin
            this.el.applyStyles('margin-top:-1px;margin-bottom:-1px;')
        }
       
        
        this.frameId = Roo.id();
        
         
        
        var iframe = this.owner.wrap.createChild({
            tag: 'iframe',
            cls: 'form-control', // bootstrap..
            id: this.frameId,
            name: this.frameId,
            frameBorder : 'no',
            'src' : Roo.SSL_SECURE_URL ? Roo.SSL_SECURE_URL  :  "javascript:false"
        }, this.el
        );
        
        
        this.iframe = iframe.dom;

         this.assignDocWin();
        
        this.doc.designMode = 'on';
       
        this.doc.open();
        this.doc.write(this.getDocMarkup());
        this.doc.close();

        
        var task = { // must defer to wait for browser to be ready
            run : function(){
                //console.log("run task?" + this.doc.readyState);
                this.assignDocWin();
                if(this.doc.body || this.doc.readyState == 'complete'){
                    try {
                        this.doc.designMode="on";
                    } catch (e) {
                        return;
                    }
                    Roo.TaskMgr.stop(task);
                    this.initEditor.defer(10, this);
                }
            },
            interval : 10,
            duration: 10000,
            scope: this
        };
        Roo.TaskMgr.start(task);

        
         
    },

    // private
    onResize : function(w, h)
    {
         Roo.log('resize: ' +w + ',' + h );
        //Roo.HtmlEditorCore.superclass.onResize.apply(this, arguments);
        if(!this.iframe){
            return;
        }
        if(typeof w == 'number'){
            
            this.iframe.style.width = w + 'px';
        }
        if(typeof h == 'number'){
            
            this.iframe.style.height = h + 'px';
            if(this.doc){
                (this.doc.body || this.doc.documentElement).style.height = (h - (this.iframePad*2)) + 'px';
            }
        }
        
    },

    /**
     * Toggles the editor between standard and source edit mode.
     * @param {Boolean} sourceEdit (optional) True for source edit, false for standard
     */
    toggleSourceEdit : function(sourceEditMode){
        
        this.sourceEditMode = sourceEditMode === true;
        
        if(this.sourceEditMode){
 
            Roo.get(this.iframe).addClass(['x-hidden','hide']);     //FIXME - what's the BS styles for these
            
        }else{
            Roo.get(this.iframe).removeClass(['x-hidden','hide']);
            //this.iframe.className = '';
            this.deferFocus();
        }
        //this.setSize(this.owner.wrap.getSize());
        //this.fireEvent('editmodechange', this, this.sourceEditMode);
    },

    
  

    /**
     * Protected method that will not generally be called directly. If you need/want
     * custom HTML cleanup, this is the method you should override.
     * @param {String} html The HTML to be cleaned
     * return {String} The cleaned HTML
     */
    cleanHtml : function(html){
        html = String(html);
        if(html.length > 5){
            if(Roo.isSafari){ // strip safari nonsense
                html = html.replace(/\sclass="(?:Apple-style-span|khtml-block-placeholder)"/gi, '');
            }
        }
        if(html == '&nbsp;'){
            html = '';
        }
        return html;
    },

    /**
     * HTML Editor -> Textarea
     * Protected method that will not generally be called directly. Syncs the contents
     * of the editor iframe with the textarea.
     */
    syncValue : function(){
        if(this.initialized){
            var bd = (this.doc.body || this.doc.documentElement);
            //this.cleanUpPaste(); -- this is done else where and causes havoc..
            var html = bd.innerHTML;
            if(Roo.isSafari){
                var bs = bd.getAttribute('style'); // Safari puts text-align styles on the body element!
                var m = bs ? bs.match(/text-align:(.*?);/i) : false;
                if(m && m[1]){
                    html = '<div style="'+m[0]+'">' + html + '</div>';
                }
            }
            html = this.cleanHtml(html);
            // fix up the special chars.. normaly like back quotes in word...
            // however we do not want to do this with chinese..
            html = html.replace(/([\x80-\uffff])/g, function (a, b) {
                var cc = b.charCodeAt();
                if (
                    (cc >= 0x4E00 && cc < 0xA000 ) ||
                    (cc >= 0x3400 && cc < 0x4E00 ) ||
                    (cc >= 0xf900 && cc < 0xfb00 )
                ) {
                        return b;
                }
                return "&#"+cc+";" 
            });
            if(this.owner.fireEvent('beforesync', this, html) !== false){
                this.el.dom.value = html;
                this.owner.fireEvent('sync', this, html);
            }
        }
    },

    /**
     * Protected method that will not generally be called directly. Pushes the value of the textarea
     * into the iframe editor.
     */
    pushValue : function(){
        if(this.initialized){
            var v = this.el.dom.value.trim();
            
//            if(v.length < 1){
//                v = '&#160;';
//            }
            
            if(this.owner.fireEvent('beforepush', this, v) !== false){
                var d = (this.doc.body || this.doc.documentElement);
                d.innerHTML = v;
                this.cleanUpPaste();
                this.el.dom.value = d.innerHTML;
                this.owner.fireEvent('push', this, v);
            }
        }
    },

    // private
    deferFocus : function(){
        this.focus.defer(10, this);
    },

    // doc'ed in Field
    focus : function(){
        if(this.win && !this.sourceEditMode){
            this.win.focus();
        }else{
            this.el.focus();
        }
    },
    
    assignDocWin: function()
    {
        var iframe = this.iframe;
        
         if(Roo.isIE){
            this.doc = iframe.contentWindow.document;
            this.win = iframe.contentWindow;
        } else {
//            if (!Roo.get(this.frameId)) {
//                return;
//            }
//            this.doc = (iframe.contentDocument || Roo.get(this.frameId).dom.document);
//            this.win = Roo.get(this.frameId).dom.contentWindow;
            
            if (!Roo.get(this.frameId) && !iframe.contentDocument) {
                return;
            }
            
            this.doc = (iframe.contentDocument || Roo.get(this.frameId).dom.document);
            this.win = (iframe.contentWindow || Roo.get(this.frameId).dom.contentWindow);
        }
    },
    
    // private
    initEditor : function(){
        //console.log("INIT EDITOR");
        this.assignDocWin();
        
        
        
        this.doc.designMode="on";
        this.doc.open();
        this.doc.write(this.getDocMarkup());
        this.doc.close();
        
        var dbody = (this.doc.body || this.doc.documentElement);
        //var ss = this.el.getStyles('font-size', 'font-family', 'background-image', 'background-repeat');
        // this copies styles from the containing element into thsi one..
        // not sure why we need all of this..
        //var ss = this.el.getStyles('font-size', 'background-image', 'background-repeat');
        
        //var ss = this.el.getStyles( 'background-image', 'background-repeat');
        //ss['background-attachment'] = 'fixed'; // w3c
        dbody.bgProperties = 'fixed'; // ie
        //Roo.DomHelper.applyStyles(dbody, ss);
        Roo.EventManager.on(this.doc, {
            //'mousedown': this.onEditorEvent,
            'mouseup': this.onEditorEvent,
            'dblclick': this.onEditorEvent,
            'click': this.onEditorEvent,
            'keyup': this.onEditorEvent,
            buffer:100,
            scope: this
        });
        if(Roo.isGecko){
            Roo.EventManager.on(this.doc, 'keypress', this.mozKeyPress, this);
        }
        if(Roo.isIE || Roo.isSafari || Roo.isOpera){
            Roo.EventManager.on(this.doc, 'keydown', this.fixKeys, this);
        }
        this.initialized = true;

        this.owner.fireEvent('initialize', this);
        this.pushValue();
    },

    // private
    onDestroy : function(){
        
        
        
        if(this.rendered){
            
            //for (var i =0; i < this.toolbars.length;i++) {
            //    // fixme - ask toolbars for heights?
            //    this.toolbars[i].onDestroy();
           // }
            
            //this.wrap.dom.innerHTML = '';
            //this.wrap.remove();
        }
    },

    // private
    onFirstFocus : function(){
        
        this.assignDocWin();
        
        
        this.activated = true;
         
    
        if(Roo.isGecko){ // prevent silly gecko errors
            this.win.focus();
            var s = this.win.getSelection();
            if(!s.focusNode || s.focusNode.nodeType != 3){
                var r = s.getRangeAt(0);
                r.selectNodeContents((this.doc.body || this.doc.documentElement));
                r.collapse(true);
                this.deferFocus();
            }
            try{
                this.execCmd('useCSS', true);
                this.execCmd('styleWithCSS', false);
            }catch(e){}
        }
        this.owner.fireEvent('activate', this);
    },

    // private
    adjustFont: function(btn){
        var adjust = btn.cmd == 'increasefontsize' ? 1 : -1;
        //if(Roo.isSafari){ // safari
        //    adjust *= 2;
       // }
        var v = parseInt(this.doc.queryCommandValue('FontSize')|| 3, 10);
        if(Roo.isSafari){ // safari
            var sm = { 10 : 1, 13: 2, 16:3, 18:4, 24: 5, 32:6, 48: 7 };
            v =  (v < 10) ? 10 : v;
            v =  (v > 48) ? 48 : v;
            v = typeof(sm[v]) == 'undefined' ? 1 : sm[v];
            
        }
        
        
        v = Math.max(1, v+adjust);
        
        this.execCmd('FontSize', v  );
    },

    onEditorEvent : function(e){
        this.owner.fireEvent('editorevent', this, e);
      //  this.updateToolbar();
        this.syncValue(); //we can not sync so often.. sync cleans, so this breaks stuff
    },

    insertTag : function(tg)
    {
        // could be a bit smarter... -> wrap the current selected tRoo..
        if (tg.toLowerCase() == 'span' || tg.toLowerCase() == 'code') {
            
            range = this.createRange(this.getSelection());
            var wrappingNode = this.doc.createElement(tg.toLowerCase());
            wrappingNode.appendChild(range.extractContents());
            range.insertNode(wrappingNode);

            return;
            
            
            
        }
        this.execCmd("formatblock",   tg);
        
    },
    
    insertText : function(txt)
    {
        
        
        var range = this.createRange();
        range.deleteContents();
               //alert(Sender.getAttribute('label'));
               
        range.insertNode(this.doc.createTextNode(txt));
    } ,
    
     

    /**
     * Executes a Midas editor command on the editor document and performs necessary focus and
     * toolbar updates. <b>This should only be called after the editor is initialized.</b>
     * @param {String} cmd The Midas command
     * @param {String/Boolean} value (optional) The value to pass to the command (defaults to null)
     */
    relayCmd : function(cmd, value){
        this.win.focus();
        this.execCmd(cmd, value);
        this.owner.fireEvent('editorevent', this);
        //this.updateToolbar();
        this.owner.deferFocus();
    },

    /**
     * Executes a Midas editor command directly on the editor document.
     * For visual commands, you should use {@link #relayCmd} instead.
     * <b>This should only be called after the editor is initialized.</b>
     * @param {String} cmd The Midas command
     * @param {String/Boolean} value (optional) The value to pass to the command (defaults to null)
     */
    execCmd : function(cmd, value){
        this.doc.execCommand(cmd, false, value === undefined ? null : value);
        this.syncValue();
    },
 
 
   
    /**
     * Inserts the passed text at the current cursor position. Note: the editor must be initialized and activated
     * to insert tRoo.
     * @param {String} text | dom node.. 
     */
    insertAtCursor : function(text)
    {
        
        
        
        if(!this.activated){
            return;
        }
        /*
        if(Roo.isIE){
            this.win.focus();
            var r = this.doc.selection.createRange();
            if(r){
                r.collapse(true);
                r.pasteHTML(text);
                this.syncValue();
                this.deferFocus();
            
            }
            return;
        }
        */
        if(Roo.isGecko || Roo.isOpera || Roo.isSafari){
            this.win.focus();
            
            
            // from jquery ui (MIT licenced)
            var range, node;
            var win = this.win;
            
            if (win.getSelection && win.getSelection().getRangeAt) {
                range = win.getSelection().getRangeAt(0);
                node = typeof(text) == 'string' ? range.createContextualFragment(text) : text;
                range.insertNode(node);
            } else if (win.document.selection && win.document.selection.createRange) {
                // no firefox support
                var txt = typeof(text) == 'string' ? text : text.outerHTML;
                win.document.selection.createRange().pasteHTML(txt);
            } else {
                // no firefox support
                var txt = typeof(text) == 'string' ? text : text.outerHTML;
                this.execCmd('InsertHTML', txt);
            } 
            
            this.syncValue();
            
            this.deferFocus();
        }
    },
 // private
    mozKeyPress : function(e){
        if(e.ctrlKey){
            var c = e.getCharCode(), cmd;
          
            if(c > 0){
                c = String.fromCharCode(c).toLowerCase();
                switch(c){
                    case 'b':
                        cmd = 'bold';
                        break;
                    case 'i':
                        cmd = 'italic';
                        break;
                    
                    case 'u':
                        cmd = 'underline';
                        break;
                    
                    case 'v':
                        this.cleanUpPaste.defer(100, this);
                        return;
                        
                }
                if(cmd){
                    this.win.focus();
                    this.execCmd(cmd);
                    this.deferFocus();
                    e.preventDefault();
                }
                
            }
        }
    },

    // private
    fixKeys : function(){ // load time branching for fastest keydown performance
        if(Roo.isIE){
            return function(e){
                var k = e.getKey(), r;
                if(k == e.TAB){
                    e.stopEvent();
                    r = this.doc.selection.createRange();
                    if(r){
                        r.collapse(true);
                        r.pasteHTML('&#160;&#160;&#160;&#160;');
                        this.deferFocus();
                    }
                    return;
                }
                
                if(k == e.ENTER){
                    r = this.doc.selection.createRange();
                    if(r){
                        var target = r.parentElement();
                        if(!target || target.tagName.toLowerCase() != 'li'){
                            e.stopEvent();
                            r.pasteHTML('<br />');
                            r.collapse(false);
                            r.select();
                        }
                    }
                }
                if (String.fromCharCode(k).toLowerCase() == 'v') { // paste
                    this.cleanUpPaste.defer(100, this);
                    return;
                }
                
                
            };
        }else if(Roo.isOpera){
            return function(e){
                var k = e.getKey();
                if(k == e.TAB){
                    e.stopEvent();
                    this.win.focus();
                    this.execCmd('InsertHTML','&#160;&#160;&#160;&#160;');
                    this.deferFocus();
                }
                if (String.fromCharCode(k).toLowerCase() == 'v') { // paste
                    this.cleanUpPaste.defer(100, this);
                    return;
                }
                
            };
        }else if(Roo.isSafari){
            return function(e){
                var k = e.getKey();
                
                if(k == e.TAB){
                    e.stopEvent();
                    this.execCmd('InsertText','\t');
                    this.deferFocus();
                    return;
                }
               if (String.fromCharCode(k).toLowerCase() == 'v') { // paste
                    this.cleanUpPaste.defer(100, this);
                    return;
                }
                
             };
        }
    }(),
    
    getAllAncestors: function()
    {
        var p = this.getSelectedNode();
        var a = [];
        if (!p) {
            a.push(p); // push blank onto stack..
            p = this.getParentElement();
        }
        
        
        while (p && (p.nodeType == 1) && (p.tagName.toLowerCase() != 'body')) {
            a.push(p);
            p = p.parentNode;
        }
        a.push(this.doc.body);
        return a;
    },
    lastSel : false,
    lastSelNode : false,
    
    
    getSelection : function() 
    {
        this.assignDocWin();
        return Roo.isIE ? this.doc.selection : this.win.getSelection();
    },
    
    getSelectedNode: function() 
    {
        // this may only work on Gecko!!!
        
        // should we cache this!!!!
        
        
        
         
        var range = this.createRange(this.getSelection()).cloneRange();
        
        if (Roo.isIE) {
            var parent = range.parentElement();
            while (true) {
                var testRange = range.duplicate();
                testRange.moveToElementText(parent);
                if (testRange.inRange(range)) {
                    break;
                }
                if ((parent.nodeType != 1) || (parent.tagName.toLowerCase() == 'body')) {
                    break;
                }
                parent = parent.parentElement;
            }
            return parent;
        }
        
        // is ancestor a text element.
        var ac =  range.commonAncestorContainer;
        if (ac.nodeType == 3) {
            ac = ac.parentNode;
        }
        
        var ar = ac.childNodes;
         
        var nodes = [];
        var other_nodes = [];
        var has_other_nodes = false;
        for (var i=0;i<ar.length;i++) {
            if ((ar[i].nodeType == 3) && (!ar[i].data.length)) { // empty text ? 
                continue;
            }
            // fullly contained node.
            
            if (this.rangeIntersectsNode(range,ar[i]) && this.rangeCompareNode(range,ar[i]) == 3) {
                nodes.push(ar[i]);
                continue;
            }
            
            // probably selected..
            if ((ar[i].nodeType == 1) && this.rangeIntersectsNode(range,ar[i]) && (this.rangeCompareNode(range,ar[i]) > 0)) {
                other_nodes.push(ar[i]);
                continue;
            }
            // outer..
            if (!this.rangeIntersectsNode(range,ar[i])|| (this.rangeCompareNode(range,ar[i]) == 0))  {
                continue;
            }
            
            
            has_other_nodes = true;
        }
        if (!nodes.length && other_nodes.length) {
            nodes= other_nodes;
        }
        if (has_other_nodes || !nodes.length || (nodes.length > 1)) {
            return false;
        }
        
        return nodes[0];
    },
    createRange: function(sel)
    {
        // this has strange effects when using with 
        // top toolbar - not sure if it's a great idea.
        //this.editor.contentWindow.focus();
        if (typeof sel != "undefined") {
            try {
                return sel.getRangeAt ? sel.getRangeAt(0) : sel.createRange();
            } catch(e) {
                return this.doc.createRange();
            }
        } else {
            return this.doc.createRange();
        }
    },
    getParentElement: function()
    {
        
        this.assignDocWin();
        var sel = Roo.isIE ? this.doc.selection : this.win.getSelection();
        
        var range = this.createRange(sel);
         
        try {
            var p = range.commonAncestorContainer;
            while (p.nodeType == 3) { // text node
                p = p.parentNode;
            }
            return p;
        } catch (e) {
            return null;
        }
    
    },
    /***
     *
     * Range intersection.. the hard stuff...
     *  '-1' = before
     *  '0' = hits..
     *  '1' = after.
     *         [ -- selected range --- ]
     *   [fail]                        [fail]
     *
     *    basically..
     *      if end is before start or  hits it. fail.
     *      if start is after end or hits it fail.
     *
     *   if either hits (but other is outside. - then it's not 
     *   
     *    
     **/
    
    
    // @see http://www.thismuchiknow.co.uk/?p=64.
    rangeIntersectsNode : function(range, node)
    {
        var nodeRange = node.ownerDocument.createRange();
        try {
            nodeRange.selectNode(node);
        } catch (e) {
            nodeRange.selectNodeContents(node);
        }
    
        var rangeStartRange = range.cloneRange();
        rangeStartRange.collapse(true);
    
        var rangeEndRange = range.cloneRange();
        rangeEndRange.collapse(false);
    
        var nodeStartRange = nodeRange.cloneRange();
        nodeStartRange.collapse(true);
    
        var nodeEndRange = nodeRange.cloneRange();
        nodeEndRange.collapse(false);
    
        return rangeStartRange.compareBoundaryPoints(
                 Range.START_TO_START, nodeEndRange) == -1 &&
               rangeEndRange.compareBoundaryPoints(
                 Range.START_TO_START, nodeStartRange) == 1;
        
         
    },
    rangeCompareNode : function(range, node)
    {
        var nodeRange = node.ownerDocument.createRange();
        try {
            nodeRange.selectNode(node);
        } catch (e) {
            nodeRange.selectNodeContents(node);
        }
        
        
        range.collapse(true);
    
        nodeRange.collapse(true);
     
        var ss = range.compareBoundaryPoints( Range.START_TO_START, nodeRange);
        var ee = range.compareBoundaryPoints(  Range.END_TO_END, nodeRange);
         
        //Roo.log(node.tagName + ': ss='+ss +', ee='+ee)
        
        var nodeIsBefore   =  ss == 1;
        var nodeIsAfter    = ee == -1;
        
        if (nodeIsBefore && nodeIsAfter)
            return 0; // outer
        if (!nodeIsBefore && nodeIsAfter)
            return 1; //right trailed.
        
        if (nodeIsBefore && !nodeIsAfter)
            return 2;  // left trailed.
        // fully contined.
        return 3;
    },

    // private? - in a new class?
    cleanUpPaste :  function()
    {
        // cleans up the whole document..
        Roo.log('cleanuppaste');
        
        this.cleanUpChildren(this.doc.body);
        var clean = this.cleanWordChars(this.doc.body.innerHTML);
        if (clean != this.doc.body.innerHTML) {
            this.doc.body.innerHTML = clean;
        }
        
    },
    
    cleanWordChars : function(input) {// change the chars to hex code
        var he = Roo.HtmlEditorCore;
        
        var output = input;
        Roo.each(he.swapCodes, function(sw) { 
            var swapper = new RegExp("\\u" + sw[0].toString(16), "g"); // hex codes
            
            output = output.replace(swapper, sw[1]);
        });
        
        return output;
    },
    
    
    cleanUpChildren : function (n)
    {
        if (!n.childNodes.length) {
            return;
        }
        for (var i = n.childNodes.length-1; i > -1 ; i--) {
           this.cleanUpChild(n.childNodes[i]);
        }
    },
    
    
        
    
    cleanUpChild : function (node)
    {
        var ed = this;
        //console.log(node);
        if (node.nodeName == "#text") {
            // clean up silly Windows -- stuff?
            return; 
        }
        if (node.nodeName == "#comment") {
            node.parentNode.removeChild(node);
            // clean up silly Windows -- stuff?
            return; 
        }
        var lcname = node.tagName.toLowerCase();
        // we ignore whitelists... ?? = not really the way to go, but we probably have not got a full
        // whitelist of tags..
        
        if (this.black.indexOf(lcname) > -1 && this.clearUp ) {
            // remove node.
            node.parentNode.removeChild(node);
            return;
            
        }
        
        var remove_keep_children= Roo.HtmlEditorCore.remove.indexOf(node.tagName.toLowerCase()) > -1;
        
        // remove <a name=....> as rendering on yahoo mailer is borked with this.
        // this will have to be flaged elsewhere - perhaps ablack=name... on the mailer..
        
        //if (node.tagName.toLowerCase() == 'a' && !node.hasAttribute('href')) {
        //    remove_keep_children = true;
        //}
        
        if (remove_keep_children) {
            this.cleanUpChildren(node);
            // inserts everything just before this node...
            while (node.childNodes.length) {
                var cn = node.childNodes[0];
                node.removeChild(cn);
                node.parentNode.insertBefore(cn, node);
            }
            node.parentNode.removeChild(node);
            return;
        }
        
        if (!node.attributes || !node.attributes.length) {
            this.cleanUpChildren(node);
            return;
        }
        
        function cleanAttr(n,v)
        {
            
            if (v.match(/^\./) || v.match(/^\//)) {
                return;
            }
            if (v.match(/^(http|https):\/\//) || v.match(/^mailto:/)) {
                return;
            }
            if (v.match(/^#/)) {
                return;
            }
//            Roo.log("(REMOVE TAG)"+ node.tagName +'.' + n + '=' + v);
            node.removeAttribute(n);
            
        }
        
        var cwhite = this.cwhite;
        var cblack = this.cblack;
            
        function cleanStyle(n,v)
        {
            if (v.match(/expression/)) { //XSS?? should we even bother..
                node.removeAttribute(n);
                return;
            }
            
            var parts = v.split(/;/);
            var clean = [];
            
            Roo.each(parts, function(p) {
                p = p.replace(/^\s+/g,'').replace(/\s+$/g,'');
                if (!p.length) {
                    return true;
                }
                var l = p.split(':').shift().replace(/\s+/g,'');
                l = l.replace(/^\s+/g,'').replace(/\s+$/g,'');
                
                if ( cwhite.length && cblack.indexOf(l) > -1) {
//                    Roo.log('(REMOVE CSS)' + node.tagName +'.' + n + ':'+l + '=' + v);
                    //node.removeAttribute(n);
                    return true;
                }
                //Roo.log()
                // only allow 'c whitelisted system attributes'
                if ( cwhite.length &&  cwhite.indexOf(l) < 0) {
//                    Roo.log('(REMOVE CSS)' + node.tagName +'.' + n + ':'+l + '=' + v);
                    //node.removeAttribute(n);
                    return true;
                }
                
                
                 
                
                clean.push(p);
                return true;
            });
            if (clean.length) { 
                node.setAttribute(n, clean.join(';'));
            } else {
                node.removeAttribute(n);
            }
            
        }
        
        
        for (var i = node.attributes.length-1; i > -1 ; i--) {
            var a = node.attributes[i];
            //console.log(a);
            
            if (a.name.toLowerCase().substr(0,2)=='on')  {
                node.removeAttribute(a.name);
                continue;
            }
            if (Roo.HtmlEditorCore.ablack.indexOf(a.name.toLowerCase()) > -1) {
                node.removeAttribute(a.name);
                continue;
            }
            if (Roo.HtmlEditorCore.aclean.indexOf(a.name.toLowerCase()) > -1) {
                cleanAttr(a.name,a.value); // fixme..
                continue;
            }
            if (a.name == 'style') {
                cleanStyle(a.name,a.value);
                continue;
            }
            /// clean up MS crap..
            // tecnically this should be a list of valid class'es..
            
            
            if (a.name == 'class') {
                if (a.value.match(/^Mso/)) {
                    node.className = '';
                }
                
                if (a.value.match(/body/)) {
                    node.className = '';
                }
                continue;
            }
            
            // style cleanup!?
            // class cleanup?
            
        }
        
        
        this.cleanUpChildren(node);
        
        
    },
    /**
     * Clean up MS wordisms...
     */
    cleanWord : function(node)
    {
        var _t = this;
        var cleanWordChildren = function()
        {
            if (!node.childNodes.length) {
                return;
            }
            for (var i = node.childNodes.length-1; i > -1 ; i--) {
               _t.cleanWord(node.childNodes[i]);
            }
        }
        
        
        if (!node) {
            this.cleanWord(this.doc.body);
            return;
        }
        if (node.nodeName == "#text") {
            // clean up silly Windows -- stuff?
            return; 
        }
        if (node.nodeName == "#comment") {
            node.parentNode.removeChild(node);
            // clean up silly Windows -- stuff?
            return; 
        }
        
        if (node.tagName.toLowerCase().match(/^(style|script|applet|embed|noframes|noscript)$/)) {
            node.parentNode.removeChild(node);
            return;
        }
        
        // remove - but keep children..
        if (node.tagName.toLowerCase().match(/^(meta|link|\\?xml:|st1:|o:|font)/)) {
            while (node.childNodes.length) {
                var cn = node.childNodes[0];
                node.removeChild(cn);
                node.parentNode.insertBefore(cn, node);
            }
            node.parentNode.removeChild(node);
            cleanWordChildren();
            return;
        }
        // clean styles
        if (node.className.length) {
            
            var cn = node.className.split(/\W+/);
            var cna = [];
            Roo.each(cn, function(cls) {
                if (cls.match(/Mso[a-zA-Z]+/)) {
                    return;
                }
                cna.push(cls);
            });
            node.className = cna.length ? cna.join(' ') : '';
            if (!cna.length) {
                node.removeAttribute("class");
            }
        }
        
        if (node.hasAttribute("lang")) {
            node.removeAttribute("lang");
        }
        
        if (node.hasAttribute("style")) {
            
            var styles = node.getAttribute("style").split(";");
            var nstyle = [];
            Roo.each(styles, function(s) {
                if (!s.match(/:/)) {
                    return;
                }
                var kv = s.split(":");
                if (kv[0].match(/^(mso-|line|font|background|margin|padding|color)/)) {
                    return;
                }
                // what ever is left... we allow.
                nstyle.push(s);
            });
            node.setAttribute("style", nstyle.length ? nstyle.join(';') : '');
            if (!nstyle.length) {
                node.removeAttribute('style');
            }
        }
        
        cleanWordChildren();
        
        
    },
    domToHTML : function(currentElement, depth, nopadtext) {
        
        depth = depth || 0;
        nopadtext = nopadtext || false;
    
        if (!currentElement) {
            return this.domToHTML(this.doc.body);
        }
        
        //Roo.log(currentElement);
        var j;
        var allText = false;
        var nodeName = currentElement.nodeName;
        var tagName = Roo.util.Format.htmlEncode(currentElement.tagName);
        
        if  (nodeName == '#text') {
            return currentElement.nodeValue;
        }
        
        
        var ret = '';
        if (nodeName != 'BODY') {
             
            var i = 0;
            // Prints the node tagName, such as <A>, <IMG>, etc
            if (tagName) {
                var attr = [];
                for(i = 0; i < currentElement.attributes.length;i++) {
                    // quoting?
                    var aname = currentElement.attributes.item(i).name;
                    if (!currentElement.attributes.item(i).value.length) {
                        continue;
                    }
                    attr.push(aname + '="' + Roo.util.Format.htmlEncode(currentElement.attributes.item(i).value) + '"' );
                }
                
                ret = "<"+currentElement.tagName+ ( attr.length ? (' ' + attr.join(' ') ) : '') + ">";
            } 
            else {
                
                // eack
            }
        } else {
            tagName = false;
        }
        if (['IMG', 'BR', 'HR', 'INPUT'].indexOf(tagName) > -1) {
            return ret;
        }
        if (['PRE', 'TEXTAREA', 'TD', 'A', 'SPAN'].indexOf(tagName) > -1) { // or code?
            nopadtext = true;
        }
        
        
        // Traverse the tree
        i = 0;
        var currentElementChild = currentElement.childNodes.item(i);
        var allText = true;
        var innerHTML  = '';
        lastnode = '';
        while (currentElementChild) {
            // Formatting code (indent the tree so it looks nice on the screen)
            var nopad = nopadtext;
            if (lastnode == 'SPAN') {
                nopad  = true;
            }
            // text
            if  (currentElementChild.nodeName == '#text') {
                var toadd = Roo.util.Format.htmlEncode(currentElementChild.nodeValue);
                if (!nopad && toadd.length > 80) {
                    innerHTML  += "\n" + (new Array( depth + 1 )).join( "  "  );
                }
                innerHTML  += toadd;
                
                i++;
                currentElementChild = currentElement.childNodes.item(i);
                lastNode = '';
                continue;
            }
            allText = false;
            
            innerHTML  += nopad ? '' : "\n" + (new Array( depth + 1 )).join( "  "  );
                
            // Recursively traverse the tree structure of the child node
            innerHTML   += this.domToHTML(currentElementChild, depth+1, nopadtext);
            lastnode = currentElementChild.nodeName;
            i++;
            currentElementChild=currentElement.childNodes.item(i);
        }
        
        ret += innerHTML;
        
        if (!allText) {
                // The remaining code is mostly for formatting the tree
            ret+= nopadtext ? '' : "\n" + (new Array( depth  )).join( "  "  );
        }
        
        
        if (tagName) {
            ret+= "</"+tagName+">";
        }
        return ret;
        
    },
        
    applyBlacklists : function()
    {
        var w = typeof(this.owner.white) != 'undefined' && this.owner.white ? this.owner.white  : [];
        var b = typeof(this.owner.black) != 'undefined' && this.owner.black ? this.owner.black :  [];
        
        this.white = [];
        this.black = [];
        Roo.each(Roo.HtmlEditorCore.white, function(tag) {
            if (b.indexOf(tag) > -1) {
                return;
            }
            this.white.push(tag);
            
        }, this);
        
        Roo.each(w, function(tag) {
            if (b.indexOf(tag) > -1) {
                return;
            }
            if (this.white.indexOf(tag) > -1) {
                return;
            }
            this.white.push(tag);
            
        }, this);
        
        
        Roo.each(Roo.HtmlEditorCore.black, function(tag) {
            if (w.indexOf(tag) > -1) {
                return;
            }
            this.black.push(tag);
            
        }, this);
        
        Roo.each(b, function(tag) {
            if (w.indexOf(tag) > -1) {
                return;
            }
            if (this.black.indexOf(tag) > -1) {
                return;
            }
            this.black.push(tag);
            
        }, this);
        
        
        w = typeof(this.owner.cwhite) != 'undefined' && this.owner.cwhite ? this.owner.cwhite  : [];
        b = typeof(this.owner.cblack) != 'undefined' && this.owner.cblack ? this.owner.cblack :  [];
        
        this.cwhite = [];
        this.cblack = [];
        Roo.each(Roo.HtmlEditorCore.cwhite, function(tag) {
            if (b.indexOf(tag) > -1) {
                return;
            }
            this.cwhite.push(tag);
            
        }, this);
        
        Roo.each(w, function(tag) {
            if (b.indexOf(tag) > -1) {
                return;
            }
            if (this.cwhite.indexOf(tag) > -1) {
                return;
            }
            this.cwhite.push(tag);
            
        }, this);
        
        
        Roo.each(Roo.HtmlEditorCore.cblack, function(tag) {
            if (w.indexOf(tag) > -1) {
                return;
            }
            this.cblack.push(tag);
            
        }, this);
        
        Roo.each(b, function(tag) {
            if (w.indexOf(tag) > -1) {
                return;
            }
            if (this.cblack.indexOf(tag) > -1) {
                return;
            }
            this.cblack.push(tag);
            
        }, this);
    }
    
    // hide stuff that is not compatible
    /**
     * @event blur
     * @hide
     */
    /**
     * @event change
     * @hide
     */
    /**
     * @event focus
     * @hide
     */
    /**
     * @event specialkey
     * @hide
     */
    /**
     * @cfg {String} fieldClass @hide
     */
    /**
     * @cfg {String} focusClass @hide
     */
    /**
     * @cfg {String} autoCreate @hide
     */
    /**
     * @cfg {String} inputType @hide
     */
    /**
     * @cfg {String} invalidClass @hide
     */
    /**
     * @cfg {String} invalidText @hide
     */
    /**
     * @cfg {String} msgFx @hide
     */
    /**
     * @cfg {String} validateOnBlur @hide
     */
});

Roo.HtmlEditorCore.white = [
        'area', 'br', 'img', 'input', 'hr', 'wbr',
        
       'address', 'blockquote', 'center', 'dd',      'dir',       'div', 
       'dl',      'dt',         'h1',     'h2',      'h3',        'h4', 
       'h5',      'h6',         'hr',     'isindex', 'listing',   'marquee', 
       'menu',    'multicol',   'ol',     'p',       'plaintext', 'pre', 
       'table',   'ul',         'xmp', 
       
       'caption', 'col', 'colgroup', 'tbody', 'td', 'tfoot', 'th', 
      'thead',   'tr', 
     
      'dir', 'menu', 'ol', 'ul', 'dl',
       
      'embed',  'object'
];


Roo.HtmlEditorCore.black = [
    //    'embed',  'object', // enable - backend responsiblity to clean thiese
        'applet', // 
        'base',   'basefont', 'bgsound', 'blink',  'body', 
        'frame',  'frameset', 'head',    'html',   'ilayer', 
        'iframe', 'layer',  'link',     'meta',    'object',   
        'script', 'style' ,'title',  'xml' // clean later..
];
Roo.HtmlEditorCore.clean = [
    'script', 'style', 'title', 'xml'
];
Roo.HtmlEditorCore.remove = [
    'font'
];
// attributes..

Roo.HtmlEditorCore.ablack = [
    'on'
];
    
Roo.HtmlEditorCore.aclean = [ 
    'action', 'background', 'codebase', 'dynsrc', 'href', 'lowsrc' 
];

// protocols..
Roo.HtmlEditorCore.pwhite= [
        'http',  'https',  'mailto'
];

// white listed style attributes.
Roo.HtmlEditorCore.cwhite= [
      //  'text-align', /// default is to allow most things..
      
         
//        'font-size'//??
];

// black listed style attributes.
Roo.HtmlEditorCore.cblack= [
      //  'font-size' -- this can be set by the project 
];


Roo.HtmlEditorCore.swapCodes   =[ 
    [    8211, "--" ], 
    [    8212, "--" ], 
    [    8216,  "'" ],  
    [    8217, "'" ],  
    [    8220, '"' ],  
    [    8221, '"' ],  
    [    8226, "*" ],  
    [    8230, "..." ]
]; 

    /*
 * - LGPL
 *
 * HtmlEditor
 * 
 */

/**
 * @class Roo.bootstrap.HtmlEditor
 * @extends Roo.bootstrap.TextArea
 * Bootstrap HtmlEditor class

 * @constructor
 * Create a new HtmlEditor
 * @param {Object} config The config object
 */

Roo.bootstrap.HtmlEditor = function(config){
    Roo.bootstrap.HtmlEditor.superclass.constructor.call(this, config);
    if (!this.toolbars) {
        this.toolbars = [];
    }
    this.editorcore = new Roo.HtmlEditorCore(Roo.apply({ owner : this} , config));
    this.addEvents({
            /**
             * @event initialize
             * Fires when the editor is fully initialized (including the iframe)
             * @param {HtmlEditor} this
             */
            initialize: true,
            /**
             * @event activate
             * Fires when the editor is first receives the focus. Any insertion must wait
             * until after this event.
             * @param {HtmlEditor} this
             */
            activate: true,
             /**
             * @event beforesync
             * Fires before the textarea is updated with content from the editor iframe. Return false
             * to cancel the sync.
             * @param {HtmlEditor} this
             * @param {String} html
             */
            beforesync: true,
             /**
             * @event beforepush
             * Fires before the iframe editor is updated with content from the textarea. Return false
             * to cancel the push.
             * @param {HtmlEditor} this
             * @param {String} html
             */
            beforepush: true,
             /**
             * @event sync
             * Fires when the textarea is updated with content from the editor iframe.
             * @param {HtmlEditor} this
             * @param {String} html
             */
            sync: true,
             /**
             * @event push
             * Fires when the iframe editor is updated with content from the textarea.
             * @param {HtmlEditor} this
             * @param {String} html
             */
            push: true,
             /**
             * @event editmodechange
             * Fires when the editor switches edit modes
             * @param {HtmlEditor} this
             * @param {Boolean} sourceEdit True if source edit, false if standard editing.
             */
            editmodechange: true,
            /**
             * @event editorevent
             * Fires when on any editor (mouse up/down cursor movement etc.) - used for toolbar hooks.
             * @param {HtmlEditor} this
             */
            editorevent: true,
            /**
             * @event firstfocus
             * Fires when on first focus - needed by toolbars..
             * @param {HtmlEditor} this
             */
            firstfocus: true,
            /**
             * @event autosave
             * Auto save the htmlEditor value as a file into Events
             * @param {HtmlEditor} this
             */
            autosave: true,
            /**
             * @event savedpreview
             * preview the saved version of htmlEditor
             * @param {HtmlEditor} this
             */
            savedpreview: true
        });
};


Roo.extend(Roo.bootstrap.HtmlEditor, Roo.bootstrap.TextArea,  {
    
    
      /**
     * @cfg {Array} toolbars Array of toolbars. - defaults to just the Standard one
     */
    toolbars : false,
   
     /**
     * @cfg {String} resizable  's' or 'se' or 'e' - wrapps the element in a
     *                        Roo.resizable.
     */
    resizable : false,
     /**
     * @cfg {Number} height (in pixels)
     */   
    height: 300,
   /**
     * @cfg {Number} width (in pixels)
     */   
    width: false,
    
    /**
     * @cfg {Array} stylesheets url of stylesheets. set to [] to disable stylesheets.
     * 
     */
    stylesheets: false,
    
    // id of frame..
    frameId: false,
    
    // private properties
    validationEvent : false,
    deferHeight: true,
    initialized : false,
    activated : false,
    
    onFocus : Roo.emptyFn,
    iframePad:3,
    hideMode:'offsets',
    
    
    tbContainer : false,
    
    toolbarContainer :function() {
        return this.wrap.select('.x-html-editor-tb',true).first();
    },

    /**
     * Protected method that will not generally be called directly. It
     * is called when the editor creates its toolbar. Override this method if you need to
     * add custom toolbar buttons.
     * @param {HtmlEditor} editor
     */
    createToolbar : function(){
        
        Roo.log("create toolbars");
        
        this.toolbars = [ new Roo.bootstrap.htmleditor.ToolbarStandard({editor: this} ) ];
        this.toolbars[0].render(this.toolbarContainer());
        
        return;
        
//        if (!editor.toolbars || !editor.toolbars.length) {
//            editor.toolbars = [ new Roo.bootstrap.HtmlEditor.ToolbarStandard() ]; // can be empty?
//        }
//        
//        for (var i =0 ; i < editor.toolbars.length;i++) {
//            editor.toolbars[i] = Roo.factory(
//                    typeof(editor.toolbars[i]) == 'string' ?
//                        { xtype: editor.toolbars[i]} : editor.toolbars[i],
//                Roo.bootstrap.HtmlEditor);
//            editor.toolbars[i].init(editor);
//        }
    },

     
    // private
    onRender : function(ct, position)
    {
       // Roo.log("Call onRender: " + this.xtype);
        var _t = this;
        Roo.bootstrap.HtmlEditor.superclass.onRender.call(this, ct, position);
      
        this.wrap = this.inputEl().wrap({
            cls:'x-html-editor-wrap', cn:{cls:'x-html-editor-tb'}
        });
        
        this.editorcore.onRender(ct, position);
         
        if (this.resizable) {
            this.resizeEl = new Roo.Resizable(this.wrap, {
                pinned : true,
                wrap: true,
                dynamic : true,
                minHeight : this.height,
                height: this.height,
                handles : this.resizable,
                width: this.width,
                listeners : {
                    resize : function(r, w, h) {
                        _t.onResize(w,h); // -something
                    }
                }
            });
            
        }
        this.createToolbar(this);
       
        
        if(!this.width && this.resizable){
            this.setSize(this.wrap.getSize());
        }
        if (this.resizeEl) {
            this.resizeEl.resizeTo.defer(100, this.resizeEl,[ this.width,this.height ] );
            // should trigger onReize..
        }
        
    },

    // private
    onResize : function(w, h)
    {
        Roo.log('resize: ' +w + ',' + h );
        Roo.bootstrap.HtmlEditor.superclass.onResize.apply(this, arguments);
        var ew = false;
        var eh = false;
        
        if(this.inputEl() ){
            if(typeof w == 'number'){
                var aw = w - this.wrap.getFrameWidth('lr');
                this.inputEl().setWidth(this.adjustWidth('textarea', aw));
                ew = aw;
            }
            if(typeof h == 'number'){
                 var tbh = -11;  // fixme it needs to tool bar size!
                for (var i =0; i < this.toolbars.length;i++) {
                    // fixme - ask toolbars for heights?
                    tbh += this.toolbars[i].el.getHeight();
                    //if (this.toolbars[i].footer) {
                    //    tbh += this.toolbars[i].footer.el.getHeight();
                    //}
                }
              
                
                
                
                
                var ah = h - this.wrap.getFrameWidth('tb') - tbh;// this.tb.el.getHeight();
                ah -= 5; // knock a few pixes off for look..
                this.inputEl().setHeight(this.adjustWidth('textarea', ah));
                var eh = ah;
            }
        }
        Roo.log('onResize:' + [w,h,ew,eh].join(',') );
        this.editorcore.onResize(ew,eh);
        
    },

    /**
     * Toggles the editor between standard and source edit mode.
     * @param {Boolean} sourceEdit (optional) True for source edit, false for standard
     */
    toggleSourceEdit : function(sourceEditMode)
    {
        this.editorcore.toggleSourceEdit(sourceEditMode);
        
        if(this.editorcore.sourceEditMode){
            Roo.log('editor - showing textarea');
            
//            Roo.log('in');
//            Roo.log(this.syncValue());
            this.syncValue();
            this.inputEl().removeClass(['hide', 'x-hidden']);
            this.inputEl().dom.removeAttribute('tabIndex');
            this.inputEl().focus();
        }else{
            Roo.log('editor - hiding textarea');
//            Roo.log('out')
//            Roo.log(this.pushValue()); 
            this.pushValue();
            
            this.inputEl().addClass(['hide', 'x-hidden']);
            this.inputEl().dom.setAttribute('tabIndex', -1);
            //this.deferFocus();
        }
         
        if(this.resizable){
            this.setSize(this.wrap.getSize());
        }
        
        this.fireEvent('editmodechange', this, this.editorcore.sourceEditMode);
    },
 
    // private (for BoxComponent)
    adjustSize : Roo.BoxComponent.prototype.adjustSize,

    // private (for BoxComponent)
    getResizeEl : function(){
        return this.wrap;
    },

    // private (for BoxComponent)
    getPositionEl : function(){
        return this.wrap;
    },

    // private
    initEvents : function(){
        this.originalValue = this.getValue();
    },

//    /**
//     * Overridden and disabled. The editor element does not support standard valid/invalid marking. @hide
//     * @method
//     */
//    markInvalid : Roo.emptyFn,
//    /**
//     * Overridden and disabled. The editor element does not support standard valid/invalid marking. @hide
//     * @method
//     */
//    clearInvalid : Roo.emptyFn,

    setValue : function(v){
        Roo.bootstrap.HtmlEditor.superclass.setValue.call(this, v);
        this.editorcore.pushValue();
    },

     
    // private
    deferFocus : function(){
        this.focus.defer(10, this);
    },

    // doc'ed in Field
    focus : function(){
        this.editorcore.focus();
        
    },
      

    // private
    onDestroy : function(){
        
        
        
        if(this.rendered){
            
            for (var i =0; i < this.toolbars.length;i++) {
                // fixme - ask toolbars for heights?
                this.toolbars[i].onDestroy();
            }
            
            this.wrap.dom.innerHTML = '';
            this.wrap.remove();
        }
    },

    // private
    onFirstFocus : function(){
        //Roo.log("onFirstFocus");
        this.editorcore.onFirstFocus();
         for (var i =0; i < this.toolbars.length;i++) {
            this.toolbars[i].onFirstFocus();
        }
        
    },
    
    // private
    syncValue : function()
    {   
        this.editorcore.syncValue();
    },
    
    pushValue : function()
    {   
        this.editorcore.pushValue();
    }
     
    
    // hide stuff that is not compatible
    /**
     * @event blur
     * @hide
     */
    /**
     * @event change
     * @hide
     */
    /**
     * @event focus
     * @hide
     */
    /**
     * @event specialkey
     * @hide
     */
    /**
     * @cfg {String} fieldClass @hide
     */
    /**
     * @cfg {String} focusClass @hide
     */
    /**
     * @cfg {String} autoCreate @hide
     */
    /**
     * @cfg {String} inputType @hide
     */
    /**
     * @cfg {String} invalidClass @hide
     */
    /**
     * @cfg {String} invalidText @hide
     */
    /**
     * @cfg {String} msgFx @hide
     */
    /**
     * @cfg {String} validateOnBlur @hide
     */
});
 
    
   
   
   
      
Roo.namespace('Roo.bootstrap.htmleditor');
/**
 * @class Roo.bootstrap.HtmlEditorToolbar1
 * Basic Toolbar
 * 
 * Usage:
 *
 new Roo.bootstrap.HtmlEditor({
    ....
    toolbars : [
        new Roo.bootstrap.HtmlEditorToolbar1({
            disable : { fonts: 1 , format: 1, ..., ... , ...],
            btns : [ .... ]
        })
    }
     
 * 
 * @cfg {Object} disable List of elements to disable..
 * @cfg {Array} btns List of additional buttons.
 * 
 * 
 * NEEDS Extra CSS? 
 * .x-html-editor-tb .x-edit-none .x-btn-text { background: none; }
 */
 
Roo.bootstrap.htmleditor.ToolbarStandard = function(config)
{
    
    Roo.apply(this, config);
    
    // default disabled, based on 'good practice'..
    this.disable = this.disable || {};
    Roo.applyIf(this.disable, {
        fontSize : true,
        colors : true,
        specialElements : true
    });
    Roo.bootstrap.htmleditor.ToolbarStandard.superclass.constructor.call(this, config);
    
    this.editor = config.editor;
    this.editorcore = config.editor.editorcore;
    
    this.buttons   = new Roo.util.MixedCollection(false, function(o) { return o.cmd; });
    
    //Roo.form.HtmlEditorToolbar1.superclass.constructor.call(this, editor.wrap.dom.firstChild, [], config);
    // dont call parent... till later.
}
Roo.extend(Roo.bootstrap.htmleditor.ToolbarStandard, Roo.bootstrap.NavSimplebar,  {
     
    bar : true,
    
    editor : false,
    editorcore : false,
    
    
    formats : [
        "p" ,  
        "h1","h2","h3","h4","h5","h6", 
        "pre", "code", 
        "abbr", "acronym", "address", "cite", "samp", "var",
        'div','span'
    ],
    
    onRender : function(ct, position)
    {
       // Roo.log("Call onRender: " + this.xtype);
        
       Roo.bootstrap.htmleditor.ToolbarStandard.superclass.onRender.call(this, ct, position);
       Roo.log(this.el);
       this.el.dom.style.marginBottom = '0';
       var _this = this;
       var editorcore = this.editorcore;
       var editor= this.editor;
       
       var children = [];
       var btn = function(id,cmd , toggle, handler){
       
            var  event = toggle ? 'toggle' : 'click';
       
            var a = {
                size : 'sm',
                xtype: 'Button',
                xns: Roo.bootstrap,
                glyphicon : id,
                cmd : id || cmd,
                enableToggle:toggle !== false,
                //html : 'submit'
                pressed : toggle ? false : null,
                listeners : {}
            }
            a.listeners[toggle ? 'toggle' : 'click'] = function() {
                handler ? handler.call(_this,this) :_this.onBtnClick.call(_this, cmd ||  id);
            }
            children.push(a);
            return a;
       }
        
        var style = {
                xtype: 'Button',
                size : 'sm',
                xns: Roo.bootstrap,
                glyphicon : 'font',
                //html : 'submit'
                menu : {
                    xtype: 'Menu',
                    xns: Roo.bootstrap,
                    items:  []
                }
        };
        Roo.each(this.formats, function(f) {
            style.menu.items.push({
                xtype :'MenuItem',
                xns: Roo.bootstrap,
                html : '<'+ f+' style="margin:2px">'+f +'</'+ f+'>',
                tagname : f,
                listeners : {
                    click : function()
                    {
                        editorcore.insertTag(this.tagname);
                        editor.focus();
                    }
                }
                
            });
        });
         children.push(style);   
            
            
        btn('bold',false,true);
        btn('italic',false,true);
        btn('align-left', 'justifyleft',true);
        btn('align-center', 'justifycenter',true);
        btn('align-right' , 'justifyright',true);
        btn('link', false, false, function(btn) {
            //Roo.log("create link?");
            var url = prompt(this.createLinkText, this.defaultLinkValue);
            if(url && url != 'http:/'+'/'){
                this.editorcore.relayCmd('createlink', url);
            }
        }),
        btn('list','insertunorderedlist',true);
        btn('pencil', false,true, function(btn){
                Roo.log(this);
                
                this.toggleSourceEdit(btn.pressed);
        });
        /*
        var cog = {
                xtype: 'Button',
                size : 'sm',
                xns: Roo.bootstrap,
                glyphicon : 'cog',
                //html : 'submit'
                menu : {
                    xtype: 'Menu',
                    xns: Roo.bootstrap,
                    items:  []
                }
        };
        
        cog.menu.items.push({
            xtype :'MenuItem',
            xns: Roo.bootstrap,
            html : Clean styles,
            tagname : f,
            listeners : {
                click : function()
                {
                    editorcore.insertTag(this.tagname);
                    editor.focus();
                }
            }
            
        });
       */
        
         
       this.xtype = 'NavSimplebar';
        
        for(var i=0;i< children.length;i++) {
            
            this.buttons.add(this.addxtypeChild(children[i]));
            
        }
        
        editor.on('editorevent', this.updateToolbar, this);
    },
    onBtnClick : function(id)
    {
       this.editorcore.relayCmd(id);
       this.editorcore.focus();
    },
    
    /**
     * Protected method that will not generally be called directly. It triggers
     * a toolbar update by reading the markup state of the current selection in the editor.
     */
    updateToolbar: function(){

        if(!this.editorcore.activated){
            this.editor.onFirstFocus(); // is this neeed?
            return;
        }

        var btns = this.buttons; 
        var doc = this.editorcore.doc;
        btns.get('bold').setActive(doc.queryCommandState('bold'));
        btns.get('italic').setActive(doc.queryCommandState('italic'));
        //btns.get('underline').setActive(doc.queryCommandState('underline'));
        
        btns.get('align-left').setActive(doc.queryCommandState('justifyleft'));
        btns.get('align-center').setActive(doc.queryCommandState('justifycenter'));
        btns.get('align-right').setActive(doc.queryCommandState('justifyright'));
        
        //btns[frameId + '-insertorderedlist').setActive(doc.queryCommandState('insertorderedlist'));
        btns.get('list').setActive(doc.queryCommandState('insertunorderedlist'));
         /*
        
        var ans = this.editorcore.getAllAncestors();
        if (this.formatCombo) {
            
            
            var store = this.formatCombo.store;
            this.formatCombo.setValue("");
            for (var i =0; i < ans.length;i++) {
                if (ans[i] && store.query('tag',ans[i].tagName.toLowerCase(), false).length) {
                    // select it..
                    this.formatCombo.setValue(ans[i].tagName.toLowerCase());
                    break;
                }
            }
        }
        
        
        
        // hides menus... - so this cant be on a menu...
        Roo.bootstrap.MenuMgr.hideAll();
        */
        Roo.bootstrap.MenuMgr.hideAll();
        //this.editorsyncValue();
    },
    onFirstFocus: function() {
        this.buttons.each(function(item){
           item.enable();
        });
    },
    toggleSourceEdit : function(sourceEditMode){
        
          
        if(sourceEditMode){
            Roo.log("disabling buttons");
           this.buttons.each( function(item){
                if(item.cmd != 'pencil'){
                    item.disable();
                }
            });
          
        }else{
            Roo.log("enabling buttons");
            if(this.editorcore.initialized){
                this.buttons.each( function(item){
                    item.enable();
                });
            }
            
        }
        Roo.log("calling toggole on editor");
        // tell the editor that it's been pressed..
        this.editor.toggleSourceEdit(sourceEditMode);
       
    }
});





/**
 * @class Roo.bootstrap.Table.AbstractSelectionModel
 * @extends Roo.util.Observable
 * Abstract base class for grid SelectionModels.  It provides the interface that should be
 * implemented by descendant classes.  This class should not be directly instantiated.
 * @constructor
 */
Roo.bootstrap.Table.AbstractSelectionModel = function(){
    this.locked = false;
    Roo.bootstrap.Table.AbstractSelectionModel.superclass.constructor.call(this);
};


Roo.extend(Roo.bootstrap.Table.AbstractSelectionModel, Roo.util.Observable,  {
    /** @ignore Called by the grid automatically. Do not call directly. */
    init : function(grid){
        this.grid = grid;
        this.initEvents();
    },

    /**
     * Locks the selections.
     */
    lock : function(){
        this.locked = true;
    },

    /**
     * Unlocks the selections.
     */
    unlock : function(){
        this.locked = false;
    },

    /**
     * Returns true if the selections are locked.
     * @return {Boolean}
     */
    isLocked : function(){
        return this.locked;
    }
});
/**
 * @extends Roo.bootstrap.Table.AbstractSelectionModel
 * @class Roo.bootstrap.Table.RowSelectionModel
 * The default SelectionModel used by {@link Roo.bootstrap.Table}.
 * It supports multiple selections and keyboard selection/navigation. 
 * @constructor
 * @param {Object} config
 */

Roo.bootstrap.Table.RowSelectionModel = function(config){
    Roo.apply(this, config);
    this.selections = new Roo.util.MixedCollection(false, function(o){
        return o.id;
    });

    this.last = false;
    this.lastActive = false;

    this.addEvents({
        /**
	     * @event selectionchange
	     * Fires when the selection changes
	     * @param {SelectionModel} this
	     */
	    "selectionchange" : true,
        /**
	     * @event afterselectionchange
	     * Fires after the selection changes (eg. by key press or clicking)
	     * @param {SelectionModel} this
	     */
	    "afterselectionchange" : true,
        /**
	     * @event beforerowselect
	     * Fires when a row is selected being selected, return false to cancel.
	     * @param {SelectionModel} this
	     * @param {Number} rowIndex The selected index
	     * @param {Boolean} keepExisting False if other selections will be cleared
	     */
	    "beforerowselect" : true,
        /**
	     * @event rowselect
	     * Fires when a row is selected.
	     * @param {SelectionModel} this
	     * @param {Number} rowIndex The selected index
	     * @param {Roo.data.Record} r The record
	     */
	    "rowselect" : true,
        /**
	     * @event rowdeselect
	     * Fires when a row is deselected.
	     * @param {SelectionModel} this
	     * @param {Number} rowIndex The selected index
	     */
        "rowdeselect" : true
    });
    Roo.bootstrap.Table.RowSelectionModel.superclass.constructor.call(this);
    this.locked = false;
};

Roo.extend(Roo.bootstrap.Table.RowSelectionModel, Roo.bootstrap.Table.AbstractSelectionModel,  {
    /**
     * @cfg {Boolean} singleSelect
     * True to allow selection of only one row at a time (defaults to false)
     */
    singleSelect : false,

    // private
    initEvents : function(){

        if(!this.grid.enableDragDrop && !this.grid.enableDrag){
            this.grid.on("mousedown", this.handleMouseDown, this);
        }else{ // allow click to work like normal
            this.grid.on("rowclick", this.handleDragableRowClick, this);
        }

        this.rowNav = new Roo.KeyNav(this.grid.getGridEl(), {
            "up" : function(e){
                if(!e.shiftKey){
                    this.selectPrevious(e.shiftKey);
                }else if(this.last !== false && this.lastActive !== false){
                    var last = this.last;
                    this.selectRange(this.last,  this.lastActive-1);
                    this.grid.getView().focusRow(this.lastActive);
                    if(last !== false){
                        this.last = last;
                    }
                }else{
                    this.selectFirstRow();
                }
                this.fireEvent("afterselectionchange", this);
            },
            "down" : function(e){
                if(!e.shiftKey){
                    this.selectNext(e.shiftKey);
                }else if(this.last !== false && this.lastActive !== false){
                    var last = this.last;
                    this.selectRange(this.last,  this.lastActive+1);
                    this.grid.getView().focusRow(this.lastActive);
                    if(last !== false){
                        this.last = last;
                    }
                }else{
                    this.selectFirstRow();
                }
                this.fireEvent("afterselectionchange", this);
            },
            scope: this
        });

        var view = this.grid.view;
        view.on("refresh", this.onRefresh, this);
        view.on("rowupdated", this.onRowUpdated, this);
        view.on("rowremoved", this.onRemove, this);
    },

    // private
    onRefresh : function(){
        var ds = this.grid.dataSource, i, v = this.grid.view;
        var s = this.selections;
        s.each(function(r){
            if((i = ds.indexOfId(r.id)) != -1){
                v.onRowSelect(i);
            }else{
                s.remove(r);
            }
        });
    },

    // private
    onRemove : function(v, index, r){
        this.selections.remove(r);
    },

    // private
    onRowUpdated : function(v, index, r){
        if(this.isSelected(r)){
            v.onRowSelect(index);
        }
    },

    /**
     * Select records.
     * @param {Array} records The records to select
     * @param {Boolean} keepExisting (optional) True to keep existing selections
     */
    selectRecords : function(records, keepExisting){
        if(!keepExisting){
            this.clearSelections();
        }
        var ds = this.grid.dataSource;
        for(var i = 0, len = records.length; i < len; i++){
            this.selectRow(ds.indexOf(records[i]), true);
        }
    },

    /**
     * Gets the number of selected rows.
     * @return {Number}
     */
    getCount : function(){
        return this.selections.length;
    },

    /**
     * Selects the first row in the grid.
     */
    selectFirstRow : function(){
        this.selectRow(0);
    },

    /**
     * Select the last row.
     * @param {Boolean} keepExisting (optional) True to keep existing selections
     */
    selectLastRow : function(keepExisting){
        this.selectRow(this.grid.dataSource.getCount() - 1, keepExisting);
    },

    /**
     * Selects the row immediately following the last selected row.
     * @param {Boolean} keepExisting (optional) True to keep existing selections
     */
    selectNext : function(keepExisting){
        if(this.last !== false && (this.last+1) < this.grid.dataSource.getCount()){
            this.selectRow(this.last+1, keepExisting);
            this.grid.getView().focusRow(this.last);
        }
    },

    /**
     * Selects the row that precedes the last selected row.
     * @param {Boolean} keepExisting (optional) True to keep existing selections
     */
    selectPrevious : function(keepExisting){
        if(this.last){
            this.selectRow(this.last-1, keepExisting);
            this.grid.getView().focusRow(this.last);
        }
    },

    /**
     * Returns the selected records
     * @return {Array} Array of selected records
     */
    getSelections : function(){
        return [].concat(this.selections.items);
    },

    /**
     * Returns the first selected record.
     * @return {Record}
     */
    getSelected : function(){
        return this.selections.itemAt(0);
    },


    /**
     * Clears all selections.
     */
    clearSelections : function(fast){
        if(this.locked) return;
        if(fast !== true){
            var ds = this.grid.dataSource;
            var s = this.selections;
            s.each(function(r){
                this.deselectRow(ds.indexOfId(r.id));
            }, this);
            s.clear();
        }else{
            this.selections.clear();
        }
        this.last = false;
    },


    /**
     * Selects all rows.
     */
    selectAll : function(){
        if(this.locked) return;
        this.selections.clear();
        for(var i = 0, len = this.grid.dataSource.getCount(); i < len; i++){
            this.selectRow(i, true);
        }
    },

    /**
     * Returns True if there is a selection.
     * @return {Boolean}
     */
    hasSelection : function(){
        return this.selections.length > 0;
    },

    /**
     * Returns True if the specified row is selected.
     * @param {Number/Record} record The record or index of the record to check
     * @return {Boolean}
     */
    isSelected : function(index){
        var r = typeof index == "number" ? this.grid.dataSource.getAt(index) : index;
        return (r && this.selections.key(r.id) ? true : false);
    },

    /**
     * Returns True if the specified record id is selected.
     * @param {String} id The id of record to check
     * @return {Boolean}
     */
    isIdSelected : function(id){
        return (this.selections.key(id) ? true : false);
    },

    // private
    handleMouseDown : function(e, t){
        var view = this.grid.getView(), rowIndex;
        if(this.isLocked() || (rowIndex = view.findRowIndex(t)) === false){
            return;
        };
        if(e.shiftKey && this.last !== false){
            var last = this.last;
            this.selectRange(last, rowIndex, e.ctrlKey);
            this.last = last; // reset the last
            view.focusRow(rowIndex);
        }else{
            var isSelected = this.isSelected(rowIndex);
            if(e.button !== 0 && isSelected){
                view.focusRow(rowIndex);
            }else if(e.ctrlKey && isSelected){
                this.deselectRow(rowIndex);
            }else if(!isSelected){
                this.selectRow(rowIndex, e.button === 0 && (e.ctrlKey || e.shiftKey));
                view.focusRow(rowIndex);
            }
        }
        this.fireEvent("afterselectionchange", this);
    },
    // private
    handleDragableRowClick :  function(grid, rowIndex, e) 
    {
        if(e.button === 0 && !e.shiftKey && !e.ctrlKey) {
            this.selectRow(rowIndex, false);
            grid.view.focusRow(rowIndex);
             this.fireEvent("afterselectionchange", this);
        }
    },
    
    /**
     * Selects multiple rows.
     * @param {Array} rows Array of the indexes of the row to select
     * @param {Boolean} keepExisting (optional) True to keep existing selections
     */
    selectRows : function(rows, keepExisting){
        if(!keepExisting){
            this.clearSelections();
        }
        for(var i = 0, len = rows.length; i < len; i++){
            this.selectRow(rows[i], true);
        }
    },

    /**
     * Selects a range of rows. All rows in between startRow and endRow are also selected.
     * @param {Number} startRow The index of the first row in the range
     * @param {Number} endRow The index of the last row in the range
     * @param {Boolean} keepExisting (optional) True to retain existing selections
     */
    selectRange : function(startRow, endRow, keepExisting){
        if(this.locked) return;
        if(!keepExisting){
            this.clearSelections();
        }
        if(startRow <= endRow){
            for(var i = startRow; i <= endRow; i++){
                this.selectRow(i, true);
            }
        }else{
            for(var i = startRow; i >= endRow; i--){
                this.selectRow(i, true);
            }
        }
    },

    /**
     * Deselects a range of rows. All rows in between startRow and endRow are also deselected.
     * @param {Number} startRow The index of the first row in the range
     * @param {Number} endRow The index of the last row in the range
     */
    deselectRange : function(startRow, endRow, preventViewNotify){
        if(this.locked) return;
        for(var i = startRow; i <= endRow; i++){
            this.deselectRow(i, preventViewNotify);
        }
    },

    /**
     * Selects a row.
     * @param {Number} row The index of the row to select
     * @param {Boolean} keepExisting (optional) True to keep existing selections
     */
    selectRow : function(index, keepExisting, preventViewNotify){
        if(this.locked || (index < 0 || index >= this.grid.dataSource.getCount())) return;
        if(this.fireEvent("beforerowselect", this, index, keepExisting) !== false){
            if(!keepExisting || this.singleSelect){
                this.clearSelections();
            }
            var r = this.grid.dataSource.getAt(index);
            this.selections.add(r);
            this.last = this.lastActive = index;
            if(!preventViewNotify){
                this.grid.getView().onRowSelect(index);
            }
            this.fireEvent("rowselect", this, index, r);
            this.fireEvent("selectionchange", this);
        }
    },

    /**
     * Deselects a row.
     * @param {Number} row The index of the row to deselect
     */
    deselectRow : function(index, preventViewNotify){
        if(this.locked) return;
        if(this.last == index){
            this.last = false;
        }
        if(this.lastActive == index){
            this.lastActive = false;
        }
        var r = this.grid.dataSource.getAt(index);
        this.selections.remove(r);
        if(!preventViewNotify){
            this.grid.getView().onRowDeselect(index);
        }
        this.fireEvent("rowdeselect", this, index);
        this.fireEvent("selectionchange", this);
    },

    // private
    restoreLast : function(){
        if(this._last){
            this.last = this._last;
        }
    },

    // private
    acceptsNav : function(row, col, cm){
        return !cm.isHidden(col) && cm.isCellEditable(col, row);
    },

    // private
    onEditorKey : function(field, e){
        var k = e.getKey(), newCell, g = this.grid, ed = g.activeEditor;
        if(k == e.TAB){
            e.stopEvent();
            ed.completeEdit();
            if(e.shiftKey){
                newCell = g.walkCells(ed.row, ed.col-1, -1, this.acceptsNav, this);
            }else{
                newCell = g.walkCells(ed.row, ed.col+1, 1, this.acceptsNav, this);
            }
        }else if(k == e.ENTER && !e.ctrlKey){
            e.stopEvent();
            ed.completeEdit();
            if(e.shiftKey){
                newCell = g.walkCells(ed.row-1, ed.col, -1, this.acceptsNav, this);
            }else{
                newCell = g.walkCells(ed.row+1, ed.col, 1, this.acceptsNav, this);
            }
        }else if(k == e.ESC){
            ed.cancelEdit();
        }
        if(newCell){
            g.startEditing(newCell[0], newCell[1]);
        }
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
 * @class Roo.bootstrap.PagingToolbar
 * @extends Roo.Row
 * A specialized toolbar that is bound to a {@link Roo.data.Store} and provides automatic paging controls.
 * @constructor
 * Create a new PagingToolbar
 * @param {Object} config The config object
 */
Roo.bootstrap.PagingToolbar = function(config)
{
    // old args format still supported... - xtype is prefered..
        // created from xtype...
    var ds = config.dataSource;
    this.toolbarItems = [];
    if (config.items) {
        this.toolbarItems = config.items;
//        config.items = [];
    }
    
    Roo.bootstrap.PagingToolbar.superclass.constructor.call(this, config);
    this.ds = ds;
    this.cursor = 0;
    if (ds) { 
        this.bind(ds);
    }
    
    this.navgroup = new Roo.bootstrap.NavGroup({ cls: 'pagination' });
    
};

Roo.extend(Roo.bootstrap.PagingToolbar, Roo.bootstrap.NavSimplebar, {
    /**
     * @cfg {Roo.data.Store} dataSource
     * The underlying data store providing the paged data
     */
    /**
     * @cfg {String/HTMLElement/Element} container
     * container The id or element that will contain the toolbar
     */
    /**
     * @cfg {Boolean} displayInfo
     * True to display the displayMsg (defaults to false)
     */
    /**
     * @cfg {Number} pageSize
     * The number of records to display per page (defaults to 20)
     */
    pageSize: 20,
    /**
     * @cfg {String} displayMsg
     * The paging status message to display (defaults to "Displaying {start} - {end} of {total}")
     */
    displayMsg : 'Displaying {0} - {1} of {2}',
    /**
     * @cfg {String} emptyMsg
     * The message to display when no records are found (defaults to "No data to display")
     */
    emptyMsg : 'No data to display',
    /**
     * Customizable piece of the default paging text (defaults to "Page")
     * @type String
     */
    beforePageText : "Page",
    /**
     * Customizable piece of the default paging text (defaults to "of %0")
     * @type String
     */
    afterPageText : "of {0}",
    /**
     * Customizable piece of the default paging text (defaults to "First Page")
     * @type String
     */
    firstText : "First Page",
    /**
     * Customizable piece of the default paging text (defaults to "Previous Page")
     * @type String
     */
    prevText : "Previous Page",
    /**
     * Customizable piece of the default paging text (defaults to "Next Page")
     * @type String
     */
    nextText : "Next Page",
    /**
     * Customizable piece of the default paging text (defaults to "Last Page")
     * @type String
     */
    lastText : "Last Page",
    /**
     * Customizable piece of the default paging text (defaults to "Refresh")
     * @type String
     */
    refreshText : "Refresh",

    buttons : false,
    // private
    onRender : function(ct, position) 
    {
        Roo.bootstrap.PagingToolbar.superclass.onRender.call(this, ct, position);
        this.navgroup.parentId = this.id;
        this.navgroup.onRender(this.el, null);
        // add the buttons to the navgroup
        
        if(this.displayInfo){
            Roo.log(this.el.select('ul.navbar-nav',true).first());
            this.el.select('ul.navbar-nav',true).first().createChild({cls:'x-paging-info'});
            this.displayEl = this.el.select('.x-paging-info', true).first();
//            var navel = this.navgroup.addItem( { tagtype : 'span', html : '', cls : 'x-paging-info', preventDefault : true } );
//            this.displayEl = navel.el.select('span',true).first();
        }
        
        var _this = this;
        
        if(this.buttons){
            Roo.each(_this.buttons, function(e){
               Roo.factory(e).onRender(_this.el, null);
            });
        }
            
        Roo.each(_this.toolbarItems, function(e) {
            _this.navgroup.addItem(e);
        });
        
        this.first = this.navgroup.addItem({
            tooltip: this.firstText,
            cls: "prev",
            icon : 'fa fa-backward',
            disabled: true,
            listeners : { click : this.onClick.createDelegate(this, ["first"]) }
        });
        
        this.prev =  this.navgroup.addItem({
            tooltip: this.prevText,
            cls: "prev",
            icon : 'fa fa-step-backward',
            disabled: true,
            listeners : { click :  this.onClick.createDelegate(this, ["prev"]) }
        });
    //this.addSeparator();
        
        
        var field = this.navgroup.addItem( {
            tagtype : 'span',
            cls : 'x-paging-position',
            
            html : this.beforePageText  +
                '<input type="text" size="3" value="1" class="x-grid-page-number">' +
                '<span class="x-paging-after">' +  String.format(this.afterPageText, 1) + '</span>'
         } ); //?? escaped?
        
        this.field = field.el.select('input', true).first();
        this.field.on("keydown", this.onPagingKeydown, this);
        this.field.on("focus", function(){this.dom.select();});
    
    
        this.afterTextEl =  field.el.select('.x-paging-after',true).first();
        //this.field.setHeight(18);
        //this.addSeparator();
        this.next = this.navgroup.addItem({
            tooltip: this.nextText,
            cls: "next",
            html : ' <i class="fa fa-step-forward">',
            disabled: true,
            listeners : { click :  this.onClick.createDelegate(this, ["next"]) }
        });
        this.last = this.navgroup.addItem({
            tooltip: this.lastText,
            icon : 'fa fa-forward',
            cls: "next",
            disabled: true,
            listeners : { click :  this.onClick.createDelegate(this, ["last"]) }
        });
    //this.addSeparator();
        this.loading = this.navgroup.addItem({
            tooltip: this.refreshText,
            icon: 'fa fa-refresh',
            
            listeners : { click : this.onClick.createDelegate(this, ["refresh"]) }
        });

    },

    // private
    updateInfo : function(){
        if(this.displayEl){
            var count = this.ds.getCount();
            var msg = count == 0 ?
                this.emptyMsg :
                String.format(
                    this.displayMsg,
                    this.cursor+1, this.cursor+count, this.ds.getTotalCount()    
                );
            this.displayEl.update(msg);
        }
    },

    // private
    onLoad : function(ds, r, o){
       this.cursor = o.params ? o.params.start : 0;
       var d = this.getPageData(),
            ap = d.activePage,
            ps = d.pages;
        
       this.afterTextEl.dom.innerHTML = String.format(this.afterPageText, d.pages);
       this.field.dom.value = ap;
       this.first.setDisabled(ap == 1);
       this.prev.setDisabled(ap == 1);
       this.next.setDisabled(ap == ps);
       this.last.setDisabled(ap == ps);
       this.loading.enable();
       this.updateInfo();
    },

    // private
    getPageData : function(){
        var total = this.ds.getTotalCount();
        return {
            total : total,
            activePage : Math.ceil((this.cursor+this.pageSize)/this.pageSize),
            pages :  total < this.pageSize ? 1 : Math.ceil(total/this.pageSize)
        };
    },

    // private
    onLoadError : function(){
        this.loading.enable();
    },

    // private
    onPagingKeydown : function(e){
        var k = e.getKey();
        var d = this.getPageData();
        if(k == e.RETURN){
            var v = this.field.dom.value, pageNum;
            if(!v || isNaN(pageNum = parseInt(v, 10))){
                this.field.dom.value = d.activePage;
                return;
            }
            pageNum = Math.min(Math.max(1, pageNum), d.pages) - 1;
            this.ds.load({params:{start: pageNum * this.pageSize, limit: this.pageSize}});
            e.stopEvent();
        }
        else if(k == e.HOME || (k == e.UP && e.ctrlKey) || (k == e.PAGEUP && e.ctrlKey) || (k == e.RIGHT && e.ctrlKey) || k == e.END || (k == e.DOWN && e.ctrlKey) || (k == e.LEFT && e.ctrlKey) || (k == e.PAGEDOWN && e.ctrlKey))
        {
          var pageNum = (k == e.HOME || (k == e.DOWN && e.ctrlKey) || (k == e.LEFT && e.ctrlKey) || (k == e.PAGEDOWN && e.ctrlKey)) ? 1 : d.pages;
          this.field.dom.value = pageNum;
          this.ds.load({params:{start: (pageNum - 1) * this.pageSize, limit: this.pageSize}});
          e.stopEvent();
        }
        else if(k == e.UP || k == e.RIGHT || k == e.PAGEUP || k == e.DOWN || k == e.LEFT || k == e.PAGEDOWN)
        {
          var v = this.field.dom.value, pageNum; 
          var increment = (e.shiftKey) ? 10 : 1;
          if(k == e.DOWN || k == e.LEFT || k == e.PAGEDOWN)
            increment *= -1;
          if(!v || isNaN(pageNum = parseInt(v, 10))) {
            this.field.dom.value = d.activePage;
            return;
          }
          else if(parseInt(v, 10) + increment >= 1 & parseInt(v, 10) + increment <= d.pages)
          {
            this.field.dom.value = parseInt(v, 10) + increment;
            pageNum = Math.min(Math.max(1, pageNum + increment), d.pages) - 1;
            this.ds.load({params:{start: pageNum * this.pageSize, limit: this.pageSize}});
          }
          e.stopEvent();
        }
    },

    // private
    beforeLoad : function(){
        if(this.loading){
            this.loading.disable();
        }
    },

    // private
    onClick : function(which){
        var ds = this.ds;
        if (!ds) {
            return;
        }
        switch(which){
            case "first":
                ds.load({params:{start: 0, limit: this.pageSize}});
            break;
            case "prev":
                ds.load({params:{start: Math.max(0, this.cursor-this.pageSize), limit: this.pageSize}});
            break;
            case "next":
                ds.load({params:{start: this.cursor+this.pageSize, limit: this.pageSize}});
            break;
            case "last":
                var total = ds.getTotalCount();
                var extra = total % this.pageSize;
                var lastStart = extra ? (total - extra) : total-this.pageSize;
                ds.load({params:{start: lastStart, limit: this.pageSize}});
            break;
            case "refresh":
                ds.load({params:{start: this.cursor, limit: this.pageSize}});
            break;
        }
    },

    /**
     * Unbinds the paging toolbar from the specified {@link Roo.data.Store}
     * @param {Roo.data.Store} store The data store to unbind
     */
    unbind : function(ds){
        ds.un("beforeload", this.beforeLoad, this);
        ds.un("load", this.onLoad, this);
        ds.un("loadexception", this.onLoadError, this);
        ds.un("remove", this.updateInfo, this);
        ds.un("add", this.updateInfo, this);
        this.ds = undefined;
    },

    /**
     * Binds the paging toolbar to the specified {@link Roo.data.Store}
     * @param {Roo.data.Store} store The data store to bind
     */
    bind : function(ds){
        ds.on("beforeload", this.beforeLoad, this);
        ds.on("load", this.onLoad, this);
        ds.on("loadexception", this.onLoadError, this);
        ds.on("remove", this.updateInfo, this);
        ds.on("add", this.updateInfo, this);
        this.ds = ds;
    }
});/*
 * - LGPL
 *
 * element
 * 
 */

/**
 * @class Roo.bootstrap.MessageBar
 * @extends Roo.bootstrap.Component
 * Bootstrap MessageBar class
 * @cfg {String} html contents of the MessageBar
 * @cfg {String} weight (info | success | warning | danger) default info
 * @cfg {String} beforeClass insert the bar before the given class
 * @cfg {Boolean} closable (true | false) default false
 * @cfg {Boolean} fixed (true | false) default false, fix the bar at the top
 * 
 * @constructor
 * Create a new Element
 * @param {Object} config The config object
 */

Roo.bootstrap.MessageBar = function(config){
    Roo.bootstrap.MessageBar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.MessageBar, Roo.bootstrap.Component,  {
    
    html: '',
    weight: 'info',
    closable: false,
    fixed: false,
    beforeClass: 'bootstrap-sticky-wrap',
    
    getAutoCreate : function(){
        
        var cfg = {
            tag: 'div',
            cls: 'alert alert-dismissable alert-' + this.weight,
            cn: [
                {
                    tag: 'span',
                    cls: 'message',
                    html: this.html || ''
                }
            ]
        }
        
        if(this.fixed){
            cfg.cls += ' alert-messages-fixed';
        }
        
        if(this.closable){
            cfg.cn.push({
                tag: 'button',
                cls: 'close',
                html: 'x'
            });
        }
        
        return cfg;
    },
    
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
            this.el = Roo.get(document.body).createChild(cfg, Roo.select('.'+this.beforeClass, true).first());
            
            this.el.setVisibilityMode(Roo.Element.DISPLAY);
        }
        
        this.el.select('>button.close').on('click', this.hide, this);
        
    },
    
    show : function()
    {
        if (!this.rendered) {
            this.render();
        }
        
        this.el.show();
        
        this.fireEvent('show', this);
        
    },
    
    hide : function()
    {
        if (!this.rendered) {
            this.render();
        }
        
        this.el.hide();
        
        this.fireEvent('hide', this);
    },
    
    update : function()
    {
//        var e = this.el.dom.firstChild;
//        
//        if(this.closable){
//            e = e.nextSibling;
//        }
//        
//        e.data = this.html || '';

        this.el.select('>.message', true).first().dom.innerHTML = this.html || '';
    }
   
});

 

     /*
 * - LGPL
 *
 * Graph
 * 
 */


/**
 * @class Roo.bootstrap.Graph
 * @extends Roo.bootstrap.Component
 * Bootstrap Graph class
> Prameters
 -sm {number} sm 4
 -md {number} md 5
 @cfg {String} graphtype  bar | vbar | pie
 @cfg {number} g_x coodinator | centre x (pie)
 @cfg {number} g_y coodinator | centre y (pie)
 @cfg {number} g_r radius (pie)
 @cfg {number} g_height height of the chart (respected by all elements in the set)
 @cfg {number} g_width width of the chart (respected by all elements in the set)
 @cfg {Object} title The title of the chart
    
 -{Array}  values
 -opts (object) options for the chart 
     o {
     o type (string) type of endings of the bar. Default: 'square'. Other options are: 'round', 'sharp', 'soft'.
     o gutter (number)(string) default '20%' (WHAT DOES IT DO?)
     o vgutter (number)
     o colors (array) colors be used repeatedly to plot the bars. If multicolumn bar is used each sequence of bars with use a different color.
     o stacked (boolean) whether or not to tread values as in a stacked bar chart
     o to
     o stretch (boolean)
     o }
 -opts (object) options for the pie
     o{
     o cut
     o startAngle (number)
     o endAngle (number)
     } 
 *
 * @constructor
 * Create a new Input
 * @param {Object} config The config object
 */

Roo.bootstrap.Graph = function(config){
    Roo.bootstrap.Graph.superclass.constructor.call(this, config);
    
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

Roo.extend(Roo.bootstrap.Graph, Roo.bootstrap.Component,  {
    
    sm: 4,
    md: 5,
    graphtype: 'bar',
    g_height: 250,
    g_width: 400,
    g_x: 50,
    g_y: 50,
    g_r: 30,
    opts:{
        //g_colors: this.colors,
        g_type: 'soft',
        g_gutter: '20%'

    },
    title : false,

    getAutoCreate : function(){
        
        var cfg = {
            tag: 'div',
            html : null
        }
        
        
        return  cfg;
    },

    onRender : function(ct,position){
        Roo.bootstrap.Graph.superclass.onRender.call(this,ct,position);
        this.raphael = Raphael(this.el.dom);
        
                    // data1 = [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55], [12, 20, 30]],
                    // data2 = [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55], [12, 20, 30]],
                    // data3 = [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55], [12, 20, 30]],
                    // txtattr = { font: "12px 'Fontin Sans', Fontin-Sans, sans-serif" };
                /*
                r.text(160, 10, "Single Series Chart").attr(txtattr);
                r.text(480, 10, "Multiline Series Chart").attr(txtattr);
                r.text(160, 250, "Multiple Series Stacked Chart").attr(txtattr);
                r.text(480, 250, 'Multiline Series Stacked Vertical Chart. Type "round"').attr(txtattr);
                
                r.barchart(10, 10, 300, 220, [[55, 20, 13, 32, 5, 1, 2, 10]], 0, {type: "sharp"});
                r.barchart(330, 10, 300, 220, data1);
                r.barchart(10, 250, 300, 220, data2, {stacked: true});
                r.barchart(330, 250, 300, 220, data3, {stacked: true, type: "round"});
                */
                
                // var xdata = [55, 20, 13, 32, 5, 1, 2, 10,5 , 10];
                // r.barchart(30, 30, 560, 250,  xdata, {
                //    labels : [55, 20, 13, 32, 5, 1, 2, 10,5 , 10],
                //     axis : "0 0 1 1",
                //     axisxlabels :  xdata
                //     //yvalues : cols,
                   
                // });
//        var xdata = [55, 20, 13, 32, 5, 1, 2, 10,5 , 10];
//        
//        this.load(null,xdata,{
//                axis : "0 0 1 1",
//                axisxlabels :  xdata
//                });

    },

    load : function(graphtype,xdata,opts){
        this.raphael.clear();
        if(!graphtype) {
            graphtype = this.graphtype;
        }
        if(!opts){
            opts = this.opts;
        }
        var r = this.raphael,
            fin = function () {
                this.flag = r.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
            },
            fout = function () {
                this.flag.animate({opacity: 0}, 300, function () {this.remove();});
            },
            pfin = function() {
                this.sector.stop();
                this.sector.scale(1.1, 1.1, this.cx, this.cy);

                if (this.label) {
                    this.label[0].stop();
                    this.label[0].attr({ r: 7.5 });
                    this.label[1].attr({ "font-weight": 800 });
                }
            },
            pfout = function() {
                this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");

                if (this.label) {
                    this.label[0].animate({ r: 5 }, 500, "bounce");
                    this.label[1].attr({ "font-weight": 400 });
                }
            };

        switch(graphtype){
            case 'bar':
                this.raphael.barchart(this.g_x,this.g_y,this.g_width,this.g_height,xdata,opts).hover(fin,fout);
                break;
            case 'hbar':
                this.raphael.hbarchart(this.g_x,this.g_y,this.g_width,this.g_height,xdata,opts).hover(fin,fout);
                break;
            case 'pie':
//                opts = { legend: ["%% - Enterprise Users", "% - ddd","Chrome Users"], legendpos: "west", 
//                href: ["http://raphaeljs.com", "http://g.raphaeljs.com"]};
//            
                this.raphael.piechart(this.g_x,this.g_y,this.g_r,xdata,opts).hover(pfin, pfout);
                
                break;

        }
        
        if(this.title){
            this.raphael.text(this.title.x, this.title.y, this.title.text).attr(this.title.attr);
        }
        
    },
    
    setTitle: function(o)
    {
        this.title = o;
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
 * numberBox
 * 
 */
Roo.bootstrap.dash = Roo.bootstrap.dash || {};

/**
 * @class Roo.bootstrap.dash.NumberBox
 * @extends Roo.bootstrap.Component
 * Bootstrap NumberBox class
 * @cfg {String} headline Box headline
 * @cfg {String} content Box content
 * @cfg {String} icon Box icon
 * @cfg {String} footer Footer text
 * @cfg {String} fhref Footer href
 * 
 * @constructor
 * Create a new NumberBox
 * @param {Object} config The config object
 */


Roo.bootstrap.dash.NumberBox = function(config){
    Roo.bootstrap.dash.NumberBox.superclass.constructor.call(this, config);
    
};

Roo.extend(Roo.bootstrap.dash.NumberBox, Roo.bootstrap.Component,  {
    
    headline : '',
    content : '',
    icon : '',
    footer : '',
    fhref : '',
    ficon : '',
    
    getAutoCreate : function(){
        
        var cfg = {
            tag : 'div',
            cls : 'small-box ',
            cn : [
                {
                    tag : 'div',
                    cls : 'inner',
                    cn :[
                        {
                            tag : 'h3',
                            cls : 'roo-headline',
                            html : this.headline
                        },
                        {
                            tag : 'p',
                            cls : 'roo-content',
                            html : this.content
                        }
                    ]
                }
            ]
        }
        
        if(this.icon){
            cfg.cn.push({
                tag : 'div',
                cls : 'icon',
                cn :[
                    {
                        tag : 'i',
                        cls : 'ion ' + this.icon
                    }
                ]
            });
        }
        
        if(this.footer){
            var footer = {
                tag : 'a',
                cls : 'small-box-footer',
                href : this.fhref || '#',
                html : this.footer
            };
            
            cfg.cn.push(footer);
            
        }
        
        return  cfg;
    },

    onRender : function(ct,position){
        Roo.bootstrap.dash.NumberBox.superclass.onRender.call(this,ct,position);


       
                
    },

    setHeadline: function (value)
    {
        this.el.select('.roo-headline',true).first().dom.innerHTML = value;
    },
    
    setFooter: function (value, href)
    {
        this.el.select('a.small-box-footer',true).first().dom.innerHTML = value;
        
        if(href){
            this.el.select('a.small-box-footer',true).first().attr('href', href);
        }
        
    },

    setContent: function (value)
    {
        this.el.select('.roo-content',true).first().dom.innerHTML = value;
    },

    initEvents: function() 
    {   
        
    }
    
});

 
/*
 * - LGPL
 *
 * TabBox
 * 
 */
Roo.bootstrap.dash = Roo.bootstrap.dash || {};

/**
 * @class Roo.bootstrap.dash.TabBox
 * @extends Roo.bootstrap.Component
 * Bootstrap TabBox class
 * @cfg {String} title Title of the TabBox
 * @cfg {String} icon Icon of the TabBox
 * @cfg {Boolean} showtabs (true|false) show the tabs default true
 * @cfg {Boolean} tabScrollable (true|false) tab scrollable when mobile view default false
 * 
 * @constructor
 * Create a new TabBox
 * @param {Object} config The config object
 */


Roo.bootstrap.dash.TabBox = function(config){
    Roo.bootstrap.dash.TabBox.superclass.constructor.call(this, config);
    this.addEvents({
        // raw events
        /**
         * @event addpane
         * When a pane is added
         * @param {Roo.bootstrap.dash.TabPane} pane
         */
        "addpane" : true,
        /**
         * @event activatepane
         * When a pane is activated
         * @param {Roo.bootstrap.dash.TabPane} pane
         */
        "activatepane" : true
        
         
    });
    
    this.panes = [];
};

Roo.extend(Roo.bootstrap.dash.TabBox, Roo.bootstrap.Component,  {

    title : '',
    icon : false,
    showtabs : true,
    tabScrollable : false,
    
    getChildContainer : function()
    {
        return this.el.select('.tab-content', true).first();
    },
    
    getAutoCreate : function(){
        
        var header = {
            tag: 'li',
            cls: 'pull-left header',
            html: this.title,
            cn : []
        };
        
        if(this.icon){
            header.cn.push({
                tag: 'i',
                cls: 'fa ' + this.icon
            });
        }
        
        var h = {
            tag: 'ul',
            cls: 'nav nav-tabs pull-right',
            cn: [
                header
            ]
        };
        
        if(this.tabScrollable){
            h = {
                tag: 'div',
                cls: 'tab-header',
                cn: [
                    {
                        tag: 'ul',
                        cls: 'nav nav-tabs pull-right',
                        cn: [
                            header
                        ]
                    }
                ]
            }
        }
        
        var cfg = {
            tag: 'div',
            cls: 'nav-tabs-custom',
            cn: [
                h,
                {
                    tag: 'div',
                    cls: 'tab-content no-padding',
                    cn: []
                }
            ]
        }

        return  cfg;
    },
    initEvents : function()
    {
        //Roo.log('add add pane handler');
        this.on('addpane', this.onAddPane, this);
    },
     /**
     * Updates the box title
     * @param {String} html to set the title to.
     */
    setTitle : function(value)
    {
        this.el.select('.nav-tabs .header', true).first().dom.innerHTML = value;
    },
    onAddPane : function(pane)
    {
        this.panes.push(pane);
        //Roo.log('addpane');
        //Roo.log(pane);
        // tabs are rendere left to right..
        if(!this.showtabs){
            return;
        }
        
        var ctr = this.el.select('.nav-tabs', true).first();
         
         
        var existing = ctr.select('.nav-tab',true);
        var qty = existing.getCount();;
        
        
        var tab = ctr.createChild({
            tag : 'li',
            cls : 'nav-tab' + (qty ? '' : ' active'),
            cn : [
                {
                    tag : 'a',
                    href:'#',
                    html : pane.title
                }
            ]
        }, qty ? existing.first().dom : ctr.select('.header', true).first().dom );
        pane.tab = tab;
        
        tab.on('click', this.onTabClick.createDelegate(this, [pane], true));
        if (!qty) {
            pane.el.addClass('active');
        }
        
                
    },
    onTabClick : function(ev,un,ob,pane)
    {
        //Roo.log('tab - prev default');
        ev.preventDefault();
        
        
        this.el.select('.nav-tabs li.nav-tab', true).removeClass('active');
        pane.tab.addClass('active');
        //Roo.log(pane.title);
        this.getChildContainer().select('.tab-pane',true).removeClass('active');
        // technically we should have a deactivate event.. but maybe add later.
        // and it should not de-activate the selected tab...
        this.fireEvent('activatepane', pane);
        pane.el.addClass('active');
        pane.fireEvent('activate');
        
        
    },
    
    getActivePane : function()
    {
        var r = false;
        Roo.each(this.panes, function(p) {
            if(p.el.hasClass('active')){
                r = p;
                return false;
            }
            
            return;
        });
        
        return r;
    }
    
    
});

 
/*
 * - LGPL
 *
 * Tab pane
 * 
 */
Roo.bootstrap.dash = Roo.bootstrap.dash || {};
/**
 * @class Roo.bootstrap.TabPane
 * @extends Roo.bootstrap.Component
 * Bootstrap TabPane class
 * @cfg {Boolean} active (false | true) Default false
 * @cfg {String} title title of panel

 * 
 * @constructor
 * Create a new TabPane
 * @param {Object} config The config object
 */

Roo.bootstrap.dash.TabPane = function(config){
    Roo.bootstrap.dash.TabPane.superclass.constructor.call(this, config);
    
    this.addEvents({
        // raw events
        /**
         * @event activate
         * When a pane is activated
         * @param {Roo.bootstrap.dash.TabPane} pane
         */
        "activate" : true
         
    });
};

Roo.extend(Roo.bootstrap.dash.TabPane, Roo.bootstrap.Component,  {
    
    active : false,
    title : '',
    
    // the tabBox that this is attached to.
    tab : false,
     
    getAutoCreate : function() 
    {
        var cfg = {
            tag: 'div',
            cls: 'tab-pane'
        }
        
        if(this.active){
            cfg.cls += ' active';
        }
        
        return cfg;
    },
    initEvents  : function()
    {
        //Roo.log('trigger add pane handler');
        this.parent().fireEvent('addpane', this)
    },
    
     /**
     * Updates the tab title 
     * @param {String} html to set the title to.
     */
    setTitle: function(str)
    {
        if (!this.tab) {
            return;
        }
        this.title = str;
        this.tab.select('a', true).first().dom.innerHTML = str;
        
    }
    
    
    
});

 


 /*
 * - LGPL
 *
 * menu
 * 
 */
Roo.bootstrap.menu = Roo.bootstrap.menu || {};

/**
 * @class Roo.bootstrap.menu.Menu
 * @extends Roo.bootstrap.Component
 * Bootstrap Menu class - container for Menu
 * @cfg {String} html Text of the menu
 * @cfg {String} weight (default | primary | success | info | warning | danger | inverse)
 * @cfg {String} icon Font awesome icon
 * @cfg {String} pos Menu align to (top | bottom) default bottom
 * 
 * 
 * @constructor
 * Create a new Menu
 * @param {Object} config The config object
 */


Roo.bootstrap.menu.Menu = function(config){
    Roo.bootstrap.menu.Menu.superclass.constructor.call(this, config);
    
    this.addEvents({
        /**
         * @event beforeshow
         * Fires before this menu is displayed
         * @param {Roo.bootstrap.menu.Menu} this
         */
        beforeshow : true,
        /**
         * @event beforehide
         * Fires before this menu is hidden
         * @param {Roo.bootstrap.menu.Menu} this
         */
        beforehide : true,
        /**
         * @event show
         * Fires after this menu is displayed
         * @param {Roo.bootstrap.menu.Menu} this
         */
        show : true,
        /**
         * @event hide
         * Fires after this menu is hidden
         * @param {Roo.bootstrap.menu.Menu} this
         */
        hide : true,
        /**
         * @event click
         * Fires when this menu is clicked (or when the enter key is pressed while it is active)
         * @param {Roo.bootstrap.menu.Menu} this
         * @param {Roo.EventObject} e
         */
        click : true
    });
    
};

Roo.extend(Roo.bootstrap.menu.Menu, Roo.bootstrap.Component,  {
    
    submenu : false,
    html : '',
    weight : 'default',
    icon : false,
    pos : 'bottom',
    
    
    getChildContainer : function() {
        if(this.isSubMenu){
            return this.el;
        }
        
        return this.el.select('ul.dropdown-menu', true).first();  
    },
    
    getAutoCreate : function()
    {
        var text = [
            {
                tag : 'span',
                cls : 'roo-menu-text',
                html : this.html
            }
        ];
        
        if(this.icon){
            text.unshift({
                tag : 'i',
                cls : 'fa ' + this.icon
            })
        }
        
        
        var cfg = {
            tag : 'div',
            cls : 'btn-group',
            cn : [
                {
                    tag : 'button',
                    cls : 'dropdown-button btn btn-' + this.weight,
                    cn : text
                },
                {
                    tag : 'button',
                    cls : 'dropdown-toggle btn btn-' + this.weight,
                    cn : [
                        {
                            tag : 'span',
                            cls : 'caret'
                        }
                    ]
                },
                {
                    tag : 'ul',
                    cls : 'dropdown-menu'
                }
            ]
            
        };
        
        if(this.pos == 'top'){
            cfg.cls += ' dropup';
        }
        
        if(this.isSubMenu){
            cfg = {
                tag : 'ul',
                cls : 'dropdown-menu'
            }
        }
	
        return cfg;
    },
    
    onRender : function(ct, position)
    {
        this.isSubMenu = ct.hasClass('dropdown-submenu');
        
        Roo.bootstrap.menu.Menu.superclass.onRender.call(this, ct, position);
    },
    
    initEvents : function() 
    {
        if(this.isSubMenu){
            return;
        }
        
        this.hidden = true;
        
        this.triggerEl = this.el.select('button.dropdown-toggle', true).first();
        this.triggerEl.on('click', this.onTriggerPress, this);
        
        this.buttonEl = this.el.select('button.dropdown-button', true).first();
        this.buttonEl.on('click', this.onClick, this);
        
    },
    
    list : function()
    {
        if(this.isSubMenu){
            return this.el;
        }
        
        return this.el.select('ul.dropdown-menu', true).first();
    },
    
    onClick : function(e)
    {
        this.fireEvent("click", this, e);
    },
    
    onTriggerPress  : function(e)
    {   
        if (this.isVisible()) {
            this.hide();
        } else {
            this.show();
        }
    },
    
    isVisible : function(){
        return !this.hidden;
    },
    
    show : function()
    {
        this.fireEvent("beforeshow", this);
        
        this.hidden = false;
        this.el.addClass('open');
        
        Roo.get(document).on("mouseup", this.onMouseUp, this);
        
        this.fireEvent("show", this);
        
        
    },
    
    hide : function()
    {
        this.fireEvent("beforehide", this);
        
        this.hidden = true;
        this.el.removeClass('open');
        
        Roo.get(document).un("mouseup", this.onMouseUp);
        
        this.fireEvent("hide", this);
    },
    
    onMouseUp : function()
    {
        this.hide();
    }
    
});

 
 /*
 * - LGPL
 *
 * menu item
 * 
 */
Roo.bootstrap.menu = Roo.bootstrap.menu || {};

/**
 * @class Roo.bootstrap.menu.Item
 * @extends Roo.bootstrap.Component
 * Bootstrap MenuItem class
 * @cfg {Boolean} submenu (true | false) default false
 * @cfg {String} html text of the item
 * @cfg {String} href the link
 * @cfg {Boolean} disable (true | false) default false
 * @cfg {Boolean} preventDefault (true | false) default true
 * @cfg {String} icon Font awesome icon
 * @cfg {String} pos Submenu align to (left | right) default right 
 * 
 * 
 * @constructor
 * Create a new Item
 * @param {Object} config The config object
 */


Roo.bootstrap.menu.Item = function(config){
    Roo.bootstrap.menu.Item.superclass.constructor.call(this, config);
    this.addEvents({
        /**
         * @event mouseover
         * Fires when the mouse is hovering over this menu
         * @param {Roo.bootstrap.menu.Item} this
         * @param {Roo.EventObject} e
         */
        mouseover : true,
        /**
         * @event mouseout
         * Fires when the mouse exits this menu
         * @param {Roo.bootstrap.menu.Item} this
         * @param {Roo.EventObject} e
         */
        mouseout : true,
        // raw events
        /**
         * @event click
         * The raw click event for the entire grid.
         * @param {Roo.EventObject} e
         */
        click : true
    });
};

Roo.extend(Roo.bootstrap.menu.Item, Roo.bootstrap.Component,  {
    
    submenu : false,
    href : '',
    html : '',
    preventDefault: true,
    disable : false,
    icon : false,
    pos : 'right',
    
    getAutoCreate : function()
    {
        var text = [
            {
                tag : 'span',
                cls : 'roo-menu-item-text',
                html : this.html
            }
        ];
        
        if(this.icon){
            text.unshift({
                tag : 'i',
                cls : 'fa ' + this.icon
            })
        }
        
        var cfg = {
            tag : 'li',
            cn : [
                {
                    tag : 'a',
                    href : this.href || '#',
                    cn : text
                }
            ]
        };
        
        if(this.disable){
            cfg.cls = (typeof(cfg.cls) == 'undefined') ? 'disabled' : (cfg.cls + ' disabled');
        }
        
        if(this.submenu){
            cfg.cls = (typeof(cfg.cls) == 'undefined') ? 'dropdown-submenu' : (cfg.cls + ' dropdown-submenu');
            
            if(this.pos == 'left'){
                cfg.cls = (typeof(cfg.cls) == 'undefined') ? 'pull-left' : (cfg.cls + ' pull-left');
            }
        }
        
        return cfg;
    },
    
    initEvents : function() 
    {
        this.el.on('mouseover', this.onMouseOver, this);
        this.el.on('mouseout', this.onMouseOut, this);
        
        this.el.select('a', true).first().on('click', this.onClick, this);
        
    },
    
    onClick : function(e)
    {
        if(this.preventDefault){
            e.preventDefault();
        }
        
        this.fireEvent("click", this, e);
    },
    
    onMouseOver : function(e)
    {
        if(this.submenu && this.pos == 'left'){
            this.el.select('ul.dropdown-menu', true).first().setLeft(this.el.select('ul.dropdown-menu', true).first().getWidth() * -1);
        }
        
        this.fireEvent("mouseover", this, e);
    },
    
    onMouseOut : function(e)
    {
        this.fireEvent("mouseout", this, e);
    }
});

 

 /*
 * - LGPL
 *
 * menu separator
 * 
 */
Roo.bootstrap.menu = Roo.bootstrap.menu || {};

/**
 * @class Roo.bootstrap.menu.Separator
 * @extends Roo.bootstrap.Component
 * Bootstrap Separator class
 * 
 * @constructor
 * Create a new Separator
 * @param {Object} config The config object
 */


Roo.bootstrap.menu.Separator = function(config){
    Roo.bootstrap.menu.Separator.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.menu.Separator, Roo.bootstrap.Component,  {
    
    getAutoCreate : function(){
        var cfg = {
            tag : 'li',
            cls: 'divider'
        };
        
        return cfg;
    }
   
});

 

 /*
 * - LGPL
 *
 * Tooltip
 * 
 */

/**
 * @class Roo.bootstrap.Tooltip
 * Bootstrap Tooltip class
 * This is basic at present - all componets support it by default, however they should add tooltipEl() method
 * to determine which dom element triggers the tooltip.
 * 
 * It needs to add support for additional attributes like tooltip-position
 * 
 * @constructor
 * Create a new Toolti
 * @param {Object} config The config object
 */

Roo.bootstrap.Tooltip = function(config){
    Roo.bootstrap.Tooltip.superclass.constructor.call(this, config);
};

Roo.apply(Roo.bootstrap.Tooltip, {
    /**
     * @function init initialize tooltip monitoring.
     * @static
     */
    currentEl : false,
    currentTip : false,
    currentRegion : false,
    
    //  init : delay?
    
    init : function()
    {
        Roo.get(document).on('mouseover', this.enter ,this);
        Roo.get(document).on('mouseout', this.leave, this);
         
        
        this.currentTip = new Roo.bootstrap.Tooltip();
    },
    
    enter : function(ev)
    {
        var dom = ev.getTarget();
        //Roo.log(['enter',dom]);
        var el = Roo.fly(dom);
        if (this.currentEl) {
            //Roo.log(dom);
            //Roo.log(this.currentEl);
            //Roo.log(this.currentEl.contains(dom));
            if (this.currentEl == el) {
                return;
            }
            if (dom != this.currentEl.dom && this.currentEl.contains(dom)) {
                return;
            }

        }
        
        
        
        if (this.currentTip.el) {
            this.currentTip.el.hide(); // force hiding...
        }    
        //Roo.log(el);
        if (!el.attr('tooltip')) { // parents who have tip?
            return;
        }
        this.currentEl = el;
        this.currentTip.bind(el);
        this.currentRegion = Roo.lib.Region.getRegion(dom);
        this.currentTip.enter();
        
    },
    leave : function(ev)
    {
        var dom = ev.getTarget();
        //Roo.log(['leave',dom]);
        if (!this.currentEl) {
            return;
        }
        
        
        if (dom != this.currentEl.dom) {
            return;
        }
        var xy = ev.getXY();
        if (this.currentRegion.contains( new Roo.lib.Region( xy[1], xy[0] ,xy[1], xy[0]  ))) {
            return;
        }
        // only activate leave if mouse cursor is outside... bounding box..
        
        
        
        
        if (this.currentTip) {
            this.currentTip.leave();
        }
        //Roo.log('clear currentEl');
        this.currentEl = false;
        
        
    },
    alignment : {
        'left' : ['r-l', [-2,0], 'right'],
        'right' : ['l-r', [2,0], 'left'],
        'bottom' : ['t-b', [0,2], 'top'],
        'top' : [ 'b-t', [0,-2], 'bottom']
    }
    
});


Roo.extend(Roo.bootstrap.Tooltip, Roo.bootstrap.Component,  {
    
    
    bindEl : false,
    
    delay : null, // can be { show : 300 , hide: 500}
    
    timeout : null,
    
    hoverState : null, //???
    
    placement : 'bottom', 
    
    getAutoCreate : function(){
    
        var cfg = {
           cls : 'tooltip',
           role : 'tooltip',
           cn : [
                {
                    cls : 'tooltip-arrow'
                },
                {
                    cls : 'tooltip-inner'
                }
           ]
        };
        
        return cfg;
    },
    bind : function(el)
    {
        this.bindEl = el;
    },
      
    
    enter : function () {
       
        if (this.timeout != null) {
            clearTimeout(this.timeout);
        }
        
        this.hoverState = 'in'
         //Roo.log("enter - show");
        if (!this.delay || !this.delay.show) {
            this.show();
            return;
        }
        var _t = this;
        this.timeout = setTimeout(function () {
            if (_t.hoverState == 'in') {
                _t.show();
            }
        }, this.delay.show);
    },
    leave : function()
    {
        clearTimeout(this.timeout);
    
        this.hoverState = 'out'
         if (!this.delay || !this.delay.hide) {
            this.hide();
            return 
        }
       
        var _t = this;
        this.timeout = setTimeout(function () {
            //Roo.log("leave - timeout");
            
            if (_t.hoverState == 'out') {
                _t.hide();
                Roo.bootstrap.Tooltip.currentEl = false;
            }
        }, delay)
    },
    
    show : function ()
    {
        if (!this.el) {
            this.render(document.body);
        }
        // set content.
        //Roo.log([this.bindEl, this.bindEl.attr('tooltip')]);
        this.el.select('.tooltip-inner',true).first().dom.innerHTML = this.bindEl.attr('tooltip');
        
        this.el.removeClass(['fade','top','bottom', 'left', 'right','in']);
        
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
        //this.el.dom.style.display='block';
        this.el.addClass(placement);
        
        //this.el.appendTo(on_el);
        
        var p = this.getPosition();
        var box = this.el.getBox();
        
        if (autoPlace) {
            // fixme..
        }
        var align = Roo.bootstrap.Tooltip.alignment[placement]
        this.el.alignTo(this.bindEl, align[0],align[1]);
        //var arrow = this.el.select('.arrow',true).first();
        //arrow.set(align[2], 
        
        this.el.addClass('in fade');
        this.hoverState = null;
        
        if (this.el.hasClass('fade')) {
            // fade it?
        }
        
    },
    hide : function()
    {
         
        if (!this.el) {
            return;
        }
        //this.el.setXY([0,0]);
        this.el.removeClass('in');
        //this.el.hide();
        
    }
    
});
 

 /*
 * - LGPL
 *
 * Location Picker
 * 
 */

/**
 * @class Roo.bootstrap.LocationPicker
 * @extends Roo.bootstrap.Component
 * Bootstrap LocationPicker class
 * @cfg {Number} latitude Position when init default 0
 * @cfg {Number} longitude Position when init default 0
 * @cfg {Number} zoom default 15
 * @cfg {String} mapTypeId default google.maps.MapTypeId.ROADMAP
 * @cfg {Boolean} mapTypeControl default false
 * @cfg {Boolean} disableDoubleClickZoom default false
 * @cfg {Boolean} scrollwheel default true
 * @cfg {Boolean} streetViewControl default false
 * @cfg {Number} radius default 0
 * @cfg {String} locationName
 * @cfg {Boolean} draggable default true
 * @cfg {Boolean} enableAutocomplete default false
 * @cfg {Boolean} enableReverseGeocode default true
 * @cfg {String} markerTitle
 * 
 * @constructor
 * Create a new LocationPicker
 * @param {Object} config The config object
 */


Roo.bootstrap.LocationPicker = function(config){
    
    Roo.bootstrap.LocationPicker.superclass.constructor.call(this, config);
    
     this.addEvents({
            /**
             * @event initial
             * Fires when the picker initialized.
             * @param {Roo.bootstrap.LocationPicker} this
             * @param {Google Location} location
             */
            initial : true,
            /**
             * @event positionchanged
             * Fires when the picker position changed.
             * @param {Roo.bootstrap.LocationPicker} this
             * @param {Google Location} location
             */
            positionchanged : true,
            /**
             * @event resize
             * Fires when the map resize.
             * @param {Roo.bootstrap.LocationPicker} this
             */
            resize : true,
            /**
             * @event show
             * Fires when the map show.
             * @param {Roo.bootstrap.LocationPicker} this
             */
            show : true,
            /**
             * @event hide
             * Fires when the map hide.
             * @param {Roo.bootstrap.LocationPicker} this
             */
            hide : true
        });
        
};

Roo.extend(Roo.bootstrap.LocationPicker, Roo.bootstrap.Component,  {
    
    gMapContext: false,
    
    latitude: 0,
    longitude: 0,
    zoom: 15,
    mapTypeId: false,
    mapTypeControl: false,
    disableDoubleClickZoom: false,
    scrollwheel: true,
    streetViewControl: false,
    radius: 0,
    locationName: '',
    draggable: true,
    enableAutocomplete: false,
    enableReverseGeocode: true,
    markerTitle: '',
    
    getAutoCreate: function()
    {

        var cfg = {
            tag: 'div',
            cls: 'roo-location-picker'
        };
        
        return cfg
    },
    
    initEvents: function(ct, position)
    {   
        if(!this.mapTypeId){
            this.mapTypeId = google.maps.MapTypeId.ROADMAP;
        }
            
        if(!this.el.getWidth() || this.isApplied()){
            return;
        }
        
        this.el.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.initial();
    },
    
    initial: function()
    {
        this.gMapContext = this.GMapContext();
        
        var _this = this;
        
        google.maps.event.addListener(this.gMapContext.marker, "dragend", function(event) {
            _this.setPosition(_this.gMapContext.marker.position);
        });
        
        this.setPosition(this.gMapContext.location);
        
        this.fireEvent('initial', this, this.gMapContext.location);
    },
    
    isApplied: function() 
    {
        return this.getGmapContext() == false ? false : true;
    },
    
    getGmapContext: function() 
    {
        return this.gMapContext
    },
    
    GMapContext: function() 
    {
        var _map = new google.maps.Map(this.el.dom, this);
        var _marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.latitude, this.longitude),
            map: _map,
            title: this.markerTitle,
            draggable: this.draggable
        });
        
        return {
            map: _map,
            marker: _marker,
            circle: null,
            location: _marker.position,
            radius: this.radius,
            locationName: this.locationName,
            addressComponents: {
                formatted_address: null,
                addressLine1: null,
                addressLine2: null,
                streetName: null,
                streetNumber: null,
                city: null,
                district: null,
                state: null,
                stateOrProvince: null
            },
            settings: this,
            domContainer: this.el.dom,
            geodecoder: new google.maps.Geocoder()
        };
    },
    
    drawCircle: function(center, radius, options) 
    {
        if (this.gMapContext.circle != null) {
            this.gMapContext.circle.setMap(null);
        }
        if (radius > 0) {
            radius *= 1;
            options = Roo.apply({}, options, {
                strokeColor: "#0000FF",
                strokeOpacity: .35,
                strokeWeight: 2,
                fillColor: "#0000FF",
                fillOpacity: .2
            });
            
            options.map = this.gMapContext.map;
            options.radius = radius;
            options.center = center;
            this.gMapContext.circle = new google.maps.Circle(options);
            return this.gMapContext.circle;
        }
        
        return null;
    },
    
    setPosition: function(location) 
    {
        this.gMapContext.location = location;
        this.gMapContext.marker.setPosition(location);
        this.gMapContext.map.panTo(location);
        this.drawCircle(location, this.gMapContext.radius, {});
        
        var _this = this;
        
        if (this.gMapContext.settings.enableReverseGeocode) {
            this.gMapContext.geodecoder.geocode({
                latLng: this.gMapContext.location
            }, function(results, status) {
                
                if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                    _this.gMapContext.locationName = results[0].formatted_address;
                    _this.gMapContext.addressComponents = _this.address_component_from_google_geocode(results[0].address_components);
                    
                    _this.fireEvent('positionchanged', this, location);
                }
            });
            
            return;
        }
        
        this.fireEvent('positionchanged', this, location);
    },
    
    resize: function()
    {
        google.maps.event.trigger(this.gMapContext.map, "resize");
        
        this.gMapContext.map.setCenter(this.gMapContext.marker.position);
        
        this.fireEvent('resize', this);
    },
    
    setPositionByLatLng: function(latitude, longitude)
    {
        this.setPosition(new google.maps.LatLng(latitude, longitude));
    },
    
    getCurrentPosition: function() 
    {
        return {
            latitude: this.gMapContext.location.lat(),
            longitude: this.gMapContext.location.lng()
        };
    },
    
    getAddressName: function() 
    {
        return this.gMapContext.locationName;
    },
    
    getAddressComponents: function() 
    {
        return this.gMapContext.addressComponents;
    },
    
    address_component_from_google_geocode: function(address_components) 
    {
        var result = {};
        
        for (var i = 0; i < address_components.length; i++) {
            var component = address_components[i];
            if (component.types.indexOf("postal_code") >= 0) {
                result.postalCode = component.short_name;
            } else if (component.types.indexOf("street_number") >= 0) {
                result.streetNumber = component.short_name;
            } else if (component.types.indexOf("route") >= 0) {
                result.streetName = component.short_name;
            } else if (component.types.indexOf("neighborhood") >= 0) {
                result.city = component.short_name;
            } else if (component.types.indexOf("locality") >= 0) {
                result.city = component.short_name;
            } else if (component.types.indexOf("sublocality") >= 0) {
                result.district = component.short_name;
            } else if (component.types.indexOf("administrative_area_level_1") >= 0) {
                result.stateOrProvince = component.short_name;
            } else if (component.types.indexOf("country") >= 0) {
                result.country = component.short_name;
            }
        }
        
        result.addressLine1 = [ result.streetNumber, result.streetName ].join(" ").trim();
        result.addressLine2 = "";
        return result;
    },
    
    setZoomLevel: function(zoom)
    {
        this.gMapContext.map.setZoom(zoom);
    },
    
    show: function()
    {
        if(!this.el){
            return;
        }
        
        this.el.show();
        
        this.resize();
        
        this.fireEvent('show', this);
    },
    
    hide: function()
    {
        if(!this.el){
            return;
        }
        
        this.el.hide();
        
        this.fireEvent('hide', this);
    }
    
});
