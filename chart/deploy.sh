#!/bin/bash
set -a
source .env

# Simulación del despliegue con dry-run
helm install helm-test . \
  --set secrets.apiServer="$API_SERVER" \
  --set configMap.nodeEnv="$NODE_ENV" \
  --dry-run

# Preguntar si se desea proceder con el despliegue real
read -p "¿Deseas ejecutar el despliegue real? (S/N): " respuesta

if [[ "$respuesta" =~ ^[Ss|Yy]$ ]]; then
  echo "Ejecutando despliegue real en el cluster..."
  helm install helm-test . \
    --set secrets.apiServer="$API_SERVER" \
    --set configMap.nodeEnv="$NODE_ENV"
  echo "¡Despliegue completado exitosamente!"
elif [[ "$respuesta" =~ ^[Nn]$ ]]; then
  echo "Has cancelado el despliegue. No se aplicaron cambios."
else
  echo "Respuesta no válida. Cancelando el despliegue."
fi
