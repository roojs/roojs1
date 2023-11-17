Roo.onReady(function() {
    Roo.log('READY');
    Roo.log(document.body);
    new Roo.htmleditor.FilterEmpty({ node : document.body });
});