var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var journeyModel = require('../models/journeys');

var userModel = require('../models/users');

// var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
// var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.user != null)
  {res.redirect('/home')} 

  res.render('login'); });

/* GET main page */
router.get('/home', function(req, res, next){
 if(req.session.user == null)
{res.redirect('/')} 
    res.render('home')})

/* POST sign-up page */
router.post('/sign-up', async function(req, res, next) {

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
      email: newUserSave.email,
      id: newUserSave._id,}
    console.log(req.session.user)
  
    res.redirect('/home')
  } else {
    res.redirect('/')
  }
});

/* POST sign-in page */
router.post('/sign-in', async function(req, res, next) {

  var searchUser = await userModel.findOne({email: req.body.email, password: req.body.password})

  console.log(searchUser);

  if(searchUser!= null){
    req.session.user = {
      email: searchUser.email,
      id: searchUser._id
    }
    res.redirect('/home')
  } else {
    res.redirect('/')
  }
});

router.post('/home', async function(req, res, next) {

  // res.redirect('/error')

  res.redirect('/available')

});

router.get('/error', async function(req, res, next) {



  res.render('/error')

});


router.get('/available', async function(req, res, next) {


  res.render('/available')

});

module.exports = router;
