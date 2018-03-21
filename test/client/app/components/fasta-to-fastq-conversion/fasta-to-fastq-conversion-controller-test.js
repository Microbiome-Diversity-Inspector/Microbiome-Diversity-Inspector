describe('Unit tests for FastaToFastqConversionCtrl', function() {
		
	beforeEach(angular.mock.module('microbiomeDiversityInspector'));
	
	let ctrl;
	
	beforeEach(inject(function(_$controller_) {
		ctrl = _$controller_('FastaToFastqConversionCtrl', {});
	}));
	
	it('should set initialize controller variables', function() {
		spyOn(ctrl, 'resetFastaToFastqConversionVariables_');
		ctrl.$onInit();		
		expect(ctrl.resetFastaToFastqConversionVariables_).toHaveBeenCalled();
	})
	
	it('should reset fasta to fastq conversion variables', function() {
		ctrl.resetFastaToFastqConversionVariables_();
		expect(ctrl.startConversionToFastq).toBe(false);
	});
});
