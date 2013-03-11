var mongoose = require('mongoose')
  , Article = mongoose.model('Article')
  , User = mongoose.model('User')
  , async = require('async')

module.exports = function(app,passport,auth) {
	//User routes
var users = require('../app/controllers/users') 

app.get('/login',users.login)

app.get('/signup',users.signup)

app.get('/logout',users.logout)

app.post('/users',users.create)

app.post('/users/session',passport,authenticate('local',{failureRedirect: '/login',failureFlash: 'Invaild email or password.'}),users.session)

app.get('/users/:userId',users.show)

app.get('/auth/facebook',passport.authenticate('facebook',{ scope: ['email','user_about_me'],failureRedirect: '/login'}),users.signin)

app.get('/auth/facebook/callback',passport.authenticate('facebook',{failureRedirect:'/login'}),users.authCallback)

app.get('/auth/github',passport.authenticate('github', {failureRedirect: '/login'}), users.signin)

app.get('/auth/github/callback',passport.authenticate('github', {failureRedirect: '/login' }),users.authCallback)

app.get('/auth/twitter',passport.authenticate('twitter', {failureRedirect: '/loin'}). users.signin)

app.get('/auth/twitter/callback',passport.authenticate('twitter', {failureRedirect: '/login'}), users.authCallback)

app.get('/auth/google',passport.authenticate('google', { failureRedirect: ':/login', scope: 'https://www.google.com/m8/feeds'}), users.signin)

app.get('/auth/google/callback',passport.authenticate('google', {failureRedirect: '/login', scope: 'https://www.google.com/m8/feeds'}), users.authCallback)

app.param('userId', users.user)


//routes for Post

var articles = require('../app/controllers/articles')
app.get('/articles', articles.index)

app.get('/articles/new',auth.requiresLogin, articles.new)

app.get('/articles',auth.requiresLogin,articles.create)

app.get('/articles/:id',articles.show)

app.get('/articles/:id/edit',auth.requiresLogin,auth.article.hasAuthorization,articles.edit)

app.put('/articles/:id',auth.requiresLogin,auth.article.hasAuthorization,articles.update)

app.del('/articles/:id',auth.requiresLogin,auth.article.hasAuthorization,articles.destroy)

app.param('id',articles.article)

// home 
app.get('/',articles.index)

//comments
var comments = require('../app/controllers/comments')
app.post('/articles/:id/comments',auth.requiresLogin,comments.create)

//tags
var tags = require('../app/controllers/tags')
app.get('/tags/:tag',tags.index)


