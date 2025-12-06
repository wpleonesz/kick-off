const apiMiddleware = (req, res, next) => {
  res.api = {
    success: (data = null) => res.json({ ok: true, data }),
    successOne: (data) => res.json({ ok: true, data }),
    successMany: (data = []) => res.json({ ok: true, data }),
    error: (message, status = 400) => res.status(status).json({ ok: false, error: message }),
  };
  next();
};

export default apiMiddleware;
