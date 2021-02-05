




Roo.bootstrap.layout.North = function(config)
{
    config.region = 'north';
    config.cursor = 'n-resize';
    
    Roo.bootstrap.layout.Split.call(this, config);
    
    
    if(this.split){
        this.split.placement = Roo.bootstrap.SplitBar.TOP;
        this.split.orientation = Roo.bootstrap.SplitBar.VERTICAL;
        this.split.el.addClass("roo-layout-split-v");
    }
    //var size = config.initialSize || config.height;
    //if(this.el && typeof size != "undefined"){
    //    this.el.setHeight(size);
    //}
};
Roo.extend(Roo.bootstrap.layout.North, Roo.bootstrap.layout.Split,
{
    orientation: Roo.bootstrap.SplitBar.VERTICAL,
     
     
    onRender : function(ctr, pos)
    {
        Roo.bootstrap.layout.Split.prototype.onRender.call(this, ctr, pos);
        var size = this.config.initialSize || this.config.height;
        if(this.el && typeof size != "undefined"){
            this.el.setHeight(size);
        }
    
    },
    
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

