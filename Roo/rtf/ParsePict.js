Roo.rtf.ParsePict = function(text) {
    console.log("START PARSE PICT");
    var start = performance.now();
    var index = text.indexOf('{\\*\\shppict');
    console.log(index);
    console.log("END PARSE PICT");
    var end = performance.now();
    Roo.log('TIME TAKEN');
    Roo.log(end - start);
}

Roo.rtf.ParsePict.prototype = {
    parseText : function(c) {
        if(c == '{') {
            this.emitStartGroup()
        }
    },

    emitStartGroup : function() {
        this.emitText();
    },

    emitText : function() {
        if(this.text == '') {
            return;
        }
    }
}