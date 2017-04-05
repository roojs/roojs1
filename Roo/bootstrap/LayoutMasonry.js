/**
 *
 * This is based on 
 * http://masonry.desandro.com
 *
 * The idea is to render all the bricks based on vertical width...
 *
 * The original code extends 'outlayer' - we might need to use that....
 * 
 */


/**
 * @class Roo.bootstrap.LayoutMasonry
 * @extends Roo.bootstrap.Component
 * Bootstrap Layout Masonry class
 * 
 * @constructor
 * Create a new Element
 * @param {Object} config The config object
 */

Roo.bootstrap.LayoutMasonry = function(config){
    Roo.bootstrap.LayoutMasonry.superclass.constructor.call(this, config);
    
    this.bricks = [];
    
};

Roo.extend(Roo.bootstrap.LayoutMasonry, Roo.bootstrap.Component,  {
    
    /**
     * @cfg {Boolean} isLayoutInstant = no animation?
     */   
    isLayoutInstant : false, // needed?
   
    /**
     * @cfg {Number} boxWidth  width of the columns
     */   
    boxWidth : 450,
    
    /**
     * @cfg {Number} padWidth padding below box..
     */   
    padWidth : 10, 
    
    /**
     * @cfg {Number} gutter gutter width..
     */   
    gutter : 10, 
    
    /**
     * @cfg {Boolean} isAutoInitial defalut true
     */   
    isAutoInitial : true, 
    
    containerWidth: 0,
    
    /**
     * @cfg {Boolean} isHorizontal defalut false
     */   
    isHorizontal : false, 

    currentSize : null,
    
    tag: 'div',
    
    cls: '',
    
    bricks: null, //CompositeElement
    
    cols : 1,
    
    _isLayoutInited : false,
    
    getAutoCreate : function(){
        
        var cfg = {
            tag: this.tag,
            cls: 'blog-masonary-wrapper ' + this.cls,
            cn : {
                cls : 'mas-boxes masonary'
            }
        };
        
        return cfg;
    },
    
    getChildContainer: function( )
    {
        if (this.boxesEl) {
            return this.boxesEl;
        }
        
        this.boxesEl = this.el.select('.mas-boxes').first();
        
        return this.boxesEl;
    },
    
    
    initEvents : function()
    {
        var _this = this;
        
        if(this.isAutoInitial){
            Roo.log('hook children rendered');
            this.on('childrenrendered', function() {
                Roo.log('children rendered');
                _this.initial();
            } ,this);
        }
    },
    
    initial : function()
    {
        this.currentSize = this.el.getBox(true);
        
        Roo.EventManager.onWindowResize(this.resize, this); 

        if(!this.isAutoInitial){
            this.layout();
            return;
        }
        
        this.layout();
        
        return;
        //this.layout.defer(500,this);
        
    },
    
    resize : function()
    {
        Roo.log('resize');
        
        var cs = this.el.getBox(true);
        
        if (this.currentSize.width == cs.width && this.currentSize.x == cs.x ) {
            Roo.log("no change in with or X");
            return;
        }
        
        this.currentSize = cs;
        
        this.layout();
        
    },
    
    layout : function()
    {   
        this._resetLayout();
        
        var isInstant = this.isLayoutInstant !== undefined ? this.isLayoutInstant : !this._isLayoutInited;
        
        this.layoutItems( isInstant );
      
        this._isLayoutInited = true;
        
    },
    
    _resetLayout : function()
    {
        if(this.isHorizontal){
            this.horizontalMeasureColumns();
            return;
        }
        
        this.verticalMeasureColumns();
        
    },
    
    verticalMeasureColumns : function()
    {
        this.getContainerWidth();
        
        if(this.containerWidth < this.boxWidth){
            this.boxWidth = this.containerWidth
        }
        
        var boxWidth = this.boxWidth + this.padWidth;
        
        var containerWidth = this.containerWidth;
        
        var cols = Math.floor(containerWidth / boxWidth);
        
        this.cols = Math.max( cols, 1 );
        
        var totalBoxWidth = this.cols * boxWidth;
        
        var avail = Math.floor((containerWidth - totalBoxWidth) / this.cols);
        
        this.colWidth = this.boxWidth + avail;
        
        this.unitWidth = Math.floor((this.colWidth - (this.gutter * 2)) / 3);
        
        /*
        this.boxColWidth = {
            xs : xsWidth,
            sm : this.colWidth - xsWidth - this.gutter,
            md : this.colWidth,
            wide : this.colWidth
        };
        */
        
        /*
        if(this.isHorizontal){
            this.el.setHeight(this.colWidth);
        }
        */
        
    },
    
    horizontalMeasureColumns : function()
    {
        this.getContainerHeight();
        
        if(this.containerHeight < this.boxWidth){
            this.boxWidth = this.containerHeight
        }
        
        this.unitWidth = Math.floor((this.boxWidth - (this.gutter * 2)) / 3);
        
//        this.el.setHeight(this.boxWidth);
        
        
    },
    
    getContainerWidth : function()
    {
        this.containerWidth = this.el.getBox(true).width;  //maybe use getComputedWidth
    },
    
    getContainerHeight : function()
    {
        this.containerHeight = this.el.getBox(true).height;
    },
    
    layoutItems : function( isInstant )
    {
        var items = Roo.apply([], this.bricks);
        
        if(this.isHorizontal){
            this._horizontalLayoutItems( items , isInstant );
            return;
        }
        
        this._verticalLayoutItems( items , isInstant );
        
    },
    
    _verticalLayoutItems : function ( items , isInstant)
    {
        if ( !items || !items.length ) {
            return;
        }

        var queue = [];
        
        var box = [];
        var size = 0;
        
        Roo.each(items, function(item, k){
            
            if(size + item.x > 3){
                queue.push(box);
                box = [];
                size = 0;
            }
            
            size = size + item.x;
            
            box.push(item);
            
            if(k == items.length - 1){
                queue.push(box);
                box = [];
                size = 0;
            }
            
        }, this);
        
        this._processVerticalLayoutQueue( queue, isInstant );
    },
    
    _horizontalLayoutItems : function ( items , isInstant)
    {
        if ( !items || !items.length || items.length < 3) {
            return;
        }
        
        items.reverse();
        
        var eItems = items.slice(0, 3);
        
        items = items.slice(3, items.length);
        
        var pos = this.el.getBox(true);
        
        var minX = pos.x;
        
        var maxX = pos.right - this.unitWidth * 3 - this.gutter * 2 - this.padWidth;
        
        var x = maxX;
        
        Roo.log([minX, pos.right, maxX]);
        
        var queue = [];
        
        var box = [];
        var size = 0;
        var hit_end = false;
        
        Roo.each(items, function(item, k){
            
            item.el.setVisibilityMode(Roo.Element.DISPLAY);
            item.el.show();
            
            if(hit_end){
                item.el.hide();
                return;
            }
            
            if(size + item.y > 3){
                queue.push(box);
                box = [];
                size = 0;
                maxX = x;
            }
            
            var width = Math.floor(this.unitWidth * item.x + (this.gutter * (item.x - 1)) + item.el.getPadding('lr'));
            
            var xx = Math.min(maxX, x - width - this.padWidth);
            
            Roo.log([width, xx]);
            
            if(xx < minX){
                item.el.hide();
                hit_end = true;
                return;
            }
            
            size = size + item.y;
            
            box.push(item);
            
            
        }, this);
        
        if(box.length){
            queue.push(box);
        }
        
        this._processHorizontalLayoutQueue( queue, eItems, isInstant );
    },
    
    /** Sets position of item in DOM
    * @param {Element} item
    * @param {Number} x - horizontal position
    * @param {Number} y - vertical position
    * @param {Boolean} isInstant - disables transitions
    */
    _processVerticalLayoutQueue : function( queue, isInstant )
    {
        var pos = this.el.getBox(true);
        var x = pos.x;
        var y = pos.y;
        var maxY = [];
        
        for (var i = 0; i < this.cols; i++){
            maxY[i] = pos.y;
        }
        
        Roo.each(queue, function(box, k){
            
            var col = k % this.cols;
            
            Roo.each(box, function(b,kk){
                
                b.el.position('absolute');
                
                var width = Math.floor(this.unitWidth * b.x + (this.gutter * (b.x - 1)) + b.el.getPadding('lr'));
                
                b.el.setWidth(width);
                
                //var height = Math.floor(width / b.x * b.y);
                
                var height = Math.floor(this.unitWidth * b.y + (this.gutter * (b.y - 1)) + b.el.getPadding('tb'));
                
                b.el.setHeight(height);
                
            }, this);
            
            for (var i = 0; i < this.cols; i++){
                if(maxY[i] >= maxY[col]){
                    continue;
                }
                
                col = i;
            }
            
            x = pos.x + col * (this.colWidth + this.padWidth);
            
            y = maxY[col];
            
            var positions = [];
            
            switch (box.length){
                case 1 :
                    positions = this.getVerticalOneBoxColPositions(x, y, box);
                    break;
                case 2 :
                    positions = this.getVerticalTwoBoxColPositions(x, y, box);
                    break;
                case 3 :
                    positions = this.getVerticalThreeBoxColPositions(x, y, box);
                    break;
                default :
                    break;
            }
            
            Roo.each(box, function(b,kk){
                
                b.el.setXY([positions[kk].x, positions[kk].y], isInstant ? false : true);
                
                var sz = b.el.getSize();
                
                maxY[col] = Math.max(maxY[col], positions[kk].y + sz.height + this.padWidth);
                
            }, this);
            
        }, this);
        
        var mY = 0;
        
        for (var i = 0; i < this.cols; i++){
            mY = Math.max(mY, maxY[i]);
        }
        
        this.el.setHeight(mY);
        
    },
    
    _processHorizontalLayoutQueue : function( queue, eItems, isInstant )
    {
        var pos = this.el.getBox(true);
        
        var minX = pos.x;
        var minY = pos.y;
        
        var maxX = pos.right;
        
        this._processHorizontalEndItem(eItems, maxX, minX, minY, isInstant);
        
        var maxX = maxX - this.unitWidth * 3 - this.gutter * 2 - this.padWidth;
        
        Roo.each(queue, function(box, k){
            
            Roo.each(box, function(b, kk){
                
                b.el.position('absolute');
                
                var width = Math.floor(this.unitWidth * b.x + (this.gutter * (b.x - 1)) + b.el.getPadding('lr'));
                
                b.el.setWidth(width);

                var height = Math.floor(this.unitWidth * b.y + (this.gutter * (b.y - 1)) + b.el.getPadding('tb'));

                b.el.setHeight(height);
                
            }, this);
            
            if(!box.length){
                return;
            }
            
            var positions = [];
            
            switch (box.length){
                case 1 :
                    positions = this.getHorizontalOneBoxColPositions(maxX, minY, box);
                    break;
                case 2 :
                    positions = this.getHorizontalTwoBoxColPositions(maxX, minY, box);
                    break;
                case 3 :
                    positions = this.getHorizontalThreeBoxColPositions(maxX, minY, box);
                    break;
                default :
                    break;
            }
            
            Roo.each(box, function(b,kk){
                
                b.el.setXY([positions[kk].x, positions[kk].y], isInstant ? false : true);
                
                maxX = Math.min(maxX, positions[kk].x - this.padWidth);
                
            }, this);
            
        }, this);
        
        this.el.setHeight(this.boxWidth);
        
    },
    
    _processHorizontalEndItem : function(eItems, maxX, minX, minY, isInstant)
    {
        Roo.each(eItems, function(b,k){
            
            b.size = (k == 0) ? 'sm' : 'xs';
            b.x = (k == 0) ? 2 : 1;
            b.y = (k == 0) ? 2 : 1;
            
            b.el.position('absolute');
            
            var width = Math.floor(this.unitWidth * b.x + (this.gutter * (b.x - 1)) + b.el.getPadding('lr'));
                
            b.el.setWidth(width);
            
            var height = Math.floor(this.unitWidth * b.y + (this.gutter * (b.y - 1)) + b.el.getPadding('tb'));
            
            b.el.setHeight(height);
            
        }, this);

        var positions = [];
        
        positions.push({
            x : maxX - this.unitWidth * 2 - this.gutter,
            y : minY
        });
        
        positions.push({
            x : maxX - this.unitWidth,
            y : minY + (this.unitWidth + this.gutter) * 2
        });
        
        positions.push({
            x : maxX - this.unitWidth * 3 - this.gutter * 2,
            y : minY
        });
        
        Roo.each(eItems, function(b,k){
            
            b.el.setXY([positions[k].x, positions[k].y], isInstant ? false : true);

        }, this);
        
    },
    
    getVerticalOneBoxColPositions : function(x, y, box)
    {
        var pos = [];
        
        var rand = Math.floor(Math.random() * ((4 - box[0].x)));
        
        pos.push({
            x : x + (this.unitWidth + this.gutter) * rand,
            y : y
        });
        
        return pos;
    },
    
    getVerticalTwoBoxColPositions : function(x, y, box)
    {
        var pos = [];
        
        if(box[0].size == 'xs'){
            
            pos.push({
                x : x,
                y : y + ((this.unitWidth + this.gutter) * Math.floor(Math.random() * box[1].y))
            });

            pos.push({
                x : x + (this.unitWidth + this.gutter) * (3 - box[1].x),
                y : y
            });
            
            return pos;
            
        }
        
        pos.push({
            x : x,
            y : y
        });

        pos.push({
            x : x + (this.unitWidth + this.gutter) * 2,
            y : y + ((this.unitWidth + this.gutter) * Math.floor(Math.random() * box[0].y))
        });
        
        return pos;
        
    },
    
    getVerticalThreeBoxColPositions : function(x, y, box)
    {
        var pos = [];
        
        pos.push({
            x : x,
            y : y
        });
        
        pos.push({
            x : x + this.unitWidth + this.gutter,
            y : y
        });

        pos.push({
            x : x + (this.unitWidth + this.gutter) * 2,
            y : y
        });
            
        return pos;
    },
    
    getHorizontalOneBoxColPositions : function(maxX, minY, box)
    {
        var pos = [];
        
        var rand = Math.floor(Math.random() * (4 - box[0].y));
        
        pos.push({
            x : maxX - this.unitWidth * box[0].x - this.gutter * (box[0].x - 1),
            y : minY + (this.unitWidth + this.gutter) * rand
        });
        
        return pos;
        
    },
    
    getHorizontalTwoBoxColPositions : function(maxX, minY, box)
    {
        var pos = [];
        
        pos.push({
            x : maxX - this.unitWidth * box[0].x - this.gutter * (box[0].x - 1),
            y : minY
        });

        pos.push({
            x : maxX - this.unitWidth * box[1].x - this.gutter * (box[1].x - 1),
            y : minY + (this.unitWidth + this.gutter) * (3 - box[1].y)
        });
        
        return pos;
        
    },
    
    getHorizontalThreeBoxColPositions : function(maxX, minY, box)
    {
        var pos = [];
        
        pos.push({
            x : maxX - this.unitWidth,
            y : minY
        });
        
        pos.push({
            x : maxX - this.unitWidth,
            y : minY - this.unitWidth - this.gutter
        });
        
        pos.push({
            x : maxX - this.unitWidth,
            y : minY - (this.unitWidth + this.gutter) * 2
        });
        
        return pos;
        
    }
    
});

 

 