var Ant = require('./Ant')

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
}

/**
 * @method
 */
Colony.prototype.boot = function () {
	for (var i = 0; i < this.antFarm.ops.initialAntCount; i++) {
		this.ants.push(new Ant())
	}
}

/**
 * @method
 */
Colony.prototype.update = function () {
	var ctx = this.ctx
	,	ant
	,	pixelData
	, 	soilCtx = this.antFarm.soil.ctx
	,	width = this.antFarm.ops.width
	,	height = this.antFarm.ops.height

	ctx.clearRect(0, 0, width, height)

	for (var i = 0; i < this.ants.length; i++) {
		ant = this.ants[i]

		ant.x += Math.random()*10
		ant.y += Math.random()*10

		pixelData = soilCtx.getImageData(ant.x, ant.y, 1, 1)
		if (pixelData.data[3] > 0) {
			soilCtx.globalCompositeOperation = "destination-out"
			soilCtx.beginPath()
			soilCtx.arc(ant.x, ant.y, 10, 0, Math.PI * 2, false)
			soilCtx.fill()
		}

		ctx.fillRect(ant.x, ant.y, 10, 10)
	}
}

/**
 * @method
 */
Colony.prototype.render = function () {

}

/**
 * @method
 */
Colony.prototype.method_name = function () {
	
}

/**
 * @method
 */
Colony.prototype.method_name = function () {
	
}

module.exports = Colony