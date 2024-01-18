Roo.layout.East = function(mgr, config){
    Roo.layout.SplitRegion.call(this, mgr, config, "east", "e-resize");
    if(this.split){
        this.split.placement = Roo.SplitBar.RIGHT;
        this.split.orientation = Roo.SplitBar.HORIZONTAL;
        this.split.el.addClass("x-layout-split-h");
    }
    var size = config.initialSize || config.width;
    if(typeof size != "undefined"){
        this.el.setWidth(size);
    }
};
Roo.extend(Roo.layout.East, Roo.layout.SplitRegion, {
    orientation: Roo.SplitBar.HORIZONTAL,
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
        Roo.layout.Region.prototype.updateBox.call(this, box);
    }
});