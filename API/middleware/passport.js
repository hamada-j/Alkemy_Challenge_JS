'use strict';

const passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;

let UserModel = {
    Name: "string",
    Provider: "string",
    Provider_id: "string"
}



passport.use(new GitHubStrategy({
    clientID: "09510d5d762d9989ccce",
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });