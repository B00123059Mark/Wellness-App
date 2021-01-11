var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var session = require('express-session')
var mysql = require('mysql')
var app = express();



app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/setSomething', function(req, res, next) {
  req.session.name = 'John Smith'
  res.send('ahh');
});



app.get('/getSomething', function(req, res, next) {
  res.send('hello' + req.session.name);
});

app.post('/register', function(req,res){
	
  // catching the data from the POST
  var student_id=req.body.student_id;
  var pass = req.body.password;
  
  
  console.log("student id = "+ student_id);
  console.log("Password = "+ pass);
  
  // Connect to the database
  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    port : 3306,
    database : 'wellness'
  });

  connection.connect(function(err){
    console.log("Connected!");
    connection.query("INSERT INTO `users`(`student_id`,`password`, `acctype`) VALUES ('"+student_id+"','"+pass+"', 'student')");

  
 });

    connection.end();
});



app.post('/login',function(req,res){
	
    // catching the data from the POST
    var student_id=req.body.student_id;
    var pass = req.body.password;
    
    
	console.log("student id = "+ student_id);
	
    console.log("Password = "+ pass);
	
    
    // Connect to the database
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      port : 3306,
      database : 'wellness'
    });


    connection.query('SELECT * from users WHERE student_id = "'+student_id+'" AND password = "'+pass+'"', function (err, rows, fields) {
      if (err) throw err
      for(var i=0; i< rows.length; i++){
           console.log('Acc type: ', rows[i].acctype)
           res.send(rows[i].acctype); // send the account type back to jQuery mobile.
      }
    })

      connection.end();
 });
 






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;