/*
 * - LGPL
 *
 * base class for bootstrap elements.
 * 
 */

Roo.bootstrap = Roo.bootstrap || {};
/**
 * @class Roo.bootstrap.Component
 * @extends Roo.Component
 * @abstract
 * @children Roo.bootstrap.Component
 * Bootstrap Component base class
 * @cfg {String} cls css class
 * @cfg {String} style any extra css
 * @cfg {Object} xattr extra attributes to add to 'element' (used by builder to store stuff.)
 * @cfg {Boolean} can_build_overlaid  True if element can be rebuild from a HTML page
 * @cfg {string} dataId cutomer id
 * @cfg {string} name Specifies name attribute
 * @cfg {string} tooltip  Text for the tooltip
 * @cfg {string} container_method method to fetch parents container element (used by NavHeaderbar -  getHeaderChildContainer)
 * @cfg {string|object} visibilityEl (el|parent) What element to use for visibility (@see getVisibilityEl())
 
 * @constructor
 * Do not use directly - it does not do anything..
 * @param {Object} config The config object
 */



Roo.bootstrap.Component = function(config){
    Roo.bootstrap.Component.superclass.constructor.call(this, config);
       
    this.addEvents({
        /**
         * @event childrenrendered
         * Fires when the children have been rendered..
         * @param {Roo.bootstrap.Component} this
         */
        "childrenrendered" : true
        
        
        
    });
    
    
};

Roo.extend(Roo.bootstrap.Component, Roo.BoxComponent,  {
    
    
    allowDomMove : false, // to stop relocations in parent onRender...
    
    cls : false,
    
    style : false,
    
    autoCreate : false,
    
    tooltip : null,
    /**
     * Initialize Events for the element
     */
    initEvents : function() { },
    
    xattr : false,
    
    parentId : false,
    
    can_build_overlaid : true,
    
    container_method : false,
    
    dataId : false,
    
    name : false,
    
    parent: function() {
        // returns the parent component..
        return Roo.ComponentMgr.get(this.parentId)
        
        
    },
    
    // private
    onRender : function(ct, position)
    {
       // Roo.log("Call onRender: " + this.xtype);
        
        Roo.bootstrap.Component.superclass.onRender.call(this, ct, position);
        
        if(this.el){
            if (this.el.attr('xtype')) {
                this.el.attr('xtypex', this.el.attr('xtype'));
                this.el.dom.removeAttribute('xtype');
                
                this.initEvents();
            }
            
            return;
        }
        
         
        
        var cfg = Roo.apply({},  this.getAutoCreate());
        
        cfg.id = this.id || Roo.id();
        
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
            cfg.cls = (typeof(cfg.cls) == 'undefined' ? this.cls : cfg.cls) + ' ' + this.cls;
        }
        
        if (this.style) { // fixme needs to support more complex style data.
            cfg.style = (typeof(cfg.style) == 'undefined' ? this.style : cfg.style) + '; ' + this.style;
        }
        
        if(this.name){
            cfg.name = this.name;
        }
        
        this.el = ct.createChild(cfg, position);
        
        if (this.tooltip) {
            this.tooltipEl().attr('tooltip', this.tooltip);
        }
        
        if(this.tabIndex !== undefined){
            this.el.dom.setAttribute('tabIndex', this.tabIndex);
        }
        
        this.initEvents();
	
    },
    /**
     * Fetch the element to add children to
     * @return {Roo.Element} defaults to this.el
     */
    getChildContainer : function()
    {
        return this.el;
    },
    getDocumentBody : function() // used by menus - as they are attached to the body so zIndexes work
    {
        return Roo.get(document.body);
    },
    
    /**
     * Fetch the element to display the tooltip on.
     * @return {Roo.Element} defaults to this.el
     */
    tooltipEl : function()
    {
        return this.el;
    },
        
    addxtype  : function(tree,cntr)
    {
        var cn = this;
        
        cn = Roo.factory(tree);
        //Roo.log(['addxtype', cn]);
           
        cn.parentType = this.xtype; //??
        cn.parentId = this.id;
        
        cntr = (typeof(cntr) == 'undefined' ) ? 'getChildContainer' : cntr;
        if (typeof(cn.container_method) == 'string') {
            cntr = cn.container_method;
        }
        
        
        var has_flexy_each =  (typeof(tree['flexy:foreach']) != 'undefined');
        
        var has_flexy_if =  (typeof(tree['flexy:if']) != 'undefined');
        
        var build_from_html =  Roo.XComponent.build_from_html;
          
        var is_body  = (tree.xtype == 'Body') ;
          
        var page_has_body = (Roo.get(document.body).attr('xtype') == 'Roo.bootstrap.Body');
          
        var self_cntr_el = Roo.get(this[cntr](false));
        
        // do not try and build conditional elements 
        if ((has_flexy_each || has_flexy_if || this.can_build_overlaid == false ) && build_from_html) {
            return false;
        }
        
        if (!has_flexy_each || !build_from_html || is_body || !page_has_body) {
            if(!has_flexy_if || typeof(tree.name) == 'undefined' || !build_from_html || is_body || !page_has_body){
                return this.addxtypeChild(tree,cntr, is_body);
            }
            
            var echild =self_cntr_el ? self_cntr_el.child('>*[name=' + tree.name + ']') : false;
                
            if(echild){
                return this.addxtypeChild(Roo.apply({}, tree),cntr);
            }
            
            Roo.log('skipping render');
            return cn;
            
        }
        
        var ret = false;
        if (!build_from_html) {
            return false;
        }
        
        // this i think handles overlaying multiple children of the same type
        // with the sam eelement.. - which might be buggy..
        while (true) {
            var echild =self_cntr_el ? self_cntr_el.child('>*[xtype]') : false;
            
            if (!echild) {
                break;
            }
            
            if (echild && echild.attr('xtype').split('.').pop() != cn.xtype) {
                break;
            }
            
            ret = this.addxtypeChild(Roo.apply({}, tree),cntr);
        }
       
        return ret;
    },
    
    
    addxtypeChild : function (tree, cntr, is_body)
    {
        Roo.debug && Roo.log('addxtypeChild:' + cntr);
        var cn = this;
        cntr = (typeof(cntr) == 'undefined' ) ? 'getChildContainer' : cntr;
        
        
        var has_flexy = (typeof(tree['flexy:if']) != 'undefined') ||
                    (typeof(tree['flexy:foreach']) != 'undefined');
          
    
        
        skip_children = false;
        // render the element if it's not BODY.
        if (!is_body) {
            
            // if parent was disabled, then do not try and create the children..
            if(!this[cntr](true)){
                tree.items = [];
                return tree;
            }
           
            cn = Roo.factory(tree);
           
            cn.parentType = this.xtype; //??
            cn.parentId = this.id;
            
            var build_from_html =  Roo.XComponent.build_from_html;
            
            
            // does the container contain child eleemnts with 'xtype' attributes.
            // that match this xtype..
            // note - when we render we create these as well..
            // so we should check to see if body has xtype set.
            if (build_from_html && Roo.get(document.body).attr('xtype') == 'Roo.bootstrap.Body') {
               
                var self_cntr_el = Roo.get(this[cntr](false));
                var echild =self_cntr_el ? self_cntr_el.child('>*[xtype]') : false;
                if (echild) { 
                    //Roo.log(Roo.XComponent.build_from_html);
                    //Roo.log("got echild:");
                    //Roo.log(echild);
                }
                // there is a scenario where some of the child elements are flexy:if (and all of the same type)
                // and are not displayed -this causes this to use up the wrong element when matching.
                // at present the only work around for this is to nest flexy:if elements in another element that is always rendered.
                
                
                if (echild && echild.attr('xtype').split('.').pop() == cn.xtype) {
                  //  Roo.log("found child for " + this.xtype +": " + echild.attr('xtype') );
                  
                  
                  
                    cn.el = echild;
                  //  Roo.log("GOT");
                    //echild.dom.removeAttribute('xtype');
                } else {
                    Roo.debug && Roo.log("MISSING " + cn.xtype + " on child of " + (this.el ? this.el.attr('xbuilderid') : 'no parent'));
                    Roo.debug && Roo.log(self_cntr_el);
                    Roo.debug && Roo.log(echild);
                    Roo.debug && Roo.log(cn);
                }
            }
           
            
           
            // if object has flexy:if - then it may or may not be rendered.
            if (build_from_html && has_flexy && !cn.el &&  cn.can_build_overlaid) {
                // skip a flexy if element.
                Roo.debug && Roo.log('skipping render');
                Roo.debug && Roo.log(tree);
                if (!cn.el) {
                    Roo.debug && Roo.log('skipping all children');
                    skip_children = true;
                }
                
             } else {
                 
                // actually if flexy:foreach is found, we really want to create 
                // multiple copies here...
                //Roo.log('render');
                //Roo.log(this[cntr]());
                // some elements do not have render methods.. like the layouts...
                /*
                if(this[cntr](true) === false){
                    cn.items = [];
                    return cn;
                }
                */
                cn.render && cn.render(this[cntr](true));
                
             }
            // then add the element..
        }
         
        // handle the kids..
        
        var nitems = [];
        /*
        if (typeof (tree.menu) != 'undefined') {
            tree.menu.parentType = cn.xtype;
            tree.menu.triggerEl = cn.el;
            nitems.push(cn.addxtype(Roo.apply({}, tree.menu)));
            
        }
        */
        if (!tree.items || !tree.items.length) {
            cn.items = nitems;
            //Roo.log(["no children", this]);
            
            return cn;
        }
         
        var items = tree.items;
        delete tree.items;
        
        //Roo.log(items.length);
            // add the items..
        if (!skip_children) {    
            for(var i =0;i < items.length;i++) {
              //  Roo.log(['add child', items[i]]);
                nitems.push(cn.addxtype(items[i].xns == false ? items[i] : Roo.apply({}, items[i])));
            }
        }
        
        cn.items = nitems;
        
        //Roo.log("fire childrenrendered");
        
        cn.fireEvent('childrenrendered', this);
        
        return cn;
    },
    
    /**
     * Set the element that will be used to show or hide
     */
    setVisibilityEl : function(el)
    {
	this.visibilityEl = el;
    },
    
     /**
     * Get the element that will be used to show or hide
     */
    getVisibilityEl : function()
    {
	if (typeof(this.visibilityEl) == 'object') {
	    return this.visibilityEl;
	}
	
	if (typeof(this.visibilityEl) == 'string') {
	    return this.visibilityEl == 'parent' ? this.parent().getEl() : this.getEl();
	}
	
	return this.getEl();
    },
    
    /**
     * Show a component - removes 'hidden' class
     */
    show : function()
    {
        if(!this.getVisibilityEl()){
            return;
        }
         
        this.getVisibilityEl().removeClass(['hidden','d-none']);
        
        this.fireEvent('show', this);
        
        
    },
    /**
     * Hide a component - adds 'hidden' class
     */
    hide: function()
    {
        if(!this.getVisibilityEl()){
            return;
        }
        
        this.getVisibilityEl().addClass(['hidden','d-none']);
        
        this.fireEvent('hide', this);
        
    }
});

 /*
 * - LGPL
 *
 * based on jquery fullcalendar
 * 
 */

Roo.bootstrap = Roo.bootstrap || {};
/**
 * @class Roo.bootstrap.Calendar
 * @extends Roo.bootstrap.Component
 * Bootstrap Calendar class
 * @cfg {Boolean} loadMask (true|false) default false
 * @cfg {Object} header generate the user specific header of the calendar, default false

 * @constructor
 * Create a new Container
 * @param {Object} config The config object
 */



Roo.bootstrap.Calendar = function(config){
    Roo.bootstrap.Calendar.superclass.constructor.call(this, config);
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

};

Roo.extend(Roo.bootstrap.Calendar, Roo.bootstrap.Component,  {
    
	  /**
     * @cfg {Roo.data.Store} store
     * The data source for the calendar
     */
	store : false,
     /**
     * @cfg {Number} startDay
     * Day index at which the week should begin, 0-based (defaults to 0, which is Sunday)
     */
    startDay : 0,
    
    loadMask : false,
    
    header : false,
      
    getAutoCreate : function(){
        
        
        var fc_button = function(name, corner, style, content ) {
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
        
        var header = {};
        
        if(!this.header){
            header = {
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
        }
        
        header = this.header;
        
       
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
            
            var ret = [];
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
            throw "can not find store for calendar";
        }
        
        var mark = {
            tag: "div",
            cls:"x-dlg-mask",
            style: "text-align:center",
            cn: [
                {
                    tag: "div",
                    style: "background-color:white;width:50%;margin:250 auto",
                    cn: [
                        {
                            tag: "img",
                            src: Roo.rootURL + '/images/ux/lightbox/loading.gif' 
                        },
                        {
                            tag: "span",
                            html: "Loading"
                        }
                        
                    ]
                }
            ]
        };
        this.maskEl = Roo.DomHelper.append(this.el.select('.fc-content', true).first(), mark, true);
        
        var size = this.el.select('.fc-content', true).first().getSize();
        this.maskEl.setSize(size.width, size.height);
        this.maskEl.enableDisplayMode("block");
        if(!this.loadMask){
            this.maskEl.hide();
        }
        
        this.store = Roo.factory(this.store, Roo.data);
        this.store.on('load', this.onLoad, this);
        this.store.on('beforeload', this.onBeforeLoad, this);
        
        this.resize();
        
        this.cells = this.el.select('.fc-day',true);
        //Roo.log(this.cells);
        this.textNodes = this.el.query('.fc-day-number');
        this.cells.addClassOnOver('fc-state-hover');
        
        this.el.select('.fc-button-prev',true).on('click', this.showPrevMonth, this);
        this.el.select('.fc-button-next',true).on('click', this.showNextMonth, this);
        this.el.select('.fc-button-today',true).on('click', this.showToday, this);
        this.el.select('.fc-button',true).addClassOnOver('fc-state-hover');
        
        this.on('monthchange', this.onMonthChange, this);
        
        this.update(new Date().clearTime());
    },
    
    resize : function() {
        var sz  = this.el.getSize();
        
        this.el.select('.fc-day-header',true).setWidth(sz.width / 7);
        this.el.select('.fc-day-content div',true).setHeight(34);
    },
    
    
    // private
    showPrevMonth : function(e){
        this.update(this.activeDate.add("mo", -1));
    },
    showToday : function(e){
        this.update(new Date().clearTime());
    },
    // private
    showNextMonth : function(e){
        this.update(this.activeDate.add("mo", 1));
    },

    // private
    showPrevYear : function(){
        this.update(this.activeDate.add("y", -1));
    },

    // private
    showNextYear : function(){
        this.update(this.activeDate.add("y", 1));
    },

    
   // private
    update : function(date)
    {
        var vd = this.activeDate;
        this.activeDate = date;
//        if(vd && this.el){
//            var t = date.getTime();
//            if(vd.getMonth() == date.getMonth() && vd.getFullYear() == date.getFullYear()){
//                Roo.log('using add remove');
//                
//                this.fireEvent('monthchange', this, date);
//                
//                this.cells.removeClass("fc-state-highlight");
//                this.cells.each(function(c){
//                   if(c.dateValue == t){
//                       c.addClass("fc-state-highlight");
//                       setTimeout(function(){
//                            try{c.dom.firstChild.focus();}catch(e){}
//                       }, 50);
//                       return false;
//                   }
//                   return true;
//                });
//                return;
//            }
//        }
        
        var days = date.getDaysInMonth();
        
        var firstOfMonth = date.getFirstDateOfMonth();
        var startingPos = firstOfMonth.getDay()-this.startDay;
        
        if(startingPos < this.startDay){
            startingPos += 7;
        }
        
        var pm = date.add(Date.MONTH, -1);
        var prevStart = pm.getDaysInMonth()-startingPos;
//        
        this.cells = this.el.select('.fc-day',true);
        this.textNodes = this.el.query('.fc-day-number');
        this.cells.addClassOnOver('fc-state-hover');
        
        var cells = this.cells.elements;
        var textEls = this.textNodes;
        
        Roo.each(cells, function(cell){
            cell.removeClass([ 'fc-past', 'fc-other-month', 'fc-future', 'fc-state-highlight', 'fc-state-disabled']);
        });
        
        days += startingPos;

        // convert everything to numbers so it's fast
        var day = 86400000;
        var d = (new Date(pm.getFullYear(), pm.getMonth(), prevStart)).clearTime();
        //Roo.log(d);
        //Roo.log(pm);
        //Roo.log(prevStart);
        
        var today = new Date().clearTime().getTime();
        var sel = date.clearTime().getTime();
        var min = this.minDate ? this.minDate.clearTime() : Number.NEGATIVE_INFINITY;
        var max = this.maxDate ? this.maxDate.clearTime() : Number.POSITIVE_INFINITY;
        var ddMatch = this.disabledDatesRE;
        var ddText = this.disabledDatesText;
        var ddays = this.disabledDays ? this.disabledDays.join("") : false;
        var ddaysText = this.disabledDaysText;
        var format = this.format;
        
        var setCellClass = function(cal, cell){
            cell.row = 0;
            cell.events = [];
            cell.more = [];
            //Roo.log('set Cell Class');
            cell.title = "";
            var t = d.getTime();
            
            //Roo.log(d);
            
            cell.dateValue = t;
            if(t == today){
                cell.className += " fc-today";
                cell.className += " fc-state-highlight";
                cell.title = cal.todayText;
            }
            if(t == sel){
                // disable highlight in other month..
                //cell.className += " fc-state-highlight";
                
            }
            // disabling
            if(t < min) {
                cell.className = " fc-state-disabled";
                cell.title = cal.minText;
                return;
            }
            if(t > max) {
                cell.className = " fc-state-disabled";
                cell.title = cal.maxText;
                return;
            }
            if(ddays){
                if(ddays.indexOf(d.getDay()) != -1){
                    cell.title = ddaysText;
                    cell.className = " fc-state-disabled";
                }
            }
            if(ddMatch && format){
                var fvalue = d.dateFormat(format);
                if(ddMatch.test(fvalue)){
                    cell.title = ddText.replace("%0", fvalue);
                    cell.className = " fc-state-disabled";
                }
            }
            
            if (!cell.initialClassName) {
                cell.initialClassName = cell.dom.className;
            }
            
            cell.dom.className = cell.initialClassName  + ' ' +  cell.className;
        };

        var i = 0;
        
        for(; i < startingPos; i++) {
            textEls[i].innerHTML = (++prevStart);
            d.setDate(d.getDate()+1);
            
            cells[i].className = "fc-past fc-other-month";
            setCellClass(this, cells[i]);
        }
        
        var intDay = 0;
        
        for(; i < days; i++){
            intDay = i - startingPos + 1;
            textEls[i].innerHTML = (intDay);
            d.setDate(d.getDate()+1);
            
            cells[i].className = ''; // "x-date-active";
            setCellClass(this, cells[i]);
        }
        var extraDays = 0;
        
        for(; i < 42; i++) {
            textEls[i].innerHTML = (++extraDays);
            d.setDate(d.getDate()+1);
            
            cells[i].className = "fc-future fc-other-month";
            setCellClass(this, cells[i]);
        }
        
        this.el.select('.fc-header-title h2',true).update(Date.monthNames[date.getMonth()] + " " + date.getFullYear());
        
        var totalRows = Math.ceil((date.getDaysInMonth() + date.getFirstDateOfMonth().getDay()) / 7);
        
        this.el.select('tr.fc-week.fc-prev-last',true).removeClass('fc-last');
        this.el.select('tr.fc-week.fc-next-last',true).addClass('fc-last').show();
        
        if(totalRows != 6){
            this.el.select('tr.fc-week.fc-last',true).removeClass('fc-last').addClass('fc-next-last').hide();
            this.el.select('tr.fc-week.fc-prev-last',true).addClass('fc-last');
        }
        
        this.fireEvent('monthchange', this, date);
        
        
        /*
        if(!this.internalRender){
            var main = this.el.dom.firstChild;
            var w = main.offsetWidth;
            this.el.setWidth(w + this.el.getBorderWidth("lr"));
            Roo.fly(main).setWidth(w);
            this.internalRender = true;
            // opera does not respect the auto grow header center column
            // then, after it gets a width opera refuses to recalculate
            // without a second pass
            if(Roo.isOpera && !this.secondPass){
                main.rows[0].cells[1].style.width = (w - (main.rows[0].cells[0].offsetWidth+main.rows[0].cells[2].offsetWidth)) + "px";
                this.secondPass = true;
                this.update.defer(10, this, [date]);
            }
        }
        */
        
    },
    
    findCell : function(dt) {
        dt = dt.clearTime().getTime();
        var ret = false;
        this.cells.each(function(c){
            //Roo.log("check " +c.dateValue + '?=' + dt);
            if(c.dateValue == dt){
                ret = c;
                return false;
            }
            return true;
        });
        
        return ret;
    },
    
    findCells : function(ev) {
        var s = ev.start.clone().clearTime().getTime();
       // Roo.log(s);
        var e= ev.end.clone().clearTime().getTime();
       // Roo.log(e);
        var ret = [];
        this.cells.each(function(c){
             ////Roo.log("check " +c.dateValue + '<' + e + ' > ' + s);
            
            if(c.dateValue > e){
                return ;
            }
            if(c.dateValue < s){
                return ;
            }
            ret.push(c);
        });
        
        return ret;    
    },
    
//    findBestRow: function(cells)
//    {
//        var ret = 0;
//        
//        for (var i =0 ; i < cells.length;i++) {
//            ret  = Math.max(cells[i].rows || 0,ret);
//        }
//        return ret;
//        
//    },
    
    
    addItem : function(ev)
    {
        // look for vertical location slot in
        var cells = this.findCells(ev);
        
//        ev.row = this.findBestRow(cells);
        
        // work out the location.
        
        var crow = false;
        var rows = [];
        for(var i =0; i < cells.length; i++) {
            
            cells[i].row = cells[0].row;
            
            if(i == 0){
                cells[i].row = cells[i].row + 1;
            }
            
            if (!crow) {
                crow = {
                    start : cells[i],
                    end :  cells[i]
                };
                continue;
            }
            if (crow.start.getY() == cells[i].getY()) {
                // on same row.
                crow.end = cells[i];
                continue;
            }
            // different row.
            rows.push(crow);
            crow = {
                start: cells[i],
                end : cells[i]
            };
            
        }
        
        rows.push(crow);
        ev.els = [];
        ev.rows = rows;
        ev.cells = cells;
        
        cells[0].events.push(ev);
        
        this.calevents.push(ev);
    },
    
    clearEvents: function() {
        
        if(!this.calevents){
            return;
        }
        
        Roo.each(this.cells.elements, function(c){
            c.row = 0;
            c.events = [];
            c.more = [];
        });
        
        Roo.each(this.calevents, function(e) {
            Roo.each(e.els, function(el) {
                el.un('mouseenter' ,this.onEventEnter, this);
                el.un('mouseleave' ,this.onEventLeave, this);
                el.remove();
            },this);
        },this);
        
        Roo.each(Roo.select('.fc-more-event', true).elements, function(e){
            e.remove();
        });
        
    },
    
    renderEvents: function()
    {   
        var _this = this;
        
        this.cells.each(function(c) {
            
            if(c.row < 5){
                return;
            }
            
            var ev = c.events;
            
            var r = 4;
            if(c.row != c.events.length){
                r = 4 - (4 - (c.row - c.events.length));
            }
            
            c.events = ev.slice(0, r);
            c.more = ev.slice(r);
            
            if(c.more.length && c.more.length == 1){
                c.events.push(c.more.pop());
            }
            
            c.row = (c.row - ev.length) + c.events.length + ((c.more.length) ? 1 : 0);
            
        });
            
        this.cells.each(function(c) {
            
            c.select('.fc-day-content div',true).first().setHeight(Math.max(34, c.row * 20));
            
            
            for (var e = 0; e < c.events.length; e++){
                var ev = c.events[e];
                var rows = ev.rows;
                
                for(var i = 0; i < rows.length; i++) {
                
                    // how many rows should it span..

                    var  cfg = {
                        cls : 'roo-dynamic fc-event fc-event-hori fc-event-draggable ui-draggable',
                        style : 'position: absolute', // left: 387px; width: 121px; top: 359px;

                        unselectable : "on",
                        cn : [
                            {
                                cls: 'fc-event-inner',
                                cn : [
    //                                {
    //                                  tag:'span',
    //                                  cls: 'fc-event-time',
    //                                  html : cells.length > 1 ? '' : ev.time
    //                                },
                                    {
                                      tag:'span',
                                      cls: 'fc-event-title',
                                      html : String.format('{0}', ev.title)
                                    }


                                ]
                            },
                            {
                                cls: 'ui-resizable-handle ui-resizable-e',
                                html : '&nbsp;&nbsp;&nbsp'
                            }

                        ]
                    };

                    if (i == 0) {
                        cfg.cls += ' fc-event-start';
                    }
                    if ((i+1) == rows.length) {
                        cfg.cls += ' fc-event-end';
                    }

                    var ctr = _this.el.select('.fc-event-container',true).first();
                    var cg = ctr.createChild(cfg);

                    var sbox = rows[i].start.select('.fc-day-content',true).first().getBox();
                    var ebox = rows[i].end.select('.fc-day-content',true).first().getBox();

                    var r = (c.more.length) ? 1 : 0;
                    cg.setXY([sbox.x +2, sbox.y + ((c.row - c.events.length - r + e) * 20)]);    
                    cg.setWidth(ebox.right - sbox.x -2);

                    cg.on('mouseenter' ,_this.onEventEnter, _this, ev);
                    cg.on('mouseleave' ,_this.onEventLeave, _this, ev);
                    cg.on('click', _this.onEventClick, _this, ev);

                    ev.els.push(cg);
                    
                }
                
            }
            
            
            if(c.more.length){
                var  cfg = {
                    cls : 'fc-more-event roo-dynamic fc-event fc-event-hori fc-event-draggable ui-draggable fc-event-start fc-event-end',
                    style : 'position: absolute',
                    unselectable : "on",
                    cn : [
                        {
                            cls: 'fc-event-inner',
                            cn : [
                                {
                                  tag:'span',
                                  cls: 'fc-event-title',
                                  html : 'More'
                                }


                            ]
                        },
                        {
                            cls: 'ui-resizable-handle ui-resizable-e',
                            html : '&nbsp;&nbsp;&nbsp'
                        }

                    ]
                };

                var ctr = _this.el.select('.fc-event-container',true).first();
                var cg = ctr.createChild(cfg);

                var sbox = c.select('.fc-day-content',true).first().getBox();
                var ebox = c.select('.fc-day-content',true).first().getBox();
                //Roo.log(cg);
                cg.setXY([sbox.x +2, sbox.y +((c.row - 1) * 20)]);    
                cg.setWidth(ebox.right - sbox.x -2);

                cg.on('click', _this.onMoreEventClick, _this, c.more);
                
            }
            
        });
        
        
        
    },
    
    onEventEnter: function (e, el,event,d) {
        this.fireEvent('evententer', this, el, event);
    },
    
    onEventLeave: function (e, el,event,d) {
        this.fireEvent('eventleave', this, el, event);
    },
    
    onEventClick: function (e, el,event,d) {
        this.fireEvent('eventclick', this, el, event);
    },
    
    onMonthChange: function () {
        this.store.load();
    },
    
    onMoreEventClick: function(e, el, more)
    {
        var _this = this;
        
        this.calpopover.placement = 'right';
        this.calpopover.setTitle('More');
        
        this.calpopover.setContent('');
        
        var ctr = this.calpopover.el.select('.popover-content', true).first();
        
        Roo.each(more, function(m){
            var cfg = {
                cls : 'fc-event-hori fc-event-draggable',
                html : m.title
            };
            var cg = ctr.createChild(cfg);
            
            cg.on('click', _this.onEventClick, _this, m);
        });
        
        this.calpopover.show(el);
        
        
    },
    
    onLoad: function () 
    {   
        this.calevents = [];
        var cal = this;
        
        if(this.store.getCount() > 0){
            this.store.data.each(function(d){
               cal.addItem({
                    id : d.data.id,
                    start: (typeof(d.data.start_dt) === 'string') ? new Date.parseDate(d.data.start_dt, 'Y-m-d H:i:s') : d.data.start_dt,
                    end : (typeof(d.data.end_dt) === 'string') ? new Date.parseDate(d.data.end_dt, 'Y-m-d H:i:s') : d.data.end_dt,
                    time : d.data.start_time,
                    title : d.data.title,
                    description : d.data.description,
                    venue : d.data.venue
                });
            });
        }
        
        this.renderEvents();
        
        if(this.calevents.length && this.loadMask){
            this.maskEl.hide();
        }
    },
    
    onBeforeLoad: function()
    {
        this.clearEvents();
        if(this.loadMask){
            this.maskEl.show();
        }
    }
});

 
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

 
