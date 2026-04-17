/*
 * @class Roo.form.Action.Submit
 * @extends Roo.form.Action
 * Submit action (POST form). SSE path uses {@link Roo.form.Action.Sse}.
 * Requires Roo.form.Action (base) from Action.js and {@link Roo.form.Action.Sse} before runSSE is used.
 */
Roo.form.Action.Submit = function(form, options) {
    Roo.form.Action.Submit.superclass.constructor.call(this, form, options);
};

Roo.extend(Roo.form.Action.Submit, Roo.form.Action, {
    type: 'submit',

    haveProgress: false,
    uploadComplete: false,

    uploadProgress: function() {
        if (!this.form.progressUrl) {
            return;
        }

        if (!this.haveProgress) {
            Roo.MessageBox.progress("Uploading", "Uploading");
        }
        if (this.uploadComplete) {
            Roo.MessageBox.hide();
            return;
        }

        this.haveProgress = true;

        var uid = this.form.findField('UPLOAD_IDENTIFIER').getValue();

        var c = new Roo.data.Connection();
        c.request({
            url: this.form.progressUrl,
            params: {
                id: uid
            },
            method: 'GET',
            success: function(req) {
                var rdata = false;
                var edata;
                try {
                    rdata = Roo.decode(req.responseText);
                } catch (e) {
                    Roo.log("Invalid data from server..");
                    Roo.log(edata);
                    return;
                }
                if (!rdata || !rdata.success) {
                    Roo.log(rdata);
                    Roo.MessageBox.alert(Roo.encode(rdata));
                    return;
                }
                var data = rdata.data;

                if (this.uploadComplete) {
                    Roo.MessageBox.hide();
                    return;
                }

                if (data) {
                    Roo.MessageBox.updateProgress(data.bytes_uploaded / data.bytes_total,
                        Math.floor((data.bytes_total - data.bytes_uploaded) / 1000) + 'k remaining'
                    );
                }
                this.uploadProgress.defer(2000, this);
            },

            failure: function(data) {
                Roo.log('progress url failed ');
                Roo.log(data);
            },
            scope: this
        });
    },

    run: function() {
        this.form.getValues();

        var o = this.options;
        var method = this.getMethod();
        var isPost = method == 'POST';
        if (o.clientValidation === false || this.form.isValid()) {

            if (this.form.useSSE || o.useSSE) {
                this.runSSE();
                return;
            }

            if (this.form.progressUrl) {
                this.form.findField('UPLOAD_IDENTIFIER').setValue(
                    (new Date() * 1) + '' + Math.random());
            }

            Roo.Ajax.request(Roo.apply(this.createCallback(), {
                form: this.form.el.dom,
                url: this.getUrl(!isPost),
                method: method,
                params: isPost ? this.getParams() : null,
                isUpload: this.form.fileUpload,
                formData: this.form.formData
            }));

            this.uploadProgress();

        } else if (o.clientValidation !== false) {
            this.failureType = Roo.form.Action.CLIENT_INVALID;
            this.form.afterAction(this, false);
        }
    },

    /**
     * Run form submit using SSE-style streaming response (see {@link Roo.form.Action.Sse}).
     */
    runSSE: function() {
        var _this = this;
        var formData = new FormData(this.form.el.dom);
        var params = this.options.params || {};
        for (var key in params) {
            formData.append(key, params[key]);
        }
        var sse = new Roo.form.Action.Sse();
        sse.on('error', function(s, data) {
            _this.failureType = Roo.form.Action.SERVER_INVALID;
            _this.result = data;
            _this.form.afterAction(_this, false);
        });
        sse.on('complete', function(s, data) {
            _this.result = data;
            if (data.success) {
                _this.form.afterAction(_this, true);
                return;
            }
            _this.failureType = Roo.form.Action.SERVER_INVALID;
            _this.form.afterAction(_this, false);
        });
        sse.on('parseerror', function(s, jsonStr) {
            _this.failureType = Roo.form.Action.SERVER_INVALID;
            _this.result = {
                success: false,
                errorMsg: "Failed to read server message: " + jsonStr.substring(0, 200),
                errors: []
            };
            _this.form.afterAction(_this, false);
        });
        sse.on('readerror', function(s, error) {
            _this.failureType = Roo.form.Action.CONNECT_FAILURE;
            _this.result = {
                success: false,
                errorMsg: 'SSE read error: ' + error.toString()
            };
            _this.form.afterAction(_this, false);
        });
        sse.on('fetcherror', function(s, error) {
            _this.failureType = Roo.form.Action.CONNECT_FAILURE;
            _this.result = {
                success: false,
                errorMsg: 'SSE connection error: ' + error.toString()
            };
            _this.form.afterAction(_this, false);
        });
        sse.start(_this.getUrl(false), formData);
    },

    success: function(response) {
        this.uploadComplete = true;
        if (this.haveProgress) {
            Roo.MessageBox.hide();
        }

        var result = this.processResponse(response);
        if (result === true || result.success) {
            this.form.afterAction(this, true);
            return;
        }
        if (result.errors) {
            this.form.markInvalid(result.errors);
            this.failureType = Roo.form.Action.SERVER_INVALID;
        }
        this.form.afterAction(this, false);
    },

    failure: function(response) {
        this.uploadComplete = true;
        if (this.haveProgress) {
            Roo.MessageBox.hide();
        }

        this.response = response;
        this.failureType = Roo.form.Action.CONNECT_FAILURE;
        this.form.afterAction(this, false);
    },

    handleResponse: function(response) {
        if (this.form.errorReader) {
            var rs = this.form.errorReader.read(response);
            var errors = [];
            if (rs.records) {
                for (var i = 0, len = rs.records.length; i < len; i++) {
                    var r = rs.records[i];
                    errors[i] = r.data;
                }
            }
            if (errors.length < 1) {
                errors = null;
            }
            return {
                success: rs.success,
                errors: errors
            };
        }
        var ret = false;
        try {
            var rt = response.responseText;
            if (rt.match(/^\<!--\[CDATA\[/)) {
                rt = rt.replace(/^\<!--\[CDATA\[/, '');
                rt = rt.replace(/\]\]--\>$/, '');
            }

            ret = Roo.decode(rt);
        } catch (e) {
            ret = {
                success: false,
                errorMsg: "Failed to read server message: " + (response ? response.responseText : ' - no message'),
                errors: []
            };
        }
        return ret;
    }
});

Roo.form.Action.ACTION_TYPES = Roo.form.Action.ACTION_TYPES || {};
Roo.form.Action.ACTION_TYPES.submit = Roo.form.Action.Submit;
