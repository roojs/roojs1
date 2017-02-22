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
        
        if(this.isHorizontal){
            this._processHorizontalLayoutQueue( queue, eItems, isInstant );
            return;
        }
        
        this._processVerticalLayoutQueue( queue, isInstant );
        
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
                    positions = this.getOneBoxColPositions(x, y, box);
                    break;
                case 2 :
                    positions = this.getTwoBoxColPositions(x, y, box);
                    break;
                case 3 :
                    positions = this.getThreeBoxColPositions(x, y, box);
                    break;
                default :
                    break;
            }
            
            Roo.each(box, function(b,kk){
                
                b.el.position('absolute');
                
                b.el.setXY([positions[kk].x, positions[kk].y], isInstant ? false : true);
                
                var sz = b.el.getSize();
                
                maxY[col] = Math.max(maxY[col], positions[kk].y + sz.height + this.padWidth);
                
            }, this);
            
        }, this);
    },
    
    _processHorizontalLayoutQueue : function( queue, eItems, isInstant )
    {
        var pos = this.el.getBox(true);
        
        var x = pos.x;
        var y = pos.y;
        
        var maxX = pos.x;
        
        Roo.each(queue, function(box, k){
            
            Roo.each(box, function(b,kk){
                
                var height = this.boxColWidth[b.size] + b.el.getPadding('tb');
                
                b.el.setHeight(height);
                
                if(b.square){
                    b.el.setWidth(height);
                }
            }, this);
            
            x = maxX;
            
            var positions = [];
            
            switch (box.length){
                case 1 :
                    positions = this.getOneBoxColPositions(x, y, box);
                    break;
                case 2 :
                    positions = this.getTwoBoxColPositions(x, y, box);
                    break;
                case 3 :
                    positions = this.getThreeBoxColPositions(x, y, box);
                    break;
                default :
                    break;
            }
            
            Roo.each(box, function(b,kk){
                
                b.el.position('absolute');
                
                b.el.setXY([positions[kk].x, positions[kk].y], isInstant ? false : true);
                
                var sz = b.el.getSize();
                
                maxX = Math.max(maxX, positions[kk].x + sz.width + this.padWidth);
                
            }, this);
            
        }, this);
        
        this._processHorizontalEndItem(eItems, maxX, y, isInstant);
    },
    
    _processHorizontalEndItem : function(eItems, x, y, isInstant)
    {
        var positions = [];
        
        positions.push({
            x : maxX,
            y : y
        });
        
        positions.push({
            x : maxX + this.boxColWidth['xs'] + this.gutter,
            y : y
        });
        
        positions.push({
            x : maxX + this.boxColWidth['xs'] + this.gutter + (eItems[1].el.getWidth() - eItems[0].el.getWidth()),
            y : y + this.boxColWidth['sm'] + this.gutter
        });
        
        Roo.each(eItems, function(b,k){
            
            b.size = 'xs';
            
            if(k == 1) {
                b.size = 'sm';
            }
            
            var height = this.boxColWidth[b.size] + b.el.getPadding('tb');
                
            b.el.setHeight(height);

            if(b.square){
                b.el.setWidth(height);
            }

            b.el.position('absolute');

            b.el.setXY([x, y], isInstant ? false : true);

            var sz = b.el.getSize();

            maxX = Math.max(maxX, positions[kk].x + sz.width + this.padWidth);

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
        
        var totalBoxWidth = this.cols * boxWidth;

        var avail = Math.floor((containerWidth - totalBoxWidth) / this.cols);

        this.colWidth = this.boxWidth + avail;
        
        var xsWidth = Math.floor((this.colWidth - (this.gutter * 2)) / 3);
        
        this.boxColWidth = {
            xs : xsWidth,
            sm : this.colWidth - xsWidth - this.gutter,
            md : this.colWidth
        };
        
    },
    
    horizontalMeasureColumns : function()
    {
        this.cols = 3;
        
        var xsWidth = Math.floor((this.boxWidth - (this.gutter * 2)) / 3);
        
        this.boxColWidth = {
            xs : xsWidth,
            sm : this.boxWidth - xsWidth - this.gutter,
            md : this.boxWidth
        };
    },
    
    getContainerWidth : function()
    {
        this.containerWidth = this.el.getBox(true).width;  //maybe use getComputedWidth
    },
    
    getOneBoxColPositions : function(x, y, box)
    {
        var pos = [];
        
        var rand = Math.floor(Math.random() * (4 - box[0].intSize));
        
        if(this.isHorizontal){
            pos.push({
                x : x,
                y : y + (this.boxColWidth['xs'] + this.gutter) * rand
            });
        } else {
            pos.push({
                x : x + (this.boxColWidth['xs'] + this.gutter) * rand,
                y : y
            });
        }
        
        return pos;
    },
    
    getTwoBoxColPositions : function(x, y, box)
    {
        var pos = [];
        
        if(box[0].size == 'xs' && box[1].size == 'xs'){
            
            if(this.isHorizontal){
                pos.push({
                    x : x,
                    y : y
                });

                pos.push({
                    x : x,
                    y : y + (this.boxColWidth['xs'] + this.gutter) * 2
                });
                
            } else {
                pos.push({
                    x : x,
                    y : y
                });

                pos.push({
                    x : x + (this.boxColWidth['xs'] + this.gutter) * 2,
                    y : y
                });
            }
            
        }
        
        if(box[0].size == 'xs' && box[1].size == 'sm'){
            
            if(this.isHorizontal){
                pos.push({
                    x : x,
                    y : y
                });
                
                pos.push({
                    x : x,
                    y : y + this.boxColWidth['xs'] + this.gutter
                });
                
            } else {
                pos.push({
                    x : x,
                    y : y + ((box[1].el.getHeight() - box[0].el.getHeight()) * Math.floor(Math.random() * 2))
                });

                pos.push({
                    x : x + this.boxColWidth['xs'] + this.gutter,
                    y : y
                });
            }
            
        }
        
        if(box[0].size == 'sm' && box[1].size == 'xs'){
            
            if(this.isHorizontal){
                pos.push({
                    x : x,
                    y : y
                });

                pos.push({
                    x : x,
                    y : y + this.boxColWidth['sm'] + this.gutter
                });
            } else {
                pos.push({
                    x : x,
                    y : y
                });

                pos.push({
                    x : x + this.boxColWidth['sm'] + this.gutter,
                    y : y + ((box[0].el.getHeight() - box[1].el.getHeight()) * Math.floor(Math.random() * 2))
                });
            }
        }
        
        return pos;
        
    },
    
    getThreeBoxColPositions : function(x, y, box)
    {
        var pos = [];
        
        pos.push({
            x : x,
            y : y
        });
        
        if(this.isHorizontal){
            pos.push({
                x : x,
                y : y + this.boxColWidth['xs'] + this.gutter
            });
            
            pos.push({
                x : x,
                y : y + this.boxColWidth['sm'] + this.gutter
            });
        } else {
            pos.push({
                x : x + this.boxColWidth['xs'] + this.gutter,
                y : y
            });
            
            pos.push({
                x : x + this.boxColWidth['sm'] + this.gutter,
                y : y
            });
        }
        
        return pos;
        
    }
    
});

 

 