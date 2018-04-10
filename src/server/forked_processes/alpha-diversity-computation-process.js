let	XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


process.on('message', function(req) {
	let request = new XMLHttpRequest(),
			url = 'https://app.onecodex.com/api/v1/analyses/' + req.sampleId + '/results';
	request.open('GET', url, true);
	request.setRequestHeader(
		'Authorization', 'Basic ' + Buffer.from(req.apiKey + ':').toString('base64'));
	request.onload = function() {
		let response = JSON.parse(request.responseText);
		if (request.status >= 500) {
			process.send('X');
		} else {
			// Formula used to compute alpha-diversity is as follows -
			// qD = 1/(sqrt[q-1]{sum{i=1}^{S} Pi^q})
			// pronounced as - 'inverse of (q-1)th root of summation of Pi for all
			// species - 'i' present in the dataset, where Pi is the ratio of count
			// of individual of species - i to the total number of species and q is
			// the order of diversity'.
			let organisms = response.table,
					q = +req.orderOfDiversity,	// The order of diversity converted to a number.
					m = 0;		// The total number of organism in the dataset.
			for (let i=0; i<organisms.length; i++) {
				if (isNonHostSpecies(organisms[i]) === true) {
					m += organisms[i].readcount;
				}
			}
			let alphaDiversity, normalizedAlphaDiversity;
			// If order of diversity is 1, then delegate to Shannon's index to compute
			// alpha-diversity as mentioned here - 
			// https://en.wikipedia.org/wiki/Diversity_index#Shannon_index
			if (q === 1) {
				alphaDiversity = 0;
				let nonHostSpeciesCount = 0;
				for (let i=0; i<organisms.length; i++) {
					if (isNonHostSpecies(organisms[i]) === true) {
						nonHostSpeciesCount++;
						alphaDiversity -= (organisms[i].readcount === 0 ?
								0 : (organisms[i].readcount/m) * Math.log(organisms[i].readcount/m));
					}
				}
				normalizedAlphaDiversityInString =
						(alphaDiversity/Math.log(nonHostSpeciesCount)).toString();
			} else {
				let basicSum = 0;
				for (let i=0; i<organisms.length; i++) {
					if (isNonHostSpecies(organisms[i]) === true) {
						basicSum += Math.pow(organisms[i].readcount/m /** Pi */, q);
					}
				}
				alphaDiversity = Math.pow(basicSum, 1-q);
				normalizedAlphaDiversityInString = 'undefined';
			}
			logOnlyInNonTestEnvironment('Alpha-diversity of the file has been computed.');
			process.send({
				alphaDiversity: alphaDiversity.toString(),
				normalizedAlphaDiversity: normalizedAlphaDiversityInString
			});
		}
	};
	request.send();
});

/**
 * A function to find if the given organism is a non-host(non-human) species.
 *
 * @function
 * @param {string} organism The organism to check for whether it is a non-human species.
 */
function isNonHostSpecies(organism) {
	return organism.rank === 'species' && organism.name !== 'Homo sapiens';
}


/**
 * A function to log only in non-test environment.
 *
 * @function
 */
function logOnlyInNonTestEnvironment(logMessage) {
	if (process.env.NODE_ENV !== 'test') {
		console.log(logMessage);
	}	
}
