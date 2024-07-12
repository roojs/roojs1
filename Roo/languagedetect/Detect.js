Roo.languagedetect.Detect = function() {
    this.languageDetect = new Roo.languagedetect.LanguageDetect('iso2');

};

Roo.languagedetect.Detect.prototype = {
    isSupported : function(lang) {
        var supportedLangs = this.languageDetect.getLanguageCodes();
        if(!supportedLangs.includes(lang)) {
            return false;
        }

        return true;
    },
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
    getName : function(code) {
        if(!this.isSupported(code)) {
            return false;
        }
        return this.languageDetect.getName2(code);
    }
}