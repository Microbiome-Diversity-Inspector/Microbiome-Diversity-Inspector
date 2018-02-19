function FastaToFastqConversionCtrl() {
	
	this.$onInit = (function() {
		this.fastaFileName;		// Setting on controller to share the file name with QUAL file uploader.
		this.qualFileName;		// Setting on controller to share the file name with FASTA file uploader.
		this.resetFastaToFastqConversionVariables_();
	}).bind(this);	
}


/**
 * Reset all the variables of the 'FASTA to FASTQ Conversion' service.
 *
 * @private
 */
FastaToFastqConversionCtrl.prototype.resetFastaToFastqConversionVariables_ = function() {
	this.startConversionToFastq = false;
};


angular
	.module('microbiomeDiversityInspector')
	.controller('FastaToFastqConversionCtrl', FastaToFastqConversionCtrl);