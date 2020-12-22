//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('cards');

cards.js = new Roo.XComponent({

 _strings : {
  '9e727fdd3aec8274f46685441900280d' :"Project",
  '6a58f977f2b623b695a340766f2a6843' :"Select Project",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  'cd81f9f55969c822377f076017bb3484' :"Cards",
  '24f27bda5dd2c488aa9bc7700ba98c34' :"Select Projects"
 },
 _named_strings : {
  'project_id_name_emptyText' : '6a58f977f2b623b695a340766f2a6843' /* Select Project */ ,
  'project_id_name_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ ,
  'project_id_name_qtip' : '24f27bda5dd2c488aa9bc7700ba98c34' /* Select Projects */ ,
  'project_id_name_fieldLabel' : '9e727fdd3aec8274f46685441900280d' /* Project */ 
 },

  part     :  ["bootstrap", "js" ],
  order    : '001-cards.js',
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
   xtype : 'Content',
   autoScroll : true,
   cardRow : false,
   fitToFrame : true,
   loadCards : function() {
   
      
       if (this.cardRow == false) {
           this.cardRow = this.addxtype({
               xtype : 'CardRow',
               xns : Pman.Tab.Cards
           });
       }
       this.cardRow.load();
       (function() { 
           _this.content.cardRow.updateHeight(_this.content.el.getHeight()); 
       }).defer(100);
   
   
    },
   region : 'center',
   title : _this._strings['cd81f9f55969c822377f076017bb3484'] /* Cards */,
   listeners : {
    activate : function (_self)
     {
         this.loadCards();
     },
    render : function (_self)
     {
         _this.content  = this;
     },
    resize : function (_self, width, height)
     {
          this.cardRow.updateHeight(height);
     }
   },
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
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'Element',
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'ComboBox',
            allowBlank : false,
            displayField : 'name',
            editable : false,
            emptyText : _this._strings['6a58f977f2b623b695a340766f2a6843'] /* Select Project */,
            fieldLabel : _this._strings['9e727fdd3aec8274f46685441900280d'] /* Project */,
            forceSelection : true,
            hiddenName : 'project_id',
            listWidth : 400,
            loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
            md : 5,
            minChars : 2,
            name : 'project_id_name',
            pageSize : 100,
            qtip : _this._strings['24f27bda5dd2c488aa9bc7700ba98c34'] /* Select Projects */,
            queryParam : 'query[name]',
            selectOnFocus : true,
            tpl : '<a class=\"dropdown-item\" href=\"#\"> {name} </a>',
            triggerAction : 'all',
            typeAhead : true,
            valueField : 'id',
            listeners : {
             render : function (_self)
              {
                  _this.projectSel  = this;
              },
             select : function (combo, record, index)
              {
                  _this.content.loadCards();
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap',
            store : {
             xtype : 'Store',
             remoteSort : true,
             sortInfo : { direction : 'ASC', field: 'name' },
             listeners : {
              beforeload : function (_self, o){
                   o.params = o.params || {};
                   // set more here
               }
             },
             xns : Roo.data,
             '|xns' : 'Roo.data',
             proxy : {
              xtype : 'HttpProxy',
              method : 'GET',
              url : baseURL + '/Roo/core_project',
              xns : Roo.data,
              '|xns' : 'Roo.data'
             },
             reader : {
              xtype : 'JsonReader',
              fields : [{"name":"id","type":"int"},{"name":"name","type":"string"}],
              id : 'id',
              root : 'data',
              totalProperty : 'total',
              xns : Roo.data,
              '|xns' : 'Roo.data'
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
   }
  };  }
});
