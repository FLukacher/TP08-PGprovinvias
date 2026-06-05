
import express from 'express';
import cors from 'cors';
import ProvinceRouter from './src/controllers/province-controller.js';

const app  = express();
const port = 3000; //http://localhost:3000

app.use(cors());          
app.use(express.json());  

// Endpoints 
// Todas las rutas de Province quedan bajo /api/province
app.use('/api/province', ProvinceRouter);


app.listen(port, () => {
    console.log(`pagina escuchando en el puerto ${port}`);
});
