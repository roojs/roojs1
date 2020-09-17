/*
 * This is BS4's Card element.. - similar to our containers probably..
 * 
 */
/**
 * @class Roo.bootstrap.Card
 * @extends Roo.bootstrap.Component
 * Bootstrap Card class
 *
 *
 * possible... may not be implemented..
 * @cfg {String} header_image  
 * @cfg {String|Object} header
 * @cfg {String|Object} header_size (0|1|2|3|4|5) H1 or H2 etc.. 0 indicates default
 * 
 * @cfg {String|Object} title
 * @cfg {String|Object} subtitle
 * @cfg {String} html -- html contents - or just use children..
 * @cfg {String|Object} footer
 * @cfg {Array} - links
 *
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
 
 * @constructor
 * Create a new Container
 * @param {Object} config The config object
 */

Roo.bootstrap.Card = function(config){
    Roo.bootstrap.Card.superclass.constructor.call(this, config);
    
    this.addEvents({
        
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
    
    
    childContainer : false,

    layoutCls : function()
    {
        var cls = '';
        var t = this;
        
        ['', 'top', 'bottom', 'left', 'right', 'x', 'y' ].forEach(function(v) {
            // in theory these can do margin_top : ml-xs-3 ??? but we don't support that yet
            
            if (t['margin' + (v.length ? '_' : '') + v].length) {
                cls += ' m' +  (v.length ? v[0]  : '') + '-' +  t['margin' + (v.length ? '_' : '') + v];
            }
            if (t['padding' + (v.length ? '_' : '') + v].length) {
                cls += ' p' +  (v.length ? v[0]  : '') + '-' +  t['padding' + (v.length ? '_' : '') + v];
            }
        });
        
        ['', 'xs', 'sm', 'lg', 'xl',   ].forEach(function(v) {
            if (t['display' + (v.length ? '_' : '') + v].length) {
                cls += ' d' +  (v.length ? '-' : '') + v + '-' + t['margin' + (v.length ? '_' : '') + v].length
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
            cfg.cls += ' text-white'
        }
        if (this.weight.length) {
            cfg.cls += ' bg-' + this.weight;
        }
        
        cfg.cls += this.layoutCls(); 
        
        if (this.header.length) {
            cfg.cn.push({
                tag : this.header_size > 0 ? 'h' + this.header_size : 'div',
                cls : 'card-header',
                html : this.header // escape?
            });
        }
        if (this.header_image.length) {
            cfg.cn.push({
                tag : 'img',
                cls : 'card-img-top',
                src: this.header_image // escape?
            });
        }
        
        var body = {
            tag : 'div',
            cls : 'card-body',
            cn : []
        };
        cfg.push(body);
        
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
        
        // fixme ? handle objects?
        if (this.footer.length) {
            body.cn.push({
                tag : 'div',
                cls : 'card-footer',
                html: this.footer // escape?
            });
        }
        // footer...
        
        return cfg;
    },
    
    
    
}