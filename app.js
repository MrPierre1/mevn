
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 4200 ;
var cors = require('cors');
var morgan = require('morgan')
var checkToken = require('./routes/checkToken')

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true })

    .then(() => { 
      console.error('App started');
      
    })
    .catch(err => { 
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

// Required application specific custom router module
var userRouter = require('./routes/userRouter');
var secretRouter = require('./routes/secretRouter');


// Use middlewares to set view engine and post json data to the server
app.use(express.static('client'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'))

app.use('/users', userRouter);
app.use('/secret', checkToken, secretRouter);
// app.use('/secret', secretRouter);




app.get("/", function(req, res) {
  res.status(201).send({
    key: 'It\'s a live'
  });
});

app.listen(port, function(){

});
