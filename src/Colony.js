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
	 * @property {Array}
	 */
	this.ants = []
}

/**
 * @method
 */
Colony.prototype.boot = function () {
	for(var i = 0; i < this.antFarm.ops.initialAntCount; i++) {
		this.ants.push(new Ant())
	}
}

/**
 * @method
 */
Colony.prototype.update = function () {

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