function InputValidationService() {}


/**
 * A function to determine whether a file with the given filename has the given
 * file format.
 *
 * @function
 * @param {string} fileName The name of the file.
 * @param {string} expectedFileFormat The file format to check against with.
 * @return {boolean} 
 */
InputValidationService.prototype.isFileHavingCorrectFormat =
	function(fileName, expectedFileFormat) {
		return (fileName.length < expectedFileFormat.length) ?
				false : fileName.substring(fileName.length-expectedFileFormat.length) === expectedFileFormat;
};


/**
 * A function to remove leading and trailing white-spaces from the given 
 * input string.
 *
 * @function
 * @param {string} input The input string.
 * @return {string}
 */
InputValidationService.prototype.removeLeadingAndTrailingWhitespaces = function(input) {
	let startIndex = 0;
	while (startIndex < input.length && input[startIndex] === ' ') {
		startIndex++;
	}
	let endIndex = input.length - 1;
	while (endIndex >= 0 && input[endIndex] === ' ') {
		endIndex--;
	}
	let res = '';
	for (let i=startIndex; i<=endIndex; i++) {
		res += input[i];
	}
	return res;
};


angular
	.module('microbiomeDiversityInspector')
	.service('inputValidationService', InputValidationService);