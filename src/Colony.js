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

	this.boot()
}

/**
 * @method
 */
Colony.prototype.boot = function () {

	var width = this.antFarm.ops.width
	,	height = this.antFarm.ops.height
	,	soilDepth = this.antFarm.ops.initialSoilDepth

	for (var i = 0; i < this.antFarm.ops.initialAntCount; i++) {
		this.newAnt(utils.randomIntBetween(0, width), height*(1-soilDepth-0.05))
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
	ctx.fillStyle = 'black'

	for (var i = 0; i < this.ants.length; i++) {
		ant = this.ants[i]

		pixel = soil.getPixel(ant.x + halfAntSize, (ant.y - 1) + (halfAntSize * 2))
		var randomNum = utils.randomIntBetween(0, 10)

		if(pixel === 0) ant.y += 1.5

		switch (randomNum) {
			case 1:
				soil.removeChunk(ant.x + halfAntSize, (ant.y-1) + (halfAntSize * 2))
				ant.y += 0.5
				break
			case 2:
			case 3:
			case 4:
			case 5:
				soil.removeChunk(ant.x, (ant.y-1) + (halfAntSize * 2))
				ant.x += 1
				break
			case 6:
			case 7:
			case 8:
			case 9:
				soil.removeChunk(ant.x + antSize, (ant.y-1) + (halfAntSize))
				ant.x -= 1
				break
		}

		ant.x = utils.clamp(ant.x, 0+ antSize, width - antSize)
		ant.y = utils.clamp(ant.y, 0+ antSize, height-5)

		ctx.fillRect(ant.x, ant.y, antSize, antSize)

	}

}

/**
 * @method
 */
Colony.prototype.newAnt = function (x, y) {
	this.ants.push(new Ant(x, y))
}

module.exports = Colony