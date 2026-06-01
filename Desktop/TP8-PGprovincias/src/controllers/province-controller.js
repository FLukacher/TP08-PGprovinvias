// Controller: capa de presentación / endpoints HTTP.
// Recibe las peticiones HTTP, llama al Service y devuelve la respuesta al cliente.
// NO contiene lógica de negocio ni acceso a datos.
import { Router }       from 'express';
import { StatusCodes }  from 'http-status-codes';
import ProvinceService  from '../services/province-service.js';

// Creamos el Router de Express para agrupar todos los endpoints de Province
const ProvinceRouter = Router();

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/province
// Retorna todas las provincias.
// ─────────────────────────────────────────────────────────────────────────────
ProvinceRouter.get('/', async (req, res) => {
    const provinces = await ProvinceService.getAllAsync();
    // Siempre retorna 200 con el array (puede estar vacío)
    res.status(StatusCodes.OK).json(provinces);
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/province/:id
// Retorna una provincia por ID.
// 200 si la encontró, 404 si no existe.
// ─────────────────────────────────────────────────────────────────────────────
ProvinceRouter.get('/:id', async (req, res) => {
    // Obtenemos el id de los parámetros de la URL y lo convertimos a número
    const id = parseInt(req.params.id);
    const province = await ProvinceService.getByIdAsync(id);

    if (!province) {
        // No se encontró ninguna provincia con ese id
        return res.status(StatusCodes.NOT_FOUND).json({ message: `No se encontró la provincia con id ${id}.` });
    }

    res.status(StatusCodes.OK).json(province);
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/province
// Inserta una nueva provincia.
// 201 si se creó correctamente, 400 si hay error de validación.
// ─────────────────────────────────────────────────────────────────────────────
ProvinceRouter.post('/', async (req, res) => {
    // Los datos de la nueva provincia vienen en el body del request
    const province = req.body;
    const { error, data } = await ProvinceService.insertAsync(province);

    if (error) {
        // Error de validación de reglas de negocio → 400 Bad Request
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error });
    }

    // Provincia creada exitosamente → 201 Created
    res.status(StatusCodes.CREATED).json(data);
});

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/province
// Actualiza una provincia existente.
// 201 si se actualizó, 400 si hay error de validación, 404 si no existe.
// ─────────────────────────────────────────────────────────────────────────────
ProvinceRouter.put('/', async (req, res) => {
    // Los datos actualizados vienen en el body (incluyendo el id)
    const province = req.body;
    const { error, data } = await ProvinceService.updateAsync(province);

    if (error) {
        // Error de validación → 400 Bad Request
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error });
    }

    if (!data) {
        // El repository retornó null → no existe una provincia con ese id
        return res.status(StatusCodes.NOT_FOUND).json({ message: `No se encontró la provincia con id ${province.id}.` });
    }

    // Actualización exitosa → 201 Created (según lo indica el TP)
    res.status(StatusCodes.CREATED).json(data);
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/province/:id
// Elimina una provincia por ID.
// 200 si se eliminó, 404 si no existe.
// ─────────────────────────────────────────────────────────────────────────────
ProvinceRouter.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const deleted = await ProvinceService.deleteAsync(id);

    if (!deleted) {
        // No existía ninguna provincia con ese id
        return res.status(StatusCodes.NOT_FOUND).json({ message: `No se encontró la provincia con id ${id}.` });
    }

    // Eliminación exitosa → 200 OK con la provincia eliminada
    res.status(StatusCodes.OK).json(deleted);
});

export default ProvinceRouter;
