//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

calendarpanel = new Roo.XComponent({
    part     :  ["layout","calendarpanel"],
    order    : '001-calendarpanel',
    region   : '',
    parent   : '#view-panel',
    name     : "unnamed module",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
        var _this = this;
        var MODULE = this;
        return {
            xtype: 'NestedLayoutPanel',
            xns: Roo,
            region : 'center',
            title : "Companies",
            layout : {
                xtype: 'BorderLayout',
                xns: Roo,
                items : [
                    {
                        xtype: 'GridPanel',
                        xns: Roo,
                        listeners : {
                            activate : function() {
                                _this.panel = this;
                                if (_this.grid) {
                                    _this.grid.footer.onClick('first');
                                }
                            }
                        },
                        background : true,
                        fitContainer : true,
                        fitToframe : true,
                        region : 'center',
                        tableName : 'Companies',
                        title : "Companies",
                        grid : {
                            xtype: 'Grid',
                            xns: Roo.grid,
                            listeners : {
                                render : function() 
                                {
                                    _this.grid = this; 
                                     _this.dialog = Pman.Dialog.Companies;
                                    if (_this.panel.active) {
                                       this.footer.onClick('first');
                                    }
                                },
                                rowdblclick : function (_self, rowIndex, e)
                                {
                                    if (!_this.dialog) return;
                                    _this.dialog.show( this.getDataSource().getAt(rowIndex).data, function() {
                                        _this.grid.footer.onClick('first');
                                    }); 
                                    
                                    
                                },
                                rowclick : function (_self, rowIndex, e)
                                {
                                  try { Pman.Tab.AdminOffice.grid.footer.onClick('refresh'); } catch(e) {}
                                }
                            },
                            autoExpandColumn : 'name',
                            loadMask : true,
                            dataSource : {
                                xtype: 'Store',
                                xns: Roo.data,
                                listeners : {
                                    load : function (_self, records, options)
                                    {
                                       try {
                                            Pman.Tab.AdminOffice.grid.footer.onClick('refresh');
                                        } catch (e) {}
                                    },
                                    beforeload : function (_self, o)
                                    {
                                       o.params = o.params || {};
                                       try {
                                           o.params['query[name]'] = _this.searchBox.getValue();
                                       } catch(e) { return false; }
                                    }
                                },
                                remoteSort : true,
                                sortInfo : { field : 'name', direction: 'ASC' },
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    listeners : {
                                        load : function (This, o, arg)
                                        {
                                         
                                        }
                                    },
                                    method : 'GET',
                                    url : baseURL + '/Roo/Companies.php'
                                },
                                reader : {
                                    xtype: 'JsonReader',
                                    xns: Roo.data,
                                    totalProperty : 'total',
                                    root : 'data',
                                    id : 'id',
                                    fields : [
                                        {
                                            'name': 'code',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'name',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'remarks',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'owner_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'address',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'tel',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'fax',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'email',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'isOwner',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'logo_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'background_color',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'comptype',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'url',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'main_office_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'created_by',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'created_dt',
                                            'type': 'date',
                                            'dateFormat': 'Y-m-d'
                                        },
                                        {
                                            'name': 'updated_by',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'updated_dt',
                                            'type': 'date',
                                            'dateFormat': 'Y-m-d'
                                        },
                                        {
                                            'name': 'passwd',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'dispatch_port',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'province',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'country',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'logo_id_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'logo_id_filename',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'logo_id_ontable',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'logo_id_onid',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'logo_id_mimetype',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'logo_id_width',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'logo_id_height',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'logo_id_filesize',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'logo_id_displayorder',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'logo_id_language',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'logo_id_parent_image_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'logo_id_created',
                                            'type': 'date'
                                        },
                                        {
                                            'name': 'logo_id_imgtype',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'logo_id_linkurl',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'logo_id_descript',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'logo_id_title',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'owner_id_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'owner_id_office_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'owner_id_name',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'owner_id_phone',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'owner_id_fax',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'owner_id_email',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'owner_id_company_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'owner_id_role',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'owner_id_active',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'owner_id_remarks',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'owner_id_passwd',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'owner_id_owner_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'owner_id_lang',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'owner_id_no_reset_sent',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'owner_id_action_type',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'owner_id_project_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'owner_id_deleted_by',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'owner_id_deleted_dt',
                                            'type': 'date'
                                        },
                                        {
                                            'name': 'main_office_id_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'main_office_id_company_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'main_office_id_name',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'main_office_id_address',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'main_office_id_phone',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'main_office_id_fax',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'main_office_id_email',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'main_office_id_role',
                                            'type': 'string'
                                        }
                                    ]
                                }
                            },
                            footer : {
                                xtype: 'PagingToolbar',
                                xns: Roo,
                                pageSize : 25,
                                displayInfo : true,
                                displayMsg : "Displaying Companies{0} - {1} of {2}",
                                emptyMsg : "No Companies found"
                            },
                            toolbar : {
                                xtype: 'Toolbar',
                                xns: Roo,
                                items : [
                                    {
                                        xtype: 'TextField',
                                        xns: Roo.form,
                                        listeners : {
                                            show : function (_self)
                                            {
                                            
                                            },
                                            specialkey : function (_self, e)
                                            {
                                             if (e.getKey() == 13) {
                                                 _this.grid.footer.onClick( 'first' );
                                              }
                                            },
                                            render : function (_self)
                                            {
                                            _this.searchBox = _self;
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        listeners : {
                                            click : function (_self, e)
                                            {
                                            _this.grid.footer.onClick('first');
                                            }
                                        },
                                        cls : 'x-btn-icon',
                                        icon : rootURL + '/Pman/templates/images/search.gif'
                                    },
                                    {
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        listeners : {
                                            click : function (_self, e)
                                            {
                                                _this.searchBox.setValue('');
                                                _this.grid.footer.onClick('first');
                                            }
                                        },
                                        cls : 'x-btn-icon',
                                        icon : rootURL + '/Pman/templates/images/edit-clear.gif'
                                    },
                                    {
                                        xtype: 'Fill',
                                        xns: Roo.Toolbar
                                    },
                                    {
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        listeners : {
                                            click : function()
                                            {
                                                if (!_this.dialog) return;
                                                _this.dialog.show( { id : 0 } , function() {
                                                    _this.grid.footer.onClick('first');
                                               }); 
                                            }
                                        },
                                        cls : 'x-btn-text-icon',
                                        text : "Add",
                                        icon : Roo.rootURL + 'images/default/dd/drop-add.gif'
                                    },
                                    {
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        listeners : {
                                            click : function()
                                            {
                                                var s = _this.grid.getSelectionModel().getSelections();
                                                if (!s.length || (s.length > 1))  {
                                                    Roo.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                                                    return;
                                                }
                                                if (!_this.dialog) return;
                                                _this.dialog.show(s[0].data, function() {
                                                    _this.grid.footer.onClick('first');
                                                }); 
                                                
                                            }
                                        },
                                        cls : 'x-btn-text-icon',
                                        text : "Edit",
                                        icon : Roo.rootURL + 'images/default/tree/leaf.gif'
                                    },
                                    {
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        text : "Delete",
                                        cls : 'x-btn-text-icon',
                                        icon : rootURL + '/Pman/templates/images/trash.gif',
                                        listeners : {
                                            click : function()
                                            {
                                                 Pman.genericDelete(_this, 'Companies'); 
                                            }
                                        }
                                    }
                                ]
                            },
                            colModel : [
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'comptype',
                                    header : 'Type',
                                    sortable : true,
                                    width : 90,
                                    renderer : function (v,x ,r) {
                                        //return Pman.Dialog.Companies.comptypeListToString(r.data.isOwner ? 'OWNER' : v);
                                        return v;
                                    }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'code',
                                    header : 'Ref#',
                                    sortable : true,
                                    width : 50,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'name',
                                    header : 'Name',
                                    sortable : true,
                                    width : 200,
                                    renderer : function(v,x,r) {
                                        return String.format(r.data.comptype == 'OWNER' ? '<B>{0}</B>' : '{0}',v);    
                                    }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'tel',
                                    header : 'Tel',
                                    width : 100,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'fax',
                                    header : 'Fax',
                                    width : 100,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'email',
                                    header : 'Email',
                                    sortable : true,
                                    width : 100,
                                    renderer : function (v) {
                                            return (v.length && v.indexOf('@') > 0 ) ? 
                                                String.format('<a href="mailto:{0}">{0}</a>',v) : v;
                                                
                                        }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'address',
                                    header : 'Address',
                                    sortable : true,
                                    width : 200,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    header : 'Remarks',
                                    width : 200,
                                    dataIndex : 'remarks',
                                    renderer : function(v) { return String.format('{0}', v); }
                                }
                            ]
                        }
                    }
                ],
                center : {
                    xtype: 'LayoutRegion',
                    xns: Roo
                },
                south : {
                    xtype: 'LayoutRegion',
                    xns: Roo,
                    height : 150,
                    split : true,
                    titlebar : true
                }
            }
        };
    }
});
