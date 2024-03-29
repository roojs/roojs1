/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 
Roo.tree.TreeNodeUI.prototype.initEvents =
Roo.tree.TreeNodeUI.prototype.initEvents.createSequence(function(){
      if(this.node.attributes.tipCfg){
          var o = this.node.attributes.tipCfg;
          o.target = Roo.id(this.textNode);
          Roo.QuickTips.register(o);
      }
});
 var tree;
var TreeTest = function(){
    // shorthand
    var Tree = Roo.tree;
    var newIndex = 3;
    
    return {
        init : function(){
            Roo.QuickTips.init();
            var layout = new Roo.BorderLayout('layout', {
                west: {
                    initialSize:200,
                    split:true,
                    titlebar:true
                },
                center: {
                    alwaysShowTabs:true,
                    tabPosition:'top'
                }
            });
            
            var albums = layout.getEl().createChild({tag:'div', id:'albums'});
            var tb = new Roo.Toolbar(albums.createChild({tag:'div'}));
            tb.addButton({
                text: 'New Album',
                cls: 'x-btn-text-icon album-btn',
                handler: function(){
                    var node = root.appendChild(new Tree.TreeNode({
                        text:'Album ' + (++newIndex), 
                        cls:'album-node', 
                        allowDrag:false
                    }));
                    tree.getSelectionModel().select(node);
                    setTimeout(function(){
                        tree.editor.editNode = node;
                        tree.editor.startEdit(node.ui.textNode);
                    }, 10);
                }
            });
            var viewEl = albums.createChild({tag:'div', id:'folders'});
            
            var folders = layout.add('west', new Roo.panel.Content(albums, {
                title:'My Albums', 
                fitToFrame:true,
                autoScroll:true,
                autoCreate:true,
                toolbar: tb,
                resizeEl:viewEl
            }));
            
            var images = layout.add('center', new Roo.panel.Content('images', {
                title:'My Images', 
                fitToFrame:true,
                autoScroll:true,
                autoCreate:true
            }));
            var imgBody = images.getEl();
            
           tree = new Tree.TreePanel(viewEl, {
                animate:true, 
                enableDD:true,
                containerScroll: true,
                ddGroup: 'organizerDD',
                rootVisible:false,
                editor : {
                    xtype : 'TreeEditor',
                    xns : Roo.tree,
                    field : {
                        xtype : 'TextField',
                        xns : Roo.form,
                        allowBlank:false,
                        blankText:'A name is required',
                        selectOnFocus:true
                    },
                    listeners : {
                        beforenodeedit : function(tr, n) {
                            Roo.log(n);
                        }
                    }
                }
            });
            var root = new Tree.TreeNode({
                text: 'Albums', 
                allowDrag:false,
                allowDrop:false
            });
            tree.setRootNode(root);
            
            root.appendChild(
                new Tree.TreeNode({text:'Album 1', cls:'album-node', allowDrag:false}),
                new Tree.TreeNode({text:'Album 2', cls:'album-node', allowDrag:false}),
                new Tree.TreeNode({text:'Album 3', cls:'album-node', allowDrag:false})
            );
            
            tree.render();
            root.expand();
            
            
            
            // create the required templates
        	var tpl = new Roo.Template(
        		'<div class="thumb-wrap" id="{name}">' +
        		'<div class="thumb"><img src="../view/{url}" class="thumb-img"></div>' +
        		'<span>{shortName}</span></div>'
        	);
        	
        	var qtipTpl = new Roo.Template(
        	    '<div class="image-tip"><img src="../view/{url}" align="left">'+
        		'<b>Image Name:</b>' +
        		'<span>{name}</span>' +
        		'<b>Size:</b>' +
        		'<span>{sizeString}</span></div>'
        	);
        	qtipTpl.compile();	
        	
        	// initialize the View		
        	var view = new Roo.JsonView(imgBody, tpl, {
        		multiSelect: true,
        		jsonRoot: 'images'
        	});
        	
        	var lookup = {};
        	
        	view.prepareData = function(data){
            	data.shortName = data.name.ellipse(15);
            	data.sizeString = (Math.round(((data.size*10) / 1024))/10) + " KB";
            	//data.dateString = new Date(data.lastmod).format("m/d/Y g:i a");
            	data.qtip = new String(qtipTpl.applyTemplate(data));
            	lookup[data.name] = data;
            	return data;
            };
            
            var dragZone = new ImageDragZone(view, {containerScroll:true,
                ddGroup: 'organizerDD'});
            
            view.load({
                url: '../view/get-images.php'
            });
            
            var rz = new Roo.Resizable('layout', {
                wrap:true, 
                pinned:true, 
                adjustments:[-6,-6],
                minWidth:300
            });
            rz.on('resize', function(){
                layout.layout();
            });
            rz.resizeTo(650, 350);
        }
    };
}();

Roo.EventManager.onDocumentReady(TreeTest.init, TreeTest, true);

/**
 * Create a DragZone instance for our JsonView
 */
ImageDragZone = function(view, config){
    this.view = view;
    ImageDragZone.superclass.constructor.call(this, view.getEl(), config);
};
Roo.extend(ImageDragZone, Roo.dd.DragZone, {
    // We don't want to register our image elements, so let's 
    // override the default registry lookup to fetch the image 
    // from the event instead
    getDragData : function(e){
        e = Roo.EventObject.setEvent(e);
        var target = e.getTarget('.thumb-wrap');
        if(target){
            var view = this.view;
            if(!view.isSelected(target)){
                view.select(target, e.ctrlKey);
            }
            var selNodes = view.getSelectedNodes();
            var dragData = {
                nodes: selNodes
            };
            if(selNodes.length == 1){
                dragData.ddel = target.firstChild.firstChild; // the img element
                dragData.single = true;
            }else{
                var div = document.createElement('div'); // create the multi element drag "ghost"
                div.className = 'multi-proxy';
                for(var i = 0, len = selNodes.length; i < len; i++){
                    div.appendChild(selNodes[i].firstChild.firstChild.cloneNode(true));
                    if((i+1) % 3 == 0){
                        div.appendChild(document.createElement('br'));
                    }
                }
                dragData.ddel = div;
                dragData.multi = true;
            }
            return dragData;
        }
        return false;
    },
    
    // this method is called by the TreeDropZone after a node drop 
    // to get the new tree node (there are also other way, but this is easiest)
    getTreeNode : function(){
        var treeNodes = [];
        var nodeData = this.view.getNodeData(this.dragData.nodes);
        for(var i = 0, len = nodeData.length; i < len; i++){
            var data = nodeData[i];
            treeNodes.push(new Roo.tree.TreeNode({
                text: data.name,
                icon: data.url,
                data: data,
                leaf:true,
                cls: 'image-node',
                qtip: data.qtip
            }));
        }
        return treeNodes;
    },
    
    // the default action is to "highlight" after a bad drop
    // but since an image can't be highlighted, let's frame it 
    afterRepair:function(){
        for(var i = 0, len = this.dragData.nodes.length; i < len; i++){
            Roo.fly(this.dragData.nodes[i]).frame('#8db2e3', 1);
        }
        this.dragging = false;    
    },
    
    // override the default repairXY with one offset for the margins and padding
    getRepairXY : function(e){
        if(!this.dragData.multi){
            var xy = Roo.Element.fly(this.dragData.ddel).getXY();
            xy[0]+=3;xy[1]+=3;
            return xy;
        }
        return false;
    }
});

// Utility functions

String.prototype.ellipse = function(maxLength){
    if(this.length > maxLength){
        return this.substr(0, maxLength-3) + '...';
    }
    return this;
};