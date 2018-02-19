function FastqToFastaConversionCtrl() {
	
	this.$onInit = (function() {
		this.resetFastqToFastaConversionVariables_();
	}).bind(this);	
}


/**
 * Reset all the variables of the 'FASTQ to FASTA Conversion' service.
 *
 * @private
 */
FastqToFastaConversionCtrl.prototype.resetFastqToFastaConversionVariables_ = function() {
	this.startConversionToFasta = false;
};


angular
	.module('microbiomeDiversityInspector')
	.controller('FastqToFastaConversionCtrl', FastqToFastaConversionCtrl);