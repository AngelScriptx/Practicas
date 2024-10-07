import express from 'express';
import cors from 'cors';
import connectDB from './db/conexion.js'; 
import routes from './routes/index.js'

const app = express();

// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());

connectDB();

// Usa el router encapsulado con el prefijo '/api'
app.use('/api', routes);

const puerto = 3000

app.listen(puerto, ()=> console.log(`servidor en puerto ${puerto}`))

