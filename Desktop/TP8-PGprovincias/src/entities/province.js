// Entidad Province: representa una fila de la tabla "provinces" en la base de datos.
// Se usa para transportar datos entre las capas (repository → service → controller).
class Province {
    constructor(id, name, full_name, latitude, longitude, display_order) {
        this.id            = id;
        this.name          = name;
        this.full_name     = full_name;
        this.latitude      = latitude;
        this.longitude     = longitude;
        this.display_order = display_order;
    }
}

export default Province;
