(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @constructor
 */
function Ant (x, y) {

	this.x = x || 0

	this.y = y || 0

}

/**
 * @method
 */
Ant.prototype.boot = function () {

}

/**
 * @method
 */
Ant.prototype.update = function () {
	
}

/**
 * @method
 */
Ant.prototype.render = function () {

}

/**
 * @method
 */
Ant.prototype.method_name = function () {
	
}

/**
 * @method
 */
Ant.prototype.method_name = function () {
	
}

module.exports = Ant
},{}],2:[function(require,module,exports){
var utils = require('./Utils')

/**
 * @constructor
 */
function Backdrop (antFarm, ctx) {

	/**
	 * @property {Object} - reference to root
	 */
	this.antFarm = antFarm

	/**
	 * @property {2d-context}
	 */
	this.ctx = ctx

	this.boot()
}

/**
 * @method
 */
Backdrop.prototype.boot = function () {

	var height = this.antFarm.ops.height
	,	width = this.antFarm.ops.width

	var gradient = this.ctx.createLinearGradient(0,0,0,height)
	gradient.addColorStop(0,'white')
	gradient.addColorStop(1, '#FF3F73')
	this.ctx.fillStyle = gradient
	this.ctx.fillRect(0, 0, width, height)

}

module.exports = Backdrop
},{"./Utils":5}],3:[function(require,module,exports){
var Ant = require('./Ant')
,	utils = require('./Utils')

/**
 * @constructor
 */
function Colony (antFarm, ctx) {

	/**
	 * @property {Object} - reference to root
	 */
	this.antFarm = antFarm

	/**
	 * @property {2d-context}
	 */
	this.ctx = ctx

	/**
	 * @property {Array}
	 */
	this.ants = []

	/**
	 * is -=1 every loop and restarted back to original value when it gets to 0
	 * when it gets to 0 we check to see if any ant is out of bounds and remove them from the game!
	 *
	 * @property {Number}
	 */
	this.ticksUntilCollect = 500

	this.boot()

}

/**
 * @method
 */
Colony.prototype.boot = function () {

	var width = this.antFarm.ops.width
	,	height = this.antFarm.ops.height
	,	soilDepth = this.antFarm.ops.initialSoilDepth

	for (var i = 0; i < this.antFarm.ops.initialAntCount; i++) {
		this.newAnt(utils.randomIntBetween(0, width), height*(1-soilDepth-0.05))
	}

}

/**
 * @method
 */
Colony.prototype.update = function () {

	if(this.ticksUntilCollect-- === 0) {
		this.collectOutOfBounds()
		this.ticksUntilCollect = 500
	} 

	var ctx = this.ctx
	,	ant
	,	pixel
	, 	soil = this.antFarm.soil
	,	width = this.antFarm.ops.width
	,	height = this.antFarm.ops.height
	,	antSize = this.antFarm.ops.antSize
	,	halfAntSize = Math.round(antSize/2)

	ctx.clearRect(0, 0, width, height)
	ctx.fillStyle = 'black'

	for (var i = 0; i < this.ants.length; i++) {
		ant = this.ants[i]

		pixel = soil.getPixel(ant.x + halfAntSize, (ant.y - 1) + (halfAntSize * 2))
		var randomNum = utils.randomIntBetween(0, 10)

		if(pixel === 0) ant.y += 1.5

		switch (randomNum) {
			case 1:
				soil.removeChunk(ant.x + halfAntSize, (ant.y-1) + (halfAntSize * 2))
				ant.y += 0.5
				break
			case 2:
			case 3:
			case 4:
			case 5:
				soil.removeChunk(ant.x, (ant.y-1) + (halfAntSize * 2))
				ant.x += 1
				break
			case 6:
			case 7:
			case 8:
			case 9:
				soil.removeChunk(ant.x + antSize, (ant.y-1) + (halfAntSize))
				ant.x -= 1
				break
		}

		ctx.fillRect(ant.x, ant.y, antSize, antSize)
	}

}

/**
 * @method
 */
Colony.prototype.collectOutOfBounds = function () {

	var width = this.antFarm.ops.width
	,	height = this.antFarm.ops.height

	for(var i = 0; i < this.ants.length; i++) {
		var ant = this.ants[i]
		if(ant.x<0 || ant.y>height || ant.x>width) this.ants.splice(i, 1)
	}
}

/**
 * @method
 */
Colony.prototype.newAnt = function (x, y) {
	this.ants.push(new Ant(x, y))
}

module.exports = Colony
},{"./Ant":1,"./Utils":5}],4:[function(require,module,exports){
var utils = require('./Utils')

/**
 * @constructor
 */
function Soil (antFarm, ctx) {

	/**
	 * @property {Object} - reference to root
	 */
	this.antFarm = antFarm

	/**
	 * @property {2d-context}
	 */
	this.ctx = ctx

	this.boot()
}

/**
 * @method
 */
Soil.prototype.boot = function () {
	var height = this.antFarm.ops.height
	,	width = this.antFarm.ops.width
	,	soilDepth = this.antFarm.ops.initialSoilDepth

	var gradient = this.ctx.createLinearGradient(0,0,0,height)
	gradient.addColorStop(0,"#0069AE")
	gradient.addColorStop(1,"#2B006A")
	this.ctx.fillStyle = gradient
	this.ctx.fillRect(0, height*(1-soilDepth), width, height*soilDepth)
}

/**
 * @method
 */
Soil.prototype.getPixel = function (x, y) {
	var pixelData = this.ctx.getImageData(x, y, 1, 1)
	if (pixelData.data[3] > 0) return 1
	else return 0
}

/**
 * @method
 */
Soil.prototype.removeChunk = function (x, y) {
	this.ctx.globalCompositeOperation = 'destination-out'
	this.ctx.beginPath()
	this.ctx.arc(x, y, 1, 0, Math.PI * 2, false)
	this.ctx.fill()
}

module.exports = Soil
},{"./Utils":5}],5:[function(require,module,exports){

var utils = {
	clamp : function (num, min, max) {
		return Math.min(Math.max(num, min), max)
	},

	randomIntBetween : function(min, max) {
		return Math.floor(min + Math.random() * (max - min))
	},

	randomBetween : function(min, max) {
		return min + Math.random() * (max - min)
	}
}

module.exports = utils
},{}],6:[function(require,module,exports){
var Colony = require('./Colony')
,	Soil = require('./Soil')
,	Backdrop = require('./Backdrop')

/**
 * @constructor
 * @param {Object|domNode} [document.body]
 * @param {Number} [100%]
 * @param {Number} [100%]
 */
function AntFarm (obj) {

	/**
	 * @property {Object} - 'options'
	 */
	this.ops = {}

	/**
	 * @property {Object} - canvas layer
	 */
	this.colony = null

	/**
	 * @property {Object} - canvas layer
	 */
	this.soil = null

	/**
	 * @property {Object} - canvas layer
	 */
	this.backdrop = null

	this.parseOps(obj)
	this.boot()
}

/**
 * assign canvas layers
 *
 * @method
 */
AntFarm.prototype.boot = function (container, width, height) {

	this.backdrop = new Backdrop(this, this.appendCanvas())
	this.soil 	  = new Soil(this, this.appendCanvas())
	this.colony   = new Colony(this, this.appendCanvas())

	this.tick()

}

/**
 * @method
 */
AntFarm.prototype.parseOps = function (obj) {

	obj = obj || {}

	this.ops.container = obj.container || document.body

	this.ops.width  = obj.width  || this.ops.container.offsetWidth  || window.innerWidth
	this.ops.height = obj.height || this.ops.container.offsetHeight || window.innerHeight

	this.ops.initialAntCount  = obj.initialAntCount  || 5
	this.ops.initialSoilDepth = obj.initialSoilDepth || 0.9
	this.ops.antSize 		  = obj.antSize 		 || 3

}

/**
 * @method
 */
AntFarm.prototype.appendCanvas = function () {

	var canvas = document.createElement('canvas')
	canvas.style.position = 'absolute'
	canvas.width = this.ops.width
	canvas.height = this.ops.height
	this.ops.container.appendChild(canvas)

	return canvas.getContext('2d')

}

/**
 * @method
 */
AntFarm.prototype.tick = function () {

	this.colony.update()
	requestAnimationFrame(this.tick.bind(this))

}

// dev
window.o = new AntFarm()
document.body.style.overflow = 'hidden'
document.body.style.margin = '0px'
document.body.style.padding = '0px'

var isDropping = false
var mousePos = {
	x: 0,
	y: 0
}

document.body.addEventListener('mousedown', function (e) {
	isDropping = true
	mousePos.x = e.x
	mousePos.y = e.y
})

document.body.addEventListener('mousemove', function (e) {
	mousePos.x = e.x
	mousePos.y = e.y
})

document.body.addEventListener('mouseup', function (e) {
	isDropping = false
})

window.setInterval(function () {
	if(isDropping && o.soil.getPixel(mousePos.x, mousePos.y) === 0) {
		o.colony.newAnt(mousePos.x, mousePos.y)
	}
}, 1)
},{"./Backdrop":2,"./Colony":3,"./Soil":4}]},{},[6]);
