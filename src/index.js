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