/**
 * Traditional Chinese translation
 * By hata1234
 * 09 April 2007
 */
Roo.onReady(function(){
   
    if(Roo.grid.Panel){
        Roo.grid.Grid.prototype.ddText   = "選擇了 {0} 行";
    }

    if(Roo.panel.TabItem){
        Roo.TabPanelItem.prototype.closeText = "關閉此標籤";
    }

    if(Roo.form.Field){
        Roo.form.Field.prototype.invalidText = "數值不符合欄位規定";
    }

    if(Roo.LoadMask){
        Roo.LoadMask.prototype.msg = "讀取中...";
    }
    
    if (Date){
        Date.monthNames = [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
        ];

        Date.dayNames = [
        "日",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六"
        ];
    }
    
    if(Roo.MessageBox){
        Roo.MessageBox.buttonText = {
            ok : "確定",
            cancel : "取消",
            yes : "是",
            no : "否"
        };
    }

    if(Roo.util.Format){
        Roo.apply(Roo.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u00a5',  // Chinese Yuan
            dateFormat: 'Y/m/d'
        });
    }

    if(Roo.DatePicker){
        Roo.apply(Roo.DatePicker.prototype, {
            todayText         : "今天",
            minText           : "日期必須大於最小容許日期",
            maxText           : "日期必須小於最大容許日期",
            disabledDaysText  : "",
            disabledDatesText : "",
            monthNames        : Date.monthNames,
            dayNames          : Date.dayNames,
            nextText          : "下個月 (Ctrl+右方向鍵)",
            prevText          : "上個月 (Ctrl+左方向鍵)",
            monthYearText     : "選擇月份 (Ctrl+上/下方向鍵選擇年份)",
            todayTip          : "{0} (空白鍵)",
            format            : "y/m/d"
        });
    }

   
    if(Roo.PagingToolbar){
        Roo.apply(Roo.PagingToolbar.prototype, {
            beforePageText : "第",
            afterPageText  : "頁，共{0}頁",
            firstText      : "第一頁",
            prevText       : "上一頁",
            nextText       : "下一頁",
            lastText       : "最後頁",
            refreshText    : "重新整理",
            displayMsg     : "顯示{0} - {1}筆,共{2}筆",
            emptyMsg       : '沒有任何資料'
        });
    }

    if(Roo.form.TextField){
        Roo.apply(Roo.form.TextField.prototype, {
            minLengthText : "此欄位最少要輸入 {0} 個字",
            maxLengthText : "此欄位最多輸入 {0} 個字",
            blankText     : "此欄位為必填",
            regexText     : "",
            emptyText     : null
        });
    }

    if(Roo.form.NumberField){
        Roo.apply(Roo.form.NumberField.prototype, {
            minText : "此欄位之數值必須大於 {0}",
            maxText : "此欄位之數值必須小於 {0}",
            nanText : "{0} 不是合法的數字"
        });
    }

    if(Roo.form.DateField){
        Roo.apply(Roo.form.DateField.prototype, {
            disabledDaysText  : "無法使用",
            disabledDatesText : "無法使用",
            minText           : "此欄位之日期必須在 {0} 之後",
            maxText           : "此欄位之日期必須在 {0} 之前",
            invalidText       : "{0} 不是正確的日期格式 - 必須像是 「 {1} 」 這樣的格式",
            format            : "Y/m/d"
        });
    }

    if(Roo.form.ComboBox){
        Roo.apply(Roo.form.ComboBox.prototype, {
            loadingText       : "讀取中 ...",
            valueNotFoundText : undefined
        });
    }

    if(Roo.form.VTypes){
        Roo.apply(Roo.form.VTypes, {
            emailText    : '此欄位必須輸入像 "user@example.com" 之E-Mail格式',
            urlText      : '此欄位必須輸入像 "http:/'+'/www.example.com" 之網址格式',
            alphaText    : '此欄位僅能輸入半形英文字母及底線( _ )符號',
            alphanumText : '此欄位僅能輸入半形英文字母、數字及底線( _ )符號'
        });
    }

    if(Roo.grid.GridView){
        Roo.apply(Roo.grid.GridView.prototype, {
            sortAscText  : "正向排序",
            sortDescText : "反向排序",
            lockText     : "鎖定欄位",
            unlockText   : "解開欄位鎖定",
            columnsText  : "欄位"
        });
    }

    if(Roo.grid.PropertyColumnModel){
        Roo.apply(Roo.grid.PropertyColumnModel.prototype, {
            nameText   : "名稱",
            valueText  : "數值",
            dateFormat : "Y/m/d"
        });
    }

    if(Roo.SplitLayoutRegion){
        Roo.apply(Roo.SplitLayoutRegion.prototype, {
            splitTip            : "拖曳縮放大小.",
            collapsibleSplitTip : "拖曳縮放大小. 滑鼠雙擊隱藏."
        });
    }
});