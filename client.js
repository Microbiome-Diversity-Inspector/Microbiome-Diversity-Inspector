function MyController($scope, $document, $http, $interval) {
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
		this.httpService_ = $http;
		this.document_ = $document;
		this.fastaFileName;		// Setting on controller to share the file name with QUAL file uploader.
		this.qualFileName;		// Setting on controller to share the file name with FASTA file uploader.
		this.reset_();
	}).bind(this);
}


function getLogOfXBase2(x) {
	return Math.log(x) / Math.log(2);
}


function isFileHavingCorrectFormat(fileName, expectedFileFormat) {
	return (fileName.length < expectedFileFormat.length) ?
			false : fileName.substring(fileName.length-expectedFileFormat.length) === expectedFileFormat;
}


/**
 *	API to download a file with name - 'fileName' having text - 'text'.
 *  See - https://stackoverflow.com/a/18197341/5928129 for more.
 */
function download(filename, text) {
		let elem = document.createElement('a');
		elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		elem.setAttribute('download', filename);
		elem.style.display = 'none';
		document.body.appendChild(elem);
		elem.click();
		document.body.removeChild(elem);
}


function removeLeadingAndTrailingWhitespaces(input) {
		let startIndex = 0;
		while (startIndex < input.length && input[startIndex] === ' ') {
			startIndex++;
		}
		let endIndex = input.length - 1;
		while(endIndex >= 0 &&  input[endIndex] === ' ') {
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
			// debugger;
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
		setInterval(function() {
			updateGraph()
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
		this.intervalPromise_ = this.intervalService_((function() {
			this.httpService_.get('http://localhost:8080/analyze')
					 .then((function(response) {
							this.entropyOfCurrentWindow =
									this.getEntropy_(
											response.data.countObj.countOfA - this.countOfA,
											response.data.countObj.countOfT - this.countOfT,
											response.data.countObj.countOfG - this.countOfG,
											response.data.countObj.countOfC - this.countOfC);
							this.countOfA = response.data.countObj.countOfA;
							this.countOfT = response.data.countObj.countOfT;
							this.countOfG = response.data.countObj.countOfG;
							this.countOfC = response.data.countObj.countOfC;
						if (response.data.statusCode === 'x') {
								this.showEntropy = true;
								this.entropy =
										this.getEntropy_(this.countOfA, this.countOfT, this.countOfG, this.countOfC);
								this.intervalService_.cancel(this.intervalPromise_);
								this.intervalService_.cancel(this.pieChartIntervalPromise_);
							}
					 }).bind(this), function(error) {});
		}).bind(this), 10);
};


/**
 * Reset the variables in the tool to provide ability to the users to
 * start another task by halting an already-running task.
 *
 * @private
 */
MyController.prototype.reset_ = function() {
		// Variables required for analyzing the entropy starts here.
		this.countOfA = 0;
		this.countOfT = 0;
		this.countOfG = 0;
		this.countOfC = 0;
		this.showAnalysis = false;
		this.showEntropy = false;
		this.entropyOfCurrentWindow = 0;
		// Variables required for analyzing the entropy ends here.
		
		// Variables required for format conversion starts here.
		this.startConversionToFasta = false;
		this.startConversionToFastq = false;
		// Variables required for format conversion ends here.
		
		// Variables required for alpha-diversity related computation starts here.
		this.shouldShowSamples = false;
		// Contains the final mean and standard-deviation and is of the format -
		// {mean: 'XXX' /**string*/, standardDeviation: 'YYY' /**string*/}
		this.resultantMeanAndStandardDeviation = {
			mean: '_',
			standardDeviation: '_'
		}
};

/**
 * @typedef {Object} MeanAndStandardDeviation
 * @property {string} mean The mean.
 * @property {string} standardDeviation The standard deviation.
 */

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
				standardDeviation: standardDeviation.toString()		
			};		
		} else {
			this.resultantMeanAndStandardDeviation = {
				mean: '_',
				standardDeviation: '_'
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
		let request = new XMLHttpRequest();
		request.open('GET', 'https://app.onecodex.com/api/v1/samples', true);
		request.setRequestHeader('Authorization', 'Basic ' + btoa(removeLeadingAndTrailingWhitespaces(this.apiKey) + ':'));
		request.onload = (function () {
			let response = JSON.parse(request.responseText);
			if (request.status === 401) {
				alert('Wrong credentials!');
			} else {
				this.samples = JSON.parse(request.responseText);
				for (let i=0; i<this.samples.length; i++) {
					this.samples[i].alphaDiversity = '_';
					this.samples[i].alphaDiversityComputationStatus = {
						started: false,
						completed: false
					};
				}
				this.shouldShowSamples = true;
				this.scope_.$digest();
			}
		}).bind(this);
		request.send();
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
			completed: false
		};
		if (!sample.orderOfDiversity) {
			alert('Please specify a valid order of diversity!');
		} else {
			sample.alphaDiversityComputationStatus.started = true;
			let query = 'apiKey=' + removeLeadingAndTrailingWhitespaces(this.apiKey) + '&' + 'sampleId=' +
									sample.primary_classification.$ref.substring(24) +
									'&' + 'orderOfDiversity=' + (+removeLeadingAndTrailingWhitespaces(sample.orderOfDiversity));
			// Carry out the time-consuming computations in the server-side to 
			// avoid freezing of the browser/destop application.
			let url = 'http://localhost:8080/compute-alpha-diversity?' + query;
			this.httpService_.get(url)
						.then((function(response) {
							if (response.data === 'x') {
								alert('Sorry, internal server error!');
							} else {
								sample.alphaDiversityComputationStatus.completed = true;
								sample.alphaDiversity = response.data;
								this.computeMeanAndStandardDeviationOfSelectedSamples_();
							}
						}).bind(this), function(error) {});					
		}
};


angular
				.module('myApp', [])
				.controller('MyController', ['$scope', '$document', '$http', '$interval', MyController])
				.directive('filePicker', function($http, $interval) {
						return {
							link: function(scope, elem, attr, ctrl) {
								elem.on('change', function() {
									scope.myCtrl.reset_();
									let fileName = elem[0].files[0].name;
									scope.myCtrl.fileName = fileName;
									switch (elem[0].id) {
										case 'fileInputAnalyze':
											if (isFileHavingCorrectFormat(fileName, '.fastq') === false &&
													isFileHavingCorrectFormat(fileName, '.fasta') === false) {
												alert('Please upload a FASTQ/FASTA file');
												break;
											}
											scope.myCtrl.showAnalysis = true;
											scope.$apply();	// Placing scope.$apply() to update the view even if removing it works fine.
											$interval.cancel(scope.myCtrl.intervalPromise_);
											$interval.cancel(scope.myCtrl.pieChartIntervalPromise_);
											$http.post(
												'http://localhost:8080/analyze',
												{name: fileName},
												{headers: {'Content-Type': 'application/json', 'Authorization': 'Basic '}})
												.then(function() {
													scope.myCtrl.process_(fileName);
												}, function(error) {})
												.catch(function() {});
												break;
										case 'fileInputConvertToFasta':
											scope.$apply();
											if (isFileHavingCorrectFormat(fileName, '.fastq') === false) {
												alert('Please upload a FASTQ file');
												break;
											}
											scope.myCtrl.startConversionToFasta = true;
											scope.$apply();
											$http.post(
												'http://localhost:8080/convert-to-fasta',
												{name: fileName},
												{headers: {'Content-Type': 'application/json', 'Authorization': 'Basic '}})
												.then(function(response) {
													download(fileName.substring(0, fileName.length-6) + '.fasta', response.data);
													scope.myCtrl.startConversionToFasta = false;
												}, function(error) {})
												.catch(function() {});
											break;
										case 'fastaFileUploader':
											scope.$apply();
											if (isFileHavingCorrectFormat(fileName, '.fasta') === false) {
												alert('Please upload a FASTA file');
												break;
											}
											scope.myCtrl.fastaFileName = fileName;
											if (scope.myCtrl.qualFileName !== undefined) {
												// Keep this code in sync with - case 'qualFileUploader'.
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
														download(scope.myCtrl.fastaFileName.substring(0, scope.myCtrl.fastaFileName.length-6) + '.fastq', response.data);
														scope.myCtrl.startConversionToFastq = false;
													}, function(error) {})
													.catch(function() {});
											}
											break;
										case 'qualFileUploader':
											scope.$apply();
											if (isFileHavingCorrectFormat(fileName, '.qual') === false) {
												alert('Please upload a QUAL file');
												break;
											}
											scope.myCtrl.qualFileName = fileName;
											if (scope.myCtrl.fastaFileName !== undefined) {
												// Keep this code in sync with - case 'fastaFileUploader'.
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
														download(scope.myCtrl.fastaFileName.substring(0, scope.myCtrl.fastaFileName.length-6) + '.fastq', response.data);
														scope.myCtrl.startConversionToFastq = false;
													}, function(error) {})
													.catch(function() {});
											}
											break;
									}
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
						}
					};
				})
				.directive('checkboxMeanAndStandardDeviationTrigger', function() {
					return {
						link: function(scope, elem, attr, ctrl) {
							elem.on('change', function() {
								scope.myCtrl.computeMeanAndStandardDeviationOfSelectedSamples_();	
								scope.$apply();
							});
						}
					};
				});
