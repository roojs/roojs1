//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Roo');

Roo.docs = new Roo.XComponent({

 _strings : {
  '098f6bcd4621d373cade4e832627b4f6' :"test",
  'ae635f08107a69569e636835f24e6f6f' :"extends",
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
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            },
            {
             xtype : 'Element',
             html : _this._strings['ae635f08107a69569e636835f24e6f6f'] /* extends */,
             tag : 'span',
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            }
           ]
          },
          {
           xtype : 'Element',
           html : _this._strings['098f6bcd4621d373cade4e832627b4f6'] /* test */,
           tag : 'div',
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
  };  }
});
