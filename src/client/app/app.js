function MyController($scope, $document, $http, $interval, $timeout, $window) {
	this.selectedCityUrlPrefix;
	this.accessionNumber;
	this.apiKey;
	this.samples;
	this.selectedSamples;
	
	this.$onInit = (function() {
		this.cities = [
			{
				name: 'New York',
				urlPrefix: 'http://ala.boku.ac.at/camda2017/MetaSUB/NY/data/',
			},
			{
				name: 'Boston',
				urlPrefix: 'http://ala.boku.ac.at/camda2017/MetaSUB/Boston/data/',
			},
			{
				name: 'Sacramento',
				urlPrefix: 'http://ala.boku.ac.at/camda2017/MetaSUB/Sacramento/data/',
			}];
		this.scope_ = $scope;
		this.intervalService_ = $interval;
		this.timeoutService_ = $timeout;
		this.httpService_ = $http;
		this.document_ = $document;
		this.fastaFileName;		// Setting on controller to share the file name with QUAL file uploader.
		this.qualFileName;		// Setting on controller to share the file name with FASTA file uploader.
		this.reset_();
	}).bind(this);	
}


// TODO: Switch to using Math.log2() and get rid of this function until
// Math.log2() is supported by Internet Explorer as mentioned in
// the 'Browser Compatibility' section of
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log2
/**
 * A function to compute the logarithm of the given number to the base - 2.
 *
 * @function
 * @param {number} x The given number.
 * @return {number} 
 */
function getLogOfXBase2(x) {
	return Math.log(x) / Math.log(2);
}


/**
 * A function to determine whether a file with the given filename has the given
 * file format.
 *
 * @function
 * @param {string} fileName The name of the file.
 * @param {string} expectedFileFormat The file format to check against with.
 * @return {boolean} 
 */
function isFileHavingCorrectFormat(fileName, expectedFileFormat) {
	return (fileName.length < expectedFileFormat.length) ?
		false : fileName.substring(fileName.length-expectedFileFormat.length) === expectedFileFormat;
}


/**
 * A function to remove leading and trailing white-spaces from the given 
 * input string.
 *
 * @function
 * @param {string} input The input string.
 * @return {string}
 */
function removeLeadingAndTrailingWhitespaces(input) {
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
}


/**
 * Refresh the graph between entropy of partitioned blocks of DNA and time.
 *
 * @private
 */
MyController.prototype.refreshEntropyGraph_ = function() {
	let dps = []; // dataPoints
	let chart = new CanvasJS.Chart('chartContainer', {
		title: {
			text: 'Entropy (of continuous chunks)   vs   Time',
			fontColor: '#2f4f4f',
			fontSize: 30,
			padding: 10,
			margin: 15,
			backgroundColor: '#FFFFE0',
			borderThickness: 1,
			cornerRadius: 5,
		},
		axisY: {
			includeZero: false,
		},
		data: [{
			type: 'line',
			dataPoints: dps,
		}],
	});
	let xVal = 0;
	let updateInterval = 500;
	let dataLength = 20; // number of dataPoints visible at any point

	let updateGraph = (function(count) {
		// Stop updating the chart once the whole file is analyzed.
		if (this.showEntropy === true) {
			return;
		}
		count = count || 1;
		for (let j = 0; j < count; j++) {
			dps.push({
				x: xVal,
				y: this.entropyOfCurrentWindow,
			});
			xVal++;
		}
		if (dps.length > dataLength) {
			dps.shift();
		}
		chart.render();
	}).bind(this);
	updateGraph(dataLength);
	this.dynamicGraphIntervalPromise = this.intervalService_(function() {
		updateGraph();
	}, updateInterval);
};


/**
 * Returns the entropy from the counts of adenine (A), cytosine (C),
 * guanine (G), thymine (T), and uracil (U).
 *
 * @private
 * @param {number} countOfA The count of Adenine base.
 * @param {number} countOfT The count of Thymine base.
 * @param {number} countOfG The count of Guanine base.
 * @param {number} countOfC The count of Cytosine base.
 * @return {number}
 */
MyController.prototype.getEntropy_ = function(countOfA, countOfT, countOfG, countOfC) {
	let totalCount = countOfA + countOfT + countOfG + countOfC;
	if (totalCount === 0) {
		return 0;
	}
	let probabilityOfA = countOfA / totalCount;
	let probabilityOfT = countOfT / totalCount;
	let probabilityOfG = countOfG / totalCount;
	let probabilityOfC = countOfC / totalCount;
	let entropy = -1 * (
		(probabilityOfA === 0 ? 0 : (probabilityOfA * getLogOfXBase2(probabilityOfA))) +
											(probabilityOfT === 0 ? 0 : (probabilityOfT * getLogOfXBase2(probabilityOfT))) +
											(probabilityOfG === 0 ? 0 : (probabilityOfG * getLogOfXBase2(probabilityOfG))) +
											(probabilityOfC === 0 ? 0 : (probabilityOfC * getLogOfXBase2(probabilityOfC))));
	return entropy;
};


/**
 * Initiates the entropy analysis process.
 *
 * @private
 * @param {string} fileName The name of the file to analyze.
 */
MyController.prototype.process_ = function(fileName) {
	this.refreshEntropyGraph_();
	let entropyAnalysisUrl = 'http://localhost:8080/analyze?fileName=' + fileName;
	// Note that we must have a delay, no matter whether we choose synchronous 
	// calling or asynchronous calling to fetch the server-side API, since we 
	// are plotting the entropies after these delays on a dynamic line-chart.
	// We prefer to use asynchronous calling instead of synchronous calling since
	// the combination of asynchronous and synchronous calls ($http and a synchronous 
	// delay method, e.g. - https://stackoverflow.com/a/38839049/5928129) results in 
	// performance degradation. Hence it is preferred to use only asynchronous blocking
	// calls (as used below - $http and $timeout).
	let computeEntropy = function() {
		this.httpService_
				.get(entropyAnalysisUrl)		
				.then((function(response) {
					if (response.data.statusCode === 'e') {
						this.showAnalysis = false;
						this.cancelAllTimerPromises_();
						alert('Sorry, unable to convert the uploaded file!\n' + 
									'Please check if the uploaded file is inside the directory - ' + 
									'\'Microbiome-Diversity-Inspector\'');
					}	else {
						this.entropyOfCurrentWindow =
								this.getEntropy_(
									response.data.countObj.countOfA,	
									response.data.countObj.countOfT,
									response.data.countObj.countOfG,
									response.data.countObj.countOfC);
						this.countOfA += response.data.countObj.countOfA;
						this.countOfT += response.data.countObj.countOfT;
						this.countOfG += response.data.countObj.countOfG;
						this.countOfC += response.data.countObj.countOfC;
						if (response.data.statusCode === 'x') {							
							this.showEntropy = true;
							this.entropy =
									this.getEntropy_(this.countOfA, this.countOfT, this.countOfG, this.countOfC);	
							this.cancelAllTimerPromises_();								
						}	else {
							// At this point, 'statusCode' is 'o', and thus process it further.							
							entropyAnalysisUrl = response.data.nextUrl;
							this.timeoutService_(computeEntropy.bind(this), 10);
						}
					}	
				}).bind(this), (function(error) {
					this.showAnalysis = false;
					this.cancelAllTimerPromises_();
					// Don't alert the user about internal server error, since this alert
					// would also get fired once the user reloads the page after initiation
					// of entropy analysis.
				}).bind(this))
				.catch(function() {});
	};
	this.computeEntropyTimeoutPromise = this.timeoutService_(computeEntropy.bind(this), 10);
};


/**
 * Cancels all the timer-based (here - $timeout and $interval) promises.
 *
 * @private
 */
MyController.prototype.cancelAllTimerPromises_ = function() {
	if (this.dynamicGraphIntervalPromise !== null) {
		this.intervalService_.cancel(this.dynamicGraphIntervalPromise);		
	} 
	if (this.computeEntropyTimeoutPromise !== null) {
		this.timeoutService_.cancel(this.computeEntropyTimeoutPromise);		
	}
};


/**
 * Reset all the variables of the 'Entropy Analysis' service.
 *
 * @private
 */
MyController.prototype.resetEntropyAnalysisVariables_ = function() {
	this.countOfA = 0;
	this.countOfT = 0;
	this.countOfG = 0;
	this.countOfC = 0;
	this.showAnalysis = false;
	this.showEntropy = false;
	this.entropyOfCurrentWindow = 0;
	this.cancelAllTimerPromises_();
	this.dynamicGraphIntervalPromise = null;
	this.computeEntropyTimeoutPromise = null;
}


/**
 * Reset all the variables of the 'FASTQ to FASTA Conversion' service.
 *
 * @private
 */
MyController.prototype.resetFastqToFastaConversionVariables_ = function() {
	this.startConversionToFasta = false;
}


/**
 * Reset all the variables of the 'FASTA to FASTQ Conversion' service.
 *
 * @private
 */
MyController.prototype.resetFastaToFastqConversionVariables_ = function() {
	this.startConversionToFastq = false;
}


/**
 * Reset all the variables of the 'Compute Alpha-diversity' service.
 *
 * @private
 */
MyController.prototype.resetAlphaDiversityComputationVariables_ = function() {
	// Variables required for alpha-diversity related computation starts here.
	this.shouldShowSamples = false;
	// Contains the final mean and standard-deviation and is of the format -
	// {mean: 'XXX' /**string*/, standardDeviation: 'YYY' /**string*/}
	this.resultantMeanAndStandardDeviation = {
		mean: '_',
		standardDeviation: '_',
	};
}


/**
 * Reset all the variables of the platform.
 *
 * @private
 */
MyController.prototype.reset_ = function() {
	this.resetEntropyAnalysisVariables_();
	this.resetFastaToFastqConversionVariables_();
	this.resetFastqToFastaConversionVariables_();
	this.resetAlphaDiversityComputationVariables_();
};


/**
 * Computes the mean and standard deviation (calculated using Bessel's correction as
 * mentioned here - https://en.wikipedia.org/wiki/Bessel%27s_correction) of all the
 * selected samples.
 *
 * @private
 */
MyController.prototype.computeMeanAndStandardDeviationOfSelectedSamples_ = function() {
	this.selectedSamples = [];
	for (let i=0; i<this.samples.length; i++) {
		if (this.samples[i].isIncluded && this.samples[i].isIncluded.value === true) {
			this.selectedSamples.push(this.samples[i]);
		}
	}
	// This variable is set to true if the alpha diversity of one or more than one selected
	// sample(s) is/are still getting computed in the server OR if none of the sample is
	// selected by default. In that case, the user will be shown '_' as the value of the
	// mean and standard deviation.
	let invalidComputation = false;
	if (this.selectedSamples.length === 0) {
		invalidComputation = true;
	}
	let sum = 0;
	for (let i=0; i<this.selectedSamples.length; i++) {
		if (this.selectedSamples[i].alphaDiversity === '_') {
			invalidComputation = true;
			break;
		} else {
			// Convert the alpha diversity from string to number.
			sum += +this.selectedSamples[i].alphaDiversity;
		}
	}
	if (invalidComputation === false) {
		let mean = sum/this.selectedSamples.length;
		let standardDeviationInnerSum = 0;
		for (let i=0; i<this.selectedSamples.length; i++) {
			standardDeviationInnerSum += Math.pow(+this.selectedSamples[i].alphaDiversity - mean, 2);
		}
		let standardDeviation =
					Math.pow(standardDeviationInnerSum/(this.selectedSamples.length === 1 ? 1 : this.selectedSamples.length - 1), 0.5);
		this.resultantMeanAndStandardDeviation = {
			mean: mean.toString(),
			standardDeviation: standardDeviation.toString(),
		};
	} else {
		this.resultantMeanAndStandardDeviation = {
			mean: '_',
			standardDeviation: '_',
		};
	}
};


/**
 * Sends a HTTP request to download the required Metasub data from
 * http://ala.boku.ac.at/ server.
 */
MyController.prototype.downloadMetaSubData = function() {
	alert('Enter the below details to download the required file-\nUsername- \'CAMDA\', Password- \'Pivo\'');
	window.open(this.selectedCityUrlPrefix + removeLeadingAndTrailingWhitespaces(this.accessionNumber) + '.fastq.dsrc');
};


/**
 * Shows all the samples uploaded by the user having the input API Key.
 */
MyController.prototype.showSamples = function() {
	this.httpService_.get(
		'https://app.onecodex.com/api/v1/samples',
		{
			headers:
			{
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(removeLeadingAndTrailingWhitespaces(this.apiKey) + ':')
			}
		})
		.then((function(response) {
		 	this.samples = response.data;
			for (let i=0; i<this.samples.length; i++) {
				this.samples[i].alphaDiversity = '_';
				this.samples[i].alphaDiversityComputationStatus = {
					started: false,
					completed: false,
				};
			}
			this.shouldShowSamples = true;
			this.scope_.$digest();
		}).bind(this), function(error) {
			alert('Wrong credentials!');
		})
		.catch(function() {});	
};


/**
 *  Toggles the visibility of input API Key.
 */
MyController.prototype.toggleVisibility = function() {
	let inputElem = this.document_[0].getElementById('apiKey');
	if (inputElem.type === 'password') {
		inputElem.type = 'text';
	} else {
		inputElem.type = 'password';
	}
};


/**
 * Compute alpha-diversity of the given sample.
 *
 * @param {Object} sample This is the sample whose alpha-diversity is to be determined.
 * @param {string} sample.primary_classification  A reference to a Classification for the sample.
 *																								This will typically be the One Codex Database or
 *																								Targeted Loci Database results as appropriate.
 *																							  Note that samples will not have a primary_classification
 *																							  while they are still importing or being uploaded.
 *                                                It has the following format -
 *																								{$ref: '/api/v1/classifications/SAMPLE_ID'}
 * @param {string} sample.orderOfDiversity Denoted by 'q', it is an important factor in determining
 *																				 the weight assigned to a species.
 * @param {string} sample.alphaDiversity  The alpha diversity of the sample.
 * @param {Object} sample.alphaDiversityComputationStatus  Has two properties - 'started' and 'completeed'
 *																												 denoting whether the computation has started
 *																												 or not and whether the computation is finished
 *																												 or not.
 */
MyController.prototype.computeAlphaDiversity = function(sample) {
	// Refresh the alpha-diversity computation status and alpha-diversity.
	sample.alphaDiversity = '_';
	sample.alphaDiversityComputationStatus = {
		started: false,
		completed: false,
	};
	if (!sample.orderOfDiversity) {
		alert('Please specify a valid order of diversity!');
	} else {
		sample.alphaDiversityComputationStatus.started = true;
		let query = 'apiKey=' + removeLeadingAndTrailingWhitespaces(this.apiKey) + '&' + 'sampleId=' +
									sample.primary_classification.$ref.substring(24) +
									'&' + 'orderOfDiversity=' + (+removeLeadingAndTrailingWhitespaces(sample.orderOfDiversity));
		// Carry out the time-consuming computations in the server-side to
		// avoid freezing of the browser/desktop application.
		let alphaDiversityComputationUrl = 'http://localhost:8080/compute-alpha-diversity?' + query;
		this.httpService_.get(alphaDiversityComputationUrl)
			.then((function(response) {
				if (response.data === 'x') {
					alert('Sorry, internal server error!');
				} else {
					sample.alphaDiversityComputationStatus.completed = true;
					sample.alphaDiversity = response.data;
					this.computeMeanAndStandardDeviationOfSelectedSamples_();
				}
			}).bind(this), function(error) {
				// Alert the user since even after a page refresh, unlike as in entropy
				// analysis, this error will not be fired due to the asynchronous nature
				// of this operation.
				alert('Internal server error!');
			});
	}
};


angular
	.module('myApp', [])
	.controller('MyController', ['$scope', '$document', '$http', '$interval', '$timeout', '$window', MyController])
	.directive('filePicker', function($http) {
		return {
			link: function(scope, elem, attr, ctrl) {
				elem.on('change', function() {
					let fileName = elem[0].files[0].name;
					switch (elem[0].id) {
						case 'fileInputAnalyze':
							scope.myCtrl.resetEntropyAnalysisVariables_();
							scope.myCtrl.fileName = fileName;
							if (isFileHavingCorrectFormat(fileName, '.fastq') === false &&
														isFileHavingCorrectFormat(fileName, '.fasta') === false) {
								alert('Please upload a FASTQ/FASTA file');
								break;
							}
							scope.myCtrl.showAnalysis = true;
							scope.$apply();	// Placing scope.$apply() to update the view even if removing it works fine.
							scope.myCtrl.process_(fileName);
							break;
						case 'fileInputConvertToFasta':
							scope.myCtrl.resetFastqToFastaConversionVariables_();
							scope.myCtrl.fileName = fileName;
							scope.$apply();
							if (isFileHavingCorrectFormat(fileName, '.fastq') === false) {
								alert('Please upload a FASTQ file');
								break;
							}
							scope.myCtrl.startConversionToFasta = true;
							scope.$apply();
							$http.post(
								'http://localhost:8080/convert-to-fasta',
								{fileName: fileName},
								{headers: {'Content-Type': 'application/json', 'Authorization': 'Basic '}})
								.then(function(response) {
									scope.myCtrl.startConversionToFasta = false;
									if (response.data === true) {
										alert('File downloaded! Please check the uploaded file\'s directory.');										
									} else {
										alert('Sorry, unable to convert the uploaded file!\n' + 
													'Please check if the uploaded file is inside the directory - \'Microbiome-Diversity-Inspector\'');
									}
								}, function(error) {
									scope.myCtrl.startConversionToFasta = false;
									// Don't alert the user, since the user might want to forcefully kill the current conversion
									// task by refreshing the page.
								})
								.catch(function() {});
							break;
						case 'fastaFileUploader':
							scope.myCtrl.resetFastaToFastqConversionVariables_();
							scope.$apply();
							if (isFileHavingCorrectFormat(fileName, '.fasta') === false) {
								alert('Please upload a FASTA file');
								break;
							}
							scope.myCtrl.fastaFileName = fileName;
							if (scope.myCtrl.qualFileName !== undefined) {
								// Keep this code in sync with - case 'qualFileUploader'.
								scope.myCtrl.fileName = scope.myCtrl.fastaFileName;
								scope.myCtrl.startConversionToFastq = true;
								scope.$apply();
								$http.post(
									'http://localhost:8080/convert-to-fastq',
									{
										fastaFileName: scope.myCtrl.fastaFileName,
										qualFileName: scope.myCtrl.qualFileName,
									},
									{headers: {'Content-Type': 'application/json', 'Authorization': 'Basic '}})
									.then(function(response) {
										scope.myCtrl.startConversionToFastq = false;
										if (response.data === true) {
											alert('File downloaded! Please check the uploaded file\'s directory.');										
										} else {
											alert('Sorry, unable to convert the uploaded file!\n' + 
														'Please check if the uploaded file is inside the directory - \'Microbiome-Diversity-Inspector\'');
										}
									}, function(error) {
										scope.myCtrl.startConversionToFastq = false;
										// Don't alert the user, since the user might want to forcefully kill the current conversion
										// task by refreshing the page.									
									})
									.catch(function() {});
							}
							break;
						case 'qualFileUploader':
							scope.myCtrl.resetFastaToFastqConversionVariables_();
							scope.$apply();
							if (isFileHavingCorrectFormat(fileName, '.qual') === false) {
								alert('Please upload a QUAL file');
								break;
							}
							scope.myCtrl.qualFileName = fileName;
							if (scope.myCtrl.fastaFileName !== undefined) {
								// Keep this code in sync with - case 'fastaFileUploader'.
								scope.myCtrl.fileName = scope.myCtrl.fastaFileName;
								scope.myCtrl.startConversionToFastq = true;
								scope.$apply();
								$http.post(
									'http://localhost:8080/convert-to-fastq',
									{
										fastaFileName: scope.myCtrl.fastaFileName,
										qualFileName: scope.myCtrl.qualFileName,
									},
									{headers: {'Content-Type': 'application/json', 'Authorization': 'Basic '}})
									.then(function(response) {
										scope.myCtrl.startConversionToFastq = false;
										if (response.data === true) {
											alert('File downloaded! Please check the uploaded file\'s directory.');										
										} else {
											alert('Sorry, unable to convert the uploaded file!\n' + 
														'Please check if the uploaded file is inside the directory - \'Microbiome-Diversity-Inspector\'');
										}										
									}, function(error) {
										scope.myCtrl.startConversionToFastq = false;
										// Don't alert the user, since the user might want to forcefully kill the current conversion
										// task by refreshing the page.
									})
									.catch(function() {});
							}
							break;
					}
					elem.val(null);
				});
			},
		};
	})
	.directive('expandableCard', function() {
		return {
			link: function(scope, elem, attr, ctrl) {
				scope.$watch(function() {
					return scope.myCtrl.shouldShowSamples;
				}, function(newVal, oldVal) {
					if (newVal !== oldVal && newVal === true) {
						elem.removeClass('card-size-300');
					}
				});
			},
		};
	})
	.directive('checkboxMeanAndStandardDeviationTrigger', function() {
		return {
			link: function(scope, elem, attr, ctrl) {
				elem.on('change', function() {
					scope.myCtrl.computeMeanAndStandardDeviationOfSelectedSamples_();
					scope.$apply();
				});
			},
		};
	});
