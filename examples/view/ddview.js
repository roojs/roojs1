Array.prototype.contains = function(element) {
    for (var i = 0; i < this.length; i++) {
            if (this[i] == element) {
                return true;
            }
    }        
	return false;
};
Roo.namespace("Roo.ux");

/**
 * @class Roo.ux.DDView
 * A DnD enabled version of Roo.View.
 * @param {Element/String} container The Element in which to create the View.
 * @param {String} tpl The template string used to create the markup for each element of the View
 * @param {Object} config The configuration properties. These include all the config options of
 * {@link Roo.View} plus some specific to this class.<br>
 * <p>
 * Drag/drop is implemented by adding {@link Roo.data.Record}s to the target DDView. If copying is
 * not being performed, the original {@link Roo.data.Record} is removed from the source DDView.<br>
 * <p>
 * The following extra CSS rules are needed to provide insertion point highlighting:<pre><code>
.x-view-drag-insert-above {
	border-top:1px dotted #3366cc;
}
.x-view-drag-insert-below {
	border-bottom:1px dotted #3366cc;
}
</code></pre>
 * 
 */
Roo.ux.DDView = function(container, tpl, config) {
    Roo.ux.DDView.superclass.constructor.apply(this, arguments);
    this.getEl().setStyle("outline", "0px none");
    this.getEl().unselectable();
    if (this.dragGroup) {
		this.setDraggable(this.dragGroup.split(","));
    }
    if (this.dropGroup) {
		this.setDroppable(this.dropGroup.split(","));
    }
    if (this.deletable) {
    	this.setDeletable();
    }
    this.isDirtyFlag = false;
	this.addEvents({
		"drop" : true
	});
};

Roo.extend(Roo.ux.DDView, Roo.View, {
/**	@cfg {String/Array} dragGroup The ddgroup name(s) for the View's DragZone. */
/**	@cfg {String/Array} dropGroup The ddgroup name(s) for the View's DropZone. */
/**	@cfg {Boolean} copy Causes drag operations to copy nodes rather than move. */
/**	@cfg {Boolean} allowCopy Causes ctrl/drag operations to copy nodes rather than move. */

	isFormField: true,

	reset: Roo.emptyFn,
	
	clearInvalid: Roo.form.Field.prototype.clearInvalid,

	validate: function() {
		return true;
	},
	
	destroy: function() {
		this.purgeListeners();
		this.getEl.removeAllListeners();
		this.getEl().remove();
		if (this.dragZone) {
			if (this.dragZone.destroy) {
				this.dragZone.destroy();
			}
		}
		if (this.dropZone) {
			if (this.dropZone.destroy) {
				this.dropZone.destroy();
			}
		}
	},

/**	Allows this class to be an Roo.form.Field so it can be found using {@link Roo.form.BasicForm#findField}. */
	getName: function() {
		return this.name;
	},

/**	Loads the View from a JSON string representing the Records to put into the Store. */
	setValue: function(v) {
		if (!this.store) {
			throw "DDView.setValue(). DDView must be constructed with a valid Store";
		}
		var data = {};
		data[this.store.reader.meta.root] = v ? [].concat(v) : [];
		this.store.proxy = new Roo.data.MemoryProxy(data);
		this.store.load();
	},

/**	@return {String} a parenthesised list of the ids of the Records in the View. */
	getValue: function() {
		var result = '(';
		this.store.each(function(rec) {
			result += rec.id + ',';
		});
		return result.substr(0, result.length - 1) + ')';
	},
	
	getIds: function() {
		var i = 0, result = new Array(this.store.getCount());
		this.store.each(function(rec) {
			result[i++] = rec.id;
		});
		return result;
	},
	
	isDirty: function() {
		return this.isDirtyFlag;
	},

/**
 *	Part of the Roo.dd.DropZone interface. If no target node is found, the
 *	whole Element becomes the target, and this causes the drop gesture to append.
 */
    getTargetFromEvent : function(e) {
		var target = e.getTarget();
		while ((target !== null) && (target.parentNode != this.el.dom)) {
    		target = target.parentNode;
		}
		if (!target) {
			target = this.el.dom.lastChild || this.el.dom;
		}
		return target;
    },

/**
 *	Create the drag data which consists of an object which has the property "ddel" as
 *	the drag proxy element. 
 */
    getDragData : function(e) {
        var target = this.findItemFromChild(e.getTarget());
		if(target) {
			this.handleSelection(e);
			var selNodes = this.getSelectedNodes();
            var dragData = {
                source: this,
                copy: this.copy || (this.allowCopy && e.ctrlKey),
                nodes: selNodes,
                records: []
			};
			var selectedIndices = this.getSelectedIndexes();
			for (var i = 0; i < selectedIndices.length; i++) {
				dragData.records.push(this.store.getAt(selectedIndices[i]));
			}
			if (selNodes.length == 1) {
				dragData.ddel = target.cloneNode(true);	// the div element
			} else {
				var div = document.createElement('div'); // create the multi element drag "ghost"
				div.className = 'multi-proxy';
				for (var i = 0, len = selNodes.length; i < len; i++) {
					div.appendChild(selNodes[i].cloneNode(true));
				}
				dragData.ddel = div;
			}
			return dragData;
		}
		return false;
    },
    
/**	Specify to which ddGroup items in this DDView may be dragged. */
    setDraggable: function(ddGroup) {
    	if (ddGroup instanceof Array) {
    		Roo.each(ddGroup, this.setDraggable, this);
    		return;
    	}
    	if (this.dragZone) {
    		this.dragZone.addToGroup(ddGroup);
    	} else {
			this.dragZone = new Roo.dd.DragZone(this.getEl(), {
				containerScroll: true,
				ddGroup: ddGroup
			});
//			Draggability implies selection. DragZone's mousedown selects the element.
			if (!this.multiSelect) { this.singleSelect = true; }

//			Wire the DragZone's handlers up to methods in *this*
			this.dragZone.getDragData = this.getDragData.createDelegate(this);
		}
    },

/**	Specify from which ddGroup this DDView accepts drops. */
    setDroppable: function(ddGroup) {
    	if (ddGroup instanceof Array) {
    		Roo.each(ddGroup, this.setDroppable, this);
    		return;
    	}
    	if (this.dropZone) {
    		this.dropZone.addToGroup(ddGroup);
    	} else {
			this.dropZone = new Roo.dd.DropZone(this.getEl(), {
				containerScroll: true,
				ddGroup: ddGroup
			});

//			Wire the DropZone's handlers up to methods in *this*
			this.dropZone.getTargetFromEvent = this.getTargetFromEvent.createDelegate(this);
			this.dropZone.onNodeEnter = this.onNodeEnter.createDelegate(this);
			this.dropZone.onNodeOver = this.onNodeOver.createDelegate(this);
			this.dropZone.onNodeOut = this.onNodeOut.createDelegate(this);
			this.dropZone.onNodeDrop = this.onNodeDrop.createDelegate(this);
		}
    },

/**	Decide whether to drop above or below a View node. */
    getDropPoint : function(e, n, dd){
    	if (n == this.el.dom) { return "above"; }
		var t = Roo.lib.Dom.getY(n), b = t + n.offsetHeight;
		var c = t + (b - t) / 2;
		var y = Roo.lib.Event.getPageY(e);
		if(y <= c) {
			return "above";
		}else{
			return "below";
		}
    },

    onNodeEnter : function(n, dd, e, data){
		return false;
    },
    
    onNodeOver : function(n, dd, e, data){
		var pt = this.getDropPoint(e, n, dd);
		// set the insert point style on the target node
		var dragElClass = this.dropNotAllowed;
		if (pt) {
			var targetElClass;
			if (pt == "above"){
				dragElClass = n.previousSibling ? "x-tree-drop-ok-between" : "x-tree-drop-ok-above";
				targetElClass = "x-view-drag-insert-above";
			} else {
				dragElClass = n.nextSibling ? "x-tree-drop-ok-between" : "x-tree-drop-ok-below";
				targetElClass = "x-view-drag-insert-below";
			}
			if (this.lastInsertClass != targetElClass){
				Roo.fly(n).replaceClass(this.lastInsertClass, targetElClass);
				this.lastInsertClass = targetElClass;
			}
		}
		return dragElClass;
	},

    onNodeOut : function(n, dd, e, data){
		this.removeDropIndicators(n);
    },

    onNodeDrop : function(n, dd, e, data){
    	if (this.fireEvent("drop", this, n, dd, e, data) === false) {
    		return false;
    	}
    	var pt = this.getDropPoint(e, n, dd);
		var insertAt = (n == this.el.dom) ? this.nodes.length : n.nodeIndex;
		if (pt == "below") { insertAt++; }
		for (var i = 0; i < data.records.length; i++) {
			var r = data.records[i];
			var dup = this.store.getById(r.id);
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

    removeDropIndicators : function(n){
		if(n){
			Roo.fly(n).removeClass([
				"x-view-drag-insert-above",
				"x-view-drag-insert-below"]);
			this.lastInsertClass = "_noclass";
		}
    },

/**
 *	Utility method. Add a delete option to the DDView's context menu.
 *	@param {String} imageUrl The URL of the "delete" icon image.
 */
	setDeletable: function(imageUrl) {
		if (!this.singleSelect && !this.multiSelect) {
			this.singleSelect = true;
		}
		var c = this.getContextMenu();
		this.contextMenu.on("itemclick", function(item) {
			switch (item.id) {
				case "delete":
					this.remove(this.getSelectedIndexes());
					break;
			}
		}, this);
		this.contextMenu.add({
			icon: imageUrl || AU.resolveUrl("/images/delete.gif"),
			id: "delete",
			text: AU.getMessage("deleteItem")
		});
	},
	
/**	Return the context menu for this DDView. */
	getContextMenu: function() {
		if (!this.contextMenu) {
//			Create the View's context menu
			this.contextMenu = new Roo.menu.Menu({
				id: this.id + "-contextmenu"
			});
			this.el.on("contextmenu", this.showContextMenu, this);
		}
		return this.contextMenu;
	},
	
	disableContextMenu: function() {
		if (this.contextMenu) {
			this.el.un("contextmenu", this.showContextMenu, this);
		}
	},

	showContextMenu: function(e, item) {
        item = this.findItemFromChild(e.getTarget());
		if (item) {
			e.stopEvent();
			this.select(this.getNode(item), this.multiSelect && e.ctrlKey, true);
			this.contextMenu.showAt(e.getXY());
	    }
    },

/**
 *	Remove {@link Roo.data.Record}s at the specified indices.
 *	@param {Array/Number} selectedIndices The index (or Array of indices) of Records to remove.
 */
    remove: function(selectedIndices) {
		selectedIndices = [].concat(selectedIndices);
		for (var i = 0; i < selectedIndices.length; i++) {
			var rec = this.store.getAt(selectedIndices[i]);
			this.store.remove(rec);
		}
    },

/**
 *	Double click fires the event, but also, if this is draggable, and there is only one other
 *	related DropZone, it transfers the selected node.
 */
    onDblClick : function(e){
        var item = this.findItemFromChild(e.getTarget());
        if(item){
            if (this.fireEvent("dblclick", this, this.indexOf(item), item, e) === false) {
            	return false;
            }
            if (this.dragGroup) {
	            var targets = Roo.dd.DragDropMgr.getRelated(this.dragZone, true);
	            while (targets.contains(this.dropZone)) {
		            targets.remove(this.dropZone);
				}
	            if (targets.length == 1) {
					this.dragZone.cachedTarget = null;
	            	var el = Roo.get(targets[0].getEl());
	            	var box = el.getBox(true);
	            	targets[0].onNodeDrop(el.dom, {
	            		target: el.dom,
	            		xy: [box.x, box.y + box.height - 1]
	            	}, null, this.getDragData(e));
	            }
	        }
        }
    },
    
    handleSelection: function(e) {
		this.dragZone.cachedTarget = null;
        var item = this.findItemFromChild(e.getTarget());
        if (!item) {
        	this.clearSelections(true);
        	return;
        }
		if (item && (this.multiSelect || this.singleSelect)){
			if(this.multiSelect && e.shiftKey && (!e.ctrlKey) && this.lastSelection){
				this.select(this.getNodes(this.indexOf(this.lastSelection), item.nodeIndex), false);
			}else if (this.isSelected(this.getNode(item)) && e.ctrlKey){
				this.unselect(item);
			} else {
				this.select(item, this.multiSelect && e.ctrlKey);
				this.lastSelection = item;
			}
		}
    },

    onItemClick : function(item, index, e){
		if(this.fireEvent("beforeclick", this, index, item, e) === false){
			return false;
		}
		return true;
    },

    unselect : function(nodeInfo, suppressEvent){
		var node = this.getNode(nodeInfo);
		if(node && this.isSelected(node)){
			if(this.fireEvent("beforeselect", this, node, this.selections) !== false){
				Roo.fly(node).removeClass(this.selectedClass);
				this.selections.remove(node);
				if(!suppressEvent){
					this.fireEvent("selectionchange", this, this.selections);
				}
			}
		}
    }
});

function initializePage() {
	var collection=[
		{'id':'40','entityImageUrl':'../shared/icons/fam/user_add.png','componentDescription':'Add User'},
		{'id':'27','entityImageUrl':'../shared/icons/fam/user_delete.png','componentDescription':'Delete User'},
		{'id':'28','entityImageUrl':'../shared/icons/fam/user_comment.png','componentDescription':'Comment on User'}
	];
	var rec=Roo.data.Record.create([
		{name:'id'},
		{name:'entityImageUrl'},
		{name:'componentDescription'}
	]);
	var reader=new Roo.data.JsonReader({
		root:'collection',
		id:'id'
	},rec);
	var ds=new Roo.data.Store({
		proxy:new Roo.data.MemoryProxy({collection:collection}),
		reader:reader
	});
	var view=new Roo.ux.DDView('left-view-container','<div id=\u0027subcomponent_{id}\u0027 class=\u0027Subcomponent\u0027><img align=\u0027top\u0027 height=\u002716px\u0027 width=\u002716px\u0027 src=\u0027{entityImageUrl}\u0027>{componentDescription}</div>',{
		isFormField:true,
		name:'subComponents',
		dragGroup:'availComponentDDGroup,subComponentDDGroup',
		dropGroup:'availComponentDDGroup,subComponentDDGroup',
		selectedClass: 'asp-selected',
		jsonRoot: 'collection',
		store: ds
	});
	ds.load();

	collection=[];
	rec=Roo.data.Record.create([
		{name:'id'},
		{name:'entityImageUrl'},
		{name:'componentDescription'}
	]);
	reader=new Roo.data.JsonReader({
		root:'collection',
		id:'id'
	},rec);
	ds=new Roo.data.Store({
		proxy:new Roo.data.MemoryProxy({collection:collection}),
		reader:reader
	});
	view=new Roo.ux.DDView('right-view-container','<div id=\u0027component_{id}\u0027 class=\u0027Component\u0027><img align=\u0027top\u0027 height=\u002716px\u0027 width=\u002716px\u0027 src=\u0027{entityImageUrl}\u0027>{componentDescription}</div>',{
		isFormField:true,
		name:'availableSubComponents',
		multiSelect: true,
		dragGroup:'subComponentDDGroup',
		dropGroup:'availComponentDDGroup',
		selectedClass: 'asp-selected',
		jsonRoot: 'collection',
		store: ds
	});
	ds.load();
}
Roo.onReady(initializePage);