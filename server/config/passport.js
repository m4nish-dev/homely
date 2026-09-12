import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

// Google OAuth Strategy disabled. We are using standard Email/Password authentication.

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