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
const saltRounds = 10;

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

app.use(express.json({limit: '1mb'}));
 
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
app.post('/register', async function(req,res){

  // catching the data from the POST
        var student_id=req.body.student_id;
        var pass = req.body.password;

        student_id = sanitizeHtml(student_id);

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

    bcrypt.hash(pass, saltRounds).then(function (hashPassword) {
        // Store hash in your password DB.
    
                connection.connect(function (err) {
                console.log("Connected!");

                connection.query("INSERT INTO `users`(`student_id`,`password`, `acctype`) VALUES ('" + student_id + "','" + hashPassword + "', 'student')");
                address(student_id);

                });
    });
	
});



//Login Form
app.post('/login',function(req,res){
	
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

app.post('/staffmessages',function(req,res){

    // Connect to the database
    var mysql = require('mysql')
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port : 3306,
        database : 'wellness'
    });


    connection.query("SELECT * from sent_messages", function (err, rows, fields) {
        if (err) throw err
        var output = '';
        for(var i=0; i< rows.length; i++){
            var messagecontent = rows[i].messagecontent;
            var total = rows[i].total;
            output = output + messagecontent + '<br>';
            output = output + total + '<br>';
        }
        res.write(output);
    })
});

app.post('/surveyData',function(req,res){

    // Connect to the database
    var mysql = require('mysql')
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port : 3306,
        database : 'wellness'
    });


    connection.query("SELECT * from survey", function (err, rows, fields) {
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
});

app.post('/surveyNum', function(req,res){

	// Connect to the database
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      port : 3306,
      database : 'wellness'
    });


// takes data from table // updates the graph 
	
	  connection.query("SELECT COUNT(id) as 'NumSurvey' from survey", function (err, rows, fields) {
      if (err) throw err
      var outputNum = '';
      for(var i=0; i< rows.length; i++){
            var Num = rows[i].Num;
            var total = rows[i].total;
            outputNum = outputNum + Num + '<br>';
            outputNum = outputNum + total + '<br>';
        }
        res.send(outputNum);
    })
	
});




app.get('/getGraph', function(req,res){

	// Connect to the database
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      port : 3306,
      database : 'wellness'
    });
	
// takes data from table // updates the graph 
	
	 bad_campus = connection.query("select COUNT(question1) AS 'Bad' from survey WHERE question1 = 1", function(err, rows){
	if(err) {
    throw err;
	} else {
    setValue(rows);
	}
    
	});
	
     neutral_campus = connection.query("select COUNT(question1a) AS 'Neutral' from survey WHERE question1a = 2", function(err, rows){
	if(err) {
    throw err;
	} else {
    setValue(rows);
	}
	
	});
	
	good_campus = connection.query("select COUNT(question1b) AS 'Good' from survey WHERE question1b = 3", function(err, rows){
	if(err) {
    throw err;
	} else {
    setValue(rows);
	}

	});
	function setValue(value) {
	bad_campus = value;
	res.json({status: 'success', bad_campus: bad})
	}
	function setValue(value) {
	neutral_campus = value;
	res.send(neutral_campus);
	}
	function setValue(value) {
	good_campus = value;
	res.send(good_campus);
	}
	
	const data = request.body;
	
	res.json({status: 'success', bad_campus: data.bad, neutral_campus: data.neutral, good_campus: data.good});
	
});


app.get('/getGraph01', function(req,res){

	// Connect to the database
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      port : 3306,
      database : 'wellness'
    });


// takes data from table // updates the graph 
	
	var car = connection.query("select COUNT(question2) AS 'car' from survey WHERE question2 = 1", function(err, rows){
	if(err) {
    throw err;
	} else {
    setValue(rows);
	}
    
	});
	
    var bus = connection.query("select COUNT(question2a) AS 'bus' from survey WHERE question2a = 2", function(err, rows){
	if(err) {
    throw err;
	} else {
    setValue(rows);
	}
	
	});
	
	var walking = connection.query("select COUNT(question2b) AS 'walking' from survey WHERE question2b = 3", function(err, rows){
	if(err) {
    throw err;
	} else {
    setValue(rows);
	}

	});
	function setValue(value) {
	car = value;
	res.send(car);
	}
	function setValue(value) {
	bus = value;
	res.send(bus);
	}
	function setValue(value) {
	walking = value;
	res.send(walking);
	}
	
});

app.get('/getGraph02', function(req,res){

	// Connect to the database
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      port : 3306,
      database : 'wellness'
    });


// takes data from table // updates the graph 
	
	var canteen = connection.query("select COUNT(question10) AS 'canteen' from survey WHERE question10 = 1", function(err, rows){
	if(err) {
    throw err;
	} else {
    setValue(rows);
	}
    
	});
	
    var pack_lunch = connection.query("select COUNT(question10a) AS 'packlunch' from survey WHERE question10a = 2", function(err, rows){
	if(err) {
    throw err;
	} else {
    setValue(rows);
	}
	
	});
	
	var town = connection.query("select COUNT(question10b) AS 'town' from survey WHERE question10b = 3", function(err, rows){
	if(err) {
    throw err;
	} else {
    setValue(rows);
	}

	});
	function setValue(value) {
	canteen = value;
	res.send(canteen);
	}
	function setValue(value) {
	pack_lunch = value;
	res.send(pack_lunch);
	}
	function setValue(value) {
	town = value;
	res.send(town);
	}
	
});

app.get('/getGraph03', function(req,res){

	// Connect to the database
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      port : 3306,
      database : 'wellness'
    });


// takes data from table // updates the graph 
	
	var y = connection.query("select COUNT(question6) AS 'yes' from survey WHERE question6 = 1", function(err, rows){
	if(err) {
    throw err;
	} else {
    setValue(rows);
	}
    
	});
	
    var some = connection.query("select COUNT(question6) AS 'sometimes' from survey WHERE question6a = 2", function(err, rows){
	if(err) {
    throw err;
	} else {
    setValue(rows);
	}
	
	});
	
	var n = connection.query("select COUNT(question6b) AS 'no' from survey WHERE question6b = 3", function(err, rows){
	if(err) {
    throw err;
	} else {
    setValue(rows);
	}

	});
	function setValue(value) {
	y = value;
	res.send(y);
	}
	function setValue(value) {
	some = value;
	res.send(some);
	}
	function setValue(value) {
	n = value;
	res.send(n);
	}
	
});

app.get('/admindisplaytable', (req, res, next) => {           //this is the code to initialize the table to display the database contents 
 					

    var con = mysql.createConnection({  //connects to DB
      host     : 'localhost',
      user     : 'root',
      password : '',
      port : 3306,
      database : 'wellness'
    									 //the name of my local DB

  });
  con.connect();

  con.query('select * from users;', function (err, rows, fields) {			//groupinfo is the name of the table i used to store registered user values, username password etc
  
    if (err) throw err;

    var content = '<table border="1" bgcolor="#2BC524">';                       //creating a variable called content to store the database table

    for(var i=0; i< rows.length; i++){                                         //for loop to cycle through the query results 

      content = content + '<tr>';
      content = content + '<td>User:  '+ rows[i].student_id+ '<br></td>';                      //table data, setting it to be the results of the database query
      content = content + '<td>Passowrd:  '+ rows[i].password+ '<br></td>';
      content = content + '<td>Access level:  '+ rows[i].acctype+ '<br></td>';       //access level = user, staff role 
      content = content + '</tr>';

    }
    content  = content + '</table>';
    res.send(content)

  });

  con.end();


});


app.post('/admindeleteuser', function (req, res) {	
  
  
  var user = req.body.adminuser;  
  
 var connection = mysql.createConnection({  //connects to DB
      host     : 'localhost',
      user     : 'root',
      password : '',
      port : 3306,
      database : 'wellness'
    									 //the name of my local DB

  });
  
 			

      //this function will be used to delete users from the database if the admin wishes                       //gets the username inputted by the admin 
  connection.query("DELETE FROM users WHERE student_id ='"+user+"'");  //if the value inputted by the admin matches a value in the groupinfo table, delete the database entry
  console.log("ADMIN USER"+user);	

con.end();  //log in the console for testing purposes
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