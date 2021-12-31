var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(req, res) {
	var _url = req.url;
	var queryData = url.parse(_url, true).query;
	var pathname = url.parse(_url, true).pathname;

	if (pathname === '/') {
		if(queryData.id === undefined) {

			fs.readdir('./data', function (err, filelist) {
				var title = 'Welcome';
				var description = 'Hello, Node.js';
				var list = '<ul>';
				var i = 0;
				while(i < filelist.length) {
					list += `<li><a href="/?id=${filelist[i].split('.')[0]}">${filelist[i].split('.')[0]}</a></li>`
					i++;
				}
				list += '</ul>'
				var template = `
				<!doctype html>
				<html>
				<head>
					<title>WEB1 - ${title}</title>
					<meta charset="utf-8">
				</head>
				<body>
					<h1><a href="/">WEB</a></h1>
					${list}
					<h2>${title}</h2>
					<p>${description}</p>
				</body>
				</html>
				`;
				res.writeHead(200);
				res.end(template);
			});

		} else {
			fs.readdir('./data', function (err, filelist) {
				var list = '<ul>';
				var i = 0;
				while(i < filelist.length) {
					list += `<li><a href="/?id=${filelist[i].split('.')[0]}">${filelist[i].split('.')[0]}</a></li>`
					i++;
				}
				list += '</ul>'
				fs.readFile(`data/${queryData.id}.txt`, 'utf8', function(err, description){
					var title = queryData.id;
					var template = `
					<!doctype html>
					<html>
					<head>
						<title>WEB1 - ${title}</title>
						<meta charset="utf-8">
					</head>
					<body>
						<h1><a href="/">WEB</a></h1>
						${list}
						<h2>${title}</h2>
						<p>${description}</p>
					</body>
					</html>
					`;
				res.writeHead(200);
				res.end(template);
				});
			});
		}
	} else {
		response.writeHead(404);
		response.end('Not found');
	}
});
app.listen(3000);
