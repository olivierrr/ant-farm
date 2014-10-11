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

	var gradient = this.ctx.createLinearGradient(0,0,0,height)
	gradient.addColorStop(0,"#004D81");
	gradient.addColorStop(1,"#150034");
	this.ctx.fillStyle = gradient
	this.ctx.fillRect(0, height*(1-soilDepth), width, height*soilDepth)
}

/**
 * @method
 */
Soil.prototype.render = function () {

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
 * @todo
 */
Soil.prototype.alphaChunk = function (x, y) {
	this.ctx.fillStyle = 'white'
	this.ctx.globalCompositeOperation = 'lighter'
	this.ctx.beginPath()
	this.ctx.arc(x, y, 10, 0, Math.PI * 2, false)
	this.ctx.fill()
}

/**
 * @method
 */
Soil.prototype.removeChunk = function (x, y) {
	this.ctx.globalCompositeOperation = 'destination-out'
	this.ctx.beginPath()
	this.ctx.arc(x, y, 3, 0, Math.PI * 2, false)
	this.ctx.fill()
}

module.exports = Soil