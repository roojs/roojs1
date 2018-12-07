
Roo.bootstrap.layout.East = function(config){
    config.region = "east";
    config.cursor = "e-resize";
    Roo.bootstrap.layout.Split.call(this, config);
    if(this.split){
        this.split.placement = Roo.bootstrap.SplitBar.RIGHT;
        this.split.orientation = Roo.bootstrap.SplitBar.HORIZONTAL;
        this.split.el.addClass("roo-layout-split-h");
    }
    var size = config.initialSize || config.width;
    if(typeof size != "undefined"){
        this.el.setWidth(size);
    }
};
Roo.extend(Roo.bootstrap.layout.East, Roo.bootstrap.layout.Split, {
    orientation: Roo.bootstrap.SplitBar.HORIZONTAL,
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
