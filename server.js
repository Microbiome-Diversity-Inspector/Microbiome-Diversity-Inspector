var express = require('express');
var path = require('path');
var fs = require('fs');
var stream = require('stream');
var readline = require('readline');
var bodyParser = require('body-parser');
var app = express();

var countOfA, countOfT, countOfG, countOfC, first, last, size, fileName;

app.use(express.static(path.join(__dirname, '')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


app.get('/', function( req, res ) {
	res.sendFile(path.join(__dirname, 'tool.html'));
});

// TODO: Comply with REST standards. POST calls are meant to alter the system whereas none
// of the POST request is altering the system due to the intentional "lack" of database in
// this project.
app.post('/analyze', function(req, res) {
	countOfA = 0, countOfT = 0, countOfG = 0, countOfC = 0, first = 0, last = 499, size = 500;
	fileName = path.join(__dirname, req.body.name);
	res.send('Posting done');
});


app.get('/analyze', function(req, res) {
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
			let readStream = fs.createReadStream(fileName, {start: first, end: last});
			readStream.on('data', function(data) {
				for (let i=0; i<data.toString().length; i++) {
					// TODO: Exclude unneccessary characters taken into calculations.
					switch (data.toString()[i]) {
						case 'A':
							countOfA++;
							break;
						case 'T':
							countOfT++;
							break;
						case 'G':
							countOfG++;
							break;
						case 'C':
							countOfC++;
							break;
					}
				}
			});
			first += size;
			last += size;
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
	}
});


app.post('/convertToFasta', function(req, res) {
	let fastqFileName = path.join(__dirname, req.body.name);
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
					|| (data.toString()[i-1] === '\n' && data.toString()[i] === '@' && isFirstLineOfSequence === false)) {
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
									|| (i !== 0 && data.toString()[i-1] !== '\n' && isSecondLineOfSequence === true)) {
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
		console.log('Finished converting - ' + req.body.name + ' to its FASTA equivalent');
		res.send(fastaContent);
	});
});


app.post('/convertToFastq', function(req, res) {
	let fastaFileName = path.join(__dirname, req.body.fastaFileName);
	let qualFileName = path.join(__dirname, req.body.qualFileName);
	// Parse the FASTA file.
	// If 'isFirstLineOfSequence' is set to false then it automatically means that the current
	// line is the second line of the sequence having the nucelotide sequence.
	let isFirstLineOfSequence = true;
	let currentReadName = '';
	let currentBase = '';
	let readNameToBaseMap = {};
	let fastaReadStream = fs.createReadStream(fastaFileName);
	fastaReadStream.on('data', function(data) {
		for (let i=0; i<data.toString().length; i++) {
			// This is the first line of the sequence.
			if (i === 0
					|| (data.toString()[i-1] === '\n' && data.toString()[i] === '>' && isFirstLineOfSequence === false)) {
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
				// This is the second and the last line of the sequence in which the nucelotide data is present.
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
	let qualReadStream = fs.createReadStream(qualFileName);
	qualReadStream.on('data', function(data) {
		for (let i=0; i<data.toString().length; i++) {
			// This is the first line of the sequence.
			if (i === 0
					|| (data.toString()[i-1] === '\n' && data.toString()[i] === '>' && isFirstLineOfSequence === false)) {
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
				} else if (data.toString()[i] === ' ' || data.toString()[i] === '\n' || data.toString()[i] === '\r') {
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
		console.log('Finished converting - ' + req.body.fastaFileName + ' to its FASTA equivalent');
		res.send(fastqContent);
	});
});


/**
 * A private function to map a decimal quality to Sanger-styled quality
 * using the formula - chr(Q+33) as mentioned in -
 * http://biopython.org/DIST/docs/api/Bio.SeqIO.QualityIO-module.html
 */
function convertDecimalQualityInStringFormatToSangerStyledQuality(input) {
	let qualityInDecimalFormat = parseInt(input, 10);
	return String.fromCharCode(qualityInDecimalFormat + 33);
}

var server = app.listen(8080, function() {
	let host = server.address().address;
  let port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
