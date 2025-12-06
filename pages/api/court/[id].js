import nc from 'next-connect';
import auth from '@middleware/auth';
import api from '@middleware/api';
import database from '@middleware/database';
import access from '@middleware/access';
import parser from '@middleware/parser';
import CourtData, { ESCAPE } from '@database/base/court';

const handler = nc();

handler
  .use(auth)
  .use(api)
  .use(access('court'))
  .use(database(CourtData))
  .get((request) => {
    request.do('read', async (api, prisma) => {
      const court = await prisma.record(request.query.id).getUnique();
      if (!court) return api.error('Cancha no encontrada', 404);
      return api.successOne(court);
    });
  })
  .delete((request) => {
    request.do('remove', async (api, prisma) => {
      const updated = await prisma.record(request.query.id).update({ active: false });
      return api.success(updated);
    });
  })
  .use(parser.escape(ESCAPE))
  .put((request) => {
    request.do('write', async (api, prisma) => {
      const updated = await prisma.record(request.query.id).update(request.body);
      return api.success(updated);
    });
  });

export default handler;
