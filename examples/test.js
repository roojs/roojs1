Roo.onReady(function() {
    var e = document.getElementById('aaa').style;
    e.removeProperty('font-weight');

    new Roo.htmleditor.FilterStyleToTag({ node : document.body});
    // new Roo.htmleditor.FilterSpan({ node : document.body });
});