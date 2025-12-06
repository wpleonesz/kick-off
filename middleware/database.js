const databaseMiddleware = (DataClass) => (req, res, next) => {
  const instance = new DataClass();
  req.prisma = instance;
  req.do = async (action, callback) => {
    try {
      const result = await callback(res.api || {}, req.prisma);
      return result;
    } catch (err) {
      console.error(`Database error (${action}):`, err.message);
      return res.status(500).json({ ok: false, error: 'Database error' });
    }
  };
  next();
};

export default databaseMiddleware;
