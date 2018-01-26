'use strict';

module.exports = function(duration) {
	// eslint-disable-next-line promise/avoid-new
	return new Promise(resolve => setTimeout(resolve, duration));
};
