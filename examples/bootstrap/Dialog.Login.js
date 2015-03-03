//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Dialog');

Dialog.Login = {

 _strings : {
  'dc647eb65e6711e155375218212b3964' :"Password",
  '01a569ddc6cf67ddec2a683f0a5f5956' :"Forgot your password?",
  'd837cc5a72556c5e2abf4b9fe10ddef8' :"Login ",
  '5047040b025ce0295b58d42250014417' :"<div id=\"login-err\" class=\"dialog-err\" style=\"color:red\"></div>",
  '643a860f992333b8600ea264aca7c4fc' :"Email Address"
 },

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
    '|xns' : 'Roo.bootstrap',
    title : _this._strings['d837cc5a72556c5e2abf4b9fe10ddef8]',
    xtype : 'Modal',
    buttonPosition : 'center',
    buttons : Roo.bootstrap.Modal.OKCANCEL,
    xns : Roo.bootstrap,
    listeners : {
     btnclick : function (e)
      {
          if(e == 'cancel'){
              _this.dialog.hide();
              return;
          }
          
          _this.form.doAction('submit');
      },
     render : function (_self) {
      
          Roo.get('login-err').dom.innerHTML = "";
          
      },
     show : function (_self)
      {
          Roo.get('login-err').dom.innerHTML = "";
      }
    },
    items : [
     {
      '|xns' : 'Roo.bootstrap',
      xtype : 'Row',
      xns : Roo.bootstrap,
      style : 'margin-top:20px;',
      items : [
       {
        '|xns' : 'Roo.bootstrap',
        xtype : 'Container',
        cls : 'col-md-12',
        xns : Roo.bootstrap,
        items : [
         {
          '|xns' : 'Roo.bootstrap',
          url : baseURL + '/Login',
          labelAlign : 'left',
          xtype : 'Form',
          method : 'POST',
          xns : Roo.bootstrap,
          listeners : {
           actionfailed : function (_self, action) {
                Roo.log('action failed?!');
                Roo.log(action);
                
                if (typeof(action) != 'undefined' && action.failureType == 'server') {    
            
                    Roo.get('login-err').dom.innerHTML = action.result.errorMsg;
                    return;
                }
                
                Roo.get('login-err').dom.innerHTML = "Fill in all the required fields";
            },
           actioncomplete : function (_self, action) {
                
                if (action.type =='submit') {
                    Roo.log(action);
                    _this.dialog.hide();
                
                    if (_this.callback) {
                        _this.callback.call(_this, action.result);
                     }
                     
                     _this.form.reset();
                     
                     return;
                }
            },
           render : function (_self) {
                _this.form = _self;
            }
          },
          items : [
           {
            '|xns' : 'Roo.bootstrap',
            xtype : 'Container',
            cls : 'col-sm-12',
            xns : Roo.bootstrap,
            items : [
             {
              '|xns' : 'Roo.bootstrap',
              inputType : 'email',
              xtype : 'Input',
              vtype : 'email',
              placeholder : _this._strings['643a860f992333b8600ea264aca7c4fc]',
              allowBlank : false,
              xns : Roo.bootstrap,
              name : 'email',
              listeners : {
               specialkey : function (_self, e)
                {
                    if(e.getKey() == 13){
                        _this.form.doAction('submit');
                    }
                    
                }
              }
             },
             {
              '|xns' : 'Roo.bootstrap',
              inputType : 'password',
              xtype : 'Input',
              placeholder : _this._strings['dc647eb65e6711e155375218212b3964]',
              allowBlank : false,
              xns : Roo.bootstrap,
              name : 'password',
              listeners : {
               specialkey : function (_self, e)
                {
                    if(e.getKey() == 13){
                        _this.form.doAction('submit');
                    }
                }
              }
             }
            ]

           }
          ]

         }
        ]

       }
      ]

     },
     {
      '|xns' : 'Roo.bootstrap',
      xtype : 'Row',
      xns : Roo.bootstrap,
      style : 'margin-top:20px;',
      items : [
       {
        '|xns' : 'Roo.bootstrap',
        xtype : 'Container',
        cls : 'col-md-12',
        xns : Roo.bootstrap,
        items : [
         {
          '|xns' : 'Roo.bootstrap',
          tag : 'a',
          xtype : 'Button',
          html : _this._strings['01a569ddc6cf67ddec2a683f0a5f5956]',
          removeClass : true,
          xns : Roo.bootstrap,
          weight : 'link',
          href : '#',
          listeners : {
           click : function () {
                _this.dialog.hide();
                
                Hydra.Dialog.ForgotPassword.show({}, function(){
                    Roo.bootstrap.MessageBox.alert('Notice', 'The password has been sent to your email');
                });
            }
          }
         }
        ]

       }
      ]

     },
     {
      '|xns' : 'Roo.bootstrap',
      xtype : 'Row',
      xns : Roo.bootstrap,
      items : [
       {
        '|xns' : 'Roo.bootstrap',
        xtype : 'Container',
        cls : 'col-md-12',
        xns : Roo.bootstrap,
        items : [
         {
          '|xns' : 'Roo.bootstrap',
          xtype : 'Container',
          style : 'margin-top:20px;',
          cls : 'bg-danger',
          html : _this._strings['5047040b025ce0295b58d42250014417]',
          xns : Roo.bootstrap
         }
        ]

       }
      ]

     }
    ]

   }  );
 }
};
