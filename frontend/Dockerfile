# Etapa de construcción
FROM node:19.0.0-alpine as build
WORKDIR /app

COPY . .
RUN npm ci --silent
RUN npm run build

# Etapa final para servir con Nginx
FROM nginx:stable-alpine
# Instalamos envsubst para la sustitución de variables de entorno
RUN apk add --no-cache gettext
# Define el argumento para recibir la variable de entorno para el contenedor del segundo stage
ARG API_SERVER
ENV API_SERVER=$API_SERVER
# Copiamos el archivo de configuración como plantilla
COPY nginx/nginx.conf /etc/nginx/templates/nginx.conf.template
COPY --from=build /app/build /usr/share/nginx/html

# Creamos un script para procesar la plantilla y luego iniciar Nginx
CMD envsubst '${API_SERVER}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
