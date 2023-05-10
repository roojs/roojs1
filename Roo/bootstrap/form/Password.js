/**
 * @class Roo.bootstrap.form.Password
 * @extends Roo.bootstrap.form.Input
 * Bootstrap Password class
 * 
 * 
 * 
 * 
 * @constructor
 * Create a new Password
 * @param {Object} config The config object
 */

Roo.bootstrap.form.Password = function(config){
    Roo.bootstrap.form.Password.superclass.constructor.call(this, config);

    this.inputType = 'password';
};

Roo.extend(Roo.bootstrap.form.Password, Roo.bootstrap.form.Input, {

    getAutoCreate : function()
    {
        this.after = {
            xns : Roo.bootstrap,
            xtype : 'Button',
            text : 'ABC'
        };

        return Roo.bootstrap.form.Password.superclass.getAutoCreate.call(this);
    },

    initEvents : function()
    {   
        Roo.bootstrap.form.Password.superclass.initEvents.call(this);

        this.el.addClass('form-password');

        this.inputEl().addClass('password-hidden');

        this.inputEl().on('click', this.onPasswordClick, this);
    },

    onPasswordClick : function(e) 
    {
        var input = this.inputEl();

        if(e.getPageX() < input.getX() + input.getWidth() - 30) {
            return;
        }

        input.removeClass(['password-visible', 'password-hidden']);

        if(input.attr('type') == 'password') {
            input.attr('type', 'text');
            input.addClass('password-visible');
        }
        else {
            input.attr('type', 'password');
            input.addClass('password-hidden');
        }
    }
});