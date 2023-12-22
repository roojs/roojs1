Roo.form.Password = function(config){
    Roo.form.Password.superclass.constructor.call(this, config);

    this.inputType = 'password';
};

Roo.extend(Roo.form.Password, Roo.form.TextField,  {
    onRender : function(ct, position)
    {
        Roo.form.Password.superclass.onRender.call(this, ct, position);

        this.parentEl().addClass('form-password');

        this.wrap = this.el.wrap({
            cls : 'password-wrap'
        });

        this.toggle = this.wrap.createChild({
            tag : 'Button',
            cls : 'password-toggle'
        });


        this.toggleEl().addClass('password-hidden');

        this.toggleEl().on('click', this.onToggleClick, this);;
    },

    initEvents : function()
    {
        Roo.form.Password.superclass.initEvents.call(this, ct, position);

        this.el.on('paste', this.onPaste, this);
    },

    onPaste : function(e)
    {
        Roo.log('On Paste');
        Roo.log(e);
    },
    
    parentEl : function()
    {
        return this.el.findParent('.x-form-element', 5, true);
    },

    toggleEl: function()
    {
        return this.parentEl().select('button.password-toggle',true).first();
    },

    onToggleClick : function(e) 
    {
        var input = this.el;
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