import session from 'express-session';
import passport from '@lib/passport-config';

const sessionMiddleware = session({
  secret: process.env.JWT_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
  },
});

const passportInitMiddleware = (req, res, next) => {
  passport.initialize()(req, res, () => {
    passport.session()(req, res, next);
  });
};

export { sessionMiddleware, passportInitMiddleware };
