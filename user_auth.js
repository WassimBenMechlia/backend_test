const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID ='90276427326-u2ih8s7ib04288ngle538c5gbsoj2jj9.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback : true,
  },
  googleAuthCallback
));

function googleAuthCallback(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
}

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
