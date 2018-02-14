let path = require('path'),
		fs = require('fs');


process.on('message', function(req) {
	let pathSegment = '../../../';
	// If the code is ran as a part of an integration test, then use the 
	// test files' directory path.
	if (process.env.NODE_ENV === 'test') {
		pathSegment = '../../../test/test_files';
	}	
	console.log(req.fastaFileName);
	console.log(req.qualFileName);
	let fastaFileName = path.join(__dirname, pathSegment, req.fastaFileName),
			qualFileName = path.join(__dirname, pathSegment, req.qualFileName),
	// Parse the FASTA file.
	// If 'isFirstLineOfSequence' is set to false then it automatically means that the current
	// line is the second line of the sequence having the nucelotide sequence.
			isFirstLineOfSequence = true,
			currentReadName = '',
			currentBase = '',
			readNameToBaseMap = {};
	fs.readFile(fastaFileName, function(err, data) {
		if (err) {
			console.log('Error in reading the uploaded FASTA file.');
			process.send(false);			
		} else {
			for (let i=0; i<data.toString().length; i++) {	
				// This is the first line of the sequence.
				if (i === 0
							|| (data.toString()[i-1] === '\n' && data.toString()[i] === '>'
									&& isFirstLineOfSequence === false)) {
					if (currentReadName !== '') {
						readNameToBaseMap[currentReadName] = currentBase;
					}
					isFirstLineOfSequence = true;
					currentReadName = '';
				} else if (i !== 0 && data.toString()[i-1] !== '\n' && isFirstLineOfSequence === true) {
					// This is the first line of the sequence.
					if (data.toString()[i] !== '\n' && data.toString()[i] !== '\r') {
						currentReadName += data.toString()[i];
					}
					isFirstLineOfSequence = true;
				} else if ((i !== 0 && data.toString()[i-1] === '\n' && isFirstLineOfSequence === true)
											|| isFirstLineOfSequence === false) {
					// This is the second and the last line of the sequence in which the nucelotide
					// data is present.
					if (i !== 0 && data.toString()[i-1] === '\n' && isFirstLineOfSequence === true) {
						// Reset the current base.
						currentBase = '';
					}
					isFirstLineOfSequence = false;
					if (data.toString()[i] !== '\n' && data.toString()[i] !== '\r') {
						currentBase += data.toString()[i];
					}
				}
			}		
			if (currentReadName !== '') {
				readNameToBaseMap[currentReadName] = currentBase;
			}
			// Parse the QUAL file.
			isFirstLineOfSequence = true;
			currentReadName = '';
			// See - http://biopython.org/DIST/docs/api/Bio.SeqIO.QualityIO-module.html to know more
			// about Sanger-styled qualities.
			let currentSangerStyledQualities = '',
					currentDecimalQualityInStringFormat = '',
					readNameToSangerStyledQualityMap = {};
			fs.readFile(qualFileName, function(err, data) {
				if (err) {			
					console.log('Error in reading the uploaded QUAL file.');
					process.send(false);
				} else {
					for (let i=0; i<data.toString().length; i++) {
						// This is the first line of the sequence.
						if (i === 0
									|| (data.toString()[i-1] === '\n' && data.toString()[i] === '>'
											&& isFirstLineOfSequence === false)) {
							if (currentReadName !== '') {
								readNameToSangerStyledQualityMap[currentReadName] = currentSangerStyledQualities;
							}
							isFirstLineOfSequence = true;
							currentReadName = '';
						} else if (i !== 0 && data.toString()[i-1] !== '\n' &&
												isFirstLineOfSequence === true) {
							// This is the first line of the sequence.
							if (data.toString()[i] !== '\n' && data.toString()[i] !== '\r') {
								currentReadName += data.toString()[i];
							}
							isFirstLineOfSequence = true;
						} else if ((i !== 0 && data.toString()[i-1] === '\n' &&
												isFirstLineOfSequence === true) || 
												isFirstLineOfSequence === false) {
							// This is the second and the last line of the sequence in which the nucelotide data
							// is present.
							if (i !== 0 && data.toString()[i-1] === '\n' && isFirstLineOfSequence === true) {
								// Reset the current Sanger-styled quality.
								currentSangerStyledQualities = '';
								currentDecimalQualityInStringFormat = '';
							}
							isFirstLineOfSequence = false;
							if (data.toString()[i] !== ' ' && data.toString()[i] !== '\n' &&
									data.toString()[i] !== '\r') {
								currentDecimalQualityInStringFormat += data.toString()[i];
							} else if (data.toString()[i] === ' ' || data.toString()[i] === '\n'
													|| data.toString()[i] === '\r') {
								// Don't add the condition to check again '\r' since in Windows it will
								// just lead to computing the Sanger-styled quality twice of the same
								// number as '\r' and '\n' always occurs in pair in Windows.
								// See this for more - https://stackoverflow.com/a/1761086/5928129.
								// The second condition in the above OR statement is there to separate
								// two quality numbers separated just by a newline.
								if (currentDecimalQualityInStringFormat !== '') {
									// The above 'if-guard' is to prevent the conversion of an empty decimal
									// quality into its Sanger-styled counterpart if it has already been
									// reset to empty on an encounter of a previous ' ' character.
									currentSangerStyledQualities =
												currentSangerStyledQualities +
												convertDecimalQualityInStringFormatToSangerStyledQuality(
														currentDecimalQualityInStringFormat);
									currentDecimalQualityInStringFormat = '';
								}
							}
						}
					}					
					if (currentReadName !== '') {
						if (currentDecimalQualityInStringFormat != '') {
							currentSangerStyledQualities =
										currentSangerStyledQualities +
										convertDecimalQualityInStringFormatToSangerStyledQuality(
												currentDecimalQualityInStringFormat);
						}
						readNameToSangerStyledQualityMap[currentReadName] = currentSangerStyledQualities;
					}
					let fastqContent = '';
					for (let key in readNameToBaseMap) {
						if (readNameToBaseMap.hasOwnProperty(key)) {
							fastqContent += '@';
							fastqContent += key;
							// We don't add a '\r' before adding '\n' since just adding a '\n' is compatible
							// with both Windows and Unix-based systems whereas in Unix a '\r' does not signify
							// anything. See - https://stackoverflow.com/a/1761086/5928129 for more.
							fastqContent += '\n';
							fastqContent += readNameToBaseMap[key];
							fastqContent += '\n';
							fastqContent += '+';
							fastqContent += '\n';
							fastqContent += readNameToSangerStyledQualityMap[key];
							fastqContent += '\n';
						}
					}
					fs.writeFile(
							fastaFileName.substring(0, fastaFileName.length-6) + '.fastq',
							fastqContent,
							function(err) {
								if (err) {
									console.log('Error in writing to the output FASTQ file.');
									process.send(false);
								} else {
									console.log('Finished converting - ' + req.fastaFileName +
															' to its FASTQ equivalent.');
									process.send(true);
								}
							});							
				}
			});	
		}
	});
});


/**
 * A function to map a given decimal quality to Sanger-styled quality
 * using the formula - chr(Q+33) as mentioned in -
 * http://biopython.org/DIST/docs/api/Bio.SeqIO.QualityIO-module.html
 *
 * @function
 * @param {string} input The decimal quality input string to be converted to 
 *											 a Sanger-styled quality.
 */
function convertDecimalQualityInStringFormatToSangerStyledQuality(input) {
	let qualityInDecimalFormat = parseInt(input, 10);
	return String.fromCharCode(qualityInDecimalFormat + 33);
}
