
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
    
    getAutoCreate : function()
    {
        var align = this.labelAlign || this.parentLabelAlign();
        
        var cfg = {
            cls: 'form-group',
            cn : []
        };
        
        
        if (align ==='left' && this.fieldLabel.length) {
            
            cfg.cls += ' roo-form-group-label-left';

            cfg.cn = [
                {
                    tag : 'i',
                    cls : 'roo-required-indicator left-indicator text-danger fa fa-lg fa-star',
                    tooltip : 'This field is required'
                },
                {
                    tag: 'label',
                    cls : 'control-label',
                    html : this.fieldLabel
                }

            ];
            
            var labelCfg = cfg.cn[1];
            var contentCfg = cfg.cn[2];
            
            if(this.indicatorpos == 'right'){
                cfg.cn = [
                    {
                        tag: 'label',
                        cls : 'control-label',
                        cn : [
                            {
                                tag : 'span',
                                html : this.fieldLabel
                            },
                            {
                                tag : 'i',
                                cls : 'roo-required-indicator right-indicator text-danger fa fa-lg fa-star',
                                tooltip : 'This field is required'
                            }
                        ]
                    }
                ];
                
                labelCfg = cfg.cn[0];
                contentCfg = cfg.cn[1];
            }
            
            if(this.labelWidth > 12){
                labelCfg.style = "width: " + this.labelWidth + 'px';
            }
            
            if(this.labelWidth < 13 && this.labelmd == 0){
                this.labelmd = this.labelWidth;
            }
            
            if(this.labellg > 0){
                labelCfg.cls += ' col-lg-' + this.labellg;
                contentCfg.cls += ' col-lg-' + (12 - this.labellg);
            }
            
            if(this.labelmd > 0){
                labelCfg.cls += ' col-md-' + this.labelmd;
                contentCfg.cls += ' col-md-' + (12 - this.labelmd);
            }
            
            if(this.labelsm > 0){
                labelCfg.cls += ' col-sm-' + this.labelsm;
                contentCfg.cls += ' col-sm-' + (12 - this.labelsm);
            }
            
            if(this.labelxs > 0){
                labelCfg.cls += ' col-xs-' + this.labelxs;
                contentCfg.cls += ' col-xs-' + (12 - this.labelxs);
            }
            
        } else if ( this.fieldLabel.length) {
            cfg.cn = [
                {
                   tag : 'i',
                   cls : 'roo-required-indicator left-indicator text-danger fa fa-lg fa-star',
                   tooltip : 'This field is required'
               },
               {
                   tag: 'label',
                   html : this.fieldLabel

               }
            ];
            
            if(this.indicatorpos == 'right'){
                
                cfg.cn = [
                    {
                       tag: 'label',
                       cn : [
                           {
                               tag : 'span',
                               html : this.fieldLabel
                           },
                           {
                              tag : 'i',
                              cls : 'roo-required-indicator right-indicator text-danger fa fa-lg fa-star',
                              tooltip : 'This field is required'
                           }
                       ]

                    }
                ];

            }

        } else {
            cfg = combobox
        }
        
        var settings=this;
        ['xs','sm','md','lg'].map(function(size){
            if (settings[size]) {
                cfg.cls += ' col-' + size + '-' + settings[size];
            }
        });
        
        return cfg;
            
    },
    
    initEvents : function()
    {
        
    }
    
});