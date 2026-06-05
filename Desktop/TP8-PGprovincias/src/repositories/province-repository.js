
import pkg from 'pg';
const { Client } = pkg;
import DBConfig  from '../configs/db-config.js';
import LogHelper from '../helpers/log-helper.js';

// (ProvinceRepository, clase que se comunica con la BD) 
class ProvinceRepository {
// obtiene todas las provincias de la BD, y devuelve un array de objetos provincia
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

            // insert con 5 parámetros ($1 a $5)
            const sql = `
                INSERT INTO provinces (name, full_name, latitude, longitude, display_order)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING * 
            `;
            // RETURNING * le indica a la BD que nos devuelva la fila insertada (así obtenemos el id autogenerado sin hacer una segunda query)
            const values = [
                province.name,          //$1 
                province.full_name,     //$2 
                province.latitude,      //$3 
                province.longitude,     //$4 
                province.display_order  //$5 
            ];

            const result = await client.query(sql, values);

            // RETURNING * devuelve la fila insertada en result.rows[0] (incluye el id que genero automáticamente)
            if (result.rows.length > 0) {
                returnEntity = result.rows[0];
            }

        } catch (error) {
            LogHelper.logError(error);

        } finally {
            await client.end();
        }

        return returnEntity;
    }

     //actualiza una provincia existente en la base de datos, recibe una provincia y edita sus atributos.
    updateAsync = async (province) => {

        let returnEntity = null;
        const client = new Client(DBConfig);

        try {
            await client.connect();

            // UPDATE con 6 parámetros ($1 a $6)            
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
            // RETURNING * nos devuelve la fila actualizada sin necesidad de hacer un SELECT aparte

            const values = [
                province.name,          //$1  
                province.full_name,     //$2 
                province.latitude,      //$3 
                province.longitude,     //$4 
                province.display_order, //$5 
                province.id             //$6 - id de la provincia a actualizar (va en el WHERE)
            ];

            const result = await client.query(sql, values);

            // si RETURNING * devuelve filas, el UPDATE encontro y modifico la provincia, 
            // si no devuelve nada significa que no existía ninguna fila con ese id
            if (result.rows.length > 0) {
                returnEntity = result.rows[0];
            }

        } catch (error) {
            LogHelper.logError(error);

        } finally {
            await client.end();
        }

        return returnEntity;
    }

    //Elimina una provincia por su ID
    deleteAsync = async (id) => {
        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();

            // RETURNING * nos devuelve la fila eliminada para confirmar que existía
            const sql    = `DELETE FROM provinces WHERE id = $1 RETURNING *`;


            const values = [id]; //array con el id de la provincia a eliminar

            // Ejecutamos la query con los valores
            const result = await client.query(sql, values);

            // si RETURNING * devuelve filas, el DELETE encontró y eliminó la provincia
            // si rows está vacío, no existía ninguna fila con ese id
            if (result.rows.length > 0) {
                returnEntity = result.rows[0];
            }

        } catch (error) {
            LogHelper.logError(error);

        } finally {
            await client.end();
        }

        // Retornamos la provincia eliminada, o null si no existía
        return returnEntity;
    }
}

export default new ProvinceRepository();
