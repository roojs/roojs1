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

 