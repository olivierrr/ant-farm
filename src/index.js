var Ant = require('./Ant')
var Colony = require('./Colony')
var Soil = require('./Soil')
/**
 * @constructor
 * @param {Object|domNode}
 */
function AntFarm (container, width, height) {

	this.ops = {
		container: container || document.body,
		width: width || window.innerWidth,
		height: height || window.innerHeight,
		initialAntCount: 100
	}

	/**
	 * front ctx
	 *
	 * @property {2d-context}
	 */
	this.ctx1 = this.appendCanvas()

	/**
	 * background ctx
	 *
	 * @property {2d-context}
	 */
	this.ctx0 = this.appendCanvas()

	/**
	 * @property {Object}
	 */
	this.colony = new Colony(this, this.ctx1)

	/**
	 * @property {Object}
	 */
	this.soil = new Soil(this, this.ctx0)

	this.boot()
}

/**
 * @method
 */
AntFarm.prototype.boot = function () {

	this.soil.boot()
	this.colony.boot()

	this.tick()

}

/**
 * @method
 */
AntFarm.prototype.appendCanvas = function () {
	var canvas = document.createElement('canvas')
	canvas.width = this.ops.width
	canvas.height = this.ops.height
	this.ops.container.appendChild(canvas)
	return canvas.getContext('2d')
}

/**
 * @method
 */
AntFarm.prototype.update = function () {
	var ants = this.ants
}

/**
 * @method
 */
AntFarm.prototype.render = function () {
	var ants = this.ants
}

/**
 * @method
 */
AntFarm.prototype.tick = function () {
	this.update()
	this.render()

	requestAnimationFrame(this.tick.bind(this))
}

/**
 * @method
 */
AntFarm.prototype.method_name = function () {
	
}

//

window. o = new AntFarm()
document.body.style.overflow = 'hidden'
document.body.style.margin = '0px'
document.body.style.padding = '0px'
