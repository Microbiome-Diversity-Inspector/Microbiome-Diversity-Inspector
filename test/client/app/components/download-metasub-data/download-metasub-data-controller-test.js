describe('Unit tests for DownloadMetasubDataCtrl', function() {
	
	beforeEach(angular.mock.module('microbiomeDiversityInspector'));
	
	let ctrl;
	let windowService;
	let inputValidationService;
	
	beforeEach(inject(function(
			_$controller_,
			_$window_,
			_inputValidationService_) {
		windowService = _$window_;
		inputValidationService = _inputValidationService_;
		ctrl = _$controller_('DownloadMetasubDataCtrl', {});
	}));
	
	it('should initialize controller variables', function() {
		ctrl.$onInit();
		expect(ctrl.window_).toBe(windowService);
		expect(ctrl.inputValidationService_).toBe(inputValidationService);
		expect(ctrl.cities).toEqual([
			{
				name: 'New York',
				urlPrefix: 'http://ala.boku.ac.at/camda2017/MetaSUB/NY/data/',
			},
			{
				name: 'Boston',
				urlPrefix: 'http://ala.boku.ac.at/camda2017/MetaSUB/Boston/data/',
			},
			{
				name: 'Sacramento',
				urlPrefix: 'http://ala.boku.ac.at/camda2017/MetaSUB/Sacramento/data/',
			}
	  ]);
	});
	
	it('should alert the users about the username and password and open the correct link for' +
		 ' downloading the Metasub data', function() {
		spyOn(windowService, 'alert');
		spyOn(windowService, 'open');
		spyOn(inputValidationService, 'removeLeadingAndTrailingWhitespaces').and.returnValue('23');
		ctrl.$onInit();
		ctrl.selectedCityUrlPrefix = 'prefix';
		ctrl.downloadMetasubData();
		expect(ctrl.window_.alert).toHaveBeenCalledWith(
				'Enter the below details to download the required file-\n' +
				'Username- \'CAMDA\', Password- \'Pivo\'');
		expect(ctrl.window_.open).toHaveBeenCalledWith('prefix23.fastq.dsrc');
	});
});
