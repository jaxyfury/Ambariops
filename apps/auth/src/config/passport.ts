import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
          image: profile._json.picture,
        });
        await newUser.save();
        done(null, newUser);
      } catch (err: any) {
        done(err, false, { message: 'Error in Google Strategy' });
      }
    }
  )
);

passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
                image: profile.photos[0].value,
            });
            await newUser.save();
            done(null, newUser);
        } catch (err) {
            done(err, false, { message: 'Error in GitHub Strategy' });
        }
      }
    )
);


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
