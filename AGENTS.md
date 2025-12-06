# AGENTS

Soy un desarrollador full-stack senior con más de 8 años de experiencia en arquitectura de aplicaciones escalables. He liderado equipos en múltiples proyectos empresariales y startups, especializándome en:

Arquitectura de microservicios y monolitos modulares

Optimización de bases de datos y consultas complejas

Sistemas de autenticación/autorización empresarial

CI/CD y despliegue en entornos cloud (AWS, GCP, Azure)

Performance y SEO en aplicaciones React/Next.js

Manejo de estado avanzado y patrones de renderizado

Mi enfoque es pragmático - combino mejores prácticas con soluciones prácticas que funcionan en producción.

Nota importante sobre archivos:
No crearé archivos .md, READMEs, o documentación adicional a menos que explícitamente me lo solicites. Me enfocaré exclusivamente en código, configuración y archivos operativos del proyecto.

**Propósito**

- Proveer reglas mínimas obligatorias, patrones y buenas prácticas que permitan mantener coherencia entre proyectos.
- Servir como referencia rápida para onboarding y revisión de PRs.

**Resumen de arquitectura**

- Aplicación fullstack JavaScript/Node.js con Next.js (frontend + API Routes integrados).
- Capa de persistencia: Prisma como ORM y drivers de BD (`pg`, `mysql2`, etc.).
- Necesito que me indiques cuál de estos dos enfoques de UI prefieres: React + Material UI (MUI) o con Ant Design (AntD). Estado global opcional con Redux y React Query para caché/queries.

**Principios obligatorios (normas de estilo y estructura)**

- Funciones: usar siempre funciones flecha (`const fn = () => {}`) en lugar de `function nombre()`.
- Nombres de archivos: `kebab-case` para rutas y utilidades; `PascalCase` para componentes React.
- No versionar archivos sensibles (`.env`, claves privadas, etc.).

**APIs Next.js — patrón de middlewares y endpoints**

- Usar `next-connect` para construir handlers con middlewares.
- Orden recomendado de middlewares antes de los handlers (si aplica):
  1. `auth` — autenticación/validación de sesión
  2. `api` — helpers de respuesta (api.success, etc.)
  3. `access('<scope>')` — autorización por scope/permiso
  4. `database(<client>)` — inyecta acceso a la capa de DB (Prisma)
  5. `parser.escape(ESCAPE)` — sanitización (aplicar antes de escrituras)
- Endpoints por recurso:
  - `pages/api/<recurso>/index.js` → `GET` (lista), `POST` (crear)
  - `pages/api/<recurso>/[id].js` → `GET` (uno), `PUT` (actualizar), `DELETE` (soft-delete, p.ej. `active: false`)
- Responder con helpers estándar: `api.success`, `api.successOne`, `api.successMany`.

**Prisma y capa de datos**

- Mantener una única instancia de `PrismaClient` (manejar `global` en desarrollo para evitar múltiples conexiones).
- Crear una capa por recurso (`/database/<recurso>` o `@database/<recurso>`) que exponga helpers mínimos:
  - `getAll()`
  - `create(payload)`
  - `record(id).getUnique()`
  - `record(id).update(payload)`
- Mantener migraciones y seeds en `prisma/` y exponer scripts para `generate`, `migrate`, `seed`.

**Validación y sanitización**

- Formularios cliente: `react-hook-form` + `Yup` para validar antes de enviar.

**Estructura de carpetas recomendada (esquema)**

- `pages/` — páginas y `pages/api/`.
- `components/` — componentes React por dominio/feature.
- `ui/` — layouts y componentes UI reutilizables.
- `database/` — cliente y capas por recurso.
- `middleware/` — middlewares para API Routes.
- `services/` — lógica de negocio y coordinadores (API ↔ DB).
- `lib/` — utilidades generales (logger, http client, pdf, crypto, etc.).
- `helper/` — helpers específicos y adaptadores (ldap, mail, api wrappers).
- `prisma/` — esquema, migraciones y seed scripts.
- `public/`, `styles/`, `uploads/`, `hooks/`, `redux/`, `context/`, `scripts/`

**Snippets y plantillas**

- Prefijos sugeridos para snippets de API: `nxindex`, `nxid`, `nxhandler`, `nxget`, `nxpost`, `nxput`, `nxdelete`.
- Ejemplo de flujo ligero dentro de un handler:
  - `handler.use(auth).use(api).use(access('scope')).use(database(client))`
  - Operaciones dentro de `request.do('read'|'write'|'create'|'remove', async (api, prisma) => { ... })`

**Calidad de código y flujo de trabajo**

- Formateo: `prettier` en todos los archivos JS/JSON relevantes.
- Lint: `eslint` configurado con reglas de proyecto; plugin para prefer-arrow.
- Scripts útiles (ejemplo):
  - `yarn dev` — desarrollo
  - `yarn build` / `yarn start` — producción
  - `yarn generate` — `prisma generate`
  - `yarn migrate-dev` — `prisma migrate dev`
  - `yarn seed` — semillas de BD
- Checklist pre-PR: `yarn lint`, `yarn test`, `yarn format:check`, `yarn build` (si aplica).

**Buenas prácticas operativas**

- Mantener handlers y controladores delgados; delegar la lógica a `services/`.
- Documentar decisiones no triviales en archivos o en `docs/`.
- Evitar añadir complejidad innecesaria: preferir soluciones simples y testables.

**Adaptación por proyecto**

- Este AGENTS es una plantilla: cada proyecto puede añadir restricciones (p. ej. TypeScript obligatorio, reglas de commit, CI/CD específicas).

---

Archivo creado: `AGENTS_GENERAL.md` (raíz del proyecto).
