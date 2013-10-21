//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

var viewpanel = new Roo.XComponent({
    part     :  ["Hebe","Members"],
    order    : '001-Pman.Tab.Members',
    region   : 'center',
    parent   : '#view',
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
                        background : false,
                        fitContainer : true,
                        fitToframe : true,
                        region : 'center',
                        tableName : 'members',
                        title : "Members",
                        grid : {
                            xtype: 'Grid',
                            xns: Roo.grid,
                            listeners : {
                                render : function() 
                                {
                                    _this.grid = this; 
                                    //_this.dialog = Pman.Dialog.FILL_IN
                                    if (_this.panel.active) {
                                       this.footer.onClick('first');
                                    }
                                },
                                rowdblclick : function (_self, rowIndex, e)
                                {
                                
                                    Roo.log(this.getDataSource().getAt(rowIndex).json.code);
                                    _this.selectedCode = this.getDataSource().getAt(rowIndex).json.id;
                                    _this.member_cp.region.showPanel(1);
                                    
                                    /*if (!_this.dialog) return;
                                    
                                    _this.dialog.show( this.getDataSource().getAt(rowIndex), function() {
                                        _this.grid.footer.onClick('first');
                                    }); */
                                },
                                rowclick : function (_self, rowIndex, e)
                                {
                                    _this.selectedCode = this.getDataSource().getAt(rowIndex).json.id;
                                }
                            },
                            loadMask : true,
                            dataSource : {
                                xtype: 'Store',
                                xns: Roo.data,
                                listeners : {
                                    beforeload : function (_self, options)
                                    {
                                        options.params = options.params || {};
                                        //options.params._search = _this.searchBox.getValue();
                                    
                                        options.params['find[code]'] = _this.searchBox.getValue();
                                        for(var k in _this.pages) {
                                            if (!_this.pages[k].pressed) {
                                                continue;
                                            }
                                            switch(k) {
                                                case 'members':
                                                    //options.params['find[code]'] = _this.searchBox.getValue();
                                                    break;
                                                case 'contractors':
                                                    options.params['find[type]'] = 'CN';
                                                    break;
                                                case 'staff':
                                                    options.params['find[type]'] = 'X';
                                                    break;
                                            }
                                        
                                        }
                                    
                                    }
                                },
                                remoteSort : true,
                                sortInfo : { field : 'code', direction: 'ASC' },
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    method : 'GET',
                                    url : baseURL + '/Roo/members.php'
                                },
                                reader : {
                                    xtype: 'JsonReader',
                                    xns: Roo.data,
                                    totalProperty : 'total',
                                    root : 'data',
                                    id : 'id',
                                    fields : [
                                        {
                                            'name': 'id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'code',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'member_type',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'status',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'card_no',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'card_issued',
                                            'type': 'date',
                                            'dateFormat': 'Y-m-d'
                                        },
                                        {
                                            'name': 'title',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'name',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'name_zh',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'sex',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'birth_date',
                                            'type': 'date',
                                            'dateFormat': 'Y-m-d'
                                        },
                                        {
                                            'name': 'hkid',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'passport',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'nationality',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'children',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'correspond',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'married',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'email_bills',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'email_promo',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'image',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'proposer',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'seconder',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'applied',
                                            'type': 'date',
                                            'dateFormat': 'Y-m-d'
                                        },
                                        {
                                            'name': 'application_number',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'remarks',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'use_autopay',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'bank',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'account',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'limit_amount',
                                            'type': 'float'
                                        },
                                        {
                                            'name': 'account_name',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'bill_address',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'outstanding',
                                            'type': 'float'
                                        },
                                        {
                                            'name': 'year_total',
                                            'type': 'float'
                                        },
                                        {
                                            'name': 'month_total',
                                            'type': 'float'
                                        },
                                        {
                                            'name': 'brought_forward',
                                            'type': 'float'
                                        },
                                        {
                                            'name': 'hkarea',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'last_payment_due',
                                            'type': 'date',
                                            'dateFormat': 'Y-m-d'
                                        },
                                        {
                                            'name': 'join_date',
                                            'type': 'date',
                                            'dateFormat': 'Y-m-d'
                                        },
                                        {
                                            'name': 'deposit_note',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'has_wireless',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'status_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'status_name',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'status_short_name',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'member_type_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'member_type_charge_code',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'member_type_name',
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
                                displayMsg : "Displaying members{0} - {1} of {2}",
                                emptyMsg : "No members found"
                            },
                            toolbar : {
                                xtype: 'Toolbar',
                                xns: Roo,
                                items : [
                                    {
                                        xtype: 'TextField',
                                        xns: Roo.form,
                                        listeners : {
                                            render : function (_self)
                                            {
                                            _this.searchBox=  _self;
                                            },
                                            specialkey : function (_self, e)
                                            {
                                            _this.grid.footer.onClick('first');
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
                                        xtype: 'Separator',
                                        xns: Roo.Toolbar
                                    },
                                    {
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        listeners : {
                                            render : function (_self)
                                            {
                                                _this.pages = _this.pages || {};
                                                _this.pages['members'] = _self;
                                            },
                                            click : function (_self, e)
                                            {
                                              _this.grid.footer.onClick('first');
                                            }
                                        },
                                        enableToggle : true,
                                        pressed : true,
                                        text : "Members",
                                        toggleGroup : 'pages'
                                    },
                                    {
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        listeners : {
                                            render : function (_self)
                                            {
                                                _this.pages = _this.pages || {};
                                                _this.pages['contractors'] = _self;
                                            },
                                            click : function (_self, e)
                                            {
                                              _this.grid.footer.onClick('first');
                                            }
                                        },
                                        enableToggle : true,
                                        pressed : false,
                                        text : "Contractors",
                                        toggleGroup : 'pages'
                                    },
                                    {
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        listeners : {
                                            render : function (_self)
                                            {
                                                _this.pages = _this.pages || {};
                                                _this.pages['staff'] = _self;
                                            },
                                            click : function (_self, e)
                                            {
                                              _this.grid.footer.onClick('first');
                                            }
                                        },
                                        enableToggle : true,
                                        pressed : false,
                                        text : "Staff",
                                        toggleGroup : 'pages'
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
                                            //    if (!_this.dialog) return;
                                            
                                                for(var k in _this.pages) {
                                                    if (!_this.pages[k].pressed) {
                                                        continue;
                                                    }
                                                    switch(k) {
                                                        case 'members':
                                                            Pman.Dialog.Member.show( { id : 0 } , function() { _this.grid.footer.onClick('first'); });
                                                            break;
                                                        case 'contractors':
                                                            Pman.Dialog.Contractor.show( { id : 0 } , function() { _this.grid.footer.onClick('first'); });
                                                            break;
                                                        case 'staff':
                                                            Pman.Dialog.Member.show( { member_code : 'X' } , function() { _this.grid.footer.onClick('first'); });
                                                            break;
                                                    }
                                                
                                                }
                                            /*    _this.dialog.show( { id : 0 } , function() {
                                                    _this.grid.footer.onClick('first');
                                               }); */
                                            }
                                        },
                                        cls : 'x-btn-text-icon',
                                        text : "Add",
                                        icon : Roo.rootURL + 'images/default/dd/drop-add.gif'
                                    }
                                ]
                            },
                            colModel : [
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'code',
                                    header : 'Code',
                                    width : 60,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'name',
                                    header : 'Name',
                                    width : 150,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'name_zh',
                                    header : 'Name zh',
                                    width : 150,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'status_name',
                                    header : 'Status',
                                    width : 100,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'member_type_name',
                                    header : 'Member type',
                                    width : 100,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'hkarea',
                                    header : 'HK Area',
                                    width : 100,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'correspond_address',
                                    header : 'Address',
                                    width : 200,
                                    renderer : function(v) { return String.format('{0}', v).replace(/\n/g,'<br/>'); }
                                }
                            ]
                        }
                    },
                    {
                        xtype: 'ContentPanel',
                        xns: Roo,
                        listeners : {
                            render : function (_self)
                            {
                              _this.member_cp = _self; 
                              return;
                            },
                            activate : function (_self)
                            {
                               /* try {
                                    var id = _this.form.findField('id').getValue() * 1;
                                    if (!id) {
                                        throw "oops";
                                    }
                                } catch(e) {
                                    _this.cp.region.showPanel(0);
                                    return;
                                }
                                if(!_this.cp_form){
                                    return;
                                }
                                */
                                if(!_this.selectedCode){
                                    //_this.panel.layout.getRegion('center').showPanel(0);
                                    return;
                                }
                                this.load({
                                    url: baseURL + '/backend/members_view/'+_this.selectedCode+'.html?body_only=1',
                                    scripts: false,
                                    method: 'GET'
                                });
                                   
                            }
                        },
                        autoScroll : true,
                        fitToFrame : true,
                        region : 'center',
                        title : "Details",
                        items : [
                            {
                                xtype: 'Form',
                                xns: Roo.form,
                                listeners : {
                                    actioncomplete : function(_self,action)
                                    {
                                        if (action.type == 'setdata') {
                                        
                                            Roo.log('setdata');
                                           
                                           return;
                                        }
                                        if (action.type == 'load') {
                                            Roo.log('load');
                                    
                                            return;
                                        }
                                        if (action.type =='submit') {
                                           
                                            return;
                                        }
                                    },
                                    rendered : function (form)
                                    {
                                        _this.cp_form= form;
                                        
                                    
                                    }
                                },
                                method : 'POST',
                                style : 'margin:10px;',
                                items : [
                                    {
                                        xtype: 'Hidden',
                                        xns: Roo.form,
                                        name : 'id'
                                    }
                                ]
                            }
                        ],
                        toolbar : {
                            xtype: 'Toolbar',
                            xns: Roo,
                            items : [
                                {
                                    xtype: 'Separator',
                                    xns: Roo.Toolbar
                                },
                                {
                                    xtype: 'Button',
                                    xns: Roo.Toolbar,
                                    listeners : {
                                        click : function (_self, e)
                                        {
                                            
                                            for(var k in _this.pages) {
                                                if (!_this.pages[k].pressed) {
                                                    continue;
                                                }
                                                switch(k) {
                                                    case 'contractors':
                                                        Pman.Dialog.Contractor.show( { id : _this.selectedCode } , function() { _this.grid.footer.onClick('first'); });
                                                        break;
                                                    case 'members':
                                                    case 'staff':
                                                        Pman.Dialog.Member.show( { id : _this.selectedCode } , function() { _this.grid.footer.onClick('first'); });
                                                        break;
                                                }
                                            
                                            }
                                        }
                                    },
                                    text : "Edit"
                                },
                                {
                                    xtype: 'Fill',
                                    xns: Roo.Toolbar
                                }
                            ]
                        }
                    },
                    {
                        xtype: 'ContentPanel',
                        xns: Roo,
                        listeners : {
                            render : function (_self)
                            {
                              _this.accounting_cp = _self;
                              (function () { _this.member_cp.region.showPanel(0)} ).defer(100);
                              return;
                            },
                            activate : function (_self)
                            {
                               /* try {
                                    var id = _this.form.findField('id').getValue() * 1;
                                    if (!id) {
                                        throw "oops";
                                    }
                                } catch(e) {
                                    _this.cp.region.showPanel(0);
                                    return;
                                }
                                if(!_this.cp_form){
                                    return;
                                }
                                */
                                 
                            /*    if(is_contractor){
                                    _this.member_cp.region.showPanel(0);
                                    return;
                                }*/
                                if(!_this.selectedCode){
                                    //_this.panel.layout.getRegion('center').showPanel(0);
                                    return;
                                }
                                 _this.accounting_cp.load({
                                    url: baseURL + '/edit2/member_accounts/'+_this.selectedCode+'.html?body_only=1',
                                    scripts: false,
                                    method: 'GET'
                                });
                            }
                        },
                        autoScroll : true,
                        fitToFrame : true,
                        region : 'center',
                        title : "Accounting",
                        items : [
                            {
                                xtype: 'Form',
                                xns: Roo.form,
                                listeners : {
                                    actioncomplete : function(_self,action)
                                    {
                                        if (action.type == 'setdata') {
                                        
                                            Roo.log('setdata');
                                           
                                           return;
                                        }
                                        if (action.type == 'load') {
                                            Roo.log('load');
                                    
                                            return;
                                        }
                                        if (action.type =='submit') {
                                           
                                            return;
                                        }
                                    },
                                    rendered : function (form)
                                    {
                                        _this.cp_form= form;
                                        
                                    
                                    }
                                },
                                method : 'POST',
                                style : 'margin:10px;',
                                items : [
                                    {
                                        xtype: 'Hidden',
                                        xns: Roo.form,
                                        name : 'id'
                                    }
                                ]
                            }
                        ],
                        toolbar : {
                            xtype: 'Toolbar',
                            xns: Roo,
                            items : [
                                {
                                    xtype: 'Button',
                                    xns: Roo.Toolbar,
                                    listeners : {
                                        click : function (_self, e)
                                        {
                                             _this.accounting_cp.load({
                                                url: baseURL + '/edit2/member_accounts/'+_this.selectedCode+'.html?body_only=1',
                                                scripts: false,
                                                method: 'GET'
                                            });
                                        }
                                    },
                                    enableToggle : true,
                                    pressed : true,
                                    text : "Edit Bank Details",
                                    toggleGroup : 'pages'
                                },
                                {
                                    xtype: 'Button',
                                    xns: Roo.Toolbar,
                                    listeners : {
                                        click : function (_self, e)
                                        {
                                            _this.accounting_cp.load({
                                                url: baseURL + '/edit2/account_transaction/'+_this.selectedCode+'.html?body_only=1&isCredit=0',
                                                scripts: false,
                                                method: 'GET'
                                            });
                                        }
                                    },
                                    enableToggle : true,
                                    pressed : false,
                                    text : "Add Bill or Charge",
                                    toggleGroup : 'pages'
                                },
                                {
                                    xtype: 'Button',
                                    xns: Roo.Toolbar,
                                    listeners : {
                                        click : function (_self, e)
                                        {
                                            _this.accounting_cp.load({
                                                url: baseURL + '/edit2/account_transaction/'+_this.selectedCode+'.html?body_only=1',
                                                scripts: false,
                                                method: 'GET'
                                            });
                                        }
                                    },
                                    enableToggle : true,
                                    pressed : false,
                                    text : "Credit Member",
                                    toggleGroup : 'pages'
                                },
                                {
                                    xtype: 'Button',
                                    xns: Roo.Toolbar,
                                    listeners : {
                                        click : function (_self, e)
                                        {
                                            _this.accounting_cp.load({
                                                url: baseURL + '/backend/PromoCredits/'+_this.selectedCode+'.html?body_only=1',
                                                scripts: false,
                                                method: 'GET'
                                            });
                                        }
                                    },
                                    enableToggle : true,
                                    pressed : false,
                                    text : "Promotional Credits",
                                    toggleGroup : 'pages'
                                },
                                {
                                    xtype: 'Button',
                                    xns: Roo.Toolbar,
                                    listeners : {
                                        click : function (_self, e)
                                        {
                                            _this.accounting_cp.load({
                                                url: baseURL + '/Accounts/viewBill/'+_this.selectedCode+'.html?body_only=1&isCredit=0',
                                                scripts: false,
                                                method: 'GET'
                                            });
                                        }
                                    },
                                    enableToggle : true,
                                    pressed : false,
                                    text : "Bill",
                                    toggleGroup : 'pages'
                                },
                                {
                                    xtype: 'Button',
                                    xns: Roo.Toolbar,
                                    listeners : {
                                        click : function (_self, e)
                                        {
                                            _this.accounting_cp.load({
                                                url: baseURL + '/browse2/account_transaction.html?find[member]='+_this.selectedCode+'&find[payments]=no&body_only=1',
                                                scripts: false,
                                                method: 'GET'
                                            });
                                        }
                                    },
                                    enableToggle : true,
                                    pressed : false,
                                    text : "Transactions",
                                    toggleGroup : 'pages'
                                },
                                {
                                    xtype: 'Button',
                                    xns: Roo.Toolbar,
                                    listeners : {
                                        click : function (_self, e)
                                        {
                                            _this.accounting_cp.load({
                                                url: baseURL + '/browse2/account_transaction.html?find[member]='+_this.selectedCode+'&find[payments]=yes&body_only=1',
                                                scripts: false,
                                                method: 'GET'
                                            });
                                        }
                                    },
                                    enableToggle : true,
                                    pressed : false,
                                    text : "Payments",
                                    toggleGroup : 'pages'
                                }
                            ]
                        }
                    }
                ],
                center : {
                    xtype: 'LayoutRegion',
                    xns: Roo
                }
            }
        };
    }
});
