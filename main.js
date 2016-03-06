var http = require('http');


function getQuouteHistoricalData(startDate, endDate, qoutes, callback) {
	var query = 'select * ' +
		'from yahoo.finance.historicaldata ' +
		'where symbol in ("' + qoutes.join('","') + '") ' +
		' and startDate = "' + startDate + '" ' +
		' and endDate = "' + endDate + '"';

	var yahooHost = 'query.yahooapis.com';
	var yahooUrl = '/v1/public/yql?q=' + escape(query) + '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';

	return http.get({
		host: yahooHost,
		path: yahooUrl
	}, function(response) {
		var body = '';
		response.on('data', function(d) {
			body += d;
		});
		response.on('end', function() {
			var parsed = JSON.parse(body);
			callback(parsed);
		});
		response.on('error', function(err) {
			console.log(err);
		});
	});
}

getQuouteHistoricalData('2016-03-03', '2016-03-04', ["GLD"], function(data) {
	console.log(data);
	console.log('\n');
	console.log(data.query.results);
});