
var utils = {
	clamp : function (num, min, max) {
		return Math.min(Math.max(num, min), max)
	},

	randomIntBetween : function(min, max) {
		return Math.floor(min + Math.random() * (max - min))
	},

	randomBetween : function(min, max) {
		return min + Math.random() * (max - min)
	}
}

module.exports = utils