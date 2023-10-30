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
        var config = {
            cls : 'test'
        };

        return config;
    },

    initEvents : function()
    {
        Roo.log('MultiLineTag initEvents');
        var input = this.addxtype({
            xns : Roo.bootstrap.form,
            xtype : 'Input'
        });

        Roo.log(input);
    }
});
