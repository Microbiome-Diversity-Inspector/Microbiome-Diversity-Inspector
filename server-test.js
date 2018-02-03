let server = require('./server');
let request = require('supertest');
let assert = require('assert');

describe('Server routes tests', function() {

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
});