import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AmberOps Backend API',
      version: '1.0.0',
      description: 'The REST API service for all AmberOps application data. This documentation provides a live, interactive way to explore and test API endpoints.',
    },
    servers: [
      {
        url: 'http://localhost:3004/api/v1',
        description: 'Development server'
      },
    ],
  },
  apis: ['./src/api/routes/*.ts'], // Path to the API docs
};

const specs = swaggerJsdoc(options);
export default specs;
