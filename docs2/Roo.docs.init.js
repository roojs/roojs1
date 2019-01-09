

Roo.docs.init = {
    
    onReady : function()
    {
       
        if (typeof(pagedata) == 'undefined') {
            Site.onReady.defer(100, Site);
            return;
        }
        //Roo.debug = 1;
        
        Roo.XComponent.hideProgress = true;
        Roo.XComponent.build();
        
        Roo.XComponent.on('buildcomplete', function() {
            
            var length = Roo.XComponent.modules.length;

            if(
                typeof(Roo.XComponent.modules[length - 1]) != 'undefined' 
                && 
                typeof(Roo.XComponent.modules[length - 1].el) != 'undefined'
            ){
                Roo.XComponent.modules[length - 1].el.fireEvent('render');
            }
            
        });
        
        /*    
        var ts = template.replace(/\.html$/,'').split('.');
        if (!ts.length) {
            return;
        }
        var ret = window;
        for (var i = 0; i < ts.length;i++) {
            ret = ret[ts[i]];
            if (!ret) {
                break;
            }
        }
        if (ret) {
            Roo.log(ret);
            Roo.XComponent.build_from_html  = true;
            Roo.XComponent.modules = [ ret ];
            Roo.XComponent.topModule = ret;
            Roo.XComponent.build();
    
        } else {
            // just build the nav bar...
            var e = new Roo.bootstrap.Element('nav-headerbar');
            e.addxtype(Release.NavHeaderbar._tree())
            
            
            
        }
        */
        
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
    
 