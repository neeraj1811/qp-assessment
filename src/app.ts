import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
// Database connection
import './config/database';
import commonRoutes from './routes/commonRoutes';
import { swaggerUi, swaggerSpec } from './helpers/swagger';
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({ extended: true}),
);
app.use(bodyparser.json());

app.use('/', commonRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});