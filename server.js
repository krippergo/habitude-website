const express = require('express'), app = express();

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/src/public/download.html');
});

app.get('/css', function (request, response) {
    response.sendFile(__dirname + '/src/style/css/download.css');
});

app.get('/js', function (request, response) {
    response.sendFile(__dirname + '/src/app/download.js');
});

app.get('/img', function (request, response) {
    response.sendFile(__dirname + '/src/images/icon.png');
});

app.get('/img/menu', function (request, response) {
    response.sendFile(__dirname + '/src/images/menu.png');
});

app.get('/img/background', function (request, response) {
    response.sendFile(__dirname + '/src/images/bg.png');
});

app.set('port', (process.env.PORT || 80));

app.listen(app.get('port'), function() {
	console.log('Порт', app.get('port'), 'запущен');
});
