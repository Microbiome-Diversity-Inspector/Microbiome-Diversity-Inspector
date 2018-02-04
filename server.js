let express = require('express');
let path = require('path');
let fs = require('fs');
let stream = require('stream');
let readline = require('readline');
let bodyParser = require('body-parser');
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let app = express();


// Global variables used by the server.
let countOfA,
		countOfT,
		countOfG,
		countOfC,
		first,
		last,
		size,
		fileName,
		sequenceLineNumberOfStartOfBlock;	// Line number in the 4-lined sequence(in case of FASTQ file) 
																			// or 2-lined sequence(in case of FASTA file) of the starting
																			// character in the current block. Note that the first line of
																			// the sequence has a value of 1.

app.use(express.static(path.join(__dirname, '')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


app.get('/', function( req, res ) {
	res.sendFile(path.join(__dirname, 'tool.html'));
});


// TODO: Comply with REST standards. POST calls are meant to alter the system whereas none
// of the POST request is altering the system due to the intentional "lack" of database in
// this project (more famously - 'M' in MVC architecture).
app.post('/analyze', function(req, res) {
	countOfA = 0, countOfT = 0, countOfG = 0, countOfC = 0, first = 0, last = 499, size = 500;
	sequenceLineNumberOfStartOfBlock = 1;
	fileName = path.join(__dirname, req.body.name);
	res.send('Posting done.');
});


// The algorithm divides the input file into small blocks(as determined by the variables - first, last 
// and size which are defined globally). This is done to provide support for counting the bases in 
// real-time. To identify which line of the 4-lined sequence(in case of FASTQ file) or 2-lined sequence
// (in case of FASTA file) contain the bases, this block is classified into four cases according to the
// number of newline characters('\n') found in between the current block. At the smallest level, there
// can be four such cases, i.e. - the current block having 0, 1, 2, 3 newline characters. After this, 
// the further cases can be divided in multiples of 3 and the remainder left, for example - 
// if a block contains 5 newline characters, then we can say that it is equivalent to 1 whole sequence
// (having 3 newline characters) and 2 additional newline characters.   
app.get('/analyze', function(req, res) {
	// TODO: Maybe add a try-catch block to fix -
  // https://github.com/gbelwariar/Microbiome-Diversity-Inspector/issues/73
	let stat = fs.statSync(fileName);
	if (first > stat.size) {
		var countObj = {
			countOfA: countOfA,
			countOfT: countOfT,
			countOfG: countOfG,
			countOfC: countOfC,
		};
		res.send({
			statusCode: 'x',			// 'x' denotes that this is the last response.
		  countObj: countObj,
		});
		console.log('Finished analyzing - ' + fileName);
	} else {
		if (last > stat.size) {
			last = stat.size - 1;
		}
		let numberOfLinesInASequence = isFileHavingCorrectFormat(fileName, '.fastq') ? 4 : 2;
		let currentSubBlockFirst = 0;		// Refers to the first index of the current sub-block in the current 
																		// block (here - 'data' as mentioned below).
		let sequenceLineNumberOfStartOfSubBlock = sequenceLineNumberOfStartOfBlock;
		let sequenceLineNumberOfCurrentLine = sequenceLineNumberOfStartOfBlock;
		let readStream = fs.createReadStream(fileName, {start: first, end: last});
		readStream.on('data', function(data) {
			for (let i=0; i<data.toString().length; i++) {	
				if (data.toString()[i] === '\n') {
					if (sequenceLineNumberOfCurrentLine === numberOfLinesInASequence) {
						countBasesInGivenSubBlock(
								currentSubBlockFirst, i, data.toString(), sequenceLineNumberOfStartOfSubBlock);
						sequenceLineNumberOfStartOfSubBlock = 1;
						currentSubBlockFirst = i + 1;
					}
					sequenceLineNumberOfCurrentLine++;
					if (sequenceLineNumberOfCurrentLine === numberOfLinesInASequence + 1) {
						sequenceLineNumberOfCurrentLine = 1;
					}
				}	
			}
			countBasesInGivenSubBlock(
					currentSubBlockFirst, data.toString().length, data.toString(), sequenceLineNumberOfStartOfSubBlock);
		});
		readStream.on('end', function() {
			first += size;
			last += size;
			sequenceLineNumberOfStartOfBlock = sequenceLineNumberOfCurrentLine;
			var countObj = {
				countOfA: countOfA,
				countOfT: countOfT,
				countOfG: countOfG,
				countOfC: countOfC,
			};
			res.send({
				statusCode: 'o',			// 'o' denotes that this is not the last response.
				countObj: countObj,
			});
		});
	}
});


app.post('/convert-to-fasta', function(req, res) {
	let fastqFileName = path.join(__dirname, req.body.name);
	// TODO: Maybe add a try-catch block to fix -
  // https://github.com/gbelwariar/Microbiome-Diversity-Inspector/issues/73	
	let readStream = fs.createReadStream(fastqFileName);
	// The line limit in FASTA format as mentioned in - https://en.wikipedia.org/wiki/FASTA_format
	let FASTA_LINE_LIMIT = 60;
	let currentCharacterCount = 1;
	let fastaContent = '';
	let isFirstLineOfSequence = true;
	let isSecondLineOfSequence = false;
	// The below code assumes that the file uploaded is a proper FASTQ file
	// following the rules as mentioned in - https://en.wikipedia.org/wiki/FASTQ_format
	readStream.on('data', function(data) {
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
	});
	readStream.on('end', function() {
		console.log('Finished converting - ' + req.body.name + ' to its FASTA equivalent.');
		console.log('\ncountOfA - ' +  countOfA);
		console.log('\ncountOfT - ' +  countOfT);
		console.log('\ncountOfG - ' +  countOfG);
		console.log('\ncountOfC - ' +  countOfC);
		res.send(fastaContent);
	});
});


app.post('/convert-to-fastq', function(req, res) {
	let fastaFileName = path.join(__dirname, req.body.fastaFileName);
	let qualFileName = path.join(__dirname, req.body.qualFileName);
	// Parse the FASTA file.
	// If 'isFirstLineOfSequence' is set to false then it automatically means that the current
	// line is the second line of the sequence having the nucelotide sequence.
	let isFirstLineOfSequence = true;
	let currentReadName = '';
	let currentBase = '';
	let readNameToBaseMap = {};
	// TODO: Maybe add a try-catch block to fix -
  // https://github.com/gbelwariar/Microbiome-Diversity-Inspector/issues/73	
	let fastaReadStream = fs.createReadStream(fastaFileName);
	fastaReadStream.on('data', function(data) {
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
	});
	fastaReadStream.on('end', function() {
		if (currentReadName !== '') {
			readNameToBaseMap[currentReadName] = currentBase;
		}
	});

	// Parse the QUAL file.
	isFirstLineOfSequence = true;
	currentReadName = '';
	// See - http://biopython.org/DIST/docs/api/Bio.SeqIO.QualityIO-module.html to know more about
	// Sanger-styled qualities.
	let currentSangerStyledQualities = '';
	let currentDecimalQualityInStringFormat = '';
	let readNameToSangerStyledQualityMap = {};
	// TODO: Maybe add a try-catch block to fix -
  // https://github.com/gbelwariar/Microbiome-Diversity-Inspector/issues/73	
	let qualReadStream = fs.createReadStream(qualFileName);
	qualReadStream.on('data', function(data) {
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
			} else if (i !== 0 && data.toString()[i-1] !== '\n' && isFirstLineOfSequence === true) {
				// This is the first line of the sequence.
				if (data.toString()[i] !== '\n' && data.toString()[i] !== '\r') {
					currentReadName += data.toString()[i];
				}
				isFirstLineOfSequence = true;
			} else if ((i !== 0 && data.toString()[i-1] === '\n' && isFirstLineOfSequence === true)
										|| isFirstLineOfSequence === false) {
				// This is the second and the last line of the sequence in which the nucelotide data is present.
				if (i !== 0 && data.toString()[i-1] === '\n' && isFirstLineOfSequence === true) {
					// Reset the current Sanger-styled quality.
					currentSangerStyledQualities = '';
					currentDecimalQualityInStringFormat = '';
				}
				isFirstLineOfSequence = false;
				if (data.toString()[i] !== ' ' && data.toString()[i] !== '\n' && data.toString()[i] !== '\r') {
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
									convertDecimalQualityInStringFormatToSangerStyledQuality(currentDecimalQualityInStringFormat);
						currentDecimalQualityInStringFormat = '';
					}
				}
			}
		}
	});
	qualReadStream.on('end', function() {
		if (currentReadName !== '') {
			if (currentDecimalQualityInStringFormat != '') {
				currentSangerStyledQualities =
							currentSangerStyledQualities +
							convertDecimalQualityInStringFormatToSangerStyledQuality(currentDecimalQualityInStringFormat);
			}
			readNameToSangerStyledQualityMap[currentReadName] = currentSangerStyledQualities;
		}
		let fastqContent = '';
		for (let key in readNameToBaseMap) {
			if (readNameToBaseMap.hasOwnProperty(key)) {
				fastqContent += '@';
				fastqContent += key;
				// We don't add a '\r' before adding '\n' since just adding a '\n' is compatible
				// with both Windows and Unix-based systems whereas in Unix a '\r' does not signify anything.
				// See - https://stackoverflow.com/a/1761086/5928129 for more.
				fastqContent += '\n';
				fastqContent += readNameToBaseMap[key];
				fastqContent += '\n';
				fastqContent += '+';
				fastqContent += '\n';
				fastqContent += readNameToSangerStyledQualityMap[key];
				fastqContent += '\n';
			}
		}
		console.log('Finished converting - ' + req.body.fastaFileName + ' to its FASTA equivalent.');
		res.send(fastqContent);
	});
});


app.get('/compute-alpha-diversity', function( req, res ) {
	let request = new XMLHttpRequest();
	let url = 'https://app.onecodex.com/api/v1/analyses/' + req.query.sampleId + '/results';
	request.open('GET', url, true);
	request.setRequestHeader(
		'Authorization', 'Basic ' + Buffer.from(req.query.apiKey + ':').toString('base64'));
	request.onload = function() {
		let response = JSON.parse(request.responseText);
		if (request.status >= 500) {
			res.send('X');
		} else {
			// Formula used to compute alpha-diversity is as follows -
			// qD = 1/(sqrt[q-1]{sum{i=1}^{S} Pi^q})
			// pronounced as - 'inverse of (q-1)th root of summation of Pi for all
			// species - 'i' present in the dataset, where Pi is the ratio of count
			// of individual of species - i to the total number of species and q is
			// the order of diversity'.
			let organisms = response.table;
			let q = +req.query.orderOfDiversity;	// The order of diversity converted to a number.
			let m = 0;		// The total number of organism in the dataset.
			for (let i=0; i<organisms.length; i++) {
				if (isNonHostSpecies(organisms[i]) === true) {
					m += organisms[i].readcount;
				}
			}
			let alphaDiversity;
			// If order of diversity is 1, then delegate to Shannon's index to compute
			// alpha-diversity as mentioned here - https://en.wikipedia.org/wiki/Diversity_index#Shannon_index
			if (q === 1) {
				alphaDiversity = 0;
				for (let i=0; i<organisms.length; i++) {
					if (isNonHostSpecies(organisms[i]) === true) {
						alphaDiversity -= (organisms[i].readcount === 0 ? 0 : (organisms[i].readcount/m) * Math.log(organisms[i].readcount/m));
					}
				}
			} else {
				let basicSum = 0;
				for (let i=0; i<organisms.length; i++) {
					if (isNonHostSpecies(organisms[i]) === true) {
						basicSum += Math.pow(organisms[i].readcount/m /** Pi */, q);
					}
				}
				alphaDiversity = Math.pow(basicSum, 1-q);
			}
			console.log('Alpha-diversity of the file has been computed.');
			res.send(alphaDiversity.toString());
		}
	};
	request.send();
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
 * A function to compute the counts of A, T, G and C in the given range.
 *
 * @function
 * @param {number} start The starting index of this range.
 * @param {number} end The ending index of this range.
 * @param {data} data The data in which the computation is to be performed.
 */
function countBasesInGivenRange(start, end, data) {
	for (let i=start; i<end; i++) {
		if (data[i] === 'A') {
			countOfA++;
		} else if (data[i] === 'T') {
			countOfT++;
		} else if (data[i] === 'G') {
			countOfG++;
		} else if (data[i] === 'C') {
			countOfC++;
		}
	}
}


/**
 * A function to get the index of the given - N'th newline in the given
 * data present in between [start, end] (both inclusive).
 *
 * @function
 * @param {number} start The starting index of this range.
 * @param {number} end The ending index of this range.
 * @param {data} data The data in which the computation is to be performed.
 * @param {number} N The nth newline of which the index has to be determined. 
 */
function getNthNewLinePos(start, end, data, N) {
	let numberOfNewLinesEncounteredYet = 0;
	for (let i=start; i<end; i++) {
		if (data[i] === '\n') {
			numberOfNewLinesEncounteredYet++;
			if (numberOfNewLinesEncounteredYet === N) {
				return i;
			}
		}
	}
}


/**
 * A function to determine whether a file with the given filename has the given
 * file format.
 *
 * @function
 * @param {string} fileName The name of the file.
 * @param {string} expectedFileFormat The file format to check against with.
 * @return {boolean} 
 */
function isFileHavingCorrectFormat(fileName, expectedFileFormat) {
	return (fileName.length < expectedFileFormat.length) ?
		false : fileName.substring(fileName.length-expectedFileFormat.length) === expectedFileFormat;
}


/**
 * A function to count A, T, G and C in the given sub-block between the given starting(inclusive) 
 * and ending(exclusive) index.
 *
 * @function
 * @param {number} start The starting index of the given sub-block.
 * @param {number} end The ending index of the given sub-block.
 * @param {string} subBlock The given sub-block.
 * @param {number} sequenceLineNumberOfStartCharacter The line number in the 4-sequenced 
 *																										read(for FASTQ file) and 2-sequenced
 *																										read(for FASTA file) where the character
 *                                                    at index - 'start' in the given sub-block
 *																										is present.
 */
function countBasesInGivenSubBlock(start, end, subBlock, sequenceLineNumberOfStartCharacter) {
	let numberOfNewLines = 0;
	for (let i=start; i<end; i++) {
		if (subBlock[i] === '\n') {
			numberOfNewLines++;
		}
	}
	if (numberOfNewLines === 0 && sequenceLineNumberOfStartCharacter === 2) {
		countBasesInGivenRange(start, end, subBlock);
	} else if (numberOfNewLines === 1) {
		if (sequenceLineNumberOfStartCharacter === 1) {
			countBasesInGivenRange(getNthNewLinePos(start, end, subBlock, 1) + 1, end, subBlock);
		} else if (sequenceLineNumberOfStartCharacter === 2) {
			// A FASTA file control will never reach this scope.
			countBasesInGivenRange(start, getNthNewLinePos(start, end, subBlock, 1), subBlock);
		}
	} else if (numberOfNewLines === 2) {
		// A FASTA file control will never reach this scope.
		if (sequenceLineNumberOfStartCharacter === 1) {
			countBasesInGivenRange(
					getNthNewLinePos(start, end, subBlock, 1) + 1,
					getNthNewLinePos(start, end, subBlock, 2),
					subBlock);
		} else if (sequenceLineNumberOfStartCharacter === 2) {
			countBasesInGivenRange(start, getNthNewLinePos(start, end, subBlock, 1), subBlock);
		}
	} else if (numberOfNewLines === 3) {
		// A FASTA file control will never reach this scope.
		// At this point it is guarantedd that the value of 'sequenceLineNumberOfStartCharacter'
		// would be 1 since a sub-block as received as a parameter in this function cannot have 
		// more than 4 newlines.
		countBasesInGivenRange(
				getNthNewLinePos(start, end, subBlock, 1) + 1,
				getNthNewLinePos(start, end, subBlock, 2),
				subBlock);		
	}
}


let server = app.listen(8080, function() {
	let host = server.address().address;
	let port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});


module.exports = server;
