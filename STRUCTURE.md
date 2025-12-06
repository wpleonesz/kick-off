# Estructura del Proyecto kick-off (Actualizada)

## Patrón de Arquitectura

El proyecto sigue el patrón **ObjectData** con clases base que encapsulan acceso a datos, similar al que mencionaste.

### Capas

```
database/               → Capa de datos (ObjectData)
  ├── client.js        → PrismaClient singleton
  ├── base/
  │   ├── user/
  │   │   ├── index.js      → Clase UserData
  │   │   └── schemas.js    → Schemas (DEFAULT, PUBLIC, CREDENTIALS)
  │   └── court/            → Ejemplo de otra capa
  │       ├── index.js
  │       └── schemas.js

middleware/             → Middlewares para API routes
  ├── auth.js           → Validación JWT
  ├── api.js            → Helpers de respuesta (res.api.success, etc.)
  ├── database.js       → Inyección de DataClass + request.do()
  ├── access.js         → Control de permisos
  └── parser.js         → Escape/sanitización

pages/api/              → Endpoints REST
  ├── auth/
  │   ├── register.js   → POST /api/auth/register
  │   └── login.js      → POST /api/auth/login
  └── court/
      ├── index.js      → GET, POST /api/court
      └── [id].js       → GET, PUT, DELETE /api/court/[id]

services/               → Lógica que llama a endpoints
  ├── auth.service.js   → httpRequest.post('/api/auth/...')
  └── court.service.js  → httpRequest.get/post/put/delete

validations/            → Schemas Yup + resolvers
  ├── common.js         → Locale (mensajes globales)
  ├── auth.js           → Schemas para auth
  └── court.js          → Schemas para court

components/            → Componentes React (.js)
  └── auth/
      ├── RegisterForm.js
      └── LoginForm.js

lib/                   → Utilidades
  ├── database.js       → Clase base ObjectData
  ├── http-request/     → Cliente HTTP
  ├── logger/           → Logger
  ├── security.js       → Utilidades de seguridad
  └── date-formatter.js → Formateo de fechas

pages/                 → Páginas Next.js
  ├── _app.js          → App wrapper (ConfigProvider de AntD)
  ├── _document.js     → HTML document
  ├── index.js         → Home
  └── auth/
      ├── register.jsx
      └── login.jsx
```

## Patrón de Request.do()

Los endpoints usan `request.do(action, async (api, prisma) => {})`:

```javascript
// pages/api/auth/register.js
handler
  .use(api)
  .use(database(UserData))
  .use(parser.escape(ESCAPE))
  .post((request) => {
    request.do('create', async (api, prisma) => {
      // prisma es una instancia de UserData
      const user = await prisma.create({...});
      return api.success(user);
    });
  });
```

## Clase ObjectData

```javascript
class ObjectData {
  constructor(name, table, schemas) { ... }
  
  where(conditions) { ... }
  select(schema) { ... }
  getFirst() { ... }
  getAll(options) { ... }
  getUnique(id) { ... }
  create(data) { ... }
  update(id, data) { ... }
  delete(id) { ... }
  record(id) { getUnique, update, delete }
}
```

## Schemas (Prisma select patterns)

```javascript
// database/base/user/schemas.js
const DEFAULT = {
  id: true,
  email: true,
  name: true,
  role: true,
  active: true,
  createdAt: true,
};

const PUBLIC = {
  id: true,
  email: true,
  name: true,
};

const CREDENTIALS = {
  id: true,
  email: true,
  name: true,
  role: true,
  active: true,
};

const schemas = {
  DEFAULT,
  PUBLIC,
  CREDENTIALS,
};
```

## Aliases de Paths

Configurados en `jsconfig.json`:

```json
{
  "@components/*": ["components/*"],
  "@database/*": ["database/*"],
  "@middleware/*": ["middleware/*"],
  "@services/*": ["services/*"],
  "@lib/*": ["lib/*"],
  "@validations/*": ["validations/*"],
  "@styles/*": ["styles/*"]
}
```

## Flujo de una Solicitud

1. **Cliente** → hace request a `/api/auth/register`
2. **Endpoint** (`pages/api/auth/register.js`):
   - Middlewares: `auth`, `api`, `database(UserData)`, `parser.escape()`
   - Handler: `request.do('create', async (api, prisma) => {})`
3. **Database** → `prisma.create({...})` (UserData instance)
4. **Response** → `api.success(user)` o `api.error('msg')`

## Componentes

Todos los componentes están en `.js` (no `.jsx`):

```javascript
// components/auth/RegisterForm.js
import { useForm } from 'react-hook-form';
import { registerResolver } from '@validations/auth';
import authService from '@services/auth.service';

const RegisterForm = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: registerResolver,
  });

  const onSubmit = async (data) => {
    const result = await authService.register(data);
    if (result.ok) { ... }
  };

  return ( <form>...</form> );
};

export default RegisterForm;
```

## Validaciones

Usando `react-hook-form` + Yup:

```javascript
// validations/auth.js
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const registerSchema = Yup.object().shape({
  name: Yup.string().required('Nombre requerido'),
  email: Yup.string().email().required('Email requerido'),
  password: Yup.string().min(6).required('Contraseña requerida'),
  role: Yup.string().oneOf(['PLAYER', 'OWNER']).required(),
});

export const registerResolver = yupResolver(registerSchema);
```

## Cómo Agregar un Nuevo Recurso

Ver `PATTERNS.md` para instrucciones detalladas.

Resumen:
1. Crear `database/base/{recurso}/index.js` (clase ObjectData)
2. Crear `database/base/{recurso}/schemas.js` (schemas)
3. Crear endpoints en `pages/api/{recurso}/index.js` y `[id].js`
4. Crear `services/{recurso}.service.js` (httpRequest)
5. Crear `validations/{recurso}.js` (Yup schemas)
6. Crear componentes en `components/{recurso}/`

## Middleware Chain (Orden Importante)

1. **auth** — Valida JWT (si es necesario)
2. **api** — Agrega helpers de respuesta
3. **access('scope')** — Control de permisos
4. **database(DataClass)** — Inyecta instancia + request.do()
5. **parser.escape(ESCAPE)** — Sanitiza campos específicos

## Ejemplo de Respuesta API

```javascript
// SUCCESS
{
  ok: true,
  data: { id: 1, name: '...' }
}

// ERROR
{
  ok: false,
  error: 'Descripción del error'
}

// MANY
{
  ok: true,
  data: [...]
}

// ONE
{
  ok: true,
  data: {...}
}
```

## Scripts Útiles

```bash
yarn dev                  # Desarrollo
yarn build                # Build
yarn lint                 # Linting
yarn format               # Prettier
yarn prisma:generate      # Generar Cliente
yarn prisma:migrate       # Migraciones
yarn prisma:seed          # Seed DB
```

## Variables de Entorno

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="secret-key"
JWT_EXPIRES_IN="7d"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```
