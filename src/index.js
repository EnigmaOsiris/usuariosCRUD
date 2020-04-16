const express = require('express');
const app = express();
const path = require('path');
const mongooose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


//const { url } = require('./config/db');

mongooose.connect('mongodb://localhost:27017/crud', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('port', process.env.POR || 3050);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


require('./app/routes/routes')(app);


app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('Server on ' + app.get('port'));
});