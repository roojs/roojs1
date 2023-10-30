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
        Roo.log('MULTI LINE TAG GET AUTO CREATE');
        return Roo.bootstrap.form.MultiLineTag.superclass.getAutoCreate(this);
    }
});
