let util = require('./../../../../test-util.js');


describe('Unit tests for AlphaDiversityComputationCtrl', function() {
	
	beforeEach(angular.mock.module('microbiomeDiversityInspector'));
	
	let ctrl;
	let windowService;
	let documentService;
	let scope;
	let httpMock;
	let inputValidationService;
	let createSample = function(
			primaryClassificationRef,
			orderOfDiversity,
			alphaDiversity,
			alphaDiversityComputationStarted,
			alphaDiversityComputationCompleted,
			isIncluded) {
				return {
					primary_classification: {
						$ref: primaryClassificationRef
					},
					orderOfDiversity: orderOfDiversity,
					alphaDiversity: alphaDiversity,
					alphaDiversityComputationStatus: {
						started: alphaDiversityComputationStarted,
						completed: alphaDiversityComputationCompleted
					},
					isIncluded: {
						value: isIncluded
					}
				};
			};
	
	beforeEach(inject(function(
			_$controller_,
			_$window_,
			_$document_,
			_$rootScope_,
			_$httpBackend_,
			_inputValidationService_) {
		windowService = _$window_;
		documentService = _$document_;
		scope = _$rootScope_.$new();
		httpMock = _$httpBackend_;
		inputValidationService = _inputValidationService_;
		ctrl = _$controller_('AlphaDiversityComputationCtrl', {$scope: scope});
		spyOn(windowService, 'alert');
		spyOn(scope, '$digest');
	}));
	
	afterEach(function() {
    httpMock.verifyNoOutstandingExpectation();
    httpMock.verifyNoOutstandingRequest();
	});
	
	it('should initialize controller variables', function() {
		spyOn(ctrl, 'resetAlphaDiversityComputationVariables_');
		ctrl.$onInit();
		expect(ctrl.window_).toBe(windowService);
		expect(ctrl.document_).toBe(documentService);
		expect(ctrl.scope_).toBe(scope);
		expect(ctrl.inputValidationService_).toBe(inputValidationService);
		expect(ctrl.resetAlphaDiversityComputationVariables_).toHaveBeenCalled();
	});
	
	it('should reset alpha diversity computation variables', function() {
		ctrl.resetAlphaDiversityComputationVariables_();
		expect(ctrl.shouldShowSamples).toBe(false);
		expect(ctrl.shouldShowLoaderWhileRetrievingSamples).toBe(false);
		expect(ctrl.resultantMeanAndStandardDeviation).toEqual({
			mean: '_',
			standardDeviation: '_'
		});
	});
	
	describe('when computing mean and standard deviation in alpha diversity', function() {
		
		it('should show \'_\' if no sample is selected', function() {
			ctrl.samples = [];
			ctrl.computeMeanAndStandardDeviationOfSelectedSamples_();
			expect(ctrl.resultantMeanAndStandardDeviation).toEqual({
				mean: '_',
				standardDeviation: '_'
			});
		});
		
		it('should show \'_\' if one of the selected sample\'s alpha-diversity is not computed yet by the server',
			function() {
				ctrl.samples = [
					createSample(undefined, undefined, '_', undefined, undefined, true),
					createSample(undefined, undefined, '3.4', undefined, undefined, true)
				];
				ctrl.computeMeanAndStandardDeviationOfSelectedSamples_();
				expect(ctrl.resultantMeanAndStandardDeviation).toEqual({
					mean: '_',
					standardDeviation: '_'
				});
		});		

		it('should calculate the mean and standard-deviation of the selected samples',
			function() {
				ctrl.samples = [
					createSample(undefined, undefined, '5', undefined, undefined, true),
					createSample(undefined, undefined, '53434.5', undefined, undefined, true),
					createSample(undefined, undefined, '4.9', undefined, undefined, true),
					createSample(undefined, undefined, '4.85', undefined, undefined, true),
					createSample(undefined, undefined, '87.45', undefined, undefined, true),
					createSample(undefined, undefined, '23123312.2313', undefined, undefined, true),
					createSample(undefined, undefined, '6435.0', undefined, undefined, true)
				];
				ctrl.computeMeanAndStandardDeviationOfSelectedSamples_();
				let actualResultantMeanAndStandardDeviationAfterRoundingOff = {
					mean: util.precisionRound(ctrl.resultantMeanAndStandardDeviation.mean, 3).toString(), 
					standardDeviation: util.precisionRound(ctrl.resultantMeanAndStandardDeviation.standardDeviation, 3).toString()					
				};
				expect(actualResultantMeanAndStandardDeviationAfterRoundingOff).toEqual({
					mean: '3311897.704',
					standardDeviation: '8736034.573'
				});
		});
	});
	
	describe('when showing the samples', function() {
		beforeEach(function() {
			ctrl.$onInit();
			spyOn(inputValidationService, 'removeLeadingAndTrailingWhitespaces');
			spyOn(windowService, 'btoa').and.returnValue('mockbtoa==');
		});
		
		it('should alert the user when there is a backend error', function() {
			httpMock.expectGET('https://app.onecodex.com/api/v1/samples').respond(502);
			ctrl.apiKey = '';
			ctrl.showSamples();
			httpMock.flush();
			expect(windowService.alert).toHaveBeenCalledWith('Wrong credentials!');
		});

		it('should show samples by setting proper variables', function() {
			let responseSamples = [
				createSample('ref1', undefined, undefined, undefined, undefined, undefined),
				createSample('ref2', undefined, undefined, undefined, undefined, undefined),
			];
			let expectedSamples = [
				createSample('ref1', undefined, '_', false, false, undefined),
				createSample('ref2', undefined, '_', false, false, undefined),
			]
			httpMock.expectGET('https://app.onecodex.com/api/v1/samples', function(headers) {
				return headers['Authorization'] === 'Basic mockbtoa==';
			}).respond(200, responseSamples);
			ctrl.apiKey = 'key';
			ctrl.showSamples();
			httpMock.flush();
			expect(ctrl.samples).toEqual(expectedSamples);
			expect(ctrl.shouldShowSamples).toBe(true);
			expect(ctrl.shouldShowLoaderWhileRetrievingSamples).toBe(false);
			expect(scope.$digest).toHaveBeenCalled();
		});
	});
	
	describe('when toggling visibility of API Key', function() {
		beforeEach(function() {
			ctrl.$onInit();
		});
		
		it('should show the hidden API Key', function() {
			let inputElem = {type: 'password'};
			spyOn(documentService[0], 'getElementById').and.returnValue(inputElem);
			ctrl.toggleVisibility();
			expect(documentService[0].getElementById).toHaveBeenCalledWith('apiKey');
			expect(inputElem.type).toBe('text');
		});

		it('should hide the exposed API Key', function() {
			let inputElem = {type: 'text'};
			spyOn(documentService[0], 'getElementById').and.returnValue(inputElem);
			ctrl.toggleVisibility();
			expect(documentService[0].getElementById).toHaveBeenCalledWith('apiKey');
			expect(inputElem.type).toBe('password');
		});		
	});

	describe('when computing the alpha-diversity', function() {
		beforeEach(function() {
			ctrl.$onInit();
		});
		
		it('should alert the user if the order of diversity is not specified', function() {
			let actualSample =
					createSample(undefined, undefined, undefined, undefined, undefined, undefined);
			ctrl.computeAlphaDiversity(actualSample);
			let expectedSample = createSample(undefined, undefined, '_', false, false, undefined);
			expect(actualSample).toEqual(expectedSample);
			expect(windowService.alert)
					.toHaveBeenCalledWith('Please specify a valid order of diversity!');
		});	

		describe('for a sample whose order is specified', function() {
			let actualSample = 
					createSample(
							'/api/v1/classifications/testRef',
							'2',
							undefined,
							undefined,
							undefined,
							undefined);
			let expectedUrl = 'http://localhost:8080/compute-alpha-diversity?' + 'apiKey=mock&' +
												'sampleId=testRef&' + 'orderOfDiversity=2';
							
			beforeEach(function() {
				ctrl.apiKey = 'key'; 
				spyOn(inputValidationService, 'removeLeadingAndTrailingWhitespaces')
						.and.callFake(function(argument) {
							if (isNaN(argument) === true) {
								return 'mock';
							} else {
								return '2';
							}
						});
			});
			
 			it('should alert the user when there is a backend error', function() {
				httpMock.expectGET(expectedUrl).respond(502);
				ctrl.computeAlphaDiversity(actualSample);
				httpMock.flush();
				expect(windowService.alert).toHaveBeenCalledWith('Internal server error!');
			}); 
			
 			it('should alert the user when there is a One Codex server error', function() {
				httpMock.expectGET(expectedUrl).respond(201, 'x');
				ctrl.computeAlphaDiversity(actualSample);
				httpMock.flush();
				expect(windowService.alert).toHaveBeenCalledWith('Internal server error!');
			}); 

 			it('should set the alpha diversity to the controller and start the initiation of mean and' +
				 ' standard deviation of the selected samples', function() {
				spyOn(ctrl, 'computeMeanAndStandardDeviationOfSelectedSamples_');
				httpMock.expectGET(expectedUrl).respond(201, '3.46');
				ctrl.computeAlphaDiversity(actualSample);
				httpMock.flush();
				expect(actualSample.alphaDiversityComputationStatus.completed).toBe(true);
				expect(actualSample.alphaDiversity).toBe('3.46');
				expect(ctrl.computeMeanAndStandardDeviationOfSelectedSamples_).toHaveBeenCalled();
			}); 				
		});
	});
});
