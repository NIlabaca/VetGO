# VET-GO

API REST desarrollada con Node.js, base para el sistema de gestion de pacientes de veterinaria.

## Requisitos 
- Node.js v20 o superior.
- PostrgreSQL instalada.

## Tecnologias Utilizadas

* ** Lenguaje:** JavaScript
* ** Entorno de Ejecucion:** Node.js
* ** Framework Back-end:** Express.js
* ** Cliente de base de datos:** [pg (node-postgres)](https://node-postgres.com/)
* ** Gestion de Configuracion :** [dotenv](https://www.npmjs.com/package/dotenv)
* ** Base de datos :** PostgreSQL

## Caracteristicas

## Instalacion
1.- Clonar el repositorio
    git clone https://github.com/NIlabaca/VetGO
2.- Instalar las dependecias
    npm install pg dotenv
3.- Crear el archivo .env basado en el env.example
4.- Completar la variables .env con las creedenciales de postgresql
5.- Levantar el servidor
    node src/server.js

## Endpoints disponibles
- GET /api/             ->mensaje de bienvenida
- GET /api/status       ->estado del servidor
- GET /api/info         ->informacion del proyecto
- GET /api/health       ->estado de conexion a la base de datos

## Estructura del Proyecto
VetGo
│   .env
│   .env.example
│   .gitignore
│   anotacion.md
│   package-lock.json
│   package.json
│   README.md
├─node_modules  
└─src
│   app.js
│   server.js
│
├───config
│       database.js
│       environment.js
│
├───controllers
│       health.controller.js
│       home.controller.js
│
├───logs
│       log.txt
│
├───middlewares
│       error.middleware.js
│       loggers.middleware.js
│
├───public
│       index.html
│
├───routes
│       health.routes.js
│       home.routes.js
│       index.js
│
├───services
│       loggers.service.js
│
└───utils
        constants.js