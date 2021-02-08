//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.FilesAdminScanStart= function() {}
Roo.apply(Pman.Dialog.FilesAdminScanStart.prototype, {

 _strings : {
  '664b13315c97047b2ba2a1ac2375e0ce' :"Start time",
  '3ec365dd533ddb7ef3d1c111186ce872' :"Details",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '88602943970a852a901d21413eb56b77' :"Start Point",
  '6115a2dde66284418135be075fefcf27' :"Edit Start Point of Scan",
  '4d3d769b812b6faa6b76e1a8abaece2d' :"Active",
  'c9cc8cce247e49bae79f15173ce97354' :"Save"
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
    fitwindow : false,
    max_width : 1000,
    size : 'lg',
    title : _this._strings['6115a2dde66284418135be075fefcf27'] /* Edit Start Point of Scan */,
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
      items  : [
       {
        xtype : 'Content',
        autoScroll : true,
        fitContainer : true,
        fitToFrame : true,
        region : 'center',
        title : _this._strings['3ec365dd533ddb7ef3d1c111186ce872'] /* Details */,
        xns : Roo.bootstrap.panel,
        '|xns' : 'Roo.bootstrap.panel',
        items  : [
         {
          xtype : 'Container',
          cls : 'py-5',
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'Form',
            cls : 'px-5',
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap',
            items  : [
             {
              xtype : 'Input',
              fieldLabel : _this._strings['88602943970a852a901d21413eb56b77'] /* Start Point */,
              labelsm : 2,
              sm : 8,
              xns : Roo.bootstrap,
              '|xns' : 'Roo.bootstrap'
             },
             {
              xtype : 'CheckBox',
              boxLabel : _this._strings['4d3d769b812b6faa6b76e1a8abaece2d'] /* Active */,
              labelAlign : 'left',
              labelsm : 2,
              xns : Roo.bootstrap,
              '|xns' : 'Roo.bootstrap'
             },
             {
              xtype : 'TimeField',
              fieldLabel : _this._strings['664b13315c97047b2ba2a1ac2375e0ce'] /* Start time */,
              xns : Roo.bootstrap,
              '|xns' : 'Roo.bootstrap'
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
      xtype : 'Button',
      container_method : 'getButtonContainer',
      html : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
      listeners : {
       click : function (btn, e)
        {
            _this.dialog.hide();
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     },
     {
      xtype : 'Button',
      container_method : 'getButtonContainer',
      html : _this._strings['c9cc8cce247e49bae79f15173ce97354'] /* Save */,
      weight : 'primary',
      listeners : {
       click : function (btn, e)
        {
            Pman.Dialog.FilesAdminDocument.show({});
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     }
    ]
   }  );
 }
});
Roo.apply(Pman.Dialog.FilesAdminScanStart, Pman.Dialog.FilesAdminScanStart.prototype);
