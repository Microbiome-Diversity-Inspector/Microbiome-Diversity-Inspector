let path = require('path'),
		fs = require('fs');


process.on('message', function(req) {
	let pathSegment = '../../../';
	// If the code is ran as a part of an integration test, then use the 
	// test files' directory path.
	if (typeof global.it === 'function') {
		pathSegment = '../../../test/test_files';
	}
	let fastqFileName = path.join(__dirname, pathSegment, req.fileName);
	// The line limit in FASTA format as mentioned in - https://en.wikipedia.org/wiki/FASTA_format
	let FASTA_LINE_LIMIT = 60;
	let currentCharacterCount = 1;
	let fastaContent = '';
	let isFirstLineOfSequence = true;
	let isSecondLineOfSequence = false;
	// The below code assumes that the file uploaded is a proper FASTQ file
	// following the rules as mentioned in - https://en.wikipedia.org/wiki/FASTQ_format
	fs.readFile(fastqFileName, function(err, data) {
		if (err) {
			console.log('Error in reading the uploaded FASTQ file.');
			process.send(false);
		} else {
			for (let i=0; i<data.toString().length; i++) {			
				// This is the first line of the sequence.
				if (i === 0
							|| (data.toString()[i-1] === '\n' && data.toString()[i] === '@'
									&& isFirstLineOfSequence === false)) {
					fastaContent += '>';
					isSecondLineOfSequence = false;
					isFirstLineOfSequence = true;
				} else if (i !== 0 && data.toString()[i-1] !== '\n' && isFirstLineOfSequence === true) {
					// This is the first line of the sequence.
					if (data.toString()[i] !== '\r') {
						// Extra check to exclude the carriage return as in Windows(unlike Unix-systems)
						// based-system '\n' is accompanied with a '\r'.
						// See - https://stackoverflow.com/a/1761086/5928129 for more.
						fastaContent += data.toString()[i];
					}
					isSecondLineOfSequence = false;
					isFirstLineOfSequence = true;
				} else if ((i !== 0 && data.toString()[i-1] === '\n' && isFirstLineOfSequence === true)
											|| (i !== 0 && data.toString()[i-1] !== '\n'
													&& isSecondLineOfSequence === true)) {
					// This is the second line of the sequence in which the nucelotide data is present.
					if (i !== 0 && data.toString()[i-1] === '\n' && isFirstLineOfSequence === true) {
						// Reset the character count counter.
						currentCharacterCount = 1;
					}
					isFirstLineOfSequence = false;
					isSecondLineOfSequence = true;
					if (currentCharacterCount < FASTA_LINE_LIMIT && data.toString()[i] !== '\r') {
						fastaContent += data.toString()[i];
						currentCharacterCount++;
					} else if (currentCharacterCount === FASTA_LINE_LIMIT && data.toString()[i] !== '\r') {
						currentCharacterCount = 1;
						fastaContent += data.toString()[i];
						fastaContent += '\n';
					}
				} else {
					// Neither the first line of the sequence nor the second line.
					isFirstLineOfSequence = false;
					isSecondLineOfSequence = false;
				}					
			}
			fs.writeFile(
					req.fileName.substring(0, req.fileName.length-6) + '.fasta',
					fastaContent,
					function(err) {
						if (err) {
							console.log('Error in writing to the output FASTA file.');
							process.send(false);							
						} else {
							console.log(
									'Finished converting - ' + req.fileName + ' to its FASTA equivalent.');
							process.send(true);
						}
					});			
		}
	});
});
