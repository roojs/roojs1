//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

ArrayGrid = new Roo.XComponent({

 _strings : {
  '1c76cbfe21c6f44c1d1e59d54f3e4420' :"Company"
 },

  part     :  ["grid", "ArrayGrid" ],
  order    : '001-ArrayGrid',
  region   : 'center',
  parent   : false,
  name     : "unnamed module",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'GridPanel',
   xns : Roo,
   '|xns' : 'Roo',
   grid : {
    xtype : 'Grid',
    xns : Roo.grid,
    '|xns' : 'Roo.grid',
    ds : {
     xtype : 'Store',
     xns : Roo.data,
     '|xns' : 'Roo.data',
     proxy : {
      xtype : 'MemoryProxy',
      data : [],
      xns : Roo.data,
      '|xns' : 'Roo.data'
     },
     reader : {
      xtype : 'ArrayReader',
      fields : [
                             {name: 'company'},
                             {name: 'price', type: 'float'},MemoryProxy
                             {name: 'change', type: 'float'},
                             {name: 'pctChange', type: 'float'},
                             {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'}
                        ],
      xns : Roo.data,
      '|xns' : 'Roo.data'
     }
    },
    cm : [
     {
      xtype : 'ColumnModel',
      dataIndex : 'company',
      header : _this._strings['1c76cbfe21c6f44c1d1e59d54f3e4420'] /* Company */,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     }
    ]
   }
  };  }
});
