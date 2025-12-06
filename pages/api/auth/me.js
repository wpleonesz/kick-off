import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ ok: false, error: 'No autorizado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      ok: true,
      data: {
        user: {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
        },
      },
    });
  } catch (err) {
    console.error('[ME] Error:', err.message);
    return res.status(401).json({ ok: false, error: 'Token inválido' });
  }
};

export default handler;
