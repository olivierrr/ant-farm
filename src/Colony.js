
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

	var ops = this.antFarm.ops
	,	ctx = this.ctx

	for (var i = 0; i < ops.initialAntCount ; i++) {
		this.newAnt(~~(Math.random()*ops.width), ops.height*(1-ops.initialSoilDepth-.05))
	}

	ctx.fillStyle = 'black'

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
	,	mouse = this.antFarm.mouse
	,	randomNum

	if(this.ticksUntilCollect-- === 0) {
		this.collectOutOfBounds()
		this.ticksUntilCollect = 500
	}

	ctx.clearRect(0, 0, width, height)

	if(mouse.isDown /*&& soil.getPixel(mouse.posX, mouse.posY) === 0*/) {
		this.newAnt(mouse.posX, mouse.posY)
	}

	for (var i = 0; i < this.ants.length; i++) {
		ant = this.ants[i]

		pixel = soil.getPixel(ant.x + halfAntSize, (ant.y - 1) + (halfAntSize * 2))
		if(pixel === 0) ant.y += 1.5

		randomNum = ~~(Math.random()*11)

		if(randomNum < 1) {
			soil.removeChunk(ant.x + halfAntSize, (ant.y-1) + (halfAntSize * 2))
			ant.y += 0.5
		} else if (randomNum < 6) {
			soil.removeChunk(ant.x, (ant.y-1) + (halfAntSize * 2))
			ant.x += 1
		} else {
			soil.removeChunk(ant.x + antSize, (ant.y-1) + (halfAntSize))
			ant.x -= 1
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
	this.ants.push({
		x: x,
		y: y
	})
}

module.exports = Colony