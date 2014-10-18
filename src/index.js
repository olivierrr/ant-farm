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

	this.mouse = {
		posX: 0,
		posY: 0,
		isDown: false
	}

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

	this.attachEvents()
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

AntFarm.prototype.attachEvents = function () {

	var _this = this

	this.ops.container.addEventListener('mousedown', function (e) {
		_this.mouse.posX = e.x
		_this.mouse.posY = e.y
		_this.mouse.isDown = true
	})

	this.ops.container.addEventListener('mousemove', function (e) {
		_this.mouse.posX = e.x
		_this.mouse.posY = e.y
	})

	this.ops.container.addEventListener('mouseup', function (e) {
		_this.mouse.isDown = false
	})

}

// dev
window.o = new AntFarm()
document.body.style.overflow = 'hidden'
document.body.style.margin = '0px'
document.body.style.padding = '0px'

