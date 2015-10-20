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
    
    columnWidth : 0,
    
    // private?
    gutter : 0,
    
    containerWidth: 0,
    currentSize : null,
    
    colYs : null, // array.
    maxY : 0,
    
    tag: 'div',
    cls: '',
    items: null, //CompositeElement
    cols : 0, // array?
    // element : null, // wrapped now this.el
    _isLayoutInited : null, 
    
    
    getAutoCreate : function(){
        
        var cfg = {
            tag: this.tag,
            cls: 'blog-masonary-wrapper ' + this.cls,
            
        };
        
	
        return cfg;
    },
    
    initEvents : function()
    {
        
        
        this.on('childrenrendered', function() {
            Roo.log("children rendered");
            
            this.reloadItems();
            // this.stamps = []; // wtf are stamps?
            // this.initStamp(); //???
            this.currentSize = this.el.getBox();
            
            /// was window resize... - let's see if this works..
            this.el.on('resize', this.resize, this); 
            
            
            this.layout();
            
        } ,this);
        
        
    },
    
    reloadItems: function()
    {
        this.items = this.el.select('.masonry-brick', true);
        
        Roo.log(this.items.elements.length);
    },
    
   
    resize : function()
    {
        if (this.currentSize.width == this.el.getWidth()) {
            return;
        }
        this.layout();
    },
    layout : function()
    {
        this._resetLayout();
        //this._manageStamps();
      
        // don't animate first layout
        var isInstant = this.isLayoutInstant !== undefined ? this.isLayoutInstant : !this._isLayoutInited;
        this.layoutItems( isInstant );
      
        // flag for initalized
        this._isLayoutInited = true;
    },
    
    layoutItems : function( isInstant )
    {
        //var items = this._getItemsForLayout( this.items );
        // original code supports filtering layout items.. we just ignore it..
        
        this._layoutItems( this.items , isInstant );
      
        this._postLayout();
    },
    _layoutItems : function ( items , isInstant)
    {
       //this.fireEvent( 'layout', this, items );
    

        if ( !items || !items.elements.length ) {
          // no items, emit event with empty array
            return;
        }

        var queue = [];
        items.each(function(item) {
            Roo.log("layout item");
            Roo.log(item);
            // get x/y object from method
            var position = this._getItemLayoutPosition( item );
            // enqueue
            position.item = item;
            position.isInstant = isInstant; // || item.isLayoutInstant; << not set yet...
            queue.push( position );
        }, this);
      
        this._processLayoutQueue( queue );
    },
    /** Sets position of item in DOM
    * @param {Element} item
    * @param {Number} x - horizontal position
    * @param {Number} y - vertical position
    * @param {Boolean} isInstant - disables transitions
    */
    _processLayoutQueue : function( queue )
    {
        for ( var i=0, len = queue.length; i < len; i++ ) {
            var obj = queue[i];
            obj.item.setXY([obj.x,obj.y], obj.isInstant ? false : true);
        }
    },
      
    
    /**
    * Any logic you want to do after each layout,
    * i.e. size the container
    */
    _postLayout : function()
    {
        this.resizeContainer();
    },
    
    resizeContainer : function()
    {
        if ( !this.isResizingContainer ) {
            return;
        }
        var size = this._getContainerSize();
        if ( size ) {
            this.el.setSize(size.width,size.height);
        }
    },
    
    
    
    _resetLayout : function()
    {
        //this.getSize();  // -- does not really do anything.. it probably applies left/right etc. to obuject but not used
        this.colWidth = this.el.getWidth();
        //this.gutter = this.el.getWidth(); 
        
        this.measureColumns();

        // reset column Y
        var i = this.cols;
        this.colYs = [];
        while (i--) {
            this.colYs.push( 0 );
        }
    
        this.maxY = 0;
    },

    measureColumns : function()
    {
        this.getContainerWidth();
      // if columnWidth is 0, default to outerWidth of first item
        if ( !this.columnWidth ) {
            var firstItem = this.items.first();
             
            // columnWidth fall back to item of first element
            this.columnWidth = firstItem && firstItem.getWidth() ||  this.containerWidth;
            
              // if first elem has no width, default to size of container
            
        }
    
        var columnWidth = this.columnWidth += this.gutter;
      
        // calculate columns
        var containerWidth = this.containerWidth + this.gutter;
        var cols = containerWidth / columnWidth;
        // fix rounding errors, typically with gutters
        var excess = columnWidth - containerWidth % columnWidth;
        // if overshoot is less than a pixel, round up, otherwise floor it
        var mathMethod = excess && excess < 1 ? 'round' : 'floor';
        cols = Math[ mathMethod ]( cols );
        this.cols = Math.max( cols, 1 );
    },
    
    getContainerWidth : function()
    {
       /* // container is parent if fit width
        var container = this.isFitWidth ? this.element.parentNode : this.element;
        // check that this.size and size are there
        // IE8 triggers resize on body size change, so they might not be
        
        var size = getSize( container );  //FIXME
        this.containerWidth = size && size.innerWidth; //FIXME
        */
         
        this.containerWidth = this.el.getWidth();  //maybe use getComputedWidth
        
    },
    
    _getItemLayoutPosition : function( item )  // what is item?
    {
        // we resize the item to our columnWidth..
        item.setWidth(this.columnWidth);
        var sz = item.getSize();
 
        // how many columns does this brick span
        var remainder = sz.width % this.columnWidth;
        var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
        // round if off by 1 pixel, otherwise use ceil
        var colSpan = Math[ mathMethod ]( sz.width  / this.columnWidth );
        colSpan = Math.min( colSpan, this.cols );
      
        var colGroup = this._getColGroup( colSpan );
        // get the minimum Y value from the columns
        var minimumY = Math.min.apply( Math, colGroup );
        
        
        var shortColIndex = colGroup.indexOf(  minimumY ); // broken on ie8..?? probably...
      
        // position the brick
        var position = {
            x: this.columnWidth * shortColIndex,
            y: minimumY
        };
      
        // apply setHeight to necessary columns
        var setHeight = minimumY + sz.height;
        var setSpan = this.cols + 1 - colGroup.length;
        for ( var i = 0; i < setSpan; i++ ) {
          this.colYs[ shortColIndex + i ] = setHeight;
        }
      
        return position;
    },
    
    /**
     * @param {Number} colSpan - number of columns the element spans
     * @returns {Array} colGroup
     */
    _getColGroup : function( colSpan )
    {
        if ( colSpan < 2 ) {
          // if brick spans only one column, use all the column Ys
          return this.colYs;
        }
      
        var colGroup = [];
        // how many different places could this brick fit horizontally
        var groupCount = this.cols + 1 - colSpan;
        // for each group potential horizontal position
        for ( var i = 0; i < groupCount; i++ ) {
          // make an array of colY values for that one group
          var groupColYs = this.colYs.slice( i, i + colSpan );
          // and get the max value of the array
          colGroup[i] = Math.max.apply( Math, groupColYs );
        }
        return colGroup;
    },
    /*
    _manageStamp : function( stamp )
    {
        var stampSize =  stamp.getSize();
        var offset = stamp.getBox();
        // get the columns that this stamp affects
        var firstX = this.isOriginLeft ? offset.x : offset.right;
        var lastX = firstX + stampSize.width;
        var firstCol = Math.floor( firstX / this.columnWidth );
        firstCol = Math.max( 0, firstCol );
        
        var lastCol = Math.floor( lastX / this.columnWidth );
        // lastCol should not go over if multiple of columnWidth #425
        lastCol -= lastX % this.columnWidth ? 0 : 1;
        lastCol = Math.min( this.cols - 1, lastCol );
        
        // set colYs to bottom of the stamp
        var stampMaxY = ( this.isOriginTop ? offset.y : offset.bottom ) +
            stampSize.height;
            
        for ( var i = firstCol; i <= lastCol; i++ ) {
          this.colYs[i] = Math.max( stampMaxY, this.colYs[i] );
        }
    },
    */
    
    _getContainerSize : function()
    {
        this.maxY = Math.max.apply( Math, this.colYs );
        var size = {
            height: this.maxY
        };
      
        if ( this.isFitWidth ) {
            size.width = this._getContainerFitWidth();
        }
      
        return size;
    },
    
    _getContainerFitWidth : function()
    {
        var unusedCols = 0;
        // count unused columns
        var i = this.cols;
        while ( --i ) {
          if ( this.colYs[i] !== 0 ) {
            break;
          }
          unusedCols++;
        }
        // fit container to columns that have been used
        return ( this.cols - unusedCols ) * this.columnWidth - this.gutter;
    },
    
    needsResizeLayout : function()
    {
        var previousWidth = this.containerWidth;
        this.getContainerWidth();
        return previousWidth !== this.containerWidth;
    }
 
});

 

 