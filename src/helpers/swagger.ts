// src/swagger.ts
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Grocery API',
      version: '1.0.0',
      description: 'API for managing grocery items (admin routes)',
    },
    servers: [
      {
        url: 'http://localhost:3030',
      },
    ],
  },
  apis: [
    './src/routes/GroceryitemsRoute.ts',
    './src/routes/OrderRoute.ts',
  ], // adjust this to match your routes folder
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerUi, swaggerSpec };
