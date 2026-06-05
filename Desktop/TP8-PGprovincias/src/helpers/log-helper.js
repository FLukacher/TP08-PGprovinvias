//cargamos las variables de entorno del archivo .env
import 'dotenv/config';
import fs from 'fs';

//registro de errores en la conexion con la BD.

//(cuaderno donde se anotan todos los errores que ocurren mientras el servidor está corriendo)
class LogHelper {
    constructor() {
        //ruta y nombre del archivo de log (vienen del .env)
        this.filePath = process.env.LOG_FILE_PATH;
        this.fileName = process.env.LOG_FILE_NAME;

        // flags que habilitan o deshabilitan cada destino de log
        this.logToFileEnabled = process.env.LOG_TO_FILE_ENABLED.toLowerCase()    === 'true';
        this.logToConsoleEnabled = process.env.LOG_TO_CONSOLE_ENABLED.toLowerCase() === 'true';
    }


    logError = (errorObject) => {
        const timestamp = new Date().toISOString();
        const logMessage =
            `${timestamp}: ${errorObject.message}\n` +
            `Stack Trace: ${errorObject.stack}\n\n`;

        // Si está habilitado el log por consola, lo mostramos
        if (this.logToConsoleEnabled) {
            console.error(logMessage);
        }

        // Si está habilitado el log a archivo, lo escribimos
        if (this.logToFileEnabled) {
            try {
                if (!fs.existsSync(this.filePath)) {
                    fs.mkdirSync(this.filePath, { recursive: true });
                }

                fs.appendFileSync(this.filePath + this.fileName, logMessage, 'utf8');
            } catch (fileError) {

                console.error('LogHelper: no se pudo escribir en el archivo de log.', fileError);
            }
        }
    }
}

// Exportamos una única instancia (patrón Singleton)
export default new LogHelper();
