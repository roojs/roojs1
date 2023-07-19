/*
 * - LGPL
 *
 * Input
 * 
 */

/**
 * @class Roo.bootstrap.form.SecurePass
 * @extends Roo.bootstrap.form.Input
 * Bootstrap SecurePass class
 *
 * 
 * @constructor
 * Create a new SecurePass
 * @param {Object} config The config object
 */
 
Roo.bootstrap.form.SecurePass = function (config) {
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
    this.meterClass = [
        "roo-password-meter-tooweak", 
        "roo-password-meter-weak", 
        "roo-password-meter-medium", 
        "roo-password-meter-strong", 
        "roo-password-meter-grey"
    ];
    
    this.errors = {};
    
    Roo.bootstrap.form.SecurePass.superclass.constructor.call(this, config);
}

Roo.extend(Roo.bootstrap.form.SecurePass, Roo.bootstrap.form.Input, {
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
    
    meterWidth: 300,
    errorMsg :'',    
    errors: false,
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
    pwdStrengths: false,    
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
    initEvents: function ()
    {
        Roo.bootstrap.form.SecurePass.superclass.initEvents.call(this);

        if (this.el.is('input[type=password]') && Roo.isSafari) {
            this.el.on('keydown', this.SafariOnKeyDown, this);
        }

        this.el.on('keyup', this.checkStrength, this, {buffer: 50});
    },
    // private
    onRender: function (ct, position)
    {
        Roo.bootstrap.form.SecurePass.superclass.onRender.call(this, ct, position);
        this.wrap = this.el.wrap({cls: 'x-form-field-wrap'});
        this.trigger = this.wrap.createChild({tag: 'div', cls: 'StrengthMeter ' + this.triggerClass});

        this.trigger.createChild({
        	   cn: [
                    {
                    //id: 'PwdMeter',
                    tag: 'div',
                    cls: 'roo-password-meter-grey col-xs-12',
                    style: {
                        //width: 0,
                        //width: this.meterWidth + 'px'                                                
                        }
                    },
                    {                    	 
                    	 cls: 'roo-password-meter-text'                    	 
                    }
                ]            
        });

         
        if (this.hideTrigger) {
            this.trigger.setDisplayed(false);
        }
        this.setSize(this.width || '', this.height || '');
    },
    // private
    onDestroy: function ()
    {
        if (this.trigger) {
            this.trigger.removeAllListeners();
            this.trigger.remove();
        }
        if (this.wrap) {
            this.wrap.remove();
        }
        Roo.bootstrap.form.TriggerField.superclass.onDestroy.call(this);
    },
    // private
    checkStrength: function ()
    {
        var pwd = this.inputEl().getValue();
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
        
        Roo.log('strength1: ' + strength);
        
        //var pm = this.trigger.child('div/div/div').dom;
        var pm = this.trigger.child('div/div');
        pm.removeClass(this.meterClass);
        pm.addClass(this.meterClass[strength]);
                
        
        var pt = this.trigger.child('/div').child('>*[class=roo-password-meter-text]').dom;        
                
        pt.innerHTML = this.meterLabel + '&nbsp;' + this.pwdStrengths[strength];
        
        this._lastPwd = pwd;
    },
    reset: function ()
    {
        Roo.bootstrap.form.SecurePass.superclass.reset.call(this);
        
        this._lastPwd = '';
        
        var pm = this.trigger.child('div/div');
        pm.removeClass(this.meterClass);
        pm.addClass('roo-password-meter-grey');        
        
        
        var pt = this.trigger.child('/div').child('>*[class=roo-password-meter-text]').dom;        
        
        pt.innerHTML = '';
        this.inputEl().dom.type='password';
    },
    // private
    validateValue: function (value)
    {
        if (!Roo.bootstrap.form.SecurePass.superclass.validateValue.call(this, value)) {
            return false;
        }
        if (value.length == 0) {
            if (this.allowBlank) {
                this.clearInvalid();
                return true;
            }

            this.markInvalid(this.errors.PwdEmpty);
            this.errorMsg = this.errors.PwdEmpty;
            return false;
        }
        
        if(this.insecure){
            return true;
        }
        
        if (!value.match(/[\x21-\x7e]+/)) {
            this.markInvalid(this.errors.PwdBadChar);
            this.errorMsg = this.errors.PwdBadChar;
            return false;
        }
        if (value.length < 6) {
            this.markInvalid(this.errors.PwdShort);
            this.errorMsg = this.errors.PwdShort;
            return false;
        }
        if (value.length > 16) {
            this.markInvalid(this.errors.PwdLong);
            this.errorMsg = this.errors.PwdLong;
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
            //this.markInvalid(this.errors.TooWeak);
            this.errorMsg = this.errors.TooWeak;
            //return false;
        }
        
        
        console.log('strength2: ' + strength);
        
        //var pm = this.trigger.child('div/div/div').dom;
        
        var pm = this.trigger.child('div/div');
        pm.removeClass(this.meterClass);
        pm.addClass(this.meterClass[strength]);
                
        var pt = this.trigger.child('/div').child('>*[class=roo-password-meter-text]').dom;        
                
        pt.innerHTML = this.meterLabel + '&nbsp;' + this.pwdStrengths[strength];
        
        this.errorMsg = ''; 
        return true;
    },
    // private
    CharacterSetChecks: function (type)
    {
        this.type = type;
        this.fResult = false;
    },
    // private
    isctype: function (character, type)
    {
        switch (type) {  
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
    IsLongEnough: function (pwd, size)
    {
        return !(pwd == null || isNaN(size) || pwd.length < size);
    },
    // private
    SpansEnoughCharacterSets: function (word, nb)
    {
        if (!this.IsLongEnough(word, nb))
        {
            return false;
        }

        var characterSetChecks = new Array(
            new this.CharacterSetChecks(this.kCapitalLetter), new this.CharacterSetChecks(this.kSmallLetter),
            new this.CharacterSetChecks(this.kDigit), new this.CharacterSetChecks(this.kPunctuation)
        );
        
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
    ClientSideStrongPassword: function (pwd)
    {
        return this.IsLongEnough(pwd, 8) && this.SpansEnoughCharacterSets(pwd, 3);
    },
    // private
    ClientSideMediumPassword: function (pwd)
    {
        return this.IsLongEnough(pwd, 7) && this.SpansEnoughCharacterSets(pwd, 2);
    },
    // private
    ClientSideWeakPassword: function (pwd)
    {
        return this.IsLongEnough(pwd, 6) || !this.IsLongEnough(pwd, 0);
    }
          
});

Roo.bootstrap.form.SecurePass.error = {
    PwdEmpty: "Please type a password, and then retype it to confirm.",
    PwdShort: "Your password must be at least 6 characters long. Please type a different password.",
    PwdLong: "Your password can't contain more than 16 characters. Please type a different password.",
    PwdBadChar: "The password contains characters that aren't allowed. Please type a different password.",
    IDInPwd: "Your password can't include the part of your ID. Please type a different password.",
    FNInPwd: "Your password can't contain your first name. Please type a different password.",
    LNInPwd: "Your password can't contain your last name. Please type a different password.",
    TooWeak: "Your password is Too Weak."
};