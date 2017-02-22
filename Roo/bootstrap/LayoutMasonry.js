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
     * @cfg {Number} columnWidth  width of the columns 
     */   
    boxWidth : 450,
    
    /**
     * @cfg {Number} padHeight padding below box..
     */   
    padHeight : 10, 
    
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
    
    bricks: [], //CompositeElement
    
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
        
        this.layout.defer(500,this);
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
    
    layoutItems : function( isInstant )
    {
        this._layoutItems( this.bricks , isInstant );
    },
    
    _layoutItems : function ( items , isInstant)
    {
        if ( !items || !items.length ) {
            return;
        }

        var queue = [];
        
        var box = [];
        var size = 0;
        
        Roo.each(items, function(item, k){
            
            if(size + item.size > 3){
                queue.push(box);
                box = [];
                size = 0;
            }
            
            size = size + item.size;
            
            box.push(item);
            
            if(k == items.length - 1){
                queue.push(box);
                box = [];
                size = 0;
            }
            
        }, this);
        
        this._processLayoutQueue( queue );
        
    },
    /** Sets position of item in DOM
    * @param {Element} item
    * @param {Number} x - horizontal position
    * @param {Number} y - vertical position
    * @param {Boolean} isInstant - disables transitions
    */
    _processLayoutQueue : function( queue, isInstant )
    {
        var pos = this.el.getBox(true);
        
        var x = pos.x;
        var y = pos.y;
        var maxY = pos.y;
        
        Roo.each(queue, function(box, k){
            
            var col = k % this.cols;
            
            var gutter = Math.max(box.length - 1, 0);
            
            var boxWidth = this.colWidth - (gutter * this.gutter);
            
            var boxColWidth = Math.floor(boxWidth / 3);
            
            var gutterWidth = 0;
            
            if(gutter > 0){
                gutterWidth = (this.colWidth - boxColWidth * 3) / gutter;
            }
            
            Roo.each(box, function(b,kk){
                
                var width = boxColWidth * b.size + b.el.getPadding('lr');
                
                b.el.setWidth(width);
                
                if(b.square){
                    b.el.setHeight(width);
                }
            }, this);
            
            x = pos.x + col * (this.colWidth + this.padWidth);
            
            if(col == 0){
                y = maxY + this.padHeight;
            }
            
            var positions = [];
            
            switch (box.length){
                case 1 :
                    positions = this.getOneBoxColPositions(x, y, box, boxColWidth, gutterWidth);
                    break;
                case 2 :
                    positions = this.getTwoBoxColPositions(x, y, box, boxColWidth, gutterWidth);
                    break;
                case 3 :
                    positions = this.getThreeBoxColPositions(x, y, box, boxColWidth, gutterWidth);
                    break;
                default :
                    break;
            }
            
            Roo.each(box, function(b,kk){
                
                b.el.position('absolute');
                
                b.el.setXY([positions[kk].x, positions[kk].y], isInstant ? false : true);
                
                var sz = b.el.getSize();
                
                //x = x + gutterWidth + sz.width;
                
                maxY = Math.max(maxY, y + sz.height);
                
            }, this);
            
        }, this);
        
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
      
        var boxWidth = this.boxWidth + this.padWidth;
        
        var containerWidth = this.containerWidth;
        
        var cols = Math.floor(containerWidth / boxWidth);
        
        this.cols = Math.max( cols, 1 );
        
        if(this.cols == 1){
            this.colWidth = this.containerWidth;
            return;
        }
        
        var totalBoxWidth = this.cols * boxWidth;
        
        var avail = Math.floor((containerWidth - totalBoxWidth) / this.cols);
        
        this.colWidth = this.boxWidth + avail;
        
    },
    
    horizontalMeasureColumns : function()
    {
        
    }
    
    getContainerWidth : function()
    {
        this.containerWidth = this.el.getBox(true).width;  //maybe use getComputedWidth
    },
    
    getOneBoxColPositions : function(x, y, box, boxColWidth, gutterWidth)
    {
        var pos = [];
        
        var rand = Math.floor(Math.random() * (4 - box[0].size));
        
        pos.push({
            x : x + (boxColWidth + gutterWidth) * rand,
            y : y
        });
        
        return pos;
    },
    
    getTwoBoxColPositions : function(x, y, box, boxColWidth, gutterWidth)
    {
        var pos = [];
        
        if(box[0].size == 1 && box[1].size == 1){
            pos.push({
                x : x,
                y : y
            });
            
            pos.push({
                x : x + boxColWidth * 2 + gutterWidth,
                y : y
            });
        }
        
        if(box[0].size == 1 && box[1].size == 2){
            
            pos.push({
                x : x,
                y : y + ((box[1].el.getHeight() - box[0].el.getHeight()) * Math.floor(Math.random() * 2))
            });
            
            pos.push({
                x : x + boxColWidth + gutterWidth,
                y : y
            });
        }
        
        if(box[0].size == 2 && box[1].size == 1){
            
            pos.push({
                x : x,
                y : y
            });
            
            pos.push({
                x : x + boxColWidth * 2 + gutterWidth,
                y : y + ((box[0].el.getHeight() - box[1].el.getHeight()) * Math.floor(Math.random() * 2))
            });
            
        }
        
        return pos;
        
    },
    
    getThreeBoxColPositions : function(x, y, box, boxColWidth, gutterWidth)
    {
        var pos = [];
        
        pos.push({
            x : x,
            y : y
        });
        
        pos.push({
            x : x + (boxColWidth + gutterWidth) * 1,
            y : y + box[1].el.getHeight()
        });
        
        pos.push({
            x : x + (boxColWidth + gutterWidth) * 2,
            y : y
        });
        
        return pos;
        
    }
    
});

 

 