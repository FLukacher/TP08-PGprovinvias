// Cargamos las variables de entorno del archivo .env
import 'dotenv/config';
import fs from 'fs';

// LogHelper: clase que centraliza el registro de errores.
// Puede escribir en un archivo de texto y/o mostrar por consola,
// según la configuración del archivo .env.
class LogHelper {
    constructor() {
        // Ruta y nombre del archivo de log (vienen del .env)
        this.filePath            = process.env.LOG_FILE_PATH;
        this.fileName            = process.env.LOG_FILE_NAME;

        // Flags que habilitan o deshabilitan cada destino de log
        this.logToFileEnabled    = process.env.LOG_TO_FILE_ENABLED.toLowerCase()    === 'true';
        this.logToConsoleEnabled = process.env.LOG_TO_CONSOLE_ENABLED.toLowerCase() === 'true';
    }

    /**
     * Almacena en archivo y/o muestra por consola la información del error.
     * @param {Error} errorObject - El objeto de error capturado en el catch.
     */
    logError = (errorObject) => {
        // Armamos el mensaje con timestamp, mensaje del error y stack trace
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
                // Creamos la carpeta si no existe (de forma recursiva)
                if (!fs.existsSync(this.filePath)) {
                    fs.mkdirSync(this.filePath, { recursive: true });
                }
                // Agregamos el mensaje al final del archivo (append)
                fs.appendFileSync(this.filePath + this.fileName, logMessage, 'utf8');
            } catch (fileError) {
                // Si falla la escritura del log, al menos lo mostramos en consola
                console.error('LogHelper: no se pudo escribir en el archivo de log.', fileError);
            }
        }
    }
}

// Exportamos una única instancia (patrón Singleton)
export default new LogHelper();
