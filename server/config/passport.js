import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Look for existing user by googleId
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // Check if user exists with the same email (e.g., they registered locally first)
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Link googleId to existing account
          user.googleId = profile.id;
          user.authProvider = 'google';
          user.isVerified = true;
          
          // Optionally update avatar if they only had the default placeholder
          if (!user.avatar || !user.avatar.url || user.avatar.url.includes('placeholder')) {
             user.avatar = {
               url: profile.photos[0].value,
               publicId: '',
             };
          }
          await user.save({ validateBeforeSave: false });
          return done(null, user);
        }

        // If neither exists, create new user
        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          avatar: {
            url: profile.photos[0].value,
            publicId: '',
          },
          authProvider: 'google',
          isVerified: true,
        });

        return done(null, newUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Serialize user by id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user by id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;