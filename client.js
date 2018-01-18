function MyController($document, $http, $interval) {
	this.selectedCityUrlPrefix;
	this.accessionNumber;
	this.$onInit = (function() {
		this.cities = [
		{
			name: 'New York',
			urlPrefix: 'http://ala.boku.ac.at/camda2017/MetaSUB/NY/data/'
		},
		{
			name: 'Boston',
			urlPrefix: 'http://ala.boku.ac.at/camda2017/MetaSUB/Boston/data/'
		},
		{
			name: 'Sacramento',
			urlPrefix: 'http://ala.boku.ac.at/camda2017/MetaSUB/Sacramento/data/'
		}];		
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
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}				


/**
 * Refresh the graph between entropy of partitioned blocks of DNA and time.
 * 
 * @private
 */	
MyController.prototype.refreshEntropyGraph_ = function() {
		var dps = []; // dataPoints
		var chart = new CanvasJS.Chart("chartContainer", {
			title :{
				text: "Entropy (of continuous chunks)   vs   Time",
				fontColor: "#2f4f4f",
				fontSize: 30,
				padding: 10,
				margin: 15,
				backgroundColor: "#FFFFE0",
				borderThickness: 1,
				cornerRadius: 5						
			},     
			axisY: {
				includeZero: false
			},      						
			data: [{
				type: "line",
				dataPoints: dps
			}]
		});
		var xVal = 0;
		var updateInterval = 500;
		var dataLength = 20; // number of dataPoints visible at any point

		var updateGraph = (function (count) {
			// Stop updating the chart once the whole file is analyzed.
			if (this.showEntropy === true) {
				return;
			}
			count = count || 1;
			//debugger;
			for (var j = 0; j < count; j++) {
				dps.push({
					x: xVal,
					y: this.entropyOfCurrentWindow
				});
				xVal++;
			}
			if (dps.length > dataLength) {
				dps.shift();
			}
			chart.render();
		}).bind(this);
		updateGraph(dataLength);
		setInterval(function(){updateGraph()}, updateInterval);
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
MyController.prototype.getEntropy_ = function(countOfA, countOfT, countOfG, countOfC) {
	var totalCount = countOfA + countOfT + countOfG + countOfC;
	if (totalCount === 0) {
		return 0;
	}
	var probabilityOfA = countOfA / totalCount;
	var probabilityOfT = countOfT / totalCount;
	var probabilityOfG = countOfG / totalCount;
	var probabilityOfC = countOfC / totalCount;
	var entropy = -1 * (
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
MyController.prototype.process_ = function (fileName) {
		this.refreshEntropyGraph_();					
		this.intervalPromise_ = this.intervalService_((function() {
			this.httpService_.get('http://localhost:8080/analyze')
					 .then ((function (response) {
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
}


/**
 * Sends a FTP request to download the required MetaSum data.
 */						 
MyController.prototype.downloadMetaSubData = function() {
		alert("Enter the below details to download the required file-\nUsername- 'CAMDA', Password- 'Pivo'");
		window.open(this.selectedCityUrlPrefix + this.accessionNumber + '.fastq.dsrc');
};


angular
				.module('myApp', [])
				.controller('MyController', ['$document', '$http', '$interval', MyController])
				.directive('filePicker', function($http, $interval) {
						return  {
							link: function(scope, elem, attr, ctrl) {
								elem.on('change', function() {
									scope.myCtrl.reset_();
									var fileName = elem[0].files[0].name;
									scope.myCtrl.fileName = fileName;
									switch(elem[0].id) {
										case 'fileInputAnalyze':
											if (isFileHavingCorrectFormat(fileName, ".fastq") === false &&
													isFileHavingCorrectFormat(fileName, ".fasta") === false) {
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
											if (isFileHavingCorrectFormat(fileName, ".fastq") === false) {
												alert('Please upload a FASTQ file');
												break;
											}
											scope.myCtrl.startConversionToFasta = true;
											scope.$apply();
											$http.post(
												'http://localhost:8080/convertToFasta',
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
											if (isFileHavingCorrectFormat(fileName, ".fasta") === false) {
												alert('Please upload a FASTA file');
												break;
											}
											scope.myCtrl.fastaFileName = fileName;
											if (scope.myCtrl.qualFileName !== undefined) {
												// Keep this code in sync with - case 'qualFileUploader'.
												scope.myCtrl.startConversionToFastq = true;
												scope.$apply();
												$http.post(
													'http://localhost:8080/convertToFastq',
													{
														fastaFileName: scope.myCtrl.fastaFileName,
														qualFileName: scope.myCtrl.qualFileName
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
											if (isFileHavingCorrectFormat(fileName, ".qual") === false) {
												alert('Please upload a QUAL file');
												break;
											}
											scope.myCtrl.qualFileName = fileName;
											if (scope.myCtrl.fastaFileName !== undefined) {
												// Keep this code in sync with - case 'fastaFileUploader'.
												scope.myCtrl.startConversionToFastq = true;
												scope.$apply();
												$http.post(
													'http://localhost:8080/convertToFastq',
													{
														fastaFileName: scope.myCtrl.fastaFileName,
														qualFileName: scope.myCtrl.qualFileName
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
							}
						};
				});
