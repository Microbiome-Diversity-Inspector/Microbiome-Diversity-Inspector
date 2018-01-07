var express = require('express');
var cors = require('cors')
var app = express();
var fs = require('fs');
var stream = require('stream');
var readline = require('readline');
var bodyParser = require('body-parser');

var countOfA, countOfT, countOfG, countOfC, first, last, size, fileName;

app.use(cors())		

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
	
	
app.post('/analyze', function(req, res) {
	countOfA = 0, countOfT = 0, countOfG = 0, countOfC = 0, first = 0, last = 99, size = 100;
	fileName = './' + req.body.name;
	res.send('Posting done');
});		
		
		
app.get('/analyze', function (req, res) {
	var stat = fs.statSync(fileName);
	if (first > stat.size) { 
		 var countObj = {
				 countOfA: countOfA,
				 countOfT: countOfT,
				 countOfG: countOfG,
				 countOfC: countOfC
		 };
		 res.send({
			 statusCode: 'x',			// 'x' denotes that this is the last response.
			 countObj: countObj
		 });
		 console.log('Finished analyzing - ' + fileName);
	} else {					
			if (last > stat.size) {
				last = stat.size - 1;
			}	
			var readStream = fs.createReadStream(fileName, {start: first, end: last});
			readStream.on("data", function(data) {
				for (var i=0; i<data.toString().length; i++) {
					// TODO: Exclude unneccessary characters taken into calculations.
					switch(data.toString()[i]) {
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
				countOfC: countOfC
			};
			res.send({
				statusCode: 'o',			// 'o' denotes that this is not the last response.
				countObj: countObj
			});
	}
})


app.post('/convertToFasta', function(req, res) {
	fileName = './' + req.body.name;
	var readStream = fs.createReadStream(fileName);
	// The line limit in FASTA format as mentioned in - https://en.wikipedia.org/wiki/FASTA_format
	var FASTA_LINE_LIMIT = 60;
	var currentCharacterCount = 1;
	var fastaContent = '';
	var isFirstLineOfSequence = true;
	var isSecondLineOfSequence = false;
	// The below code assumes that the file uploaded is a proper FASTQ file 
	// following the rules as mentioned in - https://en.wikipedia.org/wiki/FASTQ_format
	readStream.on("data", function(data) {
		for (var i=0; i<data.toString().length; i++) {
			// This is the first line of the sequence.
			if (i === 0
					|| (data.toString()[i-1] === '\n' && data.toString()[i] === '@' && isFirstLineOfSequence === false)) {
				fastaContent += '>';
				isSecondLineOfSequence = false;
				isFirstLineOfSequence = true;
			} else if (i !== 0 && data.toString()[i-1] !== '\n' && isFirstLineOfSequence === true) {
				fastaContent += data.toString()[i];
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
				if (currentCharacterCount < FASTA_LINE_LIMIT) {
					fastaContent += data.toString()[i];
					currentCharacterCount++;	
				} else if (currentCharacterCount === FASTA_LINE_LIMIT) {
					currentCharacterCount = 1;
					fastaContent += data.toString()[i];
					fastaContent += '\n';
				}
			} else {
				isFirstLineOfSequence = false;
				isSecondLineOfSequence = false;
			}
		}
	});		
	readStream.on('end', () => {
		console.log('Finished converting - ' + fileName + ' to its FASTA equivalent');
		res.send(fastaContent);
	});	
});	


app.post('/convertToFastq', function(req, res) {
	fileName = './' + req.body.name;
	res.send('This is a sample text for .fastq file');
});	


var server = app.listen(8080, function () {
	var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
