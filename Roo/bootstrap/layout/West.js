
Roo.bootstrap.layout.West = function(config){
    config.region = "west";
    config.cursor = "w-resize";
    
    Roo.bootstrap.layout.Split.call(this, config);
    if(this.split){
        this.split.placement = Roo.bootstrap.SplitBar.LEFT;
        this.split.orientation = Roo.bootstrap.SplitBar.HORIZONTAL;
        this.split.el.addClass("roo-layout-split-h");
    }
    
};
Roo.extend(Roo.bootstrap.layout.West, Roo.bootstrap.layout.Split, {
    orientation: Roo.bootstrap.SplitBar.HORIZONTAL,
    
    onRender: function(ctr, pos)
    {
        Roo.bootstrap.layout.West.superclass.onRender.call(this, ctr,pos);
        var size = this.config.initialSize || this.config.width;
        if(typeof size != "undefined"){
            this.el.setWidth(size);
        }
    },
    
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