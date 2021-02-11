//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.FileView= function() {}
Roo.apply(Pman.Dialog.FileView.prototype, {

 _strings : {
  'd7778d0c64b6ba21494c97f77a66885a' :"Filter",
  '689202409e48743b914713f96d93947c' :"Value",
  '5b31f5026bb07829f7a815555dbf91ae' :"File Preview XXX.pdf"
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
    title : _this._strings['5b31f5026bb07829f7a815555dbf91ae'] /* File Preview XXX.pdf */,
    listeners : {
     show : function (_self)
      {
          _this.dialog.items[0].getRegion('center').showPanel(0);
      }
    },
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    items  : [
     {
      xtype : 'Border',
      xns : Roo.bootstrap.layout,
      '|xns' : 'Roo.bootstrap.layout',
      center : {
       xtype : 'Region',
       xns : Roo.bootstrap.layout,
       '|xns' : 'Roo.bootstrap.layout'
      },
      west : {
       xtype : 'Region',
       split : true,
       width : 250,
       xns : Roo.bootstrap.layout,
       '|xns' : 'Roo.bootstrap.layout'
      },
      items  : [
       {
        xtype : 'Grid',
        fitContainer : true,
        fitToFrame : true,
        region : 'west',
        listeners : {
         activate : function (_self)
          {
            
          }
        },
        xns : Roo.bootstrap.panel,
        '|xns' : 'Roo.bootstrap.panel',
        grid : {
         xtype : 'Table',
         rowSelection : true,
         striped : true,
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
              [ 'Project:', '' ],
              [ 'ER No.:', '' ],
              [ 'School Code:', '' ],
              [ 'District:', '' ] 
          ],
          fields : [ 'filter' , 'value' ],
          isLocal : true,
          xns : Roo.data,
          '|xns' : 'Roo.data'
         },
         sm : {
          xtype : 'RowSelectionModel',
          singleSelect : true,
          listeners : {
           selectionchange : function (_self)
            {
                _this.addBtn.hide();
                _this.removeBtn.hide();
            
                var s = this.getSelected();
                if (!s) { return; }
            
                _this.preview.setUrl( baseURL + '/Preview/' + s.data.id + '.html'); 
                
                if (s.data.is_approved) { 
                    _this.removeBtn.show();
                } else {
                    _this.addBtn.show();
                }
                
            }
          },
          xns : Roo.bootstrap.Table,
          '|xns' : 'Roo.bootstrap.Table'
         },
         cm : [
          {
           xtype : 'ColumnModel',
           dataIndex : 'fname',
           header : _this._strings['d7778d0c64b6ba21494c97f77a66885a'] /* Filter */,
           sm : 6,
           xns : Roo.grid,
           '|xns' : 'Roo.grid'
          },
          {
           xtype : 'ColumnModel',
           dataIndex : 'is_approved',
           header : _this._strings['689202409e48743b914713f96d93947c'] /* Value */,
           renderer : function(v,x,r) {
               
               return v;
           },
           sm : 6,
           xns : Roo.grid,
           '|xns' : 'Roo.grid'
          }
         ]
        }
       },
       {
        xtype : 'Content',
        region : 'center',
        xns : Roo.bootstrap.panel,
        '|xns' : 'Roo.bootstrap.panel'
       }
      ]
     }
    ]
   }  );
 }
});
Roo.apply(Pman.Dialog.FileView, Pman.Dialog.FileView.prototype);
