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
var ResizableExample = {
    init : function(){
        
        var basic = new Roo.Resizable('basic', {
                width: 200,
                height: 100,
                minWidth:100,
                minHeight:50
        });
        
        var animated = new Roo.Resizable('animated', {
                width: 200,
                pinned: true,
                height: 100,
                minWidth:100,
                minHeight:50,
                animate:true,
                easing: 'backIn',
                duration:.6
        });
        
        var wrapped = new Roo.Resizable('wrapped', {
            wrap:true,
            pinned:true,
            minWidth:50,
            minHeight: 50,
            preserveRatio: true
        });
        
        var transparent = new Roo.Resizable('transparent', {
            wrap:true,
            minWidth:50,
            minHeight: 50,
            preserveRatio: true,
            transparent:true
        });
        
        var custom = new Roo.Resizable('custom', {
            wrap:true,
            pinned:true,
            minWidth:50,
            minHeight: 50,
            preserveRatio: true,
            handles: 'all',
            draggable:true,
            dynamic:true
        });
        var customEl = custom.getEl();
        // move to the body to prevent overlap on my blog
        document.body.insertBefore(customEl.dom, document.body.firstChild);
        
        customEl.on('dblclick', function(){
            customEl.hide(true);
        });
        customEl.hide();
        
        Roo.get('showMe').on('click', function(){
            customEl.center();
            customEl.show(true);
        });
        
        var dwrapped = new Roo.Resizable('dwrapped', {
            wrap:true,
            pinned:true,
            width:450,
            height:150,
            minWidth:200,
            minHeight: 50,
            dynamic: true
        });
        
        var snap = new Roo.Resizable('snap', {
            pinned:true,
            width:250,
            height:100,
            handles: 'e',
            widthIncrement:50,
            minWidth: 50,
            dynamic: true
        });
    }
};

Roo.EventManager.onDocumentReady(ResizableExample.init, ResizableExample, true);