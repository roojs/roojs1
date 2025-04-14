// source : https://github.com/FGRibreau/node-language-detect/tree/master

Roo.languagedetect.LanguageDetect = function (languageType) {

  /**
   * The trigram data for comparison
   *
   * Will be loaded on start from $this->_db_filename
   *
   * May be set to a PEAR_Error object if there is an error during its
   * initialization
   *
   * @var      array
   * @access   private
   */
  this.langDb = {};

  /**
   * The size of the trigram data arrays
   *
   * @var     int
   * @access  private
   */
  this.threshold = 300;

  this.useUnicodeNarrowing = true;

  /**
   * Constructor
   *
   * Load the language database.
   *
   */
  this.langDb = Roo.languagedetect.dbLang['trigram'];
  this.unicodeMap = Roo.languagedetect.dbLang['trigram-unicodemap'];

  this.languageType = languageType || null;
};

Roo.languagedetect.LanguageDetect.prototype = {

  /**
   * Returns the number of languages that this object can detect
   *
   * @access public
   * @return int the number of languages
   */
  getLanguageCount:function () {
    return this.getLanguages().length;
  },

  setLanguageType:function (type) {
    return this.languageType = type;
  },

  /**
   * Returns the list of detectable languages
   *
   * @access public
   * @return object the names of the languages known to this object
   */
  getLanguages:function () {
    return Object.keys(this.langDb);
  },

  /**
   * Returns the list of detectable languages in code
   * 
   * @returns object the code of the languages known to this object
   * 
   */
  getLanguageCodes:function() {
      var languages = this.getLanguages();
      switch(this.languageType) {
          case 'iso2' :
            return languages.map((name) => this.getCode2(name)).filter(code => code !== null);
          case 'iso3' :
            return languages.map((name) => this.getCode3(name)).filter(code => code !== null);
          default :
            return languages;
      }
  },

  /**
   * Calculates a linear rank-order distance statistic between two sets of
   * ranked trigrams
   *
   * Sums the differences in rank for each trigram. If the trigram does not
   * appear in both, consider it a difference of $this->_threshold.
   *
   * This distance measure was proposed by Cavnar & Trenkle (1994). Despite
   * its simplicity it has been shown to be highly accurate for language
   * identification tasks.
   *
   * @access  private
   * @param   arr1  the reference set of trigram ranks
   * @param   arr2  the target set of trigram ranks
   * @return  int   the sum of the differences between the ranks of
   *                the two trigram sets
   */
  distance:function (arr1, arr2) {
    var me = this
      , sumdist = 0
      , keys = Object.keys(arr2)
      , i;

    for (i = keys.length; i--;) {
      sumdist += arr1[keys[i]] ? Math.abs(arr2[keys[i]] - arr1[keys[i]]) : me.threshold;
    }

    return sumdist;
  },

  /**
   * Normalizes the score returned by _distance()
   *
   * Different if perl compatible or not
   *
   * @access  private
   * @param   score       the score from _distance()
   * @param   baseCount   the number of trigrams being considered
   * @return  number      the normalized score
   *
   * @see     distance()
   */
  normalizeScore:function (score, baseCount) {
    return 1 - (score / (baseCount || this.threshold) / this.threshold);
  },

  /**
   * Detects the closeness of a sample of text to the known languages
   *
   * Calculates the statistical difference between the text and
   * the trigrams for each language, normalizes the score then
   * returns results for all languages in sorted order
   *
   * If perl compatible, the score is 300-0, 0 being most similar.
   * Otherwise, it's 0-1 with 1 being most similar.
   *
   * The $sample text should be at least a few sentences in length;
   * should be ascii-7 or utf8 encoded, if another and the mbstring extension
   * is present it will try to detect and convert. However, experience has
   * shown that mb_detect_encoding() *does not work very well* with at least
   * some types of encoding.
   *
   * @access  public
   * @param   sample  a sample of text to compare.
   * @param   limit  if specified, return an array of the most likely
   *                  $limit languages and their scores.
   * @return  Array   sorted array of language scores, blank array if no
   *                  useable text was found, or PEAR_Error if error
   *                  with the object setup
   *
   * @see     distance()
   */
  detect:function (sample, limit) {
    var me = this
      , scores = [];

    limit = +limit || 0;

    if (sample == '' || String(sample).length < 3) {return [];}

    var sampleObj = new Roo.languagedetect.Parser(sample);
    Roo.log(this.object.start());
    sampleObj.setPadStart(true);
    sampleObj.analyze();

    var trigramFreqs = sampleObj.getTrigramRanks()
      , trigramCount = Object.keys(trigramFreqs).length;

    Roo.log('TRIGRAMFREQ');
    Roo.log(trigramFreqs);

    if (trigramCount == 0) {return [];}

    var keys = [], i, lang;

    if (this.useUnicodeNarrowing) {
      var blocks = sampleObj.getUnicodeBlocks()
        , languages = Object.keys(blocks)
        , keysLength = languages.length;

      for (i = keysLength; i--;) {
        if (this.unicodeMap[languages[i]]) {
          for (lang in this.unicodeMap[languages[i]]) {
            if (!~keys.indexOf(lang)) {keys.push(lang);}
          }
        }
      }
    } else {
      keys = me.getLanguages();
    }

    for (i = keys.length; i--;) {
      var score = me.normalizeScore(me.distance(me.langDb[keys[i]], trigramFreqs), trigramCount);
      if (score) {scores.push([keys[i], score]);}
    }

    // Sort the array
    scores.sort(function (a, b) { return b[1] - a[1]; });
    var scoresLength = scores.length;

    if (!scoresLength) {return [];}

    switch (me.languageType) {
      case 'iso2':
        for (i = scoresLength; i--;) {
          scores[i][0] = this.getCode2(scores[i][0]);
        }
        break;
      case 'iso3':
        for (i = scoresLength; i--;) {
          scores[i][0] = this.getCode3(scores[i][0]);
        }
        break;
    }

    // limit the number of returned scores
    return limit > 0 ? scores.slice(0, limit) : scores;
  },

  getCode2:function (lang) {
    return Roo.languagedetect.LanguageDetect.nameToCode2[String(lang).toLowerCase()] || null;
  },

  getCode3: function(lang) {
    return Roo.languagedetect.LanguageDetect.nameToCode3[String(lang).toLowerCase()] || null;
  },

  getName2: function(code) {
    return Roo.languagedetect.LanguageDetect.code2ToName[String(code).toLowerCase()] || null;
  },

  getName3: function(code) {
    return Roo.languagedetect.LanguageDetect.code3ToName[String(code).toLowerCase()] || null;
  }
};

Roo.apply(Roo.languagedetect.LanguageDetect, {
  nameToCode2:{
    'albanian':'sq',
    'arabic':'ar',
    'azeri':'az',
    'bengali':'bn',
    'bulgarian':'bg',
    'cebuano':null,
    'croatian':'hr',
    'czech':'cs',
    'danish':'da',
    'dutch':'nl',
    'english':'en',
    'estonian':'et',
    'farsi':'fa',
    'finnish':'fi',
    'french':'fr',
    'german':'de',
    'hausa':'ha',
    'hawaiian':null,
    'hindi':'hi',
    'hungarian':'hu',
    'icelandic':'is',
    'indonesian':'id',
    'italian':'it',
    'kazakh':'kk',
    'kyrgyz':'ky',
    'latin':'la',
    'latvian':'lv',
    'lithuanian':'lt',
    'macedonian':'mk',
    'mongolian':'mn',
    'nepali':'ne',
    'norwegian':'no',
    'pashto':'ps',
    'pidgin':null,
    'polish':'pl',
    'portuguese':'pt',
    'romanian':'ro',
    'russian':'ru',
    'serbian':'sr',
    'slovak':'sk',
    'slovene':'sl',
    'somali':'so',
    'spanish':'es',
    'swahili':'sw',
    'swedish':'sv',
    'tagalog':'tl',
    'turkish':'tr',
    'ukrainian':'uk',
    'urdu':'ur',
    'uzbek':'uz',
    'vietnamese':'vi',
    'welsh':'cy'
  },

  nameToCode3:{
    'albanian':'sqi',
    'arabic':'ara',
    'azeri':'aze',
    'bengali':'ben',
    'bulgarian':'bul',
    'cebuano':'ceb',
    'croatian':'hrv',
    'czech':'ces',
    'danish':'dan',
    'dutch':'nld',
    'english':'eng',
    'estonian':'est',
    'farsi':'fas',
    'finnish':'fin',
    'french':'fra',
    'german':'deu',
    'hausa':'hau',
    'hawaiian':'haw',
    'hindi':'hin',
    'hungarian':'hun',
    'icelandic':'isl',
    'indonesian':'ind',
    'italian':'ita',
    'kazakh':'kaz',
    'kyrgyz':'kir',
    'latin':'lat',
    'latvian':'lav',
    'lithuanian':'lit',
    'macedonian':'mkd',
    'mongolian':'mon',
    'nepali':'nep',
    'norwegian':'nor',
    'pashto':'pus',
    'pidgin':'crp',
    'polish':'pol',
    'portuguese':'por',
    'romanian':'ron',
    'russian':'rus',
    'serbian':'srp',
    'slovak':'slk',
    'slovene':'slv',
    'somali':'som',
    'spanish':'spa',
    'swahili':'swa',
    'swedish':'swe',
    'tagalog':'tgl',
    'turkish':'tur',
    'ukrainian':'ukr',
    'urdu':'urd',
    'uzbek':'uzb',
    'vietnamese':'vie',
    'welsh':'cym'
  },
  code2ToName:{
    'ar':'arabic',
    'az':'azeri',
    'bg':'bulgarian',
    'bn':'bengali',
    'cs':'czech',
    'cy':'welsh',
    'da':'danish',
    'de':'german',
    'en':'english',
    'es':'spanish',
    'et':'estonian',
    'fa':'farsi',
    'fi':'finnish',
    'fr':'french',
    'ha':'hausa',
    'hi':'hindi',
    'hr':'croatian',
    'hu':'hungarian',
    'id':'indonesian',
    'is':'icelandic',
    'it':'italian',
    'kk':'kazakh',
    'ky':'kyrgyz',
    'la':'latin',
    'lt':'lithuanian',
    'lv':'latvian',
    'mk':'macedonian',
    'mn':'mongolian',
    'ne':'nepali',
    'nl':'dutch',
    'no':'norwegian',
    'pl':'polish',
    'ps':'pashto',
    'pt':'portuguese',
    'ro':'romanian',
    'ru':'russian',
    'sk':'slovak',
    'sl':'slovene',
    'so':'somali',
    'sq':'albanian',
    'sr':'serbian',
    'sv':'swedish',
    'sw':'swahili',
    'tl':'tagalog',
    'tr':'turkish',
    'uk':'ukrainian',
    'ur':'urdu',
    'uz':'uzbek',
    'vi':'vietnamese'
  },

  code3ToName:{
    'ara':'arabic',
    'aze':'azeri',
    'ben':'bengali',
    'bul':'bulgarian',
    'ceb':'cebuano',
    'ces':'czech',
    'crp':'pidgin',
    'cym':'welsh',
    'dan':'danish',
    'deu':'german',
    'eng':'english',
    'est':'estonian',
    'fas':'farsi',
    'fin':'finnish',
    'fra':'french',
    'hau':'hausa',
    'haw':'hawaiian',
    'hin':'hindi',
    'hrv':'croatian',
    'hun':'hungarian',
    'ind':'indonesian',
    'isl':'icelandic',
    'ita':'italian',
    'kaz':'kazakh',
    'kir':'kyrgyz',
    'lat':'latin',
    'lav':'latvian',
    'lit':'lithuanian',
    'mkd':'macedonian',
    'mon':'mongolian',
    'nep':'nepali',
    'nld':'dutch',
    'nor':'norwegian',
    'pol':'polish',
    'por':'portuguese',
    'pus':'pashto',
    'rom':'romanian',
    'rus':'russian',
    'slk':'slovak',
    'slv':'slovene',
    'som':'somali',
    'spa':'spanish',
    'sqi':'albanian',
    'srp':'serbian',
    'swa':'swahili',
    'swe':'swedish',
    'tgl':'tagalog',
    'tur':'turkish',
    'ukr':'ukrainian',
    'urd':'urdu',
    'uzb':'uzbek',
    'vie':'vietnamese'
  }
});