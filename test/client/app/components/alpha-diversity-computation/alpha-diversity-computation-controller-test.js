describe('AlphaDiversityComputationCtrl', function() {
	
	beforeEach(angular.mock.module('microbiomeDiversityInspector'));
	
	var ctrl;
	var scope;
	var createSample = function(
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
	
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		scope = _$rootScope_.$new();
		ctrl = _$controller_('AlphaDiversityComputationCtrl', {$scope: scope});
	}));
	
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
		
		it('should show \'_\' if the selected sample\'s alpha-diversity is not computed yet by the server',
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
	});
});
