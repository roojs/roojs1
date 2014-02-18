/*
 * - LGPL
 *
 * based on jquery fullcalendar
 * 
 */


/**
 * @class Roo.bootstrap.Calendar
 * @extends Roo.bootstrap.Component
 * Bootstrap Calendar class
    
 * @constructor
 * Create a new Container
 * @param {Object} config The config object
 */

Roo.bootstrap.Container = function(config){
    Roo.bootstrap.Container.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Container, Roo.bootstrap.Component,  {
    
     
      
    getAutoCreate : function(){
        
        
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
                                event_container,
                                cal_table
                            ]
                        }
                    ]
    
                }
           ] 
            
        };
        
        fc_button = function(name, corner, style, content ) {
            return Roo.apply({},{
                tag : 'span',
                cls : 'fc-button fc-button-'+name+' fc-state-default ' + 
                            'fc-corner-' + corner.split(' ').join(' fc-corner-') ;
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
                                fc_button('prev', 'left', 'arrow', '‹' ),
                                fc_button('next', 'right', 'arrow', '›' ),
                                { tag: 'span', cls: 'fc-header-space' },
                                fc_button('today', 'left right', '', 'today' ), // neds state disabled..
                                
                                
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
                                fc_button('prev', 'left', 'arrow', '‹' ),
                                fc_button('next', 'right', 'arrow', '›' ),
                                { tag: 'span', cls: 'fc-header-space' },
                                fc_button('today', 'left right', '', 'today' ), // neds state disabled..
                                
                                
                            ]
                        },  
    <SPAN class="fc-button fc-button-month fc-state-default fc-corner-left fc-state-active" unselectable="on">month</SPAN>
    <SPAN class="fc-button fc-button-agendaWeek fc-state-default" unselectable="on">week</SPAN>
    <SPAN class="fc-button fc-button-agendaDay fc-state-default fc-corner-right" unselectable="on">day</SPAN>   
                        
                    ]
                }
        }
        
     
  <TABLE class="fc-header" style="width:100%">
    <TBODY>
      <TR>
        <TD class="fc-header-left">
          
            </TD>
        <TD class="fc-header-center">
          <SPAN class="fc-header-title">
            <H2>February 2014</H2>
          </SPAN>
        </TD>
        <TD class="fc-header-right">
          <SPAN class="fc-button fc-button-month fc-state-default fc-corner-left fc-state-active" unselectable="on">month</SPAN>
          <SPAN class="fc-button fc-button-agendaWeek fc-state-default" unselectable="on">week</SPAN>
          <SPAN class="fc-button fc-button-agendaDay fc-state-default fc-corner-right" unselectable="on">day</SPAN>
        </TD>
      </TR>
    </TBODY>
  </TABLE>
  <DIV class="fc-content" style="position: relative;">
    <DIV class="fc-view fc-view-month fc-grid" style="position:relative" unselectable="on">
      <DIV class="fc-event-container" style="position:absolute;z-index:8;top:0;left:0">
        <DIV class="fc-event fc-event-hori fc-event-draggable fc-event-start fc-event-end ui-draggable" style="position: absolute; left: 657px; width: 104px; top: 36px;" unselectable="on">
          <DIV class="fc-event-inner">
            <SPAN class="fc-event-title">All Day Event</SPAN>
          </DIV>
          <DIV class="ui-resizable-handle ui-resizable-e">   </DIV>
        </DIV>
        <DIV class="fc-event fc-event-hori fc-event-draggable fc-event-start" style="position: absolute; left: 439px; width: 325px; top: 219px;">
          <DIV class="fc-event-inner">
            <SPAN class="fc-event-title">Long Event</SPAN>
          </DIV>
        </DIV>
        <DIV class="fc-event fc-event-hori fc-event-draggable fc-event-end" style="position: absolute; left: 1px; width: 105px; top: 310px;">
          <DIV class="fc-event-inner">
            <SPAN class="fc-event-title">Long Event</SPAN>
          </DIV>
          <DIV class="ui-resizable-handle ui-resizable-e">   </DIV>
        </DIV>
        <DIV class="fc-event fc-event-hori fc-event-draggable fc-event-start fc-event-end" style="position: absolute; left: 657px; width: 104px; top: 236px;">
          <DIV class="fc-event-inner">
            <SPAN class="fc-event-time">4p</SPAN>
            <SPAN class="fc-event-title">Repeating Event</SPAN>
          </DIV>
          <DIV class="ui-resizable-handle ui-resizable-e">   </DIV>
        </DIV>
        <DIV class="fc-event fc-event-hori fc-event-draggable fc-event-start fc-event-end" style="position: absolute; left: 657px; width: 104px; top: 310px;">
          <DIV class="fc-event-inner">
            <SPAN class="fc-event-time">4p</SPAN>
            <SPAN class="fc-event-title">Repeating Event</SPAN>
          </DIV>
          <DIV class="ui-resizable-handle ui-resizable-e">   </DIV>
        </DIV>
        <DIV class="fc-event fc-event-hori fc-event-draggable fc-event-start fc-event-end" style="position: absolute; left: 221px; width: 102px; top: 310px;">
          <DIV class="fc-event-inner">
            <SPAN class="fc-event-time">10:30a</SPAN>
            <SPAN class="fc-event-title">Meeting</SPAN>
          </DIV>
          <DIV class="ui-resizable-handle ui-resizable-e">   </DIV>
        </DIV>
        <DIV class="fc-event fc-event-hori fc-event-draggable fc-event-start fc-event-end" style="position: absolute; left: 221px; width: 102px; top: 327px;">
          <DIV class="fc-event-inner">
            <SPAN class="fc-event-time">12p</SPAN>
            <SPAN class="fc-event-title">Lunch</SPAN>
          </DIV>
          <DIV class="ui-resizable-handle ui-resizable-e">   </DIV>
        </DIV>
        <DIV class="fc-event fc-event-hori fc-event-draggable fc-event-start fc-event-end" style="position: absolute; left: 330px; width: 102px; top: 310px;">
          <DIV class="fc-event-inner">
            <SPAN class="fc-event-time">7p</SPAN>
            <SPAN class="fc-event-title">Birthday Party</SPAN>
          </DIV>
          <DIV class="ui-resizable-handle ui-resizable-e">   </DIV>
        </DIV>
        <A href="http://google.com/" class="fc-event fc-event-hori fc-event-draggable fc-event-start fc-event-end" style="position: absolute; left: 548px; width: 213px; top: 401px;">
          <DIV class="fc-event-inner">
            <SPAN class="fc-event-title">Click for Google</SPAN>
          </DIV>
          <DIV class="ui-resizable-handle ui-resizable-e">   </DIV>
        </A>
      </DIV>
      <TABLE class="fc-border-separate" style="width:100%" cellspacing="0">
        <THEAD>
          <TR class="fc-first fc-last">
            <TH class="fc-day-header fc-sun fc-widget-header fc-first" style="width: 108px;">Sun</TH>
            <TH class="fc-day-header fc-mon fc-widget-header" style="width: 108px;">Mon</TH>
            <TH class="fc-day-header fc-tue fc-widget-header" style="width: 108px;">Tue</TH>
            <TH class="fc-day-header fc-wed fc-widget-header" style="width: 108px;">Wed</TH>
            <TH class="fc-day-header fc-thu fc-widget-header" style="width: 108px;">Thu</TH>
            <TH class="fc-day-header fc-fri fc-widget-header" style="width: 108px;">Fri</TH>
            <TH class="fc-day-header fc-sat fc-widget-header fc-last">Sat</TH>
          </TR>
        </THEAD>
        <TBODY>
          <TR class="fc-week fc-first">
            <TD class="fc-day fc-sun fc-widget-content fc-other-month fc-past fc-first" data-date="2014-01-26">
              <DIV style="min-height: 91px;">
                <DIV class="fc-day-number">26</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 17px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-mon fc-widget-content fc-other-month fc-past" data-date="2014-01-27">
              <DIV>
                <DIV class="fc-day-number">27</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 17px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-tue fc-widget-content fc-other-month fc-past" data-date="2014-01-28">
              <DIV>
                <DIV class="fc-day-number">28</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 17px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-wed fc-widget-content fc-other-month fc-past" data-date="2014-01-29">
              <DIV>
                <DIV class="fc-day-number">29</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 17px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-thu fc-widget-content fc-other-month fc-past" data-date="2014-01-30">
              <DIV>
                <DIV class="fc-day-number">30</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 17px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-fri fc-widget-content fc-other-month fc-past" data-date="2014-01-31">
              <DIV>
                <DIV class="fc-day-number">31</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 17px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-sat fc-widget-content fc-past fc-last" data-date="2014-02-01">
              <DIV>
                <DIV class="fc-day-number">1</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 17px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
          </TR>
          <TR class="fc-week">
            <TD class="fc-day fc-sun fc-widget-content fc-past fc-first" data-date="2014-02-02">
              <DIV style="min-height: 90px;">
                <DIV class="fc-day-number">2</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 0px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-mon fc-widget-content fc-past" data-date="2014-02-03">
              <DIV>
                <DIV class="fc-day-number">3</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 0px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-tue fc-widget-content fc-past" data-date="2014-02-04">
              <DIV>
                <DIV class="fc-day-number">4</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 0px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-wed fc-widget-content fc-past" data-date="2014-02-05">
              <DIV>
                <DIV class="fc-day-number">5</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 0px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-thu fc-widget-content fc-past" data-date="2014-02-06">
              <DIV>
                <DIV class="fc-day-number">6</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 0px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-fri fc-widget-content fc-past" data-date="2014-02-07">
              <DIV>
                <DIV class="fc-day-number">7</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 0px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-sat fc-widget-content fc-past fc-last" data-date="2014-02-08">
              <DIV>
                <DIV class="fc-day-number">8</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 0px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
          </TR>
          <TR class="fc-week">
            <TD class="fc-day fc-sun fc-widget-content fc-past fc-first" data-date="2014-02-09">
              <DIV style="min-height: 90px;">
                <DIV class="fc-day-number">9</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 34px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-mon fc-widget-content fc-past" data-date="2014-02-10">
              <DIV>
                <DIV class="fc-day-number">10</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 34px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-tue fc-widget-content fc-past" data-date="2014-02-11">
              <DIV>
                <DIV class="fc-day-number">11</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 34px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-wed fc-widget-content fc-past" data-date="2014-02-12">
              <DIV>
                <DIV class="fc-day-number">12</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 34px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-thu fc-widget-content fc-past" data-date="2014-02-13">
              <DIV>
                <DIV class="fc-day-number">13</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 34px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-fri fc-widget-content fc-past" data-date="2014-02-14">
              <DIV>
                <DIV class="fc-day-number">14</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 34px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-sat fc-widget-content fc-past fc-last" data-date="2014-02-15">
              <DIV>
                <DIV class="fc-day-number">15</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 34px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
          </TR>
          <TR class="fc-week">
            <TD class="fc-day fc-sun fc-widget-content fc-past fc-first" data-date="2014-02-16">
              <DIV style="min-height: 90px;">
                <DIV class="fc-day-number">16</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 34px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-mon fc-widget-content fc-past" data-date="2014-02-17">
              <DIV>
                <DIV class="fc-day-number">17</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 34px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-tue fc-widget-content fc-today fc-state-highlight" data-date="2014-02-18">
              <DIV>
                <DIV class="fc-day-number">18</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 34px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-wed fc-widget-content fc-future" data-date="2014-02-19">
              <DIV>
                <DIV class="fc-day-number">19</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 34px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-thu fc-widget-content fc-future" data-date="2014-02-20">
              <DIV>
                <DIV class="fc-day-number">20</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 34px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-fri fc-widget-content fc-future" data-date="2014-02-21">
              <DIV>
                <DIV class="fc-day-number">21</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 34px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-sat fc-widget-content fc-future fc-last" data-date="2014-02-22">
              <DIV>
                <DIV class="fc-day-number">22</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 34px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
          </TR>
          <TR class="fc-week">
            <TD class="fc-day fc-sun fc-widget-content fc-future fc-first" data-date="2014-02-23">
              <DIV style="min-height: 90px;">
                <DIV class="fc-day-number">23</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 17px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-mon fc-widget-content fc-future" data-date="2014-02-24">
              <DIV>
                <DIV class="fc-day-number">24</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 17px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-tue fc-widget-content fc-future" data-date="2014-02-25">
              <DIV>
                <DIV class="fc-day-number">25</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 17px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-wed fc-widget-content fc-future" data-date="2014-02-26">
              <DIV>
                <DIV class="fc-day-number">26</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 17px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-thu fc-widget-content fc-future" data-date="2014-02-27">
              <DIV>
                <DIV class="fc-day-number">27</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 17px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-fri fc-widget-content fc-future" data-date="2014-02-28">
              <DIV>
                <DIV class="fc-day-number">28</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 17px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-sat fc-widget-content fc-other-month fc-future fc-last" data-date="2014-03-01">
              <DIV>
                <DIV class="fc-day-number">1</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 17px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
          </TR>
          <TR class="fc-week fc-last">
            <TD class="fc-day fc-sun fc-widget-content fc-other-month fc-future fc-first" data-date="2014-03-02">
              <DIV style="min-height: 92px;">
                <DIV class="fc-day-number">2</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 0px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-mon fc-widget-content fc-other-month fc-future" data-date="2014-03-03">
              <DIV>
                <DIV class="fc-day-number">3</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 0px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-tue fc-widget-content fc-other-month fc-future" data-date="2014-03-04">
              <DIV>
                <DIV class="fc-day-number">4</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 0px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-wed fc-widget-content fc-other-month fc-future" data-date="2014-03-05">
              <DIV>
                <DIV class="fc-day-number">5</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 0px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-thu fc-widget-content fc-other-month fc-future" data-date="2014-03-06">
              <DIV>
                <DIV class="fc-day-number">6</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 0px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-fri fc-widget-content fc-other-month fc-future" data-date="2014-03-07">
              <DIV>
                <DIV class="fc-day-number">7</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 0px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
            <TD class="fc-day fc-sat fc-widget-content fc-other-month fc-future fc-last" data-date="2014-03-08">
              <DIV>
                <DIV class="fc-day-number">8</DIV>
                <DIV class="fc-day-content">
                  <DIV style="position: relative; height: 0px;"> </DIV>
                </DIV>
              </DIV>
            </TD>
          </TR>
        </TBODY>
      </TABLE>
    </DIV>
  </DIV>
</DIV>"
        
        
        
        var cfg = {
            html : '',
            cls : ''
        };
        if (this.jumbotron) {
            cfg.cls = 'jumbotron';
        }
        if (this.cls) {
            cfg.cls = this.cls + '';
        }
        
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
        
        var body = cfg;
        
        if (this.panel.length) {
            cfg.cls += 'panel panel-' + this.panel;
            cfg.cn = [];
            if (this.header.length) {
                cfg.cn.push({
                    
                    cls : 'panel-heading',
                    cn : [{
                        tag: 'h3',
                        cls : 'panel-title',
                        html : this.header
                    }]
                    
                });
            }
            body = false;
            cfg.cn.push({
                cls : 'panel-body',
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
        }
        if (!cfg.cls.length) {
            cfg.cls =  'container';
        }
        
        return cfg;
    }
   
});

 