/*
 * @class Roo.form.Action.Load
 * @extends Roo.form.Action
 * Load action (read form values from server).
 * Requires Roo.form.Action (base) from Action.js to be loaded first.
 */
Roo.form.Action.Load = function(form, options) {
    Roo.form.Action.Load.superclass.constructor.call(this, form, options);
    this.reader = this.form.reader;
};

Roo.extend(Roo.form.Action.Load, Roo.form.Action, {
    type: 'load',

    run: function() {
        Roo.Ajax.request(Roo.apply(
            this.createCallback(), {
                method: this.getMethod(),
                url: this.getUrl(false),
                params: this.getParams()
            }));
    },

    success: function(response) {
        var result = this.processResponse(response);
        if (result === true || !result.success || !result.data) {
            this.failureType = Roo.form.Action.LOAD_FAILURE;
            this.form.afterAction(this, false);
            return;
        }
        this.form.clearInvalid();
        this.form.setValues(result.data);
        this.form.afterAction(this, true);
    },

    handleResponse: function(response) {
        if (this.form.reader) {
            var rs = this.form.reader.read(response);
            var data = rs.records && rs.records[0] ? rs.records[0].data : null;
            return {
                success: rs.success,
                data: data
            };
        }
        return Roo.decode(response.responseText);
    }
});

Roo.form.Action.ACTION_TYPES = Roo.form.Action.ACTION_TYPES || {};
Roo.form.Action.ACTION_TYPES.load = Roo.form.Action.Load;
