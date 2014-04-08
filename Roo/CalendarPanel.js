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
        var res = Roo.bootstrap.Calendar.prototype.getAutoCreate();
        
        
    }
    
    
    getAutoCreate : function(){
        
        
        fc_button = function(name, corner, style, content ) {
            return Roo.apply({},{
                tag : 'span',
                cls : 'fc-button fc-button-'+name+' fc-state-default ' + 
                         (corner.length ?
                            'fc-corner-' + corner.split(' ').join(' fc-corner-') :
                            ''
                        ),
                html : '<SPAN class="fc-text-'+style+ '">'+content +'</SPAN>',
                unselectable: 'on'
            });
        };
        
        var header = {
            tag : 'table',
            cls : 'fc-header',
            style : 'width:100%',
            cn : [
                {
                    tag: 'tr',
                    cn : [
                        {
                            tag : 'td',
                            cls : 'fc-header-left',
                            cn : [
                                fc_button('prev', 'left', 'arrow', '&#8249;' ),
                                fc_button('next', 'right', 'arrow', '&#8250;' ),
                                { tag: 'span', cls: 'fc-header-space' },
                                fc_button('today', 'left right', '', 'today' )  // neds state disabled..
                                
                                
                            ]
                        },
                        
                        {
                            tag : 'td',
                            cls : 'fc-header-center',
                            cn : [
                                {
                                    tag: 'span',
                                    cls: 'fc-header-title',
                                    cn : {
                                        tag: 'H2',
                                        html : 'month / year'
                                    }
                                }
                                
                            ]
                        },
                        {
                            tag : 'td',
                            cls : 'fc-header-right',
                            cn : [
                          /*      fc_button('month', 'left', '', 'month' ),
                                fc_button('week', '', '', 'week' ),
                                fc_button('day', 'right', '', 'day' )
                            */    
                                
                            ]
                        }
                        
                    ]
                }
            ]
        };
        
       
        var cal_heads = function() {
            var ret = [];
            // fixme - handle this.
            
            for (var i =0; i < Date.dayNames.length; i++) {
                var d = Date.dayNames[i];
                ret.push({
                    tag: 'th',
                    cls : 'fc-day-header fc-' + d.substring(0,3).toLowerCase() + ' fc-widget-header',
                    html : d.substring(0,3)
                });
                
            }
            ret[0].cls += ' fc-first';
            ret[6].cls += ' fc-last';
            return ret;
        };
        var cal_cell = function(n) {
            return  {
                tag: 'td',
                cls : 'fc-day fc-'+n + ' fc-widget-content', ///fc-other-month fc-past
                cn : [
                    {
                        cn : [
                            {
                                cls: 'fc-day-number',
                                html: 'D'
                            },
                            {
                                cls: 'fc-day-content',
                             
                                cn : [
                                     {
                                        style: 'position: relative;' // height: 17px;
                                    }
                                ]
                            }
                            
                            
                        ]
                    }
                ]
                
            }
        };
        var cal_rows = function() {
            
            var ret = []
            for (var r = 0; r < 6; r++) {
                var row= {
                    tag : 'tr',
                    cls : 'fc-week',
                    cn : []
                };
                
                for (var i =0; i < Date.dayNames.length; i++) {
                    var d = Date.dayNames[i];
                    row.cn.push(cal_cell(d.substring(0,3).toLowerCase()));

                }
                row.cn[0].cls+=' fc-first';
                row.cn[0].cn[0].style = 'min-height:90px';
                row.cn[6].cls+=' fc-last';
                ret.push(row);
                
            }
            ret[0].cls += ' fc-first';
            ret[4].cls += ' fc-prev-last';
            ret[5].cls += ' fc-last';
            return ret;
            
        };
        
        var cal_table = {
            tag: 'table',
            cls: 'fc-border-separate',
            style : 'width:100%',
            cellspacing  : 0,
            cn : [
                { 
                    tag: 'thead',
                    cn : [
                        { 
                            tag: 'tr',
                            cls : 'fc-first fc-last',
                            cn : cal_heads()
                        }
                    ]
                },
                { 
                    tag: 'tbody',
                    cn : cal_rows()
                }
                  
            ]
        };
         
         var cfg = {
            cls : 'fc fc-ltr',
            cn : [
                header,
                {
                    cls : 'fc-content',
                    style : "position: relative;",
                    cn : [
                        {
                            cls : 'fc-view fc-view-month fc-grid',
                            style : 'position: relative',
                            unselectable : 'on',
                            cn : [
                                {
                                    cls : 'fc-event-container',
                                    style : 'position:absolute;z-index:8;top:0;left:0;'
                                },
                                cal_table
                            ]
                        }
                    ]
    
                }
           ] 
            
        };
        
         
        
        return cfg;
    },
    
    
    initEvents : function()
    {
        if(!this.store){
            throw "can not find store for combo";
        }
        
        this.store = Roo.factory(this.store, Roo.data);
        this.store.on('load', this.onLoad, this);
        
        this.resize();
        this.cells = this.el.select('.fc-day',true);
        
        this.textNodes = this.el.query('.fc-day-number');
        this.cells.addClassOnOver('fc-state-hover');
        
        this.el.select('.fc-button-prev',true).on('click', this.showPrevMonth, this);
        this.el.select('.fc-button-next',true).on('click', this.showNextMonth, this);
        this.el.select('.fc-button-today',true).on('click', this.showToday, this);
        this.el.select('.fc-button',true).addClassOnOver('fc-state-hover');
        
        this.on('monthchange', this.onMonthChange, this);
        
        this.update(new Date().clearTime());
    },
    
});
