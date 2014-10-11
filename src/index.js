var Colony = require('./Colony')
,	Soil = require('./Soil')

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
		initialAntCount: 50,
		initialSoilDepth: 0.90,
	}

	/**
	 * front ctx
	 *
	 * @property {2d-context}
	 */
	this.ctx1 = null

	/**
	 * background ctx
	 *
	 * @property {2d-context}
	 */
	this.ctx2 = null

	/**
	 * @property {Object}
	 */
	this.colony = null

	/**
	 * @property {Object}
	 */
	this.soil = null

	this.boot()
}

/**
 * @method
 */
AntFarm.prototype.boot = function () {

	this.ctx1 = this.appendCanvas()
	this.ctx2 = this.appendCanvas()

	this.soil = new Soil(this, this.ctx1)
	this.colony = new Colony(this, this.ctx2)

	this.colony.boot()
	this.soil.boot()

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
	this.colony.update()
}

/**
 * @method
 */
AntFarm.prototype.tick = function () {
	this.update()
	//this.render()

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
