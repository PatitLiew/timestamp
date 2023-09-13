// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// get date
app.get("/api/:date?", function (req, res) {
  var date_string = req.params.date;
  if (date_string === undefined || date_string === ""){
    date_string = new Date();
  }

  if (!isNaN(date_string) && parseInt(date_string) > 4){
    date_string = parseInt(date_string);
  }
  
  var date = new Date(date_string);
  if (!isNaN(date.getTime())){
    res.json({unix: date.getTime(),utc: date.toUTCString()});
  } else {
    res.send({error: "Invalid Date"});
  }
});