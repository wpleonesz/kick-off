#!/bin/bash

# Script para generar claves seguras
# Uso: bash scripts/generate-secrets.sh

echo ""
echo "🔐 === GENERACIÓN DE CLAVES SEGURAS ==="
echo ""

# Generar API_SECRET (32 caracteres hex = 16 bytes)
API_SECRET=$(openssl rand -hex 16)

# Generar JWT_SECRET (64 caracteres hex = 32 bytes)
JWT_SECRET=$(openssl rand -hex 32)

echo "API_SECRET:"
echo "  $API_SECRET"
echo ""
echo "JWT_SECRET:"
echo "  $JWT_SECRET"
echo ""

echo "📝 Instrucciones:"
echo "1. Abre el archivo .env"
echo "2. Reemplaza los valores actuales:"
echo ""
echo "   API_SECRET=\"$API_SECRET\""
echo "   JWT_SECRET=\"$JWT_SECRET\""
echo ""
echo "✅ Listo. Ahora puedes usar el proyecto con claves seguras."
echo ""

# Guardar en archivo temporal
SECRETS_FILE=".env.secrets"
echo "# Claves generadas el $(date)" > "$SECRETS_FILE"
echo "API_SECRET=\"$API_SECRET\"" >> "$SECRETS_FILE"
echo "JWT_SECRET=\"$JWT_SECRET\"" >> "$SECRETS_FILE"

echo "💾 Claves también guardadas en: $SECRETS_FILE"
echo "⚠️  Recuerda: NO versionar este archivo en git"
echo ""
