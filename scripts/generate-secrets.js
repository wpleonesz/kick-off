#!/usr/bin/env node

/**
 * Script para generar claves seguras para API_SECRET y JWT_SECRET
 * Uso: node scripts/generate-secrets.js
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const generateSecret = (bytes = 16) => {
  return crypto.randomBytes(bytes).toString('hex');
};

const apiSecret = generateSecret(16); // 32 caracteres hex
const jwtSecret = generateSecret(32); // 64 caracteres hex

console.log('\n🔐 === GENERACIÓN DE CLAVES SEGURAS ===\n');
console.log('API_SECRET:');
console.log(`  ${apiSecret}\n`);
console.log('JWT_SECRET:');
console.log(`  ${jwtSecret}\n`);

console.log('📝 Instrucciones:');
console.log('1. Abre el archivo .env');
console.log('2. Reemplaza los valores actuales:\n');
console.log(`   API_SECRET="${apiSecret}"`);
console.log(`   JWT_SECRET="${jwtSecret}"\n`);
console.log('✅ Listo. Ahora puedes usar el proyecto con claves seguras.\n');

// Opcionalmente, guardar en archivo
const envPath = path.join(process.cwd(), '.env.secrets');
const secretsContent = `# Claves generadas el ${new Date().toISOString()}\nAPI_SECRET="${apiSecret}"\nJWT_SECRET="${jwtSecret}"\n`;

try {
  fs.writeFileSync(envPath, secretsContent);
  console.log(`💾 Claves también guardadas en: ${envPath}`);
  console.log('⚠️  Recuerda: NO versionar este archivo en git\n');
} catch (err) {
  console.error('Error al guardar archivo:', err.message);
}
