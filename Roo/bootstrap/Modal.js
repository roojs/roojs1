
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
 * @cfg {Array} buttons Array of buttons
 * 
 * @constructor
 * Create a new Modal Dialog
 * @param {Object} config The config object
 */

Roo.bootstrap.Modal = function(config){
    Roo.bootstrap.Modal.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Modal, Roo.bootstrap.Component,  {
    
    title : 'test dialog',
   
    buttons : false,

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
    
        
        
        
        
        this.initEvents();
        //this.el.addClass([this.fieldClass, this.cls]);
        
    },
    getAutoCreate : function(){
        
        
        var bdy = {
                cls : 'modal-body',
                html : this.html | ''
        };
        var bts = [];
        
        
        
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
        
        ];
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
                                bdy,
                                 {
                                    cls : 'modal-footer'
                                    /*
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
                                    */
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
         return this.el.select('.modal-footer',true).first();
        
    },
    initEvents : function()
    {
        this.el.select('.modal-header .close').on('click', this.hide, this);
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
        
        
    },
    hide : function() {
        this.maskEl.hide();
        this.el.removeClass('on');
        this.el.addClass('fade');
        this.el.setStyle('display', 'none');
    }
});


Roo.apply(Roo.bootstrap.Modal  {
    /**
         * Button config that displays a single OK button
         * @type Object
         */
        OK :  [{
            tag: 'button',
            cls : 'btn btn-default',
            html : 'OK'
        }], 
        /**
         * Button config that displays Yes and No buttons
         * @type Object
         */
        YESNO : [
            {
                tag: 'button',
                cls : 'btn btn-default',
                html : 'Yes'
            },
            {
                tag: 'button',
                cls : 'btn',
                html : 'No'
            }
        ],
        
        /**
         * Button config that displays OK and Cancel buttons
         * @type Object
         */
        OKCANCEL : [
            {
                tag: 'button',
                cls : 'btn btn-default',
                html : 'OK'
            },
            {
                tag: 'button',
                cls : 'btn ',
                html : 'Cancel'
            }
        ],
        /**
         * Button config that displays Yes, No and Cancel buttons
         * @type Object
         */
        YESNOCANCEL : [
            {
                tag: 'button',
                cls : 'btn btn-default',
                html : 'Yes'
            },
            {
                tag: 'button',
                cls : 'btn',
                html : 'No'
            },
            {
                tag: 'button',
                cls : 'btn',
                html : 'Cancel'
            }
        ]


 