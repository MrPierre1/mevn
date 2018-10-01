
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 4200 ;
var cors = require('cors');
var morgan = require('morgan')
var checkToken = require('./server/routes/checkToken')

const multer = require('multer')
const upload = multer({dest: './uploads/'});
var uploading = multer({
  limits: {fileSize: 1000000, files:1},
});
var allowedTypes = ["image/jpeg"]


mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/testplant', { useNewUrlParser: true })

    .then(() => { 
      console.error('App started');
      
    })
    .catch(err => { 
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

var userRouter = require('./server/routes/userRouter');
var secretRouter = require('./server/routes/secretRouter');
var projectRouter = require('./server/routes/projectRouter');
var testplanRouter = require('./server/routes/testplanRouter');



app.use(express.static('client'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(morgan('dev'))



app.post('/fileupload', upload.single('image'), function (req, res) {
  console.log("image file", req.body, "body", req.file);
  res.status(201).send('POST request to the homepage')
})


app.use('/users', upload.single(), userRouter);
app.use('/secret', checkToken, secretRouter);
app.use('/project', projectRouter);
app.use('/testplan', testplanRouter);















app.get("/", function(req, res) {
  res.status(201).send({
    key: 'It\'s a live'
  });
});

app.listen(port, function(){

});
