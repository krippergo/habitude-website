const express = require('express'), app = express();
const session = require('express-session');
const fs = require('fs');
const bodyParser = require('body-parser');
const md5 = require('md5');
const moment = require('moment');

const urlencodedParser = bodyParser.urlencoded({ extended: true });

const path = './users.txt';

fs.access(path, fs.F_OK, (err) => {
    if (err) {
        var filepath = "users.txt";
        fs.open(filepath, 'w', (err) => {
            if (err) throw err;
            console.log("Файл создан");
            readFile()
        });
    } else {
        console.log("Файл есть");
        readFile()
    }
});

var users;

function readFile() {
    fs.readFile("users.txt", "utf8", function (error, data) {
        if (data) {
            users = JSON.parse(data);
        } else {
            users = [];
        }
    });
}

function yearCheck(year) {
    var leap = false;
    if (year % 400 == 0) {
        leap = true;
    } else if (year % 100 == 0) {
        leap = false;
    } else if (year % 4 == 0) {
        leap = true;
    } else {
        leap = false;
    }
    return leap;
}

function plusOneYear(year, mon, day, hoursMinutesSeconds) {
    var year = Number(moment().format("YYYY"));
    var leapYear = yearCheck(year);
    var mon = Number(moment().format("M"));
    var checForMon;
    if (mon == 4 || mon == 6 || mon == 9 || mon == 11) {
        checForMon = 1;
    } else {
        checForMon = 2;
    }
    var day = Number(moment().format("D"));
    if (mon == 12 && day == 31) {
        day = 1;
        mon = 1;
        year = year + 1;
    } else if (checForMon == 1 && day < 31) {
        day = day + 1;
    } else if (checForMon == 1 && day == 31) {
        day = 1;
        mon = mon + 1;
    } else if (mon == 2 && day < 29 && leapYear) {
        day = day + 1;
    } else if (mon == 2 && day == 29) {
        day = 1;
        mon = mon + 1;
    } else if (mon == 2 && day == 28 && !leapYear) {
        day = 1;
        mon = mon + 1;
    } else if (mon == 2 && day < 28) {
        day = day + 1;
    } else if (checForMon == 2 && day == 30) {
        day = 1;
        mon = mon + 1;
    } else {
        day = day + 1;
    }
    var hoursMinutesSeconds = moment().format("HH:mm:ss");
    var realDataPlusDay = `${year}.${mon}.${day} : ${hoursMinutesSeconds}`;
    return realDataPlusDay;
}

app.use(bodyParser.json());
app.use(session({
    secret: "21d6f40cfb511982e4424e0e250a9557",
    saveUninitialized: false,
    cookie: {
        originalMaxAge: 8640000,
        httpOnly: true
    }
}));

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

app.get('/img/android', function (request, response) {
    response.sendFile(__dirname + '/src/images/android.png');
});

app.get('/img/telegram', function (request, response) {
    response.sendFile(__dirname + '/src/images/telegram.png');
});

app.get('/img/exit', function (request, response) {
    response.sendFile(__dirname + '/src/images/exit.png');
});

app.get('/img/background', function (request, response) {
    response.sendFile(__dirname + '/src/images/bg.png');
});

app.get('/files/apk/habitude', function (request, response) {
    response.sendFile(__dirname + '/src/files/habitude.apk');
});

app.get('/fonts/inter', function (request, response) {
    response.sendFile(__dirname + '/src/fonts/inter.ttf');
});

app.post('/registration', urlencodedParser, function (request, response, data) {
    fs.readFile("users.txt", "utf8", function (error, data) {
        if (data) {
            users = JSON.parse(data);
        } else {
            users = [];
        }
    });

    var userRegistration = false;
    for (a = 0; a < users.length; a++) {
        var login_file = users[a].login;
        if (login_file === request.body.login) {
            userRegistration = true;
            break;
        }
    }
    var obj;
    if (userRegistration) {
        obj = {
            verification: "false"
        }
        response.json(obj);
    } else {
        request.body.password = md5(request.body.password);
        users.push(request.body);
        var fileContent = JSON.stringify(users);
        fs.writeFileSync('users.txt', fileContent);
        request.session.login = request.body.login;
        var year = Number(moment().format("YYYY"));
        var mon = Number(moment().format("M"));
        var day = Number(moment().format("D"));
        var hoursMinutesSeconds = moment().format("HH:mm:ss");
        var time = `${year}.${mon}.${day} : ${hoursMinutesSeconds}`;
        var endData = plusOneYear(year, mon, day, hoursMinutesSeconds);
        request.session.dataStart = time;
        request.session.dataEnd = endData;
        obj = {
            verification: "true"
        }
        response.json(obj);
    }
});

app.post('/authorization', urlencodedParser, function (request, response, data) {
    fs.readFile("users.txt", "utf8", function (error, data) {
        if (data) {
            users = JSON.parse(data);
        } else {
            users = [];
        }
    });

    var userLogin = false;
    for (a = 0; a < users.length; a++) {
        var login_file = users[a].login;
        var pass_file = users[a].password;
        if (login_file === request.body.login && pass_file === md5(request.body.password)) {
            userLogin = true;
            break;
        }
    }
    var obj;
    if (userLogin) {
        request.session.login = request.body.login;
        var year = Number(moment().format("YYYY"));
        var mon = Number(moment().format("M"));
        var day = Number(moment().format("D"));
        var hoursMinutesSeconds = moment().format("HH:mm:ss");
        var time = `${year}.${mon}.${day} : ${hoursMinutesSeconds}`;
        var endData = plusOneYear(year, mon, day, hoursMinutesSeconds);
        request.session.dataStart = time;
        request.session.dataEnd = endData;
        obj = {
            verification: "true"
        }
        response.json(obj);
    } else {
        obj = {
            verification: "false"
        }
        response.json(obj);
    }
});

app.get('/profile', function (request, response) { });

app.set('port', (process.env.PORT || 80));

app.listen(app.get('port'), function () {
    console.log('Порт', app.get('port'), 'запущен');
});