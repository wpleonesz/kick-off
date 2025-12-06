import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    // Obtener token de la cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ ok: false, error: 'No autorizado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('[AUTH_MIDDLEWARE] Error:', err.message);
    return res.status(401).json({ ok: false, error: 'Token inválido' });
  }
};

export default authMiddleware;
