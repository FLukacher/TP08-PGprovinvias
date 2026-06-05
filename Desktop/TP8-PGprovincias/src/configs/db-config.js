
import 'dotenv/config';

// objeto de configuración que usa el Client de pg para conectarse a PostgreSQL. (valores vienen del archivo .env)
const DBConfig = {
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,
    database: process.env.DB_NAME,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

export default DBConfig;
