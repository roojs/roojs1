Roo.onReady(function() {
    var d = document.body;
    new Roo.htmleditor.FilterStyleToTag({ node : d});
    document.body = d;
    // new Roo.htmleditor.FilterSpan({ node : document.body });
});