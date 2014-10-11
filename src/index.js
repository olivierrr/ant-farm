var Colony = require('./Colony')
,	Soil = require('./Soil')
,	Backdrop = require('./Backdrop')

/**
 * @constructor
 * @param {Object|domNode} [document.body]
 * @param {Number} [100%]
 * @param {Number} [100%]
 */
function AntFarm (container, width, height) {

	/**
	 * @property {Object} - 'options'
	 */
	this.ops = {
		container: container || document.body,
		width: width || window.innerWidth,
		height: height || window.innerHeight,
		initialAntCount: 5,
		initialSoilDepth: 0.90,
		antSize: 3
	}

	/**
	 * @property {Object}
	 */
	this.colony = null

	/**
	 * @property {Object}
	 */
	this.soil = null

	/**
	 * @property {Object}
	 */
	this.backdrop = null

	this.boot()
}

/**
 * assign canvas layers and boot objects
 *
 * @method
 */
AntFarm.prototype.boot = function () {

	this.backdrop = new Backdrop(this, this.appendCanvas())
	this.soil = new Soil(this, this.appendCanvas())
	this.colony = new Colony(this, this.appendCanvas())

	this.backdrop.boot()
	this.soil.boot()
	this.colony.boot()

	this.tick()

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
AntFarm.prototype.update = function () {
	this.backdrop.update()
	this.soil.update()
	this.colony.update()
}

/**
 * @method
 */
AntFarm.prototype.tick = function () {
	this.update()
	requestAnimationFrame(this.tick.bind(this))
}

/**
 * @method
 */
AntFarm.prototype.method_name = function () {

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
}, 10)