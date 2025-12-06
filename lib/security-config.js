// Configuración de seguridad para la aplicación
// Este archivo documenta todas las medidas de seguridad implementadas

export const securityConfig = {
  // Rate Limiting
  rateLimiting: {
    general: {
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100, // máximo 100 solicitudes
      description: 'Limite general para todas las solicitudes API',
    },
    auth: {
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 5, // máximo 5 intentos
      description: 'Límite estricto para login y registro',
    },
  },

  // Headers de Seguridad (via next.config.js)
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  },

  // Validación de Entrada
  validation: {
    email: {
      pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
      maxLength: 255,
      description: 'Validación de formato de email',
    },
    password: {
      minLength: 6,
      requireUppercase: true,
      requireNumber: true,
      description: 'Contraseña debe tener min 6 caracteres, 1 mayúscula, 1 número',
    },
  },

  // Autenticación
  auth: {
    tokenExpiry: '7d',
    algorithm: 'HS256',
    description: 'JWT con expiración de 7 días',
  },

  // Protección de Datos
  dataProtection: {
    passwordHashing: 'bcryptjs con 10 rounds',
    credentialsInUrl: 'Nunca se pasan credenciales en URL (siempre POST body)',
    htmlEscaping: 'Sanitización de entrada con sanitize-html',
  },

  // Privacidad
  privacy: {
    clearQueryParams: 'Los parámetros de query de auth se limpian automáticamente',
    noCredentialsInLogs: 'Las credenciales no se registran en logs',
    sslTls: 'Recomendado usar HTTPS en producción',
  },
};

export const securityImplementation = {
  files: {
    'middleware/security.js': 'Rate limiting y configuración Helmet',
    'next.config.js': 'Headers de seguridad HTTP',
    'pages/_app.js': 'Viewport meta tag en Head (no en _document)',
    'pages/_document.js': 'Documento sin viewport meta tag',
    'pages/auth/login.js': 'Limpieza automática de query params',
    'pages/api/auth/login.js': 'Rate limiting en endpoint',
    'pages/api/auth/register.js': 'Rate limiting en endpoint',
    'components/auth/LoginFormDynamic.js': 'Renderizado solo en cliente (ssr: false)',
    'components/auth/RegisterFormDynamic.js': 'Renderizado solo en cliente (ssr: false)',
  },

  dependencies: {
    helmet: 'Configuración de headers de seguridad',
    'express-rate-limit': 'Rate limiting para endpoints',
    bcryptjs: 'Hashing de contraseñas (10 rounds)',
    jsonwebtoken: 'Tokens JWT seguros',
    'sanitize-html': 'Escape de entrada HTML',
  },
};
