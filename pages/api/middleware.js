import { limiter } from '@middleware/security';

export default function apiMiddleware(req, res, next) {
  return limiter(req, res, next || (() => {}));
}
