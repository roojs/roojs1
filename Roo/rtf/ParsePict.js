Roo.rtf.ParsePict = function(text) {
    console.log("START PARSE PICT");
    var start = performance.now();

    var index = text.indexOf('{\\*\\shppict');
    this.parseText(text[index++]);
    this.parseText(text[index++]);

    Roo.log(this);


    console.log("END PARSE PICT");
    var end = performance.now();
    Roo.log('TIME TAKEN');
    Roo.log(end - start);
}

Roo.rtf.ParsePict.prototype = {
    parenCount : 0,
    group : false,
    gropuStack : false,
    text : '',

    parseText : function(c) 
    {
        switch(c) {
            case '\\' :
                this.parseState = this.parseEscapes;
                break;
            case '{' :
                this.parenCount++;
                this.emitStartGroup();
        }
    },

    parseEscapes : function(c) 
    {

    },

    emitStartGroup : function() 
    {
        this.emitText();

        if (this.group) {
            this.groupStack.push(this.group);
        }

        this.group = new Roo.rtf.Group(this.group);
    },

    emitText : function() 
    {
        if(this.text == '') {
            return;
        }
    }
}