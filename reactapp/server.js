const express = require('express');
const cors = require('cors')
var bodyParser = require('body-parser')
var FormData = require('form-data');
const fs = require("fs");

const app = express();

app.use(cors());
app.use(bodyParser());

// for use as verification token
// called in Login.js's Login()
app.use('/login', (req, res) => {
  console.log("/login somehow??")
  res.send({
    token: 'authenticated'
  });
});

// responds with a JSON object either {loginstatus:true} or {loginstatus:false}
// checks if given login credentials matches with anything in userData.txt
var loginVerification = false;
app.post('/verify', (req, res) => {
  var body = req.body;
  console.log("hello verify")
  console.log(body);
  fs.readFile('userData/userData.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      res.end();
      return
    }
    var usersJsonArr = []; // users in userData get temp stored here while reading
    var linesArr = data.split('\n'); // stores each user as a string in temp array;
    for (var i = 0; i < linesArr.length; i++) {
      if (linesArr[i]=='') { // if the line is an empty string, we've reached the end
        console.log("no username:password matches, stop");
        usersJsonArr = [];
        linesArr = [];
        break;
      }
      usersJsonArr.push(JSON.parse(linesArr[i])); // load users
      console.log("big check")
      // console.log(body.username);
      // console.log(usersJsonArr[i].username);
      // console.log(body.password);
      // console.log(usersJsonArr[i].password);
      if (body.username==usersJsonArr[i].username
      && body.password==usersJsonArr[i].password) { // username and password matches
        console.log("login verified");
        res.send({
          token: 'authenticated'
        });
        //res.end();
        break;
      }
    }
  });
});


// Add Access Control Allow Origin headers
// app.use((req, res, next) => {
//   console.log("access control origin (header adjusted)");
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// saves username and password to userData.txt
var registerSuccess = false;
app.post('/save-data', (req, res) => {
  var usernameMatches = undefined;

  var body = req.body;
  console.log("body recieved");
  console.log(body);
  // begin reading the userData file
  fs.readFile('userData/userData.txt', 'utf8' , (err, data) => {
    // if there's an error with reading the file
    if (err) {
      console.error(err)
      res.end();
      return;
    }

    // read line by line to see if username already exists
    var usersJsonArr = []; // users in userData get temp stored here while reading
    var linesArr = data.split('\n'); // stores each user as a string in temp array;
    for (var i = 0; i < linesArr.length; i++) {
      if (linesArr[i]=='') { // if the line is an empty string, we've reached the end
        console.log("no username match, stop");
        usernameMatches = false;
        break;
      }
      usersJsonArr.push(JSON.parse(linesArr[i])); // load usernames into
      // console.log("loop " + i);
      // console.log(body.username);
      // console.log(jsonArr[i].username);
      if (body.username==usersJsonArr[i].username) { // username matches
        console.log("username matches")
        usersJsonArr = []; // reset the users array
        linesArr = []; // reset the line array
        usernameMatches = true;
        break;
      } else { // username doesn't match
        console.log("no username match, keep going")
      }
    };

    // after reading userData, return result
    console.log("username match: " + usernameMatches);
    if (!usernameMatches) {
      savetoFolder(body, function(err) {
        // error with saving user
        if (err) {
          console.log('User not saved');
          console.log(err);
          res.end();
          return;
        }
        console.log('User saved');
        registerSuccess = true;
        res.end();
        return;
      });
    };
  });
  res.end();
  return;
});

function savetoFolder(data, callback) {
  fs.appendFile('userData/userData.txt', JSON.stringify(data)+'\n', callback);
}

app.get('/', function (req, res) {
  res.send('nothing here');
});

// app.use('/user', (req, res) => {
// });

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));
