let Util = {
	precisionRound: function(number, precision) {
		let factor = Math.pow(10, precision);
		return Math.round(number * factor) / factor;
	}
};


module.exports = Util;