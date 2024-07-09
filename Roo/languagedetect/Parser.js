Roo.languagedetect.Parser = function (string) {
    /**
     * The size of the trigram data arrays
     *
     * @access   private
     * @var      int
     */
    this.threshold = 300;
  
    /**
     * stores the trigram ranks of the sample
     *
     * @access  private
     * @var     array
     */
    this.trigramRanks = {};
  
    /**
     * Whether the parser should compile trigrams
     *
     * @access  private
     * @var     bool
     */
    this.compileTrigram = true;
  
    this.compileUnicode = true;
    this.unicodeSkipAscii = true;
    this.unicodeBlocks = {};
  
    /**
     * Whether the trigram parser should pad the beginning of the string
     *
     * @access  private
     * @var     bool
     */
    this.trigramPadStart = false;
  
    this.trigram = {};
  
    /**
     * the piece of text being parsed
     *
     * @access  private
     * @var     string
     */
  
    /**
     * Constructor
     *
     * @access  private
     * @param   string  string to be parsed
     */
    this.string = string ? string.replace(/[~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/g, ' ') : '';
};

  
Roo.languagedetect.Parser.prototype = {
  /**
   * turn on/off padding the beginning of the sample string
   *
   * @access  public
   * @param   bool   true for on, false for off
   */
  setPadStart: function (bool) {
    this.trigramPadStart = bool || true;
  },

  /**
   * Returns the trigram ranks for the text sample
   *
   * @access  public
   * @return  array   trigram ranks in the text sample
   */
  getTrigramRanks: function () {
    return this.trigramRanks;
  },

  getBlockCount: function () {
    return Roo.languagedetect.Parser.dbUnicodeBlocks.length;
  },

  getUnicodeBlocks: function () {
    return this.unicodeBlocks;
  },

  /**
   * Executes the parsing operation
   *
   * Be sure to call the set*() functions to set options and the
   * prepare*() functions first to tell it what kind of data to compute
   *
   * Afterwards the get*() functions can be used to access the compiled
   * information.
   *
   * @access public
   */
  analyze: function () {
    var len = this.string.length
      , byteCounter = 0
      , a = ' ', b = ' '
      , dropone, c;

    if (this.compileUnicode) {
      var blocksCount = Roo.languagedetect.Parser.dbUnicodeBlocks.length;
    }

    // trigram startup
    if (this.compileTrigram) {
      // initialize them as blank so the parser will skip the first two
      // (since it skips trigrams with more than  2 contiguous spaces)
      a = ' ';
      b = ' ';

      // kludge
      // if it finds a valid trigram to start and the start pad option is
      // off, then set a variable that will be used to reduce this
      // trigram after parsing has finished
      if (!this.trigramPadStart) {
        a = this.string.charAt(byteCounter++).toLowerCase();

        if (a != ' ') {
          b = this.string.charAt(byteCounter).toLowerCase();
          dropone = ' ' + a + b;
        }

        byteCounter = 0;
        a = ' ';
        b = ' ';
      }
    }

    var skippedCount = 0;
    var unicodeChars = {};

    while (byteCounter < len) {
      c = this.string.charAt(byteCounter++).toLowerCase();

      // language trigram detection
      if (this.compileTrigram) {
        if (!(b == ' ' && (a == ' ' || c == ' '))) {
          var abc = a + b + c;
          this.trigram[abc] = this.trigram[abc] ? this.trigram[abc] += 1 : 1;
        }

        a = b;
        b = c;
      }

      if (this.compileUnicode) {
        var charCode = c.charCodeAt(0);

        if (this.unicodeSkipAscii
          && c.match(/[a-z ]/i)
          && (charCode < 65 || charCode > 122 || (charCode > 90 && charCode < 97))
          && c != "'") {

          skippedCount++;
          continue;
        }

        unicodeChars[c] = unicodeChars[c] ? unicodeChars[c] += 1 : 1;
      }
    }

    this.unicodeBlocks = {};

    if (this.compileUnicode) {
      var keys = Object.keys(unicodeChars)
        , keysLength = keys.length;

      for (var i = keysLength; i--;) {
        var unicode = keys[i].charCodeAt(0)
          , count = unicodeChars[keys[i]]
          , search = this.unicodeBlockName(unicode, blocksCount)
          , blockName = search != -1 ? search[2] : '[Malformatted]';

        this.unicodeBlocks[blockName] = this.unicodeBlocks[blockName] ? this.unicodeBlocks[blockName] += count : count;
      }
    }

    // trigram cleanup
    if (this.compileTrigram) {
      // pad the end
      if (b != ' ') {
        var ab = a + b + ' ';
        this.trigram[ab] = this.trigram[ab] ? this.trigram[ab] += 1 : 1;
      }

      // perl compatibility; Language::Guess does not pad the beginning
      // kludge
      if (typeof dropone != 'undefined' && this.trigram[dropone] == 1) {
        delete this.trigram[dropone];
      }

      if (this.trigram && Object.keys(this.trigram).length > 0) {
        this.trigramRanks = this.arrRank(this.trigram);
      } else {
        this.trigramRanks = {};
      }
    }
  },

  /**
   * Sorts an array by value breaking ties alphabetically
   *
   * @access private
   * @param arr the array to sort
   */
  bubleSort: function (arr) {
    // should do the same as this perl statement:
    // sort { $trigrams{$b} == $trigrams{$a} ?  $a cmp $b : $trigrams{$b} <=> $trigrams{$a} }

    // needs to sort by both key and value at once
    // using the key to break ties for the value

    // converts array into an array of arrays of each key and value
    // may be a better way of doing this
    var combined = [];

    for (var key in arr) {
      combined.push([key, arr[key]]);
    }

    combined = combined.sort(this.sortFunc);

    var replacement = {};

    var length = combined.length;

    for (var i = 0; i < length; i++) {
      replacement[combined[i][0]] = combined[i][1];
    }

    return replacement;
  },

  /**
   * Converts a set of trigrams from frequencies to ranks
   *
   * Thresholds (cuts off) the list at $this->_threshold
   *
   * @access  protected
   * @param   arr     array of trgram
   * @return  object  ranks of trigrams
   */
  arrRank: function (arr) {

    // sorts alphabetically first as a standard way of breaking rank ties
    arr = this.bubleSort(arr);

    var rank = {}, i = 0;

    for (var key in arr) {
      rank[key] = i++;

      // cut off at a standard threshold
      if (i >= this.threshold) {
        break;
      }
    }

    return rank;
  },

  /**
   * Sort function used by bubble sort
   *
   * Callback function for usort().
   *
   * @access   private
   * @param    a    first param passed by usort()
   * @param    b    second param passed by usort()
   * @return   int  1 if $a is greater, -1 if not
   *
   * @see      bubleSort()
   */
  sortFunc: function (a, b) {
    // each is actually a key/value pair, so that it can compare using both
    var aKey = a[0]
      , aValue = a[1]
      , bKey = b[0]
      , bValue = b[1];

    // if the values are the same, break ties using the key
    if (aValue == bValue) {
      return aKey.localeCompare(bKey);
    } else {
      return aValue > bValue ? -1 : 1;
    }
  },

  unicodeBlockName: function (unicode, blockCount) {
    if (unicode <= Roo.languagedetect.Parser.dbUnicodeBlocks[0][1]) {
      return Roo.languagedetect.Parser.dbUnicodeBlocks[0];
    }

    var high = blockCount ? blockCount - 1 : Roo.languagedetect.Parser.dbUnicodeBlocks.length
      , low = 1
      , mid;

    while (low <= high) {
      mid = Math.floor((low + high) / 2);

      if (unicode < Roo.languagedetect.Parser.dbUnicodeBlocks[mid][0]) {
        high = mid - 1;
      } else if (unicode > Roo.languagedetect.Parser.dbUnicodeBlocks[mid][1]) {
        low = mid + 1;
      } else {
        return Roo.languagedetect.Parser.dbUnicodeBlocks[mid];
      }
    }

    return -1;
  }
};

Roo.apply(Roo.languagedetect.Parser, {
    dbUnicodeBlocks : [["0x0000","0x007F","Basic Latin"],["0x0080","0x00FF","Latin-1 Supplement"],["0x0100","0x017F","Latin Extended-A"],["0x0180","0x024F","Latin Extended-B"],["0x0250","0x02AF","IPA Extensions"],["0x02B0","0x02FF","Spacing Modifier Letters"],["0x0300","0x036F","Combining Diacritical Marks"],["0x0370","0x03FF","Greek and Coptic"],["0x0400","0x04FF","Cyrillic"],["0x0500","0x052F","Cyrillic Supplement"],["0x0530","0x058F","Armenian"],["0x0590","0x05FF","Hebrew"],["0x0600","0x06FF","Arabic"],["0x0700","0x074F","Syriac"],["0x0750","0x077F","Arabic Supplement"],["0x0780","0x07BF","Thaana"],["0x0900","0x097F","Devanagari"],["0x0980","0x09FF","Bengali"],["0x0A00","0x0A7F","Gurmukhi"],["0x0A80","0x0AFF","Gujarati"],["0x0B00","0x0B7F","Oriya"],["0x0B80","0x0BFF","Tamil"],["0x0C00","0x0C7F","Telugu"],["0x0C80","0x0CFF","Kannada"],["0x0D00","0x0D7F","Malayalam"],["0x0D80","0x0DFF","Sinhala"],["0x0E00","0x0E7F","Thai"],["0x0E80","0x0EFF","Lao"],["0x0F00","0x0FFF","Tibetan"],["0x1000","0x109F","Myanmar"],["0x10A0","0x10FF","Georgian"],["0x1100","0x11FF","Hangul Jamo"],["0x1200","0x137F","Ethiopic"],["0x1380","0x139F","Ethiopic Supplement"],["0x13A0","0x13FF","Cherokee"],["0x1400","0x167F","Unified Canadian Aboriginal Syllabics"],["0x1680","0x169F","Ogham"],["0x16A0","0x16FF","Runic"],["0x1700","0x171F","Tagalog"],["0x1720","0x173F","Hanunoo"],["0x1740","0x175F","Buhid"],["0x1760","0x177F","Tagbanwa"],["0x1780","0x17FF","Khmer"],["0x1800","0x18AF","Mongolian"],["0x1900","0x194F","Limbu"],["0x1950","0x197F","Tai Le"],["0x1980","0x19DF","New Tai Lue"],["0x19E0","0x19FF","Khmer Symbols"],["0x1A00","0x1A1F","Buginese"],["0x1D00","0x1D7F","Phonetic Extensions"],["0x1D80","0x1DBF","Phonetic Extensions Supplement"],["0x1DC0","0x1DFF","Combining Diacritical Marks Supplement"],["0x1E00","0x1EFF","Latin Extended Additional"],["0x1F00","0x1FFF","Greek Extended"],["0x2000","0x206F","General Punctuation"],["0x2070","0x209F","Superscripts and Subscripts"],["0x20A0","0x20CF","Currency Symbols"],["0x20D0","0x20FF","Combining Diacritical Marks for Symbols"],["0x2100","0x214F","Letterlike Symbols"],["0x2150","0x218F","Number Forms"],["0x2190","0x21FF","Arrows"],["0x2200","0x22FF","Mathematical Operators"],["0x2300","0x23FF","Miscellaneous Technical"],["0x2400","0x243F","Control Pictures"],["0x2440","0x245F","Optical Character Recognition"],["0x2460","0x24FF","Enclosed Alphanumerics"],["0x2500","0x257F","Box Drawing"],["0x2580","0x259F","Block Elements"],["0x25A0","0x25FF","Geometric Shapes"],["0x2600","0x26FF","Miscellaneous Symbols"],["0x2700","0x27BF","Dingbats"],["0x27C0","0x27EF","Miscellaneous Mathematical Symbols-A"],["0x27F0","0x27FF","Supplemental Arrows-A"],["0x2800","0x28FF","Braille Patterns"],["0x2900","0x297F","Supplemental Arrows-B"],["0x2980","0x29FF","Miscellaneous Mathematical Symbols-B"],["0x2A00","0x2AFF","Supplemental Mathematical Operators"],["0x2B00","0x2BFF","Miscellaneous Symbols and Arrows"],["0x2C00","0x2C5F","Glagolitic"],["0x2C80","0x2CFF","Coptic"],["0x2D00","0x2D2F","Georgian Supplement"],["0x2D30","0x2D7F","Tifinagh"],["0x2D80","0x2DDF","Ethiopic Extended"],["0x2E00","0x2E7F","Supplemental Punctuation"],["0x2E80","0x2EFF","CJK Radicals Supplement"],["0x2F00","0x2FDF","Kangxi Radicals"],["0x2FF0","0x2FFF","Ideographic Description Characters"],["0x3000","0x303F","CJK Symbols and Punctuation"],["0x3040","0x309F","Hiragana"],["0x30A0","0x30FF","Katakana"],["0x3100","0x312F","Bopomofo"],["0x3130","0x318F","Hangul Compatibility Jamo"],["0x3190","0x319F","Kanbun"],["0x31A0","0x31BF","Bopomofo Extended"],["0x31C0","0x31EF","CJK Strokes"],["0x31F0","0x31FF","Katakana Phonetic Extensions"],["0x3200","0x32FF","Enclosed CJK Letters and Months"],["0x3300","0x33FF","CJK Compatibility"],["0x3400","0x4DBF","CJK Unified Ideographs Extension A"],["0x4DC0","0x4DFF","Yijing Hexagram Symbols"],["0x4E00","0x9FFF","CJK Unified Ideographs"],["0xA000","0xA48F","Yi Syllables"],["0xA490","0xA4CF","Yi Radicals"],["0xA700","0xA71F","Modifier Tone Letters"],["0xA800","0xA82F","Syloti Nagri"],["0xAC00","0xD7AF","Hangul Syllables"],["0xD800","0xDB7F","High Surrogates"],["0xDB80","0xDBFF","High Private Use Surrogates"],["0xDC00","0xDFFF","Low Surrogates"],["0xE000","0xF8FF","Private Use Area"],["0xF900","0xFAFF","CJK Compatibility Ideographs"],["0xFB00","0xFB4F","Alphabetic Presentation Forms"],["0xFB50","0xFDFF","Arabic Presentation Forms-A"],["0xFE00","0xFE0F","Variation Selectors"],["0xFE10","0xFE1F","Vertical Forms"],["0xFE20","0xFE2F","Combining Half Marks"],["0xFE30","0xFE4F","CJK Compatibility Forms"],["0xFE50","0xFE6F","Small Form Variants"],["0xFE70","0xFEFF","Arabic Presentation Forms-B"],["0xFF00","0xFFEF","Halfwidth and Fullwidth Forms"],["0xFFF0","0xFFFF","Specials"],["0x10000","0x1007F","Linear B Syllabary"],["0x10080","0x100FF","Linear B Ideograms"],["0x10100","0x1013F","Aegean Numbers"],["0x10140","0x1018F","Ancient Greek Numbers"],["0x10300","0x1032F","Old Italic"],["0x10330","0x1034F","Gothic"],["0x10380","0x1039F","Ugaritic"],["0x103A0","0x103DF","Old Persian"],["0x10400","0x1044F","Deseret"],["0x10450","0x1047F","Shavian"],["0x10480","0x104AF","Osmanya"],["0x10800","0x1083F","Cypriot Syllabary"],["0x10A00","0x10A5F","Kharoshthi"],["0x1D000","0x1D0FF","Byzantine Musical Symbols"],["0x1D100","0x1D1FF","Musical Symbols"],["0x1D200","0x1D24F","Ancient Greek Musical Notation"],["0x1D300","0x1D35F","Tai Xuan Jing Symbols"],["0x1D400","0x1D7FF","Mathematical Alphanumeric Symbols"],["0x20000","0x2A6DF","CJK Unified Ideographs Extension B"],["0x2F800","0x2FA1F","CJK Compatibility Ideographs Supplement"],["0xE0000","0xE007F","Tags"],["0xE0100","0xE01EF","Variation Selectors Supplement"],["0xF0000","0xFFFFF","Supplementary Private Use Area-A"],["0x100000","0x10FFFF","Supplementary Private Use Area-B"]]
});