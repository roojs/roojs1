/*
 *  - LGPL
 *
 *  This is BS4's Card element.. - similar to our containers probably..
 * 
 */
/**
 * @class Roo.bootstrap.Card
 * @extends Roo.bootstrap.Component
 * Bootstrap Card class
 *
 *
 * possible... may not be implemented..
 * @cfg {String} header_image  src url of image.
 * @cfg {String|Object} header
 * @cfg {Number} header_size (0|1|2|3|4|5) H1 or H2 etc.. 0 indicates default
 * 
 * @cfg {String} title
 * @cfg {String} subtitle
 * @cfg {String} html -- html contents - or just use children..
 * @cfg {String} footer
 
 * @cfg {String} weight (primary|warning|info|danger|secondary|success|light|dark)
 * 
 * @cfg {String} margin (0|1|2|3|4|5|auto)
 * @cfg {String} margin_top (0|1|2|3|4|5|auto)
 * @cfg {String} margin_bottom (0|1|2|3|4|5|auto)
 * @cfg {String} margin_left (0|1|2|3|4|5|auto)
 * @cfg {String} margin_right (0|1|2|3|4|5|auto)
 * @cfg {String} margin_x (0|1|2|3|4|5|auto)
 * @cfg {String} margin_y (0|1|2|3|4|5|auto)
 *
 * @cfg {String} padding (0|1|2|3|4|5)
 * @cfg {String} padding_top (0|1|2|3|4|5)
 * @cfg {String} padding_bottom (0|1|2|3|4|5)
 * @cfg {String} padding_left (0|1|2|3|4|5)
 * @cfg {String} padding_right (0|1|2|3|4|5)
 * @cfg {String} padding_x (0|1|2|3|4|5)
 * @cfg {String} padding_y (0|1|2|3|4|5)
 *
 * @cfg {String} display (none|inline|inline-block|block|table|table-cell|table-row|flex|inline-flex)
 * @cfg {String} display_xs (none|inline|inline-block|block|table|table-cell|table-row|flex|inline-flex)
 * @cfg {String} display_sm (none|inline|inline-block|block|table|table-cell|table-row|flex|inline-flex)
 * @cfg {String} display_lg (none|inline|inline-block|block|table|table-cell|table-row|flex|inline-flex)
 * @cfg {String} display_xl (none|inline|inline-block|block|table|table-cell|table-row|flex|inline-flex)
 
 * @config {Boolean} dragable  if this card can be dragged.
 * @config {String} drag_group  group for drag
 * @config {Boolean} dropable  if this card can recieve other cards being dropped onto it..
 * @config {String} drop_group  group for drag
 * 
 * @config {Boolean} collapsable can the body be collapsed.
 * @config {Boolean} collapsed is the body collapsed when rendered...
 * @constructor
 * Create a new Container
 * @param {Object} config The config object
 */

Roo.bootstrap.Card = function(config){
    Roo.bootstrap.Card.superclass.constructor.call(this, config);
    
    this.addEvents({
         // raw events
        /**
         * @event drop
         * When a element a card is dropped
         * @param {Roo.bootstrap.Element} this
         * @param {Roo.Element} n the node being dropped?
         * @param {Object} dd Drag and drop data
         * @param {Roo.EventObject} e
         * @param {Roo.EventObject} data  the data passed via getDragData
         */
        'drop' : true
        
    });
};


Roo.extend(Roo.bootstrap.Card, Roo.bootstrap.Component,  {
    
    
    weight : '',
    
    margin: '', /// may be better in component?
    margin_top: '', 
    margin_bottom: '', 
    margin_left: '',
    margin_right: '',
    margin_x: '',
    margin_y: '',
    
    padding : '',
    padding_top: '', 
    padding_bottom: '', 
    padding_left: '',
    padding_right: '',
    padding_x: '',
    padding_y: '',
    
    display: '', 
    display_xs: '', 
    display_sm: '', 
    display_lg: '',
    display_xl: '',
 
    header_image  : '',
    header : '',
    header_size : 0,
    title : '',
    subtitle : '',
    html : '',
    footer: '',

    collapsable : false,
    collapsed : false,
    
    dragable : false,
    drag_group : false,
    dropable : false,
    drop_group : false,
    childContainer : false,
    dropEl : false, /// the dom placeholde element that indicates drop location.
    
    layoutCls : function()
    {
        var cls = '';
        var t = this;
        Roo.log(this.margin_bottom.length);
        ['', 'top', 'bottom', 'left', 'right', 'x', 'y' ].forEach(function(v) {
            // in theory these can do margin_top : ml-xs-3 ??? but we don't support that yet
            
            if (('' + t['margin' + (v.length ? '_' : '') + v]).length) {
                cls += ' m' +  (v.length ? v[0]  : '') + '-' +  t['margin' + (v.length ? '_' : '') + v];
            }
            if (('' + t['padding' + (v.length ? '_' : '') + v]).length) {
                cls += ' p' +  (v.length ? v[0]  : '') + '-' +  t['padding' + (v.length ? '_' : '') + v];
            }
        });
        
        ['', 'xs', 'sm', 'lg', 'xl'].forEach(function(v) {
            if (('' + t['display' + (v.length ? '_' : '') + v]).length) {
                cls += ' d' +  (v.length ? '-' : '') + v + '-' + t['margin' + (v.length ? '_' : '') + v]
            }
        });
        
        // more generic support?
        if (this.hidden) {
            cls += ' d-none';
        }
        
        return cls;
    },
 
       // Roo.log("Call onRender: " + this.xtype);
        /*  We are looking at something like this.
<div class="card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
         <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>

        >> this bit is really the body...
        <div> << we will ad dthis in hopefully it will not break shit.
        
        ** card text does not actually have any styling...
        
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        
        </div> <<
          <a href="#" class="card-link">Card link</a>
          
    </div>
    <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
    </div>
</div>
         */
    getAutoCreate : function(){
        
        var cfg = {
            tag : 'div',
            cls : 'card',
            cn : [ ]
        };
        
        if (this.weight.length && this.weight != 'light') {
            cfg.cls += ' text-white';
        } else {
            cfg.cls += ' text-dark'; // need as it's nested..
        }
        if (this.weight.length) {
            cfg.cls += ' bg-' + this.weight;
        }
        
        cfg.cls += this.layoutCls(); 
        
    var hdr = false;
        if (this.header.length) {
            hdr = {
                tag : this.header_size > 0 ? 'h' + this.header_size : 'div',
                cls : 'card-header',
        cn : []
            };
        cfg.cn.push(hdr);
        hdr_ctr = hdr;
        } else {
        hdr = {
                tag : 'div',
                cls : 'card-header d-none',
        cn : []
            };
        cfg.cn.push(hdr);
    }
    if (this.collapsable) {
        hdr_ctr = {
        tag : 'a',
        cls : 'd-block user-select-none',
        cn: [
            {
            tag: 'i',
            cls : 'roo-collapse-toggle fa fa-chevron-down float-right'
            }
           
        ]
        };
        hdr.cn.push(hdr_ctr);
    }
    if (this.header.length) {
        hdr_ctr.cn.push(        {
        tag: 'span',
        cls: 'roo-card-header-ctr',
        html : this.header
        })
    }
    
        if (this.header_image.length) {
            cfg.cn.push({
                tag : 'img',
                cls : 'card-img-top',
                src: this.header_image // escape?
            });
        } else {
        cfg.cn.push({
                tag : 'div',
                cls : 'card-img-top d-none' 
            });
    }
        
        var body = {
            tag : 'div',
            cls : 'card-body',
            cn : []
        };
    var obody = body;
    if (this.collapsable) {
        obody = {
        tag: 'div',
        cls : 'roo-collapsable collapse ' + (this.collapsed ? '' : 'show'),
        cn : [  body ]
        };
    }
    
        cfg.cn.push(obody);
        
        if (this.title.length) {
            body.cn.push({
                tag : 'div',
                cls : 'card-title',
                src: this.title // escape?
            });
        }
        
        if (this.subtitle.length) {
            body.cn.push({
                tag : 'div',
                cls : 'card-title',
                src: this.subtitle // escape?
            });
        }
        
        body.cn.push({
            tag : 'div',
            cls : 'roo-card-body-ctr'
        });
        
        if (this.html.length) {
            body.cn.push({
                tag: 'div',
                html : this.html
            });
        }
        // fixme ? handle objects?
        if (this.footer.length) {
            cfg.cn.push({
                tag : 'div',
                cls : 'card-footer',
                html: this.footer // escape?
            });
        }
        // footer...
        
        return cfg;
    },
    
    
    getCardHeader : function()
    {
        var  ret = this.el.select('.card-header',true).first();
    if (ret.hasClass('d-none')) {
        ret.removeClass('d-none');
    }
        
        return ret;
    },
    
    getCardImageTop : function()
    {
        var  ret = this.el.select('.card-img-top',true).first();
    if (ret.hasClass('d-none')) {
        ret.removeClass('d-none');
    }
        
        return ret;
    },
    
    getChildContainer : function()
    {
        
        if(!this.el){
            return false;
        }
        return this.el.select('.roo-card-body-ctr',true).first();    
    },
    
    initEvents: function() 
    {
        
    this.bodyEl = this.getChildContainer();
    if(this.dragable){
            this.dragZone = new Roo.dd.DragZone(this.getEl(), {
                    containerScroll: true,
                    ddGroup: this.drag_group || 'default_card_drag_group'
            });
            this.dragZone.getDragData = this.getDragData.createDelegate(this);
        }
        if (this.dropable) {
        this.dropZone = new Roo.dd.DropZone(this.el.select('.card-body',true).first() , {
            containerScroll: true,
            ddGroup: this.drop_group || 'default_card_drag_group'
        });
        this.dropZone.getTargetFromEvent = this.getTargetFromEvent.createDelegate(this);
        this.dropZone.onNodeEnter = this.onNodeEnter.createDelegate(this);
        this.dropZone.onNodeOver = this.onNodeOver.createDelegate(this);
        this.dropZone.onNodeOut = this.onNodeOut.createDelegate(this);
        this.dropZone.onNodeDrop = this.onNodeDrop.createDelegate(this);
    }
        
        if (this.collapsable) {
        this.el.select('.card-header',true).on('click', this.onToggleCollapse, this);
    }
    },
    getDragData : function(e)
    {
        var target = this.getEl();
        if (target) {
            //this.handleSelection(e);
            
            var dragData = {
                source: this,
                copy: false,
                nodes: this.getEl(),
                records: []
            };
            
            
            dragData.ddel = target.dom ;    // the div element
            Roo.log(target.getWidth( ));
            dragData.ddel.style.width = target.getWidth() + 'px';
            
            return dragData;
        }
        return false;
    },
    /**
    *    Part of the Roo.dd.DropZone interface. If no target node is found, the
    *    whole Element becomes the target, and this causes the drop gesture to append.
    */
    getTargetFromEvent : function(e, dragged_card_el)
    {
        var target = e.getTarget();
        while ((target !== null) && (target.parentNode != this.bodyEl.dom)) {
            target = target.parentNode;
        }
        
        var ret = {
            position: '',
            cards : [],
            card_n : -1,
            items_n : -1,
            card : false,
        };
        
        //Roo.log([ 'target' , target ? target.id : '--nothing--']);
        // see if target is one of the 'cards'...
        
        
        //Roo.log(this.items.length);
        var pos = false;
        
        var last_card_n = 0;
        var cards_len  = 0;
        for (var i = 0;i< this.items.length;i++) {
            
            if (!this.items[i].el.hasClass('card')) {
                 continue;
            }
            pos = this.getDropPoint(e, this.items[i].el.dom);
            
            cards_len = ret.cards.length;
            //Roo.log(this.items[i].el.dom.id);
            ret.cards.push(this.items[i]);
            last_card_n  = i;
            if (ret.card_n < 0 && pos == 'above') {
                ret.position = cards_len > 0 ? 'below' : pos;
                ret.items_n = i > 0 ? i - 1 : 0;
                ret.card_n  = cards_len  > 0 ? cards_len - 1 : 0;
            }
        }
        if (!ret.cards.length) {
            ret.card = true;
            ret.position = below;
            ret.items_n;
            return ret;
        }
        // could not find a card.. stick it at the end..
        if (ret.card_n < 0) {
            ret.card_n = last_card_n;
            ret.card = ret.cards[last_card_n];
            ret.items_n = this.items.indexOf(ret.cards[last_card_n]);
            cpos = 'below';
        }
        
        if (this.items[ret.items_n].el == dragged_card_el) {
            return false;
        }
        
        if (ret.position == 'below') {
            var card_after = ret.card_n+1 == ret.cards.length ? false : ret.cards[ret.card_n+1];
            
            if (card_after  && card_after.el == dragged_card_el) {
                return false;
            }
            return ret;
        }
        
        // its's after ..
        var card_before = ret.card_n > 0 ? ret.cards[ret.card_n-1] : false;
        
        if (card_before  && card_before.el == dragged_card_el) {
            return false;
        }
        
        return ret;
    },
    
    onNodeEnter : function(n, dd, e, data){
        return false;
    },
    onNodeOver : function(n, dd, e, data)
    {
       
        var target_info = this.getTargetFromEvent(e,data.source.el);
        if (target_info === false) {
            this.dropPlaceHolder('hide');
            return false;
        }
        Roo.log(['getTargetFromEvent', target_info ]);
        
         
        this.dropPlaceHolder('show', target_info,data);
        
        return false; 
    },
    onNodeOut : function(n, dd, e, data){
        this.dropPlaceHolder('hide');
     
    },
    onNodeDrop : function(n, dd, e, data)
    {
        
        // call drop - return false if  
        if (this.fireEvent("drop", this, n, dd, e, data) === false) {
            return false;
        }
        
        var target_info = this.getTargetFromEvent(e,data.source.el);
        if (target_info === false) {
            return false;
        }
        
        var pt = this.getDropPoint(e, n, dd);
        var insertAt = (n == this.bodyEl.dom) ? this.items.length : n.nodeIndex;
        if (pt == "below") {
            insertAt++;
        }
        for (var i = 0; i < this.items.length; i++) {
            var r = this.items[i];
            //var dup = this.store.getById(r.id);
            if (dup && (dd != this.dragZone)) {
                Roo.fly(this.getNode(this.store.indexOf(dup))).frame("red", 1);
            } else {
            if (data.copy) {
                this.store.insert(insertAt++, r.copy());
            } else {
                data.source.isDirtyFlag = true;
                r.store.remove(r);
                this.store.insert(insertAt++, r);
            }
            this.isDirtyFlag = true;
            }
        }
        this.dragZone.cachedTarget = null;
        return true;
    },
    
    /**    Decide whether to drop above or below a View node. */
    getDropPoint : function(e, n, dd)
    {
        if (dd) {
             return false;
        }
        if (n == this.bodyEl.dom) {
            return "above";
        }
        var t = Roo.lib.Dom.getY(n), b = t + n.offsetHeight;
        var c = t + (b - t) / 2;
        var y = Roo.lib.Event.getPageY(e);
        if(y <= c) {
            return "above";
        }else{
            return "below";
        }
    },
    onToggleCollapse : function(e)
        {
        if (this.collapsed) {
            this.el.select('.roo-collapse-toggle').removeClass('collapsed');
            this.el.select('.roo-collapsable').addClass('show');
            this.collapsed = false;
            return;
        }
        this.el.select('.roo-collapse-toggle').addClass('collapsed');
        this.el.select('.roo-collapsable').removeClass('show');
        this.collapsed = true;
        
    
    },
    dropPlaceHolder: function (action, info, data)
    {
        if (this.dropEl === false) {
            this.dropEl = Roo.DomHelper.append(this.bodyEl, {
            cls : 'd-none'
            },true);
        }
        this.dropEl.removeClass(['d-none', 'd-block']);        
        if (action == 'hide') {
            
            this.dropEl.addClass('d-none');
            return;
        }
        var cardel = info.card.el.dom;
        
        this.dropEl.dom.parentNode.removeChild(this.dropEl.dom);
        if (info.position == 'above') {
            cardel.parentNode.insertBefore(this.dropEl.dom, cardel);
        } else if (cardel.nextSibling) {
            cardel.parentNode.insertBefore(this.dropEl.dom,cardel.nextSibling);
        } else {
            cardel.parentNode.append(this.dropEl.dom);
        }
        this.dropEl.addClass('d-block roo-card-dropzone');
        
        this.dropEl.setHeight( Roo.get(data.ddel).getHeight() );
        
        
    
    
    
    }

    
});

