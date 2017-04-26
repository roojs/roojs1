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
    
//    isAlternative : false, // only use for vertical layout...
    
    /**
     * @cfg {Number} alternativePadWidth padding below box..
     */   
    alternativePadWidth : 50, 
    
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
        
//        if(Roo.lib.Dom.getViewWidth() < 768 && this.isAlternative){
//            this.colWidth = Math.floor(this.containerWidth * 0.8);
//            return;
//        }
        
        var boxWidth = this.boxWidth + this.padWidth;
        
        if(this.containerWidth < this.boxWidth){
            boxWidth = this.containerWidth
        }
        
        var containerWidth = this.containerWidth;
        
        var cols = Math.floor(containerWidth / boxWidth);
        
        this.cols = Math.max( cols, 1 );
        
        var totalBoxWidth = this.cols * boxWidth - this.padWidth;
        
        var avail = Math.floor((containerWidth - totalBoxWidth) / this.cols);
        
        this.colWidth = boxWidth + avail - this.padWidth;
        
        this.unitWidth = Math.floor((this.colWidth - (this.gutter * 2)) / 3);
    },
    
    horizontalMeasureColumns : function()
    {
        this.getContainerWidth();
        
        var boxWidth = this.boxWidth;
        
        if(this.containerWidth < boxWidth){
            boxWidth = this.containerWidth;
        }
        
        this.unitWidth = Math.floor((boxWidth - (this.gutter * 2)) / 3);
        
        this.el.setHeight(boxWidth);
        
    },
    
    getContainerWidth : function()
    {
        this.containerWidth = this.el.getBox(true).width;  //maybe use getComputedWidth
    },
    
    layoutItems : function( isInstant )
    {
        var items = Roo.apply([], this.bricks);
        
        if(this.isHorizontal){
            this._horizontalLayoutItems( items , isInstant );
            return;
        }
        
//        if(Roo.lib.Dom.getViewWidth() < 768 && this.isAlternative){
//            this._verticalAlternativeLayoutItems( items , isInstant );
//            return;
//        }
        
        this._verticalLayoutItems( items , isInstant );
        
    },
    
    _verticalLayoutItems : function ( items , isInstant)
    {
        if ( !items || !items.length ) {
            return;
        }
        
        var standard = [
            ['xs', 'xs', 'xs', 'tall'],
            ['xs', 'xs', 'tall'],
            ['xs', 'xs', 'sm'],
            ['xs', 'xs', 'xs'],
            ['xs', 'tall'],
            ['xs', 'sm'],
            ['xs', 'xs'],
            ['xs'],
            
            ['sm', 'xs', 'xs'],
            ['sm', 'xs'],
            ['sm'],
            
            ['tall', 'xs', 'xs', 'xs'],
            ['tall', 'xs', 'xs'],
            ['tall', 'xs'],
            ['tall']
            
        ];
        
        var queue = [];
        
        var boxes = [];
        
        var box = [];
        
        Roo.each(items, function(item, k){
            
            switch (item.size) {
                case 'md' :
                case 'md-left' :
                case 'md-right' :
                case 'wide' :
                    
                    if(box.length){
                        boxes.push(box);
                        box = [];
                    }
                    
                    boxes.push([item]);
                    
                    break;
                    
                case 'xs' :
                case 'sm' :
                case 'tall' :
                    
                    box.push(item);
                    
                    break;
                default :
                    break;
                    
            }
            
        }, this);
        
        if(box.length){
            boxes.push(box);
            box = [];
        }
        
        var filterPattern = function(box, length)
        {
            if(!box.length){
                return;
            }
            
            var match = false;
            
            var pattern = [];
            
            Roo.each(box.slice(0, length), function(i){
                pattern.push(i.size);
            }, this);
            
            Roo.each(standard, function(s){
                
                if(String(s) != String(pattern)){
                    return;
                }
                
                match = true;
                return false;
                
            }, this);
            
            if(!match && length == 1){
                return;
            }
            
            if(!match){
                filterPattern(box, length - 1);
                return;
            }
                
            queue.push(pattern);

            box = box.slice(length, box.length);

            filterPattern(box, 4);

            return;
            
        }
        
        Roo.each(boxes, function(box, k){
            
            if(!box.length){
                return;
            }
            
            if(box.length == 1){
                queue.push(box);
                return;
            }
            
            filterPattern(box, 4);
            
        }, this);
        
        Roo.log(queue);
        
        this._processVerticalLayoutQueue( queue, isInstant );
        
    },
    
//    _verticalAlternativeLayoutItems : function( items , isInstant )
//    {
//        if ( !items || !items.length ) {
//            return;
//        }
//
//        this._processVerticalAlternativeLayoutQueue( items, isInstant );
//        
//    },
    
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
            
            x = Math.min(x, maxX - width - this.padWidth);
            
            if(x < minX){
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
                var height = Math.floor(this.unitWidth * b.y + (this.gutter * (b.y - 1)) + b.el.getPadding('tb'));
                
                if(b.size == 'md-left' || b.size == 'md-right'){
                    width = Math.floor(this.unitWidth * (b.x - 1) + (this.gutter * (b.x - 2)) + b.el.getPadding('lr'));
                    height = Math.floor(this.unitWidth * (b.y - 1) + (this.gutter * (b.y - 2)) + b.el.getPadding('tb'));
                }
                
                b.el.setWidth(width);
                b.el.setHeight(height);
                
            }, this);
            
            for (var i = 0; i < this.cols; i++){
                
                if(maxY[i] < maxY[col]){
                    col = i;
                    continue;
                }
                
                col = Math.min(col, i);
                
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
        
        this.el.setHeight(mY - pos.y);
        
    },
    
//    _processVerticalAlternativeLayoutQueue : function( items, isInstant )
//    {
//        var pos = this.el.getBox(true);
//        var x = pos.x;
//        var y = pos.y;
//        var maxX = pos.right;
//        
//        var maxHeight = 0;
//        
//        Roo.each(items, function(item, k){
//            
//            var c = k % 2;
//            
//            item.el.position('absolute');
//                
//            var width = Math.floor(this.colWidth + item.el.getPadding('lr'));
//
//            item.el.setWidth(width);
//
//            var height = Math.floor(this.colWidth * item.y / item.x + item.el.getPadding('tb'));
//
//            item.el.setHeight(height);
//            
//            if(c == 0){
//                item.el.setXY([x, y], isInstant ? false : true);
//            } else {
//                item.el.setXY([maxX - width, y], isInstant ? false : true);
//            }
//            
//            y = y + height + this.alternativePadWidth;
//            
//            maxHeight = maxHeight + height + this.alternativePadWidth;
//            
//        }, this);
//        
//        this.el.setHeight(maxHeight);
//        
//    },
    
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
                var height = Math.floor(this.unitWidth * b.y + (this.gutter * (b.y - 1)) + b.el.getPadding('tb'));
                
                if(b.size == 'md-left' || b.size == 'md-right'){
                    width = Math.floor(this.unitWidth * (b.x - 1) + (this.gutter * (b.x - 2)) + b.el.getPadding('lr'));
                    height = Math.floor(this.unitWidth * (b.y - 1) + (this.gutter * (b.y - 2)) + b.el.getPadding('tb'));
                }
                
                b.el.setWidth(width);
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
        
        if(box[0].size == 'md-left'){
            rand = 0;
        }
        
        if(box[0].size == 'md-right'){
            rand = 1;
        }
        
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
        
        if(box[0].size == 'xs' && box[1].size == 'xs' && box[2].size == 'xs'){
            
            pos.push({
                x : x,
                y : y
            });

            pos.push({
                x : x + (this.unitWidth + this.gutter) * 1,
                y : y
            });
            
            pos.push({
                x : x + (this.unitWidth + this.gutter) * 2,
                y : y
            });
            
            return pos;
            
        }
        
        if(box[0].size == 'xs' && box[1].size == 'xs'){
            
            pos.push({
                x : x,
                y : y
            });

            pos.push({
                x : x,
                y : y + ((this.unitWidth + this.gutter) * (box[2].y - 1))
            });
            
            pos.push({
                x : x + (this.unitWidth + this.gutter) * 1,
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
            y : y
        });

        pos.push({
            x : x + (this.unitWidth + this.gutter) * 2,
            y : y + (this.unitWidth + this.gutter) * 1
        });
            
        return pos;
        
    },
    
    getHorizontalOneBoxColPositions : function(maxX, minY, box)
    {
        var pos = [];
        
        if(box[0].size == 'md-left'){
            pos.push({
                x : maxX - this.unitWidth * (box[0].x - 1) - this.gutter * (box[0].x - 2),
                y : minY
            });
            
            return pos;
        }
        
        if(box[0].size == 'md-right'){
            pos.push({
                x : maxX - this.unitWidth * (box[0].x - 1) - this.gutter * (box[0].x - 2),
                y : minY + (this.unitWidth + this.gutter) * 1
            });
            
            return pos;
        }
        
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

 

 