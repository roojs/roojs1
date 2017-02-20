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
    /**
     * @cfg {Number} padHeight padding below box..
     */   
    
    padHeight : 10, 
    
    /**
     * @cfg {Boolean} isAutoInitial defalut true
     */   
    
    isAutoInitial : true, 
    
    // private?
    gutter : 0,
    
    containerWidth: 0,
    initialColumnWidth : 0,
    currentSize : null,
    
    colYs : null, // array.
    maxY : 0,
    padWidth: 10,
    
    
    tag: 'div',
    cls: '',
    bricks: null, //CompositeElement
    cols : 0, // array?
    // element : null, // wrapped now this.el
    _isLayoutInited : null, 
    
    
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
        this.reloadItems();

        this.currentSize = this.el.getBox(true);
        
        /// was window resize... - let's see if this works..
        Roo.EventManager.onWindowResize(this.resize, this); 

        if(!this.isAutoInitial){
            this.layout();
            return;
        }
        
        this.layout.defer(500,this);
    },
    
    reloadItems: function()
    {
        this.bricks = this.el.select('.masonry-brick', true);
        
        Roo.log(this.bricks);
        
        this.bricks.each(function(b) {
            //Roo.log(b.getSize());
            if (!b.attr('originalwidth')) {
                b.attr('originalwidth',  b.getSize().width);
            }
            
        });
        
        Roo.log(this.bricks.elements.length);
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
         Roo.log('layout');
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
        
        this._layoutItems( this.bricks , isInstant );
      
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
            obj.item.position('absolute');
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
            this.boxesEl.setSize(size.width,size.height);
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
            var firstItem = this.bricks.first();
            Roo.log(firstItem);
            this.columnWidth  = this.containerWidth;
            if (firstItem && firstItem.attr('originalwidth') ) {
                this.columnWidth = 1* (firstItem.attr('originalwidth') || firstItem.getWidth());
            }
            // columnWidth fall back to item of first element
            Roo.log("set column width?");
                        this.initialColumnWidth = this.columnWidth  ;

            // if first elem has no width, default to size of container
            
        }
        
        if (this.initialColumnWidth) {
            this.columnWidth = this.initialColumnWidth;
        }
        
        
            
        // column width is fixed at the top - however if container width get's smaller we should
        // reduce it...
        
        // this bit calcs how man columns..
            
        var columnWidth = this.columnWidth += this.gutter;
      
        // calculate columns
        var containerWidth = this.containerWidth + this.gutter;
        
        var cols = (containerWidth - this.padWidth) / (columnWidth - this.padWidth);
        // fix rounding errors, typically with gutters
        var excess = columnWidth - containerWidth % columnWidth;
        
        
        // if overshoot is less than a pixel, round up, otherwise floor it
        var mathMethod = excess && excess < 1 ? 'round' : 'floor';
        cols = Math[ mathMethod ]( cols );
        this.cols = Math.max( cols, 1 );
        
        
         // padding positioning..
        var totalColWidth = this.cols * this.columnWidth;
        var padavail = this.containerWidth - totalColWidth;
        // so for 2 columns - we need 3 'pads'
        
        var padNeeded = (1+this.cols) * this.padWidth;
        
        var padExtra = Math.floor((padavail - padNeeded) / this.cols);
        
        this.columnWidth += padExtra
        //this.padWidth = Math.floor(padavail /  ( this.cols));
        
        // adjust colum width so that padding is fixed??
        
        // we have 3 columns ... total = width * 3
        // we have X left over... that should be used by 
        
        //if (this.expandC) {
            
        //}
        
        
        
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
         
        this.containerWidth = this.el.getBox(true).width;  //maybe use getComputedWidth
        
    },
    
    _getItemLayoutPosition : function( item )  // what is item?
    {
        // we resize the item to our columnWidth..
      
        item.setWidth(this.columnWidth);
        item.autoBoxAdjust  = false;
        
        var sz = item.getSize();
 
        // how many columns does this brick span
        var remainder = this.containerWidth % this.columnWidth;
        
        var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
        // round if off by 1 pixel, otherwise use ceil
        var colSpan = Math[ mathMethod ]( sz.width  / this.columnWidth );
        colSpan = Math.min( colSpan, this.cols );
        
        // normally this should be '1' as we dont' currently allow multi width columns..
        
        var colGroup = this._getColGroup( colSpan );
        // get the minimum Y value from the columns
        var minimumY = Math.min.apply( Math, colGroup );
        Roo.log([ 'setHeight',  minimumY, sz.height, setHeight ]);
        
        var shortColIndex = colGroup.indexOf(  minimumY ); // broken on ie8..?? probably...
         
        // position the brick
        var position = {
            x: this.currentSize.x + (this.padWidth /2) + ((this.columnWidth + this.padWidth )* shortColIndex),
            y: this.currentSize.y + minimumY + this.padHeight
        };
        
        Roo.log(position);
        // apply setHeight to necessary columns
        var setHeight = minimumY + sz.height + this.padHeight;
        //Roo.log([ 'setHeight',  minimumY, sz.height, setHeight ]);
        
        var setSpan = this.cols + 1 - colGroup.length;
        for ( var i = 0; i < setSpan; i++ ) {
          this.colYs[ shortColIndex + i ] = setHeight ;
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

 

 