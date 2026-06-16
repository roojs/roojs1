Roo.example = Roo.example || {};

Roo.example.voiceClassic = function()
{
    var supported = Roo.Voice.isSupported();
    var status = supported
        ? 'Speech recognition is available in this browser.'
        : 'Speech recognition is not available. Try Chrome or Edge on HTTPS or localhost.';

    Roo.DomHelper.append(document.body, {
        tag : 'p',
        html : 'Focus a field, then press <strong>Ctrl+Shift+Space</strong> to dictate. ' + status
    });

    var form = new Roo.form.Form({
        labelAlign : 'top'
    });

    form.add(
        new Roo.form.TextField({
            fieldLabel : 'Title',
            name : 'title',
            width : 400,
            enableVoice : true,
            voiceHint : 'Press Ctrl+Shift+Space to record your voice'
        }),
        new Roo.form.TextArea({
            fieldLabel : 'Notes',
            name : 'notes',
            width : 400,
            height : 120,
            enableVoice : true
        })
    );

    form.render('voice-form');
};
