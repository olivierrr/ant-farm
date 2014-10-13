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

	/**
	 * is -=1 every loop and restarted back to original value when it gets to 0
	 * when it gets to 0 we check to see if any ant is out of bounds and remove them from the game!
	 *
	 * @property {Number}
	 */
	this.ticksUntilCollect = 500

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

	if(this.ticksUntilCollect-- === 0) {
		this.collectOutOfBounds()
		this.ticksUntilCollect = 500
	} 

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

		ctx.fillRect(ant.x, ant.y, antSize, antSize)
	}

}

/**
 * @method
 */
Colony.prototype.collectOutOfBounds = function () {

	var width = this.antFarm.ops.width
	,	height = this.antFarm.ops.height

	for(var i = 0; i < this.ants.length; i++) {
		var ant = this.ants[i]
		if(ant.x<0 || ant.y>height || ant.x>width) this.ants.splice(i, 1)
	}
}

/**
 * @method
 */
Colony.prototype.newAnt = function (x, y) {
	this.ants.push(new Ant(x, y))
}

module.exports = Colony