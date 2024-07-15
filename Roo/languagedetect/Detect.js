Roo.languagedetect.Detect = function() {
    this.languageDetect = new Roo.languagedetect.LanguageDetect('iso2');
};

Roo.languagedetect.Detect.prototype = {
    // 4e00-9fff : CJK Unified Ideographs
    // 3400-4dbf : CJK Unified Ideographs Extension A
    // 20000-2a6df : CJK Unified Ideographs Extension B
    // 2a700-2b73f : CJK Unified Ideographs Extension C
    // 2b740-2b81f : CJK Unified Ideographs Extension D
    // 2b820-2ceaf : CJK Unified Ideographs Extension E
    // 2ceb0-2ebef : CJK Unified Ideographs Extension F
    // 30000-3134f : CJK Unified Ideographs Extension G
    // 31350-323af : CJK Unified Ideographs Extension H
    // 2ebf0-2ee5f : CJK Unified Ideographs Extension I
    // f900-faff : CJK Compatibility Ideographs
    cjkRegex : /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\uf900-\ufaff]/,
    koRegex : /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/,
    jaRegex : /[\u3040-\u30ff]|[\uff66-\uff9f]/,
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
            if(this.cjkRegex.test(input[i]) || this.koRegex.test(input[i])) {
                count['ko'] ++;
            }
            if(this.cjkRegex.test(input[i]) || this.jaRegex.test(input[i])) {
                count['ja'] ++;
            }
            if(this.cjkRegex.test(input[i]) || Roo.languagedetect.zh_CN.includes(input[i])) {
                count['zh_CN'] ++;
            }
            if(this.cjkRegex.test(input[i]) || Roo.languagedetect.zh_HK.includes(input[i])) {
                count['zh_HK'] ++;
            }
        }

        Roo.log(input.length);
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