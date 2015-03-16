//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

contact = new Roo.XComponent({

 _strings : {
  'ce8ae9da5b7cd6c3df2929543a9af92d' :"Email",
  '02d4482d332e1aef3437cd61c9bcc624' :"Contact us",
  '14a7ee7b1e7af70fc73fe7c499323fc1' :"2002 Holcombe Boulevard, Houston, TX 77030, USA\n\t\t\t\t\t",
  'bcc254b55c4a1babdf1dcb82c207506b' :"Phone",
  '88512a88100c22e54a61aaec8ed842ba' :"Type your message here...",
  '7d221f9a8ebbfb877cadd779623b7bc8' :"<input class=\"btn btn-action\" type=\"submit\" value=\"Send message\">",
  'd06f99a47cb961884ded656082615dd2' :"<a href=\"index.html\">Home</a>",
  '69847143f57cba5d08123f1df77e1b44' :"Left Sidebar",
  'ee921a36c743182915ce71f8c27a2c0b' :"(713) 791-1414\n\t\t\t\t\t",
  '24b1f9fa141848f82277f1446bbea0fe' :"We’d love to hear from you. Interested in working together? Fill out the form below with some info about your project and I will get back to you as soon as I can. Please allow a couple days for me to respond.\n\t\t\t\t",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  'a4c18b2713705a4395abdcdee3949d8d' :"<input type=\"checkbox\"> \nSign up for newsletter\n",
  'dd7bf230fde8d4836917806aff6a6b27' :"Address",
  '673ae02fffb72f0fe68a66f096a01347' :"Phone:"
 },

  part     :  ["bootstrap", "contact" ],
  order    : '001-contact',
  region   : 'center',
  parent   : false,
  name     : "unnamed module",
  disabled : false, 
  permname : '', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   '|xns' : 'Roo.bootstrap',
   xns : Roo.bootstrap,
   xtype : 'Body',
   items : [
    {
     '|xns' : 'Roo.bootstrap',
     xns : Roo.bootstrap,
     xtype : 'Container',
     items : [
      {
       '|xns' : 'Roo.bootstrap',
       cls : 'breadcrumb',
       tag : 'ol',
       xns : Roo.bootstrap,
       xtype : 'Container',
       items : [
        {
         '|xns' : 'Roo.bootstrap',
         html : _this._strings['d06f99a47cb961884ded656082615dd2'],
         tag : 'li',
         xns : Roo.bootstrap,
         xtype : 'Element'
        },
        {
         '|xns' : 'Roo.bootstrap',
         cls : 'active',
         html : _this._strings['69847143f57cba5d08123f1df77e1b44'],
         tag : 'li',
         xns : Roo.bootstrap,
         xtype : 'Element'
        },
        {
         '|xns' : 'Roo.bootstrap',
         xns : Roo.bootstrap,
         xtype : 'Row',
         items : [
          {
           '|xns' : 'Roo.bootstrap',
           cls : 'col-sm-9 maincontent',
           xns : Roo.bootstrap,
           xtype : 'Container',
           items : [
            {
             '|xns' : 'Roo.bootstrap',
             cls : 'page-header',
             tag : 'header',
             xns : Roo.bootstrap,
             xtype : 'Element',
             items : [
              {
               '|xns' : 'Roo.bootstrap',
               anchor : 'contact',
               xns : Roo.bootstrap,
               xtype : 'Link'
              },
              {
               '|xns' : 'Roo.bootstrap',
               cls : 'page-title',
               html : _this._strings['02d4482d332e1aef3437cd61c9bcc624'],
               level : 1,
               xns : Roo.bootstrap,
               xtype : 'Header'
              }
             ]

            },
            {
             '|xns' : 'Roo.bootstrap',
             html : _this._strings['24b1f9fa141848f82277f1446bbea0fe'],
             tag : 'p',
             xns : Roo.bootstrap,
             xtype : 'Element'
            },
            {
             '|xns' : 'Roo.bootstrap',
             xns : Roo.bootstrap,
             xtype : 'Form',
             items : [
              {
               '|xns' : 'Roo.bootstrap',
               xns : Roo.bootstrap,
               xtype : 'Row',
               items : [
                {
                 '|xns' : 'Roo.bootstrap',
                 inputType : 'text',
                 placeholder : _this._strings['49ee3087348e8d44e1feda1917443987'],
                 sm : 4,
                 xns : Roo.bootstrap,
                 xtype : 'Input'
                },
                {
                 '|xns' : 'Roo.bootstrap',
                 inputType : 'text',
                 placeholder : _this._strings['ce8ae9da5b7cd6c3df2929543a9af92d'],
                 sm : 4,
                 xns : Roo.bootstrap,
                 xtype : 'Input'
                },
                {
                 '|xns' : 'Roo.bootstrap',
                 inputType : 'text',
                 placeholder : _this._strings['bcc254b55c4a1babdf1dcb82c207506b'],
                 sm : 4,
                 xns : Roo.bootstrap,
                 xtype : 'Input'
                }
               ]

              },
              {
               '|xns' : 'Roo.bootstrap',
               xns : Roo.bootstrap,
               xtype : 'Row',
               items : [
                {
                 '|xns' : 'Roo.bootstrap',
                 placeholder : _this._strings['88512a88100c22e54a61aaec8ed842ba'],
                 rows : 9,
                 sm : 12,
                 xns : Roo.bootstrap,
                 xtype : 'TextArea'
                }
               ]

              },
              {
               '|xns' : 'Roo.bootstrap',
               xns : Roo.bootstrap,
               xtype : 'Row',
               items : [
                {
                 '|xns' : 'Roo.bootstrap',
                 cls : 'col-sm-6',
                 xns : Roo.bootstrap,
                 xtype : 'Container',
                 items : [
                  {
                   '|xns' : 'Roo.bootstrap',
                   cls : 'checkbox',
                   html : _this._strings['a4c18b2713705a4395abdcdee3949d8d'],
                   tag : 'label',
                   xns : Roo.bootstrap,
                   xtype : 'Element'
                  }
                 ]

                },
                {
                 '|xns' : 'Roo.bootstrap',
                 cls : 'col-sm-6 text-right',
                 html : _this._strings['7d221f9a8ebbfb877cadd779623b7bc8'],
                 xns : Roo.bootstrap,
                 xtype : 'Container'
                }
               ]

              }
             ]

            }
           ]

          },
          {
           '|xns' : 'Roo.bootstrap',
           cls : 'col-sm-3 sidebar sidebar-right',
           xns : Roo.bootstrap,
           xtype : 'NavSidebar',
           items : [
            {
             '|xns' : 'Roo.bootstrap',
             cls : 'widget',
             xns : Roo.bootstrap,
             xtype : 'Container',
             items : [
              {
               '|xns' : 'Roo.bootstrap',
               html : _this._strings['dd7bf230fde8d4836917806aff6a6b27'],
               level : 4,
               xns : Roo.bootstrap,
               xtype : 'Header'
              },
              {
               '|xns' : 'Roo.bootstrap',
               html : _this._strings['14a7ee7b1e7af70fc73fe7c499323fc1'],
               tag : 'address',
               xns : Roo.bootstrap,
               xtype : 'Element'
              },
              {
               '|xns' : 'Roo.bootstrap',
               html : _this._strings['673ae02fffb72f0fe68a66f096a01347'],
               level : 4,
               xns : Roo.bootstrap,
               xtype : 'Header'
              },
              {
               '|xns' : 'Roo.bootstrap',
               html : _this._strings['ee921a36c743182915ce71f8c27a2c0b'],
               tag : 'address',
               xns : Roo.bootstrap,
               xtype : 'Element'
              }
             ]

            }
           ]

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
