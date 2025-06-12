/**
 * @class Roo.bootstrap.Card
 * @extends Roo.bootstrap.Component
 * @children Roo.bootstrap.Component
 * @licence LGPL
 * Bootstrap Card class - note this has children as CardHeader/ImageTop/Footer.. - which should really be listed properties?
 *
 *
 * possible... may not be implemented..
 * @cfg {String} header_image  src url of image.
 * @cfg {String|Object} header
 * @cfg {Number} header_size (0|1|2|3|4|5) H1 or H2 etc.. 0 indicates default
 * @cfg {String} header_weight (primary|secondary|success|info|warning|danger|light|dark)
 * 
 * @cfg {String} title
 * @cfg {String} subtitle
 * @cfg {String|Boolean} html -- html contents - or just use children.. use false to hide it..
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
 * @cfg {String} padding_top (0|1|2|3|4|5)next_to_card
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
 * @config {Boolean} rotateable can the body be rotated by clicking on it..
 * @config {Boolean} rotated is the body rotated when rendered...
 * 
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
         * @param {Roo.bootstrap.Card} this
         *
         * 
         * @param {Roo.bootstrap.Card} move_card the card being dropped?
         * @param {String} position 'above' or 'below'
         * @param {Roo.bootstrap.Card} next_to_card What card position is relative to of 'false' for empty list.
        
         */
        'drop' : true,
         /**
         * @event rotate
         * When a element a card is rotate
         * @param {Roo.bootstrap.Card} this
         * @param {Roo.Element} n the node being dropped?
         * @param {Boolean} rotate status
         */
        'rotate' : true,
        /**
         * @event cardover
         * When a card element is dragged over ready to drop (return false to block dropable)
         * @param {Roo.bootstrap.Card} this
         * @param {Object} data from dragdrop 
         */
         'cardover' : true
         
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
    rotateable : false,
    rotated : false,
    
    dragable : false,
    drag_group : false,
    dropable : false,
    drop_group : false,
    childContainer : false,
    dropEl : false, /// the dom placeholde element that indicates drop location.
    containerEl: false, // body container
    bodyEl: false, // card-body
    headerContainerEl : false, //
    headerEl : false,
    header_imageEl : false,
    
    
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
                cls += ' d' +  (v.length ? '-' : '') + v + '-' + t['display' + (v.length ? '_' : '') + v];
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
        //var bodycls = '';
        
        //this seems pretty messed up.
        //if (this.weight.length && this.weight != 'light') {
        //    bodycls += ' text-white';
        //} else {
        //    bodycls += ' text-dark'; // need as it's nested..
        //}
        if (this.weight.length) {
            cfg.cls += ' bg-' + this.weight;
        }
        
        cfg.cls += ' ' + this.layoutCls(); 
        
        var hdr = false;
        var hdr_ctr = false;
        var hw = (this.header_weight ? ' bg-' + this.header_weight : '');
        var hb = (['light', 'white'].indexOf(this.header_weight) > -1 ? ' text-dark' : ' text-white');
          
        if (this.header.length) {
            hdr = {
                tag : this.header_size > 0 ? 'h' + this.header_size : 'div',
                cls : 'card-header' + hw + hb,
                cn : []
            };
            cfg.cn.push(hdr);
            hdr_ctr = hdr;
        } else {
            hdr = {
                tag : 'div',
                cls : 'card-header d-none ' + hw + hb,
                cn : []
            };
            cfg.cn.push(hdr);
            hdr_ctr = hdr;
        }
        if (this.collapsable) {
            hdr_ctr = {
            cls : 'd-block user-select-none',
            cn: [
                    {
                        tag: 'i',
                        cls : 'roo-collapse-toggle fa fa-chevron-down float-right ' + (this.collapsed ? 'collapsed' : '')
                    }
                   
                ]
            };
            hdr.cn.push(hdr_ctr);
        }
        
        hdr_ctr.cn.push(        {
            tag: 'span',
            cls: 'roo-card-header-ctr' + ( this.header.length ? '' : ' d-none'),
            html : this.header
        });
        
        
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
            cls : 'card-body' + (this.html === false  ? ' d-none' : ''),
            cn : []
        };
        var obody = body;
        if (this.collapsable || this.rotateable) {
            obody = {
                tag: 'div',
                cls : 'roo-collapsable collapse ' + (this.collapsed || this.rotated ? '' : 'show'),
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
                cls : 'card-footer ' + (this.rotated ? 'd-none' : ''),
                html : this.footer
            });
            
        } else {
            cfg.cn.push({cls : 'card-footer d-none'});
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
    getCardFooter : function()
    {
        var  ret = this.el.select('.card-footer',true).first();
        if (ret.hasClass('d-none')) {
            ret.removeClass('d-none');
        }
        
        return ret;
    },
    getCardImageTop : function()
    {
        var  ret = this.header_imageEl;
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
        this.bodyEl = this.el.select('.card-body',true).first(); 
        this.containerEl = this.getChildContainer();
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
        if (this.rotateable) {
            this.el.select('.card-header',true).on('click', this.onToggleRotate, this);
        }
        this.collapsableEl = this.el.select('.roo-collapsable',true).first();
         
        this.footerEl = this.el.select('.card-footer',true).first();
        this.collapsableToggleEl = this.el.select('.roo-collapse-toggle',true).first();
        this.headerContainerEl = this.el.select('.roo-card-header-ctr',true).first();
        this.headerEl = this.el.select('.card-header',true).first();
        
        if (this.rotated) {
            this.el.addClass('roo-card-rotated');
            this.fireEvent('rotate', this, true);
        }
        this.header_imageEl = this.el.select('.card-img-top',true).first(); 
        this.header_imageEl.on('load', this.onHeaderImageLoad, this );
        
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
    *
    *    Returns an object:
    *     {
           
           position : 'below' or 'above'
           card  : relateive to card OBJECT (or true for no cards listed)
           items_n : relative to nth item in list
           card_n : relative to  nth card in list
    }
    *
    *    
    */
    getTargetFromEvent : function(e, dragged_card_el)
    {
        var target = e.getTarget();
        while ((target !== null) && (target.parentNode != this.containerEl.dom)) {
            target = target.parentNode;
        }
        
        var ret = {
            position: '',
            cards : [],
            card_n : -1,
            items_n : -1,
            card : false 
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
                ret.card = ret.cards[ret.card_n];
            }
        }
        if (!ret.cards.length) {
            ret.card = true;
            ret.position = 'below';
            ret.items_n;
            return ret;
        }
        // could not find a card.. stick it at the end..
        if (ret.card_n < 0) {
            ret.card_n = last_card_n;
            ret.card = ret.cards[last_card_n];
            ret.items_n = this.items.indexOf(ret.cards[last_card_n]);
            ret.position = 'below';
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
        
        
        if (this.fireEvent('cardover', this, [ data ]) === false) {
            return false;
        }
        
        this.dropPlaceHolder('show', target_info,data);
        
        return false; 
    },
    onNodeOut : function(n, dd, e, data){
        this.dropPlaceHolder('hide');
     
    },
    onNodeDrop : function(n, dd, e, data)
    {
        
        // call drop - return false if
        
        // this could actually fail - if the Network drops..
        // we will ignore this at present..- client should probably reload
        // the whole set of cards if stuff like that fails.
        
        
        var info = this.getTargetFromEvent(e,data.source.el);
        if (info === false) {
            return false;
        }
        this.dropPlaceHolder('hide');
  
          
    
        this.acceptCard(data.source, info.position, info.card, info.items_n);
        return true;
         
    },
    firstChildCard : function()
    {
        for (var i = 0;i< this.items.length;i++) {
            
            if (!this.items[i].el.hasClass('card')) {
                 continue;
            }
            return this.items[i];
        }
        return this.items.length ? this.items[this.items.length-1] : false; // don't try and put stuff after the cards...
    },
    /**
     * accept card
     *
     * -        card.acceptCard(move_card, info.position, info.card, info.items_n);
     */
    acceptCard : function(move_card,  position, next_to_card )
    {
        if (this.fireEvent("drop", this, move_card, position, next_to_card) === false) {
            return false;
        }
        
        var to_items_n = next_to_card ? this.items.indexOf(next_to_card) : 0;
        
        move_card.parent().removeCard(move_card);
        
        
        var dom = move_card.el.dom;
        dom.style.width = ''; // clear with - which is set by drag.
        
        if (next_to_card !== false && next_to_card !== true && next_to_card.el.dom.parentNode) {
            var cardel = next_to_card.el.dom;
            
            if (position == 'above' ) {
                cardel.parentNode.insertBefore(dom, cardel);
            } else if (cardel.nextSibling) {
                cardel.parentNode.insertBefore(dom,cardel.nextSibling);
            } else {
                cardel.parentNode.append(dom);
            }
        } else {
            // card container???
            this.containerEl.dom.append(dom);
        }
        
        //FIXME HANDLE card = true 
        
        // add this to the correct place in items.
        
        // remove Card from items.
        
       
        if (this.items.length) {
            var nitems = [];
            //Roo.log([info.items_n, info.position, this.items.length]);
            for (var i =0; i < this.items.length; i++) {
                if (i == to_items_n && position == 'above') {
                    nitems.push(move_card);
                }
                nitems.push(this.items[i]);
                if (i == to_items_n && position == 'below') {
                    nitems.push(move_card);
                }
            }
            this.items = nitems;
            Roo.log(this.items);
        } else {
            this.items.push(move_card);
        }
        
        move_card.parentId = this.id;
        
        return true;
        
        
    },
    removeCard : function(c)
    {
        this.items = this.items.filter(function(e) { return e != c });
 
        var dom = c.el.dom;
        dom.parentNode.removeChild(dom);
        dom.style.width = ''; // clear with - which is set by drag.
        c.parentId = false;
        
    },
    
    /**    Decide whether to drop above or below a View node. */
    getDropPoint : function(e, n, dd)
    {
        if (dd) {
             return false;
        }
        if (n == this.containerEl.dom) {
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
            this.collapsableEl.addClass('show');
            this.collapsed = false;
            return;
        }
        this.el.select('.roo-collapse-toggle').addClass('collapsed');
        this.collapsableEl.removeClass('show');
        this.collapsed = true;
        
    
    },
    
    onToggleRotate : function(e)
    {
        this.collapsableEl.removeClass('show');
        this.footerEl.removeClass('d-none');
        this.el.removeClass('roo-card-rotated');
        this.el.removeClass('d-none');
        if (this.rotated) {
            
            this.collapsableEl.addClass('show');
            this.rotated = false;
            this.fireEvent('rotate', this, this.rotated);
            return;
        }
        this.el.addClass('roo-card-rotated');
        this.footerEl.addClass('d-none');
        this.el.select('.roo-collapsable').removeClass('show');
        
        this.rotated = true;
        this.fireEvent('rotate', this, this.rotated);
    
    },
    
    dropPlaceHolder: function (action, info, data)
    {
        if (this.dropEl === false) {
            this.dropEl = Roo.DomHelper.append(this.containerEl, {
            cls : 'd-none'
            },true);
        }
        this.dropEl.removeClass(['d-none', 'd-block']);        
        if (action == 'hide') {
            
            this.dropEl.addClass('d-none');
            return;
        }
        // FIXME - info.card == true!!!
        this.dropEl.dom.parentNode.removeChild(this.dropEl.dom);
        
        if (info.card !== true) {
            var cardel = info.card.el.dom;
            
            if (info.position == 'above') {
                cardel.parentNode.insertBefore(this.dropEl.dom, cardel);
            } else if (cardel.nextSibling) {
                cardel.parentNode.insertBefore(this.dropEl.dom,cardel.nextSibling);
            } else {
                cardel.parentNode.append(this.dropEl.dom);
            }
        } else {
            // card container???
            this.containerEl.dom.append(this.dropEl.dom);
        }
        
        this.dropEl.addClass('d-block roo-card-dropzone');
        
        this.dropEl.setHeight( Roo.get(data.ddel).getHeight() );
        
        
    
    
    
    },
    setHeaderText: function(html)
    {
        this.header = html;
        if (this.headerContainerEl) {
            this.headerContainerEl.dom.innerHTML = html;
        }
    },
    onHeaderImageLoad : function(ev, he)
    {
        if (!this.header_image_fit_square) {
            return;
        }
        
        var hw = he.naturalHeight / he.naturalWidth;
        // wide image = < 0
        // tall image = > 1
        //var w = he.dom.naturalWidth;
        var ww = he.width;
        he.style.left =  0;
        he.style.position =  'relative';
        if (hw > 1) {
            var nw = (ww * (1/hw));
            Roo.get(he).setSize( ww * (1/hw),  ww);
            he.style.left =  ((ww - nw)/ 2) + 'px';
            he.style.position =  'relative';
        }

    }

    
});

