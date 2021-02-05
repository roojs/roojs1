



Roo.bootstrap.layout.South = function(config){
    config.region = 'south';
    config.cursor = 's-resize';
    Roo.bootstrap.layout.Split.call(this, config);
    if(this.split){
        this.split.placement = Roo.bootstrap.SplitBar.BOTTOM;
        this.split.orientation = Roo.bootstrap.SplitBar.VERTICAL;
        this.split.el.addClass("roo-layout-split-v");
    }
    
};

Roo.extend(Roo.bootstrap.layout.South, Roo.bootstrap.layout.Split, {
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
