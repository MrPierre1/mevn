
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 4200;
var cors = require('cors');
var morgan = require('morgan')

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
var courseRouter = require('./routes/courseRouter');


// Use middlewares to set view engine and post json data to the server
app.use(express.static('client'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'))

app.use('/users', userRouter);
app.use('/courses',courseRouter);



app.get("/", function(req, res) {
  res.status(201).send({
    key: 'It\'s a live'
  });
});

app.use((req,res,next) => {
  const error = new Error('Route not found')
  error.status = 404
  next(error)
})
app.use((error, req, res, next) =>{
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})
app.use
// Start the server
app.listen(port, function(){

});
