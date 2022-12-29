
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.Modal
 * @extends Roo.bootstrap.Component
 * @parent none builder
 * @children Roo.bootstrap.Component
 * Bootstrap Modal class
 * @cfg {String} title Title of dialog
 * @cfg {String} html - the body of the dialog (for simple ones) - you can also use template..
 * @cfg {Roo.Template} tmpl - a template with variables. to use it, add a handler in show:method  adn
 * @cfg {Boolean} specificTitle default false
 * @cfg {Roo.bootstrap.Button} buttons[] Array of buttons or standard button set..
 * @cfg {String} buttonPosition (left|right|center) default right (DEPRICATED) - use mr-auto on buttons to put them on the left
 * @cfg {Boolean} animate default true
 * @cfg {Boolean} allow_close default true
 * @cfg {Boolean} fitwindow default false
 * @cfg {Boolean} bodyOverflow should the body element have overflow auto added default false
 * @cfg {Number} width fixed width - usefull for chrome extension only really.
 * @cfg {Number} height fixed height - usefull for chrome extension only really.
 * @cfg {String} size (sm|lg|xl) default empty
 * @cfg {Number} max_width set the max width of modal
 * @cfg {Boolean} editableTitle can the title be edited

 *
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
        "btnclick" : true,
        /**
         * @event resize
         * Fire when dialog resize
         * @param {Roo.bootstrap.Modal} this
         * @param {Roo.EventObject} e
         */
        "resize" : true,
        /**
         * @event titlechanged
         * Fire when the editable title has been changed
         * @param {Roo.bootstrap.Modal} this
         * @param {Roo.EventObject} value
         */
        "titlechanged" : true 
        
    });
    this.buttons = this.buttons || [];

    if (this.tmpl) {
        this.tmpl = Roo.factory(this.tmpl);
    }

};

Roo.extend(Roo.bootstrap.Modal, Roo.bootstrap.Component,  {

    title : 'test dialog',

    buttons : false,

    // set on load...

    html: false,

    tmp: false,

    specificTitle: false,

    buttonPosition: 'right',

    allow_close : true,

    animate : true,

    fitwindow: false,
    
     // private
    dialogEl: false,
    bodyEl:  false,
    footerEl:  false,
    titleEl:  false,
    closeEl:  false,

    size: '',
    
    max_width: 0,
    
    max_height: 0,
    
    fit_content: false,
    editableTitle  : false,

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

        this.dialogEl = this.el.select('.modal-dialog',true).first();
        this.bodyEl = this.el.select('.modal-body',true).first();
        this.closeEl = this.el.select('.modal-header .close', true).first();
        this.headerEl = this.el.select('.modal-header',true).first();
        this.titleEl = this.el.select('.modal-title',true).first();
        this.footerEl = this.el.select('.modal-footer',true).first();

        this.maskEl = Roo.DomHelper.append(document.body, {tag: "div", cls:"x-dlg-mask"}, true);
        
        //this.el.addClass("x-dlg-modal");

        if (this.buttons.length) {
            Roo.each(this.buttons, function(bb) {
                var b = Roo.apply({}, bb);
                b.xns = b.xns || Roo.bootstrap;
                b.xtype = b.xtype || 'Button';
                if (typeof(b.listeners) == 'undefined') {
                    b.listeners = { click : this.onButtonClick.createDelegate(this)  };
                }

                var btn = Roo.factory(b);

                btn.render(this.getButtonContainer());

            },this);
        }
        // render the children.
        var nitems = [];

        if(typeof(this.items) != 'undefined'){
            var items = this.items;
            delete this.items;

            for(var i =0;i < items.length;i++) {
                // we force children not to montor widnow resize  - as we do that for them.
                items[i].monitorWindowResize = false;
                nitems.push(this.addxtype(Roo.apply({}, items[i])));
            }
        }

        this.items = nitems;

        // where are these used - they used to be body/close/footer


        this.initEvents();
        //this.el.addClass([this.fieldClass, this.cls]);

    },

    getAutoCreate : function()
    {
        // we will default to modal-body-overflow - might need to remove or make optional later.
        var bdy = {
                cls : 'modal-body ' + (this.bodyOverflow ? 'overflow-auto' : ''), 
                html : this.html || ''
        };

        var title = {
            tag: 'h5',
            cls : 'modal-title',
            html : this.title
        };

        if(this.specificTitle){ // WTF is this?
            title = this.title;
        }

        var header = [];
        if (this.allow_close && Roo.bootstrap.version == 3) {
            header.push({
                tag: 'button',
                cls : 'close',
                html : '&times'
            });
        }

        header.push(title);

        if (this.editableTitle) {
            header.push({
                cls: 'form-control roo-editable-title d-none',
                tag: 'input',
                type: 'text'
            });
        }
        
        if (this.allow_close && Roo.bootstrap.version == 4) {
            header.push({
                tag: 'button',
                cls : 'close',
                html : '&times'
            });
        }
        
        var size = '';

        if(this.size.length){
            size = 'modal-' + this.size;
        }
        
        var footer = Roo.bootstrap.version == 3 ?
            {
                cls : 'modal-footer',
                cn : [
                    {
                        tag: 'div',
                        cls: 'btn-' + this.buttonPosition
                    }
                ]

            } :
            {  // BS4 uses mr-auto on left buttons....
                cls : 'modal-footer'
            };

            

        
        
        var modal = {
            cls: "modal",
             cn : [
                {
                    cls: "modal-dialog " + size,
                    cn : [
                        {
                            cls : "modal-content",
                            cn : [
                                {
                                    cls : 'modal-header',
                                    cn : header
                                },
                                bdy,
                                footer
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

         return this.bodyEl;

    },
    getButtonContainer : function() {
        
         return Roo.bootstrap.version == 4 ?
            this.el.select('.modal-footer',true).first()
            : this.el.select('.modal-footer div',true).first();

    },
    
    closeClick : function()
    {
        this.hide();
    },
    
    initEvents : function()
    {
        if (this.allow_close) {
            this.closeEl.on('click', this.closeClick, this);
        }
        Roo.EventManager.onWindowResize(this.resize, this, true);
        if (this.editableTitle) {
            this.headerEditEl =  this.headerEl.select('.form-control',true).first();
            this.headerEl.on('click', function() { this.toggleHeaderInput(true) } , this);
            this.headerEditEl.on('keyup', function(e) {
                    if([  e.RETURN , e.TAB , e.ESC ].indexOf(e.keyCode) > -1) {
                        this.toggleHeaderInput(false)
                    }
                }, this);
            this.headerEditEl.on('blur', function(e) {
                this.toggleHeaderInput(false)
            },this);
        }

    },
  

    resize : function()
    {
        this.maskEl.setSize(
            Roo.lib.Dom.getViewWidth(true),
            Roo.lib.Dom.getViewHeight(true)
        );
        
        if (this.fitwindow) {
            
           this.dialogEl.setStyle( { 'max-width' : '100%' });
            this.setSize(
                this.width || Roo.lib.Dom.getViewportWidth(true) - 30,
                this.height || Roo.lib.Dom.getViewportHeight(true) // catering margin-top 30 margin-bottom 30
            );
            return;
        }
        
        if(this.max_width !== 0) {
            
            var w = Math.min(this.max_width, Roo.lib.Dom.getViewportWidth(true) - 30);
            
            if(this.height) {
                this.setSize(w, this.height);
                return;
            }
            
            if(this.max_height) {
                this.setSize(w,Math.min(
                    this.max_height,
                    Roo.lib.Dom.getViewportHeight(true) - 60
                ));
                
                return;
            }
            
            if(!this.fit_content) {
                this.setSize(w, Roo.lib.Dom.getViewportHeight(true) - 60);
                return;
            }
            
            this.setSize(w, Math.min(
                60 +
                this.headerEl.getHeight() + 
                this.footerEl.getHeight() + 
                this.getChildHeight(this.bodyEl.dom.childNodes),
                Roo.lib.Dom.getViewportHeight(true) - 60)
            );
        }
        
    },

    setSize : function(w,h)
    {
        if (!w && !h) {
            return;
        }
        
        this.resizeTo(w,h);
        // any layout/border etc.. resize..
        (function () {
            this.items.forEach( function(e) {
                e.layout ? e.layout() : false;

            });
        }).defer(100,this);
        
    },

    show : function() {

        if (!this.rendered) {
            this.render();
        }
        this.toggleHeaderInput(false);
        //this.el.setStyle('display', 'block');
        this.el.removeClass('hideing');
        this.el.dom.style.display='block';
        
        Roo.get(document.body).addClass('modal-open');
 
        if(this.animate){  // element has 'fade'  - so stuff happens after .3s ?- not sure why the delay?
            
            (function(){
                this.el.addClass('show');
                this.el.addClass('in');
            }).defer(50, this);
        }else{
            this.el.addClass('show');
            this.el.addClass('in');
        }

        // not sure how we can show data in here..
        //if (this.tmpl) {
        //    this.getChildContainer().dom.innerHTML = this.tmpl.applyTemplate(this);
        //}

        Roo.get(document.body).addClass("x-body-masked");
        
        this.maskEl.setSize(Roo.lib.Dom.getViewWidth(true),   Roo.lib.Dom.getViewHeight(true));
        this.maskEl.setStyle('z-index', Roo.bootstrap.Modal.zIndex++);
        this.maskEl.dom.style.display = 'block';
        this.maskEl.addClass('show');
        
        
        this.resize();
        
        this.fireEvent('show', this);

        // set zindex here - otherwise it appears to be ignored...
        this.el.setStyle('z-index', Roo.bootstrap.Modal.zIndex++);
        
        
        // this is for children that are... layout.Border 
        (function () {
            this.items.forEach( function(e) {
                e.layout ? e.layout() : false;

            });
        }).defer(100,this);

    },
    hide : function()
    {
        if(this.fireEvent("beforehide", this) !== false){
            
            this.maskEl.removeClass('show');
            
            this.maskEl.dom.style.display = '';
            Roo.get(document.body).removeClass("x-body-masked");
            this.el.removeClass('in');
            this.el.select('.modal-dialog', true).first().setStyle('transform','');

            if(this.animate){ // why
                this.el.addClass('hideing');
                this.el.removeClass('show');
                (function(){
                    if (!this.el.hasClass('hideing')) {
                        return; // it's been shown again...
                    }
                    
                    this.el.dom.style.display='';

                    Roo.get(document.body).removeClass('modal-open');
                    this.el.removeClass('hideing');
                }).defer(150,this);
                
            }else{
                this.el.removeClass('show');
                this.el.dom.style.display='';
                Roo.get(document.body).removeClass('modal-open');

            }
            this.fireEvent('hide', this);
        }
    },
    isVisible : function()
    {
        
        return this.el.hasClass('show') && !this.el.hasClass('hideing');
        
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

        btn.render(this.getButtonContainer());

        return btn;

    },

    setDefaultButton : function(btn)
    {
        //this.el.select('.modal-footer').()
    },

    resizeTo: function(w,h)
    {
        this.dialogEl.setWidth(w);
        
        var diff = this.headerEl.getHeight() + this.footerEl.getHeight() + 60; // dialog margin-bottom: 30  

        this.bodyEl.setHeight(h - diff);
        
        this.fireEvent('resize', this);
    },
    
    setContentSize  : function(w, h)
    {

    },
    onButtonClick: function(btn,e)
    {
        //Roo.log([a,b,c]);
        this.fireEvent('btnclick', btn.name, e);
    },
     /**
     * Set the title of the Dialog
     * @param {String} str new Title
     */
    setTitle: function(str) {
        this.titleEl.dom.innerHTML = str;
        this.title = str;
    },
    /**
     * Set the body of the Dialog
     * @param {String} str new Title
     */
    setBody: function(str) {
        this.bodyEl.dom.innerHTML = str;
    },
    /**
     * Set the body of the Dialog using the template
     * @param {Obj} data - apply this data to the template and replace the body contents.
     */
    applyBody: function(obj)
    {
        if (!this.tmpl) {
            Roo.log("Error - using apply Body without a template");
            //code
        }
        this.tmpl.overwrite(this.bodyEl, obj);
    },
    
    getChildHeight : function(child_nodes)
    {
        if(
            !child_nodes ||
            child_nodes.length == 0
        ) {
            return 0;
        }
        
        var child_height = 0;
        
        for(var i = 0; i < child_nodes.length; i++) {
            
            /*
            * for modal with tabs...
            if(child_nodes[i].classList.contains('roo-layout-panel')) {
                
                var layout_childs = child_nodes[i].childNodes;
                
                for(var j = 0; j < layout_childs.length; j++) {
                    
                    if(layout_childs[j].classList.contains('roo-layout-panel-body')) {
                        
                        var layout_body_childs = layout_childs[j].childNodes;
                        
                        for(var k = 0; k < layout_body_childs.length; k++) {
                            
                            if(layout_body_childs[k].classList.contains('navbar')) {
                                child_height += layout_body_childs[k].offsetHeight;
                                continue;
                            }
                            
                            if(layout_body_childs[k].classList.contains('roo-layout-tabs-body')) {
                                
                                var layout_body_tab_childs = layout_body_childs[k].childNodes;
                                
                                for(var m = 0; m < layout_body_tab_childs.length; m++) {
                                    
                                    if(layout_body_tab_childs[m].classList.contains('roo-layout-active-content')) {
                                        child_height += this.getChildHeight(layout_body_tab_childs[m].childNodes);
                                        continue;
                                    }
                                    
                                }
                                
                            }
                            
                        }
                    }
                }
                continue;
            }
            */
            
            child_height += child_nodes[i].offsetHeight;
            // Roo.log(child_nodes[i].offsetHeight);
        }
        
        return child_height;
    },
    toggleHeaderInput : function(is_edit)
    {
        if (!this.editableTitle) {
            return; // not editable.
        }
        if (is_edit && this.is_header_editing) {
            return; // already editing..
        }
        if (is_edit) {
    
            this.headerEditEl.dom.value = this.title;
            this.headerEditEl.removeClass('d-none');
            this.headerEditEl.dom.focus();
            this.titleEl.addClass('d-none');
            
            this.is_header_editing = true;
            return
        }
        // flip back to not editing.
        this.title = this.headerEditEl.dom.value;
        this.headerEditEl.addClass('d-none');
        this.titleEl.removeClass('d-none');
        this.titleEl.dom.innerHTML = String.format('{0}', this.title);
        this.is_header_editing = false;
        this.fireEvent('titlechanged', this, this.title);
    
            
        
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
        ],
        
        zIndex : 10001
});

