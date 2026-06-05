
class ValidacionesHelper {

    //valida los campos de una provincia antes de insertar o actualizar, 
    //recibe la provincia y retorna un mensaje de error, o null si esta todo ok.
    validateProvince = (province) => {
        if (!province.name || province.name.trim() === '') {
            return 'El campo "name" es obligatorio.';
        }
        if (province.name.trim().length < 3) {
            return 'El campo "name" debe tener al menos 3 caracteres.';
        }

        if (!province.full_name || province.full_name.trim() === '') {
            return 'El campo "full_name" es obligatorio.';
        }

        if (province.full_name.trim().length < 3) {
            return 'El campo "full_name" debe tener al menos 3 caracteres.';
        }

        if (province.latitude === undefined || province.latitude === null || isNaN(province.latitude)) {
            return 'El campo "latitude" debe ser un número válido.';
        }

        if (province.longitude === undefined || province.longitude === null || isNaN(province.longitude)) {
            return 'El campo "longitude" debe ser un número válido.';
        }

        if (!Number.isInteger(Number(province.display_order)) || Number(province.display_order) < 0) {
            return 'El campo "display_order" debe ser un número entero positivo.';
        }
        return null;
    }
}

export default new ValidacionesHelper();
