import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath ,pathToFileURL} from 'url';

const router = express.Router();

// Obtener el nombre del archivo actual y el directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función asíncrona para importar las rutas
async function loadRoutes() {
    // Lee los archivos en la carpeta de rutas
    const files = fs.readdirSync(__dirname);
    for (const file of files) {
        if (file !== 'index.js' && file.endsWith('.js')) {
            const routePath = `/${file.replace('.js', '')}`; // Crea la ruta a partir del nombre del archivo
            const routeHandler = (await import(pathToFileURL(path.join(__dirname, file)).href)).default; // Importa el archivo de forma dinámica

            router.use(routePath, routeHandler); // Mapea la ruta
            //equivale a  ejm: router.use('/ruta', archivo);
        }
    }
}

// Llama a la función para cargar las rutas
loadRoutes().catch(err => console.error("Error loading routes:", err));

export default router;
