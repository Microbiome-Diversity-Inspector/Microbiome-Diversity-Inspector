describe('Unit tests for EntropyAnalysisCtrl', function() {
	
	beforeEach(angular.mock.module('microbiomeDiversityInspector'));
	
	let ctrl;
	let windowService;
	let httpMock;
	let timeout;
	let interval;
	
	beforeEach(inject(function(_$controller_, _$window_, _$httpBackend_, _$timeout_, _$interval_) {
		ctrl = _$controller_('EntropyAnalysisCtrl', {});
		windowService = _$window_;
		httpMock = _$httpBackend_;
		timeout = _$timeout_;
		interval = _$interval_;
	}));
	
	afterEach(function() {
    httpMock.verifyNoOutstandingExpectation();
    httpMock.verifyNoOutstandingRequest();
	});
	
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
});
