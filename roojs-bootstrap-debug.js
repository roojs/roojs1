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
    },
    
    show : function() {
        this.el.removeClass('hidden');
    },
    hide: function() {
        if (!this.el.hasClass('hidden')) {
            this.el.addClass('hidden');
        }
        
    },
   
});

 