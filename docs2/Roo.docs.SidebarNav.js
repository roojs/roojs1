//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Roo.docs');

Roo.docs.SidebarNav = new Roo.XComponent({

 _strings : {
  '0cbc6611f5540bd0809a388dc95a615b' :"Test",
  '38b0d2ff1c03df82aea67222983d337e' :"test 2"
 },

  part     :  ["docs2", "SidebarNav" ],
  order    : '001-Roo.docs.SidebarNav',
  region   : 'center',
  parent   : '#disabled',
  name     : "unnamed module",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
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
  };  }
});
