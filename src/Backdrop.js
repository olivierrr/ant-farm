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

/**
 * @method
 */
Backdrop.prototype.update = function () {

}

module.exports = Backdrop