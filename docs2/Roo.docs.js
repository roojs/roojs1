//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Roo');

Roo.docs = new Roo.XComponent({

 _strings : {
  '54e1d44609e3abed11f6e1eb6ae54988' :"Projects",
  'f66cdb8a3ef49c79c633e1bffcfd1e74' :"Awards",
  '0cbc6611f5540bd0809a388dc95a615b' :"Test",
  '098f6bcd4621d373cade4e832627b4f6' :"test",
  '27c7b8732d1a279720d27cc8c3a26c93' :"Careers",
  '992a0f0542384f1ee5ef51b7cf4ae6c4' :"Services",
  'bbaff12800505b22a853e8b7f4eb6a22' :"Contact",
  '9bd81329febf6efe22788e03ddeaf0af' :"Class",
  '38b0d2ff1c03df82aea67222983d337e' :"test 2"
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
        },
        {
         xtype : 'NavSidebarItem',
         html : _this._strings['0cbc6611f5540bd0809a388dc95a615b'] /* Test */,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         menu : {
          xtype : 'Menu',
          type : 'treeview',
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'MenuItem',
            href : baseURL + '/AboutUs.html',
            html : _this._strings['0cbc6611f5540bd0809a388dc95a615b'] /* Test */,
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           },
           {
            xtype : 'MenuItem',
            html : _this._strings['38b0d2ff1c03df82aea67222983d337e'] /* test 2 */,
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           }
          ]
         }
        },
        {
         xtype : 'NavSidebarItem',
         html : _this._strings['0cbc6611f5540bd0809a388dc95a615b'] /* Test */,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap'
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
       align : 'right',
       autoExpand : function() 
       { 
           return;
           _this.menu_expand = false;
           
           var lookupMenu = function(menu, index){
               
               if(menu.target == pagedata.page.target){
                   _this.menu_expand = index;
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
       type : 'nav',
       listeners : {
        render : function (_self)
         {
           //  _this.navGroup = this;
             
         }
       },
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap',
       items  : [
        {
         xtype : 'NavSidebarItem',
         html : _this._strings['0cbc6611f5540bd0809a388dc95a615b'] /* Test */,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         menu : {
          xtype : 'Menu',
          type : 'treeview',
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'MenuItem',
            href : baseURL + '/AboutUs.html',
            html : _this._strings['0cbc6611f5540bd0809a388dc95a615b'] /* Test */,
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           },
           {
            xtype : 'MenuItem',
            html : _this._strings['38b0d2ff1c03df82aea67222983d337e'] /* test 2 */,
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           }
          ]
         }
        },
        {
         xtype : 'NavSidebarItem',
         href : baseURL + '/Projects.html',
         html : _this._strings['54e1d44609e3abed11f6e1eb6ae54988'] /* Projects */,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap'
        },
        {
         xtype : 'NavSidebarItem',
         html : _this._strings['992a0f0542384f1ee5ef51b7cf4ae6c4'] /* Services */,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap'
        },
        {
         xtype : 'NavSidebarItem',
         html : _this._strings['f66cdb8a3ef49c79c633e1bffcfd1e74'] /* Awards */,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap'
        },
        {
         xtype : 'NavSidebarItem',
         href : baseURL + '/ContactUs.html',
         html : _this._strings['bbaff12800505b22a853e8b7f4eb6a22'] /* Contact */,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap'
        },
        {
         xtype : 'NavSidebarItem',
         html : _this._strings['27c7b8732d1a279720d27cc8c3a26c93'] /* Careers */,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap'
        }
       ]
      }
     ]
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
           cls : 'doc-classname',
           html : _this._strings['9bd81329febf6efe22788e03ddeaf0af'] /* Class */,
           level : 2,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
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
