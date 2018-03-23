describe('Unit tests for directives of fastaToFastqConversion', function() {
	
	beforeEach(angular.mock.module('microbiomeDiversityInspector'));

	let $rootScope, $compile, windowService, inputValidationService;
	
	beforeEach(inject(function(
			_$rootScope_, _$compile_, _$controller_, _$window_, _inputValidationService_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_.$new();
		$rootScope.fastaToFastqConversionCtrl =
				_$controller_('FastaToFastqConversionCtrl', {$scope: {$rootScope}});
		windowService = _$window_;
		inputValidationService = _inputValidationService_;
	}));
	
	describe('fastaToFastqConversionFilePicker', function() {
		beforeEach(function() {
			spyOn($rootScope.fastaToFastqConversionCtrl, 'resetFastaToFastqConversionVariables_');
			spyOn(windowService, 'alert');
			spyOn($rootScope, '$apply');
		});
		
		afterEach(function() {
			expect($rootScope.fastaToFastqConversionCtrl.resetFastaToFastqConversionVariables_).toHaveBeenCalled();
			expect($rootScope.$apply).toHaveBeenCalled();
			// By this point the variable - 'filePickerElem' would have been bound to the controller
			// since the control reaches this function after being compiled explicitly through '$compile'
			// function in each of the 'it' specs.
			expect($rootScope.fastaToFastqConversionCtrl.filePickerElem.val).toHaveBeenCalledWith(null);
		});
		
		it('should alert if a non FASTA file is uploaded through a FASTA file uploader', function() {
			let compiledElement =
					$compile('<input type="file" id="fastaFileUploader" environment="test" file-name="samplename.sampleextension" fasta-to-fastq-conversion-file-picker/>')($rootScope);	
			spyOn(inputValidationService, 'isFileHavingCorrectFormat').and.returnValue(false);
			spyOn($rootScope.fastaToFastqConversionCtrl.filePickerElem, 'val');
			$rootScope.$digest();
			compiledElement.triggerHandler('change');
			expect(windowService.alert).toHaveBeenCalledWith('Please upload a FASTA file');
		});

		it('should alert if a non QUAL file is uploaded through a QUAL file uploader', function() {
			let compiledElement =
					$compile('<input type="file" id="qualFileUploader" environment="test" file-name="samplename.sampleextension" fasta-to-fastq-conversion-file-picker/>')($rootScope);	
			spyOn(inputValidationService, 'isFileHavingCorrectFormat').and.returnValue(false);
			spyOn($rootScope.fastaToFastqConversionCtrl.filePickerElem, 'val');
			$rootScope.$digest();
			compiledElement.triggerHandler('change');
			expect(windowService.alert).toHaveBeenCalledWith('Please upload a QUAL file');
		});
		
		describe('when correct file(s) are uploaded through the right upload option(s)', function() {
			describe('but the conversion process is not initiated due to the lack of both the files', function() {
				it('should set the uploaded FASTA file name but should not start conversion if QUAL file has not been uploaded',
					function() {
						let compiledElement =
								$compile('<input type="file" id="fastaFileUploader" environment="test" file-name="samplename.sampleextension" fasta-to-fastq-conversion-file-picker/>')($rootScope);	
						$rootScope.fastaToFastqConversionCtrl.qualFileName = undefined;
						spyOn(inputValidationService, 'isFileHavingCorrectFormat').and.returnValue(true);
						spyOn($rootScope.fastaToFastqConversionCtrl.filePickerElem, 'val');
						$rootScope.$digest();
						compiledElement.triggerHandler('change');
						expect($rootScope.fastaToFastqConversionCtrl.fastaFileName).toBe('samplename.sampleextension');
						expect($rootScope.fastaToFastqConversionCtrl.startConversionToFastq).not.toBe(true);
					});

				it('should set the uploaded QUAL file name but should not start conversion if FASTA file has not been uploaded',
					function() {
						let compiledElement =
								$compile('<input type="file" id="qualFileUploader" environment="test" file-name="samplename.sampleextension" fasta-to-fastq-conversion-file-picker/>')($rootScope);	
						$rootScope.fastaToFastqConversionCtrl.fastaFileName = undefined;
						spyOn(inputValidationService, 'isFileHavingCorrectFormat').and.returnValue(true);
						spyOn($rootScope.fastaToFastqConversionCtrl.filePickerElem, 'val');
						$rootScope.$digest();
						compiledElement.triggerHandler('change');
						expect($rootScope.fastaToFastqConversionCtrl.qualFileName).toBe('samplename.sampleextension');
						expect($rootScope.fastaToFastqConversionCtrl.startConversionToFastq).not.toBe(true);
					});
			});
						
			
			describe('and the conversion process is initiated after both the files are uploaded', function() {
				let httpMock;
				
				beforeEach(inject(function(_$httpBackend_) {
					httpMock = _$httpBackend_;
					spyOn(inputValidationService, 'isFileHavingCorrectFormat').and.returnValue(true);
				}));				
								
				afterEach(function() {
					httpMock.verifyNoOutstandingExpectation();
					httpMock.verifyNoOutstandingRequest();
					expect($rootScope.$apply).toHaveBeenCalled();
				});
				
				describe('with the FASTA file being the last one to get uploaded', function() {
					let compiledElement;
					
					beforeEach(function() {
						compiledElement =
								$compile('<input type="file" id="fastaFileUploader" environment="test" file-name="sample_fasta.fasta" fasta-to-fastq-conversion-file-picker/>')($rootScope);	
						spyOn($rootScope.fastaToFastqConversionCtrl.filePickerElem, 'val');
						$rootScope.fastaToFastqConversionCtrl.qualFileName = 'sample_qual.qual';
						$rootScope.$digest();						
					});
					
					afterEach(function() {
						expect($rootScope.fastaToFastqConversionCtrl.fileName).toBe('sample_fasta.fasta');
						expect($rootScope.fastaToFastqConversionCtrl.startConversionToFastq).toBe(false);
					});
					
					it('should not start the conversion in case of an internal server error', function() {
						httpMock.expectPOST(
								'http://localhost:8080/convert-to-fastq',
								{
									fastaFileName: 'sample_fasta.fasta',
									qualFileName: 'sample_qual.qual'
								}).respond(502);
						compiledElement.triggerHandler('change');
						httpMock.flush();
					});
					
					it('should start the conversion and alert about success after successful download of ' +
						 'the converted file', function() { 
							httpMock.expectPOST(
									'http://localhost:8080/convert-to-fastq',
									{
										fastaFileName: 'sample_fasta.fasta',
										qualFileName: 'sample_qual.qual'
									}).respond(200, true);
							compiledElement.triggerHandler('change');
							httpMock.flush();
							expect($rootScope.fastaToFastqConversionCtrl.fastaFileName).toBe(undefined);
							expect($rootScope.fastaToFastqConversionCtrl.qualFileName).toBe(undefined);
							expect(windowService.alert).toHaveBeenCalledWith(
									'File downloaded! Please check the uploaded file\'s directory.');
					});
					
					it('should start the conversion and alert about failure of the conversion' +
						 'downloaded successfully', function() { 
							httpMock.expectPOST(
									'http://localhost:8080/convert-to-fastq',
									{
										fastaFileName: 'sample_fasta.fasta',
										qualFileName: 'sample_qual.qual'
									}).respond(200, false);
							compiledElement.triggerHandler('change');
							httpMock.flush();
							expect($rootScope.fastaToFastqConversionCtrl.fastaFileName).toBe(undefined);
							expect($rootScope.fastaToFastqConversionCtrl.qualFileName).toBe(undefined);
							expect(windowService.alert).toHaveBeenCalledWith(
									'Sorry, unable to convert the uploaded file!\n' + 
									'Please check if the uploaded file is inside the directory - ' +
									'\'Microbiome-Diversity-Inspector\'');
					});					
				});
				
				describe('with the QUAL file being the last one to get uploaded', function() {
					let compiledElement;
					
					beforeEach(function() {
						compiledElement =
								$compile('<input type="file" id="qualFileUploader" environment="test" file-name="sample_qual.qual" fasta-to-fastq-conversion-file-picker/>')($rootScope);	
						spyOn($rootScope.fastaToFastqConversionCtrl.filePickerElem, 'val');
						$rootScope.fastaToFastqConversionCtrl.fastaFileName = 'sample_fasta.fasta';
						$rootScope.$digest();						
					});
					
					afterEach(function() {
						expect($rootScope.fastaToFastqConversionCtrl.fileName).toBe('sample_fasta.fasta');
						expect($rootScope.fastaToFastqConversionCtrl.startConversionToFastq).toBe(false);
					});
					
					it('should not start the conversion in case of an internal server error', function() {
						httpMock.expectPOST(
								'http://localhost:8080/convert-to-fastq',
								{
									fastaFileName: 'sample_fasta.fasta',
									qualFileName: 'sample_qual.qual'
								}).respond(502);
						compiledElement.triggerHandler('change');
						httpMock.flush();
					});
					
					it('should start the conversion and alert about success after successful download of ' +
						 'the converted file', function() { 
							httpMock.expectPOST(
									'http://localhost:8080/convert-to-fastq',
									{
										fastaFileName: 'sample_fasta.fasta',
										qualFileName: 'sample_qual.qual'
									}).respond(200, true);
							compiledElement.triggerHandler('change');
							httpMock.flush();
							expect($rootScope.fastaToFastqConversionCtrl.fastaFileName).toBe(undefined);
							expect($rootScope.fastaToFastqConversionCtrl.qualFileName).toBe(undefined);
							expect(windowService.alert).toHaveBeenCalledWith(
									'File downloaded! Please check the uploaded file\'s directory.');
					});
					
					it('should start the conversion and alert about failure of the conversion' +
						 'downloaded successfully', function() { 
							httpMock.expectPOST(
									'http://localhost:8080/convert-to-fastq',
									{
										fastaFileName: 'sample_fasta.fasta',
										qualFileName: 'sample_qual.qual'
									}).respond(200, false);
							compiledElement.triggerHandler('change');
							httpMock.flush();
							expect($rootScope.fastaToFastqConversionCtrl.fastaFileName).toBe(undefined);
							expect($rootScope.fastaToFastqConversionCtrl.qualFileName).toBe(undefined);
							expect(windowService.alert).toHaveBeenCalledWith(
									'Sorry, unable to convert the uploaded file!\n' + 
									'Please check if the uploaded file is inside the directory - ' +
									'\'Microbiome-Diversity-Inspector\'');
					});					
				});				
			});
		});
	});
});