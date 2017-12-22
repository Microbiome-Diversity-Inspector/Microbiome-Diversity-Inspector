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
	
app.post('/', function(req, res) {
	  countOfA = 0, countOfT = 0, countOfG = 0, countOfC = 0, first = 0, last = 99, size = 100;
	  fileName = './' + req.body.name;
		res.send('Posting done');
});		
		
app.get('/', function (req, res) {
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

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})