angular
	.module('microbiomeDiversityInspector')
	.component('fastqToFastaConversion', {
		controller: 'FastqToFastaConversionCtrl',
		controllerAs: 'fastqToFastaConversionCtrl',
		templateUrl: 'app/components/fastq-to-fasta-conversion/fastq-to-fasta-conversion.html'
	})
	.directive('fastqToFastaConversionFilePicker', ['$http', 'inputValidationService',
		function($http, inputValidationService) {
			return {
				link: function(scope, elem) {
					elem.on('change', function() {
						let fileName = elem[0].files[0].name;
						scope.fastqToFastaConversionCtrl.resetFastqToFastaConversionVariables_();
						scope.fastqToFastaConversionCtrl.fileName = fileName;
						scope.$apply();
						if (inputValidationService.isFileHavingCorrectFormat(fileName, '.fastq') === false) {
							alert('Please upload a FASTQ file');
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
										alert('File downloaded! Please check the uploaded file\'s directory.');										
									} else {
										alert('Sorry, unable to convert the uploaded file!\n' + 
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
						elem.val(null);
					});
				},
			};
	}]);	