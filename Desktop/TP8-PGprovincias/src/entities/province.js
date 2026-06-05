
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
//(clase Province con los campos que tiene la tabla en la BD)