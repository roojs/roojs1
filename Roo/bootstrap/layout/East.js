
Roo.bootstrap.layout.East = function(config){
    config.region = "east";
    config.cursor = "e-resize";
    Roo.bootstrap.layout.Split.call(this, config);
    if(this.split){
        this.split.placement = Roo.bootstrap.SplitBar.RIGHT;
        this.split.orientation = Roo.bootstrap.SplitBar.HORIZONTAL;
        this.split.el.addClass("roo-layout-split-h");
    }
    
};
Roo.extend(Roo.bootstrap.layout.East, Roo.bootstrap.layout.Split, {
    orientation: Roo.bootstrap.SplitBar.HORIZONTAL,
    
    onRender : function(ctr, pos)
    {
        Roo.bootstrap.layout.Split.prototype.onRender.call(this, ctr, pos);
        var size = this.config.initialSize || this.config.width;
        if(this.el && typeof size != "undefined"){
            this.el.setWidth(size);
        }
    
    },
    
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
