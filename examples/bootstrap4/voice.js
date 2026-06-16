Roo.example = Roo.example || {};

Roo.example.voice = new Roo.XComponent({
    part     : ['example', 'voice'],
    order    : '001-voice',
    region   : '',
    parent   : false,
    name     : 'Voice dictation example',
    disabled : false,
    permname : '',
    _tree : function()
    {
        var supported = Roo.Voice.isSupported();
        var statusHtml = supported
            ? '<p class="text-success mb-0">Speech recognition is available in this browser.</p>'
            : '<p class="text-danger mb-0">Speech recognition is not available. Try Chrome or Edge on HTTPS or localhost.</p>';

        return {
            xtype : 'Body',
            xns : Roo.bootstrap,
            items : [
                {
                    xtype : 'Container',
                    xns : Roo.bootstrap,
                    items : [
                        {
                            xtype : 'Row',
                            xns : Roo.bootstrap,
                            items : [
                                {
                                    xtype : 'Card',
                                    xns : Roo.bootstrap,
                                    cls : 'col-md-8',
                                    header : 'Voice dictation',
                                    html : '<p>Focus a field below, then press <strong>Ctrl+Shift+Space</strong> to start dictating. Press <strong>Ctrl+Shift+Space</strong> again to stop.</p>' + statusHtml,
                                    items : [
                                        {
                                            xtype : 'Form',
                                            xns : Roo.bootstrap,
                                            items : [
                                                {
                                                    xtype : 'Input',
                                                    xns : Roo.bootstrap.form,
                                                    name : 'title',
                                                    fieldLabel : 'Title',
                                                    placeholder : 'Dictate a short title',
                                                    enableVoice : true,
                                                    voiceHint : 'Press Ctrl+Shift+Space to record your voice',
                                                    listeners : {
                                                        voiceresult : function(field, text) {
                                                            Roo.log('Title dictated: ' + text);
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype : 'TextArea',
                                                    xns : Roo.bootstrap.form,
                                                    name : 'notes',
                                                    fieldLabel : 'Notes',
                                                    rows : 6,
                                                    placeholder : 'Dictate longer notes here',
                                                    enableVoice : true,
                                                    listeners : {
                                                        voiceresult : function(field, text) {
                                                            Roo.log('Notes dictated: ' + text);
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
});
