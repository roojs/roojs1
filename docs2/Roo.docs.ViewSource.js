//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Roo.docs');

Roo.docs.ViewSource= function() {}
Roo.apply(Roo.docs.ViewSource.prototype, {

 _strings : {
  'd3d2e617335f08df83599665eef8a418' :"Close",
  '89babd10371e21bb9eaf39937de7c656' :"View Source"
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
    xtype : 'Modal',
    fitwindow : true,
    max_width : 900,
    title : _this._strings['89babd10371e21bb9eaf39937de7c656'] /* View Source */,
    listeners : {
     show : function (_self)
      {
        //  if(_this.data.buttonText){
          //    _this.acceptBtn.setText(_this.data.buttonText);
         // }
          
           
         
          
          _this.dialog.el.setStyle('zIndex', '10002');
          
      }
    },
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    buttons : [
     {
      xtype : 'Button',
      html : _this._strings['d3d2e617335f08df83599665eef8a418'] /* Close */,
      weight : 'primary',
      listeners : {
       click : function (_self, e)
        {
            _this.dialog.hide();
         
            
        },
       render : function (_self)
        {
            _this.acceptBtn = this;
            
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     }
    ],
    items  : [
     {
      xtype : 'Container',
      style : 'width: 100%;',
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap',
      items  : [
       {
        xtype : 'Row',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'Column',
          cls : 'document-body-ctn',
          md : 12,
          listeners : {
           render : function (_self)
            {
                _this.body_ctr = this;
            }
          },
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap'
         }
        ]
       }
      ]
     }
    ]
   }  );
 }
});
Roo.apply(Roo.docs.ViewSource, Roo.docs.ViewSource.prototype);
