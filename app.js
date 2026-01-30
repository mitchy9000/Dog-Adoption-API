import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import dogRoutes from './routes/dogRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/dogs', dogRoutes);

export default app;