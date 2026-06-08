//Controller: capa de presentación / endpoints HTTP.
import { Router }       from 'express';
import { StatusCodes }  from 'http-status-codes';
import ProvinceService  from '../services/province-service.js';

//creamos el Router para agrupar todos los endpoints
const ProvinceRouter = Router();


// GET /api/province (retorna todas las provincias)

ProvinceRouter.get('/', async (req, res) => {
    const provinces = await ProvinceService.getAllAsync();
    // Siempre retorna 200 con el array (puede estar vacío)
    res.status(StatusCodes.OK).json(provinces);
});

// GET /api/province/:id (retorna una provincia por ID)

ProvinceRouter.get('/:id', async (req, res) => {
    
    const id = parseInt(req.params.id); // obtenemos el id de los parámetros de la URL y lo parseamos
    const province = await ProvinceService.getByIdAsync(id);

    if (!province) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: `No se encontró la provincia con id ${id}.` });
    }

    res.status(StatusCodes.OK).json(province);
    // 200 si la encontró, 404 si no existe
});


// POST /api/province (inserta una nueva provincia)

ProvinceRouter.post('/', async (req, res) => {
    const province = req.body;
    const { error, data } = await ProvinceService.insertAsync(province);

    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error });
    }
    //201 si se creó correctamente, 400 si hay error de validación.
    res.status(StatusCodes.CREATED).json(data);
});


// PUT /api/province (actualiza una provincia existente)

// 

ProvinceRouter.put('/', async (req, res) => {
    // Los datos actualizados vienen en el body (incluyendo el id)
    const province = req.body;
    const { error, data } = await ProvinceService.updateAsync(province);

    if (error) {
        //error de validación 
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error });
    }

    if (!data) {
        //no existe una provincia con ese id
        return res.status(StatusCodes.NOT_FOUND).json({ message: `No se encontró la provincia con id ${province.id}.` });
    }

    // 201 si se actualizó, 400 si hay error de validación, 404 si no existe.
    res.status(StatusCodes.CREATED).json(data);
});

// DELETE /api/province/:id (elimina una provincia por ID)

ProvinceRouter.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const deleted = await ProvinceService.deleteAsync(id);

    if (!deleted) {
        // No existía ninguna provincia con ese id
        return res.status(StatusCodes.NOT_FOUND).json({ message: `No se encontró la provincia con id ${id}.` });
    }

    res.status(StatusCodes.OK).json(deleted);
});

export default ProvinceRouter;
