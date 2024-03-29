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

    onRender : function(ct, position)
    {
        Roo.bootstrap.form.SecurePass.superclass.onRender.call(this, ct, position);

        this.el.addClass('form-password');

        this.wrap = this.inputEl().wrap({
            cls : 'password-wrap'
        });

        this.toggle = this.wrap.createChild({
            tag : 'Button',
            cls : 'password-toggle'
        });


        this.toggleEl().addClass('password-hidden');

        this.toggleEl().on('click', this.onToggleClick, this);;
    },

    toggleEl: function()
    {
        return this.el.select('button.password-toggle',true).first();
    },

    onToggleClick : function(e) 
    {
        var input = this.inputEl();
        var toggle = this.toggleEl();

        toggle.removeClass(['password-visible', 'password-hidden']);

        if(input.attr('type') == 'password') {
            input.attr('type', 'text');
            toggle.addClass('password-visible');
        }
        else {
            input.attr('type', 'password');
            toggle.addClass('password-hidden');
        }
    }
});