/*
 * - LGPL
 *
 * based on jquery fullcalendar
 * 
 */


/**
 * @class Roo.Calendar
 * @extends Roo.Component
 * Bootstrap Calendar class
    
 * @constructor
 * Create a new Container
 * @param {Object} config The config object
 */

Roo.CalendarPanel = function(config){
    
    Roo.log("cal panel ctr");
  
    this.wrapper = Roo.DomHelper.append(document.body, // wrapper for IE7 strict & safari scroll issue
        {tag: "div", cls: "x-layout-grid-wrapper x-layout-inactive-content"}, true);
        
    //this.wrapper.dom.appendChild(grid.getGridEl().dom);
    
    Roo.CalendarPanel.superclass.constructor.call(this, this.wrapper, config);
    
    Roo.log(this.el);
    
    if(this.toolbar){
        this.toolbar.el.insertBefore(this.wrapper.dom.firstChild);
    }
    // xtype created footer. - not sure if will work as we normally have to render first..
    if (this.footer && !this.footer.el && this.footer.xtype) {
        
        //this.footer.container = this.grid.getView().getFooterPanel(true);
        //this.footer.dataSource = this.grid.dataSource;
        //this.footer = Roo.factory(this.footer, Roo);
        
    }
    
    this.on('activate', function()
    {
        Roo.log('activate');
        if (this.rendered) {
            return;
        }
        this.rendered = true;
        //console.log('render tree');
        this.render();
    },this);
    
    this.addEvents({
        /**
	     * @event select
	     * Fires when a date is selected
	     * @param {DatePicker} this
	     * @param {Date} date The selected date
	     */
        'select': true,
        /**
	     * @event monthchange
	     * Fires when the displayed month changes 
	     * @param {DatePicker} this
	     * @param {Date} date The selected month
	     */
        'monthchange': true,
        /**
	     * @event evententer
	     * Fires when mouse over an event
	     * @param {Calendar} this
	     * @param {event} Event
	     */
        'evententer': true,
        /**
	     * @event eventleave
	     * Fires when the mouse leaves an
	     * @param {Calendar} this
	     * @param {event}
	     */
        'eventleave': true,
        /**
	     * @event eventclick
	     * Fires when the mouse click an
	     * @param {Calendar} this
	     * @param {event}
	     */
        'eventclick': true
        
    });
    
    //this.grid = grid;
    //this.grid.getGridEl().replaceClass("x-layout-inactive-content", "x-layout-component-panel");
};

Roo.extend(Roo.CalendarPanel, Roo.ContentPanel, {
    getId : function(){
        return this.id;
    },
    /*
    setSize : function(width, height){
        if(!this.ignoreResize(width, height)){
            var grid = this.grid;
            var size = this.adjustForComponents(width, height);
            grid.getGridEl().setSize(size.width, size.height);
            grid.autoSize();
        }
    },
    
    beforeSlide : function(){
        this.grid.getView().scroller.clip();
    },
    
    afterSlide : function(){
        this.grid.getView().scroller.unclip();
    },
    */
    destroy : function(){
      //  this.grid.destroy();
       // delete this.grid;
         Roo.GridPanel.superclass.destroy.call(this); 
    },
    
    
    render : function()
    {
        
        Roo.log("render calendar");
        var res = this.autoCreate();
        
        
    },
    
    
    getAutoCreate : Roo.bootstrap.Calendar.prototype.getAutoCreate,
    
    initEvents : Roo.bootstrap.Calendar.prototype.initEvents 
    
    
});
