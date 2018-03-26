Roo.bootstrap.PhoneInput = function(config) {
    Roo.bootstrap.PhoneInput.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.PhoneInput, Roo.bootstrap.TriggerField,  {
        
        triggerList : true,
        
        listWidth: undefined,
        
        getAutoCreate : function()
        {
            var align = this.labelAlign || this.parentLabelAlign();
            var id = Roo.id();
            
            var cfg = {
                cls: 'form-group', //input-group
                cn: []
            };
            
            var input =  {
                tag: 'input',
                id : id,
                type : 'tel',
                cls : 'form-control tel-input',
                autocomplete: 'new-password'
                //placeholder : this.placeholder || '' 
            };
            
            if (this.name) {
                input.name = this.name;
            }
            
            if (this.disabled) {
                input.disabled=true;
            }
            
            var flag_container = {
                tag: 'div',
                cls: 'flag-container',
                cn: [
                    {
                        tag: 'div',
                        cls: 'flag'
                    },
                    {
                        tag: 'div',
                        cls: 'caret'
                    }
                ]
            };
            
            var box = {
                tag: 'div',
                cls: this.hasFeedback ? 'has-feedback' : '',
                cn: [
                    input
                ]
            };
            
            var container = {
                cls: 'roo-select2-container input-group',
                cn: [
                    flag_container,
                    box
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
            this.createList();
            
            Roo.bootstrap.PhoneInput.superclass.initEvents.call(this);
            
            this.trigger = this.el.select('div.flag-container',true).first();
            this.trigger.on("click", this.onTriggerClick, this, {preventDefault:true});
            
            if(!this.tpl){
                this.tpl = '<li><a href="#">{' + this.displayField + '}</a></li>';
            }

            this.view = new Roo.View(this.list, this.tpl, {
                singleSelect:true, store: this.store, selectedClass: this.selectedClass
            });
            //this.view.wrapEl.setDisplayed(false);
            this.view.on('click', this.onViewClick, this);
        },
        
        onTriggerClick : function(e)
        {
            Roo.log('trigger click');
            
            if(this.disabled || !this.triggerList){
                return;
            }
            
            this.page = 0;
            this.loadNext = false;
            
            if(this.isExpanded()){
                this.collapse();
            }else {
                this.hasFocus = true;
                if(this.triggerAction == 'all') {
                    //Original data flow: doQuery() -> store.load() -> proxy.load() -> store.loadRecords()
                } else {
                    
                }
                if (!this.blockFocus) {
                    this.inputEl().focus();
                }
            }
        },
        
        isExpanded : function(){
            return this.list.isVisible();
        },
        
        collapse : function(){
            if(!this.isExpanded()){
                return;
            }
            this.list.hide();
            this.hasFocus = false;
            Roo.get(document).un('mousedown', this.collapseIf, this);
            Roo.get(document).un('mousewheel', this.collapseIf, this);
            this.fireEvent('collapse', this);
            
            this.validate();
        },
        
        expand : function(){
           
            if(this.isExpanded() || !this.hasFocus){
                return;
            }
            
            var lw = this.listWidth || Math.max(this.inputEl().getWidth(), this.minListWidth);
            this.list.setWidth(lw);
            
            Roo.log('expand');
            
            this.list.show();
            
            this.restrictHeight();
            
            Roo.get(document).on('mousedown', this.collapseIf, this);
            Roo.get(document).on('mousewheel', this.collapseIf, this);
            
            this.fireEvent('expand', this);
        },
        
        restrictHeight : function(){
            //this.innerList.dom.style.height = '';
            //var inner = this.innerList.dom;
            //var h = Math.max(inner.clientHeight, inner.offsetHeight, inner.scrollHeight);
            //this.innerList.setHeight(h < this.maxHeight ? 'auto' : this.maxHeight);
            //this.list.beginUpdate();
            //this.list.setHeight(this.innerList.getHeight()+this.list.getFrameWidth('tb')+(this.resizable?this.handleHeight:0)+this.assetHeight);
            this.list.alignTo(this.inputEl(), this.listAlign);
            this.list.alignTo(this.inputEl(), this.listAlign);
            //this.list.endUpdate();
        }
});