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
        this.items = [];

        var input = this.addxtype({
            xns : Roo.bootstrap.form,
            xtype : 'Input',
            cls : 'test 1'
        });

        this.items.push(input);

        var input = this.addxtype({
            xns : Roo.bootstrap.form,
            xtype : 'Input',
            cls : 'test 2'
        });

        this.items.push(input);
    }
});
