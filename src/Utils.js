
var utils = {
	clamp : function (num, min, max) {
		return Math.min(Math.max(num, min), max)
	},

	dotProduct : function (x1, y1, x2, y2) {
		return (x1 * x2) + (y1 * y2)
	},

	crossProduct : function (x1, y1, x2, y2) {
		return (x1 * y2) - (y1 * x2)
	},

	magnitude : function (x1, y1, x2, y2) {
		return Math.sqrt((x1 * x2) + (y1 * y2))
	},

	randomIntBetween : function(min, max) {
		return Math.floor(min + Math.random() * (max - min))
	},

	randomBetween : function(min, max) {
		return min + Math.random() * (max - min)
	}
}

module.exports = utils