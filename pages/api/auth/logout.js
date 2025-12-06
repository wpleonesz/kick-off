const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  res.setHeader(
    'Set-Cookie',
    'token=; HttpOnly; Secure=false; SameSite=Strict; Max-Age=0; Path=/'
  );

  return res.status(200).json({
    ok: true,
    message: 'Sesión cerrada exitosamente',
  });
};

export default handler;
