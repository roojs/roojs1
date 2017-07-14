//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Grid = new Roo.XComponent({

 _strings : {
  'ce8ae9da5b7cd6c3df2929543a9af92d' :"Email",
  'b4f18f5b05307bd1e3cc00e0802d641b' :"investor",
  'bcc254b55c4a1babdf1dcb82c207506b' :"Phone",
  'd76c3244d1460406c2a67421c64ed44a' :"Incomplete Items",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  'f561aaf6ef0bf14d4208bb46a4ccb3ad' :"xxx"
 },

  part     :  ["bootstrap", "Grid" ],
  order    : '001-Grid',
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
   xtype : 'Grid',
   autoScroll : true,
   closable : false,
   fitToFrame : true,
   region : 'center',
   title : _this._strings['b4f18f5b05307bd1e3cc00e0802d641b'] /* investor */,
   xns : Roo.bootstrap.panel,
   '|xns' : 'Roo.bootstrap.panel',
   toolbar : {
    xtype : 'NavSimplebar',
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    items  : [
     {
      xtype : 'NavGroup',
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap',
      items  : [
       {
        xtype : 'NavItem',
        html : _this._strings['f561aaf6ef0bf14d4208bb46a4ccb3ad'] /* xxx */,
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap'
       }
      ]
     }
    ]
   },
   grid : {
    xtype : 'Table',
    cls : 'table-fixed',
    loadMask : true,
    striped : true,
    listeners : {
     render : function (_self)
      {
         this.ds.load({});
      }
    },
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    store : {
     xtype : 'Store',
     xns : Roo.data,
     '|xns' : 'Roo.data',
     proxy : {
      xtype : 'MemoryProxy',
      data : [
          ['Fred Blogs', 'fred@fred.com', '+852 123 123 12', 'Contact, KYC/AM, Banking, Documents, Declarations, Signed Forms']
      ],
      xns : Roo.data,
      '|xns' : 'Roo.data'
     },
     reader : {
      xtype : 'ArrayReader',
      fields : [
          {name: 'name', type : 'string'},
          {name: 'email', type : 'string'},
          {name: 'phone', type : 'string'},
          {name: 'incompleteItems', type : 'string'}
      ],
      xns : Roo.data,
      '|xns' : 'Roo.data'
     }
    },
    cm : [
     {
      xtype : 'ColumnModel',
      dataIndex : 'name',
      header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
      locked : false,
      sortable : false,
      width : 150,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'email',
      header : _this._strings['ce8ae9da5b7cd6c3df2929543a9af92d'] /* Email */,
      sortable : false,
      width : 150,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'phone',
      header : _this._strings['bcc254b55c4a1babdf1dcb82c207506b'] /* Phone */,
      sortable : false,
      width : 150,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'incompleteItems',
      header : _this._strings['d76c3244d1460406c2a67421c64ed44a'] /* Incomplete Items */,
      sortable : false,
      width : 800,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     }
    ]
   }
  };  }
});
