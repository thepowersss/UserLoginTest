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
  var body = req.body;
  console.log(body);
  fs.readFile('userData/userData.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(data)
  })
  savetoFolder(body, function(err) {
    if (err) {
      console.log('User not saved');
      console.log(err);
      return;
    }
    console.log('User saved');
  });
});

function savetoFolder(data, callback) {
  fs.appendFile('userData/userData.txt', JSON.stringify(data)+'\n', callback);
  //fs.writeFile('userData/userData.txt', JSON.stringify(data), callback);
}

app.get('/', function (req, res) {
  res.send('nothing here');
});

// app.use('/user', (req, res) => {
// });

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));
