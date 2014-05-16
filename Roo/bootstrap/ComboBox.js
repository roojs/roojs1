/*
 * - LGPL
 * * 
 */

/**
 * @class Roo.bootstrap.ComboBox
 * @extends Roo.bootstrap.Input
 * A combobox control with support for autocomplete, remote-loading, paging and many other features.
 * @constructor
 * Create a new ComboBox.
 * @param {Object} config Configuration options
 */
Roo.bootstrap.ComboBox = function(config){
    Roo.bootstrap.ComboBox.superclass.constructor.call(this, config);

};

Roo.extend(Roo.bootstrap.ComboBox, Roo.bootstrap.Input, {
    
    
    multiple: false,
    width: 200,
    
    getAutoCreate : function(){
        
        var align = (!this.labelAlign) ? this.parentLabelAlign() : this.labelAlign;
        
        
        var cfg = {};
        
        if(this.multiple){
            cfg = this.getAutoCreateMulitple();
            return cfg;
        }
        
        var id = Roo.id();
        
        var cfg = {
            tag: 'div',
            cn: [
                {
                    tag: 'div',
                    cls: 'select2-container',
                    style: "width:" + this.width + 'px',
                    cn: [
                        {
                            tag: 'a',
                            cls: 'select2-choice',
                            href: 'javascript:void(0)',
                            tabindex: -1,
                            cn: [
                                {
                                    tag: 'span',
                                    cls: 'select2-chosen'
                                },
                                {
                                    tag: 'abbr',
                                    cls: 'select2-search-choice-close'
                                },
                                {
                                    tag: 'span',
                                    cls: 'select2-arrow',
                                    role: 'presentation',
                                    cn: [
                                        {
                                            tag: 'b',
                                            role: 'presentation'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tag: 'label',
                            'for': id,
                            cls: 'select2-offscreen'
                        },
                        {
                            tag: 'input',
                            cls: 'select2-focusser select2-offscreen',
                            type: 'text',
                            role: 'button',
                            id: id,
                            tabindex: 0
                        }
                    ]

                },
                {
                    tag: 'select',
                    cls: 'select2-offscreen',
                    tabindex: -1,
                    cn: [
                        {
                            tag: 'option',
                            value: 'AK',
                            html: 'Alaska'
                        },
                        {
                            tag: 'option',
                            value: 'HI',
                            html: 'Hawaii'
                        },
                        {
                            tag: 'option',
                            value: 'CA',
                            html: 'California'
                        }
                        
                    ]
                }
            ]
        };
        
        Roo.log(cfg);
        return cfg;
        
    },
    
    getAutoCreateMulitple : function()
    {
        var id = Roo.id();
        
        var cfg = {
            tag: 'div',
            cn: [
                {
                    tag: 'div',
                    cls: 'select2-container select2-container-multiple',
                    style: "width:" + this.width + 'px',
                    cn: [
                        {
                            tag: 'ul',
                            cls: 'select2-choice',
                            cn: [
                                {
                                    tag: 'li',
                                    cls: 'select2-search-field',
                                    cn: [
                                        {
                                            tag: 'label',
                                            'for': id,
                                            cls: 'select2-offscreen',
                                            html: 'Label here'
                                        },
                                        {
                                            tag: 'input',
                                            type: 'text',
                                            cls: 'select2-input',
                                            id: id,
                                            autocomplete: 'off',
                                            autocorrect: 'off',
                                            autocapitalize: 'off',
                                            spellcheck: false,
                                            tabindex: 0
                                        }
                                    ]
                                }
                            ]
                        }
                    ]

                },
                {
                    tag: 'select',
                    cls: 'select2-offscreen',
                    tabindex: -1,
                    multiple: true
                }
            ]
        };
        
        return cfg;
    }
    
});