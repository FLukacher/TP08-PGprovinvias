// Helper de validaciones de reglas de negocio para Province.
// Centraliza todas las validaciones para reutilizarlas desde el Service.
class ValidacionesHelper {

    /**
     * Valida los campos de una provincia antes de insertar o actualizar.
     * @param {object} province - Objeto con los datos a validar.
     * @returns {string|null} - Retorna el mensaje de error, o null si todo está bien.
     */
    validateProvince = (province) => {
        // El nombre no puede estar vacío
        if (!province.name || province.name.trim() === '') {
            return 'El campo "name" es obligatorio.';
        }

        // El nombre debe tener al menos 3 caracteres
        if (province.name.trim().length < 3) {
            return 'El campo "name" debe tener al menos 3 caracteres.';
        }

        // El full_name no puede estar vacío
        if (!province.full_name || province.full_name.trim() === '') {
            return 'El campo "full_name" es obligatorio.';
        }

        // El full_name debe tener al menos 3 caracteres
        if (province.full_name.trim().length < 3) {
            return 'El campo "full_name" debe tener al menos 3 caracteres.';
        }

        // La latitud debe ser un número
        if (province.latitude === undefined || province.latitude === null || isNaN(province.latitude)) {
            return 'El campo "latitude" debe ser un número válido.';
        }

        // La longitud debe ser un número
        if (province.longitude === undefined || province.longitude === null || isNaN(province.longitude)) {
            return 'El campo "longitude" debe ser un número válido.';
        }

        // El display_order debe ser un número entero positivo
        if (!Number.isInteger(Number(province.display_order)) || Number(province.display_order) < 0) {
            return 'El campo "display_order" debe ser un número entero positivo.';
        }

        // Si llegamos acá, todo está bien
        return null;
    }
}

export default new ValidacionesHelper();
