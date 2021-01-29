//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Popover');

Pman.Popover.FileTest= function() {}
Roo.apply(Pman.Popover.FileTest.prototype, {

 _strings : {
  '897356954c2cd3d41b221e3f24f99bba' :"Key",
  '689202409e48743b914713f96d93947c' :"Value",
  '5a105e8b9d40e1329780d62ea2265d8a' :"test1",
  'd1e2284f2f77494e8ed6bcb990bf6072' :"Brand here"
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
    xtype : 'Popover',
    modal : true,
    placement : 'right',
    style : 'width:500px',
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    items  : [
     {
      xtype : 'Table',
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap',
      store : {
       xtype : 'Store',
       xns : Roo.data,
       '|xns' : 'Roo.data',
       proxy : {
        xtype : 'HttpProxy',
        url : rootURL + '/Roo/Files_keytypes',
        xns : Roo.data,
        '|xns' : 'Roo.data'
       },
       reader : {
        xtype : 'JsonReader',
        xns : Roo.data,
        '|xns' : 'Roo.data'
       }
      },
      cm : [
       {
        xtype : 'ColumnModel',
        header : _this._strings['897356954c2cd3d41b221e3f24f99bba'] /* Key */,
        xns : Roo.grid,
        '|xns' : 'Roo.grid'
       },
       {
        xtype : 'ColumnModel',
        header : _this._strings['689202409e48743b914713f96d93947c'] /* Value */,
        xns : Roo.grid,
        '|xns' : 'Roo.grid'
       }
      ]
     },
     {
      xtype : 'PopoverNav',
      style : 'flex-direction: row;',
      type : 'pills',
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap',
      items  : [
       {
        xtype : 'Element',
        cls : 'navbar-brand',
        html : _this._strings['d1e2284f2f77494e8ed6bcb990bf6072'] /* Brand here */,
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap'
       },
       {
        xtype : 'NavGroup',
        align : 'right',
        cls : '',
        tooltip : '',
        type : 'pills',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'NavItem',
          html : _this._strings['5a105e8b9d40e1329780d62ea2265d8a'] /* test1 */,
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap'
         },
         {
          xtype : 'NavItem',
          button_outline : true,
          button_weight : 'primary',
          fa : 'times',
          html : _this._strings['5a105e8b9d40e1329780d62ea2265d8a'] /* test1 */,
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
Roo.apply(Pman.Popover.FileTest, Pman.Popover.FileTest.prototype);
