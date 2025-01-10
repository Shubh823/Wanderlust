const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User=require("./models/user.js");// Replace with the correct path to your User schema

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if the user already exists
          let user = await User.findOne({ email: profile.emails[0].value });
  
          if (user) {
            // If user exists, log them in
            return done(null, user);
          }
  
          // Create a new user if one doesn't exist
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            profilePhoto: profile.photos[0]?.value,
          });
  
          return done(null, user);
        } catch (err) {
          console.error("Error during Google authentication:", err);
          return done(err, null);
        }
      }
    )
  );
  

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
