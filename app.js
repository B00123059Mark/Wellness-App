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


//Registration Form
app.post('/register', function(req,res){
	
  // catching the data from the POST
  var student_id=req.body.student_id;
  var pass = req.body.password;
  
  
  console.log("student id = "+ student_id);
  console.log("password = "+ pass);
  
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
    connection.end();

 });


});


//Login Form
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

app.post('/submit', function(req,res){

    // catching the data from the POST
    var q1=req.body.Q1;
    var q2=req.body.Q2;
    var q3=req.body.Q3;
    var q4=req.body.Q4;
    var q5=req.body.Q5;
    var q6=req.body.Q6;
    var q7=req.body.Q7;
    var q8=req.body.Q8;
    var q9=req.body.Q9;
    var q10=req.body.Q10;



    console.log("Question 1 = "+ q1);
    console.log("Question 2 = "+ q2);
    console.log("Question 3 = "+ q3);
    console.log("Question 4 = "+ q4);
    console.log("Question 5 = "+ q5);
    console.log("Question 6 = "+ q6);
    console.log("Question 7 = "+ q7);
    console.log("Question 8 = "+ q8);
    console.log("Question 9 = "+ q9);
    console.log("Question 10 = "+ q10);

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
        connection.query("INSERT INTO `survey`(`question1`,`question2`, `question3`, `question4`, `question5`, `question6`, `question7`, `question8`, `question9`, `question10`) VALUES ('"+q1+"','"+q2+"', '"+q3+"', '"+q4+"', '"+q5+"', '"+q6+"', '"+q7+"', '"+q8+"', '"+q9+"', '"+q10+"')");
        alert("Survey Submited");
        connection.end();


    });


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