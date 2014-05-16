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
    
    
    getAutoCreate : function(){
        
        var align = (!this.labelAlign) ? this.parentLabelAlign() : this.labelAlign;
        
        var id = Roo.id();
        
        var cfg = {
            tag: 'div',
            cn: []
        };
        
        cfg.cn.push({
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
        })
        
        return cfg;
        
    }
    
});