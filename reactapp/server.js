const express = require('express');
const cors = require('cors')
var bodyParser = require('body-parser')
var FormData = require('form-data');
const fs = require("fs");

const app = express();

app.use(cors());
app.use(bodyParser());

app.use('/login', (req, res) => {
  res.send({
    token: 'authenticated'
  });
});

app.post('/save-data', (req, res) => {
  //res.send("save-data called");
  var body = req.body;
  console.log(body);
  var users = fs.readFile('userData/userData.txt', 'utf8');
  console.log(body.get(0));
  savetoFolder(body, function(err) {
    if (err) {
      console.log('User not saved');
      console.log(err);
      return;
    }
    console.log('User saved');
  });
  // var xhr = new XMLHttpRequest();
  // xhr.open("POST", "SERVER.SCRIPT");
  // xhr.send(data);
});

function savetoFolder(data, callback) {
  fs.writeFile('userData/userData.txt', JSON.stringify(data), callback);
}

app.get('/', function (req, res) {
  res.send('nothing here');
});

// app.use('/user', (req, res) => {
// });

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));
