angular
	.module('microbiomeDiversityInspector')
	.component('fastqToFastaConversion', {
		controller: 'FastqToFastaConversionCtrl',
		controllerAs: 'fastqToFastaConversionCtrl',
		templateUrl: 'app/components/fastq-to-fasta-conversion/fastq-to-fasta-conversion.html'
	})
	.directive('fastqToFastaConversionFilePicker', ['$window', '$http', 'inputValidationService',
		function($window, $http, inputValidationService) {
			return {
				link: function(scope, elem, attr) {
					let isTestEnvironment = attr.environment === 'test';
					// If this code is run as a part of a unit test, then bind the reference of this
					// directive's element to an object in the controller in order to expose it for testing.
					if (isTestEnvironment) {
						scope.fastqToFastaConversionCtrl.filePickerElem = elem;
					}			
					elem.on('change', function() {
						let convertToFasta = function(fileName) {
							scope.fastqToFastaConversionCtrl.resetFastqToFastaConversionVariables_();
							scope.fastqToFastaConversionCtrl.fileName = fileName;
							scope.$apply();
							if (inputValidationService.isFileHavingCorrectFormat(fileName, '.fastq') === false) {
								$window.alert('Please upload a FASTQ file');
							} else {
								scope.fastqToFastaConversionCtrl.startConversionToFasta = true;
								scope.$apply();
								$http.post(
									'http://localhost:8080/convert-to-fasta',
									{fileName: fileName},
									{headers: {'Content-Type': 'application/json', 'Authorization': 'Basic '}})
									.then(function(response) {
										scope.fastqToFastaConversionCtrl.startConversionToFasta = false;
										if (response.data === true) {
											$window.alert('File downloaded! Please check the uploaded file\'s directory.');										
										} else {
											$window.alert('Sorry, unable to convert the uploaded file!\n' + 
														'Please check if the uploaded file is inside the directory - ' +
														'\'Microbiome-Diversity-Inspector\'');
										}
									}, function(error) {
										scope.fastqToFastaConversionCtrl.startConversionToFasta = false;
										// Don't alert the user, since the user might want to forcefully kill the 
										// current conversion task by refreshing the page.
									})
									.catch(function() {});							
							}
						};
						// If this code is run as a part of unit test, then provide a dummy
						// file name, since due to security issues, it is not possibly to 
						// programmatically specify the file name. See this for more - 
						// https://stackoverflow.com/questions/1017224/dynamically-set-value-of-a-file-input						
						convertToFasta(isTestEnvironment ? attr.fileName : elem[0].files[0].name);
						elem.val(null);
					});
				}
			};
	}]);	
