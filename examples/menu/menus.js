/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
Roo.onReady(function(){
    Roo.QuickTips.init();

    // Menus can be prebuilt and passed by reference
    var dateMenu = new Roo.menu.DateMenu({
        handler : function(dp, date){
            Roo.example.msg('Date Selected', 'You chose {0}.', date.format('M j, Y'));
        }
    });

    // Menus can be prebuilt and passed by reference
    var colorMenu = new Roo.menu.ColorMenu({
        handler : function(cm, color){
            Roo.example.msg('Color Selected', 'You chose {0}.', color);
        }
    });

    var menu = new Roo.menu.Menu({
        id: 'mainMenu',
        items: [
            new Roo.menu.CheckItem({
                text: 'I like Ext',
                checked: true,
                checkHandler: onItemCheck
            }),
            new Roo.menu.CheckItem({
                text: 'Ext for jQuery',
                checked: true,
                checkHandler: onItemCheck
            }),
            new Roo.menu.CheckItem({
                text: 'I donated!',
                checked:false,
                checkHandler: onItemCheck
            }), '-', {
                text: 'Radio Options',
                menu: {        // <-- submenu by nested config object
                    items: [
                        // stick any markup in a menu
                        '<b class="menu-title">Choose a Theme</b>',
                        new Roo.menu.CheckItem({
                            text: 'Aero Glass',
                            checked: true,
                            group: 'theme',
                            checkHandler: onItemCheck
                        }),
                        new Roo.menu.CheckItem({
                            text: 'Vista Black',
                            group: 'theme',
                            checkHandler: onItemCheck
                        }),
                        new Roo.menu.CheckItem({
                            text: 'Gray Theme',
                            group: 'theme',
                            checkHandler: onItemCheck
                        }),
                        new Roo.menu.CheckItem({
                            text: 'Default Theme',
                            group: 'theme',
                            checkHandler: onItemCheck
                        })
                    ]
                }
            },{
                text: 'Choose a Date',
                cls: 'calendar',
                menu: dateMenu // <-- submenu by reference
            },{
                text: 'Choose a Color',
                menu: colorMenu // <-- submenu by reference
            }
        ]
    });

    var tb = new Roo.Toolbar('toolbar');
    tb.add({
            cls: 'x-btn-text-icon bmenu', // icon and text class
            text:'Button w/ Menu',
            menu: menu  // assign menu by instance
        }, 
        new Roo.Toolbar.MenuButton({
            text: 'Split Button',
            handler: onButtonClick,
            tooltip: {text:'This is a QuickTip with autoHide set to false and a title', title:'Tip Title', autoHide:false},
            cls: 'x-btn-text-icon blist',
            // Menus can be built/referenced by using nested menu config objects
            menu : {items: [
                        {text: '<b>Bold</b>', handler: onItemClick},
                        {text: '<i>Italic</i>', handler: onItemClick},
                        {text: '<u>Underline</u>', handler: onItemClick}, '-',{
                        text: 'Pick a Color', handler: onItemClick, menu: {
                        items: [
                                new Roo.menu.ColorItem({selectHandler:function(cp, color){
                                    Roo.example.msg('Color Selected', 'You chose {0}.', color);
                                }}), '-',
                                {text:'More Colors...', handler:onItemClick}
                        ]
                    }},
                    {text: 'Extellent!', handler: onItemClick}
                ]}
        }), '-', {
        text: 'Toggle Me',
        enableToggle: true,
        toggleHandler: onItemToggle,
        pressed: true
    });

    menu.addSeparator();
    // Menus have a rich api for
    // adding and removing elements dynamically
    var item = menu.add({
        text: 'Dynamically added Item'
    });
    // items support full Observable API
    item.on('click', onItemClick);

    // items can easily be looked up
    menu.add({
        text: 'Disabled Item',
        id: 'disableMe'  // <-- Items can also have an id for easy lookup
        // disabled: true   <-- allowed but for sake of example we use long way below
    });
    // access items by id or index
    menu.items.get('disableMe').disable();

    // They can also be referenced by id in or components
    tb.add('-', {
        icon: 'list-items.gif', // icons can also be specified inline
        cls: 'x-btn-icon',
        tooltip: '<b>Quick Tips</b><br/>Icon only button with tooltip'
    }, '-');

    // add a combobox to the toolbar
    var store = new Roo.data.SimpleStore({
        fields: ['abbr', 'state'],
        data : Roo.exampledata.states // from states.js
    });
    var combo = new Roo.form.ComboBox({
        store: store,
        displayField:'state',
        typeAhead: true,
        mode: 'local',
        triggerAction: 'all',
        emptyText:'Select a state...',
        selectOnFocus:true,
        width:135
    });
    tb.addField(combo);

    // functions to display feedback
    function onButtonClick(btn){
        Roo.example.msg('Button Click','You clicked the "{0}" button.', btn.text);
    }

    function onItemClick(item){
        Roo.example.msg('Menu Click', 'You clicked the "{0}" menu item.', item.text);
    }

    function onItemCheck(item, checked){
        Roo.example.msg('Item Check', 'You {1} the "{0}" menu item.', item.text, checked ? 'checked' : 'unchecked');
    }

    function onItemToggle(item, pressed){
        Roo.example.msg('Button Toggled', 'Button "{0}" was toggled to {1}.', item.text, pressed);
    }
});