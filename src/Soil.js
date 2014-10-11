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

}

/**
 * @method
 */
Soil.prototype.boot = function () {

	var height = this.antFarm.ops.height
	,	width = this.antFarm.ops.width
	,	soilDepth = this.antFarm.ops.initialSoilDepth

	this.ctx.fillStyle = '#FF6556'
	this.ctx.fillRect(0, height*(1-soilDepth), width, height*soilDepth)
}

/**
 * @method
 */
Soil.prototype.update = function () {
	this.ctx.fillRect(100, 100, 200, 200)
}

/**
 * @method
 */
Soil.prototype.render = function () {

}

/**
 * @method
 */
Soil.prototype.method_name = function () {
	
}

/**
 * @method
 */
Soil.prototype.method_name = function () {
	
}

module.exports = Soil