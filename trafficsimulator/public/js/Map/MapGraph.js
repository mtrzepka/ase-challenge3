/*******************************************************************************
 * Copyright (c) 2014 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution.
 *
 * The Eclipse Public License is available at
 *   http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 * Contributors:
 *   Bryan Boyd - Initial implementation 
 *******************************************************************************/

/*****************************************************************************
 *                            
 *                              MapGraphSet         
 *
 ****************************************************************************/
function MapGraphSet() {
	this.objects = {};
	this.visible = true;
	
	this.sub = null;

	//this.objects["austin"] = new MapGraph("austin");
	//this.objects["austin"].init(JSON.parse(atob(austinMap)));
	demo.doMapGraphUpdate = true;
}

MapGraphSet.prototype.draw = function() {
	if (demo.ui.bDrawMap) {
		for (var i in this.objects) {
			this.objects[i].draw();
		}
	}
}

MapGraphSet.prototype.drawOverlays = function() {
	for (var i in this.objects) {
		this.objects[i].drawOverlay();
	}
}

MapGraphSet.prototype.update = function() {
	if (demo.ui.bDrawMap) {
		for (var i in this.objects) {
			this.objects[i].update();
		}
	}
}

MapGraphSet.prototype.reset = function() {
	for (var i in this.objects) {
		this.objects[i].reset();
	}
}


/*****************************************************************************
 *                            
 *                                MapGraph
 *
 *       Base class for all objects that will be displayed on the map.
 *                            
 ****************************************************************************/
function MapGraph(id) {
	this.id = id;
	this.edges = [];
	this.nodes = [];
	this.nodeCount = 0;
	this.edgeCount = 0;
	this.name = "default";
}

MapGraph.prototype.init = function(data) {
	this.edges = data.edges;
	this.nodes = data.nodes;
	this.nodeCount = data.nodeCount;
	this.edgeCount = data.edgeCount;
	this.name = data.name;
	console.log(this);
}

MapGraph.prototype.getPopoverData = function() {
}

MapGraph.prototype.updatePopoverData = function() {
}

MapGraph.prototype.reset = function() {
}

MapGraph.prototype.getRadius = function() {
	var zoom = demo.ui.map.getZoom();
	var factor = 1;
	if (this.isSelected) { factor = 1.8; }
	var radius = factor * 14 * Math.pow(0.7, (18 - zoom));
	return Math.max(radius, 4);
}

MapGraph.prototype.draw = function() {
	//if (demo.ui.map.getZoom() < 15) { return; }
	var context = demo.ui.context;
	var radius = this.getRadius() / 2;

	for (var i in this.edges) {
		var e = this.edges[i];
		if (e.startPos && e.endPos) {
			context.save();
			context.translate(e.startPos.x, e.startPos.y);
			context.rotate((e.heading + 180) * Math.PI / 180);
			var d = Math.sqrt(Math.pow(e.endPos.x - e.startPos.x, 2) + Math.pow(e.endPos.y - e.startPos.y, 2));

			context.strokeStyle = "black";
			context.lineWidth = radius / 2;
			context.beginPath();
			context.moveTo(0, 0);
			context.lineTo(0, d);
			context.closePath();
			context.stroke();

			if (demo.ui.map.getZoom() >= 17) {
				context.strokeStyle = "blue";
				context.fillStyle = "rgb(200,200,255)";
				context.lineWidth = 1;
				context.beginPath();
				context.moveTo(0, d - 2*radius);
				var side = radius / 2;
				context.lineTo(-1 * side, d - 2*radius - side - 1);
				context.lineTo(side, d-2*radius - side - 1);
				context.lineTo(0, d - 2*radius);
				context.closePath();
				context.stroke();
				context.fill();
			}

			context.restore();
		}
	}

	for (var i in this.nodes) {
		var n = this.nodes[i];
		if (n.pos) {
			context.save();
			context.strokeStyle = "rgba(15,15,15,0.7)";
			context.fillStyle = "rgba(100,100,255,0.8)";
			context.lineWidth = 1;
			context.beginPath();
			context.arc(n.pos.x, n.pos.y, radius, 0, Math.PI*2, true);
			context.closePath();
			context.stroke();
			context.fill();
			context.restore();
		}
	}
}

MapGraph.prototype.canSelect = function() {
	return false;
}

MapGraph.prototype.update = function() {
	// non-moving, so just update the X/Y based on the map bound
	//if (!demo.doMapGraphUpdate) { return; }
	var loc = demo.ui.map.getCenter().toShortString() + ", " + demo.ui.map.getZoom();
	if (demo.ui.bForceDrawMap || (this.lastCenterSeen && this.lastCenterSeen != loc)) {
		console.log("updating");
		for (var i in this.nodes) {
			var n = this.nodes[i];
			var p = Utils.geoToXY(n.lon, n.lat);
			n.pos = { x: p.x, y: p.y }
		}
		for (var i in this.edges) {
			var e = this.edges[i];
			if (this.nodes[e.a] && this.nodes[e.b]) {
				var p_a = Utils.geoToXY(this.nodes[e.a].lon, this.nodes[e.a].lat);
				var p_b = Utils.geoToXY(this.nodes[e.b].lon, this.nodes[e.b].lat);
				e.startPos = { x: p_a.x, y: p_a.y }
				e.endPos = { x: p_b.x, y: p_b.y }
			}
		}
		demo.ui.bForceDrawMap = false;
	}
	this.lastCenterSeen = loc;
}

MapGraph.prototype.drawOverlay = function() {
}

