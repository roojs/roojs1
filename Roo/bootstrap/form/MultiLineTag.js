/**
 * 
 * @class Roo.bootstrap.form.MultiLineTag
 * @param {Object} config The config object
 * 
 */

Roo.bootstrap.form.MultiLineTag = function(config){
    Roo.log('CONSTRUCT MUTLI LINE TAG');
    Roo.bootstrap.form.MultiLineTag.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.form.MultiLineTag, Roo.bootstrap.form.Input,  {
    getAutoCreate : function()
    {
        Roo.log('MultiLineTag getAutoCreate');
        var input = {
            tag: 'input',
            type : 'text'
        };

        var deleteButton = {
            tag : 'button',
            html: '-'
        };

        var config = {
            cn : [
                input,
                deleteButton
            ]
        };

        return config;
    },

    initEvents : function()
    {
        Roo.log('MultiLineTag initEvents');
    }
});
