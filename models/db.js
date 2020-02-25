var mysql      = require('mysql');

var getConnection = function( callback ){
	var connection = mysql.createConnection({
	  host     : '127.0.0.1',
	  user     : 'root',
	  password : '',
	  database: 'jobportal'
	});

	connection.connect(function(err) {
	  if (err) {
	    console.error('error connecting: ' + err.stack);
	    callback(null);
	  }
	  console.log('connected as id ' + connection.threadId);
	  callback(connection);
	});
};
module.exports = {
		getResults: function(sql, params, callback){
			getConnection(function(connection){
				if(params != null){
					connection.query(sql, params, function (error, results) {
						if(results.length != 0){
							callback(results);
						}else{
							callback([]);
						}
					});
				}else{
					connection.query(sql, function (error, results) {
						if(results.length != 0){
							callback(results);
						}else{
							callback([]);
						}
					});
				}
				connection.end(function(err) {
					console.log('connection end!');
				});
			});
		}
}