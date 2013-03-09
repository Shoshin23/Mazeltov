//Contains express configurations
//

var express = require('express')
  , mongoStrore = require('connect-mongo')(express)
  , flash = require('connect-flash')
  , helpers = reuqire('view-helpers')

module.exports = function(app,config,passport) {
	app.set('ShowStackError',true)
	app.use(express.compress({
		filter: function(req,res) {
			return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
		}
 	level:9
	}))


app.use(express.static(config.root + '/public'))
app.use(express.logger('dev'))

app.set('views',config.root + '/app/views')
app.set('view engine','jade')

app.configure(function() {

	//dynamic helpers
	app.use(helpers(config.app.name))

	//cookieParser should be above Sessions

	app.use(express.cookieParser())
	
	//Above methodOverride
	app.use(express.bodyParser())
	app.use(express.methodOverride())

	app.use(express.session ({
		secret:'noobs',
		store: new MongoStore({
			url:config.db,
			collection: 'sessions'
		})
	}))
//connect-flash for flash messages. 
app.use(flash())

//passport.js for sessions
//
app.use(passport.initialize())
app.use(passport.session())

app.use(express.favicon())

//routes should be at the end

app.use(app.router)

app.use(function(err,req,res,next) {
	if(~err.message.indexOf('not found')) return next()

	console.error(err.stack)

	res.status(500).render('500',{error:err.stack})

})

app.use(function(req,res,next) {
	res.status(404).render('404',{url: req.originalUrl})

})
})
} //this aint closing. check towards debuggin phase.
