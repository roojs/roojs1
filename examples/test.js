Roo.onReady(function() {
    var e = document.getElementById('aaa').style;
    Roo.log(e);
    e.removeProperty('font-weight');
    Roo.log(e);

    new Roo.htmleditor.FilterStyleToTag({ node : document.body});
    // new Roo.htmleditor.FilterSpan({ node : document.body });
});