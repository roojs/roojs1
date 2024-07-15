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
    // ac00-d7af : Hangul Syllables
    // 1100-11ff : Hangul Jamo
    // 3130-318f : Hangul Compatibility Jamo
    // a960-a97f : Hangul Jamo Extended-A
    // d7b0-d7ff : Hangul Jamo Extended-B
    koRegex : /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/,
    // 3040-309f : Hiragana
    // 30a0-30ff : Katakana
    // 31f0-31ff : Katakana Phonetic Extensions
    // 1aff0-1afff : Kana Extended-B
    // 1b000-1b0ff : Kana Supplement
    // 1b100-1b12f : Kana Extended-A
    // 1b130-1b16f : Small kana Extension
    jaRegex : /[\u3040-\u309f]|[\u30a0-\u30ff]|[\u31f0-\u31ff]/,
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
        Roo.each(['cjk', 'ja', 'ko', 'zh_HK', 'zh_CN'], function(code) {
            count[code] = 0;
        });

        $cjk = 0;

        for(var i = 0; i < input.length; i++) {
            // characters that appear in chinese, korean or japanese
            if(this.cjkRegex.test(input[i])) {
                $cjk ++;
            }
            // characters that only appear in simplified chinese
            if(Roo.languagedetect.zh_CN.includes(input[i])) {
                count['zh_CN'] ++;
                continue;
            }
            // characters that only appear in traditional chinese
            if(Roo.languagedetect.zh_HK.includes(input[i])) {
                count['zh_HK'] ++;
                continue;
            }
            // characters that only appear in korean
            if(this.koRegex.test(input[i])) {
                count['ko'] ++;
                continue;
            }
            // characters that only appear in japanese
            if(this.jaRegex.test(input[i])) {
                count['ja'] ++;
                continue;
            }
        }

        Roo.log($cjk);
        Roo.log(count);

        var estimated = false;

        switch(lang) {
            // korean
            case 'ko' :
                if(
                    count['ko'] / input.length > 0.3 && // > 30% korean character
                    (count['ko'] + $cjk) / input.length > 0.5 // > 50% (korean character + cjk)
                ) {
                    return true;
                }
                return false;
            // japanese
            case 'ja' :
                if(
                    count['ja'] / input.length > 0.3 && // > 30% japanese character
                    (count['ja'] + $cjk) / input.length > 0.5  // > 50% (japanese character + cjk)
                ) {
                    return true;
                }
                return false;
        }

        // chinese
        if($cjk / input.length < 0.5) { // < 50% chinese characters
            return false;
        }

        if(
            count['zh_CN'] > count['zh_HK'] && lang == 'zh_CN' || // more simplified chinese characters than traditional chinese characters
            count['zh_HK'] > count['zh_CN'] && lang == 'zh_HK' || // more traiditonal chinese characters than simplified chinese characters
            count['zh_CN'] == count['zh_HK'] // same number of characters
        ) {
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