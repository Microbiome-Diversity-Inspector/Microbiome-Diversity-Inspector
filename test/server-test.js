let server = require('./../src/server/server.js');
let request = require('supertest');
let assert = require('assert');

describe('Integration Tests', function() {

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

		it('should analyze the \'uploaded\' and send back the updated counts after each successive requests',
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
						done();
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
								done();
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
										done();
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
											});												
									});
							});
				});
		});					
	});
});
