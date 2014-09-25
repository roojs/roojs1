

Roo.example = Roo.example || {};

Roo.example.bootstrap = new Roo.XComponent({
    part     :  ["layout","viewpanel"],
    order    : '001-viewpanel',
    region   : '',
    parent   : '#bootstrap',
    name     : "unnamed module",
    disabled : false, 
    permname : '', 
    _tree    : function() {
        this.parent = {
            el : new Roo.bootstrap.Body(),
        }
        this.parent.el.layout = false;
        this.parent.el.render(document.body);
        
        var _this = this;
        var MODULE = this;
        return {
            xtype: 'Body',
            xns: Roo.bootstrap,
            items: [
                {
                    xtype: 'NavbarSimple',
                    xns: Roo.bootstrap,
                    bar: true,
                    position: 'static-top',
                    inverse: true,
                    brand: '<img src="http://detail.herokuapp.com/img/logo.png" alt="logo">',
                    collapse: true,
                    items: [
                        {
                            xtype: 'NavGroup',
                            xns: Roo.bootstrap,
                            align: 'right',
                            items: [
                                {
                                    xtype: 'NavItem',
                                    xns: Roo.bootstrap,
                                    items: [
                                        {
                                            xtype: 'Element',
                                            xns: Roo.bootstrap,
                                            tag: 'input',
                                            cls: 'search',
                                            type: 'text'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'NavbarSimple',
                    xns: Roo.bootstrap,
                    sidebar: true,
                    items: [
                        {
                            xtype: 'NavGroup',
                            xns: Roo.bootstrap,
                            items: [
                                {
                                    xtype: 'NavItem',
                                    xns: Roo.bootstrap,
                                    href: '#',
                                    glyphicon: 'home',
                                    html: 'Hello'
                                },
                                {
                                    xtype: 'NavItem',
                                    xns: Roo.bootstrap,
                                    href: '#',
                                    glyphicon: 'stats',
                                    html: 'Charts'
                                },
                                {
                                    xtype: 'NavItem',
                                    xns: Roo.bootstrap,
                                    href: '#',
                                    glyphicon: 'user',
                                    html: 'Users',
                                    active: true,
                                    menu:  {
                                        xtype: 'Menu',
                                        xns: Roo.bootstrap,
                                        type: 'submenu',
                                        items : [
                                            {
                                                xtype: 'MenuItem',
                                                xns: Roo.bootstrap,
                                                html: "User list",
                                                href : 'http://roojs.com'
                                            },
                                            {
                                                xtype: 'MenuItem',
                                                xns: Roo.bootstrap,
                                                html: "New user form",
                                                href : 'http://roojs.com'
                                            },
                                            {
                                                xtype: 'MenuItem',
                                                xns: Roo.bootstrap,
                                                html: "User profile",
                                                href : 'http://roojs.com'
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'NavItem',
                                    xns: Roo.bootstrap,
                                    href: '#',
                                    glyphicon: 'edit',
                                    html: 'Forms'
                                },
                                {
                                    xtype: 'NavItem',
                                    xns: Roo.bootstrap,
                                    href: '#',
                                    glyphicon: 'picture',
                                    html: 'Gallery'
                                },
                                {
                                    xtype: 'NavItem',
                                    xns: Roo.bootstrap,
                                    href: '#',
                                    glyphicon: 'calendar',
                                    html: 'Calendar'
                                },
                                {
                                    xtype: 'NavItem',
                                    xns: Roo.bootstrap,
                                    href: '#',
                                    glyphicon: 'th-large',
                                    html: 'Tables'
                                },
                                {
                                    xtype: 'NavItem',
                                    xns: Roo.bootstrap,
                                    href: '#',
                                    glyphicon: 'flash',
                                    html: 'UI Elements'
                                },
                                {
                                    xtype: 'NavItem',
                                    xns: Roo.bootstrap,
                                    href: '#',
                                    glyphicon: 'cog',
                                    html: 'My Info'
                                },
                                {
                                    xtype: 'NavItem',
                                    xns: Roo.bootstrap,
                                    href: '#',
                                    glyphicon: 'share-alt',
                                    html: 'Extras'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    cls: 'content',
                    items: [
                        {
                            xtype: 'Container',
                            xns: Roo.bootstrap,
                            cls: 'pad-wrapper',
                            items: [
                                {
                                    xtype: 'Row',
                                    xns: Roo.bootstrap,
                                    cls: 'section btns',
                                    items: [
                                        {
                                            xtype: 'Header',
                                            xns: Roo.bootstrap,
                                            level: 4,
                                            html: 'Flat Buttons',
                                            cls: 'title'
                                        },
                                        {
                                            xtype: 'Column',
                                            xns: Roo.bootstrap,
                                            md: 6,
                                            items: [
                                                {
                                                    xtype: 'Table',
                                                    xns: Roo.bootstrap,
                                                    items: [
                                                        {
                                                            xtype: 'TableBody',
                                                            xns: Roo.bootstrap,
                                                            items: [
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn-flat.inverse</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'a',
                                                                                    cls: 'btn-flat inverse',
                                                                                    html: 'INVERSE BUTTON'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn-flat.white</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'a',
                                                                                    cls: 'btn-flat white',
                                                                                    html: 'WHITE BUTTON'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn-flat.gray</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'a',
                                                                                    cls: 'btn-flat gray',
                                                                                    html: 'GRAY BUTTON'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn-flat.default</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'a',
                                                                                    cls: 'btn-flat default',
                                                                                    html: 'DEFAULT BUTTON'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn-flat.primary</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'a',
                                                                                    cls: 'btn-flat primary',
                                                                                    html: 'PRIMARY BUTTON'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn-flat.success</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'a',
                                                                                    cls: 'btn-flat success',
                                                                                    html: 'SUCCESS BUTTON'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn-flat.gray</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'a',
                                                                                    cls: 'btn-flat info',
                                                                                    html: 'INFO BUTTON'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn-flat.danger</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'a',
                                                                                    cls: 'btn-flat danger',
                                                                                    html: 'DANGER BUTTON'
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
                                        },
                                        {
                                            xtype: 'Column',
                                            xns: Roo.bootstrap,
                                            md: 5,
                                            items: [
                                                {
                                                    xtype: 'Row',
                                                    xns: Roo.bootstrap,
                                                    cls: 'ctrls',
                                                    items: [
                                                        {
                                                            xtype: 'ButtonGroup',
                                                            xns: Roo.bootstrap,
                                                            cls: 'large',
                                                            btn: false,
                                                            items: [
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    cls: 'glow left',
                                                                    html: ' ',
                                                                    glyphicon: 'link'
                                                                },
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    cls: 'glow middle',
                                                                    html: ' ',
                                                                    glyphicon: 'random'
                                                                },
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    cls: 'glow middle',
                                                                    html: ' ',
                                                                    glyphicon: 'fullscreen'
                                                                },
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    cls: 'glow right',
                                                                    html: ' ',
                                                                    glyphicon: 'zoom-out'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'ButtonGroup',
                                                            xns: Roo.bootstrap,
                                                            btn: false,
                                                            items: [
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    cls: 'glow left',
                                                                    html: 'LEFT',
                                                                    active: true
                                                                },
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    cls: 'glow middle',
                                                                    html: 'RIGHT'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'ButtonGroup',
                                                            xns: Roo.bootstrap,
                                                            cls: 'large',
                                                            btn: false,
                                                            items: [
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    cls: 'glow left',
                                                                    glyphicon: 'play',
                                                                    html: ' '
                                                                },
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    cls: 'glow middle',
                                                                    glyphicon: 'pause',
                                                                    html: ' '
                                                                },
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    cls: 'glow right',
                                                                    glyphicon: 'stop',
                                                                    html: ' '
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'Row',
                                                    xns: Roo.bootstrap,
                                                    cls: 'ctrls',
                                                    items: [
                                                        {
                                                            xtype: 'Button',
                                                            xns: Roo.bootstrap,
                                                            cls:'btn-flat icon',
                                                            html: 'Fork me on github',
                                                            glyphicon: 'circle-arrow-up'
                                                        },
                                                        {
                                                            xtype: 'Button',
                                                            xns: Roo.bootstrap,
                                                            theme: 'glow',
                                                            html: 'Icon button',
                                                            glyphicon: 'wrench'
                                                        },
                                                        {
                                                            xtype: 'ButtonGroup',
                                                            xns: Roo.bootstrap,
                                                            items: [
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    cls: 'btn glow',
                                                                    html: 'Drop down'
                                                                },
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    cls: 'btn glow',
                                                                    html: '<span class="caret"></span>',
                                                                    menu: {
                                                                        xtype: 'Menu',
                                                                        xns: Roo.bootstrap,
                                                                        items: [
                                                                            {
                                                                                xtype: 'MenuItem',
                                                                                xns: Roo.bootstrap,
                                                                                html: "hello aaa",
                                                                                href : 'http://roojs.com'
                                                                            },
                                                                            {
                                                                                xtype: 'MenuItem',
                                                                                xns: Roo.bootstrap,
                                                                                html: "hello aaa",
                                                                                href : 'http://roojs.com'
                                                                            },
                                                                            {
                                                                                xtype: 'MenuItem',
                                                                                xns: Roo.bootstrap,
                                                                                html: "hello aaa",
                                                                                href : 'http://roojs.com'
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'Row',
                                                    xns: Roo.bootstrap,
                                                    cls: 'ctrls',
                                                    items: [
                                                        {
                                                            xtype: 'Pagination',
                                                            xns: Roo.bootstrap,
                                                            inverse: false,
                                                            align: 'left',
                                                            from: 1,
                                                            to: 4,
                                                            active: 1
                                                        },
                                                        {
                                                            xtype: 'Pagination',
                                                            xns: Roo.bootstrap,
                                                            inverse: true,
                                                            align: 'left',
                                                            from: 1,
                                                            to: 4,
                                                            active: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'Row',
                                                    xns: Roo.bootstrap,
                                                    cls: 'ctrls',
                                                    items: [
                                                        {
                                                            xtype: 'Element',
                                                            xns: Roo.bootstrap,
                                                            html: '<input class="search" type="text" placeholder="Search input...">'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'Header',
                                                    xns: Roo.bootstrap,
                                                    level: 4,
                                                    html: 'Switch buttons',
                                                    cls: 'title'
                                                },
                                                {
                                                    xtype: 'Row',
                                                    xns: Roo.bootstrap,
                                                    cls: 'ctrls',
                                                    items: [
                                                        {
                                                            xtype: 'Button',
                                                            xns: Roo.bootstrap,
                                                            toggle: true,
                                                            ontext: 'ON',
                                                            offtext: 'OFF',
                                                            defaulton: false
                                                        },
                                                        {
                                                            xtype: 'Button',
                                                            xns: Roo.bootstrap,
                                                            toggle: true,
                                                            ontext: 'ON',
                                                            offtext: 'OFF',
                                                            defaulton: false,
                                                            weight: 'primary'
                                                        },
                                                        {
                                                            xtype: 'Button',
                                                            xns: Roo.bootstrap,
                                                            toggle: true,
                                                            ontext: 'ON',
                                                            offtext: 'OFF',
                                                            defaulton: false,
                                                            weight: 'info'
                                                        },
                                                        {
                                                            xtype: 'Button',
                                                            xns: Roo.bootstrap,
                                                            toggle: true,
                                                            ontext: 'ON',
                                                            offtext: 'OFF',
                                                            defaulton: false,
                                                            weight: 'success'
                                                        },
                                                        {
                                                            xtype: 'Button',
                                                            xns: Roo.bootstrap,
                                                            toggle: true,
                                                            ontext: 'ON',
                                                            offtext: 'OFF',
                                                            defaulton: false,
                                                            weight: 'danger'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'Row',
                                    xns: Roo.bootstrap,
                                    cls: 'section btns',
                                    items: [
                                        {
                                            xtype: 'Column',
                                            xns: Roo.bootstrap,
                                            md: 6,
                                            items: [
                                                {
                                                    xtype: 'Header',
                                                    xns: Roo.bootstrap,
                                                    level: 4,
                                                    html: 'Glow Buttons',
                                                    cls: 'title'
                                                },
                                                {
                                                    xtype: 'Table',
                                                    xns: Roo.bootstrap,
                                                    items: [
                                                        {
                                                            xtype: 'TableBody',
                                                            xns: Roo.bootstrap,
                                                            items: [
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn-glow</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Button',
                                                                                    xns: Roo.bootstrap,
                                                                                    html: 'Sign up now',
                                                                                    theme: 'glow'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn-glow.inverse</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Button',
                                                                                    xns: Roo.bootstrap,
                                                                                    html: 'Sign up now',
                                                                                    theme: 'glow',
                                                                                    inverse: true
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn-glow.primary</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Button',
                                                                                    xns: Roo.bootstrap,
                                                                                    html: 'Sign up now',
                                                                                    theme: 'glow',
                                                                                    weight: 'primary'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn-glow.success</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Button',
                                                                                    xns: Roo.bootstrap,
                                                                                    html: 'Sign up now',
                                                                                    theme: 'glow',
                                                                                    weight: 'success'
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
                                        },
                                        {
                                            xtype: 'Column',
                                            xns: Roo.bootstrap,
                                            md: 5,
                                            items: [
                                                {
                                                    xtype: 'Header',
                                                    xns: Roo.bootstrap,
                                                    level: 4,
                                                    html: 'Sliders',
                                                    cls: 'title'
                                                },
                                                {
                                                    xtype: 'Container',
                                                    xns: Roo.bootstrap,
                                                    cls: 'sliders',
                                                    items: [
                                                        {
                                                            xtype: 'Slider',
                                                            xns: Roo.bootstrap,
                                                            html: 'Sign up now',
                                                            cls: 'btn-glow success'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'Row',
                                    xns: Roo.bootstrap,
                                    cls: 'section btns',
                                    items: [
                                        {
                                            xtype: 'Column',
                                            xns: Roo.bootstrap,
                                            md: 6,
                                            items: [
                                                {
                                                    xtype: 'Header',
                                                    xns: Roo.bootstrap,
                                                    level: 4,
                                                    html: 'Bootstrap 3 buttons',
                                                    cls: 'title'
                                                },
                                                {
                                                    xtype: 'Table',
                                                    xns: Roo.bootstrap,
                                                    items: [
                                                        {
                                                            xtype: 'TableBody',
                                                            xns: Roo.bootstrap,
                                                            items: [
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn.btn-default</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Button',
                                                                                    xns: Roo.bootstrap,
                                                                                    html: 'Sign up now'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn.btn-primary</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Button',
                                                                                    weight: 'primary',
                                                                                    xns: Roo.bootstrap,
                                                                                    html: 'Sign up now'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn.btn-success</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Button',
                                                                                    weight: 'success',
                                                                                    xns: Roo.bootstrap,
                                                                                    html: 'Sign up now'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn.btn-warning</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Button',
                                                                                    weight: 'warning',
                                                                                    xns: Roo.bootstrap,
                                                                                    html: 'Sign up now'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn.btn-info</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Button',
                                                                                    weight: 'info',
                                                                                    xns: Roo.bootstrap,
                                                                                    html: 'Sign up now'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'TableRow',
                                                                    xns: Roo.bootstrap,
                                                                    items: [
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            html: '<code>.btn.btn-danger</code>'
                                                                        },
                                                                        {
                                                                            xtype: 'TableCell',
                                                                            xns: Roo.bootstrap,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Button',
                                                                                    weight: 'danger',
                                                                                    xns: Roo.bootstrap,
                                                                                    html: 'Sign up now'
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
                                        },
                                        {
                                            xtype: 'Column',
                                            xns: Roo.bootstrap,
                                            md: 5,
                                            items: [
                                                {
                                                    xtype: 'Header',
                                                    xns: Roo.bootstrap,
                                                    level: 4,
                                                    html: 'Bootstrap 3 buttons',
                                                    cls: 'title'
                                                },
                                                {
                                                    xtype: 'Row',
                                                    xns: Roo.bootstrap,
                                                    cls: 'ctrls',
                                                    items: [
                                                        {
                                                            xtype: 'Element',
                                                            xns: Roo.bootstrap,
                                                            cls: 'dropdown',
                                                            items: [
                                                                {
                                                                    xtype: 'Element',
                                                                    xns: Roo.bootstrap,
                                                                    tag: 'ul',
                                                                    cls: 'dropdown-menu',
                                                                    items: [
                                                                        {
                                                                            xtype: 'Element',
                                                                            xns: Roo.bootstrap,
                                                                            tag: 'li',
                                                                            cls: 'dropdown-header',
                                                                            html: 'Dropdown header'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'ButtonGroup',
                                                            xns: Roo.bootstrap,
                                                            items: [
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    html: '1'
                                                                },
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    html: '2'
                                                                },
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    html: '3'
                                                                },
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    html: 'Dropdown',
                                                                    menu: {
                                                                        xtype: 'Menu',
                                                                        xns: Roo.bootstrap,
                                                                        items: [
                                                                            {
                                                                                xtype: 'MenuItem',
                                                                                xns: Roo.bootstrap,
                                                                                html: "hello aaa",
                                                                                href : 'http://roojs.com'
                                                                            },
                                                                            {
                                                                                xtype: 'MenuItem',
                                                                                xns: Roo.bootstrap,
                                                                                html: "hello aaa",
                                                                                href : 'http://roojs.com'
                                                                            },
                                                                            {
                                                                                xtype: 'MenuItem',
                                                                                xns: Roo.bootstrap,
                                                                                html: "hello aaa",
                                                                                href : 'http://roojs.com'
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'Row',
                                                    xns: Roo.bootstrap,
                                                    cls: 'ctrls',
                                                    items: [
                                                        {
                                                            xtype: 'NavbarSimple',
                                                            xns: Roo.bootstrap,
                                                            bar: false,
                                                            type: 'tabs',
                                                            items: [
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    html: 'Home',
                                                                    active: true
                                                                },
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    html: 'Profile',
                                                                    active: true
                                                                },
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    html: 'Messages',
                                                                    active: true
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'Row',
                                                    xns: Roo.bootstrap,
                                                    cls: 'ctrls',
                                                    items: [
                                                        {
                                                            xtype: 'ButtonGroup',
                                                            xns: Roo.bootstrap,
                                                            items: [
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    html: 'Action'
                                                                },
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    html: 'Action',
                                                                    menu: {
                                                                        xtype: 'Menu',
                                                                        xns: Roo.bootstrap,
                                                                        items: [
                                                                            {
                                                                                xtype: 'MenuItem',
                                                                                xns: Roo.bootstrap,
                                                                                html: "hello aaa",
                                                                                href : 'http://roojs.com'
                                                                            },
                                                                            {
                                                                                xtype: 'MenuItem',
                                                                                xns: Roo.bootstrap,
                                                                                html: "hello aaa",
                                                                                href : 'http://roojs.com'
                                                                            },
                                                                            {
                                                                                xtype: 'MenuItem',
                                                                                xns: Roo.bootstrap,
                                                                                html: "hello aaa",
                                                                                href : 'http://roojs.com'
                                                                            }
                                                                        ]
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
                            ]
                        }
                    ]
                }
            ]
        };
    }
});