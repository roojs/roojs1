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
  this.dialog.show.apply(this.dialog,  Array.prototype.slice.call(arguments).slice(2));
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
    modal : false,
    placement : 'right',
    style : 'width:500px',
    listeners : {
     show : function (_self)
      {
          _this.grid.ds.load({});
           this.updatePosition.defer(100,this);
      }
    },
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    items  : [
     {
      xtype : 'Table',
      cls : 'm-0';
      listeners : {
       render : function (_self)
        {
            _this.grid = this;
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap',
      store : {
       xtype : 'SimpleStore',
       data : [
           [ 'NG1234:', 'Wanchai' ],
           [ 'NG1234:', 'Central' ],
           [ 'NG1234:', 'North Point' ],
           [ 'NG1234:', 'Causeway Bay' ],
           [ 'NG1234:', 'Eastern' ]
       ],
       fields : [ 'code' , 'name' ],
       isLocal : true,
       listeners : {
        load : function (_self, records, options)
         {
          
         }
       },
       xns : Roo.data,
       '|xns' : 'Roo.data'
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
        pilltype : false,
        type : 'pills',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'NavItem',
          button_outline : true,
          button_weight : 'primary',
          fa : 'download',
          html : _this._strings['5a105e8b9d40e1329780d62ea2265d8a'] /* test1 */,
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap'
         },
         {
          xtype : 'NavItem',
          fa : 'times',
          linkcls : 'pr-0',
          listeners : {
           click : function (e)
            {
                _this.dialog.hide();
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
Roo.apply(Pman.Popover.FileTest, Pman.Popover.FileTest.prototype);
