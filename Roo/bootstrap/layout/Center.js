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




 





Roo.bootstrap.layout.North = function(config)
{
    config.region = 'north';
    config.cursor = 'n-resize';
    Roo.bootstrap.layout.Split.call(this, config);
    if(this.split){
        this.split.placement = Roo.bootstrap.SplitBar.TOP;
        this.split.orientation = Roo.bootstrap.SplitBar.VERTICAL;
        this.split.el.addClass("x-layout-split-v");
    }
    var size = config.initialSize || config.height;
    if(typeof size != "undefined"){
        this.el.setHeight(size);
    }
};
Roo.extend(Roo.bootstrap.layout.North, Roo.bootstrap.layout.Split,
{
    //orientation: Roo.bootstrap.SplitBar.VERTICAL,
    getBox : function(){
        if(this.collapsed){
            return this.collapsedEl.getBox();
        }
        var box = this.el.getBox();
        if(this.split){
            box.height += this.split.el.getHeight();
        }
        return box;
    },
    
    updateBox : function(box){
        if(this.split && !this.collapsed){
            box.height -= this.split.el.getHeight();
            this.split.el.setLeft(box.x);
            this.split.el.setTop(box.y+box.height);
            this.split.el.setWidth(box.width);
        }
        if(this.collapsed){
            this.updateBody(box.width, null);
        }
        Roo.bootstrap.layout.Region.prototype.updateBox.call(this, box);
    }
});





Roo.bootstrap.layout.South = function(config){
    config.region = 'south';
    config.cursor = 's-resize';
    config.orinentation = Roo.bootstrap.SplitBar.VERTICAL;
    Roo.bootstrap.layout.Split.call(this, config);
    if(this.split){
        this.split.placement = Roo.bootstrap.SplitBar.BOTTOM;
        this.split.orientation = Roo.bootstrap.SplitBar.VERTICAL;
        this.split.el.addClass("x-layout-split-v");
    }
    var size = config.initialSize || config.height;
    if(typeof size != "undefined"){
        this.el.setHeight(size);
    }
};

Roo.extend(Roo.bootstrap.layout.South, Roo.bootstrap.layout.Split, {
   //orientation: Roo.bootstrap.SplitBar.VERTICAL,
    getBox : function(){
        if(this.collapsed){
            return this.collapsedEl.getBox();
        }
        var box = this.el.getBox();
        if(this.split){
            var sh = this.split.el.getHeight();
            box.height += sh;
            box.y -= sh;
        }
        return box;
    },
    
    updateBox : function(box){
        if(this.split && !this.collapsed){
            var sh = this.split.el.getHeight();
            box.height -= sh;
            box.y += sh;
            this.split.el.setLeft(box.x);
            this.split.el.setTop(box.y-sh);
            this.split.el.setWidth(box.width);
        }
        if(this.collapsed){
            this.updateBody(box.width, null);
        }
        Roo.bootstrap.layout.Region.prototype.updateBox.call(this, box);
    }
});

Roo.bootstrap.layout.East = function(config){
    config.region = "east";
    config.cursor = "e-resize";
    Roo.bootstrap.layout.Split.call(this, config);
    if(this.split){
        this.split.placement = Roo.bootstrap.SplitBar.RIGHT;
        this.split.orientation = Roo.bootstrap.SplitBar.HORIZONTAL;
        this.split.el.addClass("x-layout-split-h");
    }
    var size = config.initialSize || config.width;
    if(typeof size != "undefined"){
        this.el.setWidth(size);
    }
};
Roo.extend(Roo.bootstrap.layout.East, Roo.bootstrap.layout.Split, {
    //orientation: Roo.bootstrap.SplitBar.HORIZONTAL,
    getBox : function(){
        if(this.collapsed){
            return this.collapsedEl.getBox();
        }
        var box = this.el.getBox();
        if(this.split){
            var sw = this.split.el.getWidth();
            box.width += sw;
            box.x -= sw;
        }
        return box;
    },

    updateBox : function(box){
        if(this.split && !this.collapsed){
            var sw = this.split.el.getWidth();
            box.width -= sw;
            this.split.el.setLeft(box.x);
            this.split.el.setTop(box.y);
            this.split.el.setHeight(box.height);
            box.x += sw;
        }
        if(this.collapsed){
            this.updateBody(null, box.height);
        }
        Roo.bootstrap.layout.Region.prototype.updateBox.call(this, box);
    }
});

Roo.bootstrap.layout.West = function(config){
    config.region = "west";
    config.cursor = "w-resize";
    
    Roo.bootstrap.layout.Split.call(this, config);
    if(this.split){
        this.split.placement = Roo.bootstrap.SplitBar.LEFT;
        this.split.orientation = Roo.bootstrap.SplitBar.HORIZONTAL;
        this.split.el.addClass("x-layout-split-h");
    }
    var size = config.initialSize || config.width;
    if(typeof size != "undefined"){
        this.el.setWidth(size);
    }
};
Roo.extend(Roo.bootstrap.layout.West, Roo.bootstrap.layout.Split, {
    //orientation: Roo.bootstrap.SplitBar.HORIZONTAL,
    getBox : function(){
        if(this.collapsed){
            return this.collapsedEl.getBox();
        }
        var box = this.el.getBox();
        if(this.split){
            box.width += this.split.el.getWidth();
        }
        return box;
    },
    
    updateBox : function(box){
        if(this.split && !this.collapsed){
            var sw = this.split.el.getWidth();
            box.width -= sw;
            this.split.el.setLeft(box.x+box.width);
            this.split.el.setTop(box.y);
            this.split.el.setHeight(box.height);
        }
        if(this.collapsed){
            this.updateBody(null, box.height);
        }
        Roo.bootstrap.layout.Region.prototype.updateBox.call(this, box);
    }
});
