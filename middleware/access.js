const accessMiddleware = (requiredScope) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (requiredScope && !req.user.scopes?.includes(requiredScope)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
};

export default accessMiddleware;
