//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Popover');

Pman.Popover.FileTest= function() {}
Roo.apply(Pman.Popover.FileTest.prototype, {

 _strings : {
  '897356954c2cd3d41b221e3f24f99bba' :"Key",
  '689202409e48743b914713f96d93947c' :"Value",
  '53290b1ff9190e3b40183b207b1fe818' :"File Details"
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
    over : 'bootstrap-body',
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    items  : [
     {
      xtype : 'Card',
      header : _this._strings['53290b1ff9190e3b40183b207b1fe818'] /* File Details */,
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
       }
      ]
     }
    ]
   }  );
 }
});
Roo.apply(Pman.Popover.FileTest, Pman.Popover.FileTest.prototype);
