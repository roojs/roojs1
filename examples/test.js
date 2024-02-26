Roo.onReady(function() {
    new Roo.htmleditor.FilterStyleToTag({ node : document.body});
    new Roo.htmleditor.FilterBlack({ node : document.body, tags : ['STYLE']})
    // new Roo.htmleditor.FilterSpan({ node : document.body });
});