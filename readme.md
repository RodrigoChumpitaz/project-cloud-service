# Mecánica API - Merch Service

Este proyecto es una API RESTful para la gestión de un taller mecánico, desarrollada en Node.js con TypeScript. Permite administrar vehículos, propietarios y registros de reparación, integrando autenticación, validaciones y documentación automática con Swagger.

## Características principales

- Gestión de vehículos y propietarios.
- Registro y consulta de reparaciones.
- Validaciones robustas y manejo de errores.
- Documentación Swagger disponible en `/api/v1/docs`.
- Arquitectura modular y escalable.
- Uso de MongoDB como base de datos.

## Requisitos previos

- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/) instalados.
- Node.js >= 16.x (solo si deseas ejecutar scripts o desarrollo fuera de Docker).

## Levantar el proyecto en local

1. **Clona el repositorio y entra a la carpeta del proyecto:**

   ```sh
   git clone <url-del-repo>
   cd merch-service
   ```

2. **Configura las variables de entorno:**

   El script de desarrollo copia automáticamente `.env.example` a `.env`, pero puedes revisarlo o editarlo si lo necesitas.

3. **Levanta los servicios con Docker Compose:**

   Esto construirá la imagen de la API y levantará MongoDB con la configuración necesaria.

   ```sh
   docker-compose up --build -d
   ```

   > Alternativamente, puedes usar el script:
   >
   > ```sh
   > yarn dev:up
   > ```
   > o
   > ```sh
   > npm run dev:up
   > ```

   El script también configura el replica set de MongoDB automáticamente.

4. **Accede a la API y la documentación:**

   - La API estará disponible en: `http://localhost:3002/api/v1`
   - La documentación Swagger en: `http://localhost:3002/api/v1/docs`

## Scripts útiles

- `yarn dev:up` / `npm run dev:up`: Levanta todo el entorno de desarrollo con Docker Compose.
- `yarn dev` / `npm run dev`: Levanta solo la API en modo desarrollo (requiere MongoDB corriendo).
- `yarn build` / `npm run build`: Compila el proyecto TypeScript.
- `yarn start` / `npm start`: Ejecuta la versión compilada.
- `yarn lint` / `npm run lint`: Linting y formateo automático del código.

## Notas

- El puerto y otras variables se pueden ajustar en el archivo `.env`.
- Para detener los servicios:  
  ```sh
  docker-compose down
  ```
- Para ver logs de la API:  
  ```sh
  docker-compose logs -f merch-service-api
  ```

---