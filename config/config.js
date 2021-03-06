module.exports = {
	development: {
		root: require('path').normalize(__dirname + '/..'), //good programming is all about automation

		app: {
			name: 'Mazeltov'},

		//fill after creating app.

		facebook: { 			
			clientID: "APP_ID", 
			clientSecret: "APP_SECRET",
			callbackURL: "http://localhost:3000/auth/facebook/callback"
		},
		twitter: {
			clientID: "CONSUMER_KEY",
			clientSecret: "CONSUMER_SECRET",
			callbackURL: "http://localhost:3000/auth/twitter/callback"
		},
		github: {
			clientID: "APP_ID",
			clientSecret: "APP_SECRET",
			callbackURL: "http://localhost:3000/auth/github/callback"
		},
		google: {
			clientID: "APP_ID",
			clientSecret: "APP_SECRET",
			callbackURL: "http://localhost:3000/auth/google/callback"
		}
	}
		     test: {
			     //for test mode
		     },
		production {
		//production mode
		}
}

