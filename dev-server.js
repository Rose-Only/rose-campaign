var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));
app.get('/', function (req, res) {
  res.send()
})

app.listen(5000, function() {
  console.log('Node app is running on port', app.get('port'));
});

