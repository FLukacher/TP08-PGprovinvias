// Service: capa de lógica de negocio.
// Se encarga de validar los datos y coordinar las operaciones con el Repository.
// El Controller llama al Service, y el Service llama al Repository.
import ProvinceRepository  from '../repositories/province-repository.js';
import ValidacionesHelper  from '../helpers/validaciones-helper.js';

class ProvinceService {

    /**
     * Retorna todas las provincias.
     * @returns {Array} - Array de provincias.
     */
    getAllAsync = async () => {
        // Sin lógica de negocio especial, delegamos directo al repository
        return await ProvinceRepository.getAllAsync();
    }

    /**
     * Retorna una provincia por ID.
     * @param {number} id
     * @returns {object|null}
     */
    getByIdAsync = async (id) => {
        return await ProvinceRepository.getByIdAsync(id);
    }

    /**
     * Inserta una nueva provincia, previa validación.
     * @param {object} province
     * @returns {{ error: string|null, data: object|null }}
     */
    insertAsync = async (province) => {
        // Validamos las reglas de negocio antes de ir a la base de datos
        const validationError = ValidacionesHelper.validateProvince(province);
        if (validationError) {
            // Retornamos el error para que el Controller responda con 400
            return { error: validationError, data: null };
        }

        const result = await ProvinceRepository.insertAsync(province);
        return { error: null, data: result };
    }

    /**
     * Actualiza una provincia existente, previa validación.
     * @param {object} province - Debe incluir el campo "id".
     * @returns {{ error: string|null, data: object|null }}
     */
    updateAsync = async (province) => {
        // Validamos las reglas de negocio
        const validationError = ValidacionesHelper.validateProvince(province);
        if (validationError) {
            return { error: validationError, data: null };
        }

        const result = await ProvinceRepository.updateAsync(province);
        return { error: null, data: result };
    }

    /**
     * Elimina una provincia por ID.
     * @param {number} id
     * @returns {object|null} - La provincia eliminada, o null si no existía.
     */
    deleteAsync = async (id) => {
        return await ProvinceRepository.deleteAsync(id);
    }
}

export default new ProvinceService();
