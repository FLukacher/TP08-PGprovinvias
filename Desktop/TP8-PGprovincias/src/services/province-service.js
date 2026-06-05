
import ProvinceRepository  from '../repositories/province-repository.js';
import ValidacionesHelper  from '../helpers/validaciones-helper.js';

class ProvinceService {


    getAllAsync = async () => {
        return await ProvinceRepository.getAllAsync();
    }

    getByIdAsync = async (id) => {
        return await ProvinceRepository.getByIdAsync(id);
    }

    //inserta una nueva provincia, con previa validación.
    insertAsync = async (province) => {

        const validationError = ValidacionesHelper.validateProvince(province);
        if (validationError) {
            return { error: validationError, data: null };
        }

        const result = await ProvinceRepository.insertAsync(province);
        return { error: null, data: result };
    }

    //actualiza una provincia, con previa validación
    updateAsync = async (province) => {
        const validationError = ValidacionesHelper.validateProvince(province);
        if (validationError) {
            return { error: validationError, data: null };
        }

        const result = await ProvinceRepository.updateAsync(province);
        return { error: null, data: result };
    }


    deleteAsync = async (id) => {
        return await ProvinceRepository.deleteAsync(id);
    }
}

export default new ProvinceService();
