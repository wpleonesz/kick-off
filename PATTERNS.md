// EJEMPLO: Cómo agregar un nuevo recurso (ej. Court - Canchas)

// 1. Crear la clase de datos
// archivo: database/base/court/index.js

/*
import ObjectData from '@lib/database';
import schemas from '@database/base/court/schemas';

export const ESCAPE = ['name', 'address'];

class CourtData extends ObjectData {
  constructor() {
    const name = 'court';
    const table = 'court'; // nombre de la tabla en Prisma
    super(name, table, schemas);
  }

  findByOwner = async (ownerId) => {
    return this.where({ ownerId }).getAll();
  };
}

export default CourtData;
*/

// 2. Crear schemas
// archivo: database/base/court/schemas.js

/*
const DEFAULT = {
  id: true,
  name: true,
  address: true,
  ownerId: true,
  active: true,
  createdAt: true,
};

const PUBLIC = {
  id: true,
  name: true,
  address: true,
};

const schemas = {
  DEFAULT,
  PUBLIC,
};

export default schemas;
*/

// 3. Crear endpoints API
// archivo: pages/api/court/index.js

/*
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
      const courts = await prisma.getAll();
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
*/

// archivo: pages/api/court/[id].js

/*
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
      if (!court) return api.error('No encontrado', 404);
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
*/

// 4. Crear service
// archivo: services/court.service.js

/*
import httpRequest from '@lib/http-request';

const getAll = () => httpRequest.get('/api/court');
const getById = (id) => httpRequest.get(`/api/court/${id}`);
const create = (params) => httpRequest.post('/api/court', params);
const update = (id, params) => httpRequest.put(`/api/court/${id}`, params);
const deactivate = (id) => httpRequest.delete(`/api/court/${id}`);
const activate = (id) => httpRequest.put(`/api/court/${id}`, { active: true });

const courtService = {
  getAll,
  getById,
  create,
  update,
  deactivate,
  activate,
};

export default courtService;
*/

// 5. Crear validations
// archivo: validations/court.js

/*
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const courtSchema = Yup.object().shape({
  name: Yup.string().required('Nombre requerido').min(3).max(100),
  address: Yup.string().required('Dirección requerida').min(5),
  ownerId: Yup.number().required('Dueño requerido'),
});

export const courtResolver = yupResolver(courtSchema);
*/

// 6. Crear componente (si necesitas)
// archivo: components/court/CourtForm.js

/*
import { Form, Input, Button, Card, Alert } from 'antd';
import { useForm } from 'react-hook-form';
import { courtResolver } from '@validations/court';

const CourtForm = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: courtResolver,
  });

  return (
    <Card title="Nueva Cancha">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form layout="vertical">
          <Form.Item
            label="Nombre"
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name?.message}
          >
            <Input {...register('name')} placeholder="Nombre de la cancha" />
          </Form.Item>

          <Form.Item
            label="Dirección"
            validateStatus={errors.address ? 'error' : ''}
            help={errors.address?.message}
          >
            <Input {...register('address')} placeholder="Dirección" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            Guardar
          </Button>
        </Form>
      </form>
    </Card>
  );
};

export default CourtForm;
*/

// PATRÓN GENERAL PARA CUALQUIER RECURSO:
// 1. database/base/{recurso}/index.js - Clase con métodos
// 2. database/base/{recurso}/schemas.js - Schemas con selects
// 3. pages/api/{recurso}/index.js - GET (lista), POST (crear)
// 4. pages/api/{recurso}/[id].js - GET (uno), PUT (actualizar), DELETE (soft-delete)
// 5. services/{recurso}.service.js - Funciones que llaman a endpoints
// 6. validations/{recurso}.js - Schemas Yup + resolvers
// 7. components/{recurso}/{Componente}.js - Componentes React (opcional)

// ESTRUCTURA DE ENDPOINTS:
// GET /api/{recurso} → api.successMany([...])
// POST /api/{recurso} → api.success({...})
// GET /api/{recurso}/[id] → api.successOne({...})
// PUT /api/{recurso}/[id] → api.success({...})
// DELETE /api/{recurso}/[id] → api.success({...})

export const EXAMPLE = 'Este es un ejemplo comentado, elimina los comentarios';
