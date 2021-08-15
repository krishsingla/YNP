/*jshint esversion: 6 */

// We need to include the packages in our Node.js application, create the following constables and require the modules:
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');


// We can now connect to our database with the following code:
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'usersdb',
    multipleStatements : true
});

connection.connect((err)=> {
    if(err){
        console.log("MySQL Connection Failed");
    }
    console.log("MySQL Connected Succeeded");
});

// Express is what we’ll use for our web applications, this includes packages useful in web development, 
// such as sessions and handling HTTP requests, to initialize it we can do:
const app = express();

// We now need to let Express know we’ll be using some of its packages:
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.json());

// We now need to display our login.html file to the client:
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/../html/login.html'));
});

// We need to now handle the POST request, basically what happens here is when the client enters their details in the login form and clicks the submit button, the form data will be 
// sent to the server, and with that data our login script will check in our MySQL accounts table to see if the details are correct.
app.post('/auth', function(request, response) {
    const username = request.body.username;
    const password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length >= 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

// If everything went as expected and the client logs in they will be redirected to the home page.
// The home page we can handle with another GET request:
app.get('/home', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

// Our web application needs to listen on a port, for testing purposes we’ll use port 3000:
app.listen(3000);
