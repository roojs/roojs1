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
Roo.onReady(function(){
    var tabs = new Roo.panel.Tab('tab-panel1', {
        resizeTabs:true, // turn on tab resizing
        minTabWidth: 20,
        preferredTabWidth:150
    });

    tabs.addTab('root-tab', 'Home Tab');
    tabs.activate(0);

    var content = Roo.getDom('content').innerHTML; // bogus markup for tabs
    var index = 0;
    Roo.get('add-link').on('click', function(){
        tabs.addTab(
             Roo.id(),
             'New Tab ' + (++index),
             'Tab Body ' + index + content,
             true
        );
    });
});