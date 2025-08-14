
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User';

// For production, it's strongly recommended to use environment variables
// for all credentials. For local development, the Client ID is hardcoded here
// to simplify setup. Ensure your GOOGLE_CLIENT_SECRET is set in your .env file.
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET!,
        callbackURL: '/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile._json.email });
          if (user) {
            return done(null, user);
          }
          const newUser = new User({
            name: profile.displayName,
            email: profile._json.email,
            password: await require('bcryptjs').hash(require('crypto').randomBytes(16).toString('hex'), 10), // Create a random password for OAuth users
            role: 'Viewer',
            avatar: profile._json.picture,
          });
          await newUser.save();
          done(null, newUser);
        } catch (err: any) {
          done(err, false, { message: 'Error in Google Strategy' });
        }
      }
    )
  );
} else {
    console.warn('Google OAuth is not configured. Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET.');
}

if (GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET) {
    passport.use(
        new GitHubStrategy(
          {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: "/api/auth/github/callback",
            scope: ['user:email'],
          },
          async (accessToken: any, refreshToken: any, profile: any, done: any) => {
             try {
                const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
                if (!email) {
                    return done(new Error('GitHub email not public.'), false);
                }
                let user = await User.findOne({ email: email });
                if (user) {
                    return done(null, user);
                }
                const newUser = new User({
                    name: profile.displayName || profile.username,
                    email: email,
                    password: await require('bcryptjs').hash(require('crypto').randomBytes(16).toString('hex'), 10),
                    role: 'Viewer',
                    avatar: profile.photos[0].value,
                });
                await newUser.save();
                done(null, newUser);
            } catch (err) {
                done(err, false, { message: 'Error in GitHub Strategy' });
            }
          }
        )
    );
} else {
    console.warn('GitHub OAuth is not configured. Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET.');
}


passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch(err) {
        done(err, null);
    }
});

export default passport;
