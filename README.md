# VET-GO

API REST desarrollada con Node.js, base para el sistema de gestion de pacientes de veterinaria.

## Requisitos 
- Node.js v20 o superior.
- PostrgreSQL instalada.

## Tecnologias Utilizadas

* **Lenguaje:** JavaScript
* **Entorno de Ejecucion:** Node.js
* **Framework Back-end:** Express.js
* **Cliente de base de datos:** [pg (node-postgres)](https://node-postgres.com/)
* **Gestion de Configuracion :** [dotenv](https://www.npmjs.com/package/dotenv)
* **JWT :** mecanismo de autentifiacion segura con tokens.
* **Bcrypt** – Librería para el encriptado contraseñas.
* **Express-Handlebars** – Motor de plantillas dinamica desde el servidor.
* **Base de datos :** PostgreSQL

## Caracteristicas

## Instalacion
1.- Clonar el repositorio
    git clone https://github.com/NIlabaca/VetGO

2.- Instalar las dependecias
    npm install 

3.- Crear el archivo .env basado en el env.example

4.- Completar la variables .env con las creedenciales de postgresql

5.- Cargar la base de datos, importarla desde './src/config/schema.sql'

6.- Levantar el servidor
    npm run dev

## Endpoints disponibles
- GET /api/             -> mensaje de bienvenida
- GET /api/status       -> estado del servidor
- GET /api/info         -> informacion del proyecto
- GET /api/health       -> estado de conexion a la base de datos
- POST /api/auth/login  -> login para ingresar usuario: admin - Admin123!
- GET /api/persons      -> listar todas las personas
- GET /api/persons/:id  -> obtener una persona por id
- POST /api/persons       -> crear una nueva persona
- PUT /api/persons/:id    -> actualizar una persona existente
- DELETE /api/persons/:id -> eliminar una persona

## Vistas disponibles
- /check                -> Muestra los estados actuales del servicio
- /                     -> Login formulario de inicio de sesion
- /persons              -> Listado y gestion de personas


## Estructura del Proyecto
