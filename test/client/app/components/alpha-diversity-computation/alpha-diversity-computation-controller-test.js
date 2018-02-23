describe('AlphaDiversityComputationCtrl', function() {
	
	beforeEach(angular.mock.module('microbiomeDiversityInspector'));
	
	let ctrl;
	let scope;
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
				let precisionRound = function(number, precision) {
					let factor = Math.pow(10, precision);
					return Math.round(number * factor) / factor;
				};
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
					mean: precisionRound(ctrl.resultantMeanAndStandardDeviation.mean, 3).toString(), 
					standardDeviation: precisionRound(ctrl.resultantMeanAndStandardDeviation.standardDeviation, 3).toString()					
				};
				expect(actualResultantMeanAndStandardDeviationAfterRoundingOff).toEqual({
					mean: '3311897.704',
					standardDeviation: '8736034.573'
				});
		});
	});
});
