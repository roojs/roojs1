Roo.languagedetect.Detect = function() {
    this.languageDetect = new Roo.languagedetect.LanguageDetect('iso2');

};

Roo.languagedetect.Detect.prototype = {
    /**
     * 
     * @param {String} lang iso 639 language code
     * @returns {Boolean} indicate whether the language is detectable
     */
    isSupported : function(lang) {
        var supportedLangs = this.languageDetect.getLanguageCodes();
        if(!supportedLangs.includes(lang)) {
            return false;
        }

        return true;
    },
    /**
     * 
     * @param {String} input input text
     * @param {String} lang iso 639 language code
     * @returns {Boolean} indicate whether is the input text is written in input language
     */
    isLanguage : function(input, lang) {
        if(!this.isSupported(lang)) {
            return false;
        }
        var scores = this.languageDetect.detect(input);

        var ret = false;
        Roo.each(scores, (score) => {
            if(score[1] > 0.3 && score[0] == lang) {
                ret = true;
            }
        });

        return ret;
    },
    /**
     * 
     * @param {String} code iso 639 language code
     * @returns {String} name of the input language code
     */
    getName : function(code) {
        if(!this.isSupported(code)) {
            return '';
        }
        return this.languageDetect.getName2(code);
    }
}

Roo.apply(Roo.languagedetect.Detect, {
    koRegex : /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/,
    jaRegex : /[\u3040-\u30ff]|[\uff66-\uff9f]|[\u1aff0-\u1b16f]/,
});