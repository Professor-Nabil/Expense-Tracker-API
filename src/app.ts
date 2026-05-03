import express from 'express';
import authRoutes from './routes/auth.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { pinoHttp } from 'pino-http';

export const app = express();

app.use(express.json());
app.use(pinoHttp());
app.use('/auth', authRoutes);
app.use(errorMiddleware);
