// src/index.ts
import express from 'express';
import cors from 'cors';
import hospitalsRouter from './routes/hospitals.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/hospitals', hospitalsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
