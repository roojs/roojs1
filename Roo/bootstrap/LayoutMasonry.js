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
     * @cfg {Boolean} isFitWidth  - resize the width..
     */   
    isFitWidth : false,  // options..
    /**
     * @cfg {Boolean} isOriginLeft = left align?
     */   
    isOriginLeft : true,
    /**
     * @cfg {Boolean} isOriginTop = top align?
     */   
    isOriginTop : false,
    /**
     * @cfg {Boolean} isLayoutInstant = no animation?
     */   
    isLayoutInstant : false, // needed?
    /**
     * @cfg {Boolean} isResizingContainer = not sure if this is used..
     */   
    isResizingContainer : true,
    /**
     * @cfg {Number} columnWidth  width of the columns 
     */   
    columnWidth : 450,
    
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

    currentSize : null,
    
    colYs : [],
    
    maxY : 0,
    
    tag: 'div',
    
    cls: '',
    
    bricks: [], //CompositeElement
    
    cols : [],
    
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
        
        Roo.log(['current size', this.currentSize]);
        
        /// was window resize... - let's see if this works..
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
//        
//        Roo.log(['current size', this.currentSize]);
//        Roo.log(['cs', cs]);
//        
        if (this.currentSize.width == cs.width && this.currentSize.x == cs.x ) {
            Roo.log("no change in with or X");
            return;
        }
        
        Roo.log('call layout');
        
        this.currentSize = cs;
        
        this.layout();
    },
    
    layout : function()
    {
        Roo.log('layout');
        
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
        
        var block = [];
        var size = 0;
        
        Roo.each(items, function(item, k){
            Roo.log("layout item");
            
            if(size + item.size > 3){
                queue.push(block);
                block = [];
                size = 0;
            }
            
            size = size + item.size;
            
            block.push(item);
            
            if(k == items.length - 1){
                queue.push(block);
                block = [];
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
        
        Roo.each(queue, function(block, k){
            
            var col = k % this.cols;
            
            var gutter = Math.max(block.length - 1, 0);
            
            var columnWidth = this.colWidth - (gutter * this.gutter);
            
            var blockWidth = Math.floor(columnWidth / 3);
            
            var gutterWidth = 0;
            
            if(gutter > 0){
                gutterWidth = (this.colWidth - blockWidth * 3) / gutter;
            }
            
//            Roo.log(['gutterWidth', gutterWidth]);
//            Roo.log(['columnWidth', columnWidth]);
            
            x = pos.x + col * (this.colWidth + this.padWidth);
            
            if(col == 0){
                y = maxY + this.padHeight;
            }
            
            Roo.each(block, function(b,kk){
                
                var width = blockWidth * b.size + b.el.getPadding('lr');
                
                b.el.setWidth(width);
                
                Roo.log(['setWidth', width]);
                
//                b.el.autoBoxAdjust  = false;
                b.el.position('absolute');

                var sz = b.el.getSize();
                
                //Roo.log([x, y]);
                
                b.el.setXY([x,y], isInstant ? false : true);
                
                x = x + gutterWidth + sz.width;
                
               // Roo.log(['sz.height', sz.height]);
                
                maxY = Math.max(maxY, y + sz.height);
                
               // Roo.log(['maxY', maxY]);
                
            }, this);
            
        }, this);
        
    },
    
    _resetLayout : function()
    {
        this.measureColumns();

    },
    
    measureColumns : function()
    {
        this.getContainerWidth();
      
        var columnWidth = this.columnWidth + this.padWidth;
        
//        var containerWidth = this.containerWidth - this.padWidth;
        var containerWidth = this.containerWidth;
        
        Roo.log([containerWidth, this.columnWidth, this.padWidth]);
        
        var cols = Math.floor(containerWidth / columnWidth);
        
        this.cols = Math.max( cols, 1 );
        
        if(this.cols == 1){
            this.colWidth = this.containerWidth;
            return;
        }
        
        var totalColWidth = this.cols * columnWidth;
        
        var avail = Math.floor((containerWidth - totalColWidth) / this.cols);
        
        this.colWidth = this.columnWidth + avail;
        
        Roo.log(['column width', this.colWidth]);
    },
    
    getContainerWidth : function()
    {
        this.containerWidth = this.el.getBox(true).width;  //maybe use getComputedWidth
    }
    
});

 

 