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
        cfg.html = this.html || cfg.html;
        
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
       if (this.el.hasClass('roo-button')) {
            this.el.on('click', this.onClick, this);
       } else {
            this.el.select('.roo-button').on('click', this.onClick, this);
       }
       
       
        
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
    enable : function()
    {
        this.disabled = false;
        this.el.removeClass('disabled');
    },
    disable : function()
    {
        this.disabled = true;
        this.el.addClass('disabled');
    },
    setActive : function(v) {
        
        this.el[v ? 'addClass' : 'removeClass']('active');
        
        
    }
});

 