
import pkg from 'pg';
const { Client } = pkg;
import DBConfig  from '../configs/db-config.js';
import LogHelper from '../helpers/log-helper.js';

// (ProvinceRepository, clase que se comunica con la BD) 
// obtiene todas las provincias de la BD, y devuelve un array de objetos provincia
class ProvinceRepository {

    getAllAsync = async () => {
        let returnList = [];
        const client = new Client(DBConfig);

        try {
          
            await client.connect(); //nos conectamos a la BD
            const sql = `SELECT * FROM provinces ORDER BY display_order`;
            const result = await client.query(sql); //ejecutamos la query
            returnList = result.rows;

        } catch (error) {
            LogHelper.logError(error);

        } finally { // haya error o no
           
            await client.end(); //cerramos la conexión
        }

        return returnList;
    }

 
     //obtiene una provincia por su ID, y devuelve null si no existe   
    getByIdAsync = async (id) => {
        let returnEntity = null;
        const client = new Client(DBConfig);

        try {
            await client.connect();
            const sql    = `SELECT * FROM provinces WHERE id = $1`;

            const values = [id]; // array de valores que reemplazan los parámetros $1, $2, etc. en orden

            const result = await client.query(sql, values);  // ejecutamos la query pasando tmb el array de valores


            if (result.rows.length > 0)  { //¿el array tiene elementos?
                returnEntity = result.rows[0];
            }

        } catch (error) {
            LogHelper.logError(error);

        } finally {
            await client.end();
        }

        return returnEntity;
    }


     //inserta una nueva provincia en la BD, devuelve la provincia recien creada.
    insertAsync = async (province) => {
        let returnEntity = null;
        const client = new Client(DBConfig);

        try {
            await client.connect();

            // INSERT con 5 parámetros ($1 a $5) para evitar SQL Injection
            // RETURNING * le indica a PostgreSQL que nos devuelva la fila insertada
            // (así obtenemos el id autogenerado sin hacer una segunda query)
            const sql = `
                INSERT INTO provinces (name, full_name, latitude, longitude, display_order)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
            `;

            // Array con los valores que se mapean a $1, $2, $3, $4, $5 en orden
            const values = [
                province.name,          // $1 → nombre corto de la provincia
                province.full_name,     // $2 → nombre completo de la provincia
                province.latitude,      // $3 → coordenada latitud
                province.longitude,     // $4 → coordenada longitud
                province.display_order  // $5 → orden de visualización
            ];

            // Ejecutamos la query con los valores
            const result = await client.query(sql, values);

            // RETURNING * nos devuelve la fila insertada en result.rows[0]
            // Incluye el id que PostgreSQL generó automáticamente
            if (result.rows.length > 0) {
                returnEntity = result.rows[0];
            }

        } catch (error) {
            // Registramos el error (ej: violación de constraint, campo nulo, etc.)
            LogHelper.logError(error);

        } finally {
            // Cerramos la conexión siempre
            await client.end();
        }

        // Retornamos la provincia creada (con su nuevo id), o null si falló
        return returnEntity;
    }

    /**
     * Actualiza una provincia existente en la base de datos.
     * @param {object} province - Objeto con los datos actualizados (debe incluir id).
     * @returns {object|null} - La provincia actualizada, o null si no existe o falló.
     */
    updateAsync = async (province) => {
        // Inicializamos la entidad de retorno como null
        let returnEntity = null;

        // Creamos una nueva instancia del Client con la configuración de conexión
        const client = new Client(DBConfig);

        try {
            // Nos conectamos a PostgreSQL
            await client.connect();

            // UPDATE con 6 parámetros ($1 a $6) para evitar SQL Injection
            // $6 es el id que usamos en el WHERE para identificar la fila a actualizar
            // RETURNING * nos devuelve la fila actualizada sin necesidad de hacer un SELECT aparte
            const sql = `
                UPDATE provinces
                SET name          = $1,
                    full_name     = $2,
                    latitude      = $3,
                    longitude     = $4,
                    display_order = $5
                WHERE id = $6
                RETURNING *
            `;

            // Array con los valores en el mismo orden que los parámetros del SQL
            const values = [
                province.name,          // $1 → nuevo nombre corto
                province.full_name,     // $2 → nuevo nombre completo
                province.latitude,      // $3 → nueva latitud
                province.longitude,     // $4 → nueva longitud
                province.display_order, // $5 → nuevo orden de visualización
                province.id             // $6 → id de la provincia a actualizar (va en el WHERE)
            ];

            // Ejecutamos la query con los valores
            const result = await client.query(sql, values);

            // Si RETURNING * devuelve filas, el UPDATE encontró y modificó la provincia
            // Si no devuelve nada (rows vacío), significa que no existía ninguna fila con ese id
            if (result.rows.length > 0) {
                returnEntity = result.rows[0];
            }

        } catch (error) {
            // Registramos el error
            LogHelper.logError(error);

        } finally {
            // Cerramos la conexión siempre
            await client.end();
        }

        // Retornamos la provincia actualizada, o null si no existía el id
        return returnEntity;
    }

    /**
     * Elimina una provincia por su ID.
     * @param {number} id - ID de la provincia a eliminar.
     * @returns {object|null} - La provincia eliminada, o null si no existía.
     */
    deleteAsync = async (id) => {
        // Inicializamos la entidad de retorno como null
        let returnEntity = null;

        // Creamos una nueva instancia del Client con la configuración de conexión
        const client = new Client(DBConfig);

        try {
            // Nos conectamos a PostgreSQL
            await client.connect();

            // DELETE con parámetro $1 para evitar SQL Injection
            // RETURNING * nos devuelve la fila eliminada para confirmar que existía
            // y para poder devolvérsela al cliente en la respuesta HTTP
            const sql    = `DELETE FROM provinces WHERE id = $1 RETURNING *`;

            // Array con el id de la provincia a eliminar
            const values = [id];

            // Ejecutamos la query con los valores
            const result = await client.query(sql, values);

            // Si RETURNING * devuelve filas, el DELETE encontró y eliminó la provincia
            // Si rows está vacío, no existía ninguna fila con ese id
            if (result.rows.length > 0) {
                returnEntity = result.rows[0];
            }

        } catch (error) {
            // Registramos el error
            LogHelper.logError(error);

        } finally {
            // Cerramos la conexión siempre
            await client.end();
        }

        // Retornamos la provincia eliminada, o null si no existía
        return returnEntity;
    }
}

// Exportamos una única instancia de la clase (patrón Singleton)
// Así todos los que importen este módulo comparten la misma instancia
export default new ProvinceRepository();
