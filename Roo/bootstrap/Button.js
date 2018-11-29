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
 * @cfg {String} weight (default | primary | secondary | success | info | warning | danger | link ) default
 * @cfg {String} badge_weight (default | primary | secondary | success | info | warning | danger | link ) default (same as button)
 * @cfg {Boolean} outline default false (except for weight=default which emulates old behaveiour with an outline)
 * @cfg {String} size ( lg | sm | xs)
 * @cfg {String} tag ( a | input | submit)
 * @cfg {String} href empty or href
 * @cfg {Boolean} disabled default false;
 * @cfg {Boolean} isClose default false;
 * @cfg {String} glyphicon depricated - use fs
 * @cfg {String} badge text for badge
 * @cfg {String} theme (default|glow)  
 * @cfg {Boolean} inverse dark themed version
 * @cfg {Boolean} toggle is it a slidy toggle button
 * @cfg {Boolean} pressed　(true|false) default null - if the button ahs active state
 * @cfg {String} ontext text for on slidy toggle state
 * @cfg {String} offtext text for off slidy toggle state
 * @cfg {Boolean} preventDefault  default true (stop click event triggering the URL if it's a link.)
 * @cfg {Boolean} removeClass remove the standard class..
 * @cfg {String} target  target for a href. (_self|_blank|_parent|_top| other)
 * 
 * @constructor
 * Create a new button
 * @param {Object} config The config object
 */


Roo.bootstrap.Button = function(config){
    Roo.bootstrap.Button.superclass.constructor.call(this, config);
    this.weightClass = ["btn-default btn-outline-secondary", 
                       "btn-primary", 
                       "btn-success", 
                       "btn-info", 
                       "btn-warning",
                       "btn-danger",
                       "btn-link"
                      ],  
    this.addEvents({
        // raw events
        /**
         * @event click
         * When a butotn is pressed
         * @param {Roo.bootstrap.Button} btn
         * @param {Roo.EventObject} e
         */
        "click" : true,
         /**
         * @event toggle
         * After the button has been toggles
         * @param {Roo.bootstrap.Button} btn
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
    badge_weight: '',
    outline : false,
    size: '',
    tag: 'button',
    href: '',
    disabled: false,
    isClose: false,
    glyphicon: '',
    fa: '',
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
            
            if (['default', 'secondary' , 'primary', 'success', 'info', 'warning', 'danger', 'link'].indexOf(this.weight) > -1) {
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
            if (['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link'].indexOf(this.weight) > -1) {
                
                var outline = this.outline || this.weight == 'default' ? 'outline-' : '';
                var weight = this.weight == 'default' ? 'secondary' : this.weight;
                cfg.cls += ' btn-' + outline + weight;
                if (this.weight == 'default') {
                    // BC
                    cfg.cls += ' btn-' + this.weight;
                }
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
        
        
        if (this.active || this.pressed === true) {
            cfg.cls += ' active';
        }
        
        if (this.disabled) {
            cfg.disabled = 'disabled';
        }
        
        if (this.items) {
            Roo.log('changing to ul' );
            cfg.tag = 'ul';
            this.glyphicon = 'caret';
            if (Roo.bootstrap.version == 4) {
                this.fa = 'caret-down';
            }
            
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
        if (this.fa) {
            cfg.html = ' ' + cfg.html;
            
            cfg.cn = [
                {
                    tag: 'i',
                    cls: 'fa fas fa-' + this.fa
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
            var bw = this.badge_weight.length ? this.badge_weight :
                (this.weight.length ? this.weight : 'secondary');
            bw = bw == 'default' ? 'secondary' : bw;
            
            cfg.cn = [
                value,
                {
                    tag: 'span',
                    cls: 'badge badge-' + bw,
                    html: this.badge
                }
            ];
            
            cfg.html='';
        }
        
        if (this.menu) {
            cfg.cls += ' dropdown';
            cfg.html = typeof(cfg.html) != 'undefined' ?
                    cfg.html + ' <span class="caret"></span>' : '<span class="caret"></span>';
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
            this.toggleActive(e);
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
        this.pressed = v;
    },
     /**
     * toggles the current active state 
     */
    toggleActive : function(e)
    {
        this.setActive(!this.pressed);
        this.fireEvent('toggle', this, e, !this.pressed);
    },
     /**
     * get the current active state
     * @return {boolean} true if it's active
     */
    isActive : function()
    {
        return this.el.hasClass('active');
    },
    /**
     * set the text of the first selected button
     */
    setText : function(str)
    {
        this.el.select('.roo-button-text',true).first().dom.innerHTML = str;
    },
    /**
     * get the text of the first selected button
     */
    getText : function()
    {
        return this.el.select('.roo-button-text',true).first().dom.innerHTML;
    },
    
    setWeight : function(str)
    {
    	this.el.removeClass(this.weightClass);
        this.weight = str;
        var outline = this.outline ? 'outline-' : '';
        if (str == 'default') {
            this.el.addClass('btn-default btn-outline-secondary');        
            return;
        }
        this.el.addClass('btn-' + outline + str);        
    }
    
    
});

 