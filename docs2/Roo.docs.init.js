

Roo.docs.init = {
    
    onReady : function()
    {
       
        //if (typeof(pagedata) == 'undefined') {
        //    Site.onReady.defer(100, Roo.docs.init);
        //    return;
        //}
        //Roo.debug = 1;
        
        Roo.XComponent.hideProgress = true;
        Roo.XComponent.build();
        
        Roo.XComponent.on('buildcomplete', function() {
            
            Roo.XComponent.modules[0].el.fireEvent('render');
            
        });
        
      
        
    },
    
    onLoad : function()
    {
        /*var data_url = document.createElement('script'); 
        data_url.type = 'text/javascript'; 
        data_url.async = true;
        
        var href =  window.location.href.replace(/#.*$/, '');
        
        var url = href + '?_toPageData=1';
        
        if(window.location.search.length){
            url = href + '&_toPageData=1';
        }
        
        data_url.src = url;

        var s = document.getElementsByTagName('script')[0]; 
        
        s.parentNode.insertBefore(data_url, s);
        */
    }
    
};


Roo.docs.init.onLoad();

Roo.onReady(Roo.docs.init.onReady);
    
 