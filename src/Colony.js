var Ant = require('./Ant')
,	utils = require('./Utils')

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

	var width = this.antFarm.ops.width
	,	height = this.antFarm.ops.height
	,	soilDepth = this.antFarm.ops.initialSoilDepth

	for (var i = 0; i < this.antFarm.ops.initialAntCount; i++) {
		this.ants.push(new Ant(utils.randomIntBetween(0, width), height*(1-soilDepth-0.05)))
	}
}

/**
 * @method
 */
Colony.prototype.update = function () {

	var ctx = this.ctx
	,	ant
	,	pixel
	, 	soil = this.antFarm.soil
	,	width = this.antFarm.ops.width
	,	height = this.antFarm.ops.height
	,	antSize = this.antFarm.ops.antSize
	,	halfAntSize = Math.round(antSize/2)

	ctx.clearRect(0, 0, width, height)

	for (var i = 0; i < this.ants.length; i++) {
		ant = this.ants[i]

		//ant.y += Math.sin(Math.random())*2
		//ant.x += Math.round(Math.random()) === 1 ? Math.sin(Math.random())*5 : -Math.sin(Math.random())*5

		pixel = soil.getPixel(ant.x + halfAntSize, (ant.y - 1) + (halfAntSize * 2))

		// solid ground!
		if(pixel === 1) {
			utils.randomIntBetween(0, 10) === 7 ? soil.removeChunk(ant.x + halfAntSize, (ant.y-1) + (halfAntSize * 2)) : Math.round(Math.random()) === 1 ? ant.x += 0.5 : ant.x -= 0.5
		}
		// falls down
		else {
			ant.y += 0.5
		}

		ant.x = utils.clamp(ant.x, 0+ antSize, width - antSize)
		ant.y = utils.clamp(ant.y, 0+ antSize, height-5)

		ctx.fillStyle = '#5BFF22'
		ctx.fillRect(ant.x, ant.y, antSize, antSize)

		// ctx.fillStyle = '#0074FF'
		// ctx.fillRect(ant.x + halfAntSize, (ant.y - 1) + (halfAntSize * 2), 1, 1)
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