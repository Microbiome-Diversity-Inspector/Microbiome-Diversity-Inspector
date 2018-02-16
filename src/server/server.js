// Dependencies of this server module.
let express = require('express'),
		path = require('path'),
		fs = require('fs'),
		bodyParser = require('body-parser'),
		fork = require('child_process').fork,
		app = express();


// Module-level global variables of this server module.
let forkedProcesses = [];

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


process.on('exit', killAllForkedProcesses);			// Catches when this server module exits itself 
																							  // naturally.
process.on('SIGINT', killAllForkedProcesses);		// Catch termination of the server by 'Ctrl+C'.
process.on('SIGTERM', killAllForkedProcesses);	// Catch kill.


app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../client/index.html'));
});


// The algorithm divides the input file into small blocks(as determined by the variables - first,
// last and size which are defined globally). This is done to provide support for counting the
// bases in real-time. To identify which line of the 4-lined sequence(in case of FASTQ file) or
// 2-lined sequence(in case of FASTA file) contain the bases, this block is classified into four
// cases according to the number of newline characters('\n') found in between the current block.
// At the smallest level, there can be four such cases, i.e. - the current block having 0, 1, 2, 3
// newline characters. After this, the further cases can be divided in multiples of 3 and the
// remainder left, for example - if a block contains 5 newline characters, then we can say that it
// is equivalent to 1 whole sequence(having 3 newline characters) and 2 additional newline
// characters.   
app.get('/analyze', function(req, res) {
	let pathSegment = '../..';
	// If the code is ran as a part of an integration test, then use the 
	// test files' directory path.
	if (process.env.NODE_ENV === 'test') {
		pathSegment = '../../test/test_files';
	}
	let fileName = path.join(__dirname, pathSegment, req.query.fileName);
	let stat = fs.stat(fileName, function(err, stat) {
		if (err === null) {
			let first = (req.query.first === undefined) ? 0 : (+req.query.first),
					last = (req.query.last === undefined) ? 499 : (+req.query.last),
					size = 500,
					// Line number in the 4-lined sequence(in case of FASTQ
					// file) or 2-lined sequence(in case of FASTA file) of 
					// the starting character in the current block. Note that
					// the first line of the sequence has a value of 1.
					sequenceLineNumberOfStartOfBlock =
							(req.query.sequenceLineNumberOfStartOfBlock === undefined) ?
									1 : (+req.query.sequenceLineNumberOfStartOfBlock),
					// 'countObj' holds the count of A, T, G and C in the current block.
					countObj = {
						countOfA: 0,
						countOfT: 0,
						countOfG: 0,
						countOfC: 0,
					};
			if (first > stat.size) {
				res.send({
					statusCode: 'x',			// 'x' denotes that this is the last response.
					countObj: countObj,
				});
				logOnlyInNonTestEnvironment('Finished analyzing - ' + req.query.fileName);
			} else {
				if (last > stat.size) {
					last = stat.size - 1;
				}
				let numberOfLinesInASequence = isFileHavingCorrectFormat(fileName, '.fastq') ? 4 : 2,
						currentSubBlockFirst = 0,		// Refers to the first index of the current sub-block in
																				// the current block (here - 'data' as mentioned below).
						sequenceLineNumberOfStartOfSubBlock = sequenceLineNumberOfStartOfBlock,
						sequenceLineNumberOfCurrentLine = sequenceLineNumberOfStartOfBlock;
				let readStream = fs.createReadStream(fileName, {start: first, end: last});
				readStream.on('data', function(data) {
					for (let i=0; i<data.toString().length; i++) {	
						if (data.toString()[i] === '\n') {
							if (sequenceLineNumberOfCurrentLine === numberOfLinesInASequence) {
								countBasesInGivenSubBlock(
										currentSubBlockFirst,
										i,
										data.toString(),
										sequenceLineNumberOfStartOfSubBlock,
										countObj);
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
							currentSubBlockFirst,
							data.toString().length,
							data.toString(),
							sequenceLineNumberOfStartOfSubBlock,
							countObj);
				});
				readStream.on('end', function() {
					first += size;
					last += size;
					sequenceLineNumberOfStartOfBlock = sequenceLineNumberOfCurrentLine;
					res.send({
						statusCode: 'o',			// 'o' denotes that this is not the last response.
						countObj: countObj,
						nextUrl: 'http://localhost:8080/analyze?fileName=' + req.query.fileName + 
										 '&' + 'first=' + first + '&' + 'last=' + last + '&' +
										 'sequenceLineNumberOfStartOfBlock=' + sequenceLineNumberOfStartOfBlock
					});
				});		
			}			
		} else {
			logOnlyInNonTestEnvironment(req.query.fileName + ' not found in this directory.');
			res.send({
				statusCode: 'e'				// 'e' denotes a server-side error, most possibly due to the non 
															// existence of the uploaded file in this directory.
			});
		}
	});		
});


app.post('/convert-to-fasta', function(req, res) {
	logOnlyInNonTestEnvironment('Forking a process to convert FASTQ to FASTA...');
	let forkedProcess =
			fork(path.join(__dirname, 'forked_processes/fastq-to-fasta-conversion-process.js'));
	forkedProcesses.push(forkedProcess);
	forkedProcess.on('message', function(response) {
		killAndRemoveForkedProcessFromList(forkedProcess);
		res.send(response);
	});
	forkedProcess.send({fileName: req.body.fileName});
});


app.post('/convert-to-fastq', function(req, res) {	
	logOnlyInNonTestEnvironment('Forking a process to convert FASTA to FASTQ...');
	let forkedProcess =
			fork(path.join(__dirname, 'forked_processes/fasta-to-fastq-conversion-process.js'));
	forkedProcesses.push(forkedProcess);
	forkedProcess.on('message', function(response) {
		killAndRemoveForkedProcessFromList(forkedProcess);
		res.send(response);
	});
	forkedProcess.send({
		fastaFileName: req.body.fastaFileName,
		qualFileName: req.body.qualFileName
	});
});


app.get('/compute-alpha-diversity', function(req, res) {
	logOnlyInNonTestEnvironment('Forking a process for computing the alpha-diversity...');
	let forkedProcess =
			fork(path.join(__dirname, 'forked_processes/alpha-diversity-computation-process.js'));
	forkedProcesses.push(forkedProcess);
	forkedProcess.on('message', function(response) {
		killAndRemoveForkedProcessFromList(forkedProcess);
		res.send(response);
	});
	forkedProcess.send({
		sampleId: req.query.sampleId,
		apiKey: req.query.apiKey,
		orderOfDiversity: req.query.orderOfDiversity
	});
});


/**
 * A function to compute the counts of A, T, G and C in the given range.
 *
 * @function
 * @param {number} start The starting index of this range.
 * @param {number} end The ending index of this range.
 * @param {data} data The data in which the computation is to be performed.
 * @param {Object} countObj Object to store the counts of A, T, G and C.
 * @param {number} countObj.countOfA The count of Adenine.
 * @param {number} countObj.countOfT The count of Thymine.
 * @param {number} countObj.countOfG The count of Guanine.
 * @param {number} countObj.countOfC The count of Cytosine.
 */
function countBasesInGivenRange(start, end, data, countObj) {
	for (let i=start; i<end; i++) {
		if (data[i] === 'A') {
			countObj.countOfA++;
		} else if (data[i] === 'T') {
			countObj.countOfT++;
		} else if (data[i] === 'G') {
			countObj.countOfG++;
		} else if (data[i] === 'C') {
			countObj.countOfC++;
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
 * @param {Object} countObj Object to store the counts of A, T, G and C.
 * @param {number} countObj.countOfA The count of Adenine.
 * @param {number} countObj.countOfT The count of Thymine.
 * @param {number} countObj.countOfG The count of Guanine.
 * @param {number} countObj.countOfC The count of Cytosine.
 */
function countBasesInGivenSubBlock(
		start, end, subBlock, sequenceLineNumberOfStartCharacter, countObj) {
	let numberOfNewLines = 0;
	for (let i=start; i<end; i++) {
		if (subBlock[i] === '\n') {
			numberOfNewLines++;
		}
	}
	if (numberOfNewLines === 0 && sequenceLineNumberOfStartCharacter === 2) {
		countBasesInGivenRange(start, end, subBlock, countObj);
	} else if (numberOfNewLines === 1) {
		if (sequenceLineNumberOfStartCharacter === 1) {
			countBasesInGivenRange(
					getNthNewLinePos(start, end, subBlock, 1) + 1, end, subBlock, countObj);
		} else if (sequenceLineNumberOfStartCharacter === 2) {
			// A FASTA file control will never reach this scope.
			countBasesInGivenRange(
					start, getNthNewLinePos(start, end, subBlock, 1), subBlock, countObj);
		}
	} else if (numberOfNewLines === 2) {
		// A FASTA file control will never reach this scope.
		if (sequenceLineNumberOfStartCharacter === 1) {
			countBasesInGivenRange(
					getNthNewLinePos(start, end, subBlock, 1) + 1,
					getNthNewLinePos(start, end, subBlock, 2),
					subBlock,
					countObj);
		} else if (sequenceLineNumberOfStartCharacter === 2) {
			countBasesInGivenRange(
					start, getNthNewLinePos(start, end, subBlock, 1), subBlock, countObj);
		}
	} else if (numberOfNewLines === 3) {
		// A FASTA file control will never reach this scope.
		// At this point it is guarantedd that the value of 'sequenceLineNumberOfStartCharacter'
		// would be 1 since a sub-block as received as a parameter in this function cannot have 
		// more than 4 newlines.
		countBasesInGivenRange(
				getNthNewLinePos(start, end, subBlock, 1) + 1,
				getNthNewLinePos(start, end, subBlock, 2),
				subBlock,
				countObj);		
	}
}


/**
 * A function to kill all the forked processes arising from the current process.
 *
 * @function
 */
function killAllForkedProcesses() {
	logOnlyInNonTestEnvironment('Killing ' + forkedProcesses.length + ' forked processes...');
	for(let i=0; i<forkedProcesses.length; i++) {
		forkedProcesses[i].kill();
	}		
	process.exit();
}


/**
 * A function to kill the given forked processes and remove it from the list of active 
 * fored processes.
 *
 * @function
 */
function killAndRemoveForkedProcessFromList(forkedProcess) {
	forkedProcesses.splice(forkedProcesses.indexOf(forkedProcess), 1);
	logOnlyInNonTestEnvironment('Killing the forked process...');
	forkedProcess.kill();
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

let server = app.listen(8080, function() {
	logOnlyInNonTestEnvironment(
			'\'Microbiome Diversity Inspector\' now running at http://localhost:' +
			server.address().port);
});


module.exports = server;
