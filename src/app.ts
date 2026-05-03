import express from 'express';
import authRoutes from './routes/auth.routes.js';
import expenseRoutes from './routes/expense.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { pinoHttp } from 'pino-http';

export const app = express();

app.use(express.json());
app.use(pinoHttp(process.env.NODE_ENV === 'test' ? { level: 'silent' } : {}));
app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);
app.use(errorMiddleware);
