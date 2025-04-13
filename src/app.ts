import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
// Database connection
import './config/database';
import commonRoutes from './routes/commonRoutes';
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});