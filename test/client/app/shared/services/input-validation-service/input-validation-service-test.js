describe('InputValidationService', function() {
	
	beforeEach(angular.mock.module('microbiomeDiversityInspector'));
	
	let inputValidationService;
	
	beforeEach(inject(function(_inputValidationService_) {
		inputValidationService = _inputValidationService_;
	}));
	
	it('should verify if a given file is of the given file format', function() {
		expect(inputValidationService.isFileHavingCorrectFormat('sample.fastq', 'fastq')).toBe(true);
		expect(inputValidationService.isFileHavingCorrectFormat('sample.fastq', 'fasta')).toBe(false);
	});
	
	it('should remove leading and trailing whitespaces from the given string', function() {
		expect(inputValidationService.removeLeadingAndTrailingWhitespaces('')).toBe('');	
		expect(inputValidationService.removeLeadingAndTrailingWhitespaces('sample')).toBe('sample');
		expect(inputValidationService.removeLeadingAndTrailingWhitespaces('    sample  '))
				.toBe('sample');
		expect(inputValidationService.removeLeadingAndTrailingWhitespaces('sample    '))
				.toBe('sample');
		expect(inputValidationService.removeLeadingAndTrailingWhitespaces('   sample'))
				.toBe('sample');				
		expect(inputValidationService.removeLeadingAndTrailingWhitespaces('   sam   ple    '))
				.toBe('sam   ple');				
	});
});
