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
				link: function(scope, elem) {
					elem.on('change', function() {
						let fileName = elem[0].files[0].name;
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
