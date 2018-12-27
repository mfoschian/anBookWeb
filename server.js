var minihttp = require('minihttp');
var util = require('util');

var options =
{
	//webHome: '', // default 'public',
	port: 8080
};

if( process.argv[2] )
{
	options.wwwroot = process.argv[2];
	console.log( 'wwwroot is '+options.wwwroot );
}


var Server = new minihttp.HttpServer( options );


Server.listen();

