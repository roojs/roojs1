

Roo.example = Roo.example || {};

Roo.example.bootstrap = new Roo.XComponent({
    part     :  ["layout","viewpanel"],
    order    : '001-viewpanel',
    region   : '',
    parent   : '#bootstrap',
    name     : "unnamed module",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
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
            items : [
                 {
                    xtype: 'Navbar',
                    role : 'navigation',
                    position : 'static-top',
                    bar: true,
                    inverse : true,
                    xns: Roo.bootstrap,
                    items : [
                        
                        {
                            xtype: 'Item',
                            xns: Roo.bootstrap.Navbar,
                            href: '#',
                            html: "hello",
                            badge: 'test',
                            active: true
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.bootstrap,
                            html: "hello",
                            menu:  {
                                    xtype: 'Menu',
                                    xns: Roo.bootstrap,
                                    items : [
                                        {
                                            xtype: 'MenuItem',
                                            xns: Roo.bootstrap,
                                            html: "hello aaa",
                                            href : 'http://roojs.com'
                                        },
                                        {
                                            xtype: 'MenuItem',
                                            xns: Roo.bootstrap,
                                            html: "hello",
                                            href : 'http://roojs.com'
                                        }
                                    ]
                                }
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.bootstrap,
                           
                            html: "dialog",
                            listeners : {
                                click : function() {
                                    Roo.ComponentMgr.get('test-modal-1').show()

                                }
                            }
                            
                        },
                        
                         {
                            xtype: 'Modal',
                            id: 'test-modal-1',
                            xns: Roo.bootstrap,
                            title : 'test1',
                            html: "dialog"
                            
                            
                        },
                        
                        
                        
                        
                        
                    ]
                    
                },
                {
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    jumbotron : true,
                     style :  'padding: 30px 15px 40px', 
                    html : '<h1> hello world </h1><p>test</p>'
                },
                {
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    style :  'margin-top:50px', 
                    items : [
                        {
                            xtype: 'Row',
                            xns: Roo.bootstrap,
                            items : [
                                
                                {
                                    xtype: 'Column',
                                    xns: Roo.bootstrap,
                                    colspan : 12,
                                    items : [
                                        
                                        {
                                            xtype: 'Navbar',
                                            xns: Roo.bootstrap,
                                            bar: true,
                                            items : [
                                                {
                                                    xtype: 'Item',
                                                    xns: Roo.bootstrap.Navbar,
                                                    html: "nav",
                                                    href : 'http://roojs.com',
                                                    
                                                    menu:    {
                                                        xtype: 'Menu',
                                                        xns: Roo.bootstrap,
                                                        items : [
                                                            {
                                                                xtype: 'MenuItem',
                                                                xns: Roo.bootstrap,
                                                                html: "hello",
                                                                href : 'http://roojs.com'
                                                            },
                                                            {
                                                                xtype: 'MenuSeparator',
                                                                xns: Roo.bootstrap,
                                                            },
                                                            {
                                                                xtype: 'MenuItem',
                                                                xns: Roo.bootstrap,
                                                                html: "hello",
                                                                href: 'http://roojs.com'
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
                },
                {
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    style :  'margin-top:60px', 
                    items : [
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            html: 'default'
                        },
                         {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            active: true,
                            html: 'active'
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            weight: 'primary',
                            html: 'primary'
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            weight: 'success',
                            html: 'success'
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            weight: 'info',
                            size : 'lg',
                            html: 'info lg'
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            weight: 'warning',
                            html: 'warning'
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            weight: 'danger',
                            size : 'sm',
                            html: 'danger sm'
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            weight: 'danger',
                            size : 'xs',
                            html: 'danger xs'
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            weight: 'link',
                            tag: 'a',
                            href: 'http://www.roojs.com',
                            html: 'link a'
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            disabled: true,
                            html: 'disabled'
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            isClose: true,
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            glyphicon: 'volume-up',
                            html: 'glyphicon'
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            badge: '42',
                            href: '#'
                        }
                    ]
                },
                {
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    style :  'margin-top:60px',
                    
                    items : [
                        {
                            xtype: 'ButtonGroup',
                            xns: Roo.bootstrap,
                            items : [
                                {
                                    xtype: 'Button',
                                    xns: Roo.bootstrap,
                                    html: "hello",
                                    menu:  {
                                            xtype: 'Menu',
                                            xns: Roo.bootstrap,
                                            items : [
                                                {
                                                    xtype: 'MenuItem',
                                                    xns: Roo.bootstrap,
                                                    html: "hello aaa",
                                                    href : 'http://roojs.com'
                                                },
                                                {
                                                    xtype: 'MenuItem',
                                                    xns: Roo.bootstrap,
                                                    html: "hello",
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
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    style :  'margin-top:60px', 
                    items : [
                        {
                            xtype: 'ButtonGroup',
                            xns : Roo.bootstrap,
                            items: [
                                {
                                    xtype: 'Button',
                                    xns : Roo.bootstrap,
                                },
                                {
                                    xtype: 'Button',
                                    xns : Roo.bootstrap,
                                },
                                {
                                    xtype: 'Button',
                                    xns : Roo.bootstrap,
                                }
                            ]
                        },
                        {
                            xtype: 'ButtonGroup',
                            xns : Roo.bootstrap,
                            align: 'vertical',
                            items: [
                                {
                                    xtype: 'Button',
                                    xns : Roo.bootstrap,
                                },
                                {
                                    xtype: 'Button',
                                    xns : Roo.bootstrap,
                                },
                                {
                                    xtype: 'Button',
                                    xns : Roo.bootstrap,
                                }
                            ]
                        },
                        {
                            xtype: 'ButtonGroup',
                            xns : Roo.bootstrap,
                            size: 'lg',
                            align: 'justified',
                            items: [
                                {
                                    xtype: 'Button',
                                    xns : Roo.bootstrap,
                                    tag : 'a'
                                },
                                {
                                    xtype: 'Button',
                                    xns : Roo.bootstrap,
                                    tag : 'a'
                                },
                                {
                                    xtype: 'Button',
                                    xns : Roo.bootstrap,
                                    tag : 'a'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    style :  'margin-top:60px', 
                    items : [
                        {
                            xtype: 'Form',
                            xns: Roo.bootstrap,
                            items : [
                                {
                                    xtype: 'Input',
                                    xns: Roo.bootstrap,
                                    name : 'test',
                                    fieldLabel : 'test'
                                },
                                {
                                    xtype: 'Button',
                                    xns: Roo.bootstrap,
                                    html : 'Submit'
                                    
                                },
                            ]
                        }
                    ]
                },{
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    style :  'margin-top:60px',
                    
                    items : [
                        {
                            xtype: 'Form',
                            xns: Roo.bootstrap,
                            labelAlign : 'left',
                            items : [
                                {
                                    xtype: 'Input',
                                    xns: Roo.bootstrap,
                                    name : 'test',
                                    fieldLabel : 'test'
                                },
                                {
                                    xtype: 'Button',
                                    xns: Roo.bootstrap,
                                    html : 'Submit'
                                    
                                },
                            ]
                        }
                    ]
                },
                {
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    style :  'margin-top:60px',
                    items: [
                        {
                            xtype: 'ButtonGroup',
                            xns: Roo.bootstrap,
                            size: 'xs',
                            toolbar: true,
                            
                            items : [
                                {
                                    xtype: 'ButtonGroup',
                                    xns: Roo.bootstrap,
                                    items : [
                                        {
                                            xtype: 'Button',
                                            xns: Roo.bootstrap,
                                            html : 'A',
                                        },
                                        {
                                            xtype: 'Button',
                                            xns: Roo.bootstrap,
                                            html : 'B',
                                        },
                                        {
                                            xtype: 'Button',
                                            xns: Roo.bootstrap,
                                            html : 'C',
                                        },
                                        {
                                            xtype: 'Button',
                                            xns: Roo.bootstrap,
                                            html : 'D',
                                        }
                                    ]
                                },
                                {
                                    xtype: 'ButtonGroup',
                                    xns: Roo.bootstrap,
                                    items : [
                                        {
                                            xtype: 'Button',
                                            xns: Roo.bootstrap,
                                            html : ' ',
                                            glyphicon: 'align-left'
                                        },
                                        {
                                            xtype: 'Button',
                                            xns: Roo.bootstrap,
                                            html : ' ',
                                            glyphicon: 'align-center'
                                        },
                                        {
                                            xtype: 'Button',
                                            xns: Roo.bootstrap,
                                            html : ' ',
                                            glyphicon: 'align-right'
                                        },
                                        {
                                            xtype: 'Button',
                                            xns: Roo.bootstrap,
                                            html : ' ',
                                            glyphicon: 'align-justify'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    items: [
                        {
                            xtype: 'Img',
                            xns: Roo.bootstrap,
                            src: 'http://img.brothersoft.com/screenshots/softimage/r/rose_flower_screensaver-234027-1240456558.jpeg'
                        }
                    ]
                }
            ]
        };
    }
});