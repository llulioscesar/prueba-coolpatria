# API
Variables de entorno
- **PORT** puerto http de la api (3000) valor por defecto
- **DB_USER** nombre de usuario de la base de datos valor por defecto root
- **DB_PASS** contraseña de usuario de la base de datos valor por defecto root
- **DB_HOST** direccion del servidor de la base de datos port defecto es localhost
- **DB_PORT** puerto del servidor de la base de datos por defecto es 27017
- **DB_NAME** nombre de la base de datos por defecto es paingain
- **JWT_SECRET** Contraseña para jwt token por defecto es paingain

# Comando api
- yarn build para compilar
- yarn start ejecutar modo produccion
- yarn prod compilar y ejecutar
- yarn dev ejecutar modo development

# Rutas no protegidas con jwt
- /user/login
- /user/register
- /user/admin
- /auth/renovar
- /sede/public
- /city/public
- /departament/public

# Rutas
- **POST => /user/login** (name, password) Incio de sesion
- **POST => /user/register** (user:{name, document, email, password}, sede: string) registar cliente
- **POST => /user/admin** ({name, document, email, password}) registrar admin
- **GET => /user/sede/:id** Obtiene los clientes de una determinada sede
- **POST => /city** (name, departament) registra una ciudad
- **GET => /city/public** obtiene todas las ciudades registradas
- **GET => /city/departament**/ Obtiene las ciudades con los departamentos
- **POST => /departament** (name) registra un departamento
- **GET => /departament/public** obtiene todos los departamentos registrados
- **POST => /sede** (name, city) registra una nueva sede
- **GET => /sede/public** obtiene todas las sedes registradas
- **GET => /sede/city** obtiene todas las sedes con las cidades asociadas