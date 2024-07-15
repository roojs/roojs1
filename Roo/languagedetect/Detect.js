Roo.languagedetect.Detect = function() {
    this.languageDetect = new Roo.languagedetect.LanguageDetect('iso2');
};

Roo.languagedetect.Detect.prototype = {
    koRegex : /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/,
    jaRegex : /[\u3040-\u30ff]|[\uff66-\uff9f]|[\u1aff0-\u1b16f]/,
    codeToName : {
        'ja':'japanese',
        'ko':'korean',
        'zh_HK':'traditional chinese',
        'zh_CN':'simplified chinese'
    },

    /**
     * 
     * @param {String} lang iso 639 language code
     * @returns {Boolean} indicate whether the language is detectable
     */
    isSupported : function(lang) {
        var supportedLangs = this.languageDetect.getLanguageCodes();

        supportedLangs.push('ja', 'ko', 'zh_HK', 'zh_CN');

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

        if(['ja', 'ko', 'zh_HK', 'zh_CN'].includes(lang)) {
            return this.isCJK(input, lang);
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
    isCJK : function(input, lang) {
        var count = {};
        Roo.each(['ja', 'ko', 'zh_HK', 'zh_CN'], function(code) {
            count[code] = 0;
        });

        for(var i = 0; i < input.length; i++) {
            if(this.koRegex.test(input[i])) {
                count['ko'] ++;
                continue;
            }
            if(this.jaRegex.test(input[i])) {
                Roo.log(input[i]);
                count['ja'] ++;
                continue;
            }
            if(Roo.languagedetect.zh_CN.includes(input[i])) {
                count['zh_CN'] ++;
                continue;
            }
            if(Roo.languagedetect.zh_HK.includes(input[i])) {
                count['zh_HK'] ++;
                continue;
            }
        }

        Roo.log(count);

        // find the language with most character
        var max = false;
        for (var code in count) {
            if(!max) {
                max = code;
                continue;
            }

            if(count[code] > count[max]) {
                max = code;
            }
        }

        if(max == lang) {
            return true;
        }

        
        return false;
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
        return (
            this.languageDetect.getName2(code) || // LanguageDetect
            this.codeToName[code] || // CJK
            null
        );
    }
};