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
	this.ctx.beginPath();
	this.ctx.arc(500 / 2, 500 / 2, 500, 0, Math.PI * 2, false);
	this.ctx.fill();	
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