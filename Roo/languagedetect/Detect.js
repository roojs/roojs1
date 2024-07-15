Roo.languagedetect.Detect = function() {
    this.languageDetect = new Roo.languagedetect.LanguageDetect('iso2');
};

Roo.languagedetect.Detect.prototype = {
    // characters in supplementary planes (\u{xxxxx}) are not detected.
    codeToRegex : {
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
        'cjk' : /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\uf900-\ufaff]/,
        // 3040-309f : Hiragana
        // 30a0-30ff : Katakana
        // 31f0-31ff : Katakana Phonetic Extensions
        // 1aff0-1afff : Kana Extended-B
        // 1b000-1b0ff : Kana Supplement
        // 1b100-1b12f : Kana Extended-A
        // 1b130-1b16f : Small kana Extension
        'ja' : /[\u3040-\u30ff]|[\u31f0-\u31ff]/,
        // ac00-d7af : Hangul Syllables
        // 1100-11ff : Hangul Jamo
        // 3130-318f : Hangul Compatibility Jamo
        // a960-a97f : Hangul Jamo Extended-A
        // d7b0-d7ff : Hangul Jamo Extended-B
        'ko' : /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/,
        // 0e00-0e7f : Thai
        'th' : /[\u0e00-\u0e7f]/,
        // 0590-05ff : Hebrew
        // fb1d-fb4f : Hebrew Presentation Forms
        'he' : /[\u0590-\u05ff]|[\ufb1d-\ufb4f]/
    },

    codeToName : {
        'ja':'japanese',
        'ko':'korean',
        'zh_HK':'traditional chinese',
        'zh_CN':'simplified chinese',
        'th':'thai',
        'he':'hebrew'
    },

    /**
     * 
     * @param {String} lang iso 639 language code
     * @returns {Boolean} indicate whether the language is detectable
     */
    isSupported : function(lang) {
        var supportedLangs = this.languageDetect.getLanguageCodes();

        supportedLangs.push(...Object.keys(this.codeToName));

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

        if(['th', 'he'].includes(lang)) {
            return this.isLang(input, lang);
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
        // only japanese, korean, traditional chinese and simplified chinese are detected
        if(!['ja', 'ko', 'zh_HK', 'zh_CN'].includes(lang)) {
            return false;
        }
        
        // remove all spaces
        input = input.replaceAll(new RegExp(/\s+/, 'g'), '');

        var count = {};
        Roo.each(['cjk', 'ja', 'ko', 'zh_HK', 'zh_CN'], function(code) {
            count[code] = 0;
        });

        for(var i = 0; i < input.length; i++) {
            // characters that appear in chinese, korean or japanese
            if(this.codeToRegex['cjk'].test(input[i])) {
                count['cjk'] ++;
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
            if(this.codeToRegex['ko'].test(input[i])) {
                count['ko'] ++;
                continue;
            }
            // characters that only appear in japanese
            if(this.codeToRegex['ja'].test(input[i])) {
                count['ja'] ++;
                continue;
            }
        }

        switch(lang) {
            // korean
            case 'ko' :
                if(
                    count['ko'] / input.length > 0.3 && // > 30% korean characters
                    (count['ko'] + count['cjk']) / input.length > 0.5 // > 50% (korean characters + cjk)
                ) {
                    return true;
                }
                return false;
            // japanese
            case 'ja' :
                if(
                    count['ja'] / input.length > 0.3 && // > 30% japanese characters
                    (count['ja'] + count['cjk']) / input.length > 0.5  // > 50% (japanese characters + cjk)
                ) {
                    return true;
                }
                return false;
        }

        // chinese
        if(
            count['cjk'] / input.length > 0.5 && // > 50% chinese characters
            (
                count['zh_CN'] > count['zh_HK'] && lang == 'zh_CN' || // more simplified chinese characters than traditional chinese characters
                count['zh_HK'] > count['zh_CN'] && lang == 'zh_HK' || // more traiditonal chinese characters than simplified chinese characters
                count['zh_CN'] == count['zh_HK'] // same number of simplified and traditional chinese characters
            )
        ) {
            return true;
        }

        
        return false;
    },
    isLang : function(input, lang) {
        // only thai and hebrew are detected
        if(!['th', 'he'].includes(lang)) {
            return false;
        }

        // remove all spaces
        input = input.replaceAll(new RegExp(/\s+/, 'g'), '');

        var count = 0;

        for(var i = 0; i < input.length; i++) {
            // characters that appear in that language
            if(this.codeToRegex[lang].test(input[i])) {
                count ++;
            }
        }

        if(count / input.length > 0.5) {
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
            ''
        );
    }
};