//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Roo');

Roo.docs = new Roo.XComponent({

 _strings : {
  '3e6ec55e2dff4342e3f25b0b0b988de9' :"Inheritance tree",
  'ae635f08107a69569e636835f24e6f6f' :" extends ",
  '87f9f735a1d36793ceaecd4e47124b63' :"Events",
  'd41d8cd98f00b204e9800998ecf8427e' :"",
  '232cedface5acac121a6e099364a2b07' :"source: ",
  '9c5a24f0cbb12d939e4622b93bea904b' :"Public Methods",
  '36cd38f49b9afa08222c0dc9ebfe35eb' :"source",
  '50f33d14f129e4548c1c270fd6725a78' :"Configuration options",
  'e64b94523532dbac62df6795a5153f04' :"doc-desc",
  'd2b697ad8e989a6c4592987f22f5bbfc' :"doc-comments",
  'f361257612a512f9be2fdc2abfb25aef' :"<small>Defined by</small>",
  '494a64a432ff6a121e4ab9003c7a0df3' :"parentcls",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  '9bd81329febf6efe22788e03ddeaf0af' :" Class ",
  'f561aaf6ef0bf14d4208bb46a4ccb3ad' :"xxx"
 },

  part     :  ["docs2", "docs" ],
  order    : '001-Roo.docs',
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
   xtype : 'Body',
   cls : 'doc-body',
   listeners : {
    render : function (_self)
     {
           
        
         
     }
   },
   xns : Roo.bootstrap,
   '|xns' : 'Roo.bootstrap',
   items  : [
    {
     xtype : 'NavSidebar',
     cls : 'left-menu-sidebar',
     listeners : {
      render : function (_self)
       {
         //  this.el.addClass(language);
           
       }
     },
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap',
     items  : [
      {
       xtype : 'NavGroup',
       activeLookup : function() 
       { 
           return;
           
           var pathname = window.location.pathname.substring(baseURL.length);
           
           if(!pathname.length){
               return;
           }
           
           if(pathname.match(/^\/Projects/)){
               pathname = '/Projects';
           }
           
           var lookupPath = function(item)
           {
               if(typeof(item.href) == 'undefined' || !item.href.length || item.href == '#'){
                   return true;
               }
               
               item.el.removeClass('active');
               
               var href = item.href.substring(baseURL.length);
               
               if(href != pathname){
                   return true;
               }
               
               item.el.addClass('active');
               return false;
                   
           };
           
           var seted = false;
           
           Roo.each(_this.navGroup.items, function(i){
               
               var s = lookupPath(i);
               
               if(!s){
                   return false;
               }
               
               if(typeof(i.menu) == 'undefined' || !i.menu.items.length){
                   return;
               }
               
               Roo.each(i.menu.items, function(ii){
                   
                   var ss = lookupPath(ii);
                   
                   if(!ss){
                       seted = true;
                       return false;
                   }
                   
               });
               
               if(seted){
                   return false;
               }
               
           });
       },
       autoExpand : function() 
       { 
           return;
           
           _this.menu_expand = false;
           
           var lookupMenu = function(menu, index){
               
               if(menu.target == pagedata.page.target){
                   _this.menu_expand = index + 1;
                   return;
               }
               
               if(!menu.children.length){
                   return;
               }
               
               Roo.each(menu.children, function(c){
                   lookupMenu(c, index);
               });
               
           }
           
           Roo.each(pagemenus, function(v, k){
               
               lookupMenu(v, k);
               
           });
           
           if(_this.menu_expand === false){
               return;
           }
           
           if(typeof(_this.navGroup.items[_this.menu_expand].menu) == 'undefined'){
               return;
           }
           
           _this.navGroup.items[_this.menu_expand].menu.show(_this.navGroup.items[_this.menu_expand].el, false, false);
           
       },
       listeners : {
        childrenrendered : function (_self)
         {
             _this.navGroup.autoExpand();
             
             _this.navGroup.activeLookup();
         },
        render : function (_self)
         {
             _this.navGroup = this;
             
         }
       },
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap',
       items  : [
        {
         xtype : 'NavItem',
         active : false,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Link',
           cls : 'logo',
           href : baseURL +'/',
           preventDefault : false,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
          }
         ]
        }
       ]
      },
      {
       xtype : 'Container',
       cls : 'left-menu-sidebar-options',
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap',
       items  : [
        {
         xtype : 'Row',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap'
        }
       ]
      }
     ]
    },
    {
     xtype : 'NavHeaderbar',
     autohide : true,
     brand : ' ',
     brand_href : baseURL + '/',
     cls : 'mobile-header-menu',
     inverse : false,
     position : 'fixed-top',
     style : '',
     listeners : {
      beforetoggle : function (_self)
       {
           _this.navGroup.autoExpand(); 
           
           _this.navGroup.activeLookup();
           
           _this.navHeaderBar.mask.show();
           
           if(this.el.select('.navbar-collapse',true).first().hasClass('in')){
               _this.navHeaderBar.mask.hide();
               return;
           }
       },
      render : function (_self)
       {
           return;
           
           _this.navHeaderBar = this;
           
           this.el.addClass(language); 
           
           var body = Roo.select('body', true).first();
           
           var mark = {
               tag: "div",
               cls:"x-dlg-mask"
           };
           
           this.mask = Roo.DomHelper.append(body, mark, true);
           
           var size = body.getSize();
           this.mask.setSize(size.width, size.height);
           
           this.mask.setStyle('z-index', '1029');
           
           this.mask.enableDisplayMode("block");
           this.mask.hide();
           
           this.mask.on('click', function(){
               
               this.el.select('.navbar-collapse',true).removeClass('in'); 
               this.mask.hide();
               
           }, this);
           
           
           var maxHeight = Roo.lib.Dom.getViewHeight() - this.el.select('.navbar-header', true).first().getHeight();
           
           this.el.select('.navbar-collapse', true).first().setStyle('max-height', maxHeight);
           
       }
     },
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap'
    },
    {
     xtype : 'Container',
     cls : 'general-content-body',
     listeners : {
      render : function (_self)
       {
           _this.doc_body_content = this;
       }
     },
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap',
     items  : [
      {
       xtype : 'Row',
       style : 'margin: 0px;',
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap',
       items  : [
        {
         xtype : 'Column',
         md : 9,
         style : 'padding-left: 0px;',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Container',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'Header',
             html : _this._strings['9bd81329febf6efe22788e03ddeaf0af'] /*  Class  */,
             level : 2,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Element',
               cls : 'doc-classname',
               html : _this._strings['f561aaf6ef0bf14d4208bb46a4ccb3ad'] /* xxx */,
               tag : 'span',
               listeners : {
                render : function (_self)
                 {
                     _this.doc_name = this
                 }
               },
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              },
              {
               xtype : 'Element',
               cls : 'doc-extends-str',
               html : _this._strings['ae635f08107a69569e636835f24e6f6f'] /*  extends  */,
               tag : 'small',
               listeners : {
                render : function (_self)
                 {
                     _this.doc_extends_sep = this;
                 }
               },
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Link',
                 cls : 'doc-extends',
                 html : _this._strings['494a64a432ff6a121e4ab9003c7a0df3'] /* parentcls */,
                 preventDefault : false,
                 listeners : {
                  click : function (e)
                   {
                   
                       if (this.el.dom.innerHTML.length) {
                           Roo.docs.init.loadDoc({ name : this.el.dom.innerHTML, is_class : true});
                       }
                   },
                  render : function (_self)
                   {
                       _this.doc_extends = this;
                   }
                 },
                 xns : Roo.bootstrap,
                 '|xns' : 'Roo.bootstrap'
                }
               ]
              }
             ]
            },
            {
             xtype : 'Header',
             html : _this._strings['232cedface5acac121a6e099364a2b07'] /* source:  */,
             level : 5,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Link',
               cls : 'doc-source',
               href : '#',
               html : _this._strings['36cd38f49b9afa08222c0dc9ebfe35eb'] /* source */,
               preventDefault : true,
               listeners : {
                click : function (e)
                 {
                     
                     Roo.log(["click", this]);
                     if (this.el.dom.innerHTML.length > 0) {
                         Roo.docs.loadSource();
                     }
                 },
                render : function (_self)
                 {
                     _this.doc_source = this;
                 }
               },
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              }
             ]
            }
           ]
          },
          {
           xtype : 'Container',
           cls : 'doc-desc',
           html : _this._strings['e64b94523532dbac62df6795a5153f04'] /* doc-desc */,
           listeners : {
            render : function (_self)
             {
                 _this.doc_desc = this;
             }
           },
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
          },
          {
           xtype : 'Container',
           cls : 'doc-comments',
           hidden : true,
           html : _this._strings['d2b697ad8e989a6c4592987f22f5bbfc'] /* doc-comments */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
          }
         ]
        },
        {
         xtype : 'Column',
         md : 3,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Container',
           header : _this._strings['3e6ec55e2dff4342e3f25b0b0b988de9'] /* Inheritance tree */,
           panel : 'info',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
          }
         ]
        }
       ]
      },
      {
       xtype : 'Container',
       expandable : true,
       expanded : false,
       header : _this._strings['50f33d14f129e4548c1c270fd6725a78'] /* Configuration options */,
       panel : 'info',
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap',
       items  : [
        {
         xtype : 'Table',
         striped : true,
         listeners : {
          render : function (_self)
           {
               _this.configTable = this;
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
           xns : Roo.data,
           '|xns' : 'Roo.data'
          },
          reader : {
           xtype : 'ArrayReader',
           fields : [ 'name', 'type', 'desc', 'memberOf' ],
           xns : Roo.data,
           '|xns' : 'Roo.data'
          }
         },
         cm : [
          {
           xtype : 'ColumnModel',
           dataIndex : 'name',
           header : _this._strings['d41d8cd98f00b204e9800998ecf8427e'] /*  */,
           md : 11,
           renderer : function(v,x,r) { 
           
           
           		return 	'<div class="fixedFont">' +
           				'<b class="itemname">' + r.json.name + '</b>' +
           				     (r.json.type.length ? (' : <a href="#' + r.json.type+'-constructor">' + r.json.type + '</a>') : '') +
            				     (r.json.values.length ? ' : ( ' +  r.json.values.join(", ") + ' )' : '') +
           			    '</div>' +
           		  
           			/*'<div class="mdesc">' +
           			    '<div class="short">' + (r.json.desc.split("\n")[0]) + '</div>' +
           			'</div>'+ */
           			
           			'<div class="mdesc"><div class="long">' + r.json.desc.split("\n").join('<br/>') + '</div></div>';
           			
           },
           xns : Roo.grid,
           '|xns' : 'Roo.grid'
          },
          {
           xtype : 'ColumnModel',
           dataIndex : 'memberOf',
           header : _this._strings['f361257612a512f9be2fdc2abfb25aef'] /* <small>Defined by</small> */,
           md : 1,
           renderer : function(v,x,r) { 
           
           
           		return 	'<small><a href="#' + r.json.memberOf + '">' + r.json.memberOf + '</a></small>';
           			
           },
           xns : Roo.grid,
           '|xns' : 'Roo.grid'
          }
         ]
        }
       ]
      },
      {
       xtype : 'Container',
       expandable : true,
       expanded : false,
       header : _this._strings['9c5a24f0cbb12d939e4622b93bea904b'] /* Public Methods */,
       panel : 'info',
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap',
       items  : [
        {
         xtype : 'Table',
         listeners : {
          render : function (_self)
           {
               _this.methodsTable = this;
           }
         },
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         store : {
          xtype : 'Store',
          sortInfo : { field : 'name', direction : 'ASC' },
          xns : Roo.data,
          '|xns' : 'Roo.data',
          proxy : {
           xtype : 'MemoryProxy',
           xns : Roo.data,
           '|xns' : 'Roo.data'
          },
          reader : {
           xtype : 'ArrayReader',
           fields : [ 'name', 'type', 'desc', 'memberOf' ],
           xns : Roo.data,
           '|xns' : 'Roo.data'
          }
         },
         cm : [
          {
           xtype : 'ColumnModel',
           dataIndex : 'name',
           header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
           md : 11,
           renderer : function(v,x,r) { 
           
           
           		return 	'<div class="fixedFont">' +
           				'<b class="itemname">' + r.json.name + '</b>' +
           			 	     (r.json.returns.length ? (' : <a href="#' + r.json.returns+'-constructor">' + r.json.returns + '</a>') : '') +
            				//     (r.json.values.length ? ' : ( ' +  r.json.values.join(", ") + ' )' : '') +
           			    '</div>' +
           		  
           			/*'<div class="mdesc">' +
           			    '<div class="short">' + (r.json.desc.split("\n")[0]) + '</div>' +
           			'</div>'+ */
           			
           			'<div class="mdesc"><div class="long">' + r.json.desc.split("\n").join('<br/>') + '</div></div>';
           			
           },
           sortable : true,
           xns : Roo.grid,
           '|xns' : 'Roo.grid'
          },
          {
           xtype : 'ColumnModel',
           dataIndex : 'memberOf',
           header : _this._strings['f361257612a512f9be2fdc2abfb25aef'] /* <small>Defined by</small> */,
           md : 1,
           renderer : function(v,x,r) { 
           
           
           		return 	'<small><a href="#' + r.json.memberOf + '">' + r.json.memberOf + '</a></small>';
           			
           },
           xns : Roo.grid,
           '|xns' : 'Roo.grid'
          }
         ]
        }
       ]
      },
      {
       xtype : 'Container',
       expandable : true,
       expanded : false,
       header : _this._strings['87f9f735a1d36793ceaecd4e47124b63'] /* Events */,
       panel : 'info',
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap',
       items  : [
        {
         xtype : 'Table',
         listeners : {
          render : function (_self)
           {
               _this.eventsTable = this;
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
           xns : Roo.data,
           '|xns' : 'Roo.data'
          },
          reader : {
           xtype : 'ArrayReader',
           fields : [ 'name', 'type', 'desc', 'memberOf' ],
           xns : Roo.data,
           '|xns' : 'Roo.data'
          }
         },
         cm : [
          {
           xtype : 'ColumnModel',
           dataIndex : 'name',
           header : _this._strings['d41d8cd98f00b204e9800998ecf8427e'] /*  */,
           md : 11,
           renderer : function(v,x,r) { 
           
           
           		return 	'<div class="fixedFont">' +
           				'<b class="itemname">' + r.json.name + '</b>' +
           				     (r.json.returns.length ? (' : <a href="#' + r.returns.type+'-constructor">' + r.json.returns + '</a>') : '') +
            				    // (r.json.values.length ? ' : ( ' +  r.json.values.join(", ") + ' )' : '') +
           			    '</div>' +
           		  
           			/*'<div class="mdesc">' +
           			    '<div class="short">' + (r.json.desc.split("\n")[0]) + '</div>' +
           			'</div>'+ */
           			
           			'<div class="mdesc"><div class="long">' + r.json.desc.split("\n").join('<br/>') + '</div></div>';
           			
           },
           xns : Roo.grid,
           '|xns' : 'Roo.grid'
          },
          {
           xtype : 'ColumnModel',
           dataIndex : 'memberOf',
           header : _this._strings['f361257612a512f9be2fdc2abfb25aef'] /* <small>Defined by</small> */,
           md : 1,
           renderer : function(v,x,r) { 
           
           
           		return 	'<small><a href="#' + r.json.memberOf + '">' + r.json.memberOf + '</a></small>';
           			
           },
           xns : Roo.grid,
           '|xns' : 'Roo.grid'
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  };  }
});
