
/**
 * @class Roo.bootstrap.MoneyField
 * @extends Roo.bootstrap.TriggerField
 * Bootstrap MoneyField class
 * 
 * @constructor
 * Create a new MoneyField.
 * @param {Object} config Configuration options
 */

Roo.bootstrap.MoneyField = function(config) {
    
    Roo.bootstrap.MoneyField.superclass.constructor.call(this, config);
    
};

Roo.extend(Roo.bootstrap.MoneyField, Roo.bootstrap.TriggerField, {
    
    inputlg : 9,
    inputmd : 9,
    inputsm : 9,
    inputxs : 6,
    
    store : false,
    
    getAutoCreate : function()
    {
        var align = this.labelAlign || this.parentLabelAlign();
        
        var id = Roo.id();

        var cfg = {
            cls: 'form-group',
            cn: []
        };

        var input =  {
            tag: 'input',
            id : id,
            cls : 'form-control roo-money-amount-input',
            autocomplete: 'new-password'
        };
        
        if (this.name) {
            input.name = this.name;
        }

        if (this.disabled) {
            input.disabled = true;
        }

        var clg = 12 - this.inputlg;
        var cmd = 12 - this.inputmd;
        var csm = 12 - this.inputsm;
        var cxs = 12 - this.inputxs;
        
        var container = {
            tag : 'div',
            cls : 'row roo-money-field',
            cn : [
                {
                    tag : 'div',
                    cls : 'roo-money-currency column col-lg-' + clg + ' col-md-' + cmd + ' col-sm-' + csm + ' col-xs-' + cxs,
                    cn : [
                        {
                            tag : 'div',
                            cls: 'roo-select2-container input-group',
                            cn: [
                                {
                                    tag : 'input',
                                    cls : 'form-control roo-money-currency-input',
                                    autocomplete: 'new-password'
                                },
                                {
                                    tag :'span',
                                    cls : 'input-group-addon',
                                    cn : [
                                        {
                                            tag: 'span',
                                            cls: 'caret'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    tag : 'div',
                    cls : 'roo-money-amount column col-lg-' + this.inputlg + ' col-md-' + this.inputmd + ' col-sm-' + this.inputsm + ' col-xs-' + this.inputxs,
                    cn : [
                        {
                            tag: 'div',
                            cls: this.hasFeedback ? 'has-feedback' : '',
                            cn: [
                                input
                            ]
                        }
                    ]
                }
            ]
            
        };
        
        if (this.fieldLabel.length) {
            var indicator = {
                tag: 'i',
                tooltip: 'This field is required'
            };

            var label = {
                tag: 'label',
                'for':  id,
                cls: 'control-label',
                cn: []
            };

            var label_text = {
                tag: 'span',
                html: this.fieldLabel
            };

            indicator.cls = 'roo-required-indicator text-danger fa fa-lg fa-star left-indicator';
            label.cn = [
                indicator,
                label_text
            ];

            if(this.indicatorpos == 'right') {
                indicator.cls = 'roo-required-indicator text-danger fa fa-lg fa-star right-indicator';
                label.cn = [
                    label_text,
                    indicator
                ];
            }

            if(align == 'left') {
                container = {
                    tag: 'div',
                    cn: [
                        container
                    ]
                };

                if(this.labelWidth > 12){
                    label.style = "width: " + this.labelWidth + 'px';
                }
                if(this.labelWidth < 13 && this.labelmd == 0){
                    this.labelmd = this.labelWidth;
                }
                if(this.labellg > 0){
                    label.cls += ' col-lg-' + this.labellg;
                    input.cls += ' col-lg-' + (12 - this.labellg);
                }
                if(this.labelmd > 0){
                    label.cls += ' col-md-' + this.labelmd;
                    container.cls += ' col-md-' + (12 - this.labelmd);
                }
                if(this.labelsm > 0){
                    label.cls += ' col-sm-' + this.labelsm;
                    container.cls += ' col-sm-' + (12 - this.labelsm);
                }
                if(this.labelxs > 0){
                    label.cls += ' col-xs-' + this.labelxs;
                    container.cls += ' col-xs-' + (12 - this.labelxs);
                }
            }
        }

        cfg.cn = [
            label,
            container
        ];

        var settings = this;

        ['xs','sm','md','lg'].map(function(size){
            if (settings[size]) {
                cfg.cls += ' col-' + size + '-' + settings[size];
            }
        });
        
        return cfg;
    },
    
    initEvents : function()
    {
        if (!this.store) {
            throw "can not find store for combo";
        }
        
        this.store = Roo.factory(this.store, Roo.data);
        this.store.parent = this;
        
        this.createList();
        
        this.indicator = this.indicatorEl();
        
        this.triggerEl = this.el.select('.input-group-addon', true).first();
        
        this.triggerEl.on("click", this.onTriggerClick, this, { preventDefault : true });
        
    },
    
    onTriggerClick : function(e)
    {   
        if(this.disabled){
            return;
        }
        
        this.page = 0;
        this.loadNext = false;
        
        if(this.isExpanded()){
            this.collapse();
            return;
        }
        
        if(this.triggerAction == 'all') {
            this.doQuery(this.allQuery, true);
            return;
        }
        
        this.doQuery(this.getRawValue());
    },
    
    doQuery : function(q, forceAll){
        
        if(q === undefined || q === null){
            q = '';
        }
        
        var qe = {
            query: q,
            forceAll: forceAll,
            combo: this,
            cancel:false
        };
        
        if(this.fireEvent('beforequery', qe) === false || qe.cancel){
            return false;
        }
        
        q = qe.query;
        
        forceAll = qe.forceAll;
        if(forceAll === true || (q.length >= this.minChars)){
            
            this.hasQuery = true;
            
            if(this.lastQuery != q || this.alwaysQuery){
                
                this.lastQuery = q;
                
                if(this.mode == 'local'){
                    
                    this.selectedIndex = -1;
                    
                    this.store.clearFilter();
                    
                    this.store.fireEvent("datachanged", this.store);
                    
                    this.onLoad();
                    
                }else{
                    
                    this.store.baseParams[this.queryParam] = q;
                    
                    var options = {params : this.getParams(q)};
                    
                    if(this.loadNext){
                        options.add = true;
                        options.params.start = this.page * this.pageSize;
                    }
                    
                    this.store.load(options);
                }
            }else{
                this.selectedIndex = -1;
                this.onLoad();   
            }
        }
        
        this.loadNext = false;
    },
    
    getParams : function(q)
    {
        var p = {};
        
        if(this.pageSize){
            p.start = 0;
            p.limit = this.pageSize;
        }
        
        return p;
    },
    
    collapse : function()
    {
        if(!this.isExpanded()){
            return;
        }
        
        this.list.hide();
        
        Roo.get(document).un('mousedown', this.collapseIf, this);
        Roo.get(document).un('mousewheel', this.collapseIf, this);
        
        if (!this.editable) {
            Roo.get(document).un('keydown', this.listKeyPress, this);
        }
        
        this.fireEvent('collapse', this);
        
        this.validate();
    },

    collapseIf : function(e)
    {
        var in_combo  = e.within(this.el);
        var in_list =  e.within(this.list);
        var is_list = (Roo.get(e.getTarget()).id == this.list.id) ? true : false;
        
        if (in_combo || in_list || is_list) {
            return;
        }
        
        this.collapse();
    },

    /**
     * Expands the dropdown list if it is currently hidden. Fires the 'expand' event on completion.
     */
    expand : function(){
       
        if(this.isExpanded() || !this.hasFocus){
            return;
        }
        
        var lw = this.listWidth || Math.max(this.inputEl().getWidth(), this.minListWidth);
        this.list.setWidth(lw);
        
        Roo.log('expand');
        
        this.list.show();
        
        this.restrictHeight();
        
        if(this.tickable){
            
            this.tickItems = Roo.apply([], this.item);
            
            this.okBtn.show();
            this.cancelBtn.show();
            this.trigger.hide();
            
            if(this.editable){
                this.tickableInputEl().focus();
            }
            
        }
        
        Roo.get(document).on('mousedown', this.collapseIf, this);
        Roo.get(document).on('mousewheel', this.collapseIf, this);
        if (!this.editable) {
            Roo.get(document).on('keydown', this.listKeyPress, this);
        }
        
        this.fireEvent('expand', this);
    },
    
});