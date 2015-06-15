var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

passport.serializeUser(function(user,done){
	done(null,user.id);
});
passport.deserializeUser(function(id,done){
	Users.findOne({id:id})
		.exec(function(err,user){
			done(err,user);
		});
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'passwd'
  },
  function(email, password, done) {
    Users.findOne({ username: email })
          .exec(function (err, user) {
              if (err) return done(err); 
              if (!user) return done(null, false, { message: 'Incorrect email.' });
              bcrypt.compare(password, user.passwd, function (err, res) {
                  if (!res) return done(null, false, {message: 'Invalid Password'});
                  return done(null, user, {message: 'Logged In Successfully'});
             });
          })
  }
));


