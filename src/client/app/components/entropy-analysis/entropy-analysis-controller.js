function EntropyAnalysisCtrl($http, $timeout, $interval) {
	
	this.$onInit = (function() {
		this.httpService_ = $http;		
		this.timeoutService_ = $timeout;
		this.intervalService_ = $interval;
		this.resetEntropyAnalysisVariables_();
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
function getEntropy(countOfA, countOfT, countOfG, countOfC) {
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
}


/**
 * Cancels all the timer-based (here - $timeout and $interval) promises.
 *
 * @private
 */
EntropyAnalysisCtrl.prototype.cancelAllTimerPromises_ = function() {
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
EntropyAnalysisCtrl.prototype.resetEntropyAnalysisVariables_ = function() {
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
};


/**
 * Refresh the graph between entropy of partitioned blocks of DNA and time.
 *
 * @private
 */
EntropyAnalysisCtrl.prototype.refreshEntropyGraph_ = function() {
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
 * Initiates the entropy analysis process.
 *
 * @private
 * @param {string} fileName The name of the file to analyze.
 */
EntropyAnalysisCtrl.prototype.process_ = function(fileName) {
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
								getEntropy(
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
									getEntropy(this.countOfA, this.countOfT, this.countOfG, this.countOfC);	
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


angular
	.module('microbiomeDiversityInspector')
	.controller('EntropyAnalysisCtrl', ['$http', '$timeout', '$interval', EntropyAnalysisCtrl]);