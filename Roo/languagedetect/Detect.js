Roo.languagedetect.Detect = function() {
    this.languageDetect = new Roo.languagedetect.LanguageDetect('iso2');

    var regex = '/';
    Roo.each(Roo.languagedetect.zh_HK, function(code) {
        regex = regex + code + '|';
    });
    regex.replace(/\|$/, '');
    regex += '/';
    this.codeToRegex['zh_HK'] = new RegExp(regex);

    var regex = '/';
    Roo.each(Roo.languagedetect.zh_CN, function(code) {
        regex = regex + code + '|';
    });
    regex.replace(/\|$/, '');
    regex += '/';
    this.codeToRegex['zh_CN'] = new RegExp(regex);
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

    isScoreSupported : function(lang) {
        return this.languageDetect.getLanguageCodes().includes(lang);
    },
    isCountSupported : function(lang) {
        return Object.keys(this.codeToName).includes(lang);
    },
    isSupported : function(lang) {
        return this.isScoreSupported(lang) || this.isCountSupported(lang);
    },
    getName : function(code) {
        if(!this.isSupported(code)) {
            return '';
        }
        return (
            this.languageDetect.getName2(code) || // LanguageDetect
            this.codeToName[code] || // CJK
            ''
        );
    },
    isLanguage : function(input, lang) {
        if(!this.isSupported(lang)) {
            return false;
        }

        var isLang = {...this.detectLangByCount(input), ...this.detectLangByScore(input)};

        // positive testing
        if(typeof(isLang[lang]) === 'undefined' || isLang[lang] !== true) {
            return false;
        }

        var ret = true;

        Roo.each(Object.keys(isLang), function(code) {
            // negative testing
            if(code != lang && isLang[code] === true) {
                ret = false;
            }
        });

        return ret;
    },

    getHighestScore : function(input) {
        var scores = this.languageDetect.detect(input);
        if(!scores.length) {
            return [];
        }
        return scores[0];
    },
    detectLangByScore : function (input) {
        var score = this.getHighestScore(input);
        if(!score.length) {
            return {};
        }

        return {
            [score[0]] : score[1] > 0.2
        };
    },

    getCount : function(input) {
        var en = input.replaceAll(/[\s\d\p{P}]+/gu, ' ');
        en = en.replaceAll(/[^A-Za-z ]/g, '');
        Roo.log(en);
        var enWords = en.split('/\s+/');
        Roo.log(enWords);
        // var enWords = preg_split('/\s+/', trim($en)); // number of english words

        input = input.replaceAll(/\s+|\d+|[\p{P}]/gu, ''); // remove all spaces ,digits and punctuations

        var count = {};
        Roo.each(Object.keys(this.codeToRegex), function(code) {
            count[code] = 0;
            for(var i = 0; i < input.length; i ++) {
                if(this.codeToRegex[code].test(input[i])) {
                    count[code] ++;
                }
            }
        }, this);

        count['total'] = input.length;

        return count;
    },

    detectLangByCount : function(input) {
        var count = this.getCount(input);

        var ret = {};

        Roo.each(Object.keys(this.codeToName), function(code) {
            ret[code] = false;
        });

        if(count['total'] == 0) {
            return ret;
        }

        // japanese
        if (
            count['ja'] / count['total'] > 0.3 && // > 30% japanese characters
            (count['ja'] + count['cjk']) / count['total'] > 0.5 // > 50% (japanese characters + cjk)
        ) {
            ret['ja'] = true;
        }

        // korean
        if (
            count['ko'] / count['total'] > 0.3 && // > 30% korean characters
            (count['ko'] + count['cjk']) / count['total'] > 0.5 // > 50% (korean characters + cjk)
        ) {
            ret['ko'] = true;
        }

        // chinese
        if(
            !ret['ja'] && // not detected as japanese
            !ret['ko'] && // not detected as korean
            count['cjk'] / count['total'] > 0.5 // > 50% chinese characters
        ) {
            // traditional chinese if there are more traiditonal chinese characters than simplified chinese characters
            if(count['zh_HK'] > count['zh_CN']) {
                ret['zh_HK'] = true;
            }
            // else simplified chinese
            else {
                ret['zh_CN'] = true;
            }
        }

        if(count['th'] / count['total'] > 0.5) {
            ret['th'] = true;
        }

        if(count['he'] / count['total'] > 0.5) {
            ret['he'] = true;
        }

        return ret;

    }
};