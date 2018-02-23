let server = require('./../../src/server/server.js'),
		request = require('supertest'),
		assert = require('assert'),
		fs = require('fs'),
		path = require('path');

process.env.NODE_ENV = 'test';
				
describe('Integration Tests', function() {
	
	let removeCharacter = function(input, characterToRemove) {
		let output = '';
		for (let i=0; i<input.length; i++) {
			if (input[i] !== characterToRemove) {
				output += input[i];
			}
		}
		return output;
	}
	
	let assertFile = function(actualFileName, expectedFileName) {
	  let actualFileContent,
				expectedFileContent;
		try {
			actualFileContent =
					removeCharacter(
							fs.readFileSync(path.join(__dirname, 'test_files', actualFileName)).toString('utf8'),
							'\r');
		} catch(e) {
			console.log('Error in reading the actual file.');
		};
		try {
			expectedFileContent =
					removeCharacter(
							fs.readFileSync(
									path.join(__dirname, 'test_files', expectedFileName)).toString('utf8'),
							'\r');
		} catch(e) {
			console.log('Error in reading the expected file.');
		};
		assert.equal(actualFileContent, expectedFileContent);		
	};
	
	after(function (done) {
		server.close();
		done();
	});

	it('should serve the home-page of the tool', function() {
		request(server)
			.get('/')
			.end(function(err, res) {
				assert.equal(res.header['content-type'], 'text/html; charset=UTF-8');
				assert.equal(res.statusCode, 200);
			});
	});
	
	describe('for analyzing entropy', function() {

		it('should return the correct response if the file does not exists',
			function(done) {
				request(server)
					.get('/analyze?fileName=non-existing-file.fastq')
					.end(function(err, res) {
						let expectedBody = {
							statusCode: 'e'								
						};
						assert.equal(res.statusCode, 200);
						// Asserting the status code in the response body.
						assert.deepEqual(res.body, expectedBody);
						done();
				});
		});		
	
		it('should analyze the \'uploaded\' and send back the updated counts after each successive requests',
			function(done) {
				request(server)
					.get('/analyze?fileName=fastq-test-file.fastq')
					.end(function(err, res) {
						let expectedBody = {
							statusCode: 'o',
							countObj: {
								countOfA: 48,
								countOfT: 34,
								countOfG: 49,
								countOfC: 49
							},
							nextUrl: 'http://localhost:8080/analyze?fileName=fastq-test-file.fastq&first=500&last=999' +
											 '&sequenceLineNumberOfStartOfBlock=1'									
						};
						assert.equal(res.statusCode, 200);
						// Asserting the counts in the first request.
						assert.deepEqual(res.body, expectedBody);
						request(server)
							.get('/analyze?fileName=fastq-test-file.fastq&first=500&last=999&sequenceLineNumberOfStartOfBlock=1')
							.end(function(err, res) {
								let expectedBody = {
									statusCode: 'o',
									countObj: {
										countOfA: 34,
										countOfT: 32,
										countOfG: 76,
										countOfC: 38
									},
									nextUrl: 'http://localhost:8080/analyze?fileName=fastq-test-file.fastq&first=1000&last=1499' +
													 '&sequenceLineNumberOfStartOfBlock=1'																				
								};
								assert.equal(res.statusCode, 200);
								// Asserting the counts in the second request.
								assert.deepEqual(res.body, expectedBody);
								request(server)
									.get('/analyze?fileName=fastq-test-file.fastq&first=1000&last=1499&sequenceLineNumberOfStartOfBlock=1')
									.end(function(err, res) {
										let expectedBody = {
											statusCode: 'o',
											countObj: {
												countOfA: 25,
												countOfT: 34,
												countOfG: 16,
												countOfC: 15
											},
											nextUrl: 'http://localhost:8080/analyze?fileName=fastq-test-file.fastq&first=1500&last=1697' +
															 '&sequenceLineNumberOfStartOfBlock=4'															
										};
										assert.equal(res.statusCode, 200);
										// Asserting the counts in the third request.
										assert.deepEqual(res.body, expectedBody);	
										request(server)
											.get('/analyze?fileName=fastq-test-file.fastq&first=1500&last=1697&sequenceLineNumberOfStartOfBlock=4')
											.end(function(err, res) {
												let expectedBody = {
													statusCode: 'x',
													countObj: {
														countOfA: 0,
														countOfT: 0,
														countOfG: 0,
														countOfC: 0
													}
												};
												assert.equal(res.statusCode, 200);
												// Asserting the counts in the final connection-closing 
												// request.
												assert.deepEqual(res.body, expectedBody);	
												done();
											});												
									});
							});
				});
		});					
	});	
	
	describe('for converting FASTQ to FASTA', function() {

		it('should return false as a response if the file does not exists',
			function(done) {
				request(server)
					.post('/convert-to-fasta')
					.send({fileName: 'non-existing-file.fastq'})
					.end(function(err, res) {
						assert.equal(res.statusCode, 200);
						assert.deepEqual(res.body, false);
						done();
				});
		});		
	
		it('should convert a FASTQ file to its FASTA equivalent',
			function(done) {
				request(server)
					.post('/convert-to-fasta')
					.send({fileName: 'fastq-test-file.fastq'})
					.end(function(err, res) {
						assert.equal(res.statusCode, 200);
						assert.deepEqual(res.body, true);
						assertFile('fastq-test-file.fasta', 'expected-fastq-to-fasta-test-file.fasta');
						done();
				});
		});		
	});	

	describe('for converting FASTA to FASTQ', function() {

		it('should return false as a response if the FASTA file does not exists',
			function(done) {
				request(server)
					.post('/convert-to-fastq')
					.send({
						fastaFileName: 'non-existing-file.fasta',
						qualFileName: 'qual-test-file.qual'
					})
					.end(function(err, res) {
						assert.equal(res.statusCode, 200);
						assert.deepEqual(res.body, false);
						done();
				});
		});		

		it('should return false as a response if the QUAL file does not exists',
			function(done) {
				request(server)
					.post('/convert-to-fastq')
					.send({
						fastaFileName: 'fasta-test-file.fasta',
						qualFileName: 'non-existing-file.qual'
					})
					.end(function(err, res) {
						assert.equal(res.statusCode, 200);
						assert.deepEqual(res.body, false);
						done();
				});
		});		
		
		it('should convert a FASTQ file to its FASTA equivalent',
			function(done) {
				request(server)
					.post('/convert-to-fastq')
					.send({
						fastaFileName: 'fasta-test-file.fasta',
						qualFileName: 'qual-test-file.qual'
					})
					.end(function(err, res) {
						assert.equal(res.statusCode, 200);
						assert.deepEqual(res.body, true);
						assertFile('fasta-test-file.fastq', 'expected-fasta-to-fastq-test-file.fastq');
						done();
				});
		});	
	});	

	describe('for alpha-diversity computation', function() {
	  this.timeout(15000);
	
		function precisionRound(number, precision) {
			let factor = Math.pow(10, precision);
			return Math.round(number * factor) / factor;
		}	
	
		it('should compute the correct value of alpha-diversity if the order of diversity is not equal to 1',
			function(done) {
				request(server)
					.get('/compute-alpha-diversity?apiKey=42b357bd1b5f46f88d3cc157f7919d2d&sampleId=0d25bce4f7a445f0&orderOfDiversity=2')
					.end(function(err, res) {
						assert.equal(res.statusCode, 200);
						assert.equal(precisionRound(+res.text, 8), 6.60598583);
						done();
				});
		});		

		it('should compute the correct value of alpha-diversity if the order of diversity is equal to 1',
			function(done) {
				request(server)
					.get('/compute-alpha-diversity?apiKey=42b357bd1b5f46f88d3cc157f7919d2d&sampleId=0d25bce4f7a445f0&orderOfDiversity=1')
					.end(function(err, res) {
						assert.equal(res.statusCode, 200);
						assert.equal(precisionRound(+res.text, 8), 1.99453478);
						done();
				});
		});	
	});		
});
