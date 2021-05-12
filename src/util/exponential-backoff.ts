/**
 * @fileoverview Calculate exponential backoff time
 */

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

// Retry intervals are between 50% and 150% of the exponentially increasing base amount
const RETRY_RANDOMIZATION_FACTOR = 0.5;

/**
 * Calculate the exponential backoff time with randomized jitter
 * @param {int} numRetries Which retry number this one will be
 * @param {int} baseInterval The base retry interval set in config
 * @returns {int} The number of milliseconds after which to retry
 */
export = function getRetryTimeout(numRetries: number, baseInterval: number) {
	var minRandomization = 1 - RETRY_RANDOMIZATION_FACTOR;
	var maxRandomization = 1 + RETRY_RANDOMIZATION_FACTOR;
	var randomization =
		Math.random() * (maxRandomization - minRandomization) + minRandomization;
	var exponential = Math.pow(2, numRetries - 1);
	return Math.ceil(exponential * baseInterval * randomization);
};
