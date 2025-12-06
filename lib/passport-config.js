import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import UserData from '@database/base/user';

const userDataInstance = new UserData();

// Configurar estrategia local
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await userDataInstance.findByEmail(email);

        if (!user) {
          return done(null, false, { message: 'Credenciales inválidas' });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return done(null, false, { message: 'Credenciales inválidas' });
        }

        if (!user.active) {
          return done(null, false, {
            message: 'Cuenta desactivada o pendiente de aprobación',
          });
        }

        return done(null, user);
      } catch (err) {
        console.error('[Passport] Error:', err.message);
        return done(err);
      }
    }
  )
);

// Serializar usuario para la sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializar usuario desde la sesión
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userDataInstance.where({ id }).getFirst();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
