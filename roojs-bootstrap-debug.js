/*
 * - LGPL
 *
 * base class for bootstrap elements..
 * 
 */
Roo.bootstrap = Roo.bootstrap || {};
Roo.bootstrap.Component = function(config){
    Roo.bootstrap.Component.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Component, Roo.BoxComponent,  {
      
	cls : false,
    
    style : false,
    
    autoCreate : false,
    
    initEvents : function() {  },
    
    parentId : false,
    
    parent: function() {
        // returns the parent component..
        return Roo.ComponentMgr.get(this.parentId)
        
        
    },
    
    // private
    onRender : function(ct, position)
    {
        Roo.bootstrap.Component.superclass.onRender.call(this, ct, position);
        if(this.el){
            return;
        }
        var cfg = Roo.apply({},  this.getAutoCreate());
        cfg.id = Roo.id();
        
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
    
    addxtype : function (tree) {
        var cn = this;
        if (tree.xtype != 'Body') {
            
            cn = Roo.factory(tree);
            
            cn.parentType = this.xtype; //??
            cn.parentId = this.id;
            cn.render(this.getChildContainer());
            // then add the element..
        }
        var nitems = [];
        if (typeof (tree.menu) != 'undefined') {
            tree.menu.parentType = cn.xtype;
            tree.menu.triggerEl = cn.el;
            nitems.push(cn.addxtype(Roo.apply({}, tree.menu)));
            
        }
	
        if (!tree.items || !tree.items.length) {
            this.items = nitems;
            return this;
        }
        var items = tree.items;
        delete tree.items;
        
        //Roo.log(items.length);
            // add the items..
        for(var i =0;i < items.length;i++) {
            nitems.push(cn.addxtype(Roo.apply({}, items[i])));
        }
    
        this.items = nitems;
	
	
        return this;
    }
    
     
 
    
});

 /*
 * - LGPL
 *
 * page contgainer.
 * 
 */ 
Roo.bootstrap.Body = function(config){
    Roo.bootstrap.Body.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Body, Roo.bootstrap.Component,  {
      
	autoCreate : {
        cls: 'container'
    },
    onRender : function(ct, position){
        this.el = Roo.get(document.body);
        
        //this.el.addClass([this.fieldClass, this.cls]);
        
    }
    
    
 
   
});

 /*
 * - LGPL
 *
 * page contgainer.
 * 
 */ 
Roo.bootstrap.ButtonGroup = function(config){
    Roo.bootstrap.ButtonGroup.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.ButtonGroup, Roo.bootstrap.Component,  {
    
    size: '',
    align: '',
    dropdirection: '',
    
    autoCreate : {
        cls: 'btn-group',
        html : null
    },

    getAutoCreate : function(){
        
        var cfg = Roo.apply({}, Roo.bootstrap.ButtonGroup.superclass.getAutoCreate.call(this));
        
        cfg.html = this.html || cfg.html;
        
        if (['vertical','justified'].indexOf(this.align)!==-1) {
            cfg.cls = 'btn-group-' + this.align;
            
            if (this.align == 'justified') {
                console.log(this.items);
            }
        }
        
        if (['lg','sm','xs'].indexOf(this.size)!==-1) {
            cfg.cls += ' btn-group-' + this.size;
        }
        
        if (['dropup'].indexOf(this.dropdirection)) {
            cfg.cls += ' dropup';
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
 * @class Roo.bootstrap.Button
 * @extends Roo.bootstrap.Component
 * Bootstrap Button class
 * @cfg {String} html The button content
 * @cfg {String} weight default (or empty) | primary | success | info | warning
 * @cfg {String} size empty | lg | sm | xs
 * @cfg {String} tag empty | a | input | submit
 * @cfg {String} href empty or href
 * @cfg {Boolean} disabled false | true
 * @cfg {Boolean} isClose false | true
 * @cfg {String} empty | see glyphicon reference list
 * @cfg {String} badge text for badge
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
    
    autoCreate : {
        cls: 'btn',
        tag : 'button',
        html: 'hello'
    },
    
    getAutoCreate : function(){
        
        
        Roo.log("Button Parent is : " + this.parent().xtype);
        
        
        var cfg = Roo.apply({}, Roo.bootstrap.Button.superclass.getAutoCreate.call(this));
        
        cfg.html = this.html || cfg.html;
        
        if (this.isClose) {
            cfg.cls += ' close';
            
            cfg["aria-hidden"] = true;
            
            cfg.html = "&times;";
            
            return cfg;
        }
        
        if (this.parentType != 'Navbar') {
            this.weight = this.weight.length ?  this.weight : 'default';
        }
        if (['default', 'primary', 'success', 'info', 'warning', 'danger', 'link'].indexOf(this.weight) > -1) {
            
            cfg.cls += ' btn-' + this.weight;
        } else {
            
        }
        
        if (this.active) {
            cfg.cls += ' active';
        }
        
        cfg.cls += this.size.length ? (' btn-' + this.size) : '';
        
        if (['a', 'button', 'input', 'submit'].indexOf(this.tag) < 0) {
            throw "Invalid value for tag: " + this.tag + ". must be a, button, input or submit.";
            this.tag = 'button';
        } else {
            cfg.tag = this.tag;
        }
         
        //gsRoo.log(this.parentType);
        if (this.parentType == 'Navbar') {
            cfg.tag = 'li';
            
            cfg.cls = '';
            cfg.cn =  [  {
                tag : 'a',
                html : this.html,
                href : this.href || '#'
            }];
            if (this.menu) {
                cfg.cn[0].html = this.html  + ' <span class="caret"></span>';
                cfg.cls += ' dropdown';
            }   
            
            delete cfg.html;
            
        }
        
        
        
        if (this.disabled) {
            cfg.disabled = 'disabled';
        }
        
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
            
            cfg.cls='btn';
            
            cfg.href=this.href;
            
            cfg.cn = [
                cfg.html,
                {
                    tag: 'span',
                    cls: 'badge',
                    html: this.badge
                }
            ]
            
            cfg.html='';
        }
        
        if (cfg.tag !== 'a' && this.href !== '') {
            throw "Tag must be a to set href.";
        } else if (this.href !== '') {
            cfg.href = this.href;
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
 * column
 * 
 */ 
Roo.bootstrap.Column = function(config){
    Roo.bootstrap.Column.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Column, Roo.bootstrap.Component,  {
      
    colspan : 6,
    
	autoCreate : {
        cls: 'column'
    },
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Column.superclass.getAutoCreate.call(this));
        cfg.cls += 'col-md-' + this.colspan;
        return cfg;
    }
   
});

 

 /*
 * - LGPL
 *
 * page contgainer.
 * 
 */ 
Roo.bootstrap.Container = function(config){
    Roo.bootstrap.Container.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Container, Roo.bootstrap.Component,  {
     
    jumbotron : false, // doc me
	autoCreate : {
        cls: 'container',
        html : null
    },
    getAutoCreate : function(){
        
        var cfg = Roo.apply({}, Roo.bootstrap.Container.superclass.getAutoCreate.call(this));
        if (this.jumbotron) {
            cfg.cls = 'jumbotron';
        }
        
        cfg.html = this.html || cfg.html;
        return cfg;
    }
   
});

 /*
 * - LGPL
 *
 * row
 * 
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
         * @event rendered
         * Fires when the form is rendered
         * @param {Roo.form.Form} form
         */
        rendered : true
    });
};

Roo.extend(Roo.bootstrap.Form, Roo.bootstrap.Component,  {
      
    
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
    }
    
});

 
/*
 * - LGPL
 *
 * row
 * 
 */ 
Roo.bootstrap.Input = function(config){
    Roo.bootstrap.Input.superclass.constructor.call(this, config);
   
};

Roo.extend(Roo.bootstrap.Input, Roo.bootstrap.Component,  {
    
    fieldLabel : '',
    inputType : 'text',
    disabled : false,
    
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

        
        switch(align) {
            case 'left':
                
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
                            input
                        ]
                    }
                    
                ];
                break;
            default:
                
                 cfg.cn = [
                   
                    {
                        tag: 'label',
                        //cls : 'input-group-addon',
                        html : this.fieldLabel
                        
                    },
                    
                    input
                    
                ];
                break;
                
        }
         
        
        
        
        if (this.disabled) {
            input.disabled=true;
        }
        return cfg;
        
    },
    setDisabled : function(v)
    {
        var i  = this.el.select('input',true).dom;
        if (v) {
            i.removeAttribute('disabled');
            return;
            
        }
        i.setAttribute('disabled','true');
    }
});

 
/*
 * - LGPL
 *
 * row
 * 
 */ 
Roo.bootstrap.Menu = function(config){
    Roo.bootstrap.Menu.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Menu, Roo.bootstrap.Component,  {
    
    html : false,
    align : '',
    triggerEl : false,
    
    
    getChildContainer : function() {
        return this.el;  
    },
    
    getAutoCreate : function(){
	 
	//if (['right'].indexOf(this.align)!==-1) {
	//    cfg.cn[1].cls += ' pull-right'
	//}
	
        return {
                tag : 'ul',
                cls : 'dropdown-menu' 
                
            };
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
 * row
 * 
 */ 
Roo.bootstrap.MenuItem = function(config){
    Roo.bootstrap.MenuItem.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.MenuItem, Roo.bootstrap.Component,  {
      
	href : false,
    html : false,
    
    
    
    getAutoCreate : function(){
        var cfg= {
            // cls: '',
             tag : 'li',
             cn : [
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
Roo.bootstrap.Modal = function(config){
    Roo.bootstrap.Modal.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Modal, Roo.bootstrap.Component,  {
    
    title : 'test dialog',
    body : 'test body',
	buttons : false,
    onRender : function(ct, position){
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
                                    cls : 'modal-body',
                                    html : this.body
                                },
                                 {
                                    cls : 'modal-footer',
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
                                }
                                
                                
                            ]
                            
                        }
                    ]
                        
                }
            ]
            
            
        };
          
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
 * row
 * 
 */ 
Roo.bootstrap.Navbar = function(config){
    Roo.bootstrap.Navbar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Navbar, Roo.bootstrap.Component,  {
    
    type: 'nav',
    arrangement: '',
    position: '',
    inverse: false,
    collapse: false,
    align: '',
    
    autoCreate : {
        cls: 'navbar navbar-default',
        tag : 'nav',
        role : 'navigation'
    },
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Navbar.superclass.getAutoCreate.call(this));
	
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
        
        if (['fixed-top','fixed-bottom','static-top'].indexOf(this.position)> -1) {
            cfg.cls += ' navbar-' + this.position;
            cfg.tag = this.position  == 'fixed-bottom' ? 'footer' : 'header';
        }
         
        if (this.collapse) {
            cfg.tag  = 'div';
            cfg.cls =  'collapse navbar-collapse ';
            
            
        }
        
        if (this.align === 'right') {
            cfg.cn[0].cls += ' navbar-right';
        }
        if (this.inverse) {
            cfg.cls += ' navbar-inverse';
            
        }
        /* type: nav | tabs | pills
         * arrangement: stacked | justified
         * position: fixed/static etc
         * inverse: true/false
         */
        
        
        return cfg;
    },
    
    getChildContainer : function() {
        return this.el.select('ul', true).first();
    }
   
});

 

 /*
 * - LGPL
 *
 * row
 * 
 */ 
Roo.bootstrap.Row = function(config){
    Roo.bootstrap.Row.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Row, Roo.bootstrap.Component,  {
      
	autoCreate : {
        cls: 'row clearfix'
    }
 
   
});

 

 