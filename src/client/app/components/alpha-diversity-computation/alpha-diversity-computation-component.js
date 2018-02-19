angular
	.module('microbiomeDiversityInspector')
	.component('alphaDiversityComputation', {
		controller: 'AlphaDiversityComputationCtrl',
		controllerAs: 'alphaDiversityComputationCtrl',
		templateUrl: 'app/components/alpha-diversity-computation/alpha-diversity-computation.html'
	})
	.directive('checkboxMeanAndStandardDeviationTrigger', function() {
		return {
			link: function(scope, elem, attr, ctrl) {
				elem.on('change', function() {
					scope.alphaDiversityComputationCtrl.computeMeanAndStandardDeviationOfSelectedSamples_();
					scope.$apply();
				});
			},
		};
	})
	.directive('expandableCard', function() {
		return {
			link: function(scope, elem, attr, ctrl) {
				scope.$watch(function() {
					return scope.alphaDiversityComputationCtrl.shouldShowSamples;
				}, function(newVal, oldVal) {
					if (newVal !== oldVal && newVal === true) {
						elem.removeClass('card-size-300');
					}
				});
			},
		};
	})	