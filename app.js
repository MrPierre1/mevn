
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 4200;
var cors = require('cors');

// app.use(serveStatic(__dirname + "/client"));
// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true })

    .then(() => { // if all is ok we will be here
      console.log('Start');
    })
    .catch(err => { // if error we will be here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

// Required application specific custom router module
var userRouter = require('./routes/userRouter');

// Use middlewares to set view engine and post json data to the server
app.use(express.static('client'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/users', userRouter);


app.get("/", function(req, res) {
  res.status(201).send({
    key: 'It\'s a live',
    val: "ROLE IS AWESOME"
  });
});


// Start the server
app.listen(port, function(){
  console.log('Server is running on Port: ',port);
});
