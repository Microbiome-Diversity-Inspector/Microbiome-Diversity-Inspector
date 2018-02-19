angular
	.module('microbiomeDiversityInspector')
	.component('fastaToFastqConversion', {
		controller: 'FastaToFastqConversionCtrl',
		controllerAs: 'fastaToFastqConversionCtrl',
		templateUrl: 'app/components/fasta-to-fastq-conversion/fasta-to-fastq-conversion.html'
	})
	.directive('fastaToFastqConversionFilePicker', ['$http', 'inputValidationService',
		function($http, inputValidationService) {
			return {
				link: function(scope, elem) {
					elem.on('change', function() {
						let convertToFastq = function(fileName) {
							let isFastaFilePicker = (elem[0].id === 'fastaFileUploader');
							scope.fastaToFastqConversionCtrl.resetFastaToFastqConversionVariables_();
							scope.$apply();
							if (isFastaFilePicker === true &&
									inputValidationService.isFileHavingCorrectFormat(fileName, '.fasta') === false) {
								alert('Please upload a FASTA file');
							}
							else if (isFastaFilePicker === false &&
									inputValidationService.isFileHavingCorrectFormat(fileName, '.qual') === false) {
								alert('Please upload a QUAL file');
							}	else {
								if (isFastaFilePicker === true) {
									scope.fastaToFastqConversionCtrl.fastaFileName = fileName;									
								} else {
									scope.fastaToFastqConversionCtrl.qualFileName = fileName;
								}
								if ((isFastaFilePicker === true &&
										scope.fastaToFastqConversionCtrl.qualFileName !== undefined) ||
										(isFastaFilePicker === false &&
										scope.fastaToFastqConversionCtrl.fastaFileName !== undefined)) {
									scope.fastaToFastqConversionCtrl.fileName =
											scope.fastaToFastqConversionCtrl.fastaFileName;
									scope.fastaToFastqConversionCtrl.startConversionToFastq = true;
									scope.$apply();
									$http.post(
										'http://localhost:8080/convert-to-fastq',
										{
											fastaFileName: scope.fastaToFastqConversionCtrl.fastaFileName,
											qualFileName: scope.fastaToFastqConversionCtrl.qualFileName,
										},
										{headers: {'Content-Type': 'application/json', 'Authorization': 'Basic '}})
										.then(function(response) {
											scope.fastaToFastqConversionCtrl.fastaFileName = undefined;
											scope.fastaToFastqConversionCtrl.qualFileName = undefined;
											scope.fastaToFastqConversionCtrl.startConversionToFastq = false;
											if (response.data === true) {
												alert('File downloaded! Please check the uploaded file\'s directory.');										
											} else {
												alert('Sorry, unable to convert the uploaded file!\n' + 
															'Please check if the uploaded file is inside the directory - ' +
															'\'Microbiome-Diversity-Inspector\'');
											}
										}, function(error) {
											scope.fastaToFastqConversionCtrl.startConversionToFastq = false;
											// Don't alert the user, since the user might want to forcefully kill the
											// current conversion task by refreshing the page.									
										})
										.catch(function() {});
								}												
							}						
						};
						convertToFastq(elem[0].files[0].name);
						elem.val(null);
					});
				},
			};
	}]);	