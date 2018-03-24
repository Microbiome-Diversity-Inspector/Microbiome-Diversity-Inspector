describe('Unit tests for FastqToFastaConversionCtrl', function() {
		
	beforeEach(angular.mock.module('microbiomeDiversityInspector'));
	
	let ctrl;
	
	beforeEach(inject(function(_$controller_) {
		ctrl = _$controller_('FastqToFastaConversionCtrl', {});
	}));
	
	it('should initialize controller variables', function() {
		spyOn(ctrl, 'resetFastqToFastaConversionVariables_');
		ctrl.$onInit();		
		expect(ctrl.resetFastqToFastaConversionVariables_).toHaveBeenCalled();
	});
	
	it('should reset fastq to fasta conversion variables', function() {
		ctrl.resetFastqToFastaConversionVariables_();
		expect(ctrl.startConversionToFasta).toBe(false);
	});
});
