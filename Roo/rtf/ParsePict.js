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
    group : false,
    gropuStack : false,
    text : '',

    parseText : function(c) {
        if(c == '{') {
            this.emitStartGroup()
        }
    },

    emitStartGroup : function() {
        this.emitText();

        if (this.group) {
            this.groupStack.push(this.group);
        }
         // parent..
        if (this.doc === false) {
            this.group = this.doc = new Roo.rtf.Document();
            return;
            
        }
        this.group = new Roo.rtf.Group(this.group);
    },

    emitText : function() {
        if(this.text == '') {
            return;
        }
    }
}