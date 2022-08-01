//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

ArrayGrid = new Roo.XComponent({

 _strings : {
  '1c76cbfe21c6f44c1d1e59d54f3e4420' :"Company",
  '30870648ed968ed5a3e00631e4ad0699' :"% Change",
  '3601146c4e948c32b6424d2c0a7f0118' :"Price",
  'f4ec5f57bd4d31b803312d873be40da9' :"Change",
  '4221d3e17c6eca2ca6337251a3cf9c4e' :"Last Updated"
 },

  part     :  ["grid", "ArrayGrid" ],
  order    : '001-ArrayGrid',
  region   : 'center',
  parent   : '#grid-panel',
  name     : "unnamed module",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'Grid',
   xns : Roo.panel,
   '|xns' : 'Roo',
   grid : {
    xtype : 'Grid',
    autoExpandColumn : 'company',
    listeners : {
     render : function (grid)
      {
          _this.grid = this;
      }
    },
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
             {name: 'price', type: 'float'}, 
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
      locked : false,
      sortable : true,
      width : 160,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'price',
      header : _this._strings['3601146c4e948c32b6424d2c0a7f0118'] /* Price */,
      locked : false,
      renderer : Roo.util.Format.usMoney,
      sortable : true,
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'change',
      header : _this._strings['f4ec5f57bd4d31b803312d873be40da9'] /* Change */,
      locked : false,
      renderer : function  (val){
          if(val > 0){
              return '<span style="color:green;">' + val + '</span>';
          }else if(val < 0){
              return '<span style="color:red;">' + val + '</span>';
          }
          return val;
      },
      sortable : true,
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'pctChange',
      header : _this._strings['30870648ed968ed5a3e00631e4ad0699'] /* % Change */,
      locked : false,
      renderer : function  (val){
          if(val > 0){
              return '<span style="color:green;">' + val + '%</span>';
          }else if(val < 0){
              return '<span style="color:red;">' + val + '%</span>';
          }
          return val;
      },
      sortable : true,
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'lastChange',
      header : _this._strings['4221d3e17c6eca2ca6337251a3cf9c4e'] /* Last Updated */,
      locked : false,
      renderer : Roo.util.Format.dateRenderer('m/d/Y'),
      sortable : true,
      width : 85,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     }
    ]
   }
  };  }
});
