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
    
    layoutItems : function( isInstant )
    {
        if(this.isHorizontal){
            this._horizontalLayoutItems( this.bricks , isInstant );
            return;
        }
        
        this._verticalLayoutItems( this.bricks , isInstant );
        
    },
    
    _verticalLayoutItems : function ( items , isInstant)
    {
        if ( !items || !items.length ) {
            return;
        }

        if(this.isHorizontal){
            
            if(items.length < 3){
                return;
            }
            
            var eItems = items.slice(items.length - 3, items.length);
            items = items.slice(0, items.length - 3);
            
        }
        
        var queue = [];
        
        var box = [];
        var size = 0;
        
        Roo.each(items, function(item, k){
            
            if(size + item.intSize > 3){
                queue.push(box);
                box = [];
                size = 0;
            }
            
            size = size + item.intSize;
            
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
        
        var maxX = pos.right - this.boxColWidth['sm'] - this.boxColWidth['xs'] - this.gutter * 2;
        
        var queue = [];
        
        var box = [];
        var size = 0;
        var hit_end = false;
        
        Roo.each(items, function(item, k){
            
            item.el.setVisibilityMode(Roo.ELement.DISPLAY);
            
            if(hit_end){
                item.hide();
                return;
            }
            
            if(queue.length > this.cols - 1){
                return false;
            }
            
            var width = this.boxColWidth[item.size] + item.el.getPadding('lr');
            
            var x = Math.min(maxX, maxX - width - this.gutter);
            
            if(x < minX){
                item.hide();
                hit_end = true;
                return;
            }
            
            if(size + item.intSize > 3){
                queue.push(box);
                box = [];
                size = 0;
                maxX = x;
            }
            
            size = size + item.intSize;
            
            box.push(item);
            
            if(k == items.length - 1){
                queue.push(box);
                box = [];
                size = 0;
            }
            
        }, this);
        
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
                
                var width = this.boxColWidth[b.size] + b.el.getPadding('lr');
                
                b.el.setWidth(width);
                
                if(b.square){
                    b.el.setHeight(width);
                }
                
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
        
        var maxX = pos.right - (pos.width - this.containerWidth) - this.padWidth;
        var maxY = pos.bottom;
        
        this._processHorizontalEndItem(eItems, maxX, minX, minY, isInstant);
        
        var maxX = maxX - this.boxColWidth['sm'] - this.boxColWidth['xs'] - this.gutter * 2;
        
        Roo.each(queue, function(box, k){
            
            Roo.each(box, function(b, kk){
                
                b.el.position('absolute');
                
                var height = this.boxColWidth[b.size] + b.el.getPadding('tb');
                
                b.el.setHeight(height);
                
                if(b.square){
                    b.el.setWidth(height);
                }
                
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
                
                maxX = Math.min(maxX, positions[kk].x - this.gutter);
                
            }, this);
            
        }, this);
        
    },
    
    _processHorizontalEndItem : function(eItems, maxX, minX, minY, isInstant)
    {
        Roo.each(eItems, function(b,k){
            
            b.size = 'xs';
            b.intSize = 1;
            
            if(k == 0) {
                b.size = 'sm';
                b.intSize = 2;
            }
            
            b.el.position('absolute');
            
            var width = this.boxColWidth[b.size] + b.el.getPadding('lr');
                
            b.el.setWidth(width);

            if(b.square){
                b.el.setHeight(width);
            }
            
        }, this);

        var positions = [];
        
        positions.push({
            x : maxX - this.boxColWidth['sm'],
            y : minY
        });
        
        positions.push({
            x : maxX - this.boxColWidth['xs'],
            y : minY + this.boxColWidth['sm'] + this.gutter
        });
        
        positions.push({
            x : maxX - this.boxColWidth['sm'] - this.gutter - this.boxColWidth['xs'],
            y : minY
        });
        
        Roo.each(eItems, function(b,k){
            
            b.el.setXY([positions[k].x, positions[k].y], isInstant ? false : true);

            var sz = b.el.getSize();
            
        }, this);
        
    },
    
    _resetLayout : function()
    {
        this.measureColumns();
    },
    
    measureColumns : function()
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
        
        var xsWidth = Math.floor((this.colWidth - (this.gutter * 2)) / 3);
        
        this.boxColWidth = {
            xs : xsWidth,
            sm : this.colWidth - xsWidth - this.gutter,
            md : this.colWidth
        };
        
        if(this.isHorizontal){
            this.el.setHeight(this.colWidth);
        }
        
    },
    
    getContainerWidth : function()
    {
        this.containerWidth = this.el.getBox(true).width;  //maybe use getComputedWidth
    },
    
    getVerticalOneBoxColPositions : function(x, y, box)
    {
        var pos = [];
        
        var rand = Math.floor(Math.random() * (4 - box[0].intSize));
        
        pos.push({
            x : x + (this.boxColWidth['xs'] + this.gutter) * rand,
            y : y
        });
        
        return pos;
    },
    
    getVerticalTwoBoxColPositions : function(x, y, box)
    {
        var pos = [];
        
        if(box[0].size == 'xs' && box[1].size == 'xs'){
            
            pos.push({
                x : x,
                y : y
            });

            pos.push({
                x : x + (this.boxColWidth['xs'] + this.gutter) * 2,
                y : y
            });
            
        }
        
        if(box[0].size == 'xs' && box[1].size == 'sm'){
            
            pos.push({
                x : x,
                y : y + ((box[1].el.getHeight() - box[0].el.getHeight()) * Math.floor(Math.random() * 2))
            });

            pos.push({
                x : x + this.boxColWidth['xs'] + this.gutter,
                y : y
            });
            
        }
        
        if(box[0].size == 'sm' && box[1].size == 'xs'){
            
            pos.push({
                x : x,
                y : y
            });

            pos.push({
                x : x + this.boxColWidth['sm'] + this.gutter,
                y : y + ((box[0].el.getHeight() - box[1].el.getHeight()) * Math.floor(Math.random() * 2))
            });
            
        }
        
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
            x : x + this.boxColWidth['xs'] + this.gutter,
            y : y
        });

        pos.push({
            x : x + this.boxColWidth['sm'] + this.gutter,
            y : y
        });
            
        return pos;
    },
    
    getHorizontalOneBoxColPositions : function(maxX, minY, box)
    {
        var pos = [];
        
        var rand = Math.floor(Math.random() * (4 - box[0].intSize));
        
        pos.push({
            x : maxX - box[0].el.getWidth(),
            y : minY + (this.boxColWidth['xs'] + this.gutter) * rand
        });
        
        return pos;
    },
    
    getHorizontalTwoBoxColPositions : function(maxX, minY, box)
    {
        var pos = [];
        
        pos.push({
            x : maxX - box[0].el.getWidth(),
            y : minY
        });

        pos.push({
            x : maxX - box[1].el.getWidth(),
            y : minY + box[0].el.getHeight() + this.gutter
        });
        
        return pos;
        
    },
    
    getHorizontalThreeBoxColPositions : function(maxX, minY, box)
    {
        var pos = [];
        
        pos.push({
            x : maxX - box[0].el.getWidth(),
            y : minY
        });
        
        pos.push({
            x : maxX - box[1].el.getWidth(),
            y : minY - box[0].el.getHeight() - this.gutter
        });
        
        pos.push({
            x : maxX - box[2].el.getWidth(),
            y : minY - box[0].el.getHeight() - box[1].el.getHeight() - this.gutter * 2
        });
        
        return pos;
        
    }
    
});

 

 