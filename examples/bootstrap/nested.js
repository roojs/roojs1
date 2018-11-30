
Roo.namespace("Example");

Example.Nested = new Roo.XComponent({
    part     :  ["example", "nested" ],
    order    : '001-Example-Nested',
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
            is_root : true,
            xtype : 'Border',
            xns : Roo.bootstrap.layout,
            el : document.body, // border layout can be applied to the outer one...
            west: {
                xtype : 'Region',
                xns: Roo.bootstrap.layout,
                split:true,
                tabPosition: 'top',
                initialSize: 400,
                titlebar: true,
               // collapsible: true,
                minSize: 100,
                maxSize: 500
            },
            north: {
                xtype : 'Region',
                xns: Roo.bootstrap.layout,
                overflow : 'visible',
                
                initialSize: 50,
                titlebar: false
               
            },
            center: {
                xtype : 'Region',
                xns: Roo.bootstrap.layout,
                autoScroll: false,
                tabPosition:'top',
                 titlebar: true
            },
            items : [
                {
                    xtype : 'Content',
                    xns: Roo.bootstrap.panel,
                    title : "Title north" ,
                    fitToFrame:true,
                    closable:false,
                    region : 'north',
                    items : [
                        {
                            bar : true,
                            position : 'static-top',
                            xtype : 'NavHeaderbar',
                            tag : 'nav',
                            xns : Roo.bootstrap,
                            items : [
                                {
                                    cls : 'navbar-btn sidebar-toggle',
                                    xtype : 'Link',
                                    xns : Roo.bootstrap,
                                    html : '<span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span>'
                                },
                                {
                                    xtype : 'NavGroup',
                                    align : 'right',
                                    xns : Roo.bootstrap,
                                    items : [
                                        {
                                            menu : {
                                                xtype : 'Menu',
                                                xns : Roo.bootstrap,
                                                items : [
                                                    {
                                                        xtype : 'MenuItem',
                                                        xns : Roo.bootstrap,
                                                        html : 'test'
                                                    }
                                                ]
        
                                            },
                                            xtype : 'NavItem',
                                            xns : Roo.bootstrap,
                                            listeners : {
                                                click : function()
                                                {
                                                   // Example.NestedDialog.show({});
                                                }
                                            },
                                            html : 'test dialog',
                                            items : [
        
                                            ]
        
                                        },
                                        {
                                            xtype : 'NavItem',
                                            xns : Roo.bootstrap,
                                            html : 'test'
                                        }
                                    ]
        
                                }
                            ]
        
                        }
                    ]
                    
                },
             
                {
                    xtype : 'Content',
                    xns: Roo.bootstrap.panel,
                    title : "Title west a" ,
                    fitToFrame:true,
                    closable:false,
                    region : 'west',
                    html : 'some body west'
                    
                },
                {
                    xtype : 'Grid',
                    xns: Roo.bootstrap.panel,
                    title : "Test Grid",
                    fitToFrame:true,
                    closable:false,
                    region : 'west',
                    listeners : {
                            activate : function()
                            {
                              //  this.grid.store.load.defer(100, this.grid.store);
				this.grid.footer.onClick('first');
                            }
                        },
                    toolbar : {
                        xtype: 'NavSimplebar',
                        xns : Roo.bootstrap,
			
                        items: [
                            {
                                xtype: 'NavGroup',
                                xns: Roo.bootstrap,
				form: true,
                                items : [
                                    {
                                        xtype: 'NavItem',
                                        xns: Roo.bootstrap,
                                        html: 'a button'
                                        
                                    },
                                    {
                                        xtype: 'Input',
                                        xns: Roo.bootstrap,
                                        placeholder: 'a text input'
                                        
                                    }
                                ]
                            }
                        ]
                        
                    },
                    grid : {
                        loadMask : true,
                        striped : true,
                        xns : Roo.bootstrap,
                        xtype : 'Table',
                        cls : 'table-fixed',
                        rowSelection : true,
                        footer : {
                            xtype : 'PagingToolbar',
                            pageSize : 25,
                            xns : Roo.bootstrap,
                            '|xns' : 'Roo.bootstrap'
                        },
                        store : {
                            xns : Roo.data,
                            xtype : 'Store',
                         
                            proxy : {
                                xns : Roo.data,
                                xtype : 'MemoryProxy',
                                data: [
                                    ['3m Co',71.72,0.02,0.03,'9/1 12:00am'],
                                    ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am'],
                                    ['Altria Group Inc',83.81,0.28,0.34,'9/1 12:00am'],
                                    ['American Express Company',52.55,0.01,0.02,'9/1 12:00am'],
                                    ['American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00am'],
                                    ['AT&T Inc.',31.61,-0.48,-1.54,'9/1 12:00am'],
                                    ['Boeing Co.',75.43,0.53,0.71,'9/1 12:00am'],
                                    ['Caterpillar Inc.',67.27,0.92,1.39,'9/1 12:00am'],
                                    ['Citigroup, Inc.',49.37,0.02,0.04,'9/1 12:00am'],
                                    ['E.I. du Pont de Nemours and Company',40.48,0.51,1.28,'9/1 12:00am'],
                                    ['Exxon Mobil Corp',68.1,-0.43,-0.64,'9/1 12:00am'],
                                    ['General Electric Company',34.14,-0.08,-0.23,'9/1 12:00am'],
                                    ['General Motors Corporation',30.27,1.09,3.74,'9/1 12:00am'],
                                    ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am'] 
                                ]
                            },
                            reader : {
                           
                                xns : Roo.data,
                                xtype : 'ArrayReader',
                                fields: [
                                    {name: 'company'},
                                    {name: 'price', type: 'float'},
                                    {name: 'change', type: 'float'},
                                    {name: 'pctChange', type: 'float'},
                                    {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'}
                                ]
                            },
                        },
                        cm : [
                            
                            {
                                id:'company',
                                header: "Company",
                                width: 160,
                                sortable: true,
                                locked:false,
                                dataIndex: 'company',
                                xns : Roo.grid,
                                xtype : 'ColumnModel'
                            },
                            {
                                header: "Price",
                               width: 160,
                                sortable: true,
                                renderer: Roo.util.Format.usMoney,
                                dataIndex: 'price',
                                xns : Roo.grid,
                                xtype : 'ColumnModel'
                            }
                            
                        ]
                        
                    }
                
                },
                {
                    xtype : 'Content',
                    xns: Roo.bootstrap.panel,
                    title : "Title Center",
                    fitToFrame:true,
                    closable:false,
                    region : 'center',
                    html : 'some body center'
                    
                },
                
                {
                    xtype : 'Nest',
                    title : "Title Nest Center",
                    
                    xns: Roo.bootstrap.panel,
                    region : 'center',
                    
                    layout : {
                        xtype : 'Border',
                        xns: Roo.bootstrap.layout,
                        south: {
                            xtype : 'Region',
                            xns: Roo.bootstrap.layout,
	                        split:true,
	                        initialSize: 200,
	                        minSize: 100,
	                        maxSize: 400,
	                        autoScroll:true,
	                        collapsible:true,
	                        titlebar: true
	                    },
	                    center: {
                            xtype : 'Region',
                            xns: Roo.bootstrap.layout,
	                        autoScroll:true,
	                    },
                        items : [
                            {
                                xtype : 'Content',
                                xns: Roo.bootstrap.panel,
                                title : "More Info",
                                region : 'south',
                                html : 'some body south'
                            },
                            {
                                xtype : 'Content',
                                xns: Roo.bootstrap.panel,
                                title : "the body",
                                region : 'center',
                                html : 'some body center'
                            },
                        ]
                    }
                
                    
                }
                 
            ]   
            
        }
    }
});
   
   Roo.onReady(function() {
        Roo.XComponent.is_alt = true;
          Roo.XComponent.build();
          //dRoo.bootstrap.Tooltip.init();
      });