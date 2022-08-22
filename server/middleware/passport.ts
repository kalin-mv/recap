import { promisify } from 'util';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import di from 'server/container';
import UserSchema from 'server/models/User';

passport.serializeUser((user, done) => {
  console.log('passport serialize, userId=', user.id);
  done(null, user.id);
});

passport.deserializeUser((req, id, done) => {
  console.log('passport deserialize, userId', id);
  const toJS = di('toJS');
  di('UserService')
    .findUserForAuth(id)
    .then(
      (user) => done(null, toJS(UserSchema, user)),
      (err) => done(err)
    );
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      const toJS = di('toJS');
      const user = await di('UserService')
        .findUserWithEmailAndPassword(email, password)
        .then((o) => toJS(UserSchema, o));
      console.log('passport localStrategy, userId=', user?.id);
      if (user) done(null, user);
      else done(null, false, { message: 'Email or password is incorrect' });
    }
  )
);

export const actions = [
  promisify(passport.initialize()),
  promisify(passport.session()),
];

export default passport;
