import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserData from '@database/base/user';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    console.log('[LOGIN] Iniciando autenticación con email:', req.body?.email);

    const { email, password } = req.body;

    if (!email || !password) {
      console.log('[LOGIN] Email o password faltantes');
      return res.status(400).json({ ok: false, error: 'Email y contraseña requeridos' });
    }

    console.log('[LOGIN] Buscando usuario por email:', email);
    const userDataInstance = new UserData();
    const user = await userDataInstance.findByEmail(email);
    console.log('[LOGIN] Usuario encontrado:', user ? 'Sí' : 'No');

    if (!user) {
      return res.status(401).json({ ok: false, error: 'Credenciales inválidas' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      console.log('[LOGIN] Contraseña inválida');
      return res.status(401).json({ ok: false, error: 'Credenciales inválidas' });
    }

    if (!user.active) {
      return res.status(403).json({ ok: false, error: 'Cuenta desactivada o pendiente de aprobación' });
    }

    console.log('[LOGIN] Autenticación exitosa, creando JWT');
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    const isProduction = process.env.NODE_ENV === 'production';
    res.setHeader(
      'Set-Cookie',
      `token=${token}; HttpOnly; Secure=${isProduction}; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}; Path=/`
    );

    console.log('[LOGIN] Enviando respuesta exitosa');
    return res.status(200).json({
      ok: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    });
  } catch (err) {
    console.error('[LOGIN] Error:', err.message, err.stack);
    return res.status(500).json({ ok: false, error: 'Error interno' });
  }
};

export default handler;
