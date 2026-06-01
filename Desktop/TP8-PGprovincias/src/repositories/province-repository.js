// Repository: capa de acceso a datos.
// Es la ÚNICA capa que habla directamente con PostgreSQL.
// Usa el Client de pg para ejecutar las queries SQL.
import pkg from 'pg';
const { Client } = pkg;

import DBConfig  from '../configs/db-config.js';
import LogHelper from '../helpers/log-helper.js';

class ProvinceRepository {

    /**
     * Obtiene todas las provincias de la base de datos.
     * @returns {Array} - Array de objetos provincia, o array vacío si no hay datos.
     */
    getAllAsync = async () => {
        let returnList = [];
        // Creamos una nueva instancia del Client con la configuración de la DB
        const client = new Client(DBConfig);
        try {
            // Nos conectamos a la base de datos
            await client.connect();
            const sql = `SELECT * FROM provinces ORDER BY display_order`;
            const result = await client.query(sql);
            // Guardamos las filas retornadas
            returnList = result.rows;
        } catch (error) {
            // Logueamos el error con el LogHelper
            LogHelper.logError(error);
        } finally {
            // Siempre cerramos la conexión, haya error o no
            await client.end();
        }
        return returnList;
    }

    /**
     * Obtiene una provincia por su ID.
     * @param {number} id - ID de la provincia a buscar.
     * @returns {object|null} - El objeto provincia, o null si no existe.
     */
    getByIdAsync = async (id) => {
        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            // Usamos parámetro $1 para evitar SQL Injection
            const sql    = `SELECT * FROM provinces WHERE id = $1`;
            const values = [id];
            const result = await client.query(sql, values);
            // Si encontró al menos una fila, la tomamos
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

    /**
     * Inserta una nueva provincia en la base de datos.
     * @param {object} province - Objeto con los datos de la nueva provincia.
     * @returns {object|null} - La provincia recién creada (con su id asignado), o null si falló.
     */
    insertAsync = async (province) => {
        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `
                INSERT INTO provinces (name, full_name, latitude, longitude, display_order)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
            `;
            const values = [
                province.name,
                province.full_name,
                province.latitude,
                province.longitude,
                province.display_order
            ];
            const result = await client.query(sql, values);
            // RETURNING * nos devuelve la fila insertada con el id generado
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

    /**
     * Actualiza una provincia existente en la base de datos.
     * @param {object} province - Objeto con los datos actualizados (debe incluir id).
     * @returns {object|null} - La provincia actualizada, o null si no existe o falló.
     */
    updateAsync = async (province) => {
        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
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
            const values = [
                province.name,
                province.full_name,
                province.latitude,
                province.longitude,
                province.display_order,
                province.id
            ];
            const result = await client.query(sql, values);
            // Si RETURNING * no devuelve nada, es porque el id no existía
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

    /**
     * Elimina una provincia por su ID.
     * @param {number} id - ID de la provincia a eliminar.
     * @returns {object|null} - La provincia eliminada, o null si no existía.
     */
    deleteAsync = async (id) => {
        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            // RETURNING * nos devuelve la fila eliminada para confirmar que existía
            const sql    = `DELETE FROM provinces WHERE id = $1 RETURNING *`;
            const values = [id];
            const result = await client.query(sql, values);
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
}

export default new ProvinceRepository();
