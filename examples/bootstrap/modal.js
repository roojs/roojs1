/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



Roo.example = Roo.example || {};

Roo.example.modal= function() {}
Roo.apply(Roo.example.modal, {
 dialog : false,
 callback:  false,

 show : function(data, cb)
 {
  if (!this.dialog) {
   this.create();
  }

  this.callback = cb;
  this.data = data;
  this.dialog.show(this.data._el);
  if (this.form) {
   this.form.reset();
   this.form.setValues(data);
   this.form.fireEvent('actioncomplete', this.form,  { type: 'setdata', data: data });
  }

 },

 create : function()
 {
     
        var _this = this;
            
        this.dialog = Roo.factory({
            xtype: 'Modal',
            xns: Roo.bootstrap,
            title : "Login",
            buttons : Roo.bootstrap.Modal.OKCANCEL,
            listeners : {
                btnclick : function (name, e) {
                    if(name == 'cancel'){
                        _this.loginModal.hide();
                    }
                    
                    Roo.log(name);
                },
                render : function (_self) {
                    _this.loginModal = _self;
                }
            },
            items : [
                
                {
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    well : 'md',
                    style : 'margin-top:20px',
                    items : [
                        {
                            xtype: 'Form',
                            xns: Roo.bootstrap,
                            listeners : {
                                actioncomplete : function (_self, action) {
                                    if (action.type =='submit') {
                                        _this.loginModal.hide();
                                    }
                                }
                            },
                            items : [
                                {
                                    xtype: 'Input',
                                    xns: Roo.bootstrap,
                                    fieldLabel : 'Email',
                                    inputType : 'email',
                                    vtype : 'email'
                                },
                                {
                                    xtype: 'Input',
                                    xns: Roo.bootstrap,
                                    fieldLabel : 'Password',
                                    inputType : 'password'
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    }
});