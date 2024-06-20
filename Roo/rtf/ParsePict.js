Roo.rtf.ParsePict = function(text) {
    console.log("START PARSE PICT");
    var start = performance.now();
    var index = text.indexOf('{\\*\\shppict');
    console.log(index);
    console.log("END PARSE PICT");
    var end = performance.now();
    Roo.log('TIME TAKEN : ' + (end - start) + 'ms');
}