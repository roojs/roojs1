Roo.bootstrap.SecurePass = function (config) {
    // these go here, so the translation tool can replace them..
    this.errors = {
        PwdEmpty: "Please type a password, and then retype it to confirm.",
        PwdShort: "Your password must be at least 6 characters long. Please type a different password.",
        PwdLong: "Your password can't contain more than 16 characters. Please type a different password.",
        PwdBadChar: "The password contains characters that aren't allowed. Please type a different password.",
        IDInPwd: "Your password can't include the part of your ID. Please type a different password.",
        FNInPwd: "Your password can't contain your first name. Please type a different password.",
        LNInPwd: "Your password can't contain your last name. Please type a different password.",
        TooWeak: "Your password is Too Weak."
    },
    this.meterLabel = "Password strength:";
    this.pwdStrengths = ["Too Weak", "Weak", "Medium", "Strong"];
    Roo.bootstrap.SecurePass.superclass.constructor.call(this, config);
}

Roo.extend(Roo.bootstrap.SecurePass, Roo.bootstrap.Input, {
    /**
     * @cfg {String/Object} errors A Error spec, or true for a default spec (defaults to
     * {
     *  PwdEmpty: "Please type a password, and then retype it to confirm.",
     *  PwdShort: "Your password must be at least 6 characters long. Please type a different password.",
     *  PwdLong: "Your password can't contain more than 16 characters. Please type a different password.",
     *  PwdBadChar: "The password contains characters that aren't allowed. Please type a different password.",
     *  IDInPwd: "Your password can't include the part of your ID. Please type a different password.",
     *  FNInPwd: "Your password can't contain your first name. Please type a different password.",
     *  LNInPwd: "Your password can't contain your last name. Please type a different password."
     * })
     */
    // private
    errors: {},
    imageRoot: '/',
    /**
     * @cfg {String/Object} Label for the strength meter (defaults to
     * 'Password strength:')
     */
    // private
    meterLabel: '',
    /**
     * @cfg {String/Object} pwdStrengths A pwdStrengths spec, or true for a default spec (defaults to
     * ['Weak', 'Medium', 'Strong'])
     */
    // private
    pwdStrengths: [],
    /**
     * @cfg {String/Object} fieldsFilter A fieldsFilter spec, as [['field_name', 'error_id'], ...]
     */
    // private
    fieldsFilter: [],
    // private
    strength: 0,
    // private
    _lastPwd: null,
    // private
    kCapitalLetter: 0,
    kSmallLetter: 1,
    kDigit: 2,
    kPunctuation: 3,
    
    insecure: false,
    // private
    initEvents: function () {
        Roo.bootstrap.SecurePass.superclass.initEvents.call(this);

        if (this.el.is('input[type=password]') && Roo.isSafari) {
            this.el.on('keydown', this.SafariOnKeyDown, this);
        }

        this.el.on('keyup', this.checkStrength, this, {buffer: 50});
    },
    // private
    onRender: function (ct, position) {
        Roo.bootstrap.SecurePass.superclass.onRender.call(this, ct, position);
        this.wrap = this.el.wrap({cls: 'x-form-field-wrap'});
        this.trigger = this.wrap.createChild({tag: 'div', cls: 'StrengthMeter ' + this.triggerClass});

        this.trigger.createChild({
            tag: 'div',
            style: {
                'margin-bottom': '10px',
                width: this.width + 'px'
            },
            cn: {
                tag: 'div',
                cls: 'password_meter_grey',
                style: {
                    width: this.width + 'px',
                    height: '20px'                    
                },
                cn: {
                    //id: 'PwdMeter',
                    tag: 'div',
                    cls: 'password_meter',
                    style: {
                        width: 0,
                        height: '20px'                        
                    }
                }
            }
        });
        if (this.hideTrigger) {
            this.trigger.setDisplayed(false);
        }
        this.setSize(this.width || '', this.height || '');
    },
    // private
    onDestroy: function () {
        if (this.trigger) {
            this.trigger.removeAllListeners();
            this.trigger.remove();
        }
        if (this.wrap) {
            this.wrap.remove();
        }
        Roo.bootstrap.TriggerField.superclass.onDestroy.call(this);
    },
    // private
    checkStrength: function () {
        var pwd = this.el.getValue();
        if (pwd == this._lastPwd) {
            return;
        }

        var strength;
        if (this.ClientSideStrongPassword(pwd)) {
            strength = 3;
        } else if (this.ClientSideMediumPassword(pwd)) {
            strength = 2;
        } else if (this.ClientSideWeakPassword(pwd)) {
            strength = 1;
        } else {
            strength = 0;
        }
        var pm = this.trigger.child('div/div/div').dom;
        
        pm.style.width = (this.width / 3) * strength + 'px';
        //if(this.pwdStrengths != null && strength > 0) {
        pm.innerHTML = this.meterLabel + '&nbsp;' + this.pwdStrengths[strength];
        //} else {
        //	pm.innerHTML = '';
        //}

        this._lastPwd = pwd;
    },
    reset: function () {
        Roo.bootstrap.SecurePass.superclass.reset.call(this);
        this._lastPwd = '';
        var pm = this.trigger.child('div/div/div').dom;
        pm.style.width = 0;
        pm.innerHTML = '';
    },
    // private
    validateValue: function (value) {
        
        if (!Roo.bootstrap.SecurePass.superclass.validateValue.call(this, value)) {
            return false;
        }
        if (value.length == 0) {
            if (this.allowBlank) {
                this.clearInvalid();
                return true;
            }

            this.markInvalid(this.errors.PwdEmpty);
            return false;
        }
        
        if(this.insecure){
            return true;
        }
        
        if ('[\x21-\x7e]*'.match(value)) {
            this.markInvalid(this.errors.PwdBadChar);
            return false;
        }
        if (value.length < 6) {
            this.markInvalid(this.errors.PwdShort);
            return false;
        }
        if (value.length > 16) {
            this.markInvalid(this.errors.PwdLong);
            return false;
        }
        var strength;
        if (this.ClientSideStrongPassword(value)) {
            strength = 3;
        } else if (this.ClientSideMediumPassword(value)) {
            strength = 2;
        } else if (this.ClientSideWeakPassword(value)) {
            strength = 1;
        } else {
            strength = 0;
        }
        
        if (strength < 2) {
            this.markInvalid(this.errors.TooWeak);
            return false;
        }
        var pm = this.trigger.child('div/div/div').dom;
        
        pm.style.width = (this.width / 3) * strength + 'px';
        //if(this.pwdStrengths != null && strength > 0) {
        pm.innerHTML = this.meterLabel + '&nbsp;' + this.pwdStrengths[strength];
        
        /*
         for (var index = 0; index < this.fieldsFilter.length; ++index) {
         filter = document.getElementById(this.fieldsFilter[index][0]).value;
         if (filter != '')
         {
         re = new RegExp(filter);
         if (re.test(value)) {
         this.markInvalid(eval('this.errors.'+ this.fieldsFilter[index][1]));
         return false;
         }
         }
         }
         */
        return true;
    },
    // private
    CharacterSetChecks: function (type) {
        this.type = type;
        this.fResult = false;
    },
    // private
    isctype: function (character, type) {
        switch (type) { //why needed break after return in js ? very odd bug
            case this.kCapitalLetter:
                if (character >= 'A' && character <= 'Z') {
                    return true;
                }
                break;
            case this.kSmallLetter:
                if (character >= 'a' && character <= 'z') {
                    return true;
                }
                break;
            case this.kDigit:
                if (character >= '0' && character <= '9') {
                    return true;
                }
                break;
            case this.kPunctuation:
                if ('!@#$%^&*()_+-=\'";:[{]}|.>,</?`~'.indexOf(character) >= 0) {
                    return true;
                }
                break;
            default:
                return false;
        }

    },
    // private
    IsLongEnough: function (pwd, size) {
        return !(pwd == null || isNaN(size) || pwd.length < size);
    },
    // private
    SpansEnoughCharacterSets: function (word, nb) {
        if (!this.IsLongEnough(word, nb))
        {
            return false;
        }

        var characterSetChecks = new Array(
                new this.CharacterSetChecks(this.kCapitalLetter), new this.CharacterSetChecks(this.kSmallLetter),
                new this.CharacterSetChecks(this.kDigit), new this.CharacterSetChecks(this.kPunctuation));
        for (var index = 0; index < word.length; ++index) {
            for (var nCharSet = 0; nCharSet < characterSetChecks.length; ++nCharSet) {
                if (!characterSetChecks[nCharSet].fResult && this.isctype(word.charAt(index), characterSetChecks[nCharSet].type)) {
                    characterSetChecks[nCharSet].fResult = true;
                    break;
                }
            }
        }

        var nCharSets = 0;
        for (var nCharSet = 0; nCharSet < characterSetChecks.length; ++nCharSet) {
            if (characterSetChecks[nCharSet].fResult) {
                ++nCharSets;
            }
        }

        if (nCharSets < nb) {
            return false;
        }
        return true;
    },
    // private
    ClientSideStrongPassword: function (pwd) {
        return this.IsLongEnough(pwd, 8) && this.SpansEnoughCharacterSets(pwd, 3);
    },
    // private
    ClientSideMediumPassword: function (pwd) {
        return this.IsLongEnough(pwd, 7) && this.SpansEnoughCharacterSets(pwd, 2);
    },
    // private
    ClientSideWeakPassword: function (pwd) {
        return this.IsLongEnough(pwd, 6) || !this.IsLongEnough(pwd, 0);
    }/*,
     
     // private -- see TextFiedl... - not sure why we are duping the code?
     SafariOnKeyDown : function(event){
     
     var isSelectAll = false;
     if(this.el.dom.selectionEnd > 0){
     isSelectAll = (this.el.dom.selectionEnd - this.el.dom.selectionStart - this.getValue().length == 0) ? true : false;
     }
     if(((event.getKey() == 8 || event.getKey() == 46) && this.getValue().length ==1)){ // backspace and delete key
     event.preventDefault();
     this.setValue('');
     return;
     };
     if(isSelectAll){ // backspace and delete key
     
     event.preventDefault();
     this.setValue(String.fromCharCode(
     this.shiftKey ? event.getKey() : event.getKey().toLowerCase()
     ));  
     };
     } */
})