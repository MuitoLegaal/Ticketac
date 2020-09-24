var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

// useNewUrlParser ;)
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true};

// --------------------- BDD -----------------------------------------------------
mongoose.connect('mongodb+srv://admin:ticettac@cluster0.8qoq8.mongodb.net/Ticketac?retryWrites=true',
   options,  
   function(err) {
    if (err) {console.log(`error, failed to connect to the database because --> ${err}`);} 
    else {console.info('*** Database Ticketac connection : Success ***');}
   }
);

var journeySchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  departureTime: String,
  price: Number, });

var journeyModel = mongoose.model('journey', journeySchema);

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]

var userSchema = mongoose.Schema({
  name: String,
  firstname: String,
  email: String,
  password: String});

var userModel = mongoose.model('users', userSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

/* GET main page */
router.get('/home', function(req, res, next){
  if(req.session.user == null)
  {res.redirect('/')} 
    res.render('home')})

/* POST signup page */
router.get('/signup', async function(req, res, next) {
  var searchUser = await userModel.findOne({
    email: req.body.email})
  
  if(!searchUser){
    var newUser = new userModel({
      name: req.body.username,
      firstname: req.body.firstname,
      email: req.body.email,
      password: req.body.password})
  
    var newUserSave = await newUser.save();
  
    req.session.user = {
      name: newUserSave.name,
      id: newUserSave._id,}
    console.log(req.session.user)
  
    res.redirect('/home')
  } else {
    res.redirect('login')
  }
});

/* POST signin page */
router.get('/signin', async function(req, res, next) {
  var searchUser = await userModel.findOne({
    email: req.body.email,
    password: req.body.password
  })

  if(searchUser!= null){
    req.session.user = {
      name: searchUser.name,
      id: searchUser._id
    }
    res.redirect('/home')
  } else {
    res.render('login')
  }
});

/* GET logout page */
router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/') });

module.exports = router;
