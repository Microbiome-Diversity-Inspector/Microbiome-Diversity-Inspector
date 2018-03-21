describe('Unit tests for directives of entropyAnalysis', function() {
	
	beforeEach(angular.mock.module('microbiomeDiversityInspector'));

	let $rootScope, $compile, windowService, inputValidationService;
	
	beforeEach(inject(function(
			_$rootScope_, _$compile_, _$controller_, _$window_, _inputValidationService_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_.$new();
		$rootScope.entropyAnalysisCtrl =
				_$controller_('EntropyAnalysisCtrl', {$scope: {$rootScope}});
		windowService = _$window_;
		inputValidationService = _inputValidationService_;
	}));
	
	describe('entropyAnalysisFilePicker', function() {
		let compiledElement;
		
		beforeEach(function() {
			compiledElement =
					$compile('<input type="file" environment="test" file-name="samplename.sampleextension" entropy-analysis-file-picker/>')($rootScope);	
			$rootScope.$digest();
			spyOn($rootScope.entropyAnalysisCtrl, 'resetEntropyAnalysisVariables_');				
			spyOn($rootScope.entropyAnalysisCtrl.filePickerElem, 'val');
		});
		
		afterEach(function() {
			expect($rootScope.entropyAnalysisCtrl.fileName).toBe('samplename.sampleextension');
			expect($rootScope.entropyAnalysisCtrl.resetEntropyAnalysisVariables_).toHaveBeenCalled();
			expect($rootScope.entropyAnalysisCtrl.filePickerElem.val).toHaveBeenCalledWith(null);
		});
			
		it('should alert if a non-FASTQ/A file is selected', function() {
			spyOn(windowService, 'alert');
			spyOn(inputValidationService, 'isFileHavingCorrectFormat').and.returnValue(false);
			compiledElement.triggerHandler('change');
			expect(windowService.alert).toHaveBeenCalledWith('Please upload a FASTQ/FASTA file');
		});
		
		it('should show and start the entropy analysis process', function() {
			spyOn(inputValidationService, 'isFileHavingCorrectFormat').and.returnValue(true);
			spyOn($rootScope, '$apply');
			spyOn($rootScope.entropyAnalysisCtrl, 'process_');
			compiledElement.triggerHandler('change');
			expect($rootScope.entropyAnalysisCtrl.showAnalysis).toBe(true);
			expect($rootScope.entropyAnalysisCtrl.process_).toHaveBeenCalledWith('samplename.sampleextension')
			expect($rootScope.$apply).toHaveBeenCalled();
		});
	});
});