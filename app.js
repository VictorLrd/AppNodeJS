let express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

const session = require('express-session');

const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

var config = require('config.json')('configs.json');

const connection = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

connection.connect();

global.db = connection;



app.use('/static', express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 8080);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
}));


app.get('/', routes.index);
app.get('/signup', user.signup);
app.post('/signup', user.signup);
app.get('/login', routes.index);
app.post('/login', user.login);
app.get('/home/dashboard', user.dashboard);
app.get('/home/logout', user.logout);
app.get('/home/profile', user.profile);
app.post('/home/comparaison/statCompare',user.statCompare);
app.get('/home/comparaison',user.comparaison);

app.listen(8080);
