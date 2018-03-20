let util = require('./../../../../test-util.js');


describe('Unit tests for EntropyAnalysisCtrl', function() {
	
	beforeEach(angular.mock.module('microbiomeDiversityInspector'));
	
	let ctrl;
	let windowService;
	let timeout;
	let interval;
	
	beforeEach(inject(function(_$controller_, _$window_, _$timeout_, _$interval_) {
		ctrl = _$controller_('EntropyAnalysisCtrl', {});
		windowService = _$window_;
		timeout = _$timeout_;
		interval = _$interval_;
	}));
	
	it('should initialize controller variables', function() {
		spyOn(ctrl, 'resetEntropyAnalysisVariables_');
		ctrl.$onInit();
		expect(ctrl.window_).toBe(windowService);
		expect(ctrl.timeoutService_).toBe(timeout);
		expect(ctrl.intervalService_).toBe(interval);
		expect(ctrl.resetEntropyAnalysisVariables_).toHaveBeenCalled();
	});
	
	it('should cancel all timer-based promises', function() {
		spyOn(timeout, 'cancel');
		spyOn(interval, 'cancel');
		ctrl.$onInit();
		ctrl.dynamicGraphIntervalPromise = 'dynamicGraphIntervalPromise';
		ctrl.computeEntropyTimeoutPromise = 'computeEntropyTimeoutPromise';
		ctrl.cancelAllTimerPromises_();
		expect(timeout.cancel).toHaveBeenCalledWith('computeEntropyTimeoutPromise');
		expect(interval.cancel).toHaveBeenCalledWith('dynamicGraphIntervalPromise');
	});
	
	it('should reset entropy analysis variables', function() {
		spyOn(ctrl, 'cancelAllTimerPromises_');
		ctrl.resetEntropyAnalysisVariables_();
		expect(ctrl.countOfA).toBe(0);
		expect(ctrl.countOfT).toBe(0);
		expect(ctrl.countOfG).toBe(0);
		expect(ctrl.countOfC).toBe(0);
		expect(ctrl.showAnalysis).toBe(false);
		expect(ctrl.showEntropy).toBe(false);
		expect(ctrl.entropyOfCurrentWindow).toBe(0);
		expect(ctrl.cancelAllTimerPromises_).toHaveBeenCalled();
		expect(ctrl.dynamicGraphIntervalPromise).toBe(null);
		expect(ctrl.computeEntropyTimeoutPromise).toBe(null);
	});
	
	describe('when refreshing entropy graph', function() {
		let expectedTitle = {
			text: 'Entropy (of continuous chunks)   vs   Time',
			fontColor: '#2f4f4f',
			fontSize: 30,
			padding: 10,
			margin: 15,
			backgroundColor: '#FFFFE0',
			borderThickness: 1,
			cornerRadius: 5,
		};
		let expectedYAxis = {includeZero: false};
		let chartMock = {render: function() {}};
		let getXAndYObj = function(x, y) {
			return {
				x: x,
				y: y
			};
		};
		// A helper function that returns an array of dataPoints of
    // the given 'size' (given as a formal parameter) with all y-values 
		// as 0 starting from the given 'startX' except the values passed as 
		// argument objects ({x: Number, y: Number}).
		// Note that the argument objects must be sorted with respect to 'x'.
		let fillDpsArray = function(startX, size) {
			let dps = [];
			for (let i=0; i<size; i++) {
				dps.push(getXAndYObj(i+startX, 0));
			}
			for (let i=0, argumentIndex = 2; i<size && argumentIndex<arguments.length; i++) {
				if (arguments[argumentIndex].x === dps[i].x) {
					dps[i].y = arguments[argumentIndex].y;					
					argumentIndex++;
				}
			}
			return dps;
		};
		
		beforeEach(function() {
			ctrl.$onInit();
			spyOn(CanvasJS, 'Chart').and.returnValue(chartMock);
			spyOn(chartMock, 'render');
		});
		
		it('should render the initial graph correctly', function() {
			spyOn(ctrl, 'intervalService_');
			ctrl.refreshEntropyGraph_();
			expect(CanvasJS.Chart).toHaveBeenCalledWith('chartContainer', {
				title: expectedTitle,
				axisY: expectedYAxis,
				data: [{
					type: 'line',
					dataPoints: fillDpsArray(0, 20)
				}],
			});
			expect(chartMock.render).toHaveBeenCalled();
		});

		it('should render the graph according to the varying entropy values', function() {
			ctrl.refreshEntropyGraph_();
			ctrl.entropyOfCurrentWindow = 1.7;
			interval.flush(500);
			expect(CanvasJS.Chart).toHaveBeenCalledWith('chartContainer', {
				title: expectedTitle,
				axisY: expectedYAxis,
				data: [{
					type: 'line',
					dataPoints: fillDpsArray(1, 20, {x: 20, y: 1.7}),
				}],
			});
			expect(chartMock.render).toHaveBeenCalled();
			interval.flush(500);
			expect(CanvasJS.Chart).toHaveBeenCalledWith('chartContainer', {
				title: expectedTitle,
				axisY: expectedYAxis,
				data: [{
					type: 'line',
					dataPoints: fillDpsArray(2, 20, {x: 20, y: 1.7}, {x: 21, y: 1.7}),
				}],
			});
			expect(chartMock.render).toHaveBeenCalled();			
			ctrl.entropyOfCurrentWindow = 0.6;
			interval.flush(500);
			expect(CanvasJS.Chart).toHaveBeenCalledWith('chartContainer', {
				title: expectedTitle,
				axisY: expectedYAxis,
				data: [{
					type: 'line',
					dataPoints: fillDpsArray(3, 20, {x: 20, y: 1.7}, {x: 21, y: 1.7}, {x: 22, y: 0.6})
				}],
			});
			expect(chartMock.render).toHaveBeenCalled();					
		});		
	});
	
	describe('after initiating the entropy analysis process', function() {
		let httpMock;
		let sampleFileName = 'sample.fastq';
		
		let makeResponseObject =
				function(statusCode, countOfA, countOfT, countOfG, countOfC, nextUrl) {
					return {
						statusCode: statusCode,
						countObj: {
							countOfA: countOfA,
							countOfT: countOfT,
							countOfG: countOfG,
							countOfC: countOfC
						},
						nextUrl: nextUrl
					};
				};
		
		beforeEach(inject(function(_$httpBackend_) {
			httpMock = _$httpBackend_;
			ctrl.$onInit();
			spyOn(ctrl, 'resetEntropyAnalysisVariables_');
			spyOn(ctrl, 'refreshEntropyGraph_');
			spyOn(ctrl, 'cancelAllTimerPromises_');
		}));
		
		afterEach(function() {
			httpMock.verifyNoOutstandingExpectation();
			httpMock.verifyNoOutstandingRequest();
		});
				
		it('should not show analysis and cancel all timer-based promises if there is a backend error',
				function() {
					httpMock.expectGET('http://localhost:8080/analyze?fileName=sample.fastq').respond(502);
					ctrl.process_(sampleFileName);
					timeout.flush(10);
					httpMock.flush();
					expect(ctrl.refreshEntropyGraph_).toHaveBeenCalled();
					expect(ctrl.showAnalysis).toBe(false);
					expect(ctrl.cancelAllTimerPromises_).toHaveBeenCalled();
				});
				
		it('should not show analysis and cancel all timer-based promises if the uploaded file is not' +
			 ' inside the appropriate directory', function() {
					spyOn(windowService, 'alert');
					httpMock
							.expectGET('http://localhost:8080/analyze?fileName=sample.fastq')
							.respond(201, {statusCode: 'e'});
					ctrl.process_(sampleFileName);
					timeout.flush(10);
					httpMock.flush();
					expect(ctrl.showAnalysis).toBe(false);
					expect(ctrl.cancelAllTimerPromises_).toHaveBeenCalled();
					expect(windowService.alert).toHaveBeenCalledWith(
							'Sorry, unable to convert the uploaded file!\n' + 
							'Please check if the uploaded file is inside the directory - ' + 
							'\'Microbiome-Diversity-Inspector\'');
			 });
			 
		it('should compute and show the entropy', function() {
			let dummyUrl = 'http://localhost:8080/analyze?fileName=sample.fastq';
			// A function to verify whether the actual entropy and counts of A, T, G and C matches
			// with the given expected values. Note that the entropy is verified to 2 decimal places.
			let verifyEntropyAndCounts =
					function(
						expectedEntropy,
						expectedCountOfA,
						expectedCountOfT,
						expectedCountOfG,
						expectedCountOfC) {
							expect(util.precisionRound(ctrl.entropyOfCurrentWindow, 2)).toBe(expectedEntropy);
							expect(ctrl.countOfA).toBe(expectedCountOfA);
							expect(ctrl.countOfT).toBe(expectedCountOfT);
							expect(ctrl.countOfG).toBe(expectedCountOfG);
							expect(ctrl.countOfC).toBe(expectedCountOfC);
						};
						
			httpMock.expectGET(dummyUrl).respond(201, makeResponseObject('o', 0, 0, 0, 0, dummyUrl));	
		  ctrl.process_(sampleFileName);
			timeout.flush(10);
			httpMock.flush();
			verifyEntropyAndCounts(0, 0, 0, 0, 0);
			
			httpMock.expectGET(dummyUrl).respond(201, makeResponseObject('o', 2, 3, 4, 5, dummyUrl));	
			timeout.flush(10);
			httpMock.flush();
			verifyEntropyAndCounts(1.92, 2, 3, 4, 5);

			httpMock.expectGET(dummyUrl).respond(201, makeResponseObject('o', 8, 0, 2, 4, dummyUrl));	
			timeout.flush(10);
			httpMock.flush();
			verifyEntropyAndCounts(1.38, 10, 3, 6, 9);

			httpMock.expectGET(dummyUrl).respond(201, makeResponseObject('x', 1, 1, 1, 1, dummyUrl));	
			timeout.flush(10);
			httpMock.flush();
			verifyEntropyAndCounts(2, 11, 4, 7, 10);
			expect(ctrl.showEntropy).toBe(true);
			expect(ctrl.cancelAllTimerPromises_).toHaveBeenCalled();
		});
	});	
});
