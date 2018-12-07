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
/*
 * These classes are private internal classes
 */
Roo.bootstrap.layout.Center = function(config){
    config.region = "center";
    Roo.bootstrap.layout.Region.call(this, config);
    this.visible = true;
    this.minWidth = config.minWidth || 20;
    this.minHeight = config.minHeight || 20;
};

Roo.extend(Roo.bootstrap.layout.Center, Roo.bootstrap.layout.Region, {
    hide : function(){
        // center panel can't be hidden
    },
    
    show : function(){
        // center panel can't be hidden
    },
    
    getMinWidth: function(){
        return this.minWidth;
    },
    
    getMinHeight: function(){
        return this.minHeight;
    }
});




 

