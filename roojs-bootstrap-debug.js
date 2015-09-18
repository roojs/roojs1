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
            cfg.html = '<i class="glyphicon glyphicon-'+this.icon + '"></i>' +  (cfg.html || '');
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
    },
    
    show : function() {
        this.el.removeClass('hidden');
    },
    hide: function() {
        if (!this.el.hasClass('hidden')) {
            this.el.addClass('hidden');
        }
        
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
Roo.MessageBox = Roo.MessageBox || Roo.bootstrap.MessageBox;
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
            this.menu = this.addxtype(Roo.apply({}, this.menu));
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
        if(this.preventDefault || this.href == '#'){
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
 * @cfg {Boolean} disabled default false
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
    disabled: false,
    
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
        
        if(this.disabled){
            cfg.cls = typeof(cfg.cls) !== 'undefined' ? cfg.cls + ' disabled' : 'disabled';
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
        
        if(this.disabled){
            return;
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
     * @cfg {String} tooltip (Optional)
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
        'rowclass' : true,
          /**
         * @event rowsrendered
         * Fires when all the  rows have been rendered
         * @param {Roo.bootstrap.Table} this
         */
        'rowsrendered' : true
        
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
        
        // why is this done????? = it breaks dialogs??
        //this.parent().el.setStyle('position', 'relative');
        
        
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
        
        if(!cell || typeof(cell) == 'undefined'){
            return;
        }
        
        var row = cell.findParent('tr', false, true);
        
        if(!row || typeof(row) == 'undefined'){
            return;
        }
        
        var cellIndex = cell.dom.cellIndex;
        var rowIndex = this.getRowIndex(row);
        
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
        
        if(!cell || typeof(cell) == 'undefined'){
            return;
        }
        
        var row = cell.findParent('tr', false, true);
        
        if(!row || typeof(row) == 'undefined'){
            return;
        }
        
        var cellIndex = cell.dom.cellIndex;
        var rowIndex = this.getRowIndex(row);
        
        if(this.CellSelection){
            this.fireEvent('celldblclick', this, cell, rowIndex, cellIndex, e);
        }
        
        if(this.RowSelection){
            this.fireEvent('rowdblclick', this, row, rowIndex, e);
        }
    },
    
    sort : function(e,el)
    {
        var col = Roo.get(el);
        
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
            
            if(typeof(config.tooltip) != 'undefined'){
                c.tooltip = config.tooltip;
            }
            
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
        this.fireEvent('rowsrendered', this);
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
        
        var rows = this.el.select('tbody > tr', true).elements;
        
        if(typeof(rows[index]) != 'undefined'){
            bt.removeChild(rows[index].dom);
        }
        
//        if(bt.rows[index]){
//            bt.removeChild(bt.rows[index]);
//        }
        
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
        var rows = this.el.select('tbody > tr', true).elements;
        
        return (typeof(rows[rowIndex]) == 'undefined') ? false : rows[rowIndex];
        
    },
    // returns the object tree for a tr..
  
    
    renderRow : function(cm, ds, rowIndex) 
    {
        
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
        
        var rows = this.el.select('tbody > tr', true).elements;
        
        if(typeof(rows[rowIndex]) == 'undefined'){
            return;
        }
        rows[rowIndex].dom.style.display = state ? '' : 'none';
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
    },
    
    getRowIndex : function(row)
    {
        var rowIndex = -1;
        
        Roo.each(this.el.select('tbody > tr', true).elements, function(el, index){
            if(el != row){
                return;
            }
            
            rowIndex = index;
        });
        
        return rowIndex;
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
        
        if(isSelectAll  && event.getCharCode() > 31){ // not backspace and delete key
            
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

 
