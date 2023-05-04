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
};

Roo.extend(Roo.bootstrap.form.Password, Roo.bootstrap.form.Input, {

    inputType : 'password',
    
    initEvents : function()
    {   
        Roo.bootstrap.form.Password.superclass.initEvents.call(this);

        this.inputEl().addClass('password-hidden');

        if(this.inputType == 'password') {
            this.inputEl().on('click', this.onPasswordClick, this);
        }
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