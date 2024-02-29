import express, { Express, Request, Response } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoute'
import connectDB from "./database";

dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hola Mundo desde mi Blog con Comentarios con TypeScript');
});

app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes)

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error(`Error al conectar a la base de datos: ${(error as Error).message}`);
        process.exit(1);
    }
};

startServer(); 
