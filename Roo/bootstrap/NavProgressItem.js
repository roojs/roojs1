/*
 * - LGPL
 *
 * Nav Progress Item
 * 
 */

/**
 * @class Roo.bootstrap.NavProgressItem
 * @extends Roo.bootstrap.Component
 * Bootstrap NavProgressItem class
 * @cfg {Boolean} active (true|false) Is item active default false
 * @cfg {Boolean} disabled (true|false) Is item active default false
 * @cfg {String} html
 * @cfg {String} position (top|bottom) text position default bottom
 * 
 * @constructor
 * Create a new NavProgressItem
 * @param {Object} config The config object
 */
Roo.bootstrap.NavProgressItem = function(config){
    Roo.bootstrap.NavProgressItem.superclass.constructor.call(this, config);
    this.addEvents({
        // raw events
        /**
         * @event click
         * The raw click event for the entire grid.
         * @param {Roo.bootstrap.NavProgressItem} this
         * @param {Roo.EventObject} e
         */
        "click" : true,
	 /**
	    * @event changed
	    * Fires when the active item active state changes
	    * @param {Roo.bootstrap.NavProgressItem} this
	    * @param {boolean} state the new state
	     
         */
        'changed': true
    });
   
};

Roo.extend(Roo.bootstrap.NavProgressItem, Roo.bootstrap.Component,  {
    
    active : false,
    disabled : false,
    html : '',
    position : 'bottom',
    
    getAutoCreate : function()
    {
         
        var cfg = {
            tag: 'li',
            cls: 'roo-navigation-bar-item ' + this.position,
            cn : [
                {
                    tag : 'span',
                    cls : 'roo-navigation-bar-item-text',
                    html : this.html
                }
            ]
        }
        
        if (this.active) {
            cfg.cls += ' active';
        }
        if (this.disabled) {
            cfg.cls += ' disabled';
        }
        
        return cfg;
    },
    
    initEvents: function() 
    {
        
    }
//    
//    onClick : function(e)
//    {
//        if(
//                this.preventDefault || 
//                this.href == '#' 
//        ){
//            
//            e.preventDefault();
//        }
//        
//        if (this.disabled) {
//            return;
//        }
//        
//        var tg = Roo.bootstrap.TabGroup.get(this.navId);
//        if (tg && tg.transition) {
//            Roo.log("waiting for the transitionend");
//            return;
//        }
//        
//        
//        
//        //Roo.log("fire event clicked");
//        if(this.fireEvent('click', this, e) === false){
//            return;
//        };
//        
//        if(this.tagtype == 'span'){
//            return;
//        }
//        
//        //Roo.log(this.href);
//        var ael = this.el.select('a',true).first();
//        //Roo.log(ael);
//        
//        if(ael && this.animateRef && this.href.indexOf('#') > -1){
//            //Roo.log(["test:",ael.dom.href.split("#")[0], document.location.toString().split("#")[0]]);
//            if (ael.dom.href.split("#")[0] != document.location.toString().split("#")[0]) {
//                return; // ignore... - it's a 'hash' to another page.
//            }
//            
//            e.preventDefault();
//            this.scrollToElement(e);
//        }
//        
//        
//        var p =  this.parent();
//   
//        if (['tabs','pills'].indexOf(p.type)!==-1) {
//            if (typeof(p.setActiveItem) !== 'undefined') {
//                p.setActiveItem(this);
//            }
//        }
//        
//        // if parent is a navbarheader....- and link is probably a '#' page ref.. then remove the expanded menu.
//        if (p.parentType == 'NavHeaderbar' && !this.menu) {
//            // remove the collapsed menu expand...
//            p.parent().el.select('.navbar-collapse',true).removeClass('in');  
//        }
//    },
//    
//    isActive: function () {
//        return this.active
//    },
//    setActive : function(state, fire, is_was_active)
//    {
//        if (this.active && !state && this.navId) {
//            this.was_active = true;
//            var nv = Roo.bootstrap.NavGroup.get(this.navId);
//            if (nv) {
//                nv.clearWasActive(this);
//            }
//            
//        }
//        this.active = state;
//        
//        if (!state ) {
//            this.el.removeClass('active');
//        } else if (!this.el.hasClass('active')) {
//            this.el.addClass('active');
//        }
//        if (fire) {
//            this.fireEvent('changed', this, state);
//        }
//        
//        // show a panel if it's registered and related..
//        
//        if (!this.navId || !this.tabId || !state || is_was_active) {
//            return;
//        }
//        
//        var tg = Roo.bootstrap.TabGroup.get(this.navId);
//        if (!tg) {
//            return;
//        }
//        var pan = tg.getPanelByName(this.tabId);
//        if (!pan) {
//            return;
//        }
//        // if we can not flip to new panel - go back to old nav highlight..
//        if (false == tg.showPanel(pan)) {
//            var nv = Roo.bootstrap.NavGroup.get(this.navId);
//            if (nv) {
//                var onav = nv.getWasActive();
//                if (onav) {
//                    onav.setActive(true, false, true);
//                }
//            }
//            
//        }
//        
//        
//	
//    },
//     // this should not be here...
//    setDisabled : function(state)
//    {
//        this.disabled = state;
//        if (!state ) {
//            this.el.removeClass('disabled');
//        } else if (!this.el.hasClass('disabled')) {
//            this.el.addClass('disabled');
//        }
//        
//    },
//    
//    /**
//     * Fetch the element to display the tooltip on.
//     * @return {Roo.Element} defaults to this.el
//     */
//    tooltipEl : function()
//    {
//        return this.el.select('' + this.tagtype + '', true).first();
//    },
//    
//    scrollToElement : function(e)
//    {
//        var c = document.body;
//        
//        /*
//         * Firefox / IE places the overflow at the html level, unless specifically styled to behave differently.
//         */
//        if(Roo.isFirefox || Roo.isIE || Roo.isIE11){
//            c = document.documentElement;
//        }
//        
//        var target = Roo.get(c).select('a[name=' + this.href.split('#')[1] +']', true).first();
//        
//        if(!target){
//            return;
//        }
//
//        var o = target.calcOffsetsTo(c);
//        
//        var options = {
//            target : target,
//            value : o[1]
//        }
//        
//        this.fireEvent('scrollto', this, options, e);
//        
//        Roo.get(c).scrollTo('top', options.value, true);
//        
//        return;
//    }
});
 

 