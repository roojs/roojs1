
Roo.layout.West = function(mgr, config){
    Roo.layout.SplitRegion.call(this, mgr, config, "west", "w-resize");
    if(this.split){
        this.split.placement = Roo.SplitBar.LEFT;
        this.split.orientation = Roo.SplitBar.HORIZONTAL;
        this.split.el.addClass("x-layout-split-h");
    }
    var size = config.initialSize || config.width;
    if(typeof size != "undefined"){
        this.el.setWidth(size);
    }
};
Roo.extend(Roo.layout.West, Roo.layout.SplitRegion, {
    orientation: Roo.SplitBar.HORIZONTAL,
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
        Roo.layout.Region.prototype.updateBox.call(this, box);
    }
});
