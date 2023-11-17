Roo.onReady(function() {
    Roo.log('READY');
    Roo.log(document.body);
    var div = document.createElement('div');
    div.innerHTML = document.body.innerHTML;
    new Roo.htmleditor.FilterHashLink({ node : div });
    Roo.log(div.innerHTML);
});