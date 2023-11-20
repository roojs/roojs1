Roo.onReady(function() {
    var div = document.createElement('div');
    div.innerHTML = document.body.innerHTML;
    new Roo.htmleditor.FilterHashLink({ node : div });
    document.body.appendChild(div);
});