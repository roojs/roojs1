/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
Roo.BLANK_IMAGE_URL  = "../../images/default/s.gif";
 
Roo.onReady(function(){
    Roo.get('mb1').on('click', function(e){
        Roo.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', showResult);
    });

    Roo.get('mb2').on('click', function(e){
        Roo.MessageBox.prompt('Name', 'Please enter your name:', showResultText);
    });

    Roo.get('mb3').on('click', function(e){
        Roo.MessageBox.show({
           title: 'Address',
           msg: 'Please enter your address:',
           width:300,
           buttons: Roo.MessageBox.OKCANCEL,
           multiline: true,
           fn: showResultText,
           animEl: 'mb3'
       });
    });

    Roo.get('mb4').on('click', function(e){
        Roo.MessageBox.show({
           title:'Save Changes?',
           msg: 'Your are closing a tab that has unsaved changes. Would you like to save your changes?',
           buttons: Roo.MessageBox.YESNOCANCEL,
           fn: showResult,
           animEl: 'mb4'
       });
    });

    Roo.get('mb6').on('click', function(){
        Roo.MessageBox.show({
           title: 'Please wait...',
           msg: 'Initializing...',
           width:240,
           progress:true,
           closable:false,
           animEl: 'mb6'
       });

       // this hideous block creates the bogus progress
       var f = function(v){
            return function(){
                if(v == 11){
                    Roo.MessageBox.hide();
                }else{
                    Roo.MessageBox.updateProgress(v/10, 'Loading item ' + v + ' of 10...');
                }
           };
       };
       for(var i = 1; i < 12; i++){
           setTimeout(f(i), i*1000);
       }
    });

    Roo.get('mb7').on('click', function(){
        Roo.MessageBox.alert('Status', 'Changes saved successfully.', showResult);
    });


    function showResult(btn){
        Roo.example.msg('Button Click', 'You clicked the {0} button', btn);
    };

    function showResultText(btn, text){
        Roo.example.msg('Button Click', 'You clicked the {0} button and entered the text "{1}".', btn, text);
    };
});