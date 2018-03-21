angular
	.module('microbiomeDiversityInspector')
	.component('entropyAnalysis', {
		controller: 'EntropyAnalysisCtrl',
		controllerAs: 'entropyAnalysisCtrl',
		templateUrl: 'app/components/entropy-analysis/entropy-analysis.html'
	})
	.directive('entropyAnalysisFilePicker', ['$window', 'inputValidationService',
		function($window, inputValidationService) {
			return {
				link: function(scope, elem, attr) {
					let isTestEnvironment = attr.environment === 'test';
					// If this code is run as a part of a unit test, then bind the reference of this directive'savePreferences
					// element to an object in the controller in order to expose it for testing.
					if (isTestEnvironment) {
						scope.entropyAnalysisCtrl.filePickerElem = elem;
					}						
					elem.on('change', function() {
						// If this code is run as a part of unit test, then provide a dummy
						// file name, since due to security issues, it is not possibly to 
						// programmatically specify the file name.
						// See this for more - 
						//https://stackoverflow.com/questions/1017224/dynamically-set-value-of-a-file-input
						let fileName = (isTestEnvironment ? attr.fileName : elem[0].files[0].name);
						scope.entropyAnalysisCtrl.fileName = fileName;
						scope.entropyAnalysisCtrl.resetEntropyAnalysisVariables_();
						if (inputValidationService.isFileHavingCorrectFormat(fileName, '.fastq') === false &&
										inputValidationService.isFileHavingCorrectFormat(fileName, '.fasta')
										=== false) {
							$window.alert('Please upload a FASTQ/FASTA file');
						} else {
							scope.entropyAnalysisCtrl.showAnalysis = true;
							scope.$apply();	// Placing scope.$apply() to update the view even if removing it
															// works fine.
							scope.entropyAnalysisCtrl.process_(fileName);							
						}
						elem.val(null);
					});
				},
			};
	}]);	
