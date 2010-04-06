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
    var chooser, btn;
    
    function insertImage(data){
    	Roo.DomHelper.append('images', {
    		tag: 'img', src: data.url, style:'margin:10px;visibility:hidden;'
    	}, true).show(true);
    	btn.getEl().focus();
    };
    
    function choose(btn){
    	if(!chooser){
    		chooser = new ImageChooser({
    			url:'get-images.php',
    			width:515, 
    			height:400
    		});
    	}
    	chooser.show(btn.getEl(), insertImage);
    };
    
    btn = new Roo.Button('buttons', {
	    text: "Insert Image",
		handler: choose
	});
});
