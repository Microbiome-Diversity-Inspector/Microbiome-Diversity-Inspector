describe('Unit tests for directives of alphaDiversityComputation', function() {
	
	beforeEach(angular.mock.module('microbiomeDiversityInspector'));
	
	let $rootScope, $compile;
	
	beforeEach(inject(function(_$rootScope_, _$compile_, _$controller_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_.$new();
		$rootScope.alphaDiversityComputationCtrl =
				_$controller_('AlphaDiversityComputationCtrl', {$scope: {$rootScope}});
	}));
	
	describe('checkboxMeanAndStandardDeviationTrigger', function() {
		
		it('should compute mean and standard deviation on change event', function() {
			spyOn($rootScope.alphaDiversityComputationCtrl,
						'computeMeanAndStandardDeviationOfSelectedSamples_');
			spyOn($rootScope, '$apply');
			let compiledElement =
					$compile('<input checkbox-mean-and-standard-deviation-trigger>')($rootScope);
			$rootScope.$digest();
			compiledElement.triggerHandler('change');
			expect($rootScope.alphaDiversityComputationCtrl.computeMeanAndStandardDeviationOfSelectedSamples_)
					.toHaveBeenCalled();
			expect($rootScope.$apply).toHaveBeenCalled();
		});
	});
	
	describe('expandableCard', function() {
		let compiledElement;

		beforeEach(function() {
			compiledElement =
					$compile('<div expandable-card class=\'sample-class card-size-300\'></div>')($rootScope);
			$rootScope.$digest();			
		});
		
		it('should not remove the class if the samples are not allowed to be shown', function() {
			$rootScope.alphaDiversityComputationCtrl.shouldShowSamples = false;
			$rootScope.$digest();
			expect(compiledElement.hasClass('card-size-300')).toBe(true);
		});
		
		it('should remove the class if the samples are allowed to be shown', function() {
			$rootScope.alphaDiversityComputationCtrl.shouldShowSamples = true;
			$rootScope.$digest();
			expect(compiledElement.hasClass('card-size-300')).toBe(false);
			expect(compiledElement.hasClass('sample-class')).toBe(true);
		});		
	});	
});
