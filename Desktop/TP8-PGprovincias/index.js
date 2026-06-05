
import express from 'express';
import cors from 'cors';
import ProvinceRouter from './src/controllers/province-controller.js';

const app  = express();
const port = 3000; //http://localhost:3000

// ─── Middlewares ──────────────────────────────────────────────────────────────
app.use(cors());          // Habilita CORS para permitir peticiones desde otros orígenes
app.use(express.json());  // Permite parsear el body de las peticiones como JSON

// ─── Endpoints (Routers) ──────────────────────────────────────────────────────
// Todas las rutas de Province quedan bajo /api/province
app.use('/api/province', ProvinceRouter);

// ─── Inicio del servidor ──────────────────────────────────────────────────────
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
