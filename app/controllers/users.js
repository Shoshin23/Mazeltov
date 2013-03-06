//Module dependecies

var mongoose = require('mongoose')
var User = mongoose.model('User')

exports.signin = function(req,res) {}

//Auth Callback

exports.authCallback = function(req,res,next) {
	res.redirect('/')
}

//show login form

exports.login = function(req,res) {
	res.render('users/login', {
		title: 'Login',
		message: req.flash('error')
	})
}

//Show the sign up form
//
exports.signup = function(req,res) {
	res.render('users/signup', {
		title: 'Sign up',
		user: new User()
	})
}


//Logout form

exports.logout = funcion(req,res) {
	req.logout()
	res.redirect('/login')
}


