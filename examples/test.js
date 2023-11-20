Roo.onReady(function() {
    var div = document.createElement('div');
    div.innerHTML = document.body.innerHTML;
    new Roo.htmleditor.FilterHashLink({ node : div });
    new Roo.htmleditor.FilterParagraph({ node : div });
    new Roo.htmleditor.FilterLongBr({ node : div });
    new Roo.htmleditor.FilterSpan({ node : div });
    document.body.appendChild(div);
});