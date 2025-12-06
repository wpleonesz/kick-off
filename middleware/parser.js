import sanitizeHtml from 'sanitize-html';

const escape = (fieldsToEscape = []) => (req, res, next) => {
  if (!req.body || typeof req.body !== 'object') {
    return next();
  }

  const sanitized = {};

  for (const [key, value] of Object.entries(req.body)) {
    if (fieldsToEscape.includes(key) && typeof value === 'string') {
      sanitized[key] = sanitizeHtml(value.trim(), {
        allowedTags: [],
        allowedAttributes: {},
      });
    } else {
      sanitized[key] = value;
    }
  }

  req.body = sanitized;
  next();
};

const parser = {
  escape,
};

export default parser;
