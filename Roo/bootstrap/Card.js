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
 * @cfg {String} header content of header (for panel)
 * @cfg {String|Object} title
 * @cfg {String|Object} subtitle
 * @cfg {String|Object} body
 * @cfg {String|Object} footer
 * @cfg {Array} - links
 *
 * @cfg {String} weight (primary|warning|info|danger|secondary|success|light|dark)
 * @cfg {String} margin (0|1|2|3|4|5|auto|t-0|t-1|t-2|t-3|t-4|t-5|t-auto|b-0|b-1|b-2|b-3|b-4|b-5|b-auto|l-0|l-1|l-2|l-3|l-4|l-5|l-auto|r-0|r-1|r-2|r-3|r-4|r-5|r-auto|x-0|x-1|x-2|x-3|x-4|x-5|x-auto|y-0|y-1|y-2|y-3|y-4|y-5|y-auto)
 * @cfg {String} padding (0|1|2|3|4|5|t-0|t-1|t-2|t-3|t-4|t-5|b-0|b-1|b-2|b-3|b-4|b-5|l-0|l-1|l-2|l-3|l-4|l-5|r-0|r-1|r-2|r-3|r-4|r-5|x-0|x-1|x-2|x-3|x-4|x-5|y-0|y-1|y-2|y-3|y-4|y-5)
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
            tag : this.tag || 'div',
            html : '',
            cls : 'card'
        };
        
        if (this.weight.length && this.weight != 'light') {
            cfg.cls += ' text-white'
        }
        if (this.weight.length) {
            cfg.cls += ' bg-' + this.weight;
        }
        
        // margin?
        
        
        
        // - this is applied by the parent..
        //if (this.cls) {
        //    cfg.cls = this.cls + '';
        //}
        
        if (this.sticky.length) {
            
            var bd = Roo.get(document.body);
            if (!bd.hasClass('bootstrap-sticky')) {
                bd.addClass('bootstrap-sticky');
                Roo.select('html',true).setStyle('height', '100%');
            }
             
            cfg.cls += 'bootstrap-sticky-' + this.sticky;
        }
	
	
        if (this.well.length) {
            switch (this.well) {
                case 'lg':
                case 'sm':
                    cfg.cls +=' well well-' +this.well;
                    break;
                default:
                    cfg.cls +=' well';
                    break;
            }
        }
        
        if (this.hidden) {
            cfg.cls += ' hidden';
        }
        
        
        if (this.alert && ["success","info","warning", "danger"].indexOf(this.alert) > -1) {
            cfg.cls +=' alert alert-' + this.alert;
        }
        
        var body = cfg;
        
        if (this.panel.length) {
            cfg.cls += ' panel panel-' + this.panel;
            cfg.cn = [];
            if (this.header.length) {
                
                var h = [];
                
                if(this.expandable){
                    
                    cfg.cls = cfg.cls + ' expandable';
                    
                    h.push({
                        tag: 'i',
                        cls: (this.expanded ? 'fa fa-minus' : 'fa fa-plus') 
                    });
                    
                }
                
                h.push(
                    {
                        tag: 'span',
                        cls : 'panel-title',
                        html : (this.expandable ? '&nbsp;' : '') + this.header
                    },
                    {
                        tag: 'span',
                        cls: 'panel-header-right',
                        html: this.rheader
                    }
                );
                
                cfg.cn.push({
                    cls : 'panel-heading',
                    style : this.expandable ? 'cursor: pointer' : '',
                    cn : h
                });
                
            }
            
            body = false;
            cfg.cn.push({
                cls : 'panel-body' + (this.expanded ? '' : ' hide'),
                html : this.html
            });
            
            
            if (this.footer.length) {
                cfg.cn.push({
                    cls : 'panel-footer',
                    html : this.footer
                    
                });
            }
            
        }
        
        if (body) {
            body.html = this.html || cfg.html;
            // prefix with the icons..
            if (this.fa) {
                body.html = '<i class="fa fa-'+this.fa + '"></i>' + body.html ;
            }
            if (this.icon) {
                body.html = '<i class="glyphicon glyphicon-'+this.icon + '"></i>' + body.html ;
            }
            
            
        }
        if ((!this.cls || !this.cls.length) && (!cfg.cls || !cfg.cls.length)) {
            cfg.cls =  'container';
        }
        
        return cfg;
    },
}