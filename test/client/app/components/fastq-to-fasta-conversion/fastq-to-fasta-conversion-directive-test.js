describe('Unit tests for directives of fastqToFastaConversion', function() {
	
	beforeEach(angular.mock.module('microbiomeDiversityInspector'));

	let $rootScope, $compile, windowService, inputValidationService;
	
	beforeEach(inject(function(
			_$rootScope_, _$compile_, _$controller_, _$window_, _inputValidationService_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_.$new();
		$rootScope.fastqToFastaConversionCtrl =
				_$controller_('FastqToFastaConversionCtrl', {$scope: {$rootScope}});
		windowService = _$window_;
		inputValidationService = _inputValidationService_;
	}));
	
	describe('fastqToFastaConversionFilePicker', function() {
		beforeEach(function() {
			spyOn($rootScope.fastqToFastaConversionCtrl, 'resetFastqToFastaConversionVariables_');
			spyOn(windowService, 'alert');
			spyOn($rootScope, '$apply');
		});
		
		afterEach(function() {
			expect($rootScope.fastqToFastaConversionCtrl.resetFastqToFastaConversionVariables_).toHaveBeenCalled();
			expect($rootScope.$apply).toHaveBeenCalled();
			// By this point the variable - 'filePickerElem' would have been bound to the controller
			// since the control reaches this function after being compiled explicitly through '$compile'
			// function in each of the 'it' specs.
			expect($rootScope.fastqToFastaConversionCtrl.filePickerElem.val).toHaveBeenCalledWith(null);
		});
		
		it('should alert if a non FASTQ file is uploaded', function() {
			let compiledElement =
					$compile('<input type="file" environment="test" file-name="samplename.sampleextension" fastq-to-fasta-conversion-file-picker/>')($rootScope);	
			spyOn(inputValidationService, 'isFileHavingCorrectFormat').and.returnValue(false);
			spyOn($rootScope.fastqToFastaConversionCtrl.filePickerElem, 'val');
			$rootScope.$digest();
			compiledElement.triggerHandler('change');
			expect(windowService.alert).toHaveBeenCalledWith('Please upload a FASTQ file');
		});

		describe('when a valid FASTQ file is uploaded', function() {			
			let httpMock;
			let compiledElement;
			
			beforeEach(inject(function(_$httpBackend_) {
				httpMock = _$httpBackend_;
				spyOn(inputValidationService, 'isFileHavingCorrectFormat').and.returnValue(true);
				compiledElement =
						$compile('<input type="file" environment="test" file-name="sample_fastq.fastq" fastq-to-fasta-conversion-file-picker/>')($rootScope);	
				$rootScope.$digest();						
				spyOn($rootScope.fastqToFastaConversionCtrl.filePickerElem, 'val');
			}));				
							
			afterEach(function() {
				httpMock.verifyNoOutstandingExpectation();
				httpMock.verifyNoOutstandingRequest();
				expect($rootScope.$apply).toHaveBeenCalled();
				expect($rootScope.fastqToFastaConversionCtrl.fileName).toBe('sample_fastq.fastq');
				expect($rootScope.fastqToFastaConversionCtrl.startConversionToFasta).toBe(false);
			});
			
			it('should not start the conversion in case of an internal server error', function() {
				httpMock.expectPOST(
						'http://localhost:8080/convert-to-fasta',
						{fileName: 'sample_fastq.fastq'})
						.respond(502);
				compiledElement.triggerHandler('change');
				httpMock.flush();
			});
			
			it('should start the conversion and alert about success after successful download of ' +
				 'the converted file', function() { 
					httpMock.expectPOST(
							'http://localhost:8080/convert-to-fasta',
							{fileName: 'sample_fastq.fastq'})
							.respond(200, true);
					compiledElement.triggerHandler('change');
					httpMock.flush();
					expect(windowService.alert).toHaveBeenCalledWith(
							'File downloaded! Please check the uploaded file\'s directory.');
			});
			
			it('should start the conversion and alert about failure of the conversion' +
				 'downloaded successfully', function() { 
					httpMock.expectPOST(
							'http://localhost:8080/convert-to-fasta',
							{fileName: 'sample_fastq.fastq'})
							.respond(200, false);
					compiledElement.triggerHandler('change');
					httpMock.flush();
					expect(windowService.alert).toHaveBeenCalledWith(
							'Sorry, unable to convert the uploaded file!\n' + 
							'Please check if the uploaded file is inside the directory - ' +
							'\'Microbiome-Diversity-Inspector\'');
			});					
		});
	});
});