Roo.onReady(function() {
    var e = document.getElementById('aaa').style);
    e.removeProperty('font-weight');
    Roo.log(document.getElementById('aaa').style);

    new Roo.htmleditor.FilterStyleToTag({ node : document.body});
    // new Roo.htmleditor.FilterSpan({ node : document.body });
});