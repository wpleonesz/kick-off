#!/bin/bash

# kick-off: Quick Setup Guide
# Este script configura rápidamente el proyecto

echo "Iniciando setup de kick-off..."

# 1. Instalar dependencias
echo "Instalando dependencias..."
yarn install

# 2. Generar Prisma Client
echo "Generando Prisma Client..."
yarn prisma:generate

# 3. Crear .env si no existe
if [ ! -f .env ]; then
  echo "Copiando .env.example a .env..."
  cp .env.example .env
  echo "Actualiza DATABASE_URL en .env antes de continuar"
fi

# 4. Ejecutar migraciones
echo "Ejecutando migraciones..."
yarn prisma:migrate

# 5. Ejecutar seed (crear admin)
echo "Ejecutando seed (admin)..."
yarn prisma:seed

echo "✅ Setup completado!"
echo ""
echo "Próximos pasos:"
echo "1. Actualiza DATABASE_URL en .env (si es necesario)"
echo "2. Ejecuta: yarn dev"
echo "3. Accede a: http://localhost:3000"
echo ""
echo "Credenciales del admin:"
echo "  Email: admin@kickoff.local"
echo "  Password: admin123"
