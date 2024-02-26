Roo.onReady(function() {
    new Roo.htmleditor.FilterStyleToTag({ node : document.body});
    new Roo.htmleditor.FilterAttributes({
        node : document.body,
        attrib_white : [
            'href',
            'src',
            'name',
            'align',
            'colspan',
            'rowspan' 
        /*  THESE ARE NOT ALLWOED FOR PASTE
         *    'data-display',
            'data-caption-display',
            'data-width',
            'data-caption',
            'start' ,
            'style',
            // youtube embed.
            'class',
            'allowfullscreen',
            'frameborder',
            'width',
            'height',
            'alt'
            */
            ],
        attrib_clean : ['href', 'src' ] 
    });
    // new Roo.htmleditor.FilterSpan({ node : document.body });
});