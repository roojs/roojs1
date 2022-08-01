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

Roo.panel.Calendar = function(config){
    
    Roo.log("cal panel ctr");
  
    this.wrapper = Roo.DomHelper.append(document.body, // wrapper for IE7 strict & safari scroll issue
        {tag: "div", cls: "x-layout-grid-wrapper x-layout-inactive-content"}, true);
        
    //this.wrapper.dom.appendChild(grid.getGridEl().dom);
    
    Roo.panel.Calendar.superclass.constructor.call(this, this.wrapper, config);
    
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
    this.view = new Roo.calendar.View(Roo.apply({
        skipNavHeader : true,
        skipMonthHeader : false
        
    },config));
    
     
    this.on('activate', function()
    {
        Roo.log('activate');
         
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
        'eventclick': true,
        /**
	     * @event rendered
	     * Fires when the grid is rendered
	     * @param {Calendar} this
	    
	     */
        'rendered': true
        
        
    });
    this.relayEvents(this.view, ["select","monthchange","evententer","eventleave","rendered"]);

    //this.grid = grid;
    //this.grid.getGridEl().replaceClass("x-layout-inactive-content", "x-layout-component-panel");
};


Roo.extend(Roo.panel.Calendar, Roo.panel.Content, {
    
      
    render : function()
    {
        var ct = this.el.appendChild(document.createElement("div"));
        this.onRender(this.el, false)
    },
    
    onRender : function(ct, position)
    {
        if (this.rendered) {
            return;
        }
        this.rendered = true;
        
        Roo.log("render calendar");
        
        
        //Roo.bootstrap.Component.superclass.onRender.call(this, ct, position);
        
        
        var cfg = Roo.apply({},  this.view.getAutoCreate());
        cfg.id = Roo.id();
        
        // fill in the extra attributes 
        if (this.xattr && typeof(this.xattr) =='object') {
            for (var i in this.xattr) {
                cfg[i] = this.xattr[i];
            }
        }
        
        if(this.dataId){
            cfg.dataId = this.dataId;
        }
        
        if (this.cls) {
            cfg.cls = (typeof(cfg.cls) == 'undefined') ? this.cls : cfg.cls + ' ' + this.cls;
        }
        
        if (this.style) { // fixme needs to support more complex style data.
            cfg.style = this.style;
        }
        
        if(this.name){
            cfg.name = this.name;
        }
        
        this.view.el =  ct.createChild(cfg, position);
        
        //if(this.tabIndex !== undefined){
        //    this.el.dom.setAttribute('tabIndex', this.tabIndex);
        //}
        
        
        this.view.initEvents();
        this.fireEvent('rendered');
    }
    
    
    
    
});

 
