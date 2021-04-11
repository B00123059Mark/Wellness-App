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
const sanitizeHtml = require('sanitize-html');
app.use(express.static(__dirname + '/public'));


// send email to students and staff
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

//for the graph
const chartJs = require('chart.js')

const bcrypt = require('bcrypt');
const {hash} = require("bcrypt");
;
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';



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

        address(student_id);

        const clean_id = sanitizeHtml(student_id);





        student_id = escape(student_id);
        pass = sanitizeHtml(pass);


        console.log("student id = " + student_id);
        console.log("password = " + pass);

        // Connect to the database
        var mysql = require('mysql')
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'wellness'
        });

        connection.connect(function (err) {
            console.log("Connected!");

            bcrypt.hash(pass, saltRounds, function(err, hash) {
                // Store hash in your password DB.

            connection.query("INSERT INTO `users`(`student_id`,`password`, `acctype`) VALUES ('" + student_id + "','" + hash + "', 'student')");
            address(student_id);
            connection.end();

        });
   });

});


//Login Form
app.post('/login',function(req,res){
	
    // catching the data from the POST
         var student_id=req.body.student_id;
         var pass = req.body.password;

            student_id = sanitizeHtml(student_id);
            pass = sanitizeHtml(pass);

            console.log("student id = " + student_id);
            console.log("Password = " + pass);

            // Connect to the database
            var mysql = require('mysql')
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                port: 3306,
                database: 'wellness'
            });



        connection.query('SELECT * from users WHERE student_id = "' + student_id + '" AND password = "' + pass + '"', function (err, rows, fields) {
                if (err) throw err
                for (var i = 0; i < rows.length; i++) {
                    console.log('Acc type: ', rows[i].acctype)
                    res.send(rows[i].acctype); // send the account type back to jQuery mobile.
                }
            })
            connection.end();


 });

app.post('/submit', function(req,res){

    // catching the data from the POST

    var q1=req.body.good;
    var q1a=req.body.neutral;
    var q1b=req.body.bad;

    var q2=req.body.car;
    var q2a=req.body.bus;
    var q2b=req.body.walking;

    var q3=req.body.ask;
    var q3a=req.body.assignment;
    var q3b=req.body.sports;

    var q4=req.body.yes;
    var q4a=req.body.sometimes;
    var q4b=req.body.no;

    var q5=req.body.work;
    var q5a=req.body.sometimes01;
    var q5b=req.body.work_null;

    var q6=req.body.yes01;
    var q6a=req.body.sometimes02;
    var q6b=req.body.no01;

    var q7=req.body.yes02;
    var q7a=req.body.i_will;
    var q7b=req.body.no02;

    var q8=req.body.yes03;
    var q8a=req.body.sometimes03;
    var q8b=req.body.no03;

    var q9=req.body.yes04;
    var q9a=req.body.no04;

    var q10=req.body.canteen;
    var q10a=req.body.lunch;
    var q10b=req.body.town;







    console.log("Question 1 = "+ q1);
    console.log("Question 1 = "+ q1a);
    console.log("Question 1 = "+ q1b);

    console.log("Question 2 = "+ q2);
    console.log("Question 2 = "+ q2a);
    console.log("Question 2 = "+ q2b);

    console.log("Question 3 = "+ q3);
    console.log("Question 3 = "+ q3a);
    console.log("Question 3 = "+ q3b);

    console.log("Question 4 = "+ q4);
    console.log("Question 4 = "+ q4a);
    console.log("Question 4 = "+ q4b);

    console.log("Question 5 = "+ q5);
    console.log("Question 5 = "+ q5a);
    console.log("Question 5 = "+ q5b);

    console.log("Question 6 = "+ q6);
    console.log("Question 6 = "+ q6a);
    console.log("Question 6 = "+ q6b);

    console.log("Question 7 = "+ q7);
    console.log("Question 7 = "+ q7a);
    console.log("Question 7 = "+ q7b);

    console.log("Question 8 = "+ q8);
    console.log("Question 8 = "+ q8a);
    console.log("Question 8 = "+ q8b);

    console.log("Question 9 = "+ q9);
    console.log("Question 9 = "+ q9a);

    console.log("Question 10 = "+ q10);
    console.log("Question 10 = "+ q10a);
    console.log("Question 10 = "+ q10b);




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
        connection.query("INSERT INTO `survey`(`question1`, `question1a`, `question1b` , `question2` , `question2a` , `question2b` , `question3` , `question3a` , `question3b`  , `question4` , `question4a` , `question4b`  , `question5` , `question5a` , `question5b` , `question6` , `question6a` , `question6b`  , `question7` , `question7a` , `question7b` , `question8` , `question8a` , `question8b` , `question9` , `question9a` , `question10` , `question10a` , `question10b`  )   VALUES ('"+q1+"', '"+q1a+"', '"+q1b+"' , '"+q2+"', '"+q2a+"', '"+q2b+"' , '"+q3+"', '"+q3a+"', '"+q3b+"' , '"+q4+"', '"+q4a+"', '"+q4b+"' , '"+q5+"', '"+q5a+"', '"+q5b+"' , '"+q6+"', '"+q6a+"', '"+q6b+"' , '"+q7+"', '"+q7a+"', '"+q7b+"' , '"+q8+"', '"+q8a+"', '"+q8b+"' , '"+q9+"', '"+q9a+"', '"+q10+"', '"+q10a+"', '"+q10b+"')");
        connection.end();


    });


});

 
 app.post('/submitMS',function(req,res){
	 
	 
	 var message=req.body.toStudents;


	
	 console.log("Staff message says = "+ message);

	
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
        connection.query("INSERT INTO `sent_messages`(`sentmessage`) VALUES ('"+message+"')");
        connection.end();


    });

 });


// takes in student email and sends an email to them
function address(student_id){

    var email = student_id; //<-- email info

    const msg = {
        to: email, // Change to your recipient
        from: 'B00123059@mytudublin.ie', // Change to your verified sender
        subject: 'Email Registration',
        text: 'Dear student, you have registered to our webpage with the wellness app.',
        html: '<strong>Dear student, you have registered to our webpage</strong>',
    }

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })

}

app.post('/getdata',function(req,res){

    // Connect to the database
    var mysql = require('mysql')
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port : 3306,
        database : 'wellness'
    });


    connection.query('SELECT * from surveys', function (err, rows, fields) {
        if (err) throw err
        var output = '';
        for(var i=0; i< rows.length; i++){
            var surveycontent = rows[i].surveycontent;
            var total = rows[i].total;
            output = output + surveycontent + '<br>';
            output = output + total + '<br>';
        }
        res.send(output);
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