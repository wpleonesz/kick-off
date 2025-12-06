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
      const courts = await prisma.findActive();
      return api.successMany(courts);
    });
  })
  .use(parser.escape(ESCAPE))
  .post((request) => {
    request.do('create', async (api, prisma) => {
      const court = await prisma.create(request.body);
      return api.success(court);
    });
  });

export default handler;
