function AlphaDiversityComputationCtrl($window, $document, $scope, $http, inputValidationService) {
	this.apiKey;
	this.samples;
	
	this.$onInit = (function() {
		this.window_ = $window;
		this.document_ = $document;
		this.scope_ = $scope;
		this.httpService_ = $http;
		this.inputValidationService_ = inputValidationService;
		this.resetAlphaDiversityComputationVariables_();
	}).bind(this);	
}


/**
 * Reset all the variables of the 'Compute Alpha-diversity' service.
 *
 * @private
 */
AlphaDiversityComputationCtrl.prototype.resetAlphaDiversityComputationVariables_ = function() {
	// Variables required for alpha-diversity related computation starts here.
	this.shouldShowSamples = false;
	this.shouldShowLoaderWhileRetrievingSamples = false;
	// Contains the final mean and standard-deviation and is of the format -
	// {mean: 'XXX' /**string*/, standardDeviation: 'YYY' /**string*/}
	this.resultantMeanAndStandardDeviation = {
		mean: '_',
		standardDeviation: '_',
	};
};


/**
 * Computes the mean and standard deviation (calculated using Bessel's correction as
 * mentioned here - https://en.wikipedia.org/wiki/Bessel%27s_correction) of all the
 * selected samples.
 *
 * @private
 */
AlphaDiversityComputationCtrl.prototype.computeMeanAndStandardDeviationOfSelectedSamples_ =
	function() {
		let selectedSamples = [];
		for (let i=0; i<this.samples.length; i++) {
			if (this.samples[i].isIncluded && this.samples[i].isIncluded.value === true) {
				selectedSamples.push(this.samples[i]);
			}
		}
		// This variable is set to true if the alpha diversity of one or more than one selected
		// sample(s) is/are still getting computed in the server OR if none of the sample is
		// selected by default. In that case, the user will be shown '_' as the value of the
		// mean and standard deviation.
		let invalidComputation = false;
		if (selectedSamples.length === 0) {
			invalidComputation = true;
		}
		let sum = 0;
		for (let i=0; i<selectedSamples.length; i++) {
			if (selectedSamples[i].alphaDiversity === '_') {
				invalidComputation = true;
				break;
			} else {
				// Convert the alpha diversity from string to number.
				sum += +selectedSamples[i].alphaDiversity;
			}
		}
		if (invalidComputation === false) {
			let mean = sum/selectedSamples.length;
			let standardDeviationInnerSum = 0;
			for (let i=0; i<selectedSamples.length; i++) {
				standardDeviationInnerSum += Math.pow(+selectedSamples[i].alphaDiversity - mean, 2);
			}
			let standardDeviation =
						Math.pow(
								standardDeviationInnerSum/(selectedSamples.length === 1 ?
																						1 : selectedSamples.length - 1),
								0.5);
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
 * Shows all the samples uploaded by the user having the input API Key.
 */
AlphaDiversityComputationCtrl.prototype.showSamples = function() {
	this.shouldShowLoaderWhileRetrievingSamples = true;
	this.httpService_.get(
		'https://app.onecodex.com/api/v1/samples',
		{
			headers:
			{
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + this.window_.btoa(
												 this.inputValidationService_.removeLeadingAndTrailingWhitespaces(
														this.apiKey) + ':')
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
			this.shouldShowLoaderWhileRetrievingSamples = false;
			this.scope_.$digest();
		}).bind(this), (function(error) {
			this.window_.alert('Wrong credentials!');
			this.shouldShowLoaderWhileRetrievingSamples = false;
		}).bind(this))
		.catch(function() {});	
};


/**
 *  Toggles the visibility of input API Key.
 */
AlphaDiversityComputationCtrl.prototype.toggleVisibility = function() {
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
 *																							  Note that samples will not have a
 * 																								primary_classification while they are still 
 * 																								importing or being uploaded.
 *                                                It has the following format -
 *																								{$ref: '/api/v1/classifications/SAMPLE_ID'}
 * @param {string} sample.orderOfDiversity Denoted by 'q', it is an important factor in determining
 *																				 the weight assigned to a species.
 * @param {string} sample.alphaDiversity  The alpha diversity of the sample.
 * @param {Object} sample.alphaDiversityComputationStatus  Has two properties - 'started' and
 *																												 'completed' denoting whether the 
 *																												 computation has started or not and
 *																												 whether the computation is finished
 *																												 or not.
 */
AlphaDiversityComputationCtrl.prototype.computeAlphaDiversity = function(sample) {
	// Refresh the alpha-diversity computation status and alpha-diversity.
	sample.alphaDiversity = '_';
	sample.alphaDiversityComputationStatus = {
		started: false,
		completed: false,
	};
	if (!sample.orderOfDiversity) {
		this.window_.alert('Please specify a valid order of diversity!');
	} else {
		sample.alphaDiversityComputationStatus.started = true;
		let query = 'apiKey=' +
								this.inputValidationService_.removeLeadingAndTrailingWhitespaces(this.apiKey) +
								'&' + 'sampleId=' + sample.primary_classification.$ref.substring(24) + '&' +
								'orderOfDiversity=' +
								(+this.inputValidationService_.removeLeadingAndTrailingWhitespaces(
										sample.orderOfDiversity));
		// Carry out the time-consuming computations in the server-side to
		// avoid freezing of the browser/desktop application.
		let alphaDiversityComputationUrl = 'http://localhost:8080/compute-alpha-diversity?' + query;
		this.httpService_.get(alphaDiversityComputationUrl)
			.then((function(response) {
				if (response.data === 'x') {
					// This is an error from One Codex server.
					this.window_.alert('Internal server error!');
				} else {
					sample.alphaDiversityComputationStatus.completed = true;
					sample.alphaDiversity = response.data;
					this.computeMeanAndStandardDeviationOfSelectedSamples_();
				}
			}).bind(this), (function(error) {
				// Alert the user since even after a page refresh, unlike as in entropy
				// analysis, this error will not be fired due to the asynchronous nature
				// of this operation.
				this.window_.alert('Internal server error!');
			}).bind(this));
	}
};


angular
	.module('microbiomeDiversityInspector')
	.controller('AlphaDiversityComputationCtrl', [
			'$window',
			'$document',
			'$scope', 
			'$http',
			'inputValidationService',
			AlphaDiversityComputationCtrl]);
