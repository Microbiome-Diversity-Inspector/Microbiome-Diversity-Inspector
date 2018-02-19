function DownloadMetasubDataCtrl(inputValidationService) {
	this.selectedCityUrlPrefix;
	this.accessionNumber;

	this.$onInit = (function() {
		this.inputValidationService_ = inputValidationService;
		this.cities = [
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
			}];
	}).bind(this);	
}


/**
 * Sends a HTTP request to download the required Metasub data from
 * http://ala.boku.ac.at/ server.
 */
DownloadMetasubDataCtrl.prototype.downloadMetaSubData = function() {
	alert('Enter the below details to download the required file-\n' +
				'Username- \'CAMDA\', Password- \'Pivo\'');
	window.open(
			this.selectedCityUrlPrefix +
			this.inputValidationService_.removeLeadingAndTrailingWhitespaces(this.accessionNumber) +
			'.fastq.dsrc');
};


angular
	.module('microbiomeDiversityInspector')
	.controller('DownloadMetasubDataCtrl', ['inputValidationService', DownloadMetasubDataCtrl]);