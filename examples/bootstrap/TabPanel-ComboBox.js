

Roo.example = Roo.example || {};

Roo.example.combobox = new Roo.XComponent({
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
            el : new Roo.bootstrap.Body()
        }
        this.parent.el.layout = false;
        this.parent.el.render(document.body);
        
        var _this = this;
        var MODULE = this;
        var baseURL = '/web.eventmanager/demo.local.php';
        
        return {
            xtype: 'Body',
            xns: Roo.bootstrap,
            items : [
                 {
                    '|xns' : 'Roo.bootstrap',
                    xtype : 'Container',
                    cls : 'content',
                    xns : Roo.bootstrap,
                    style : 'margin-top:100px',
                    items : [
                    	{
                            '|xns' : 'Roo.bootstrap',
                            xtype : 'Container',
                            cls : 'pad-wrapper',
                            xns : Roo.bootstrap,
                            items : [
                            	{
                                    '|xns' : 'Roo.bootstrap',
                                    xtype : 'Container',
                                    cls : 'container alpha',
                                    xns : Roo.bootstrap,
                                    items : [
                                    	{
                                            '|xns' : 'Roo.bootstrap',
                                            xtype : 'Container',
                                            xns : Roo.bootstrap,
                                            items : [
                                            	{
                                                    '|xns' : 'Roo.bootstrap',
                                                    xtype : 'NavSimplebar',
                                                    xns : Roo.bootstrap,
                                                    items : [
                                                    	{
                                                            '|xns' : 'Roo.bootstrap',
                                                            navId : '#top',
                                                            xtype : 'NavGroup',
                                                            xns : Roo.bootstrap,
                                                            type : 'pills',
                                                            listeners : {
                                                            	render : function (_self)
                                                            	   {
                                                            	        _this.navGroup = this;
                                                            	   }
                                                            },
                                                            items : [
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    tabId : '#one',
                                                                    xtype : 'NavItem',
                                                                    preventDefault : true,
                                                                    html : 1,
                                                                    xns : Roo.bootstrap,
                                                                    active : true,
                                                                    listeners : {
                                                                    	render : function (_self)
                                                                    	   {
                                                                    	      _this.one = this;
                                                                    	      
                                                                    	   }
                                                                    }
                                                                },
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    tabId : '#two',
                                                                    xtype : 'NavItem',
                                                                    preventDefault : true,
                                                                    html : 2,
                                                                    xns : Roo.bootstrap,
                                                                    active : false,
                                                                    listeners : {
                                                                    	render : function (_self)
                                                                    	   {
                                                                    	      _this.two = this;
                                                                    	      
                                                                    	   }
                                                                    }
                                                                }
                                                            ]

                                                        }
                                                    ]

                                                },
                                            	{
                                                    '|xns' : 'Roo.bootstrap',
                                                    striped : true,
                                                    xtype : 'Progress',
                                                    xns : Roo.bootstrap,
                                                    active : true,
                                                    items : [
                                                    	{
                                                            '|xns' : 'Roo.bootstrap',
                                                            aria_valuenow : 0,
                                                            xtype : 'ProgressBar',
                                                            aria_valuemax : 12,
                                                            aria_valuemin : 0,
                                                            xns : Roo.bootstrap,
                                                            listeners : {
                                                            	render : function (_self) {
                                                            	       _this.progressBar = _self;
                                                            	   }
                                                            }
                                                        }
                                                    ]

                                                },
                                            	{
                                                    '|xns' : 'Roo.bootstrap',
                                                    labelAlign : 'top',
                                                    url : baseURL + '/Roo/Campaign_detail',
                                                    splitURL : function() {
                                                        var httpBtn = ['redirection_url', 'terms_and_conditions_url'];
                                                        
                                                        Roo.each(httpBtn, function(v){
                                                            if(!_this.form.findField(v).getValue().length){
                                                                return;
                                                            }
                                                            
                                                            var re = new RegExp('http://|https://', 'g');
                                                            var b = re.exec(_this.form.findField(v).getValue());
                                                            
                                                            if(!b || !b[0].length){
                                                                return;
                                                            }
                                                            
                                                            _this[v + '_httpBtn'].setText(b[0]);
                                                            _this.form.findField(v).setValue(_this.form.findField(v).getValue().replace(b[0], ''));
                                                        }); 
                                                    },
                                                    previewMail : function(method) {
                                                        var id = _this.form.findField('id').getValue() * 1;
                                                        
                                                        if(!id || id < 1){
                                                            Roo.MessageBox.alert('Error', 'Invalid Campaign');
                                                            return;
                                                        }
                                                        
                                                        _this.form.restore();
                                                        
                                                        Roo.Ajax.request({
                                                            url : baseURL + '/Roo/Campaign_detail',
                                                            method: 'POST',
                                                            params: _this.form.getValues(),
                                                            success : function(r)
                                                            {
                                                                var res = Roo.decode(r.responseText);
                                                                
                                                                if(!res.success){
                                                                    Roo.MessageBox.alert('Error', res.errorMsg);
                                                                    return;
                                                                }
                                                    
                                                                _this.form.splitURL();
                                                                preview();
                                                                
                                                                return;
                                                            }
                                                        });
                                                        
                                                        var preview = function()
                                                        {
                                                            
                                                            
                                                            Campaign.Dialog.EmailPreview.show(
                                                                {
                                                                    id : id,
                                                                    method : method,
                                                                }, 
                                                                function(){
                                                                    Roo.MessageBox.alert('Notice', 'Sent');
                                                                }
                                                            );
                                                        }
                                                    },
                                                    validate : function() 
                                                    {
                                                        var fields = {
                                                            setup : ['name', 'start_dt', 'end_dt', 'redirection_url', 'winner_draw_dt', 'winner_send_dt', 'sorry_send_dt', 'email_explaination', 'campaign_sender_email', 'campaign_sender_name'],
                                                            landing : ['landing_header', 'm1_call_to_action'],
                                                            thanks : {
                                                                        url : ['complete_redirect_url'],
                                                                        template : ['complete_content']
                                                            },
                                                            thanksEmail : ['thanks_email_subject','thanks_email_message'],
                                                            sms : ['winner_sms_message', 'winner_email_message','winner_email_subject'],
                                                            sorry : ['sorry_email_message','sorry_email_subject'],
                                                            booking : ['m1_visit_message','m1_visit_subject'],
                                                            preview : [],
                                                            publish : []
                                                        }
                                                        
                                                        if(typeof(pattern) != 'undefined' && pattern == 'm1'){
                                                            fields['landing'].push('m1_visit_question', 'm1_visit_range_min', 'm1_visit_range_max', 'm1_visit_city_question');
                                                            fields['setup'].push('m1_hotel_name', 'm1_hotel_location', 'm1_visit_send_week', 'm1_visit_send_day', 'm1_visit_send_time');
                                                        }else{
                                                            fields['setup'].push('m2_restaurant_name', 'm2_restaurant_location');
                                                        }
                                                        
                                                        var valid = true;
                                                        
                                                        if(_this.activePage === 'thanks'){
                                                            var radio = _this.form.findField('complete_action_id_name').getGroupValue();
                                                            if(!radio.length){
                                                                return false;
                                                            }
                                                            
                                                            Roo.each(fields[_this.activePage][radio], function(f){
                                                                var value = _this.form.findField(f).getRawValue();
                                                                if(!value || !value.length){
                                                                    _this.form.findField(f).markInvalid();
                                                                    valid = false;
                                                                }
                                                            })
                                                            
                                                            return valid;
                                                        }
                                                        
                                                        Roo.each(fields[_this.activePage], function(f){
                                                        
                                                            if(!_this.form.findField(f).validate()){
                                                                valid = false;
                                                            }
                                                        })
                                                        
                                                        return valid;
                                                    },
                                                    xtype : 'Form',
                                                    method : 'POST',
                                                    replaceField : function() 
                                                    {
                                                        Roo.log("replaceFields (on form 1 called)");
                                                        
                                                        var fields = {
                                                            landing : {
                                                                landing_header : ['{name}', '{m_name}'],
                                                                m1_call_to_action : ['{name}', '{m_name}', '{m_location}'],
                                                                m1_visit_question : ['{m_location}'],
                                                                m1_visit_city_question : ['{m_location}'],
                                                            }
                                                        }
                                                    
                                                        for (var key in fields[_this.activePage]) {
                                                            var ar = fields[_this.activePage][key];
                                                    
                                                            Roo.each(ar, function(f){
                                                                var value = _this.form.findField(key).getValue();
                                                                var re = new RegExp(f, 'g');
                                                                _this.form.findField(key).setValue(value.replace(re, _this.form.findField(fieldMatching[f]).getValue()));
                                                            })
                                                       }
                                                        
                                                    },
                                                    restore : function() {
                                                        var httpBtn = ['redirection_url', 'terms_and_conditions_url'];
                                                        
                                                        Roo.each(httpBtn, function(v){
                                                            if(!_this.form.findField(v).getValue().length){
                                                                return;
                                                            }
                                                            
                                                            var re = new RegExp('http://|https://', 'g');
                                                            var b = re.exec(_this.form.findField(v).getValue());
                                                            
                                                            if(!b || !b[0].length){
                                                                _this.form.findField(v).setValue(_this[v + '_httpBtn'].getText() + _this.form.findField(v).getValue());
                                                                return;
                                                            }
                                                            
                                                            _this.form.findField(v).setValue(_this[v + '_httpBtn'].getText() + _this.form.findField(v).getValue().replace(b[0], ''));
                                                            
                                                        }); 
                                                    },
                                                    xns : Roo.bootstrap,
                                                    listeners : {
                                                    	render : function (_self) {
                                                    	       _this.form = _self;
                                                    	   }
                                                    },
                                                    items : [
                                                    	{
                                                            '|xns' : 'Roo.bootstrap',
                                                            xtype : 'TabGroup',
                                                            style : 'margin-top:20px;',
                                                            xns : Roo.bootstrap,
                                                            navId : '#top',
                                                            carousel : true,
                                                            items : [
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    tabId : '#basic',
                                                                    xtype : 'TabPanel',
                                                                    xns : Roo.bootstrap,
                                                                    navId : '#top',
                                                                    active : true,
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            level : 4,
                                                                            xtype : 'Header',
                                                                            html : 'Your Basic Details',
                                                                            xns : Roo.bootstrap
                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Container',
                                                                            well : 'md',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    labelAlign : 'top',
                                                                                                    fieldLabel : 'Family Name',
                                                                                                    xtype : 'Input',
                                                                                                    allowBlank : true,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    name : 'lastname'
                                                                                                }
                                                                                            ]

                                                                                        },
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    labelAlign : 'top',
                                                                                                    fieldLabel : 'Family Name - Local Language (optional)',
                                                                                                    xtype : 'Input',
                                                                                                    allowBlank : true,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    name : 'lastname_alt'
                                                                                                }
                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    labelAlign : 'top',
                                                                                                    fieldLabel : 'Given Name',
                                                                                                    xtype : 'Input',
                                                                                                    allowBlank : true,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    name : 'firstname'
                                                                                                }
                                                                                            ]

                                                                                        },
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    labelAlign : 'top',
                                                                                                    fieldLabel : 'Given Name - Local Language (optional)',
                                                                                                    xtype : 'Input',
                                                                                                    allowBlank : true,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    name : 'firstname_alt'
                                                                                                }
                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    allowBlank : false,
                                                                                                    name : 'birth_date',
                                                                                                    format : 'd/M/Y',
                                                                                                    xtype : 'DateField',
                                                                                                    placeholder : 'Day/Month/Year',
                                                                                                    xns : Roo.bootstrap,
                                                                                                    fieldLabel : 'Date of Birth',
                                                                                                    before : '<i class=\"fa fa-clock-o\"></i>',
                                                                                                    disableKeyFilter : true
                                                                                                }
                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                }
                                                                            ]

                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            level : 4,
                                                                            xtype : 'Header',
                                                                            html : 'Your Plans',
                                                                            xns : Roo.bootstrap
                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Container',
                                                                            xns : Roo.bootstrap,
                                                                            well : 'md',
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        data : [
                                                                                                            ['I am actively looking for work','YES'],
                                                                                                            [
                                                                                                                'Would consider a relivant offer',
                                                                                                                'MAYBE'
                                                                                                            ],
                                                                                                            [ 
                                                                                                               'Not currently interesetd unless meets aspirational goals',
                                                                                                               'ASPIRE'
                                                                                                            ]
                                                                                                        ],
                                                                                                        xtype : 'SimpleStore',
                                                                                                        xns : Roo.data,
                                                                                                        fields : [ 'label','value' ]
                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    selectOnFocus : true,
                                                                                                    mode : 'local',
                                                                                                    name : '',
                                                                                                    valueField : 'value',
                                                                                                    xtype : 'ComboBox',
                                                                                                    editable : false,
                                                                                                    triggerAction : 'all',
                                                                                                    alwaysQuery : true,
                                                                                                    placeholder : '',
                                                                                                    listWidth : 400,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    tpl : '<div class=\"select2-result\"><b>{label}</b></div>',
                                                                                                    fieldLabel : 'How would you describe your career plans',
                                                                                                    hiddenName : 'employ_plan',
                                                                                                    displayField : 'label',
                                                                                                    forceSelection : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	      // this.setValue('Individual');
                                                                                                    	      this.el.select('span').removeClass('btn');
                                                                                                    	   },
                                                                                                    	select : function (combo, record, index)
                                                                                                    	   {
                                                                                                    	       
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

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
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    tabId : '#country',
                                                                    xtype : 'TabPanel',
                                                                    xns : Roo.bootstrap,
                                                                    navId : '#top',
                                                                    active : false,
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            level : 4,
                                                                            xtype : 'Header',
                                                                            html : 'Country and Languages',
                                                                            xns : Roo.bootstrap
                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Container',
                                                                            well : 'md',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        proxy : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'HttpProxy',
                                                                                                            xns : Roo.data,
                                                                                                            method : 'GET',
                                                                                                            url : baseURL+'/Geoip/Country'
                                                                                                        },
                                                                                                        reader : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'JsonReader',
                                                                                                            xns : Roo.data,
                                                                                                            fields : [
                                                                                                                {
                                                                                                                    'name': 'id',
                                                                                                                    'type': 'int'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'name',
                                                                                                                    'type': 'string'
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        xtype : 'Store',
                                                                                                        xns : Roo.data,
                                                                                                        sortInfo : {field:"name",direction:"ASC"},
                                                                                                        listeners : {
                                                                                                        	beforeload : function (_self, options)
                                                                                                        	   {
                                                                                                        	           
                                                                                                        	   }
                                                                                                        },
                                                                                                        items : [

                                                                                                        ]

                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    name : 'country',
                                                                                                    minChars : 2,
                                                                                                    valueField : 'id',
                                                                                                    queryParam : 'query[name]',
                                                                                                    typeAhead : true,
                                                                                                    xtype : 'ComboBox',
                                                                                                    triggerAction : 'all',
                                                                                                    editable : true,
                                                                                                    alwaysQuery : true,
                                                                                                    listWidth : 500,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    tpl : '<div class=\"select2-result\"><b>{name}</b></div>',
                                                                                                    fieldLabel : 'Country of Residence',
                                                                                                    hiddenName : 'country',
                                                                                                    displayField : 'name',
                                                                                                    append : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	      this.el.select('span').removeClass('btn');
                                                                                                    	   },
                                                                                                    	select : function (combo, record, index)
                                                                                                    	   {
                                                                                                    	       this.opt_id = record.data.id;
                                                                                                    	       _this.country = this;
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

                                                                                                    ]

                                                                                                }
                                                                                            ]

                                                                                        },
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        proxy : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'HttpProxy',
                                                                                                            xns : Roo.data,
                                                                                                            method : 'GET',
                                                                                                            url : baseURL+'/Geoip/City'
                                                                                                        },
                                                                                                        reader : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'JsonReader',
                                                                                                            fields : [
                                                                                                                {
                                                                                                                    'name': 'id',
                                                                                                                    'type': 'int'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'name',
                                                                                                                    'type': 'string'
                                                                                                                }
                                                                                                                
                                                                                                            ],
                                                                                                            xns : Roo.data
                                                                                                        },
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        xtype : 'Store',
                                                                                                        xns : Roo.data,
                                                                                                        sortInfo : {field:"name",direction:"ASC"},
                                                                                                        listeners : {
                                                                                                        	beforeload : function (_self, options)
                                                                                                        	   {
                                                                                                        	           options.params.country_id = _this.country.opt_id;
                                                                                                        	   }
                                                                                                        },
                                                                                                        items : [

                                                                                                        ]

                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    name : 'city',
                                                                                                    minChars : 2,
                                                                                                    valueField : 'id',
                                                                                                    queryParam : 'query[name]',
                                                                                                    typeAhead : true,
                                                                                                    xtype : 'ComboBox',
                                                                                                    triggerAction : 'all',
                                                                                                    editable : true,
                                                                                                    alwaysQuery : true,
                                                                                                    listWidth : 500,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    tpl : '<div class=\"select2-result\"><b>{name}</b></div>',
                                                                                                    fieldLabel : 'City',
                                                                                                    hiddenName : 'city',
                                                                                                    displayField : 'name',
                                                                                                    append : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	      this.el.select('span').removeClass('btn');
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

                                                                                                    ]

                                                                                                }
                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        proxy : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'HttpProxy',
                                                                                                            xns : Roo.data,
                                                                                                            method : 'GET',
                                                                                                            url : baseURL+'/Roo/Core_enum'
                                                                                                        },
                                                                                                        reader : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'JsonReader',
                                                                                                            xns : Roo.data,
                                                                                                            fields : [
                                                                                                                {
                                                                                                                    'name': 'id',
                                                                                                                    'type': 'int'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'name',
                                                                                                                    'type': 'string'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'display_name',
                                                                                                                    'type': 'string'
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        xtype : 'Store',
                                                                                                        sortInfo : {field:"display_name",direction:"ASC"},
                                                                                                        xns : Roo.data,
                                                                                                        listeners : {
                                                                                                        	beforeload : function (_self, options)
                                                                                                        	   {
                                                                                                        	           options.params.etype='Hydra.LanguageSpoken';
                                                                                                        	           
                                                                                                        	           var selected = _this.lang.getValue();
                                                                                                        	           if(selected.length){
                                                                                                        	               options.params._skip = selected;
                                                                                                        	           }
                                                                                                        	   }
                                                                                                        },
                                                                                                        items : [

                                                                                                        ]

                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    minChars : 2,
                                                                                                    name : '',
                                                                                                    valueField : 'id',
                                                                                                    queryParam : 'query[search]',
                                                                                                    xtype : 'ComboBox',
                                                                                                    triggerAction : 'all',
                                                                                                    editable : false,
                                                                                                    alwaysQuery : true,
                                                                                                    listWidth : 500,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    tpl : '<div class=\"select2-result\"><b>{display_name}</b></div>',
                                                                                                    fieldLabel : 'First (Native) Language',
                                                                                                    hiddenName : 'lang',
                                                                                                    displayField : 'display_name',
                                                                                                    forceSelection : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	          this.el.select('span').removeClass('btn');
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

                                                                                                    ]

                                                                                                }
                                                                                            ]

                                                                                        },
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        proxy : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'HttpProxy',
                                                                                                            xns : Roo.data,
                                                                                                            method : 'GET',
                                                                                                            url : baseURL+'/Roo/Core_enum'
                                                                                                        },
                                                                                                        reader : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'JsonReader',
                                                                                                            fields : [
                                                                                                                {
                                                                                                                    'name': 'id',
                                                                                                                    'type': 'int'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'display_name',
                                                                                                                    'type': 'string'
                                                                                                                }
                                                                                                            ],
                                                                                                            xns : Roo.data
                                                                                                        },
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        xtype : 'Store',
                                                                                                        xns : Roo.data,
                                                                                                        sortInfo : {field:"display_name",direction:"ASC"},
                                                                                                        listeners : {
                                                                                                        	beforeload : function (_self, options)
                                                                                                        	   {
                                                                                                        	           options.params.etype='Hydra.LanguageSpoken';
                                                                                                        	           
                                                                                                        	           /*var selected = _this.lang.getValue();
                                                                                                        	           if(selected.length){
                                                                                                        	               options.params._skip = selected;
                                                                                                        	           }*/
                                                                                                        	   }
                                                                                                        },
                                                                                                        items : [

                                                                                                        ]

                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    minChars : 2,
                                                                                                    cls : 'col-md-12',
                                                                                                    name : '',
                                                                                                    valueField : 'id',
                                                                                                    editNotList : true,
                                                                                                    queryParam : 'query[search]',
                                                                                                    xtype : 'ComboBox',
                                                                                                    triggerAction : 'all',
                                                                                                    editable : true,
                                                                                                    alwaysQuery : true,
                                                                                                    listWidth : 400,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    fieldLabel : 'Other Languages Spoken',
                                                                                                    hiddenName : 'lang_multi',
                                                                                                    multiple : true,
                                                                                                    tickable : true,
                                                                                                    displayField : 'display_name',
                                                                                                    forceSelection : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       _this.lang = this;
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

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
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    active : false,
                                                                    xtype : 'TabPanel',
                                                                    xns : Roo.bootstrap,
                                                                    tabId : '#department',
                                                                    navId : '#top',
                                                                    listeners : {
                                                                    	changed : function (_self, state)
                                                                    	   {
                                                                    	       /*if(state){
                                                                    	           _this.aspired_dep.list.setWidth(Math.max(_this.aspired_dep.inputEl().getWidth(), _this.aspired_dep.minListWidth));
                                                                    	           _this.aspired_multi_roles.list.setWidth(Math.max(_this.aspired_multi_roles.inputEl().getWidth(), _this.aspired_multi_roles.minListWidth));
                                                                    	        
                                                                    	       }*/
                                                                    	   }
                                                                    },
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            level : 4,
                                                                            xtype : 'Header',
                                                                            html : 'Department',
                                                                            xns : Roo.bootstrap
                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Container',
                                                                            well : 'md',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            store : {
                                                                                                proxy : {
                                                                                                    '|xns' : 'Roo.data',
                                                                                                    url : baseURL+'/Roo/Core_enum',
                                                                                                    xtype : 'HttpProxy',
                                                                                                    xns : Roo.data,
                                                                                                    method : 'GET'
                                                                                                },
                                                                                                reader : {
                                                                                                    '|xns' : 'Roo.data',
                                                                                                    xtype : 'JsonReader',
                                                                                                    xns : Roo.data,
                                                                                                    fields : [
                                                                                                        {
                                                                                                            'name': 'id',
                                                                                                            'type': 'int'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'name',
                                                                                                            'type': 'string'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'display_name',
                                                                                                            'type': 'string'
                                                                                                        }
                                                                                                        
                                                                                                    ]
                                                                                                },
                                                                                                '|xns' : 'Roo.data',
                                                                                                xtype : 'Store',
                                                                                                remoteSort : true,
                                                                                                xns : Roo.data,
                                                                                                sortInfo : {field:'id',direction:'ASC'},
                                                                                                listeners : {
                                                                                                	beforeload : function (_self, options)
                                                                                                	   {
                                                                                                	    
                                                                                                	       options.params = options.params || {};
                                                                                                	       options.params.etype = 'Hydra.Department';
                                                                                                	      
                                                                                                	   }
                                                                                                },
                                                                                                items : [

                                                                                                ]

                                                                                            },
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            xtype : 'Table',
                                                                                            CellSelection : true,
                                                                                            xns : Roo.bootstrap,
                                                                                            RowSelection : true,
                                                                                            cm : [
                                                                                            	 {
                                                                                            	        '|xns' : 'Roo.grid',
                                                                                            	        header : 'Department',
                                                                                            	        dataIndex : 'display_name',
                                                                                            	        xtype : 'ColumnModel',
                                                                                            	        xns : Roo.grid
                                                                                            	    },
{
                                                                                            	        '|xns' : 'Roo.grid',
                                                                                            	        header : 'Current',
                                                                                            	        dataIndex : 'current',
                                                                                            	        xtype : 'ColumnModel',
                                                                                            	        xns : Roo.grid,
                                                                                            	        renderer : function(v) {  
                                                                                            	        
                                                                                            	            //var state = v> 0 ?  '-checked' : '';
                                                                                            	            //return '<img class="x-grid-check-icon' + state + '" src="/web.Hydra/roojs1/images/gray/s.gif"/>';
                                                                                            	            var state = (v && v.value> 0) ?  'checked="true"' : '';
                                                                                            	            var value = (v && v.value>0) ? v.id : 0;
                                                                                            	            return '<div class="form-group radio radio-primary"><input name="department_id" type="radio"'+state+'value="'+value+'"class="roo-radio"><label class="box-label"></label></div>';
                                                                                            	         }
                                                                                            	    },
{
                                                                                            	        '|xns' : 'Roo.grid',
                                                                                            	        header : 'Aspire',
                                                                                            	        dataIndex : 'aspire',
                                                                                            	        xtype : 'ColumnModel',
                                                                                            	        xns : Roo.grid,
                                                                                            	        renderer : function(v) {  
                                                                                            	            //var state = v> 0 ?  '-checked' : '';
                                                                                            	        
                                                                                            	            //return '<img class="x-grid-check-icon' + state + '" src="/web.Hydra/roojs1/images/gray/s.gif"/>';
                                                                                            	            var state = (v && v.value> 0) ?  'checked="true"' : '';
                                                                                            	            var value = (v && v.value>0) ? v.id : 0;
                                                                                            	            var disable = (v && v.value==2) ? 'disabled="true"' : '';
                                                                                            	            return '<div class="form-group checkbox checkbox-primary"><input name="aspire_dep_multi[]" type="checkbox"'+state+'value="'+value+'"'+disable+'class="roo-checkbox"><label class="box-label"></label></div>';              
                                                                                            	         }
                                                                                            	    }
                                                                                            ],
                                                                                            listeners : {
                                                                                            	render : function (_self)
                                                                                            	   {
                                                                                            	        _this.department = _self;
                                                                                            	       (function() { _self.store.load({}); }).defer(100)
                                                                                            	   },
                                                                                            	cellclick : function (_self, el, rowIndex, columnIndex, e)
                                                                                            	   {       
                                                                                            	       var cm = this.colModel.getColumnById(this.colModel.getColumnId(columnIndex));
                                                                                            	       if(cm.dataIndex == 'current'){
                                                                                            	           if(rowIndex == _this.department.cur){return;}
                                                                                            	           _this.department.asp = _this.department.asp || {};
                                                                                            	           for(var i=0;i<_this.department.ds.totalLength;i++){
                                                                                            	               var rec = _this.department.ds.getAt(i);      
                                                                                            	               rec.set('current',rowIndex == i ? {value:1,id:rec.data.id}: {value:0,id:rec.data.id});
                                                                                            	               rec.set('aspire', function(){
                                                                                            	                   if(rowIndex == i){  
                                                                                            	                       _this.department.asp[rowIndex] = {value:2,id:rec.data.id};                        
                                                                                            	                       return {value:2,id:rec.data.id};
                                                                                            	                   }
                                                                                            	                   if(_this.department.cur == i){    
                                                                                            	                       _this.department.asp[_this.department.cur] = {value:0,id:rec.data.id};              
                                                                                            	                       return {value:0,id:rec.data.id};
                                                                                            	                   }
                                                                                            	                   return _this.department.asp ? _this.department.asp[i] : {value:0};
                                                                                            	               }());
                                                                                            	           }
                                                                                            	           
                                                                                            	           //_this.department.asp[_this.department.cur] = 0;
                                                                                            	           _this.department.cur = rowIndex;        
                                                                                            	           //_this.department.asp[rowIndex] = 2;
                                                                                            	           
                                                                                            	           if(_this.department.selectChange === false){
                                                                                            	               _this.department.selectChange = true;
                                                                                            	           }
                                                                                            	           rec.commit();
                                                                                            	           return;
                                                                                            	       }
                                                                                            	       if (cm.dataIndex == 'aspire') {
                                                                                            	           var rec = _this.department.ds.getAt(rowIndex); 
                                                                                            	           if(rec.data.aspire && rec.data.aspire.value == 2){return;}         
                                                                                            	           rec.set('aspire', (rec.data.aspire && rec.data.aspire.value * 1) ? {value:0,id:rec.data.id} : {value:1,id:rec.data.id});            
                                                                                            	           _this.department.asp = _this.department.asp || {};
                                                                                            	           
                                                                                            	           _this.department.asp[rowIndex] = {value:(rec.data.aspire ? rec.data.aspire.value : 1),id:rec.data.id};
                                                                                            	           
                                                                                            	           
                                                                                            	           
                                                                                            	           if(_this.department.selectChange === false){
                                                                                            	               _this.department.selectChange = true;
                                                                                            	           }
                                                                                            	           rec.commit();
                                                                                            	           return;
                                                                                            	        }
                                                                                            	           
                                                                                            	        
                                                                                            	   }
                                                                                            },
                                                                                            items : [

                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                }
                                                                            ]

                                                                        }
                                                                    ]

                                                                },
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    active : false,
                                                                    xtype : 'TabPanel',
                                                                    xns : Roo.bootstrap,
                                                                    tabId : '#role',
                                                                    navId : '#top',
                                                                    listeners : {
                                                                    	changed : function (_self, state)
                                                                    	   {
                                                                    	       if(state){
                                                                    	           
                                                                    	           if(_this.department.selectChange === true){
                                                                    	                _this.department.selectChange = false;
                                                                    	                _this.role.cur = -1;
                                                                    	                _this.role.asp = {};
                                                                    	               (function() { _this.role.store.load({}); }).defer(100)
                                                                    	           }
                                                                    	           //_this.aspired_dep.list.setWidth(Math.max(_this.aspired_dep.inputEl().getWidth(), _this.aspired_dep.minListWidth));
                                                                    	           //_this.aspired_multi_roles.list.setWidth(Math.max(_this.aspired_multi_roles.inputEl().getWidth(), _this.aspired_multi_roles.minListWidth));
                                                                    	       }
                                                                    	   }
                                                                    },
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            level : 4,
                                                                            xtype : 'Header',
                                                                            html : 'Role',
                                                                            xns : Roo.bootstrap
                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Container',
                                                                            xns : Roo.bootstrap,
                                                                            style : 'margin-top:25px;',
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            cls : 'alert alert-danger alert-dismissable',
                                                                                            xtype : 'Container',
                                                                                            xns : Roo.bootstrap,
                                                                                            html : '<i class=\"fa fa-ban\"></i><b>Alert!</b> Please select a department.',
                                                                                            style : 'display:block',
                                                                                            listeners : {
                                                                                            	render : function (_self)
                                                                                            	   {
                                                                                            	       _this.roleAlert = this;
                                                                                            	   }
                                                                                            }
                                                                                        }
                                                                                    ]

                                                                                }
                                                                            ]

                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Container',
                                                                            well : 'md',
                                                                            xns : Roo.bootstrap,
                                                                            listeners : {
                                                                            	render : function (_self)
                                                                            	   {
                                                                            	       _this.roleContainer = this;
                                                                            	   }
                                                                            },
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            store : {
                                                                                                proxy : {
                                                                                                    '|xns' : 'Roo.data',
                                                                                                    url : baseURL+'/Roo/Core_enum',
                                                                                                    xtype : 'HttpProxy',
                                                                                                    xns : Roo.data,
                                                                                                    method : 'GET'
                                                                                                },
                                                                                                reader : {
                                                                                                    '|xns' : 'Roo.data',
                                                                                                    xtype : 'JsonReader',
                                                                                                    fields : [
                                                                                                        {
                                                                                                            'name': 'id',
                                                                                                            'type': 'int'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'name',
                                                                                                            'type': 'string'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'display_name',
                                                                                                            'type': 'string'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'current',
                                                                                                            'type': 'int'
                                                                                                        }
                                                                                                        
                                                                                                    ],
                                                                                                    xns : Roo.data
                                                                                                },
                                                                                                '|xns' : 'Roo.data',
                                                                                                xtype : 'Store',
                                                                                                remoteSort : true,
                                                                                                xns : Roo.data,
                                                                                                sortInfo : {field:'id',direction:'ASC'},
                                                                                                listeners : {
                                                                                                	update : function (_self, record, operation)
                                                                                                	   {
                                                                                                	       if (operation != Roo.data.Record.COMMIT) {
                                                                                                	           return;
                                                                                                	       }
                                                                                                	       
                                                                                                	   },
                                                                                                	beforeload : function (_self, options)
                                                                                                	   {
                                                                                                	    
                                                                                                	       options.params = options.params || {};
                                                                                                	       options.params.etype = 'Hydra.RoleDescription';
                                                                                                	       if(_this.role.dep_asp_suffix){
                                                                                                	           options.params.dep_asp_suffix = _this.role.dep_asp_suffix.toString();
                                                                                                	       }
                                                                                                	       if(_this.role.dep_cur_suffix){
                                                                                                	           options.params.dep_cur_suffix = _this.role.dep_cur_suffix;
                                                                                                	       }
                                                                                                	       
                                                                                                	       
                                                                                                	   }
                                                                                                },
                                                                                                items : [

                                                                                                ]

                                                                                            },
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            xtype : 'Table',
                                                                                            CellSelection : true,
                                                                                            xns : Roo.bootstrap,
                                                                                            RowSelection : true,
                                                                                            cm : [
                                                                                            	 {
                                                                                            	        '|xns' : 'Roo.grid',
                                                                                            	        header : 'Role',
                                                                                            	        dataIndex : 'display_name',
                                                                                            	        xtype : 'ColumnModel',
                                                                                            	        xns : Roo.grid
                                                                                            	    },
{
                                                                                            	        '|xns' : 'Roo.grid',
                                                                                            	        header : 'Current',
                                                                                            	        dataIndex : 'current',
                                                                                            	        xtype : 'ColumnModel',
                                                                                            	        xns : Roo.grid,
                                                                                            	        renderer : function(v) {  
                                                                                            	        
                                                                                            	            //var state = v> 0 ?  '-checked' : '';
                                                                                            	            //return '<img class="x-grid-check-icon' + state + '" src="/web.Hydra/roojs1/images/gray/s.gif"/>';
                                                                                            	            if(v == -1) return '';
                                                                                            	            var state = (v && v.value> 0) ?  'checked="true"' : '';
                                                                                            	            var value = (v && v.value> 0) ? v.id : 0;
                                                                                            	            return '<div class="form-group radio radio-primary" ><input name="role_id" type="radio"'+state+'value="'+value+'"class="roo-radio"><label class="box-label"></label></div>';
                                                                                            	         }
                                                                                            	    },
{
                                                                                            	        '|xns' : 'Roo.grid',
                                                                                            	        header : 'Aspire',
                                                                                            	        dataIndex : 'aspire',
                                                                                            	        xtype : 'ColumnModel',
                                                                                            	        xns : Roo.grid,
                                                                                            	        renderer : function(v) {  
                                                                                            	            //var state = v> 0 ?  '-checked' : '';
                                                                                            	            //return '<img class="x-grid-check-icon' + state + '" src="/web.Hydra/roojs1/images/gray/s.gif"/>';
                                                                                            	           var state = (v && v.value> 0) ?  'checked="true"' : '';
                                                                                            	            var value = (v && v.value> 0) ? v.id : 0;
                                                                                            	            var disable = (v && v.value==2) ? 'disabled="true"' : '';
                                                                                            	            return '<div class="form-group checkbox checkbox-primary"><input name="aspire_role_multi[]" type="checkbox"'+state+'value="'+value+'"'+disable+'class="roo-checkbox"><label class="box-label"></label></div>';                 
                                                                                            	         }
                                                                                            	    }
                                                                                            ],
                                                                                            listeners : {
                                                                                            	cellclick : function (_self, el, rowIndex, columnIndex, e)
                                                                                            	   {
                                                                                            	       
                                                                                            	       var cm = this.colModel.getColumnById(this.colModel.getColumnId(columnIndex));
                                                                                            	       if(cm.dataIndex == 'current'){       
                                                                                            	           var rec = _this.role.ds.getAt(rowIndex);
                                                                                            	           if(rec.data.current == -1 || rowIndex == _this.role.cur){return;} 
                                                                                            	           _this.role.asp = _this.role.asp || {};
                                                                                            	           for(var i=0;i<_this.role.ds.totalLength;i++){
                                                                                            	               var rec = _this.role.ds.getAt(i);
                                                                                            	               rec.set('current',function(){
                                                                                            	                   if(rec.data.current == -1){
                                                                                            	                       return -1;
                                                                                            	                   }
                                                                                            	                   if(rowIndex == i){
                                                                                            	                       return {value:1,id:rec.data.id};
                                                                                            	                   }
                                                                                            	                   return {value:0,id:rec.data.id};
                                                                                            	               }());
                                                                                            	               //rowIndex == i ? {value:1,id:rec.data.id}: {value:0,id:rec.data.id});
                                                                                            	               rec.set('aspire', function(){
                                                                                            	                   if(rowIndex == i){
                                                                                            	                       _this.role.asp[rowIndex] = {value:2,id:rec.data.id};
                                                                                            	                       return {value:2,id:rec.data.id};
                                                                                            	                   }
                                                                                            	                   if(_this.role.cur == i){
                                                                                            	                       _this.role.asp[_this.role.cur] = {value:0,id:rec.data.id};
                                                                                            	                       return {value:0,id:rec.data.id};
                                                                                            	                   }
                                                                                            	                   return _this.role.asp ? _this.role.asp[i] : {value:0};
                                                                                            	               }());
                                                                                            	           }
                                                                                            	           
                                                                                            	           _this.role.cur = rowIndex;
                                                                                            	           
                                                                                            	           rec.commit();
                                                                                            	           return;
                                                                                            	       }
                                                                                            	       if (cm.dataIndex == 'aspire') {
                                                                                            	           var rec = _this.role.ds.getAt(rowIndex); 
                                                                                            	           if(rec.data.aspire && rec.data.aspire.value == 2){return;}        
                                                                                            	           rec.set('aspire', (rec.data.aspire && rec.data.aspire.value * 1) ? {value:0,id:rec.data.id} : {value:1,id:rec.data.id}); 
                                                                                            	           _this.role.asp = _this.role.asp || {};
                                                                                            	           _this.role.asp[rowIndex] = {value:(rec.data.aspire ? rec.data.aspire.value : 1),id:rec.data.id};       
                                                                                            	           rec.commit();
                                                                                            	           return;
                                                                                            	           
                                                                                            	       }
                                                                                            	        
                                                                                            	   },
                                                                                            	render : function (_self)
                                                                                            	   {
                                                                                            	        _this.role = _self;
                                                                                            	        _this.department.selectChange = false;
                                                                                            	       (function() { _self.store.load({}); }).defer(100)
                                                                                            	   }
                                                                                            },
                                                                                            items : [

                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                }
                                                                            ]

                                                                        }
                                                                    ]

                                                                },
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    active : false,
                                                                    xtype : 'TabPanel',
                                                                    xns : Roo.bootstrap,
                                                                    tabId : '#employment',
                                                                    navId : '#top',
                                                                    listeners : {
                                                                    	changed : function (_self, state)
                                                                    	   {
                                                                    	       if(state){
                                                                    	           //_this.aspired_dep.list.setWidth(Math.max(_this.aspired_dep.inputEl().getWidth(), _this.aspired_dep.minListWidth));
                                                                    	           //_this.aspired_multi_roles.list.setWidth(Math.max(_this.aspired_multi_roles.inputEl().getWidth(), _this.aspired_multi_roles.minListWidth));
                                                                    	        
                                                                    	       }
                                                                    	   }
                                                                    },
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            level : 4,
                                                                            xtype : 'Header',
                                                                            html : 'Your Current / Most Recent Employment',
                                                                            xns : Roo.bootstrap
                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Container',
                                                                            well : 'md',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    labelAlign : 'top',
                                                                                                    fieldLabel : 'Job Title',
                                                                                                    xtype : 'Input',
                                                                                                    allowBlank : true,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    name : 'job_title'
                                                                                                }
                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    allowBlank : false,
                                                                                                    name : 'employ_start_date',
                                                                                                    format : 'd/M/Y',
                                                                                                    xtype : 'DateField',
                                                                                                    placeholder : 'Day/Month/Year',
                                                                                                    xns : Roo.bootstrap,
                                                                                                    fieldLabel : 'Started Employment with current company',
                                                                                                    before : '<i class=\"fa fa-clock-o\"></i>',
                                                                                                    after : '<i class=\"fa fa-info-circle\"></i>',
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       var help = this.el.select('span.roo-input-after', true).first();
                                                                                                    	       
                                                                                                    	       help.setStyle('cursor', 'pointer');
                                                                                                    	       
                                                                                                    	       help.on('click', function(){
                                                                                                    	           /*if(typeof(settings['help_url']) != 'undefined' && settings['help_url'].length){
                                                                                                    	               window.open(settings['help_url'] + '#' + _self.name, '_blank');
                                                                                                    	               return;
                                                                                                    	           }*/
                                                                                                    	           
                                                                                                    	           Roo.bootstrap.MessageBox.alert('Error', 'No help url has been set!');
                                                                                                    	           
                                                                                                    	       });
                                                                                                    	   }
                                                                                                    }
                                                                                                }
                                                                                            ]

                                                                                        },
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        proxy : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'HttpProxy',
                                                                                                            xns : Roo.data,
                                                                                                            method : 'GET',
                                                                                                            url : baseURL+'/Roo/Core_enum'
                                                                                                        },
                                                                                                        reader : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'JsonReader',
                                                                                                            xns : Roo.data,
                                                                                                            fields : [
                                                                                                                {
                                                                                                                    'name': 'id',
                                                                                                                    'type': 'int'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'name',
                                                                                                                    'type': 'string'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'display_name',
                                                                                                                    'type': 'string'
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        xtype : 'Store',
                                                                                                        xns : Roo.data,
                                                                                                        sortInfo : {field:'name',direction:'ASC'},
                                                                                                        listeners : {
                                                                                                        	beforeload : function (_self, options)
                                                                                                        	   {
                                                                                                        	           options.params.etype='Hydra.Tenure';
                                                                                                        	   }
                                                                                                        },
                                                                                                        items : [

                                                                                                        ]

                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    name : '',
                                                                                                    minChars : 2,
                                                                                                    valueField : 'id',
                                                                                                    queryParam : 'query[search]',
                                                                                                    xtype : 'ComboBox',
                                                                                                    editable : false,
                                                                                                    triggerAction : 'all',
                                                                                                    alwaysQuery : true,
                                                                                                    listWidth : 400,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    tpl : '<div class=\"select2-result\"><b>{display_name}</b></div>',
                                                                                                    fieldLabel : 'Years in this role',
                                                                                                    hiddenName : 'tenure_id',
                                                                                                    displayField : 'display_name',
                                                                                                    forceSelection : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       this.el.select('span').removeClass('btn');
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

                                                                                                    ]

                                                                                                }
                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        data : [
                                                                                                            ['YES','Current Employed'],
                                                                                                            ['NO','Left']
                                                                                                        ],
                                                                                                        xtype : 'SimpleStore',
                                                                                                        xns : Roo.data,
                                                                                                        fields : [ 'value','label' ]
                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    selectOnFocus : true,
                                                                                                    name : '',
                                                                                                    mode : 'local',
                                                                                                    valueField : 'value',
                                                                                                    xtype : 'ComboBox',
                                                                                                    editable : false,
                                                                                                    triggerAction : 'all',
                                                                                                    alwaysQuery : true,
                                                                                                    listWidth : 400,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    tpl : '<div class=\"select2-result\"><b>{label}</b></div>',
                                                                                                    fieldLabel : 'Current Status',
                                                                                                    hiddenName : 'employ_status',
                                                                                                    displayField : 'label',
                                                                                                    forceSelection : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       //this.setValue('Current Employed');
                                                                                                    	       this.el.select('span').removeClass('btn');
                                                                                                    	   },
                                                                                                    	select : function (combo, record, index)
                                                                                                    	   {
                                                                                                    	       if(index == 1){
                                                                                                    	           _this.leaving_date.el.show();
                                                                                                    	       }else{
                                                                                                    	           _this.leaving_date.el.hide();
                                                                                                    	       }
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

                                                                                                    ]

                                                                                                }
                                                                                            ]

                                                                                        },
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    allowBlank : false,
                                                                                                    name : 'employ_end_date',
                                                                                                    format : 'd/M/Y',
                                                                                                    xtype : 'DateField',
                                                                                                    placeholder : 'Day/Month/Year',
                                                                                                    xns : Roo.bootstrap,
                                                                                                    fieldLabel : 'Last day of employment with this company',
                                                                                                    before : '<i class=\"fa fa-clock-o\"></i>',
                                                                                                    after : '<i class=\"fa fa-info-circle\"></i>',
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       var help = this.el.select('span.roo-input-after', true).first();
                                                                                                    	       
                                                                                                    	       help.setStyle('cursor', 'pointer');
                                                                                                    	       
                                                                                                    	       help.on('click', function(){
                                                                                                    	           /*if(typeof(settings['help_url']) != 'undefined' && settings['help_url'].length){
                                                                                                    	               window.open(settings['help_url'] + '#' + _self.name, '_blank');
                                                                                                    	               return;
                                                                                                    	           }*/
                                                                                                    	           
                                                                                                    	           Roo.bootstrap.MessageBox.alert('Error', 'No help url has been set!');
                                                                                                    	           
                                                                                                    	       });
                                                                                                    	       _this.leaving_date = this;
                                                                                                    	       this.el.setVisibilityMode(Roo.Element.DISPLAY);
                                                                                                    	       this.el.hide();
                                                                                                    	   }
                                                                                                    }
                                                                                                }
                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        proxy : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'HttpProxy',
                                                                                                            xns : Roo.data,
                                                                                                            method : 'GET',
                                                                                                            url : baseURL+'/Roo/Core_enum'
                                                                                                        },
                                                                                                        reader : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'JsonReader',
                                                                                                            xns : Roo.data,
                                                                                                            fields : [
                                                                                                                {
                                                                                                                    'name': 'id',
                                                                                                                    'type': 'int'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'name',
                                                                                                                    'type': 'string'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'display_name',
                                                                                                                    'type': 'string'
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        xtype : 'Store',
                                                                                                        xns : Roo.data,
                                                                                                        sortInfo : {field:'name',direction:'ASC'},
                                                                                                        listeners : {
                                                                                                        	beforeload : function (_self, options)
                                                                                                        	   {
                                                                                                        	           //options.params.etype='Hydra.Tenure';
                                                                                                        	           options.params.etype='Hydra.ManagmentScaleStaff';
                                                                                                        	   }
                                                                                                        },
                                                                                                        items : [

                                                                                                        ]

                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    name : '',
                                                                                                    minChars : 2,
                                                                                                    valueField : 'id',
                                                                                                    queryParam : 'query[search]',
                                                                                                    xtype : 'ComboBox',
                                                                                                    editable : false,
                                                                                                    triggerAction : 'all',
                                                                                                    alwaysQuery : true,
                                                                                                    listWidth : 400,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    tpl : '<div class=\"select2-result\"><b>{display_name}</b></div>',
                                                                                                    fieldLabel : 'Number of staff you have been in charge of',
                                                                                                    hiddenName : 'tenure_id',
                                                                                                    displayField : 'display_name',
                                                                                                    forceSelection : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       this.el.select('span').removeClass('btn');
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

                                                                                                    ]

                                                                                                }
                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        proxy : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'HttpProxy',
                                                                                                            xns : Roo.data,
                                                                                                            method : 'GET',
                                                                                                            url : baseURL+'/Roo/Core_enum'
                                                                                                        },
                                                                                                        reader : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'JsonReader',
                                                                                                            fields : [
                                                                                                                {
                                                                                                                    'name': 'id',
                                                                                                                    'type': 'int'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'display_name',
                                                                                                                    'type': 'string'
                                                                                                                }
                                                                                                            ],
                                                                                                            xns : Roo.data
                                                                                                        },
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        xtype : 'Store',
                                                                                                        remoteSort : true,
                                                                                                        xns : Roo.data,
                                                                                                        sortInfo : {field:'display_name',direction:'ASC'},
                                                                                                        listeners : {
                                                                                                        	beforeload : function (_self, options)
                                                                                                        	   {
                                                                                                        	           options.params.etype='Hydra.Employer';
                                                                                                        	   }
                                                                                                        },
                                                                                                        items : [

                                                                                                        ]

                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    selectOnFocus : true,
                                                                                                    minChars : 2,
                                                                                                    name : '',
                                                                                                    valueField : 'id',
                                                                                                    queryParam : 'query[complete]',
                                                                                                    xtype : 'ComboBox',
                                                                                                    editable : true,
                                                                                                    triggerAction : 'all',
                                                                                                    alwaysQuery : true,
                                                                                                    listWidth : 400,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    tpl : '<div class=\"select2-result\"><b>{display_name}</b></div>',
                                                                                                    fieldLabel : 'Current Employer',
                                                                                                    hiddenName : 'employer_id',
                                                                                                    displayField : 'display_name',
                                                                                                    forceSelection : false,
                                                                                                    append : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       //this.setValue('Current Employed');
                                                                                                    	       this.el.select('span').removeClass('btn');
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

                                                                                                    ]

                                                                                                }
                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 12,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    name : 'hide_from_employer',
                                                                                                    xtype : 'CheckBox',
                                                                                                    boxLabel : 'If this employer is looking to hire, <u>we will NOT</u> submit you to preserve your integrity',
                                                                                                    xns : Roo.bootstrap
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
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    active : false,
                                                                    xtype : 'TabPanel',
                                                                    xns : Roo.bootstrap,
                                                                    tabId : '#senior',
                                                                    navId : '#top',
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            level : 4,
                                                                            xtype : 'Header',
                                                                            html : 'Seniority',
                                                                            xns : Roo.bootstrap
                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Container',
                                                                            well : 'md',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            store : {
                                                                                                proxy : {
                                                                                                    '|xns' : 'Roo.data',
                                                                                                    url : baseURL+'/Roo/Core_enum',
                                                                                                    xtype : 'HttpProxy',
                                                                                                    xns : Roo.data,
                                                                                                    method : 'GET'
                                                                                                },
                                                                                                reader : {
                                                                                                    '|xns' : 'Roo.data',
                                                                                                    xtype : 'JsonReader',
                                                                                                    xns : Roo.data,
                                                                                                    fields : [
                                                                                                        {
                                                                                                            'name': 'id',
                                                                                                            'type': 'int'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'name',
                                                                                                            'type': 'string'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'display_name',
                                                                                                            'type': 'string'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'current',
                                                                                                            'type': 'int'
                                                                                                        }
                                                                                                        
                                                                                                    ]
                                                                                                },
                                                                                                '|xns' : 'Roo.data',
                                                                                                xtype : 'Store',
                                                                                                remoteSort : true,
                                                                                                xns : Roo.data,
                                                                                                sortInfo : {field:'name',direction:'DESC'},
                                                                                                listeners : {
                                                                                                	update : function (_self, record, operation)
                                                                                                	   {
                                                                                                	       if (operation != Roo.data.Record.COMMIT) {
                                                                                                	           return;
                                                                                                	       }
                                                                                                	       
                                                                                                	   },
                                                                                                	beforeload : function (_self, options)
                                                                                                	   {
                                                                                                	    
                                                                                                	       options.params = options.params || {};
                                                                                                	       options.params.etype = 'Hydra.SeniorityTitle';
                                                                                                	      
                                                                                                	   }
                                                                                                },
                                                                                                items : [

                                                                                                ]

                                                                                            },
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            xtype : 'Table',
                                                                                            CellSelection : true,
                                                                                            xns : Roo.bootstrap,
                                                                                            RowSelection : true,
                                                                                            cm : [
                                                                                            	 {
                                                                                            	        '|xns' : 'Roo.grid',
                                                                                            	        header : 'Seniority',
                                                                                            	        dataIndex : 'display_name',
                                                                                            	        xtype : 'ColumnModel',
                                                                                            	        xns : Roo.grid
                                                                                            	    },
{
                                                                                            	        '|xns' : 'Roo.grid',
                                                                                            	        header : 'Current',
                                                                                            	        dataIndex : 'current',
                                                                                            	        xtype : 'ColumnModel',
                                                                                            	        xns : Roo.grid,
                                                                                            	        renderer : function(v) {  
                                                                                            	        
                                                                                            	            //var state = v> 0 ?  '-checked' : '';
                                                                                            	            //return '<img class="x-grid-check-icon' + state + '" src="/web.Hydra/roojs1/images/gray/s.gif"/>';
                                                                                            	            
                                                                                            	            
                                                                                            	            var state = (v && v.value> 0) ?  'checked="true"' : '';
                                                                                            	            var value = (v && v.value>0) ? v.id : 0;
                                                                                            	            return '<div class="form-group radio radio-primary" ><input name="seniority_id" type="radio"'+state+'value="'+value+'"class="roo-radio"><label class="box-label"></label></div>';           
                                                                                            	         }
                                                                                            	    },
{
                                                                                            	        '|xns' : 'Roo.grid',
                                                                                            	        header : 'Aspire',
                                                                                            	        dataIndex : 'aspire',
                                                                                            	        xtype : 'ColumnModel',
                                                                                            	        xns : Roo.grid,
                                                                                            	        renderer : function(v) {  
                                                                                            	        
                                                                                            	            if(v == -1){
                                                                                            	                return;
                                                                                            	            }
                                                                                            	            //var state = v> 0 ?  '-checked' : '';
                                                                                            	            //return '<img class="x-grid-check-icon' + state + '" src="/web.Hydra/roojs1/images/gray/s.gif"/>';
                                                                                            	            
                                                                                            	            
                                                                                            	            var state = (v&&v.value> 0) ?  'checked="true"' : '';
                                                                                            	            var value = (v&&v.value>0) ? v.id : 0;
                                                                                            	            var disable = (v&&v.value==2) ? 'disabled="true"' : '';
                                                                                            	            return '<div class="form-group checkbox checkbox-primary"><input name="aspire_seniority_multi[]" type="checkbox"'+state+'value="'+value+'"'+disable+'class="roo-checkbox"><label class="box-label"></label></div>';                 
                                                                                            	         }
                                                                                            	    }
                                                                                            ],
                                                                                            listeners : {
                                                                                            	render : function (_self)
                                                                                            	   {
                                                                                            	        _this.seniority = _self;
                                                                                            	       (function() { _self.store.load({}); }).defer(100)
                                                                                            	   },
                                                                                            	cellclick : function (_self, el, rowIndex, columnIndex, e)
                                                                                            	   {
                                                                                            	       
                                                                                            	       var cm = this.colModel.getColumnById(this.colModel.getColumnId(columnIndex));
                                                                                            	       if(cm.dataIndex == 'current'){
                                                                                            	           for(var i=0;i<_this.seniority.ds.totalLength;i++){
                                                                                            	               var rec = _this.seniority.ds.getAt(i);
                                                                                            	               rec.set('current',rowIndex == i ? {value:1,id:rec.data.id}: {value:0,id:rec.data.id});
                                                                                            	               rec.set('aspire', function(){
                                                                                            	                   if(i == rowIndex-1 || i == rowIndex + 1 || i == rowIndex + 2){
                                                                                            	                       return {value:0,id:rec.data.id};
                                                                                            	                   }
                                                                                            	                   if(i == rowIndex){
                                                                                            	                       return {value:2,id:rec.data.id};
                                                                                            	                   }    
                                                                                            	                   return -1;
                                                                                            	               }());
                                                                                            	           }
                                                                                            	           rec.commit();
                                                                                            	           return;
                                                                                            	       }
                                                                                            	       if (cm.dataIndex == 'aspire') {
                                                                                            	           var rec = _this.seniority.ds.getAt(rowIndex);
                                                                                            	           if(rec.data.aspire == -1 || rec.data.aspire.value == 2){
                                                                                            	               return;
                                                                                            	           }          
                                                                                            	           rec.set('aspire', (rec.data.aspire && rec.data.aspire.value * 1) ? {value:0,id:rec.data.id} : {value:1,id:rec.data.id});         
                                                                                            	           rec.commit();
                                                                                            	           return;
                                                                                            	       }
                                                                                            	        
                                                                                            	   }
                                                                                            },
                                                                                            items : [

                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                }
                                                                            ]

                                                                        }
                                                                    ]

                                                                },
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    active : false,
                                                                    xtype : 'TabPanel',
                                                                    xns : Roo.bootstrap,
                                                                    tabId : '#industry',
                                                                    navId : '#top',
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            level : 4,
                                                                            xtype : 'Header',
                                                                            html : 'Industry Experience',
                                                                            xns : Roo.bootstrap
                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Container',
                                                                            well : 'md',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            store : {
                                                                                                proxy : {
                                                                                                    '|xns' : 'Roo.data',
                                                                                                    url : baseURL+'/Roo/Core_enum',
                                                                                                    xtype : 'HttpProxy',
                                                                                                    xns : Roo.data,
                                                                                                    method : 'GET'
                                                                                                },
                                                                                                reader : {
                                                                                                    '|xns' : 'Roo.data',
                                                                                                    xtype : 'JsonReader',
                                                                                                    xns : Roo.data,
                                                                                                    fields : [
                                                                                                        {
                                                                                                            'name': 'id',
                                                                                                            'type': 'int'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'name',
                                                                                                            'type': 'string'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'display_name',
                                                                                                            'type': 'string'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'current',
                                                                                                            'type': 'int'
                                                                                                        }
                                                                                                        
                                                                                                    ]
                                                                                                },
                                                                                                '|xns' : 'Roo.data',
                                                                                                xtype : 'Store',
                                                                                                remoteSort : true,
                                                                                                xns : Roo.data,
                                                                                                sortInfo : {field:'id',direction:'ASC'},
                                                                                                listeners : {
                                                                                                	update : function (_self, record, operation)
                                                                                                	   {
                                                                                                	       if (operation != Roo.data.Record.COMMIT) {
                                                                                                	           return;
                                                                                                	       }
                                                                                                	       
                                                                                                	   },
                                                                                                	beforeload : function (_self, options)
                                                                                                	   {
                                                                                                	    
                                                                                                	       options.params = options.params || {};
                                                                                                	       options.params.etype = 'Hydra.Specialisation';
                                                                                                	      
                                                                                                	   }
                                                                                                },
                                                                                                items : [

                                                                                                ]

                                                                                            },
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            xtype : 'Table',
                                                                                            CellSelection : true,
                                                                                            xns : Roo.bootstrap,
                                                                                            RowSelection : true,
                                                                                            cm : [
                                                                                            	 {
                                                                                            	        '|xns' : 'Roo.grid',
                                                                                            	        header : 'Industry Experience',
                                                                                            	        dataIndex : 'display_name',
                                                                                            	        xtype : 'ColumnModel',
                                                                                            	        xns : Roo.grid
                                                                                            	    },
{
                                                                                            	        '|xns' : 'Roo.grid',
                                                                                            	        header : 'Current',
                                                                                            	        dataIndex : 'current',
                                                                                            	        xtype : 'ColumnModel',
                                                                                            	        xns : Roo.grid,
                                                                                            	        renderer : function(v) {  
                                                                                            	        
                                                                                            	            //var state = v> 0 ?  '-checked' : '';
                                                                                            	            //return '<img class="x-grid-check-icon' + state + '" src="/web.Hydra/roojs1/images/gray/s.gif"/>';
                                                                                            	            var state = (v&&v.value> 0) ?  'checked="true"' : '';
                                                                                            	            var value = (v&&v.value>0) ? v.id : 0;
                                                                                            	            return '<div class="form-group checkbox checkbox-primary"><input name="current_industry_multi[]" type="checkbox"'+state+'value="'+value+'"'+'class="roo-checkbox"><label class="box-label"></label></div>';              
                                                                                            	         }
                                                                                            	    },
{
                                                                                            	        '|xns' : 'Roo.grid',
                                                                                            	        header : 'Aspire',
                                                                                            	        dataIndex : 'aspire',
                                                                                            	        xtype : 'ColumnModel',
                                                                                            	        xns : Roo.grid,
                                                                                            	        renderer : function(v) {  
                                                                                            	            //var state = v> 0 ?  '-checked' : '';
                                                                                            	            //return '<img class="x-grid-check-icon' + state + '" src="/web.Hydra/roojs1/images/gray/s.gif"/>';
                                                                                            	            var state = (v&&v.value> 0) ?  'checked="true"' : '';
                                                                                            	            var value = (v&&v.value>0) ? v.id : 0;
                                                                                            	            var disable = (v&&v.value==2) ? 'disabled="true"' : '';
                                                                                            	            return '<div class="form-group checkbox checkbox-primary"><input name="aspire_industry_multi[]" type="checkbox"'+state+'value="'+value+'"'+disable+'class="roo-checkbox"><label class="box-label"></label></div>';             
                                                                                            	         }
                                                                                            	    }
                                                                                            ],
                                                                                            listeners : {
                                                                                            	render : function (_self)
                                                                                            	   {
                                                                                            	        _this.industry = _self;
                                                                                            	       (function() { _self.store.load({}); }).defer(100)
                                                                                            	   },
                                                                                            	cellclick : function (_self, el, rowIndex, columnIndex, e)
                                                                                            	   {
                                                                                            	       
                                                                                            	       var cm = this.colModel.getColumnById(this.colModel.getColumnId(columnIndex));
                                                                                            	       if(cm.dataIndex == 'current'){
                                                                                            	           var rec = _this.industry.ds.getAt(rowIndex);
                                                                                            	           rec.set('current', (rec.data.current &&rec.data.current.value * 1) ? {value:0,id:rec.data.id}: {value:1,id:rec.data.id});
                                                                                            	           rec.set('aspire', (rec.data.current &&rec.data.current.value * 1) ? {value:2,id:rec.data.id}: {value:0,id:rec.data.id});
                                                                                            	           rec.commit();
                                                                                            	           return;
                                                                                            	       }
                                                                                            	       if (cm.dataIndex == 'aspire') {
                                                                                            	           var rec = _this.industry.ds.getAt(rowIndex); 
                                                                                            	           if(rec.data.aspire && rec.data.aspire.value == 2){return;}         
                                                                                            	           rec.set('aspire', (rec.data.current &&rec.data.current.value * 1) ? {value:0,id:rec.data.id}: {value:1,id:rec.data.id});         
                                                                                            	           rec.commit();
                                                                                            	           return;
                                                                                            	        }
                                                                                            	        
                                                                                            	   }
                                                                                            },
                                                                                            items : [

                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                }
                                                                            ]

                                                                        }
                                                                    ]

                                                                },
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    active : false,
                                                                    xtype : 'TabPanel',
                                                                    xns : Roo.bootstrap,
                                                                    tabId : '#salary',
                                                                    navId : '#top',
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            level : 4,
                                                                            xtype : 'Header',
                                                                            html : 'Academic and Salary level',
                                                                            xns : Roo.bootstrap
                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Container',
                                                                            well : 'md',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        proxy : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'HttpProxy',
                                                                                                            xns : Roo.data,
                                                                                                            method : 'GET',
                                                                                                            url : baseURL+'/Roo/Core_enum'
                                                                                                        },
                                                                                                        reader : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'JsonReader',
                                                                                                            xns : Roo.data,
                                                                                                            fields : [
                                                                                                                {
                                                                                                                    'name': 'id',
                                                                                                                    'type': 'int'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'display_name',
                                                                                                                    'type': 'string'
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        xtype : 'Store',
                                                                                                        xns : Roo.data,
                                                                                                        listeners : {
                                                                                                        	beforeload : function (_self, options)
                                                                                                        	   {
                                                                                                        	           options.params.etype='Hydra.AcademicLevel';
                                                                                                        	   }
                                                                                                        },
                                                                                                        items : [

                                                                                                        ]

                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    name : '',
                                                                                                    valueField : 'id',
                                                                                                    queryParam : 'query[search]',
                                                                                                    xtype : 'ComboBox',
                                                                                                    editable : false,
                                                                                                    triggerAction : 'all',
                                                                                                    alwaysQuery : true,
                                                                                                    listWidth : 500,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    tpl : '<div class=\"select2-result\"><b>{display_name}</b></div>',
                                                                                                    fieldLabel : 'Level Attained',
                                                                                                    hiddenName : 'academic_level_id',
                                                                                                    displayField : 'display_name',
                                                                                                    forceSelection : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       this.el.select('span').removeClass('btn');
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

                                                                                                    ]

                                                                                                }
                                                                                            ]

                                                                                        },
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        proxy : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'HttpProxy',
                                                                                                            xns : Roo.data,
                                                                                                            method : 'GET',
                                                                                                            url : baseURL+'/Roo/Core_enum'
                                                                                                        },
                                                                                                        reader : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'JsonReader',
                                                                                                            fields : [
                                                                                                                {
                                                                                                                    'name': 'id',
                                                                                                                    'type': 'int'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'display_name',
                                                                                                                    'type': 'string'
                                                                                                                }
                                                                                                            ],
                                                                                                            xns : Roo.data
                                                                                                        },
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        xtype : 'Store',
                                                                                                        xns : Roo.data,
                                                                                                        listeners : {
                                                                                                        	beforeload : function (_self, options)
                                                                                                        	   {
                                                                                                        	           options.params.etype='Hydra.AcademicLevel';
                                                                                                        	           options.params._blank_study = 1;
                                                                                                        	   }
                                                                                                        },
                                                                                                        items : [

                                                                                                        ]

                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    name : '',
                                                                                                    valueField : 'id',
                                                                                                    queryParam : 'query[search]',
                                                                                                    xtype : 'ComboBox',
                                                                                                    editable : false,
                                                                                                    triggerAction : 'all',
                                                                                                    alwaysQuery : true,
                                                                                                    listWidth : 500,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    tpl : '<div class=\"select2-result\"><b>{display_name}</b></div>',
                                                                                                    fieldLabel : 'Are you currently studying for',
                                                                                                    hiddenName : 'academic_study_id',
                                                                                                    displayField : 'display_name',
                                                                                                    forceSelection : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       this.el.select('span').removeClass('btn');
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

                                                                                                    ]

                                                                                                }
                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        proxy : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'HttpProxy',
                                                                                                            xns : Roo.data,
                                                                                                            method : 'GET',
                                                                                                            url : baseURL+'/Roo/Core_enum'
                                                                                                        },
                                                                                                        reader : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'JsonReader',
                                                                                                            fields : [
                                                                                                               {
                                                                                                                    'name': 'id',
                                                                                                                    'type': 'int'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'name',
                                                                                                                    'type': 'string'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'display_name',
                                                                                                                    'type': 'string'
                                                                                                                }
                                                                                                            ],
                                                                                                            xns : Roo.data
                                                                                                        },
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        xtype : 'Store',
                                                                                                        xns : Roo.data,
                                                                                                        sortInfo : {field:'name',direction:'ASC'},
                                                                                                        listeners : {
                                                                                                        	beforeload : function (_self, options)
                                                                                                        	   {
                                                                                                        	           options.params.etype='Hydra.SalaryRange';
                                                                                                        	   }
                                                                                                        },
                                                                                                        items : [

                                                                                                        ]

                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    name : '',
                                                                                                    minChars : 2,
                                                                                                    valueField : 'id',
                                                                                                    queryParam : 'query[search]',
                                                                                                    typeAhead : true,
                                                                                                    xtype : 'ComboBox',
                                                                                                    triggerAction : 'all',
                                                                                                    editable : false,
                                                                                                    alwaysQuery : true,
                                                                                                    listWidth : 400,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    tpl : '<div class=\"select2-result\"><b>{display_name}</b></div>',
                                                                                                    fieldLabel : 'Current salary range in your current role, base plus bonuses or on-target-earnings  is fine',
                                                                                                    hiddenName : 'salary_current_id',
                                                                                                    displayField : 'display_name',
                                                                                                    forceSelection : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       this.el.select('span').removeClass('btn');
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

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
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    active : false,
                                                                    xtype : 'TabPanel',
                                                                    xns : Roo.bootstrap,
                                                                    tabId : '#sales',
                                                                    navId : '#top',
                                                                    listeners : {
                                                                    	changed : function (_self, state)
                                                                    	   {
                                                                    	       if(state){
                                                                    	           _this.skill_vendor_multi.list.setWidth(Math.max(_this.skill_vendor_multi.inputEl().getWidth(), _this.skill_vendor_multi.minListWidth));
                                                                    	           _this.skill_solution_multi.list.setWidth(Math.max(_this.skill_solution_multi.inputEl().getWidth(), _this.skill_solution_multi.minListWidth));
                                                                    	          
                                                                    	       }
                                                                    	   }
                                                                    },
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            level : 4,
                                                                            xtype : 'Header',
                                                                            html : 'Sales Quotas / Details',
                                                                            xns : Roo.bootstrap
                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Container',
                                                                            well : 'md',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        proxy : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'HttpProxy',
                                                                                                            xns : Roo.data,
                                                                                                            method : 'GET',
                                                                                                            url : baseURL+'/Roo/Core_enum'
                                                                                                        },
                                                                                                        reader : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'JsonReader',
                                                                                                            fields : [
                                                                                                                {
                                                                                                                    'name': 'id',
                                                                                                                    'type': 'int'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'name',
                                                                                                                    'type': 'string'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'display_name',
                                                                                                                    'type': 'string'
                                                                                                                }
                                                                                                            ],
                                                                                                            xns : Roo.data
                                                                                                        },
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        xtype : 'Store',
                                                                                                        sortInfo : {field:'name',direction:'ASC'},
                                                                                                        xns : Roo.data,
                                                                                                        listeners : {
                                                                                                        	beforeload : function (_self, options)
                                                                                                        	   {
                                                                                                        	           options.params.etype='Hydra.RevenueScale';
                                                                                                        	   }
                                                                                                        },
                                                                                                        items : [

                                                                                                        ]

                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    name : '',
                                                                                                    minChars : 2,
                                                                                                    valueField : 'id',
                                                                                                    queryParam : 'query[search]',
                                                                                                    xtype : 'ComboBox',
                                                                                                    editable : false,
                                                                                                    triggerAction : 'all',
                                                                                                    alwaysQuery : true,
                                                                                                    listWidth : 400,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    tpl : '<div class=\"select2-result\"><b>{display_name}</b></div>',
                                                                                                    fieldLabel : 'Size of your Team or Division Revenue Quota',
                                                                                                    hiddenName : 'revenue_scale_id',
                                                                                                    displayField : 'display_name',
                                                                                                    forceSelection : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       this.el.select('span').removeClass('btn');
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

                                                                                                    ]

                                                                                                }
                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    labelAlign : 'top',
                                                                                                    fieldLabel : 'Approx US$ Value of your quota',
                                                                                                    xtype : 'Input',
                                                                                                    allowBlank : true,
                                                                                                    after : '<i class=\"fa fa-info-circle\"></i>',
                                                                                                    xns : Roo.bootstrap,
                                                                                                    name : 'sales_quota'
                                                                                                }
                                                                                            ]

                                                                                        },
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        data : [
                                                                                                            ['IND','an Individual'],
                                                                                                            ['MAN','a Manager for a team']
                                                                                                        ],
                                                                                                        xtype : 'SimpleStore',
                                                                                                        xns : Roo.data,
                                                                                                        fields : [ 'value','label' ]
                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    selectOnFocus : true,
                                                                                                    mode : 'local',
                                                                                                    name : '',
                                                                                                    valueField : 'value',
                                                                                                    xtype : 'ComboBox',
                                                                                                    editable : false,
                                                                                                    triggerAction : 'all',
                                                                                                    alwaysQuery : true,
                                                                                                    listWidth : 400,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    tpl : '<div class=\"select2-result\"><b>{label}</b></div>',
                                                                                                    fieldLabel : 'As',
                                                                                                    hiddenName : 'sales_quota_for',
                                                                                                    displayField : 'label',
                                                                                                    forceSelection : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       //this.setValue('Individual');
                                                                                                    	       this.el.select('span').removeClass('btn');
                                                                                                    	   },
                                                                                                    	select : function (combo, record, index)
                                                                                                    	   {
                                                                                                    	       
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

                                                                                                    ]

                                                                                                }
                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        proxy : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'HttpProxy',
                                                                                                            xns : Roo.data,
                                                                                                            method : 'GET',
                                                                                                            url : baseURL+'/Roo/Core_enum'
                                                                                                        },
                                                                                                        reader : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'JsonReader',
                                                                                                            fields : [
                                                                                                                {
                                                                                                                    'name': 'id',
                                                                                                                    'type': 'int'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'display_name',
                                                                                                                    'type': 'string'
                                                                                                                }
                                                                                                            ],
                                                                                                            xns : Roo.data
                                                                                                        },
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        xtype : 'Store',
                                                                                                        xns : Roo.data,
                                                                                                        sortInfo : {field:'display_name',direction:'ASC'},
                                                                                                        listeners : {
                                                                                                        	beforeload : function (_self, options)
                                                                                                        	   {
                                                                                                        	           options.params.etype='Hydra.Geo';
                                                                                                        	   }
                                                                                                        },
                                                                                                        items : [

                                                                                                        ]

                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    name : '',
                                                                                                    minChars : 2,
                                                                                                    valueField : 'id',
                                                                                                    queryParam : 'query[search]',
                                                                                                    typeAhead : true,
                                                                                                    xtype : 'ComboBox',
                                                                                                    editable : false,
                                                                                                    triggerAction : 'all',
                                                                                                    alwaysQuery : true,
                                                                                                    listWidth : 400,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    tpl : '<div class=\"select2-result\"><b>{display_name}</b></div>',
                                                                                                    fieldLabel : 'Geography you cover ',
                                                                                                    hiddenName : 'geo_cover_id',
                                                                                                    displayField : 'display_name',
                                                                                                    forceSelection : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       this.el.select('span').removeClass('btn');
                                                                                                    	   },
                                                                                                    	select : function (combo, record, index)
                                                                                                    	   {
                                                                                                    	       if(record.data.display_name == 'Worldwide'){
                                                                                                    	           _this.geo_cover_txt.el.hide();
                                                                                                    	       }else{
                                                                                                    	           _this.geo_cover_txt.el.show();
                                                                                                    	       }
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

                                                                                                    ]

                                                                                                }
                                                                                            ]

                                                                                        },
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    labelAlign : 'top',
                                                                                                    fieldLabel : 'Details (eg. country/city)',
                                                                                                    xtype : 'Input',
                                                                                                    allowBlank : true,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    name : 'geo_cover_txt',
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       _this.geo_cover_txt = this;
                                                                                                    	   }
                                                                                                    }
                                                                                                }
                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                }
                                                                            ]

                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            level : 4,
                                                                            xtype : 'Header',
                                                                            html : 'Your Skills ',
                                                                            xns : Roo.bootstrap
                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Container',
                                                                            well : 'md',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        proxy : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'HttpProxy',
                                                                                                            xns : Roo.data,
                                                                                                            method : 'GET',
                                                                                                            url : baseURL+'/Roo/Core_enum'
                                                                                                        },
                                                                                                        reader : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'JsonReader',
                                                                                                            xns : Roo.data,
                                                                                                            fields : [
                                                                                                                {
                                                                                                                    'name': 'id',
                                                                                                                    'type': 'int'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'name',
                                                                                                                    'type': 'string'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'display_name',
                                                                                                                    'type': 'string'
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        xtype : 'Store',
                                                                                                        sortInfo : {field:'display_name',direction:'ASC'},
                                                                                                        xns : Roo.data,
                                                                                                        listeners : {
                                                                                                        	beforeload : function (_self, options)
                                                                                                        	   {
                                                                                                        	       options.params.etype='Hydra.Vendors';
                                                                                                        	       var selected = _this.skill_vendor_multi.getValue();
                                                                                                        	       if(selected.length){
                                                                                                        	           options.params._skip = selected;
                                                                                                        	       }
                                                                                                        	   }
                                                                                                        },
                                                                                                        items : [

                                                                                                        ]

                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    minChars : 2,
                                                                                                    maxHeight : 400,
                                                                                                    name : '',
                                                                                                    valueField : 'id',
                                                                                                    editNotList : true,
                                                                                                    queryParam : 'query[search]',
                                                                                                    xtype : 'ComboBox',
                                                                                                    editable : true,
                                                                                                    triggerAction : 'all',
                                                                                                    alwaysQuery : true,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    fieldLabel : 'Vendor Experience',
                                                                                                    tpl : '<div class=\"select2-result\"><b>{display_name}</b></div>',
                                                                                                    hiddenName : 'skill_vendor_multi',
                                                                                                    multiple : true,
                                                                                                    displayField : 'display_name',
                                                                                                    forceSelection : true,
                                                                                                    append : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       _this.skill_vendor_multi = this;
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

                                                                                                    ]

                                                                                                },
                                                                                            	{
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    xtype : 'Table',
                                                                                                    xns : Roo.bootstrap
                                                                                                }
                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        proxy : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'HttpProxy',
                                                                                                            xns : Roo.data,
                                                                                                            method : 'GET',
                                                                                                            url : baseURL+'/Roo/Core_enum'
                                                                                                        },
                                                                                                        reader : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'JsonReader',
                                                                                                            fields : [
                                                                                                                {
                                                                                                                    'name': 'id',
                                                                                                                    'type': 'int'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'name',
                                                                                                                    'type': 'string'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'display_name',
                                                                                                                    'type': 'string'
                                                                                                                }
                                                                                                            ],
                                                                                                            xns : Roo.data
                                                                                                        },
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        xtype : 'Store',
                                                                                                        sortInfo : {field:'display_name',direction:'ASC'},
                                                                                                        xns : Roo.data,
                                                                                                        listeners : {
                                                                                                        	beforeload : function (_self, options)
                                                                                                        	   {
                                                                                                        	       options.params.etype='Hydra.Solutions';
                                                                                                        	       var selected = _this.skill_solution_multi.getValue();
                                                                                                        	       if(selected.length){
                                                                                                        	           options.params._skip = selected;
                                                                                                        	       }
                                                                                                        	   }
                                                                                                        },
                                                                                                        items : [

                                                                                                        ]

                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    minChars : 2,
                                                                                                    maxHeight : 400,
                                                                                                    name : '',
                                                                                                    valueField : 'id',
                                                                                                    editNotList : true,
                                                                                                    queryParam : 'query[search]',
                                                                                                    xtype : 'ComboBox',
                                                                                                    editable : true,
                                                                                                    triggerAction : 'all',
                                                                                                    alwaysQuery : true,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    fieldLabel : 'Solutions Experience',
                                                                                                    tpl : '<div class=\"select2-result\"><b>{display_name}</b></div>',
                                                                                                    hiddenName : 'skill_solution_multi',
                                                                                                    multiple : true,
                                                                                                    displayField : 'display_name',
                                                                                                    forceSelection : true,
                                                                                                    append : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       _this.skill_solution_multi = this;
                                                                                                    	       
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

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
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    active : false,
                                                                    xtype : 'TabPanel',
                                                                    xns : Roo.bootstrap,
                                                                    tabId : '#tech',
                                                                    navId : '#top',
                                                                    listeners : {
                                                                    	changed : function (_self, state)
                                                                    	   {
                                                                    	       if(state){
                                                                    	           _this.skill_tech_multi.list.setWidth(Math.max(_this.skill_tech_multi.inputEl().getWidth(), _this.skill_tech_multi.minListWidth));
                                                                    	           
                                                                    	       }
                                                                    	   }
                                                                    },
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            level : 4,
                                                                            xtype : 'Header',
                                                                            html : 'Your Skills ',
                                                                            xns : Roo.bootstrap
                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Container',
                                                                            well : 'md',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    store : {
                                                                                                        proxy : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'HttpProxy',
                                                                                                            xns : Roo.data,
                                                                                                            method : 'GET',
                                                                                                            url : baseURL+'/Roo/Core_enum'
                                                                                                        },
                                                                                                        reader : {
                                                                                                            '|xns' : 'Roo.data',
                                                                                                            xtype : 'JsonReader',
                                                                                                            fields : [
                                                                                                                {
                                                                                                                    'name': 'id',
                                                                                                                    'type': 'int'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'name',
                                                                                                                    'type': 'string'
                                                                                                                },
                                                                                                                {
                                                                                                                    'name': 'display_name',
                                                                                                                    'type': 'string'
                                                                                                                }
                                                                                                            ],
                                                                                                            xns : Roo.data
                                                                                                        },
                                                                                                        '|xns' : 'Roo.data',
                                                                                                        xtype : 'Store',
                                                                                                        xns : Roo.data,
                                                                                                        sortInfo : {field:'display_name',direction:'ASC'},
                                                                                                        listeners : {
                                                                                                        	beforeload : function (_self, options)
                                                                                                        	   {
                                                                                                        	       options.params.etype='Hydra.Skills';
                                                                                                        	       var selected = _this.skill_tech_multi.getValue();
                                                                                                        	       if(selected.length){
                                                                                                        	           options.params._skip = selected;
                                                                                                        	       }
                                                                                                        	   }
                                                                                                        },
                                                                                                        items : [

                                                                                                        ]

                                                                                                    },
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    maxHeight : 400,
                                                                                                    name : '',
                                                                                                    minChars : 2,
                                                                                                    valueField : 'id',
                                                                                                    editNotList : true,
                                                                                                    queryParam : 'query[search]',
                                                                                                    xtype : 'ComboBox',
                                                                                                    editable : true,
                                                                                                    triggerAction : 'all',
                                                                                                    alwaysQuery : true,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    fieldLabel : 'Technical Experience',
                                                                                                    tpl : '<div class=\"select2-result\"><b>{display_name}</b></div>',
                                                                                                    hiddenName : 'skill_tech_multi',
                                                                                                    multiple : true,
                                                                                                    displayField : 'display_name',
                                                                                                    forceSelection : true,
                                                                                                    append : true,
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       _this.skill_tech_multi = this;
                                                                                                    	   }
                                                                                                    },
                                                                                                    items : [

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
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    active : false,
                                                                    xtype : 'TabPanel',
                                                                    xns : Roo.bootstrap,
                                                                    tabId : '#details',
                                                                    navId : '#top',
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            level : 4,
                                                                            xtype : 'Header',
                                                                            html : 'Your Current Role',
                                                                            xns : Roo.bootstrap
                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Container',
                                                                            well : 'md',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 12,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    labelAlign : 'top',
                                                                                                    fieldLabel : 'Describe the role, major achievements in current role (in less that 300 words)',
                                                                                                    xtype : 'TextArea',
                                                                                                    allowBlank : true,
                                                                                                    rows : 15,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    name : 'role_desc_txt'
                                                                                                }
                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                }
                                                                            ]

                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            level : 4,
                                                                            xtype : 'Header',
                                                                            html : 'Your Aspirations',
                                                                            xns : Roo.bootstrap
                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Container',
                                                                            well : 'md',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 12,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    labelAlign : 'top',
                                                                                                    fieldLabel : 'Describe your career aspirations (in less that 300 words)',
                                                                                                    xtype : 'TextArea',
                                                                                                    allowBlank : true,
                                                                                                    xns : Roo.bootstrap,
                                                                                                    name : 'career_aspire'
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
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    active : false,
                                                                    xtype : 'TabPanel',
                                                                    xns : Roo.bootstrap,
                                                                    tabId : '#academic',
                                                                    navId : '#top',
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            level : 4,
                                                                            xtype : 'Header',
                                                                            html : 'Qualifications and Personal Information',
                                                                            xns : Roo.bootstrap
                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Container',
                                                                            xns : Roo.bootstrap,
                                                                            well : 'md',
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 12,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    labelAlign : 'top',
                                                                                                    fieldLabel : 'Professional Qualifications',
                                                                                                    xtype : 'TextArea',
                                                                                                    allowBlank : true,
                                                                                                    placeholder : 'Enter a short summary of your Professional Qualifications or Certificates',
                                                                                                    xns : Roo.bootstrap,
                                                                                                    name : 'academic_qualifications_txt',
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       this.el.select('textarea.form-control').setHeight(300);
                                                                                                    	   }
                                                                                                    }
                                                                                                }
                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 12,
                                                                                            xtype : 'Column',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                                    labelAlign : 'top',
                                                                                                    fieldLabel : 'Relivant Personal information - hobbies / interests',
                                                                                                    xtype : 'TextArea',
                                                                                                    allowBlank : true,
                                                                                                    placeholder : 'Enter any relivant personal info such as hobbies and other achievements',
                                                                                                    xns : Roo.bootstrap,
                                                                                                    name : 'personal_interests_txt',
                                                                                                    listeners : {
                                                                                                    	render : function (_self)
                                                                                                    	   {
                                                                                                    	       this.el.select('textarea.form-control').setHeight(300);
                                                                                                    	   }
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

                                                        },
                                                    	{
                                                            '|xns' : 'Roo.bootstrap',
                                                            inputType : 'hidden',
                                                            xtype : 'Input',
                                                            xns : Roo.bootstrap,
                                                            name : ''
                                                        }
                                                    ]

                                                },
                                            	{
                                                    '|xns' : 'Roo.bootstrap',
                                                    xtype : 'Row',
                                                    xns : Roo.bootstrap,
                                                    items : [
                                                    	{
                                                            '|xns' : 'Roo.bootstrap',
                                                            md : 6,
                                                            xtype : 'Column',
                                                            xns : Roo.bootstrap,
                                                            items : [
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    style : 'border-radius:15px;',
                                                                    xtype : 'Button',
                                                                    html : 'Previous',
                                                                    xns : Roo.bootstrap,
                                                                    weight : 'success',
                                                                    listeners : {
                                                                    	render : function (_self)
                                                                    	   {
                                                                    	       _this.bottomPreviousBtn = _self;
                                                                    	       this.disabled = true;
                                                                    	   },
                                                                    	click : function (_self, e)
                                                                    	   {
                                                                    	       if(_this.navGroup.getActive().html == 2){
                                                                    	           _this.basic.onClick(e);
                                                                    	           return;
                                                                    	       }
                                                                    	       if(_this.navGroup.getActive().html == 5){
                                                                    	           _this.roleNav.onClick(e);
                                                                    	           return;
                                                                    	       }
                                                                    	       _this.navGroup.setActivePrev();
                                                                    	       
                                                                    	       
                                                                    	       window.scroll(0,0);
                                                                    	   }
                                                                    }
                                                                }
                                                            ]

                                                        },
                                                    	{
                                                            '|xns' : 'Roo.bootstrap',
                                                            md : 6,
                                                            xtype : 'Column',
                                                            style : 'text-align:right',
                                                            xns : Roo.bootstrap,
                                                            items : [
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    style : 'border-radius:15px;',
                                                                    xtype : 'Button',
                                                                    html : 'Next',
                                                                    xns : Roo.bootstrap,
                                                                    weight : 'success',
                                                                    listeners : {
                                                                    	render : function (_self)
                                                                    	   {
                                                                    	       _this.bottomNextBtn = _self;
                                                                    	   },
                                                                    	click : function (_self, e)
                                                                    	   {
                                                                    	       if(_this.navGroup.getActive().html == 12){
                                                                    	           
                                                                    	       // form validation first, if necessary
                                                                    	           var submission = function(){
                                                                    	               new Pman.Request({
                                                                    	                   url: baseURL + '/Talent?_debug=1',
                                                                    	                   method: 'POST',
                                                                    	                   params: _this.form.getValues(),
                                                                    	                   success: function(res){
                                                                    	                       if(res.success){
                                                                    	                           var m = new Roo.bootstrap.Modal({ 
                                                                    	                           html : res.data,
                                                                    	                           title : 'success',
                                                                    	                           buttons:[
                                                                    	                               {
                                                                    	                                   name: 'yes',
                                                                    	                                   weight : 'primary',
                                                                    	                                   html : 'OK'
                                                                    	                               }
                                                                    	                           ],
                                                                    	                           listeners : { 
                                                                    	                                 btnclick : function(name,e) { 
                                                                    	                                      this.hide();                                  
                                                                    	                                      
                                                                    	                                 }
                                                                    	                             }
                                                                    	                           });
                                                                    	                            m.show();
                                                                    	                       }            
                                                                    	                   }
                                                                    	               });
                                                                    	          }
                                                                    	          var m =  new Roo.bootstrap.Modal({ 
                                                                    	             html : 'Before you publish - have you reviewed all the details and are sure they are correct?', 
                                                                    	             title:'Confirm', 
                                                                    	             buttons : [
                                                                    	                  {
                                                                    	                     name : 'yes',
                                                                    	                     weight : 'primary',
                                                                    	                     html : 'Looks great'
                                                                    	                  },
                                                                    	                  {
                                                                    	                      name : 'no',
                                                                    	                      html : 'I need to make changes'
                                                                    	                  }
                                                                    	             ],
                                                                    	             listeners : { 
                                                                    	                 btnclick : function(name,e) { 
                                                                    	                      this.hide();
                                                                    	                      
                                                                    	                      if(name == 'no'){
                                                                    	                          return;
                                                                    	                      }
                                                                    	                      
                                                                    	                      submission();
                                                                    	                 }
                                                                    	             }
                                                                    	          });
                                                                    	              
                                                                    	          m.show(); 
                                                                    	           //location.href = baseURL;
                                                                    	          return;
                                                                    	           
                                                                    	       }
                                                                    	       if(_this.navGroup.getActive().html == 3){
                                                                    	           _this.roleNav.onClick(e);
                                                                    	           return;
                                                                    	       }   
                                                                    	       _this.navGroup.setActiveNext();   
                                                                    	       _this.bottomPreviousBtn.el.removeClass('disabled');
                                                                    	       _this.bottomPreviousBtn.disabled = false;
                                                                    	       window.scroll(0,0);
                                                                    	   }
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