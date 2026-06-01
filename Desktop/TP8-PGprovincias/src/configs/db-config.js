// Cargamos las variables de entorno del archivo .env
import 'dotenv/config';

// Objeto de configuración que usa el Client de pg para conectarse a PostgreSQL.
// Los valores vienen del archivo .env para no hardcodear credenciales en el código.
const DBConfig = {
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,
    database: process.env.DB_NAME,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

export default DBConfig;
