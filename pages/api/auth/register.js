import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import api from '@middleware/api';
import database from '@middleware/database';
import parser from '@middleware/parser';
import { authLimiter } from '@middleware/security';
import UserData, { ESCAPE } from '@database/base/user';

const handler = nc();

handler
  .use(authLimiter)
  .use(api)
  .use(database(UserData))
  .use(parser.escape(ESCAPE))
  .post(async (request, response) => {
    await request.do('create', async (api, prisma) => {
      try {
        const { email, name, password, role } = request.body;

        if (!email || !password || !role) {
          return api.error('Faltan campos requeridos');
        }

        const existing = await prisma.findByEmail(email);
        if (existing) {
          return api.error('Usuario ya existe', 409);
        }

        const hashed = await bcrypt.hash(password, 10);
        const isOwner = role === 'OWNER';

        const user = await prisma.create({
          email,
          name: name || email.split('@')[0],
          password: hashed,
          role,
          active: !isOwner,
          ownerApproved: !isOwner,
        });

        return api.success({
          id: user.id,
          email: user.email,
          role: user.role,
          active: user.active,
          ownerApproved: user.ownerApproved,
          message: isOwner
            ? 'Registro recibido. Un admin debe aprobar tu cuenta de Dueño de Cancha.'
            : 'Registro completado. Ya puedes iniciar sesión.',
        });
      } catch (err) {
        console.error('Register error:', err.message);
        return api.error('Error interno', 500);
      }
    });
  });

export default handler;
