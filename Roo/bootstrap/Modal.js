
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.Modal
 * @extends Roo.bootstrap.Component
 * Bootstrap Modal class
 * @cfg {String} title Title of dialog
 * @cfg {String} html - the body of the dialog (for simple ones) - you can also use template..
 * @cfg {Roo.Template} tmpl - a template with variables. to use it, add a handler in show:method  adn 
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
    
    
     // private
    bodyEl:  false,
    footerEl:  false,
    titleEl:  false,
    closeEl:  false,
    
    
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
        
        
        this.bodyEl = this.el.select('.modal-body',true).first();
        this.closeEl = this.el.select('.modal-header .close', true).first();
        this.footerEl = this.el.select('.modal-footer',true).first();
        this.titleEl = this.el.select('.modal-title',true).first();
        
        
         
        this.maskEl = Roo.DomHelper.append(document.body, {tag: "div", cls:"x-dlg-mask"}, true);
        this.maskEl.enableDisplayMode("block");
        this.maskEl.hide();
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
        
        // where are these used - they used to be body/close/footer
        
       
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
         
         return this.bodyEl;
        
    },
    getButtonContainer : function() {
         return this.el.select('.modal-footer div',true).first();
        
    },
    initEvents : function()
    {
        if (this.allow_close) {
            this.closeEl.on('click', this.hide, this);
        }
        
        var _this = this;
        
        window.addEventListener("resize", function() { _this.resize(); } );

    },
    
    resize : function()
    {
        this.maskEl.setSize(Roo.lib.Dom.getViewWidth(true), Roo.lib.Dom.getViewHeight(true));
    },
    
    show : function() {
        
        if (!this.rendered) {
            this.render();
        }
        
        this.el.setStyle('display', 'block');
        
        if(this.animate){
            var _this = this;
            (function(){
                _this.el.addClass('in');
                
            }).defer(50);
        }else{
            this.el.addClass('in');
            
        }
        
        // not sure how we can show data in here.. 
        //if (this.tmpl) {
        //    this.getChildContainer().dom.innerHTML = this.tmpl.applyTemplate(this);
        //}
        
        Roo.get(document.body).addClass("x-body-masked");
        this.maskEl.setSize(Roo.lib.Dom.getViewWidth(true), Roo.lib.Dom.getViewHeight(true));
        this.maskEl.show();
        this.el.setStyle('zIndex', '10001');
       
        this.fireEvent('show', this);
        this.el.setStyle.defer(500, this.el, ['position', 'fixed'] ); // try and fix top jump?
        
        
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
     /**
     * Set the title of the Dialog
     * @param {String} str new Title
     */
    setTitle: function(str) {
        this.titleEl.dom.innerHTML = str;    
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
 
 