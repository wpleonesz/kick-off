# kick-off — Sistema de Agendamiento de Canchas

## Descripción

Aplicación fullstack para gestionar el agendamiento, control y demás funcionalidades de canchas de fútbol.

## Características

- ✅ Registro de usuarios (Jugador y Dueño de Cancha)
- ✅ Aprobación de Dueños de Cancha por Admin
- ✅ Autenticación con JWT
- ✅ Base de datos con Prisma ORM y PostgreSQL
- ✅ UI con Ant Design v5
- ✅ Validación con react-hook-form + Yup
- ✅ Middlewares y estructura modular

## Requisitos Previos

- Node.js 18+
- PostgreSQL 12+
- Yarn 4.0+

## Instalación

### 1. Clonar el repositorio

\`\`\`bash
git clone <repo-url>
cd kick-off
\`\`\`

### 2. Instalar dependencias

\`\`\`bash
yarn install
\`\`\`

### 3. Configurar variables de entorno

Copia \`.env.example\` a \`.env\` y actualiza los valores:
\`\`\`bash
cp .env.example .env
\`\`\`

### 3a. Generar claves seguras

Genera automáticamente claves seguras para \`API_SECRET\` y \`JWT_SECRET\`:

**Opción 1: Con Node.js**
\`\`\`bash
yarn generate:secrets
\`\`\`

**Opción 2: Con Bash**
\`\`\`bash
bash scripts/generate-secrets.sh
\`\`\`

**Opción 3: Manual** (copiar las claves generadas en la consola anterior)

Las claves se guardan en \`.env.secrets\` (no versionar) y se muestran en consola.

### 3b. Editar .env

Edita \`.env\` con los valores reales:
\`\`\`env
DATABASE_URL="postgresql://user:password@localhost:5432/kickoff_dev"
NEXT_PUBLIC_API_URL="http://localhost:3000"
API_SECRET="tu-clave-generada"
JWT_SECRET="tu-clave-generada"
JWT_EXPIRES_IN="7d"
\`\`\`

### 4. Generar cliente Prisma

\`\`\`bash
yarn prisma:generate
\`\`\`

### 5. Ejecutar migraciones

\`\`\`bash
yarn prisma:migrate
\`\`\`

Puedes darle un nombre descriptivo a la migración:
\`\`\`bash
yarn prisma migrate dev --name "initial schema"
\`\`\`

### 6. Ejecutar seed (crea admin)

\`\`\`bash
yarn prisma:seed
\`\`\`

Credenciales del admin:

- Email: \`admin@kickoff.local\`
- Contraseña: \`admin123\`

## Desarrollo

### Levantar servidor de desarrollo

\`\`\`bash
yarn dev
\`\`\`

La aplicación estará disponible en \`http://localhost:3000\`

### Lint

\`\`\`bash
yarn lint
\`\`\`

### Formato de código

\`\`\`bash
yarn format
\`\`\`

## Estructura del Proyecto

\`\`\`
kick-off/
├── pages/ # Páginas y API routes
│ ├── api/ # Endpoints REST
│ ├── auth/ # Páginas de autenticación
│ ├── \_app.js # App wrapper
│ ├── \_document.js # HTML document
│ └── index.js # Página de inicio
├── components/ # Componentes React
│ ├── auth/ # Componentes de autenticación
│ ├── base/ # Componentes base
│ └── user/ # Componentes de usuario
├── ui/ # UI layouts y componentes reutilizables
│ ├── layout/
│ └── common/
├── database/ # Capas de acceso a datos
│ └── user/
├── middleware/ # Middlewares para API
├── services/ # Lógica de negocio
├── lib/ # Utilidades compartidas
│ ├── logger/
│ ├── http-request/
│ ├── security.js
│ └── date-formatter.js
├── helper/ # Helpers específicos
├── hooks/ # Hooks React reutilizables
├── context/ # Context providers
├── redux/ # Redux store (opcional)
├── styles/ # Estilos globales
├── prisma/ # Esquema y migraciones
│ ├── schema.prisma
│ ├── seed.js
│ └── migrations/
├── public/ # Archivos estáticos
└── scripts/ # Utilidades de línea de comandos
\`\`\`

## Rutas Disponibles

### Públicas

- \`GET /\` — Página de inicio
- \`GET /auth/register\` — Página de registro
- \`GET /auth/login\` — Página de login

### Endpoints API

- \`POST /api/auth/register\` — Registrar usuario
- \`POST /api/auth/login\` — Iniciar sesión

## Modelo de Datos

### User

- \`id\` (Int, PK, auto-increment)
- \`email\` (String, unique)
- \`name\` (String)
- \`password\` (String, hashed)
- \`role\` (enum: PLAYER, OWNER, ADMIN)
- \`active\` (Boolean) — Cuenta activa
- \`ownerApproved\` (Boolean) — Dueño aprobado por admin
- \`createdAt\` (DateTime)

**Índices:**

- \`@@index([role])\`
- \`@@index([active, role])\`

## Reglas de Desarrollo

### Funciones

- Siempre usar funciones flecha: \`const fn = () => {}\`

### Nombres de archivos

- Rutas y utilidades: \`kebab-case\` (ej. \`user-service.js\`)
- Componentes React: \`PascalCase\` (ej. \`RegisterForm.jsx\`)

### Archivos sensibles

- **NO versionar:** \`.env\`, claves privadas, credenciales
- Usa \`.env.example\` como referencia

### Middlewares en APIs

Orden recomendado (si aplica):

1. \`auth\` — Autenticación/sesión
2. \`api\` — Helpers de respuesta
3. \`access('scope')\` — Autorización
4. \`database(client)\` — Inyección DB
5. \`parser.escape()\` — Sanitización

### Formato y Lint

\`\`\`bash
yarn format # Prettier
yarn lint # ESLint
yarn format:check # Verificar sin cambiar
\`\`\`

## Flujo de Registro

### Rol: JUGADOR

1. El usuario se registra
2. Cuenta creada: \`active: true\`
3. Puede iniciar sesión inmediatamente

### Rol: DUEÑO DE CANCHA

1. El usuario se registra
2. Cuenta creada: \`active: false\`, \`ownerApproved: false\`
3. Un administrador revisa y aprueba
4. Cuenta se activa y puede iniciar sesión

## Próximas Funcionalidades

- [ ] Panel de admin para aprobar dueños
- [ ] Gestión de canchas (crear, editar, eliminar)
- [ ] Agendamiento de horarios
- [ ] Sistema de pagos
- [ ] Notificaciones por email
- [ ] Reportes y estadísticas

## Scripts Útiles

\`\`\`bash
yarn dev # Desarrollo
yarn build && yarn start # Producción
yarn prisma:generate # Generar Prisma Client
yarn prisma:migrate # Migraciones DB
yarn prisma:seed # Ejecutar seed
yarn lint # Lint
yarn format # Formatear
yarn format:check # Verificar formato
\`\`\`

## Contribución

1. Crea una rama: \`git checkout -b feature/mi-feature\`
2. Commit: \`git commit -am 'Add feature'\`
3. Push: \`git push origin feature/mi-feature\`
4. Crea un Pull Request

## Licencia

MIT

## Contacto

Para preguntas o soporte, contacta al equipo de desarrollo.
