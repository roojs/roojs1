Roo.onReady(function() {
    var e = document.getElementById('aaa').style;
    Roo.log(e.style);
    e.removeProperty('font-weight');
    Roo.log(e.style);

    new Roo.htmleditor.FilterStyleToTag({ node : document.body});
    // new Roo.htmleditor.FilterSpan({ node : document.body });
});