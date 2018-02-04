let server = require('./server');
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
		it('should return after initializing the entropy analysis variables successfully',
			function() {
				request(server)
					.post('/analyze')
					.send({name: 'test'})
					.end(function(err, res) {
						assert.equal(res.statusCode, 200);
						assert.equal(res.text, 'Posting done.');
					});
			});	
			
		it('should analyze the \'uploaded\' file and send back the updated counts after each successive requests',
			function(done) {
				request(server)
					.post('/analyze')
					.send({name: 'fastq-test-file.fastq'})
					.end(function(err, res) {
						done();
						request(server)
							.get('/analyze')
							.end(function(err, res) {
								let expectedBody = {
									statusCode: 'o',
									countObj: {
										countOfA: 48,
										countOfT: 34,
										countOfG: 49,
										countOfC: 49
									}
								};
								// Asserting the counts in the first request.
								assert.deepEqual(res.body, expectedBody);
								done();
								request(server)
									.get('/analyze')
									.end(function(err, res) {
										let expectedBody = {
											statusCode: 'o',
											countObj: {
												countOfA: 82,
												countOfT: 66,
												countOfG: 125,
												countOfC: 87
											}											
										};
										// Asserting the counts in the second request.
										assert.deepEqual(res.body, expectedBody);
										done();
										request(server)
											.get('/analyze')
											.end(function(err, res) {
												let expectedBody = {
													statusCode: 'o',
													countObj: {
														countOfA: 107,
														countOfT: 100,
														countOfG: 141,
														countOfC: 102
													}
												};
												// Asserting the counts in the third request.
												assert.deepEqual(res.body, expectedBody);	
												done();
												request(server)
													.get('/analyze')
													.end(function(err, res) {
														let expectedBody = {
															statusCode: 'x',
															countObj: {
																countOfA: 107,
																countOfT: 100,
																countOfG: 141,
																countOfC: 102
															}
														};
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
});
